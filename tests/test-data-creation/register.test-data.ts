import { test } from '@playwright-core/fixtures/app.fixture';
import { DataReader } from '@playwright-shared/utils/data/data-reader';
import { paths } from '@playwright-config/paths';
import { SignupFormTestData } from '@playwright-features/auth/types/signup-form.type';

const data = DataReader.read<SignupFormTestData>(paths.data.signup.registerUsers);

test.describe('Register Users', () => {
    test.beforeEach(async ({ pom }) => {
        await pom.homePage.navigateToHomePage();
        await pom.homePage.assertPageLoaded();
        await pom.homePage.header.clickSignupLoginLink();
        await pom.loginPage.assertPageLoaded();
    });
    for (const row of data) {
        test(`Register ${row.name}`, async ({ pom }) => {
            await pom.loginPage.signUp(row.name, row.email);
            await pom.signUpPage.assertPageLoaded();
            await pom.signUpPage.submitSignupForm(row);
            await pom.accountCreatedPage.assertPageLoaded();
        });
    }
});