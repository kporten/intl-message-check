// https://rollupjs.org/guide/en/#configuration-files
import commonjs from '@rollup/plugin-commonjs';
import preserveShebang from 'rollup-plugin-preserve-shebang';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@wessberg/rollup-plugin-ts';
import subpathExternals from 'rollup-plugin-subpath-externals';

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
    typescript({
      transpiler: 'babel',
    }),
    subpathExternals(pkg),
    preserveShebang(),
  ],
};
