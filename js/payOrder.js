window.onload = function(){
	function GetQueryString(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null) return  unescape(r[2]); return null;
	}
	var ajaxIndex = GetQueryString("id");
	console.log(ajaxIndex);
	ajaxSend(ajaxIndex);
}
function ajaxSend(ajaxIndex){
	$.ajax({
		async: true,
		data: {},
		dataType: "json",
		type: "get",
		url: "http://139.199.79.192:8081/ShunDian/order?sId="+ajaxIndex,
		success: function(data){
			console.log(data);
			var orderInfo = data.data.shouDiZhi.sName+"　"+data.data.shouDiZhi.sArea+"　"+data.data.shouDiZhi.sAdress+"　"+data.data.shouDiZhi.sZip+"　"+data.data.shouDiZhi.sPhone;
			var order_name = "";
			for(var i = 0; i < data.data.goodsName.length;i++){
				order_name += data.data.goodsName[i]+"\n";
			}
			// 收货信息
			$('.po_order_success_info').html(orderInfo);
			// 商品名称
			$('.po_order_message_name').html(order_name);
			// 应付总额
			$('.po_pay_money').html("￥"+data.data.price);
			// 订单数量
			$('.po_order_message_num').html("订单商品数量："+data.data.count);
			// 订单号
			$('.po_order_message_num1').html("订单号："+data.data.order_id);
			// 收货人信息
			$('.po_order_message_user').html("收货人信息："+orderInfo);
			var orderId = data.data.order_id;
			turnIndex(orderId);
		}
	})
}
function turnIndex(orderId){
	console.log(orderId)
	$('.po_shundian_pay').click(function(){
		$.ajax({
			async: true,
			data: {},
			dataType: "json",
			type: "get",
			url: "http://139.199.79.192:8081/ShunDian/pay?orderId="+orderId,
			success: function(data){
				console.log(data);
				$("<div><img style=\"vertical-align:middle;margin-right:15px;\" src=\"images/payOrderImg/payment_ok.png\" alt=\"\">支付成功！</div>").css({
					"font-size":"30px",
					"line-height":"200px",
					"background":"white",
					"text-align":"center",
					"width":"300px",
					"height":"200px",
					"position":"fixed",
					"border":"1px solid black",
					"left":"45%",
					"top":"45%"
				}).appendTo("body");
				setTimeout(function(){
					window.location.href = "index.html";
				},1000);
				
			}
		})
	})
}