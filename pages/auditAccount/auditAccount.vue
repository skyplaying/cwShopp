<!--  注册提交后带审核通过页面 -->
<template>
	<view class="page">
		<view class="container" v-if="isok">
			<image src="../../static/shop/indexbanner.png" mode="aspectFill" class="banner"></image>

			<image src="../../static/shop/posterBanner.png" mode="aspectFit" class="posterBanner"></image>
			<view class="submitWait" v-if="isRegist">
				<view class="tip1">
					<image src="../../static/shop/wait.png" mode="aspectFill" class="coffee"></image>
					<text class="t1">请您耐心等待工作人员联系你</text>
				</view>
				<view class="tip2">
					或者您拨打电话
					<text @click="takePhone" class="phone">18938836488</text>
					<text class="phone" @click="takeTelePhone">0755-88823343</text>
				</view>
			</view>

			<!--  点击按钮 -->
			<view class="addShopBtn" style="" @click="toNextByServiceState">{{ servicerStateText }}</view>
		</view>
	</view>
</template>

<script>
let that;
export default {
	data() {
		return {
			isok: true,
			isRegist: true,
			userCode: '',
			userInfo: '',
			phone: '',
			servicerState: '', //用户状态
			servicerStateText: '',
			interval:'',
		};
	},
	onLoad() {
		that = this;
		this.getUserStatus();
	},
	onShow() {
	 this.interval=setInterval(() => {
			this.getUserStatus();
		}, 10000);
	},
	onHide() {
	clearInterval(this.interval)
	},
	beforeDestroy() {
		clearInterval(this.interval)
	},
	methods: {
		takePhone() {
			uni.makePhoneCall({
				phoneNumber:'18938836488',
				success(e) {
					console.log(e);
				},
				fail(e) {
					console.log(e);
				}
			});
		},
		takeTelePhone() {
			uni.makePhoneCall({
				phoneNumber: '075588823343',
				success(e) {
					console.log(e);
				},
				fail(e) {
					console.log(e);
				}
			});
		},
		getUserStatus() {
			let user = uni.getStorageSync('user');
			console.log(user);
			this.servicerUserId = user.servicerUserId;
			//查询用户审核状态
			this.$api
				.selectServicerUserState({
					servicerUserId: this.servicerUserId
				})
				.then(data => {
					//未审核
					this.servicerState = data.data.servicerState;
					if (data.data.servicerState == 1) {
						this.servicerStateText = '您的账号审核中';
					} else if (data.data.servicerState == 2) {
						this.servicerStateText = '账号审核通过，下一步';
						uni.redirectTo({
							url: '../shop/shopAddIndex/shopAddIndex'
						});
					} else if (data.data.servicerState == 3) {
						this.servicerStateText = '您的账号审核未通过';
					}
				});
		},
		toNextByServiceState() {
			let servicerState = this.servicerState;
			let content = '';
			console.log(servicerState);
			if (servicerState == 1) {
				this.$api.showToast('您的账号在审核中，可联系客服咨询');
			} else if (servicerState == 2) {
				// setTimeout(() => {
				// 	// this.$api.showToast('您的账号审核通过,添加门店')
				// }, 1500);
				uni.redirectTo({
					url: '../shop/shopAddIndex/shopAddIndex'
				});
			} else if (servicerState == 3) {
				this.$api.showToast('您的账号审核未通过，请联系客服咨询');
			}
		}
	}
};
</script>

<style lang="less">
.banner {
	width: 100%;
	height: 322upx;
}
.posterBanner {
	margin-top: 56upx;
	width: 100%;
	height: 2246upx;
}

.addShopBtn {
	width: 100%;
	height: 98upx;
	// position: fixed;
	// bottom: 0;
	line-height: 98upx;
	// border-radius: 10upx;
	background-color: rgba(14, 94, 86, 1);
	text-align: center;
	border: 2upx solid rgba(5, 5, 5, 0.08);
	font-size: 36upx;
	text-align: center;
	font-family: PingFangSC-regular;
	color: white;
}
.submitWait {
	margin-bottom: 160upx;
	.coffee {
		width: 44upx;
		height: 50upx;
		vertical-align: middle;
	}
	.tip1 {
		color: rgba(16, 16, 16, 1);
		font-size: 24upx;
		margin-top: 30upx;
		text-align: center;
		.t1 {
			margin-left: 30upx;
			color: rgba(16, 16, 16, 1);
			font-size: 24upx;
			text-align: center;
			font-family: PingFangSC-regular;
			vertical-align: middle;
			display: inline-block;
			margin-top: 22upx;
		}
	}
	.tip2 {
		color: rgba(16, 16, 16, 1);
		font-size: 24upx;
		text-align: center;
		margin-top: 56upx;
		.phone {
			color: rgba(14, 94, 86, 1);
			margin-left: 20upx;
		}
	}
}
</style>
