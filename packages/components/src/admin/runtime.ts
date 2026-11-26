import { computed, inject, reactive, ref, type App, type InjectionKey } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory, type RouteLocationNormalized, type RouteRecordRaw } from 'vue-router';
import type { AdminCredentials, AdminMenu, AdminOptions, AdminProfile, AdminTab } from './types';

// Navigation and session behaviors are implemented with host adapters.
export function createAdmin(options: AdminOptions) {
  const home = options.home ?? '/welcome';
  const loginPath = options.loginPath ?? '/login';
  const pages = new Map(options.pages.map(page => [page.path, page]));
  if (pages.size !== options.pages.length || new Set(options.pages.map(p => p.name)).size !== options.pages.length) throw new Error('页面路径和名称必须唯一');
  for (const path of [home, loginPath, '/403', '/404']) if (!pages.has(path)) throw new Error(`缺少框架入口 ${path}`);
  const pinia = createPinia();
  const state = reactive<{ profile: AdminProfile | null; ready: boolean; busy: boolean; error: string }>({ profile: null, ready: false, busy: false, error: '' });
  const menuSource = ref<AdminMenu[]>(options.menus);
  const tabs = ref<AdminTab[]>([]);
  let epoch = 0;
  let controller: AbortController | undefined;
  let restoring: Promise<void> | undefined;
  let signingOut = false;
  const can = (permission?: string | string[]) => {
    if (!state.profile) return false;
    if (!permission || (Array.isArray(permission) && permission.length === 0)) return false;
    const required = Array.isArray(permission) ? permission : [permission];
    return required.every(code => state.profile!.permissions.includes(code));
  };
  function visibleMenus(items: AdminMenu[]): AdminMenu[] {
    return items.flatMap(item => {
      if (item.children?.length) {
        const children = visibleMenus(item.children);
        return children.length ? [{ ...item, children }] : [];
      }
      const page = pages.get(item.path);
      return page && !page.hidden && !page.public && (!page.permission || can(page.permission)) ? [{ ...item }] : [];
    });
  }
  const menus = computed(() => visibleMenus(menuSource.value));
  const routes: RouteRecordRaw[] = options.pages.map(page => ({
    path: page.path, name: page.name, component: page.component,
    meta: { title: page.title, public: page.public ?? false, permission: page.permission, hidden: page.hidden ?? false, affix: page.affix ?? false, cache: page.cache ?? false }
  }));
  const router = createRouter({ history: createWebHistory(), routes: [{ path: '/', redirect: home }, ...routes, { path: '/:pathMatch(.*)*', redirect: '/404' }], scrollBehavior: () => ({ top: 0 }) });
  function invalidate() { epoch++; controller?.abort(); controller = new AbortController(); return { version: epoch, signal: controller.signal }; }
  async function obtainProfile(profile: AdminProfile | null, signal: AbortSignal, version: number) {
    const items = profile && options.session.loadMenus ? await options.session.loadMenus(profile, signal) : options.menus;
    if (signal.aborted || version !== epoch) return;
    state.profile = profile;
    menuSource.value = items;
    state.ready = true;
  }
  async function restore() {
    if (state.ready) return;
    if (restoring) return restoring;
    const { version, signal } = invalidate();
    restoring = (async () => {
      try {
        await obtainProfile(await options.session.restore(signal), signal, version);
      } catch (error) {
        if (!signal.aborted && version === epoch) { state.profile = null; state.ready = true; state.error = error instanceof Error ? error.message : '恢复会话失败，请重新登录'; }
      } finally {
        if (version === epoch) restoring = undefined;
      }
    })();
    return restoring;
  }
  function safeRedirect(value: unknown) {
    if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//') || value.includes('\\')) return home;
    const resolved = router.resolve(value);
    const page = options.pages.find(item => item.name === resolved.name);
    return page && !page.public && (!page.permission || can(page.permission)) ? resolved.fullPath : home;
  }
  async function login(credentials: AdminCredentials) {
    if (state.busy) return;
    const { version, signal } = invalidate();
    restoring = undefined;
    state.busy = true; state.error = '';
    try {
      const profile = await options.session.login(credentials, signal);
      await obtainProfile(profile, signal, version);
      if (signal.aborted || version !== epoch) return;
      tabs.value = [];
      await router.replace(safeRedirect(router.currentRoute.value.query.redirect));
    } catch (error) {
      if (signal.aborted || version !== epoch) return;
      state.profile = null;
      state.error = error instanceof Error ? error.message : '登录失败';
      throw error;
    } finally { if (version === epoch) state.busy = false; }
  }
  async function logout() {
    if (state.busy) return;
    state.busy = true; state.error = ''; signingOut = true;
    let version = epoch;
    try {
      // Leaving a dirty page may be cancelled. Preserve the existing session in that case.
      const failure = await router.replace(loginPath);
      if (failure) return;
      version = invalidate().version;
      restoring = undefined;
      state.profile = null; state.ready = true; tabs.value = [];
      // Login remains disabled until the old server session has finished revoking.
      await options.session.logout();
    } catch (error) {
      if (version === epoch) state.error = error instanceof Error ? error.message : '退出会话失败，请重试';
      throw error;
    } finally {
      if (version === epoch) { state.busy = false; signingOut = false; }
    }
  }
  router.beforeEach(async to => {
    await restore();
    if (to.meta.public) return to.path === loginPath && state.profile && !signingOut ? home : true;
    if (!state.profile) return { path: loginPath, query: { redirect: to.fullPath } };
    if (typeof to.meta.permission === 'string' && !can(to.meta.permission)) return '/403';
    return true;
  });
  function visit(to: RouteLocationNormalized) {
    if (to.meta.public || !state.profile) return;
    const page = options.pages.find(p => p.name === to.name);
    if (!page) return;
    if (!tabs.value.some(t => t.path === home)) {
      const homePage = pages.get(home)!;
      tabs.value.push({ path: home, name: homePage.name, title: homePage.title, affix: true, cache: homePage.cache ?? false });
    }
    if (!tabs.value.some(t => t.path === to.fullPath)) tabs.value.push({ path: to.fullPath, name: page.name, title: page.title, affix: page.affix ?? false, cache: page.cache ?? false });
    if (typeof document !== 'undefined') document.title = `${page.title} · ${options.title}`;
  }
  router.afterEach((to, _from, failure) => { if (!failure) visit(to); });
  router.onError(error => { state.error = error.message; });
  async function closeTab(path: string) {
    const index = tabs.value.findIndex(tab => tab.path === path);
    if (index < 0 || tabs.value[index]!.affix) return;
    const next = tabs.value[index - 1] ?? tabs.value[index + 1];
    // Navigation cancellation (e.g. unsaved form) must not delete the active tab.
    if (router.currentRoute.value.fullPath === path) {
      const failure = await router.push(next?.path ?? home);
      if (failure) return;
    }
    tabs.value = tabs.value.filter(tab => tab.path !== path);
  }
  function closeOtherTabs() { const current = router.currentRoute.value.fullPath; tabs.value = tabs.value.filter(tab => tab.affix || tab.path === current); }
  const admin = { options, router, pinia, state, menus, tabs, can, login, logout, restore, closeTab, closeOtherTabs,
    install(app: App) { app.provide(adminKey, admin); app.use(pinia); app.use(router); }
  };
  return admin;
}
export type AdminRuntime = ReturnType<typeof createAdmin>;
const adminKey: InjectionKey<AdminRuntime> = Symbol('shw-admin');
export function useAdmin(): AdminRuntime { const admin = inject(adminKey); if (!admin) throw new Error('请先 app.use(createAdmin(options))'); return admin; }
