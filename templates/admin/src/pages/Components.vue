<script setup lang="ts">
import { computed, onBeforeUnmount, reactive, ref, watch } from 'vue';
import { h } from 'vue';
import { ElMessage } from 'element-plus';
import { ShwPageContainer, ShwDetailSection, ShwFormSection, ShwDetailDrawer, ShwDescriptions, createShwTable, ShwRemoteSelect, ShwRemoteTreeSelect, ShwRemoteCascader, ShwLoadState, ShwStatusTag, ShwConfirmAction, ShwUploadField, type ShwStatusOption, type ShwUpload, type ShwUploadFile, type ShwOptionLoader, type ShwRemoteOption, type ShwTableColumn, type ShwDescriptionColumn } from '@shwkj/shw-wui';
import { cloneDeep, dateFormat, formatBytes, debounce } from '@shwkj/shw-wui/utils';
import { delay, errorMessage, getRecord, isAbort, type ExampleRecord } from '../mock/api';
defineOptions({ name:'StarterComponents' });
const statusOptions: ShwStatusOption[] = [{ value: 0, label: '待处理', type: 'warning' }, { value: 1, label: '已完成', type: 'success' }, { value: false, label: '已停用', type: 'danger' }];
const confirmFail = ref(false);const confirmCount = ref(0);
async function confirmExample() { await delay(); if (confirmFail.value) throw new Error('模拟删除失败，关闭失败开关后可重试'); confirmCount.value++; }
const uploadFiles = ref<ShwUploadFile[]>([]);const imageFiles = ref<ShwUploadFile[]>([]);const uploadFail = ref(false);const uploadDisabled = ref(false);
const localUrls = new Set<string>();let uploadId = 0;
const uploadExample: ShwUpload = async (file, {signal, onProgress}) => {
  for (const percent of [20, 50, 80]) { await delay(signal); onProgress(percent); }
  if (uploadFail.value) throw new Error('模拟上传失败，关闭失败开关后点击重试');
  signal.throwIfAborted();
  const url = URL.createObjectURL(file);localUrls.add(url);
  return {id: String(++uploadId), name: file.name, url, size: file.size, type: file.type};
};
function releaseFile(file: ShwUploadFile) { URL.revokeObjectURL(file.url);localUrls.delete(file.url); }
onBeforeUnmount(() => { for (const url of localUrls) URL.revokeObjectURL(url); });
const ready=ref(true);const context=ref('all');const fail=ref(false);
const choice=ref<string>('1125');const treeChoice=ref<string>();const pathChoice=ref<string>();
const allOptions:ShwRemoteOption[]=Array.from({length:140},(_,i)=>({value:String(1001+i),label:`${i%2 ? '办公' : '设备'}选项 ${i+1}`}));
const selectedDescription=computed(()=>allOptions.find(item=>item.value===choice.value)?.label||'未选择');
watch(context,()=>{choice.value='';treeChoice.value=undefined;pathChoice.value=undefined;});
const loadOptions:ShwOptionLoader=async ({keyword,selectedValues,signal})=>{
  await delay(signal);if(fail.value||keyword==='失败')throw new Error('模拟加载失败，关闭失败开关后点击刷新可重试');
  const allowed=allOptions.filter((_,i)=>context.value==='all'||(context.value==='office'?i%2===1:i%2===0));
  const result=allowed.filter(item=>item.label.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())).slice(0,12);
  for(const value of selectedValues){const echo=allowed.find(item=>item.value===value);if(echo&&!result.some(item=>item.value===value))result.push(echo);}
  return cloneDeep(result);
};
const loadTree:ShwOptionLoader=async query=>{
  const options=await loadOptions(query);
  return [{value:'group-device',label:'设备分类',children:options.filter(item=>item.label.startsWith('设备'))},{value:'group-office',label:'办公分类',children:options.filter(item=>item.label.startsWith('办公'))}].filter(group=>group.children.length);
};
interface Row {id:string;name:string;amount:string;enabled:boolean}
const RowTable=createShwTable<Row>();
const allRows:Row[]=Array.from({length:24},(_,i)=>({id:String(1001+i),name:`配置表格记录 ${i+1}`,amount:String((i+1)*10)+'.00',enabled:i%3!==0}));
const pagination=reactive({currentPage:1,pageSize:5,total:allRows.length});
const rows=computed(()=>allRows.slice((pagination.currentPage-1)*pagination.pageSize,pagination.currentPage*pagination.pageSize));
const selectedCount=ref(0);
const columns:ShwTableColumn<Row>[]=[
 {type:'selection',width:48},
 {label:'基础信息',children:[{prop:'id',label:'编号',width:90},{prop:'name',label:'名称',minWidth:160,showOverflowTooltip:true}]},
 {prop:'amount',label:'金额',width:110,align:'right'},
 {prop:'enabled',label:'状态',width:100,cellRenderer:({row})=>h('span',row.enabled?'启用':'停用')},
 {label:'操作',slot:'operation',fixed:'right',width:110}
];
function selectionChanged(items:Row[]){selectedCount.value=items.length;}
function pageChanged(value:number){pagination.currentPage=value;selectedCount.value=0;}
function sizeChanged(value:number){pagination.pageSize=value;pagination.currentPage=1;selectedCount.value=0;}
const drawer=ref(false);const loadingDetail=ref(false);const detail=ref<ExampleRecord>();const detailError=ref('');let controller:AbortController|undefined;let sequence=0;let currentId='';let alive=true;
const descriptionColumns:ShwDescriptionColumn[]=[{prop:'id',label:'编号',copy:true},{prop:'name',label:'名称'},{prop:'amount',label:'金额（元）'},{prop:'description',label:'详细说明',span:2}];
async function openDetail(id:string){
 currentId=id;const current=++sequence;controller?.abort();const request=new AbortController();controller=request;drawer.value=true;loadingDetail.value=true;detailError.value='';detail.value=undefined;
 try{const value=await getRecord(id,request.signal);if(current===sequence&&drawer.value)detail.value=value;}catch(cause){if(current===sequence&&!isAbort(cause))detailError.value=errorMessage(cause);}finally{if(current===sequence)loadingDetail.value=false;}
}
watch(drawer,value=>{if(!value){++sequence;controller?.abort();loadingDetail.value=false;}});
onBeforeUnmount(()=>{alive=false;++sequence;controller?.abort();});
const form=reactive({name:'分区容器示例',note:'所有数据均为模拟'});
const state=ref<'content'|'loading'|'error'|'empty'|'filtered'>('content');
const utilInput=ref('');const utilOutput=ref('');
const updateOutput=debounce((value:string)=>{if(alive)utilOutput.value=value;},250);
function updateInput(value:string){utilInput.value=value;updateOutput(value);}
</script>
<template><ShwPageContainer title="通用组件与源码接管"><div class="starter-stack">
 <el-alert title="本页使用本仓库实际接管的表格、描述与工具实现；选择器和详情接口均为隔离模拟数据" type="info" :closable="false" />
 <ShwDetailSection title="状态与枚举色标"><div class="starter-actions"><ShwStatusTag v-for="value in [0,1,false,99]" :key="String(value)" :value="value" :options="statusOptions"/><ShwStatusTag :value="null" :options="statusOptions" fallback-label="未设置"/></div><p class="starter-help">映射由页面传入；0、false与未知值分别展示。</p></ShwDetailSection>
 <ShwDetailSection title="危险操作确认与防重"><div class="starter-actions"><el-checkbox v-model="confirmFail">模拟操作失败</el-checkbox><ShwConfirmAction message="确定删除模拟记录「通用组件示例」？" :on-confirm="confirmExample" @success="ElMessage.success('模拟删除成功')"/><ShwConfirmAction title="批量操作确认" message="确定删除选中的 3 条模拟记录？" :on-confirm="confirmExample" @success="ElMessage.success('模拟批量操作成功')"><template #trigger="{open,loading,disabled}"><el-button link type="danger" :loading="loading" :disabled="disabled" @click="open">自定义触发入口</el-button></template></ShwConfirmAction></div><p>模拟操作成功 {{confirmCount}} 次。提交中不能重复确认或关闭；失败保留弹窗。</p></ShwDetailSection>
 <ShwDetailSection title="自定义上传、文件列表与图片预览"><div class="starter-stack"><div class="starter-actions"><el-checkbox v-model="uploadFail">模拟上传失败</el-checkbox><el-checkbox v-model="uploadDisabled">禁用父表单</el-checkbox></div><el-alert title="仅在浏览器创建临时文件地址，不请求后端；刷新或离开页面后失效。移除仅修改表单列表。" type="info" :closable="false"/><el-form label-width="90px" :disabled="uploadDisabled"><el-form-item label="文件"><ShwUploadField v-model="uploadFiles" :upload="uploadExample" multiple :limit="3" :max-size="5*1024*1024" @remove="releaseFile"><template #tip><p class="starter-help">最多3个文件，每个不超过5MiB；可取消、失败重试、打开或移除。</p></template></ShwUploadField></el-form-item><el-form-item label="图片"><ShwUploadField v-model="imageFiles" :upload="uploadExample" accept="image/*" multiple :limit="3" :max-size="5*1024*1024" @remove="releaseFile"><template #tip><p class="starter-help">选择图片后查看缩略图与预览。</p></template></ShwUploadField></el-form-item></el-form></div></ShwDetailSection>
 <ShwDetailSection title="远程选择、已选回显与依赖切换"><div class="starter-stack">
  <div class="starter-actions"><el-checkbox v-model="ready">依赖已就绪</el-checkbox><el-checkbox v-model="fail">模拟加载失败</el-checkbox><el-select v-model="context" aria-label="选项上下文" style="width:160px"><el-option label="全部分类" value="all"/><el-option label="办公分类" value="office"/><el-option label="设备分类" value="device"/></el-select></div>
  <el-form label-width="100px" :disabled="!ready"><ShwFormSection title="选择器" :columns="1"><el-form-item label="远程下拉"><ShwRemoteSelect v-model="choice" :load-options="loadOptions" :context-key="context" :ready="ready"/></el-form-item><el-form-item label="远程树"><ShwRemoteTreeSelect v-model="treeChoice" :load-options="loadTree" :context-key="context" :ready="ready"/></el-form-item><el-form-item label="远程级联"><ShwRemoteCascader v-model="pathChoice" :load-options="loadTree" :context-key="context" :ready="ready"/></el-form-item></ShwFormSection></el-form>
  <p class="starter-help">默认仅返回12项，初始值1125不在默认结果中，由加载函数额外补齐。当前：{{selectedDescription}}。搜索“失败”可体验错误；切换分类会清空父表单值并取消旧请求。</p>
 </div></ShwDetailSection>
 <ShwDetailSection title="源码接管表格：配置列、嵌套表头、renderer、命名槽与分页"><p>当前选择 {{selectedCount}} 项；点击详情按ID重新加载并打开通用抽屉。</p><RowTable :data="rows" :columns="columns" :pagination="pagination" row-key="id" border @selection-change="selectionChanged" @page-current-change="pageChanged" @page-size-change="sizeChanged"><template #operation="{row}"><el-button link type="primary" @click="openDetail(row.id)">详情</el-button></template></RowTable></ShwDetailSection>
 <el-form :model="form" label-width="80px"><ShwFormSection title="表单分区" description="继承同一父表单，不创建嵌套 form" :columns="2"><el-form-item label="名称"><el-input v-model="form.name"/></el-form-item><el-form-item label="说明"><el-input v-model="form.note"/></el-form-item></ShwFormSection></el-form>
 <ShwDetailSection title="加载、失败与查询空态"><el-radio-group v-model="state"><el-radio-button value="content">内容</el-radio-button><el-radio-button value="loading">加载</el-radio-button><el-radio-button value="error">失败</el-radio-button><el-radio-button value="empty">无数据</el-radio-button><el-radio-button value="filtered">无查询结果</el-radio-button></el-radio-group><ShwLoadState :loading="state==='loading'" :empty="state==='empty'||state==='filtered'||state==='loading'" :filtered="state==='filtered'" :error="state==='error'?'模拟请求失败，可点击重试':undefined" @retry="state='content'"><p>已有内容保留在组件默认插槽中。</p></ShwLoadState></ShwDetailSection>
 <ShwDetailSection title="自有工具入口"><p>日期格式：{{dateFormat('YYYY-MM-DD')}}；字节格式：{{formatBytes(1048576)}}</p><el-input :model-value="utilInput" placeholder="输入文字，体验250ms防抖" @update:model-value="updateInput"/><p>防抖结果：{{utilOutput||'等待输入'}}</p><p class="starter-help">167个普通运行导出与独立useECharts入口已接管；原始TS仓库不可取的来源限制和迁移差异见项目文档。普通工具入口不强制引入图表依赖。</p></ShwDetailSection>
 <ShwDetailDrawer v-model="drawer" title="记录详情" :loading="loadingDetail" :error="detailError" @retry="openDetail(currentId)" @closed="detail=undefined"><ShwDescriptions v-if="detail" :data="[{...detail}]" :columns="descriptionColumns" :column="2" border @copy-error="()=>ElMessage.error('复制失败，请重试')"/></ShwDetailDrawer>
</div></ShwPageContainer></template>
