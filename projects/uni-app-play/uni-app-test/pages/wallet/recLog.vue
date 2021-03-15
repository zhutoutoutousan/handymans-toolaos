<template>
	<view class="app">
		<view v-if="!openExamine">
			<view class="page-tit">
				<text>充值金额</text>
			</view>
			<view class="price-list">
				<view 
					class="p-item center" 
					:class="{active: item.checked}"
					v-for="(item, index) in moneyList" 
					:key="index"
					@click="checkePrice(item)"
				>
					<text>{{ item.money }}元</text>
				</view>
			</view>
			<view class="input-wrap row">
				<text>其他金额</text>
				<input v-model="money" type="number" maxlength="10" class="input" placeholder="请输入其他金额" placeholder-style="color: #999" />
			</view>
			<view class="page-tit">
				<text class="f-b">选择支付方式</text>
			</view>
			<view class="cell row b-b" @click="checkType('wxpay')">
				<image class="icon" :src="'/static/icon/wxpay.png'"></image>
				<view class="column fill">
					<text class="tit">微信支付</text>
				</view>
				<text v-if="curType === 'wxpay'" class="mix-icon icon-xuanzhong"></text>
			</view>
			<!-- #ifndef MP-WEIXIN -->
			<view class="cell row b-b" @click="checkType('alipay')">
				<image class="icon" :src="'/static/icon/alipay.png'"></image>
				<view class="column fill">
					<text class="tit">支付宝</text>
				</view>
				<text v-if="curType === 'alipay'" class="mix-icon icon-xuanzhong"></text>
			</view>
			<!-- #endif -->
			
			<mix-button ref="confirmBtn" text="确认充值" marginTop="80rpx" @onConfirm="confirm"></mix-button>
		</view>
		
		<mix-empty v-else></mix-empty>
		
		<mix-loading v-if="isLoading" :mask="true"></mix-loading>
		<!-- 支付成功面板 -->
		<success-modal ref="successModal" :price="payPrice" btnText="确定" tip="余额充值成功" @onConfirm="successCallback"></success-modal>
	</view>
</template>

<script>
	import successModal from './components/success-modal.vue'
	export default {
		components:{
			successModal
		},
		data() {
			return {
				curType: 'wxpay',
				moneyList: [
					{money: 50, checked: true},
					{money: 100, checked: false},
					{money: 200, checked: false},
					{money: 500, checked: false},
				],
				money: '',
				payPrice: 0,
			}
		},
		computed: {
			openExamine(){
				return this.$store.state.openExamine;
			}
		},
		watch: {
			money(val){
				if(val){
					this.moneyList.forEach(item=> {
						item.checked = false;
					})
				}
			}
		},
		onLoad() {
			if(!this.openExamine){
				uni.setNavigationBarTitle({
					title: '余额充值'
				})
			}else{
				uni.setNavigationBarTitle({
					title: '消费明细'
				})
			}
		},
		methods: {
			confirm(){
				let {curType, moneyList, money} = this;
				const mIndex = moneyList.findIndex(item=> item.checked);
				if(!money && mIndex === -1){
					this.$util.msg('请选择或输入充值金额');
					this.$refs.confirmBtn.stop();
					return;
				}
				money = this.money || this.moneyList[mIndex].money;
				if(isNaN(money)){
					this.$util.msg('请输入正确的充值金额');
					this.$refs.confirmBtn.stop();
					return;
				}
				this.$util.throttle(()=>{
					this.wxpay((+money).toFixed(2));
				})
			},
			//微信支付
			async wxpay(money){
				const res = await this.$request('payment', 'recharge', {
					money: +money,
					pay_type: 'wxpay',
					// #ifdef MP-WEIXIN
					code: await this.getMpCode('weixin'),
					// #endif
				}, {showLoading: true})
				
				this.log(res)
				if(res.status !== 1){
					this.$refs.confirmBtn.stop();
					this.$util.msg(res.msg);
					return;
				}
				const orderInfo = res.data.orderInfo;
				const {timeStamp, nonceStr, paySign} = orderInfo;
				const payParams = {
					provider: this.curType,
					orderInfo: res.data.orderInfo,
					timeStamp,
					nonceStr,
					package: orderInfo.package,
					signType: 'MD5',
					paySign,
					success: e=>{
						this.payPrice = money;
						this.$refs.confirmBtn.death();
						this.$refs.successModal.open();
					}, 
					fail: err=>{
						this.$refs.confirmBtn.stop();
						if(err.errMsg.indexOf('取消') > -1 || err.errMsg.indexOf('cancel') >1 || err.errMsg.indexOf('-2') > -1){
							this.$util.msg('取消支付');
						}else{
							this.$util.msg('支付遇到错误，请稍候重试');
							console.log(err);
						}
					}
				};
				uni.requestPayment(payParams);
			},
			//统一支付回调
			successCallback(){
				this.$store.dispatch('getUserInfo');
				uni.navigateBack();
			},
			checkePrice(item){
				this.moneyList.forEach(item=> {
					item.checked = false;
				})
				this.money = '';
				item.checked = true;
			},
			checkType(type){
				this.curType = type;
			},
			//获取小程序code
			// #ifdef MP
			getMpCode(provider){
				return new Promise((resolve)=>{
					uni.login({
						provider,
						success(res) {
							resolve(res.code)
						}
					})
				})
			}
			// #endif
		}
	}
</script>

<style scoped lang="scss">
	.page-tit{
		padding: 40rpx 0 30rpx 40rpx;
		font-size: 32rpx;
		color: #333;
		line-height: 48rpx ;
		font-weight: 700;
	}
	.price-list{
		display: flex;
		flex-wrap: wrap;
		padding-left: 40rpx;
		
		.p-item{
			width: 160rpx;
			height: 78rpx;
			border-radius: 14rpx;
			margin-bottom: 20rpx;
			margin-right: 10rpx;
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
	.input-wrap{
		height: 130rpx;
		padding: 10rpx 40rpx 0;
		font-size: 32rpx;
		color: #333;
		
		.input{
			flex: 1;
			text-align: right;
			font-size: 28rpx;
			color: #333;
		}
	}
	.cell{
		margin: 0 40rpx;
		height: 124rpx;
		
		.icon{
			width: 40rpx;
			height: 40rpx;
			margin-right: 32rpx;
		}
		.tit{
			flex: 1;
			font-size: 30rpx;
			color: #333;
			font-weight: 700;
		}
		.tip{
			margin-top: 14rpx;
			font-size: 24rpx;
			color: #999;
		}
		.icon-xuanzhong{
			font-size: 36rpx;
			color: $base-color;
		}
	}


</style>
