import babel from 'rollup-plugin-babel'
import external from 'rollup-plugin-peer-deps-external'

export default {
  input: 'src/Editor.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
  },
  plugins: [
    external(),
    babel(),
  ],
}
