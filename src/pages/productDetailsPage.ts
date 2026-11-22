import { Page, Locator } from '@playwright/test'

export class ProductDetailsPage{
    readonly page: Page;

    readonly productName: Locator;
    readonly productDescription: Locator;
    readonly productImage: Locator;
    readonly productPrice: Locator;
    readonly addToCartButton: Locator;
    readonly backToProductsButton: Locator;
    readonly productDetails: Locator;

    constructor(page:Page){
        this.page = page;

        this.productName = page.locator('.inventory_details_name.large_size')
        this.productDescription = page.locator('.inventory_details_desc.large_size')
        this.productImage = page.locator('.inventory_details_img')
        this.productPrice = page.locator('.inventory_details_price')
        this.addToCartButton = page.locator('.btn.btn_primary.btn_small.btn_inventory')
        this.backToProductsButton = page.getByRole('button', {name: 'Back to products'})
        this.productDetails = page.locator('.inventory_details')

    }

    async addToCart(productName: string): Promise<void>{
        const product = this.productDetails.filter({has: this.page.locator('.inventory_details_name'), hasText: productName});
        await product.locator('button').click();
    }

    async backToProductsPage(): Promise<void>{
        await this.backToProductsButton.click();
    }
}