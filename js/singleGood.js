$("#qq_link").click(function(){
    $(this).socialShare("qZone");
})
$("#weixin_link").click(function(){
    $(this).socialShare("weixinShare");
})
$("#weibo_link").click(function(){
    $(this).socialShare("sinaWeibo");
})

function GetQueryString(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null) return  unescape(r[2]); return null;
}
var goodId = GetQueryString("id");

// 点击立即购买
$(".sg_show_buynow").click(function(){
	var count = Number($("#sg_num").prop("value"));
	console.log(count,goodId);
	$.ajax({
		type:"get",
		url:"http://139.199.79.192:8081/ShunDian/addCar?id="+goodId+"&count="+count,
		data:{},
		dataType:"json",
		async:true,
		success:function(data){
			console.log(data);
			window.location.href = "cartcheck.html?id="+goodId;
		}
	})
})
// 页面加载请求数据
// 顶部路径
window.onload = function(){
	var index = GetQueryString("id");
	$.ajax({
		type:"get",
		url:"http://139.199.79.192:8081/ShunDian/product?id="+goodId,
		data:{},
		dataType:"json",
		async:true,
		success:function(data){
			// 调用遍历步骤路径方法
			step(data.road);
			// 调用
			showImg(data.xiao);
			// 记录本页商品id
			goodId = data.main[0].gId;
			// 显示商品标题
			$(".sg_main_show_right_top").find("h2").html(data.main[0].gName);
			// 显示商品价格
			$(".sg_show_right_top_price").html(data.main[0].gPrice+".00");
			// 显示商品描述信息
			gDes(data.main);
			// 同类商品推荐
			seemType(data.left);
			// 产品介绍
			introduce(data.right);
			// 商品评论
			sgComment(data.content);
			// 页面初始显示地址
			start_Address(data.address);
			// 页面初始生成区
			eara(data.address.diZhi_infos[0].diZhi_infos);
			// 点击头部省
			click_provice();
			// 点击头部市
			click_city();
			// 点击省选项
			click_checkP();
			// 点击市选项
			// 点击区选项
			click_checkQ();
			console.log(data);
			miniload();
			clickCart();
			clickCollect();
		}
	})
}
// 遍历步骤路径
function step(a){
	var j=0;
	for(var i=a.length-1; i>=0; i--){
		$(".sg_inner_path_before").eq(j).html(a[i]+" >");
		j++;
	}
	$(".sg_now").html(a[0]);
}
// 遍历展示区图片
function showImg(a){
	// 初始时宝贝图和放大图默认第一张
	$(".sg_show_left_top_img").find("img").prop("src",a[0].imageUrl);
	$("#sg_maxImg").prop("src",$(".sg_show_left_top_img").find("img").prop("src"));
	// 创建li 和 img
	for(var i=0; i<a.length; i++){
		var lis = document.createElement("li");
		$(".sg_show_left_center").append(lis);
		var imgs = document.createElement("img");
		imgs.src = a[i].imageUrl;
		lis.append(imgs);
	}
	// 当鼠标移入小图是，宝贝图和大图对应显示相同图片
	$(".sg_show_left_center").find("li").each(function(index,obj){
		$(obj).mouseenter(function(){
			$("#sg_maxImg").prop("src",$(obj).find("img").prop("src"));
			$(".sg_show_left_top_img").find("img").prop("src",$(obj).find("img").prop("src"));
		})
	})
}

// 遍历显示商品描述
function gDes(d){
	var str = d[0].gDescribe.split("/");
	var a="";
	for(i in str){
		a +=`<span>● ${str[i]}</span><br>`; 
	}
	$(".sg_main_show_right_centerBottom").append(a);
}

// 遍历同类商品推荐
function seemType(s){
	var a = "";
	for(i in s){
		a +=`<li class="sg_detail_sameType_list clearfix">
				<a href="singleGood.html?id=${s[i].gId}" class="sg_detail_sameType_link">
					<div class="sg_detail_sameType_left"><img src="${s[i].gUrl}" alt="" class="sg_detail_sameType_img"></div>
					<div class="sg_detail_sameType_right">
						<p class="sg_detail_sameType_right_name">${s[i].gName}</p>
						<p class="sg_detail_sameType_right_price">￥${s[i].gPrice}.00</p>
					</div>
				</a>
			</li>`
	}
	$(".sg_detail_sameType_box").append(a);
}

// 遍历产品介绍
function introduce(b){
	var a="";
	for(i in b){
		a += `<a href="###">
				<img src="${b[i].imageUrl}" alt="">
			</a>`
	}
	$(".product_detail_img1").append(a);
}

// 遍历商品评论
function sgComment(b){
	var a = "";
	for(i in b){
		a += `<li class="sg_jundeg_item">
		 		<p class="sg_username">${b[i].uName}</p>
				<p class="sg_jundeg_content">${b[i].cContent}</p>
			</li>`
	}
	$(".sg_jundeg").append(a);
}

// 遍历初始地址
function start_Address(b){
	$(".address_provice").html(b.cityname);
	$(".address_provice").attr("cityid",b.cityid);
	$(".address_city").html(b.diZhi_infos[0].cityname);
	$(".address_city").attr("cityid",b.diZhi_infos[0].cityid);
	$(".sg_select_address").html($(".address_provice").html()+"&nbsp;&nbsp;"+$(".address_city").html()+"&nbsp;&nbsp;"+b.diZhi_infos[0].diZhi_infos[0].cityname);
	$(".sg_select_address").attr("cityid",b.diZhi_infos[0].diZhi_infos[0].cityid);
}

// 遍历初始地区的县
function eara(b){
	var a="";
	for(i in b){
		console.log();
		a +=`<span class="can_chose chose_qu" cityid="${b[i].cityid}">${b[i].cityname}</span>`
	}
	$(".address_item").append(a);
}
// 点击叉号退出
$(".exit_select").click(function(){
	$(".sg_show_right_bottom_address").css("border-bottom","1px solid #e1e1e1");
	$(".create_address").css("display","none");
})
// 鼠标移入地址
$(".sg_show_right_bottom_address").mouseenter(function(){
	$(".sg_show_right_bottom_address").css("border-bottom","none");
	$(".create_address").css("display","block");
})
// 鼠标移除
$(".sg_show_right_bottom_address").mouseleave(function(){
	$(".sg_show_right_bottom_address").css("border-bottom","1px solid #e1e1e1");
	$(".create_address").css("display","none");
})

// 点击头部区域
// 头部省
function click_provice(){
	$(".address_provice").each(function(index,obj){
		$(obj).click(function(){
			$(".address_city").css("display","none");
			$(".address_qu").css("display","none");
			var cityid = ($(this).attr("cityid"));
			$.ajax({
				type:"get",
				url:"http://139.199.79.192:8081/ShunDian/select",
				data:{"cityid":cityid,"type":0},
				dataType:"json",
				async:true,
				success:function(data){
					console.log(data);
					var a="";
					for(i in data){
						console.log(data[i].cityname)
						a +=`<span class="can_chose chose_provice" cityid="${data[i].cityid}">${data[i].cityname}</span>`
					}
					$(".address_item").html("");
					$(".address_item").append(a);
					click_checkP();
				}
			})
		})
	})
}
// 头部市
function click_city(){
	$(".address_city").each(function(index,obj){
		$(obj).click(function(){
			$(".address_qu").css("display","none");
			console.log($(this).attr("cityid"));
			var cityid = ($(this).attr("cityid"));
			$.ajax({
				type:"get",
				url:"http://139.199.79.192:8081/ShunDian/select",
				data:{"cityid":cityid,"type":0},
				dataType:"json",
				async:true,
				success:function(data){
					console.log(data);
					var a="";
					for(i in data){
						console.log(data[i].cityname)
						a +=`<span class="can_chose chose_city" cityid="${data[i].cityid}">${data[i].cityname}</span>`
					}
					$(".address_item").html("");
					$(".address_item").append(a);
					click_checkC();
				}
			})
		})
	})
}

// 点击 省选项
function click_checkP(){
	$(".chose_provice").each(function(index,obj){
		$(obj).click(function(){
			$(".address_city").html("请选择");
			$(".address_city").css("display","block");
			var cityid = ($(this).attr("cityid"));
			$.ajax({
				type:"get",
				url:"http://139.199.79.192:8081/ShunDian/select",
				data:{"cityid":cityid,"type":1},
				dataType:"json",
				async:true,
				success:function(data){
					console.log(data);
					var b = data.diZhi_infos;
					var a="";
					for(i in b){
						a +=`<span class="can_chose chose_city" cityid="${b[i].cityid}">${b[i].cityname}</span>`
					}
					$(".address_item").html("");
					$(".address_item").append(a);
					$(".address_provice").html($(obj).html());
					click_checkC();
				}
			})
		})
	})
}
// 点击 市选项
function click_checkC(){
	$(".chose_city").each(function(index,obj){
		$(obj).click(function(){
			$(".address_qu").html("请选择");
			$(".address_qu").css("display","block");
			var cityid = ($(this).attr("cityid"));
			$.ajax({
				type:"get",
				url:"http://139.199.79.192:8081/ShunDian/select",
				data:{"cityid":cityid,"type":1},
				dataType:"json",
				async:true,
				success:function(data){
					console.log(data.diZhi_infos);
					var b = data.diZhi_infos;
					if(b != ""){
						var a="";
						for(i in b){
							a +=`<span class="can_chose chose_qu" cityid="${b[i].cityid}">${b[i].cityname}</span>`
						}
						$(".address_item").html("");
						$(".address_item").append(a);
					}
					else{
						$(".address_city").html($(obj).html());
						$(".create_address").css("display","none");
						$(".sg_show_right_bottom_address").css("border-bottom","1px solid #e1e1e1");
						$(".sg_select_address").html($(".address_provice").html()+"&nbsp;&nbsp;"+$(".address_city").html());
					}
					$(".address_city").html($(obj).html());
					click_checkQ();
				}
			})
		})
	})
}

// 点击 区选项 退出选择
function click_checkQ(){
	$(".chose_qu").each(function(index,obj){
		$(obj).click(function(){
			$(".create_address").css("display","none");
			$(".sg_show_right_bottom_address").css("border-bottom","1px solid #e1e1e1");
			$(".sg_select_address").html($(".address_provice").html()+"&nbsp;&nbsp;"+$(".address_city").html()+"&nbsp;&nbsp;"+$(this).html());
		})
	})
}


// 放大效果
// move 在box1内随鼠标移动
var box1 = document.getElementsByClassName('sg_show_left_top_img')[0];
var move = document.getElementById('sg_min_move');
var box2 = document.getElementsByClassName('sg_show_left_top_maxImg')[0];
var maxImg = document.getElementById('sg_maxImg');
var box1_fa = document.getElementsByClassName("sg_show_left_top")[0];
box1.onmouseover = function(){
	box2.style.display = "block";
	maxImg.style.display = "block";
	move.style.display = "block";
}
box1.onmouseout = function(){
	box2.style.display = "none";
	maxImg.style.display = "none";
	move.style.display = "none";
}
box1.onmousemove = function(ev){
	var evObj = window.event || ev;
	var x;
	if(window.innerWidth >= 1225){
		x = evObj.pageX-box1_fa.offsetLeft-move.offsetWidth/2-120;
	}else{
		x = evObj.pageX-move.offsetWidth/2-120;
	}
	var y = evObj.pageY-185-move.offsetHeight/2;
	if(x<0){
		x=0;
	}else if(x>box1.offsetWidth - move.offsetWidth){
		x = box1.offsetWidth - move.offsetWidth
	}
	if(y<0){
		y=0;
	}else if(y>box1.offsetHeight - move.offsetHeight){
		y = box1.offsetHeight - move.offsetHeight
	}
	move.style.left = x + "px";
	move.style.top = y + "px";
	// box2
	var bigX = -(x * box2.offsetWidth / move.offsetWidth);
	var bigY = -(y * box2.offsetHeight / move.offsetHeight);
	maxImg.style.left = bigX + "px";
	maxImg.style.top = bigY + "px";
}
move.onmouseout = function(){
	document.onmousemove = null;
}

// 配件推荐 相关商品 切换
$(".sg_adjunct_title1").each(function(index,obj){
	$(obj).click(function(){
		$(".sg_adjunct_title2").each(function(){
			$(".sg_adjunct_title2").css("display","none");
		})
		$(".sg_adjunct_title2").eq(index).css("display","block")
	})
})

// 购物车加减
// 减
$("#sg_sub").click(function(){
	var sub_num = Number($("#sg_num").prop("value")) - 1;
	if(sub_num <=1){
		sub_num = 1;
	}
	$("#sg_num").prop("value",sub_num);
})
// 加
$("#sg_add").click(function(){
	console.log(Number($("#sg_num").prop("value")));
	var add_num = Number($("#sg_num").prop("value")) + 1;
	$("#sg_num").prop("value",add_num);
})

// 点击加入购物车
$("#sg_show_addCar").click(function(){
	var count = Number($("#sg_num").prop("value"));
	console.log(goodId,count);
	$.ajax({
		type:"get",
		url:"http://139.199.79.192:8081/ShunDian/addCar?id="+goodId+"&count="+count,
		data:{},
		dataType:"json",
		async:true,
		success:function(dd){
			console.log(dd.data);
			if(dd.data == "SUCCESS"){
				$('.min_onload').css("display","none");
				var num = Number($("#car_show_num").text()) + count;
				$("#car_show_num").html(num);
				clickCart();
			}else{
				$('.min_onload').css("display","block");
				miniload();
			}
		}
	})
})

// 点击收藏
$(".sg_collect").click(function(){
	$.ajax({
		type:"get",
		url:"http://139.199.79.192:8081/ShunDian/finduser_id.do?goods_id=1",
		data:{},
		dataType:"json",
		async:true,
		success:function(data){
			console.log(data);
			if(data.result = "1"){
				$(".sg_collect").css("background","#00bad6");
				$(".sg_collect").html("已收藏");
			}else{
				$(".sg_collect").css("background","#b5b5b5");
				$(".sg_collect").html("收藏");
			}
		}
	})
})

// 下面切换选择项
$(".sg_tag_hd").each(function(index,obj){
	$(obj).click(function(){
		$(".product-section").each(function(){
			$(".product-section").css("display","none");
		})
		$(".product-section").eq(index).css("display","block");
		// 判断定位状态
		var status = getStyle($("#whelltitle")[0],"position");
		// fixed状态 点击回到下面
		if(status == "fixed"){
			goFn();
			function goFn() {
				var nowTop = document.body.scrollTop||document.documentElement.scrollTop; 
				//获取点击事件发生时滚动的距离
				var t = 0;
				var b = nowTop; //初始值，滚动条返回顶部前的初始位置
				var c = 1200 - nowTop; //目标值(返回顶部是0)减当前值等于变化量
				var d = 10;

				timer = setInterval(function (){
					t++;
					if (t >= d){
						clearInterval(timer);
						timer = null;
						$("#whelltitle").css({
							"position":"static",
							"top": "0px"
						});
					}
					if (document.documentElement.scrollTop){
						document.documentElement.scrollTop = Tween.Quad.easeOut(t,b,c,d);
					}else{
						document.body.scrollTop = Tween.Quad.easeOut(t,b,c,d);
					}
				},30);
			}
		}
		whellmove();
	})
})

// 滚轮事件效果 切换框在上面还是在下面
addMousewheel(document.body,whellmove);
function whellmove(){
	var scrolltop = 0;
	if(document.documentElement.scrollTop) {
		scrolltop = document.documentElement.scrollTop;
	}else {
		scrolltop = document.body.scrollTop;
	}
	if(scrolltop>=1600){
		$("#whelltitle").css({
			"position":"fixed",
			"top": "0px"
		});
	}else{
		$("#whelltitle").css({
			"position":"static",
			"top": "0px"
		});
	}
}










