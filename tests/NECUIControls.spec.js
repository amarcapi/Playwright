const {test, expect} = require('@playwright/test')

test('UI Controls', async ({browser})=>
{
    const context = await browser.newContext();
    //hit url
    const page = await context.newPage();
    const signIn = page.locator('#headerSignIn');
    const cookies = page.locator("button[aria-label='Accept All']")
    const dropdown = page.locator('#Model_Title');
    const headwear = page.locator("#nav-link-2");
    await page.goto("https://prep.neweracap.co.uk/en-gb/")
    //console.log(await page.title());
    //await expect(page).toHaveTitle("New Era Cap | Headwear, Clothing & Accessories | New Era Cap UK")
    await cookies.click();
    await page.getByLabel('Close dialog 1').click();
    await page.locator('#headerRegister').click();
    await dropdown.selectOption('Mr')
    //await page.pause();
    await page.locator("label[value='Join our mailing list, be part of the New Era community']").click();
    await expect(page.locator("label[value='Join our mailing list, be part of the New Era community']")).toBeChecked();


    //await signIn.click();
    //await page.getByLabel('Email Address').fill('amar.ahmed@yopmail.com')
   // await page.getByLabel('Password').fill('abbeyroad23');
   
});