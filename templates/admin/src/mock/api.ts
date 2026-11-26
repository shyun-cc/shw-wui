export interface ExampleRecord { id: string; name: string; category: string; amount: string; status: 'enabled' | 'disabled'; description: string }
export type ExampleInput = Omit<ExampleRecord, 'id'>;
export const categories = [{ id: 'office', label: '办公用品' }, { id: 'device', label: '电子设备' }];
let records: ExampleRecord[] = Array.from({ length: 24 }, (_, index) => ({ id: String(1001 + index), name: `示例记录 ${index + 1}`, category: index % 2 ? 'office' : 'device', amount: `${(index + 1) * 10}.00`, status: index % 3 ? 'enabled' : 'disabled', description: '独立详情响应中的完整说明。所有数据仅在本次页面运行中保存。' }));
let nextId = 1025;
export function delay(signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) { reject(new DOMException('请求已取消', 'AbortError')); return; }
    const cancel = () => { clearTimeout(timer); reject(new DOMException('请求已取消', 'AbortError')); };
    const timer = setTimeout(() => { signal?.removeEventListener('abort', cancel); resolve(); }, 250);
    signal?.addEventListener('abort', cancel, { once: true });
  });
}
export function isAbort(error: unknown) { return error instanceof DOMException && error.name === 'AbortError'; }
export function errorMessage(error: unknown) { return error instanceof Error ? error.message : '操作失败，请重试'; }
export async function listRecords(query: { name: string; status: string; category: string; page: number; pageSize: number }, signal: AbortSignal) {
  await delay(signal);
  if (query.name === '失败') throw new Error('模拟查询失败，请修改条件或重试');
  const filtered = records.filter(record => record.name.toLocaleLowerCase().includes(query.name.toLocaleLowerCase()) && (!query.status || record.status === query.status) && (!query.category || record.category === query.category));
  return { data: filtered.slice((query.page - 1) * query.pageSize, query.page * query.pageSize).map(record => ({ ...record })), total: filtered.length };
}
export async function getRecord(id: string, signal: AbortSignal): Promise<ExampleRecord> {
  await delay(signal); const record = records.find(item => item.id === id); if (!record) throw new Error(`记录 ${id} 不存在或已删除`); return { ...record };
}
export async function saveRecord(id: string | undefined, input: ExampleInput, signal: AbortSignal) {
  await delay(signal); if (input.name.trim() === '失败') throw new Error('模拟保存失败，输入内容已保留');
  const value = { ...input, name: input.name.trim(), description: input.description.trim() };
  if (id) { const index = records.findIndex(record => record.id === id); if (index < 0) throw new Error('记录已删除，请刷新后重试'); records[index] = { ...value, id }; }
  else records.push({ ...value, id: String(nextId++) });
}
export async function deleteRecord(id: string, signal: AbortSignal) { await delay(signal); records = records.filter(record => record.id !== id); }
export const emptyInput = (): ExampleInput => ({ name: '', category: 'office', amount: '0.00', status: 'enabled', description: '' });
export function categoryLabel(id: string) { return categories.find(item => item.id === id)?.label || id; }
