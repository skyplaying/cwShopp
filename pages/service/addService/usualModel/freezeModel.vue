<!--  冷冻服务模板 -->

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
					<input type="number" class="input pr60" v-model="servicePrice" style="left: 100upx;text-align: center;" maxlength="10" placeholder="请输入服务价格" />
					<!-- <view class="units" @click="unitsClick">单位</view> -->
					<view class="selectBox units" @click="unitsClick">
						<text class="text1">{{ selectext ? selectext :'天' }}</text>
						<image src="../../../../static/shop/bottomJianTou.png" mode="aspectFit" class="bottomArrows"></image>
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
import uploadImg from '../../../../components/mc-image-upload/mc-image-upload.vue';
export default {
	data() {
		return {
			isok: true,
			isUnits: '',
			isSelect: false,
			unitsList: ['天'],
			selectext: '',
			//  冷冻 ， 清洁 ，寄存适用
			riskContent:['提供恒温冷存。独立密封包装，保持宠物遗体的完整。方便宠主为爱宠另行选择吉时吉日送别。',
			'不用担心家里人忌讳反对，不用担心小孩或者其他宠物不小心打烂。独立寄存，方便省心，随时可以过来观看。',
			'整理遗容，清洁遗体，让宠物在最干净安详的状态下火化往生。',],
			serverUrl: 'https://test.qipinke.com/petoutServer_test/api/file/uploadImage',
			serviceType: '',
			serviceName: '冷冻服务',
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
			editgoods: '',
			editImgPath: ''
		};
	},
	components: {
		uploadImg
	},
	onLoad(option) {
		that = this;
		//  打印上个页面传递的参数
		console.log(option)
		//  清洁服务
		if(option.type=='clean'){
			this.serviceName='清洁服务'
		}
		that = this;
		this.queryAllStore();
	},
	methods: {
		unitsClick() {
			that.isSelect = true;
		},
		getImgData(e) {
				console.log(e);
				// 判断文件类型
				let fileClass = e[1]; //图片类型
				let imgUrl = e[0]; //图片路径
				console.log(fileClass, imgUrl);
				this.serviceImgLink = imgUrl;
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
					this.$api
						.addService({
							storeId: this.storeId,
							serviceType: this.serviceType || 3,
							serviceName: this.serviceName,
							servicePrice: this.servicePrice,
							servicePriceUnit: this.servicePriceUnit || '无',
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
	margin-left: 435upx;
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
	display: inline-block;
	position: absolute;
	padding-bottom: 30upx;
	margin-top: -19upx;
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
		width: 300upx;
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
