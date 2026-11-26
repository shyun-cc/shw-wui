<script setup lang="ts">
import { computed } from 'vue';
import { ElCard } from 'element-plus';
defineOptions({name:'ShwFormSection'});
const props=withDefaults(defineProps<{title?:string;description?:string;columns?:number}>(),{columns:2});
const style=computed(()=>({'--shw-form-columns':Math.max(1,Math.min(4,Math.floor(props.columns)||1))}));
</script>
<template><ElCard class="shw-form-section" shadow="never" :style="style"><template v-if="title || $slots.header" #header><div class="shw-form-section__header"><slot name="header"><h2>{{title}}</h2></slot><slot name="actions" /></div></template><p v-if="description" class="shw-form-section__description">{{description}}</p><div class="shw-form-section__fields"><slot /></div></ElCard></template>
<style>
.shw-form-section { container-type:inline-size; font-size:14px; }
.shw-form-section__header { display:flex; align-items:center; justify-content:space-between; gap:12px; }
.shw-form-section__header h2 { margin:0; font-size:14px; font-weight:600; }
.shw-form-section__description { margin:0 0 12px; color:var(--el-text-color-secondary); }
.shw-form-section__fields { display:grid; grid-template-columns:repeat(var(--shw-form-columns),minmax(0,1fr)); gap:0 24px; }
.shw-form-section__fields > * { min-width:0; }
@container(max-width:640px) { .shw-form-section__fields { grid-template-columns:minmax(0,1fr); } }
</style>
