<template>
	<uni-popup ref="uniPopup" type="bottom">
		<view class="content column">
			<image class="icon" src="/static/icon/success.png"></image>
			<text class="price">支付金额：￥{{ price }}</text>
			<text class="tip">{{ tip }}</text>
			<view class="btn center" @click="confirm">
				<text>{{ btnText }}</text>
			</view>
		</view>
	</uni-popup>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props: {
			price: {
				type: Number,
				default: 0
			},
			tip: {
				type: String,
				default: '订单支付成功'
			},
			btnText: {
				type: String,
				default: '查看订单'
			}
		},
		methods: {
			open(){
				this.$refs.uniPopup.open();
			},
			close(){
				this.$refs.uniPopup.close();
			},
			confirm(){
				this.$emit('onConfirm');
			}
		}
	}
</script>

<style scoped lang="scss">
	.content{
		align-items: center;
		width: 100vw;
		height: calc(100vh - var(--window-top));
		padding-top: 100rpx;
		background-color: #fff;
		
		.icon{
			margin-bottom: 70rpx;
			width: 155rpx;
			height: 190rpx;
		}
		.price{
			font-size: 44rpx;
			color: #333;
		}
		.tip{
			font-size: 28rpx;
			color: #999;
			margin-top: 30rpx;
		}
		.btn {
			position: absolute;
			left: 150rpx;
			bottom: 150rpx;
			width: 450rpx;
			height: 88rpx;
			font-size: 32rpx;
			color: #fff;
			letter-spacing: 1px;
			border-radius: 100rpx;
			background-color: $base-color;
		}
	}
</style>
