import { test, expect } from '@playwright/test';
import { env } from '../../src/config/env'
import { LoginPage } from '../../src/pages/loginPage';

test.use({
    storageState: {
        cookies: [],
        origins: []
    }
})

test('[@smoke] [@login] Login Test', async ({page}) => {
    const loginPage = new LoginPage(page)

    await page.goto('/')

    loginPage.login(env.credentials.standardUser, env.credentials.standardPassword);

    await expect(page).toHaveURL(/inventory.html/)
})