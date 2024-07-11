const { test, expect, request } = require('@playwright/test');
const payLoad = {EmailAddress:"amar.ahmed@yopmail.com", Password:"abbeyroad123"};

test.beforeAll( async() => {
  const apiContext = await request.newContext();
  apiContext.post('https://prep.neweracap.co.uk/en-gb/sign-in/',
{
  data:payLoad
}
)

});

test.beforeEach(() => {

});

test('login api', async ({page}) => {
  await page.goto('https://prep.neweracap.co.uk/en-gb/');

})