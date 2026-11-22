
import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly cartItemNames: Locator;
    readonly cartItemPrices: Locator;
    readonly removeButtons: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.cartItems = page.locator('.cart_item');
        this.cartItemNames = page.locator('.inventory_item_name');
        this.cartItemPrices = page.locator('.inventory_item_price');
        this.removeButtons = page.locator('.cart_button');
        this.continueShoppingButton = page.locator('#continue-shopping');
        this.checkoutButton = page.locator('#checkout');
    }

    async navigate(): Promise<void> {
        await this.page.goto('/cart.html');
    }

    async getCartItemCount(): Promise<number> {
        return await this.cartItems.count();
    }

    async getCartItemNames(): Promise<string[]> {
        return await this.cartItemNames.allInnerTexts();
    }

    async getCartItemPrices(): Promise<string[]> {
        return await this.cartItemPrices.allInnerTexts();
    }

    async removeProduct(productName: string): Promise<void> {
        const cartItem = this.cartItems.filter({
            has: this.page.locator('.inventory_item_name', {
                hasText: productName
            })
        });

        await cartItem.locator('.cart_button').click();
    }

    async continueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
    }

    async proceedToCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }
}