export default{
	// #ifdef MP-WEIXIN
	data(){
		return {
			mpCodeTimer: 0,
			mpWxCode: '',
		}
	},
	computed: {
		timerIdent(){
			return this.$store.state.timerIdent;
		}
	},
	watch: {
		timerIdent(){
			this.mpCodeTimer ++;
			if(this.mpCodeTimer % 30 === 0){
				this.getMpWxCode();
			}
		}
	},
	onShow(){
		this.getMpWxCode();
	},
	methods: {
		//微信小程序登录
		mpWxGetUserInfo(userInfoData){
			if(!userInfoData.detail.userInfo){
				return;
			}
			if(!this.agreement){
				this.$util.msg('请阅读并同意用户服务及隐私协议');
				return;
			}
			this.$util.throttle(async ()=>{
				const [err, userData] = await uni.getUserInfo();
				const res = await this.$request('user', 'loginByWeixin', {
					code: this.mpWxCode,
					encryptedData: userData.encryptedData,
					iv: userData.iv,
					userInfo: JSON.parse(userData.rawData)
				}, {
					showLoading: true
				});
				if(res.status === 0){
					this.$util.msg(res.msg);
					return;
				}
				if(res.hasBindMobile && res.data.token){
					this.loginSuccessCallBack({
						token: res.data.token,
						tokenExpired: res.data.tokenExpired
					});
				}else{
					this.navTo('/pages/auth/bindMobile?data='+JSON.stringify(res.data))
				}
				console.log(res);
			})
		},
		//获取code
		getMpWxCode(){
			uni.login({
				provider: 'weixin',
				success: res=> {
					this.mpWxCode = res.code;
				}
			})
		},
		
	}
	// #endif
}









