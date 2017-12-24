// console.log("发票信息"+$('.wo_invoice_ch').length);
// console.log("支付方式"+$('.wo_payment_ch').length);
// console.log("收货地址"+$('.wo_shipping_ch').length);
// console.log("配送方式"+$('.wo_delivery_ch').length);
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
		url: "http://139.199.79.192:8081/ShunDian/account?aId="+ajaxIndex,
		success: function(data){
			console.log(data);
			createAdress(data);
		}
	})
}
function createAdress(data){
	$('.wo_new_c ul').html("");
	var createAdressli = "";
	// 渲染  收货地址
	for(i in data.address) {
		createAdressli += `<li class="wo_echo_list clearfix">
								<input data-sId="${data.address[i].sId}" type="radio" id="wo_shipping_check${i}" class="wo_shipping_ch" style="position: absolute;top:0;left:0;" name="wo_shipping_ch">
								<label for="wo_shipping_check${i}" class="wo_ckeckB">
									<address class="fl">
										<i class="chosttochange fl">${data.address[i].sName}　${data.address[i].sArea}　${data.address[i].sAddress}</i>
										<span class="fl" style="width: 440px;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;display: inline-block;">
											${data.address[i].sName}　${data.address[i].sArea}　${data.address[i].sAddress}　${data.address[i].sPhone} 邮编：　${data.address[i].sZip}
										</span>
									</address>
									<em class="wo_addres_hover fl">
										<span>设为默认地址</span>
										<span>编辑</span>
										<span>删除</span>
									</em>
								</label>
							</li>`;
	}
	$(createAdressli).appendTo('.wo_new_c ul');
	$('.wo_echo_list').each(function(index,obj){
		if(index >= 4){
			$(obj).fadeToggle("slow","linear");
			$(".wo_new_btn").html("更多收货地址");
		}
	})
	// 渲染 商品
	$('.wo_list_table tbody').html("");
	var wo_list_table_tbody = "";
	for(i in data.data) {
		wo_list_table_tbody += `<tr class="wo_product last">
									<td class="wo_p_info clearfix" width="345">
										<img style="float:left;" width="60" height="60" src="${data.data[i].goods_url}" class="fl">
										<div class="wo_p_title fl" style="margin-left: 10px;height: 40px;overflow: hidden;">
											<a target="_blank" href="###">${data.data[i].goods_name}</a> 
										</div>
									</td>
									<td style="padding-top:35px;">${data.data[i].goods_count}</td>
									<!--判断是不是预售商品-->
									<td style="padding-top:32px;">
										<span class="wo_warn_message is_jiesuan" data="no">${data.data[i].goods_price}</span>
									</td>
									<td class="wo_p_discount" style="padding-top:35px;"> - 0 元</td>
									<td class="wo_p_subtotal" style="padding-top:35px;">${data.data[i].goods_sum}</td>
									<td class="wo_p_integral" style="padding-top:35px;">
									-
									</td>
								</tr>`;

	}
	$(wo_list_table_tbody).appendTo('.wo_list_table tbody');
	$('.wo_active_numCount').html(data.count+" 件");
	$('.wo_active_numPrice1').html(data.price+".00元");
	$('.wo_active_numPrice2').html(data.price+".00元");
	requestFn();
}

function requestFn(){
	var count;
	$(".wo_btn").click(function(){
		count = 0;
		bianLi($('.wo_invoice_ch'));
		bianLi($('.wo_payment_ch'));
		bianLi($('.wo_shipping_ch'));
		bianLi($('.wo_delivery_ch'));
		if(count == 4) {
			console.log("success");
			$('.wo_shipping_ch').each(function(index,obj){
				if($(obj).prop("checked") == true){
					console.log(obj.dataset.sid);
					window.location.href = "payOrder.html?id="+obj.dataset.sid;
				}
			})
		}
	})
	function bianLi(objArr){
		objArr.each(function(num,obj){
			if($(obj).prop("checked") == true){
				count++;
			}
		})
	}
	$("label").each(function(index,obj){
		$(obj).click(function(){
			var objClassName = $(this).prop("className");
			$("label").each(function(index1,obj1){
				if(objClassName == $(obj1).prop("className")) {
					$(obj1).css("border","1px solid transparent");
				}
			})
			$(this).css("border","1px solid #00bad6");
		})
	}) 
	$("input:radio").each(function(index,obj){
		$(obj).css("z-index","-1");
	})


	$(".wo_new_btn").click(function(){
		$('.wo_echo_list').each(function(index,obj){
			if(index >= 4){
				$(obj).fadeToggle("slow","linear");
				$(".wo_new_btn").html("收起收货地址");
			}
		})
	})
}