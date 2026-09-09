import { BasePage } from '@playwright-core/base/base.page';
import { expect, Page, Locator } from '@playwright/test';
import { routes } from '@playwright-config/routes';
import { assertTextEquals } from '@playwright-shared/assertion/generic';
import { SignupFormFields, InvalidSignupFormTestData, SignupFormValidationResult, SignupFormTestData } from '@playwright-features/auth/types/index';

export class SignUpPage extends BasePage {

  constructor(protected readonly page: Page) {
    super(page);
  }

  // ======================
  // Locators
  // ======================
  private readonly accountInfoHeading = this.page.getByRole('heading', { name: 'Enter Account Information' });
  private readonly addressInfoHeading = this.page.getByRole('heading', { name: 'Address Information' });
  // Inputs
  private readonly nameInput = this.page.getByTestId('name');
  private readonly emailInput = this.page.getByTestId('email');
  private readonly passwordInput = this.page.getByTestId('password');
  private readonly firstNameInput = this.page.getByTestId('first_name');
  private readonly lastNameInput = this.page.getByTestId('last_name');
  private readonly companyInput = this.page.getByTestId('company');
  private readonly address1Input = this.page.getByTestId('address');
  private readonly address2Input = this.page.getByTestId('address2');
  private readonly stateInput = this.page.getByTestId('state');
  private readonly cityInput = this.page.getByTestId('city');
  private readonly zipcodeInput = this.page.getByTestId('zipcode');
  private readonly mobileNumberInput = this.page.getByTestId('mobile_number');
  //Dropdown list
  private readonly dayOfBirthSelection = this.page.getByTestId('days');
  private readonly monthOfBirthSelection = this.page.getByTestId('months');
  private readonly yearOfBirthSelection = this.page.getByTestId('years');
  private readonly countrySelection = this.page.getByTestId('country');
  // Radio buttons
  private readonly mrRadioButton = this.page.getByRole('radio', { name: 'Mr.' });
  private readonly mrsRadioButton = this.page.getByRole('radio', { name: 'Mrs.' });
  // Checkboxes
  private readonly newsletterCheckbox = this.page.getByRole('checkbox', { name: 'Sign up for our newsletter!' });
  private readonly offersCheckbox = this.page.getByRole('checkbox', { name: 'Receive special offers from' });
  //Button
  private readonly createAccountButton = this.page.getByTestId('create-account');

  // ======================
  // Locator Map
  // ======================
  private readonly signupFormField: Record<SignupFormFields, Locator> = {
    title: this.mrRadioButton,
    name: this.nameInput,
    email: this.emailInput,
    password: this.passwordInput,
    day: this.dayOfBirthSelection,
    month: this.monthOfBirthSelection,
    year: this.yearOfBirthSelection,
    newsletter: this.newsletterCheckbox,
    offers: this.offersCheckbox,
    firstname: this.firstNameInput,
    lastname: this.lastNameInput,
    company: this.companyInput,
    address1: this.address1Input,
    address2: this.address2Input,
    country: this.countrySelection,
    state: this.stateInput,
    city: this.cityInput,
    zipcode: this.zipcodeInput,
    mobile_number: this.mobileNumberInput,
  }
  // ======================
  // ======================
  // State Methods
  // ======================
  public async assertPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${routes.signup}$`));
    await expect(this.accountInfoHeading).toBeVisible();
    await expect(this.addressInfoHeading).toBeVisible();
  }

  // ======================
  // Assertion Methods
  // ======================
  public async verifyNameAndEmailPrefilled(username: string, email: string): Promise<void> {
    const nameText = await this.nameInput.getAttribute('value');
    assertTextEquals(nameText as string, username);

    const emailText = await this.emailInput.getAttribute('value');
    assertTextEquals(emailText as string, email);
  }

  // ======================
  // Action Methods
  // ======================
  public async titleSelection(user?: string): Promise<void> {
    if (user !== undefined) {
      if (user.toLowerCase() === 'mr') {
        await this.mrRadioButton.click();
      } else if (user.toLowerCase() === 'mrs') {
        await this.mrsRadioButton.click();
      }
    }
  }
  public async enterAccountInfo(data: { username: string, email: string, password?: string, title?: string }): Promise<void> {
    if (data.title !== undefined) {
      await this.titleSelection(data.title);
    }
    await this.verifyNameAndEmailPrefilled(data.username, data.email);
    if (data.password !== undefined) {
      await this.passwordInput.fill(data.password);
    }
  }
  public async enterBirthDate(data: { day?: string, month?: string, year?: string }): Promise<void> {
    if (data.day !== undefined) {
      await this.dayOfBirthSelection.selectOption({ value: data.day });
    }
    if (data.month !== undefined) {
      await this.monthOfBirthSelection.selectOption({ value: data.month });
    }
    if (data.year !== undefined) {
      await this.yearOfBirthSelection.selectOption({ value: data.year });
    }
  }
  public async checkNewsletterAndOffers(data: { newsletter?: boolean, offers?: boolean }): Promise<void> {
    if (!await this.newsletterCheckbox.isChecked() && data.newsletter) {
      await this.newsletterCheckbox.check();
    }
    if (!await this.offersCheckbox.isChecked() && data.offers) {
      await this.offersCheckbox.check();
    }
  }
  public async enterAddressInfo(data: { firstname?: string, lastname?: string, company?: string, address1?: string, address2?: string, country?: string, state?: string, city?: string, zipcode?: string, mobile_number?: string }): Promise<void> {
    if (data.firstname !== undefined) {
      await this.firstNameInput.fill(data.firstname);
    }
    if (data.lastname !== undefined) {
      await this.lastNameInput.fill(data.lastname);
    }
    if (data.company !== undefined) {
      await this.companyInput.fill(data.company);
    }
    if (data.address1 !== undefined) {
      await this.address1Input.fill(data.address1);
    }
    if (data.address2 !== undefined) {
      await this.address2Input.fill(data.address2);
    }
    await this.countrySelection.selectOption({ value: data.country });
    if (data.state !== undefined) {
      await this.stateInput.fill(data.state);
    }
    if (data.city !== undefined) {
      await this.cityInput.fill(data.city);
    }
    if (data.zipcode !== undefined) {
      await this.zipcodeInput.fill(data.zipcode);
    }
    if (data.mobile_number !== undefined) {
      await this.mobileNumberInput.fill(data.mobile_number);
    }
  }
  public async fillSignUpForm(user: InvalidSignupFormTestData | SignupFormTestData): Promise<void> {
    await this.enterAccountInfo({
      username: user.name,
      email: user.email,
      password: user.password,
      title: user.title
    });
    await this.enterBirthDate({
      day: user.day,
      month: user.month,
      year: user.year
    });
    await this.checkNewsletterAndOffers({
      newsletter: user.newsletter,
      offers: user.offers
    });
    await this.enterAddressInfo({
      firstname: user.firstname,
      lastname: user.lastname,
      company: user.company,
      address1: user.address1,
      address2: user.address2,
      country: user.country,
      state: user.state,
      city: user.city,
      zipcode: user.zipcode,
      mobile_number: user.mobile_number
    });
  }
  public async clickCreateAccountButton(): Promise<void> {
    await this.createAccountButton.click();
  }

  public async submitSignupForm(user: InvalidSignupFormTestData | SignupFormTestData): Promise<void> {
    await this.fillSignUpForm(user);
    await this.clickCreateAccountButton();
  }

  public async assertSignupInputValidation(result: SignupFormValidationResult): Promise<void> {
    switch (result.type) {
      case 'missing_password':
      case 'missing_firstname':
      case 'missing_lastname':
      case 'missing_address1':
      case 'missing_city':
      case 'missing_state':
      case 'missing_zipcode':
      case 'missing_mobile_number':
        // Extract the field name from the validation type and assert the error message on the corresponding field
        const field = result.type.replace('missing_', '') as SignupFormFields;
        await this.assertErrorMessage(this.signupFormField[field], result.message);
        break;

      default:
        throw new Error(`Unhandled validation type: ${(result as any).type}`);
    }
  }

}
