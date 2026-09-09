import { BasePage } from '@playwright-core/base/base.page';
import { routes } from '@playwright-config/routes';
import { Page, expect } from '@playwright/test';

export class CartPage extends BasePage {
    constructor(protected readonly page: Page) {
        super(page);
    }
    // ======================
    // Locators
    // ======================
    private readonly homeLink = this.page.getByRole('link', { name: 'Home' });
    private readonly cartHeading = this.page.getByText('Shopping Cart');
    private readonly checkoutButton = this.page.getByText('Proceed To Checkout');
    private readonly emptyCartMessage = this.page.getByText('Cart is empty! Click');
    private readonly emptyCartProductsLink = this.emptyCartMessage.getByRole('link', { name: 'here' });
    //columns
    private readonly cartMenu = this.page.locator('.cart_info .cart_info_table .cart_menu');
    private readonly cartImage = this.cartMenu.getByText('Image');
    private readonly cartDescription = this.cartMenu.getByText('Description');
    private readonly cartPrice = this.cartMenu.getByText('Price');
    private readonly cartQuantity = this.cartMenu.getByText('Quantity')
    private readonly cartTotal = this.cartMenu.getByText('Total');
    // data rows
    private readonly productRows = this.page.locator('#product-');
    // ======================
    // State Methods
    // ======================
    public async assertPageLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(new RegExp(`${routes.cart}$`));
        await expect(this.cartHeading).toBeVisible();

    }
    public async clickCheckoutButton(): Promise<void> {
        await this.checkoutButton.click();
    }
}