const { test, expect } = require('@playwright/test');
 
test('Assert validations are present on the checkout page', async ({ page }) => {
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

  await page.click('#btnAddToCart');
  await page.locator("//button[@title='Toggle Basket']//*[name()='svg']").click();
  await page.click("#btnCartPopUpCheckout");
  await page.click("#pay-button-container");


  
  
    const expectedValidations = {
      email: 'Enter an email',
      firstName: 'Enter a first name',
      lastName: 'Enter a last name',
      address: 'Enter an address',
      city: 'Enter a city',
      postcode: 'Enter a ZIP / postal code',
      cardNumber: 'Enter a card number',
      expirationDate: 'Enter a valid expiration date',
      securityCode: 'Enter the CVV or security code on your card',
      nameOnCard: "Enter your name exactly as it’s written on your card",
    };
  
    const validationResults = {
      email: await page.textContent('#error-for-email'),
      firstName: await page.textContent('#error-for-TextField1'),
      lastName: await page.textContent('#error-for-TextField2'),
      address: await page.textContent('#error-for-shipping-address1'),
      city: await page.textContent('#error-for-TextField4'),
      postcode: await page.textContent('#error-for-TextField5'),
      cardNumber: await page.textContent('#error-for-number'),
      expirationDate: await page.textContent('#error-for-expiry'),
      securityCode: await page.textContent('#error-for-verification_value'),
      nameOnCard: await page.textContent('#error-for-name'),
    };
    
    for (const field in expectedValidations) {
      expect(validationResults[field]).toBe(expectedValidations[field]);
      
    }

    /*let allValidationsPassed = true;
  
    for (const field in expectedValidations) {
      expect(validationResults[field]).toBe(expectedValidations[field]);
      if (validationResults[field] !== expectedValidations[field]) {
        console.log(`Validation failed for ${field}: Expected "${expectedValidations[field]}", but got "${validationResults[field]}"`);
        allValidationsPassed = false;
      }
    }
  
    if (allValidationsPassed) {
      console.log('All field validations passed!');
    } else {
      console.log('Some field validations failed.');
    }*/

})
