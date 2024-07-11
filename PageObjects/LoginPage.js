class LoginPage {

  constructor(page)
  {
    this.page = page;
    this.signInBtn = page.locator("#headerSignIn");
    this.userName = page.locator("#userEmail");
    this.password = page.locator("userPassword");
  }

  async gotoUrl()
  {
    await this.page.gotoUrl('https://prep.neweracap.co.uk/en-gb/')
  }

  async validLogin(username, password)
  {
    await this.userName.type(username);
    await this.password.type(password);
    await this.signInBtn.click();
  }
}
module.exports = {LoginPage};