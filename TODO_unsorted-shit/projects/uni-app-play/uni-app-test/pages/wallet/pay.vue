<template>
	<view class="app column">
		<view class="price-wrapper center column">
			<text>支付金额</text>
			<text class="price">{{ data.pay_price | price(2) }}</text>
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
		<view class="cell row b-b" @click="checkType('balance')">
			<image class="icon" :src="'/static/icon/balance.png'"></image>
			<view class="column fill">
				<text class="tit">余额</text>
				<text class="tip">账户可用余额 ￥{{ userInfo.money | price }}</text>
			</view>
			<text v-if="curType === 'balance'" class="mix-icon icon-xuanzhong"></text>
		</view>
		
		<mix-button ref="confirmBtn" text="确认支付" marginTop="80rpx" @onConfirm="confirm"></mix-button>
		<!-- 支付成功面板 -->
		<success-modal ref="successModal" :price="data.pay_price" @onConfirm="successCallback"></success-modal>
		<!-- 支付密码键盘 -->
		<pay-password-keyboard ref="pwdKeyboard" @onConfirm="balancePay"></pay-password-keyboard>
		
		<mix-loading v-if="isLoading" :mask="true"></mix-loading>
		
		<mix-modal ref="mixModal" text="您还没有设置支付密码" confirmText="立即设置" @onConfirm="navTo('/pages/auth/payPassword')"></mix-modal>
	</view>
</template>

<script>
	import successModal from './components/success-modal.vue'
	export default {
		components: {
			successModal
		},
		data() {
			return {
				curType: 'wxpay',
				data: {
				/* 	order_id: '5f1534f0bb1edd0001a93a2c',
					pay_price: 450,
					sourcePage: 'createOrder' */
				}
			}
		},
		computed: {
			userInfo(){
				return this.$store.state.userInfo;
			}
		},
		onLoad(options) {
			const data = JSON.parse(options.data);
			this.data = data;
		},
		methods: {
			confirm(){
				this.$util.throttle(()=>{
					if(this.curType === 'balance'){
						if(!this.userInfo.money || this.userInfo.money < this.data.pay_price){
							this.$util.msg('余额不足');
							this.$refs.confirmBtn.stop();
							return;
						}
						if(!this.userInfo.pay_password){
							this.$refs.mixModal.open();
							this.$refs.confirmBtn.stop();
							return;
						}
						//余额支付 打开支付密码键盘
						this.$refs.pwdKeyboard.open();
						this.$refs.confirmBtn.stop();
					}else{
						this.payByUnipay();
					}
				})
			},
			//余额支付 提交支付
			async balancePay(pwd){
				const res = await this.$request('order', 'payOrder', {
					order_id: this.data.order_id,
					pay_password: pwd,
					pay_type: this.curType
				}, {showLoading: true})
				if(res.status === 1){
					this.$store.dispatch('getUserInfo');
					this.$refs.pwdKeyboard.close();
					this.$refs.successModal.open();
				}else{
					this.$util.msg(res.msg);
					this.$refs.pwdKeyboard.pwd = '';
				}
			},
			//unipay
			async payByUnipay(){
				// #ifdef H5
				this.$util.msg('h5支付功能正在开发中，请使用小程序或app支付');
				this.$refs.confirmBtn.stop();
				return;
				// #endif
				const res = await this.$request('order', 'payOrder', {
					order_id: this.data.order_id,
					pay_type: this.curType,
					// #ifdef MP-WEIXIN
					code: await this.getMpCode('weixin'),
					// #endif
				}, {showLoading: true})
				if(res.status !== 1){
					this.$refs.confirmBtn.stop();
					console.log(res);
					this.$util.msg(res.msg || '获取支付信息失败');
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
				console.log(payParams);
				uni.requestPayment(payParams);
			},
			//统一支付成功回调
			successCallback(){
				switch(this.data.sourcePage){
					case 'createOrder':
						uni.redirectTo({
							url: '/pages/order/detail?id=' + this.data.order_id
						})
						break;
					case 'orderList':
						this.$util.prePage().refreshList(false);
						uni.redirectTo({
							url: '/pages/order/detail?id=' + this.data.order_id
						})
						break;
					case 'orderDetail':
						this.$util.prePage().loadData();
						uni.navigateBack();
						break;
				}
			},
			//选择支付方式
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
	.app{
		padding: 0 80rpx;
		align-items: center;
		
		/deep/{
			.mix-btn-content{
				width: 560rpx;
			}
		}
	}
	.price-wrapper {
		background-color: #fff;
		height: 260rpx;
		font-size: 28rpx;
		color: #909399;
	
		.price{
			font-size: 56rpx;
			color: #333;
			margin-top: 20rpx;
			font-weight: 600;
			
			&:before{
				content: '￥';
				font-size: 40rpx;
			}
		}
	}
	.cell{
		width: 100%;
		height: 124rpx;
		
		.icon{
			width: 44rpx;
			height: 44rpx;
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
