import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'

export default [
  // browser-friendly UMD build
  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: './src/index-node.js',
    output: [
      { name: 'otp', file: './dist/otplib.umd.js', format: 'umd', exports: 'named' },
      { file: './dist/otplib.cjs.js', format: 'cjs', exports: 'named' },
      { file: './dist/otplib.esm.mjs', format: 'es' }
    ],
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      json() // for Rollup to be able to read content from package.json
    ]
  },
  // Minified versions
  {
    input: './src/index-node.js',
    output: [
      { name: 'otp', file: './dist/otplib.umd.min.js', format: 'umd', exports: 'named' },
      { file: './dist/otplib.cjs.min.js', format: 'cjs', exports: 'named' },
      { file: './dist/otplib.esm.min.mjs', format: 'es' }
    ],
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      terser(), // Minify
      json() // for Rollup to be able to read content from package.json
    ]
  }
]