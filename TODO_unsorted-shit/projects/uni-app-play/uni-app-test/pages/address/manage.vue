<template>
	<view class="app">
		<view class="cell row b-b">
			<text class="tit">收货人</text>
			<input class="input" type="text" maxlength="10" v-model="data.name" placeholder="请输入收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="cell row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" maxlength="11" v-model="data.mobile" placeholder="请输入收货人手机号码" placeholder-class="placeholder" />
		</view>
		<view class="cell row b-b" @click="chooseAddress">
			<text class="tit">地址</text>
			<text class="input clamp" :class="{placeholder: !data.address.address}">
				{{ data.address.address ? 
					data.address.address + ' ' + data.address.room :
					'请在地图选择收货地址' 
				}}
			</text>
			<text class="mix-icon icon-you"></text>
		</view>
		<view class="cell row b-b">
			<text class="tit fill">设为默认地址</text>
			<switch :checked="data.is_default" color="#FF536F" @change="onSwitchChange" />
		</view>
		
		<mix-button ref="confirmBtn" text="提交" marginTop="60rpx" @onConfirm="submit"></mix-button>
	</view>
</template>

<script>
	import {checkStr} from '@/common/js/util'
	export default {
		data() {
			return {
				data: {
					is_default: true,
					address: {}
				}
			}
		},
		onLoad(options) {
			if(options.data){
				this.data = JSON.parse(options.data)
			}
		},
		methods: {
			async submit(){
				const data = this.data;
				if(!data.name){
					this.$util.msg('请输入收货人姓名');
					this.$refs.confirmBtn.stop();
					return;
				}
				if(!checkStr(data.mobile, 'mobile')){
					this.$util.msg('请输入正确的手机号码');
					this.$refs.confirmBtn.stop();
					return;
				}
				if(!data.address.address){
					this.$util.msg('请选择收货地址');
					this.$refs.confirmBtn.stop();
					return;
				}
				const operation = data._id ? 'update' : 'add';
				const res = await this.$request('address', operation, data);
				this.$util.msg(res.msg);
				if(res.status === 1){
					this.$util.prePage().loadData();
					setTimeout(()=>{
						uni.navigateBack();
					}, 1000)
				}
			},
			//选择地址
			chooseAddress(){
				let url = '/pages/chooseAddress/index';
				if(this.data.address.title){
					url += `?data=${JSON.stringify(this.data.address)}`; 
				}
				this.navTo(url);
			},
			//选择地址回调
			setAddress(e){
				console.log(JSON.stringify(e));
				this.data.address = e;
			},
			onSwitchChange(e){
				this.data.is_default = e.detail.value;
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
			min-width: 130rpx;
			font-size: 30rpx;
			color: #333;
		}
		.input{
			flex: 1;
			font-size: 30rpx;
			color: #333;
		}
		.icon-you{
			flex-shrink: 0;
			margin-right: 8rpx;
			margin-left: 40rpx;
			font-size: 24rpx;
			color: #aaa;
		}
		switch{
			transform: scale(0.8) translateX(10rpx);
			transform-origin: center right;
		}
	}
</style>
