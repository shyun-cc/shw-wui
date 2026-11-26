<script setup lang="ts">
import { ElAlert,ElButton,ElEmpty,ElSkeleton,vLoading } from 'element-plus';
withDefaults(defineProps<{loading?:boolean;error?:string;empty?:boolean;filtered?:boolean}>(),{loading:false,empty:false,filtered:false});
const emit=defineEmits<{retry:[]}>();
</script>
<template><div :aria-busy="loading" class="shw-load-state"><ElAlert v-if="error" :title="error" type="error" :closable="false"><ElButton :disabled="loading" link type="primary" @click="emit('retry')">重试</ElButton></ElAlert><ElSkeleton v-if="loading && empty" :rows="3" animated /><ElEmpty v-else-if="empty && !error" :description="filtered ? '暂无查询结果' : '暂无数据'" /><div v-else v-loading="loading"><slot /></div></div></template>
<style>.shw-load-state{min-width:0;font-size:14px;}</style>
