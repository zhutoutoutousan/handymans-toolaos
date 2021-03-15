<template>
	<view class="content">
		
		<view class="logo-wrapper">
			<image class="logo" src="/static/logo.png"></image>
			<text class="version">版本 v{{ version }}</text>
		</view>

		<view class="list-cell b-b" @click="navToAgreementDetail(1)">
			<text class="cell-tit">用户服务协议</text>
			<text class="mix-icon icon-you"></text>
		</view>
		<view class="list-cell" @click="navToAgreementDetail(2)">
			<text class="cell-tit">隐私权政策</text>
			<text class="mix-icon icon-you"></text>
		</view>
		
		<view class="bus center fix-bot">
			<image class="icon" src="/static/logo-b-w.png"></image>
			<text>国云网络提供技术支持</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				version: ''
			}
		},
		onLoad() {
			this.version = this.$config.version;
		},
		methods: {
			navToAgreementDetail(type){
				this.navTo('/pages/public/article?param=' + JSON.stringify({
					module: 'article',
					operation: 'getAgreement',
					data: {
						type
					}
				}))
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #f8f8f8;
	}
</style>
<style scoped lang='scss'>
	.logo-wrapper{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		height: 320rpx;
		
		.logo{
			width: 140rpx;
			height: 140rpx;
			background-color: #fff;
			border-radius: 16rpx;
		}
		.version{
			font-size: 24rpx;
			color: #888;
			margin-top: 26rpx;
			
		}
	}
	.list-cell{
		display: flex;
		align-items: center;
		padding: 0 40rpx;
		width: 100%;
		height: 94rpx;
		position:relative;
		background: #fff;
		justify-content: center;
		
		&.b-b:after{
			left: 40rpx;
		}
		.icon-you{
			font-size: 24rpx;
			color: #999;
			margin-left: 10rpx;
		}
		.cell-tit{
			flex: 1;
			font-size: 30rpx;
			color: #333;
			margin-right:10rpx;
		}
	}
	.bus{
		display: flex;
		justify-content: center;
		font-size: 26rpx;
		color: #999;
		position: absolute;
		left: 0;
		bottom: 60rpx;
		width: 100%;
		
		.icon{
			width: 40rpx;
			height: 40rpx;
			margin-right: 10rpx;
		}
	}
</style>
