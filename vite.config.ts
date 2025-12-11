import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Gzip compression - 暫時禁用以測試構建
    // viteCompression({
    //   verbose: true,
    //   disable: false,
    //   threshold: 10240,
    //   algorithm: 'gzip',
    //   ext: '.gz',
    //   deleteOriginFile: false,
    // }),
    // Brotli compression - 暫時禁用以測試構建
    // viteCompression({
    //   verbose: true,
    //   disable: false,
    //   threshold: 10240,
    //   algorithm: 'brotliCompress',
    //   ext: '.br',
    //   deleteOriginFile: false,
    // }),
    // Bundle 分析工具 (建置後會生成 stats.html)
    visualizer({
      filename: './dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }) as any,
  ],
  server: {
    port: 3000,
    open: true
  },
  build: {
    // 提高 chunk 大小警告的閾值
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        // 使用 Vite 自動 chunk 分割，確保依賴關係正確
        manualChunks: undefined, // 讓 Vite 自動處理
      },
    },

    // 資源處理
    assetsInlineLimit: 4096, // 小於 4KB 的資源轉為 base64

    // CSS 程式碼分割
    cssCodeSplit: true,

    // 來源映射（生產環境可設為 false 以減少檔案大小）
    sourcemap: false,

    // 壓縮選項 - 使用 esbuild（更快更穩定）
    minify: 'esbuild',
  },

  // 優化依賴項預編譯
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react-router-dom',
      '@react-three/fiber',
      '@react-three/drei',
      'three'
    ],
  },
  
  // 確保 React 正確解析
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
})
