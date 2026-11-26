<!-- See LICENSES/pure-admin-thin.MIT.txt for third-party attribution. -->
<script setup lang="ts">
import { ElBadge, ElButton, ElForm, ElFormItem } from "element-plus";
import { Comment, Fragment, Text, h, ref, useId, useSlots, type VNode } from "vue";

defineOptions({ name: "ShwQueryPanel", inheritAttrs: false });
withDefaults(defineProps<{
  model?: Record<string, any>;
  labelWidth?: string | number;
  activeCount?: number;
}>(), { labelWidth: "90px", activeCount: 0 });
const emit = defineEmits<{ submit: [event: Event] }>();
const slots = useSlots();
const expanded = ref(false);
const fieldsId = useId();

// 展开只影响展示，隐藏字段仍挂载，保留下拉预加载、选中值和筛选条件。
function fields(nodes: VNode[] = []): VNode[] {
  return nodes.flatMap(node => {
    if (node.type === Comment || (node.type === Text && !String(node.children ?? "").trim())) return [];
    if (node.type === Fragment && Array.isArray(node.children)) return fields(node.children as VNode[]);
    return [node];
  });
}
function isQueryInput(event: KeyboardEvent) {
  const target = event.target;
  return !event.isComposing && target instanceof HTMLElement && target.tagName === "INPUT";
}
function onKeydown(event: KeyboardEvent) {
  if (isQueryInput(event)) event.preventDefault();
}
function onKeyup(event: KeyboardEvent) {
  if (isQueryInput(event)) emit("submit", event);
}
function fieldCount() { return fields(slots.default?.()).length; }
const QueryFields = () => fields(slots.default?.()).map((node, index) =>
  h("div", {
    class: "query-field",
    key: node.key ?? index,
    style: !expanded.value && index >= 4 ? { display: "none" } : undefined
  }, [node])
);
</script>

<template>
  <section class="query-panel" :class="{ 'query-panel--collapsible': fieldCount() > 4 }" aria-label="查询条件">
    <el-form
      v-bind="$attrs"
      :id="fieldsId"
      :model="model"
      :label-width="labelWidth"
      class="query-panel-form"
      :class="{ 'query-panel-form--collapsible': fieldCount() > 4 }"
      @submit.prevent="emit('submit', $event)"
      @keydown.enter="onKeydown"
      @keyup.enter="onKeyup"
    >
      <QueryFields />
      <el-form-item v-if="slots.actions || fieldCount() > 4" label-width="0" class="query-panel-actions">
        <slot name="actions" />
        <el-button v-if="fieldCount() > 4" link type="primary" :aria-expanded="expanded" :aria-controls="fieldsId" @click="expanded = !expanded">
          {{ expanded ? "收起" : "展开" }}
        </el-button>
        <el-badge v-if="!expanded && activeCount" :value="activeCount" type="primary" class="query-panel-count" />
      </el-form-item>
    </el-form>
  </section>
</template>

<style scoped>
.query-panel {
  flex-shrink: 0;
  margin-bottom: 16px;
  padding: 16px;
  border: 1px solid var(--el-border-color-light);
  border-radius: 4px;
  background: var(--el-bg-color);
}
.query-panel-form {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 32px;
  width: 100%;
}
/* 条件按实际首选宽度排布，为同行操作预留空间，窄容器内允许收缩。 */
.query-panel-form :deep(.query-field) { flex: 0 1 280px; min-width: 0; max-width: 100%; }
/* 日期范围需要同时显示两个端点，按更宽的首选宽度参与同一套换行。 */
.query-panel-form :deep(.query-field:has(.el-date-editor--daterange)),
.query-panel-form :deep(.query-field:has(.el-date-editor--datetimerange)) { flex-basis: 400px; }
.query-panel-form :deep(.el-form-item) { min-width: 0; margin: 0; }
.query-panel-form :deep(.el-form-item__label) { white-space: nowrap; flex-shrink: 0; }
.query-panel-form :deep(.el-form-item__content) { min-width: 0; }
.query-panel-form :deep(.el-input),
.query-panel-form :deep(.el-select),
.query-panel-form :deep(.el-tree-select),
.query-panel-form :deep(.el-cascader),
.query-panel-form :deep(.el-date-editor),
.query-panel-form :deep(.el-input-number) { width: 100% !important; min-width: 0; }
/* 操作组按内容宽度参与换行：余位足够就同行，否则整组换到末行靠右。 */
.query-panel-form .query-panel-actions {
  flex: 0 0 auto;
  width: max-content;
  max-width: 100%;
  margin-left: auto;
  align-self: center;
}
.query-panel-actions :deep(.el-form-item__content) { justify-content: flex-end; gap: 8px; }
.query-panel-actions :deep(.el-button + .el-button) { margin-left: 0; }
.query-panel-count :deep(.el-badge__content) { position: static; transform: none; }

/* Collapsible conditions fill each row; actions stay on a separate final row. */
.query-panel--collapsible { container-type: inline-size; }
.query-panel-form--collapsible {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.query-panel-form--collapsible .query-panel-actions {
  grid-column: 1 / -1;
  width: 100%;
}
@container (max-width: 1100px) {
  .query-panel-form--collapsible { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@container (max-width: 620px) {
  .query-panel-form--collapsible { grid-template-columns: minmax(0, 1fr); }
}
</style>
