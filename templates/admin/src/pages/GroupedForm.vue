<script setup lang="ts">
import { computed, onBeforeUnmount, reactive, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus';
import { ShwPageContainer, ShwFormSection, useAdmin } from '@shwkj/shw-wui';
import { categories, delay, errorMessage, isAbort } from '../mock/api';
const admin = useAdmin();
const defaults = () => ({ name: '', code: '', category: 'office', status: 'enabled', contact: '', phone: '', address: '', note: '' });
const form = reactive(defaults()); const baseline = ref(JSON.stringify(form)); const dirty = computed(() => JSON.stringify(form) !== baseline.value);
const formRef = ref<FormInstance>(); const pending = ref(false); const error = ref(''); let controller: AbortController | undefined;
const rules: FormRules = {
  name: [{ required: true, whitespace: true, message: '请输入方案名称', trigger: 'blur' }],
  code: [{ required: true, message: '请输入方案编号', trigger: 'blur' }, { pattern: /^[A-Za-z0-9-]+$/, message: '编号只允许字母、数字和短横线', trigger: 'blur' }],
  contact: [{ required: true, whitespace: true, message: '请输入联系人', trigger: 'blur' }],
  phone: [{ pattern: /^1\d{10}$/, message: '请输入11位手机号码', trigger: 'blur' }],
};
async function submit() {
  if (pending.value || !admin.can('example:write')) return;
  const valid = await formRef.value?.validate().catch(() => false);
  if (!valid) { formRef.value?.$el.querySelector('.is-error input')?.focus(); return; }
  if (pending.value) return;
  pending.value = true; error.value = ''; const request = new AbortController(); controller = request;
  try { const payload = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, value.trim()])); await delay(request.signal); if (payload.name === '失败') throw new Error('模拟提交失败，已保留输入内容'); if (request.signal.aborted) return; Object.assign(form, payload); baseline.value = JSON.stringify(form); ElMessage.success('分组表单保存成功（模拟，不持久化）'); }
  catch (cause) { if (!isAbort(cause)) error.value = errorMessage(cause); }
  finally { if (!request.signal.aborted) pending.value = false; }
}
async function reset() {
  if (pending.value) return;
  if (dirty.value) { try { await ElMessageBox.confirm('修改尚未保存，确定重置？', '重置表单', { confirmButtonText: '重置', cancelButtonText: '继续编辑' }); } catch (cause) { if (cause !== 'cancel' && cause !== 'close') ElMessage.error(errorMessage(cause)); return; } }
  Object.assign(form, defaults()); baseline.value = JSON.stringify(form); error.value = ''; formRef.value?.clearValidate();
}
onBeforeRouteLeave(async () => {
  if (pending.value) { ElMessage.warning('正在保存，请稍候'); return false; }
  if (!dirty.value) return true;
  try { await ElMessageBox.confirm('修改尚未保存，确定离开？', '离开页面', { confirmButtonText: '离开', cancelButtonText: '继续编辑' }); return true; }
  catch (cause) { if (cause !== 'cancel' && cause !== 'close') ElMessage.error(errorMessage(cause)); return false; }
});
onBeforeUnmount(() => controller?.abort());
</script>
<template><ShwPageContainer title="分组表单"><div class="starter-stack"><el-alert title="独立表单页示例：仅模拟提交，不持久化保存" type="info" :closable="false" /><el-alert v-if="error" :title="error" type="error" :closable="false" /><el-form ref="formRef" :model="form" :rules="rules" label-width="100px" :disabled="pending" class="starter-form" @submit.prevent="submit"><div class="starter-stack"><ShwFormSection :columns="2" title="基本信息"><el-form-item label="方案名称" prop="name"><el-input v-model="form.name" maxlength="60" placeholder="输入“失败”体验保存错误" /></el-form-item><el-form-item label="方案编号" prop="code"><el-input v-model="form.code" maxlength="32" /></el-form-item><el-form-item label="所属分类"><el-select v-model="form.category"><el-option v-for="item in categories" :key="item.id" :label="item.label" :value="item.id" /></el-select></el-form-item><el-form-item label="状态"><el-radio-group v-model="form.status"><el-radio value="enabled">启用</el-radio><el-radio value="disabled">停用</el-radio></el-radio-group></el-form-item></ShwFormSection><ShwFormSection :columns="2" title="联系信息"><el-form-item label="联系人" prop="contact"><el-input v-model="form.contact" maxlength="30" /></el-form-item><el-form-item label="手机号码" prop="phone"><el-input v-model="form.phone" inputmode="tel" maxlength="11" /></el-form-item><el-form-item label="联系地址"><el-input v-model="form.address" maxlength="200" /></el-form-item><el-form-item label="备注"><el-input v-model="form.note" type="textarea" :rows="3" maxlength="500" /></el-form-item></ShwFormSection><div class="starter-actions"><el-button type="primary" native-type="submit" :loading="pending">保存</el-button><el-button @click="reset">重置</el-button></div></div></el-form></div></ShwPageContainer></template>
