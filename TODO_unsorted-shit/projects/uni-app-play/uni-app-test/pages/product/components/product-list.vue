<template>
	<view class="mix-product-list" :class="{'is-row': listType === 'row'}">
		<view
			v-if="listType === 'row'"
			v-for="(item, index) in renderList" 
			:key="index"
			class="list-item row b-b"
			@click="navTo('/pages/product/detail?id=' + item._id)"
		>
			<view class="image-wrapper lazyload lazypic" :class="{loaded: item.loaded}">
				<image 
					:src="item.thumb" 
					mode="aspectFill" 
					lazy-load="true"
					@load="imageOnLoad(item)" 
				></image>
			</view>
			<view class="right column">
				<text class="title clamp">{{ item.title }}</text>
				<text class="sales">月销 {{ item.sales || 0 }}</text>
				<view class="price-wrap row">
					<mix-price-view :price="item.price" :size="34"></mix-price-view>
					<text v-if="item.market_price > item.price" class="m-price">￥{{ item.market_price }}</text>
					<view class="tags row">
						<view class="tag center" v-if="!item.freight_template">
							<text>免邮费</text>
						</view>
						<!-- <view class="tag center orange">
							<text>赠送75积分</text>
						</view> -->
					</view>
				</view>
			</view>
		</view>
		<view
			v-if="listType === 'column'"
			v-for="item in renderList" 
			:key="item._id"
			class="list-item column"
			@click="navTo('/pages/product/detail?id=' + item._id)"
		>
			<view class="image-wrapper lazyload lazypic" :class="{loaded: item.loaded}">
				<image 
					:src="item.thumb" 
					mode="aspectFill" 
					lazy-load="true"
					@load="imageOnLoad(item)" 
				></image>
			</view>
			<text class="title clamp2">{{ item.title }}</text>
			<view class="price-wrap row">
				<mix-price-view :price="item.price"></mix-price-view>
				<text v-if="item.market_price > item.price" class="m-price">{{ item.market_price }}</text>
				<view class="fill"></view>
				<view class="tag center" v-if="!item.freight_template">
					<text>免邮费</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'MixProductList',
		data() {
			return {
				loadType: 'add',//标记加载还是刷新数据
				renderList: []
			};
		},
		props: {
			list: {
				type: Array,
				default(){
					return []
				}
			},
			listType: {
				type: String,
				default: 'column'
			}
		},
		watch: {
			list(list){
				if(this.loadType === 'add'){
					this.renderList = this.renderList.concat(list.slice(this.renderList.length));
				}else{
					this.renderList = list;
				}
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.mix-product-list{
		display:flex;
		justify-content: space-between;
		flex-wrap:wrap;
		width: 710rpx;
		margin-left: 20rpx;
		background-color: #f7f7f7;
		
		&.is-row{
			margin-top: -4rpx;
			border-radius: 8rpx;
			box-shadow: 4rpx 4rpx 20rpx rgba(0,0,0,.06);
			overflow: hidden;
		}
	}
	/* 横向列表 */
	.list-item.row{
		width: 100%;
		padding: 24rpx 0 24rpx 24rpx;
		background-color: #fff;
		
		&:after{
			border-color: #eaeaea;
			left: 6rpx;
			right: 6rpx;
		}
		&:last-child:after{
			border: 0;
		}
		.image-wrapper{
			flex-shrink: 0;
			width: 160rpx;
			height: 160rpx;
			margin-right: 20rpx;
			border-radius: 6rpx;
			overflow: hidden;
			
			image{
				width: 100%;
				height: 100%;
			}
		}
		.right{
			flex: 1;
			overflow: hidden;
		}
		.title{
			margin-right: 24rpx;
			font-size: 30rpx;
			color: #333;
			line-height: 40rpx;
		}
		.sales{
			height: 40rpx;
			margin: 14rpx 0 28rpx;
			line-height: 40rpx;
			font-size: 26rpx;
			color: #888;
		}
		.price-wrap{
			display: flex;
			align-items: baseline;
			padding-right: 20rpx;
		}
		.m-price{
			font-size: 26rpx;
			text-decoration: line-through;
			color: #999;
			margin-left: 10rpx;
		}
		.tags{
			flex: 1;
			justify-content: flex-end;
			position: relative;
			bottom: 4rpx;
		}
		.tag{
			height: 32rpx;
			padding: 0 10rpx;
			margin-left: 10rpx;
			font-size: 20rpx;
			color: #fff;
			border-radius: 4rpx;
			background-color: $base-color;
			
			&.orange{
				background-color: orange;
			}
		}
	}
	/* 竖向列表 */
	.list-item.column{
		width: 350rpx;
		padding-bottom: 16rpx;
		margin-bottom: 12rpx;
		background: #fff;
		border-radius: 8rpx;
		overflow: hidden;
		box-shadow: 0 0 16rpx rgba(0,0,0,.06);
		position: relative;
		
		.image-wrapper{
			width: 100%;
			height: 350rpx;
			overflow: hidden;
			
			image{
				width: 100%;
				height: 100%;
			}
		}
		.title{
			font-size: 28rpx;
			color: #333;
			line-height: 36rpx;
			padding: 0 16rpx;
			margin-top: 18rpx;
			height: 76rpx;
		}
		.price-wrap{
			padding: 0 16rpx;
			margin-top: 18rpx;
		}
		.m-price{
			font-size: 24rpx;
			text-decoration: line-through;
			color: #999;
			margin-left: 10rpx;
			
			&:before{
				content: "￥";
			}
		}
		.tag{
			height: 32rpx;
			padding: 0 10rpx;
			font-size: 20rpx;
			background-color: $base-color;
			color: #fff;
			border-radius: 4rpx;
			transform: translateY(-4rpx);
		}
	}
</style>
