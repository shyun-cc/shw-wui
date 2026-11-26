<script setup lang="ts">
import { computed, defineComponent, shallowRef, watch, type VNode, type ShallowRef, type Component } from 'vue';
import { RouterView } from 'vue-router';
import { useAdmin } from './runtime';
const admin = useAdmin();
let sequence = 0;
const views = new Map<string, { name: string; view: ShallowRef<VNode | undefined>; component: Component }>();
function entry(path: string) {
  let item = views.get(path);
  if (!item) {
    const name = `ShwTabView${++sequence}`;
    const view = shallowRef<VNode>();
    item = { name, view, component: defineComponent({ name, setup: () => () => view.value }) };
    views.set(path, item);
  }
  return item;
}
const includes = computed(() => admin.tabs.value.filter(tab => tab.cache).map(tab => entry(tab.path).name));
function renderView(view: VNode | undefined, path: string, cache: boolean) {
  if (!cache) return view;
  const item = entry(path); item.view.value = view;
  return item.component;
}
watch(() => admin.tabs.value.map(tab => tab.path), paths => {
  for (const path of views.keys()) if (!paths.includes(path)) views.delete(path);
});
</script>
<template>
  <RouterView v-slot="{ Component, route }"><KeepAlive :include="includes"><component :is="renderView(Component, route.fullPath, route.meta.cache === true)" :key="route.fullPath" /></KeepAlive></RouterView>
</template>
