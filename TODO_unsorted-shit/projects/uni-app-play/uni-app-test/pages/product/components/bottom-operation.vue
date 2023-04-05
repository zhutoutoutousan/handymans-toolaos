<template>
	<view class="mix-botoom-operation row">
		<view class="nav-group row">
			<view class="nav column center" @click="switchTab('/pages/tabbar/home')">
				<text class="mix-icon icon-home"></text>
				<text class="tit">首页</text>
			</view>
			<view class="nav column center" @click="switchTab('/pages/tabbar/cart')">
				<text class="mix-icon icon-gouwuche"></text>
				<text class="tit">购物车</text>
				<view v-if="cartCount > 0" class="number center">
					<text>{{ cartCount }}</text>
				</view>
			</view>
			<view class="nav column center" :class="{active: is_fav === 1}" @click="changeFav">
				<text class="mix-icon" :class="is_fav === 1 ? 'icon-shoucang' : 'icon-shoucang-1'"></text>
				<text class="tit">收藏</text>
			</view>
		</view>
		<view class="btn-group row">
			<view class="btn center" @click="onOprationClick('cart')">
				<text>加入购物车</text>
			</view>
			<view class="btn center" @click="onOprationClick('buy')">
				<text>立即购买</text>
			</view>
		</view>
		
		<mix-loading v-if="isLoading" :mask="true"></mix-loading>
	</view>
</template>

<script>
	/**
	 * 商品详情页 底部操作菜单
	 */
	export default {
		name: 'BotoomOperation',
		data() {
			return {
				is_fav: 0
			};
		},
		computed: {
			cartCount(){
				return this.$store.state.cartCount;
			}
		},
		props: {
			infoData: {
				type: Object,
				default(){
					return {}
				}
			}
		},
		watch: {
			infoData(data){
				this.is_fav = data.fav; 
			}
		},
		methods: {
			//收藏
			async changeFav(){
				if(!this.$util.isLogin()){
					return;
				}
				const operation = this.is_fav === 1 ? 'remove': 'add';
				const response = await this.$request('favorite', operation, {
					product_id: this.infoData._id
				}, {showLoading: true})
				if(response.status === 1){
					this.is_fav = this.is_fav === 1 ? 0: 1;
				}else{
					this.$util.msg(this.is_fav === 1 ? '取消收藏失败' : '收藏失败');
				}
			},
			onOprationClick(type){
				this.$emit('onOprationClick', type)
			},
			switchTab(url){
				uni.switchTab({
					url
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.mix-botoom-operation{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 90;
		width: 100%;
		height: 100rpx;
		background-color: #fff;
		box-shadow: 0 -2rpx 10rpx 0 rgba(0,0,0,.1);
		box-sizing: content-box;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom); 
	}
	.nav-group{
		padding-left: 6rpx;
		
		.nav{
			width: 90rpx;
			height: 80rpx;
			color: #333;
			position: relative;
		
			&.active{
				color: $base-color;
			}
		}
		.tit{
			font-size: 20rpx;
		}
		.mix-icon{
			height: 48rpx;
			line-height: 48rpx;
			font-size: 38rpx;
			margin-bottom: 6rpx;
		}
		.number{
			position: absolute;
			right: 16rpx;
			top: 2rpx;
			min-width: 24rpx;
			height: 24rpx;
			padding: 0 8rpx;
			font-size: 16rpx;
			color: #fff;
			background-color: $base-color;
			border-radius: 100rpx;
		}
	}
	.btn-group{
		flex: 1;
		margin: 0 16rpx 0 14rpx;
		overflow: hidden;
		
		.btn{
			flex: 1;
			height: 76rpx;
			font-size: 30rpx;
			color: #fff;
			background-color: orange;
			border-radius: 100rpx 0 0 100rpx;
			
			&:last-child{
				background-color: $base-color;
				border-radius: 0 100rpx 100rpx 0;
			}
		}
	}
	
</style>
