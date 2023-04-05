<template>
	<view class="app column">
		<view class="cell row b-b" @click="navTo('/pages/set/userInfo')">
			<text class="tit">个人资料</text>
			<text class="mix-icon icon-you"></text>
		</view>
		<view class="cell row b-b">
			<text class="tit">通知设置</text>
			<view v-if="switchDisabled" class="loading">
				<mix-icon-loading size="32rpx" color="#ff536f"></mix-icon-loading>
			</view>
			<switch :checked="receivePush" :disabled="switchDisabled" color="#FF536F" @change="onSwitchChange" />
		</view>
		<view class="cell row b-b" @click="navTo('/pages/auth/payPassword')">
			<text class="tit">支付密码设置</text>
			<text class="mix-icon icon-you"></text>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view class="cell row b-b" @click="checkVersion">
			<text class="tit">检查更新</text>
			<view class="row" @click.stop.prevent="stopPrevent">
				<version-update ref="versionUpdate"></version-update>
			</view>
			<text class="mix-icon icon-you"></text>
		</view>
		<!-- #endif -->
		<view class="cell row b-b" @click="navTo('/pages/set/about')">
			<text class="tit">关于我们</text>
			<text class="mix-icon icon-you"></text>
		</view>

		<mix-button ref="confirmBtn" text="退出登录" marginTop="60rpx" :isConfirm="false" @onConfirm="showPopup('mixModal')"></mix-button>
		
		<mix-modal ref="mixModal" title="提示" text="您确定要退出登录吗" @onConfirm="logout"></mix-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				receivePush: false, //是否接收推送通知
				switchDisabled: false,
			}
		},
		computed: {
			userInfo(){
				return this.$store.state.userInfo;
			}
		},
		onLoad() {
			this.receivePush = !!this.userInfo.receive_push;
		},
		methods: {
			async logout(){
				this.$refs.confirmBtn.loading = true;
				const res = await this.$request('user', 'logout');
				this.$refs.confirmBtn.loading = false;
				this.$util.msg('您已退出登录');
				this.$store.commit('logout');
				setTimeout(()=>{
					uni.navigateBack();
				}, 1000)
			},
			//检查更新
			checkVersion(){
				this.$refs.versionUpdate.checkVersion();
			},
			//修改通知接收状态
			async onSwitchChange(e){
				this.switchDisabled = true;
				const val = e.detail.value;
				this.receivePush = val;
				const res = await this.$request('user', 'update', {
					receive_push: val
				});
				if(res.status === 1){
					const userInfo = Object.assign(this.userInfo, {
						receive_push: val
					})
					this.$store.commit('setStateAttr', {
						key: 'userInfo',
						val: userInfo
					});
				}else{
					this.$util.msg('设置失败');
					this.receivePush = !val;
				}
				this.switchDisabled = false;
			}
		}
	}
</script>

<style scoped lang="scss">
	.app{
		padding: 10rpx 44rpx 0;
	}
	.cell{
		height: 106rpx;
		
		.tit{
			flex: 1;
			font-size: 30rpx;
			color: #333;
		}
		.tip{
			margin-right: 10rpx;
			font-size: 26rpx;
			color: #999;
		}
		.icon-you{
			font-size: 24rpx;
			color: #aaa;
		}
		.icon-xuanzhong{
			font-size: 36rpx;
			color: #d8d8d8;
			
			&.active{
				color: $base-color;
			}
		}
		switch{
			transform: scale(0.8) translateX(10rpx);
			transform-origin: center right;
		}
		.loading{
			transform: translateX(8rpx);
		}
	}
</style>
