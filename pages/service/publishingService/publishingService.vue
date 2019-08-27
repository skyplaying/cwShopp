<!--  发布服务 -->
<template>
	<view class="page">
		<view class="container" v-if="isok">
			<view class="selectBox" @click="isSelect = true">
				<text class="text1">{{ selectext ? selectext : '已上架' }}</text>
				<image src="../../../static/shop/bottomJianTou.png" mode="aspectFit" class="bottomArrows"></image>
			</view>
			<!--  选择下拉框 -->

			<view class="selectPop" v-if="isSelect">
				<view v-for="(item, index) in goodStatus" :key="index">
					<view class="s1" @click="selectService(item)">{{ item }}</view>
				</view>
			</view>
			<view class="addBtn" @click="addService">+添加</view>

			<view class="content" v-for="(item, index) in servicesInfo" :key="index">
				<view class="serviceModel">
					<view class="info">
						<image :src="item.serviceImageLink" mode="aspectFill" class="serviceImg"></image>
						<view class="fontSymbol">
							<text class="name">{{ item.serviceName }}</text>
							<view class="price">￥{{ item.servicePrice }}</view>
						</view>
					</view>
					<!-- 按钮 -->
					<view class="btnBox">
						<view class="" @click="deleteService(item.serviceId)">删除</view>
						<view :style="item.serviceState == 1 ? putUp : putDown" @click="putService(item)">{{ item.serviceState == 1 ? '下架' : '上架' }}</view>
						<view class="" @click="editor(item)">编辑</view>
					</view>
				</view>
			</view>
			<view class="content" v-for="(item, index) in modelList" :key="index">
				<view class="serviceModel" @click="toModelPage(item)">
					<view class="info">
						<image src="../../../static/shop/indexbanner.png" mode="aspectFill" class="serviceImg"></image>
						<view class="fontSymbol">
							<text class="name">{{ item.name}}</text>
							<view class="price">￥{{item.price}}</view>
						</view>
					</view>
					<!-- 按钮 -->
					<view class="btnBox">
						<view class="" @click="deleteService(item.serviceId)">删除</view>
						<view :style="item.serviceState == 1 ? putUp : putDown" @click="putService(item)">{{ item.serviceState == 1 ? '下架' : '上架' }}</view>
						<view class="" @click="">编辑</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
let that;
export default {
	data() {
		return {
			isok: false,
			selectext: '',
			goodStatus: ['全部', '已上架', '已下架'],
			serviceState: '',
			isSelect: false,
			putUp: 'color:#0E5E56;border:1px solid #0E5E56',
			putDown: 'color: #D92B2B;border:1px solid #D92B2B',
			modelList: [
				// { name: '{模板可编辑}基础火化服务', price: '450', num: 1, putActive: false,url:'../addService/IncinerateModel/IncinerateModel'},
				{ name: '{模板可编辑}接送服务', num: 2, price: '200', putActive: false,url:'../addService/pickUpModel/pickUpModel' },
				{ name: '{模板可编辑}冷冻服务', price: '200', num: 3, putActive: false,url:'../addService/usualModel/freezeModel'},
				{ name: '{模板可编辑}清洁服务', price: '200', num: 4, putActive: false,url:'../addService/usualModel/freezeModel',type:'clean' },
				{ name: '{模板可编辑}仪式服务', price: '200', num: 5, putActive: false,url:'../addService/riteModel/riteModel' }
			],
			servicesInfo: ''
		};
	},
	onLoad() {
		that = this;
		this.init();
	},
	methods: {
		addService() {
			uni.navigateTo({
				url: '../addService/addService'
			});
			uni.navigateTo({
				url:'../addService/riteModel/riteModel'
			})
		},
		btnColor(e) {
			console.log(e);
		},
		init() {
			this.$api.showLoading();
			this.selectAllService();
			this.$api.showLoading();
		},
		toModelPage(item){
			uni.navigateTo({
				url:item.url+'?type='+item.type,
			})
		},
		selectAllService() {
			this.storeId = uni.getStorageSync('storeId');
			let storeId = this.storeId;
			console.log(this.storeId);
			this.$api
				.selectServiceByStoreAndState({
					storeId: storeId,
					serviceState: this.serviceState || ''
				})
				.then(data => {
					console.log(data);
					if ((data.data.code = 100000)) {
						this.servicesInfo = data.data.servicesInfo;
						this.isok = true;
						uni.hideLoading();
					}
				});
		},
		selectService(e) {
			if (e) {
				this.selectext = e;
				setTimeout(() => {
					this.isSelect = false;
				}, 100);
				//  重新
				if (e == '已上架') {
					this.serviceState = 1;
				} else if (e == '已下架') {
					this.serviceState = 2;
				} else if (e == '全部') {
					this.serviceState = '';
				}
				this.selectAllService();
			}
		},
		//  上架商品
		putService(e) {
			this.lowerShelfService(e);
			if (e.serviceState == 2) {
				uni.showModal({
					content: '确定要上架此服务吗',
					success: re => {
						if (re.confirm) {
							this.$api
								.upperShelfService({
									serviceId: e.serviceId
								})
								.then(data => {
									console.log(data);
									if ((data.data.code = 100000)) {
										this.$api.showToast('上架成功');
										this.selectAllService();
									}
								});
						}
					}
				});
			}
			console.log(e);
			e.putActive = !e.putActive;
		},
		// 下架服务
		lowerShelfService(e) {
			if (e.serviceState == 1) {
				uni.showModal({
					content: '确定要下架此服务吗',
					success: re => {
						if (re.confirm) {
							this.$api
								.lowerShelfService({
									serviceId: e.serviceId
								})
								.then(data => {
									console.log(data);
									if ((data.data.code = 100000)) {
										this.$api.showToast('下架成功');
										this.selectAllService();
									}
								});
						}
					}
				});
			}
		},
		deleteService(e) {
			// 删除模板
			uni.showModal({
				content: '确定要删除此服务吗',
				success: re => {
					if (re.confirm) {
						this.$api
							.deleteService({
								serviceId: e
							})
							.then(data => {
								if (data.data.code == 100000) {
									this.$api.showToast('删除成功');
									this.selectAllService();
								}
							});
					}
				}
			});
		},
		// 编辑服务
		editor(e) {
			console.log(e);
			//  每次编辑自动更新 需要修改的 商品
			uni.setStorageSync('editService', e);
			if (e) {
				uni.navigateTo({
					url: '../addService/addService?type=update'
				});
			}
		}
	}
};
</script>

<style lang="less">
.content {
	margin-bottom: 160upx;
	.serviceModel {
		margin-top: 10upx;
		.btnBox {
			margin-top: 60upx;
			margin-left: 285upx;
			display: flex;
			.putUp {
				color: #0e5e56;
				border: 2upx solid #0e5e56;
			}
			.putDown {
				color: #d92b2b;
				border: 2upx solid #d92b2b;
			}
		}
		.btnBox > view {
			display: inline-block;
			width: 130upx;
			height: 60upx;
			border-radius: 6upx;
			color: rgba(132, 132, 132, 1);
			font-size: 24upx;
			line-height: 60upx;
			text-align: center;
			font-family: Microsoft Yahei;
			border: 2upx solid rgba(229, 229, 229, 1);
			margin-right: 25upx;
		}

		.info {
			display: flex;
			padding: 30upx;
			width: 100%;
			.serviceImg {
				width: 130upx;
				height: 116upx;
				border-radius: 10upx;
			}
			.fontSymbol {
				margin-left: 36upx;
				.name {
					color: rgba(16, 16, 16, 1);
					font-size: 32upx;
					text-align: left;
					font-family: PingFangSC-bold;
				}
				.price {
					color: rgba(14, 94, 86, 1);
					font-size: 28upx;
					text-align: left;
					font-family: PingFangSC-regular;
				}
			}
		}
	}
}

.addBtn {
	position: absolute;
	right: 30upx;
	top: 20upx;
	width: 130upx;
	height: 60upx;
	line-height: 60upx;
	border-radius: 6upx;
	color: rgba(14, 94, 86, 1);
	font-size: 24upx;
	text-align: center;
	font-family: Arial;
	border: 2upx solid rgba(14, 94, 86, 1);
	display: inline-block;
}
.selectPop {
	width: 205upx;
	margin-left: 20upx;
	border: 1upx solid #888888;
	display: inline-block;
	position: absolute;
	background: white;
	.s1 {
		width: 180upx;
		height: 35upx;
		text-align: left;
		font-size: 25upx;
		line-height: 35upx;
		border: none;
		padding-left: 25upx;
		margin-top: 5upx;
	}
	.s1:hover {
		background: #108ee9;
		color: white;
	}
}
.selectBox {
	margin-left: 20upx;
	margin-top: 30upx;
	width: 200upx;
	height: 60upx;
	line-height: 60upx;
	color: rgba(0, 0, 0, 1);
	font-size: 28upx;
	font-family: Microsoft Yahei;
	position: relative;
	.bottomArrows {
		width: 15upx;
		height: 15upx;
		position: absolute;
		left: 200upx;
		top: 18upx;
		// vertical-align: middle;
	}
}
</style>
