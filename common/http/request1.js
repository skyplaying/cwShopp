//  封装 request请求
import {config} from '@/config/config.js'

class http {
  request ({
    url,
    success,
    fail,
    // method = 'GET',
    data = {},
    header = {}
  }) {
    wx.request({
      url: config.config.service.api + url,
      method:method,
      data: data,
      header: Object.assign(header, config.header),
      success: (res) => {
        let code = res.statusCode.toString()
        if (code.startsWith('2') || code === '304') {
          success && success(res.data)
        } else {i
          fail && fail(res.data)
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        fail && fail(res.data)
        this._show_error(1)
      }
    })
  }

  // 提示错误
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip = config.tips[error_code]
     .showToast({
      title: tip ? tip : config.tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}

export {http}