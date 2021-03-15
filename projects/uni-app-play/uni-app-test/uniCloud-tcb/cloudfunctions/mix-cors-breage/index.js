'use strict';
/**
 * 某些sdk在h5端使用跨域，使用uniCloud做一个中转
 * @param {String} url 请求地址
 * @param {JSON} data 请求数据
 * @param {String} method 默认GET
 */
exports.main = async (event, context) => {
	const {url, data, method='GET'} = event;
	const res = await uniCloud.httpclient.request(url, {
		method,
		data,
		dataType: 'json'
	})
	return res.res.data;
};
