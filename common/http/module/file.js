/**
 *  文件处理模块
 */

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



// 单张图片上传
export const uploadImage = (obj) => {
	const formData = obj.data || {};
	const filePath = obj.path || null;
	return new Promise(function(resolve, reject) {
		uni.uploadFile({
			url: http.config.uploadUrl, //上传文件的地址
			fileType: 'image',
			formData,
			filePath,
			name: "file",
			success: function(res) {
				if (res.statusCode === 200) {
					const data = JSON.parse(res.data)
					resolve(data.accessUrl)
				} else {
					console.log('fail to upload image:' + res.data)
					reject(res.data)
				}
			},
			fail: function(res) {
				console.log('fail to upload image:' + res)
				reject(res)
			}
		})
	});

}

// 图片预览


