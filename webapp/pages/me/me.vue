<template>

	<view class="container">
		<view class="content">
			<view class="me">
				<view class="me-body">
					<image class="logo" src="/static/img/logo.png"></image>
					<view class="me-title">用户名</view>
				</view>
			</view>
			<view class="button-sp-area">
				<button class="button" hover-class="button-hover" @tap="jumplogin">注册/登录</button>
				<button class="plain" hover-class="plain-hover" @tap="jumphistory">历史记录</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			jumplogin: function(e) {
				uni.navigateTo({
					url: '../login/login'
				})
			},
			jumphistory: function(e) {
				uni.navigateTo({
					url: '../history/history'
				})
			},
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
		margin: 60px auto;
		width: 400upx;
	}

	.me {
		flex: 1;
		flex-direction: column;
	}

	.me-head {
		display: flex;
		flex-direction: row;
		justify-content: center;
		background-color: #BBBBBB;
	}

	.me-title {
		color: #FFFFFF;
		font-size: 18px;
	}

	.me-info {
		color: #B2B2B2;
	}

	.me-body {
		height: 600upx;
		max-height: 350px;
		background-color: rgba(0, 122, 255, 0.6);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.logo {
		max-height: 100px;
		max-width: 100px;
		height: 200rpx;
		width: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 25rpx;
		border-radius: 50px;
	}
</style>
