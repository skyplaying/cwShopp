<!--  接送模板 -->
<template>
	<view class="page">
		<view class="container" v-if="isok">
			<view class="content">
				<picker :value="index" :range="storeNameList" @change="selectStore">
				<view class="selectShop box1">
					<text class="t1">选择门店</text>
					<text class="t2">{{ storeName }}</text>
					<image src="../../../../static/shop/you.png" mode="aspectFit" class="toRight"></image>
				</view>
				</picker>
				<view class="box1">
					<text class="t1">服务名称</text>
					<input type="text" class="input" v-model="serviceName" style="margin-left: 316upx;" placeholder="请输入服务名称" />
				</view>
				<view class="selectRiteType">
					<view class="" @click="fixedPrice">一口价</view>
					<view class="" @click="perKmPrcie">每公里起算</view>
					<view class="" @click="freePick">免费接送</view>
				</view>
				<view class="box1" v-if="!isfreePick">
					<text class="t1">{{tit}}</text>
					<input type="number" class="input pr60" v-model="servicePrice" style="right: 282upx;" placeholder="请输入服务价格" />
				</view>

				<view class="box2">
					<text class="t1 tit" style="">说明</text>
					<textarea v-model="serviceRemark" :placeholder="riskPlace" class="explain" />
				</view>
				<!--  上传图片 -->
				<view class="uploadImgBox">
					<view class="tit">上传图片</view>
					<upload-img :limit="1" class="img" :fileClass="west" :serverUrl="serverUrl" style="margin-left: 365upx;" @getImgData="getImgData"></upload-img>
				</view>

			</view>

			<view class="addBtn" @click="addService">添加</view>
		</view>
	</view>
</template>

<script>
let that;
import uploadImg from '../../../../components/mc-image-upload/mc-image-upload.vue';
export default {
	data() {
		return {
			isok: true,
			serviceName: '遗体承接',
			isUnits: '',
			isSelect: false,
			unitsList: ['次'],
			selectext: '',
			riteTypeName:'',
			riskContent:'',
			servicePrice:'',
			tit:'价格（元）',
			isfreePick:false,
			riskPlace:'安排车辆到宠主所需地址接宠，承接范围可覆盖本市所有地区。',
			serverUrl: 'https://test.qipinke.com/petoutServer_test/api/file/uploadImage',
			serviceType: '',
			servicePriceUnit: '',
			serviceRemark: '',
			serviceImgLink: '',
			sparkServiceSubPriceData: '',
			storeName: '',
			storeList: [],
			storesInfo: '',
			storeNameList: [],
			storeId: '',
			editgoods: '',
			editImgPath: '',
		};
	},
	components: {
		uploadImg
	},
	onLoad() {
		that = this;
		this.queryAllStore();
	},
	methods: {
		unitsClick() {
			that.isSelect = true;
		},
		// 选择服务类型
		fixedPrice(){
			this.serviceName='遗体承接'
			this.isfreePick=false
			this.tit='价格（元）'
			this.riskPlace='安排车辆到宠主所需地址接宠，承接范围可覆盖本市所有地区。'
			this.servicePriceUnit='次'
		},
		perKmPrcie(){
			this.serviceName='接送服务'
			this.tit='每公里价格（元）'
			this.isfreePick=false
			this.servicePriceUnit='公里'
			this.riskPlace='安排车辆到宠主所需地址接宠，承接范围可覆盖本市所有地区。'
		},
		freePick(){
			this.serviceName='接送服务'
			this.isfreePick=true
			this.servicePrice=0;
			this.servicePriceUnit='免费';
		},
		getImgData(e) {
			console.log(e);
			// 判断文件类型
			let fileClass = e[1]; //图片类型
			let imgUrl = e[0]; //图片路径
			console.log(fileClass, imgUrl);
			this.serviceImgLink=imgUrl
		},
		addService() {
			//  校验完整
			let price = this.servicePrice;
			let isPrice = this.$api.isNumber(price);
			let isSubmitAll = this.storeName && this.serviceName && this.servicePrice && isPrice && this.serviceRemark && this.serviceImgLink;
			console.log(isSubmitAll, isPrice);
			// 第一个服务
			if (!isPrice) {
				this.$api.showToast('价格须为数字');
				return;
			} else if (!isSubmitAll) {
				this.$api.showToast('服务信息不完整');
			} else {
				this.$api
					.addService({
						storeId: this.storeId,
						serviceType: this.serviceType || 3,
						serviceName: this.serviceName,
						servicePrice: this.servicePrice,
						servicePriceUnit: this.servicePriceUnit || '次',
						serviceRemark: this.serviceRemark,
						serviceImgLink: this.serviceImgLink,
						sparkServiceSubPriceData: this.sparkServiceSubPriceData || ''
					})
					.then(data => {
						console.log(data);
						if (data.data.code == 100000) {
							this.$api.showToast('添加服务成功');
							setTimeout(() => {
								uni.redirectTo({
									url: '../../publishingService/publishingService'
								});
							}, 800);
						}
					});
			}
		
		},
		//  选择商家
		selectStore(e) {
			let oo = {};
			let index = e.detail.value;
			this.storeId = this.storeList[index].storeId; //当前选择的商品id
			this.storeName = this.storeList[index].storeName;
			console.log(e);
		},
		selectUnits(e) {
			if (e) {
				this.servicePriceUnit = e;
				this.selectext = e;
				setTimeout(() => {
					this.isSelect = false;
				}, 100);
			}
		},
		queryAllStore() {
			this.servicerUserId = uni.getStorageSync('userId');
			this.$api.selectAllStore(this.servicerUserId).then(data => {
				console.log(data.data.storesInfo[0]);
				this.storesInfo = data.data.storesInfo;
				let oo = {};
				for (var i = 0; i < this.storesInfo.length; i++) {
					oo.storeName = this.storesInfo[i].storeName;
					oo.storeId = this.storesInfo[i].storeId;
					this.storeList.push(oo);
					this.storeNameList.push(this.storesInfo[i].storeName);
					//  只有一个店铺默认取第一个
					if (this.storesInfo.length <= 1) {
						this.storeName = this.storesInfo[0].storeName;
						this.storeId = this.storesInfo[0].storeId;
					}
				}
				console.log(this.storeList);
				uni.setStorageSync('storesInfo', data.data.storesInfo);
			});
		},

	}
};
</script>

<style lang="less">
.addBtn {
	margin-left: 40upx;
	margin-top: 50upx;
	margin-bottom: 50upx;
	width: 670upx;
	height: 90upx;
	line-height: 90upx;
	background-color: rgba(14, 94, 86, 1);
	color: rgba(255, 255, 255, 1);
	font-size: 32upx;
	text-align: center;
	font-family: Microsoft Yahei;
}
//  选择仪式
.selectRiteType{
	display: flex;
	padding: 25upx 0;
}
.selectRiteType >view{
	margin-right: 40upx;
	width: 155upx;
	height: 60upx;
	line-height: 60upx;
	border-radius: 6upx;
	background-color: rgba(255, 255, 255, 0);
	color: rgba(14, 94, 86, 1);
	font-size: 24upx;
	text-align: center;
	font-family: Microsoft Yahei;
	border: 2upx solid rgba(14, 94, 86, 1);
}
.selectRiteType>view:hover{
	margin-right: 40upx;
	width: 155upx;
	height: 60upx;
	line-height: 60upx;
	border-radius: 6upx;
	background-color: rgba(14, 94, 86, 1);
	color: rgba(255, 255, 255, 1);
	font-size: 24upx;
	text-align: center;
	font-family: Microsoft Yahei;
	border: 2upx solid rgba(14, 94, 86, 1);

}
.imageUpload {
	width: 125upx;
	height: 125upx;
	line-height: 40upx;
	border-radius: 4upx;
	background-color: rgba(240, 240, 240, 1);
	text-align: center;
	border: 2upx solid rgba(229, 229, 229, 1);
	margin-left: 430upx;
}
.uploadImgBox {
	margin-top: 30upx;
	
	width: 100%;
	height: 170upx;
	line-height: 170upx;
	// text-align: center;
	display: flex;
	.tit {
		color: rgba(16, 16, 16, 1);
		font-size: 32upx;
		text-align: left;
		font-family: PingFangSC-regular;
	}
	.img {
		position: absolute;
		left: 180upx;
		z-index: 20;
	}
}

//  选择文本
.selectBox {
	// margin-left: 20upx;
	// margin-top: 30upx;
	position: relative;
	.bottomArrows {
		width: 15upx;
		height: 15upx;
		position: absolute;
		left: 125upx;
		top: 18upx;
	}
}
.box2 {
	.tit {
		margin-top: 28upx;
		display: block;
	}
	.explain {
		margin-top: 15upx;
		width: 650upx;
		height: 180upx;
		padding: 20upx;
		line-height: 40upx;
		color: rgba(136, 136, 136, 1);
		font-size: 28upx;
		text-align: left;
		font-family: Microsoft Yahei;
		border: 2upx solid rgba(234, 234, 234, 1);
	}
}

.units {
	position: absolute;
	right: 55upx;
	top: 18upx;
	width: 130upx;
	height: 60upx;
	line-height: 60upx;
	color: rgba(16, 16, 16, 1);
	font-size: 28upx;
	font-family: Microsoft Yahei;
	border: 2upx solid rgba(187, 187, 187, 1);
	border-radius: 15upx;
	padding-left: 20upx;
}

//  下拉框
.selectPop {
	width: 150upx;
	border: 1upx solid #888888;
	display: inline-block;
	position: absolute;
	right: 25upx;
	margin-top: -19rpx;
	.s1 {
		width: 130upx;
		height: 35upx;
		text-align: left;
		font-size: 25upx;
		line-height: 35upx;
		border: none;
		padding-left: 25upx;
		margin-top: 5upx;
	}
	.s1:hover {
		background: #108ee9;
		color: white;
	}
}

.pr60 {
	position: absolute;
	left:445upx;
	top: 22upx;
}

.content {
	padding: 30upx;
	width: 100%;
	.input {
		// margin-left: 137upx;
		width: 300upx;
		height: 60upx;
		// color: rgba(187, 187, 187, 1);
		font-size: 32upx;
		text-align: left;
		font-family: Microsoft Yahei;
		display: inline-block;
		vertical-align: middle;
	}
	.t1 {
		color: rgba(16, 16, 16, 1);
		font-size: 32upx;
		text-align: left;
		font-family: PingFangSC-regular;
		vertical-align: middle;
	}
	.box1 {
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		color: rgba(16, 16, 16, 1);
		font-size: 28upx;
		font-family: Arial;
		position: relative;
		border-bottom: 2upx solid rgba(229, 229, 229, 1);

		.t2 {
			margin-left: 313upx;
			font-size: 32upx;
			color: rgba(51, 51, 51, 1);
			font-family: Microsoft Yahei;
			vertical-align: middle;
		}
	}
}
.toRight {
	width: 36upx;
	height: 36upx;
	position: absolute;
	right: 57rpx;
	top: 32rpx;
}
.selectShop {
}
</style>

