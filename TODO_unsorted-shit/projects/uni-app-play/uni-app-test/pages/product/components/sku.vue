<template>
	<uni-popup ref="popup" type="bottom">
		<view class="content column">
			<text class="mix-icon icon-guanbi" @click="close"></text>
			<view class="pro-info row">
				<image class="pic" :src="currentSku.image || infoData.thumb" mode="aspectFill"></image>
				<view class="right column">
					<text class="price">￥{{ currentSku.price || infoData.price }}</text>
					<text class="stock">库存：{{ currentSku.stock || infoData.stock || 0 }}</text>
					<view v-if="skuList.length > 0" class="attr-wrap row">
						<text class="tit">规格：{{ currentSku.name || '' }}</text>
					</view>
				</view>
			</view>
				<!-- 规格 -->
			<scroll-view class="c-wrap" scroll-y="true">
				<view class="sku-list fill">
					<view v-for="(item, index) in specList" :key="index">
						<text class="s-tit">{{ item.name }}</text>
						<!-- 规格值 -->
						<view class="attrs">
							<view 
								class="attr round center" 
								:class="{active: aItem.checked, disabled: aItem.disabled}"
								v-for="(aItem, aIndex) in item.attrList" 
								:key="aIndex"
								@click="chooseAttr(aItem, item)"
							>
								<text>{{ aItem.name }}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="number-wrap row">
					<text class="s-tit fill">数量</text>
					<mix-number-box :value="buyNumber" :min="1" :max="currentSku.stock || 999" @eventChange="onNumberChange"></mix-number-box>
				</view>
			</scroll-view>
			<view class="btn-wrap row">
				<view v-if="type==='cart' || type==='buy'" class="confirm-btn center" @click="confirm(type)">
					<text>确认</text>
				</view>
				<view v-else class="sm row">
					<view class="btn center" @click="confirm('cart')">
						<text>加入购物车</text>
					</view>
					<view class="btn center" @click="confirm('buy')">
						<text>立即购买</text>
					</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
	import {getUnique} from '@/common/js/util'
	export default {
		data() {
			return {
				type: '', //cart加入购物车 buy立即购买
				buyNumber: 1,
				specList: [], //规格
				skuList: [],
				currentSku: {}
			}
		},
		props: {
			infoData: {
				type: Object,
				default(){
					return {}
				}
			}
		},
		created() {
			if(!this.infoData.skuData){
				return;
			}
			const {specList, attrList, skuList} = this.infoData.skuData;
			if(!specList || !attrList || !skuList || specList.length===0 || attrList.length===0 || skuList.length===0){
				return;
			}
			this.specList = specList.map(item=> {
				item.attrList = attrList.filter(attr=> attr.parent === item.name).map((attr, index)=>{
					return {
						checked: index === 0,
						...attr
					}
				})
				return item;
			});
			this.skuList = this.infoData.sku;
			this.renderChecked();
		},
		methods: {
			//结算
			confirm(type){
				this.$emit(type === 'cart' ? 'addToCart' : 'buyNow');
			},
			//选择规格值
			chooseAttr(item, parent){
				if(item.checked){
					return;
				}
				parent.attrList.forEach(attr=>{
					if(attr.name !== item.name){
						attr.checked = false;
					}
				})
				item.checked = true;
				this.renderChecked();
			},
			//处理选中值
			renderChecked(){
				const {
					specList,
					skuList,
					buyNumber
				} = this;
				const attrs = specList.map(item=> item.attrList.filter(attr=> attr.checked)[0].name).join(' ');
				this.currentSku = skuList.filter(item=> item.name === attrs)[0];
				
				this.$emit('setSku', {
					...this.currentSku
				});
			},
			//修改数量
			onNumberChange(e){
				this.buyNumber = e.number;
			},
			open(type){
				this.type = typeof type === 'string' ? type: '';
				this.$refs.popup.open();
			},
			close(){
				this.$refs.popup.close();
			}
		}
	}
</script>

<style scoped lang="scss">
	.content{
		width: 750rpx;
		background-color: #fff;
		border-radius: 10rpx 10rpx 0 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom); 
		position: relative;
	}
	.icon-guanbi{
		position: absolute;
		right: 10rpx;
		top: 10rpx;
		padding: 20rpx;
		font-size: 32rpx;
		color: #999;
	}
	.pro-info{
		padding: 30rpx 32rpx 16rpx;
		
		.pic{
			flex-shrink: 0;
			width: 160rpx;
			height: 160rpx;
			margin-right: 20rpx;
			background-color: #f7f7f7;
			border-radius: 10rpx;
		}
		.price{
			padding-top: 10rpx;
			margin-bottom: 26rpx;
			font-size: 34rpx;
			color: $base-color;
			font-weight: 700;
		}
		.stock{
			margin-bottom: 20rpx;
			font-size: 24rpx;
			color: #999;
		}
		.attr-wrap{
			flex-wrap: wrap;
			
			text{
				line-height: 1.4;
				font-size: 24rpx;
				color: #333;
			}
			.attr{
				flex-shrink: 0;
				margin-right: 10rpx;
				color: #999;
				
				&.checked{
					color: #333;
				}
			}
		}
	}
	.s-tit{
		margin-left: 42rpx;
		font-size: 30rpx;
		color: #333;
		font-weight: 700;
		line-height: 90rpx;
	}
	.c-wrap{
		min-height: 20vh;
		max-height: 60vh;
	}
	.sku-list{
		.attrs{
			display: flex;
			flex-wrap: wrap;
			padding-left: 32rpx;
			padding-right: 20rpx;
		}
		.attr{
			min-width: 58rpx;
			height: 58rpx;
			padding: 0 24rpx;
			margin-right: 20rpx;
			margin-bottom: 20rpx;
			font-size: 26rpx;
			color: #333;
			
			&:after{
				border-color: #e0e0e0;
			}
			&.active{
				color: $base-color;
				background-color: rgba(255, 82, 111, .03);
			
				&:after{
					border-color: rgba(255, 82, 111, .5);
				}
			}
			&.disabled{
				background-color: #ddd;
			}
		}
	}
	.number-wrap{
		padding-right: 40rpx;
	}
	.btn-wrap{
		align-items: flex-end;
		justify-content: center;
		padding: 36rpx 0 30rpx;
	}
	.confirm-btn{
		width: 670rpx;
		height: 84rpx;
		background-color: $base-color;
		font-size: 32rpx;
		color: #fff;
		border-radius: 100rpx;
	}
	.sm{
		width: 670rpx;
		margin: 0 auto;
		
		.btn{
			flex: 1;
			height: 84rpx;
			font-size: 32rpx;
			color: #fff;
			background-color: orange;
			border-radius: 100rpx 0 0 100rpx;
			
			&:last-child{
				background-color: $base-color;
				border-radius: 0 100rpx 100rpx 0;
			}
		}
	}
</style>
