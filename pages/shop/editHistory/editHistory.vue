<template>
	<view class="page">
		<view class="container" v-if="isok">
			<view class="content">
				<!--  修改记录显示框 -->
				<view class="recordBox">
					<view class="r1">
						<text class="name">修改商户名</text>
						<text class="auditStatus">驳回</text>
					</view>
					<view class="r2" style="">
						<text class="t1">修改内容</text>
						<text class="t2">将商户名“芳草地中心”改为“芳草地火花中心”</text>
					</view>
					<view class="r2" style="">
						<text class="t1">驳回原因</text>
						<view class="t3">商户名不可含有其他敏感信息，请修改后从新提交</view>
					</view>
					<view class="r2">
						<text class="t1">提交时间</text>
						<view class="t2">
							<text class="">2019-07-13</text>
							<text style="margin-left: 10upx;">22：44：30</text>
						</view>
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
			isok: true
		};
	},
	onLoad() {
		uni.showTabBar({
			
		})
	},
};
</script>

<style lang="less">
.content {
	padding: 10upx 40upx;
	width: 100%;
}
.recordBox {
	.r1 {
		.name {
			color: rgba(16, 16, 16, 1);
			font-size: 28upx;
			text-align: left;
			font-family: PingFangSC-regular;
		}
		.auditStatus {
			color: #0e5e56;
			font-size: 28upx;
			text-align: left;
			font-family: PingFangSC-regular;
			position: absolute;
			right: 40upx;
		}
	}
	.r2 {
		color: rgba(16, 16, 16, 1);
		font-size: 24upx;
		text-align: left;
		font-family: PingFangSC-regular;
		display: flex;
		margin-top: 26upx;
		.t1 {
			// display: inline-block;
		}
		.t2 {
			margin-left: 90upx;
		}
		.t3 {
			// display: inline-block;
			width: 485upx;
			// height: 68upx;
			margin-left: 90upx;
		}
	}
}
</style>
