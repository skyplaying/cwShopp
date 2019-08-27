<!--  火化服务 -->

<template>
	<view class="page">
		<view class="container" v-if="isok">
			<view class="content">
				<view class="selectShop box1">
					<text class="t1">选择门店</text>
					<text class="t2">宠慕龙岗分店</text>
					<image src="../../../../static/shop/you.png" mode="aspectFit" class="toRight"></image>
				</view>
				<view class="box1">
					<text class="t1">服务名称</text>
					<input type="text" class="input" v-model="serviceName" style="margin-left: 316upx;" placeholder="请输入服务名称" />
				</view>
				<!--  规格框 -->
				<view class="box3">
					<view class="" style="padding: 20upx 0;margin-top: 20upx;">
						<text>规格</text>
						<text style="margin-left: 8upx;">Kg</text>
					</view>
					<view class="inputPriceBox">
						<view class="b1">
							<text>0-5Kg</text>
							<view class="l2">
								￥
								<input type="text" value="480" maxlength="4" class="priceInput" />
							</view>
						</view>
						<view class="b1">
							<text>5-10Kg</text>
							<view class="l2">
								￥
								<input type="text" value="480" maxlength="4" class="priceInput" />
							</view>
						</view>
						<view class="b1">
							<text>10-15Kg</text>
							<view class="l2">
								￥
								<input type="text" value="480" maxlength="4" class="priceInput" />
							</view>
						</view>

						<view class="addPriceBox" v-for="(item,index) in kgList">
							<input type="number" class="fromKg" value="" placeholder="输入重量" />
							<view class="line"></view>
							<view class="toKg"><input type="number" value="" placeholder="输入重量 Kg" /></view>
							<input type="number" class="priceInput" value="" placeholder="价格" />
							<view class="sureBtn">确定</view>
						</view>
						<view class="addPriceBtn" @click="addPriceBtn">+</view>
					</view>
				</view>

				<view class="box2">
					<text class="t1 tit" style="margin-top: 100upx;">说明</text>
					<textarea v-model="riskContent[0]" placeholder="进口1800℃超高温环保火化设备，保证单宠单炉，专业操作确保每一块遗骨都捡拾干净。" class="explain" />
				</view>
				<!--  上传图片 -->
				<view class="uploadImgBox">
					<view class="tit">上传图片</view>
					<upload-img :limit="1" class="img"></upload-img>
				</view>
			</view>

			<view class="addBtn">添加</view>
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
			serviceName: '基础火化服务',
			isUnits: '',
			isSelect: false,
			unitsList: ['天'],
			selectext: '',
			servicePrice: 400,
			kgList:0,
			//  冷冻 ， 清洁 ，寄存适用
			riskContent: [
				'提供恒温冷存。独立密封包装，保持宠物遗体的完整。方便宠主为爱宠另行选择吉时吉日送别。',
				'不用担心家里人忌讳反对，不用担心小孩或者其他宠物不小心打烂。独立寄存，方便省心，随时可以过来观看。',
				'整理遗容，清洁遗体，让宠物在最干净安详的状态下火化往生。'
			],
			serviceType: ''
		};
	},
	components: {
		uploadImg
	},
	onLoad(option) {
		that = this;
		//  打印上个页面传递的参数
		console.log(option.serviceType);
	},
	methods: {
		unitsClick() {
			that.isSelect = true;
		},
		selectUnits(e) {
			if (e) {
				this.selectext = e;
				setTimeout(() => {
					this.isSelect = false;
				}, 100);
			}
		}
		,addPriceBtn(){
			this.kgList++;
		}
	}
};
</script>

<style lang="less">
.box3 {
	color: rgba(16, 16, 16, 1);
	font-size: 28upx;
	font-family: PingFangSC-regular;
	.addPriceBtn{
		width: 400upx;
		height: 72upx;
		margin-left: 175upx;
		margin-top: 26upx;
		line-height: 72upx;
		background-color: rgba(255, 255, 255, 0);
		color: rgba(16, 16, 16, 1);
		font-size: 28upx;
		text-align: center;
		font-family: Arial;
		border: 2upx dashed rgba(187, 187, 187, 1);
	}
	.addPriceBox {
		display: flex;
		position: relative;
		height: 100upx;
		color: rgba(16, 16, 16, 1);
		font-size: 28upx;
		font-family: Arial;
		.fromKg {
			width: 135upx;
			height: 60upx;
		}
		.sureBtn {
			position: absolute;
			right: 70upx;
			top: 10upx;
		}
		.toKg {
			width: 185upx;
			height: 60px;
			input{
				height:60upx;
			}
		}
		.line {
			width: 26upx;
			height: 3upx;
			background: rgba(234, 234, 234, 1);
			margin-top: 27upx;
		}
		.priceInput {
			width: 122upx;
			height: 60upx;
			margin-left: 80upx;
		}
		input {
			display: inline-block;
			vertical-align: middle;
			border-radius: 5px;
			color: rgba(136, 136, 136, 1);
			font-size: 12px;
			text-align: center;
			font-family: Microsoft Yahei;
			border: 1px solid rgba(234, 234, 234, 1);
		}
		text {
			vertical-align: middle;
		}
	}
	.inputPriceBox {
		.b1 {
			display: flex;
			height: 100upx;
			line-height: 100upx;
			color: rgba(16, 16, 16, 1);
			font-size: 28upx;
			font-family: Arial;

			input {
				vertical-align: middle;
				display: inline-block;
			}
			.l2 {
				position: absolute;
				left: 452upx;
			}
			.priceInput {
				width: 130upx;
				margin-top: -3.5upx;
			}
			text {
				vertical-align: middle;
			}
		}
	}
}
.addBtn {
	margin-left: 40upx;
	// margin-top: 50upx;
	margin-bottom: 50upx;
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
