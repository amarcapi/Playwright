const {Given, When, Then} = require('@cucumber/cucumber')
const {expect, playwright } = require('@playwright/test');



Given('I go to the website and click on sign in', async function () {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://prep.neweracap.co.uk/en-gb/');
  await page.locator('#headerSignIn').click();
  
});

When('I enter {string} and {string} and click on submit', async function (username, password) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('I should be redirected to the My account page', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});