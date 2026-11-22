import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({

  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 2 : undefined,

  expect: {
    timeout: 5000,
  },

  reporter: [
    ['list'],
    ['html', {
      outputFolder: 'playwright-report',
      open: 'never'
    }],
    ['json', {
      outputFile: 'test-results/results.json'
    }]
  ],

  use: {
    baseURL: process.env.BASE_URL,

    headless: true,

    actionTimeout: 10000,

    navigationTimeout: 30000,

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    trace: 'retain-on-failure'
  },

  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/
    },  

    {
      name: 'chromium',
      testIgnore: /auth\.setup\.ts/,
      dependencies: ['setup'],

      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/standard-user.json'
      }
    },
    {
        name: 'firefox',
        testIgnore: /auth\.setup\.ts/,
        dependencies: ['setup'],
        use: {
            ...devices['Desktop Firefox'],
            storageState: 'playwright/.auth/standard-user.json',
        },
    },
    {
        name: 'webkit',
        testIgnore: /auth\.setup\.ts/,
        dependencies: ['setup'],
        use: {
            ...devices['Desktop Safari'],
            storageState: 'playwright/.auth/standard-user.json',
        },
    },
  ],

  outputDir: 'test-results'

});