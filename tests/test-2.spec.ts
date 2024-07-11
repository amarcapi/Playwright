import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://liv2-shop-qa.vercel.app/uk/products?search=gggg');
  await page.getByRole('heading', { name: 'No results found for "gggg".' }).click();
});