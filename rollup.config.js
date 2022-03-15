import { nodeResolve } from '@rollup/plugin-node-resolve'
import sourcemaps from 'rollup-plugin-sourcemaps'
import { terser } from 'rollup-plugin-terser'
import babel from '@rollup/plugin-babel'

const plugins = [
  sourcemaps(),
  nodeResolve(),
  babel({
    exclude: 'node_modules/**'
  }),
]

const getAllOutputFiles = filename => [
  {
    file: `esm/${filename}.min.mjs`,
    format: 'esm',
    compact: true,
    sourcemap: true,
  },
  {
    file: `dist/${filename}.min.cjs`,
    format: 'cjs',
    compact: true,
  },
  {
    file: `umd/${filename}.min.js`,
    format: 'umd',
    name: 'ThunderEvents',
    compact: true,
  },
]

export default [{
  input: 'src/index.js',
  output: getAllOutputFiles('thunderEvents'),
  plugins,
}, {
  input: 'src/components/index.js',
  output: getAllOutputFiles('components/index'),
  plugins,
}, {
  input: 'src/components/programGuideNative.js',
  output: getAllOutputFiles('components/programGuideNative'),
  plugins,
}]
