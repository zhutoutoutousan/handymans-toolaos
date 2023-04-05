<template>
	<view class="app">
		<!-- 顶部栏 -->
		<!-- #ifndef MP-WEIXIN -->
		<page-header :showFillView="false"></page-header>
		<mescroll-body
			ref="mescrollRef" 
			@init="mescrollInit" 
			:top="headerHeight" 
			@down="downCallback" 
			:up="upOption" 
			@up="loadHotList" 
		>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<page-header :showFillView="true"></page-header>
		<!-- #endif -->
			<!-- 头部轮播图 -->
			<banner :list="carousel"></banner>
			<!-- 分类 -->
			<view class="cate-section">
				<view class="item" v-for="item in navList" :key="item._id" @click="navTo(item.link)">
					<image class="icon" :src="item.image"></image>
					<text>{{ item.name }}</text>
				</view>
			</view>
			<!-- 中部广告位 -->
			<view class="mid-ad" @click="navTo(midAdvert.link)">
				<image :src="midAdvert.image" mode="scaleToFill"></image>
			</view>
			
			<!-- 热门推荐 -->
			<view class="hot-wrap" :class="{show: loaded}">
				<view class="floor-header row" @click="navTo('/pages/product/list?isHot=1')">
					<image class="icon" src="/static/icon/hot.png"></image>
					<view class="column fill">
						<text class="tit">热门推荐</text>
						<text>Popular Recommendation</text>
					</view>
					<text class="mix-icon icon-you"></text>
				</view>
				
				<product-list ref="productList" :list="hotList"></product-list>
			</view>
			
		<!-- #ifndef MP-WEIXIN -->
		</mescroll-body>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<mix-load-more :status="loadingType"></mix-load-more>
		<!-- #endif -->
		
		<!-- 首页优惠券弹窗 -->
		<home-advert-modal></home-advert-modal>
	</view>
</template>

<script>
	import tabbarMixin from './mixin/tabbar' 
	import homeMixin from './mixin/home'
	import pageHeader from './components/page-header.vue'
	import banner from './components/banner.vue'
	import productList from '@/pages/product/components/product-list.vue'
	import homeAdvertModal from './components/home-advert-modal.vue'
	export default {
		components: {
			pageHeader,
			banner,
			productList,
			homeAdvertModal
		},
		mixins: [homeMixin, tabbarMixin],
		data() {
			return {
				navList: [],//导航列表
				advertList: [],//广告列表
				hotList: [],//热门推荐
			}
		},
		computed: {
			midAdvert(){
				if(this.advertList.length === 0) return {};
				const res = this.advertList.filter(item=> item.advert_type === 'middle');
				return res.length > 0 ? res[0]: {};
			},
			carousel(){
				return this.advertList.filter(item=> item.advert_type === 'carousel');
			}
		},
		onLoad() {
			this.loadAdvert();
			this.loadNavList();
			
			setTimeout(()=>{
				//this.navTo('/pages/address/list')
			}, 1000)
		},
		methods: {
			//加载广告 缓存10分钟
			async loadAdvert(){
				const res = await this.$request('advert', 'getAdvertList', {}, {
					cache: 10*60
				});
				this.advertList = res.data;
				this.log(res);
			},
			//加载导航 缓存1小时
			async loadNavList(){
				const res = await this.$request('advert', 'getNavList', {}, {
					cache: 60*60*0,
				});
				this.navList = res.data;
			},
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
</style>
<style scoped lang="scss">
	/* 分类 */
	.cate-section {
		display: flex;
		align-items: center;
		flex-wrap:wrap;
		padding: 10rpx 16rpx; 
		background: #fff;
		
		.item {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 20%;
			padding: 20rpx 0;
			font-size: 24rpx;
			color: #333;
		}
		.icon {
			width: 84rpx;
			height: 84rpx;
			margin-bottom: 14rpx;
			border-radius: 50%;
		}
	}
	.mid-ad{
		width: 100%;
		height: 208rpx;
		padding: 0 20rpx 20rpx;
		background: #fff;
		
		image{
			width:100%;
			height: 100%; 
		}
	}
	.floor-header{
		padding: 6rpx 30rpx 8rpx 24rpx;
		font-size: 24rpx;
		color: #999;
		background-color: #fff;
		
		.icon{
			flex-shrink: 0;
			width: 80rpx;
			height: 80rpx;
			margin-right: 20rpx;
		}
		.tit-box{
			flex: 1;
			display: flex;
			flex-direction: column;
		}
		.tit{
			margin-bottom: 10rpx;
			font-size: 32rpx;
			color: #333;
			font-weight: 700;
		}
		.icon-you{
			font-size: 28rpx;
			color: #999;
		}
	}
	.hot-wrap{
		padding-top: 20rpx;
		background: linear-gradient(to bottom, #fff 10rpx, #f7f7f7);
		opacity: 0;
		transition: opacity .2s;
		
		&.show{
			opacity: 1;
		}
		.floor-header{
			padding-bottom: 30rpx;
		}
		/deep/ .list-item{
			box-shadow: 4rpx 0 10rpx rgba(0,0,0,.06);
		}
	}
	
</style>
