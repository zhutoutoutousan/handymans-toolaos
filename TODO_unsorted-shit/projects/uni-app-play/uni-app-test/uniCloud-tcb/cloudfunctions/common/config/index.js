'use strict';

const fs = require("fs");

module.exports = {
	//小程序开启审核时隐藏部分模块使用, 提交审核设置为ture隐藏违规模块
	openExamine: false, 
	//应用名称
	appName: '国云商城',
	/**
	 * 微信小程序端对应的微信支付及登录配置配置
	 * 退款需提供Api证书, 将证书放在common/config/cert目录下，然后key下面增加：
	 * pfx: fs.readFileSync(__dirname + '/cert/你的证书.p12')
	 */
	wxConfigMp: {
		appId: '',
		secret: '',
		mchId: '',
		key: ''
	},
	// App端对应的微信支付配置
	wxConfigApp: {
		appId: '',
		mchId: '',
		key: ''
	},
	// 支付宝小程序端对应的支付宝支付及登录配置
	aliConfigMp: {
		mchId: "",
		appId: "",
		alipayPublicKey: "",
		privateKey: "",
	},
	// App端对应的支付宝支付配置
	aliConfigApp: {
		mchId: "",
		appId: "",
		alipayPublicKey: "",
		privateKey: ""
	},
	/**
	 * 支付回调地址
	 * 1.登录uniCloud控制台 https://unicloud.dcloud.net.cn
	 * 2.云函数列表中选择云函数payment-notify->点击详情
	 * 3.在详情 云函数URL化中设置回调地址
	 * 如PATH部分为 https://cloud-guoyunnet-888888.service.tcloudbase.com
	 * 编辑框中设置为 /guoyunnet/payment-notify
	 * 则回调地址为 https://cloud-guoyunnet-888888.service.tcloudbase.com/guoyunnet/payment-notify
	 */
	paymentNotifyUrl: '',
	
	//快递100 配置参数 https://poll.kuaidi100.com/manager/page/document/synquery
	kuaidi100: {
		customer: '', 
		key: '', //快递100 授权KEY
	},
	/**
	 * uniCloud短信配置
	 * uni短息介绍 https://ask.dcloud.net.cn/article/37534
	 * 和阿里云短信二选一，如果两项都配置，则优先使用uni短信，下发失败时再次尝试另一渠道下发
	 */
	masterSmsCode: [], //验证码白名单,如：['888888', '999999']表示验证码输入888888或999999时不验证验证码是否有效
	uniSms: {
		smsKey: '',
		smsSecret: '',
		templateId: '',
		expiresTime: 5 ,//验证码有效时间(分钟)
	},
	/**
	 * 阿里云短信配置
	 * 阿里云templateCode需在前端页面配置，可根据发送类型单独进行配置
	 * 
	 * 登录：/pages/auth/login.vue
	 * 修改支付密码: /pages/auth/payPassword.vue
	 * 在以上两个文件中 <mix-code :mobile="username" templateCode="SMS_19405XXXX"></mix-code>
	 * 修改templateCode值即可
	 */
	aliSms: {
		accessKeyId: '',
		accessKeySecret: '',
		SignName: '',
		expiresTime: 5 ,//验证码有效时间(分钟)
	}, 
	
	
}
