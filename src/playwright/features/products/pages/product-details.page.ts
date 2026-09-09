import { BasePage } from '@playwright-core/base/base.page';
import { normalizeProductData } from '@playwright-features/products/types/product.type';
import { Page, expect } from '@playwright/test';
import { ProductAPI } from '../api/product.api';
import { ProductDetails } from '@playwright-features/products/types/product.type';
import { compareByKey } from '@playwright-shared/utils';
import { routes } from '@playwright-config/routes';

export class ProductDetailsPage extends BasePage {

  constructor(protected readonly page: Page) {
    super(page);
  }
  
  // ======================
  // Locators
  // ======================
  // root Locator
  private readonly productInfo = this.page.locator('div.product-information');
  // component of productInfo locator
  private readonly productID = this.productInfo.locator('#product_id');
  private readonly productName = this.productInfo.locator('h2').first();
  private readonly productPrice = this.productInfo.getByText('Rs.');
  private readonly productBrand = this.productInfo.locator('p').last();
  private readonly productCategory = this.productInfo.locator('p').first();
  private readonly addToCartButton = this.productInfo.getByRole('button', { name: 'Add to cart' });
  private readonly productImage = this.productInfo.locator('img').first();
  private readonly viewProductButton = this.productInfo.getByRole('link', { name: 'View Product' });
  private readonly productRating = this.productInfo.locator('img').nth(2);
  private readonly productQuantiyLabel = this.productInfo.getByText('Quantity:');
  private readonly productQuantity = this.productInfo.locator('#quantity');
  private readonly productAvailability = this.productInfo.getByText('Availability:');
  private readonly productCondition = this.productInfo.getByText('Condition:');
  // other locators
  private readonly newIcon = this.page.getByRole('img', { name: 'ecommerce website products' }).nth(1);
  private readonly submitButton = this.page.getByRole('button', { name: 'Submit' });
  private readonly reviewSection = this.page.getByText('Write Your Review');
  private readonly reviewNameInput = this.page.getByPlaceholder('Your Name');
  private readonly reviewEmailInput = this.page.getByPlaceholder('Email Address');
  private readonly reviewTextInput = this.page.getByPlaceholder('Your Review');

  // ======================
  // State Methods
  // ======================
  public async assertPageLoaded(index: number): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${routes.productDetails}${index}$`));
    await expect(this.addToCartButton).toBeVisible();
    await expect(this.reviewSection).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  // ======================
  // Getter Methods
  // ======================
  public async getProductID(): Promise<string | null> {
    return await this.productID.getAttribute('value');
  }
  public async getProductName(): Promise<string> {
    return await this.productName.innerText();
  }
  public async getProductPrice(): Promise<string> {
    return await this.productPrice.first().innerText();
  }
  public async getProductBrand(): Promise<string> {
    const brand = await this.productBrand.innerText();
    return brand.replace('Brand: ', '').trim();
  }
  public async getProductCategory(): Promise<string> {
    const text = await this.productCategory.innerText();
    const removeCategoryText = text.replace('Category: ', '').trim();
    return removeCategoryText.split(' > ')[1];
  }
  public async getProductUsertype(): Promise<string> {
    const text = await this.productCategory.innerText();
    const removeCategoryText = text.replace('Category: ', '').trim();
    return removeCategoryText.split(' > ')[0];
  }
  // ======================
  // Action Methods
  // ======================
  public async clickAddToCartButton() {
    await this.addToCartButton.click();
  }
  public async clickReviewSection() {
    await this.reviewSection.click();
  }
  public async clickSubmitButton() {
    await this.submitButton.click();
  }
  // ======================
  // Helper Methods
  // ======================
  private async readCardDetailsFromUI(): Promise<ProductDetails> {
    return {
      id: await this.getProductID(),
      name: await this.getProductName(),
      price: await this.getProductPrice(),
      brand: await this.getProductBrand(),
      usertype: await this.getProductUsertype(),
      category: await this.getProductCategory(),
    };
  }

    public async compareProductDetailsWithApi(index: number): Promise<void> {
    const ui = await this.readCardDetailsFromUI();
    const products = await new ProductAPI(this.page.request).getAllProducts();
    
        const product = products.find((p) => String(p.id) === ui.id);
        if (!product) {
          throw new Error(`Product with ID ${ui.id} not found in API response`);
        }
    
        const api = normalizeProductData(product);
    compareByKey(ui, api, ['id', 'name', 'price', 'brand', 'usertype', 'category']);
  }
}
