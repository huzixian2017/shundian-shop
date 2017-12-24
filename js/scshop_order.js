function sendAjax(page){
	$.ajax({
		async: true,
		data: {},
		dataType: "json",
		url: "http://139.199.79.192:8081/ShunDian/finds?pages="+page,
		type: "get",
		success: function(data){
			console.log(data);
			createTable(data);
			ajaxTest(data,page);
			clickFn();
		}
	})
}
sendAjax(1);
// 创建table
function createTable(data){
	var tableHeade = `<tr class="order_select_head">
						<th>
							<input class="scshop_order_allCheckout" type="checkbox">
							<span>订单号</span>
						</th>
						<th>下单时间</th>
						<th>收货人</th>
						<th>总金额</th>
						<th>应付金额</th>
						<th>订单状态</th>
						<th>操作</th>
					</tr>`;
	$('.scshop_order table').html("");
	var tableContent = "";
	for(i in data.ordersList){
		tableContent += `<tr class="order_select_content">
							<td class="order_select_num order_select_sp">
								<input class="scshop_order_Checkout" type="checkbox">
								<span>${data.ordersList[i].orderId}</span>
							</td>
							<td class="order_select_time"><p>匿名用户</p>${data.ordersList[i].order_time}</td>
							<td class="order_select_people order_select_sp">${data.ordersList[i].addressName}</td>
							<td class="order_select_totalCount">￥${data.ordersList[i].totalMoney}.00元</td>
							<td class="order_select_payment">￥${data.ordersList[i].totalMoney}.00元</td>
							<td class="order_select_status">订单完成</td>
							<td data-orderId="${data.ordersList[i].orderId}" class="order_select_operation order_select_sp">移除</td>
						</tr>`;
	}
	tableHeade += tableContent;
	$(tableHeade).appendTo('.scshop_order table');
}
// 分页
function ajaxTest(data,num) {
	//分页
	$("#page").paging({
		pageNo: num,
		totalPage: data.page,
		totalSize: parseInt(data.ordersList.length) * parseInt(data.page),
		callback: function(num) {
			sendAjax(num);
		}
	})
}

function clickFn(){
	// 点击全选的时候   所有订单号被选中
	$('.scshop_order_allCheckout').click(function(){
		$('.scshop_order_Checkout').each(function(index,obj){
			$(obj).prop("checked",function(){
				return $('.scshop_order_allCheckout').prop("checked");
			})
		})
	})
	// 点击订单号  判断勾选个数  确定全选的勾选状态
	$('.scshop_order_Checkout').each(function(index,obj){
		$(obj).click(function(){
			var count = 0;
			$('.scshop_order_Checkout').each(function(index1,obj1){
				if($(obj1).prop("checked") == true){
					count++;
				}
			})
			$('.scshop_order_allCheckout').prop("checked",function(){
				console.log(count,$('.scshop_order_Checkout').length)
				if(count == $('.scshop_order_Checkout').length){
					return true;
				}else{
					return false;
				}
			})
		})
	})
	$('.order_select_operation').each(function(index,obj){
		$(obj).click(function(){
			var orderId = this.dataset.orderid;
			delectAjax(orderId);
			$(this).parent().remove();
		})
	})
	// 搜索按钮点击
	$('.scshop_order_select_btn').click(function(){
		console.log($('.scshop_order_select_inp').val())
		var number = $('.scshop_order_select_inp').val();
		selectAjax(number);
	})
}
// 发送删除请求
function delectAjax(orderId){
	$.ajax({
		async: true,
		data: {},
		dataType: "json",
		url: "http://139.199.79.192:8081/ShunDian/delOrder?orderId="+orderId,
		type: "get",
		success: function(data){
			console.log(data);
		}
	})
}
// 点击查询发送请求
function selectAjax(number){
	$.ajax({
		async: true,
		data: {},
		dataType: "json",
		url: "http://139.199.79.192:8081/ShunDian/findLike?number="+number,
		type: "get",
		success: function(data){
			console.log(data);
			createTable(data);
		}
	})
}




















