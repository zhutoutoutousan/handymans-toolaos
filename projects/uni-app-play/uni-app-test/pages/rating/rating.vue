<template>
	<view class="app">
		<view class="nav-wrap">
			<mix-nav-bar :navs="navs" :counts="navCounts" :current="navCurrent" @onChange="onNavBarChange"></mix-nav-bar>
		</view>
		
		<mescroll-body
			ref="mescrollRef" 
			@init="mescrollInit" 
			:top="84" 
			@down="downCallback" 
			:up="upOption" 
			@up="loadList" 
		>
			<rating-item 
				v-for="(item, index) in list" 
				:key="index"
				:item="item"
			></rating-item>
		</mescroll-body>
		
		<mix-loading v-if="isLoading" :mask="true"></mix-loading>
	</view>
</template>

<script>
	import ratingItem from './components/rating-item'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		components: {
			ratingItem
		},
		mixins: [MescrollMixin], 
		data() {
			return {
				navs: [{name: '最新'}, {name: '好评'}, {name: '中评'}, {name: '差评'}, {name: '有图'}],
				navCurrent: 0, //当前tab
				upOption:{
					auto: false, // 是否自动加载
					page: {
					 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					 	size: 15 // 每页数据的数量
					},
					noMoreSize: 5,
				},
				navCounts: [], //数量
				list: [],
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.loadCount();
		},
		methods: {
			async loadList(e){
				this.mescroll && this.mescroll.removeEmpty();
				const res = await this.$request('rating', 'get', {
					product_id: this.id,
					offset: (e.num - 1) * e.size,
					limit: e.size,
					type: this.navCurrent
				});
				const curList = res.data;
				if(e.num === 1){
					//第一页清空数据重载
					this.list = [];
				} 
				this.list = this.list.concat(curList); //追加新数据
				this.mescroll.endSuccess(curList.length); //结束加载状态
			},
			async loadCount(){
				const res = await this.$request('rating', 'count', {
					product_id: this.id
				})
				this.navCounts = res;
				console.log(res);
			},
			mescrollInit(mescroll){
				this.isLoading = true;
				this.mescroll = mescroll;
				setTimeout(()=>{
					this.mescroll.resetUpScroll(false)
				}, 10)
			},
			//tab切换
			onNavBarChange(current){
				if(this.navCurrent === current){
					return;
				}
				this.navCurrent = current;
				this.isLoading = true;
				this.mescroll && this.mescroll.resetUpScroll(false)
			}
		}
	}
</script>

<style scoped lang="scss">
	.app{
		padding: 0 30rpx;
		
		/deep/ {
			.mescroll-body-content{
				padding-top: 10rpx;
			}
		}
	}
</style>
