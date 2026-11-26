<script setup lang="ts">
import { inject } from 'vue';
import { version } from '../../package.json';
import { useRouter } from 'vue-router';
import { ShwPageContainer, ShwDetailSection, useAdmin } from '@shwkj/shw-wui';
defineOptions({ name: 'StarterWelcome' });
const admin = useAdmin();
const router = useRouter();
const sourceSha = inject('sourceSha', 'local');
async function signOut() {
  try {
    await admin.logout();
  } catch {
    // The runtime exposes the adapter error on the login page.
  }
}
</script>
<template><ShwPageContainer title="首页"><div class="starter-stack"><el-alert title="当前为模拟数据和模拟权限环境" type="warning" :closable="false" /><ShwDetailSection title="欢迎使用 SHW 后台模板"><p>已登录 · {{ admin.state.profile?.displayName }}</p><p>从标准列表体验查询、分页、详情与编辑，从分组表单体验独立页面提交，从树与列表体验分类联动。</p><div class="starter-actions"><el-button type="primary" @click="router.push('/examples')">打开标准列表</el-button><el-button @click="router.push('/grouped-form')">查看写入权限边界</el-button><el-button @click="router.push('/components')">查看通用组件</el-button><el-button @click="router.push('/login-preview')">查看登录页</el-button><el-button :loading="admin.state.busy" @click="signOut">退出登录</el-button><el-button @click="router.push('/missing-page')">查看 404</el-button></div></ShwDetailSection><ShwDetailSection title="接入边界"><p>菜单、路由、按钮使用同一份模拟权限。viewer 无写入权限，直接访问分组表单将进入 403。</p><p>示例名称填写“失败”可体验列表查询或保存失败；保存失败保留输入。</p><p class="starter-help">模板版本 {{ version }} · 来源提交 {{ sourceSha }}</p></ShwDetailSection></div></ShwPageContainer></template>
