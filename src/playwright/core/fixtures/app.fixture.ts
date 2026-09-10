import { test as base } from '@playwright/test';
import { POManager } from '@playwright-core/managers/pom.manager';
import { APIManager } from '@playwright-core/managers/api.manager';
//import { FlowManager } from '@playwright-core/managers/flow.manager';

/**
 * Suppress the "no test runtime is found" warning from allure-js-commons
 * This runs in each worker process
 */
if (typeof globalThis !== 'undefined') {
  const originalLog = console.log;
  const originalWarn = console.warn;

  console.log = function (...args: any[]) {
    const message = String(args[0]);
    if (!message.includes('no test runtime is found')) {
      originalLog.apply(console, args);
    }
  };

  console.warn = function (...args: any[]) {
    const message = String(args[0]);
    if (!message.includes('no test runtime is found')) {
      originalWarn.apply(console, args);
    }
  };
}

type MyFixtures = {
  pom: POManager;
  api: APIManager;
  //flow: FlowManager;
};

export const test = base.extend<MyFixtures>({
  pom: async ({ page }, use) => {
    await use(new POManager(page));
  },
  api: async ({ request }, use) => {
    await use(new APIManager(request));
  },
  //flow: async ({ pom }, use) => {
  //  await use(new FlowManager(pom));
  //},
});

export { expect, Page } from '@playwright/test';
//export { checkForBrokenLink, checkForBrokenLinks };
