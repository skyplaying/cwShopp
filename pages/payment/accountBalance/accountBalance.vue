<!--  收入明细 -->
<template>
	<view class="page">
		<view class="container" v-if="isok">
			<view class="content">
				<view class="" style="display: flex;">
					<view class="selectBox units" @click="toMonth">
						<text class="text1">{{ selectedMonth ? selectedMonth : '本月' }}</text>
						<image src="../../../static/shop/bottomJianTou.png" mode="aspectFit" class="bottomArrows"></image>
					</view>
					<view class="getTip">
						<text>今日收入</text>
						<text>￥20.00</text>
						<view class="" style="margin-top: 7upx;">本月收入￥{{ thisMonthGet ? thisMonthGet : '500' }}</view>
					</view>
				</view>
				<!--  最近月份 -->
				<view class="selectPop" v-if="isSelectDate">
					<view v-for="(item, index) in mounthList" :key="index">
						<view class="s1" @click="sMonth(item)">{{ item }}</view>
					</view>
				</view>

				<!--  收款明细目录 -->
				<view class="transDetailList">
					<view class="transDetailBox">
						<!--  用户头像 -->
						<image src="../../../static/shop/cstLogo.png" mode="aspectFit" class="userIcon"></image>
						<view class="payinfo" style="margin-left: 38upx;">
							<text class="t1">收款 -张三师傅</text>
							<view class="t2">
								<text>今天</text>
								<text style="margin-left: 16upx;">08:30</text>
							</view>
						</view>
						<view class="moneyCount">7.00</view>
					</view>
					<view class="transDetailBox">
						<!--  用户头像 -->
						<image src="../../../static/shop/cstLogo.png" mode="aspectFit" class="userIcon"></image>
						<view class="payinfo" style="margin-left: 38upx;">
							<text class="t1">收款 -张三师傅</text>
							<view class="t2">
								<text>今天</text>
								<text style="margin-left: 16upx;">08:30</text>
							</view>
						</view>
						<view class="moneyCount">7.00</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isok: true,
			mounthList: [],
			isSelectDate: false,
			selectedMonth: ''
		};
	},
	onLoad() {
		this.getMonthList();
	},
	methods: {
		//  获取最近几个月
		getMonthList() {
			let date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			this.mounthList.push('本月');
			for (var i = 0; i < 7; i++) {
				month = month - 1;
				month = month < 10 ? '0' + month : month;
				let mydate = year.toString() + '-' + month.toString();
				this.mounthList.push(mydate);
				console.log(mydate);
			}

			console.log(this.mounthList);
		},
		toMonth() {
			this.isSelectDate = true;
		},
		sMonth(e) {
			if (e) {
				this.isSelectDate = false;
				this.selectedMonth = e;
			}
		}
	}
};
</script>

<style lang="less">
.content {
	width: 100%;
	padding: 30upx;
}
.transDetailList {
	margin-top: 80upx;
}
.transDetailBox {
	display: flex;
	// height: 160upx;
	padding: 40upx 0;
	width: 100%;
	color: rgba(16, 16, 16, 1);
	// margin-top: 80upx;
	font-size: 28upx;
	vertical-align: middle;
	font-family: Arial;
	.moneyCount {
		color: rgba(16, 16, 16, 1);
		font-size: 36upx;
		text-align: right;
		font-family: Arial;
		position: absolute;
		right: 30upx;
		margin-top: 10upx;
	}
	.payinfo {
		.t1 {
			color: rgba(16, 16, 16, 1);
			font-size: 32upx;
			text-align: left;
			font-family: Arial;
		}
		.t2 {
			color: rgba(153, 153, 153, 1);
			font-size: 24upx;
			text-align: left;
			font-family: Arial;
			margin-top: 8upx;
		}
	}
	.userIcon {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
	}
}
.getTip {
	position: absolute;
	right: 30upx;
	width: 192upx;
	height: 74upx;
	color: rgba(136, 136, 136, 1);
	font-size: 24upx;
	text-align: left;
	font-family: PingFangSC-regular;
}
.units {
	position: relative;
	left: 32upx;
	width: 168upx;
	height: 60upx;
	line-height: 60upx;
	color: rgba(16, 16, 16, 1);
	font-size: 28upx;
	font-family: Microsoft Yahei;
	border: 2upx solid rgba(255, 255, 255, 0);
	.bottomArrows {
		width: 15upx;
		height: 15upx;
		position: absolute;
		left: 135upx;
		top: 18upx;
	}
}
//  下拉框
.selectPop {
	width: 168upx;
	border: 1upx solid #888888;
	display: inline-block;
	background: white;
	z-index: 50;
	position: absolute;
	.s1 {
		width: 143upx;
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
</style>
