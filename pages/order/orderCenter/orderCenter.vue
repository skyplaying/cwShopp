<!-- 订单中心 -->
<template>
	<view class="page">
		<view class="container" v-if="isok">
			<!--  选项卡 -->
			<wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange" :textFlex="true" selectClass="tabClass" tabClass="tabNt"></wuc-tab>
			<swiper :current="TabCur ? TabCur : 0" duration="300" @change="swiperChange" style="padding-bottom: 40upx;height: 2000upx;">
				<swiper-item v-for="(item, index) in tabList" :key="index" style="">
					<!--  待处理 -->
					<view class="pending" v-if="index === 0">
						<view class="orderBox">
							<view class="head">
								<view class="status">{{ serviceType ? serviceType : '预约到店' }}</view>
								<view class="" style="margin-left: 25upx;">
									<text class="serviceName">火化服务\n</text>
									<text class="price">￥300</text>
								</view>
								<view class="payStatus">已支付</view>
							</view>

							<view class="orderInfoBox">
								<view class="info">
									<view class="b1">
										<text class="t1">预约时间</text>
										<text class="t2">今天</text>
										<text class="time">13:00-14:00</text>
									</view>
									<view class="b1">
										<text class="t1">联系人</text>
										<text class="t2">李先生</text>
									</view>
									<view class="b1">
										<text class="t1">订单金额</text>
										<text class="t2">150元</text>
									</view>
									<view class="b1">
										<text class="t1">宠物重量</text>
										<text class="t2">5Kg</text>
									</view>
									<view class="b1">
										<text class="t1">宠物类型</text>
										<text class="t2">狗</text>
										<text class="t3">泰迪</text>
									</view>
								</view>
								<!--  宠物头像 -->
								<view class="">
									<image src="../../../static/shop/cstLogo.png" mode="aspectFit" class="petPhoto"></image>
									<text class="petName">天天</text>
								</view>
							</view>

							<view class="orderBtnBox" style="display: flex;">
								<view class="callUser">联系</view>
								<view class="startService">开始服务</view>
							</view>
						</view>
					</view>

					<!--  进行中 -->
					<view v-if="index === 1" class="onDoing">
						<view class="orderDetail">
							<view class="tit1">预订详情</view>
							<view class="infoBox">
								<view class="">
									<text class="t1">联系人</text>
									<text class="t2">林某</text>
								</view>
								<view class="">
									<text class="t1">联系方式</text>
									<text class="t2">111111111</text>
								</view>
								<view class="">
									<text class="t1">订单金额</text>
									<text class="t2">￥600</text>
								</view>
								<view class="" style="margin-top: 26upx;">
									<text class="t1">预订时间</text>
									<text class="t2">
										04-07
										<text class="t3">09:00-12:00</text>
									</text>
								</view>

								<view class="">
									<text class="t1">宠物火化</text>
									<text class="t2">￥480</text>
								</view>
								<view class="">
									<text class="t1">宠物仪式</text>
									<text class="t2">￥2001</text>
								</view>
								<view class="">
									<text class="t1">宠物骨灰盒</text>
									<text class="t2">￥200</text>
								</view>
								<view class="">
									<text class="t1">宠物墓地</text>
									<text class="t2">￥200</text>
								</view>

								<view class="" style="margin-top: 20upx;">
									<text class="t1">订单编号：</text>
									<text class="t2">2154456615454</text>
								</view>
								<view class="">
									<text class="t1">成交时间：</text>
									<text class="t2">
										2017-12-04
										<text class="t3">15:44:36</text>
									</text>
								</view>
							</view>
							<view class="petInfo">
								<view class="tit1">宠物信息</view>
								<view class="" style="display: flex;">
									<image src="../../../static/shop/cstLogo.png" mode="aspectFit" class="petImg"></image>
									<view class="petInfoBox">
										<view class="petName">天天</view>
										<view class="info">
											<view class="">
												<text>狗</text>
												<text class="t1">泰迪</text>
											</view>
											<view class="">
												<text>5Kg</text>
												<text class="" style="margin-left: 100upx;">自然死亡</text>
											</view>
											<view class="">
												<text>死亡时间：</text>
												<text class="t2">2019-08-05</text>
											</view>
											<view class="">
												<text>死亡地点：</text>
												<text class="t2">深圳市南山区科技广场b栋201</text>
											</view>
										</view>
									</view>
								</view>
							</view>
							<view class="btnBox">
								<view class="btn" style="margin-left: 355upx;" @click="">补差</view>
								<view class="btn" style="margin-left: 40upx;" @click="">联系</view>
							</view>
							<!--  上传图片 -->
							<view class="uploadPetImgBox" style="display: flex;">
								<text class="tit">上传图片</text>
								<img-upload :limit="1"></img-upload>
							</view>
							<view class="completeOrder" @click="completeOrder">完成订单</view>
						</view>
					</view>

					<!--  已完成 -->
					<view class="hasComplete" v-if="index === 2">
						
						<view class="orderBox">
							<view class="head">
								<view class="status">{{ serviceType ? serviceType : '预约到店' }}</view>
								<view class="" style="margin-left: 25upx;">
									<text class="serviceName">火化服务\n</text>
									<text class="price">￥300</text>
								</view>
								<!-- <view class="payStatus">已支付</view> -->
							</view>
						
							<view class="orderInfoBox">
								<view class="info">
									<view class="b1">
										<text class="t1">预约时间</text>
										<text class="t2">今天</text>
										<text class="time">13:00-14:00</text>
									</view>
									<view class="b1">
										<text class="t1">联系人</text>
										<text class="t2">李先生</text>
									</view>
									<view class="b1">
										<text class="t1">订单金额</text>
										<text class="t2">150元</text>
									</view>
									<view class="b1">
										<text class="t1">宠物重量</text>
										<text class="t2">5Kg</text>
									</view>
									<view class="b1">
										<text class="t1">宠物类型</text>
										<text class="t2">狗</text>
										<text class="t3">泰迪</text>
									</view>
								</view>
								<!--  宠物头像 -->
								<view class="">
									<image src="../../../static/shop/cstLogo.png" mode="aspectFit" class="petPhoto"></image>
									<text class="petName">天天</text>
								</view>
							</view>
						
							<view class="orderBtnBox" style="display: flex;">
								<view class="callUser" style="margin-left: 570upx;" @click="callUser">联系</view>
								<!-- <view class="startService">开始服务</view> -->
							</view>
						</view>
						
						
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
import WucTab from '@/components/wuc-tab/wuc-tab.vue';
import imgUpload from '../../../components/mc-image-upload/mc-image-upload.vue';
export default {
	data() {
		return {
			isok: true,
			TabCur: 0,
			tabList: [{ name: '待处理' }, { name: '进行中' }, { name: '已完成' }]
		};
	},
	components: {
		WucTab,
		imgUpload
	},
	methods: {
		tabChange(index) {
			this.TabCur = index;
		},
		callUser(){
			
		},
	}
};
</script>

<style lang="less">
.onDoing {
	padding: 30upx;
	width: 100%;
	.tit1 {
		height: 90upx;
		line-height: 90upx;
		color: rgba(16, 16, 16, 1);
		font-size: 28upx;
		text-align: left;
		font-family: PingFangSC-bold;
	}
	.infoBox > view {
		padding: 7upx 0;
	}
	.completeOrder {
		margin-left: 95upx;
		margin-top: 102upx;
		width: 485upx;
		height: 90upx;
		line-height: 90upx;
		border-radius: 5px;
		background-color: rgba(14, 94, 86, 1);
		color: rgba(255, 255, 255, 1);
		font-size: 14px;
		text-align: center;
		font-family: Arial;
		border: 1px solid rgba(255, 255, 255, 0);
	}
	.uploadPetImgBox {
		margin-top: 52upx;
		.imageItem,
		.imageUpload {
			margin-left: 406upx;
		}
		.tit {
			left: 15px;
			top: 760px;
			color: rgba(16, 16, 16, 1);
			font-size: 32upx;
			text-align: left;
			font-family: PingFangSC-regular;
			vertical-align: middle;
			margin-top: 65upx;
		}
	}
	.btnBox {
		margin-top: 20upx;
		display: flex;
		.btn {
			width: 150upx;
			height: 60upx;
			line-height: 60upx;
			border-radius: 10upx;
			background-color: rgba(255, 255, 255, 0);
			color: rgba(14, 94, 86, 1);
			font-size: 28upx;
			text-align: center;
			font-family: Arial;
			border: 2upx solid rgba(14, 94, 86, 1);
		}
	}
	.petInfo {
		padding-bottom: 62upx;
		border-bottom: 3upx solid rgba(229, 229, 229, 1);
		.petImg {
			width: 70upx;
			height: 70upx;
			border-radius: 50upx;
		}
		.petInfoBox {
			margin-top: 12upx;
			margin-left: 50upx;
			.info > view {
				padding: 10upx 0;
			}
			.info {
				color: rgba(102, 102, 102, 1);
				font-size: 24upx;
				text-align: left;
				font-family: PingFangSC-regular;
				.t1 {
					margin-left: 128upx;
				}
				.t2 {
					margin-left: 15upx;
				}
			}
			.petName {
				color: rgba(16, 16, 16, 1);
				font-size: 32upx;
				text-align: left;
				font-family: PingFangSC-regular;
			}
			.t1 {
				color: rgba(102, 102, 102, 1);
				font-size: 24upx;
				text-align: left;
				font-family: PingFangSC-regular;
			}
			.t2 {
				left: 150px;
				top: 534px;
				width: 24px;
				height: 17px;
				color: rgba(102, 102, 102, 1);
				font-size: 12px;
				text-align: left;
				font-family: PingFangSC-regular;
			}
		}
	}
	.infoBox {
		color: rgba(102, 102, 102, 1);
		font-size: 28upx;
		text-align: left;
		font-family: PingFangSC-regular;
		padding-bottom: 10upx;
		border-bottom: 2upx solid rgba(229, 229, 229, 1);
		.t1 {
		}
		.t2 {
			position: absolute;
			left: 210upx;
		}
		.t3 {
			margin-left: 15upx;
		}
	}
}
.tabClass {
	color: rgba(14, 94, 86, 1);
	font-size: 32upx;
	text-align: center;
	font-family: Microsoft Yahei;
}
.tabNt {
	color: rgba(0, 0, 0, 1);
	font-size: 32upx;
	text-align: center;
	font-family: Microsoft Yahei;
}
.orderBtnBox {
	margin-top: 20upx;
	.callUser {
		margin-left: 380upx;
		width: 150upx;
		height: 60upx;
		line-height: 60upx;
		border-radius: 8upx;
		background-color: rgba(255, 255, 255, 1);
		color: rgba(136, 136, 136, 1);
		font-size: 28upx;
		text-align: center;
		font-family: Microsoft Yahei;
		border: 2upx solid rgba(229, 229, 229, 1);
	}
	.startService {
		margin-left: 40upx;
		width: 150upx;
		height: 60upx;
		line-height: 60upx;
		border-radius: 8px;
		background-color: rgba(255, 255, 255, 0);
		color: rgba(14, 94, 86, 1);
		font-size: 28upx;
		text-align: center;
		font-family: Microsoft Yahei;
		border: 2upx solid rgba(14, 94, 86, 1);
	}
}
.orderBox {
	padding-top: 36upx;
	margin-top: 22upx;
}
.orderInfoBox {
	color: rgba(51, 51, 51, 1);
	font-size: 28upx;
	text-align: left;
	font-family: PingFangSC-regular;
	margin-left: 30upx;
	display: flex;
	line-height: 40upx;
	position: relative;
	padding: 34upx 0;
	width: 690upx;
	border-bottom: 3upx solid #efefef;
	border-top: 3upx solid #efefef;

	.petPhoto {
		width: 100upx;
		height: 100upx;
		border-radius: 50upx;
		border-radius: 50%;
		position: absolute;
		right: 30upx;
	}
	.petName {
		color: rgba(136, 136, 136, 1);
		font-size: 26upx;
		text-align: left;
		font-family: PingFangSC-regular;
		position: absolute;
		right: 54rpx;
		top: 145rpx;
	}
	.info {
		line-height: 40upx;
		.b1 {
			padding: 8upx 0;
			.t2 {
				position: absolute;
				left: 168upx;
			}
			.time {
				color: #0e5e56;
				font-weight: bold;
				position: absolute;
				left: 266upx;
			}
			.t3 {
				position: absolute;
				left: 273upx;
			}
		}
	}
}
.pending {
	.orderBox {
		padding-top: 36upx;
		margin-top: 22upx;
		.orderInfo {
			padding: 34upx 0;
			width: 690upx;
			border-bottom: 3upx solid #efefef;
			border-top: 3upx solid #efefef;
		}
		.head {
			display: flex;
			.serviceName {
				color: rgba(16, 16, 16, 1);
				font-size: 32upx;
				text-align: left;
				font-family: PingFangSC-regular;
			}
			.price {
				color: rgba(16, 16, 16, 1);
				font-size: 28upx;
				text-align: left;
				font-family: PingFangSC-bold;
				font-weight: bold;
			}
			.payStatus {
				color: rgba(14, 94, 86, 1);
				font-size: 28upx;
				text-align: left;
				font-family: PingFangSC-regular;
				position: absolute;
				right: 30upx;
			}
		}
		.status {
			width: 136upx;
			height: 48upx;
			line-height: 48upx;
			border-radius: 0px 20upx 20upx 0px;
			background-color: rgba(14, 94, 86, 1);
			color: rgba(255, 255, 255, 1);
			font-size: 24upx;
			text-align: center;
			font-family: Arial;
			border: 2upx solid rgba(255, 255, 255, 0);
		}
	}
}

//  已完成 担心改设计
.hasComplete{
	.orderBox {
		padding-top: 36upx;
		margin-top: 22upx;
		.orderInfo {
			padding: 34upx 0;
			width: 690upx;
			border-bottom: 3upx solid #efefef;
			border-top: 3upx solid #efefef;
		}
		.head {
			display: flex;
			.serviceName {
				color: rgba(16, 16, 16, 1);
				font-size: 32upx;
				text-align: left;
				font-family: PingFangSC-regular;
			}
			.price {
				color: rgba(16, 16, 16, 1);
				font-size: 28upx;
				text-align: left;
				font-family: PingFangSC-bold;
				font-weight: bold;
			}
			.payStatus {
				color: rgba(14, 94, 86, 1);
				font-size: 28upx;
				text-align: left;
				font-family: PingFangSC-regular;
				position: absolute;
				right: 30upx;
			}
		}
		.status {
			width: 136upx;
			height: 48upx;
			line-height: 48upx;
			border-radius: 0px 20upx 20upx 0px;
			background-color: rgba(14, 94, 86, 1);
			color: rgba(255, 255, 255, 1);
			font-size: 24upx;
			text-align: center;
			font-family: Arial;
			border: 2upx solid rgba(255, 255, 255, 0);
		}
	}
}
</style>
