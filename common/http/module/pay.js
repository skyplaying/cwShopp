/* 
	多端支付
 */
import http from '@/common/http/interface'

var provider = getprovider();
//  获取小程序应用端
function getprovider() {
	uni.getProvider({
		success: (res) => {
			return res
		}
	})
}


// 支付收银台公共方法
export const commonPayment = (obj) => {
	// #ifdef MP-ALIPAY
	aliPayment()
	//#endif

	//#ifdef MP-BAIDU
	baiduPayment()
	//#endif

	//#ifdef MP-WEIXIN
	wxPayment()
	//#endif

}

//支付宝收银台
function aliPayment(obj) {
	const _self = this;
	let provider = getprovider();
	let msg; //支付是否成功，返回信息
	http.request({
		url: '/api/login/getAlipayTradeNo',
		type: 'POST',
		data: {
			'o': 'kk'
		},
		success: (res) => {
			// return res;
			if (res.data) {
				let tradeNo = res.data.tradeNo;
				// 调起支付
				uni.requestPayment({
					provider: provider,
					tradeNO: tradeNo,
					success: function(data) {

						if (data) {
							console.log(data)
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
							const resultCode = data.resultCode;
							console.log(resultCode)
							if (resultCode == 9000) {
								msg = '支付成功'
							} else {
								msg = errs[data.resultCode].errorMessage;
							}
							if (resultCode) {
								http.request({
									url: '/api/login/alipayPaymentCallBack',
									data: {
										code: resultCode,
										msg: msg
									},
									success(e) {
										console.log(e)
									}
								})
							}
							console.log(msg)
							return msg;

						}
					},
					fail(err) {
						console.log(err)
					},
				})
			}


			// 支付成功通知接口 /api/login/alipayPaymentCallBack
		}
	});

}

// 百度支付收银台
function baiduPayment() {
	http.request({
		url: '/api/login/getBaiduPayOrderInfo',
		type: 'post',
		data: {},
		success(e) {
			console.log(e)
			if (e) {
				let bizInfo=e.data;
				uni.requestPayment({
					provider: 'baidu',
					orderInfo: {
						"dealId":bizInfo.dealId,
						"appKey":bizInfo.appKey,
						"totalAmount":bizInfo.totalAmount,
						"tpOrderId": bizInfo.tpOrderId,
						"dealTitle": bizInfo.dealTitle,
						"signFieldsRange":bizInfo.signFieldsRange,
						"rsaSign":bizInfo.rsaSign,
						"bizInfo": bizInfo.bizInfo
					},
					success: function(res) {
						uni.showToast({
							title: '支付成功',
							icon: 'success'
						});
						console.log(res)
					},
					fail: function(err) {
						uni.showToast({
							title:'支付未成功',
							icon:'none'
						});
						console.log('pay fail', err);
					}
				});

			}
		}
	})


}

// 微信支付收银台
function wxPayment() {
	uni.login({
		provider: provider,
		success: function(loginRes) {
			let code = loginRes.code;
			// 请求后台数据 prepay_id paySign nonceStr timeStamp
			http.request({
				url: '/api/login/getWeChatPayInfo',
				data: {
					o: 'kk', //最低以分为单位
				},
				success: (res) => {
					res = res.data
					console.log(res);
					// 调起支付
					uni.requestPayment({
						provider: 'wxpay',
						timeStamp: res.timeStamp,
						nonceStr: res.nonceStr,
						package: res.package,
						signType: res.signType,
						paySign: res.paySign,
						success: function(res) {
							console.log('success:' + JSON.stringify(res));
						},
						fail: function(err) {
							console.log('fail:' + JSON.stringify(err));
						}
					});

				}
			});
		}
	});
}

export default {
	commonPayment: commonPayment,
}
