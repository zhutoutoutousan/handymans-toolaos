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
			@up="loadData" 
		>
			<view class="item column" v-for="(item, index) in list" :key="index" @click="navTo('detail?id='+item._id)">
				<view class="i-header row b-b">
					<text class="time fill">{{ item.add_time | date('Y-m-d H:i') }}</text>
					<text class="state" :class="{gray:item.status===10}">{{ item.status_text }}</text>
				</view>
				<!-- 单商品 -->
				<view v-if="item.products.length === 1" class="goods-wrap row">
					<view class="image-wrapper lazyload lazypic" :class="{loaded: item.loaded}">
						<image :src="item.products[0].image" mode="aspectFill" lazy-load="true" @load="imageOnLoad(item)" ></image>
					</view>
					<view class="right column">
						<text class="title clamp">{{ item.products[0].title }}</text>
						<text class="attr">{{ item.products[0].sku.name }}</text>
						<view class="r-b">
							<text class="price">￥{{ item.products[0].price }}</text>
							<text class="number">x{{ item.products[0].number }}</text>
						</view>
					</view>
				</view>
				<!-- 多商品 -->
				<scroll-view v-else class="scroll-view" scroll-x>
					<view class="goods-list">
						<view v-for="(gItem, gIndex) in item.products" :key="gIndex" class="image-wrapper lazyload lazypic" :class="{loaded: item.loaded}">
							<image :src="gItem.image" mode="aspectFill" lazy-load="true" @load="imageOnLoad(item)" ></image>
						</view>
					</view>
				</scroll-view>
				<view class="price-wrap">
					<text>共{{ item.product_number }}件 实付:</text>
					<text class="price">￥{{ item.price_data.pay_price }}</text>
				</view>
				<view class="btn-group row" @click.stop.prevent="stopPrevent">
					<view v-if="item.status===4 || item.status===10 || item.status===11 || item.status===14" class="btn center round" @click="deleteOrder(index)">
						<text>删除订单</text>
					</view>
					<view v-if="item.status===0" class="btn center round" @click="cancelOrder(item)">
						<text>取消订单</text>
					</view>
					<view v-if="item.status===0" class="btn center" @click="pay(item)">
						<text>立即支付</text>
					</view>
					<!-- #ifdef MP -->
					<button type="default" open-type="contact">
						<view v-if="item.status===1" class="btn center round" @click="cancelOrder(item)">
							<text>联系客服</text>
						</view>
					</button>
					<!-- #endif -->
					<!-- #ifdef MP -->
					<view v-if="item.status===1" class="btn center round" @click="showRefundAction(item)">
						<text>申请退款</text>
					</view>
					<!-- #endif -->
					<view v-if="item.status===1" class="btn center round" @click="navTo('zizhufahuo?id='+item._id)">
						<text>自助发货</text>
					</view>
					
					<view v-if="item.status===2" class="btn center round" @click="navToExpress(item)">
						<text>查看物流</text>
					</view>
					<view v-if="item.status===2" class="btn center" @click="confirmReceipt(item)">
						<text>确认收货</text>
					</view>
					<view v-if="item.status===3" class="btn center" @click="rate(item)">
						<text>立即评价</text>
					</view>
				</view>
			</view>
		</mescroll-body>
		
		<mix-loading v-if="isLoading" :mask="true"></mix-loading>
		
		<mix-modal ref="mixModal" title="订单提示" :text="modalText" @onConfirm="onModalConfirm"></mix-modal>
		<mix-action-sheet ref="mixActionSheet" @onConfirm="refund"></mix-action-sheet>
	</view>
</template>

<script>
	import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import OrderMixin from './mixin/order.js'
	export default {
		components: {
			MescrollBody
		},
		mixins: [MescrollMixin, OrderMixin],
		data() {
			return {
				curPage: 'orderList',
				navCounts: [], //订单数量
				navs: [{name: '全部'}, {name: '待付款'}, {name: '待发货'}, {name: '待收货'}, {name: '待评价'}],
				navCurrent: 0, //当前tab
				upOption:{
					page: {
					 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					 	size: 10 // 每页数据的数量
					},
					noMoreSize: 3, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
				},
				modalText: '', //确认对话框内容
				list: [] //订单列表
			}
		},
		computed: {
			orderCount(){
				return this.$store.state.orderCount;
			}
		},
		watch: {
			orderCount(){
				this.navCounts = [0].concat(Object.values(this.orderCount));
			}
		},
		onLoad(options) {
			this.navCurrent = +options.current;
			this.navCounts = [0].concat(Object.values(this.orderCount));
		},
		onShow(){
			if(this.loaded){
				this.refreshList(false);
			}
		},
		methods: {
			async loadData(e){
				this.mescroll && this.mescroll.removeEmpty();
				const sendData = {
					offset: (e.num - 1) * e.size,
					limit: e.size,
				}
				//tab对应订单状态
				const status = this.getCurrentStatus();
				if(status.length > 0){
					sendData.status = status;
				}
				const res = await this.$request('order', 'getList', sendData);
				const curList = res.data;
				if(e.num === 1){
					//第一页清空数据重载
					this.list = [];
					this.loaded && curList.forEach(item=> {item.loaded = true})
					if(curList.length > 0){
						uni.pageScrollTo({
							scrollTop: 0,
							duration: 0
						})
					}
				} 
				this.list = this.list.concat(curList); //追加新数据
				this.mescroll.endSuccess(curList.length); //结束加载状态
			},
			//刷新列表
			refreshList(showLoading){
				this.mescroll && this.mescroll.resetUpScroll(false)
				if(showLoading !== false){
					this.isLoading = true;
				}
				this.$store.dispatch('getOrderCount');
			},
			mescrollInit(mescroll){
				this.mescroll = mescroll;
				setTimeout(()=>{
					this.refreshList();
				}, 10)
			},
			//tab切换
			onNavBarChange(current){
				if(this.navCurrent === current){
					return;
				}
				this.navCurrent = current;
				this.refreshList();
			},
			//获取当前tab对应订单状态
			getCurrentStatus(){
				if(this.navCurrent === 0){
					return [];
				}else{
					return [this.navCurrent - 1];
				}
			}
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
</style>
<style scoped lang="scss">
	.app{
		
	}
	.item{
		width: 710rpx;
		padding-bottom: 24rpx;
		margin-top: 20rpx;
		margin-left: 20rpx;
		background-color: #fff;
		border-radius: 12rpx;
	}
	.b-b:after{
		left: 4rpx;
		right: 4rpx;
		border-color: #e5e5e5;
	}
	.i-header{
		height: 80rpx;
		padding: 0 24rpx;
		margin-bottom: 24rpx;
		
		.time{
			font-size: 26rpx;
			color: #999;
		}
		.state{
			font-size: 30rpx;
			color: $base-color;
			
			&.gray{
				color: #999;
			}
		}
	}
	.scroll-view{
		width: 100%;
		height: 150rpx;
		
		.goods-list{
			display: flex;
			
			&::before, &::after{
				content: '';
				width: 20rpx;
				height: 130rpx;
				flex-shrink: 0;
			}
			&::after{
				width: 10rpx;
			}
			.image-wrapper{
				flex-shrink: 0;
				width: 130rpx;
				height: 130rpx;
				margin-right: 16rpx;
				border-radius: 4rpx;
				overflow: hidden;
			}
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	.goods-wrap{
		padding: 0 20rpx;
		
		.image-wrapper{
			width: 130rpx;
			height: 130rpx;
			border-radius: 4rpx;
			overflow: hidden;
			
			image{
				width: 100%;
				height: 100%;
			}
		}
		.right{
			flex: 1;
			padding-left: 20rpx;
			overflow: hidden;
		}
		.title{
			font-size: 28rpx;
			color: #333;
		}
		.attr{
			margin: 16rpx 0 20rpx;
			min-height: 30rpx;
			font-size: 24rpx;
			color: #999;
		}
		.r-b{
			display: flex;
			height: 30rpx;
		}
		.price{
			font-size: 28rpx;
			color: #333;
			font-weight: normal;
		}
		.number{
			margin-left: 16rpx;
			font-size: 26rpx;
			color: #999;
		}
	}
	.price-wrap{
		display: flex;
		justify-content: flex-end;
		padding: 16rpx 24rpx 30rpx;
		font-size: 26rpx;
		color: #333;
		
		.price{
			font-size: 30rpx;
			font-weight: 700;
		}
	}
	.btn-group{
		justify-content: flex-end;
		padding-right: 16rpx;
		
		.btn{
			width: 150rpx;
			height: 60rpx;
			margin-left: 20rpx;
			font-size: 24rpx;
			color: #fff;
			background-color: $base-color;
			border-radius: 100rpx;
		}
		.round{
			background-color: #fff;
			color: #333;
		}
	}
</style>
