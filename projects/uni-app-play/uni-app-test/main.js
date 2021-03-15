import Vue from 'vue'
import App from './App'
import config from './config'
import store from './store'
import {
	msg,
	isLogin,
	debounce,
	throttle,
	prePage,
	date
} from '@/common/js/util'

import filter from './common/filter/filter'
import mixin from './common/mixin/mixin'
Vue.mixin(mixin) 

Vue.prototype.$store = store
Vue.prototype.$config = config
Vue.prototype.$util = {
	msg,
	isLogin,
	debounce,
	throttle,
	prePage,
	date
}

// 注册全局组件
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
