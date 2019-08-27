import utils from '@/common/util';
import http from '@/common/http/interface';
import config from '@/config/config.js';
const api = config.service.api;

// 显示警告框
var alert = (content, cb, buttonText) => {
	uni.hideToast();
	uni.hideLoading();
	uni.hideNavigationBarLoading();
	uni.alert({
		content: JSON.stringify(content),
		buttonText: buttonText || '知道了',
		success() {
			typeof cb == "function" && cb();
		},
	});
};

// 显示确认框
var confirm = (cb, content, confirmButtonText, cancelButtonText) => {
	uni.hideToast();
	uni.hideLoading();
	uni.hideNavigationBarLoading();

	uni.confirm({
		title: '温馨提示',
		content: content,
		confirmButtonText: confirmButtonText || '确定',
		cancelButtonText: cancelButtonText || '取消',
		success(res) {
			console.log(res)
			if (res.confirm) {
				typeof cb == "function" && cb();
			}
		},
	});
};

// // 显示Toast提示
// var showToast = (content, type, duration, cb) => {
// 	var type = (!type ? 'success' : '') + (type == 1 ? 'fail' : '') + (type == 2 ? 'exception ' : '') + (type == 3 ?
// 		'none' : '')
// 	uni.showToast({
// 		content: content,
// 		type: type,
// 		duration: duration || 2000,
// 		success(res) {
// 			typeof cb == "function" && cb();
// 		},
// 	});
// }

const showToast=(content,icon,duration)=>{
uni.showToast({
	content:content,
	icon:icon||'none',
	duration:duration||1200,
	success(res) {
		return res;
	}
})
}

// 显示加载中
var showLoading = (content, delay) => {
	// isNavbar决定是头部显示加载还是页面显示加载
	uni.showLoading({
		content: content || '加载中...',
		delay: delay || 0,
	})
}

// 同步缓存
var setStorageSync = (key, data) => {
	uni.setStorageSync({
		key: key,
		data: data
	});
}

// 同步获取缓存
var getStorageSync = (key) => {
	return uni.getStorageSync({
		key: key
	});
}

// 同步清除缓存
var removeStorageSync = (key) => {
	uni.removeStorageSync({
		key: key
	});
}

//接口调用失败的回调函数(点击事件失败后放开防止双击字段需要用到失败回调函数)
const fail = (obj) => {
	const err = obj.err;
	const fail = obj.fail;
	const errorTexts = {
		11: '无权跨域',
		12: '网络出错',
		13: '请求超时，请检查网络',
		14: '服务器正在升级，请稍后再试',
		19: '服务器正在升级，请稍后再试',
		// 19: 'HTTP错误',
	};
	alert(errorTexts[err.error] || err.errorMessage);
	typeof fail == "function" && fail(err);
}

//接口调用成功的回调函数
const success = (obj) => {
	const res = obj.res;
	const success = obj.success;
	const fail = obj.fail;
	if (res.data.resultCode == 'Y') {
		typeof success == "function" && success(res.data)
	} else {
		alert(res.data.resultMsg || ('错误' + res.data.status));
		console.log('请求异常,' + (res.data.resultMsg || ('错误' + res.data.status)))
		typeof fail == "function" && fail(res.data)
	}
}

//有分页的列表接口调用成功的回调函数
const listSuccess = (obj) => {
	const res = obj.res;
	// console.log(res)
	const success = obj.success;
	// 判断是否还有数据可以加载
	const noMore = isNoMore(res)
	res.data.noMore = noMore;

	typeof success == "function" && success(res.data)
}

// 判断是否还有数据可以加载
const isNoMore = (res) => {
	const ifNoMore1 = res.data.total % res.data.pageSize == 0 && res.data.total / res.data.pageSize == res.data.page
	const ifNoMore2 = res.data.total % res.data.pageSize != 0 && res.data.total / res.data.pageSize < res.data.page
	const ifNoMore = res.data.total == 0 || ifNoMore1 || ifNoMore2
	return ifNoMore;
}
// --------------------------------------------------------------------------





// 判断用户是否授权
function isAuthUserInfo() {
	const session = qcloud.getSession();
	return session;
}

// 清空用户登录
function clearSession() {
	qcloud.clearSession();
}




//查询轮播图列表
function queryBannerList(obj) {
	qcloud.request({
		url: api + 'common/queryBannerList',
		success(res) {
			obj.res = res;
			success(obj);
		},
		fail(err) {
			obj.err = err;
			fail(obj)
		},
	})
}


//反解析定位
function analysisLocation(obj) {
	const latPoint = obj.latPoint;
	const lngPoint = obj.lngPoint;
	qcloud.request({
		url: api + 'common/location',
		data: {
			latPoint,
			lngPoint
		},
		success(res) {
			typeof obj.success == 'function' && obj.success(res.data);
		},
		fail(err) {
			obj.err = err;
			fail(obj)
		},
	})
}

//上传formIds至服务器
function saveFormIds() {
	//调用API从本地缓存中获取数据
	const that = this;
	var formIds = this.getStorageSync('formIds') || [] // 获取formIds
	if (formIds.length == 0) return
	//gloabalFomIds存在的情况下 将数组转换为JSON字符串
	formIds = JSON.stringify(formIds);
	console.log(formIds)
	qcloud.request({
		url: api + 'userForm/saveUserForm',
		login: true,
		data: {
			userFormVorms: formIds
		},
		success: function(res) {
			if (res.data.resultCode == "Y")
				that.setStorageSync('formIds', []); //保存推送码并赋值给全局变量
		}
	});
}

//保存formId
function setFormId(e) {
	var formId = e.detail.formId
	if (!formId) return
	let formIds = this.getStorageSync('formIds') || []; //获取全局数据中的推送码formIds数组
	let data = {
		formId: formId,
		formTime: parseInt(new Date().getTime()) //当前时间戳
	}
	formIds.push(data); //将data添加到数组的末尾
	console.log(formIds)
	this.setStorageSync('formIds', formIds); //保存推送码并赋值给全局变量
}

// 判断文字内容敏感词
function textRiskIdentification(cb, content, where, type) {
	if (!content) {
		typeof cb == 'function' && cb();
		return;
	}
	const mc = this;
	my.textRiskIdentification({
		content,
		type: type || ['keyword', '0', '1', '2'],
		success(res) {
			const data = res.result;
			// mc.alert(data)
			if (data[0].hitKeywords) {
				const hitKeywordArr = data[0].hitKeywords;
				const hitKeyword = hitKeywordArr.join(',');
				mc.alert('您的' + where + '中涉及以下敏感性字段:‘' + hitKeyword + '’，请修改');
				return;
			}
			for (let i in data) {
				if (data[i].score >= 90) {
					if (data[i].type == 0) {
						mc.alert('您的标题中涉及广告，请修改');
						return;
					} else if (data[i].type == 1) {
						mc.alert('您的标题中涉政，请修改');
						return;
					} else if (data[i].type == 2) {
						mc.alert('您的标题中涉黄，请修改');
						return;
					}
				}
			}
			typeof cb == 'function' && cb();
		},
		fail(err) {
			mc.alert(err)
		},
	})
}

//支付宝支付
function tradePay(obj) {
	const tradeNO = obj.tradeNO;
	my.tradePay({
		tradeNO,
		success(res) {
			const errs = [];
			errs[8000] = {
				errorMessage: '正在处理中',
			};
			errs[4000] = {
				errorMessage: '订单支付失败',
			};
			errs[6001] = {
				errorMessage: '您已取消支付',
			};
			errs[6002] = {
				errorMessage: '网络连接出错',
			};
			errs[99] = {
				errorMessage: '订单未支付成功',
			};
			const resultCode = res.resultCode;
			if (resultCode == 9000) {
				typeof obj.success == 'function' && obj.success();
			} else {
				obj.err = errs[res.resultCode];
				fail(obj);
			}
		},
		fail(err) {
			obj.err = err;
			fail(obj)
		},
	});
}






export default{
		fail: fail,
		removeStorageSync: removeStorageSync,
		getStorageSync: getStorageSync,
		setStorageSync: setStorageSync,
		alert: alert,
		confirm: confirm,
		showToast: showToast,
		showLoading: showLoading,
		...utils,
}