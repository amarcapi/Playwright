//his clicks on the first product inside the "product-link" class, which is a reliable class that contains the text "EXCLUSIVE", text-based approach.

const { test, expect } = require('@playwright/test');
 
test('Check product listing page, accept cookie banner, and click the first product', async ({ page }) => {
  // Navigate to the specified URL
  await page.goto('https://www.neweracap.co.uk/en-gb/headwear/?p=1');
 
  // Check if the cookie banner exists
  const cookieBanner = await page.$('.cookiefirst-root');
  if (cookieBanner) {
    // Click the "Accept All" button in the cookie banner
    const acceptButton = await cookieBanner.$('button[data-cookiefirst-action="accept"]');
    if (acceptButton) {
      await acceptButton.click();
      console.log('Accepted the cookie banner.');
    } else {
      console.log('Cookie banner button not found.');
    }
  }
 
  // Check if the page has the class "product-listing-page"
  expect(await page.$eval('body', (body) => body.classList.contains('product-listing-page'))).toBeTruthy();
 
  // Check if the class "ReactVirtualized__Grid__innerScrollContainer" exists
  const innerScrollContainer = await page.$('.ReactVirtualized__Grid__innerScrollContainer');
  expect(innerScrollContainer).toBeTruthy();
 
  // Loop through visible products with class "product-link"
  const productLinks = await page.$$('.ReactVirtualized__Grid__innerScrollContainer .product-link');
 
  // Get the total count of visible products
  const totalCount = productLinks.length;
  console.log(`Total visible products: ${totalCount}`);
 
  // Click the first product
  //if (totalCount > 0) {
  //  await productLinks[0].click();
  //  console.log('Clicked the first product.');
  //} else {
  //  console.log('No visible products found.');
  //}
 
  // Click the first product with the text "EXCLUSIVE"
  let exclusiveProductClicked = false;
  for (const productLink of productLinks) {
    const exclusiveText = await productLink.$('div:has-text("EXCLUSIVE")');
    if (exclusiveText) {
      await productLink.click();
      console.log('Clicked the first "EXCLUSIVE" product.');
      exclusiveProductClicked = true;
      break;
    }
  }
 
  if (!exclusiveProductClicked) {
    console.log('No "EXCLUSIVE" product found.');
  }
 
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
 
  // page close
  await page.close();
});