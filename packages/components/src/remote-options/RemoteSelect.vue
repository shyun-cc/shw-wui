<script setup lang="ts">
import { ElButton, ElOption, ElSelect, useFormDisabled } from 'element-plus';
import { useRemoteOptions } from './useRemoteOptions';
import type { ShwOptionLoader } from './types';
defineOptions({ name: 'ShwRemoteSelect', inheritAttrs: false });
const props = withDefaults(defineProps<{ modelValue?: string | string[]; loadOptions: ShwOptionLoader; multiple?: boolean; ready?: boolean; disabled?: boolean; contextKey?: string | number; debounce?: number; placeholder?: string }>(), { ready: true, multiple: false, disabled: undefined, debounce: 200, placeholder: '请选择' });
const formDisabled = useFormDisabled();
const emit = defineEmits<{ 'update:modelValue': [value: string | string[] | undefined] }>();
const state = useRemoteOptions(props);
defineExpose({ refresh: state.refresh });
</script>
<template>
  <div class="shw-remote-control"><div class="shw-remote-control__row">
    <ElSelect :key="JSON.stringify([contextKey, ready])" v-bind="$attrs" :model-value="modelValue" :multiple="multiple" :disabled="formDisabled || !ready" :loading="state.loading.value" :placeholder="placeholder" filterable remote clearable :remote-method="state.search" @update:model-value="value => emit('update:modelValue', value)" @visible-change="visible => { if (!visible) state.restoreDefaults(); }">
      <ElOption v-for="option in state.options.value" :key="option.value" :value="option.value" :label="option.label" :disabled="option.disabled"><slot name="option" :option="option">{{ option.label }}</slot></ElOption>
      <template #empty><div class="shw-remote-empty">{{ state.loading.value ? '加载中' : state.error.value || (state.keyword.value ? '暂无查询结果' : '暂无选项') }}</div></template>
    </ElSelect>
    <ElButton :loading="state.loading.value" :disabled="formDisabled || !ready" @click="state.refresh">刷新</ElButton>
  </div><div v-if="state.error.value" class="shw-remote-control__error" role="alert">{{ state.error.value }}</div></div>
</template>
<style>
.shw-remote-control { width:100%; min-width:0; font-size:14px; }
.shw-remote-control__row { display:flex; align-items:center; gap:8px; min-width:0; }
.shw-remote-control__row > .el-select, .shw-remote-control__row > .el-cascader { flex:1; min-width:0; }
.shw-remote-control__error { margin-top:4px; color:var(--el-color-danger); line-height:1.5; }
.shw-remote-empty { padding:12px; color:var(--el-text-color-secondary); text-align:center; }
</style>
