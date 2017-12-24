// 封装实现加入购物车消失，出现函数
var _index;

function mouseOutOver(obj1, obj2) {
	$(obj1).each(function() {
		$(this).mouseover(function() {
			_index = $(this).index(obj1);
			$(obj2).eq(_index).css("display", "block");
		});
		$(this).mouseout(function() {
			_index = $(this).index(obj1);
			$(obj2).eq(_index).css("display", "none");
		});
	})
}
/***** 首页轮播图展示区域开始*****/
var index_box = document.getElementsByClassName("index_content_area5_show_list")[0];
var index = 1;
var moveTimer;
// 点击下一张
function next() {
	clearInterval(moveTimer);
	index++;
	if(index == 6) {
		index = 1;
		index_box.style.left = "0px";
	}
	moveWidthIndex();
}
// 点击上一张
function pre() {
	clearInterval(moveTimer);
	index--;
	if(index == -1) {
		index = 4;
		index_box.style.left = "-1210px";
	}
	moveWidthIndex();
}
// 具体移动的函数
function moveWidthIndex() {
	var l = index * -242 - index_box.offsetLeft;
	var index_count = 0;
	clearInterval(moveTimer);
	moveTimer = setInterval(function() {
		index_count++;
		index_box.style.left = index_box.offsetLeft + l / 10 + "px";
		if(index_count >= 10) {
			clearInterval(moveTimer);
			index_box.style.left = index * -242 + "px";
		}
	}, 20);
}
var index_timer = setInterval(function() {
	next();
}, 3000);
/***** 首页轮播图展示区域结束*****/
/****** 左侧边栏设置  ********/

/****** 左侧边栏设置结束 ********/
/********左侧边栏控制右边内容板块 **************/
// 右边内容板块滑动控制左侧边栏
// 回到顶部操作
var i_ndex;
function goUp() {
	var goBtn = document.getElementsByClassName("index_backtop")[0];
	var i_timer = null;
	var gonav = document.getElementsByClassName("index_floor_leftnav")[0];
	//scroll事件 当用户滚动带滚动条的元素中的内容时,在该元素上面触发
	function topFn() {
		var top = document.body.scrollTop || document.documentElement.scrollTop;
		console.log(top);
		top > 200 ? gonav.style.display = "block" : gonav.style.display = "none";
		for(var i = 1; i < 8; i++) {
			if($(window).scrollTop() >= $(".index_fl").get(i - 1).offsetTop + 527 && $(window).scrollTop() < $(".index_fl").get(i).offsetTop + 527) {
				$(".index_1").css("background", "rgb(98,98,98)");
				$(".index_1").eq(i - 1).css("background", "#00bbd7");
			}
		}
	}

	function goFn(range) {
		var nowTop = document.body.scrollTop || document.documentElement.scrollTop;
		//获取点击事件发生时滚动的距离              
		var t = 0;
		var b = nowTop; //初始值，滚动条返回顶部前的初始位置
		var c = range - nowTop; //目标值(返回顶部是0)减当前值等于变化量
		var d = 30;
		clearInterval(i_timer);
		i_timer = setInterval(function() {
			t++;
			if(t >= d) {
				clearInterval(i_timer);
				i_timer = null;
			}
			if(document.documentElement.scrollTop) {
				document.documentElement.scrollTop = Tween.Quad.easeOut(t, b, c, d);
			} else {
				document.body.scrollTop = Tween.Quad.easeOut(t, b, c, d);
			}
		}, 30);
	}
	//事件绑定
	function bind() {
		//通过滚动事件，判断”返回顶部按钮“显示隐藏
		window.onscroll = function() {
			topFn();
		}
		//返回顶部按钮事件
		goBtn.onclick = function() {
			goFn(0);
		}
		$(".index_1").click(function() {
			i_ndex = $(this).index(".index_1");
			$(".index_1").css("background", "rgb(98,98,98)");
			$(".index_1").eq(i_ndex).css("background", "#00bbd7");
			goFn($(".index_fl").get(i_ndex).offsetTop + 527);
		});
	}
	bind();
}
// 页面初次加载发送请求
window.onload = function() {
	$.ajax({
		async: true,
		type: "get",
		data: {},
		dataType: "json",
		url: "http://139.199.79.192:8081/ShunDian/index",
		success: function(data) {
			if(data.login=="false"){
   	 			$(".header_unload")[0].style.display =  "block";
    			$(".header_load")[0].style.display =  "none";
			}else{
				$(".header_unload")[0].style.display = "none";
				$(".header_load")[0].style.display = "block";
				$(".header_name").html(data.login+"的账户");
			}
			if(data.NewFloor!=""){
				var t="";
				for(var i=0;i<data.NewFloor[0].length;i++){
					t+=`<section class="index_content_area2 index_fl loucen">
					<div class="index_content_area1_header">
						<p>${data.NewFloor[0][i].floorName}</p>
						<div class="index_content_area1_header_menu clearfix">
							<p class="fl">DISCOVERY</p>
						</div>
					</div>
					<div class="index_content_area2_show clearfix">
						<div class="index_content_area2_show_left fl">
							<div class="index_content_area2_show_left_top">
								<a href="" alt=""><img src="${data.NewFloor[0][i].floorImages[0].fUrl}" data-src="" alt="" class="loucengimg"></a>
							</div>
							<div class="index_content_area2_show_left_bottom clearfix">
								<div class="index_content_area2_show_left_bottom_left fl">
									<a href="" alt=""><img src="${data.NewFloor[0][i].floorImages[1].fUrl}" data-src="" alt="" class="loucengimg"></a>
								</div>
								<div class="index_content_area2_show_left_bottom_right fr">
									<a href="" alt=""><img src="${data.NewFloor[0][i].floorImages[2].fUrl}" data-src="" alt="" class="loucengimg"></a>
								</div>
							</div>
						</div>
						<div class="index_content_area2_show_right fr">
							<div class="index_content_area2_show_right_top clearfix">
								<div class="index_content_area2_show_right_top_left fl">
									<a href="" alt=""><img src="${data.NewFloor[0][i].floorImages[3].fUrl}" data-src="" alt="" class="loucengimg"></a>
								</div>
								<div class="index_content_area2_show_right_top_right fr">
									<a href="" alt=""><img src="${data.NewFloor[0][i].floorImages[4].fUrl}" data-src="" alt="" class="loucengimg"></a>
								</div>
							</div>
							<div class="index_content_area2_show_right_middle">
								<a href="" alt=""><img src="${data.NewFloor[0][i].floorImages[5].fUrl}" alt="" data-src="" class="loucengimg"></a>
							</div>
							<div class="index_content_area2_show_right_bottom clearfix">
								<div class="index_content_area2_show_right_bottom_left fl">
									<a href="" alt=""><img src="${data.NewFloor[0][i].floorImages[6].fUrl}" alt="" data-src="" class="loucengimg"></a>
								</div>
								<div class="index_content_area2_show_right_bottom_right fr">
									<a href="" alt=""><img src="${data.NewFloor[0][i].floorImages[7].fUrl}" alt="" data-src="" class="loucengimg"></a>
								</div>
							</div>
						</div>
					</div>
					<div class="index_content_area2_show_ad">
						<a href="" alt=""><img src="${data.NewFloor[0][i].floorImages[8].fUrl}" data-src="" class="loucengimg" /></a>
					</div>
				</section>`;
				}
				$(t).appendTo(".index_content_area6");
			}
			for(var i = 0; i < data.lunbotu.length; i++) {
				$("<section class=\"swiper-slide\" style=\"background-image:url(" + data.lunbotu[i] + ")\"></section>").appendTo(".swiper-wrapper");
			}
			for(var i = 0; i < data.yi.length; i++) {
				$("<li><a href=\"shoppinglist.html?id="+data.yi[i].aId+"\">" + data.yi[i].aName + "</a></li>").appendTo(".header_hotlist");
			}
			for(var i = 0; i < 9; i++) {
				$("<li data-aId=\"" + data["biaoqian" + i][data["biaoqian" + i].length - 1].aId + "\" class=\"liName_" + i + "\"><a href=\"###\" >" + data["biaoqian" + i][data["biaoqian" + i].length - 1].aName + "</a></li>").appendTo(".nav_list_ul");
			}
			for(var i = data.san.length - 1; i >= 0; i--) {
				$("<li class=\"index_floor index_1\" floorId=\"" + data.san[i].floorId + "\" ><a href=\"###\" alt=\"\">" + data.san[i].floorName + "</a></li>").prependTo(".floor_total");
			}
			for(var i = 0; i < data.si.length; i++) {
				$("<li class=\"fl index_content_area1_show_li\" all_Id=\"" + data.si[i].all_Id + "\"  data-gId=\"" + data.si[i].gId + "\"><div class=\"index_content_area1_show_shopping\"><div class=\"index_content_area1_show_shopping_pic\"><a href=\"singleGood.html?id="+data.si[i].gId+"\" alt=\"\"><img src=\"" + data.si[i].gUrl + "\" alt=\"\" /></a></div><div class=\"index_content_area1_show_shopping_description\"><p>" + data.si[i].gName + "</p></div><div class=\"index_content_area1_show_shopping_special\"><p>" + data.si[i].gDescribe.split('/')[0] + "</p></div><div class=\"index_content_area1_show_shopping_price\"><p>¥" + data.si[i].gPrice + ".00</p></div><div class=\"index_content_area1_show_shopping_active\"><p>¥" + data.si[i].gPrice + ".00</p><a href=\"###\" data-gId=\"" + data.si[i].gId + "\" alt=\"\">加入购物车</a></div></div></li>").appendTo(".index_show1_ul");
			}
			for(var i = 0; i < 39; i++) {
				$(".loucengimg").eq(i).attr("src", data.wu[i].fUrl);
			}
			for(var i = 0; i < data.liu.length; i++) {
				$("<li class=\"index_content_area5_show_list_li fl index_po\"><div class=\"index_content_area5_show_list_li_pic\"><a href=\"###\" alt=\"\"><img src=\"" + data.liu[i].gUrl + "\"/></a></div><div class=\"index_content_area5_show_list_li_desp\"><p>" + data.liu[i].gName + "</p></div><div class=\"index_content_area5_show_list_li_price clearfix\"><p class=\"fl\">¥" + data.liu[i].gPrice + "</p><p class=\"fl\">¥" + data.liu[i].gPrice + "</p></div><div class=\"index_area5_fade\"><p>¥" + data.liu[i].gPrice + "</p><a href=\"###\" alt=\"\">加入购物车</a></div></li>").appendTo(".index_content_area5_show_list");
			}
			for(var i = 0; i < data.liu.length; i++) {
				$("<li class=\"index_content_area5_show_list_li fl index_po\"><div class=\"index_content_area5_show_list_li_pic\"><a href=\"###\" alt=\"\"><img src=\"" + data.liu[i].gUrl + "\"/></a></div><div class=\"index_content_area5_show_list_li_desp\"><p>" + data.liu[i].gName + "</p></div><div class=\"index_content_area5_show_list_li_price clearfix\"><p class=\"fl\">¥" + data.liu[i].gPrice + "</p><p class=\"fl\">¥" + data.liu[i].gPrice + "</p></div><div class=\"index_area5_fade\"><p>¥" + data.liu[i].gPrice + "</p><a href=\"###\" alt=\"\">加入购物车</a></div></li>").appendTo(".index_content_area5_show_list");
			}
			if(data.login!="false"){
				for(var i = 0;i<data.history.length;i++){
					$(".index_content_area6_wrapper").css({"width":240*(i+1)+"px","height":"270px"});
					$(".index_content_area6_show_list").css({"width":240*(i+1)+"px","height":"270px"});
					$("<li class=\"index_content_area5_show_list_li fl index_po\"><div class=\"index_content_area5_show_list_li_pic\"><a href=\"###\" alt=\"\"><img src=\"" + data.history[i].goodsImage + "\"/></a></div><div class=\"index_content_area5_show_list_li_desp\"><p>" + data.history[i].goodsName + "</p></div><div class=\"index_content_area5_show_list_li_price clearfix\"><p class=\"fl\">¥" + data.history[i].goodsPrice + "</p><p class=\"fl\">¥" + data.history[i].goodsPrice + "</p></div><div class=\"index_area5_fade\"><p>¥" + data.history[i].goodsPrice + "</p><a href=\"###\" alt=\"\">加入购物车</a></div></li>").appendTo(".index_content_area6_show_list");
				}
			}
			mouseOutOver(".po_r", ".mask");
			mouseOutOver(".index_content_area4_show_list_li", ".index_content_area4_show_shopping_active");
			mouseOutOver(".index_po", ".index_area5_fade");
			var swiper = new Swiper('.swiper-container', {
				spaceBetween: 30,
				effect: 'fade',
				autoplay: {
					delay: 2500,
					disableOnInteraction: false,
				},
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
					renderBullet: function(index, className) {
						return '<span class="' + className + '">' + (index + 1) + '</span>';
					},
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			});
			mouseOutOver(".index_content_area1_show_li", ".index_content_area1_show_shopping_active");
			goUp();
			clickAddcart();
			miniload();
			clickCart();
			clickCollect();
			$('.nav_list_ul li').each(function(index, obj) {
				$(this).mouseenter(function() {
					$("table .title2 td ul").remove();
					$("table .ad td a img").remove();
					var index = $(this).index(".nav_list_ul li")
					$('.nav table').css("display", "block");
					console.log($(this));
					$(this).css("background", "white");
					$(this).css("color", "#00bbd7");
					for(var i = 0; i < data["biaoqian" + index].length - 1; i++) {
						$("<ul class=\"title2_ul_" + i + "\"></ul>").appendTo($("table .title2 td"));
						$("<li><a href=\"shoppinglist.html?id="+data["biaoqian" + index][i].aId+"\">"+data["biaoqian" + index][i].aName+"</a></li>").appendTo($("table .title2 td .title2_ul_" + i));
						for(var j = 0; j < data["biaoqian" + index][i].goodsTypes.length; j++) {
							$("<li><a href=\"shoppinglist.html?id="+data["biaoqian" + index][i].aId+"\">"+data["biaoqian" + index][i].goodsTypes[j].aName+"</a></li>").appendTo($("table .title2 td .title2_ul_" + i));
						}
					}
					for(var i = 0; i < data["sanzhangtu" + index].length; i++) {
						$("<img src=\"" + data["sanzhangtu" + index][i] + "\" />").appendTo($("table .ad td a")[i]);
					}
				});
				// 显示二级标题
				$(this).mouseleave(function() {
					$('.nav table').css("display", "none");
					$(this).css("background", "rgba(222, 224, 223, 0.7)");
				});
				$(".nav table").mouseover(function() {
					$(".nav table").css("display", "block");
					$("table .title2 td li").each(function() {
						$(this).mouseover(function() {
							$(this).css("color", "#00bbd7");
						})
						$(this).mouseout(function() {
							$(this).css("color", "#616161");
						})
					})
				})
				$(".nav table").mouseout(function() {
					$(".nav table").css("display", "none");
				})
			});
		}
	});
}
mouseOutOver(".slide_car_bottom_erweima", ".slide_car_bottom_erweima_hide");
backUp("slide_car_bottom_top");
$(".header_inp").on("change",function(){
	$.ajax({
		async: true,
		type: "get",
		data: {},
		dataType: "json",
		url:"http://139.199.79.192:8081/ShunDian/LikeSearch?like="+$(".header_inp").val(),
		success:function(data){
			for(var i=0;i<data.Like.length;i++){
				$("<li class=\"header_hiden_list_li\"><a href=\"shoppinglist.html?id="+data.Like[i].aId+"\" data-aId=\""+data.Like[i].aId+"\">"+data.Like[i].aName+"</a></li>").appendTo(".header_hiden_list");
			}
		}
	})
})
// 点击添加购物车，发送请求封装函数
function clickAddcart() {
	$(".index_content_area1_show_shopping_active a").each(function() {
		$(this).bind("click",function() {
			$.ajax({
				async: true,
				type: "get",
				data: {
					id:$(this).attr("data-gId"),
					count:1
				},
				url: "http://139.199.79.192:8081/ShunDian/addCar",
				dataType:"json",
				success: function(data) {
					// 判断如果为SUCCESS，直接判断登录，否则显示隐藏登录框
					if(data.data == "SUCCESS") {
						$(".mini_cart").css("display", "block");
						$(".mini_cart_x").click(function(){
                			$(".mini_cart").css("display","none");
            			})
            			$(".mini_cart_go").click(function(){
                			$(".mini_cart").css("display","none");
            			})
						flag = true;
						$(".header_car_num").html(function(index, value) {
							return Number(value) + 1;
						})
						$(".slide_car_top_cart p").html(function(index, value) {
							return Number(value) + 1;
						})
						clickCart();
					} else {
						$('.min_onload').css("display","block");
						miniload();
					}
				}
			})
		})
	})
}