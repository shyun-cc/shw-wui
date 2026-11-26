<script setup lang="ts">
import { computed } from 'vue';
import { ElTag } from 'element-plus';
import type { TagProps } from 'element-plus';
import type { ShwStatusOption, ShwStatusValue } from './types';
defineOptions({ name: 'ShwStatusTag', inheritAttrs: false });
const props = withDefaults(defineProps<{
  value?: ShwStatusValue | null;
  options: readonly ShwStatusOption[];
  fallbackLabel?: string;
  fallbackType?: TagProps['type'];
  size?: TagProps['size'];
  effect?: TagProps['effect'];
}>(), { fallbackLabel: '未知状态', fallbackType: 'info', effect: 'light' });
const option = computed(() => props.options.find(item => item.value === props.value));
</script>
<template>
  <ElTag v-bind="$attrs" :type="option?.type ?? fallbackType" :size="size" :effect="effect">
    <slot :option="option" :value="value" :label="option?.label ?? fallbackLabel">{{ option?.label ?? fallbackLabel }}</slot>
  </ElTag>
</template>
