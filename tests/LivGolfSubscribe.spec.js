const { test, expect } = require('@playwright/test');

test('Subscribe to team picker', async ({ page, context }) => {
  // page.on('response', async response => {
  //   console.log(`Response from ${response.url()}: ${response.status()} - ${await response.text()}`);
  // });
  // generate unique first name, last name, and email address to reuse in the form
  const firstName = generateRandomString(4);
  const lastName = generateRandomString(2);
  const email = `${firstName}${lastName}@hotmail.com`;

  // Navigate to the specified URL
  await page.goto('https://liv2-league-qa.vercel.app/team-picker#cleeks');

  // fill out the form with iunique detals
  await page.locator('#mce-FNAME').fill(firstName);
  await page.locator('#mce-LNAME').fill(lastName);
  await page.locator('#mce-EMAIL').fill(email);

  const selectElement = await page.selectOption('select#mce-MMERGE5', { label: 'Italy' });
  expect(selectElement).toContain('Italy');

  const selectTeam = await page.selectOption('select#mce-MMERGE6', { label: 'Ripper GC' });
  expect(selectTeam).toContain('Ripper GC');

  await page.locator("#mce-MMERGE70").check();
  expect(page.locator("#mce-MMERGE70")).toBeChecked();

  await page.locator("#mc-embedded-subscribe").click();
  // // Wait for the response after clicking the subscribe button
  // const response = await page.waitForResponse('**/subscribe/post-json');

  //   // Log the response body
  // const responseBody = await response.text();
  // console.log('Response body:', responseBody);

  
  //await page.waitForLoadState();
  //await page.pause(5000);
  const successResponse = await page.locator("#mce-success-response").textContent();
  await expect(page.locator("#mce-success-response")).toContainText('Thank you for subscribing!');

  // Reuse the same details for another submission
  const secondTab = await context.newPage(); 
  await secondTab.goto('https://liv2-league-qa.vercel.app/team-picker#cleeks');

  await secondTab.locator('#mce-FNAME').fill(firstName);
  await secondTab.locator('#mce-LNAME').fill(lastName);
  await secondTab.locator('#mce-EMAIL').fill(email);

  const selectElement2 = await secondTab.selectOption('select#mce-MMERGE5', { label: 'Italy' });
  expect(selectElement2).toContain('Italy');

  const selectTeam2 = await secondTab.selectOption('select#mce-MMERGE6', { label: 'Ripper GC' });
  expect(selectTeam2).toContain('Ripper GC');

  await secondTab.waitForSelector('#mce-MMERGE70');
  await secondTab.locator("#mce-MMERGE70").check();
  expect(secondTab.locator("#mce-MMERGE70")).toBeChecked();

  await secondTab.locator("#mc-embedded-subscribe").click();
  await secondTab.waitForLoadState();
  const successResponse1 = await secondTab.locator("#mce-success-response").textContent();
  await expect(secondTab.locator("#mce-success-response")).toContainText("You're already subscribed, your profile has been updated. Thank you!");

  await secondTab.pause(5000);
});

// Helper function to generate a random string of specified length - to put in another folder, as helper functions for reuse
function generateRandomString(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}