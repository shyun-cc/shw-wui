import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig({ plugins: [vue()], build: {
  lib: { entry: { index: 'src/index.ts', utils: 'src/owned-utils/index.ts', echarts: 'src/owned-utils/echarts.ts', alias: 'src/owned-utils/alias.ts' }, formats: ['es'], fileName: (_format, entry) => `${entry}.js`, cssFileName: 'shw-wui' },
  rollupOptions: { external: ['vue', 'element-plus', 'vue-router', 'pinia', 'echarts'] }
} });
