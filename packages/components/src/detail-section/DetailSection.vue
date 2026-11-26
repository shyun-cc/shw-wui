<!-- See LICENSES/pure-admin-thin.MIT.txt for third-party attribution. -->
<script setup lang="ts">
defineOptions({ name: 'ShwDetailSection' });
defineProps<{ title: string }>();
</script>

<template>
  <section class="shw-detail-section">
    <header class="shw-detail-section__header">
      <h2 class="shw-detail-section__title">{{ title }}</h2>
      <div v-if="$slots.actions" class="shw-detail-section__actions"><slot name="actions" /></div>
    </header>
    <div class="shw-detail-section__content"><slot /></div>
  </section>
</template>

<style scoped>
.shw-detail-section { min-width: 0; padding: 16px; border: 1px solid var(--el-border-color-light); border-radius: 4px; background: var(--el-bg-color); color: var(--el-text-color-primary); font-size: 14px; }
.shw-detail-section__header { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 12px; }
.shw-detail-section__title { min-width: 0; margin: 0; font-size: 14px; font-weight: 600; overflow-wrap: anywhere; }
.shw-detail-section__actions { display: flex; flex-wrap: wrap; gap: 8px; }
.shw-detail-section__content { min-width: 0; }
</style>
