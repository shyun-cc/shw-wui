import { computed, onBeforeUnmount, ref, shallowRef, watch } from 'vue';
import type { ShwRemoteOption, ShwRemoteProps, ShwRemoteValue } from './types';
function values(value: ShwRemoteValue): string[] { return value == null ? [] : Array.isArray(value) ? [...new Set(value.flat())] : [value]; }
function merge(primary: ShwRemoteOption[], extra: ShwRemoteOption[]): ShwRemoteOption[] {
  const result = new Map(primary.map(item => [item.value, item]));
  for (const item of extra) {
    const found = result.get(item.value);
    if (!found) result.set(item.value, item);
    else if (found.children || item.children) result.set(item.value, { ...found, children: merge(found.children ?? [], item.children ?? []) });
  }
  return [...result.values()];
}
function selectedBranches(items: ShwRemoteOption[], selected: Set<string>): ShwRemoteOption[] {
  return items.flatMap(item => {
    const children = selectedBranches(item.children ?? [], selected);
    if (selected.has(item.value)) return [{...item, ...(item.children ? {children} : {})}];
    return children.length ? [{ ...item, children }] : [];
  });
}
function contains(items: ShwRemoteOption[], value: string): boolean { return items.some(item => item.value === value || contains(item.children ?? [], value)); }
function validate(items: ShwRemoteOption[]) {
  const seen = new Set<string>();
  const scan = (nodes: ShwRemoteOption[]) => { for (const item of nodes) {
    if (typeof item.value !== 'string' || typeof item.label !== 'string' || seen.has(item.value)) throw new Error('选项需要唯一的字符串 value 和 label');
    seen.add(item.value); if (item.children) scan(item.children);
  } }; scan(items);
}
export function useRemoteOptions(props: ShwRemoteProps) {
  const loading = ref(false); const error = ref(''); const keyword = ref('');
  const defaults = shallowRef<ShwRemoteOption[]>([]); const results = shallowRef<ShwRemoteOption[]>([]); const echo = shallowRef<ShwRemoteOption[]>([]);
  const options = computed(() => merge(keyword.value ? results.value : defaults.value, echo.value));
  function echoValues(): string[] {
    const value=props.modelValue;
    if(!props.emitPath || !Array.isArray(value)) return values(value);
    return (Array.isArray(value[0]) ? (value as string[][]).map(path=>path.at(-1)) : [value.at(-1)]).filter((item): item is string=>typeof item==='string');
  }
  let disposed=false;
  let sequence = 0; let controller: AbortController | undefined; let timer: ReturnType<typeof setTimeout> | undefined;
  function cancel() { ++sequence; controller?.abort(); if (timer) clearTimeout(timer); timer = undefined; }
  async function load(): Promise<boolean> {
    if(disposed)return false;
    cancel(); const current = sequence;
    if (props.ready === false) { loading.value = false; return false; }
    const request = new AbortController(); controller = request; loading.value = true; error.value = '';
    echo.value = selectedBranches(merge(options.value, echo.value), new Set(echoValues()));
    const search = keyword.value;
    try {
      const items = await props.loadOptions({ keyword: search, selectedValues: values(props.modelValue), signal: request.signal });
      if (current !== sequence || request.signal.aborted) return false;
      validate(items);
      echo.value = selectedBranches(merge(items, echo.value), new Set(echoValues()));
      if (search) results.value = items; else defaults.value = items;
      return true;
    } catch (cause) {
      if (current === sequence && !request.signal.aborted) error.value = cause instanceof Error ? cause.message : '选项加载失败，请重试';
      return false;
    } finally { if (current === sequence) loading.value = false; }
  }
  function search(value: string) {
    if(disposed)return;
    // Cancel now, before debounce expires, so a previous response cannot enter a new search context.
    echo.value = selectedBranches(options.value, new Set(echoValues()));
    cancel(); keyword.value = value.trim(); error.value = '';
    if (!keyword.value && defaults.value.length) { results.value = []; loading.value = false; return; }
    if (props.ready === false) { loading.value = false; return; }
    loading.value = true;
    timer = setTimeout(() => { timer = undefined; void load(); }, props.debounce ?? 200);
  }
  function prepareSearch(value: string) {
    if(disposed)return;
    echo.value=selectedBranches(options.value,new Set(echoValues()));
    cancel();keyword.value=value.trim();error.value='';loading.value=props.ready!==false&&!!keyword.value;
  }
  async function searchNow(value: string) { if(disposed)return false; keyword.value = value.trim(); return load(); }
  function refresh() { return load(); }
  function restoreDefaults() { if (keyword.value) search(''); }
  watch(() => [props.ready, props.contextKey], () => {
    cancel(); keyword.value = ''; defaults.value = []; results.value = []; echo.value = []; error.value = ''; loading.value = false;
    if (props.ready !== false) void load();
  }, { immediate: true, flush: 'sync' });
  watch(() => JSON.stringify(values(props.modelValue)), () => {
    echo.value = selectedBranches(options.value, new Set(echoValues()));
    if (props.ready !== false && values(props.modelValue).some(value => !contains(options.value, value))) void load();
  });
  onBeforeUnmount(() => { disposed=true; cancel(); });
  return { options, loading, error, keyword, search, prepareSearch, searchNow, refresh, restoreDefaults };
}
