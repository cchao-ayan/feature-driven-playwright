import { test as base } from '@playwright/test';
import { POManager } from '@playwright-core/managers/pom.manager';
import { APIManager } from '@playwright-core/managers/api.manager';
import { allure } from 'allure-playwright';
//import { FlowManager } from '@playwright-core/managers/flow.manager';

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
