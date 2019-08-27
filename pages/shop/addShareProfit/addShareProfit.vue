<!--  添加分润  提交审核-->

<template>
	<view class="page">
		<view class="container" v-if="isok">
			<view class="content">
				<view class="rite1">分润比例</view>
				<view class="box1">
					<text class="t1">给平台方服务的结算比例</text>
					<text class="t2">20%</text>
				</view>
				<view class="box1">
					<text class="t1">给平台方商品的结算比例</text>
					<text class="t2">25%</text>
				</view>
				<view class="line"></view>
				<view class="explainBox">
					<text class="tit">说明</text>
					<view class="textarea">
						鉴于宠善堂平台为商家提供了曝光、营销推广等服务，且宠善堂平台为向商家提供该等服务付出了大量的成本，商家通过宠善堂平台完成的交易订单宠善堂将按照交易额收取推广服务费（即服务订单收取20%，商品订单收取25%），为避免歧义，双方进一步明确前述“完成订单”指通过宠善堂平台进行下单的交易。
					</view>
					<!-- <textarea value="" placeholder="双击编辑文本" class="textarea" /> -->
				</view>
			</view>
			<!--  条约 -->
			<view class="lawBox">
				<label class="radio"><radio value="" class="radio" color="#007AFF" :checked="isAgreeLaw" @click="btnAgree" /></label>
				<view class="t1" style="display: inline-block;">
					我已阅读并同意
					<view style="color: #0E5E56; display: inline-block;" @click="toReadLaw">《商家入驻须知》</view>
				</view>
			</view>
			<view class="btnArea"><view class="nextBtn" @click="nextBtn">提交审核</view></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isok: true,
			isAgreeLaw: false,
			storeId: '',
			userid: ''
		};
	},
	onLoad() {
		this.init()
	},
	methods: {
		btnAgree() {
			this.isAgreeLaw = !this.isAgreeLaw;
		},
		toReadLaw() {
			uni.navigateTo({
				url: '../agreement/agreement'
			});
		},
		init() {
			let user = uni.getStorageSync('user');
			this.userid = user.servicerUserId;
			// 查询门店id
			this.$api.selectAllStore(this.userid).then(({ data }) => {
				this.storeId= data.storesInfo[0].storeId;
				uni.setStorageSync('storeId',this.storeId)
				console.log(this.storeId)
			});
		},
		//  提交审核
		nextBtn() {
			let storeId;
			if (this.isAgreeLaw) {
				this.$api.addStoreCheck(this.storeId).then(data => {
					console.log(data);
					if(data.data.code==100000){
						this.$api.showToast('提交门店审核成功');
						setTimeout(()=>{
							uni.navigateTo({
								url:'../storeAudit/storeAudit'
							})
						},1500)
					
					}
				});
			}
			// // 提交成功 跳转到审核界面
			// uni.navigateTo({
			// 	url:'../storeAudit/storeAudit'
			// })
		}
	}
};
</script>

<style lang="less">
.content {
	width: 100%;
	padding-top: 40upx;
	padding-left: 65upx;
}
.btnArea {
	position: absolute;
	bottom: 0;
	width: 100%;
	display: flex;
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
.lawBox {
	position: absolute;
	bottom: 130upx;
	radio {
		margin-left: 140upx;
		width: 32upx;
		height: 32upx;
	}
	.t1 {
		margin-left: 20upx;
		color: rgba(16, 16, 16, 1);
		font-size: 28upx;
		text-align: left;
		font-family: PingFangSC-regular;
	}
}
.explainBox {
	.tit {
		color: rgba(16, 16, 16, 1);
		font-size: 32upx;
		text-align: left;
		font-family: PingFangSC-regular;
		margin-top: 35upx;
		display: block;
	}
	.textarea {
		width: 575upx;
		height: 395upx;
		color: rgba(16, 16, 16, 1);
		font-size: 28upx;
		text-align: left;
		font-family: PingFangSC-regular;
		margin-top: 16upx;
		// padding: 30upx;
	}
}
.box1 {
	height: 90upx;
	line-height: 90upx;
	border: 2upx solid rgba(255, 255, 255, 0);
	.t1 {
		color: rgba(16, 16, 16, 1);
		font-size: 28upx;
		text-align: left;
		font-family: SourceHanSansSC-regular;
	}
	.t2 {
		margin-left: 120upx;

		color: #0e5e56;

		font-size: 28upx;
		text-align: left;
		font-family: SourceHanSansSC-regular;
	}
}
.rite1 {
	color: rgba(16, 16, 16, 1);
	font-size: 32upx;
	text-align: left;
	font-family: PingFangSC-regular;
}
.line {
	width: 640upx;
	height: 3upx;
	background: rgba(234, 234, 234, 1);
	margin-top: 15upx;
}
</style>
