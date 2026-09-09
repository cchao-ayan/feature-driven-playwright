import { Locator, expect } from '@playwright/test';
import { assertErrorMessage } from '@playwright-core/base/base.page';
import { FooterValidationResult, InvalidFooterEmailTestData } from '@playwright-shared/components/footer/footer.type';

export class FooterComponent {
  constructor(private readonly root: Locator) { }

  // ======================
  // Locators
  // ======================
  private readonly subscribeButton = this.root.locator('#subscribe');
  private readonly subscriptionHeading = this.root.getByRole('heading', { name: 'Subscription' });
  private readonly emailInput = this.root.getByRole('textbox', { name: 'Your email address' });
  private readonly subscriptionDescription = this.root.locator('p', {
    hasText: 'Get the most recent updates',
  });
  private readonly successMessage = this.root.locator('.alert-success alert');

  // ======================
  // Business methods
  // ======================
  public async subscribe(email?: string): Promise<void> {
    if (email !== undefined) {
      await this.emailInput.fill(email);
    }
    await this.subscribeButton.click();
  }

  /**
   * Assert footer email validation based on the validator result object.
   * The result object is expected to have `internal_type` and `message` fields
   * coming from the CSV test data.
   */
  public async assertFooterEmailValidation(result: FooterValidationResult): Promise<void> {
    switch (result.type) {
      case 'missing_at':
      case 'missing_after_at':
      case 'missing_before_at':
      case 'missing_email':
      case 'invalid_domain_char':
        await assertErrorMessage(this.emailInput, result.message);
        break;
      default:
        throw new Error(`Unhandled validation type: ${result.type}`);
    }
  }

  // ======================
  // State methods
  // ======================
  public async isSubscriptionHeadingVisible(): Promise<boolean> {
    return await this.subscriptionHeading.isVisible();
  }

  public async getSubscriptionDescriptionText(): Promise<string> {
    return (await this.subscriptionDescription.textContent()) ?? '';
  }

  public async expectSuccessSubscription(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
    await expect(this.successMessage).toHaveText('You have been successfully subscribed!');
  }
}
