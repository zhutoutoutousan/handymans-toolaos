<template>
	<view class="app">
		<view class="main-wrap" :class="{show: loaded}">
			<view class="item column" v-for="(item, index) in list" :key="index" @click="chooseAddress(item)">
				<view class="row">
					<text class="name">{{ item.name }}</text>
					<text class="mobile">{{ item.mobile }}</text>
					<text v-if="item.is_default" class="tag">默认</text>
				</view>
				<text class="content">{{ item.address.address }} {{ item.address.room }}</text>
				<view class="bot row b-t" @click.stop.prevent="stopPrevent">
					<view class="btn center" @click="showDelModal(index)">
						<text class="mix-icon icon-lajitong"></text>
						<text>删除</text>
					</view>
					<view class="btn center" @click="editAddr(item)">
						<text class="mix-icon icon-bianji"></text>
						<text>编辑</text>
					</view>
				</view>
			</view>
			<view v-if="list.length > 0" class="bot-btn-wrap fix-bot">
				<mix-button text="新增收货地址" icon="icon-jia2" :iconSize="36" :isConfirm="false" @onConfirm="navTo('manage')"></mix-button>
			</view>
		</view>
		
		<mix-modal ref="mixModal" title="提示" text="确定要删除该地址吗" @onConfirm="deleteAddr"></mix-modal>
		
		<mix-loading v-if="isLoading" :type="list.length > 0 ? 1 : 2"></mix-loading>
		<!-- 缺省 -->
		<mix-empty v-else-if="loaded && list.length === 0" type="address" backgroundColor="#fff"></mix-empty>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad(options) {
			this.isChoose = !!options.choose;
			this.choosedId = options.id;
			this.loadData();
		},
		methods: {
			async loadData(){
				const res = await this.$request('address', 'get', {}, {
					showLoading: !this.loaded
				});
				this.list = res.data;
			},
			//选择地址
			chooseAddress(item){
				if(!this.isChoose){
					return;
				}
				this.$util.prePage().setAddress(item);
				uni.navigateBack();
			},
			/**
			 * 删除地址
			 * 注意 删除成功已选择的地址需要清空
			 */
			async deleteAddr(){
				const res = await this.$request('address', 'remove', {
					id: this.list[this.curIndex]._id
				}, {
					showLoading: true
				})
				this.$util.msg(res.msg);
				if(res.status === 1){
					this.list.splice(this.curIndex, 1);
					this.isChoose && this.choosedId && this.$util.prePage().setAddress({});
				}
			},
			//编辑地址
			editAddr(item){
				this.navTo(`manage?data=${JSON.stringify(item)}`);
			},
			showDelModal(index){
				this.curIndex = index;
				this.$refs.mixModal.open();
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
		padding-top: 20rpx;
	}
	.main-wrap{
		opacity: 0;
		transition: opacity .2s;
		
		&.show{
			opacity: 1;
		}
	}
	.item{
		padding: 30rpx 28rpx 0;
		margin: 0 20rpx 20rpx;
		background-color: #fff;
		border-radius: 12rpx;
		box-shadow: 0rpx 0rpx 20rpx rgba(0,0,0,.03);
		
		.name{
			margin-right: 28rpx;
			font-size: 32rpx;
			color: #333;
		}
		.mobile{
			margin-right: 32rpx;
			font-size: 28rpx;
			color: #999;
		}
		.tag{
			padding: 0 8rpx;
			font-size: 20rpx;
			color: #fff;
			line-height: 28rpx;
			background-color: $base-color;
			border-radius: 2rpx;
		}
		.content{
			width: 560rpx;
			min-height: 70rpx;
			margin: 28rpx 0 20rpx;
			font-size: 28rpx;
			color: #999;
			line-height: 1.44;
		}
		.bot{
			justify-content: flex-end;
			height: 79rpx;
			
			&:before{
				left: -26rpx;
				right: -26rpx;
				border-color: #f0f0f0;
			}
		}
		.btn{
			margin-left: 50rpx;
			font-size: 26rpx;
			color: #444;
			
			.mix-icon{
				margin-right: 16rpx;
				font-size: 34rpx;
			}
		}
	}
	.bot-btn-wrap{
		position: fixed;
		left: 0;
		bottom: 30rpx;
		z-index: 90;
		width: 100%;
	}
</style>
