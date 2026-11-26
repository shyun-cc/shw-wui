<script setup lang="ts">
import { useRoute, RouterView } from 'vue-router';
import { ShwAdminLayout, useAdmin } from '@shwkj/shw-wui';

const route = useRoute();
const admin = useAdmin();
</script>

<template>
  <main v-if="!admin.state.ready" class="starter-session-loading" role="status">正在恢复登录状态…</main>
  <RouterView v-else-if="route.meta.public" />
  <ShwAdminLayout v-else-if="admin.state.profile" />
  <main v-else class="starter-session-loading">
    <RouterLink to="/login">前往登录</RouterLink>
  </main>
</template>

<style scoped>
.starter-session-loading {
  min-height: 100vh;
  display: grid;
  place-items: center;
  color: var(--el-text-color-secondary);
}
</style>
