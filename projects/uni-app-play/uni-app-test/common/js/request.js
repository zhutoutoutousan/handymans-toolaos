import store from '@/store'
import cache from './cache'
import {
	msg
} from './util'


//云函数映射
const moduleMap = {
	user: 'mix-user',
	payment: 'mix-order',
	order: 'mix-order',
	smsCode: 'mix-sms',
	address: 'mix-address',
	live: 'mix-live',
	coupon: 'mix-coupon'
}

/**
 * @param {String} module  
 * @param {String} operation  
 * @param {Object} data 请求参数
 * @param {Object} ext 附加参数
 * @param {Number} ext.cache 数据缓存时间，秒
 */
export const request = (module, operation, data={}, ext={})=>{
	return new Promise((resolve, reject) => {
		const cloudFnName = moduleMap[module] || 'mix-uniapp';
		if(ext.cache > 0){
			const cacheResult = cache.get(cloudFnName + '-' + module+ '-' +operation);
			if(cacheResult !== false && cacheResult.status !== 0){
				resolve(cacheResult);
				return;
			}
		}
		uniCloud.callFunction({
			name: cloudFnName,
			data: {
				module,
				operation,
				data
			}
		}).then(res=>{
			if(res.result && typeof res.result.openExamine !== 'undefined'){
				store.commit('setStateAttr', {
					key: 'openExamine',
					val: res.result.openExamine
				});
			}
			if(res.result){
				const code = res.result.code;
				//token无效
				if(code === 30201 || code === 30202 || code === 30203 || code === 30204){
					msg('登录信息已过期，请重新登录');
					store.commit('logout');
					reject('无效的登录信息');
					return;
				}else if(code === 10001){
					msg('用户已被禁用，请联系客服处理');
					if(operation !== 'login' && operation !== 'loginByWeixin'){
						store.commit('logout');
					}
					setTimeout(()=>{
						uni.switchTab({
							url: '/pages/tabbar/home'
						})
					}, 1200)
					reject('用户被禁用');
					return;
				}
			}
			if(ext.cache > 0){
				cache.put(cloudFnName + '-' + module+ '-' +operation, res.result, ext.cache);
			}
			resolve(res.result);
		}).catch((err) => {
			reject(err);
		})
	})
}
