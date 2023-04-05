import Vue from 'vue'
import {
	date
} from '@/common/js/util'


Vue.filter('date', (timeStamp, format='Y-m-d H:i')=>{
	if(!timeStamp) return '';
	return date(format, timeStamp);
})

Vue.filter('friendDate', (timeStamp, format='Y-m-d H:i')=>{
	if(!timeStamp) return '';
	return date(format, timeStamp);
})

Vue.filter('price', (price, fixed=0)=>{
	if(!price || isNaN(price)){
		return 0
	}
	return fixed > 0 ? parseFloat(price).toFixed(fixed) : + parseFloat(price).toFixed(2);
})