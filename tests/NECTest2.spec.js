const {test, expect} = require('@playwright/test')

test('Choose products dynamically', async ({page})=>
{
    await page.goto("https://prep.neweracap.co.uk/en-gb/")
    const cookies = page.locator("button[aria-label='Accept All']")
    const dropdown = page.locator('#Model_Title');
    const headwear = page.locator("#nav-link-2");
    const products = page.locator("//div[@class='plp__sc-1d0s19m-0 plp__sc-1d0s19m-3 joKZoe eLdbNt col-xs-6 col-sm-4 col-md-3']");
    await page.goto("https://prep.neweracap.co.uk/en-gb/")
    //await cookies.click();
    //await page.getByLabel('Close dialog 1').click();
    await headwear.click();
    await page.waitForLoadState('networkidle');

    expect(await page.$eval('body', (body) => body.classList.contains('product-listing-page'))).toBeTruthy();

    const productLinks = await page.$$('.ReactVirtualized__Grid__innerScrollContainer .product-link');

    const totalCount = productLinks.length;
    console.log(`Total visible products: ${totalCount}`);

    const names = await products.allTextContents();
    console.log(`Product listing page contains the following products: ${names}`);


    // select products with any tags or not tags
    const productTags = ['IN STOCK', 'SUSTAINABLE','BACK IN STOCK', 'EXCLUSIVE', 'SALE']
    let selectedProduct = null;
    
    for(const productLink  of productLinks){
      const product = await productLink.$(`div:has-text(productTags)`);
      //const productTagElements = await product.$$('.product-link');
      if (product){
        selectedProduct = product;
        break;
      }
    }
  //   let exclusiveProductClicked = false;
  // for (const productLink of productLinks) {
  //   const exclusiveText = await productLink.$('div:has-text("EXCLUSIVE")');
  //   if (exclusiveText) {
  //     await productLink.click();
  //     console.log('Clicked the first "EXCLUSIVE" product.');
  //     exclusiveProductClicked = true;
  //     break;
  //   }
  // }



  // await page.goBack()

  // let instockproduct = false;
  // for (const productLink of productLinks) {
  //   const lowstock = await page.locator("//div[@id='product-listing-app']//div[@role='grid']/div[@role='rowgroup']/div[12]//a/div[1]/div[.='LOW STOCK']")//productLink.$$('div:has-text("LOW STOCK")');
  //   if (lowstock) {
  //     await productLink.click();
  //     console.log('product is low in stock');
  //     instockproduct = true;
  //     break;
  //   }
  // }
    
});