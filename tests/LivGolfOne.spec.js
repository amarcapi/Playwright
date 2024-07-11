const { test, expect } = require('@playwright/test');

test('Go to Liv Golf Hompage shop and select Adult Headwear', async ({ page }) => {
  // Navigate to the specified URL
  await page.goto('https://liv2-shop-qa.vercel.app/uk');
 // await page.waitForLoadState();
  //await page.locator("button[id='onetrust-reject-all-handler']").click();
  await page.getByRole('button', { name: 'Headwear' }).click()
  await page.locator("//a[contains(text(),'Adult')]").click()

  await page.waitForSelector('div[id="productGrid"]');
  //const productCount = await page.$$eval('div[id="productGrid"]')

  // Count the number of products displayed and print their names
  const productCount = await page.$$eval('div[id="productGrid"] > div', (products) => {
    for (const product of products) {
      const productName = product.textContent.trim();
      console.log(productName);
    }
    return products.length;
  });

  console.log(`Total number of products: ${productCount}`);
  await page.pause(5000);

})

test('Go to LiV Golf and list all products on the page', async ({ page }) => {
  await page.goto('https://liv2-shop-qa.vercel.app/uk');
  // await page.waitForLoadState();
   //await page.locator("button[id='onetrust-reject-all-handler']").click();
   await page.getByRole('button', { name: 'Headwear' }).click()
   await page.locator("//a[contains(text(),'Adult')]").click()

   //wait for the productgrid to fully show
   await page.waitForSelector('div[id="productGrid"]');
     // Get the count of products in the product grid. uses the eval function
  const productCount = await page.$$eval('div[id="productGrid"] div[class="product-card relative w-full"]', (products) => products.length);

  // Loop through each product and extract the text content
  const productTexts = await page.$$eval('div[id="productGrid"] div[class="product-card relative w-full"] div[class="body-large font-semibold"]', (productElements) => {
    return productElements.map((element) => element.textContent.trim());
  });

  // Print the extracted text content to the console
  console.log(`The following ${productCount} products are displayed:`);
  for (const productText of productTexts) {
    console.log(productText);
  }

})

test.only('Select a product and add it to the basket', async ({ page }) => {
   await page.goto('https://liv2-shop-qa.vercel.app/uk');
 
   await page.getByRole('button', { name: 'Headwear' }).click()
   await page.locator("//a[contains(text(),'Adult')]").click()

   const productGrid = await page.waitForSelector('div[id="productGrid"]');
   const products = await productGrid.$$('div[class="product-card relative w-full"]');
   for (const product of products) {
     const outOfStockLabel = await product.$('div:has-text("Out of stock")');
     if (!outOfStockLabel) {
       await product.click();
       break;
     }
   }

   const element = await page.waitForSelector("div[class='w-full hidden md:block'] div[class='h-7 md:h-10 flex']", {timeout: 6000});

   // Extract the text content from the element
   const textContent = await element.textContent();
 
   // Print the text content to the console
   console.log(textContent);

   /*await page.waitForSelector("div[class='flex flex-row items-center gap-x-[0.375rem]']");

   const cartElement = await page.$eval("div[class='flex flex-row items-center gap-x-[0.375rem]']", (element) => element.textContent);
   
   if (cartElement.includes('1')) {
    console.log('The basket contains "1"');
  } else {
    console.log('Text content of #btnAddToCart does not contain "1"');
  }*/

  /*await page.waitForSelector("div[class='bg-lime tracking-4x-tight md:tracking-5x-tight flex h-[17px] min-w-[15px] items-center justify-center px-1 text-xs font-bold text-black md:h-6 md:min-w-[19px] md:text-base']");

  // Extract the number from the HTML element
  const numberElement = await page.$("div[class='bg-lime tracking-4x-tight md:tracking-5x-tight flex h-[17px] min-w-[15px] items-center justify-center px-1 text-xs font-bold text-black md:h-6 md:min-w-[19px] md:text-base']");
  const number = await numberElement.textContent();

  // Verify that the extracted number is correct
  const expectedNumber = 1;
  if (parseInt(number) === expectedNumber) {
    console.log('The extracted number is correct!');
  } else {
    console.log('The extracted number is incorrect.');
  }*/

   await page.click('#btnAddToCart');
   await page.locator("//button[@title='Toggle Basket']//*[name()='svg']").click();
   await page.click("#btnCartPopUpCheckout");
   await page.click("#pay-button-container");
   

   await page.pause(5000);

})