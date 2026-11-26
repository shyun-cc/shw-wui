import type { AdminSessionAdapter, AdminProfile } from '@shwkj/shw-wui';
import { delay } from './api';
const storageKey = 'shw-admin-starter:mock-identity';
function readIdentity(): string {
  try { return localStorage.getItem(storageKey) || ''; }
  catch { throw new Error('浏览器禁止读取本地存储，无法恢复模拟身份。请允许站点存储后重新登录。'); }
}
function saveIdentity(identity: string): void {
  try { localStorage.setItem(storageKey, identity); }
  catch { throw new Error('浏览器无法保存模拟身份。请检查站点存储权限或空间后重试。'); }
}
function clearIdentity(): void {
  try { localStorage.removeItem(storageKey); }
  catch { throw new Error('浏览器无法清除模拟身份。本次页面会话已退出，请清理该站点存储后再使用。'); }
}
function profile(identity: string): AdminProfile | null {
  if (identity === 'admin') return { id: 'mock-admin', displayName: '模拟管理员', permissions: ['example:read', 'example:write'] };
  if (identity === 'viewer') return { id: 'mock-viewer', displayName: '模拟只读用户', permissions: ['example:read'] };
  return null;
}
export const session: AdminSessionAdapter = {
  async restore(signal) { await delay(signal); return profile(readIdentity()); },
  async login(credentials, signal) {
    await delay(signal);
    const value = profile(credentials.username);
    if (!value || credentials.password !== `${credentials.username}123`) throw new Error('模拟账号或密码不正确');
    saveIdentity(credentials.username); return value;
  },
  async logout() { clearIdentity(); },
};
