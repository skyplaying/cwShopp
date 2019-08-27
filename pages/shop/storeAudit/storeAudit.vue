<!--  商家审核页面 -->

<template>
	<view class="page">
		<view class="container" v-if="isok">
			<view class="banner"><image src="../../../static/shop/ruzhuBanner.png" mode="aspectFit" class="bannerImg"></image></view>
			<view class="flowBox">
				<view class="numBox">
					<view class="">1</view>
					<image src="../../../static/shop/you.png" mode="aspectFit" class="toRight"></image>
					<view class="">2</view>
					<image src="../../../static/shop/you.png" mode="aspectFit" class="toRight"></image>
					<view class="">3</view>
				</view>
				<view class="infoText">
					<text>填写信息</text>
					<text>信息审核</text>
					<text>添加成功</text>
				</view>
				<view class="addShopBtn" v-if="!auditFail">门店审核中</view>
				<view class="addShopBtn" style="margin-top: 52upx;" @click="upStoreInfo" v-if="auditFail">修改信息</view>
				<view class="auditTip" v-if="!auditFail">申请资料已提交，门店审核结果将在2-3个工作日内通知您，敬请留意。</view>
			</view>

			<view class="" v-if="!auditFail">
				<!-- <view class="toIndex" @click="toIndex">返回首页</view> -->
				<view class="tit2">您还可以去pc端商家中心查看审核信息</view>
				<view class="urlBox">
					<text class="url" @click="goPcUrl">www.petout.cn</text>
					<view class="copyBtn" @click="copyBtn">复制</view>
				</view>
			</view>
			<!-- 门店审核驳回信息 -->
			<view class="rejectInfo" v-if="auditFail">
				<view class="b1">
					<image src="../../../static/shop/warning.png" mode="aspectFit" class="warningIcon"></image>
					<text class="t1">门店审核被驳回，请修改信息后重新提交审核。</text>
				</view>
				<view class="b2">
					<text class="tit1">驳回原因</text>
					<!-- <view class="rejectReson">1、营业执照主体不一致，请上传授权函后重新提交申请；2、门头照与门店名称不一致，请重新上传；</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isok: true,
			shenheText: '',
			auditFail: false, //审核失败为 true
			servicerUserId: '',
			storeCheckState: ''
		};
	},
	onLoad() {
		this.init();
	},
	methods: {
		goPcUrl() {
			uni.navigateTo({
				url: '../../pcPage/pcPage'
			});
		},
		init() {
			this.servicerUserId = uni.getStorageSync('userId');
			this.$api.selectAllStore(this.servicerUserId).then(data => {
				console.log(data);
				if (data.storesInfo) {
					uni.setStorageSync('storeInfo', data.storesInfo);
					this.storeCheckState = data.storesInfo[0].storeCheckState;
					if (this.storeCheckState == 0) {
						//  未审核
					} else if (this.storeCheckState == 1) {
						// 审核中
						this.auditFail = false;
					} else if (this.storeCheckState == 2) {
						// 审核通过
						// this.$api.showToast('门店审核通过')
						uni.redirectTo({
							url: '../../index/index'
						});
					} else if (this.storeCheckState == 3) {
						//审核驳回
						this.auditFail = true;
					}
					uni.hideLoading();
				}
			});
		},
		//  复制pc路径
		copyBtn() {
			uni.setClipboardData({
				data: 'www.petout.cn',
				success: function(res) {
					uni.getClipboardData({
						success: function(res) {
							uni.showToast({
								title: '已复制到剪贴板'
							});
						}
					});
				}
			});
		},
		toIndex() {
			uni.navigateTo({
				url: '../../login/login'
			});
		},
		//  修改门店信息
		upStoreInfo() {}
	}
};
</script>

<style lang="less">
.bannerImg {
	width: 100%;
	height: 386upx;
}
.rejectReson {
	margin-top: 15upx;
	width: 590upx;

	color: rgba(0, 0, 0, 1);
	font-size: 24upx;
	text-align: left;
	font-family: PingFangSC-regular;
}
.rejectInfo {
	margin-left: 46upx;
	padding-left: 30upx;
	width: 628upx;
	padding-bottom: 28upx;
	border-radius: 10upx;
	background-color: rgba(168, 216, 185, 1);
	color: rgba(16, 16, 16, 1);
	font-size: 28upx;
	font-family: Arial;
	.b2 {
		margin-top: 46upx;
		.tit1 {
			color: rgba(0, 0, 0, 1);
			font-size: 24upx;
			text-align: left;
			font-family: PingFangSC-regular;
		}
	}
	.b1 {
		position: relative;
		top: 18upx;
		.warningIcon {
			width: 40upx;
			height: 40upx;
			vertical-align: middle;
		}
		.t1 {
			color: rgba(14, 94, 86, 1);
			font-size: 24upx;
			text-align: left;
			font-family: PingFangSC-bold;
			margin-left: 16upx;
			font-weight: bold;
		}
	}
}
.urlBox {
	margin-top: 15upx;
	.url {
		color: rgba(16, 16, 16, 1);
		font-size: 28upx;
		text-align: left;
		font-family: PingFangSC-regular;
		margin-left: 166upx;
	}
	.copyBtn {
		display: inline-block;
		width: 112upx;
		height: 48upx;
		line-height: 48upx;
		border-radius: 30upx;
		background-color: rgba(255, 255, 255, 0);
		color: rgba(14, 94, 86, 1);
		font-size: 28upx;
		text-align: center;
		font-family: Arial;
		border: 2upx solid rgba(14, 94, 86, 1);
		margin-left: 70upx;
	}
}
.toIndex {
	width: 100%;
	height: 90upx;
	line-height: 40upx;
	background-color: rgba(255, 255, 255, 0);
	color: rgba(16, 16, 16, 1);
	font-size: 28upx;
	text-align: center;
	font-family: Arial;
	border: 2upx solid rgba(255, 255, 255, 0);
	margin-top: 30upx;
}
.tit2 {
	color: rgba(16, 16, 16, 1);
	font-size: 28upx;
	text-align: center;
	font-family: PingFangSC-regular;
	margin-top: 190upx;
}
.addShopBtn {
	// left: 46px;
	// top: 320px;
	width: 590upx;
	height: 98upx;
	line-height: 98upx;
	border-radius: 10upx;
	background-color: rgba(14, 94, 86, 1);
	text-align: center;
	border: 2upx solid rgba(5, 5, 5, 0.08);
	font-size: 36upx;
	text-align: center;
	font-family: PingFangSC-regular;
	color: white;
	margin-top: 20upx;
	margin-left: 42upx;
}
.auditTip {
	position: absolute;
	left: 115upx;
	margin-top: 20upx;
	width: 465upx;
	height: 88upx;
	line-height: 40upx;
	color: rgba(102, 102, 102, 1);
	font-size: 28upx;
	text-align: center;
	font-family: Arial;
}
.flowBox {
	position: relative;
	left: 48upx;
	top: -62upx;
	width: 660upx;
	height: 386upx;
	background: white;
	line-height: 20px;
	border-radius: 20upx;
	color: rgba(16, 16, 16, 1);
	font-size: 28upx;
	text-align: center;
	box-shadow: 0px 0px 10upx 4upx rgba(255, 255, 255, 0);
	font-family: Arial;
	border: 2upx solid rgba(255, 255, 255, 0);

	.numBox {
		display: flex;
		margin-left: 146upx;
		margin-top: 42upx;
	}
	.numBox > view {
		width: 68upx;
		height: 68upx;
		line-height: 68upx;
		color: rgba(16, 16, 16, 1);
		font-size: 28upx;
		text-align: center;
		font-family: Arial;
		border: 2upx solid rgba(230, 230, 230, 1);
		border-radius: 50%;
		vertical-align: middle;
	}
	.numBox > image {
		margin-left: 28upx;
		margin-right: 28upx;
		width: 35upx;
		height: 35upx;
		vertical-align: middle;
		margin-top: 18upx;
	}
	.infoText {
		margin-left: 136upx;
		margin-top: 16upx;
		height: 40upx;
		color: rgba(16, 16, 16, 1);
		font-size: 28upx;
		text-align: left;
		font-family: PingFangSC-regular;
	}
	.infoText > text {
		margin-right: 45upx;
	}
}
</style>
