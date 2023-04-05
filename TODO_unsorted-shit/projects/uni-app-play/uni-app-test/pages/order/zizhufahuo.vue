<template>
	<view class="app">
		<view class="exp-list">
			<view 
				class="p-item center" 
				:class="{active: item.checked}"
				v-for="(item, index) in list" 
				:key="index"
				@click="checkeRow(item)"
			>
				<text>{{ item.name }}</text>
			</view>
		</view>
		
		<view class="input-wrap row b-b">
			<input 
				class="input" 
				v-model="logistic_code" 
				type="number" 
				placeholder="请输入物流单号" 
				placeholder-style="color:#999;font-size:30rpx" 
			/>
		</view>
		
		<mix-button ref="confirmBtn" text="提交" marginTop="80rpx" @onConfirm="confirm"></mix-button>
		<view class="page-tip row" style="margin-top: 50rpx;">
			<text>1.为方便演示开通本功能，商用请关闭本模块</text>
		</view>
		<view class="page-tip row">
			<text>2.物流接口为免费接口，查询量有限，不保证查询成功率</text>
		</view>
	</view>
</template>

<script>
	import {checkStr} from '@/common/js/util'
	export default {
		data() {
			return {
				list: [],
				logistic_code: ''
			}
		},
		onLoad(options) {
			this.order_id = options.id;
			this.loadExpList()
		},
		methods: {
			async loadExpList(){
				const res = await this.$request('express', 'getExpressComp');
				this.list = res.data.map((item, index)=> {
					item.checked = index === 0 ? true: false;
					return item;
				});
			},
			checkeRow(item){
				this.list.forEach(item=>{
					item.checked = false;
				})
				item.checked = true;
			},
			/* 
			 * @param {String} request.order_id
			 * @param {String} request.shipper_code 物流公司代码
			 * @param {String} request.shipper_name 物流公司名称
			 * @param {String} logistic_code 快递单号
			 */
			
			async confirm(){
				const {logistic_code, list, order_id} = this;
				if(!logistic_code){
					this.$util.msg('请输入物流单号');
					this.$refs.confirmBtn.stop();
					return;
				}
				const curExp = this.list.filter(item=> item.checked)[0];
				const res = await this.$request('express', 'deliveryOrder', {
					order_id,
					logistic_code,
					shipper_code: curExp.code,
					shipper_name: curExp.name
				})
				if(res.status == 1){
					this.$util.msg('发货成功');
					if(this.$util.prePage().refreshList){
						this.$util.prePage().refreshList(false);
					}else{
						this.$util.prePage().loadData();
					}
					
					setTimeout(()=>{
						uni.navigateBack();
					}, 1000)
				}else{
					this.$util.msg(res.msg);
				}
			},
			changePwdState(){
				this.showPwd = !this.showPwd;
			}
		}
	}
</script>

<style scoped lang="scss">
	.app{
		padding-top: 30rpx;
	}
	.page-tip{
		padding: 6rpx 50rpx 6rpx 40rpx;
		font-size: 28rpx;
		color: #999;
		
		text{
			line-height: 1.5;
		}
	}
	.input-wrap{
		height: 110rpx;
		margin: 20rpx 50rpx 0;
		padding-right: 20rpx;
		
		&.pwd-wrap{
			position: relative;
			z-index: 100;
		}
		.input{
			flex: 1;
			font-size: 32rpx;
			color: #333;
		}
		.mix-icon{
			width: 60rpx;
			font-size: 40rpx;
			color: $base-color;
		}
		.icon-eye{
			width: auto;
			padding: 20rpx;
			font-size: 36rpx;
			color: #999;
			transform: translateX(14rpx);
		}
	}
	.exp-list{
		display: flex;
		flex-wrap: wrap;
		padding-left: 40rpx;
		
		.p-item{
			width: 180rpx;
			height: 72rpx;
			border-radius: 14rpx;
			margin-bottom: 20rpx;
			margin-right: 24rpx;
			background-color: #efefef;
			font-size: 28rpx;
			color: #999;
			border: 1rpx solid #d7d7d7;
			
			&.active{
				background:linear-gradient(131deg, #ff7e94, #fb4361);
				color: #fff;
				border: 0;
			}
		}
	}
</style>
