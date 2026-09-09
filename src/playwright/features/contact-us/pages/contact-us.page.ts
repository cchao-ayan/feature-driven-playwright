import { BasePage } from '@playwright-core/base/base.page';
import * as validTestData from '@playwright-features/contact-us/datas/valid.test-data.json'
import { routes } from '@playwright-config/routes';
import { paths } from '@playwright-config/paths';
import { Page, expect } from '@playwright/test';

export class ContactUsPage extends BasePage {

  constructor(protected readonly page: Page) {
    super(page);
  }
  // ======================
  // Locators
  // ======================
  private readonly contactUsHeading = this.page.getByRole('heading', { name: 'Contact Us' });
  private readonly getInTouchHeading = this.page.getByRole('heading', { name: 'Get In Touch' });
  private readonly feedbackHeading = this.page.getByRole('heading', { name: 'Feedback For Us' });
  private readonly nameInput = this.page.getByTestId('name');
  private readonly emailInput = this.page.getByTestId('email');
  private readonly subjectInput = this.page.getByTestId('subject');
  private readonly messageInput = this.page.locator('message');
  private readonly uploadButton = this.page.locator('input[name="upload file"]');
  private readonly submitButton = this.page.locator('submit-button');
  private readonly homeButton = this.page.locator('a.btn.btn-success >> span:has-text("Home")');
  private readonly noteText = this.page.getByText('Note: Below contact form is for testing purpose.');
  private readonly feedback1Text = this.page.locator(
    'p:has-text("We really appreciate your response to our website.")',
  );
  private readonly feedback2Text = this.page.locator(
    'p:has-text("Kindly share your feedback with us at feedback@automationexercise.com.")',
  );
  private readonly feedback3Text = this.page.locator(
    'p:has-text("If you have any suggestion areas or improvements, do let us know. We will definitely work on it.")',
  );
  private readonly feedback4Text = this.page.locator('p:has-text("Thank you")');
  private readonly successText = this.page.getByText('Success! Your details have');
  // ======================
  // State Methods
  // ======================
  protected async assertPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${routes.contactUs}$`));
    await expect(this.contactUsHeading).toBeVisible();
    await expect(this.feedbackHeading).toBeVisible();
    await expect(this.getInTouchHeading).toBeVisible();
  }
  // ======================
  // Action Methods
  // ======================
  public async fillContactUsForm() {
    await this.nameInput.fill(validTestData.name);
    await this.emailInput.fill(validTestData.email);
    await this.subjectInput.fill(validTestData.subject);
    await this.messageInput.fill(validTestData.message);
  }
  public async uploadFile() {
    await this.uploadButton.setInputFiles(paths.upload.contactUs);
  }
  public async clickSubmitButton() {
    await this.submitButton.click();
  }
  public async submitContactUsForm() {
    await this.fillContactUsForm();
    await this.uploadFile();
    await this.clickSubmitButton();
  }
  public async verifySuccessMessageState() {
    await expect(this.noteText).toBeVisible();
    await expect(this.successText).toBeVisible();
    await expect(this.homeButton).toBeVisible();
  }
  public async clickHomeButton() {
    await this.homeButton.click();
  }
}
