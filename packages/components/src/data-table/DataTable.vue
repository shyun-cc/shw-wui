<!-- See LICENSES/pure-admin-thin.MIT.txt for third-party attribution. -->
<script setup lang="ts">
import { ElButton, ElPagination, vLoading } from 'element-plus';
import { ShwTable } from '../owned-table';

defineOptions({ name: 'ShwDataTable', inheritAttrs: false });
withDefaults(defineProps<{
  data: object[];
  loading?: boolean;
  total: number;
  page: number;
  pageSize: number;
  error?: string;
  filtered?: boolean;
  emptyText?: string;
  rowKey?: string;
}>(), { loading: false, rowKey: 'id' });
const emit = defineEmits<{
  'update:page': [value: number];
  'update:pageSize': [value: number];
  retry: [];
}>();
function onPageChange(value: number) { emit('update:page', value); }
function onPageSizeChange(value: number) {
  emit('update:page', 1);
  emit('update:pageSize', value);
}
const pagination: { onPageChange: (value: number) => void; onPageSizeChange: (value: number) => void } = {
  onPageChange,
  onPageSizeChange
};
defineExpose<{ pagination: typeof pagination }>({ pagination });
</script>

<template>
  <section class="shw-data-table" aria-label="数据列表">
    <div v-if="error" class="shw-data-table__error" role="alert">
      <span>{{ error }}</span>
      <ElButton type="primary" link :disabled="loading" @click="emit('retry')">重试</ElButton>
    </div>
    <div v-loading="loading" class="shw-data-table__body" :aria-busy="loading">
      <ShwTable v-bind="$attrs" :data="data" :row-key="rowKey" :empty-text="emptyText || (filtered ? '暂无查询结果' : '暂无数据')">
        <slot />
      </ShwTable>
    </div>
    <div class="shw-data-table__pagination">
      <slot name="pagination" :page="page" :page-size="pageSize" :total="total" :on-page-change="onPageChange" :on-page-size-change="onPageSizeChange">
        <ElPagination
          :current-page="page"
          :page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50, 100]"
          :disabled="loading"
          layout="total, sizes, prev, pager, next, jumper"
          @update:current-page="onPageChange"
          @update:page-size="onPageSizeChange"
        />
      </slot>
    </div>
  </section>
</template>

<style scoped>
.shw-data-table { min-width: 0; color: var(--el-text-color-primary); font-size: 14px; }
.shw-data-table__body { min-width: 0; }
.shw-data-table__body :deep(.el-table__header th) { background: var(--el-fill-color-light); font-weight: 600; }
.shw-data-table__error { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-bottom: 12px; padding: 12px; color: var(--el-color-danger); background: var(--el-color-danger-light-9); border-radius: 4px; overflow-wrap: anywhere; }
.shw-data-table__pagination { display: flex; justify-content: flex-end; margin-top: 16px; overflow-x: auto; }
</style>
