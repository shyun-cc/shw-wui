<script setup lang="ts">
import { ref } from 'vue';
import { ElAlert,ElButton,ElDrawer,ElMessageBox,vLoading } from 'element-plus';
defineOptions({name:'ShwDetailDrawer',inheritAttrs:false});
const props=withDefaults(defineProps<{modelValue:boolean;title:string;size?:string|number;loading?:boolean;submitting?:boolean;dirty?:boolean;error?:string}>(),{size:'640px',loading:false,submitting:false,dirty:false});
const emit=defineEmits<{'update:modelValue':[value:boolean];closed:[];retry:[]}>();
const confirming=ref(false);
async function requestClose(done?:()=>void):Promise<boolean> {
  if(props.submitting||confirming.value)return false;
  if(props.dirty){confirming.value=true;try{await ElMessageBox.confirm('修改尚未保存，确定离开？','未保存的修改',{type:'warning',confirmButtonText:'离开',cancelButtonText:'继续编辑',distinguishCancelAndClose:true});}catch(reason){if(reason==='cancel'||reason==='close')return false;throw reason;}finally{confirming.value=false;}}
  if(props.submitting)return false;
  if(done)done();else emit('update:modelValue',false);
  return true;
}
defineExpose({requestClose:()=>requestClose()});
</script>
<template><ElDrawer v-bind="$attrs" :model-value="modelValue" :title="title" :size="size" :show-close="!submitting" :close-on-click-modal="!submitting" :close-on-press-escape="!submitting" :before-close="done=>{void requestClose(done)}" destroy-on-close @update:model-value="value=>emit('update:modelValue',value)" @closed="emit('closed')"><template v-if="$slots.header" #header><slot name="header" /></template><ElAlert v-if="error" :title="error" type="error" :closable="false"><ElButton link type="primary" :disabled="loading" @click="emit('retry')">重新加载</ElButton></ElAlert><div v-loading="loading" class="shw-detail-drawer-body"><slot /></div><template #footer><slot name="footer"><ElButton :disabled="submitting" @click="requestClose()">关闭</ElButton></slot></template></ElDrawer></template>
<style>.shw-detail-drawer-body {min-height:120px;font-size:14px;}</style>
