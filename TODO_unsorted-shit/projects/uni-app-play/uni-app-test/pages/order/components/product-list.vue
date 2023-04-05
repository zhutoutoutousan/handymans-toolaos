<template>
	<view>
		<view class="list" :class="{show: showAll}">
			<view v-for="item in list" :key="item._id" class="item row b-b" @click="navTo('/pages/product/detail?id='+item.sku.product_id)">
				<image class="pic" :src="item.image" mode="aspectFill"></image>
				<view class="right column">
					<text class="title clamp">{{ item.title }}</text>
					<text class="sku">{{ item.sku ? item.sku.name : '' }}</text>
					<view class="price-wrap">
						<text class="price">{{ item.price }}</text>
						<text class="number">x {{ item.number }}</text>
					</view>
				</view>
			</view>
		</view>
		<view v-if="list.length > 2" class="more-btn center" @click="showMore">
			<text>{{ showAll ? '收起' : '查看更多' }}</text>
			<text class="mix-icon icon-xia" :class="{active: showAll}"></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showAll: false
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
			showMore(){
				this.showAll = !this.showAll;
			}
		}
	}
</script>

<style scoped lang="scss">
	.more-btn{
		padding: 16rpx 0 12rpx;
		margin-top: -4rpx;
		font-size: 24rpx;
		color: #999;
		position: relative;
		z-index: 10;
		background-color: #fff;
		
		.icon-xia{
			margin-left: 4rpx;
			font-size: 28rpx;
		}
		.active{
			transform: scale(-1);
		}
	}
	
	.list{
		max-height: 380rpx;
		overflow: hidden;
		
		&.show{
			max-height: 9999rpx;
		}
	}
	.item{
		width: 100%;
		height: 190rpx;
		padding: 24rpx 0 24rpx 24rpx;
		background-color: #fff;
		
		&:after{
			border-color: #e5e5e5;
		}
	}
	.pic{
		flex-shrink: 0;
		width: 140rpx;
		height: 140rpx;
		margin-right: 20rpx;
		border-radius: 6rpx;
	}
	.right{
		flex: 1;
		color: #333;
		overflow: hidden;
	}
	.title{
		margin-right: 24rpx;
		margin-top: 0rpx;
		font-size: 30rpx;
		line-height: 40rpx;
	}
	.sku{
		height: 40rpx;
		margin: 10rpx 0 20rpx;
		line-height: 40rpx;
		font-size: 24rpx;
		color: #888;
	}
	.price-wrap{
		display: flex;
		align-items: baseline;
		padding-right: 20rpx;
	}
	.price{
		margin-right: 16rpx;
		font-size: 28rpx;
		line-height: 1;
		
		&:before{
			content: "￥";
			font-size: 26rpx;
		}
	}
	.number{
		font-size: 26rpx;
		color: #666;
	}
</style>
