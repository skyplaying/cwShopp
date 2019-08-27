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
				<view v-for="(item, index) in goodStatusList" :key="index">
					<view class="s1" @click="selectService(item)">{{ item }}</view>
				</view>
			</view>
			<view class="addBtn" @click="addGoods">+添加</view>

			<view class="content" v-for="(item, index) in goodsInfo" :key="index">
				<view class="serviceModel">
					<view class="info">
						<image :src="item.goodsImageLink" mode="aspectFill" class="serviceImg"></image>
						<view class="fontSymbol">
							<text class="name">{{ item.goodsName }}</text>
							<view class="price">￥{{ item.goodsPrice }}</view>
						</view>
					</view>
					<!-- 按钮 -->
					<view class="btnBox">
						<view class="" @click="deleteService(item.goodsId)">删除</view>
						<view :style="item.goodsState==1? putUp : putDown" @click="putService(item)">{{item.goodsState==1?'上架':'下架'}}</view>
						<view class="" @click="editor(item)">编辑</view>
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
			goodStatusList: ['全部', '已上架', '已下架'],
			goodsState: '',
			isSelect: false,
			putUp: 'color:#0E5E56;border:1px solid #0E5E56',
			putDown: 'color: #D92B2B;border:1px solid #D92B2B',
			modelList: [{ name: '{模板可编辑}木质骨灰纪念盒子', price: '199', num: 1, putActive: false }],
			storeId: '',
			goodsInfo: ''
		};
	},
	onLoad() {
		that = this;
		this.init();
	},
	methods: {
		init() {
			this.selectAllGoods();
			this.$api.showLoading();
		},
		selectAllGoods() {
			this.storeId = uni.getStorageSync('storeId');
			let storeId = this.storeId;
			console.log(this.storeId);
			this.$api
				.selectGoodsByStoreAndState({
					storeId: storeId,
					goodsState: this.goodsState
				})
				.then(data => {
					console.log(data);
					if ((data.data.code = 100000)) {
						this.goodsInfo = data.data.goodsInfo;
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
					this.goodsState = 1;
				} else if (e == '已下架') {
					this.goodsState = 2;
				} else if (e == '全部') {
					this.goodsState = '';
				}
				this.selectAllGoods();
			}
		},
		addGoods() {
			uni.navigateTo({
				url: '../addGoods/addGoods'
			});
		},
		//  上架商品
		putService(e) {
			this.lowShelfGoods(e)
			if (e.goodsState==2) {
				uni.showModal({
					content: '确定要上架此商品吗',
					success: re => {
						if (re.confirm) {
							this.$api
								.upperShelfGoods({
									goodsId: e.goodsId
								})
								.then(data => {
									console.log(data);
									if ((data.data.code = 100000)) {
										this.$api.showToast('上架成功');
										this.selectAllGoods()
									}
								});
						}
					}
				});
			}
			console.log(e);
			e.putActive = !e.putActive;
		},
		// 下架商品
		lowShelfGoods(e){
			if(e.goodsState==1){
				uni.showModal({
					content: '确定要下架此商品吗',
					success: re => {
						if (re.confirm) {
							this.$api
								.lowerShelfGoods({
									goodsId: e.goodsId
								})
								.then(data => {
									console.log(data);
									if ((data.data.code = 100000)) {
										this.$api.showToast('下架成功');
										this.selectAllGoods()
									}
								});
						}
					}
				});
			}
		},
		btnColor(e) {
			console.log(e);
		},
		deleteService(e) {
			// 删除模板
			uni.showModal({
				content: '确定要删除此商品吗',
				success: re => {
					if (re.confirm) {
						this.$api
							.deleteGoods({
								goodsId: e
							})
							.then(data => {
								if (data.data.code == 100000) {
									this.$api.showToast('删除成功');
									this.selectAllGoods();
								}
							});
					}
				}
			});
		},
		// 编辑商品
		editor(e) {
			console.log(e)
			//  每次编辑自动更新 需要修改的 商品
			uni.setStorageSync('editgoods',e)
			if (e) {
				uni.navigateTo({
					url: '../addGoods/addGoods?type=update',
				});
			}
		}
	}
};
</script>

<style lang="less">
.content {
	margin-bottom: 80upx;
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
