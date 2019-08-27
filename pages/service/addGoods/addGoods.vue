<!--  添加商品 -->

<template>
	<view class="page">
		<view class="container" v-if="isok">
			<view class="content">
				<view class="box1">
					<text class="t1">商品类型</text>
					<!-- <view class="units" @click="unitsClick">单位</view> -->
					<view class="selectBox units" @click="unitsClick">
						<text class="text1">{{ selectext ? selectext : '选择商品' }}</text>
						<image src="../../../static/shop/bottomJianTou.png" mode="aspectFit" class="bottomArrows"></image>
					</view>
				</view>
				<!--  点击下拉框 -->
				<view class="selectPop" v-if="isSelect">
					<view v-for="(item, index) in goodsTypeList" :key="index">
						<view class="s1" @click="selectUnits(item.goodsTypeName, item.goodsTypeId)">{{ item.goodsTypeName }}</view>
					</view>
				</view>
				<picker :value="index" :range="storeNameList" @change="selectStore">
					<view class="selectShop box1">
						<text class="t1">选择门店</text>
						<text class="t2">{{ storeName }}</text>
						<image src="../../../static/shop/you.png" mode="aspectFit" class="toRight"></image>
					</view>
				</picker>
				<view class="box1">
					<text class="t1">商品名称</text>
					<input type="text" class="input" v-model="goodsName" style="margin-left: 316upx;" placeholder="请输入服务名称" />
				</view>
				<view class="box1">
					<text class="t1">价格</text>
					<input type="text" class="input pr" v-model="goodsPrice" style="" placeholder="请输入服务价格" />
				</view>

				<view class="box2">
					<text class="t1 tit" style="">说明</text>
					<textarea v-model="goodsRemark" placeholder="描述商品卖点，样式等" class="explain" />
				</view>
				<!--  上传图片 -->
				<view class="uploadImgBox">
					<view class="tit">上传图片</view>
					<upload-img :limit="1" class="img" :fileClass="type1" :path="editImgPath" :serverUrl="serverUrl" @getImgData="getImgData"></upload-img>
				</view>

				<!--  添加新规格 -->
				<!-- <view class="addStandard" @click="addStandard">添加新规格</view> -->
			</view>

			<view class="addBtn" @click="addGoodsInfo">添加</view>
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
			goodsTypeList: [],
			selectext: '',
			serverUrl: 'https://test.qipinke.com/petoutServer_test/api/file/uploadImage',
			goodsImageLink: '',
			goodsTypeId: '',
			goodsName: '',
			goodsRemark: '’',
			goodsPrice: '',
			goodsId: '',
			storeName: '',
			storeList: [],
			storesInfo: '',
			storeNameList: [],
			storeId: '',
			editgoods: '',
			editImgPath: '',
			editType: ''
		};
	},

	components: {
		uploadImg
	},
	onLoad(info) {
		that = this;
		console.log(info.type);
		this.editType = info.type;
		if (info.type) {
			this.editgoods = uni.getStorageSync('editgoods');
			let oo = this.editgoods;
			this.goodsId = oo.goodsId;
			this.goodsTypeId = oo.goodsTypeId;
			this.goodsName = oo.goodsName;
			this.goodsPrice = oo.goodsPrice;
			this.goodsRemark = oo.goodsRemark;
			this.goodsImageLink = oo.goodsImageLink;
			this.editImgPath = oo.goodsImageLink;
		}
		this.init();
	},
	methods: {
		init() {
			// this.selectStore()
			this.queryAllStore();
			this.queryAllGoodsType();
		},
		queryAllGoodsType() {
			this.$api.selectAllGoodsTypeInfo({}).then(data => {
				console.log(data);
				this.goodsTypeList = data.data.goodsTypesInfo;
				console.log(this.goodsTypeList);
			});
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
				}
				console.log(this.storeList);
				uni.setStorageSync('storesInfo', data.data.storesInfo);
			});
		},
		selectStore(e) {
			let oo = {};
			let index = e.detail.value;
			this.storeId = this.storeList[index].storeId; //当前选择的商品id
			this.storeName = this.storeList[index].storeName;
			console.log(e);
		},
		getImgData(e) {
			console.log(e);
			// 判断文件类型
			let fileClass = e[1]; //图片类型
			let imgUrl = e[0]; //图片路径
			console.log(fileClass, imgUrl);
			this.goodsImageLink = imgUrl;
		},
		unitsClick() {
			that.isSelect = true;
		},
		selectUnits(e, index) {
			this.goodsTypeId = index;
			console.log('类型', this.goodsTypeId);
			if (e) {
				this.selectext = e;
				setTimeout(() => {
					this.isSelect = false;
				}, 100);
			}
		},
		addGoodsInfo() {
			let isSubmitAll = this.storeId && this.goodsTypeId && this.goodsName && this.goodsPrice && this.goodsRemark && this.goodsImageLink;
			let isPrice = this.$api.isNumber(this.goodsPrice);
			if (!isPrice) {
				this.$api.showToast('价格须为数字');
			}
			console.log(isSubmitAll);
			if (!this.editType) {
				if (isSubmitAll && isPrice) {
					this.$api
						.addGoods({
							storeId: this.storeId,
							goodsTypeId: this.goodsTypeId,
							goodsName: this.goodsName,
							goodsPrice: this.goodsPrice,
							goodsRemark: this.goodsRemark,
							goodsImageLink: this.goodsImageLink
						})
						.then(data => {
							console.log(data);
							if (data.data.code == 100000) {
								this.$api.showToast('添加商品成功');
								uni.navigateTo({
									url: '../postTrade/postTrade'
								});
							}
						});
				} else {
					this.$api.showToast('商品信息不完整');
				}
			} else {
				if (isSubmitAll && isPrice) {
					this.$api
						.updateGoods({
							storeId: this.storeId,
							goodsTypeId: this.goodsTypeId,
							goodsName: this.goodsName,
							goodsPrice: this.goodsPrice,
							goodsRemark: this.goodsRemark,
							goodsImageLink: this.goodsImageLink
						})
						.then(data => {
							console.log(data);
							if (data.data.code == 100000) {
								this.$api.showToast('修改成功');
								uni.navigateTo({
									url: '../postTrade/postTrade'
								});
							}
						});
				} else {
					this.$api.showToast('商品信息不完整');
				}
			}
		}
	}
};
</script>

<style lang="less">
.addStandard {
	width: 670upx;
	height: 90upx;
	margin-left: 10upx;
	line-height: 90upx;
	background-color: rgba(255, 255, 255, 0);
	color: rgba(16, 16, 16, 1);
	font-size: 28upx;
	text-align: center;
	font-family: Arial;
	border: 2upx solid rgba(187, 187, 187, 1);
	margin-top: -120upx;
}
.addBtn {
	margin-left: 40upx;
	margin-top: 72upx;
	width: 670upx;
	height: 90upx;
	line-height: 90upx;
	background-color: rgba(14, 94, 86, 1);
	color: rgba(255, 255, 255, 1);
	font-size: 32upx;
	text-align: center;
	font-family: Microsoft Yahei;
}
.pr {
	position: absolute;
	right: 7rpx;
	top: 21rpx;
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
		.imageItem,
		.imageUpload {
			margin-left: 385upx;
		}
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
		right: 30upx;
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
	width: 245upx;
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
	width: 261upx;
	border: 1upx solid #888888;
	display: inline-block;
	position: absolute;
	right: 25upx;
	background-color: white;
	z-index: 55;
	padding-bottom: 50upx;

	.s1 {
		width: 236upx;
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
