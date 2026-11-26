<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import RouteOutlet from './RouteOutlet.vue';
import { ElAlert, ElAside, ElBreadcrumb, ElBreadcrumbItem, ElButton, ElContainer, ElDropdown, ElDropdownItem, ElDropdownMenu, ElHeader, ElMain, ElMenu, ElScrollbar, ElSelect, ElOption, ElTabPane, ElTabs } from 'element-plus';
import { useAdmin } from './runtime';
import MenuItem from './MenuItem.vue';
import type { AdminMenu } from './types';
const admin = useAdmin();
const route = useRoute();
const collapsed = ref(false);
const theme = ref<'light' | 'dark' | 'system'>('light');
const storageKey = `${admin.options.storageKey ?? 'shw-admin'}:appearance`;
const media = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : undefined;
function applyTheme() { if (typeof document !== 'undefined') document.documentElement.classList.toggle('dark', theme.value === 'dark' || (theme.value === 'system' && !!media?.matches)); }
function persistAppearance() {
  applyTheme();
  try { localStorage.setItem(storageKey, JSON.stringify({ collapsed: collapsed.value, theme: theme.value })); } catch { /* Appearance persistence is optional (e.g. private browsing). */ }
}
onMounted(() => {
  try { const saved = JSON.parse(localStorage.getItem(storageKey) ?? 'null'); if (saved) { collapsed.value = saved.collapsed === true; if (['light', 'dark', 'system'].includes(saved.theme)) theme.value = saved.theme; } } catch { /* Invalid appearance cache is ignored; auth never uses this cache. */ }
  applyTheme(); media?.addEventListener('change', applyTheme);
});
onBeforeUnmount(() => media?.removeEventListener('change', applyTheme));
watch([collapsed, theme], persistAppearance);
function menuTrail(items: AdminMenu[], path: string): AdminMenu[] {
  for (const item of items) { if (item.path === path) return [item]; const nested = menuTrail(item.children ?? [], path); if (nested.length) return [item, ...nested]; }
  return [];
}
const crumbs = computed(() => { const trail = menuTrail(admin.menus.value, route.path); return trail.length ? trail.map(item => item.title) : [String(route.meta.title ?? '')]; });

async function navigate(path: string | number) { await admin.router.push(String(path)); }
async function signOut() { try { await admin.logout(); } catch { /* The adapter failure is rendered by state.error on the login screen. */ } }
async function onCommand(command: string) { if (command === 'logout') await signOut(); }
</script>
<template>
  <ElContainer class="shw-admin-layout">
    <ElAside :width="collapsed ? '54px' : '210px'" class="shw-admin-sidebar">
      <div class="shw-admin-brand"><span>{{ collapsed ? optionsTitleShort : admin.options.title }}</span></div>
      <ElScrollbar class="shw-admin-menu-scroll">
        <ElMenu :default-active="route.path" :collapse="collapsed" :collapse-transition="false" unique-opened @select="navigate">
          <MenuItem v-for="item in admin.menus.value" :key="item.path" :item="item" :collapsed="collapsed" />
        </ElMenu>
      </ElScrollbar>
      <ElButton text class="shw-admin-collapse" :aria-label="collapsed ? '展开侧栏' : '收起侧栏'" @click="collapsed = !collapsed">{{ collapsed ? '展开' : '收起侧栏' }}</ElButton>
    </ElAside>
    <ElContainer class="shw-admin-body">
      <ElHeader height="48px" class="shw-admin-navbar">
        <ElBreadcrumb separator="/"><ElBreadcrumbItem v-for="(item,index) in crumbs" :key="index">{{ item }}</ElBreadcrumbItem></ElBreadcrumb>
        <div class="shw-admin-nav-actions">
          <slot name="header" />
          <ElSelect v-model="theme" aria-label="外观主题" style="width: 120px" size="small"><ElOption label="浅色模式" value="light" /><ElOption label="深色模式" value="dark" /><ElOption label="跟随系统" value="system" /></ElSelect>
          <ElDropdown trigger="click" @command="onCommand"><ElButton text>{{ admin.state.profile?.displayName }}<span class="shw-admin-user-caption">账户</span></ElButton><template #dropdown><ElDropdownMenu><ElDropdownItem command="logout">退出登录</ElDropdownItem></ElDropdownMenu></template></ElDropdown>
        </div>
      </ElHeader>
      <div class="shw-admin-tabs">
        <ElTabs :model-value="route.fullPath" @tab-change="navigate" @tab-remove="name => admin.closeTab(String(name))"><ElTabPane v-for="tab in admin.tabs.value" :key="tab.path" :name="tab.path" :label="tab.title" :closable="!tab.affix" /></ElTabs>
        <ElButton text size="small" @click="admin.closeOtherTabs">关闭其他</ElButton>
      </div>
      <ElMain class="shw-admin-content">
        <ElAlert v-if="admin.state.error" :title="admin.state.error" type="error" :closable="false" class="shw-admin-error" />
        <RouteOutlet />
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>
<script lang="ts">
// The brand abbreviation is text, not an icon glyph.
const optionsTitleShort = 'SHW';
</script>
<style>
.shw-admin-layout { height: 100vh; overflow: hidden; color: var(--el-text-color-primary); background: var(--shw-admin-page-bg, #f0f2f5); font-size: 14px; }
.shw-admin-sidebar { flex-shrink: 0; display: flex; flex-direction: column; background: var(--el-bg-color); border-right: 1px solid var(--el-border-color-light); transition: width .2s ease; }
.shw-menu-short { font-size: 14px; font-weight: 400; }
.shw-admin-brand { height: 48px; padding: 0 16px; display: flex; align-items: center; flex-shrink: 0; font-size: 18px; font-weight: 600; overflow: hidden; white-space: nowrap; border-bottom: 1px solid var(--el-border-color-light); }
.shw-admin-menu-scroll { flex: 1; min-height: 0; }
.shw-admin-sidebar .el-menu { border-right: 0; --el-menu-item-height: 44px; --el-menu-sub-item-height: 44px; }
.shw-admin-sidebar .el-menu--collapse { width: 53px; --el-menu-icon-width: 16px; }
.shw-admin-sidebar .el-menu:not(.el-menu--collapse) .el-menu-item.is-active {
  margin-inline: 8px;
  border-radius: 3px;
  color: var(--el-color-white);
  background: var(--el-color-primary);
}
.dark .shw-admin-layout { --shw-admin-page-bg: var(--el-bg-color-page); }
.shw-admin-sidebar .el-menu:not(.el-menu--collapse) { width: 100%; }
.shw-admin-collapse { height: 40px; margin: 0; flex-shrink: 0; border-top: 1px solid var(--el-border-color-light); border-radius: 0; }
.shw-admin-sidebar:has(.el-menu--collapse) .shw-admin-brand { justify-content: center; padding: 0; }
.shw-admin-body { min-width: 0; }
.shw-admin-navbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-shrink: 0; border-bottom: 1px solid var(--el-border-color-light); background: var(--el-bg-color); }
.shw-admin-nav-actions { display: flex; align-items: center; gap: 12px; }
.shw-admin-user-caption { margin-left: 8px; color: var(--el-text-color-secondary); }
.shw-admin-tabs { display: flex; align-items: center; gap: 8px; padding: 0 12px; background: var(--el-bg-color); border-bottom: 1px solid var(--el-border-color-light); }
.shw-admin-tabs .el-tabs { flex: 1; min-width: 0; }
.shw-admin-tabs .el-tabs__header { margin: 0; }
.shw-admin-tabs .el-tabs__nav-wrap::after, .shw-admin-tabs .el-tabs__active-bar { display: none; }
.shw-admin-tabs .el-tabs__item { height: 34px; padding-inline: 12px; }
.shw-admin-tabs .el-tabs__item.is-active { background: var(--el-color-primary-light-9); }
.shw-admin-tabs .el-tabs__content { display: none; }
.shw-admin-content { min-width: 0; padding: 0; overflow: auto; }
.shw-admin-error { margin: 16px; width: auto; }
@media(max-width: 800px) { .shw-admin-nav-actions { gap: 4px; } .shw-admin-navbar { padding: 0 12px; } }
html[data-shw-pc-theme] .shw-admin-layout { background: var(--shw-bg, var(--shw-admin-page-bg, #f0f2f5)); }
html[data-shw-pc-theme] .shw-admin-sidebar .el-menu:not(.el-menu--collapse) .el-menu-item.is-active { color: var(--shw-text-on-primary, var(--el-color-white)); }
</style>
