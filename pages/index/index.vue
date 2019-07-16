<template>
	<view class="page">
		<view class="conatiner" v-if="isok">
			<view class="mc-bg-white p15">
				<view class="mc-space-between mc-f14">
					<view class="icon-location mc-light-gray" @click="chooseCity">
						<text class="ml5 mc-black">{{city}}</text>
					</view>
					<view class="icon-scan mc-blue">
						<text class="ml5 mc-black" @click="">扫码进店</text>
					</view>
				</view>
				<view class="banner mt15">
					<image src="../../static/banner.png" mode="widthFix"></image>
				</view>
			</view>
			<!-- <map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude"></map> -->



			<!--  列表标题-->
			<view class="mc-bg-white p15 mt10 listFont" v-if="storeList[0]">{{!storeList[0].lastBrowseTime?'附近':'最近使用'}}</view>
			<view class="uni-list">
				<view class="shopBox" v-for="(item,index) in storeList" :key="index" @click="">
					<image class="shopImage" lazy-load :src="item.shopsHead"></image>
					<view class="shopInfo">
						<text class="mc-f16">{{item.shopsName}}\n</text>
						<text class="mc-f12 shopType">{{item.shopsType}}\n</text>
						<text class="mc-f12 addr">{{item.shopsAddress}}</text>
					</view>
					<view>
						<text class="mc-f12 shop-distance">{{item.distanceStr}}</text>
					</view>
				</view>
			</view>
			<uni-load-more :status="status"></uni-load-more>
		</view>
		<view class="container-loading" v-else>
			<image src="../../static/loading.gif"></image>
		</view>
	</view>
</template>

<script>
	let _self;
	let gData = {};
	import Vue from 'vue'
	import {
		mapActions,
	} from 'vuex'
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue';
	export default {
		data() {
			return {
				isok: true,
				city: '',
				storeList: [],
				total: 0,
				status: "more",
				provider: '',
				latitude: 39.909,
				longitude: 116.39742,
			}
		},
		onLoad() {
			_self = this;
			// 初始化页面 
			this.initPage();
			uni.getProvider({
				service: 'oauth', //登录
				success: function(res) {
					_self.provider = res.provider;
					console.log(res.provider)
					uni.login({
						provider: res.provider,
						success: function(loginRes) {
							console.log(JSON.stringify(loginRes));
						}
					});

				}
			});
		},
		onShow() {
			_self.sub()
			_self.login()
		},
		// 关闭页面
		onUnload() {
			gData = {};
		},
		// 下拉刷新页面 （全局）
		onPullDownRefresh() {
			this.initPage()
		},
		//上拉加载 (查询新的列表数据添加到数组里)
		onReachBottom() {
			this.loadList()
		},
		components: {
			uniLoadMore
		},
		methods: {
			// 获取当前城市 登录
			...mapActions(["getCity", "doLogin"]),
			//  初始化页面
			initPage() {
				this.getCity({
					success: (city, location) => {
						_self.doLogin({
							loginType: "0",
							success: userInfo => {
								gData.latPoint = location && location.latitude ? location.latitude : null
								gData.lngPoint = location && location.longitude ? location.longitude : null
								gData.adcode = city.adcode
								gData.userInfo = userInfo
								_self.city = city.city
								_self.initList(); //初始化（清空上一次的数据）再加载列表

							}
						})
					}
				})

			},
			// 初始化宠物店列表
			initList() {
				gData.storePage = 0;
				this.storeList = [];
				this.total = 0;
				this.status = "more";
				this.loadList();
			},
			// 加载宠物店列表
			loadList() {
				if (this.status != "noMore") {
					const shopsLng = this.lngPoint;
					const shopsLat = this.latPoint;
					const shopsCity = this.city;
					const page = gData.storePage + 1;
					this.status = "loading";
					uni.showNavigationBarLoading();
					this.$api.queryShopsList({
						page,
						pageSize: 8,
						shopsLng,
						shopsLat,
						shopsCity,
					}).then((res) => {
						const data = res.data;
						console.log(data)
						const addList = (data.results || []).map(item => {
							const shopsAddress = item.shopsAddress ? item.shopsAddress.split(':')[1] : null;
							const distanceStr = item.distanceStr ? item.distanceStr.replace('m', '米').replace('k', '千') : ''; // 路程替换
							return {
								shopsId: item.shopsId,
								shopsName: item.shopsName,
								shopsHead: item.shopsHead,
								shopsType: item.shopsType,
								distanceStr: distanceStr,
								shopsAddress: shopsAddress,
								lastBrowseTime: item.lastBrowseTime,
							}
						})
						_self.storeList = _self.storeList.concat(addList);
						gData.storePage = data.page;
						_self.status = data.noMore ? "noMore" : "more";
						_self.total = data.total;
						_self.isok = true;
						// console.log(this.$data)
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh(); //得到数据后停止下拉刷新
					}).catch((err) => {
						_self.status = "more";
						console.log('request fail', err);
					});
				}
			},
			chooseCity() {
				// uni.getLocation({
				// 	success: function(res) {
				// 		console.log('位置名称：' + res.name);
				// 		console.log('详细地址：' + res.address);
				// 		console.log('纬度：' + res.latitude);
				// 		console.log('经度：' + res.longitude);
				// 		if (res) {
				// 			uni.openLocation({
				// 				longitude: '121.549697',
				// 				latitude: '31.227250',
				// 				name: '支付宝',
				// 				address: '杨高路地铁站',
				// 				success: (data) => {
				// 					console.log(data)
				// 				}
				// 			})
				// 		}
				// 	}
				// });
				// uni.openLocation({
				// 	longitude: '121.549697',
				// 	latitude: '31.227250',
				// 	name: '支付宝',
				// 	address: '杨高路地铁站',
				// 	success: (data) => {
				// 		console.log(data)
				// 	}
				// })
				uni.chooseLocation({
					success: function(res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
						let name = res.name.toString()
						let address = res.address.toString()
						if (res) {
							uni.openLocation({
								latitude: res.latitude,
								longitude: res.longitude,
								name: name,
								address: address,
								success: (data) => {
									console.log(data)
								}
							})
						}
					}
				});


			},
			sub() {
				//  配置百度页面基础配置
				//#ifdef MP-BAIDU
				swan.setPageInfo({
					title: '',
					keywords: '',
					description: '',
					articleTitle: '',
					releaseDate: '2019-07-13 15:44:00',
					image: [
						'/static/banner.png',
						'/static/loading.gif'
					],
					success: function() {
						console.log('setPageInfo success');
					},
					fail: function(err) {
						console.log('setPageInfo fail', err);
					}
				})
				//#endif

			},
			login() {
				uni.login({
					success: (e) => {
						console.log(e)
						if (e) {
							uni.getUserInfo({
								success: (e) => {
									console.log(e)
								}
							})
						}
					}
				})
				//#ifndef MP-ALIPAY
				uni.checkSession({
					success: (e) => {
						console.log('会话', e)
					}
				})
				//#endif

				// uni.getLocation({
				// 	type: 'gcj02', //返回可以用于uni.openLocation的经纬度
				// 	success: function(res) {
				// 		const latitude = res.latitude;
				// 		const longitude = res.longitude;
				// 		console.log(res)
				// 		uni.openLocation({
				// 			latitude: 113.910789,
				// 			longitude:22.517763,
				// 			success: function(e) {
				// 				console.log('success', e);
				// 			}
				// 		});
				// 	}
				// });

			}


		}



	}
</script>


<style>
	/* 列表 */
	.uni-list:after,
	.uni-list:before {
		height: 0;
	}

	.addr {
		color: #BBBBBB;
	}

	.shopType {
		color: #848484;
	}

	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}

	.listFont {
		font-size: 32upx;
		color: black;
	}

	.shop-distance {
		display: inline-block;
		color: #888888;
		position: absolute;
		right: 30upx;
	}

	.shopBox {
		background-color: white;
		padding: 30upx;
		width: 100%;
		display: flex;
		box-sizing: border-box;
	}

	.shopImage {
		width: 150upx;
		height: 140upx;
		border-radius: 10upx;
		overflow: hidden;
	}

	.shopInfo {
		margin-left: 30upx;
	}
</style>
