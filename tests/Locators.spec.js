const { test, expect } = require('@playwright/test');
 
test('Search for a product and click on the first matching element from the dynamic list', 
async ({ page }) => {
  //by role
  await page.goto('https://liv2-shop-qa.vercel.app/uk');
  //for aherf link, use link, then name and text
  await page.getByRole('link',{name:'New Arrivals'}).click();
  

  //get by label. search button using the aria label, then exact search value = true
  await page.getByLabel('Open product search', {exact:true}).click();
  //use input class
  await page.locator('input', {class: 'headline-large' }).fill('T-Shirt');

  // ul class > li class. get count of li elements from search text
  const listElements = page.locator("ul[class*='mt-']");
  await listElements.waitFor();
  const listCount = await listElements.locator("li[class*='text-link']").count();
  console.log(listCount);
  for(let i=0; i<listCount; ++i)
  {
    const text = await listElements.locator("li[class*='text-link']").nth(i).textContent();
    if(text.includes("T-Shirt"))
    {
      await listElements.locator("li[class*='text-link']").nth(i).click();
      break;
    }
  }
  await page.pause(5000);
 
})

test.only('Verify product not found error message', async ({ page }) => {
  //by role
  await page.goto('https://liv2-shop-qa.vercel.app/uk');
  //for aherf link, use link, then name and text
  await page.getByRole('link',{name:'New Arrivals'}).click();
  

  //get by label. search button using the aria label, then exact search value = true
  await page.getByLabel('Open product search', {exact:true}).click();
  //use input class
  const searchTerm = 'gggg'
  await page.locator('input', {class: 'headline-large' }).fill(searchTerm);
  await page.getByLabel('Search', {exact:true}).click();

  const expectedMessage = `No results found for "${searchTerm}". Check the spelling or use a different word or phrase.` 

  const validationMessageLocator = await page.locator("div[class='mb-[1.5rem] sm:mb-[2rem] md:mb-[3.75rem]'] h1").textContent();
  console.log(validationMessageLocator);

  await page.waitForTimeout(3000);
  expect(validationMessageLocator).toBe(expectedMessage);

  await page.pause(5000);
  
 
})
