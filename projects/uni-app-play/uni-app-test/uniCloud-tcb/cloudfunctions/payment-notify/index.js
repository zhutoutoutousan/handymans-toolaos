'use strict';
const {
	wxConfigMp,
	wxConfigApp,
	aliConfigMp,
	aliConfigApp,
} = require('config')
const uniPay = require('unipay')

const db = uniCloud.database();

exports.main = async (event, context) => {
	let uniPayInstance
	let payType;
	const path = event.path.substring(1);
	switch (path.split('/')[1]) {
		case 'wxpay_mp-weixin':
			uniPayInstance = uniPay.initWeixin(wxConfigMp)
			payType = 'wxpay';
			break;
		case 'alipay_mp-alipay':
			uniPayInstance = uniPay.initAlipay(aliConfigMp)
			payType = 'alipay';
			break;
		case 'wxpay_app-plus':
			uniPayInstance = uniPay.initWeixin(wxConfigApp)
			payType = 'wxpay';
			break;
		case 'alipay_app-plus':
			uniPayInstance = uniPay.initAlipay(aliConfigApp)
			payType = 'alipay';
			break;
		default:
			await db.collection('log').add({
				err: '参数错误',
				event
			})
			return {
				code: -1,
				msg: '参数错误'
			}
	}
	let verifyResult = await uniPayInstance.verifyPaymentNotify(event)
	if (!verifyResult) {
		return {}
	}
	let {
		outTradeNo,
		totalFee,
		transactionId,
		resultCode
	} = verifyResult
	
	
	const orderType = path.split('/')[0];
	let orderDb;
	if(orderType === 'payOrder'){
		orderDb = db.collection('mix-order');
	}else if(orderType === 'recharge'){
		orderDb = db.collection('mix-recharge');
	}else{
		return {}
	}
	const orderList = await orderDb.where({
		order_number: outTradeNo
	}).get()
	if (orderList.data.length === 0) {
		return {}
	}
	const orderDetail = orderList.data[0]
	if (totalFee !== orderDetail.price_data.pay_price * 100 || (resultCode !== 'SUCCESS' && resultCode !== 'FINISHED')) {
		return {}
	}
	//订单已支付
	if(orderDetail.pay_status === 1){
		return {};
	}
	
	const userData = await db.collection('mix-uni-id-users').doc(orderDetail.uid).get();
	//更新订单信息
	if(orderType === 'payOrder'){
		//商品订单
		const timeline = orderDetail.timeline;
		timeline.unshift({
			time: + new Date(),
			title: '订单支付成功',
			type: '支付订单'
		})
		await orderDb.doc(orderDetail._id).update({
			pay_type: payType,
			pay_status: 1,
			status: 1,
			status_tip: '订单支付成功，商品正在出库',
			timeline
		})
		//记录流水
		await db.collection('mix-money-log').add({
			uid: orderDetail.uid,
			title: '支付订单 ' + outTradeNo,
			type: 'pay_order',
			add_time: + new Date,
			money: - orderDetail.price_data.pay_price,
			username: userData.data[0].username,
			pay_type: payType
		})
	}else if(orderType === 'recharge'){
		//余额充值
		const transaction = await db.startTransaction();
		let res = await transaction.collection('mix-recharge').doc(orderDetail._id).update({
			pay_type: payType,
			pay_status: 1
		})
		if(res.updated !== 1){
			await transaction.rollback()
			return {}
		}
		res = await transaction.collection('mix-uni-id-users').doc(orderDetail.uid).update({
			money: db.command.inc(+orderDetail.price_data.pay_price)
		})
		if(res.updated !== 1){
			await transaction.rollback()
			return {}
		}
		//记录流水
		res = await transaction.collection('mix-money-log').add({
			uid: orderDetail.uid,
			title: '余额充值-' + (payType === 'wxpay' ? '微信' : '支付宝'), 
			type: 'recharge',
			add_time: + new Date,
			money: +orderDetail.price_data.pay_price,
			username: userData.data[0].username,
			pay_type: payType
		})
		if(res.id){
			await transaction.commit()
		}else{
			await transaction.rollback()
		}
		return {};
	}
	return {}
};
