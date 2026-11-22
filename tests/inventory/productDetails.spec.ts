import {expect, test} from '../../src/fixtures/testFixtures'
import { env } from '../../src/config/env';

test.describe('Inventory Page Tests', () => {

    test.beforeEach(async ({ inventoryPage }) => {
        await inventoryPage.navigate(env.inventoryURL);
    });

    test.afterAll(async ({page}) => {
        await page.close();
    })

    test('[@smoke] Verify product details are visible', async ({ inventoryPage,productDetailsPage })=>{

        await inventoryPage.goToProductDetailsPage('Sauce Labs Backpack');

        await expect(productDetailsPage.productName).toHaveText('Sauce Labs Backpack')

        await expect(productDetailsPage.addToCartButton).toBeVisible()

        await expect(productDetailsPage.backToProductsButton).toBeVisible();

        await expect(productDetailsPage.productDescription).toBeVisible();

        await expect(productDetailsPage.productImage).toBeVisible();
    });

    test('[@smoke] Verify Product is Added from Product Details Page', async ({inventoryPage, productDetailsPage}) => {
        
        await inventoryPage.goToProductDetailsPage('Sauce Labs Backpack');

        await productDetailsPage.addToCart('Sauce Labs Backpack');
        await productDetailsPage.backToProductsPage();

        await expect(inventoryPage.cartBadgeNumber).toHaveText('1')
    })
});