import { hmrPlugin, presets } from '@open-wc/dev-server-hmr';
import proxy from 'koa-proxies';

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  nodeResolve: true,
  open: '/',
  watch: false,
  plugins: [
    hmrPlugin({
      exclude: ['**/*/node_modules/**/*'],
      presets: [presets.litElement],
    }),
  ],
  middleware: [
    proxy('/api/', {
      target: process.env.AMPT_URL,
      changeOrigin: true,
    }),
  ],
});
