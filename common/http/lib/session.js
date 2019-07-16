
//处理本地缓存的方法
var constants = require('./constants');
var SESSION_KEY = 'weapp_session_' + constants.WX_SESSION_MAGIC_ID;

var Session = {
    get: function () {
        return uni.getStorageSync(SESSION_KEY) || null;
    },

    set: function (session) {
		uni.setStorageSync(SESSION_KEY, session);
    },

    clear: function () {
        uni.removeStorageSync(SESSION_KEY);
    },
};

module.exports = Session;