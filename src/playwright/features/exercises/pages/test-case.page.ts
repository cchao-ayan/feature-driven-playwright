import { BasePage } from '@playwright-core/base/base.page';
import { expect, Page } from '@playwright/test';
import { routes } from '@playwright-config/routes';

export class TestCasePage extends BasePage {
  constructor(protected readonly page: Page) {
    super(page);
  }
  // ======================
  // Locators
  // ======================
  private readonly testCaseHeading = this.page.getByRole('heading', { name: 'Test Cases', level: 2 });
  private readonly feedbackHeading = this.page.getByRole('heading', { name: 'Feedback For Us' });
  // ======================
  // State Methods
  // ======================
  protected async assertPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${routes.testCases}$`));
    await expect(this.testCaseHeading).toBeVisible();
    await expect(this.feedbackHeading).toBeVisible();
  }
}
