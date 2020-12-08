// https://rollupjs.org/guide/en/#configuration-files
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import preserveShebang from 'rollup-plugin-preserve-shebang';
import resolve from '@rollup/plugin-node-resolve';
import subpathExternals from 'rollup-plugin-subpath-externals';
import typescript from '@wessberg/rollup-plugin-ts';

import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: './src/index.tsx',
  output: {
    entryFileNames: '[name].js',
    dir: './dist',
    format: 'cjs',
  },
  plugins: [
    resolve({ extensions }),
    commonjs(),
    json(),
    typescript({
      transpiler: 'babel',
    }),
    subpathExternals(pkg),
    preserveShebang(),
  ],
};
