import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: '5qxvbj',
  e2e: {
    baseUrl: 'http://localhost:4200',
    testIsolation: false,
  },
});
