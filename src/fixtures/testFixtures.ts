import { test as base } from '@playwright/test'
import { LoginPage } from '../pages/loginPage'
import { InventoryPage } from '../pages/inventoryPage'
import { CartPage } from '../pages/cartPage'
import { CheckoutPage } from '../pages/checkoutPage'
import { ProductDetailsPage } from '../pages/productDetailsPage'
import { env } from '../../src/config/env'

type TestFixtures = {
    loginPage: LoginPage,
    inventoryPage: InventoryPage,
    cartPage: CartPage,
    checkoutPage: CheckoutPage,
    productDetailsPage: ProductDetailsPage,
    standardUserLogin: void
}

export const test = base.extend<TestFixtures>({

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },

    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page))
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page))
    },

    checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
    },

    productDetailsPage: async({page}, use) => {
        await use(new ProductDetailsPage(page))
    },

    standardUserLogin: async ({ page }, use) => {
        const loginPage = new LoginPage(page)

        await loginPage.navigate();
        await loginPage.login(env.credentials.standardUser, env.credentials.standardPassword)

        await use();
    }
})

export { expect } from '@playwright/test'