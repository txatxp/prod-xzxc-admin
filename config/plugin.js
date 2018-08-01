'use strict';
const path = require('path');
// had enabled by egg
// exports.static = true;
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks'
};
// exports.ua = {
//   enable: true,
//   path: path.join(__dirname, '../app/lib/plugin/egg-ua'),
//   package: 'egg-ua'
// };
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
module.exports.passport = {
  enable: true,
  package: 'egg-passport',
};


// exports.passportGithub = {
//   enable: true,
//   package: 'egg-passport-github',
// };

