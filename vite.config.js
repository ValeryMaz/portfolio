// import { defineConfig } from 'vite';
// import { glob } from 'glob';
// import injectHTML from 'vite-plugin-html-inject';
// import FullReload from 'vite-plugin-full-reload';
// import SortCss from 'postcss-sort-media-queries';

// export default defineConfig(({ command }) => {
//   return {
//     base: '/portfolio/',
//     define: {
//       [command === 'serve' ? 'global' : '_global']: {},
//     },
//     root: 'src',
//     build: {
//       sourcemap: true,
//       rollupOptions: {
//         input: glob.sync('./src/*.html'),
//         output: {
//           manualChunks(id) {
//             if (id.includes('node_modules')) {
//               return 'vendor';
//             }
//           },
//           entryFileNames: chunkInfo => {
//             if (chunkInfo.name === 'commonHelpers') {
//               return 'commonHelpers.js';
//             }
//             return '[name].js';
//           },
//           assetFileNames: assetInfo => {
//             if (assetInfo.name && assetInfo.name.endsWith('.html')) {
//               return '[name].[ext]';
//             }
//             return 'assets/[name]-[hash][extname]';
//           },
//         },
//       },
//       outDir: '../dist',
//       emptyOutDir: true,
//     },
//     plugins: [
//       injectHTML(),
//       FullReload(['./src/**/**.html']),
//       SortCss({
//         sort: 'mobile-first',
//       }),
//     ],
//   };
// });

import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'; // Для инъекции CSS

import { loadEnv } from 'vite';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: '/portfolio/',
    define: {
      'process.env': {
        ...env,
        NODE_ENV: JSON.stringify(mode),
      },
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',
    publicDir: '../public',
    build: {
      sourcemap: true,
      rollupOptions: {
        input: glob.sync('./src/*.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (!id.includes('swiper')) {
                return 'vendor';
              }
            }
          },
          entryFileNames: chunkInfo => {
            if (chunkInfo.name === 'commonHelpers') {
              return 'commonHelpers.js';
            }
            return '[name].js';
          },
          assetFileNames: assetInfo => {
            if (assetInfo.name && assetInfo.name.endsWith('.html')) {
              return '[name].[ext]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
      outDir: '../dist',
      emptyOutDir: true,
    },
    css: {
      postcss: {
        plugins: [SortCss({ sort: 'mobile-first' })],
      },
    },
    plugins: [
      injectHTML(),
      FullReload(['./src/**/**.html']),
      cssInjectedByJsPlugin(),
    ],
    optimizeDeps: {
      include: [
        'swiper',
        'swiper/css',
        'swiper/css/navigation',
        'swiper/modules',
      ],
    },
  };
});
