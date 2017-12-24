// 判断用户是否登录

var flag = false;
$.ajax({
	async: true,
	type: "get",
	data: {},
	dataType: "json",
	url:"http://139.199.79.192:8081/ShunDian/judgelogin",
	success:function(data){
		if(data.login=="false"){
   	 		$(".header_unload")[0].style.display =  "block";
    		$(".header_load")[0].style.display =  "none";
		}else{
			console.log(123);
			$(".header_unload")[0].style.display = "none";
			$(".header_load")[0].style.display = "block";
			$(".header_name").html(data.login+"的账户");
		}
	}
})
$(".index_quit").click(function(){
	$.ajax({
		async: true,
		type: "get",
		data: {},
		dataType: "json",
		url:"http://139.199.79.192:8081/ShunDian/quit",
		success:function(){
			window.location.href="index.html";
		}
	})
    flag=false;
    $(".header_unload")[0].style.display = flag ? "none" : "block";
    $(".header_load")[0].style.display = flag ? "block" : "none";
    console.log(flag);
    $(".slide_shou_hiden").hide();
		$(".slide_car_hiden").css("display","none");
		$(".slide_car").css("right","0px");
		$(".header_car_num").html(function(index,value){
        return 0;
    })
    $(".slide_car_top_cart p").html(function(index,value){
        return 0;
    })
});
$(".header_unload")[0].style.display = flag ? "none" : "block";
$(".header_load")[0].style.display = flag ? "block" : "none";
// 设置 导航栏 固定定位  滚轮事件
addMousewheel($("body")[0],fn);
function fn() {
	var scrollTop;
	if(document.documentElement.scrollTop) {
		scrollTop = document.documentElement.scrollTop;
	}else {
		scrollTop = document.body.scrollTop;
	}
	if(scrollTop > 114) {
		$(".nav").css({
			"position" : "fixed",
			"top" : "0px",
			"left" : "0px",
			"z-index" : "20"
		});
		$('.nav_list_ul').css("display","none");	
	}
	if(scrollTop < 114) {
		$(".nav").css({
			"position" : "static",
			"z-index" : "10"
		});
		$('.nav_list_ul').css("display","block");
		$('.nav table').css("display","none");
	}
}
// 设置当scrollTOp 大于 114 是 所有商品信息 点击的效果
$('.nav_list_special').click(function(){
	var position = getStyle($(".nav")[0], "position");
	if(position == "fixed") {
		$('.nav_list_ul').toggle();
		var display = getStyle($('.nav_list_ul')[0], "display");
		$('.nav table').css("display",display);
	}
});
// 设置侧边栏  购物车  点击事件

// 设置侧边栏  收藏夹  点击事件

$('.shou_hiden_title_img').click(function(){
	$(".slide_shou_hiden").hide();
	var display1 = getStyle($(".slide_shou_hiden")[0], "display");
	display1 == "block" ? $(this).parents(".slide_car").css("right","320px") :$(this).parents(".slide_car").css("right","0px");
	
})
// 简易版登陆界面 输入框 聚焦时
$('.slide_car .min_onload .min_onload_bottom .inp input').each(function(index,obj) {
	$(obj).focus(function() {
		$(this).parent().css({
			"border" : "1px solid #2a90f9",
			"box-shadow" : "0 2px 2px #2a90f9"
		});
	})
	$(obj).blur(function() {
		$(this).parent().css({
			"border" : "1px solid #ccc",
			"box-shadow" : "0 0px 0px transparent"
		});
	})
})
// 简易版登陆界面 点击关闭界面时
$('.min_onload_close').click(function(){
	$('.min_onload').css("display","none");
})

// 点击注册，跳转注册界面
$(".header_unload_regist").click(function(){
	window.location.href="signUp.html";
})
// 点击登录，跳转登录界面
$(".header_unload_load").click(function(){
	window.location.href="login.html";
})
// 点击隐藏登录栏的登录按钮，发送请求封装函数
function miniload(){
	$(".username_input").val("");
	$(".password_input").val("");
	$(".min_onload_bottom_btn").off();
	$(".min_onload_bottom_btn").click(function() {
		$.ajax({
			async: false,
			type: "post",
			data: {
				uName: $(".username_input").val(),
				uPassword: $(".password_input").val()
			},
			url: "http://139.199.79.192:8081/ShunDian/login.do",
			dataType:"json",
			success: function(data) {
				console.log(data);
				flag = true;
				$(".header_name").html(data+"的账户");
				$('.min_onload').css("display", "none");
				$(".header_unload")[0].style.display = flag ? "none" : "block";
				$(".header_load")[0].style.display = flag ? "block" : "none";
				if(data=="false") {
					$(".username_input").css("color", "red");
					$(".password_input").css("color", "red");
				}
			}
		})
	})
}
// 封装加减号计算函数
function jiajian() {
	$(".hiden_content_selectAll").bind("click",function() {
		$(":checkbox").prop("checked", function() {
			return $(".hiden_content_selectAll").prop("checked") ? true : false;
		});
		count();
	})
	$(":checkbox.checkt").bind("click",function() {
		$(".hiden_content_selectAll").prop("checked", $(".checkt:checked").length == $(".checkt").length);
		count();
	});
}
// 点击侧边栏购物车收藏请求，显示商品
function clickCollect(){
	$(".slide_car_top_shou").off();
	$(".slide_car_top_shou").click(function(){
		$(".hide_shou_ul").html("");
		$.ajax({
			async: false,
			type: "get",
			data: {},
			dataType:"json",
			url: "http://139.199.79.192:8081/ShunDian/findCollGoods.do",
			success:function(data){
				if(data=="ERROR"){
					$('.min_onload').css("display","block");
					miniload();
				}else{
					$(".slide_shou_hiden").toggle();
					$(".slide_car_hiden").hide();
					var display2 = getStyle($(".slide_shou_hiden")[0], "display");
					display2 == "block" ? $(".slide_car").css("right","320px") :$(".slide_car").css("right","0px");
					for(var i=0;i<data.result.length;i++){
						$("<li><div><img src=\""+data.result[i].gUrl+"\" alt=\"\"></div><span>¥"+data.result[i].gPrice+"</span></li>").appendTo(".hide_shou_ul");
					}
				}
			}
		})
	})
}
// 点击侧边栏购物车发送请求，显示商品
function clickCart(){
	$('.slide_car_top_cart').off();
	$('.slide_car_top_cart').click(function(e) {
		$(".hide_ul").html("");
		$(".slide_shou_hiden").hide();
		var display1 = getStyle($(".slide_car_hiden")[0], "display");
			console.log(display1);
			display1 == "block" ? $(".slide_car").css("right","320px") :$(".slide_car").css("right","0px");
		$(document).one("click", function(){
        	$(".slide_car_hiden").hide();
        	var display1 = getStyle($(".slide_car_hiden")[0], "display");
			console.log(display1);
			display1 == "block" ? $(".slide_car").css("right","320px") :$(".slide_car").css("right","0px");
    	});
    	e.stopPropagation();
		$.ajax({
			async: false,
			type: "get",
			data: {},
			dataType:"json",
			url: "http://139.199.79.192:8081/ShunDian/lookShopCar",
			success: function(data) {
				if(data.data=="ERROR"){
					$('.min_onload').css("display","block");
					miniload();
				}else{
					$(".slide_shou_hiden").hide();
					$(".slide_car_hiden").toggle();
					var display1 = getStyle($(".slide_car_hiden")[0], "display");
					display1 == "block" ? $(".slide_car").css("right","320px") :$(".slide_car").css("right","0px");
					for(var i = 0; i < data.data.length; i++) {
						$("<li  data-Id=\"" + data.data[i].goods_id + "\"  class=\"hide_li\"><input class=\"fl checkt\" checked type=\"checkbox\"><div class=\"fl\"><p class=\"hiden_content_title\">" + data.data[i].goods_name + "</p><div class=\"mul\"><img class=\"fl\" data-src=\"\" src=\"" + data.data[i].goods_url + "\" alt=\"\"><div class=\"fl\"><span class=\"hiden_content_sub hiden_content_mul jian\">-</span><input type=\"text\" value=\"" + data.data[i].goods_count + "\" class=\"hiden_content_count\"/><span class=\"hiden_content_add hiden_content_mul jia\">+</span></div><span class=\"fl hiden_content_price\">" + data.data[i].goods_price + "</span></div></div><span class=\"fl hiden_content_del\"></span><div class=\"hide_proMoney\" hidden></div></li>").appendTo(".hide_ul");
					}
					$(".slide_car_top_cart p").html(data.count);
					$(".hiden_footer_count").html(data.count);
					$(".header_car_num").html(data.count);
					$(".hiden_footer_price").html("¥"+data.price);
					jiajian();
					// 点击删除发送请求
					$(".hiden_content_del").each(function() {
						$(this).off();
						$(this).click(function() {
							goods_ids = $(this).parents(".hide_li").attr("data-Id");
							_this=this;
							$.ajax({
								async: false,
								type: "get",
								data: {id:goods_ids},
								url: "http://139.199.79.192:8081/ShunDian/delCar",
								dataType:"json",
								success: function(data) {
										// 删除
									if(data.data=="SUCCESS"){
										$(_this).parents(".hide_li").remove();
										count();
									}
								}
							})
						})
					})
					// 点击加号发送请求
					$(".jia").each(function() {
						$(this).off();
						var thisP = this;
						$(this).click(function() {
							goods_Id = $(this).parents(".hide_li").attr("data-Id");
							$.ajax({
								async: false,
								type: "get",
								data: {id:goods_Id,count:1},
								dataType:"json",
								url: "http://139.199.79.192:8081/ShunDian/addCar",
								success: function(data) {
									if(data.data == "SUCCESS") {
										jiajian();
										$(thisP).siblings(".hiden_content_count").val(function(index, value) {
											var res = parseInt(value) + parseInt(thisP.innerText + 1);
											return res == 0 ? 1 : res;
										});
										count();
									}
								}
							})
						})
					})
					// 点击减号发送请求
					$(".jian").each(function() {
						$(this).off();
						var thisP = this;
						var judge=true;
						$(this).click(function() {
							goods_Idj = $(this).parents(".hide_li").attr("data-Id");
							if(judge==true){
								$.ajax({
									async: false,
									type: "get",
									data: {id:goods_Idj,count:1},
									dataType:"json",
									url: "http://139.199.79.192:8081/ShunDian/subCar",
									success: function(data) {
										if(data.data == "SUCCESS") {
											jiajian();
											$(thisP).siblings(".hiden_content_count").val(function(index, value) {
												var res = parseInt(value) + parseInt(thisP.innerText + 1);
												return res == 0 ? 1 : res;
											});
											count();
										}
									}
								})
							}
							if($(thisP).siblings(".hiden_content_count").val()<=1){
									judge=false;
								}else{
									judge=true;
								}
						})
					})
					var idStr="";
					$(".hiden_footer_pay").click(function(){
						$(".checkt:checked").each(function(index,obj) {
							idStr+="-"+ $(obj).parents("li").attr("data-Id");
							idStr1=idStr.substr(1);
						})
						window.location.href="cartcheck.html?id="+idStr1;
					})
				}
			}
		})
	})
	$(".slide_car_hiden").on("click", function(e){
    	e.stopPropagation();
	});
}
// 封装数量价格计算函数
function count() {
	$(".slide_car_top_cart p").html(function(index, value) {
		var totalCount = 0;
		$(".checkt:checked").each(function() {
			totalCount += Number($(this).siblings(".fl").find(".hiden_content_count").val());
		})
		return Number(totalCount);
	})
	$(".hiden_footer_count").html(function(index, value) {
		return $(".slide_car_top_cart p").html();
	})
	$(".header_car_num").html(function(index, value) {
		var totalCount = 0;
		$(".checkt:checked").each(function() {
			totalCount += Number($(this).siblings(".fl").find(".hiden_content_count").val());
		})
		return Number(totalCount);
	})
	$(".hiden_footer_price").html(function() {
		var total = 0;
		$(".checkt:checked").siblings(".hide_proMoney").each(function(index, value) {
			total += parseInt(Number($(".hiden_content_price").eq(index).text()) * $(".hiden_content_count").eq(index).val());
		})
		return "￥"+total;
	})
}





