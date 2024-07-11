const { expect } = require('@playwright/test');

async function testLogin(page){
  await page.goto('https://prep.neweracap.co.uk/en-gb/');
  await page.getByRole('link', { name: 'Sign In' }).click();
  await expect(page.locator('h1')).toContainText('sign in to your account');
  await page.getByLabel('Email Address').fill('amar.ahmed@yopmail.com');
  await page.getByLabel('Password').fill('abbeyroad23');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('group')).toContainText('Invalid Username or password');
}
module.exports = {
  testLogin,
};
