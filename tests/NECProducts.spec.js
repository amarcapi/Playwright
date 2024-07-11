const {test, expect} = require('@playwright/test')


//browser is a pw fixture, put it in the fucntion to use call in the test
//browser info is passed in the config.js file
test('Choose products dynamically', async ({browser})=>
{
    
    //create instance of browser. await untill step is done
    const context = await browser.newContext();
    //hit url
    const page = await context.newPage();
    const cookies = page.locator("button[aria-label='Accept All']")
    const dropdown = page.locator('#Model_Title');
    const headwear = page.locator("#nav-link-2");
    const products = page.locator("//div[@class='plp__sc-1d0s19m-0 plp__sc-1d0s19m-3 joKZoe eLdbNt col-xs-6 col-sm-4 col-md-3']");
    //const productLinks = page.locator('.ReactVirtualized__Grid__innerScrollContainer .product-link');

    await page.goto("https://prep.neweracap.co.uk/en-gb/")
    //await cookies.click();
    //await page.getByLabel('Close dialog 1').click();
    await headwear.click();
    await page.waitForLoadState('networkidle');
    const names = await products.allTextContents();
    //const split = names.split('EXCLUSIVE');
    console.log(names);
    const count = await products.count();
    console.log(count);
    //const exclusive = expect(await(page.locator("//div[@class='plp__sc-1d0s19m-0 plp__sc-1d0s19m-3 joKZoe eLdbNt col-xs-6 col-sm-4 col-md-3']").toContainText('EXCLUSIVE')));
    //console.log(exclusive);
    //const lowstock = page.locator("//div[@class='plp__sc-18aj3y5-11 kVqQUj']");
    //console.log(await lowstock.count());
    //const pm = await page.locator("//div[@class='plp__sc-18aj3y5-2 jqYXzV']");
    //const pm = page.locator("//div[@class='plp__sc-18aj3y5-2 jqYXzV']");
    const exclusive = 'EXCLUSIVE'
    const productLinkSelector = 'a[class="product-link"]';

    // for(let i=0; i < count; i++)    {
    //     const producttext = await products.locator(productLinkSelector).textContent()

    // if (await products.nth(i).locator(".product-link").textContent() === exclusive);
    // {
    //     await products.nth(i).locator("a[class='product-link']").click();
    //     //await page.locator("a[class='product-link']").click();
    //     break;
    // }
    // }


for (const product of await products.locator(productLinkSelector).all()) {
    const productText = await product.locator('div:first-child').textContent();
    
    if (productText.includes(exclusive)) {
        await product.click();
        break; // Stop the loop after clicking the first matching product
    }
}
    await page.pause()
    //await page.locator("//div[@class='figure']").click();
    //await page.pause();
    //const exlusivetag = page.locator('.col-sm-6.col-md-8.product-details__images');
    //await expect(page.locator('.col-sm-6.col-md-8.product-details__images')).toHaveText("EXCLUSIVE")
    
    //console.log(expect(tagpresent).toContainText('EXCLUSIVE'));
    
});

