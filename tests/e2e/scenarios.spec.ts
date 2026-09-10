import { test } from '@playwright-core/fixtures/auth.fixture';
import { paths } from '@playwright-config/paths';
import { feature, story, step } from 'allure-js-commons';
import { PaymentAPI } from '@playwright-features/checkout/api/payment.api';

test('Verify successful checkout after adding product to cart from products page using Info section', async ({ authPom, authApi }) => {
    feature('E2E Scenarios');
    story('Successful Checkout Flow');
    await step('Open the home page', async () => {
        await authPom.homePage.navigateToHomePage();
        await authPom.homePage.assertPageLoaded();
    });

    await step('Search for a product and add it to the cart', async () => {
        await authPom.homePage.header.clickProductsLink();
        await authPom.productsPage.assertPageLoaded();
        await authPom.productsPage.searchProduct('Dress');
        await authPom.productsPage.compareProductCardWithApi(0, 'info');
        await authPom.productsPage.clickAddToCartButton(0, 'info');
        await authPom.productsPage.cartModal.verifyModalAndContinueShopping();
    });

    await step('Go to cart and start checkout', async () => {
        await authPom.productsPage.header.clickCartLink();
        await authPom.cartPage.assertPageLoaded();
        await authPom.cartPage.clickCheckoutButton();
        await authPom.checkoutPage.assertPageLoaded();
        await authPom.checkoutPage.clickPlaceOrderButton();
    });

    await step('Complete payment and confirm order', async () => {
        await authPom.paymentPage.assertPageLoaded();
        await authPom.paymentPage.enterCardDetails({
            nameOnCard: 'John Doe',
            cardNumber: 12345678901234567,
            cvc: 221,
            expiryMonth: 12,
            expiryYear: 2028
        });
        const response = authPom.paymentPage.clickPayAndConfirmOrderButton();
        await authApi.payment.paymentAPIValidation(response);
        await authPom.paymentDonePage.assertPageLoaded();
        await authPom.paymentDonePage.clickContinueButton();
        await authPom.homePage.assertPageLoaded();
    });
});

test('Verify successful checkout after adding product to cart from products page using Overlay section', async ({ authPom, authApi }) => {
    feature('E2E Scenarios');
    story('Successful Checkout Flow');
    await step('Open the home page', async () => {
        await authPom.homePage.navigateToHomePage();
        await authPom.homePage.assertPageLoaded();
    });

    await step('Search for a product and add it to the cart', async () => {
        await authPom.homePage.header.clickProductsLink();
        await authPom.productsPage.assertPageLoaded();
        await authPom.productsPage.searchProduct('Dress');
        await authPom.productsPage.compareProductCardWithApi(0, 'overlay');
        await authPom.productsPage.clickAddToCartButton(0, 'overlay');
        await authPom.productsPage.cartModal.verifyModalAndContinueShopping();
    });

    await step('Go to cart and start checkout', async () => {
        await authPom.productsPage.header.clickCartLink();
        await authPom.cartPage.assertPageLoaded();
        await authPom.cartPage.clickCheckoutButton();
        await authPom.checkoutPage.assertPageLoaded();
        await authPom.checkoutPage.clickPlaceOrderButton();
    });

    await step('Complete payment and confirm order', async () => {
        await authPom.paymentPage.assertPageLoaded();
        await authPom.paymentPage.enterCardDetails({
            nameOnCard: 'John Doe',
            cardNumber: 12345678901234567,
            cvc: 221,
            expiryMonth: 12,
            expiryYear: 2028
        });
        const response = authPom.paymentPage.clickPayAndConfirmOrderButton();
        await authApi.payment.paymentAPIValidation(response);
        await authPom.paymentDonePage.assertPageLoaded();
        await authPom.paymentDonePage.clickContinueButton();
        await authPom.homePage.assertPageLoaded();
    });
});
