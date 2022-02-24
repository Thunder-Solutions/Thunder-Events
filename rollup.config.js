import { nodeResolve } from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import sourcemaps from 'rollup-plugin-sourcemaps'
import { terser } from 'rollup-plugin-terser'
import regenerator from 'rollup-plugin-regenerator'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'esm/thunderEvents.min.mjs',
      format: 'esm',
      compact: true,
      sourcemap: true,
    },
    {
      file: 'umd/thunderEvents.min.js',
      format: 'umd',
      name: 'ThunderEvents',
      compact: true,
    },
    {
      file: 'dist/thunderEvents.min.js',
      format: 'cjs',
      compact: true,
    },
  ],
  plugins: [
    sourcemaps(),
    nodeResolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    terser(),
    regenerator(),
  ],
}
