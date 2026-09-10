import { test } from '@playwright-core/fixtures/app.fixture';
import { DataReader } from '@playwright-shared/utils/data/data-reader';
import { paths } from '@playwright-config/paths';
import { validateLoginInput, validateSignupInput } from '@playwright-features/auth/utils/index';
import { InvalidLoginTestData, InvalidSignupTestData } from '@playwright-features/auth/types/index';
import { feature} from 'allure-js-commons';

const invalidLoginData = DataReader.read<InvalidLoginTestData>(paths.data.login.invalidLoginInput);
const invalidSignupFormData = DataReader.read<InvalidSignupTestData>(paths.data.signup.invalidSignupInput);

test.describe('Login Functionality', () => {
    test.beforeEach(async ({ pom }) => {
        feature('Login and Signup Invalid Validations');
        await pom.homePage.navigateToHomePage();
        await pom.homePage.assertPageLoaded();
        await pom.homePage.header.clickSignupLoginLink();
        await pom.loginPage.assertPageLoaded();
    });
    for (const row of invalidLoginData) {
        test(`Invalid Login: ${row.id}. ${row.scenario}`, async ({ pom }) => {
            await pom.loginPage.login(row.email, row.password);
            const result = validateLoginInput({ email: row.email, password: row.password });
            await pom.loginPage.assertLoginInputValidation(result);
        });
    }

    for (const row of invalidSignupFormData) {
        test(`Invalid Signup: ${row.id}. ${row.scenario}`, async ({ pom }) => {
            await pom.loginPage.signUp(row.name, row.email);
            const result = validateSignupInput({ name: row.name, email: row.email });
            await pom.loginPage.assertSignupInputValidation(result);
        });
    }
});