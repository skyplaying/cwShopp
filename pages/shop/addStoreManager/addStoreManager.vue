<!-- 添加门店负责人 -->

<template>
	<view class="page">
		<view class="container" v-if="isok">
			<view class="content">
				<view class="logoTit">
					负责人信息
					<text class="t2">（必填）</text>
				</view>
				<view class="inputBox">
					<text class="tit1">姓名：</text>
					<input type="text" class="input1" v-model="storeManagerName" placeholder="输入姓名" maxlength="20" />
				</view>
				<view class="inputBox">
					<text class="tit1">年龄：</text>
					<input type="number" class="input1" v-model="storeManagerAge" placeholder="输入年龄" maxlength="10" />
				</view>
				<view class="inputBox" style="position: relative;">
					<text class="tit1">性别：</text>
					<view class="selectGender" @click="cGender">
						<text>{{ gender?gender:'男'}}</text>
						<image src="../../../static/shop/bottomJianTou.png" mode="aspectFit" class="bottomArrows"></image>
					</view>
					<view class="selectPop1 ab0" v-if="isSelectGender">
						<view v-for="(item, index) in genderList" :key="index">
							<view class="s1" @click="sGender(item)">{{ item }}</view>
						</view>
					</view>
				</view>

				<view class="inputBox">
					<text class="tit1">电话：</text>
					<input type="number" class="input1" v-model="storeManagerPhoneNumber" maxlength="20" placeholder="输入电话" />
				</view>
				<view class="inputBox">
					<text class="tit1">身份证号码：</text>
					<input type="number" class="input1" v-model="storemManagerIdentityCardNumber" maxlength="30" style="margin-left: 0;" placeholder="输入身份证号码" />
				</view>

				<view class="uploadBox">
					<view>
						<image src="../../../static/shop/cardPeople.png" class="examImg1" mode="aspectFill"></image>
						<view class="t1">身份人像照</view>
					</view>
					<upload-img :limit="1" :fileClass="type1" :serverUrl="serverUrl" @getImgData="getImgData"></upload-img>
				</view>
				<view class="uploadBox">
					<view class="">
						<image src="../../../static/shop/countryCard.png" class="examImg1" mode="aspectFill"></image>
						<view class="t1">身份国徽照</view>
					</view>
					<upload-img :limit="1" :fileClass="type2" :serverUrl="serverUrl" @getImgData="getImgData"></upload-img>
				</view>
				<view class="uploadBox">
					<view class="">
						<image src="../../../static/shop/keepCard.png" class="examImg1" mode="aspectFill"></image>
						<view class="t1">手持身份证照</view>
					</view>
					<upload-img :limit="1" :fileClass="type3" :serverUrl="serverUrl" @getImgData="getImgData"></upload-img>
				</view>
			</view>
			<view class="btnArea">
				<view class="saveBtn" @click="nextBtn">保存</view>
				<view class="nextBtn" @click="nextBtn">下一步</view>
			</view>
		</view>
	</view>
</template>

<script>
import uploadImg from '../../../components/mc-image-upload/mc-image-upload.vue';
let that;
export default {
	data() {
		return {
			isok: true,
			genderList: ['男', '女'],
			gender:'',
			isSelectGender: false,
			servicerUserId:'',
			storeId:'',
			storeManagerName: '',
			storeManagerGender: 1,
			storeManagerPhoneNumber: '',
			storeManagerAge: '',
			storemManagerIdentityCardNumber: '',
			storeManagerIdentityCardPortraitPictureLink: '',
			storeManagerIdentityCardEmblemPictureLink: '',
			storeManagerIdentityCardHandPictureLink: '',
			serverUrl: 'https://test.qipinke.com/petoutServer_test/api/file/uploadImage',
			type1: 'peoplePhoto',
			type2: 'countryPhoto',
			type3: 'inhandPhoto',
			isSubmitAll:false, //所有信息校验
			isTureName:false,//身份证姓名是否对应实名
			// storeId	是	int	门店id
			// storeManagerName	是	string	门店负责人真实姓名
			// storeManagerAge	是	int	门店负责人年龄
			// storeManagerGender	是	int	门店负责人性别(1男，2女，3未知)
			// storeManagerPhoneNumber	是	string	门店负责人手机号码
			// storemManagerIdentityCardNumber	是	string	门店负责人身份证号码
			// storeManagerIdentityCardPortraitPictureLink	是	string	门店负责人身份证人像照图片链接
			// storeManagerIdentityCardEmblemPictureLink	是	string	门店负责人身份证国徽照图片链接
			// storeManagerIdentityCardHandPictureLink	是	string	门店负责人手持身份证照图片链接
		};
	},
	components: {
		uploadImg
	},
	onLoad() {
		this.init()
		that=this
	},
	methods: {
		init(){
			this.storeId=uni.getStorageSync('storeId');
			if(!this.storeId){
				//  查询storeId
			// this.$api.selectAllStoreByServicerUser()
			console.log(oo)
			}
		},
		// 身份证和姓名实名校验
		checkCardAndName(){
			this.$http.request({
				url: '/api/auth/idCardRealNameVerification',
				data: {
					idCard:this.storemManagerIdentityCardNumber,
					realName:this.storeManagerName,
				},
				success: res => {
					console.log("idCard",res)
					if(res){
						let msg='';
						if(res.data.code!=100000){
						this.$api.showToast('请确认姓名与身份证号码是否一致')
						this.isTureName=false
						}else{
							this.isTureName=true
						}
					}
				},
				fail: () => {},
			});
		},
		sGender(e) {
			this.gender = e;
			if(this.gender=='男'){
				this.storeManagerGender=1;
				}else{
					this.storeManagerGender=2
				}
			this.isSelectGender = false;
		},
		cGender() {
				this.isSelectGender = true;
		},
		getImgData(e) {
			console.log(e);
			// 判断文件类型
			let fileClass = e[1]; //图片类型
			let imgUrl = e[0]; //图片路径
			console.log(fileClass, imgUrl);
			if (fileClass && imgUrl) {
				if (fileClass == this.type1) {
					this.storeManagerIdentityCardPortraitPictureLink = imgUrl;
				} else if (fileClass == this.type2) {
					this.storeManagerIdentityCardEmblemPictureLink = imgUrl;
				} else if (fileClass == this.type3) {
					this.storeManagerIdentityCardHandPictureLink = imgUrl;
				}
			}
		},
		//  校验提交数据完整性
		sureSubmit(){
		 let isCardNo=this.$api.isCardNo(this.storemManagerIdentityCardNumber)
		 let isAge=this.$api.isNumber(this.storeManagerAge) 
		 let isPhone=this.$api.checkAllPhone(this.storeManagerPhoneNumber)
		 if(!isCardNo){
			 this.$api.showToast('身份证号码不正确')
		 }else if(!isAge){
			 this.$api.showToast('年龄须为数字')
		 }else if(!isPhone){
			 this.$api.showToast('电话号码不正确')
		 }	 
		 this.checkCardAndName()

		},
		// 提交
		nextBtn(){
			this.sureSubmit()
			this.$http.request({
				url:'/api/store/saveStoreManagerInfo',
				data:{
					storeId:this.storeId,
					storeManagerName:this.storeManagerName,
					storeManagerGender:this.storeManagerGender,
					storeManagerPhoneNumber:this.storeManagerPhoneNumber,
					storeManagerAge:this.storeManagerAge,
					storemManagerIdentityCardNumber:this.storemManagerIdentityCardNumber,
					storeManagerIdentityCardPortraitPictureLink:this.storeManagerIdentityCardPortraitPictureLink,
					storeManagerIdentityCardEmblemPictureLink:this.storeManagerIdentityCardEmblemPictureLink,
					storeManagerIdentityCardHandPictureLink:this.storeManagerIdentityCardHandPictureLink,
				},
				success: (res) => {
					console.log(res)
					console.log('code',res.data.code)
					if(res.data.code==100000){
						this.$api.showToast('保存门店负责人信息成功')
						setTimeout(()=>{
							// 添加分润
							uni.navigateTo({
								url:'../addShareProfit/addShareProfit'
							})
						},1500)
					}
				},fail() {
					uni.showToast({
						icon:'none',
						title:'系统异常请稍后重试'
					})
				}
			})
		},
	}
};
</script>

<style lang="less">
.content {
	width: 100%;
	padding-left: 60upx;
	padding-top: 20upx;
}

//  下拉框
.selectPop1 {
	width: 170upx;
	border: 1upx solid #888888;
	display: inline-block;
	background: white;
	z-index: 50;
	left: 145rpx;
	position: absolute;
	top: 70rpx;
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
.selectGender {
	width: 168upx;
	height: 80upx;
	line-height: 80upx;
	color: rgba(16, 16, 16, 1);
	font-size: 28upx;
	font-family: Microsoft Yahei;
	margin-left: 85upx;
	position: relative;
	// border: 2upx solid gray;
	.bottomArrows {
		width: 15upx;
		height: 15upx;
		position: absolute;
		left: 125upx;
		top: 30upx;
	}
}
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
.uploadBox {
	display: flex;
	margin-top: 30upx;
	.examImg1 {
		width: 322upx;
		height: 216upx;
		vertical-align: middle;
		margin-top: 11upx;
	}
	.t1 {
		color: rgba(16, 16, 16, 1);
		font-size: 28upx;
		text-align: center;
		font-family: PingFangSC-regular;
	}
	.imageItem,
	.imageUpload {
		width: 296upx;
		height: 216upx;
		// line-height: 40upx;
		border-radius: 8upx;
		background-color: rgba(0, 0, 0, 0.02);
		text-align: center;
		border: 2upx solid rgba(0, 0, 0, 0.15);
		vertical-align: middle;
		margin-left: 36rpx;
		image {
			// margin-left: 36upx;
		}
	}
}
.inputBox {
	display: flex;
	margin-bottom: 10upx;
	.tit1 {
		color: rgba(16, 16, 16, 1);
		font-size: 28upx;
		text-align: left;
		font-family: PingFangSC-regular;
		vertical-align: middle;
		display: inline-block;
		height: 80upx;
		line-height: 80upx;
	}
	.input1 {
		margin-left: 85upx;
		width: 400upx;
		height: 80upx;
		line-height: 80upx;
		color: rgba(136, 136, 136, 1);
		font-size: 28upx;
		text-align: left;
		font-family: Microsoft Yahei;
		border: 2upx solid rgba(255, 255, 255, 0);
		vertical-align: middle;
		display: inline-block;
	}
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
</style>
