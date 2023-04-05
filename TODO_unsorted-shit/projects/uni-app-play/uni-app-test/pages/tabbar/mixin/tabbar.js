export default{
	computed: {
		cartCount(){
			return this.$store.state.cartCount;
		}
	},
	watch: {
		cartCount(count){
			this.resetTabCartCount();
		}
	},
	onShow(){
		this.resetTabCartCount();
	},
	methods: {
		resetTabCartCount(){
			if(this.cartCount > 0){
				uni.setTabBarBadge({
					index: 2,
					text: '' + this.cartCount
				})
			}else{
				uni.removeTabBarBadge({
					index: 2
				})
			}
		}
	}
}