<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import { ElAlert, ElButton, ElDialog, useFormDisabled } from 'element-plus';
defineOptions({ name: 'ShwConfirmAction', inheritAttrs: false });
const props = withDefaults(defineProps<{
  message: string;
  onConfirm: () => Promise<unknown>;
  title?: string;
  label?: string;
  confirmText?: string;
  cancelText?: string;
  disabled?: boolean;
}>(), { title: '操作确认', label: '删除', confirmText: '确定', cancelText: '取消', disabled: undefined });
const emit = defineEmits<{ success: []; error: [error: unknown]; cancel: [] }>();
const disabled = useFormDisabled();
const visible = ref(false);
const loading = ref(false);
const error = ref('');
let alive = true;
onBeforeUnmount(() => { alive = false; });
function open() {
  if (!alive || disabled.value || visible.value || loading.value) return;
  error.value = '';
  visible.value = true;
}
function close(done?: () => void) {
  if (loading.value) return;
  visible.value = false;
  error.value = '';
  emit('cancel');
  done?.();
}
async function confirm() {
  if (!alive || !visible.value || loading.value || disabled.value) return;
  loading.value = true;
  error.value = '';
  try {
    await props.onConfirm();
  } catch (cause) {
    if (alive) {
      error.value = cause instanceof Error ? cause.message || '操作失败，请重试' : '操作失败，请重试';
      emit('error', cause);
    }
    return;
  } finally {
    if (alive) loading.value = false;
  }
  if (alive) {
    visible.value = false;
    emit('success');
  }
}
defineExpose({ open });
</script>
<template>
  <slot name="trigger" :open="open" :loading="loading" :disabled="disabled || visible || loading">
    <ElButton v-bind="$attrs" type="danger" :loading="loading" :disabled="disabled || visible || loading" @click="open">{{ label }}</ElButton>
  </slot>
  <ElDialog :model-value="visible" :title="title" width="440px" :show-close="!loading" :close-on-click-modal="!loading" :close-on-press-escape="!loading" :before-close="close" destroy-on-close>
    <slot :message="message" :loading="loading"><p class="shw-confirm-action__message">{{ message }}</p></slot>
    <ElAlert v-if="error" :title="error" type="error" :closable="false" role="alert" />
    <template #footer>
      <ElButton :disabled="loading" @click="close()">{{ cancelText }}</ElButton>
      <ElButton type="danger" :loading="loading" :disabled="disabled || loading" @click="confirm">{{ confirmText }}</ElButton>
    </template>
  </ElDialog>
</template>
<style>.shw-confirm-action__message { margin:0 0 12px; overflow-wrap:anywhere; font-size:14px; }</style>
