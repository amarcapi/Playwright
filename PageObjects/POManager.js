const {LoginPage} = require('../PageObjects/LoginPage');

class POManager {
  constructor (page)
  {
    this.page = page;
    this.loginPage = new LoginPage(this.page)
  }

  getLoginPage(){
    return this.loginPage;
  }
}
module.exports = {POManager};