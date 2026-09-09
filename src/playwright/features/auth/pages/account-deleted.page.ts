import { BasePage } from '@playwright-core/base/base.page';
import { routes } from '@playwright-config/routes';
import { expect, Page } from '@playwright/test';

export class AccountDeletedPage extends BasePage {
  constructor(protected readonly page: Page) {
    super(page);
  }
  // ======================
  // Locators
  // ======================
  private readonly accountDeletedHeading = this.page.locator('b:has-text("Account Deleted!")');
  private readonly message1 = this.page.locator('p:has-text("Your account has been permanently deleted!")');
  private readonly message2 = this.page.locator('p:has-text("You can create new account to take advantage")');
  private readonly continueButton = this.page.getByTestId('continue-button');
  // ======================
  // State methods
  // ======================
  public async assertPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${routes.accountDeleted}$`));
    await expect(this.accountDeletedHeading).toBeVisible();
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
