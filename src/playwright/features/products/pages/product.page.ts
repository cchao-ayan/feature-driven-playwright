import { BasePage } from '@playwright-core/base/base.page';
import { routes } from '@playwright-config/routes';
import { expect, Page, Locator } from '@playwright/test';
import { ProductApi, ProductCard, normalizeProductData } from '@playwright-features/products/types/product.type';
import { compareByKey } from '@playwright-shared/utils/comparison/compare-by-key';
import { ProductAPI } from '../api/product.api';
import { CartModalComponent } from '../component/cart-modal.component';

type ProductView = 'info' | 'overlay';

export class ProductsPage extends BasePage {
  public readonly cartModal: CartModalComponent;

  constructor(protected readonly page: Page) {
    super(page);
    //console.log('ProductsPage constructor called');
    this.cartModal = new CartModalComponent(this.page);
  }

  // ======================
  // Locators
  // ======================
  private readonly featureItemsSection = this.page.getByRole('heading', { name: 'Features Items' });
  private readonly allProductsSection = this.page.getByRole('heading', { name: 'All Products' });
  private readonly categorySection = this.page.getByRole('heading', { name: 'Category' });
  private readonly brandSection = this.page.getByRole('heading', { name: 'Brands' });
  private readonly searchProductSection = this.page.getByRole('heading', { name: 'Searched Products' });
  private readonly recommendedSection = this.page.locator('div.recommended-items');
  // Buttons
  private readonly addToCartButton = this.page.getByText('Add to cart');
  private readonly searchButton = this.page.locator('#submit_search');
  private readonly searchProductInput = this.page.getByRole('textbox', { name: 'Search Product' });
  // Texts
  private readonly idText = this.page.locator('a').first();
  private readonly nameText = this.page.locator('p').first();
  private readonly priceText = this.page.getByText('Rs.');
  // Images
  private readonly productImage = this.page.locator('img').first();
  // Link
  private readonly poloLink = this.page.getByRole('link', { name: 'Polo' });
  private readonly viewProductLink = this.page.getByRole('link', { name: 'View Product' });
  // Containers
  private readonly productsContainer = this.page.locator('.features_items');
  private readonly perPoductContainer = this.page.locator('.col-sm-4');
  private readonly productInfo = this.page.locator('.productinfo');
  private readonly productOverlay = this.page.locator('.product-overlay');

  // ======================
  // State Methods
  // ======================
  public async assertPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${routes.products}$`));
    await expect(this.allProductsSection).toBeVisible();
    await expect(this.brandSection).toBeVisible();
    await expect(this.categorySection).toBeVisible();
  }

  // ======================
  // Action Methods
  // ======================
  public productAt(index: number): Locator {
    return this.productsContainer.locator(this.perPoductContainer).nth(index); // locator('.features_items').locator('.col-sm-4')
  }
  public productViewAt(index: number, view: ProductView): Locator {
    return view === 'info'
      ? this.productAt(index).locator(this.productInfo)
      : this.productAt(index).locator(this.productOverlay);
    // if (view === 'info') {
    //   return this.productAt(index).locator(this.locators.productInfo);
    // }
    // if (view === 'overlay') {
    //   return this.productAt(index).locator(this.locators.productOverlay);
    // }
    // return this.productAt(index);
  }
  public async productID(index: number, view: ProductView): Promise<string | null> {
    return this.productViewAt(index, view)
      .locator(this.idText)
      .getAttribute('data-product-id');
  }
  public async productName(index: number, view: ProductView): Promise<string> {
    return this.productViewAt(index, view).locator(this.nameText).innerText();
  }
  public async productPrice(index: number, view: ProductView): Promise<string> {
    const priceText = await this.productViewAt(index, view).locator(this.priceText).innerText();
    //console.log(`Product price text at index ${index} in view ${view}: ${priceText}`);
    return priceText;
    // return this.productViewAt(index, view).locator(this.priceText).innerText();
  }
  public async clickAddToCartButton(index: number, view: ProductView): Promise<void> {
    await this.productViewAt(index, view).locator(this.addToCartButton).first().click();
  }
  public async clickViewProductButton(index: number): Promise<void> {
    await this.productAt(index).locator(this.viewProductLink).click();
  }
  public async searchProduct(search: string): Promise<void> {
    await this.searchProductInput.fill(search);
    await this.searchButton.click();
  }

  // ======================
  // Helper Methods
  // ======================
  public async productCard(index: number, view: ProductView): Promise<ProductCard> {
    return {
      id: await this.productID(index, view),
      name: await this.productName(index, view),
      price: await this.productPrice(index, view),
    };
  }

  /**
   * Compares the product card displayed in the UI with the same product from the API.
   *
   * Steps:
   *   1. Reads the product id, name and price from the product card in the given view.
   *   2. Loads the full product list from the API.
   *   3. Finds the API product that matches the UI id.
   *   4. Normalizes the API response to the UI product shape.
   *   5. Verifies that id, name and price match between UI and API.
   *
   * This method is intentionally awaited by callers, so any mismatch or missing API product
   * will reject the returned promise instead of being swallowed.
   */
  public async compareProductCardWithApi(
    index: number,
    view: ProductView,
  ): Promise<void> {
    const ui = await this.productCard(index, view);
    const products = await new ProductAPI(this.page.request).getAllProducts();

    const product = products.find((p) => String(p.id) === ui.id);
    if (!product) {
      throw new Error(`Product with ID ${ui.id} not found in API response`);
    }

    const api = normalizeProductData(product);
    compareByKey(ui, api, ['id', 'name', 'price']);
  }
}
