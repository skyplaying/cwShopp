<template>
	<view class="page">
		<view class="container" v-if="isok">
			<view class="head">
		<!-- 		[{"storeId":3,"servicerUserId":14,"storeState":2,"storeInfoState":1,"storeName":"ghrgr","storeCheckState":0,"storePhoneNumber":"17603003901","storeAddress":"广东省深圳市南山区南海大道3688号","storeDetailedAddress":"grgrgrg","storeLongitude":113.93664,"storeLatitude":22.532323,"storePictureLinks":"https://image.petout.cn/petout/image/201908221634258737UTMIJ.png,https://image.petout.cn/petout/image/201908221634302242CMEJA.png","storeBusinessHours":"8:00-8:00","storeLogoPictureLink":"https://image.petout.cn/petout/image/20190822163422223N0IMGI.png","storeCarHeadPictureLink":"https://image.petout.cn/petout/image/20190822163434986MSG4GQ.png","storeCarNumberPlatePictureLink":"https://image.petout.cn/petout/image/20190822163438281JDGQWP.png","storeBusinessLicensePictureLink":"https://image.petout.cn/petout/image/20190822163442512UZ2WZM.png","storeIntroduction":"gegegegege","storeCreateTime":"2019-08-22 16:34:48"}] -->
				<image :src="storesInfo.storeLogoPictureLink" mode="aspectFill" class="shopLogo"></image>
				<view class="box2">
					<text class="shopName">{{storesInfo.storeName}}</text>
					<view class="authIcon">{{userInfo.realName?'已认证':'待认证'}}</view>
					<image src="../../static/shop/toBottom.png" mode="widthFix" class="toBottom"></image>
					<view class="addr">{{storesInfo.storeAddress}}</view>
				</view>
				<view class="shopManage">店铺管理</view>
			</view>
			<!--  今天订单 今日收款 -->
			<view class="todayData">
				<view class="to1">
					<text class="num">0</text>
					<view class="tit">今日订单</view>
				</view>
				<view class="line"></view>
				<view class="to1">
					<text class="num">0.00</text>
					<view class="tit">今日收款</view>
				</view>
			</view>

			<!--  订单提醒 -->
			<view class="orderAlert">
				<image src="../../static/shop/xiaoxi.png" mode="aspectFit" class="mes"></image>
				<text class="mesType">你有1个新的订单信息</text>
				<text class="mestip mesType">订单</text>
				<text class="minBe">5分钟前</text>
				<image src="../../static/shop/you.png" mode="widthFix"  class="toright"></image>
			</view>
			<!--  九宫格列表 -->
			<view class="Sudoku">
				<view class="" v-for="(item, index) in seviceImgNowList[0]" :key="index">
					<view class="box1" :style="index <= 5 ? border1 : border2" @click="toPage(pageList[index])">
						<image :src="'/static/shop/' + item" mode="aspectFit" class="serviceImg"></image>
						<text class="text">{{ seviceImgNowList[1][index] }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
// import QQMapWX from '../../common/http/module/qqmap-wx-jssdk.js';
// let qqmapsdk;
export default {
	data() {
		return {
			isok: true,
			storesInfo:'',
			stateText:'',
			seviceImgList: [
				'/static/shop/love.png',
				'/static/shop/good.png',
				'/static/shop/getMoney.png',
				'/static/shop/jiaoche.png',
				'/static/shop/zhuandan.png',
				'/static/shop/fahuo.png',
				'/static/shop/jiameng.png',
				'/static/shop/yuangongguanli.png',
				'/static/shop/daili.png'
			],
			pageList:['../service/publishingService/publishingService','../service/postTrade/postTrade'],
			seviceImgNowList: [
				['love.png', 'good.png', 'shoukuan.png', 'huijiaoche.png', 'huizhuandan.png', 'huifahuo.png', 'huijiameng.png', 'huiyuangongguanli.png', 'huidaili.png'],
				['发布服务', '发布商品', '收款', '帮忙叫车', '转单', '发货', '加盟招商', '员工管理', '代理商品'],
				['']
			],
			border1: 'border-right: 1px solid #efefef;border-bottom: 1px solid #efefef;',
			border2: 'border-right: 1px solid #efefef;'
		};
	},
	onLoad() {
		this.init()

	},
	methods: {
		init(){
		this.storesInfo=uni.getStorageSync('storesInfo')
		this.userInfo=uni.getStorageSync('user')
		},
		toPage(page){
			console.log(page)
			if(page){
				uni.navigateTo({
					url:page,
				})
			}
		},
		getCity() {
			uni.getLocation({
				success(e) {
					console.log(e);
					let latitude=e.latitude
					let longitude=e.latitude
					console.log(latitude,longitude)
;
				}
			});
		}
	}
};
</script>

<style lang="less">
.line {
	position: relative;
	top: 38upx;
	width: 2upx;
	height: 60upx;
	background: rgba(14, 94, 86, 0.51);
}

.Sudoku {
	margin-top: 20upx;
	width: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	border-top: none;
	border-bottom: none;
	.box1 {
		width: 248upx;
		height: 248upx;
		line-height: 40upx;
		text-align: center;
		.text {
			color: rgba(5, 5, 5, 1);
			font-size: 26upx;
			text-align: center;
			font-family: Arial;
			display: block;
			margin-top: 15upx;
		}
	}
	.serviceImg {
		width: 80upx;
		height: 80upx;
		margin-top: 70upx;
		text-align: center;
	}
}
.toright {
	width: 11upx;
	height: 11upx;
	margin-left: 160upx;
}
.orderAlert {
	width: 100%;
	padding: 0 30upx;
	height: 70upx;
	background-color: rgba(255, 255, 255, 1);
	position: relative;
	.mes {
		width: 24upx;
		height: 38upx;
		vertical-align: middle;
	}
	.mesType {
		margin-left: 36upx;
		color: rgba(16, 16, 16, 1);
		font-size: 26upx;
		text-align: left;
		font-family: Arial;
	}
	.mestip {
		color: rgba(14, 94, 86, 0.51);
		padding-left: 30upx;
	}
	.minBe {
		margin-left: 35upx;
		color: rgba(153, 153, 153, 1);
		font-size: 22upx;
		text-align: left;
		font-family: Arial;
	}
}
.todayData {
	width: 644upx;
	height: 126upx;
	line-height: 126upx;
	border-radius: 20upx;
	text-align: center;
	box-shadow: 0px 0px 10upx 0px rgba(223, 223, 223, 1);
	border: 2upx solid rgba(255, 255, 255, 0);
	position: relative;
	top: -35upx;
	left: 54upx;
	background: white;
	display: inline-flex;

	.to1 {
		flex: 1;
		.num {
			text-align: center;
			color: rgba(14, 94, 86, 1);
			font-size: 48upx;
			font-family: PingFangSC-bold;
			position: relative;
			top: -20upx;
			font-family: normal;
			font-weight: bold;
		}
		.tit {
			opacity: 0.67;
			color: rgba(14, 94, 86, 1);
			font-size: 24upx;
			text-align: center;
			font-family: Arial;
			position: relative;
			top: -98upx;
		}
	}
}

.head {
	width: 100%;
	height: 180upx;
	background-color: rgba(14, 94, 86, 1);
	display: flex;
	.shopLogo {
		margin-left: 30upx;
		margin-top: 20upx;
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
		vertical-align: middle;
	}
	.shopManage {
		margin-left: 235upx;
		margin-top: 30upx;
		width: 110upx;
		height: 60upx;
		line-height: 60upx;
		border-radius: 6upx;
		background-color: rgba(255, 255, 255, 0);
		color: rgba(255, 255, 255, 1);
		font-size: 20upx;
		text-align: center;
		font-family: Microsoft Yahei;
		border: 2upx solid rgba(255, 255, 255, 1);
		vertical-align: middle;
	}
	.box2 {
		margin-left: 30upx;
		margin-top: 10upx;
		.shopName {
			color: white;
			font-size: 32upx;
			text-align: left;
			font-family: PingFangSC-regular;
			display: inline-block;
			vertical-align: middle;
		}
		.authIcon {
			width: 70upx;
			height: 30upx;
			border-radius: 16upx;
			background-color: rgba(168, 216, 185, 1);
			color: rgba(14, 94, 86, 1);
			font-size: 16upx;
			text-align: center;
			font-family: Microsoft Yahei;
			display: inline-block;
			vertical-align: middle;
			margin-left: 40upx;
		}
		.toBottom {
			display: inline-block;
			width: 20upx;
			height: 20upx;
			vertical-align: middle;
			margin-left: 10upx;
		}
		.addr {
			line-height: 34upx;
			color: rgba(255, 255, 255, 1);
			font-size: 24upx;
			font-family: Arial;
			margin-top: 5upx;
		}
	}
}
</style>
