<template>
	<view class="app">
		<web-view :src="url"></web-view>
		<!-- #ifdef H5 -->
		<view class="back-btn center" @click="navBack">
			<text class="mix-icon icon-fanhui"></text>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	let BackBtn = null;
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad(options) {
			this.url = options.url;
		},
		// #ifdef APP-PLUS
		onReady() {
			this.createBackBtn();
		},
		onUnload() {
			BackBtn.close();
		},
		// #endif
		methods: {
			createBackBtn(){
				BackBtn = new plus.nativeObj.View('BackBtn', {
					bottom: '50px',  
					left: uni.upx2px(640) + 'px',  
					width: uni.upx2px(80) + 'px',  
					height: uni.upx2px(80) + 'px',  
					backgroundColor: 'rgba(0,0,0,0)',
					position:'absolute'
				})
				BackBtn.draw([{
					tag: 'img',
					id: 'backicon',
					src: '/static/icon/back-btn.png',
					position: {
						top: '0px',
						left: '0px',
						width: uni.upx2px(80) + 'px',
						height: uni.upx2px(80) + 'px', 
					}
				}])
				
				BackBtn.show();
				BackBtn.addEventListener('click', ()=>{
					this.navBack();
				},false)
			},
			navBack(){
				uni.navigateBack();
			}
		}
	}
</script>

<style scoped lang="scss">
	.back-btn{
		position: fixed;
		right: 30rpx;
		bottom: 100rpx;
		z-index: 9999;
		width: 80rpx;
		height: 80rpx;
		border-radius: 200rpx;
		background: linear-gradient(to right top, #db2b36, #fa725d);
		/* box-shadow: 2rpx 2rpx 10rpx rgba(228,63,66,.65) */
	}
	.icon-fanhui{
		font-size: 48rpx;
		color: #fff;
	}
</style>
