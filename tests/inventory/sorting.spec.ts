import { test, expect } from '../../src/fixtures/testFixtures'
import { env } from '../../src/config/env'

test.describe('Inventory Page Tests', () => {

    test.beforeEach(async ({ standardUserLogin }) => {
    });

    test('[@smoke] Verify A-Z Sorting', async ({ inventoryPage, page }) => {

        await expect(page).toHaveURL(/inventory.html/);

        await inventoryPage.sortProducts('az');
        const actualSorting = await inventoryPage.getProductNames();
        // console.log(actualSorting)

        const expectedSorting = [...actualSorting].sort((a, b) => a.localeCompare(b))
        // console.log(expectedSorting)

        expect(actualSorting).toEqual(expectedSorting)
    });

    test('[@smoke] Verify Z-A Sorting', async ({ page, inventoryPage }) => {


        await expect(page).toHaveURL(/inventory.html/);

        await inventoryPage.sortProducts('za');
        const actualSorting = await inventoryPage.getProductNames();
        //console.log(actualSorting)

        const expectedSorting = [...actualSorting].sort((a, b) => b.localeCompare(a))
        //console.log(expectedSorting)

        expect(actualSorting).toEqual(expectedSorting)
    });

    test('[@smoke] Verify products are sorted by price low to high', async ({ inventoryPage }) => {

        await inventoryPage.sortProducts('lohi');

        const actualPrices = await inventoryPage.getProductPrices();

        const numericPrices: number[] = actualPrices.map(price =>
            Number(price.replace('$', ''))
        );

        const expectedPrices = [...numericPrices].sort((a, b) => a - b);

        expect(numericPrices).toEqual(expectedPrices);
    });

    test('[@smoke] Verify products are sorted by price high to low', async ({ inventoryPage }) => {

        await inventoryPage.sortProducts('hilo');

        const actualPrices = await inventoryPage.getProductPrices();

        const numericPrices: number[] = actualPrices.map(price =>
            Number(price.replace('$', ''))
        );

        const expectedPrices = [...numericPrices].sort((a, b) => b - a);

        expect(numericPrices).toEqual(expectedPrices);
    });
});