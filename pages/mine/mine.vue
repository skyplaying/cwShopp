<!--  我的界面 -->

<template>
	<view class="page">
	<view class="container" v-if="isok">
		
		<view class="head">
			<image :src="userInfo.avatarUrl" mode="aspectFit" class="headImg"></image>
			<text class="name">{{userInfo.nickName}}</text>
		</view>
		<view class="content">
			<view class="account ">
				<view class="">
					<view class="money">￥{{balance}}</view>
					<view class="tit1">账户金额</view>
				</view>
				<image src="../../static/shop/you.png" mode="aspectFit" class="toright" style="margin-top: 36upx;"></image>
			</view>
			<view class="box1" @click="toMessage">
				<image src="../../static/shop/xiaoxi.png" mode="aspectFit" class="icon"></image>
				<text class="t1">消息</text>
				<image src="../../static/shop/you.png" mode="aspectFit" class="toright i2"></image>
			</view>
			<view class="box1" @click="online">
				<image src="../../static/shop/kefu.png" mode="aspectFit" class="icon"></image>
				<text class="t1">在线客服</text>
				<image src="../../static/shop/you.png" mode="aspectFit" class="toright i2"></image>
			</view>
			
		</view>

		
			
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isok:true,
				userInfo:'',
				balance:0,
			};
		},
		onLoad() {
			this.init()
		},
		methods:{
			init(){
				uni.getUserInfo({
					success: (e) => {
						this.userInfo=e.userInfo
						console.log(e)
					}
				})
			},
			toMessage(){
				uni.navigateTo({
					url:'../messageRemind/messageRemind'
				})
				
			}
		}
	}
</script>

<style lang="less">
	.toright{
	position: absolute;
	right: 36upx;
	width: 36upx;
	height: 36upx;
	vertical-align: middle;
	// margin-top: 36upx;
	}
.content{
	width: 100%;
	padding-left: 56upx;
}
.i2{
	margin-top: 22upx;	
}
.box1{

	width: 100%;
	height: 90upx;
	line-height: 90upx;
	margin-top: 10upx;
	// text-align: center;
	border: 2upx solid rgba(255, 255, 255, 0);
	.t1{
		vertical-align: middle;
		margin-left: 22upx;
		color: rgba(16, 16, 16, 1);
		font-size: 28upx;
		text-align: left;
		font-family: PingFangSC-regular;
	}
}
.icon{
	width: 32upx;
	height: 46upx;
	vertical-align: middle;
}
.account{
	display: flex;
	width: 100%;
	height: 162upx;
	border: 1px solid rgba(255, 255, 255, 0);
	margin-top: 100upx;
	.money{
		color: rgba(16, 16, 16, 1);
		font-size: 40upx;
		text-align: left;
		font-family: PingFangSC-regular;
	}
	.tit1{
		color: rgba(16, 16, 16, 1);
		font-size: 28upx;
		text-align: left;
		font-family: PingFangSC-regular;
		margin-left: 8upx;
	}
}
.head{
	margin-top:60upx;
	.headImg{
		width: 85upx;
		height: 85upx;
		border-radius: 50%;
		margin-left: 70upx;
		vertical-align: middle;
	}
	.name{
		margin-left: 50upx;
		color: rgba(16, 16, 16, 1);
		font-size: 32upx;
		text-align: left;
		font-family: PingFangSC-regular;
	}
}

</style>
