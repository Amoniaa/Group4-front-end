<template>
	<view class="container">
		<view class="content">
			
		</view>
	</view>
</template>

<script>
	import permision from "@/common/permission.js"
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	// 注册一个进度条
	var _self;
	export default {
		data() {
			return {
				title: 'choose/previewImage',
				image: '',
				resimage: '',
				imageList: [],
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 0,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				percent: 0
			}
		},
		onLoad() {
			_self = this;
		},
		onUnload() {
			this.imageList = [],
				this.sourceTypeIndex = 2,
				this.sourceType = ['拍照', '相册', '拍照或相册'],
				this.sizeTypeIndex = 2,
				this.sizeType = ['压缩', '原图', '压缩或原图'],
				this.countIndex = 0;
		},
		methods: {
			sourceTypeChange: function(e) {
				this.sourceTypeIndex = parseInt(e.detail.value)
			},
			sizeTypeChange: function(e) {
				this.sizeTypeIndex = parseInt(e.detail.value)
			},
			countChange: function(e) {
				this.countIndex = e.detail.value;
			},
			chooseImage: async function() {
				// #ifdef APP-PLUS
				// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
				if (this.sourceTypeIndex !== 2) {
					let status = await this.checkPermission();
					if (status !== 1) {
						return;
					}
				}
				// #endif
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					//count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
					count: 1,
					success: (res) => {
						console.log(res.tempFilePaths);
						this.image = res.tempFilePaths[0];
						this.imageList = this.imageList.concat(res.tempFilePaths);
						console.log("this.image: " + this.image);
						//console.log("this.imageList: " + this.imageList.length);
					},
					fail: (err) => {
						// #ifdef APP-PLUS
						if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
							this.checkPermission(err.code);
						}
						// #endif
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = false;
								switch (this.sourceTypeIndex) {
									case 0:
										authStatus = res.authSetting['scope.camera'];
										break;
									case 1:
										authStatus = res.authSetting['scope.album'];
										break;
									case 2:
										authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
										break;
									default:
										break;
								}
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要从您的相机或相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			},
			clear: function(e) {
				//this.imageList = []
				this.image = ''
			},
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			// cI(){
			//     uni.chooseImage({
			//         count: 1,
			//         sizetype: ['compressed'],
			//         success(res){
			//             // tepFliePaths 保存图片路径
			//             var imgFiles = res.tempFilePaths;
			//             // 因为没写下标， 直接以数组形式输出
			//             console.log(imgFiles)
			//         }
			//     })
			// }
			post: function() {
				var imgFiles = this.image
				console.log("----------------图片信息-----------------")
				console.log(imgFiles)
				// 上传图片

				// 封装成上传对象
				var uper = uni.uploadFile({
					// 需要上传的地址
					url: '#',
					// filePath  需要上传的文件
					filePath: imgFiles,
					name: 'file',
					formData: {
						'user': 'test'
					},
					success(res1) {
						// 显示上传信息
						console.log("----------------上传信息-----------------")
						console.log(res1)
					}
				});
				// onProgressUpdate 上传对象更新的方法
				uper.onProgressUpdate(function(res) {
					// 进度条等于 上传到的进度
					_self.percent = res.progress
					console.log("----------------上传进度-----------------")
					console.log('上传进度:' + res.progress)
					console.log('已经上传的数据长度:' + res.totalBytesSent)
					console.log('预期需要上传的数据总长度:' + res.totalBytesExpectedToSend)
				})
			},
			async checkPermission(code) {
				let type = code ? code - 1 : this.sourceTypeIndex;
				let status = permision.isIOS ? await permision.requestIOS(sourceType[type][0]) :
					await permision.requestAndroid(type === 0 ? 'android.permission.CAMERA' :
						'android.permission.READ_EXTERNAL_STORAGE');
				if (status === null || status === 1) {
					status = 1;
				} else {
					uni.showModal({
						content: "没有开启权限",
						confirmText: "设置",
						success: function(res) {
							if (res.confirm) {
								permision.gotoAppSetting();
							}
						}
					})
				}
			}
		}
	}
</script>

<style>
	.button {
		margin-top: 30upx;
		margin-bottom: 30upx;
		background-color: #007AFF;
		color: #FFFFFF;
	}

	.plain {
		margin-top: 30upx;
		margin-bottom: 30upx;
		background-color: #FFFFFF;
		border: 1px solid #007AFF;
		color: #007AFF;
	}

	.plain-hover {
		margin-top: 30upx;
		margin-bottom: 30upx;
		background-color: #FFFFFF;
		border: 1px solid #999999;
		color: #999999;
	}

	.button-hover {
		margin-top: 30upx;
		margin-bottom: 30upx;
		background-color: #999999;
		color: #FFFFFF;
	}

	.button-sp-area {
		margin: 0 auto;
		width: 400upx;
	}

	/* 上传 */
	.uni-uploader {
		flex: 1;
		flex-direction: column;
	}

	.uni-uploader-head {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.uni-uploader-title {
		color: #55aaff;
		font-size: 38upx;
		margin: 20upx;
	}

	.uni-uploader-info {
		color: #B2B2B2;
	}

	.uni-uploader-body {
		height: 488upx;
		margin: 30px;
	}

	.uni-uploader__files {
		display: flex;
		flex-direction: row;
		justify-content: center;
		flex-wrap: wrap;
	}

	.uni-uploader__file {
		width: 600upx;
		height: 450upx;
	}

	.uni-uploader__img {
		display: block;
		width: 600upx;
		height: 450upx;
		border-radius: 10upx;
	}

	.uni-uploader__input-box {
		position: relative;
		margin: 10upx;
		width: 592upx;
		height: 442upx;
		border: 4upx solid #55aaff;
		border-radius: 10upx;
	}

	.uni-uploader__input-box:before,
	.uni-uploader__input-box:after {
		content: " ";
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		background-color: #55aaff;
	}

	.uni-uploader__input-box:before {
		width: 4upx;
		height: 79upx;
	}

	.uni-uploader__input-box:after {
		width: 79upx;
		height: 4upx;
	}

	.uni-uploader__input-box:active {
		border-color: #999999;
	}

	.uni-uploader__input-box:active:before,
	.uni-uploader__input-box:active:after {
		background-color: #999999;
	}

	.uni-uploader__input {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
</style>
