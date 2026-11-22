import { test, expect } from '@playwright/test';
import { env } from '../src/config/env';

test('Verify environment configuration', async ({ page }) => {
    await page.goto(env.baseUrl);

    await expect(page).toHaveURL(/saucedemo/);
});