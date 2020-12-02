<template>
	<view class="container">
		<view class="content padding20">
			<view class="login-type">
				<view v-for="(item,index) in loginTypeList" :key="index" @click="loginType = index" :class="{act: loginType === index}"
				 class="login-type-btn">{{item}}</view>
			</view>
			<view class="input-group" v-if="loginType === 1">
				<view class="input-row border">
					<text class="title">账号：</text>
					<m-input type="text" focus clearable v-model="username" placeholder="请输入账号"></m-input>
				</view>
				<view class="input-row border">
					<text class="title">密码：</text>
					<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
				</view>
				<view class="input-row">
					<text class="title">确认密码：</text>
					<m-input type="password" displayable v-model="confirmPassword" placeholder="请确认密码"></m-input>
				</view>
			</view>
			<view class="input-group" v-else>
				<view class="input-row border">
					<text class="title">账号：</text>
					<m-input class="m-input" type="text" clearable focus v-model="username" placeholder="请输入账号"></m-input>
				</view>
				<view class="input-row">
					<text class="title">密码：</text>
					<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
				</view>
			</view>
			<view class="btn-row" v-if="loginType === 0">
				<button type="primary" class="primary" @tap="bindLogin">登录</button>
			</view>
			<view class="btn-row" v-else>
				<button type="primary" class="primary" @tap="bindLogin">注册</button>
			</view>
			<view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
				<view class="oauth-image" v-for="provider in providerList" :key="provider.value">
					<image :src="provider.image" @tap="loginByWeixin(provider.value)"></image>
					<!-- #ifdef MP-WEIXIN -->
					<button v-if="!isDevtools" open-type="getUserInfo" @getuserinfo="getUserInfo"></button>
					<!-- #endif -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '../../components/m-input.vue'

	let weixinAuthService
	export default {
		components: {
			mInput
		},
		data() {
			return {
				loginType: 0,
				loginTypeList: ['登录', '注册'],
				mobile: '',
				code: '',
				providerList: [],
				hasProvider: false,
				username: '',
				password: '',
				confirmPassword: '',
				positionTop: 0,
				isDevtools: false,
				codeDuration: 0
			}
		},
		computed: mapState(['forcedLogin']),
		onLoad() {
			// #ifdef APP-PLUS
			plus.oauth.getServices((services) => {
				weixinAuthService = services.find((service) => {
					return service.id === 'weixin'
				})
				if (weixinAuthService) {
					this.hasWeixinAuth = true
				}
			});
			// #endif
		},
		methods: {
			...mapMutations(['login']),
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			loginByPwd() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.username.length < 3) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 3 个字符'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				const data = {
					username: this.username,
					password: this.password
				};
				let _self = this;
				console.log("----------------login-----------------")
				console.log("name: "+ data.username)
				console.log("password: "+ data.password)
				// uniCloud.callFunction({
				// 	name: 'user-center',
				// 	data: {
				// 		action: 'login',
				// 		params: data
				// 	},
				// 	success: (e) => {

				// 		console.log('login success', e);

				// 		if (e.result.code == 0) {
				// 			uni.setStorageSync('uniIdToken', e.result.token)
				// 			uni.setStorageSync('username', e.result.username)
				// 			uni.setStorageSync('login_type', 'online')
				// 			_self.toMain(_self.username);
				// 		} else {
				// 			uni.showModal({
				// 				content: e.result.msg,
				// 				showCancel: false
				// 			})
				// 			console.log('登录失败', e);
				// 		}

				// 	},
				// 	fail(e) {
				// 		uni.showModal({
				// 			content: JSON.stringify(e),
				// 			showCancel: false
				// 		})
				// 	}
				// })
			},
			register() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.username.length < 3) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 3 个字符'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				if (this.password !== this.confirmPassword) {
					uni.showToast({
						icon: 'none',
						title: '两次密码输入不一致'
					});
					return;
				}

				const data = {
					username: this.username,
					password: this.password
				}
				console.log("----------------register----------------")
				console.log("name: "+ data.username)
				console.log("password: "+ data.password)
			// 	uniCloud.callFunction({
			// 		name: 'user-center',
			// 		data: {
			// 			action: 'register',
			// 			params: data
			// 		},
			// 		success(e) {
			// 			console.log("注册成功", e);

			// 			if (e.result.code === 0) {
			// 				uni.showToast({
			// 					title: '注册成功'
			// 				});
			// 				uni.setStorageSync('uniIdToken', e.result.token)
			// 				uni.setStorageSync('username', e.result.username)
			// 				uni.reLaunch({
			// 					url: '../main/main',
			// 				});
			// 			} else {
			// 				uni.showModal({
			// 					content: JSON.stringify(e.result),
			// 					showCancel: false
			// 				})
			// 			}
			// 		},
			// 		fail(e) {
			// 			uni.showModal({
			// 				content: JSON.stringify(e),
			// 				showCancel: false
			// 			})
			// 		}
			// 	})
			},
			bindLogin() {
				switch (this.loginType) {
					case 1:
						this.register()
						break;
					case 0:
						this.loginByPwd()
						break;
					default:
						break;
				}
			}
		},
		onReady() {
			this.initPosition();
			// #ifdef MP-WEIXIN
			this.isDevtools = uni.getSystemInfoSync().platform === 'devtools';
			// #endif
		}
	}
</script>


<style>	
	view{
		font-size:16px;
		line-height:2.6;
	}
	
	.padding20 {
		padding: 20px !important;
	}
	
	.input-row .title {
	    width: 100px;
	    padding-left: 15px;
	}
	
	.login-type {
		display: flex;
		justify-content: center;
	}

	.login-type-btn {
		line-height: 30px;
		margin: 0px 15px;
	}

	.login-type-btn.act {
		color: #007aff;
		border-bottom: solid 1px #007aff;
	}

	.send-code-btn {
		width: 120px;
		text-align: center;
		background-color: #007aff;
		color: #FFFFFF;
	}

	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 10px;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		position: relative;
		width: 50px;
		height: 50px;
		border: 1px solid #dddddd;
		border-radius: 50px;
		margin: 0 20px;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 30px;
		height: 30px;
		margin: 10px;
	}

	.oauth-image button {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
</style>
