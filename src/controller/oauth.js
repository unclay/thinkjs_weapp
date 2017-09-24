const superagent = require('superagent');
const BaseRest = require('./rest.js');

module.exports = class extends BaseRest {
  async getAction() {
    console.log('start oauth');
    const code = this.get('code');
    const state = this.get('state');
    const clientId = '';
    const clientSecret = '';
    const redirectUri = encodeURIComponent('http://127.0.0.1:8360/oauth/ok');
    const loginOauth = 'https://github.com/login/oauth/access_token';
    const res = await superagent
      .post(loginOauth)
      .set('Content-Type', 'application/json')
      .send({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      });

    if (!res.body.access_token) {
      return this.fail(1001, res.body.error);
    }

    const resUser = await superagent
      .get(`https://api.github.com/user?access_token=${res.body.access_token}`)
      .set('Content-Type', 'application/json')
    console.log(resUser.body);
    await this.session('user', {
      login: resUser.body.login,
      id: resUser.body.id,
      avatar_url: resUser.body.avatar_url,
    })
    return this.redirect(`http://127.0.0.1:8360/${resUser.body.login}`);
  }
};
