<script setup lang="ts">
// See THIRD_PARTY_NOTICES.md for framework attribution.
// Frozen source daa23b137147af6eef110c9379da033dbf30f6dd; MIT notice retained.
import { ElMenuItem, ElSubMenu } from 'element-plus';
import type { AdminMenu } from './types';
defineProps<{ item: AdminMenu; collapsed?: boolean }>();
</script>
<template>
  <ElSubMenu v-if="item.children?.length" :index="item.path">
    <template #title><strong v-if="collapsed" class="shw-menu-short">{{ item.title.slice(0, 2) }}</strong><span>{{ item.title }}</span></template>
    <MenuItem v-for="child in item.children" :key="child.path" :item="child" :collapsed="collapsed" />
  </ElSubMenu>
  <ElMenuItem v-else :index="item.path"><strong v-if="collapsed" class="shw-menu-short">{{ item.title.slice(0, 2) }}</strong><template #title>{{ item.title }}</template></ElMenuItem>
</template>
