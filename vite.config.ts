import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Gzip compression
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240, // 只壓縮大於 10KB 的檔案
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // Brotli compression (更好的壓縮率)
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
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
        // 手動配置 chunk 分割策略
        manualChunks(id) {
          // 將 node_modules 中的庫分組
          if (id.includes('node_modules')) {
            // React 相關庫單獨打包
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor'
            }
            // Three.js 和 3D 相關庫單獨打包
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three-vendor'
            }
            // Framer Motion 單獨打包
            if (id.includes('framer-motion')) {
              return 'framer-vendor'
            }
            // 其他第三方庫
            return 'vendor'
          }
        },
      },
    },

    // 資源處理
    assetsInlineLimit: 4096, // 小於 4KB 的資源轉為 base64

    // CSS 程式碼分割
    cssCodeSplit: true,

    // 來源映射（生產環境可設為 false 以減少檔案大小）
    sourcemap: false,

    // 壓縮選項
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // 移除 console.log
        drop_debugger: true,
      },
    },
  },

  // 優化依賴項預編譯
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@react-three/fiber', '@react-three/drei'],
  },
})
