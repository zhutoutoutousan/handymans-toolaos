<template>
	<uni-popup ref="popup" type="bottom">
		<view class="wrap">
			<view class="s-header center">
				<text class="btn" @click="close">取消</text>
				<text>请选择优惠券</text>
				<text class="btn" @click="confirm">确定</text>
			</view>
			<scroll-view class="scroll-view" scroll-y="true">
				<view class="coupon-item" v-for="(item,index) in list" :key="index" @click="checkCoupon(item)">
					<view class="con">
						<view class="left">
							<text class="title clamp">{{item.title}}</text>
							<text class="time">有效期至 {{ item.end_time | date('Y-m-d H:i') }}</text>
						</view>
						<view class="right">
							<text class="price">{{item.coupon_money}}</text>
							<text>满{{ item.total_money }}可用</text>
						</view>
						
						<view class="circle l"></view>
						<view class="circle r"></view>
					</view>
					<view class="bot row">
						<text class="tips">平台所有商品可用</text>
						<text v-if="curCoupon._id === item._id" class="mix-icon icon-xuanzhong"></text>
					</view>
				</view>
			</scroll-view>
		</view>
	</uni-popup>
</template>

<script>
	/**
	 * 优惠券选择弹窗
	 * @prop {Array} list 用户可用优惠券列表
	 */
	export default {
		data() {
			return {
				curCoupon: {}
			}
		},
		props: {
			list: {
				type: Array,
				default(){
					return []
				}
			}
		},
		methods: {
			//确定选择
			confirm(){
				this.$emit('confirm', this.curCoupon);
				this.close();
			},
			//选择优惠券
			checkCoupon(item){
				if(this.curCoupon._id === item._id){
					this.curCoupon = {};
				}else{
					this.curCoupon = item;
				}
			},
			open(type){
				this.$refs.popup.open();
			},
			close(){
				this.$refs.popup.close();
			}
		}
	}
</script>

<style scoped lang="scss">
	.wrap{
		padding-bottom: 10rpx;
		border-radius: 16rpx 16rpx 0 0;
		background-color: #f7f7f7;
	}
	.s-header{
		justify-content: space-between;
		padding: 30rpx 0 14rpx;
		font-size: 32rpx;
		color: #333;
		font-weight: 700;
		
		.btn{
			padding: 10rpx 36rpx;
			font-size: 28rpx;
			color: #666;
			font-weight: normal;
		
			&:last-child{
				color: $base-color;
			}
		}
	}
	.scroll-view{
		min-height: 50vh;
		max-height: 70vh;
	}
	.coupon-item{
		display: flex;
		flex-direction: column;
		margin: 20rpx 24rpx;
		background: #fff;
		
		.con{
			display: flex;
			align-items: center;
			position: relative;
			height: 140rpx;
			padding: 0 30rpx;
			
			&:after{
				position: absolute;
				left: 0;
				bottom: 0;
				content: '';
				width: 100%;
				height: 0;
				border-bottom: 1px dashed #e5e5e5;
				transform: scaleY(50%);
			}
		}
		.left{
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			overflow: hidden;
			height: 100rpx;
		}
		.title{
			font-size: 32rpx;
			color: #333;
			margin-bottom: 24rpx;
		}
		.time{
			font-size: 24rpx;
			color: #999;
		}
		.right{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-left: 30rpx;
			font-size: 24rpx;
			color: #666;
			height: 100rpx;
		}
		.price{
			margin-bottom: 14rpx;
			font-size: 50rpx;
			color: $base-color;
			font-weight: 700;
			
			&:before{
				content: '￥';
				font-size: 34rpx;
			}
		}
		.bot{
			height: 72rpx;
			padding: 0 28rpx 0 30rpx;
			
			.tips{
				flex: 1;
				font-size: 24rpx;
				color: #999;
			}
			.icon-xuanzhong{
				font-size: 36rpx;
				color: $base-color;
			}
		}
		
		.circle{
			position: absolute;
			left: -6rpx;
			bottom: -10rpx;
			z-index: 10;
			width: 20rpx;
			height: 20rpx;
			background: #f3f3f3;
			border-radius: 100px;
			
			&.r{
				left: auto;
				right: -6rpx;
			}
		}
	}
</style>
