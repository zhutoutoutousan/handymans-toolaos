
<template>
	<uni-popup ref="uniPopup" :maskClick="false">
		<view class="wrap center column">
			<image class="pic" src="/static/icon/ad-coupon.png" @click="navTo('/pages/coupon/receiveCoupon', {login: true})"></image>
			<text class="mix-icon icon-close" @click="close"></text>
		</view>
	</uni-popup>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init(){
				return;
				const preShowTime = uni.getStorageSync('homeAdvertModalShowTime');
				if(!this.$util.isLogin({nav: false}) && (!preShowTime || preShowTime < + new Date - 10*60*1000)){
					this.open();
				}
			},
			open(){
				uni.hideTabBar();
				this.$refs.uniPopup.open();
				
				uni.setStorageSync('homeAdvertModalShowTime', + new Date());
			},
			close(){
				uni.showTabBar();
				this.$refs.uniPopup.close();
			}
		}
	}
</script>

<style scoped lang="scss">
	.pic{
		width: 530rpx;
		height: 600rpx;
	}
	.icon-close{
		padding: 20rpx 40rpx;
		margin-top: 20rpx;
		font-size: 48rpx;
		color: #fff;
	}
</style>
