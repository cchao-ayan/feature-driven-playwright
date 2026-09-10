import { defineConfig, devices } from '@playwright/test';
import path from 'path';
// import dotenv from 'dotenv';

// dotenv.config({
//   path: './config/.env',
// });

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  globalSetup: './playwright.setup.ts',
  /* if true then tests will be run in parallel (fast) else false then tests will be run sequentially (slow) */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : '50%',
  /* Timeout per test in milliseconds (120 seconds per test, override per-test with test.setTimeout) */
  //timeout: 120_000,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['html'],
     [
      'allure-playwright',
      {
        resultsDir: path.resolve(__dirname, 'results', 'playwright', 'test-results', 'allure-results'), // ✅ correct for v3.x
        detail: true,
        suiteTitle: false,
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'https://automationexercise.com/',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',

    /* Custom test ID attribute */
    testIdAttribute: 'data-qa',
  },
  expect: {
    /* Timeout for expect assertions (e.g., expect(locator).toBeVisible()) */
    //timeout: 5_000,
    toHaveScreenshot: {
      pathTemplate: path.resolve(__dirname, 'results', 'playwright', 'test-screenshots', '{projectName}/{arg}{ext}'),
      /* Threshold for visual regression (0.2 = 20% tolerance for screenshot diffs) */
      threshold: 0.2,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      outputDir: path.resolve(__dirname, 'results', 'playwright', 'test-results', 'chromium'),
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
