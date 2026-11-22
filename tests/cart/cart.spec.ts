import { env } from '../../src/config/env'
import { test, expect } from '../../src/fixtures/testFixtures';

test.describe('Shopping Cart Tests', () => {

    test.beforeEach(async ({ inventoryPage }) => {
        await inventoryPage.navigate(env.inventoryURL);
    });

    test('[@smoke] Verify products can be added to cart', async ({ page, inventoryPage, cartPage }) => {

        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await inventoryPage.addProductToCart('Sauce Labs Bike Light');

        await expect(inventoryPage.cartBadgeNumber).toHaveText('2');

        await inventoryPage.openCart();

        await expect(cartPage.cartItems).toHaveCount(2);

        const cartProducts = await cartPage.getCartItemNames();

        expect(cartProducts).toContain('Sauce Labs Backpack');
        expect(cartProducts).toContain('Sauce Labs Bike Light');
    });

    test('[@smoke] Verify product can be removed from cart', async ({ inventoryPage, cartPage }) => {

        await inventoryPage.addProductToCart('Sauce Labs Backpack');

        await inventoryPage.openCart();

        await cartPage.removeProduct('Sauce Labs Backpack');

        await expect(cartPage.cartItems).toHaveCount(0);
    });

    test('[@smoke] Verify continue shopping navigation', async ({ page, inventoryPage, cartPage }) => {

        await inventoryPage.openCart();

        await cartPage.continueShopping();

        await expect(page).toHaveURL(/inventory.html/);
    });

    test('[@smoke] Verify cart badge disappears after removing last product', async ({ inventoryPage, cartPage }) => {
        await inventoryPage.navigate(env.inventoryURL);

        await inventoryPage.addProductToCart('Sauce Labs Backpack');

        await expect(inventoryPage.cartBadgeNumber).toHaveText('1');

        await inventoryPage.openCart();
        await cartPage.removeProduct('Sauce Labs Backpack');

        await expect(inventoryPage.cartBadgeNumber).toBeHidden();
        await expect(cartPage.cartItems).toHaveCount(0);
    });

    test('[@smoke] Verify all inventory products can be added to cart', async ({ inventoryPage, cartPage }) => {
        await inventoryPage.navigate(env.inventoryURL);

        const productCount = await inventoryPage.getProductCount();

        const productNames = await inventoryPage.getProductNames();

        for (const product of productNames) {
            await inventoryPage.addProductToCart(product);
        }

        await expect(inventoryPage.cartBadgeNumber).toHaveText(String(productCount));

        await inventoryPage.openCart();

        await expect(cartPage.cartItems).toHaveCount(productCount);
    });

});