/**
 *  全选   allChecked
 *	单选   cart_checked_item
 *	单价   cart_p_price
 *	小计   cart_p_total
 *	减号   cart_btn_sub
 *	数量   cart_item_number
 *	加号   cart_btn_add
 *	删除   btn_delete
 *	收藏   cart_btn_fav
 *	全删   cart_del_check
 *	总价   cart_all_total
 *	结算   cart_jiesuna
 *	全部商品数量  cart_totalNum
 *	当前商品数量  cart_currentNum
 */
window.onload = function(){
	$.ajax({
		async: true,
		data: {},
		dataType: "json",
		type: "get",
		url: "http://139.199.79.192:8081/ShunDian/lookShopCar",
		success: function(data){
			console.log(data)
			if(data.data.length == 0){
				$(".cart_empty").css("display","block");
				$(".cart_content").css("display","none");
			}else{
				$(".cart_empty").css("display","none");
				$(".cart_content").css("display","block");
				createCart(data);
			}
		}
	})
}
function createCart(data){
	var creatacart = ""
	var totolPrice = data.price;
	var count = data.count;
	var list = data.data;
	for(i in list){
		var shortprice = list[i].goods_price * list[i].goods_count;
		creatacart += `<tr class="cart_product last">
					      <td><input data-shopid="${list[i].goods_id}" type="checkbox" class="cart_checked_item chk_1"  value=""></td>
					      <td class="cart_p_info clearfix" width="345">
					          <a href="###" class="cart_pic_link fl"><img src="${list[i].goods_url}" class="cart_p_pic"></a>
					          <a href="###" class="cart_p_title fl">${list[i].goods_name}</a>
					      </td>
					      <td class="cart_p_price">￥${list[i].goods_price}</td>
					      <td class="cart_p_discount" style="color: rgb(252, 53, 56);">￥0.00</td>
					      <td width="140">
					        <div class="cart_p_quantity">
					          <a href="###" class= "cart_btn_sub">-</a>
					          <input type="text" value="${list[i].goods_count}" class="cart_item_number">
					          <a href="###" class="cart_btn_add">+</a>
					        </div>
					        <span class="cart_warn_message">有货</span>
					        </td>
					      <td class="cart_p_total" style="color: rgb(252, 53, 56);">￥${shortprice}</td>
					      <td class="p_integral">-</td>
					      <td class="p_action">
					      	<a href="###" class="cart_btn_fav" rel="_addfav_">收藏</a>
					        <i>|</i>
					        <a href="###" class="btn_delete">删除</a>
					      </td>
					    </tr>`;
	}
	var cartBottom = "";
	cartBottom = `<tr class="cart_tr_clear" height="10" style="background: #f3f3f3">
			    		<td></td>
			    		<td></td>
			    		<td></td>
			    		<td></td>
			    		<td></td>
			    		<td></td>
			    		<td></td>
			    		<td></td>
			    		<td></td>
			    	</tr>
			    	<tr class="cart_table_bottom">
			    		<td> <input class="allChecked2 allChecked" type="checkbox" /> </td>
			    		<td colspan="7" class="cart_table_bottom_t">
			    			<p style="display: inline;float:left;">全选</p>
			    			<a href="###" class="cart_coudna">凑单商品</a>
				    		<a href="###" class="cart_del_check">删除选中商品</a>
				    		<span class="cart_pro_num">
				    			<span>共</span><b class="cart_totalNum">${count}</b><span>件商品，已选择</span><b class="cart_currentNum">0</b><span>件</span>
				    		</span>
			    			<p class="cart_all_box"><b>合计（不含运费）：</b><b class="cart_all_total">￥0</b><b>元</b></p>
			    			<a href="###" class="cart_continue">继续购物</a>
			    			<div class="cart_jiesuna">去结算</div>
			    		</td>
			    	</tr>
			    	<tr class="cart_youhui">
			    		<td colspan="8"><div>订单优惠金额：<b>￥0.00</b></div></td>
			    	</tr>`;
	$(creatacart).appendTo("#cart_list .cart_item");
	$(cartBottom).appendTo("#cart_list .cart_bottom");
	createFn();
}

function createFn(){
	// 点击全选的时候，单选框全部选中
	$('.allChecked').each(function(index,obj) {
		$(obj).click(function(){
			$('.cart_checked_item').each(function(index,obj1){
				$(obj1).prop("checked",function(index,value){
					return $(obj).prop("checked");
				})
			})
			$('.allChecked').each(function(index,obj1){
				$(obj1).prop("checked",function(index,value){
					return $(obj).prop("checked");
				})
			})
			// 改变总价  已选商品
			changeNum();
		})
	})
	// 改变当前已选商品数量
	// 改变总价
	function changeNum(){
		var cart_currentNum = 0;
		var cart_p_total = 0;
		var cart_totalNum = 0;
		$('.cart_checked_item').each(function(index,obj){
			obj.index = index;
			if($(obj).prop("checked") == true){
				cart_currentNum += parseInt($('.cart_item_number')[obj.index].value);
				cart_p_total += parseFloat($('.cart_p_total')[obj.index].innerHTML.split("￥")[1]);
			}
			cart_totalNum += parseInt($('.cart_item_number')[obj.index].value);
		})
		$('.cart_all_total').html(cart_p_total);
		$('.cart_currentNum').html(cart_currentNum);
		$('.cart_totalNum').html(cart_totalNum);
		var cart_jiesuna = $('.cart_currentNum').html();
		if(cart_jiesuna == 0){
			$('.cart_jiesuna').css("background","#dbdbdb");
			// 结算按钮的点击事件取消
		}else {
			$('.cart_jiesuna').css("background","#00bbd7");
			// 结算按钮的点击事件取消
		}
	}
	// 点击单选   判断 单选个数  改变全选状态
	function changeCheck(){
		var totalNum = 0;
		$('.cart_checked_item').each(function(index,obj){
			if($(obj).prop("checked") == true) {
				totalNum++;
			}
			if(totalNum == $('.cart_checked_item').length){
				$('.allChecked').each(function(index,obj) {
					$(obj).prop("checked",true);
				})
			}else{
				$('.allChecked').each(function(index,obj) {
					$(obj).prop("checked",false);
				})
			}
		})
	}
	// 点击单选的时候
	$('.cart_checked_item').each(function(index,obj){
		$(obj).click(function(){
			// 改变总价  小计数量	
			// console.log(index)
			var count = $(this).parent().siblings("td:eq(3)").find(".cart_item_number")[0].value;
			
			var index = $(this).parent().siblings(".cart_p_price")[0].innerHTML;
			var totalCount = $(this).parent().siblings(".cart_p_total")[0];
			changePrice(index,count,totalCount);
			// 改变总价  已选商品	
			changeNum();
			changeCheck();
		})
	})
	// 点击删除的时候
	$('.btn_delete').each(function(index,obj){
		$(obj).click(function(){
			subAjax("delCar",this);
			$(obj).parents(".cart_item").remove();
			// 改变总价  已选商品
			changeNum();
			changeCheck();
		})
	})
	// 点击全删的时候
	$(".cart_del_check").click(function(){
		$('.cart_checked_item').each(function(index,obj){
			if($(obj).prop("checked") == true) {
				$(obj).parents(".cart_item").remove();
				// 改变总价  已选商品
				changeNum();
				changeCheck();
			}
		})
	})
	// 点击减的时候，判断对应的按钮是否勾选
	$('.cart_btn_sub').each(function(index,obj){
		$(obj).click(function(){
			obj.index = index;
			var count = $(this).siblings('.cart_item_number')[0].value;
			count--;
			if($(this).parent().parent().siblings("td:eq(0)").find('.cart_checked_item').prop("checked") == true&& count >= 1 ){
				// 改变总价  已选商品
				changeNum();
				subAjax("subCar",this,1);
			}
			console.log(count,$(this).siblings('.cart_item_number')[0].value)
			count = count <= 1 ? 1 : count;
			$(this).siblings('.cart_item_number')[0].value = count;
			var index = $(this).parent().parent().siblings(".cart_p_price")[0].innerHTML;
			var totalCount = $(this).parent().parent().siblings('.cart_p_total')[0];
			changePrice(index,count,totalCount);
			// 如果勾选，改变总价  已选商品
			
		})
	})
	// 点击加的时候，判断对应的按钮是否勾选
	$('.cart_btn_add').each(function(index,obj){
		$(obj).click(function(){
			obj.index = index;
			var count = $(this).siblings('.cart_item_number')[0].value;
			count++;
			$(this).siblings('.cart_item_number')[0].value = count;
			var index = $(this).parent().parent().siblings(".cart_p_price")[0].innerHTML;
			var totalCount = $(this).parent().parent().siblings('.cart_p_total')[0];
			changePrice(index,count,totalCount);
			// 如果勾选，改变总价  已选商品
			if($(this).parent().parent().siblings("td:eq(0)").find('.cart_checked_item').prop("checked") == true){
				// 改变总价  已选商品
				changeNum();
				subAjax("addCar",this,1);
			}
		})
	})
	// 点击加减的时候  对应的小计发生改变
	function changePrice(index,count,totalCount){
		var cart_p_price = parseFloat(index.split("￥")[1]);
		totalCount.innerHTML = "￥"+cart_p_price*count;
	}

	// 点击减的时候发送数据请求
	function subAjax(changeCar,_this,count){
		var objThis = $(_this).parents('.cart_product').find('td').eq(0).find('input')[0];
		var shopId = $(objThis).attr("data-shopid");
		var ajaxUrl = (count == undefined) ? changeCar+"?id="+shopId : changeCar+"?id="+shopId+"&count=1";
		console.log(ajaxUrl);
		$.ajax({
			async: true,
			data: {},
			datatype: "json",
			url: "http://139.199.79.192:8081/ShunDian/"+ajaxUrl,
			type: "get",
			success: function(data){
				console.log("这是点击加减发送的请求"+data);
			}
		})
	}

	// 点击结算的时候  跳转到  生成订单页
	$('.cart_jiesuna').click(function(){
		// window.location.href = "";
		var strId = "";
		$('.cart_checked_item').each(function(index,obj){
			if($(obj).prop("checked") == true){
				// strId.push(obj.dataset.shopid);	
				strId += "-"+obj.dataset.shopid;
			}
		})
		var strId1 = strId.substr(1);
		console.log(strId1)
		window.location.href = "cartcheck.html?id="+strId1;
	})
}




















