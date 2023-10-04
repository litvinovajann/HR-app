/* GET users listing. /api/user/login */
const login = async function(req, res, ) {
    res.send('login');
  };
  /*/api/user/register */
const register =  async function(req, res, ) {
    res.send('register');
  };
  /*/api/user/current */
const current = async function(req, res, ) {
    res.send('current');
  };

  module.exports = {login, current, register};