<template>
	<view class="app">
		<view class="page-tit row">
			<text class="f-m">设置支付密码</text>
		</view>
		<view class="input-wrap pwd-wrap row b-b">
			<text class="mix-icon icon-mima"></text>
			<input class="input" v-model="password" :password="!showPwd" type="number" maxlength="6" placeholder="支付密码，请输入6位数字" placeholder-style="color:#999;font-size:30rpx" />
			<text class="mix-icon icon-eye" :class="showPwd ? 'icon-yanjing': 'icon-biyan'" @click.stop.prevent="changePwdState"></text>
		</view>
		<view class="input-wrap row b-b">
			<text class="mix-icon icon-yanzhengma1"></text>
			<input class="input" v-model="code" type="number" maxlength="6" placeholder="请输入手机验证码" placeholder-style="color:#999;font-size:30rpx" />
			<mix-code templateCode="SMS_194050994" action="设置支付密码"></mix-code>
		</view>
		
		<mix-button ref="confirmBtn" text="提交" marginTop="80rpx" @onConfirm="confirm"></mix-button>
	</view>
</template>

<script>
	import {checkStr} from '@/common/js/util'
	export default {
		data() {
			return {
				showPwd: false,
				password: '',
				code: ''
			}
		},
		methods: {
			async confirm(){
				const {password, code} = this;
				if(!checkStr(password, 'payPwd')){
					this.$util.msg('支付密码应为6位数字');
					this.$refs.confirmBtn.stop();
					return;
				}
				if(!checkStr(code, 'mobileCode')){
					this.$util.msg('验证码错误');
					this.$refs.confirmBtn.stop();
					return;
				}
				const res = await this.$request('user', 'setPayPasswod', {
					username: this.$store.state.userInfo.username,
					pay_password: password,
					code
				});
				this.$util.msg(res.msg);
				this.$refs.confirmBtn.stop();
				if(res.status === 1){
					this.$store.dispatch('getUserInfo');
					setTimeout(()=>{
						uni.navigateBack();
					}, 1000)
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
	.page-tit{
		height: 80rpx;
		padding-left: 50rpx;
		font-size: 34rpx;
		color: #333;
		font-weight: 700;
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
</style>
