import http from './interface'
import rewrite from '@/common/http/alertApi.js'
import common from '@/common/http/module/common.js'


/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 
 */

// // 单独导出(测试接口) import {test} from '@/common/vmeitime-http/'
// export const test = (data) => {
// 	// http.config.baseUrl = "https://test.qipinke.com/petserver/api/"
// 	//设置请求前拦截器
// 	http.interceptor.request = (config) => {
// 		config.header = {
// 			"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
// 		}
// 	}
// 	//设置请求结束后拦截器
// 	http.interceptor.response = (response) => {
// 		console.log('个性化response....')
// 		//判断返回状态 执行相应操作
// 		return response;
// 	}
// 	return http.request({
// 		baseUrl: 'https://unidemo.dcloud.net.cn/',
// 		url: 'ajax/echo/text?name=uni-app',
// 		dataType: 'text',
// 		data,
// 	})
// }


//设置请求结束后拦截器
http.interceptor.response = (res) => {
	// console.log('个性化response....')
	if (res.statusCode == 200) {
		//分页列表的接口
		if (res.data.pageSize) {
			const noMore1 = res.data.total % res.data.pageSize == 0 && res.data.total / res.data.pageSize == res.data.page
			const noMore2 = res.data.total % res.data.pageSize != 0 && res.data.total / res.data.pageSize < res.data.page
			res.data.noMore = res.data.total == 0 || noMore1 || noMore2;
		} else if (res.data.resultCode == 'N') {
			uni.hideLoading();
			uni.showToast({
				content:res.data.resultMsg
			})
		}
	}

	//判断返回状态 执行相应操作
	return res;
}

//获取用户信息(不传ID则为获取个人信息)
export const getUserInfo = (obj) => {
	obj = obj || {};
	const userId = obj.userId || null;
	const loginType = obj.loginType || "1";
	const lngPoint = obj.lngPoint || null;
	const latPoint = obj.latPoint || null;
	// #ifdef MP-ALIPAY
	return http.request({
		url: 'auth/getUserInfo',
		data: {
			userId,
			lngPoint,
			latPoint
		},
		login: true,
	})
	// #endif
	// #ifndef MP-ALIPAY
	return http.request({
		url: 'user/getPartUser',
		data: {
			userId,
		},
		login: true,
	})
	// #endif
}



// 默认全部导出  import api from '@/common/vmeitime-http/'
export default {
	getUserInfo,
	...rewrite,
	...common,
}
