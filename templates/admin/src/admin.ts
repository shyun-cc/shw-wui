import { createAdmin } from '@shwkj/shw-wui';
import { session } from './mock/session';
export const admin = createAdmin({
  title: 'SHW 后台模板', home: '/welcome', loginPath: '/login', session,
  pages: [
    { path: '/login', name: 'StarterLogin', title: '登录', component: () => import('./pages/Login.vue'), public: true, hidden: true },
    { path: '/login-preview', name: 'StarterLoginPreview', title: '登录页预览', component: () => import('./pages/Login.vue'), public: true, hidden: true },
    { path: '/welcome', name: 'StarterWelcome', title: '首页', component: () => import('./pages/Welcome.vue'), affix: true, cache: true },
    { path: '/examples', name: 'StarterList', title: '标准列表', component: () => import('./pages/RecordList.vue'), permission: 'example:read', cache: true },
    { path: '/examples/:id', name: 'StarterDetail', title: '记录详情', component: () => import('./pages/RecordDetail.vue'), permission: 'example:read', hidden: true },
    { path: '/grouped-form', name: 'StarterForm', title: '分组表单', component: () => import('./pages/GroupedForm.vue'), permission: 'example:write' },
    { path: '/tree-list', name: 'StarterTree', title: '树与列表', component: () => import('./pages/TreeList.vue'), permission: 'example:read' },
    { path: '/components', name: 'StarterComponents', title: '通用组件', component: () => import('./pages/Components.vue'), permission: 'example:read' },
    { path: '/403', name: 'StarterForbidden', title: '无权访问', component: () => import('./pages/Forbidden.vue'), hidden: true },
    { path: '/404', name: 'StarterNotFound', title: '页面不存在', component: () => import('./pages/NotFound.vue'), hidden: true },
  ],
  menus: [
    { path: '/welcome', title: '首页' },
    { path: '/examples-group', title: '页面示例', children: [
      { path: '/examples', title: '标准列表' },
      { path: '/grouped-form', title: '分组表单' },
      { path: '/tree-list', title: '树与列表' },
      { path: '/components', title: '通用组件' },
    ] },
  ],
});
