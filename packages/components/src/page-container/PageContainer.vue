<script setup lang="ts">
withDefaults(defineProps<{ title?: string; description?: string }>(), { title: '', description: '' });
</script>
<template>
  <section class="shw-page-container">
    <header v-if="title || description || $slots.actions" class="shw-page-container__header">
      <div><h1 v-if="title" class="shw-page-container__title">{{ title }}</h1><p v-if="description" class="shw-page-container__description">{{ description }}</p></div>
      <div v-if="$slots.actions" class="shw-page-container__actions"><slot name="actions" /></div>
    </header>
    <slot />
  </section>
</template>
<style>
.shw-page-container { padding: var(--shw-page-padding, 16px); min-width: 0; color: var(--el-text-color-primary); font-size: 14px; }
.shw-page-container__header { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
.shw-page-container__title { margin: 0; font-size: 16px; font-weight: 600; }
.shw-page-container__description { margin: 8px 0 0; color: var(--el-text-color-secondary); font-size: 14px; }
.shw-page-container__actions { display: flex; flex-wrap: wrap; gap: 8px; }
</style>
