//请求封装
function Http(url, method, data) {
	//请求头设置
	var header = {
		Authorization: wx.getStorageSync("login_token")
	}
	return new Promise((resolve, reject) => {
		 uni.request({
			url: config.home_config + url,
			data: data,
			header: header,
			method: method,
			success: (res => {
				if (res.data.code === 200) {
					resolve(res)
				} else {
					reject(res)
				}
			}),
			fail: (res => {
				reject(res)
			})
		})
	})
}
