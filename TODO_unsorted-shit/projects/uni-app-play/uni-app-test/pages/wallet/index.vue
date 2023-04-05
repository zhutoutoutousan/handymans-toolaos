<template>
	<view class="app">
		<view class="card column">
			<text class="tip">钱包余额</text>
			<text class="price">{{ userInfo.money | price(2) }}</text>
		</view>
		
		<view v-if="!openExamine" class="cell row b-b" @click="navTo('recLog')">
			<text class="mix-icon icon-qianbao"></text>
			<text class="tit ">充值</text>
			<text class="mix-icon icon-you"></text>
		</view>
		
		<view class="cell row b-b" @click="navTo('withdraw')">
			<text class="mix-icon icon-tixian"></text>
			<text class="tit ">提现</text>
			<text class="mix-icon icon-you"></text>
		</view>
		<view class="cell row" @click="navTo('moneyLog')">
			<text class="mix-icon icon-wodezhanghu_zijinjilu"></text>
			<text class="tit ">资金记录</text>
			<text class="mix-icon icon-you"></text>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			...mapState(['openExamine', 'userInfo'])
		},
		methods: {
			navTo(url){
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.app{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 10rpx;
	}
	.card{
		width: 680rpx;
		height: 280rpx;
		padding: 40rpx 30rpx;
		margin-bottom: 16rpx;
		background-image: url(~@/static/bg/wallet.png);
		background-size: 100% 100%;
		color: #fff;
		
		.tip{
			font-size: 28rpx;
			line-height: 40rpx;
		}
		.price{
			margin-top: 8rpx;
			font-size: 72rpx;
			line-height: 92rpx;
		}
	}
	.cell{
		width: 100%;
		height: 120rpx;
		padding: 0 40rpx 0 44rpx;
		
		&:after{
			left: 40rpx;
			right: 40rpx;
			border-color: #e8e8e8;
		}
		.tit{
			flex: 1;
			font-size: 30rpx;
			color: #333;
		}
		.mix-icon{
			width: 64rpx;
			font-size: 40rpx;
		}
		.icon-qianbao{
			color: #3ed098;
		}
		.icon-tixian{
			color: #fe7c7a;
		}
		.icon-wodezhanghu_zijinjilu{
			font-size: 42rpx;
			color: #fbbe59;
		}
		.icon-you{
			width: auto;
			font-size: 24rpx;
			color: #999;
		}
	}
	
</style>
