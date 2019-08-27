<template>
	<view class="page">
		<view class="container" v-if="isok">
			<view class="content">
				<view class="box1">
					<text class="t1">余额账户(元)</text>
					<text class="t2">明细</text>
				</view>
				<view class="balanceBox">6500</view>
				<view class="box2">
					<text class="b1">已申请</text>
					<text class="" style="margin-left: 20upx;">￥400</text>
					<text style="margin-left: 285upx;">可提现</text>
					<text style="margin-left: 20upx;">￥3,500</text>
				</view>
				
			</view>
			<view class="withDrawBox">
				<image src="../../static/shop/withDrawGreen.png" mode="aspectFit" class="withDrawIcon"></image>
				<text class="t1">提现</text>
				<image src="../../static/shop/you.png" mode="aspectFit" class="toRight"></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isok: true
		};
	}
};
</script>

<style lang="less">
.content {
	width: 100%;
	height: 350upx;
	background: #0e5e56;
	color: #ffffff;
	padding: 0upx 40upx 0 40upx;
}
.box1 {
	padding-top: 30upx;
	.t1 {
		font-size: 28upx;
		font-family: Arial;
	}
	.t2 {
		margin-left: 442upx;
		color: rgba(255, 255, 255, 1);
		font-size: 32upx;
		font-family: Arial;
	}
}
.box2 {
	color: rgba(255, 255, 255, 1);
	font-size: 28upx;
	font-family: Arial;
	.t1 {
	}
}
.withDrawBox{
	// width: 100%;
	padding-left: 40upx;
	// display: flex;
	height: 90upx;
	margin-top:50upx;
		.t1{
			margin-left: 16upx;
			color: rgba(16, 16, 16, 1);
			font-size: 34upx;
			text-align: left;
			font-family: Arial;
			vertical-align: middle;
		}
	.withDrawIcon{
		width: 40upx;
		height: 40upx;
		vertical-align: middle;
		display: inline-block;
	}	
	.toRight{
		width: 28upx;
		height: 28upx;
		display: inline-block;
		vertical-align: middle;
		margin-left: 525upx;
	}

}
.balanceBox {
	height: 180upx;
	line-height: 180upx;
	color: rgba(255, 255, 255, 1);
	font-size: 72upx;
	font-family: Arial;
}
</style>
