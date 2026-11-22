
import { test, expect } from '../../src/fixtures/testFixtures';
import { checkoutData } from '../../src/data/checkoutData';
import { env } from '../../src/config/env';
import { DownloadHelper } from '../../src/utils/downloadHelper';

test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.navigate(env.inventoryURL);
})

test.afterAll(async ({ page }) => {
    await page.close();
})

test.describe('Checkout Tests', () => {

    test('[@smoke] Verify successful order placement', async ({ page, inventoryPage, cartPage, checkoutPage }) => {

        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await inventoryPage.openCart();

        await cartPage.proceedToCheckout();

        await expect(page).toHaveURL(/checkout-step-one.html/);

        await checkoutPage.fillCustomerInformation(
            checkoutData.validCustomer.firstName,
            checkoutData.validCustomer.lastName,
            checkoutData.validCustomer.postalCode
        );

        await checkoutPage.continueToOverview();

        await expect(page).toHaveURL(/checkout-step-two.html/);
        await expect(checkoutPage.subtotal).toContainText('Item total');

        await checkoutPage.finishOrder();

        await expect(page).toHaveURL(/checkout-complete.html/);
        await expect(checkoutPage.confirmationHeader).toHaveText('Thank you for your order!');

        console.log(
            'Download button count:',
            await page.getByRole('button', { name: 'Generate PDF order' }).count()
        );

        const download = await DownloadHelper.downloadFile(page,async () => {
                await page.getByRole('button', {
                    name: 'Generate PDF order'
                }).click();
            }
        );

        const fileName = download.suggestedFilename();

        console.log('Downloaded file:', fileName);

        await DownloadHelper.saveDownload(download,`test-results/downloads/${fileName}`);
    });


    for (const data of checkoutData.validationCases) {
        test(`Verify checkout validation: ${data.scenario}`, async ({
            inventoryPage,
            cartPage,
            checkoutPage
        }) => {
            await inventoryPage.navigate(env.inventoryURL);

            await inventoryPage.addProductToCart('Sauce Labs Backpack');
            await inventoryPage.openCart();

            await cartPage.proceedToCheckout();

            await checkoutPage.fillCustomerInformation(
                data.firstName,
                data.lastName,
                data.postalCode
            );

            await checkoutPage.continueToOverview();

            await expect(checkoutPage.errorMessage)
                .toHaveText(data.expectedError);
        });
    }

    test('[@smoke] Verify Price Calculations in Checkout', async ({ page, inventoryPage, cartPage, checkoutPage }) => {

        const prices = await inventoryPage.getProductPrices();

        const expectedSubTotal = prices.slice(0, 2).reduce((sum, price) => sum + Number(price.replace('$', '')), 0)

        const productNames = await inventoryPage.getProductNames();

        for (const product of productNames.slice(0, 2)) {
            await inventoryPage.addProductToCart(product);
        }

        await expect(inventoryPage.cartBadgeNumber).toHaveText('2')

        await inventoryPage.openCart();

        // const cartCount = await cartPage.getCartItemCount();
        // expect(cartCount).toEqual(2);

        await cartPage.proceedToCheckout();

        await checkoutPage.fillCustomerInformation(
            checkoutData.validCustomer.firstName,
            checkoutData.validCustomer.lastName,
            checkoutData.validCustomer.postalCode);

        await checkoutPage.continueToOverview();

        const subtotalText = await checkoutPage.subtotal.innerText();
        const taxText = await checkoutPage.tax.innerText();
        const totalText = await checkoutPage.total.innerText();

        const actualSubtotal = Number(subtotalText.replace('Item total: $', ''));
        const tax = Number(taxText.replace('Tax: $', ''));
        const total = Number(totalText.replace('Total: $', ''));

        expect(actualSubtotal).toBeCloseTo(expectedSubTotal, 2);
        expect(total).toBeCloseTo(actualSubtotal + tax, 2);
    })
});
