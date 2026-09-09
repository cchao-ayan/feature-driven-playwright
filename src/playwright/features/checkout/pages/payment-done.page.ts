import { BasePage } from '@playwright-core/base/base.page';
import { routes } from '@playwright-config/routes';
import { Page, expect } from '@playwright/test';

export class PaymentDonePage extends BasePage {
    constructor(protected readonly page: Page) {
        super(page);
    }
    // ======================
    // Locators
    // ======================
    private readonly orderPlacedHeading = this.page.getByTestId('order-placed');
    private readonly confirmedText = this.page.getByText('Congratulations! Your order has been confirmed!');
    private readonly downloadInvoiceButton = this.page.getByRole('link', { name: 'Download Invoice' });
    private readonly continueButton = this.page.getByTestId('continue-button');
    private readonly verifyText = this.page.getByText('Please wait while your')
    // ======================
    // State Methods
    // ======================
    public async assertPageLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(new RegExp(routes.paymentDone));
        await expect(this.orderPlacedHeading).toBeVisible();
        await expect(this.confirmedText).toBeVisible();
        await expect(this.downloadInvoiceButton).toBeVisible();
        await expect(this.continueButton).toBeVisible();
    }

    public async clickContinueButton(): Promise<void> {
        await this.continueButton.click();
        if (await this.verifyText.isVisible()) {
            await expect(this.verifyText).toBeVisible({ timeout: 5000 });
        }
    }
}