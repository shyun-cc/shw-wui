import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig({ plugins: [vue()], define: { 'import.meta.env.VITE_SOURCE_SHA': JSON.stringify(process.env.SOURCE_SHA || 'local') } });
