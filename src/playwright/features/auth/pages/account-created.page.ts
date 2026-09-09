import { BasePage } from '@playwright-core/base/base.page';
import { routes } from '@playwright-config/routes';
import { expect, Page } from '@playwright/test';

export class AccountCreatedPage extends BasePage {

  constructor(protected readonly page: Page) {
    super(page);
  }
  // ======================
  // Locators
  // ======================
  private readonly accountCreatedHeading = this.page.getByRole('heading', { name: 'Account Created!' });
  private readonly message1 = this.page.getByText('Congratulations! Your new account has been successfully created!', {exact: true});
  private readonly message2 = this.page.getByText('You can now take advantage of member privileges to enhance your online shopping experience with us.',{exact: true});
  private readonly continueButton = this.page.getByTestId('continue-button');
  // ======================
  // State methods
  // ======================
  public async assertPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${routes.accountCreated}$`));
    await expect(this.accountCreatedHeading).toBeVisible();
    await expect(this.message1).toBeVisible();
    await expect(this.message2).toBeVisible();
  }
  // ======================
  // Action Methods
  // ======================
  public async clickContinueButton() {
    await this.continueButton.click();
  }
}
