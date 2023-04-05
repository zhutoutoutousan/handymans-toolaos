<template>
	<view class="mix-page-header" >
		<view 
			class="content row"
			:style="{
				paddingRight: headerPaddingRight + 'px',
				paddingTop: statusBarHeight + 'px',
				height: navigationBarHeight + statusBarHeight + 'px'
			}"
		>
			<view class="btn center">
				<text class="mix-icon icon-xiangzuo" @click="navBack"></text>
			</view>
			<view 
				class="search-wrap center"
				:class="{'has-keyword': keyword}"
				:style="{height: customHeight + 'px'}" 
				@click="navToSearch"
			>
				<text class="mix-icon icon-sousuo"></text>
				<view v-if="keyword" class="keyword center" @click.stop.prevent="delKeyword">
					<text>{{ keyword }}</text>
					<text class="mix-icon icon-guanbi"></text>
				</view>
				<text v-else>输入关键字搜索</text>
			</view>
			<!-- #ifndef MP-WEIXIN -->
			<view class="btn center">
				<text 
					class="mix-icon"
					:class="listType === 'column' ? 'icon-hengxiangliebiao' : 'icon-shuxiangliebiao'"
					@click="changeListType"
				></text>
			</view>
			<!-- #endif -->
		</view>
		<!-- 占位栏 -->
		<!-- <view :style="[{minHeight: navigationBarHeight+statusBarHeight+'px'}]"></view> -->
	</view>
</template>

<script>
	export default {
		name: 'ProductListPageHeader',
		data() {
			return {
				
			};
		},
		props: {
			keyword: {
				type: String,
				default: ''
			},
			listType: {
				type: String,
				default: 'column'
			},
			sourcePage: String
		},
		computed: {
			statusBarHeight(){
				return this.systemInfo.statusBarHeight
			},
			navigationBarHeight(){
				return this.systemInfo.navigationBarHeight;
			},
			customWidth(){
				return this.systemInfo.custom.width;
			},
			customHeight(){
				return this.systemInfo.custom.height;
			},
			//小程序右侧需要留出气泡空间
			headerPaddingRight(){
				// #ifndef MP
				return 0;
				// #endif
				// #ifdef MP-WEIXIN
				return this.customWidth + 20;
				// #endif
			},
		},
		methods: {
			delKeyword(){
				this.$emit('delKeyword');
			},
			changeListType(){
				this.$emit('changeListType');
			},
			navBack(){
				uni.navigateBack();
			},
			navToSearch(){
				if(this.sourcePage === 'search'){
					this.navBack();
				}else{
					this.navTo('/pages/search/search?sourcePage=productList');
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.content{
		position: fixed;
		left: 0;
		top: 0;
		z-index: 95;
		width: 100%;
		background-color: #fff;
	}
	.btn{
		width: 44px;
		height: 40px;
		padding: 5px 12px;
		position: relative;
		
		&:first-child{
			width: 40px;
		}
		.mix-icon{
			font-size: 20px;
			color: #333;
		}
		.icon-hengxiangliebiao, .icon-shuxiangliebiao{
			font-size: 23px;
			color: #333;
		}
	}
	.search-wrap{
		flex: 1;
		font-size: 14px;
		color: #999;
		border-radius: 100px;
		background-color: #f3f3f3;
		
		&.has-keyword{
			justify-content: flex-start;
			padding-left: 20rpx;
			
			.icon-sousuo{
				font-size: 22px;
				color: #777;
			}
		}
		.icon-sousuo{
			margin-right: 6px;
			font-size: 18px;
			color: #999;
		}
		.keyword{
			padding: 6px 9px 6px 10px;
			font-size: 12px;
			color: #fff;
			background-color: #888;
			border-radius: 100px;
			
			.icon-guanbi{
				margin-left: 5px;
				font-size: 8px;
			}
		}
	}
</style>
