<template>
	<view class="app column">
		<view class="search-wrap center">
			<view class="input-box row">
				<text class="mix-icon icon-sousuo"></text>
				<input 
					class="input"
					type="text" 
					placeholder="请输入搜索关键字" 
					maxlength="20"
					v-model="keyword" 
					@confirm="search"
					confirm-type="search"
				/>
				<text v-if="keyword" class="mix-icon icon-guanbi2" @click="clearInput"></text>
			</view>
			<view class="search-btn center" @click="search">
				<text>搜索</text>
			</view>
		</view>
		
		<view class="content">
			<view v-if="historyList.length > 0" class="s-header row">
				<text class="tit">历史搜索</text>
				<text class="mix-icon icon-lajitong" @click="showPopup('mixModal')"></text>
			</view>
			<view v-if="historyList.length > 0" class="list" style="margin-bottom: 20rpx;">
				<view class="item center" v-for="(item, index) in historyList" :key="index" @click="search(item)">
					<text>{{ item }}</text>
				</view>
			</view>
			<view v-if="hotList.length > 0" class="s-header row">
				<text class="tit">热门搜索</text>
			</view>
			<view v-if="hotList.length > 0" class="list">
				<view class="item center" v-for="(item, index) in hotList" :key="index" @click="search(item.name)">
					<text>{{ item.name }}</text>
				</view>
			</view>
		</view>
		<mix-modal ref="mixModal" text="您确定要清除搜索历史吗" @onConfirm="delHistory"></mix-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				hotList: [],
				historyList: []
			}
		},
		onLoad(options) {
			this.sourcePage = options.sourcePage;
			this.loadHotKeywords();
			this.loadHistory();
		},
		methods: {
			//加载热搜关键词
			async loadHotKeywords(){
				const response = await this.$request('search', 'get');
				this.hotList = response.data;
			},
			//加载历史搜索
			loadHistory() {
				uni.getStorage({
					key: 'keywordHistoryList',
					success: res => {
						this.historyList = res.data || [];
					}
				});
			},
			//执行搜索
			search(keyword) {
				if(typeof keyword !== 'string'){
					keyword = this.keyword;
				}else{
					keyword = keyword.trim();
					this.keyword = keyword;
				}
				if(!keyword){
					this.$util.msg('请输入搜索关键字，如 狗粮');
					return;
				}
				this.saveKeyword(); //保存为历史 
				
				this.$request('search', 'update', {
					keyword
				});
				
				if(this.sourcePage === 'productList'){
					this.$util.prePage().keyword = keyword;
					this.$util.prePage().refreshList();
					uni.navigateBack();
				}else{
					this.navTo(`/pages/product/list?keyword=${keyword}&sourcePage=search`);
				}
			},
			//保存关键字到历史记录
			saveKeyword() {
				let list = uni.getStorageSync('keywordHistoryList');
				if(!list){
					list = [];
				}
				const index = list.findIndex(item=>item === this.keyword);
				if(index > -1){
					list.splice(index, 1);
				}
				list.unshift(this.keyword);
				//只保存30条记录
				if(list.length > 30){
					list.length = 30;
				}
				this.historyList = list;
				uni.setStorage({
					key: 'keywordHistoryList',
					data: list
				})
			},
			//清除历史搜索
			delHistory() {
				this.historyList = [];
				uni.removeStorage({
					key: 'keywordHistoryList'
				});
			},
			//清空输入框
			clearInput(){
				this.keyword = '';
			}
		}
	}
</script>

<style scoped lang='scss'>
	.search-wrap{
		padding-left: 24rpx;
		height: 100rpx;
		
		.icon-sousuo{
			padding: 0 12rpx 0 20rpx;
			font-size: 40rpx;
			color: #999;
		}
		.input-box {
			width: 604rpx;
			height: 80rpx;
			border-radius: 100rpx;
			background: #f5f6f7;
		}
		.input{
			flex: 1;
			font-size: 30rpx;
			color: #333;
		}
		.icon-guanbi2{
			padding: 10rpx 20rpx;
			font-size: 32rpx;
			color: #999;
		}
		.search-btn {
			flex-shrink: 0;
			padding: 0 24rpx 0 20rpx;
			font-size: 32rpx;
			color: #007aff;
		}
	}
	.content {
		flex: 1;
		padding-top: 24rpx;
		border-radius: 28rpx 28rpx 0 0;
		background-color: #fff;
	}
	.s-header{
		height: 80rpx;
		padding: 0 32rpx 0 40rpx;
		
		.tit{
			flex: 1;
			font-size: 30rpx;
			color: #333;
			font-weight: 700;
		}
		.icon-lajitong{
			padding: 10rpx;
			font-size: 36rpx;
			color: #333;
		}
	}
	.list{
		display: flex;
		flex-wrap: wrap;
		padding: 10rpx 0 0 36rpx;
		
		.item{
			min-width: 60rpx;
			height: 58rpx;
			padding: 0 24rpx;
			margin: 0 24rpx 24rpx 0;
			border-radius: 100rpx;
			background-color: #f5f6f7;
			font-size: 26rpx;
			color: #666;
		}
	}
</style>
