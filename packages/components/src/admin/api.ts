export class AdminApiError extends Error {
  constructor(message: string, readonly code: number, readonly traceId = '', readonly httpStatus = 0) { super(message); this.name = 'AdminApiError'; }
}
export interface AdminApiOptions {
  baseURL?: string;
  headers?: () => HeadersInit;
  onUnauthorized: () => void | Promise<void>;
  onForbidden?: () => void;
}
export interface AdminRequestOptions { method?: string; body?: unknown; signal?: AbortSignal; headers?: HeadersInit }
/** Four-field API adapter. No token persistence or invented refresh-token protocol. */
export function createAdminApi(options: AdminApiOptions) {
  const base = options.baseURL ?? '/api';
  if (!base.startsWith('/') || base.startsWith('//') || base.includes('\\')) throw new Error('API baseURL 必须是同域绝对路径');
  let expiring: Promise<void> | undefined;
  async function unauthorized() {
    if (!expiring) expiring = Promise.resolve().then(options.onUnauthorized).finally(() => { expiring = undefined; });
    await expiring;
  }
  return async function request<T>(path: string, input: AdminRequestOptions = {}): Promise<T> {
    if (!path.startsWith('/') || path.startsWith('//') || path.includes('\\') || path.split(/[/?#]/).some(p => p === '..' || p.toLowerCase() === '%2e%2e')) throw new Error('API path 必须是合法同域路径');
    const headers = new Headers(options.headers?.());
    new Headers(input.headers).forEach((value, key) => headers.set(key, value));
    if (input.body !== undefined) headers.set('Content-Type', 'application/json');
    const response = await fetch(base.replace(/\/$/, '') + path, { method: input.method ?? (input.body === undefined ? 'GET' : 'POST'), headers, body: input.body === undefined ? undefined : JSON.stringify(input.body), signal: input.signal, credentials: 'same-origin', redirect: 'error' });
    if (response.status === 401) { await unauthorized(); throw new AdminApiError('登录已失效，请重新登录', 401, '', 401); }
    if (response.status === 403) { options.onForbidden?.(); throw new AdminApiError('没有操作权限', 403, '', 403); }
    const text = await response.text();
    let envelope: { traceId?: string; code: number; message?: string; data: T };
    try {
      envelope = JSON.parse(text, (_key, value: unknown) => {
        if (typeof value === 'number' && Number.isInteger(value) && !Number.isSafeInteger(value)) throw new Error('不安全整数');
        return value;
      });
    } catch { throw new AdminApiError('接口响应格式错误或包含超范围整数，请将 ID 按字符串返回', response.status || -1, '', response.status); }
    if (!envelope || typeof envelope.code !== 'number') throw new AdminApiError('接口响应缺少 code', -1, envelope?.traceId, response.status);
    if (envelope.code === 401) { await unauthorized(); throw new AdminApiError(envelope.message || '登录已失效', 401, envelope.traceId, response.status); }
    if (envelope.code === 403) options.onForbidden?.();
    if (!response.ok || envelope.code !== 0) throw new AdminApiError(envelope.message || `请求失败（${response.status}）`, envelope.code, envelope.traceId, response.status);
    return envelope.data;
  };
}
