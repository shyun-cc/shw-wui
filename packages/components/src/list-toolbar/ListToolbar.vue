<!-- See LICENSES/pure-admin-thin.MIT.txt for third-party attribution. -->
<template>
  <div class="list-toolbar" :class="{ 'list-toolbar--titled': title }">
    <div v-if="title" class="toolbar-header">
      <span class="toolbar-title">{{ title }}</span>
      <div class="toolbar-actions"><slot name="actions" /></div>
    </div>
    <div class="toolbar-main">
      <h2 v-if="listTitle" class="toolbar-list-title">{{ listTitle }}</h2>
      <slot />
    </div>
    <div v-if="!title" class="toolbar-actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ShwListToolbar' })
defineProps<{ title?: string; listTitle?: string }>()
</script>

<style scoped>
/* 根容器 nowrap：左右两区永远同行，折行行为收敛到各自子区内 */
.list-toolbar {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  flex-shrink: 0;
  margin-bottom: 16px;
}

.toolbar-main {
  display: flex;
  flex: 1 1 auto;
  /* min-width:0 必须——flex 子项默认 min-width:auto 不肯缩到内容宽以下，缺它左区会把右区顶出容器 */
  min-width: 0;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  /* 左右两区固定间隔（左区已 flex:1 吃满剩余宽度，用 padding 而非 gap 表达"条件区留空"） */
  padding-right: 16px;
}

.toolbar-actions {
  display: flex;
  /* 右区不退让：按内容自然宽布局，超过 30% 后在自身内部折行并保持右对齐 */
  flex-shrink: 0;
  width: max-content;
  max-width: 30%;
  justify-content: flex-end;
  flex-wrap: wrap;
}
/* 带标题时，标题与操作同行，查询区独占下一行。 */
.list-toolbar--titled {
  flex-direction: column;
  flex-shrink: 0;
  gap: 24px;
}
.toolbar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--el-border-color-light);
}
.toolbar-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}
.list-toolbar--titled .toolbar-main {
  width: 100%;
  padding-right: 0;
}
.toolbar-header .toolbar-actions { max-width: 100%; }
.toolbar-list-title {
  min-width: 0;
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  line-height: 1.5;
  overflow-wrap: anywhere;
}
</style>
