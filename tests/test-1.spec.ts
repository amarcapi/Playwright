import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://liv2-shop-qa.vercel.app/uk/products?search=gggsg');
  await page.getByLabel('Open product search').click();
});