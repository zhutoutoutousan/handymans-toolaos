<template>
	<view class="app">
		<view class="wrap">
			<view class="list" v-for="(item, index) in list" :key="index">
				<product-list :list="item.products"></product-list>
				<view class="star-wrap row">
					<view class="column fill">
						<text class="tit fill">您对宝贝还满意吗</text>
						<text class="title clamp">{{ item.title }}</text>
					</view>
					<text
						v-for="(sItem, sIndex) in 5"
						:key="sIndex"
						class="mix-icon icon-iconfontxingxing"
						:class="{active: item.rating > sIndex}"
						@click="checkStar(sIndex, item)"
					></text>
				</view>
				<view class="textarea-wrap">
					<textarea maxlength="100" v-model="item.content" placeholder="分享一下使用心得，让大家了解一下吧 .." placeholder-style="color:#999" />
				</view>
				<view class="upload-wrap">
					<mix-upload-image :length="4" :index="index" @onChange="onImageChange"></mix-upload-image>
				</view>
			</view>
		</view>
		<view class="btn-wrap">
			<mix-button ref="confirmBtn" text="提交" @onConfirm="confirm"></mix-button>
		</view>
	</view>
</template>

<script>
	import productList from '@/pages/order/components/product-list.vue'
	export default {
		components: {
			productList
		},
		data() {
			return {
				data: {},
				list: []
			}
		},
		onLoad(options) {
			const data = JSON.parse(options.data);
			this.list = data.products.map(item=> {
				item.rating = 5;
				item.content = '';
				item.images = [];
				return item;
			});
			this.data = data;
		},
		methods: {
			async confirm(){
				const data = {
					order_id: this.data.id,
					list: this.list.map(item=> {
						return {
							product_id: item.sku.product_id,
							sku: item.sku.name || '',
							content: item.content || '买家未填写评价内容',
							rating: item.rating,
							images: item.images
						}
					})
				}
				const res = await this.$request('order', 'addRating', data);
				this.$util.msg(res.msg);
				if(res.status === 1){
					const prePage = this.$util.prePage();
					if(prePage.refreshList){
						prePage.refreshList()
					}else{
						prePage.loadData && prePage.loadData();
					}
					setTimeout(()=>{
						uni.navigateBack();
					}, 1000)
				}
				this.$refs.confirmBtn.stop();
			},
			checkStar(current, item){
				item.rating = current + 1;
			},
			onImageChange(e){
				console.log(e.list.map(item=> item));
				this.list[e.index].images = e.list.map(item=> item.url)
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
		padding: 20rpx;
	}
	.list{
		margin-bottom: 20rpx;
		background-color: #fff;
		border-radius: 12rpx;
		overflow: hidden;
		
		&:last-child{
			margin-bottom: 0;
			border-radius: 12rpx 12rpx 0 0;
		}
	}
	.star-wrap{
		padding: 30rpx 24rpx 10rpx;
		
		.tit{
			font-size: 30rpx;
			color: #333;
			font-weight: 700;
		}
		.title{
			width: 400rpx;
			margin-top: 16rpx;
			font-size: 24rpx;
			color: #666;
		}
		.icon-iconfontxingxing{
			margin-right: 6rpx;
			font-size: 36rpx;
			color: #ccc;
			
			&.active{
				color: #f0a80e;
			}
		}
	}
	.textarea-wrap{
		padding: 20rpx;
		background-color: #fff;
		border-radius: 12rpx;
		
		textarea{
			width: 100%;
			height: 200rpx;
			padding: 20rpx;
			font-size: 28rpx;
			color: #333;
			line-height: 1.4;
			background-color: #f7f7f7;
			border-radius: 12rpx;
		}
	}
	.upload-wrap{
		padding: 10rpx 0 10rpx 20rpx;
		
		/deep/ {
			.upload-content{
				background-color: #fff;
			}
			.upload-item{
				width: 144rpx;
				height: 144rpx;
			}
			.upload-add-btn{
				width: 144rpx;
				height: 144rpx;
			}
		}
	}
	.btn-wrap{
		padding: 60rpx 0;
		background-color: #fff;
		border-radius: 0 0 12rpx 12rpx;
	}
</style>
