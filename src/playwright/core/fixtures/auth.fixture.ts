import {test as base} from '@playwright/test';
import { POManager } from '@playwright-core/managers/pom.manager';
import { APIManager } from '@playwright-core/managers/api.manager';
import { paths } from '@playwright-config/paths';

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

const authStatePath = paths.setup.storageState;

type authPOM = {
    authPom: POManager;
    authApi: APIManager;
}

export const test = base.extend<authPOM>({
    authPom: async ({ browser }, use) => {
        const context = await browser.newContext({
            storageState: authStatePath
        });
        const page = await context.newPage();

        await use(new POManager(page));
        await context.close();
    },
      authApi: async ({ request }, use) => {
        await use(new APIManager(request));
      },
})

export { expect } from '@playwright/test';