<template>
	<view class="app">
		<view class="page-tit row">
			<text class="f-m">绑定手机号码</text>
		</view>
		<view class="input-wrap pwd-wrap row b-b">
			<text class="mix-icon icon-shoujihaoma"></text>
			<input class="input" v-model="mobile" type="number" maxlength="11" placeholder="请输入要绑定的手机号码" placeholder-style="color:#999;font-size:30rpx" />
		</view>
		<view class="input-wrap row b-b">
			<text class="mix-icon icon-yanzhengma1"></text>
			<input class="input" v-model="code" type="number" maxlength="6" placeholder="请输入手机验证码" placeholder-style="color:#999;font-size:30rpx" />
			<mix-code :mobile="mobile" templateCode="SMS_194050994"></mix-code>
		</view>
		
		<mix-button ref="confirmBtn" text="提交" marginTop="80rpx" @onConfirm="confirm"></mix-button>
	</view>
</template>

<script>
	import {checkStr} from '@/common/js/util'
	export default {
		data() {
			return {
				mobile: '',
				code: ''
			}
		},
		onLoad(options) {
			this.type = options.type || 'weixin'; //apple  weixin
			this.data = JSON.parse(options.data);
		},
		methods: {
			async confirm(){
				const {mobile, code} = this;
				if(!checkStr(mobile, 'mobile')){
					this.$util.msg('手机号码格式不正确');
					this.$refs.confirmBtn.stop();
					return;
				}
				if(!checkStr(code, 'mobileCode')){
					this.$util.msg('验证码错误');
					this.$refs.confirmBtn.stop();
					return;
				}
				const oparation = this.type === 'apple' ? 'appleRegister' : 'wxRegister';
				const res = await this.$request('user', oparation, {
					username: mobile,
					code,
					...this.data
				});
				this.$util.msg(res.msg);
				this.$refs.confirmBtn.stop();
				if(res.status === 1){
					this.$util.msg('登陆成功');
					this.$store.commit('setToken', res.data);
					setTimeout(()=>{
						uni.navigateBack({
							delta: 2
						});
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
