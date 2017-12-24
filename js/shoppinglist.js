// 您已选择
var ajaxIndex;
window.onload = function() {
	function GetQueryString(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null) return  unescape(r[2]); return null;
	}
	ajaxIndex = GetQueryString("id");
	sendAjax(ajaxIndex,1);
}
// 发送  Ajax   到后台   ++++++++++++++ 发送  Ajax +++++++++++++++
function sendAjax(sendId,page){
	var index = sendId+"&page="+page;
	console.log(sendId,index);
	$.ajax({
		asycn: true,
		data: {},
		url: "http://139.199.79.192:8081/ShunDian/gallery?id="+index,
		dataType: "json",
		type: "get",
		success: function(data) {
			console.log(data)
			//< 888 >   创建         您已选购
			createYourChose(data);
			//< 777 >   创建(Ajax)   table
			createTable(data);
			//< 666 >   创建(Ajax)   物品详情
			createGoods(data);
			ajaxTest(data,page);
		}
	})
}
var ajaxFlag = true;
var ajaxFlag1 = false;
// 创建 首次刷新分页
function ajaxTest(data,num) {
	//分页
	$("#page").paging({
		pageNo: num,
		totalPage: data.page,
		totalSize: parseInt(data.goods.length) * parseInt(data.page),
		callback: function(num) {
			if(ajaxFlag){
				//6 为 当前点击标题的id
				sendAjax(ajaxIndex,num);
			}
		}
	})
}

//< 888 >   创建(Ajax)    ========   您已选购   ========   
function createYourChose(data){
	$('.sl_yourChoose_list_class_parent').html("");
	var sl_yourChoose_list_class = "";
	for(i in data.OneBiao) {
		sl_yourChoose_list_class += `<div class="sl_yourChoose_list_class fl">
										<span>${data.OneBiao[i].aName}</span>
										<svg class="icon" aria-hidden="true">
											<use xlink:href="#icon-i-arrow-copy"></use>
										</svg>
										<ul class="sl_yourChoose_list_class_ul">
											${createLi(i)}
										</ul>
									</div>`;
		function createLi(i) {
			var sl_yourChoose_list_class_ul = "";
			for(j in data.OneBiao[i].goodsTypes) {
				sl_yourChoose_list_class_ul += `<li><a class="yourChooseList" data-aId="${data.OneBiao[i].goodsTypes[j].aId}" href="###">${data.OneBiao[i].goodsTypes[j].aName}</a></li>`;
			}
			return sl_yourChoose_list_class_ul;
		}	
	}
	$(sl_yourChoose_list_class).appendTo(".sl_yourChoose_list_class_parent");
	//< 333 >  点击  您已选择   里面的  li  时
	yourChooseListClick();
}
//< 777 > 创建(Ajax)      ========   table   ========   
function createTable(data){
	//  ----------- 分类  ----------- 
	$(".sl_yourChoose_lists").html("");
	var sl_yourChoose = `<div>
							${sl_yourChoose_list()}
						 </div>`;
	function sl_yourChoose_list() {
		var sl_yourChoose_list_li = "";
		for(i in data.One0) {
			sl_yourChoose_list_li += `<a data-aId="${data.One0[i][1]}" href="###">${data.One0[i][0]}</a>`;
		}
		return sl_yourChoose_list_li;
	}
	$(sl_yourChoose).appendTo('.sl_yourChoose_lists');
	//< 444 > 点击  您已选择   里面的   分类
	yourChooseClass();

	// -----------  品牌  -----------  
	$(".sl_yourChoose_brand_td div").html("");
	var brand_td = "";
	for(i in data.One1) {
		brand_td += `<a href="###"><img src='sl_img/apple.jpg' alt='' /></a>`;
	}
	$(brand_td).appendTo('.sl_yourChoose_brand_td div');
	//< 111 >  创建 品牌   图片点击  显示  文字
	createImg(data.One1);

	//  ----------- 价格  ----------- 
	$(".sl_yourChoose_prices").html("");
	var yourChoose_prices = "";
	for(i in data.price) {
		yourChoose_prices += `<a href="###">
								<span>${data.price[i]}元</span>
								<img class="sl_yourChoose_prices_del" src='sl_img/del.png' alt='' />
							</a>`;
	}
	$(yourChoose_prices).appendTo('.sl_yourChoose_prices');
	//< 222 > 点击 --- 价格 --- 的时候  背景颜色改变，表头出现数据
	clickPrice();
}
//< 111 >  创建 品牌   图片点击  显示  文字                   --------   创建   table下的函数
function createImg(arr) {
	$(".sl_yourChoose_brand_td div a").each(function(index,obj) {
		$(obj).on("mouseenter",enterFn);
		$(obj).on("mouseleave",leaveFn);
		// 鼠标移除事件
		function leaveFn(){
			$(this).html($("<img src=\"sl_img/apple.jpg\" alt='' />"));
			$(this).css({
				"border":"1px solid #DDD",
				"z-index": 0,
			});
		}
		// 鼠标移入事件
		function enterFn() {
			$(this).html(arr[index]);
			$("<img class='sl_yourChoose_brand_td_del' src='sl_img/del.png' alt='' />").appendTo(this);
			$(this).css({
				"border":"1px solid #00bbd7",
				"z-index": "10",
			});
		}
		// 品牌     a     点击事件
		$(obj).click(function(){
			$(obj).css("line-height","20px");
			// 该品牌下的  删除按键显示
			$(obj).find('.sl_yourChoose_brand_td_del').css("display","block");
			delFn();
			$(obj).off("mouseleave",leaveFn);
			$(obj).off("mouseenter",enterFn);
		})
		// 品牌里面对应的   删除按键   点击事件
		function delFn() {
			$('.sl_yourChoose_brand_td_del').each(function(index,obj){
				$(obj).click(function(){
					$(this).parent().on("mouseenter",enterFn);
					$(this).parent().on("mouseleave",leaveFn);
					$(this).parent().css("line-height","48px");
					this.style.display = "none";
					var evObj = window.event;
					evObj.stopPropagation();
				})
			})
		}

	})
}
//< 222 > 点击 --- 价格 --- 的时候  背景颜色改变，表头出现数据   --------   创建   table下的函数
function clickPrice(){
	$('.sl_yourChoose_prices a').each(function(index,obj) {
		var lastObj = $('.sl_yourChoose_prices a')[0];
		obj.index = index;
		$(obj).click(function(){
			// 点击的时候  您已选择  区域  添加价格
			$('.sl_yourChoose_list_price div').html($(this).find('span')[0].innerHTML);
			// 改变价格栏的样式
			$('.sl_yourChoose_list_price').css("display","block");
			$('.sl_yourChoose_prices_del').css("display","inline-block");
			$('.sl_yourChoose_prices a').each(function(index,obj){
				$(obj).css({
					"background":"white",
					"color": "#666"
				});
			})
			$(this).css({
				"background":"#00bbd7",
				"color": "white"
			});
			//< 999 >   点击的时候  发送请求
			sendPrice(this);
		})
	})
	// 点击 --- 图片删除 --- 的时候  背景颜色改变，表头数据隐藏
	$('.sl_yourChoose_prices_del').each(function(index,obj) {
		$(obj).click(function(ev){
			var evObj = window.event || ev;
			evObj.stopPropagation();
			this.style.display = "none";
			$(obj).parent().css({
				"background":"white",
				"color": "#666"
			});
			$('.sl_yourChoose_list_price').css("display","none");
		})
	})
}
//< 999 >   点击的时候  发送请求
function sendPrice(thisPrice){
	var price = $(thisPrice).children("span").html();
	var priceArr = (price.split("元")[0]).split("-");
	var sendCondition = "price?firstPrice="+priceArr[0]+"&secondPrice="+priceArr[1];
	sendAjax2(sendCondition,1,"ByPrice",1);
}

//点击按  综合 价格 新品  销量排序 发送  Ajax2   到后台  ++++++++++++++ 发送  Ajax2 +++++++++++++++
function sendAjax2(sendId,page,ByPrice,num){
	var index1 = (ByPrice == "ByPrice") ? (sendId+"&page="+page) : (sendId+"?page="+page);
	console.log(index1)
	$.ajax({
		asycn: true,
		data: {},
		url: "http://139.199.79.192:8081/ShunDian/"+index1,
		dataType: "json",
		type: "get",
		success: function(data) {
			console.log(data);
			console.log(ajaxFlag1);
			if(ajaxFlag1){
				//< 666222 >   创建(Ajax)   物品详情(2222)
				createGoodsBy(data,ByPrice);
				ajaxTest2(data,sendId,ByPrice,num);
			}	
		}
	})
}
function ajaxTest2(data,sendId,ByPrice,num) {
	//分页
	$("#page").paging({
		pageNo: num,
		totalPage: data.page,
		totalSize: parseInt(data[ByPrice].length) * parseInt(data.page),
		callback: function(num) {
			sendAjax2(sendId,num,ByPrice,num);
		}
	})
}

//< 666222 >   创建(Ajax)   物品详情(2222)
function createGoodsBy(data,condition){
	$(".sl_shoplist_goods ul").html("");
	var shoplist_goods = "";
	// 遍历商品列表
	for(i in data[condition]){
		shoplist_goods += `<li>
								<a data-gId="${data[condition][i].gId}" class="sl_shoplist_goods_maxpic returnDetails" href="###"><img src="${data[condition][i].gImg[0]}" alt=""></a>
								<a data-gId="${data[condition][i].gId}" class="sl_shoplist_goods_info returnDetails" href="###"><h3>${data[condition][i].gName}</h3></a>
								<div class="sl_shoplist_goods_bottom">
									<span>￥${data[condition][i].gPrice}</span>
									<div class="sl_shoplist_goods_minpic">
										${createGoodsImg(data[condition][i].gImg)}
									</div>
								</div>
							</li>`;
	}
	// 点击  图片或者点击相应的标题    跳转到    商品详情页
	function createGoodsImg(arr3){
		var goodsImg = "";
		for(var j = 0; j < arr3.length; j++) {
			goodsImg += `<img src="${arr3[j]}" alt="" />`;
		}
		return goodsImg;
	}
	$(shoplist_goods).appendTo(".sl_shoplist_goods ul");
	//< 555 > 点击  图片或者点击相应的标题    跳转到    商品详情页
	goodsImgClick();
}

//< 666111 > 创建(Ajax)      ========   物品详情   ========   
function createGoods(data){
	$(".sl_shoplist_goods ul").html("");
	var shoplist_goods = "";
	// 遍历商品列表
	for(i in data.goods){
		shoplist_goods += `<li>
								<a data-gId="${data.goods[i].gId}" class="sl_shoplist_goods_maxpic returnDetails" href="###"><img src="${data.goods[i].gImg[0]}" alt=""></a>
								<a data-gId="${data.goods[i].gId}" class="sl_shoplist_goods_info returnDetails" href="###"><h3>${data.goods[i].gName}</h3></a>
								<div class="sl_shoplist_goods_bottom">
									<span>￥${data.goods[i].gPrice}</span>
									<div class="sl_shoplist_goods_minpic">
										${createGoodsImg(data.goods[i].gImg)}
									</div>
								</div>
							</li>`;
	}
	// 点击  图片或者点击相应的标题    跳转到    商品详情页
	function createGoodsImg(arr3){
		var goodsImg = "";
		for(var j = 0; j < arr3.length; j++) {
			goodsImg += `<img src="${arr3[j]}" alt="" />`;
		}
		return goodsImg;
	}
	$(shoplist_goods).appendTo(".sl_shoplist_goods ul");
	//< 555 > 点击  图片或者点击相应的标题    跳转到    商品详情页
	goodsImgClick();
}

//< 555 > 点击  图片或者点击相应的标题    跳转到    商品详情页  aaaaaaaaaaaaaaa
function goodsImgClick(){
	$('.returnDetails').each(function(index,obj){
		$(this).click(function(){
			console.log(this.dataset.gid);
			var thisIds = this.dataset.gid;
			window.location.href = "singleGood.html?id="+thisIds;
		})
	})
}
//< 444 > 点击  您已选择   里面的   分类
function yourChooseClass(){
	if($('.sl_yourChoose_list_class').length < 3) {
		$('.sl_yourChoose_lists div a').each(function(index,obj){
			$(obj).click(function(){
				var aindex = this.dataset.aid;
				ajaxIndex = aindex;
				ajaxFlag = true;
				ajaxFlag1 = false;
				sendAjax(aindex,1);
			})
		})
	}
}

//< 333 > 点击  您已选择   里面的  li  时
function yourChooseListClick(){
	$('.yourChooseList').each(function(index,obj){
		$(obj).click(function(){
			console.log(this.dataset.aid);
			var thisId = this.dataset.aid;
			ajaxIndex = thisId;
			sendAjax(thisId,1);
			ajaxFlag = true;
			ajaxFlag1 = false;
		})
		$('.sl_yourChoose_list_price').css("display","none");
	})
}

// 设置按价格排序的时候，上下箭头颜色替换
$('.sl_shoplist_nav_price').parent().click(function(){
	var sty1 = getStyle($('.sl_shoplist_nav_price .icon1')[0], "color");
	var sty2 = getStyle($('.sl_shoplist_nav_price .icon2')[0], "color");
	$('.sl_shoplist_nav_price .icon1').css("color") == sty1 ? $('.sl_shoplist_nav_price .icon1').css("color",sty2) : $('.sl_shoplist_nav_price .icon1').css("color",sty1);
	$('.sl_shoplist_nav_price .icon2').css("color") == sty2 ? $('.sl_shoplist_nav_price .icon2').css("color",sty1) : $('.sl_shoplist_nav_price .icon2').css("color",sty2);
})
// 商品列表导航栏  点击时  颜色改变  排序
var ajaxArr = ["zonhe",["jiagesheng","jiagejiang"],"xinpin","xiaoliang"];
var sortArr = ["ZonHe",["JiaGeSheng","JiaGeJiang"],"XinPin","XiaoLiang"];
$('.sl_shoplist_nav_click a').each(function(index,obj) {
	obj.num = index;
	$(obj).click(function(){
		ajaxFlag = false;
		ajaxFlag1 = true;
		$('.sl_shoplist_nav_click a').each(function(index1,obj1){
			$(obj1).css("color","#000");
		})
		this.style.color = "#00bbd7";
		if(this.num == 1) {
			var sty1 = getStyle($('.sl_shoplist_nav_price .icon1')[0], "color");
			if(sty1 == "rgb(0, 187, 215)"){
				sendAjax2(ajaxArr[1][0],1,sortArr[1][0],1);
			}else {
				sendAjax2(ajaxArr[1][1],1,sortArr[1][1],1);
			}
		}else {
			sendAjax2(ajaxArr[this.num],1,sortArr[this.num],1);
		}		
	})
})
// 设置点击左右按钮的时候  当前页数改变 
var curPage = 0;
var totPage = parseInt($('.totalPage').html());
$('.sl_shoplist_nav_left svg').on("click",subPage);
$('.sl_shoplist_nav_right svg').on("click",addPage);
function addPage(){
	$('.sl_shoplist_nav_left svg').css('color',"#3f3d3d");
	curPage = parseInt($('.currentPage').html());
	curPage++;
	console.log(totPage)
	if(curPage >= totPage) {
		curPage = totPage;
		$('.sl_shoplist_nav_right svg').css('color',"#999");
	}
	$('.currentPage').html(curPage);
}
function subPage(){
	$('.sl_shoplist_nav_right svg').css('color',"#3f3d3d");
	curPage = parseInt($('.currentPage').html());
	curPage--;
	if(curPage <= 1) {
		curPage = 1;
		$('.sl_shoplist_nav_left svg').css('color',"#999");
	}
	$('.currentPage').html(curPage);
}




















