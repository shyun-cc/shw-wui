import type { RouteComponent } from 'vue-router';
export interface AdminProfile { id: string; displayName: string; permissions: string[] }
export interface AdminCredentials { username: string; password: string }
export interface AdminMenu { path: string; title: string; children?: AdminMenu[] }
export interface AdminPage {
  path: string; name: string; title: string;
  component: RouteComponent | (() => Promise<any>);
  permission?: string; hidden?: boolean; public?: boolean; affix?: boolean; cache?: boolean;
}
export interface AdminSessionAdapter {
  restore(signal: AbortSignal): Promise<AdminProfile | null>;
  login(credentials: AdminCredentials, signal: AbortSignal): Promise<AdminProfile>;
  logout(): Promise<void>;
  loadMenus?(profile: AdminProfile, signal: AbortSignal): Promise<AdminMenu[]>;
}
export interface AdminOptions {
  title: string; home?: string; loginPath?: string; pages: AdminPage[]; menus: AdminMenu[];
  session: AdminSessionAdapter; storageKey?: string;
}
export interface AdminTab { path: string; name: string; title: string; affix: boolean; cache: boolean }
