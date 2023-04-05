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
			<view class="notice-item" v-for="(item, index) in list" :key="index">
				<text class="time">{{ item.add_time | friendDate }}</text>
				<view class="content">
					<text class="title">{{ item.name }}</text>
					<view v-if="item.image" class="img-wrapper">
						<image class="pic" :src="item.image" mode="aspectFill"></image>
					</view>
					<view class="introduce-wrap" :class="{'has-pic': item.image}">
						<text class="introduce">{{ item.content }}</text>
					</view>
					<view class="bot b-t" @click="navToDetai(item)">
						<text>查看详情</text>
						<text class="mix-icon icon-you"></text>
					</view>
				</view>
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
					auto: false, // 是否自动加载
					page: {
					 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					 	size: 10 // 每页数据的数量
					},
					noMoreSize: 6
				},
			}
		},
		methods: {
			//加载列表
			async loadList(e){
				const res = await this.$request('notice', 'getList', {
					offset: (e.num - 1) * e.size,
					limit: e.size,
				});
				const curList = res.data;
				if(e.num === 1){
					this.list = [];
				}
				this.list = this.list.concat(curList); //追加新数据
				this.mescroll.endSuccess(curList.length); //结束加载状态
				this.log(curList)
			},
			navToDetai(item){
				this.navTo('/pages/public/article?param=' + JSON.stringify({
					module: 'notice',
					operation: 'getDetail',
					data: {
						id: item._id
					}
				}))
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
<style lang='scss'>
	.app {
		padding-bottom: 30rpx;
	}

	.notice-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.time {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80rpx;
		padding-top: 10rpx;
		font-size: 26rpx;
		color: #7d7d7d;
	}

	.content {
		width: 710rpx;
		padding: 0 24rpx;
		background-color: #fff;
		border-radius: 12rpx;
	}

	.title {
		display: flex;
		align-items: center;
		height: 90rpx;
		font-size: 32rpx;
		color: #303133;
		font-weight: 700;
	}

	.img-wrapper {
		width: 100%;
		height: 280rpx;
		margin-bottom: 16rpx;
		position: relative;
	}

	.pic {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
	}
	.introduce-wrap{
		padding-bottom: 20rpx;
		
		.introduce {
			font-size: 28rpx;
			color: #606266;
			line-height: 40rpx;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 3;
			overflow: hidden;
		}
		&.has-pic .introduce{
			-webkit-line-clamp: 2;
		}
	}

	.bot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 80rpx;
		font-size: 24rpx;
		color: #707070;
		position: relative;
	}

	.icon-you {
		font-size: 24rpx;
	}
</style>
