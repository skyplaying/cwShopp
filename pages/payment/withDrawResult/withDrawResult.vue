<!--  提现结果 -->

<template>
	<view class="page">
		<view class="container" v-if="isok">
			<view class="infoBox">
				<image src="../../../static/shop/payComIcon.png" mode="aspectFit" class="payIcon"></image>
				<view class="tip1">提交成功</view>
				<view class="tip2">
					<text class="bite">￥</text>
					<text class="money">100.00</text>
				</view>
			</view>

			<view class="box1" style="margin-top: 69upx;">
				<text class="name">提现方式</text>
				<text class="info1">支付宝账户余额</text>
			</view>
			<view class="box1">
				<text class="name">提现账号</text>
				<text class="info1">135625663</text>
			</view>
			<view class="line"></view>

			<view class="goback" @click="goback">返回</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isok: true
		};
	},
	methods: {
		goback() {
			uni.navigateBack({});
		}
	}
};
</script>

<style lang="less">
.line {
	width: 100%;
	height: 4upx;
	background: #efefef;
	margin-top: 30upx;
}
.goback {
	width: 240upx;
	height: 70upx;
	line-height: 70upx;
	border-radius: 8upx;
	color: rgba(14, 94, 86, 1);
	font-size: 28upx;
	text-align: center;
	font-family: Microsoft Yahei;
	border: 2upx solid rgba(14, 94, 86, 1);
	margin-left: 256upx;
	margin-top: 610upx;
}
.box1 {
	margin-left: 30upx;
	margin-bottom: 8upx;
	width: 100%;
	.name {
		color: rgba(136, 136, 136, 1);
		font-size: 28upx;
		font-family: Arial;
	}
	.info1 {
		color: rgba(16, 16, 16, 1);
		font-size: 28upx;
		text-align: center;
		font-family: Arial;
		position: absolute;
		right: 56upx;
	}
}
.infoBox {
	text-align: center;
	.payIcon {
		width: 100upx;
		height: 100upx;
		margin-top: 32upx;
	}
	.tip1 {
		color: rgba(16, 16, 16, 1);
		font-size: 34upx;
		font-family: Arial;
	}
	.tip2 {
		.bite {
			left: 105px;
			top: 176px;
			color: rgba(16, 16, 16, 1);
			font-size: 36upx;
			font-family: Arial;
		}
		.money {
			color: rgba(16, 16, 16, 1);
			font-size: 72upx;
			font-family: normal;
		}
	}
}
</style>
