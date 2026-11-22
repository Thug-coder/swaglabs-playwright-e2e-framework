import { Page, Locator } from '@playwright/test'

export class InventoryPage {
    readonly page: Page;

    readonly inventoryPageTitle: Locator;
    readonly productItems: Locator
    readonly cartBadgeNumber: Locator;
    readonly productName: Locator;
    readonly productDescription: Locator;
    readonly productPrice: Locator;
    readonly addToCardButton: Locator;
    readonly cartButton: Locator
    readonly sortDropdown: Locator;
    readonly menuIcon: Locator;
    readonly allItems: Locator;
    readonly dynamicCatalog: Locator;
    readonly about: Locator;
    readonly logout: Locator;


    constructor(page: Page) {
        this.page = page;

        this.productItems = page.locator('.inventory_item');
        this.inventoryPageTitle = page.getByText('Products', { exact: true });
        this.cartBadgeNumber = page.locator('.shopping_cart_badge');
        this.productName = page.locator('[data-test="inventory-item-name"]');
        this.productDescription = page.locator('[data-test="inventory-item-desc"]');
        this.productPrice = page.locator('[data-test="inventory-item-price"]');
        this.addToCardButton = page.getByRole('button', { name: 'Add to cart' });
        this.cartButton = page.locator('[data-test="shopping-cart-link"]')
        this.sortDropdown = page.locator('[data-test="product-sort-container"]')
        this.menuIcon = page.getByRole('button', { name: 'Open Menu' })
        this.allItems = page.getByRole('button', { name: 'All Items' })
        this.dynamicCatalog = page.getByRole('button', { name: 'Dynamic Catalog' })
        this.about = page.getByRole('link', { name: 'About' })
        this.logout = page.getByRole('button', { name: 'Logout' })
    }

    async navigate(inventoryUrl: string): Promise<void> {
        await this.page.goto(inventoryUrl)
    }

    async menuOptions(): Promise<void> {
        await this.menuIcon.click();
    }

    async logoutUser(): Promise<void> {
        await this.logout.click();
    }

    async goToProductDetailsPage(productName:string): Promise<void> {
        const product = this.productItems.filter({has: this.page.locator('.inventory_item_name'), hasText: productName});
        await product.locator('.inventory_item_name').click();
    }

    async getProductCount(): Promise<number> {
        return await this.productItems.count();
    }

    async getProductNames(): Promise<string[]> {
        return await this.productName.allInnerTexts();
    }

    async getProductPrices(): Promise<string[]> {
        return await this.productPrice.allInnerTexts();
    }

    async sortProducts(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
        await this.sortDropdown.selectOption(option)
    }

    async addProductToCart(productName: string): Promise<void> {
        const product = this.productItems.filter({ 
            has: this.page.locator('[data-test="inventory-item-name"]', { 
                hasText: productName 
            })
             });

        await product.locator('button').click();
    }

    async removeProductFromCart(productName: string): Promise<void> {
        const product = this.productItems.filter({
            has: this.page.locator('.inventory_item_name', {
                hasText: productName
            })
        });

        await product.locator('button').click();
    }

    async openCart():Promise<void>{
        await this.cartButton.click();
    }

}