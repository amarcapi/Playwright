import { test, expect } from '@playwright/test';

test('check postage cost is calculated correctly onto total cost', async ({ page }) => {
  await page.goto('https://prep.neweracap.co.uk/en-gb/');
  await page.getByLabel('Accept All').click();
  await page.getByLabel('Close dialog 1').click();
  await page.hover('[href="/en-gb/headwear/"]')
  await page.getByRole('menuitem', { name: '9FORTY' }).click();
  await page.getByText('Sort By: Price (high-low)').click();
  await page.getByText('Price (low-high)').first().click();
  await page.getByRole('link', { name: 'Celtic FC Green Youth 9FORTY Adjustable Cap Celtic FC Green Youth 9FORTY Adjustable Cap 9FORTY Celtic FC Green Youth 9FORTY Adjustable Cap Green £15.00' }).click();
  await page.getByText('Youth', { exact: true }).click();
  await page.getByLabel('Add to bag').click();
  await page.getByRole('link', { name: 'View Bag' }).click();
  //await expect(page.locator("(//span[@id='SubTotalBottom'])[0]")).toHaveText('£');
  await expect(page.locator("(//span[@id='SubTotalBottom'])[1]")).toHaveText('15.00');
  await expect(page.locator("#ShippingTotal")).toHaveText('3.99');
  await expect(page.locator("#Total")).toHaveText('18.99');
  await page.locator("a[title='Secure Checkout']").click();
  await page.locator('#EmailAddress').fill('amar.ahmed@yopmail.com');
  await page.locator('#password-input').fill('abbeyroad123');
  await page.locator('#member-checkout_submit-button').click();
  await page.locator('#checkout-header_new-era-logo').click();
  await page.locator('#nav-link-3').click();
  //console.log(await page.locator("div[role='rowgroup']").first().textContent());
  //console.log(await page.locator("#B5780_471 p[class='plp__sc-18aj3y5-7 dcePbH']").textContent());
  //wait for api to get all products on the page for get all text contents
  await page.waitForLoadState('networkidle');
  console.log(await page.locator("div[aria-label='grid']").allTextContents());
});

