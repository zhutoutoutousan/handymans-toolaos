<template>
	<view class="app column">
		<jyf-parser 
			ref="article"
			:html="data.content" 
			lazy-load 
			show-with-animation 
		></jyf-parser>
		
		<mix-loading v-if="isLoading" :type="2"></mix-loading>
	</view>
</template>

<script>
	import jyfParser from '@/components/jyf-parser/jyf-parser.vue'
	export default {
		components: {
			jyfParser
		},
		data() {
			return {
				data: {}
			}
		},
		async onLoad(options) {
			const param = JSON.parse(options.param);
			this.loadData(param);
		},
		methods: {
			async loadData(param){
				const {module, operation, data} = param;
				const res = await this.$request(module, operation, data, {
					showLoading: true
				})
				if(res.status === 0){
					this.$util.msg(res.msg || '获取失败');
					setTimeout(()=>{
						uni.navigateBack();
					}, 1000)
				}
				uni.setNavigationBarTitle({
					title: res.data.name
				})
				this.data = {
					...res.data,
					content: res.data.content.replace(/\<img/gi, '<img style="width:100%;height:auto;max-width:750rpx;border-radius: 6rpx"')
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.app{
		padding: 10rpx 30rpx 30rpx;
		font-size: 30rpx;
		color: #333;
		line-height: 46rpx;
	}
</style>
