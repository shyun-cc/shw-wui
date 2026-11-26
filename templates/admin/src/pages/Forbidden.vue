<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ShwPageContainer } from '@shwkj/shw-wui';
const router = useRouter();
</script>
<template><ShwPageContainer title="403 无权访问"><el-result title="403 无权访问" sub-title="当前模拟身份缺少该页面所需权限。"><template #extra><el-button type="primary" @click="router.push('/welcome')">返回首页</el-button></template></el-result></ShwPageContainer></template>
