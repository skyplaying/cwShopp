<!--  发布服务 -->
<template>
	<view class="page">
		<view class="container" v-if="isok">
			<view class="selectBox"><text class="text1">我的门店</text></view>
			<view class="addBtn" @click="addStore">+添加门店</view>

			<view v-for="(item, index) in storesInfo" :key="index">
				<view class="shopBox" @click="toStore(item)">
					<view class="box1" style="position: relative;">
						<image :src="item.storeLogoPictureLink" mode="aspectFill" class="storeImg"></image>
						<view class="status" v-if="item.storeCheckState == 0 || 1">审核中</view>
						<view class="status red" v-if="item.storeCheckState == 2">审核通过</view>
						<view class="status blue" v-if="item.storeCheckState == 3">审核驳回</view>
					</view>
					<view class="info">
						<view class="b1">
							<text class="storeName">{{ item.storeName }}</text>
							<text class="statusIcon">{{ item.storeState == 1 ? '营业中' : '休息中' }}</text>
						</view>
						<view class="b2">
							<text class="address">{{ item.storeAddress }}</text>
							<image src="../../../static/shop/you.png" mode="aspectFit" class="toRight"></image>
						</view>
						<view class="b3">
							<text>营业时间:</text><text>{{item.storeBusinessHours}}</text><text></text>
						</view>
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
			isok: true,
			selectext: '',
			serviceState: '',
			isSelect: false,
			putUp: 'color:#0E5E56;border:1px solid #0E5E56',
			putDown: 'color: #D92B2B;border:1px solid #D92B2B',
			servicesInfo: [],
			storesInfo: '',
			storeList: [],
			servicerUserId: '',
			storeNameList: []
		};
	},
	onLoad() {
		that = this;
		this.init();
	},
	methods: {
		init() {
			this.selectAllStores();
		},
		btnColor(e) {
			console.log(e);
		},
		addStore(){
			uni.navigateTo({
				url:"../addShopOne/addShopOne"
			})
		},
		toStore(e){
			uni.setStorageSync('thisStore',e)
			uni.navigateTo({
				url:'../StoresInfo/StoresInfo'
			})
		},
		selectAllStores() {
			this.servicerUserId = uni.getStorageSync('userId');
			this.$api.selectAllStore(this.servicerUserId).then(data => {
				this.storesInfo = data.data.storesInfo;
				console.log(this.storesInfo[0].storeLogoPictureLink);
				let oo = {};
				// for (var i = 0; i < this.storesInfo.length; i++) {
				// 	oo.storeName = this.storesInfo[i].storeName;
				// 	oo.storeId = this.storesInfo[i].storeId;
				// 	this.storeList.push(oo);
				// 	this.storeNameList.push(this.storesInfo[i].storeName);
				// }
				// console.log(this.storeList);
				uni.setStorageSync('storesInfo', data.data.storesInfo);
			});
		},
		toModelPage(item) {
			uni.navigateTo({
				url: item.url + '?type=' + item.type
			});
		}
	}
};
</script>

<style lang="less">
.shopBox {
	width: 100%;
	display: flex;
	height: 190upx;
	padding: 30upx;
	.storeImg {
		width: 130upx;
		height: 130upx;
		border-radius: 6upx;
	}
	.info {
		margin-left: 30upx;
		.b3{
			color: rgba(16, 16, 16, 1);
			font-size: 24upx;
			text-align: left;
			font-family: PingFangSC-regular;
		}
		.b2 {
			position:relative;
			 .toRight {
				position: absolute;
				right: -63upx;
				height: 28upx;
				width: 28upx;
				top: 15upx;
			}
			.address {
				color: rgba(132, 132, 132, 1);
				font-size: 28upx;
				font-family: Arial;
			}
		}
		.b1 {
			display: flex;
			.storeName {
				color: rgba(0, 0, 0, 1);
				font-size: 32upx;
				text-align: left;
				font-family: PingFangSC-bold;
				margin-right: 10upx;
			}
			.statusIcon {
				width: 100upx;
				height: 45upx;
				line-height: 45upx;
				border-radius: 4upx;
				color: rgba(14, 94, 86, 1);
				font-size: 28upx;
				text-align: center;
				font-family: Arial;
				border: 2upx solid rgba(14, 94, 86, 1);
				vertical-align: middle;
			}
		}
	}
	.box1 {
		.red{
			background:#F53D1E;
		}
		.blue{
			background: #148FEB;
		}
		.status {
			position: absolute;
			bottom: 61upx;
			width: 130upx;
			height: 30upx;
			opacity: 0.85;
			border-radius: 0px 0px 6upx 6upx;
			background-color: rgba(132, 132, 132, 1);
			color: rgba(255, 255, 255, 1);
			font-size: 16upx;
			text-align: center;
			font-family: Microsoft Yahei;
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
}
</style>
