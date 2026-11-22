import {test, expect} from '../../src/fixtures/testFixtures'
import { env } from '../../src/config/env'

test.describe('Inventory Page Tests', () => {

    test.beforeEach(async ({ inventoryPage }) => {
        await inventoryPage.navigate(env.inventoryURL);
    });

    test('Verify Logout from Inventory Page', async ({ page, inventoryPage, loginPage }) => {

        await expect(page).toHaveURL(/inventory.html/);

        await inventoryPage.menuOptions();
        await inventoryPage.logoutUser();

        await expect(page).toHaveURL(env.baseUrl);
        await expect(loginPage.usernameInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
    });
});