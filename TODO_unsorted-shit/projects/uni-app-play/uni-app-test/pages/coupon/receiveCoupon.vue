<template>
	<view class="app">
		<mescroll-body
			ref="mescrollRef" 
			@init="mescrollInit" 
			:top="0" 
			@down="downCallback" 
			:up="upOption" 
			@up="loadList" 
		>
			<view class="coupon-item" v-for="(item,index) in list" :key="index">
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
					
					<view v-if="item.state === 1" class="btn center active" @click="receiveCoupon(item)">
						<text>立即领取</text>
					</view>
					
					<view v-else class="btn center">
						<text>{{ item.state_text }}</text>
					</view>
				</view>
			</view>
		</mescroll-body>
		<mix-loading v-if="isLoading" :type="2" :mask="true"></mix-loading>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], 
		data() {
			return {
				list: [],
				upOption:{
					auto: false, // 不自动加载
					page: {
					 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					 	size: 15 // 每页数据的数量
					},
					noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
				},
			}
		},
		methods: {
			async loadList(e){
				const res = await this.$request('coupon', 'getList', {
					offset: (e.num - 1) * e.size,
					limit: e.size,
				});
				if(e.num === 1){
					this.list = [];
				}
				const curList = res.data;
				this.list = this.list.concat(curList); //追加新数据
				this.mescroll.endSuccess(curList.length); //结束加载状态
			},
			//领券
			receiveCoupon(item){
				this.$util.throttle(async ()=>{
					const res = await this.$request('coupon', 'receiveCoupon', {
						id: item._id
					}, {
						showLoading: true
					})
					this.$util.msg(res.msg);
					if(res.status === 1){
						item.state = 2;
						item.state_text = '已领取';
					}
				})
			},
			mescrollInit(mescroll){
				this.isLoading = true;
				this.mescroll = mescroll;
				this.mescroll.resetUpScroll(false)
			}
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
</style>
<style scoped lang="scss">
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
			height: 80rpx;
			padding: 0 20rpx 0 30rpx;
			
			.tips{
				flex: 1;
				font-size: 24rpx;
				color: #999;
			}
			.btn{
				min-width: 140rpx;
				height: 54rpx;
				padding: 0 26rpx;
				font-size: 22rpx;
				color: #999;
				background-color: #eee;
				border-radius: 100rpx;
			
				&.active{
					color: #fff;
					background-color: $base-color;
				}
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
