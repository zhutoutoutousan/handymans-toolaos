export default{
	methods: {
		//详情页刷新列表
		refreshPreList(){
			this.$util.prePage() && this.$util.prePage().refreshList && this.$util.prePage().refreshList();
		},
		//确认对话框点击确定触发
		onModalConfirm(){
			//根据弹出对话框时定义的modalConfirmFn决定执行事件
			this.$util.throttle(async ()=>{
				this[this.modalConfirmFn]();
			})
		},
		//支付订单
		pay(data){
			this.navTo('/pages/wallet/pay?data=' + JSON.stringify({
				sourcePage: this.curPage === 'orderList' ? 'orderList': 'orderDetail',
				order_id: data._id,
				pay_price: data.price_data.pay_price
			}))
		},
		//取消订单弹窗确认
		cancelOrder(data){
			this.modalText = '您是否确定要取消订单';
			this.modalConfirmFn = 'cancelOrderConfirm';
			this.curData = data;
			this.$refs.mixModal.open();
		},
		//取消订单提交
		async cancelOrderConfirm(){
			const res = await this.$request('order', 'cancelOrder', {
				id: this.curData._id
			}, {showLoading: true})
			this.$util.msg(res.msg);
			if(res.status === 1){
				if(this.curPage === 'orderList'){
					this.refreshList();
				}else{
					this.loadData();
					this.refreshPreList
				}
			}
		},
		//删除订单
		async deleteOrder(index){
			const isList = this.curPage === 'orderList';
			const res = await this.$request('order', 'remove', {
				id: isList ? this.list[index]._id: this.id
			}, {showLoading: true})
			this.$util.msg(res.msg);
			if(res.status === 1){
				if(isList){
					this.list.splice(index, 1);
					if(this.list.length === 0){
						this.mescroll.showEmpty()
					}
				}else{
					this.refreshPreList
					setTimeout(()=>{
						uni.navigateBack();
					}, 1000)
				}
			}
		},
		//查看物流
		navToExpress(data){
			const addr = data.address.address;
			const address = addr.address + ' ' + addr.room;
			this.navTo(`/pages/order/express?address=${address}&shipper_code=${data.shipper_code}&logistic_code=${data.logistic_code}&order_id=${data._id}`);
		},
		//申请退款选择原因
		showRefundAction(data){
			this.curData = data;
			this.$refs.mixActionSheet.open({
				title: '请选择退款原因',
				list: [{text:'型号拍错'}, {text:'买多了'}, {text: '不想要了'}, {text: '数量选择错误'}, {text:'其他'}]
			})
		},
		//申请退款提交
		async refund(reason){
			const res = await this.$request('order', 'refund', {
				reason: reason.text,
				id: this.curData._id
			}, {showLoading: true})
			
			this.log(res);
			if(res.status === 1){
				if(this.curPage === 'orderList'){
					this.refreshList();
				}else{
					this.refreshPreList
					this.loadData();
				}
			}
			this.$util.msg(res.msg);
		},
		//确认收货 弹窗确认
		confirmReceipt(data){
			this.modalText = '请确保您已收到商品，并检查无损后再确认收货';
			this.modalConfirmFn = 'confirmReceiptConfirm';
			this.curData = data;
			this.$refs.mixModal.open();
		},
		//确认收货提交
		async confirmReceiptConfirm(){
			const res = await this.$request('order', 'confirmReceipt', {
				id: this.curData._id
			}, {showLoading: true})
			this.$util.msg(res.msg);
			console.log(res);
			if(res.status === 1){
				if(this.curPage === 'orderList'){
					this.refreshList();
				}else{
					this.loadData();
					this.refreshPreList
				}
			}
		},
		//去评价
		rate(data){
			this.navTo('/pages/rating/add?data=' + JSON.stringify({
				id: data._id,
				products: data.products
			}));
		}
	}
}









