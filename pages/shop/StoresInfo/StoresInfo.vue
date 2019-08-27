<!-- 门店信息 -->

<template>
	<view class="page">
		<view class="container" v-if="isok">
			<!-- <view class="editHistory">修订记录</view> -->
			<view class="shopBox">
				<image :src="storeLogoPictureLink" mode="aspectFit" class="shopLogo"></image>
				<view class="info1">
					<text class="shopName">{{ storeName }}\n</text>
					<text class="address" style="margin-top: 20upx;">{{ storeAddress }}</text>
				</view>
			</view>
			<view class="content">
				<view class="shopDes">
					<text class="t1">门店名称</text>
					<input type="text" class="t2" value="" maxlength="20" v-model="storeName" />
					<image src="../../../static/shop/you.png" mode="aspectFit" class="toRight"></image>
				</view>
				<view class="shopDes">
					<text class="t1">门店电话</text>
					<input type="number" class="t2" value="" maxlength="13" v-model="storePhoneNumber" />
					<image src="../../../static/shop/you.png" mode="aspectFit" class="toRight"></image>
				</view>
				<view class="shopDes">
					<text class="t1">门店负责人电话</text>
					<input type="number" class="t2" value="" maxlength="13" v-model="storeManagerPhoneNumber" />
					<image src="../../../static/shop/you.png" mode="aspectFit" class="toRight"></image>
				</view>
				<!-- 		<view class="shopDes">
					<text class="t1">联系电话</text>
					<input type="number" class="t2" value="" maxlength="13" v-model="telePhone" />
					<image src="../../../static/shop/you.png" mode="aspectFit" class="toRight"></image>
				</view> -->
				<view class="shopDes">
					<text class="t1">地址</text>
					<!-- <input type="number" class="address" value="" v-model="address" /> -->
					<view class="address" @click="chooseAddress">{{ storeAddress }}</view>
					<!-- <view class="address" @click="chooseAddress">{{ storeAddressName }}</view> -->
					<image src="../../../static/shop/you.png" mode="aspectFit" class="toRight"></image>
				</view>
				<view class="shopDes">
					<text class="t1">详细地址</text>
					<input type="number" class="address" value="" v-model="storeDetailedAddress" />
					<!-- <view class="address">{{ storeDetailedAddress }}</view> -->
					<image src="../../../static/shop/you.png" mode="aspectFit" class="toRight"></image>
				</view>
				<picker mode="time" :value="date" start="09:00" end="21:00" @change="bindDateChange">
				<view class="shopDes">
					<text class="t1">营业时间</text>
					<!-- <view class="date">{{ dateInt }}</view> -->
					<view class="hour">{{ storeBusinessHours }}</view>
					<image src="../../../static/shop/you.png" mode="aspectFit" class="toRight"></image>
				</view>
				</picker>
				<view class="shopDes">
					<text class="t1">营业状态</text>
					<picker @change="bindPickerChange" :value="statusIndex" :range="shopStatusList">
						<view class="t3" @click="upShopStatus">{{ storeState == 1 ? '营业中' : '休息中' }}</view>
					</picker>
					<image src="../../../static/shop/you.png" mode="aspectFit" class="toRight"></image>
				</view>
				<!-- 				<view class="shopDes" style="margin-top: 25upx;">
					<text class="t1">自动接单</text>
					<switch @change="autoGetOrder" class="autoMaticOrder" />
				</view> -->
			</view>
			<view class="switchStore" @click="updateStore">修改门店</view>

			<view class="switchStore" @click="switchStore">切换店铺</view>

			<!-- 弹出框  -->
			<uni-popup ref="businessHours" type="bottom"></uni-popup>
		</view>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
export default {
	data() {
		return {
			isok: true,
			storeName: '',
			storePhoneNumber: '', //门店电话
			storeManagerPhoneNumber: '', //门店负责人电话
			storeAddress: '',
			storeAddressName:'',
			storeDetailedAddress: '',
			storeState: '',
			storeId: '',
			storeInfo: '',
			storeLatitude: '',
			storeLongitude: '',
			storeBusinessHours: '',
			shopStatusList: ['营业中', '休息中'],
			statusIndex: '',
			storeLogoPictureLink: '',
			time:'',
			
		};
	},
	components: {
		uniPopup
	},
	onLoad() {
		this.init();
	},
	methods: {
		// 自动接单
		autoGetOrder() {},
		initData() {
			this.storeInfo = uni.getStorageSync('thisStore');
			console.log(this.storeInfo);
			let oo = this.storeInfo;
			this.storeName = oo.storeName;
			this.storePhoneNumber = oo.storePhoneNumber;
			this.storeManagerPhoneNumber = oo.storeManagerPhoneNumber;
			this.storeDetailedAddress = oo.storeDetailedAddress;
			this.storeAddress = oo.storeAddress;
			this.storeLatitude = oo.storeLatitude;
			this.storeLongitude = oo.storeLongitude;
			this.storeState = oo.storeState;
			this.storeBusinessHours = oo.storeBusinessHours;
			this.storeLogoPictureLink = oo.storeLogoPictureLink;
			this.storeId=oo.storeId
		},
		init() {
			this.initData();
		},
		//  选择日期
		bindDateChange(e) {
			let date=e.target.value
			console.log(e.target.value)
			let fromHour=parseInt(date.substring(0,2))+':00'
			let toHour=parseInt(date.substring(3))+':00'
			this.storeBusinessHours=(fromHour+'-'+toHour).toString();
		},
		//  修改门店信息
		updateStore(){
			this.$api.updateStoreInfo({
				storeId:this.storeId,
				storeName:this.storeName,
				storePhoneNumber:this.storePhoneNumber,
				storeManagerPhoneNumber:this.storeManagerPhoneNumber,
				storeLatitude:this.storeLatitude,
				storeLongitude:this.storeLongitude,
				storeAddress:this.storeAddress,
				storeBusinessHours:this.storeBusinessHours,
				storeState:this.storeState
			}).then(data=>{
				console.log(data)
				if(data.data.code==100000){
					this.$api.showToast("修改成功");
					this.$api.selectStoreInfo(this.storeId).then(data=>{
						console.log(data)
						if(data){
							this.storeInfo=data.data.storeInfo;
						}
					})
				}
			})
		},
		chooseAddress(){
			uni.chooseLocation({
				success: (e) => {
					console.log(e)
					this.storeAddress=e.address+e.name;
					this.storeLatitude=e.latitude
					this.storeLongitude=e.longitude
					
				}
			})
		},
		bindPickerChange: function(e) {
			console.log('picker发送选择改变，携带值为', e.target.value);
			this.statusIndex = e.target.value;
			if (this.statusIndex == 0) {
				this.storeState = 1;
			} else {
				this.storeState = 2;
			}
		},
		switchStore() {
			uni.navigateTo({
				url:'../shopManage/shopManage'
			})
		},
		upShopStatus() {}
	}
};
</script>

<style lang="less">
.content {
	width: 100%;
	padding-left: 45upx;
}
.switchStore {
	width: 100%;
	height: 90upx;
	line-height: 90upx;
	text-align: center;
	color: rgba(16, 16, 16, 1);
	font-size: 28upx;
	font-family: PingFangSC-regular;
	// margin-top: 150upx;
}
.autoMaticOrder {
	margin-left: 465upx;
	width: 100upx;
	height: 60upx;
	vertical-align: middle;
}
.shopDes {
	height: 90upx;
	border: 1px solid rgba(255, 255, 255, 0);
	color: rgba(16, 16, 16, 1);
	font-size: 28upx;
	text-align: left;
	font-family: PingFangSC-regular;
	position: relative;
	.date {
		margin-left: 200upx;
		width: 163upx;
		color: rgba(16, 16, 16, 1);
		font-size: 28upx;
		text-align: left;
		font-family: PingFangSC-regular;
		display: inline-block;
	}
	.hour {
		width: 163upx;
		color: rgba(16, 16, 16, 1);
		font-size: 28upx;
		text-align: left;
		font-family: PingFangSC-regular;
		display: inline-block;
		position: absolute;
		right: 70upx;
		top: 22upx;
	}
	.t1 {
		line-height: 90upx;
		display: inline-block;
		height: 90upx;
	}
	.address {
		position: absolute;
		right: 110upx;
		display: inline-block;
		vertical-align: middle;
		width: 70%;
		height: 90upx;
		line-height: 90upx;
		text-align: right;
		overflow: hidden;
	}
	.date {
	}
	.t2 {
		position: absolute;
		right: 110upx;
		display: inline-block;
		vertical-align: middle;
		width: 35%;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
	}
	.t3 {
		position: absolute;
		right: 110upx;
		top: -2upx;
		display: inline-block;
		vertical-align: middle;
		width: 35%;
		height: 90upx;
		line-height: 90upx;
		text-align: right;
	}
	.toRight {
		position: absolute;
		right: 59rpx;
		width: 36rpx;
		height: 36rpx;
		top: 25rpx;
	}
}
.editHistory {
	position: relative;
	left: 600upx;
	margin-top: 16upx;
	color: rgba(16, 16, 16, 1);
	font-size: 28upx;
	text-align: left;
	font-family: PingFangSC-regular;
}
.shopBox {
	display: flex;
	padding-top: 28upx;
	padding-left: 30upx;
	width: 100%;
	height: 204upx;
	line-height: 20px;
	text-align: center;
	border: 2upx solid rgba(255, 255, 255, 0);
	margin-top: 30upx;
	.shopLogo {
		width: 172upx;
		height: 116upx;
	}
	.info1 {
		margin-left: 50upx;
		color: rgba(16, 16, 16, 1);
		font-size: 28upx;
		text-align: left;
		font-family: PingFangSC-regular;
	}
	.info1 > text {
		display: block;
	}
}
</style>
