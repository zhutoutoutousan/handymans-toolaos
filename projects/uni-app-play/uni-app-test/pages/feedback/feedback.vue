<template>
	<view class="app">
		<view class="page-tip row">
			<text>问题和建议</text>
		</view>
		<view class="textarea-wrap">
			<textarea maxlength="150" v-model="content" placeholder="请详细描述您的问题和意见 .." placeholder-style="color:#999" />
		</view>
		<view class="page-tip row">
			<text>相关图片（选填）</text>
		</view>
		<view class="upload-wrap">
			<mix-upload-image ref="mixUploadImage" :length="4"></mix-upload-image>
		</view>
		<view class="page-tip row" style="padding-top: 0;height: 70rpx;">
			<text>联系人</text>
		</view>
		<input v-model="name" class="input-cell" type="text" maxlength="8" placeholder="请留下您的姓名或称呼" placeholder-style="color:#999" />
		<view class="page-tip row">
			<text>联系方式</text>
		</view>
		<input v-model="mobile" class="input-cell" type="number" maxlength="11" placeholder="请输入您的手机号码" placeholder-style="color:#999" />
		
		<mix-button ref="confirmBtn" text="提交" marginTop="80rpx" @onConfirm="confirm"></mix-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				name: '',
				mobile: '',
			}
		},
		methods: {
			async confirm(){
				const {content, name, mobile} = this;
				if(!content){
					this.$util.msg('请输入您的问题或建议');
					this.$refs.confirmBtn.stop();
					return;
				}
				if(!name){
					this.$util.msg('请输入您的姓名或称呼');
					this.$refs.confirmBtn.stop();
					return;
				}
				if(!mobile){
					this.$util.msg('请输入您的手机号码，以便我们与您联系');
					this.$refs.confirmBtn.stop();
					return;
				}
				const data = {
					content, 
					name, 
					mobile,
					images: this.$refs.mixUploadImage.imageList.map(item=> item.url)
				}
				const res = await this.$request('feedback', 'add', data);
				this.$util.msg(res.msg);
				this.$refs.confirmBtn.stop();
				if(res.status == 1){
					setTimeout(()=>{
						uni.navigateBack();
					}, 1000)
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.app{
		padding: 0 34rpx 40rpx;
	}
	.page-tip{
		height: 80rpx;
		padding: 8rpx 6rpx 0;
		font-size: 26rpx;
		color: #666;
	}
	.textarea-wrap{
		padding: 20rpx;
		background-color: #f7f7f7;
		border-radius: 12rpx;
		
		textarea{
			width: 100%;
			height: 200rpx;
			font-size:30rpx;
			color: #333;
			line-height: 1.4;
		}
	}
	.upload-wrap{
		padding-top: 0;
		
		/deep/ {
			.upload-content{
				background-color: #fff;
			}
		}
	}
	.input-cell{
		padding: 0 30rpx;
		height: 88rpx;
		line-height: 88rpx;
		font-size:28rpx;
		color: #333;
		background-color: #f7f7f7;
		border-radius: 12rpx;
	}
</style>




