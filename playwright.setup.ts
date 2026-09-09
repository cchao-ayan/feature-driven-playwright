/**
 * Global setup for Playwright test execution
 * Initializes Allure runtime and other global configurations
 */

// This ensures allure-playwright is loaded and initialized before tests run
import 'allure-playwright';

export default async function globalSetup() {
  // Global setup can be used for additional configuration if needed
  console.log('Playwright tests starting...');
}
