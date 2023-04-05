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
			<product-list ref="productList" :list="list" listType="column"></product-list>
			
		</mescroll-body>
		
		<mix-loading v-if="isLoading" :type="2"></mix-loading>
	</view>
</template>

<script>
	import productList from '@/pages/product/components/product-list'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		components: {
			productList
		},
		mixins: [MescrollMixin], 
		data() {
			return {
				list: [],
				upOption:{
					auto: false, // 是否自动加载
					page: {
					 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					 	size: 6 // 每页数据的数量
					},
					noMoreSize: 6
				},
			}
		},
		methods: {
			//加载热门推荐列表
			async loadList(e){
				if(this.$refs.productList){
					this.$refs.productList.loadType = e.num === 1 ? 'refresh': 'add';
				}
				const res = await this.$request('favorite', 'get', {
					offset: (e.num - 1) * e.size,
					limit: e.size,
				});
				const curList = res.data.map(item=> {
					return {
						fav_id: item._id,
						...item.product
					}
				})
				if(e.num === 1){
					this.list = [];
					this.loaded && curList.forEach(item=> {item.loaded = true;})
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

<style>
	page{
		background-color: #f8f8f8;
	}
</style>
<style scoped lang="scss">
	.app{
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	}
</style>
