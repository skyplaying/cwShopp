<!--  添加支付宝账号 -->

<template>
	<view class="page">
		<view class="container" v-if="isok">
			<view class="alipayNumBox">
				<text class="t1">输入姓名</text>
				<input type="number" class="input1" v-model="userName" maxlength="15" placeholder="请输入姓名" />
			</view>
			<view class="alipayNumBox">
				<text class="t1">支付宝账号</text>
				<input type="number" class="input1" v-model="alipayNum" maxlength="15" placeholder="请输入支付宝账号" />
			</view>
			<view class="authCodeBox">
				<text class="t1">验证码</text>
				<input type="number" class="authCodeInput" v-model="authCode" maxlength="15" placeholder="请输入验证码" />
				<view class="getAuthCodeBtn" @click="getCode">{{count?count+'s':'获取验证码'}}</view>
			</view>

			<view class="submitBtn" @click="sureAdd">确定添加</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isok: true,
			alipayNum: '',
			count:0,
			userName:'',
			authCode:'',

		};
	},
	methods: {
		//  确认添加，返回上一页，查询当前账号
		sureAdd() {
			uni.navigateBack({});
		},
		getCode() {
			const TIME_COUNT = 60;
			let timer;
			if (!timer) {
				this.count = TIME_COUNT;
				timer = setInterval(() => {
					if (this.count > 0 && this.count <= TIME_COUNT) {
						this.count--;
					} else {
						clearInterval(timer);
						timer = null;
					}
				}, 1000);
			}
			
			//  获取验证码
			this.$api.getAuthCode(this.alipayNum)
			
		}
	}
};
</script>

<style lang="less">
.submitBtn {
	margin-left: 32upx;
	margin-top: 60upx;
	width: 686upx;
	height: 94upx;
	line-height: 94upx;
	border-radius: 10upx;
	background-color: rgba(14, 94, 86, 1);
	color: rgba(255, 255, 255, 1);
	font-size: 36upx;
	text-align: center;
	font-family: Microsoft Yahei;
}
.authCodeBox {
	display: flex;
	width: 100%;
	height: 90upx;
	line-height: 90upx;
	margin-left: 50upx;
	font-size: 32upx;
	margin-top: 20upx;
	font-family: Arial;
	.t1 {
		vertical-align: middle;
	}
	.getAuthCodeBtn {
		margin-left: 20upx;
		width: 220upx;
		height: 90upx;
		line-height: 90upx;
		background-color: rgba(168, 216, 185, 1);
		color: rgba(36, 147, 110, 1);
		font-size: 30upx;
		text-align: center;
		font-family: Arial;
	}
	.authCodeInput {
		margin-left: 22upx;
		width: 320upx;
		height: 90upx;
		background-color: rgba(255, 255, 255, 0);
		color: rgba(204, 204, 204, 1);
		font-size: 28upx;
		text-align: left;
		font-family: Microsoft Yahei;
	}
}
.alipayNumBox {
	width: 100%;
	height: 90upx;
	display: flex;
	line-height: 90upx;
	.t1 {
		color: rgba(16, 16, 16, 1);
		font-size: 32upx;
		text-align: left;
		font-family: Arial;
		margin-left: 50upx;
	}
	.input1 {
		position: absolute;
		left: 258upx;
		// margin-left: 46upx;
		width: 400upx;
		height: 90upx;
		color: rgba(136, 136, 136, 1);
		font-size: 28upx;
		text-align: left;
		font-family: Microsoft Yahei;
		border: 2upx solid rgba(255, 255, 255, 0);
	}
}
</style>
