import { Page, Locator, expect } from '@playwright/test';
import { FooterComponent, HeaderComponent } from '@playwright-shared/components';
import { AdHandler } from '@playwright-shared/utils/browser/ads-handler';

export abstract class BasePage {
  private _footer?: FooterComponent;
  private _header?: HeaderComponent;
  private readonly adHandler: AdHandler;

  constructor(protected readonly page: Page) {
    this.adHandler = new AdHandler(this.page);
  }

  /**
   * lazy getter for footer and header instances, created only when accessed
   * pom.homePage.footer instead of pom.footer which is much better for clarity
   * footer and header lazy getters have been separated from POManager so that each page can have its own header/footer instance if needed
   */
  get footer(): FooterComponent {
    return (this._footer ??= new FooterComponent(this.page.locator('#footer'))); // footer component root locator
  }
  get header(): HeaderComponent {
    return (this._header ??= new HeaderComponent(this.page.locator('#header'))); // header componen root locator
  }

  /**
   * Defines the page-specific readiness check.
   * Each page must implement its own load verification logic.
   * This is invoked internally after navigation to ensure stability.
   */
  protected abstract assertPageLoaded(index?: number): Promise<void>;

  /**
   * Navigate to URL with ad handlers registered.
   */
  protected async navigate(url: string): Promise<void> {
    await this.adHandler.registerAutoCloseHandlers();
    await this.page.goto(url);
    await this.assertPageLoaded();
  }

  protected async assertErrorMessage(locator: Locator, expectedErrorMessage: string): Promise<void> {
    await assertErrorMessage(locator, expectedErrorMessage);
  }
}

/**
 * Helper function exported so components that don't extend BasePage can still
 * reuse the same validation message polling logic.
 */
export async function assertErrorMessage(locator: Locator, expectedErrorMessage: string): Promise<void> {
  await expect(locator).toBeVisible();
  // Poll the input's validationMessage until it contains the expected text
  await expect.poll(
    () => locator.evaluate((el: HTMLInputElement) => el.validationMessage),
    {
      message: `Expected validation message: "${expectedErrorMessage}" `,
      timeout: 5000,
    }
  ).toContain(expectedErrorMessage);
}
