<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ShwPageContainer, ShwDetailSection, ShwDescriptions, type ShwDescriptionColumn } from '@shwkj/shw-wui';
import { categoryLabel, errorMessage, getRecord, isAbort, type ExampleRecord } from '../mock/api';
const route = useRoute(); const router = useRouter(); const detail = ref<ExampleRecord>(); const error = ref(''); const loading = ref(false);
const columns: ShwDescriptionColumn[] = [{prop:'id',label:'编号',copy:true},{prop:'name',label:'名称'},{prop:'category',label:'分类',cellRenderer:({value})=>categoryLabel(String(value))},{prop:'amount',label:'金额（元）'},{prop:'status',label:'状态',slot:'status'}];
let sequence = 0; let controller: AbortController | undefined;
async function load() {
  const current = ++sequence; controller?.abort(); const request = new AbortController(); controller = request; error.value = ''; loading.value = true; detail.value = undefined;
  try { const result = await getRecord(String(route.params.id), request.signal); if (current === sequence) detail.value = result; }
  catch (cause) { if (current === sequence && !isAbort(cause)) error.value = errorMessage(cause); }
  finally { if (current === sequence) loading.value = false; }
}
watch(() => route.params.id, () => void load(), { immediate: true });
onBeforeUnmount(() => { ++sequence; controller?.abort(); });
</script>
<template><ShwPageContainer title="记录详情"><div class="starter-stack"><div><el-button @click="router.push('/examples')">返回列表</el-button></div><el-alert v-if="error" :title="error" type="error" :closable="false"><el-button @click="load">重新加载</el-button></el-alert><ShwDetailSection v-loading="loading" title="基本信息"><ShwDescriptions v-if="detail" :data="[{...detail}]" :columns="columns" :column="2" border><template #status="{value}"><el-tag :type="value === 'enabled' ? 'success' : 'danger'">{{value === 'enabled' ? '启用' : '停用'}}</el-tag></template></ShwDescriptions><el-empty v-else-if="!loading && !error" description="暂无详情" /></ShwDetailSection><ShwDetailSection v-if="detail" title="详细说明"><p>{{ detail.description || '暂无说明' }}</p></ShwDetailSection></div></ShwPageContainer></template>
