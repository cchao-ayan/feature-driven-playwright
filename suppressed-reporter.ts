/**
 * Custom Playwright Reporter
 * Suppresses the "no test runtime is found" warning from allure-js-commons
 * while preserving all other reporter functionality
 */

export default class SuppressedReporter {
  constructor() {
    // Suppress the NoopTestRuntime warning by intercepting console.log
    const originalLog = console.log;
    console.log = function (...args) {
      const message = args.join(' ');
      // Suppress the specific Allure warning
      if (message.includes('no test runtime is found')) {
        return; // Skip logging this message
      }
      originalLog.apply(console, args);
    };
  }

  onBegin() {}
  onTestBegin() {}
  onTestEnd() {}
  onEnd() {}
}
