# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/login.spec.ts >> Login Functionality >> Invalid Login: 7. Empty email
- Location: tests/ui/login.spec.ts:20:13

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('#slider')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('#slider') with timeout 5000ms
  - waiting for locator('#slider')

```

```yaml
- heading "This website is under heavy load (queue full)" [level=2]
- paragraph: We're sorry, too many people are accessing this website at the same time. We're working on this problem. Please try again later.
```

# Test source

```ts
  1  | import { BasePage } from '@playwright-core/base/base.page';
  2  | import { expect, Page } from '@playwright/test';
  3  | import { routes } from '@playwright-config/routes';
  4  | 
  5  | export class HomePage extends BasePage {
  6  | 
  7  |   constructor(protected readonly page: Page) {
  8  |     super(page);
  9  |   }
  10 | 
  11 |   // ======================
  12 |   // Locators
  13 |   // ======================
  14 |   private readonly recommendedListHeading = this.page.getByRole('heading', { name: 'Recommended Items' });
  15 |   private readonly categoryHeading = this.page.getByRole('heading', { name: 'Category' });
  16 |   private readonly featuresItemsHeadin = this.page.getByRole('heading', { name: 'Features Items' });
  17 |   private readonly brandsHeading = this.page.getByRole('heading', { name: 'Brands' });
  18 |   private readonly slider = this.page.locator('#slider');
  19 | 
  20 |   // ======================
  21 |   // State methods
  22 |   // ======================
  23 |   public async assertPageLoaded(): Promise<void> {
  24 |     await expect(this.page).toHaveURL(new RegExp(`${routes.home}$`), { timeout: 5000 });
> 25 |     await expect(this.slider).toBeVisible();
     |                               ^ Error: expect(locator).toBeVisible() failed
  26 |     await expect(this.recommendedListHeading).toBeVisible();
  27 |     await expect(this.categoryHeading).toBeVisible();
  28 |     await expect(this.featuresItemsHeadin).toBeVisible();
  29 |     await expect(this.brandsHeading).toBeVisible();
  30 |   }
  31 |   
  32 |   // ======================
  33 |   // Action methods
  34 |   // ======================
  35 |   public async navigateToHomePage(): Promise<void> {
  36 |     await this.navigate(routes.home);
  37 |   }
  38 | }
  39 | 
```