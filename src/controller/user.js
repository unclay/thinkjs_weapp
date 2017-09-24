const fs = require('fs');
const path = require('path');
const Vue = require('vue');
const Base = require('./base.js');


const createRenderer = require('vue-server-renderer').createRenderer;
const renderer = createRenderer();
// const renderer = createRenderer({
//   template: fs.readFileSync(path.resolve(__dirname, '../../view/vue_template.html'), 'utf-8'),
// });


module.exports = class extends Base {
  async indexAction() {
    const user = await this.session('user');
    const app = new Vue({
      template: '<div id="app"></div>',
    });
    const content = await think.promisify(renderer.renderToString)(app);
    this.assign('user', user);
    this.assign('body', content);
    return this.display();
  }
};
