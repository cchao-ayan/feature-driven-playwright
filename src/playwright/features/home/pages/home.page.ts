import { BasePage } from '@playwright-core/base/base.page';
import { expect, Page } from '@playwright/test';
import { routes } from '@playwright-config/routes';

export class HomePage extends BasePage {

  constructor(protected readonly page: Page) {
    super(page);
  }

  // ======================
  // Locators
  // ======================
  private readonly recommendedListHeading = this.page.getByRole('heading', { name: 'Recommended Items' });
  private readonly categoryHeading = this.page.getByRole('heading', { name: 'Category' });
  private readonly featuresItemsHeadin = this.page.getByRole('heading', { name: 'Features Items' });
  private readonly brandsHeading = this.page.getByRole('heading', { name: 'Brands' });
  private readonly slider = this.page.locator('#slider');

  // ======================
  // State methods
  // ======================
  public async assertPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${routes.home}$`), { timeout: 5000 });
    await expect(this.slider).toBeVisible();
    await expect(this.recommendedListHeading).toBeVisible();
    await expect(this.categoryHeading).toBeVisible();
    await expect(this.featuresItemsHeadin).toBeVisible();
    await expect(this.brandsHeading).toBeVisible();
  }
  
  // ======================
  // Action methods
  // ======================
  public async navigateToHomePage(): Promise<void> {
    await this.navigate(routes.home);
  }
}
