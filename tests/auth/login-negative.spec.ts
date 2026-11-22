import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/loginPage';
import { loginTestData } from '../../src/data/loginData';

test.use({
    storageState: {
        cookies: [],
        origins: []
    }
});

test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

test('[@smoke] [@login] Verify locked-out user cannot login', async ({ page }) => {
        const loginPage = new LoginPage(page);

        const data = loginTestData.lockedOutUser;

        await loginPage.login(data.username, data.password);

        await expect(loginPage.errorMessage)
            .toHaveText(data.expectedError);
    });

test('[@smoke] [@login] Verify Invalid Password cannot login', async ({ page }) => {
        const loginPage = new LoginPage(page);

        const data = loginTestData.invalidPassword;

        await loginPage.login(data.username, data.password);

        await expect(loginPage.errorMessage)
            .toHaveText(data.expectedError);
    });

test('[@smoke] [@login]] Verify empty username Login', async ({ page }) => {
        const loginPage = new LoginPage(page);

        const data = loginTestData.emptyUsername;

        await loginPage.login(data.username, data.password);

        await expect(loginPage.errorMessage)
            .toHaveText(data.expectedError);
    });

test('[@smoke] [@login] Verify empty password Login', async ({ page }) => {
        const loginPage = new LoginPage(page);

        const data = loginTestData.emptyPassword;

        await loginPage.login(data.username, data.password);

        await expect(loginPage.errorMessage)
            .toHaveText(data.expectedError);
    });