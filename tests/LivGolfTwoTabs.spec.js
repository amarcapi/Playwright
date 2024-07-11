const { test, expect } = require('@playwright/test');

test('Add products from two tabs, clear basket and verify basket is empty', async ({ page,context }) => {
  
  
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

  const element = await page.waitForSelector("div[class='w-full hidden md:block'] div[class='h-7 md:h-10 flex']", {timeout: 6000});

  // Extract the text content from the element
  const textContent = await element.textContent();

  // Print the text content to the console
  console.log(textContent);

  await page.click('#btnAddToCart');
  await page.locator("//button[@title='Toggle Basket']//*[name()='svg']").click();
  await page.click("#btnCartPopUpCheckout");
 // await page.click("#pay-button-container");
  
// Open a new window with the same session
  const secondTab = await context.newPage(); 
  await secondTab.goto('https://liv2-shop-qa.vercel.app/uk')
  await secondTab.getByRole('button', { name: 'Headwear' }).click()
  await secondTab.locator("//a[contains(text(),'Adult')]").click()

  const productGrid1 = await secondTab.waitForSelector('div[id="productGrid"]');
  const products1 = await productGrid1.$$('div[class="product-card relative w-full"]');
  for (const product of products1) {
    const outOfStockLabel = await product.$('div:has-text("Out of stock")');
    if (!outOfStockLabel) {
      await product.click();
      break;
    }
  }

  const element1 = await secondTab.waitForSelector("div[class='w-full hidden md:block'] div[class='h-7 md:h-10 flex']", {timeout: 6000});

  // Extract the text content from the element
 // const textContent1 = await element.textContent();

  // Print the text content to the console
  //console.log(textContent);

  await secondTab.click('#btnAddToCart');
  await secondTab.locator("//button[@title='Toggle Basket']//*[name()='svg']").click();
  await secondTab.click("#btnCartPopUpCheckout");
 // await page.click("#pay-button-container");
 await page.pause(5000);

  // Verify that two products are in the basket
  const basketItems = await secondTab.page.$$('.basket-item');
  if (basketItems.length === 2) {
    console.log('Two products are in the basket');
  } else {
    console.log('Verification failed: Two products are not in the basket');
  }

  // stay on tab two and click on "Delete products from basket" for both products
  const deleteButtons = await secondTab.page.$$('.delete-button');
  for (const deleteButton of deleteButtons) {
    await deleteButton.click();
    // Add more steps as needed to confirm the deletion of the product
  }

  // Go to tab one and click on "Pay now"
  await page.bringToFront()
  await page.locator('#add_custom_locator_here').click();
  // Add more steps as needed to proceed with the payment

  // Verify that the validation message "Basket is empty" is displayed
  const validationMessage = await page.$('#validation-message');
  const messageText = await validationMessage.textContent();
  if (messageText === 'Basket is empty') {
    console.log('Validation message "Basket is empty" is displayed');
  } else {
    console.log('Verification failed: Validation message is not displayed');
  }
  await page.pause(5000);

})