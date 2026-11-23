import {test, expect} from '../../src/fixtures/testFixtures'
import { env } from '../../src/config/env'

test.describe('Inventory Page Tests', () => {

    test.beforeEach(async ({ inventoryPage }) => {
        await inventoryPage.navigate(env.inventoryURL);
    });

    test('[@smoke] Verify inventory page displays six products', async ({ page, inventoryPage }) => {

        await expect(page).toHaveURL(/inventory.html/);

        expect(await inventoryPage.getProductCount()).toBe(6);
    });

    test('[@smoke] Verify product names are displayed', async ({ inventoryPage }) => {

        const productNames = await inventoryPage.getProductNames();

        expect(productNames).toContain('Sauce Labs Backpack');
        expect(productNames).toContain('Sauce Labs Bike Light');
    });

    test('[@smoke] Verify product prices are displayed', async ({ inventoryPage }) => {

        const prices = await inventoryPage.getProductPrices();

        expect(prices).toHaveLength(6);

        for (const price of prices) {
            expect(price).toMatch(/^\$\d+\.\d{2}$/);
        }
    });

    test('Verify About Us page is displayed through Menu option', async ({inventoryPage, page}) => {
        await inventoryPage.goToAboutPage();

        await expect(page).toHaveURL('https://saucelabs.com/');
    })
});