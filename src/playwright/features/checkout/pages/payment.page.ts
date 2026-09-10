import { BasePage } from '@playwright-core/base/base.page';
import { routes } from '@playwright-config/routes';
import { Page, Locator, expect, Response } from '@playwright/test';
import { cardDetailFields, CardDetailFields, CardDetails } from '../types/card-details.type';

export class PaymentPage extends BasePage {
    constructor(protected readonly page: Page) {
        super(page);
    }
    // ======================
    // Locators
    // ======================
    private readonly cartItemSection = this.page.locator('#cart_items');
    private readonly paymentBreadCrumb = this.cartItemSection.locator('div.breadcrumbs').getByText('Payment');
    private readonly paymentHeading = this.cartItemSection.locator('div.step-one').getByRole('heading', { name: 'Payment', level: 2 });
    private readonly homeLink = this.cartItemSection.locator('div.breadcrumbs').getByText('Home');
    private readonly paymentInfo = this.cartItemSection.locator('div.payment-information');
    private readonly payAndConfirmOrderButton = this.paymentInfo.getByRole('button', { name: 'Pay and Confirm Order' });
    private readonly successAlertText = this.page.locator('col-md-12.form-group.hide');
    // ======================
    // Locator Map
    // ======================  
    private readonly cardDetailLocators: Record<CardDetailFields, Locator> = {
        nameOnCard: this.paymentInfo.getByTestId('name-on-card'),
        cardNumber: this.paymentInfo.getByTestId('card-number'),
        cvc: this.paymentInfo.getByTestId('cvc'),
        expiryMonth: this.paymentInfo.getByTestId('expiry-month'),
        expiryYear: this.paymentInfo.getByTestId('expiry-year')
    }

    // ======================
    // State Methods
    // ======================
    public async assertPageLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(new RegExp(`${routes.payment}$`));
        await expect(this.homeLink).toBeVisible();
        await expect(this.paymentBreadCrumb).toBeVisible();
        await expect(this.paymentHeading).toBeVisible();
    }
    public async clickPayAndConfirmOrderButton(): Promise <Response> {
        const responsePromise = this.page.waitForResponse(response => response.url().includes('/payment') && response.request().method() === 'POST');
        await this.payAndConfirmOrderButton.click();
        return responsePromise;
        //await expect(this.successAlertText).not.toBeVisible(); // Playwright cannot verify that the alert message is visible since it the button uses POST method thus page is destroyed
    }
    public async enterCardDetails(data: CardDetails): Promise<void> {
        for (const field of cardDetailFields) {
            await this.cardDetailLocators[field].fill(String(data[field]));
        }
    }
}