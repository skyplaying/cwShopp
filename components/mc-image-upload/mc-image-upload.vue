<template>
	<view class="imageUploadContainer">
		<view class="imageUploadList">
			<view class="imageItem" :class="index % 4 == 0 ? 'imageItem-row-first' : ''" :key="index" v-for="(path, index) in value">
				<view @click="previewImage(index)" @touchstart="start" @touchmove.stop="move" @touchend="stop" style="width: 100%; height: 100%;">
					<image mode="aspectFill" :src="path" :class="{ dragging: isDragging(index) }" draggable="true" style="width: 100%; height: 100%;"></image>
				</view>
				<view v-if="isShowDel" class="imageDel" @click.stop="deleteImage(index, fileClass)">×</view>
				<view class="firstImageLabel" v-if="isFirstLabel && index == 0 && dragIndex === null">{{ firstImageLabel }}</view>
			</view>
			<view v-if="isShowAdd" class="imageUpload" @click="selectImage"></view>
		</view>
		<image mode="aspectFill" v-if="showMoveImage" class="moveImage" :style="{ left: posMoveImageLeft, top: posMoveImageTop }" :src="moveImagePath"></image>
	</view>
</template>

<script>
var _self;
export default {
	name: 'robby-image-upload',
	props: ['value', 'enableDel', 'enableAdd','path', 'enableDrag', 'serverUrl', 'formData', 'limit', 'fileKeyName', 'showUploadProgress', 'firstImageLabel','fileClass'],
	data() {
		return {
			imageBasePos: {
				x0: -1,
				y0: -1,
				w: -1,
				h: -1
			},
			showMoveImage: false,
			moveImagePath: '',
			moveLeft: 0,
			moveTop: 0,
			deltaLeft: 0,
			deltaTop: 0,
			dragIndex: null,
			targetImageIndex: null,
			//上传的状态
			states: [],
			storePictures:[],//商家图片
			storeBusinessLicensePicture:'',
			storeSpecialIndustryLicensePicture:'',
			storeCarHeadPicture:'',
			storeLogoPicture:'',
			storeCarNumberPlatePicture:'',
			cc:'',
			imageArr:'',
			imgUrl2:'',

		};
	},
	computed: {
		posMoveImageLeft: function() {
			return this.moveLeft + 'px';
		},
		posMoveImageTop: function() {
			return this.moveTop + 'px';
		},
		isShowDel: function() {
			if (this.enableDel === false) {
				return false;
			} else {
				return true;
			}
		},
		isShowAdd: function() {
			if (this.enableAdd === false) {
				return false;
			}
			//  因为组件里value没有数据的时候，为空，没有length值，设置为空数组
			if (!this.value) {
				this.value =[];
			}

			if (this.limit && this.value.length >= this.limit) {
				return false;
			}

			return true;
		},
		isDragable: function() {
			if (this.enableDrag === false) {
				return false;
			} else {
				return true;
			}
		},
		isFirstLabel: function() {
			if (this.firstImageLabel) {
				return true;
			} else {
				return false;
			}
		}
	},
	onLoad() {
		console.log()
	},
	onShow() {
		console.log(this.path)
	},
	methods: {
		getImgUpInfo(){
			return this.imgData;
		},
		selectImage: function() {
			_self = this;
			console.log(_self.limit);
			if (!_self.value) {
				_self.value = [];
			}
			uni.chooseImage({
				count: _self.limit ? _self.limit - _self.value.length : 20, //默认最大图片上传数量
				success: function(e) {
					var imagePathArr = e.tempFilePaths;
					// _self.imageArr= e.tempFilePaths;
					//如果设置了limit限制，在web上count参数无效，这里做判断控制选择的数量是否合要求
					//在非微信小程序里，虽然可以选多张，但选择的结果会被截掉
					//在app里，会自动做选择数量的限制
					if (_self.limit) {
						var availableImageNumber = _self.limit - _self.value.length;
						if (availableImageNumber < imagePathArr.length) {
							uni.showToast({
								title: '图片总数限制为' + _self.limit + '张，当前还可以选' + availableImageNumber + '张',
								icon: 'none',
								mask: false,
								duration: 2000
							});
							return;
						}
					}

					for (let i = 0; i < imagePathArr.length; i++) {
						_self.value.push(imagePathArr[i]);
					}

					//检查服务器地址是否设置，设置即表示图片要上传到服务器
					if (_self.serverUrl) {
						var remoteIndexStart = _self.value.length - imagePathArr.length;
						var promiseWorkList = [];
						var keyname = _self.fileKeyName ? _self.fileKeyName : 'file';
						var completeImages = 0;

						for (let i = 0; i < imagePathArr.length; i++) {
							promiseWorkList.push(
								new Promise((resolve, reject) => {
									let remoteUrlIndex = remoteIndexStart + i;
									uni.uploadFile({
										url: _self.serverUrl, //上床的服务器文件路径
										fileType: 'image',
										formData: _self.formData,
										filePath: imagePathArr[i],
										name: keyname,
										success: function(res) {
											if (res.statusCode === 200) {
												// this.imgData=res.data;
												const data = JSON.parse(res.data);
												_self.value[remoteUrlIndex] = data.accessUrl;

												completeImages++;

												if (_self.showUploadProgress) {
													uni.showToast({
														title: '上传进度：' + completeImages + '/' + imagePathArr.length,
														icon: 'none',
														mask: false,
														duration: 1000
													});
												}
												console.log('success to upload image: ' + res.data);
												// 本地缓存图片地址
												_self.imgUrl2=JSON.parse(res.data).visitAddressLink;
										
												_self.makeImgList(_self.imageArr)
												resolve('success to upload image:' + remoteUrlIndex);
											} else {
												console.log('fail to upload image:' + res.data);
												reject('failt to upload image:' + remoteUrlIndex);
											}
										},
										fail: function(res) {
											console.log('fail to upload image:' + res);
											reject('failt to upload image:' + remoteUrlIndex);
										}
									});
								})
							);
						}
						Promise.all(promiseWorkList).then(result => {
							_self.$emit('add', {
								currentImages: imagePathArr,
								allImages: _self.value
							});
							_self.$emit('input', _self.value);
						});
					} else {
						_self.$emit('add', {
							currentImages: imagePathArr,
							allImages: _self.value
						});
						_self.$emit('input', _self.value);
					}
				}
			});
		},
		// 根据不同来源图片生成对应 图片对象和图片数组
		makeImgList(arr){
			arr=JSON.stringify(arr)	
		    let cc=_self.fileClass;
		   let oo=[];
		   oo.push(_self.imgUrl2,_self.fileClass)
			_self.$emit('getImgData',oo)
			
		},
		deleteImage: function(e,type) {
			var imageIndex = e;
			var deletedImagePath = this.value[imageIndex];
			this.value.splice(imageIndex, 1);
			type=_self.fileClass;
			// if(type=='storePictures'){
			// 	_self.storePictures.splice(imageIndex, 1)
			// }else if(type=='storeLogoPicture'){
			// 	_self.storeLogoPicture=''
			// }else if(type=='storeCarHeadPicture'){
			// 	_self.storeCarHeadPicture=''
			// }else if(type=='storeCarNumberPlatePicture'){
			// 	_self.storeCarNumberPlatePicture=''
			// }else if(type=='storeBusinessLicensePicture'){
			// 	_self.storeBusinessLicensePicture=''
			// }else if(type=='storeSpecialIndustryLicensePicture'){
			// 	_self.storeSpecialIndustryLicensePicture=''
			// }
			this.$emit('delete', {
				currentImage: deletedImagePath,
				allImages: this.value
			});
			this.$emit('input', this.value);
		},
		previewImage: function(e) {
			var imageIndex = e;
			console.log(e);
			uni.previewImage({
				current: this.value[imageIndex],
				//#ifndef MP-ALIPAY
				indicator: 'number',
				loop: 'true',
				//#endif
				urls: this.value
			});
		},
		initImageBasePos: function() {
			let paddingRate = 0.024;
			_self = this;
			//计算图片基准位置
			uni.getSystemInfo({
				success: function(obj) {
					let screenWidth = obj.screenWidth;
					let leftPadding = Math.ceil(paddingRate * screenWidth);
					let imageWidth = Math.ceil((screenWidth - 2 * leftPadding) / 4);

					_self.imageBasePos.x0 = leftPadding;
					_self.imageBasePos.w = imageWidth;
					_self.imageBasePos.h = imageWidth;
				}
			});
		},
		findOverlapImage: function(posX, posY) {
			let rows = Math.floor((posX - this.imageBasePos.x0) / this.imageBasePos.w);
			let cols = Math.floor((posY - this.imageBasePos.y0) / this.imageBasePos.h);
			let indx = cols * 4 + rows;
			return indx;
		},
		isDragging: function(indx) {
			return this.dragIndex === indx;
		},
		start: function(e) {
			if (!this.isDragable) {
				return;
			}
			this.dragIndex = e.currentTarget.dataset.index;
			this.moveImagePath = this.value[this.dragIndex];
			this.showMoveImage = true;

			//计算纵向图片基准位置
			if (this.imageBasePos.y0 === -1) {
				this.initImageBasePos();

				let basePosY = Math.floor(this.dragIndex / 4) * this.imageBasePos.h;
				let currentImageOffsetTop = e.currentTarget.offsetTop;
				this.imageBasePos.y0 = currentImageOffsetTop - basePosY;
			}

			//设置选中图片当前左上角的坐标
			this.moveLeft = e.target.offsetLeft;
			this.moveTop = e.target.offsetTop;
		},
		move: function(e) {
			if (!this.isDragable) {
				return;
			}
			const touch = e.touches[0];
			this.targetImageIndex = this.findOverlapImage(touch.clientX, touch.clientY);

			//初始化deltaLeft/deltaTop
			if (this.deltaLeft === 0) {
				this.deltaLeft = touch.clientX - this.moveLeft;
				this.deltaTop = touch.clientY - this.moveTop;
			}

			//设置移动图片位置
			this.moveLeft = touch.clientX - this.deltaLeft;
			this.moveTop = touch.clientY - this.deltaTop;
		},
		stop: function(e) {
			if (!this.isDragable) {
				return;
			}
			if (this.dragIndex !== null && this.targetImageIndex !== null) {
				if (this.targetImageIndex < 0) {
					this.targetImageIndex = 0;
				}

				if (this.targetImageIndex >= this.value.length) {
					this.targetImageIndex = this.value.length - 1;
				}
				//交换图片
				if (this.dragIndex !== this.targetImageIndex) {
					this.value[this.dragIndex] = this.value[this.targetImageIndex];
					this.value[this.targetImageIndex] = this.moveImagePath;
				}
			}

			this.dragIndex = null;
			this.targetImageIndex = null;
			this.deltaLeft = 0;
			this.deltaTop = 0;
			this.showMoveImage = false;

			this.$emit('input', this.value);
		}
	}
};
</script>

<style>
/* .imageUploadContainer {
		padding: 10upx 5upx;
		margin: 10upx 5upx;
	} */

.dragging {
	opacity: 0.5;
}

.imageUploadList {
	display: flex;
	flex-wrap: wrap;
}

.imageItem,
.imageUpload {
	width: 160upx;
	height: 160upx;
	margin: 10upx 0;
	margin-left: 16upx;
	position: relative;
}

.imageItem-row-first {
	margin-left: 0;
}

.imageDel {
	position: absolute;
	right: 5rpx;
	top: 9rpx;
	/* 	position: relative;
	left: 120upx;
	bottom: 160upx; */
	background-color: rgba(0, 0, 0, 0.5);
	color: #ffffff;
	width: 36upx;
	text-align: center;
	line-height: 36upx;
	border-radius: 60upx;
	font-size: 40upx;
}

.imageItem image,
.moveImage,
.imageCover {
	width: 160upx;
	height: 160upx;
	border-radius: 8upx;
}

/* 注释掉的后面可以改回来 */
.imageUpload {
	/* position: relative; */
	box-sizing: border-box;
	border: 1px solid #d9d9d9;
	border-radius: 8upx;
	/* left: 30upx; */
}

.imageUpload:before,
.imageUpload:after {
	content: ' ';
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	background-color: #d9d9d9;
}

.imageUpload:before {
	width: 4upx;
	height: 79upx;
}

.imageUpload:after {
	width: 79upx;
	height: 4upx;
}

.moveImage {
	position: absolute;
	transform: scale(1.2);
}

.imageCover {
	position: relative;
	left: 0;
	bottom: 178upx;
	width: 100%;
	text-align: center;
	line-height: 160upx;
	background-color: rgba(0, 0, 0, 0.5);
	font-size: 24upx;
	color: white;
}

.firstImageLabel {
	position: relative;
	left: 0;
	bottom: 98upx;
	width: 100%;
	text-align: center;
	line-height: 40upx;
	background-color: #0081ff;
	font-size: 24upx;
	color: white;
	opacity: 0.8;
}
</style>
