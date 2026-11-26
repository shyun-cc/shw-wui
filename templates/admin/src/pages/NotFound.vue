<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ShwPageContainer } from '@shwkj/shw-wui';
const router = useRouter();
</script>
<template><ShwPageContainer title="404 页面不存在"><el-result title="404 页面不存在" sub-title="请检查地址或从菜单选择页面。"><template #extra><el-button type="primary" @click="router.push('/welcome')">返回首页</el-button></template></el-result></ShwPageContainer></template>
