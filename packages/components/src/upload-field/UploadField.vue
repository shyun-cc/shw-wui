<script setup lang="ts">
import { computed, onBeforeUnmount, ref, shallowRef, toRaw, watch } from 'vue';
import { ElAlert, ElButton, ElDialog, ElImage, ElProgress, useFormDisabled } from 'element-plus';
import type { ShwUpload, ShwUploadFile } from './types';
defineOptions({ name: 'ShwUploadField', inheritAttrs: false });
const props = withDefaults(defineProps<{
  modelValue: readonly ShwUploadFile[];
  upload: ShwUpload;
  accept?: string;
  multiple?: boolean;
  limit?: number;
  maxSize?: number;
  disabled?: boolean;
  label?: string;
}>(), { accept: '', multiple: false, label: '选择文件', disabled: undefined });
const emit = defineEmits<{
  'update:modelValue': [files: ShwUploadFile[]];
  error: [error: unknown, file: File];
  preview: [file: ShwUploadFile];
  remove: [file: ShwUploadFile];
}>();
interface Job { id: number; file: File; controller: AbortController; progress?: number; error: string; }
const disabled = useFormDisabled();
const input = ref<HTMLInputElement>();
const files = shallowRef<readonly ShwUploadFile[]>(props.modelValue);
const jobs = ref<Job[]>([]);
const error = ref('');
const previewFile = ref<ShwUploadFile>();
const previewVisible = ref(false);
const uploading = computed(() => jobs.value.some(job => !job.error));
let serial = 0;
let alive = true;
let emitted: readonly ShwUploadFile[] | undefined;
function publish(value: ShwUploadFile[]) {
  files.value = value;
  emitted = value;
  emit('update:modelValue', value);
}
function cancelAll() {
  for (const job of jobs.value) job.controller.abort();
  jobs.value = [];
}
watch(() => props.modelValue, value => {
  // An external replacement/reset invalidates in-flight work, including adapters that ignore abort.
  if (toRaw(value) !== emitted) {
    cancelAll();
    previewVisible.value = false;
    previewFile.value = undefined;
    error.value = '';
  }
  files.value = value;
  emitted = undefined;
}, { flush: 'sync' });
onBeforeUnmount(() => { alive = false; cancelAll(); });
function safeUrl(value: string): string | undefined {
  if (typeof value !== 'string' || !value.trim()) return undefined;
  try {
    const url = new URL(value, window.location.href);
    return ['http:', 'https:', 'blob:'].includes(url.protocol) ? url.href : undefined;
  } catch { return undefined; }
}
function isImage(file: ShwUploadFile) { return file.type?.startsWith('image/') ?? /\.(png|jpe?g|gif|webp|avif|bmp|svg)(?:[?#]|$)/i.test(file.url); }
function active(job: Job) { return alive && !job.controller.signal.aborted && jobs.value.some(item => item.id === job.id); }
function dismiss(id: number) {
  const job = jobs.value.find(item => item.id === id);
  job?.controller.abort();
  jobs.value = jobs.value.filter(item => item.id !== id);
}
async function run(job: Job) {
  try {
    const result = await props.upload(job.file, { signal: job.controller.signal, onProgress: percent => {
      if (active(job) && Number.isFinite(percent)) {
        const item = jobs.value.find(item => item.id === job.id);
        if (item) item.progress = Math.max(0, Math.min(100, percent));
      }
    } });
    if (!active(job)) return;
    if (!result || !result.id || !result.name || !safeUrl(result.url)) throw new Error('上传结果缺少有效的 id、name 或预览地址');
    if (files.value.some(item => item.id === result.id)) throw new Error('上传结果的文件 id 已存在');
    jobs.value = jobs.value.filter(item => item.id !== job.id);
    publish([...files.value, { ...result }]);
  } catch (cause) {
    if (!active(job)) return;
    const item = jobs.value.find(item => item.id === job.id);
    if (item) item.error = cause instanceof Error ? cause.message || '上传失败，请重试' : '上传失败，请重试';
    emit('error', cause, job.file);
  }
}
function retry(id: number) {
  if (disabled.value) return;
  const previous = jobs.value.find(item => item.id === id);
  if (!previous?.error) return;
  const job: Job = { id: ++serial, file: previous.file, controller: new AbortController(), error: '' };
  dismiss(id);
  jobs.value.push(job);
  void run(job);
}
function accepts(file: File) {
  return !props.accept || props.accept.split(',').some(raw => {
    const rule = raw.trim().toLowerCase();
    return rule.startsWith('.') ? file.name.toLowerCase().endsWith(rule) : rule.endsWith('/*') ? file.type.toLowerCase().startsWith(rule.slice(0, -1)) : file.type.toLowerCase() === rule;
  });
}
function select(event: Event) {
  const target = event.target as HTMLInputElement;
  const selected = Array.from(target.files ?? []);
  target.value = '';
  if (disabled.value) return;
  error.value = '';
  for (const file of selected) {
    let message = '';
    if (props.limit !== undefined && files.value.length + jobs.value.length >= props.limit) message = `最多上传 ${props.limit} 个文件`;
    else if (props.maxSize !== undefined && file.size > props.maxSize) message = `文件「${file.name}」超过大小限制（${props.maxSize} 字节）`;
    else if (!accepts(file)) message = `文件「${file.name}」类型不符合要求`;
    if (message) { error.value = message; emit('error', new Error(message), file); continue; }
    const job: Job = { id: ++serial, file, controller: new AbortController(), error: '' };
    jobs.value.push(job);
    void run(job);
  }
}
function remove(file: ShwUploadFile) {
  if (disabled.value) return;
  if (previewFile.value?.id === file.id) { previewVisible.value = false; previewFile.value = undefined; }
  publish(files.value.filter(item => item.id !== file.id));
  emit('remove', file);
}
function preview(file: ShwUploadFile) {
  emit('preview', file);
  if (isImage(file) && safeUrl(file.url)) { previewFile.value = file; previewVisible.value = true; }
}
defineExpose({ cancel: cancelAll, uploading });
</script>
<template>
  <div v-bind="$attrs" class="shw-upload-field">
    <input ref="input" class="shw-upload-field__input" type="file" :accept="accept" :multiple="multiple" :disabled="disabled" :aria-label="label" @change="select" />
    <ElButton :disabled="disabled || (limit !== undefined && files.length + jobs.length >= limit)" @click="input?.click()">{{ label }}</ElButton>
    <slot name="tip" />
    <ElAlert v-if="error" :title="error" type="error" :closable="false" role="alert" />
    <ul v-if="files.length || jobs.length" class="shw-upload-field__list" aria-label="文件列表">
      <li v-for="file in files" :key="file.id" class="shw-upload-field__item">
        <ElImage v-if="isImage(file) && safeUrl(file.url)" :src="safeUrl(file.url)" fit="cover" class="shw-upload-field__thumbnail"><template #error>图片加载失败</template></ElImage>
        <span class="shw-upload-field__name">{{ file.name }}</span>
        <button v-if="isImage(file) && safeUrl(file.url)" type="button" class="shw-upload-field__preview-button" :aria-label="`预览 ${file.name}`" @click="preview(file)">预览</button>
        <a v-else-if="safeUrl(file.url)" :href="safeUrl(file.url)" target="_blank" rel="noopener noreferrer" :aria-label="`打开 ${file.name}`" @click="emit('preview', file)">打开</a>
        <span v-else>地址不可用</span>
        <ElButton link type="danger" :disabled="disabled" :aria-label="`移除 ${file.name}`" @click="remove(file)">移除</ElButton>
      </li>
      <li v-for="job in jobs" :key="job.id" class="shw-upload-field__item" :aria-busy="!job.error">
        <span class="shw-upload-field__name">{{ job.file.name }}</span>
        <span v-if="job.error" role="alert" class="shw-upload-field__error">{{ job.error }}</span>
        <ElProgress v-else-if="job.progress !== undefined" :percentage="job.progress" class="shw-upload-field__progress" />
        <span v-else role="status">上传中</span>
        <ElButton v-if="job.error" link type="primary" :disabled="disabled" @click="retry(job.id)">重试</ElButton>
        <ElButton link :disabled="disabled" @click="dismiss(job.id)">{{ job.error ? '移除' : '取消' }}</ElButton>
      </li>
    </ul>
    <ElDialog v-model="previewVisible" :title="previewFile?.name || '图片预览'" width="720px" destroy-on-close @closed="previewFile=undefined">
      <ElImage v-if="previewFile" :src="safeUrl(previewFile.url)" fit="contain" class="shw-upload-field__preview"><template #error>图片加载失败，请检查地址</template></ElImage>
    </ElDialog>
  </div>
</template>
<style>
.shw-upload-field { width:100%; font-size:14px; }
.shw-upload-field__input { display:none; }
.shw-upload-field__list { list-style:none; margin:8px 0 0; padding:0; }
.shw-upload-field__item { display:flex; align-items:center; flex-wrap:wrap; gap:8px; padding:8px 0; border-bottom:1px solid var(--el-border-color-lighter); }
.shw-upload-field__name { flex:1; min-width:120px; overflow-wrap:anywhere; }
.shw-upload-field__thumbnail { width:48px; height:48px; }
.shw-upload-field__preview-button { padding:0; border:0; background:none; color:var(--el-color-primary); font:inherit; cursor:pointer; }
.shw-upload-field__preview-button:focus-visible { outline:2px solid var(--el-color-primary); outline-offset:2px; }
.shw-upload-field__progress { width:160px; }
.shw-upload-field__error { color:var(--el-color-danger); }
.shw-upload-field__preview { width:100%; height:60vh; }
</style>
