
import Vue from 'vue'
import App from './App'

import store from './store'
import api from '@/common/http/'
import loadImage from './components/uni-load-more/uni-load-more';

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$api = api
Vue.prototype.$backgroundAudioData = {
	playing: false,
	playTime: 0,
	formatedPlayTime: '00:00:00'
}


App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
// 挂载到全局
app.$mount()

// 全局使用 加载状态组件
Vue.component('loadImage', loadImage)