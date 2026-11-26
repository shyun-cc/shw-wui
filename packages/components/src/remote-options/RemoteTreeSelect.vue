<script setup lang="ts">
import { ElButton, ElTreeSelect, useFormDisabled } from 'element-plus';
import { useRemoteOptions } from './useRemoteOptions';
import { flatRemoteValue, type ShwOptionLoader } from './types';
defineOptions({ name: 'ShwRemoteTreeSelect', inheritAttrs: false });
const props = withDefaults(defineProps<{ modelValue?: string | string[]; loadOptions: ShwOptionLoader; multiple?: boolean; ready?: boolean; disabled?: boolean; checkStrictly?: boolean; contextKey?: string | number; debounce?: number; placeholder?: string }>(), { ready:true, disabled:undefined, multiple:false, checkStrictly:false, debounce:200, placeholder:'请选择' });
const formDisabled = useFormDisabled();
const emit = defineEmits<{ 'update:modelValue': [value: string | string[] | undefined] }>();
const state = useRemoteOptions(props);
defineExpose({ refresh: state.refresh });
</script>
<template><div class="shw-remote-control"><div class="shw-remote-control__row">
  <ElTreeSelect :key="JSON.stringify([contextKey, ready])" v-bind="$attrs" :model-value="modelValue" :data="state.options.value" node-key="value" :props="{ value:'value',label:'label',children:'children',disabled:'disabled' }" :multiple="multiple" :check-strictly="checkStrictly" :disabled="formDisabled || !ready" :loading="state.loading.value" :placeholder="placeholder" filterable remote clearable :remote-method="state.search" @update:model-value="(value: unknown) => emit('update:modelValue', flatRemoteValue(value))" @visible-change="(visible: boolean) => { if (!visible) state.restoreDefaults(); }" />
  <ElButton :loading="state.loading.value" :disabled="formDisabled || !ready" @click="state.refresh">刷新</ElButton>
</div><div v-if="state.error.value" class="shw-remote-control__error" role="alert">{{ state.error.value }}</div></div></template>
