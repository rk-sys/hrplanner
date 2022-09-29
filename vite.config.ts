import {fileURLToPath, URL} from 'url';
import {defineConfig, loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {

  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue()],
    resolve: {
      define: {
        __APP_ENV__: env.APP_ENV
      },
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        [env.VITE_APP_API_PROXY]: {
          target: `${env.VITE_APP_SERVER_ADDRESS}:${env.VITE_APP_SERVER_PORT}${env.VITE_APP_API_PROXY}`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/main.scss";'
        }
      }
    }
  }
});
