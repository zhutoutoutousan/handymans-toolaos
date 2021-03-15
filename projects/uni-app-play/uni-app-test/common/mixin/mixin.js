import {request} from '@/common/js/request'

export default{
	data(){
		return {
			page: 0, //页码
			pageNum: 6, //每页加载数据量
			loadingType: 1, //0加载前 1加载中 2没有更多
			isLoading: false, //刷新数据
			loaded: false, //加载完毕
		}
	},
	methods: {
		log(data){
			console.log(JSON.parse(JSON.stringify(data)))
		},
		
		
		/**
		 * navigatorTo跳转页面
		 * @param {String} url
		 * @param {Object} options
		 * @param {Boolean} options.login 是否检测登录  
		 */
		navTo(url, options={}){
			this.$util.throttle(()=>{
				if(!url){
					return;
				}
				if((~url.indexOf('login=1') || options.login) && !this.$store.getters.hasLogin){
					url = '/pages/auth/login';
				}
				uni.navigateTo({
					url
				})
			}, 300)
		},
		/**
		 * $request云函数请求
		 * @param {String} module
		 * @param {String} operation
		 * @param {Boolean} data 请求参数
		 * @param {Boolean} ext 附加参数
		 * @param {Boolean} ext.showLoading 是否显示loading状态，默认不显示
		 * @param {Boolean} ext.hideLoading 是否关闭loading状态，默认关闭
		 * @param {Boolean} ext.login 未登录拦截
		 * @param {Boolean} ext.setLoaded 加载完成是设置页面加载完毕
		 */
		$request(module, operation, data={}, ext={}){
			if(ext.login && !this.$util.isLogin()){
				return;
			}
			if(ext.showLoading){
				this.isLoading = true;
			}
			return new Promise((resolve, reject)=> {
				request(module, operation, data, ext).then(result => {
					if(ext.hideLoading !== false){
						this.isLoading = false;
					}
					setTimeout(()=>{
						if(this.setLoaded !== false){
							this.loaded = true;
						}
					}, 100)
					this.$refs.confirmBtn && this.$refs.confirmBtn.stop();
					resolve(result);
				}).catch((err) => {
					reject(err);
				})
			})
		},
		imageOnLoad(data, key){
			setTimeout(()=>{
				this.$set(data, 'loaded', true);
			}, 100)
		},
		showPopup(key){
			this.$util.throttle(()=>{
				this.$refs[key].open();
			}, 200)
		},
		hidePopup(key){
			this.$refs[key].close();
		},
		stopPrevent(){},
	},
}