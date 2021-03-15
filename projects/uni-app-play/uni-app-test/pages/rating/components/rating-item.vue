<template>
	<view class="mix-rating-item b-b">
		<view class="wrap">
			<view class="avatar-wrap">
				<image v-if="!item.user.anonymous && item.user.lv > 0" class="crown" src="/static/icon/crown.png"></image>
				<image class="avatar" :src="item.user.anonymous ? '/static/icon/default-avatar.png' : item.user.avatar || '/static/icon/default-avatar.png'" mode="aspectFill"></image>
				<text v-if="!item.user.anonymous" class="mix-icon" :class="item.user.gender===2?'icon-xingbie-nv':'icon-xingbie'"></text>
			</view>
			<view class="right fill column">
				<view class="row">
					<text class="name"> {{ 
						(
							item.user.anonymous ? '匿名' : 
							(item.user.nickname || item.user.username)
						) | username
					}} </text>
					<text 
						class="mix-icon icon-shoucang_xuanzhongzhuangtai"
						:class="{active: sIndex < item.rating}"
						v-for="(sItem, sIndex) in 5"
						:key="sIndex"
					></text>
				</view>
				<text class="con">{{ item.content }}</text>
				<view class="pic-wrap" v-if="item.images && item.images.length > 0" >
					<image
						v-for="(picItem, picIndex) in item.images"
						:key="picIndex"
						class="pic" 
						:class="{'no-mr': picIndex === 2}"
						:src="picItem" 
						mode="aspectFill" 
						@click="previewImage(picIndex, item.images)"
					></image>
				</view>
				<view class="bot row">
					<text class="time">{{ item.add_time | date('Y-m-d H:i') }}</text>
					<text v-if="item.sku" class="attr clamp">购买类型：{{ item.sku }}</text>
				</view>
			</view>
		</view>
		<view v-if="item.reply" class="replay-wrap">
			<text>卖家回复：{{ item.reply }}</text>
		</view>
	</view>
</template>

<script>
	/**
	 * 商品评价
	 */
	export default {
		name: 'MixRatingItem',
		data() {
			return {
				
			};
		},
		props: {
			item: {
				type: Object,
				default(){
					return {}
				}
			}
		},
		filters: {
			username(name){
				if(name.length === 11){
					return '****' + name.substr(7, 11)
				}else{
					return name;
				}
			}
		},
		methods: {
			previewImage(current, urls){
				uni.previewImage({
					current,
					urls
				})
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.mix-rating-item{
		padding: 30rpx 0 30rpx;
		
		&:last-child:after{
			border: 0;
		}
	}
	.wrap{
		display: flex;
	}
	.avatar-wrap{
		width: 80rpx;
		height: 80rpx;
		position: relative;
		
		.avatar{
			flex-shrink: 0;
			width: 100%;
			height: 100%;
			border-radius: 100px;
		}
		.crown{
			position: absolute;
			width: 40rpx;
			height: 40rpx;
			z-index: 1;
			left: -16rpx;
			top: -14rpx;
			transform: rotate(0deg);
		}
		.mix-icon{
			position: absolute;
			right: 0;
			bottom: 0;
			font-size: 28rpx;
			color: $base-color;
			border-radius: 100rpx;
			border: 2rpx solid #fff;
			background-color: #fff;
		}
	}
	.right{
		padding-left: 26rpx;
		
		.name{
			margin-right: 40rpx;
			font-size: 28rpx;
			color: #666;
		}
		.icon-shoucang_xuanzhongzhuangtai{
			margin-right: 6rpx;
			font-size: 28rpx;
			color: #ddd;
		
			&.active{
				color: #ffd600;
			}
		}
		.con{
			font-size: 28rpx;
			color: #333;
			padding: 20rpx 0;
			line-height: 1.4;
		}
		.bot{
			justify-content: space-between;
			font-size: 24rpx;
			color:#999;
		}
		.attr{
			width: 350rpx;
			text-align: right;
		}
	}
	.pic-wrap{
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 8rpx;
		
		.pic{
			width: 184rpx;
			height: 180rpx;
			margin: 0 12rpx 12rpx 0;
			border-radius: 8rpx;
			
			&.no-mr{
				margin-right: 0;
			}
		}
	}
	.replay-wrap{
		display: flex;
		margin: 24rpx 0 0 100rpx;
		padding: 12rpx 20rpx;
		background-color: #f7f7f7;
		border-radius: 8rpx;
		
		text{
			font-size: 24rpx;
			color: #888;
			line-height: 1.6;
		}
	}
</style>
