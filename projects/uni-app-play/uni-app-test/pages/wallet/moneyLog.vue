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
		
			<view class="item b-b" :class="{income: item.money > 0}" v-for="(item, index) in list" :key="index">
				<text class="mix-icon" :class="item.type==='recharge'?'icon-chongzhi':item.type==='withdraw'?'icon-tixian1':'icon-zhangdanmingxi01'"></text>
				<view class="left column">
					<text class="tit clamp">{{ item.title }}</text>
					<text class="time">{{ item.add_time | date('Y-m-d H:i:s') }}</text>
				</view>
				<text v-if="item.money > 0" class="price">+</text>
				<text class="price">{{ item.money | price }}</text>
			</view>
		
		</mescroll-body>
		
		<mix-loading v-if="isLoading" :type="2"></mix-loading>
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
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
				},
			}
		},
		methods: {
			async loadList(e){
				const res = await this.$request('payment', 'getMoneyLog', {
					offset: (e.num - 1) * e.size,
					limit: e.size,
				});
				const curList = res.data;
				if(e.num === 1){
					this.list = [];
				}
				this.list = this.list.concat(curList); //追加新数据
				this.mescroll.endSuccess(curList.length); //结束加载状态
			},
			mescrollInit(mescroll){
				this.isLoading = true;
				this.mescroll = mescroll;
				this.mescroll.resetUpScroll(false)
			}
		}
	}
</script>

<style scoped lang="scss">
	.item{
		display: flex;
		padding: 30rpx 30rpx 30rpx 24rpx;
		background-color: #fff;
		
		&:after{
			left: 30rpx;
			border-color: #e8e8e8;
		}
		.mix-icon{
			flex-shrink: 0;
			width: 72rpx;
			font-size: 52rpx;
			transform: translateY(-6rpx);
		}
		.icon-tixian1{
			color: #fd6663;
		}
		.icon-zhangdanmingxi01{
			color: #ff893a;
		}
		.icon-chongzhi{
			color: #39c585;
		}
		.left{
			flex: 1;
			overflow: hidden;
		}
		.tit{
			font-size: 30rpx;
			color: #333;
			line-height: 1.4;
			margin-bottom: 20rpx;
		}
		.time{
			font-size: 24rpx;
			color: #999;
		}
		.price{
			font-size: 32rpx;
			color: $base-color;
			font-weight: 700;
		}
		&.income{
			
			.price{
				color: #00c700;
			}
			.icon-zhangdanmingxi01{
				color: #39c585;
			}
		}
	}
	
</style>
