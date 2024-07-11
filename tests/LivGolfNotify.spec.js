const { test, expect } = require('@playwright/test');
 
test('Out of stock notification', async ({ page }) => {
  await page.goto('https://liv2-shop-qa.vercel.app/uk');
 
  await page.getByRole('button', { name: 'Headwear' }).click()
  await page.locator("//a[contains(text(),'Adult')]").click()

  const productGrid = await page.waitForSelector('div[id="productGrid"]');
  const products = await productGrid.$$('div[class="product-card relative w-full"]');

  for (const product of products) {
    const outOfStockLabel = await product.$('div:has-text("Out of stock")');
    if (outOfStockLabel) {
      await product.click();
      break;
    }
  }

  
    //const outOfStockDiv = await page.locator("(//div[@class='h-7 md:h-10 flex'])[2]").textContent();
    await expect(page.locator("(//div[@class='h-7 md:h-10 flex'])[2]")).toContainText('Outhg of stock');
    await page.locator("button[class*='flex w-full items']").click();


  await page.pause(5000);
})
