<!-- See LICENSES/pure-admin-thin.MIT.txt for third-party attribution. -->
<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import { ElButton, ElDialog, ElMessageBox } from 'element-plus';

defineOptions({ name: 'ShwFormDialog', inheritAttrs: false });
const props = withDefaults(defineProps<{
  modelValue: boolean;
  title: string;
  width?: string | number;
  loading?: boolean;
  dirty?: boolean;
}>(), { width: 640, loading: false, dirty: false });
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  submit: [];
  closed: [];
}>();
const confirming = ref(false);
const submitPending = ref(false);
watch(() => props.loading, value => { if (!value) submitPending.value = false; });

async function requestClose(done?: () => void): Promise<boolean> {
  if (props.loading || submitPending.value || confirming.value) return false;
  if (props.dirty) {
    confirming.value = true;
    try {
      await ElMessageBox.confirm('修改尚未保存，确定离开？', '未保存的修改', {
        confirmButtonText: '离开',
        cancelButtonText: '继续编辑',
        distinguishCancelAndClose: true,
        type: 'warning'
      });
    } catch (reason) {
      if (reason === 'cancel' || reason === 'close') return false;
      throw reason;
    } finally {
      confirming.value = false;
    }
  }
  // 保存可能在确认框打开期间开始；最终关闭前再次核对。
  if (props.loading || submitPending.value) return false;
  if (done) done();
  else emit('update:modelValue', false);
  return true;
}
defineExpose({ requestClose: (): Promise<boolean> => requestClose() });
function close() { return requestClose(); }
function beforeClose(done: () => void) { return requestClose(done); }
async function submit() {
  if (props.loading || submitPending.value || confirming.value) return;
  submitPending.value = true;
  emit('submit');
  // 父层在 submit 中设置 loading；同一更新周期的重复点击由本地锁拦截。
  await nextTick();
  if (!props.loading) submitPending.value = false;
}
function onClosed() {
  submitPending.value = false;
  emit('closed');
}
</script>

<template>
  <ElDialog
    v-bind="$attrs"
    class="shw-pc-theme"
    :model-value="modelValue"
    :title="title"
    :width="width"
    :show-close="!loading && !submitPending"
    :close-on-click-modal="!loading && !submitPending"
    :close-on-press-escape="!loading && !submitPending"
    :before-close="beforeClose"
    destroy-on-close
    @update:model-value="emit('update:modelValue', $event)"
    @closed="onClosed"
  >
    <slot />
    <template #footer>
      <slot name="footer" :submit="submit" :close="close" :loading="loading || submitPending">
        <ElButton :disabled="loading || submitPending || confirming" @click="close">取消</ElButton>
        <ElButton type="primary" :loading="loading || submitPending" :disabled="loading || submitPending || confirming" @click="submit">保存</ElButton>
      </slot>
    </template>
  </ElDialog>
</template>
