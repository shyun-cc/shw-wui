<script setup lang="ts">
import { computed, onBeforeUnmount, reactive, ref, watch } from 'vue';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus';
import { ShwPageContainer, ShwQueryPanel, ShwListToolbar, ShwDataTable, ShwFormDialog, ShwPermission, useAdmin } from '@shwkj/shw-wui';
import { categories, categoryLabel, deleteRecord, emptyInput, errorMessage, getRecord, isAbort, listRecords, saveRecord, type ExampleRecord } from '../mock/api';
defineOptions({ name: 'StarterList' });
const props = withDefaults(defineProps<{ category?: string; embedded?: boolean }>(), { category: '', embedded: false });
const admin = useAdmin(); const router = useRouter();
const query = reactive({ name: '', status: '' });
const applied = reactive({ name: '', status: '' });
const page = ref(1); const pageSize = ref(10); const data = ref<ExampleRecord[]>([]); const total = ref(0); const loading = ref(false); const error = ref('');
let listController: AbortController | undefined; let listSequence = 0;
async function load() {
  const sequence = ++listSequence; listController?.abort(); const controller = new AbortController(); listController = controller; loading.value = true; error.value = '';
  try {
    const result = await listRecords({ ...applied, category: props.category, page: page.value, pageSize: pageSize.value }, controller.signal);
    if (sequence !== listSequence) return;
    const lastPage = Math.max(1, Math.ceil(result.total / pageSize.value));
    if (page.value > lastPage) { page.value = lastPage; return; }
    data.value = result.data; total.value = result.total;
  } catch (cause) { if (sequence === listSequence && !isAbort(cause)) error.value = errorMessage(cause); }
  finally { if (sequence === listSequence) loading.value = false; }
}
function search() { Object.assign(applied, { name: query.name.trim(), status: query.status }); if (page.value === 1) void load(); else page.value = 1; }
function reset() { Object.assign(query, { name: '', status: '' }); search(); }
watch([page, pageSize], () => void load());
watch(() => props.category, () => { if (page.value === 1) void load(); else page.value = 1; }, { immediate: true });
function changeSize(value: number) { pageSize.value = value; page.value = 1; }
const dialogRef = ref<{ requestClose(): Promise<boolean> }>();
const visible = ref(false); const editingId = ref<string>(); const draft = reactive(emptyInput()); const baseline = ref(''); const formRef = ref<FormInstance>();
const detailLoading = ref(false); const detailReady = ref(false); const saving = ref(false); const formError = ref('');
const dirty = computed(() => !detailLoading.value && JSON.stringify(draft) !== baseline.value);
let detailController: AbortController | undefined; let detailSequence = 0; let writeController: AbortController | undefined;
const rules: FormRules = {
  name: [{ required: true, whitespace: true, message: '请输入名称', trigger: 'blur' }],
  category: [{ required: true, message: '请选择分类', trigger: 'change' }],
  amount: [{ required: true, message: '请输入金额', trigger: 'blur' }, { pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/, message: '请输入非负金额，最多两位小数', trigger: 'blur' }],
};
async function open(id?: string) {
  if (!admin.can('example:write') || saving.value) return;
  const sequence = ++detailSequence; detailController?.abort(); editingId.value = id; Object.assign(draft, emptyInput()); baseline.value = JSON.stringify(draft); formError.value = ''; visible.value = true; detailReady.value = !id;
  detailLoading.value = Boolean(id);
  if (!id) return;
  const controller = new AbortController(); detailController = controller;
  try { const record = await getRecord(id, controller.signal); if (sequence === detailSequence && visible.value) { const { id: ignoredId, ...input } = record; Object.assign(draft, input); baseline.value = JSON.stringify(draft); detailReady.value = true; } }
  catch (cause) { if (sequence === detailSequence && !isAbort(cause)) formError.value = errorMessage(cause); }
  finally { if (sequence === detailSequence) detailLoading.value = false; }
}
function closed() { ++detailSequence; detailController?.abort(); writeController?.abort(); Object.assign(draft, emptyInput()); baseline.value = JSON.stringify(draft); editingId.value = undefined; formError.value = ''; detailLoading.value = false; detailReady.value = false; formRef.value?.clearValidate(); }
watch(visible, value => { if (!value) { ++detailSequence; detailController?.abort(); } });
async function save() {
  if (saving.value || detailLoading.value || !admin.can('example:write') || !detailReady.value) return;
  const sequence = detailSequence;
  const valid = await formRef.value?.validate().catch(() => false);
  if (!valid) { formRef.value?.$el.querySelector('.is-error input')?.focus(); return; }
  if (saving.value || !visible.value || sequence !== detailSequence) return;
  saving.value = true; formError.value = ''; const controller = new AbortController(); writeController = controller;
  try { await saveRecord(editingId.value, { ...draft }, controller.signal); if (controller.signal.aborted) return; baseline.value = JSON.stringify(draft); visible.value = false; ElMessage.success('保存成功（模拟）'); void load(); }
  catch (cause) { if (!isAbort(cause)) formError.value = errorMessage(cause); }
  finally { saving.value = false; }
}
let alive = true;
const deleting = ref(''); let deleteController: AbortController | undefined;
async function remove(id: string) {
  if (deleting.value || !admin.can('example:write')) return;
  deleting.value = id;
  try {
    await ElMessageBox.confirm(`确定删除记录「${id}」？`, '删除记录', { type: 'warning', confirmButtonText: '删除', cancelButtonText: '取消' });
    if (!alive) return;
    const controller = new AbortController(); deleteController = controller;
    await deleteRecord(id, controller.signal); if (controller.signal.aborted) return; ElMessage.success('删除成功（模拟）'); void load();
  } catch (cause) { if (cause !== 'cancel' && cause !== 'close' && !isAbort(cause)) ElMessage.error(errorMessage(cause)); }
  finally { deleting.value = ''; }
}
onBeforeRouteLeave(async () => {
  if (saving.value) { ElMessage.warning('正在保存，请稍候'); return false; }
  if (!visible.value) return true;
  try {
    const allowed = await dialogRef.value?.requestClose();
    if (!allowed) return false;
    ++detailSequence; detailController?.abort();
    return true;
  } catch (cause) { ElMessage.error(errorMessage(cause)); return false; }
});
onBeforeUnmount(() => { alive = false; ++listSequence; ++detailSequence; listController?.abort(); detailController?.abort(); writeController?.abort(); deleteController?.abort(); });
</script>
<template>
  <component :is="embedded ? 'div' : ShwPageContainer" class="shw-pc-theme" :title="embedded ? undefined : '标准列表'"><div class="starter-stack">
    <ShwQueryPanel :model="query" label-width="56px" :active-count="Number(Boolean(applied.name)) + Number(Boolean(applied.status))" @submit="search">
      <el-form-item label="名称"><el-input v-model="query.name" placeholder="输入“失败”体验错误" clearable /></el-form-item>
      <el-form-item label="状态"><el-select v-model="query.status" placeholder="全部状态" clearable style="width:160px"><el-option label="启用" value="enabled" /><el-option label="停用" value="disabled" /></el-select></el-form-item>
      <template #actions><el-button type="primary" @click="search">查询</el-button><el-button @click="reset">重置</el-button></template>
    </ShwQueryPanel>
    <div><ShwListToolbar title="示例记录"><template #actions><ShwPermission permission="example:write"><el-button type="primary" @click="open()">新增记录</el-button></ShwPermission><el-button :loading="loading" @click="load">刷新</el-button></template></ShwListToolbar>
      <ShwDataTable :data="data" :total="total" :page="page" :page-size="pageSize" :loading="loading" :error="error" :filtered="Boolean(applied.name || applied.status || category)" row-key="id" @update:page="page = $event" @update:page-size="changeSize" @retry="load">
        <el-table-column prop="id" label="编号" width="90" /><el-table-column prop="name" label="名称" min-width="160" show-overflow-tooltip />
        <el-table-column label="分类" width="120"><template #default="scope">{{ categoryLabel(scope.row.category) }}</template></el-table-column>
        <el-table-column prop="amount" label="金额（元）" width="120" align="right" />
        <el-table-column label="状态" width="90"><template #default="scope"><el-tag :type="scope.row.status === 'enabled' ? 'success' : 'danger'">{{ scope.row.status === 'enabled' ? '启用' : '停用' }}</el-tag></template></el-table-column>
        <el-table-column label="操作" fixed="right" width="210"><template #default="scope"><el-button link type="primary" @click="router.push(`/examples/${scope.row.id}`)">详情</el-button><ShwPermission permission="example:write"><el-button link type="primary" @click="open(scope.row.id)">编辑</el-button><el-button link type="danger" :loading="deleting === scope.row.id" :disabled="Boolean(deleting)" @click="remove(scope.row.id)">删除</el-button></ShwPermission></template></el-table-column>
      </ShwDataTable>
    </div>
    <p class="starter-help">数据保存在内存中，刷新浏览器后重置。编辑与详情均按字符串 ID 独立读取；金额以字符串传输。</p>
    <ShwFormDialog ref="dialogRef" v-model="visible" :title="editingId ? '编辑记录' : '新增记录'" width="560px" :loading="saving" :dirty="dirty" @submit="save" @closed="closed">
      <el-alert v-if="formError" :title="formError" type="error" :closable="false"><el-button v-if="editingId && !detailReady" @click="open(editingId)">重新加载详情</el-button></el-alert>
      <el-form ref="formRef" v-loading="detailLoading" :model="draft" :rules="rules" label-width="80px" :disabled="saving || detailLoading || !detailReady" @submit.prevent="save">
        <el-form-item label="名称" prop="name"><el-input v-model="draft.name" autofocus maxlength="60" /></el-form-item>
        <el-form-item label="分类" prop="category"><el-select v-model="draft.category"><el-option v-for="item in categories" :key="item.id" :label="item.label" :value="item.id" /></el-select></el-form-item>
        <el-form-item label="金额" prop="amount"><el-input v-model="draft.amount" inputmode="decimal" /></el-form-item>
        <el-form-item label="状态"><el-radio-group v-model="draft.status"><el-radio value="enabled">启用</el-radio><el-radio value="disabled">停用</el-radio></el-radio-group></el-form-item>
        <el-form-item label="说明"><el-input v-model="draft.description" type="textarea" :rows="3" maxlength="500" /></el-form-item>
      </el-form>
    </ShwFormDialog>
  </div></component>
</template>
