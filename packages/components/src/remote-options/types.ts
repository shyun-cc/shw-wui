export interface ShwRemoteOption { [key: string]: unknown; value: string; label: string; disabled?: boolean; children?: ShwRemoteOption[] }
export type ShwRemoteValue = string | string[] | string[][] | null | undefined;
export interface ShwRemoteQuery { keyword: string; selectedValues: string[]; signal: AbortSignal }
export type ShwOptionLoader = (query: ShwRemoteQuery) => Promise<ShwRemoteOption[]>;
export interface ShwRemoteProps { modelValue?: ShwRemoteValue; loadOptions: ShwOptionLoader; ready?: boolean; contextKey?: string | number; debounce?: number; emitPath?: boolean }
export function remoteValue(value: unknown): ShwRemoteValue {
  if (value == null) return undefined;
  if (typeof value === 'string') return value;
  if (Array.isArray(value) && (value.every(item => typeof item === 'string') || value.every(item => Array.isArray(item) && item.every(part => typeof part === 'string')))) return value;
  throw new TypeError('远程选择值必须为字符串ID或路径');
}
export function flatRemoteValue(value: unknown): string | string[] | undefined {
  const result = remoteValue(value);
  if (result === undefined || typeof result === 'string' || (Array.isArray(result) && result.every(item => typeof item === 'string'))) return result as string | string[] | undefined;
  throw new TypeError('此选择器不接受多维路径');
}
