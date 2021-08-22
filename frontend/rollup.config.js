import merge from 'deepmerge';
import { createSpaConfig } from '@open-wc/building-rollup';
import copy from 'rollup-plugin-copy';

const baseConfig = createSpaConfig({
  outputDir: '../static',
  developmentMode: process.env.ROLLUP_WATCH === 'true',
  injectServiceWorker: false,
});

export default merge(baseConfig, {
  input: './index.html',
  plugins: [
    copy({
      targets: [{ src: 'assets/*', dest: '../static/assets/' }],
    }),
  ],
});
