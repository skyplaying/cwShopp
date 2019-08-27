<!--  第一步 -->
<template>
	<view class="page">
		<view class="container" v-if="isok">
			<view class="content">
				<view class="text1" @click="getCo">
					门店信息
					<text class="t2">（必填）</text>
				</view>
				<view class="box1">
					<view class="f1">门店名称</view>
					<input class="input" type="text" v-model="storeName" placeholder="输入门店名称" />
				</view>
				<view class="box1">
					<view class="f1">电话</view>
					<input class="input" type="text" v-model="storePhoneNumber" placeholder="输入电话" />
				</view>
				<view class="box1">
					<view class="f1">门店区域</view>
					<input class="input" type="text" @click="openCity" v-model="storeAddress" placeholder="请选择门店区域" />
					<image src="../../../static/shop/you.png" mode="aspectFit" class="toRight"></image>
				</view>
				<!-- <w-picker mode="region" :defaultVal="[10, 0, 5]" @confirm="onConfirm" ref="getCity"></w-picker> -->
				<view class="box1">
					<view class="f1">详细地址</view>
					<input class="input" type="text" v-model="storeDetailedAddress" placeholder="输入详细地址：如B座1124" />
				</view>
				<view class="f1" style="margin-top: 25upx;">营业时间</view>
				<view class="yingye">
					<!--工作日设置暂时隐藏  -->
					<!-- 					<view class="selectBox units" @click="dateClick">
						<text class="text1">{{ selectDate ? selectDate : '每天' }}</text>
						<image src="../../../static/shop/bottomJianTou.png" mode="aspectFit" class="bottomArrows"></image>
					</view> -->
					<view class="selectBox units" style="margin-left: 59upx;" @click="fromHourCl">
						<text class="text1">{{ fromHour }}</text>
						<image src="../../../static/shop/bottomJianTou.png" mode="aspectFit" class="bottomArrows"></image>
					</view>
					<view class="jian"></view>
					<view class="selectBox units" @click="toHourCl">
						<text class="text1">{{ toHour }}</text>
						<image src="../../../static/shop/bottomJianTou.png" mode="aspectFit" class="bottomArrows"></image>
					</view>
				</view>
				<view class="popBox">
					<!-- 天数-->
					<view class="selectPop ab0" v-if="isSelectDate">
						<view v-for="(item, index) in dateList" :key="index">
							<view class="s1" @click="sDate(item)">{{ item }}</view>
						</view>
					</view>
					<!--  开始时间 -->
					<view class="selectPop ab1" v-if="isSelectFHour">
						<view v-for="(item, index) in hourList" :key="index">
							<view class="s1" @click="sFromHour(item)">{{ item }}</view>
						</view>
					</view>
					<!-- 结束时间 -->
					<view class="selectPop ab2" v-if="isSelectToHour">
						<view v-for="(item, index) in hourList" :key="index">
							<view class="s1" @click="stoHour(item)">{{ item }}</view>
						</view>
					</view>
				</view>

				<!--  商家Logo上传 -->
				<view class="logoTit">
					商家logo
					<text class="t2">（必填）</text>
				</view>
				<view class="logoBox">
					<view class="" style="position: relative;">
						<image src="../../../static/shop/cstLogo.png" mode="aspectFit" class="logoExam"></image>
						<view class="exam">示例</view>
					</view>
					<mc-upload-img class="logoUp" :limit="1" ref="logoImg" :serverUrl="serverUrl" :fileClass="type1" @getImgData="getImgData"></mc-upload-img>
					<!-- <image src="../../../static/shop/addIcon.png" mode="aspectFit" class="add"></image> -->
					<!-- 			<view class="logoText">
					<text class="t1">上传LOGO\n</text>
					<text class="t2">尺寸180X180px</text>
				</view> -->
				</view>
				<view class="logoTit">
					门店信息
					<text class="t2">（必填）</text>
				</view>
				<text class="headTit">上传门头图</text>
				<!--  标准上传块 -->
				<view class="box2">
					<view class="examBox1" style="position: relative;">
						<image src="../../../static/shop/roomImg.jpg" mode="aspectFit" class="commomExamImg"></image>
						<view class="examB">示例</view>
					</view>
					<view class="upload1">
						<mc-upload-img :limit="1" ref="door" :serverUrl="serverUrl" :fileClass="type2" @getImgData="getImgData"></mc-upload-img>
						<!-- <text>上传照片</text> -->
					</view>
				</view>
				<view class="box2">
					<view class="examBox1" style="position: relative;">
						<image src="../../../static/shop/room2.jpg" mode="aspectFit" class="commomExamImg"></image>
						<view class="examB">示例</view>
					</view>
					<view class="upload1">
						<mc-upload-img :limit="1" :fileClass="type2" :serverUrl="serverUrl" @getImgData="getImgData"></mc-upload-img>
						<!-- <text>上传照片</text> -->
					</view>
				</view>
				<view class="tip1">需拍出完整门匾、门框（建议正对门店2米处拍摄）</view>
				<view class="logoTit">
					车辆信息
					<text class="t2">（必填）</text>
				</view>
				<text class="headTit">车前脸照片</text>
				<view class="box2">
					<view class="examBox1" style="position: relative;">
						<image src="../../../static/shop/che.png" mode="aspectFit" class="commomExamImg"></image>
						<view class="examB">示例</view>
					</view>
					<view class="upload1">
						<mc-upload-img :limit="1" :fileClass="type3" :serverUrl="serverUrl" @getImgData="getImgData"></mc-upload-img>
						<!-- <text>上传照片</text> -->
					</view>
				</view>
				<text class="headTit">车牌照片</text>
				<view class="box2">
					<view class="examBox1" style="position: relative;">
						<image src="../../../static/shop/plateNum.png" mode="aspectFit" class="commomExamImg"></image>
						<view class="examB">示例</view>
					</view>
					<view class="upload1">
						<mc-upload-img :limit="1" :fileClass="type4" :serverUrl="serverUrl" @getImgData="getImgData"></mc-upload-img>
						<!-- <text>上传照片</text> -->
					</view>
				</view>
				<view class="logoTit">
					资质信息
					<text class="t2">（营业执照必填，特种行业许可证选填）</text>
				</view>
				<view class="box2">
					<view class="examBox1" style="position: relative;">
						<image src="../../../static/shop/yingyezhizhao.png" mode="aspectFit" class="commomExamImg"></image>
						<view class="examB">示例</view>
					</view>
					<view class="upload1">
						<mc-upload-img :limit="1" :fileClass="type5" :serverUrl="serverUrl" @getImgData="getImgData"></mc-upload-img>
						<!-- <text>上传照片</text> -->
					</view>
				</view>
				<view class="box2">
					<view class="examBox1" style="position: relative;">
						<image src="../../../static/shop/timg.jpg" mode="aspectFit" class="commomExamImg"></image>
						<view class="examB">示例</view>
					</view>
					<view class="upload1">
						<mc-upload-img :limit="1" :fileClass="type6" :serverUrl="serverUrl" @getImgData="getImgData"></mc-upload-img>
						<!-- <text>上传照片</text> -->
					</view>
				</view>
				<view class="logoTit">
					商家介绍
					<text class="t2">（必填）</text>
				</view>
				<textarea value="" class="shopInfoDes" v-model="storeIntroduction" placeholder="商家信息介绍" />
			</view>

			<view class="btnArea">
				<view class="saveBtn" @click="saveFile">保存</view>
				<view class="nextBtn" @click="nextBtn">下一步</view>
			</view>
		</view>
	</view>
</template>

<script>
let that;
import mcUploadImg from '../../../components/mc-image-upload/mc-image-upload.vue';
import wPicker from '../../../components/w-picker/w-picker.vue';
export default {
	data() {
		return {
			isok: true,
			storeLatitude: '',
			storeLongitude: '',
			storeAddress: '',
			storeDetailedAddress: '',
			storePhoneNumber: '',
			storeName: '',
			storeBusinessHours: '',
			isSelectDate: false,
			serverUrl: 'https://test.qipinke.com/petoutServer_test/api/file/uploadImage',
			dateList: ['每天', '工作日'],
			hourList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
			selectDate: '',
			fromHour: 8,
			toHour: 8,
			isSelectFHour: false,
			isSelectToHour: false,
			type1: 'storeLogoPicture',
			type2: 'storePictures',
			type3: 'storeCarHeadPicture',
			type4: 'storeCarNumberPlatePicture',
			type5: 'storeBusinessLicensePicture',
			type6: 'storeSpecialIndustryLicensePicture',
			storeLogoPicture: '',
			storePictures: [],
			storeCarHeadPicture: '',
			storeCarNumberPlatePicture: '',
			storeBusinessLicensePicture: '',
			storeSpecialIndustryLicensePicture: '',
			addressInfo: '',
			storeIntroduction: '',
			isSubmitAll: false
		};
	},
	components: {
		mcUploadImg,
		wPicker
	},
	onLoad() {
		this.getLoaction();
		that = this;
	},
	onShow() {
		this.init();
	},
	methods: {
		// 确认所有文件提交完整
		sureSubmit() {
			let imgAll;
			let fontAll; // 1.图片 门店照片下面的图片非必填，介绍必填
			if (
				that.storeLogoPicture &&
				that.storePictures &&
				that.storeAddress &&
				that.storeDetailedAddress &&
				that.storeLatitude &&
				that.storeLongitude &&
				that.storePhoneNumber &&
				that.storeName &&
				that.storeIntroduction
			) {
				this.isSubmitAll = true;
			} else {
				this.isSubmitAll = false;
			}

			let isPhone = this.$api.checkAllPhone(this.storePhoneNumber);
			// 确认是否选择时间段
			// if (!this.toHour || !this.fromHour) {
			// 	uni.showToast({
			// 		icon: 'none',
			// 		title: '请选择营业时间'
			// 	});
			// }
			if (!isPhone) {
				uni.showToast({
					icon: 'none',
					title: '电话号码不正确'
				});
				return;
			}
			console.log(isPhone);
			console.log(that.storeLogoPicture, that.storePictures);
			// console.log(this.storeLatitude, this.storeLongitude);
			console.log(this.isSubmitAll);
			if (!this.isSubmitAll) {
				uni.showToast({
					icon: 'none',
					title: '门店信息不完善'
				});
			}
		},
		getImgData(e) {
			console.log(e);
			// 判断文件类型
			let fileClass = e[1]; //图片类型
			let imgUrl = e[0]; //图片路径
			console.log(fileClass);
			if (fileClass && imgUrl) {
				if (fileClass == 'storeLogoPicture') {
					that.storeLogoPicture = imgUrl;
					console.log('logo', this.storeLogoPicture);
					// that.storeLogoPicture = imgUrl; //logo图片
				} else if (fileClass == 'storePictures') {
					that.storePictures.push(imgUrl);
					if (that.storePictures.length > 2) {
						// 截取最新的两个图片
						that.storePictures = that.storePictures.splice(0, that.storePictures.length - 2);
					}
				} else if (fileClass == 'storeCarHeadPicture') {
					that.storeCarHeadPicture = imgUrl;
				} else if (fileClass == 'storeCarNumberPlatePicture') {
					that.storeCarNumberPlatePicture = imgUrl;
				} else if (fileClass == 'storeBusinessLicensePicture') {
					that.storeBusinessLicensePicture = imgUrl;
				} else if (this.cc == 'storeSpecialIndustryLicensePicture') {
					that.storeSpecialIndustryLicensePicture = imgUrl;
				}
			}
		},
		onConfirm(fun) {
			console.log(fun.checkArr);
		},
		init() {
			this.createTime();
		},
		getLoaction() {
			uni.getLocation({
				success: res => {
					this.latitude = res.latitude;
					this.longitude = res.longitude;
				}
			});
		},
		openCity() {
			// 暂时不用省市区
			// this.$refs.getCity.show();
			uni.chooseLocation({
				success: e => {
					console.log(e);
					this.addressInfo = e;
					this.storeAddress = '';
					this.storeAddress = e.address + e.name;
					this.storeLatitude = e.latitude;
					this.storeLongitude = e.longitude;
					console.log(this.storeLongitude, this.storeLatitude);
					uni.setStorageSync('address', e);
				}
			});
		},
		dateClick() {
			that.isSelectDate = true;
		},
		fromHourCl() {
			that.isSelectFHour = true;
		},
		toHourCl() {
			that.isSelectToHour = true;
		},
		sDate(e) {
			this.selectDate = e;
			that.isSelectDate = false;
		},
		sFromHour(e) {
			this.fromHour = e;
			this.isSelectFHour = false;
		},
		stoHour(e) {
			this.toHour = e;
			this.isSelectToHour = false;
		},
		//  保存文件
		saveFile() {
			this.nextBtn();
		},
		//下一步
		nextBtn() {
			this.createTime();
			this.sureSubmit();
			// 确认必填项提交完整;
			if (this.isSubmitAll) {
				this.saveShopInfo();
			}
		},
		// 生成选择的时间
		createTime() {
			let time;
			let fhour, thour;
			fhour = this.fromHour + ':00';
			thour = this.toHour + ':00';
			time = fhour + '-' + thour;
			if (time) {
				this.storeBusinessHours = time.toString();
			}
		},
		//  保存门店信息
		saveShopInfo() {
			let servicerUserId;
			let userInfo = uni.getStorageSync('user');
			if (userInfo) {
				servicerUserId = userInfo.servicerUserId;
			}
			let storePicturesLinks = this.storePictures.toString();
			this.$http.request({
				url: '/api/store/saveStoreInfo',
				data: {
					servicerUserId: servicerUserId,
					storeName: this.storeName,
					storePhoneNumber: this.storePhoneNumber,
					storeAddress: this.storeAddress,
					storeDetailedAddress: this.storeDetailedAddress,
					storeLongitude: this.storeLongitude,
					storeLatitude: this.storeLatitude,
					storeBusinessHours: this.storeBusinessHours,
					storeLogoPictureLink: this.storeLogoPicture,
					storePictureLinks: storePicturesLinks,
					storeCarHeadPictureLink: this.storeCarHeadPicture,
					storeCarNumberPlatePictureLink: this.storeCarNumberPlatePicture,
					storeBusinessLicensePictureLink: this.storeBusinessLicensePicture,
					storeSpecialIndustryLicensePictureLink: this.storeSpecialIndustryLicensePicture,
					storeIntroduction: this.storeIntroduction
				},
				success: res => {
					console.log(res);
					if (res) {
						let storeId = res.data.storeId;
						uni.setStorageSync('storId', storeId);
						if (res.data.code == 100000) {
							this.$api.showToast('提交成功');
							setTimeout(() => {
								uni.navigateTo({
									url: '../addStoreManager/addStoreManager'
								});
							}, 2000);
						}
					}
				}
			});
		},

		getCo() {
			uni.chooseLocation({
				success: e => {
					console.log(e);
				}
			});
		}
	}
};
</script>

<style lang="less">
.btnArea {
	width: 100%;
	display: flex;
	margin-top: 100upx;
	.saveBtn {
		flex: 1;
		height: 98upx;
		line-height: 98upx;
		background-color: rgba(255, 255, 255, 1);
		text-align: center;
		border: 2upx solid rgba(14, 94, 86, 1);
		color: rgba(14, 94, 86, 1);
		font-size: 36upx;
		text-align: center;
		font-family: PingFangSC-regular;
	}
	.nextBtn {
		flex: 1;
		height: 98upx;
		line-height: 98upx;
		background-color: rgba(14, 94, 86, 1);
		text-align: center;
		border: 2upx solid rgba(5, 5, 5, 0.08);
		color: rgba(255, 255, 255, 1);
		font-size: 36upx;
		text-align: center;
		font-family: PingFangSC-regular;
	}
}
.yingye {
	position: relative;
	display: flex;
	margin-top: 45upx;
}
.shopInfoDes {
	width: 593upx;
	height: 236upx;
	line-height: 40upx;
	color: rgba(136, 136, 136, 1);
	font-size: 28upx;
	text-align: left;
	font-family: Microsoft Yahei;
	border: 2upx solid rgba(234, 234, 234, 1);
	padding: 20upx;
}
.tip1 {
	width: 296upx;
	height: 72upx;
	color: rgba(102, 102, 102, 1);
	font-size: 24upx;
	text-align: left;
	font-family: SourceHanSansSC-regular;
}
.box2 {
	display: flex;
	.upload1 {
		.imageItem,
		.imageUpload {
			margin-left: 36upx;
			width: 300upx;
			height: 200upx;
			// line-height: 20px;
			border-radius: 8upx;
			background-color: rgba(0, 0, 0, 0.02);
			text-align: center;
			border: 2upx solid rgba(0, 0, 0, 0.15);
			image {
				// margin-left: 36upx;
			}
		}
	}
	.examBox1 {
		width: 300rpx;
		height: 216rpx;

		.commomExamImg {
			width: 300upx;
			height: 216upx;
		}
		.examB {
			position: absolute;
			bottom: 8rpx;
			width: 297rpx;
			height: 54upx;
			line-height: 54upx;
			background-color: rgba(0, 0, 0, 0.42);
			text-align: center;
			color: rgba(255, 255, 255, 1);
			font-size: 28upx;
			text-align: center;
			font-family: PingFangSC-regular;
		}
	}
}
.headTit {
	color: rgba(16, 16, 16, 1);
	font-size: 28upx;
	text-align: left;
	font-family: PingFangSC-regular;
	margin-top: 10upx;
	margin-bottom: 20upx;
}
.logoBox {
	display: flex;
	margin-top: 20upx;
	position: relative;
	// .add{
	// 	position: relative;
	// 	right: 100upx;
	// 	width: 48upx;
	// 	height: 48px;
	// }
	.exam {
		position: absolute;
		bottom: 16upx;
		width: 208upx;
		height: 54upx;
		line-height: 54upx;
		background-color: rgba(0, 0, 0, 0.42);
		text-align: center;
		color: white;
		opacity: 0.5;
		font-size: 28upx;
		font-family: PingFangSC-regular;
	}
	.imageItem,
	.imageUpload {
		width: 208upx;
		height: 208upx;
		border-radius: 8upx;
		background-color: rgba(0, 0, 0, 0.02);
		text-align: center;
		border: 2upx solid rgba(0, 0, 0, 0.15);
		margin-top: -2upx;
		margin-left: 128upx;
	}
	// .imageUpload:before,
	// .imageUpload:after {
	//
	// }
	.logoText {
		width: 208upx;
		position: absolute;
		left: 380upx;
		top: 87upx;
		.t1 {
			color: rgba(0, 0, 0, 0.65);
			font-size: 28upx;
			text-align: center;
			font-family: PingFangSC-regular;
			margin-left: 15upx;
		}
		.t2 {
			color: rgba(0, 0, 0, 0.65);
			font-size: 24upx;
			text-align: center;
			font-family: PingFangSC-regular;
		}
	}
}
.logoExam {
	width: 208upx;
	height: 208upx;
}
.logoTit {
	color: rgba(16, 16, 16, 1);
	font-size: 32upx;
	text-align: left;
	font-family: SourceHanSansSC-regular;
	margin-top: 50upx;
	margin-bottom: 20upx;
	.t2 {
		font-size: 25upx;
	}
}
.jian {
	width: 26upx;
	height: 4upx;
	background: rgba(187, 187, 187, 1);
	margin: 36upx 28upx;
}
.units {
	border-radius: 15upx;
	padding-left: 20upx;
	width: 150upx;
	height: 80upx;
	line-height: 80upx;
	color: rgba(16, 16, 16, 1);
	font-size: 28upx;
	font-family: Microsoft Yahei;
	border: 2upx solid rgba(187, 187, 187, 1);
	position: relative;
	.bottomArrows {
		width: 15upx;
		height: 15upx;
		position: absolute;
		left: 125upx;
		top: 30upx;
	}
}
.popBox {
	position: relative;
}
.ab0 {
	position: absolute;
	top: 0;
}
.ab1 {
	position: absolute;
	left: 59upx;
}
.ab2 {
	position: absolute;
	left: 315upx;
}
//  下拉框
.selectPop {
	width: 170upx;
	border: 1upx solid #888888;
	display: inline-block;
	background: white;
	z-index: 50;
	// position:absolute;
	.s1 {
		width: 147upx;
		height: 35upx;
		text-align: left;
		font-size: 25upx;
		line-height: 35upx;
		border: none;
		padding-left: 25upx;
	}
	.s1:hover {
		background: #108ee9;
		color: white;
	}
}

.content {
	width: 100%;
	padding: 20upx 20upx 20upx 54upx;
}
.toRight {
	position: absolute;
	right: 35upx;
	width: 28upx;
	height: 28upx;
	display: inline-block;
	left: 638rpx;
	top: 35rpx;
}
.text1 {
	color: rgba(16, 16, 16, 1);
	font-size: 32upx;
	text-align: left;
	font-family: PingFangSC-regular;
	.t2 {
		font-size: 25upx;
	}
}
.mapShow {
	width: 612upx;
	height: 370upx;
}
.box1 {
	width: 706px;
	height: 100upx;
	line-height: 100upx;
	border: 2upx solid rgba(255, 255, 255, 0);
	margin-top: 10upx;
	position: relative;
	.input {
		width: 470upx;
		height: 100upx;
		line-height: 100upx;
		color: rgba(136, 136, 136, 1);
		font-size: 28upx;
		text-align: left;
		font-family: Microsoft Yahei;
		display: inline-block;
		position: absolute;
		left: 165upx;
	}
}
.f1 {
	width: 112upx;
	height: 46upx;
	color: rgba(16, 16, 16, 1);
	font-size: 28upx;
	text-align: left;
	font-family: PingFangSC-regular;
	display: inline-block;
}
</style>
