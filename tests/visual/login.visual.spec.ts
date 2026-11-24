import { test, expect } from '../../src/fixtures/testFixtures'

test.describe('Visual Testing for Login Page', () => {
    
    test('Verify Login Visual', async({loginPage})=> {

        await loginPage.navigate();

        await expect(loginPage.page).toHaveScreenshot('login-page.png', {
            fullPage : true
        })
    })
})
