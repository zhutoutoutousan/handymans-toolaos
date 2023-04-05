// #ifdef MP-WEIXIN
/* 小程序端 */
export default{
	onLoad() {
		this.loadHotList('refresh');
	},
	onPullDownRefresh() {
		this.loadHotList('refresh');
	},
	onReachBottom(){
		this.loadHotList();
	},
	methods: {
		//加载热门推荐列表
		async loadHotList(type='add'){
			if(type === 'add'){
				if(this.loadingType === 2) return;
				this.page = this.page + 1;
				this.$refs.productList.loadType = 'add';
			}else{
				this.page = 1;
				this.hotList = [];
				if(this.$refs.productList){
					this.$refs.productList.loadType = 'refresh';
				}
			}
			this.loadingType = 1;
			const res = await this.$request('product', 'getHotList', {
				offset: (this.page - 1) * 10,
				limit: 10,
			});
			const curList = res.data;
			this.hotList = this.hotList.concat(curList); //追加新数据
			if(type === 'refresh'){
				uni.stopPullDownRefresh();//结束加载状态
			}
			setTimeout(()=>{
				this.loadingType = curList.length < 10 ? 2 : 0;
			}, 300)
		},
	},
}
// #endif

// #ifndef MP-WEIXIN
/* 非小程序端 */
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
export default{
	mixins: [MescrollMixin], 
	data() {
		return {
			upOption:{
				auto: false, // 是否自动加载
				page: {
				 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
				 	size: 10 // 每页数据的数量
				},
				noMoreSize: 1,
			},
		}
	},
	computed: {
		headerHeight(){
			return 750 / uni.upx2px(750) * (this.systemInfo.navigationBarHeight + this.systemInfo.statusBarHeight);
		}
	},
	methods: {
		//加载热门推荐列表
		async loadHotList(e){
			if(e.num === 1){
				//第一页清空数据重载
				this.hotList = [];
				if(this.$refs.productList){
					this.$refs.productList.loadType = 'refresh';
				}
			}else{
				this.$refs.productList.loadType = 'add';
			}
			const res = await this.$request('product', 'getHotList', {
				offset: (e.num - 1) * e.size,
				limit: e.size,
			});
			const curList = res.data;
			this.hotList = this.hotList.concat(curList); //追加新数据
			this.mescroll.endSuccess(curList.length); //结束加载状态
			
			console.log(JSON.parse(JSON.stringify(res.data)));
		},
		mescrollInit(mescroll){
			this.isLoading = true;
			this.mescroll = mescroll;
			this.mescroll.resetUpScroll(false)
		}
	},
}
// #endif
