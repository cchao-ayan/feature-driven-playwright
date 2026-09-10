import { test } from '@playwright-core/fixtures/app.fixture';
import { DataReader } from '@playwright-shared/utils/data/data-reader';
import { paths } from '@playwright-config/paths';
import { RegisteredUser } from '@playwright-features/auth/types/login.type';
import { feature, story, step } from 'allure-js-commons';

const data = DataReader.read<RegisteredUser>(paths.data.login.registeredUsers);

test('Storing login session to be used in test scenarios', async ({ pom, page }) => {
    feature('Authentication');
    story('Login setup');
    await step('Open the Home page', async () => {
        await pom.homePage.navigateToHomePage();
        await pom.homePage.assertPageLoaded();
    });
    await step('Login using valid credentials', async () => {
        await pom.homePage.header.clickSignupLoginLink();
        await pom.loginPage.assertPageLoaded();
        await pom.loginPage.login(data[0].email, data[0].password);
        await pom.homePage.header.successfulLogin(data[0].username);
    });
    await step('Store login session', async () => {
        await page.context().storageState({ path: paths.setup.storageState });
    });
});