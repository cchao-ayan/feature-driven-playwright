/**
 * Global setup for Playwright test execution
 * Initializes Allure runtime and other global configurations
 * Suppresses the "no test runtime is found" warning from allure-js-commons
 */

// Suppress the allure-js-commons warning message before anything else runs
const originalWarn = console.warn;
const originalLog = console.log;

console.warn = function (...args) {
  const message = args.join(' ');
  if (message.includes('no test runtime is found')) {
    return;
  }
  originalWarn.apply(console, args);
};

console.log = function (...args) {
  const message = args.join(' ');
  if (message.includes('no test runtime is found')) {
    return;
  }
  originalLog.apply(console, args);
};

// This ensures allure-playwright is loaded and initialized before tests run
import 'allure-playwright';

export default async function globalSetup() {
  // Global setup can be used for additional configuration if needed
  console.log('Playwright tests starting...');
}
