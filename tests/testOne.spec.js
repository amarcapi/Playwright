const { test, expect } = require('@playwright/test');
const {POManager} = require('../PageObjects/POManager');
const dataSet = JSON.parse(JSON.stringify(('../utils/testData.json')));
 
test('client app login', async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  loginPage.gotoUrl();
  loginPage.validLogin(dataSet.username, dataSet.password);

});

test('prep newera login', async ({ page }) => {
  await page.goto('https://prep.neweracap.co.uk/en-gb/');
  await page.locator('#headerSignIn').click();
  await page.locator('#EmailAddress').fill('amar.ahmed@yopmail.com');
  await page.locator('#Password').fill('test');
  await page.locator("input[value='Sign in']").click();
  
});