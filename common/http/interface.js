/**
 * 通用uni-app网络请求
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 */
import Aes from './lib/aes_request'
import Session from './lib/session'
// 条件编译 支付宝登录
// #ifdef MP-ALIPAY
import constants from './lib/alipay/constants'
import loginLib from './lib/alipay/aLogin'
// #endif
// 其他非支付宝小程序端
// #ifndef MP-ALIPAY
import loginLib from './lib/login'
import constants from './lib/constants'
// #endif




// production 生产环境
let baseUrl = "https://dogecard.qipinke.com/dogecard_api_server/api/";

if (process.env.NODE_ENV === 'development') {
	baseUrl = "https://test.qipinke.com/petserver/api/"
	// baseUrl = "http://192.168.0.240:8082/dogecard_api_server/api/"
}
// 设置登录地址
loginLib.setLoginUrl(baseUrl + 'auth/petPatronLogin');
// loginLib.setLoginUrl(baseUrl + 'wxuser/login');

export default {
	config: {
		baseUrl,
		uploadUrl: baseUrl + "file/uploadFile",
		header: {
			// #ifdef MP-ALIPAY
			'Content-Type': 'application/x-www-form-urlencoded'
			// #endif
			// #ifndef MP-ALIPAY
			'Content-Type': 'application/json;charset=UTF-8',
			// #endif
			
		},
		data: {},
		method: "POST",
		dataType: "json",
		/* 如设为json，会对返回的数据做一次 JSON.parse */
		responseType: "text",
		/* login为true时需要登录鉴权 */
		login: false,
		/* loginType为1时需要授权登录 */
		loginType: "0",
		success() {},
		fail() {},
		complete() {}
	},
	interceptor: {
		request: null,
		response: null
	},
	request(options) {

		options = Object.assign({}, this.config, options);
		options.url = options.baseUrl + options.url;

		// 登录后再请求
		const doRequestWithLogin = () => {
			return new Promise((resolve, reject) => {
				loginLib.login({
					loginType: options.loginType,
					success: () => {
						doRequest().then((res) => {
							resolve(res)
						}).catch((err) => {
							reject(err)
						})
					},
					fail: (error) => {
						reject(error)
					}
				});
			})
		}

		// 实际进行请求的方法
		const doRequest = () => {
			//TODO 加密数据[进行data的aes接口加密(已经加密的不要重复加密，不然会报错)]
			if (!options.data.sign) {
				var sign = Aes.sign(options.data);
				options.data.sign = sign;
			}
			//TODO 数据签名
			/* 
			_token = {'token': getStorage(STOREKEY_LOGIN).token || 'undefined'},
			_sign = {'sign': sign(JSON.stringify(options.data))}
			options.header = Object.assign({}, options.header, _token,_sign) 
			*/
			const session = Session.get();
			// #ifdef MP-ALIPAY
			if (session && session[constants.HEADER_TOKEN_KEY_NAME]) {
				options.header[constants.HEADER_TOKEN] = session[constants.HEADER_TOKEN_KEY_NAME];
			}
			// #endif
			// #ifndef MP-ALIPAY
			if (session && session.id && session.skey) {
				options.header[constants.WX_HEADER_ID] = session.id;
				options.header[constants.WX_HEADER_SKEY] = session.skey;
			}
			// #endif
			return new Promise((resolve, reject) => {
				let _config = null

				options.complete = (response) => {
					let statusCode = response.statusCode
					response.config = _config
					// if (process.env.NODE_ENV === 'development') {
					// 	if (statusCode === 200) {
					// 		console.log("【" + _config.requestId + "】 结果：" + JSON.stringify(response.data))
					// 	}
					// }
					if (this.interceptor.response) {
						let newResponse = this.interceptor.response(response)
						if (newResponse) {
							response = newResponse
						}
					}
					// 统一的响应日志记录
					_reslog(response)
					if (statusCode === 200) { //成功
						var data = response.data;
						// 如果响应的数据错误码为TOKEN_INVALID，则表示token已失效或者不存在，即登录态失败
						// #ifdef MP-ALIPAY
						if (data && data.resultCode == 'TOKEN_INVALID') {
							// 清除登录态
							Session.clear();
							// 如果是登录态无效，并且还没重试过，会尝试登录后刷新凭据重新请求
							if (!hasRetried) {
								hasRetried = true;
								console.log('重新请求');

								this.doRequestWithLogin()
								that.request(options).then((response) => {
									resolve(response);
								}).catch((err) => {
									reject(response)
								});;
								return;
							}
							reject(response)
							return;
						}
						// #endif
						// #ifndef MP-ALIPAY
						// 如果响应的数据里面包含 SDK Magic ID，表示被服务端 SDK 处理过，此时一定包含登录态失败的信息
						if (data && data[constants.WX_SESSION_MAGIC_ID]) {
							// 清除登录态
							Session.clear();
							var error, message;
							if (data.error === constants.ERR_INVALID_SESSION) {
								// 如果是登录态无效，并且还没重试过，会尝试登录后刷新凭据重新请求
								if (!hasRetried) {
									hasRetried = true;
									doRequestWithLogin();
									return;
								}
								reject(response)
							} else {
								console.log('鉴权发送错误，请与后台配合查询')
								reject(response)
							}
							reject(response)
							return;
						}
						// #endif
						resolve(response);
					} else {
						reject(response)
					}
				}

				_config = Object.assign({}, this.config, options)
				_config.requestId = new Date().getTime()

				if (this.interceptor.request) {
					this.interceptor.request(_config)
				}

				// 统一的请求日志记录
				_reqlog(_config)

				// if (process.env.NODE_ENV === 'development') {
				// 	console.log("【" + _config.requestId + "】 地址：" + _config.url)
				// 	if (_config.data) {
				// 		console.log("【" + _config.requestId + "】 参数：" + JSON.stringify(_config.data))
				// 	}
				// }

				uni.request(_config);
			});
		}

		// 是否已经进行过重试
		let hasRetried = false;

		// 是否需要登录鉴权
		if (options.login) {
			return doRequestWithLogin();
		} else {
			return doRequest();
		}
	},
	get(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	},
	post(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	put(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'PUT'
		return this.request(options)
	},
	delete(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	},
}


/**
 * 请求接口日志记录
 */
function _reqlog(req) {
	// if (process.env.NODE_ENV === 'development') {
	// 	console.log("【" + req.requestId + "】 地址：" + req.url)
	// 	if (req.data) {
	// 		console.log("【" + req.requestId + "】 请求参数：" + JSON.stringify(req.data))
	// 	}
	// }
	//TODO 调接口异步写入日志数据库
}

/**
 * 响应接口日志记录
 */
function _reslog(res) {
	// let _statusCode = res.statusCode;
	// if (process.env.NODE_ENV === 'development') {
	// 	console.log("【" + res.config.requestId + "】 地址：" + res.config.url)
	// 	if (res.config.data) {
	// 		console.log("【" + res.config.requestId + "】 请求参数：" + JSON.stringify(res.config.data))
	// 	}
	// 	console.log("【" + res.config.requestId + "】 响应结果：" + JSON.stringify(res))
	// }
	// //TODO 除了接口服务错误外，其他日志调接口异步写入日志数据库
	// switch (_statusCode) {
	// 	case 200:
	// 		break;
	// 	case 401:
	// 		break;
	// 	case 404:
	// 		break;
	// 	default:
	// 		break;
	// }
}
