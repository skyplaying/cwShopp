import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/common/http/'

Vue.use(Vuex)

const store = new Vuex.Store({
	// 状态数据,类vue的data
	state: {
		shopsInfo: null, //店铺信息
		loginType: null, //登录类型（用于判断是授权登录了，还是只是静默登录）

		addresses: null, //选择的地址，配合pages/colligate/addAddress/addAddress页面，用于传递（获取后注意清空）
		location: null, //当前地理位置（不授权地理位置时，则是设为我们公司总部的地理位置）
		city: null, //当前访问的城市（不授权地理位置时，则是设为我们公司总部的城市，即深圳）

		edition: "1.0.0", //产品版本号（每次上传前修改）
		lifeNum: '宠善堂',
		company: '深圳企拼客网络科技有限公司',

		// 页面传参
		pageData: {
			formStoreDescribe: {
				shopsDescribe: '' //店铺介绍（店铺入驻第二步时回传数据）
			},
			formSMSUserList: {//短信服务（获取回传的收件人信息）
				userIds: null,
				nickNames: null,
			},
			formOrderAddServer: {
				anew: 0 //是否刷新（新增预约服务时）
			},
			formOrderDisplay: {
				anew: 0 //是否刷新（订单管理时）
			},
		},

		storagekey: {
			addresses: 'addresses', //默认地址
			city: 'city', //上一次访问的城市（不授权地理位置时，则是设为公司总部的城市，即深圳）
		},
	},
	// 计算属性,类vue的computed
	getters: {
		// doneTodos: state => {
		// 	return state.todos.filter(todo => todo.done)
		// }
	},
	// 改变状态,只能同步数据，不能异步
	mutations: {
		login(state, obj) {
			state.shopsInfo = obj.shopsInfo || state.shopsInfo;
			state.loginType = obj.loginType || state.loginType;
		},
		setLocation(state, location) {
			state.location = location;
		},
		setAddresses(state, addresses) {
			state.addresses = addresses;
			console.log(state.addresses)
		},
		setCity(state, city) {
			state.city = city;
		},
		setFormStoreDescribe(state, obj) {
			console.log(obj)
			state.pageData.formStoreDescribe = obj;
		},
		setFormSMSUserList(state, obj) {
			console.log(obj)
			state.pageData.formSMSUserList = obj;
		},
		setFormOrderAddServer(state, obj) {
			console.log(obj)
			state.pageData.formOrderAddServer = obj;
		},
		setFormOrderDisplay(state, obj) {
			console.log(obj)
			state.pageData.formOrderDisplay = obj;
		},
	},
	// 异步操作后，调用mutations去更新状态
	actions: {
		// 获取城市以及地理位置（城市一定有，地理位置看用户是否授权）
		getCity({
			commit,
			state
		}, obj) {
			const anew = obj.anew;
			const success = obj.success;
			const fail = obj.fail;

			if (!anew && state.city) {
				typeof success == 'function' && success(state.city, state.location);
			} else {
				let type = 0;
				// #ifdef MP-ALIPAY
				type = uni.canIUse('getLocation.type') ? "1" : "0";
				// #endif
				new Promise(function(resolve, reject) {
					// 获取地理位置
					uni.getLocation({
						type: type || "gcj02",
						success(res) {
							resolve(res)
						},
						fail(err) {
							//如果拒绝授权则设置为默认经纬度
							type = 1;
							const res = {
								latitude: 22.532637,
								longitude: 113.926997,
								city: '深圳',
								adcode: '440300'
							};
							api.showToast("已帮您设置了默认位置");
							resolve(res)
						}
					})
				}).then(function(res) {
					//保存地理位置
					const p = new Promise(function(resolve, reject) {
						commit('setLocation', res)
						resolve(res)
					})
					return p;
				}).then(function(res) {
					//获取当前城市（如果不兼容getLocation的type属性，则反向获取当前城市的对象）
					const p = new Promise(function(resolve, reject) {
						if (type == "1") {
							const nowCityObj = {
								city: res.city,
								adcode: res.cityAdcode,
							};
							resolve(nowCityObj);
						} else {
							const latPoint = res.latitude;
							const lngPoint = res.longitude;
							api.analysisLocation({
								latPoint,
								lngPoint,
							}).then((res) => {
								resolve(res.data);
							}, () => {
								reject();
							})
						}
					})
					return p;
				}).then(function(nowCityObj) {
					//设置要访问的城市（判断是否要切换为当前定位的城市）
					const p = new Promise(function(resolve, reject) {
						//上次访问的城市
						const oldCityObj = uni.getStorageSync(state.storagekey.city) || null;
						// console.log('storageCity:' + oldCityObj);
						// console.log(nowCityObj); 
						if (!oldCityObj) {
							//需要缓存当前当前城市
							resolve([nowCityObj, 1]);
						} else if (nowCityObj.adcode == oldCityObj.adcode) {
							resolve([nowCityObj, 0]);
						} else {
							uni.showModal({
								content: '当前定位城市为' + nowCityObj.city + '，是否要切换到该城市',
								success(res) {
									if (res.confirm) {
										resolve([nowCityObj, 1]);
									} else {
										resolve([oldCityObj, 0]);
									}
								},
								fail(err) {
									resolve([oldCityObj, 0]);
								}
							});
						}
					})
					return p;
				}).then(function([cityObj, isSetStorage]) {
					commit('setCity', cityObj)
					typeof success == 'function' && success(cityObj, state.location);
					if (isSetStorage)
						uni.setStorage({
							key: state.storagekey.city,
							data: cityObj,
						});
				}, function(err) {
					typeof fail == 'function' && fail(err);
					if (err)
						api.alert(err);
				})
			}
		},


		// 登录获取个人信息
		doLogin({
			commit,
			state
		}, obj) {
			const that = this;
			const anew = obj.anew;
			const success = obj.success;
			const fail = obj.fail;

			const loginType = obj.loginType || "0"; //默认是静默登录（loginType为0，主要要传字符串类型的0），loginType为1是授权用户信息的登录
			// console.log('loginType:' + loginType);

			if (anew || !state.userInfo || (state.loginType == "0" && loginType == "1")) { //需要刷新/用户信息不存在，需要重新登录，或者是启动小程序后第一次‘授权登录’
				const location = state.location || {};
				const lngPoint = obj.lngPoint || location.longitude || null;
				const latPoint = obj.latPoint || location.latitude || null;
// 				api.shopsInfo({
// 					loginType,
// 					lngPoint,
// 					latPoint,
// 				}).then((res) => {
// 					const shopsInfo = res.data.shopsVo || {};
// 					//纯粹为了兼容后台的任性
// 					const isBasicsEdition = shopsInfo.shopsName && shopsInfo.storeTelphone ? true : false; //店铺名存在说明第一步完善，店铺号码存在说明第二步完善，两个同时存在说明已经拥有基础版本
// 					shopsInfo.isBasicsEdition = isBasicsEdition;
// 					console.log(shopsInfo);
// 
// 					commit('login', {
// 						shopsInfo:shopsInfo.shopsId ? shopsInfo : null,
// 						loginType: state.loginType=="1" ? "1":loginType
// 					})
// 					typeof success == "function" && success(shopsInfo);
// 				}, (err) => {
// 					typeof fail == 'function' && fail(err);
// 				})
			} else {
				if (err.type != 'ERR_GET_USER_INFO') {
				  api.showToast('登录失败');
				}
				typeof success == "function" && success(state.shopsInfo);
			}
		},

	}
})

export default store
