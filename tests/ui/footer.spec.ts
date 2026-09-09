import { test } from '@playwright-core/fixtures/app.fixture';
import { DataReader } from '@playwright-shared/utils/data/data-reader';
import { paths } from '@playwright-config/paths';
import { InvalidFooterEmailTestData } from '@playwright-shared/components/footer/footer.type';
import { validateFooterInput } from '@playwright-shared/components/footer/footer.validator';
import { feature} from 'allure-js-commons';

feature('Footer Invalid Validations');

const data = DataReader.read<InvalidFooterEmailTestData>(paths.data.footer.invalidEmailFooter);

for (const row of data) {
  test(`${row.id}. ${row.scenario}`, async ({ pom }) => {
    await pom.homePage.navigateToHomePage();
    await pom.homePage.assertPageLoaded();
    await pom.homePage.footer.subscribe(row.email);
    const result = validateFooterInput({ email: row.email });
    await pom.homePage.footer.assertFooterEmailValidation(result);
  });
}
