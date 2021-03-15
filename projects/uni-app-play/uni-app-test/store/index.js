import Vue from 'vue'
import Vuex from 'vuex'
import {request} from '@/common/js/request'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		openExamine: false,//是否开启审核状态
		token: '',
		userInfo: {},
		timerIdent: false,//全局1s定时器，只在全局开启一个，所有需要定时执行的任务监听该值即可，无需额外开启
		cartCount: 0, //购物车数量
		orderCount: {}, //订单数量
		couponCount: 0, //可用优惠券数量
	},
	getters: {
		hasLogin(state){
			return !!state.token;
		}
	},
	mutations: {
		//更新state数据
		setStateAttr(state, param){
			if(param instanceof Array){
				for(let item of param){
					state[item.key] = item.val;
				}
			}else{
				state[param.key] = param.val;
			}
		},
		//更新token
		setToken(state, data){
			const {token, tokenExpired} = data;
			state.token = token;
			uni.setStorageSync('uniIdToken', token);
			uni.setStorageSync('tokenExpired', tokenExpired);
			this.dispatch('getUserInfo'); //更新用户信息
			this.dispatch('getCartCount');//更新购物车数量
			uni.$emit('refreshCart');//刷新购物车
			this.dispatch('getOrderCount'); //更新订单数量
		},
		//退出登录
		logout(state){
			state.token = '';
			uni.removeStorageSync('uniIdToken');
			this.dispatch('getCartCount');//更新购物车数量
			uni.$emit('refreshCart');//刷新购物车
			this.dispatch('getOrderCount'); //更新订单数量
			setTimeout(()=>{
				state.userInfo = {};
			}, 1100)
		},
	},
	actions: {
		//更新用户信息
		async getUserInfo({state, commit}){
			const res = await request('user', 'get', {}, {
				checkAuthInvalid: false
			});
			if(res.status === 1){
				const userInfo = res.data;
				commit('setStateAttr', {
					key: 'userInfo',
					val: userInfo
				})
			}
		},
		//更新购物车数量
		async getCartCount({state, commit}){
			let count = 0;
			if(state.token){
				try {
					const res = await request('cart', 'count');
					count = res.total || 0;
				}catch (err){
					console.error('更新购物车数量 => ', err);
				}
			}
			commit('setStateAttr', {
				key: 'cartCount',
				val: count
			})
		},
		//更新用户订单数量
		async getOrderCount({state, commit}){
			let data = {
				c0: 0,
				c1: 0,
				c2: 0,
				c3: 0
			}
			if(state.token){
				try {
					const res = await request('order', 'getOrderCount');
					data = res;
				}catch (err){
					console.error('更新用户订单数量 => ', err);
				}
			}
			commit('setStateAttr', {
				key: 'orderCount',
				val: data
			})
		},
		//更新用户优惠券数量
		async getCouponCount({state, commit}){
			let count = 0;
			if(state.token){
				try {
					const res = await request('coupon', 'getUserCouponCount');
					count = res.total;
					console.log(res);
				}catch (err){
					console.error('更新用户优惠券数量 => ', err);
				}
			}
			commit('setStateAttr', {
				key: 'couponCount',
				val: count
			})
		},
	}
}) 


export default store
