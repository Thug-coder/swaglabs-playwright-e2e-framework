import { test as setup, expect} from '@playwright/test'
import { LoginPage } from '../../src/pages/loginPage'
import { env } from '../../src/config/env'

const authFile = 'playwright/.auth/standard-user.json'

setup('Storage State Setup', async ({page}) => {
    const loginPage = new LoginPage(page)

    await loginPage.navigate();

    await loginPage.login(env.credentials.standardUser, env.credentials.standardPassword)

    await expect(page).toHaveURL(/inventory.html/)

    await page.context().storageState({
        path: authFile
    })
})
