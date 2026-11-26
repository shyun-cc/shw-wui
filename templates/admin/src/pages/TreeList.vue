<script setup lang="ts">
import { ref } from 'vue';
import { ShwPageContainer } from '@shwkj/shw-wui';
import { categories } from '../mock/api';
import RecordList from './RecordList.vue';
const category = ref('');
const tree = [{ id: '', label: '全部分类', children: categories.map(item => ({ ...item })) }];
function select(node: { id: string }) { category.value = node.id; }
</script>
<template><ShwPageContainer title="树与列表"><div class="starter-split"><aside><h2>静态分类</h2><el-tree :data="tree" node-key="id" default-expand-all highlight-current :expand-on-click-node="false" :current-node-key="category" @node-click="select" /><p class="starter-help">选择分类后自动回到第一页查询。</p></aside><RecordList :category="category" embedded /></div></ShwPageContainer></template>
