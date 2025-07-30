import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default defineConfig({
  input: 'pipe-preprocessor.ts',
  output: [
    {
      file: 'dist/pipe-preprocessor.js',
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    resolve({
      extensions: ['.ts', '.js']
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.lib.json',
      declaration: true,
      declarationDir: './dist',
      sourceMap: true
    })
  ],
  external: ['svelte']
}); 