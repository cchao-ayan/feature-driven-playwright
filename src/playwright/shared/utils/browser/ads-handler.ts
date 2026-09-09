import { Page } from '@playwright/test';
import { Logger } from '@playwright-shared/utils/logger/logger';

export class AdHandler {
  private handlersRegistered = false;

  constructor(private readonly page: Page) {}

  /**
   * Registers automatic handlers that close modal / popup ads
   * ONLY when they block an action.
   *
   * Uses Playwright's addLocatorHandler to:
   * - Avoid explicit waits
   * - Keep tests clean
   * - Prevent flaky failures caused by overlays
   */
  // async playwrightAdHandler(): Promise<void> {
  //   // Common selectors used by modal and popup ads
  //   const closeSelectors = [
  //     'button:has-text("Close")',
  //     'button:has-text("×")',
  //     '.modal-close',
  //     '.close',
  //     '[aria-label="Close"]',
  //   ];

  //   // Register a handler for each selector
  //   // Playwright will auto-trigger this ONLY if the locator blocks an action
  //   for (const selector of closeSelectors) {
  //     await this.page.addLocatorHandler(this.page.locator(selector), async (locator) => {
  //       Logger.info(`Auto-closing popup using selector: ${selector}`);
  //       await locator.click();
  //     });
  //   }
  // }

  // /**
  //  * Handles JavaScript dialogs such as:
  //  * - alert()
  //  * - confirm()
  //  * - prompt()
  //  *
  //  * These dialogs are NOT DOM elements and cannot be handled by locators
  //  */
  // async handleDialogs(): Promise<void> {
  //   this.page.on('dialog', async (dialog) => {
  //     Logger.info(`Dialog detected: ${dialog.message()}`);
  //     try {
  //       if (dialog.message().includes('Press OK to proceed!')) {
  //         Logger.info('Accepting success dialog');
  //         await dialog.accept();
  //         return; // handled
  //       }
  //       Logger.info('Dialog dismissed');
  //       await dialog.dismiss();        
  //     } catch (err) {
  //       // dialog may already be handled by another listener or the test; ignore duplicate handling
  //       Logger.error('Dialog handling error (possibly already handled):', (err as Error).message);
  //     }
  //   });
  // }

  // /**
  //  * Handles unexpected popup windows or new browser tabs
  //  * triggered by ads or third-party links
  //  */
  // async handlePopups(): Promise<void> {
  //   this.page.on('popup', async (popup) => {
  //     Logger.info('Unexpected popup detected — closing it');
  //     await popup.close();
  //   });
  // }

  /**
   * Preventive approach:
   * Blocks common ad-related network requests before they load
   *
   * This helps reduce:
   * - Flakiness
   * - Page load delays
   * - Unexpected UI overlays
   */
  async blockAds(): Promise<void> {
    await this.page.route('**/*', (route) => {
      const url = route.request().url();

      // Abort requests coming from known ad providers
      if (url.includes('ads') || url.includes('doubleclick') || url.includes('googlesyndication')) {
        Logger.info(`Blocking ad request: ${url}`);
        route.abort();
      } else {
        route.continue();
      }
    });
  }

  /** Compile the ads handler in one method */
  async registerAutoCloseHandlers(): Promise<void> {
    if (this.handlersRegistered) return; // ensures handlers are registered only once per test run
    this.handlersRegistered = true;

    // await this.playwrightAdHandler();
    // await this.handleDialogs();
    // await this.handlePopups();
    await this.blockAds();
  }
}
