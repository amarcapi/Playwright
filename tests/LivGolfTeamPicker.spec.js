const { test, expect } = require('@playwright/test');

// implement data driven json.data file
test('Subscribe to team picker', async ({ page }) => {
  // Navigate to the specified URL
  await page.goto('https://liv2-league-qa.vercel.app/team-picker#cleeks');
  await page.locator('#mce-FNAME').fill('amara')
  await page.locator('#mce-LNAME').fill('amara')
  await page.locator('#mce-EMAIL').fill('amaa.ahmed@msn.com')


  // const selectElement = await page.locator("#mce-MMERGE5").pressSequentially('Ita');
  // await page.pause(5000);
  // expect(selectElement).toContain('Italy');

  const selectElement = await page.selectOption('select#mce-MMERGE5', { label: 'Italy' });
  expect(selectElement).toContain('Italy');
  // const expectedText = {name: 'Italy'};
  // const recievedText = {name: await page.textContent('#mce-MMERGE5'),}

  // expect(expectedText).toBe(recievedText);


  // for (let i = 0; i < options; i++) {
  //   if (option.text === 'Italy') {
  //     option.selected.click();
  //     break;
  //   }
  // }

  const selectTeam = await page.selectOption('select#mce-MMERGE6', { label: 'Ripper GC' });
  expect(selectTeam).toContain('Ripper GC');
  await page.locator("#mce-MMERGE70").check();
  expect(page.locator("#mce-MMERGE70")).toBeChecked();
  

  await page.locator("#mc-embedded-subscribe").click();
  const successResponse = await page.locator("#mce-success-response").textContent();
  await expect(page.locator("#mce-success-response")).toContainText('Thank you for subscribing!');

  
  await page.pause(5000);


})

test('Use same details and subscribe again - validation message', async ({ page }) => {
  // Navigate to the specified URL
  await page.goto('https://liv2-league-qa.vercel.app/team-picker#cleeks');
  await page.locator('#mce-FNAME').fill('amara')
  await page.locator('#mce-LNAME').fill('amara')
  await page.locator('#mce-EMAIL').fill('amaa.ahmed@msn.com')

  const selectElement = await page.selectOption('select#mce-MMERGE5', { label: 'Italy' });
  expect(selectElement).toContain('Italy');

  const selectTeam = await page.selectOption('select#mce-MMERGE6', { label: 'Ripper GC' });
  expect(selectTeam).toContain('Ripper GC');
  await page.locator("#mce-MMERGE70").check();
  expect(page.locator("#mce-MMERGE70")).toBeChecked();
  

  await page.locator("#mc-embedded-subscribe").click();
  const successResponse = await page.locator("#mce-success-response").textContent();
  await expect(page.locator("#mce-success-response")).toContainText("You're already subscribed, your profile has been updated. Thank you!");

  
  await page.pause(5000);


})

