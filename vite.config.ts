/// <reference types="vitest" />

import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    clearMocks: true,
    coverage: {
      reporter: ['lcov', 'text'],
      exclude: ['**/{benchmarks,mocks,tests}/**'],
    },
  },
})
