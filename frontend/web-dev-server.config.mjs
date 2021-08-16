import { hmrPlugin, presets } from '@open-wc/dev-server-hmr';

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
});
