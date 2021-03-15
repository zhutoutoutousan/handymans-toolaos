<template>
	<view class="mix-product-detail-swiper">
		<swiper
			class="swiper" 
			circular 
			autoplay 
			interval="80000"
			@change="onSwiperChange"
		>
			<swiper-item class="item" v-for="(item, index) in renderList" :key="index" >
				<view class="image-wrapper lazyload lazypic" :class="{loaded: item.loaded}">
					<image
						:src="item.src" 
						mode="aspectFill"
						@load="imageOnLoad(item)"
						@click="previewImage(index)"
					></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="dots row center">
			<view class="dot" :class="{current: current === index}" v-for="(item, index) in renderList" :key="index"></view>
		</view>
	</view>
</template>

<script>
	/**
	 * 商品详情页 顶部轮播图
	 */
	export default {
		name: 'MixProductDetailSwiper',
		data() {
			return {
				current: 0,
				renderList: []
			};
		},
		props: {
			list: {
				type: Array,
				default(){
					return []
				}
			}
		},
		watch: {
			list(list){
				this.renderList = list.map(src=>{
					return {
						loaded: !!this.loaded,
						src
					}
				});
				this.loaded = true;
			}
		},
		methods: {
			onSwiperChange(e){
				this.current = e.detail.current;
			},
			previewImage(current){
				uni.previewImage({
					current,
					urls: this.list
				})
			},
			imageOnLoad(data, key){
				setTimeout(()=>{
					this.$set(data, 'loaded', true);
				}, 100)
			}
		}
	}
</script>

<style scoped lang="scss">
	.mix-product-detail-swiper{
		position: relative;
	}
	.swiper{
		width: 750rpx;
		height: 750rpx;
	}
	.image-wrapper{
		flex-shrink: 0;
		width: 750rpx;
		height: 750rpx;
		margin-right: 20rpx;
		overflow: hidden;
		
		image{
			width: 100%;
			height: 100%;
		}
	}
	.dots{
		position: absolute;
		left: 0;
		bottom: 12rpx;
		width: 100%;
	}
	.dot{
		width: 32rpx;
		height: 8rpx;
		margin: 0 6rpx;
		background-color: #fff;
		border-radius: 10px;
		
		&.current{
			background-color: $base-color;
		}
	}
</style>
