import utils from '@/common/util';
import qcloud from '@/common/http/index';
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

// 显示Toast提示
var showToast = (content, type, duration, cb) => {
	var type = (!type ? 'success' : '') + (type == 1 ? 'fail' : '') + (type == 2 ? 'exception ' : '') + (type == 3 ?
		'none' : '')
	uni.showToast({
		content: content,
		type: type,
		duration: duration || 2000,
		success(res) {
			typeof cb == "function" && cb();
		},
	});
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
	}).data;
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








//成为商铺店员信息
function saveShopsClerk(obj) {
	const shopsId = obj.shopsId;
	qcloud.request({
		url: api + 'shops/saveShopsClerk',
		data: {
			shopsId
		},
		login: true,
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

//获取商铺店员二维码
function getShopsClerkQrCode(obj) {
	qcloud.request({
		url: api + 'shops/getShopsClerkQrCode',
		login: true,
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


//商铺礼物领取
function giftReceive(obj) {
	const recommendGiftsId = obj.recommendGiftsId;
	qcloud.request({
		url: api + 'recommend/giftReceive',
		data: {
			recommendGiftsId
		},
		login: true,
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

//推荐商铺列表
function myRecShopsList(obj) {
	qcloud.request({
		url: api + 'recommend/myRecShopsList',
		login: true,
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

//用户推荐地址
function saveUserRec(obj) {
	const data = obj.data || {};
	qcloud.request({
		url: api + 'recommend/saveUserRec',
		data,
		login: true,
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

//推荐礼物列表
function queryRecGiftsList(obj) {
	qcloud.request({
		url: api + 'recommend/queryRecGiftsList',
		login: true,
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

//用户推荐信息
function queryUserRecommendInfo(obj) {
	qcloud.request({
		url: api + 'recommend/queryUserRecommendInfo',
		login: true,
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

//保存推荐商铺信息
function saveRecShops(obj) {
	const userId = obj.userId || null;
	qcloud.request({
		url: api + 'recommend/saveRecShops',
		data: {
			userId
		},
		login: true,
		loginType: "0",
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


//余额提现
function shopsWithdraw(obj) {
	const amount = obj.amount;
	qcloud.request({
		url: api + 'shops/shopsWithdraw',
		data: {
			amount
		},
		login: true,
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

// 查询商铺时间段内交易信息
function queryShopsInCome(obj) {
	const queryType = obj.queryType || null;
	qcloud.request({
		url: api + 'shops/queryShopsInCome',
		data: {
			queryType
		},
		login: true,
		success(res) {
			obj.res = res;
			success(obj)
		},
		fail(err) {
			obj.err = err;
			fail(obj)
		},
	})
}

// 商店今日数据信息
function todayShopsIncome(obj) {
	qcloud.request({
		url: api + 'shops/todayShopsIncome',
		loginType: "0",
		login: true,
		success(res) {
			obj.res = res;
			listSuccess(obj);
		},
		fail(err) {
			obj.err = err;
			fail(obj);
		},
	})
}

//查询商铺销售保险列表
function queryShopsSellInsureList(obj) {
	const pageSize = obj.pageSize || 10;
	const page = obj.page || 1;
	qcloud.request({
		url: api + 'shops/queryShopsSellInsureList',
		login: true,
		data: {
			page,
			pageSize,
		},
		success(res) {
			obj.res = res;
			listSuccess(obj);
		},
		fail(err) {
			obj.err = err;
			fail(obj);
		},
	})
}

//查询商铺保险收益信息
function queryShopsInsuranceIncome(obj) {
	qcloud.request({
		url: api + 'shops/queryShopsInsuranceIncome',
		login: true,
		success(res) {
			obj.res = res;
			success(obj)
		},
		fail(err) {
			obj.err = err;
			fail(obj)
		},
	})
}

//提交代理保险
function shopsGoodsSale(obj) {
	const saleTypes = obj.saleTypes || null;
	qcloud.request({
		url: api + 'shops/shopsGoodsSale',
		data: {
			saleTypes
		},
		login: true,
		success(res) {
			obj.res = res;
			success(obj)
		},
		fail(err) {
			obj.err = err;
			fail(obj)
		},
	})
}


//查询保险套餐列表
function querySetMealList(obj) {
	const insuranceType = obj.insuranceType || null;
	qcloud.request({
		url: api + 'shops/querySetMealList',
		data: {
			insuranceType
		},
		login: true,
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

//查询商铺收入明细列表
function queryShopsIncomeList(obj) {
	const pageSize = obj.pageSize || 10;
	const page = obj.page || 1;
	const month = obj.month || null;
	qcloud.request({
		url: api + 'shops/queryShopsIncomeList',
		login: true,
		data: {
			page,
			pageSize,
			month
		},
		success(res) {
			obj.res = res;
			listSuccess(obj);
		},
		fail(err) {
			obj.err = err;
			fail(obj);
		},
	})
}


//查询商铺短信发送明细列表
function querySmsDetailList(obj) {
	const sendSmsId = obj.sendSmsId || null;
	const pageSize = obj.pageSize || 10;
	const page = obj.page || 1;
	qcloud.request({
		url: api + 'shops/querySmsDetailList',
		login: true,
		data: {
			page,
			pageSize,
			sendSmsId
		},
		success(res) {
			obj.res = res;
			listSuccess(obj);
		},
		fail(err) {
			obj.err = err;
			fail(obj);
		},
	})
}

//商铺发送短信
function sendShopsSms(obj) {
	const sendUserIds = obj.sendUserIds;
	const smsContent = obj.smsContent || '';

	qcloud.request({
		url: api + 'shops/sendShopsSms',
		data: {
			sendUserIds,
			smsContent
		},
		login: true,
		success(res) {
			obj.res = res;
			success(obj)
		},
		fail(err) {
			obj.err = err;
			fail(obj)
		},
	})
}

//商铺短信发送详情
function smsSendInfo(obj) {
	const sendSmsId = obj.sendSmsId || null;

	qcloud.request({
		url: api + 'shops/smsSendInfo',
		data: {
			sendSmsId,
		},
		login: true,
		success(res) {
			obj.res = res;
			success(obj)
		},
		fail(err) {
			obj.err = err;
			fail(obj)
		},
	})
}

//查询商铺发送短信记录列表
function queryShopsSendList(obj) {
	const pageSize = obj.pageSize || 10;
	const page = obj.page || 1;
	qcloud.request({
		url: api + 'shops/queryShopsSendList',
		login: true,
		data: {
			page,
			pageSize,
		},
		success(res) {
			obj.res = res;
			listSuccess(obj);
		},
		fail(err) {
			obj.err = err;
			fail(obj);
		},
	})
}


//商铺短信充值
function reqShopsSmsRecharge(obj) {
	const smsPackageId = obj.smsPackageId || null;

	qcloud.request({
		url: api + 'shops/reqShopsSmsRecharge',
		data: {
			smsPackageId,
		},
		login: true,
		success(res) {
			obj.res = res;
			success(obj)
		},
		fail(err) {
			obj.err = err;
			fail(obj)
		},
	})
}

//查询短信套餐列表
function querySmsPackageList(obj) {
	qcloud.request({
		url: api + 'shops/querySmsPackageList',
		success(res) {
			obj.res = res;
			success(obj)
		},
		fail(err) {
			obj.err = err;
			fail(obj)
		},
	})
}

//用户宠物列表
function queryPetsList(obj) {
	const pageSize = obj.pageSize || 10;
	const page = obj.page || 1;
	const userId = obj.userId || null;
	qcloud.request({
		url: api + 'pets/queryPetsList',
		login: true,
		data: {
			page,
			pageSize,
			userId,
		},
		success(res) {
			obj.res = res;
			listSuccess(obj);
		},
		fail(err) {
			obj.err = err;
			fail(obj);
		},
	})
}

//商家查看店铺会员信息
function queryShopUser(obj) {
	const userId = obj.userId || null;

	qcloud.request({
		url: api + 'user/queryShopUser',
		data: {
			userId,
		},
		login: true,
		success(res) {
			obj.res = res;
			success(obj)
		},
		fail(err) {
			obj.err = err;
			fail(obj)
		},
	})
}

// 更新商铺二维码
function getShopQrCode(obj) {
	const shopsId = obj.shopsId || 0;
	qcloud.request({
		url: api + 'shops/getShopQrCode/' + shopsId,
		login: true,
		success(res) {
			obj.res = res;
			success(obj);
		},
		fail(err) {
			obj.err = err;
			fail(obj)
		}
	});
}

//查询商铺客户列表
function queryShopsUserList(obj) {
	const pageSize = obj.pageSize || 10;
	const page = obj.page || 1;
	const isMember = obj.isMember || null;
	qcloud.request({
		url: api + 'shops/queryShopsUserList',
		login: true,
		data: {
			page,
			pageSize,
			isMember,
		},
		success(res) {
			obj.res = res;
			listSuccess(obj);
		},
		fail(err) {
			obj.err = err;
			fail(obj);
		},
	})
}

// 提交商铺审核
function submitShopsReview(obj) {
	const data = obj.data;
	qcloud.request({
		url: api + 'shops/submitShopsReview',
		data,
		login: true,
		success(res) {
			obj.res = res;
			success(obj);
		},
		fail(err) {
			obj.err = err;
			fail(obj)
		}
	});
}

// 保存商家信息
function saveShops(obj) {
	const data = obj.data;
	qcloud.request({
		url: api + 'shops/saveShops',
		data,
		login: true,
		success(res) {
			obj.res = res;
			success(obj);
		},
		fail(err) {
			obj.err = err;
			fail(obj)
		}
	});
}

//获取商家信息(不传ID则为获取自己的商铺信息)
function shopsInfo(obj) {
	const shopsId = obj.shopsId || null;
	const loginType = obj.loginType || null;
	const lngPoint = obj.lngPoint || null;
	const latPoint = obj.latPoint || null;

	qcloud.request({
		url: api + 'shops/shopsInfo',
		data: {
			shopsId,
			lngPoint,
			latPoint
		},
		login: shopsId ? false : true,
		loginType,
		success(res) {
			obj.res = res;
			success(obj)
		},
		fail(err) {
			obj.err = err;
			console.log(err)
			if (err.type == 'ERR_GET_USER_INFO') {
				return;
			}
			fail(obj)
		},
	})
}

//获取用户信息(不传ID则为获取个人信息)
function getUserInfo(obj) {
	const userId = obj.userId || null;
	const loginType = obj.loginType || null;
	const lngPoint = obj.lngPoint || null;
	const latPoint = obj.latPoint || null;

	qcloud.request({
		url: api + 'auth/getUserInfo',
		data: {
			userId,
			lngPoint,
			latPoint
		},
		login: true,
		loginType,
		success(res) {
			obj.res = res;
			success(obj)
		},
		fail(err) {
			obj.err = err;
			fail(obj)
		},
	})
}

// ------------------------------------------------------------

// 芝麻认证授权确认
function zhimaCreditConfirm(obj) {
	const userName = obj.userName;
	const idCard = obj.idCard;
	qcloud.request({
		url: api + 'user/zhimaCreditConfirm',
		login: true,
		success(res) {
			obj.res = res;
			success(obj);
		},
		fail(err) {
			obj.err = err;
			fail(obj)
		}
	});
}

// 提交芝麻认证授权申请(姓名与身份证号码)
function zhimaCreditApply(obj) {
	const userName = obj.userName;
	const idCard = obj.idCard;
	qcloud.request({
		url: api + 'user/zhimaCreditApply',
		data: {
			userName,
			idCard
		},
		login: true,
		success(res) {
			obj.res = res;
			success(obj);
		},
		fail(err) {
			obj.err = err;
			fail(obj)
		}
	});
}

// 判断用户是否授权
function isAuthUserInfo() {
	const session = qcloud.getSession();
	return session;
}

// 清空用户登录
function clearSession() {
	qcloud.clearSession();
}

//检验验证码
function judgeVerifyCode(obj) {
	const phoneNumber = obj.phoneNumber;
	const verifyCode = obj.verifyCode;
	qcloud.request({
		url: api + 'user/judgeVerifyCode',
		data: {
			phoneNumber,
			verifyCode
		},
		login: true,
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

//获取验证码
function sendPhoneCode(obj) {
	const phoneNumber = obj.phoneNumber;
	qcloud.request({
		url: api + 'user/sendPhoneCode/' + phoneNumber,
		login: true,
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

//支付
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

/**
 * 上传文件组并返回上传后的文件的地址数组
 * urls是临时文件路径组，newUrlsObj是多个服务器文件路径组的对象
 * urls的元素对象格式为：{name:name,url:url,formData:formData},可以用utils中的formatFilePath方法格式化临时文件路径组
 * newUrlsObj是多个不同类型照片组的对象，例如头像组和描叙组
 */
function uploadFile(obj) {
	const that = this
	const urls = obj.urls || []; //临时文件路径组
	const newUrlsObj = obj.newUrlsObj || {}; //多个服务器文件路径组的对象
	const num = obj.num || urls.length; //要上传的照片的总张数
	const success = obj.success;
	const fail = obj.fail;
	obj.num = num;
	if (typeof success != "function") return

	if (urls.length == 0) {
		// 已无要上传的照片
		my.hideLoading();
		success(newUrlsObj);
		return
	}
	const url = urls[0];
	// if (url["url"].indexOf("http://") >= 0) {
	if (url["url"].indexOf("https://resource") < 0 && url["url"].indexOf("temp://") < 0) {
		urls.shift();
		var arr = newUrlsObj && newUrlsObj[url.name] ? newUrlsObj[url.name] : new Array
		arr.push(url["url"])
		newUrlsObj[url.name] = arr
		obj.urls = urls;
		obj.newUrlsObj = newUrlsObj;
		that.uploadFile(obj)
		return
	}

	// showLoading(`上传中 ${num - urls.length + 1}/${num}`);

	// 进行formData的aes接口加密
	// const formData = url["formData"] || {};
	// var sign = qcloud.aes(formData);
	// formData.sign = sign;
	// url["formData"] = formData;
	console.log(url["formData"])

	my.uploadFile({
		url: config.service.api + 'file/uploadFile',
		filePath: url["url"],
		fileName: "file",
		fileType: "image",
		formData: url["formData"],
		success: function(res) {
			console.log(res)
			var data = JSON.parse(res.data);
			if (data.resultCode == "Y") {
				urls.shift()
				const arr = newUrlsObj && newUrlsObj[url.name] ? newUrlsObj[url.name] : new Array

				arr.push(data.accessUrl)
				newUrlsObj[url.name] = arr
				obj.urls = urls;
				obj.newUrlsObj = newUrlsObj;
				that.uploadFile(obj)
			} else {
				showToast(res.data.resultMsg, 1, 3000);
				console.log('请求异常,错误' + res.data.resultMsg)
				typeof fail == "function" && fail(res.data)
			}
		},
		fail(err) {
			console.log(err)
			obj.err = err;
			fail(obj)
		},
	})
}


module.exports = {
// 	queryShopsClerkList: queryShopsClerkList,
// 	delShopsClerk: delShopsClerk,
// 	saveShopsClerk: saveShopsClerk,
// 	getShopsClerkQrCode: getShopsClerkQrCode,
// 
// 	giftReceive: giftReceive,
// 	myRecShopsList: myRecShopsList,
// 	saveUserRec: saveUserRec,
// 	queryRecGiftsList: queryRecGiftsList,
// 	queryUserRecommendInfo: queryUserRecommendInfo,
// 	saveRecShops: saveRecShops,
// 
// 	queryShopsInCome: queryShopsInCome,
// 	todayShopsIncome: todayShopsIncome,
// 
// 	queryShopsSellInsureList: queryShopsSellInsureList,
// 	queryShopsInsuranceIncome: queryShopsInsuranceIncome,
// 	shopsGoodsSale: shopsGoodsSale,
// 	querySetMealList: querySetMealList,
// 
// 	queryShopsIncomeList: queryShopsIncomeList,
// 
// 	querySmsDetailList: querySmsDetailList,
// 	sendShopsSms: sendShopsSms,
// 	smsSendInfo: smsSendInfo,
// 	queryShopsSendList: queryShopsSendList,
// 	reqShopsSmsRecharge: reqShopsSmsRecharge,
// 	querySmsPackageList: querySmsPackageList,
// 	queryPetsList: queryPetsList,
// 	queryShopUser: queryShopUser,
// 	getShopQrCode: getShopQrCode,
// 	queryShopsUserList: queryShopsUserList,
// 	submitShopsReview: submitShopsReview,
// 	saveShops: saveShops,
// 	shopsInfo: shopsInfo,
// 	getUserInfo: getUserInfo,
// 
// 	//   --------------------------------------  
// 
// 	zhimaCreditConfirm: zhimaCreditConfirm,
// 	zhimaCreditApply: zhimaCreditApply,
// 	isAuthUserInfo: isAuthUserInfo,
// 	clearSession: clearSession,
// 	shopsWithdraw: shopsWithdraw,
// 	judgeVerifyCode: judgeVerifyCode,
// 	sendPhoneCode: sendPhoneCode,
// 	queryBannerList: queryBannerList,
// 	analysisLocation: analysisLocation,
// 	textRiskIdentification: textRiskIdentification,
// 	tradePay: tradePay,
// 	uploadFile: uploadFile,
// 	saveFormIds: saveFormIds,
// 	setFormId: setFormId,
	fail: fail,
	removeStorageSync: removeStorageSync,
	getStorageSync: getStorageSync,
	setStorageSync: setStorageSync,
	alert: alert,
	confirm: confirm,
	showToast: showToast,
	showLoading: showLoading,
}
