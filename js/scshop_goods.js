
// 左右边切换
$(".goods_left").each(function(index,obj){
	$(obj).click(function(){
		$(".goods_right").each(function(){
			$(".goods_right").css("display","none");
		})
		$(".goods_right").eq(index).css("display","block");
		$(".goods_addNew").css("display","none");
	})
})

// 页面加载  显示商品列表页面
window.onload = function(){
	/*商品列表*/ 
	goods_start(1);
	function goods_start(page){
		$.ajax({
			type:"get",
			url:"http://139.199.79.192:8081/ShunDian/goodsList?page="+page,
			data:{},
			dataType:"json",
			async:true,
			success:function(data){
				console.log(data);
				// 商品列表 分页
				turn_page(data,page);
				// 遍历商品列表
				create_goodsList(data.ListGoods);
				// 删除商品
				del_fun();
			}
		})
	}
	function turn_page(data,page){
		$("#goods_page").paging({
			pageNo: page,
			totalPage: data.Allpage,
			totalSize: parseInt(data.ListGoods.length) * parseInt(data.Allpage),
			callback: function(num) {
				goods_start(num);
			}
		})
	}
}
// 遍历商品列表页方法
function create_goodsList(d){
	$(".create_goods").remove();
	var a = "";
	for(i in d){
		a += `<tr class="create_goods">
				<td><input type="checkbox"><span class="goods_id">${d[i].goodsId}</span></td>
				<td><span class="goods_name">${d[i].goodsName}</span></td>
				<td><span class="goods_huohao">${d[i].shopCard}</span></td>
				<td><span class="goods_price">${d[i].goodsPrice}.00</span></td>
				<td><span class="goods_pic">${d[i].goodsImageUrl}</span></td>
				<td>
					<img src="images/icon_edit.gif" width="16" height="16" class="goods_updateList">
					<img src="images/icon_copy.gif" width="16" height="16" class="goods_addList">
					<img src="images/icon_trash.gif" width="16" height="16" class="goods_del">
				</td>
			</tr>`
	}
	$(".goods_list_box").find("table").append(a);
	// 点击商品列表的修改
	$(".goods_updateList").each(function(index,obj){
		$(obj).click(function(){
			$(".goods_right").each(function(){
				$(".goods_right").css("display","none");
			})
			$(".goods_addNew").css("display","block");
			$("#goods_manage_title").html("修改商品信息");
			$(".goods_addId").val($(obj).parents("table").find(".goods_id").html())
			$(".goods_addName").val($(obj).parents("table").find(".goods_name").html());
			$(".goods_addHuohao").val($(obj).parents("table").find(".goods_huohao").html());
			$(".goods_addPrice").val($(obj).parents("table").find(".goods_price").html());
			$(".goods_show_picLj").val($(obj).parents("table").find(".goods_pic").html());
			xg_f();
		})
	})
	// 获取上传的图片路径
	$(".goods_addPic").change(function(){
		console.log($(this).val());
		$(".goods_show_picLj").val($(this).val());
	})
	// 点击商品列表的添加
	$(".goods_addList").each(function(index,obj){
		$(obj).click(function(){
			$(".goods_right").each(function(){
				$(".goods_right").css("display","none");
			})
			$(".goods_addNew").css("display","block");
			$("#goods_manage_title").html("添加商品信息");
			tj_f();
		})
	})
}

// 点击确定让(修改，添加)传送请求给后台
// 修改方法
function xg_f(){
	$("#goods_btn").click(function(){
		var formData = new FormData();
		var a = $(".goods_addId").val();
		var b = $(".goods_addName").val();
		var c = $(".goods_addHuohao").val();
		var d = $(".goods_addPrice").val();
		// 修改
		formData.append("id",$(".goods_addId").val());
		formData.append("GoodsName",$(".goods_addName").val());
		formData.append("ShopCard",$(".goods_addHuohao").val());
		formData.append("GoodsPrice",$(".goods_addPrice").val());
		formData.append("myFile",document.getElementById('goods_upPic').files[0]);
		console.log(formData.get("myFile"));
		console.log(a,b,c,d);
		up_request(formData);

	})
}
// 修改的请求
function up_request(formData){
	console.log(formData)

	$.ajax({
		type:"post",
		url:"http://139.199.79.192:8081/ShunDian/updateshopgoods",
		async:true,
		data:formData,
		processData:false,
		contentType:false,
		success:function(data){
			console.log(data);
			// document.getElementById('tp').src = data;
		}
	})
}
// 添加方法
function tj_f(){
	$("#goods_btn").click(function(){
		var formData1 = new FormData();
		var b = $(".goods_addName").val();
		var c = $(".goods_addHuohao").val();
		var d = $(".goods_addPrice").val();
		// 添加
		formData1.append("GoodsName",$(".goods_addName").val());
		formData1.append("ShopCard",$(".goods_addHuohao").val());
		formData1.append("GoodsPrice",$(".goods_addPrice").val());
		formData1.append("myFile",document.getElementById('goods_upPic').files[0]);

		console.log(formData1.get("myFile"));
		console.log(b,c,d);
		add_request(formData1);
	})
}

// 添加的请求
function add_request(formData1){
	$.ajax({
		type:"post",
		url:"http://139.199.79.192:8081/ShunDian/insertshopgoods",
		async:true,
		data:formData1,
		processData:false,
		contentType:false,
		success:function(data){
			console.log(data);
			// document.getElementById('tp').src = data;
		}
	})
}
// 点击商品列表的删除放到回收站
function del_fun(){
	$(".goods_del").each(function(index,obj){
		$(obj).click(function(){
			var id = $(obj).parents("tr").find(".goods_id").html();
			$.ajax({
				type:"get",
				url:"http://139.199.79.192:8081/ShunDian/deleteshopgoods?id="+id,
				async:true,
				data:{},
				success:function(data){
					console.log(data);
					$(obj).parents("tr").remove();
				}
			})
		})
	})
}

// 点击评论左边
$(".goods_common_left").click(function(){
	$("#goods_manage_title").html("用户评论");
	function goods_com(page){
		$.ajax({
			type:"get",
			url:"http://139.199.79.192:8081/ShunDian/pinglun?page="+page,
			data:{},
			dataType:"json",
			async:true,
			success:function(data){
				console.log(data);
				// 商品列表 分页
				turn_com(data,page);
				// 遍历评论列表
				create_commonList(data.AllPinglun);
				// 
				del_com();
			}
		})
	}
	goods_com(1);
	function turn_com(data,page){
		$("#goods_recycle_page").paging({
			pageNo: page,
			totalPage: data.Allpage,
			totalSize: parseInt(data.AllPinglun.length) * parseInt(data.Allpage),
			callback: function(num) {
				goods_com(num);
			}
		})
	}
})
// 遍历评论列表
function create_commonList(d){
	$(".create_com").remove();
	var a = "";
	for(i in d){
		a += `<tr class="create_com">
				<td><input type="checkbox"><span class="create_com_id">${d[i][0]}</span></td>
				<td><span class="create_com_name">${d[i][1]}</span></td>
				<td><span class="create_com_content">${d[i][2]}</span></td>
				<td><span class="goods_common_del">删除评论</span></td>	
			</tr>`
	}
	$(".goods_common").find("table").append(a);
}
// 点击删除评论
function del_com(){
	$(".goods_common_del").each(function(index,obj){
		$(obj).click(function(){
			var cid=$(obj).parents("tr").find(".create_com_id").html();
			$.ajax({
				type:"get",
				url:"http://139.199.79.192:8081/ShunDian/PLdelete?cId="+cid,
				async:true,
				data:{},
				success:function(data){
					console.log(data);
					$(obj).parents("tr").remove();
				}
			})
		})
	})
}

// 点击左边回收站
$(".goods_recycle_left").click(function(){
	$("#goods_manage_title").html("商品回收");
	function goods_rec(page){
		$.ajax({
			type:"get",
			url:"http://139.199.79.192:8081/ShunDian/huishou?page="+page,
			data:{},
			dataType:"json",
			async:true,
			success:function(data){
				console.log(data);
				// 商品列表 分页
				turn_rec(data,page);
				// 遍历回收列表
				create_recList(data.ListGood);
			}
		})
	}
	// 垃圾回收站分页
	goods_rec(1);
	function turn_rec(data,page){
		$("#goods_recycle_page").paging({
			pageNo: page,
			totalPage: data.Allpage,
			totalSize: parseInt(data.ListGood.length) * parseInt(data.Allpage),
			callback: function(num) {
				goods_rec(num);
			}
		})
	}
})
// 遍历回收列表
function create_recList(d){
	$(".create_del").remove();
	var a = "";
	for(i in d){
		a += `<tr class="create_del">
				<td><input type="checkbox"><span class="goods_delId">${d[i].goodsId}</span></td>
				<td><span class="goods_delName">${d[i].goodsName}</span></td>
				<td><span class="goods_addHuohao">>${d[i].shopCard}</span></td>
				<td><span class="goods_addPrice">${d[i].goodsPrice}.00</span></td>
				<td><span class="goods_addPic">${d[i].goodsImageUrl}</span></td>
				<td>
					<a href="###" class="goods_recycle_return">还原</a><span> | </span><a href="###" class="goods_recycle_del">删除</a>
				</td>
			</tr>`
	}
	$(".goods_recycle").find("table").append(a);
	del_recycle();
}
// 点击回收站的删除
function del_recycle(){
	// 点击回收站的复原
	$(".goods_recycle_return").each(function(index,obj){
		$(obj).click(function(){
			var name = $(obj).parents("tr").find(".goods_delName").html();
			var huohao  = $(obj).parents("tr").find(".goods_addHuohao").html();
			var price = $(obj).parents("tr").find(".goods_addPrice").html();
			var pic = $(obj).parents("tr").find(".goods_addPic").html();
			var goodsId = $(obj).parents("tr").find(".goods_delId").html();
			
			$.ajax({
				type:"get",
				url:"http://139.199.79.192:8081/ShunDian/huanyuan2?GoodsId="+goodsId,
				async:true,
				data:{},
				processData:false,
				contentType:false,
				success:function(data){
					console.log(data);
					$(obj).parents("tr").remove();
				}
			})
		})
	})
	// 点击回收站的删除
	$(".goods_recycle_del").each(function(index,obj){
		$(obj).click(function(){
			var name = $(obj).parents("tr").find(".goods_delName").html();
			var huohao  = $(obj).parents("tr").find(".goods_addHuohao").html();
			var price = $(obj).parents("tr").find(".goods_addPrice").html();
			var pic = $(obj).parents("tr").find(".goods_addPic").html();
			var goodsId = $(obj).parents("tr").find(".goods_delId").html();
			
			$.ajax({
				type:"get",
				url:"http://139.199.79.192:8081/ShunDian/huanyuan2?GoodsId="+goodsId,
				async:true,
				data:{},
				processData:false,
				contentType:false,
				success:function(data){
					console.log(data);
					$(obj).parents("tr").remove();
				}
			})
		})
	})
}




