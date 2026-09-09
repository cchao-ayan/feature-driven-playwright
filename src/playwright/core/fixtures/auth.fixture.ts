import {test as base} from '@playwright/test';
import { POManager } from '@playwright-core/managers/pom.manager';
import { paths } from '@playwright-config/paths';
import { allure } from 'allure-playwright';

const authStatePath = paths.setup.storageState;

type authPOM = {
    authPom: POManager;
}

export const test = base.extend<authPOM>({
    authPom: async ({ browser }, use) => {
        const context = await browser.newContext({
            storageState: authStatePath
        });
        const page = await context.newPage();

        await use(new POManager(page));
        await context.close();
    }
})

export { expect } from '@playwright/test';