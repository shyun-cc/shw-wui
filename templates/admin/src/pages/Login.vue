<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAdmin } from '@shwkj/shw-wui';
import type { FormInstance, FormRules } from 'element-plus';
const admin = useAdmin();
const route = useRoute();
const profile = computed(() => admin.state.profile);
const preview = computed(() => route.name === 'StarterLoginPreview');
const busy = computed(() => pending.value || admin.state.busy);
const form = reactive({ username: 'admin', password: '' });
const formRef = ref<FormInstance>();
const error = ref('');
const pending = ref(false);
const rules: FormRules = { username: [{ required: true, message: '请输入模拟账号', trigger: 'blur' }], password: [{ required: true, message: '请输入密码', trigger: 'blur' }] };
async function signOut() {
  try {
    await admin.logout();
  } catch {
    // The runtime exposes the adapter error on the login page.
  }
}

async function submit() {
  if (preview.value || busy.value) return;
  const valid = await formRef.value?.validate().catch(() => false);
  if (!valid) { formRef.value?.$el.querySelector('.is-error input')?.focus(); return; }
  if (preview.value || busy.value) return;
  pending.value = true; error.value = '';
  try { await admin.login({ username: form.username.trim(), password: form.password }); }
  catch (cause) { error.value = cause instanceof Error ? cause.message : '登录失败，请重试'; }
  finally { pending.value = false; }
}
</script>
<template>
  <main class="login-page">
    <section class="login-panel" aria-labelledby="login-title">
      <header class="login-brand">
        <h1 id="login-title">{{ admin.options.title }}</h1>
        <p>PC 后台管理平台</p>
      </header>
      <p v-if="preview" class="login-preview-note" role="status">
        {{ profile ? `已登录 · ${profile.displayName}` : '未登录' }}
      </p>
      <el-alert v-if="error || admin.state.error" :title="error || admin.state.error" type="error" :closable="false" />
      <el-form ref="formRef" :model="form" :rules="rules" @submit.prevent="submit">
        <el-form-item prop="username">
          <el-input v-model="form.username" aria-label="账号" placeholder="请输入账号" size="large"
            autocomplete="username" :readonly="preview" :disabled="busy" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" aria-label="密码" placeholder="请输入密码" size="large"
            type="password" autocomplete="current-password" show-password :readonly="preview" :disabled="busy" />
        </el-form-item>
        <el-button class="login-submit" native-type="submit" type="primary" size="large" :loading="busy" :disabled="preview">
          {{ admin.state.busy && !pending ? '正在处理模拟会话' : '登录' }}
        </el-button>
      </el-form>
      <p class="login-help">模拟账号 admin / admin123 · viewer / viewer123</p>
      <div v-if="preview" class="login-preview-actions">
        <RouterLink :to="profile ? '/welcome' : '/login'" class="login-link">
          {{ profile ? '返回后台' : '前往登录' }}
        </RouterLink>
        <el-button v-if="profile" link type="primary" :loading="busy" @click="signOut">
          退出并打开登录页
        </el-button>
      </div>
    </section>
  </main>
</template>
<style scoped>
.login-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px 16px;
  --shw-pc-login-gradient: linear-gradient(135deg, #c9dff8 0%, #e3edf7 50%, #d5e3f2 100%);
  background: var(--shw-pc-login-gradient);
}
:global(.dark .login-page) { --shw-pc-login-gradient: linear-gradient(135deg, #1a2332, #1f2937, #1a2332); }
:global(html[data-shw-pc-theme] .login-page) { background: var(--shw-bg, var(--shw-pc-login-gradient)); }
.login-panel { width: min(100%, 360px); text-align: center; }
.login-brand { margin-bottom: 26px; }
.login-brand h1 { margin: 0; color: var(--el-text-color-primary); font-size: 30px; font-weight: 650; }
.login-brand p { margin: 8px 0 0; color: var(--el-text-color-secondary); font-size: 18px; font-weight: 600; }
.login-submit { width: 100%; }
.login-panel .el-alert { margin-bottom: 16px; text-align: left; }
.login-help, .login-preview-note { color: var(--el-text-color-secondary); font-size: 12px; line-height: 1.6; }
.login-help { margin: 16px 0 8px; }
.login-preview-actions { display: flex; justify-content: center; align-items: center; gap: 16px; }
.login-link { color: var(--el-color-primary); }
@media (max-width: 1180px) {
  .login-panel { width: min(100%, 290px); }
  .login-brand h1 { font-size: 26px; }
  .login-brand p { font-size: 16px; }
}
</style>
