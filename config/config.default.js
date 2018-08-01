'use strict';

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1530252394729_4217';

	exports.view = {
	  defaultViewEngine: 'nunjucks',
	  mapping: {
	    '.tpl': 'nunjucks',
	  },
	};
	exports.news = {
	  pageSize: 5,
	  serverUrl: 'https://hacker-news.firebaseio.com/v0',
	};
	exports.middleware = [
	  'isAuthenticated'
	];
	exports.isAuthenticated = {
	  ua: [
	    /Windows/i,
	  ]
	};
	exports.session = {
	  key: 'EGG_SESS',
	  maxAge: 24 * 3600 * 1000, // 1 天
	  httpOnly: true,
	  encrypt: true,
	};
    // add your config here
    config.middleware = [];



    exports.mysql = {
	  // 单数据库信息配置
	  client: {
	    // host
	    host: '127.0.0.1',
	    // 端口号
	    port: '3306',
	    // 用户名
	    user: 'root',
	    // 密码
	    password: 'txp~~520lt518L',
	    // 数据库名
	    database: 'xzxc',
	  },
	  // 是否加载到 app 上，默认开启
	  app: true,
	  // 是否加载到 agent 上，默认关闭
	  agent: false,
	};

	config.cors = {
        // {string|Function} origin: '*',
	    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
	    credentials: true
	};

	exports.security = {
	  domainWhiteList: [ 'http://localhost:8080','http://127.0.0.1:8080','http://127.0.0.1:8888','http://47.94.238.77:8080'],
	  csrf: {
	    headerName: 'x-csrf-token'
	  }
	};

	// exports.passportGithub = {
	//   key: 'c',
	//   secret: 'd',
	// };
	// exports.passportGithub = {
	//   key: 'xzxc_clientID',
	//   secret: 'xzxc_clientSecret',
	// };
	 
	// exports.passportTwitter: {
	//   key: 'xzxc_clientID2',
	//   secret: 'xzxc_clientSecret2',
	// };

    return config;
};
