<!-- 消息提醒 -->

<template>
	<view class="page">
		<view class="container" v-if="isok">
			<!-- <view class="today">- 今天 -</view> -->

			<view class="content">
				<!--  预约信息 -->
<!-- 				<view class="box1">
					<image src="../../static/shop/calendar.png" mode="aspectFit" class="icon"></image>
					<view class="infoBox">
						<view class="tit">预约信息</view>
						<view class="info">
							<text class="t1">预约12:00-13:00</text>
							<text class="t2">火化服务</text>
						</view>
						<view class="info2">
							<text class="userName">辛萌AQI</text>
							<text class="time">08:24</text>
						</view>
					</view>
				</view> -->
				<!-- 收款信息 -->
<!-- 				<view class="box1">
					<image src="../../static/shop/calendar.png" mode="aspectFit" class="icon"></image>
					<view class="infoBox">
						<view class="tit">收款信息</view>
						<view class="info"><text class="t1">你收到来着一笔15元的付款</text></view>
						<view class="info2">
							<text class="userName">辛萌AQI</text>
							<text class="time">08:24</text>
						</view>
					</view>
				</view> -->
				<!-- <view class="today">- 昨天 -</view> -->
			</view>
			<!--  底线 -->
			<view class="lineBox" v-if="isBottom">
				<view class="line"></view>
				<text class="t1">我是有底线的</text>
				<view class="line"></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isok: true,
			isBottom:false,
		};
	},
	//  下拉刷新
	onPullDownRefresh() {
		
	},
	//上拉触底函数
	onReachBottom() {
		this.isBottom=true;
	}
};
</script>

<style lang="less">
.lineBox {
	display: flex;
	width: 100%;
	text-align: center;
	position: absolute;
	bottom: 55upx;
	.t1 {
		margin-left: 36upx;
		color: rgba(139, 139, 141, 1);
		font-size: 28upx;
		font-family: Arial;
		vertical-align: middle;
		display: inline-block;
	}
	.line {
		margin-left: 32upx;
		margin-top: 21upx;
		width: 222upx;
		height: 3upx;
		background: #efefef;
		vertical-align: middle;
	}
}
.today {
	margin-top: 10upx;
	color: rgba(153, 153, 153, 1);
	font-size: 28upx;
	text-align: center;
	font-family: Arial;
}
.content {
	.box1 {
		padding: 45upx 32upx;
		display: flex;
		.infoBox {
			margin-left: 20upx;
			.info2 {
				margin-top: 22upx;
				position: relative;
			}
			.userName {
				color: rgba(153, 153, 153, 1);
				font-size: 28upx;
				text-align: left;
				font-family: Arial;
			}
			.time {
				position: absolute;
				left: 250upx;
				top: 11upx;
				color: rgba(153, 153, 153, 1);
				font-size: 24upx;
				text-align: left;
				font-family: Arial;
			}
		}
		.icon {
			width: 40upx;
			height: 40upx;
		}
		.tit {
			width: 115upx;
			height: 40upx;
			line-height: 40upx;
			color: rgba(14, 94, 86, 1);
			font-size: 28upx;
			text-align: left;
			font-family: Arial;
		}
		.info {
			margin-top: 20upx;

			.t1 {
				color: rgba(16, 16, 16, 1);
				font-size: 32upx;
				text-align: left;
				font-family: Arial;
			}
			.t2 {
				color: rgba(153, 153, 153, 1);
				font-size: 28upx;
				text-align: left;
				font-family: Arial;
				margin-left: 90upx;
			}
		}
	}
}
</style>
