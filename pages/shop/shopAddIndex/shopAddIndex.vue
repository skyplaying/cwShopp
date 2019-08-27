<!-- 添加商铺首步 -->

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
				<view class="addShopBtn" @click="addShop">添加我的门店</view>
				<view class="tip1">一个工作日内反馈审核结果</view>
			</view>
			<view class="exampleBox">
				<text class="t1">准备材料</text>
				<view class="box1">
					<view class="bt1">门店照</view>
					<view class="imgExamBox">
						<image src="../../../static/shop/chongmu.jpg" mode="aspectFill" class="examImg"></image>
						<view class="examImgWaterMark">示例</view>
					</view>
					
				</view>
				<view class="box1">
					<view class="bt1">室内入口及招牌</view>
					<view class="imgExamBox">
						<image src="../../../static/shop/roomImg.jpg" mode="aspectFill" class="examImg"></image>
						<view class="examImgWaterMark">示例</view>
					</view>	
				</view>
				<view class="box1" style="margin-bottom: 52upx;">
					<view class="text">
						<view class="bt2">营业执照</view>
						<view class="bt3">营业执照需保证拍摄方向正确，确保文字清晰。</view>
					</view>
				
					<view class="imgExamBox">
						<image src="../../../static/shop/yingyezhizhao.png" mode="aspectFill" class="examImg"></image>
						<view class="examImgWaterMark">示例</view>
					</view>	
				</view>
				<view class="box1" >
					<view class="text">
						<view class="bt2">特种经营执照</view>
						<view class="bt3">执照需保证拍摄方向正确，确保文字清晰。</view>
					</view>

					<view class="imgExamBox">
						<image src="../../../static/shop/timg.jpg" mode="aspectFill" class="examImg"></image>
						<view class="examImgWaterMark">示例</view>
					</view>	
				</view>
				
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
	},
	onLoad() {

	},
	methods: {
		// 添加门店
		addShop(){
			uni.navigateTo({
				url:'../addShopOne/addShopOne'
			})
		},
	}
};
</script>

<style lang="less">
.bannerImg {
	width: 100%;
	height: 386upx;
}
.exampleBox {
	width:100%;
	padding:0upx 48upx 28upx;
	.box1 {
		display: flex;
		margin-bottom:165upx;
		.text{
			width: 302upx;
			height: 158upx;
			color: rgba(16, 16, 16, 1);
			font-size: 28upx;
			text-align: left;
			font-family: PingFangSC-regular;
		}
		.bt1{
			color: rgba(16, 16, 16, 1);
			font-size: 28upx;
			text-align: left;
			font-family: PingFangSC-regular;
			vertical-align: middle;
			position: relative;
			top: 50upx;
		}	
		.bt2{
			color: rgba(16, 16, 16, 1);
			font-size: 28upx;
			text-align: left;
			font-family: PingFangSC-regular;
			vertical-align: middle;
		}
		.bt3{
			font-size: 25upx;
			margin-top: 25upx;
			color: #CCCCCC;
		}
	}
	.imgExamBox{
		position: absolute;
		width: 228upx;
		vertical-align: middle;
		right: 30upx;
		// height: 150px;
	}
	.examImg {
	width: 228upx;
	height: 150upx;
	}
	.examImgWaterMark {
		position: absolute;
		bottom:13upx;
		width: 100%;
		height: 34upx;
		color: rgba(255, 255, 255, 1);
		font-size: 24upx;
		text-align:center;
		font-family: PingFangSC-regular;
		background: #000000;
		opacity: 0.5;
		
	}
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
	.tip1 {
		color: rgba(16, 16, 16, 1);
		font-size: 28upx;
		text-align: center;
		font-family: PingFangSC-regular;
		margin-top: 20upx;
	}
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
