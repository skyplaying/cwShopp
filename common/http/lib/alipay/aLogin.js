var constants = require('./constants');
var Session = require('./../session');
var Aes = require('./../aes_request');

/***
 * @class
 * 表示登录过程中发生的异常
 */
var LoginError = (function() {
	function LoginError(error, errorMessage) {
		Error.call(this, errorMessage);
		this.error = error;
		this.errorMessage = errorMessage;
	}

	LoginError.prototype = new Error();
	LoginError.prototype.constructor = LoginError;

	return LoginError;
})();

/**
 * 支付宝登录，获取 code 和 encryptData
 */
var getWxLoginResult = function getLoginCode(loginType, callback) {
	// 不传或传"0"是静默授权，传了"1"是用户授权
	console.log(loginType)
	let scopes = ["auth_base"];
	if (loginType == "1") {
		scopes = ["auth_user"] //删除芝麻信用
	}
	var i = 0
	my.getAuthCode({
		scopes,
		success: function(loginResult) {
			new Promise((resolve, reject) => {
				resolve();
			}).then(() => {
				if (i != 0) return;
				i++;
				callback(null, {
					code: loginResult.authCode,
				});
			}).catch((error) => {});
		},

		fail: function(loginError) {
			var error = new LoginError(constants.ERR_LOGIN_FAILED, '支付宝授权失败，需要您的授权才可以正常使用');
			error.detail = loginError;
			callback(error, null);
		},
	});
};

var noop = function noop() {};
var defaultOptions = {
	method: 'POST',
	success: noop,
	fail: noop,
	loginUrl: null,
};

/**
 * @method
 * 进行服务器登录，以获得登录会话
 *
 * @param {Object} options 登录配置
 * @param {string} options.loginUrl 登录使用的 URL，服务器应该在这个 URL 上处理登录请求
 * @param {string} [options.method] 请求使用的 HTTP 方法，默认为 "GET"
 * @param {Function} options.success(userInfo) 登录成功后的回调函数，参数 userInfo 支付宝用户信息
 * @param {Function} options.fail(error) 登录失败后的回调函数，参数 error 错误信息
 */
var login = function login(options) {

	options = Object.assign({}, defaultOptions, options);

	if (!defaultOptions.loginUrl) {
		options.fail(new LoginError(constants.ERR_INVALID_PARAMS, '登录错误：缺少登录地址，请通过 setLoginUrl() 方法设置登录地址'));
		return;
	}

	options.loginType = options.loginType == "1" ? "1" : "0";

	var doLogin = () => getWxLoginResult(options.loginType, function(wxLoginError, wxLoginResult) {
		if (wxLoginError) {
			options.fail(wxLoginError);
			return;
		}

		// 构造请求头，包含 code 和 loginType (头部数据只能为string类型)
		var code = wxLoginResult.code + '';
		var loginType = options.loginType + '';
		var header = {};
		header[constants.HEADER_CODE] = code;  //
		header[constants.LOGIN_TYPE] = loginType;

		// 进行data的aes接口加密
		const data = options.data || {};
		var sign = Aes.sign(data);
		data.sign = sign;
		options.data = data;

		// 请求服务器登录地址，获得会话信息 
		uni.request({
			url: options.loginUrl,
			headers: header,
			method: options.method,
			data: options.data,
			success: function(result) {
				console.log(result);
				var data = result.data;
				// 成功地响应会话信息
				if (data && data.resultCode == 'Y') {
					if (data.session) {
						data.session.isAuthUser = options.loginType;
						Session.set(data.session);
						options.success();
					} else {
						var errorMessage = '登录失败(' + data.error + ')：' + (data.resultMsg || '未知错误');
						var noSessionError = new LoginError(constants.ERR_LOGIN_SESSION_NOT_RECEIVED, errorMessage);
						options.fail(noSessionError);
					}

					// 没有正确响应会话信息
				} else if (data && data.resultCode == 'TOKEN_INVALID') {
					Session.clear();
					doLogin();
				} else {
					// var errorMessage = '登录请求没有包含会话响应，请确保服务器处理 `' + options.loginUrl + '` 的时候正确使用了 SDK 输出登录结果';
					var errorMessage = '登录失败，请联系客服进行反馈';
					var noSessionError = new LoginError(constants.ERR_LOGIN_SESSION_NOT_RECEIVED, errorMessage);
					options.fail(noSessionError);
				}
			},

			// 响应错误
			fail: function(loginResponseError) {
				var error = new LoginError(constants.ERR_LOGIN_FAILED, '登录失败，可能是网络错误或者服务器发生异常');
				options.fail(error);
			},
		});
	});

	var session = Session.get();
	// console.log(session)
	// 存在session时，如果此次是用户授权并且上次也是用户授权（又或者此次是静默授权）时，无需再次请求
	if (session && (options.loginType == "0" || (options.loginType == "1" && session.isAuthUser == "1"))) {
		options.success();
	} else {
		doLogin();
	}
};

//设置登录地址
var setLoginUrl = function(loginUrl) {
	defaultOptions.loginUrl = loginUrl;
};

module.exports = {
	LoginError: LoginError,
	login: login,
	setLoginUrl: setLoginUrl,
};
