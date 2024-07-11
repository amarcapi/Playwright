const { test, expect } = require('@playwright/test');
 
test('Go to Diageo Hompage', async ({ page }) => {
  // Navigate to the specified URL
  await page.goto('https://ddp-malts-aiofrk67m-diageo.vercel.app/en-GB/amar-landing-page');
  /*await page.waitForLoadState();
  await page.locator("span[role='link']").click()
  await page.locator("input[aria-label='Email Address']").fill('amar.ahmed@diageo.com');
  await page.locator("span[class*='button']:nth-of-type(2)").click();*/
  await page.locator("button[data-test-id='image-carousel-next']").click();
  //console.log(await page.locator("span[class*='mx-']").textContent());
  // await expect (page.locator("span[class*='mx-']")).toContainText('10% off')
  // await page.locator('[data-test-id="link-list-cta-7F7cQjSqs1CagjVwf967mQ"]').click();
  await page.pause(5000);

})


 
test.only('Visual UI testing', async ({ page }) => {
  // Navigate to the specified URL
  await page.goto('https://ddp-malts-aiofrk67m-diageo.vercel.app/en-GB/amar-landing-page');

  await expect(page).toHaveScreenshot('LandingPage.png')

  await page.locator("button[data-test-id='image-carousel-next']").click();
  await expect(page).toHaveScreenshot('LandingPage.png')

  await page.pause(5000);

})

