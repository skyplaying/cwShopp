<!--  提现 -->

<template>
	<view class="page">
		<view class="container" v-if="isok">
			<view class="content">
				<view class="payNumBox">
					<image src="../../../static/shop/zfbLogo.png" mode="aspectFit" class="payIcon"></image>
					<view class="">
						<text class="t1">支付宝\n</text>
						<text class="t2">13823501192</text>
					</view>
					<image src="../../../static/shop/you.png" mode="aspectFit" class="toRight"></image>
				</view>
				<!--  提现输入 -->
				<view class="withBox">
					<text class="t1">提现金额\n</text>
					<view class="" style="display: flex;">
						<text class="y">￥</text>
						<input class="t2" type="number" value="" maxlength="20" />
					</view>
					<view class="line"></view>
					<view class="canDrawBox">
						<text class="">可提现金额</text>
						<text class="t1">3943.58元</text>
						<text class="allWithDraw">全部提现</text>
					</view>
				</view>
				<!--  隐藏输入框 -->
				<view class="verifyPhone" v-if="isWithDraw">
					<view class="v1">
						<view class="">手机号</view>
						<input type="number" class="phoneInput" value="" maxlength="15" placeholder="手机号" />
					</view>
					<view class="v2">
						<view class="authBox">
						<text class="b1">验证码</text>
						<input type="number" class="authInput" value="" placeholder="请输入验证码" />
						</view>
						<view class="getAuthCodeBtn" @click="getCode()">{{count?count+'s':'获取验证码'}}</view>
					</view>
					
				</view>
				
				<view class="submitWithDraw" @click="submitWithDraw">确定提现</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isok: true,
			isWithDraw:false,
			count:'',
			timer:'',
		};
	},
	methods:{
	      submitWithDraw(){
			this.isWithDraw=true;
		},
		getCode() {
			const TIME_COUNT = 60;
			let timer,count;
			if (!this.timer) {
				this.count = TIME_COUNT;
				this.timer = setInterval(() => {
					if (this.count > 0 && this.count <= TIME_COUNT) {
						this.count--;
					} else {
						clearInterval(this.timer);
						this.timer = null;
					}
					return count;
				}, 1000);
			}
		},
	}
};
</script>

<style lang="less">
.content {
	width: 100%;
}
.verifyPhone{
	.v1{
		margin-top: 30upx;
		margin-left: 18upx;
		width: 690upx;
		height: 90upx;
		line-height: 90upx;
		background-color: rgba(242, 242, 242, 1);
		font-size: 28upx;
		font-family: PingFangSC-regular;
		font-family: Arial;
		padding-left: 20upx;
		display: flex;
	
		.phoneInput{
			margin-left: 24upx;
			width: 560upx;
			height: 90upx;
			line-height: 90upx;
			background-color: rgba(255, 255, 255, 0);
			color: rgba(204, 204, 204, 1);
			font-size: 28upx;
			text-align: left;
			font-family: Microsoft Yahei;
		}
	}
	.v2{
		display: flex;
		margin-left: 18upx;
		margin-top:25upx;
		.getAuthCodeBtn{
			width: 246upx;
			height: 90upx;
			line-height: 90upx;
			background-color:#A8D8B9 ;
			color: #24936E;
			font-size: 30upx;
			text-align: center;
			font-family: Arial;
			margin-left: 20upx;
		}
		.authBox{
			width: 445upx;
			height: 90upx;
			line-height: 90upx;
			background-color: rgba(242, 242, 242, 1);
			font-size: 28upx;
			font-family: Arial;
			display:flex;
			.b1{
				margin-left: 18upx;
			}
			.authInput{
				margin-left:25upx ;
				width:300upx;
				height:90upx;
				background-color: rgba(255, 255, 255, 0);
				font-size: 28upx;
				text-align: left;
				font-family: Microsoft Yahei;

			}

		}
	}

}
.submitWithDraw{
	margin-left: 32upx;
	margin-top: 70upx;
	width: 686upx;
	height:94upx;
	line-height: 94upx;
	border-radius: 8upx;
	background-color: rgba(14, 94, 86, 1);
	color: rgba(255, 255, 255, 1);
	font-size: 36upx;
	text-align: center;
	font-family: Microsoft Yahei;
}
.canDrawBox {
	color: rgba(136, 136, 136, 1);
	font-size: 28upx;
	text-align: left;
	font-family: Arial;
	height: 76upx;
	line-height: 76upx;
	.t1 {
		margin-left: 18upx;
	}
	.allWithDraw {
		position: absolute;
		right: 30upx;
		color: rgba(14, 94, 86, 1);
		font-size: 28upx;
		text-align: left;
		font-family: Arial;
	}
}
.line {
	height: 3upx;
	margin-left: 30upx;
	background: #efefef;
	margin-top: 50upx;
}
.withBox {
	padding-left: 30upx;
	margin-top: 30upx;
	width: 100%;
	// height: 212upx;
	border: 3upx solid #efefef;
	.t1 {
		color: rgba(102, 102, 102, 1);
		font-size: 28upx;
		text-align: left;
		font-family: Arial;
	}
	.y {
		color: rgba(16, 16, 16, 1);
		font-size: 48upx;
		font-family: Arial;
	}
	.t2 {
		width: 700upx;
		height: 60upx;
		line-height: 60upx;
		color: rgba(16, 16, 16, 1);
		font-size: 48upx;
		font-family: Arial;
	}
}
.payNumBox {
	padding-left: 30upx;
	margin-top: 30upx;
	display: flex;
	height: 120upx;
	width: 100%;
	border: 2upx solid #efefef;
	position: relative;

	.payIcon {
		width: 80upx;
		height: 80upx;
		vertical-align: middle;
		margin-top: 20upx;
		margin-right: 30upx;
	}
	.t1 {
		color: rgba(16, 16, 16, 1);
		font-size: 32upx;
		text-align: left;
		font-family: Arial;
		position: relative;
		top: 13upx;
	}
	.t2 {
		color: rgba(90, 90, 90, 1);
		font-size: 28upx;
		text-align: left;
		font-family: Arial;
	}
	.toRight {
		width: 30upx;
		height: 30upx;
		display: inline-block;
		vertical-align: middle;
		position: absolute;
		right: 72upx;
		top: 46upx;
	}
}
</style>
