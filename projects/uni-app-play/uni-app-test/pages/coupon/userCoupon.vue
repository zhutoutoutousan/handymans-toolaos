<template>
	<view class="app">
		<view class="nav-wrap">
			<mix-nav-bar :navs="navs" :counts="navCounts" :current="navCurrent" @onChange="onNavBarChange"></mix-nav-bar>
		</view>
		<mescroll-body
			ref="mescrollRef" 
			@init="mescrollInit" 
			:top="84" 
			@down="downCallback" 
			:up="upOption" 
			@up="loadData" 
		>
			<view class="coupon-item" :class="{disabled: item.state !== 1}" v-for="(item,index) in list" :key="index">
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
					
					<view v-if="item.state === 1" class="btn center active" @click="toUseCoupon">
						<text>立即使用</text>
					</view>
					<view v-else class="btn center">
						<text>{{ item.state_text }}</text>
					</view>
				</view>
			</view>
		</mescroll-body>
		
		<mix-loading v-if="isLoading" :mask="true"></mix-loading>
	</view>
</template>

<script>
	import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		components: {
			MescrollBody
		},
		mixins: [MescrollMixin], 
		data() {
			return {
				navCounts: [], //订单数量
				navs: [{name: '全部'}, {name: '已使用'}, {name: '已过期'}],
				navCurrent: 0, //当前tab
				upOption:{
					page: {
					 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					 	size: 10 // 每页数据的数量
					},
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
				},
				list: [] //订单列表
			}
		},
		onLoad() {
			
		},
		methods: {
			async loadData(e){
				this.mescroll && this.mescroll.removeEmpty();
				const sendData = {
					state: this.navCurrent,
					offset: (e.num - 1) * e.size,
					limit: e.size
				}
				const res = await this.$request('coupon', 'getUserCouponList', sendData);
				const curList = res.data;
				if(e.num === 1){
					//第一页清空数据重载
					this.list = [];
					this.loaded && curList.forEach(item=> {item.loaded = true})
					if(curList.length > 0){
						uni.pageScrollTo({
							scrollTop: 0,
							duration: 0
						})
					}
				} 
				this.list = this.list.concat(curList); //追加新数据
				this.mescroll.endSuccess(curList.length); //结束加载状态
			},
			//刷新列表
			refreshList(showLoading){
				this.mescroll && this.mescroll.resetUpScroll(false)
				if(showLoading !== false){
					this.isLoading = true;
				}
				this.$store.dispatch('getOrderCount');
			},
			mescrollInit(mescroll){
				this.mescroll = mescroll;
				setTimeout(()=>{
					this.refreshList();
				}, 10)
			},
			//tab切换
			onNavBarChange(current){
				if(this.navCurrent === current){
					return;
				}
				this.navCurrent = current;
				this.refreshList();
			},
			toUseCoupon(){
				uni.switchTab({
					url: '/pages/tabbar/home'
				})
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
		
		&.disabled{
			
			.title{
				color: #999;
			}
			.price{
				color: #bbb;
			}
		}
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
