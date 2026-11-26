<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue';
import { ElButton, ElCascader, useFormDisabled } from 'element-plus';
import { useRemoteOptions } from './useRemoteOptions';
import { remoteValue, type ShwOptionLoader, type ShwRemoteValue } from './types';
defineOptions({ name:'ShwRemoteCascader', inheritAttrs:false });
const props = withDefaults(defineProps<{ modelValue?: ShwRemoteValue; loadOptions: ShwOptionLoader; multiple?: boolean; emitPath?: boolean; checkStrictly?: boolean; ready?: boolean; disabled?: boolean; contextKey?: string | number; placeholder?: string }>(), { ready:true,disabled:undefined,multiple:false,emitPath:false,checkStrictly:false,placeholder:'请选择' });
const formDisabled = useFormDisabled();
const emit = defineEmits<{ 'update:modelValue': [value: ShwRemoteValue] }>();
const state=useRemoteOptions(props);
let panelOpen=false;let expectedInput='';let inputVersion=0;
onBeforeUnmount(()=>{panelOpen=false;expectedInput='';++inputVersion;});
watch(()=>[props.ready,props.contextKey],()=>{expectedInput='';++inputVersion;},{flush:'sync'});
function readyForSearch(){return props.ready!==false;}
async function beforeFilter(keyword:string) {
  const version=inputVersion;
  // Element Plus owns its debounce queue. Reject work from a closed/changed input before loading.
  if(!panelOpen || !readyForSearch() || keyword.trim()!==expectedInput || !expectedInput)throw new DOMException('过滤请求已取消','AbortError');
  const passed=await state.searchNow(keyword);
  if(!passed || version!==inputVersion || !panelOpen || !readyForSearch() || state.keyword.value!==expectedInput)throw new DOMException('过滤请求已取消','AbortError');
  return true;
}
function onInput(event:Event) {
  if(!(event.target instanceof HTMLInputElement))return;
  expectedInput=event.target.value.trim();++inputVersion;
  if(!expectedInput)state.search('');else state.prepareSearch(expectedInput);
}
function onVisible(visible:boolean) {
  panelOpen=visible;
  if(!visible){expectedInput='';++inputVersion;state.restoreDefaults();}
}
function onClear(){expectedInput='';++inputVersion;state.search('');}
defineExpose({refresh:state.refresh});
</script>
<template><div class="shw-remote-control" @input.capture="onInput"><div class="shw-remote-control__row">
  <ElCascader :key="JSON.stringify([contextKey, ready])" v-bind="$attrs" :model-value="modelValue" :options="state.options.value" :props="{value:'value',label:'label',children:'children',disabled:'disabled',multiple,emitPath,checkStrictly}" :disabled="formDisabled || !ready" :placeholder="placeholder" clearable filterable :before-filter="beforeFilter" :filter-method="() => true" @update:model-value="(value: unknown) => emit('update:modelValue', remoteValue(value))" @clear="onClear" @visible-change="onVisible" />
  <ElButton :loading="state.loading.value" :disabled="formDisabled || !ready" @click="state.refresh">刷新</ElButton>
</div><div v-if="state.error.value" class="shw-remote-control__error" role="alert">{{state.error.value}}</div></div></template>
