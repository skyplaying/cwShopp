<template>
	<view class="page">
		<view class="container" v-if="isok">
			<image src="../../static/shop/indexbanner.png" mode="aspectFill" class="banner"></image>
			<!--  未注册 -->
			<view class="content" v-if="!isRegist">
				<view class="tip">请输入您的手机号码，登录或注册您的宠善堂·商家账号</view>
				<input type="text" v-model="userName" placeholder="输入姓名" maxlength="30" class="input" />
				<input type="number" v-model="phone" placeholder="输入手机号" maxlength="20" class="input" />
				<input type="text" v-model="authCode" placeholder="请输入验证码" maxlength="10" class="yanzCode" />
				<view class="getAuthCode" @click="getAuthCode">{{ count ? count + 's' : '获取验证码' }}</view>

				<view class="submitBtn" @click="signInSubmit">提交</view>
			</view>
			<!--  审核完成 权限开放（已注册） -->
			<view class="openPermission content" v-if="isRegist">
				<text class=" mb50">请输入您的手机号码，登录您的宠善堂·商家账号</text>
				<input type="number" placeholder="输入手机号" maxlength="20" v-model="phone" class="input" />
				<input type="text" placeholder="请输入验证码" maxlength="10" v-model="authCode" class="yanzCode" />
				<view class="getAuthCode" @click="getAuthCode">{{ count ? count + 's' : '获取验证码' }}</view>
				<view class="submitBtn" @click="loginSubmit">提交</view>
			</view>
			<!--  授权弹窗 -->
			<view class="authPop" v-if="!isAuth">
				<view class="v1"><image src="../../static/shop/logo.png" mode="aspectFit" class="logo"></image></view>
				<text class="t1">终于等到您</text>
				<view class="tip1">为了完整体验宠善堂商家，宠善堂需要您的授权。（授权仅用于用户识别，用户昵称与头像）</view>
				<button class="authBtn" open-type="getUserInfo" lang="zh_CN" @click="sureAuth">确认授权</button>
			</view>
			<!--  蒙层 -->
			<view class="maskDiv" v-if="!isAuth"></view>
		</view>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
let that;
export default {
	data() {
		return {
			isok: true,
			isSubmit: false,
			isShenhe: false,
			isMask: false,
			isAuth: false,
			timeShow: true,
			count: '',
			timer: null,
			userName: '',
			phone: '',
			authCode: '',
			isRegist: false, //是否已经注册
			userCode: '',
			userInfo: '',
			islogin: false,
			encryptedData: '',
			encryptedSecret: '',
			iv: ''
		};
	},
	onLoad() {
		that = this;
		that.isShowAuthPop();
		that.loginForCode();
	},
	onShow() {
		// this.toCheckIngPage()
	},
	components: {
		uniPopup
	},
	methods: {
		openPop() {
			this.$refs.authPop.open();
		},
		// 登录获取code 每次请求需要重新获取code
		// 账户审核中即跳转审核海报页
		toCheckIngPage() {
			if (!this.isRegist && !this.isShenhe) {
				uni.navigateTo({
					url: '../auditAccount/auditAccount'
				});
			}
		},
		loginForCode() {
			uni.login({
				success(e) {
					console.log(e);
					that.userCode = e.code;
					console.log(that.userCode);
					uni.getUserInfo({
						success: res => {
							console.log(res);
							that.userInfo = res.userInfo;
							that.encryptedData = res.encryptedData;
							that.iv = res.iv;
							that.loginAuth();
						}
					});
				}
			});
		},
		//  直接获取code
		getLoginCode() {
			uni.login({
				success(e) {
					that.userCode = e.code;
					console.log(that.userCode);
					uni.getUserInfo({
						success: res => {
							console.log(res);
							that.userInfo = res.userInfo;
							that.encryptedData = res.encryptedData;
							that.iv = res.iv;
						}
					});
				}
			});
		},
		//  注册提交
		signInSubmit() {
			let oo = that.checkName();
			let u = that.userInfo;
			// this.getLoginCode()
			uni.login({
				success(e) {
					console.log(e);
					that.userCode = e.code;
					console.log(that.userCode);
					uni.getUserInfo({
						success: res => {
							console.log(res);
							that.userInfo = res.userInfo;
							that.encryptedData = res.encryptedData;
							that.iv = res.iv;
							if (oo) {
								that.$http.request({
									url: '/api/auth/wechatServicerUserRegister',
									data: {
										code: that.userCode,
										realName: that.userName,
										phoneNumber: that.phone,
										verificationCode: that.authCode,
										encryptedData: that.encryptedData,
										encryptedSecret: that.iv
									},
									success: e => {
										console.log(e);
										if (e.data.code == 100000) {
											that.isRegist = true;
											uni.showToast({
												title: '注册成功',
												success() {}
											});
											// 跳转至 提交完成海报审核页面
											uni.navigateTo({
												url: '../auditAccount/auditAccount'
											});
										} else if ((e.data.code = 100304)) {
											uni.showToast({
												icon: 'none',
												title: '验证码错误'
											});
										} else if ((e.data.code = 100308)) {
											uni.showToast({
												icon: 'none',
												title: '请求太频繁，请稍后重试'
											});
										}
									}
								});
							}
						}
					});
				}
			});
		},
		//  查询店铺审核状态
		queryShopAuditStatus() {},
		//  登录提交
		loginSubmit() {
			//  跳转首页失灵 可能是同时打开页面过多

			//校验手机号
			let cc = this.$api.checkPhone(that.phone);
			let u = that.userInfo;

			// this.getLoginCode()
			if (!cc) {
				uni.showToast({
					icon: 'none',
					title: '手机号不正确'
				});
				return;
			} else if (!that.authCode) {
				uni.showToast({
					icon: 'none',
					title: '验证码为空'
				});
				return;
			} else if (that.authCode) {
				uni.login({
					success(e) {
						that.userCode = e.code;
						console.log(that.userCode);
						uni.getUserInfo({
							success: res => {
								console.log(res);
								that.userInfo = res.userInfo;
								that.encryptedData = res.encryptedData;
								that.iv = res.iv;
								that.$http.request({
									url: '/api/auth/wechatServicerUserLogin',
									data: {
										code: that.userCode,
										phoneNumber: that.phone,
										verificationCode: that.authCode,
										encryptedData: that.encryptedData,
										encryptedSecret: that.iv
									},
									success: e => {
										console.log('登录', e.data);
										if (e.data.code == 100000) {
											//  本地缓存用户信息
											uni.setStorageSync('user', e.data.servicerUserInfo);
											uni.setStorageSync('userId', e.data.servicerUserInfo.servicerUserId);
											uni.showToast({
												title: '登录成功'
											});
											// 查询用户的审核状态 进行判断 ，没有门店即跳转添加门店页面

											//  服务者未审核
											if (e.data.servicerUserInfo.servicerState == 1) {
												uni.navigateTo({
													url: '../auditAccount/auditAccount'
												});
												//  通过审核 即可添加门店
											} else if (e.data.servicerUserInfo.servicerState == 2) {
												uni.navigateTo({
													url: '../shop/shopAddIndex/shopAddIndex'
												});
												//  审核未通过
											} else if (e.data.servicerUserInfo.servicerState == 3) {
												uni.navigateTo({
													url: '../shop/storeAudit/storeAudit'
												});
											}
										} else if ((e.data.code = 100304)) {
											uni.showToast({
												icon: 'none',
												title: '验证码错误'
											});
										} else if ((e.data.code = 100308)) {
											uni.showToast({
												icon: 'none',
												title: '请求太频繁，请稍后重试'
											});
										} else {
											uni.showToast({
												title: e.msg
											});
										}
									}
								});
							}
						});
					}
				});
			}
		},
		//校验验证码 (无法校验，后端验证)
		//校验中文姓名
		checkName() {
			let ok = this.$api.checkChinaName(that.userName);
			let cc = this.$api.checkPhone(that.phone);
			if (!ok) {
				uni.showToast({
					title: '姓名输入有误',
					icon: 'none'
				});
				return;
			} else if (!cc) {
				uni.showToast({
					title: '手机号不正确',
					icon: 'none'
				});
				return;
			}
			ok = ok && cc && that.authCode;
			return ok;
		},

		//登录授权   判断用户是否已经成为 服务者用户
		loginAuth() {
			that.$http
				.request({
					url: '/api/auth/wechatServicerUserAuthAndIsServicerUser',
					data: {
						code: that.userCode,
						encryptedData: that.encryptedData,
						encryptedSecret: that.iv
					}
				})
				.then(res => {
					// console.log(res)
					if (res.data.code == 100000) {
						// uni.showToast({
						// 	title: '授权成功'
						// });
						// console.log(res.data.isServicerUser);
						//  已经是服务者
						if (res.data.isServicerUser == 1) {
							that.isRegist = true;

							// 非服务者
						} else if (res.data.isServicerUser == 0) {
							that.isRegist = false;
						}
						that.isok = true;
						uni.hideLoading();
						// console.log(that.isRegist);
					}
				});
		},
		getAuthCode() {
			let tk = that.$api.checkPhone(that.phone);
			// console.log(tk, that.phone);
			if (tk && that.phone) {
				// 验证是否是手机号
				this.getCode();
				// 获取验证码
				that.$http.request({
					url: '/api/sendSms/sendVerificationCode',
					data: {
						phoneNumber: that.phone
					},
					success(e) {
						// console.log(e);
					}
				});
			}
		},
		isShowAuthPop() {
			uni.getUserInfo({
				success(e) {
					that.userInfo = e.userInfo;
					if (e.userInfo) {
						// that.isMask = false;
						that.isAuth = true;
					} else {
						// that.isMask = true;
						that.isAuth = false;
					}
				}
			});
		},
		takePhone() {
			uni.makePhoneCall({
				phoneNumber: 16368111120,
				success(e) {
					// console.log(e);
				},
				fail(e) {
					// console.log(e);
				}
			});
		},
		//  获取用户信息即授权
		sureAuth() {
			uni.getUserInfo({
				success: e => {
					console.log(e);
					if (e.userInfo) {
						that.isMask = false;
						that.isAuth = true;
					}
				}
			});
		},
		getCode() {
			const TIME_COUNT = 60;
			if (!this.timer) {
				this.count = TIME_COUNT;
				this.timeShow = false;
				this.timer = setInterval(() => {
					if (this.count > 0 && this.count <= TIME_COUNT) {
						this.count--;
					} else {
						this.show = true;
						clearInterval(this.timer);
						this.timer = null;
					}
				}, 1000);
			}
		}
	}
};
</script>

<style lang="less">
.banner {
	width: 100%;
	height: 322upx;
}
.authPop {
	width: 560upx;
	height: 565upx;
	line-height: 40upx;
	border-radius: 10upx;
	background: white;
	text-align: center;
	border: 2upx solid rgba(187, 187, 187, 1);
	position: fixed;
	top: 50%;
	left: 50%;
	margin-top: -280upx;
	margin-left: -282upx;
	z-index: 99;
	.authBtn {
		margin-left: 80upx;
		margin-top: 25upx;
		width: 400upx;
		height: 80upx;
		line-height: 80upx;
		border-radius: 10upx;
		background-color: rgba(14, 94, 86, 1);
		color: rgba(255, 255, 255, 1);
		font-size: 28upx;
		text-align: center;
		font-family: Arial;
		border: 2upx solid rgba(255, 255, 255, 0);
	}
	.t1 {
		color: rgba(16, 16, 16, 1);
		font-size: 28upx;
		text-align: center;
		font-family: PingFangSC-regular;
		margin-top: 90upx;
		display: block;
	}
	.tip1 {
		text-align: left;
		color: rgba(153, 153, 153, 1);
		font-size: 28upx;
		font-family: PingFangSC-regular;
		width: 482upx;
		height: 120upx;
		margin-left: 40upx;
		margin-top: 25upx;
	}
	.v1 {
		width: 100%;
		height: 156upx;
		border-radius: 10upx 10upx 0px 0px;
		background: #0e5e56;
		.logo {
			width: 145upx;
			height: 145upx;
			margin-top: 68upx;
		}
	}
}
.openPermission {
}
.mb50 {
	margin-bottom: 130upx;
	display: block;
	font-size: 24upx;
	font-family: PingFangSC-regular;
}
.submitWait {
	.coffee {
		margin-left: 290upx;
		margin-top: 30upx;
		width: 185upx;
		height: 190upx;
	}
	.tip1 {
		color: rgba(16, 16, 16, 1);
		font-size: 24upx;
		text-align: center;
		margin-top: 35upx;
	}
	.tip2 {
		color: rgba(16, 16, 16, 1);
		font-size: 24upx;
		text-align: center;
		margin-top: 18upx;
		.phone {
			color: rgba(14, 94, 86, 1);
			margin-left: 20upx;
		}
	}
}
.content {
	padding: 30upx 0upx;
	margin-left: 24upx;
	width: 702upx;
	.tip {
		font-size: 24upx;
		font-family: PingFangSC-regular;
		margin-bottom: 28upx;
	}
	.input {
		width: 665upx;
		height: 90upx;
		background-color: rgba(255, 255, 255, 0);
		color: #999999;
		font-size: 28upx;
		text-align: left;
		font-family: Microsoft Yahei;
		border: 2upx solid rgba(234, 234, 234, 1);
		margin-bottom: 12upx;
		padding-left: 30upx;
	}
	.yanzCode {
		width: 420upx;
		height: 90upx;
		background-color: rgba(255, 255, 255, 0);
		color: rgba(153, 153, 153, 1);
		font-size: 28upx;
		text-align: left;
		font-family: Microsoft Yahei;
		border: 2upx solid rgba(234, 234, 234, 1);
		display: inline-block;
		padding-left: 30upx;
	}
	.getAuthCode {
		margin-left: 20upx;
		width: 225upx;
		height: 90upx;
		line-height: 90upx;
		background-color: rgba(234, 234, 234, 1);
		color: rgba(14, 94, 86, 1);
		font-size: 30upx;
		text-align: center;
		font-family: Arial;
		display: inline-block;
	}
}
.submitBtn {
	width: 710upx;
	height: 90upx;
	line-height: 90upx;
	background-color: rgba(14, 94, 86, 1);
	color: rgba(255, 255, 255, 1);
	font-size: 32upx;
	text-align: center;
	font-family: Arial;
	margin-top: 60upx;
}
</style>
