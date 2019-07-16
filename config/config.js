/**
 *  域名及请求 .. 配置
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var hosts = [{
	HTTP: 'https',
	NAME: 'dogecard.qipinke.com'
}, ]

var index = 0;

var host = `${hosts[index].HTTP}://${hosts[index].NAME}`;

var config = {

	// 下面的地址配合云端 Demo 工作  
	service: {
		host,
		// 登录地址，用于建立会话
		loginUrl: `${host}/dogecard_api_server/api/wxuser/login`,

		// 测试的请求地址，用于测试会话
		requestUrl: `${host}/dogecard_api_server/api/wxuser/user`,

		// 测试的信道服务地址
		tunnelUrl: `${host}/dogecard_api_server/api/wxuser/tunnel`,

		// 接口地址
		api: `${host}/dogecard_api_server/api/`,
	},
	header: {
		// #ifdef MP-ALIPAY
		'Content-Type': 'application/x-www-form-urlencoded'
		// #endif
		// #ifndef MP-ALIPAY
		'Content-Type': 'application/json;charset=UTF-8',
		// #endif
	},

};

module.exports = config;
