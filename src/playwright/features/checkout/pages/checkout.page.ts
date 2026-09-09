import { BasePage } from '@playwright-core/base/base.page';
import { routes } from '@playwright-config/routes';
import { Page, expect } from '@playwright/test';

export class CheckOutPage extends BasePage {
    constructor(protected readonly page: Page) {
        super(page);
    }
    // ======================
    // Locators
    // ======================
    private readonly cartItemSection = this.page.locator('#cart_items');
    private readonly checkoutHeading = this.cartItemSection.getByText('Checkout');
    private readonly homeLink = this.cartItemSection.getByRole('link', { name: 'Home' });
    private readonly addressDetailsHeading = this.cartItemSection.getByRole('heading', { name: 'Address Details', level: 2 });
    private readonly reviewYourOrderHeading = this.cartItemSection.getByRole('heading', { name: 'Review Your Order', level: 2 });
    private readonly deliveryAddressHeading = this.cartItemSection.getByRole('heading', { name: 'Delivery Address', level: 3 });
    private readonly billingAddressHeading = this.cartItemSection.getByRole('heading', { name: 'Billing Address', level: 3 });
    private readonly placeOrderButton = this.cartItemSection.getByRole('link', { name: 'Place Order' });
    // ======================
    // State Methods
    // ======================
    public async assertPageLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(new RegExp(`${routes.checkout}$`));
        await expect(this.homeLink).toBeVisible();
        await expect(this.checkoutHeading).toBeVisible();
        await expect(this.addressDetailsHeading).toBeVisible();
        await expect(this.reviewYourOrderHeading).toBeVisible();
        await expect(this.deliveryAddressHeading).toBeVisible();
        await expect(this.billingAddressHeading).toBeVisible(); 
    }
    public async clickPlaceOrderButton(): Promise<void> {
        await this.placeOrderButton.click();
    }
}