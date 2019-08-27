<!--  添加服务 自定义 -->

<template>
	<view class="page">
		<view class="container" v-if="isok">
			<view class="content">
				<picker :value="index" :range="storeNameList" @change="selectStore">
					<view class="selectShop box1">
						<text class="t1">选择门店</text>
						<text class="t2">{{ storeName }}</text>
						<image src="../../../static/shop/you.png" mode="aspectFit" class="toRight"></image>
					</view>
				</picker>
				<view class="box1">
					<text class="t1">服务名称</text>
					<input type="text" class="input" v-model="serviceName" style="margin-left: 316upx;" placeholder="请输入服务名称" />
				</view>
				<view class="box1">
					<text class="t1">价格（元）</text>
					<input type="number" class="input pr60" style="text-align: center; left: 135upx;" v-model="servicePrice" maxlength="10" placeholder="请输入服务价格" />
					<!-- <view class="units" @click="unitsClick">单位</view> -->
					<view class="selectBox units" @click="unitsClick">
						<text class="text1">{{ selectext ? selectext : '单位' }}</text>
						<image src="../../../static/shop/bottomJianTou.png" mode="aspectFit" class="bottomArrows"></image>
					</view>
				</view>
				<!--  点击下拉框 -->
				<view class="selectPop" v-if="isSelect">
					<view v-for="(item, index) in unitsList" :key="index">
						<view class="s1" @click="selectUnits(item)">{{ item }}</view>
					</view>
				</view>
				<view class="box2">
					<text class="t1 tit" style="">说明</text>
					<textarea v-model="serviceRemark" placeholder="多行输入" class="explain" />
				</view>
				<!--  上传图片 -->
				<view class="uploadImgBox">
					<view class="tit">上传图片</view>
					<upload-img :limit="1" class="img" :serverUrl="serverUrl" style="margin-left: 365upx;" @getImgData="getImgData"></upload-img>
				</view>
			</view>

			<view class="addBtn" @click="addService">添加</view>
		</view>
	</view>
</template>

<script>
let that;
import uploadImg from '../../../components/mc-image-upload/mc-image-upload.vue';
export default {
	data() {
		return {
			isok: true,
			isUnits: '',
			isSelect: false,
			unitsList: ['单位', '天', '月', '年', '次'],
			selectext: '',
			serverUrl: 'https://test.qipinke.com/petoutServer_test/api/file/uploadImage',
			// storeId
			// serviceType	是	int	服务类型(1火化服务，2接送服务，3其他)
			// serviceName	是	string	服务名称
			// servicePrice	是	decimal	服务价格
			// servicePriceUnit	是	string	服务价格单位
			// serviceRemark	是	string	服务说明
			// serviceImgLink	是	string	服务图片链接
			// sparkServiceSubPriceData
			serviceId: '',
			serviceType: '',
			serviceName: '',
			servicePrice: '',
			servicePriceUnit: '',
			serviceRemark: '',
			serviceImgLink: '',
			sparkServiceSubPriceData: '',
			storeName: '',
			storeList: [],
			storesInfo: '',
			storeNameList: [],
			storeId: '',
			editService: '',
			editImgPath: '',
			editType:'',
		};
	},
	components: {
		uploadImg
	},
	onLoad(info) {
		that = this;
		this.queryAllStore();
		console.log(info);
		this.editService = uni.getStorageSync('editService');
		let oo = this.editService;
		this.editType=info.type
		if (info.type == 'update') {
			this.serviceId = oo.serviceId;
			this.serviceName = oo.serviceName;
			this.servicePrice = oo.servicePrice;
			this.servicePriceUnit = oo.servicePriceUnit;
			this.serviceImgLink = oo.serviceImageLink;
			this.serviceRemark = oo.serviceRemark;
		}
	},
	methods: {
		getImgData(e) {
			console.log(e);
			// 判断文件类型
			let fileClass = e[1]; //图片类型
			let imgUrl = e[0]; //图片路径
			console.log(fileClass, imgUrl);
			this.serviceImgLink = imgUrl;
		},
		unitsClick() {
			that.isSelect = true;
		},
		addService() {
			//  校验完整
			let price = this.servicePrice;
			let isPrice = this.$api.isNumber(price);
			let isSubmitAll = this.storeName && this.serviceName && this.servicePrice && isPrice && this.serviceRemark && this.serviceImgLink;
			console.log(isSubmitAll, isPrice);

			if (!isPrice) {
				this.$api.showToast('价格须为数字');
				return;
			} else if (!isSubmitAll) {
				this.$api.showToast('服务信息不完整');
			} else {	
				if(!this.editType){
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
										url: '../publishingService/publishingService'
									});
								}, 800);
							}
						});
				}else{
					//  修改服务
					this.$api.updateService({
						storeId: this.storeId,
						serviceId:this.serviceId,
						serviceType: this.serviceType || 3,
						serviceName: this.serviceName,
						servicePrice: this.servicePrice,
						servicePriceUnit: this.servicePriceUnit || '次',
						serviceRemark: this.serviceRemark,
						serviceImgLink: this.serviceImgLink,
						sparkServiceSubPriceData: this.sparkServiceSubPriceData || ''
					}).then(data => {
							console.log(data);
							if (data.data.code == 100000) {
								this.$api.showToast('修改成功');
								setTimeout(() => {
									uni.redirectTo({
										url: '../publishingService/publishingService'
									});
								}, 800);
							}
						});
				}
		
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
		}
	}
};
</script>

<style lang="less">
.addBtn {
	margin-left: 40upx;
	position: absolute;
	bottom: 40upx;
	width: 670upx;
	height: 90upx;
	line-height: 90upx;
	background-color: rgba(14, 94, 86, 1);
	color: rgba(255, 255, 255, 1);
	font-size: 32upx;
	text-align: center;
	font-family: Microsoft Yahei;
}
.imageUpload {
	width: 125upx;
	height: 125upx;
	line-height: 40upx;
	border-radius: 4upx;
	background-color: rgba(240, 240, 240, 1);
	text-align: center;
	border: 2upx solid rgba(229, 229, 229, 1);
}
.uploadImgBox {
	margin-top: 30upx;
	width: 100%;
	height: 170px;
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
	margin-top: -20upx;
	display: inline-block;
	position: absolute;
	right: 25upx;
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
	position: relative;
	right: 180upx;
}

.content {
	padding: 30upx;
	width: 100%;
	.input {
		// margin-left: 137upx;
		width: 235upx;
		height: 60upx;
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
