<template>
	<view class="app column">
		<!-- 顶部栏 -->
		<page-header></page-header>
		
		<view class="content row">
			<scroll-view class="left-side" scroll-y>
				<view class="item center" :class="{active: item._id === current._id}" v-for="item in list" :key="item._id" @click="changeCate(item)">
					<text>{{ item.name }}</text>
				</view>
			</scroll-view>
			<scroll-view class="right-side" scroll-y>
				<image class="cate-image" :src="current.image" mode="aspectFill"></image>
				<view class="wrap">
					<view class="item column" v-for="item in current.child" :key="item._id" @click="navToList(item)">
						<image class="icon" :src="item.image" mode="aspectFill"></image>
						<text class="tit">{{ item.name }}</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import tabbarMixin from './mixin/tabbar' 
	import pageHeader from './components/page-header.vue'
	export default {
		components: {
			pageHeader
		},
		mixins: [tabbarMixin], 
		data() {
			return {
				list: [],
				current: {}
			}
		},
		onLoad() {
			this.loadData();
		},
		methods: {
			async loadData(){
				//获取分类 缓存1小时
				const res = await this.$request('product', 'getCategory', {}, {
					cache: 60*60*0,
				});
				this.current = res[0];
				this.list = res;
			},
			changeCate(item){
				this.current = item;
			},
			navToList(item){
				const arr = [];
				this.current.child.forEach(cate=>{
					arr.push({
						_id: cate._id,
						name: cate.name
					})
				})
				this.navTo(`/pages/product/list?cateId=${item._id}&firstCateId=${item.parent_id}`)
			}
		}
	}
</script>

<style>
	page{
		height: 100%;
	}
</style>
<style scoped lang="scss">
	.app{
		height: 100%;
	}
	.content{
		flex: 1;
		padding-top: 12rpx;
		overflow: hidden;
	}
	.left-side{
		flex-shrink: 0;
		width: 180rpx;
		height: 100%;
		overflow-y: hidden;
		background-color: #f2f2f2;
		
		.item{
			height: 90rpx;
			font-size: 26rpx;
			color: #555;
		}
		.active{
			font-size: 28rpx;
			color: $base-color;
			font-weight: 700;
			background-color: #fff;
			position: relative;
			
			&::before{
				content: '';
				position: absolute;
				left: 0;
				top: 30rpx;
				width: 6rpx;
				height: 30rpx;
				background-color: $base-color;
				border-radius: 0 4rpx 4rpx 0;
			}
		}
	}
	.right-side{
		flex: 1;
		height: 100%;
		
		.cate-image{
			width: calc(100% - 40rpx);
			height: 200rpx;
			margin: 0 20rpx;
			border-radius: 8rpx;
		}
		.wrap{
			display: flex;
			flex-wrap: wrap;
			padding: 0 20rpx 20rpx;
		}
		.item{
			flex-shrink: 0;
			justify-content: flex-start;
			align-items: center;
			width: 30%;
			padding: 30rpx 0 0;
			
			&:nth-child(3n-1){
				width: 40%;
			}
		}
		.icon{
			width: 108rpx;
			height: 108rpx;
			margin-bottom: 16rpx;
		}
		.tit{
			width: 140rpx;
			font-size: 24rpx;
			color: #333;
			text-align: center;
			line-height: 1.4;
		}
	}
</style>
