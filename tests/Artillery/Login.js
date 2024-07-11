const {testLogin} = require('../Commands/Login');

async function artilleryScript(page){
  await testLogin(page);
}

module.exports = {
  artilleryScript
};