function GetQueryString(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null) return  unescape(r[2]); return null;
}
var aaa = GetQueryString("id");
console.log(aaa);
// 点击左边，切换右边
$(".match_qiehuan").each(function(index,obj){
	$(obj).click(function(){
		$("#first_face").css("display","none");
		$(".member_qiehuan").each(function(){
			$(".member_qiehuan").css("display","none");
		})
		$(".member_qiehuan").eq(index).css("display","block");
	})
})

$.ajax({
	type:"get",
	url:"http://139.199.79.192:8081/ShunDian/findUser.do",
	data:{},
	dataType:"json",
	async:true,
	success:function(data){
		console.log(data);
		$(".member_welcome_center").find("h1").html(data.user.uName);
		$(".member_wel_tips").find("em").html(data.user.uName);
		$(".loag_name").html(data.user.uName);
	}
})
// 我的订单
// 初始遍历
$.ajax({
	type:"get",
	url:"http://139.199.79.192:8081/ShunDian/views.do",
	data:{},
	dataType:"json",
	async:true,
	success:function(dd){
		console.log(dd.data);
		$(".member_order_content").html("");
		var a = "";
		var count = 0;
		for(i in dd.data){
			var state = "";
			if(dd.data[i].state == 0){
				state = "订单已完成";
			}else if(dd.data[i].state == 1){
				state = "订单已取消";
			}else{
				state = "待支付";
				count ++;
			}
			a += `<table class="member_grid">
					<thead>
					    <tr class="order_item_title">
					   	  <th colspan="7">${dd.data[i].order_time}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					       订单号：<a href="###">${dd.data[i].order_id}</a></th>    
					    </tr>
					</thead>
					<tbody class="member_fold">
					    <tr>
					    	<td colspan="4">
					    		<ul class="member_piclist">
					                ${createLi(dd.data[i])}
					            </ul>
					        </td>
					        <td width="170">
					        	<div class="order_zprice">总额 ￥${dd.data[i].price}</div>
					            <div class="order_yprice">应付<p>￥${dd.data[i].price}</p>支付方式：支付宝</div>
					        </td>
					        <td class="order_status">
						        <div class="order_opation">
						        	${state}<i class="order_separator"></i><a href="###">查看订单</a> <i class="order_separator"></i>
						        	<span class="delorder_dialog" del="${dd.data[i].order_id}">删除订单</span>
						        </div>
					      	</td>
					      	<td>
					      		<div class="order_button">
				      	        	<a href="###">订单成功</a>
				      	        </div>
					        </td>
					    </tr>
					 </tbody>
				</table>`
			function createLi(i){
				var createLis = "";
				var c = i.goods_infos;
				for(y in c){
					createLis += `<li class="goods_item clearfix">
						            <div class="goods_pic fl">
						              	<a href=""><img src="${c[y].imageUrl}"></a>
						            </div>
						            <div class="goods_title fl">${c[y].goodsName}&nbsp;</div>
						            <div class="fl">
						              <div class="goods_price fl" style="width: 130px;float: left;">￥${c[y].price}</div>
						              <div class="goods_num fl" style="float: left;">x${c[y].num}</div>
						            </div>
						            <span class="go_comment" now_common="${c[y].goodsId}">立即评论</span>
				         		</li>`
				}
				return createLis;
			}
		}
		$(".member_order_content").append(a);
		$("#hasnot_pay").html(count);
		if(count>0){
			$("#hasnot_pay").css("background","#d80808");
		}else{
			$("#hasnot_pay").css("background","#aaa");
		}
		common_f();
		delOrder_f();
	}
})
// })
// 删除订单
function delOrder_f(){
	$(".delorder_dialog").click(function(){
		$(this).parents(".member_grid").remove();
		console.log($(this).attr("del"));
		$.ajax({
			type:"get",
			url:"http://139.199.79.192:8081/ShunDian/delOrder?orderId="+$(this).attr("del"),
			data:{},
			dataType:"json",
			async:true,
			success:function(data){
				console.log(data);
			}
		})
	})
}

// 点击评论
function common_f(){
	$(".go_comment").click(function(index,obj){
		$(".goods_judget").css("display","block");
		var good_id = $(this).attr('now_common')
		$("#yes_common_btn").click(function(){
			var common = $("#goods_comment").val();
			console.log("goods_id="+good_id+"&content="+common);
			$.ajax({
				type:"get",
				url:"http://139.199.79.192:8081/ShunDian/addComment.do?goods_id="+good_id+"&content="+common,
				data:{},
				dataType:"json",
				async:true,
				success:function(data){
					console.log(data.result);
					$(".goods_judget").css("display","none");
					if(data.result == "false"){
						$(".file_common").css("display","block");
						setTimeout(function(){
							$(".file_common").css("display","none");
						},2000);
					}
				}
			})
		})
	})
}

// 点击取消退出评论
$("#no_common_btn").click(function(){
	$(".goods_judget").css("display","none");
})

// 商品收藏
$(".favor_infor").click(function(){
	$.ajax({
		type:"get",
		url:"http://139.199.79.192:8081/ShunDian/findCollGoods.do",
		data:{},
		dataType:"json",
		async:true,
		success:function(data){
			console.log(data);
			$("#ckeckall_num").html(data.result.length);
			$(".favor_ul").html("");
			var a = "";
			for(i in data.result){
				a += `<li>
						<div class="favor_ulli_left">
							<input type="checkbox" class="favor_check" gs_id="${data.result[i].gId}">
						</div>
						<div class="favor_ulli_right">
							<div class="ulli_top">
								<a href="singleGood.html?id=${data.result[i].gId}">
									<img src="${data.result[i].gUrl}" style="width: 215px;height: 200px;">
								</a>
							</div>
							<p class="ulli_center">
								<a href="###">${data.result[i].gName}</a>
							</p>
							<div class="ulli_bottom">￥${data.result[i].gPrice}</div>
						</div>
					</li>`
			}
			$(".favor_ul").append(a);
		}
	})
})
// 删除数据
var isfavor = [];
$(".favor_delete").click(function(){
	$(".favor_check").each(function(index,obj){
		if($(obj)[0].checked == true){
			var b = "goods_id="+$(obj).attr("gs_id");
			console.log(b);
			isfavor.push(b);
			$(obj).parents("li").remove();
		}
		// 将选中的数组拼接成字符串，
		var str = isfavor.join("&");
		console.log(str);
		console.log(isfavor);
		$.ajax({
			type:"get",
			url:"http://139.199.79.192:8081/ShunDian/deleteCollection.do?"+str,
			data:{},
			dataType:"json",
			async:true,
			success:function(data){
				console.log(data);
			}
		})
	})
})
// 点击全选的时候，单选框全部选中
$('#favor_ckeckall').click(function() {
	for(var i=0; i<$(".favor_check").length; i++){
		$(".favor_check").eq(i).prop("checked",$(this).prop("checked"));
	}
})
// 点击单选框,全选被选中
$(".favor_check").each(function(index,obj){
	$(obj).click(function(){
		var count = 0;
		$(".favor_check").each(function(index,obj){
			if($(obj).prop("checked")){
				count++;
			}
		})
		if(count == $(".favor_check").length){
			$("#favor_ckeckall").prop("checked",true);
		}else{
			$("#favor_ckeckall").prop("checked",false);
		}
	})
})

// 个人信息
$(".left_information").click(function(){
	$.ajax({
		type:"get",
		url:"http://139.199.79.192:8081/ShunDian/findUser.do",
		data:{},
		dataType:"json",
		async:true,
		success:function(data){
			console.log(data);
			// 用户名
			$("#username").html(data.user.uName);
			if(data.user.xName != ""){
				// 姓名
				$("#warn_name").prop("value",data.user.xName);
				// 地址，切割成数组
				console.log(data.user.address);
				var str = data.user.address.split("/");
				console.log(str);
				// 省
				$("#select_area").find("option").eq(0).html(str[0]);
				$("#select_area").attr("cityid",data.user.address.cityid);
				var a = "";
				a += `<select name="cityid" id="city" value=""><option value="_NULL_">${str[1]}</option></select>`;
				if(str.length == 3){
					a += `<select name="cityid" id="qu" value=""><option value="_NULL_">${str[2]}</option></select>`;
				}
				$("#select_box").append(a);
				// 判断性别
				if(data.user.gender == "man"){
					$("#male").prop("checked",true);
				}else{
					$("#female").prop("checked",true);
				}
				// QQ
				$("#QQ").prop("value",data.user.qQ);
				// 手机号
				$("#mobile").prop("value",data.user.uPhone);
				// 邮箱
				$("#emile").prop("value",data.user.email);
			}
		}
	})
})

// 个人信息地址
// 省
var isok = true;
$("#select_area").click(function(){
	if(isok){
		$.ajax({
			type:"get",
			url:"http://139.199.79.192:8081/ShunDian/findDiZhi.do",
			data:{"parentid":"0"},
			dataType:"json",
			async:true,
			success:function(data){
				isok = false;
				console.log(data);
				for(i in data){
					var option = document.createElement("option");
					option.value = data[i].cityid;
					option.innerHTML = data[i].cityname;
					$("#select_area").append(option);
				}
			}
		})
	}
})

//市 省得状态发生改变
$("#select_area").change(function(){
	$.ajax({
		type:"get",
		url:"http://139.199.79.192:8081/ShunDian/findDiZhi.do",
		data:{"cityid":this.value},
		dataType:"json",
		async:true,
		success:function(data){
			if(document.getElementById("city")){
				$("#city").remove();
			}
			if(document.getElementById("qu")){
				$("#qu").remove();
			}
			var citys = document.createElement("select");
			citys.id = "city";
			citys.name = "cityid";
			$("#select_box").append(citys);
			var option = document.createElement("option");
			option.innerHTML = "请选择";
			$("#city").append(option);
			for(i in data){
				var option = document.createElement("option");
				option.value = data[i].cityid;
				option.innerHTML = data[i].cityname;
				$("#city").append(option);
			}
			$("#city").change(b);
			ischange();
		}
	})
})

// 区 市的状态发生改变
function b(){
	$.ajax({
		type:"get",
		url:"http://139.199.79.192:8081/ShunDian/findDiZhi.do",
		data:{"cityid":this.value},
		dataType:"json",
		async:true,
		success:function(data){
			if(document.getElementById("qu")){
				$("#qu").remove();
			}
			if(data != ""){
				var qus = document.createElement("select");
				qus.id = "qu";
				qus.name = "cityid";
				$("#select_box").append(qus);
				var option = document.createElement("option");
				option.innerHTML = "请选择";
				$("#qu").append(option);
				for(i in data){
					var option = document.createElement("option");
					option.value = data[i].cityid;
					option.innerHTML = data[i].cityname;
					$("#qu").append(option);
				}
			}
		}
	})
}
// 个人信息表判断必要的有没有填写
function ischange(){
	$("#save").click(function(){
		var ischeck = true;
		var sex = "";
		var gender = document.getElementsByName("gender");
		for(var i=0; i<gender.length; i++){
			if(gender[i].checked == true){
				sex = gender[i].value;
				ischeck=false;
			}
		}
		if(ischeck){
			alert("请选择性别");
		}
		if(($("#warn_name")[0].value != "") && !ischeck ){
			$("#save").click(function(){
				var a = $("#warn_name").val();
				var b = $("#select_area").val();
				var c = $("#city").val();
				var d = $("#qu").val();
				var e = sex;
				var f = $("#QQ").val();
				var g = $("#mobile").val();
				var h = $("#emile").val();
				console.log(a,b,c,d,e,f,g,h);
				$.ajax({
					type:"get",
					url:"http://139.199.79.192:8081/ShunDian/update.do?xName="+a+"&cityid="+b+"&cityid="+c+"&cityid="+d+"&gender="+e+"&QQ="+f+"&uPhone="+g+"&email="+h,
					data:{},
					dataType:"json",
					async:true,
					success:function(data){
						console.log(data);
						window.location.href = "member.html";
					}
				})
			})
		}else{
			alert("请填写姓名");
		}
	})
}


// 安全中心
// 点击修改，修改密码
$("#safe_update").click(function(){
	console.log(111);
	$("#update_step1").css("display","block");
	// 点击下一步
	$("#next_step").click(function(){
		$.ajax({
			type:"get",
			data:{"uPassword":$("#old_password").prop("value")},
			url:"http://139.199.79.192:8081/ShunDian/findPwdByuName.do",
			dataType:"json",
			async:true,
			success:function(data){
				// 登录密码验证成功
				if(data == "OK"){
					$("#update_step1").css("display","none");
					$("#update_step2").css("display","block");
					// 输入新密码，点击提交
					$("#last_step").click(function(){
						// 判断6-20个字符，必须包含数字和大小写字母
						var regP=/^(?=.*?[A-Za-z]+)(?=.*?[0-9]+)(?=.*?[A-Z]).{6,20}$/;
						var isOk = regP.test($("#new_password").prop("value"));
						// 满足条件，修改成功
						if(isOk){
							// 提示修改成功框
							$("#update_success").css("display","block");
							setTimeout(function(){
								$("#update_success").css("display","none");
							},2000);
							$("#update_step2").css("display","block");
							// 将新密码传给后台
							$.ajax({
								type:"get",
								url:"http://139.199.79.192:8081/ShunDian/updatePwdByuName.do",
								data:{"uPassword":$("#new_password").prop("value")},
								dataType:"json",
								async:true,
								success:function(data){
									console.log(data);
								}
							})
							$("#update_step2").css("display","none");
						}else{
							// 修改失败重新填写
							// 提示修改失败框出现
							$("#update_filed").css("display","block");
							setTimeout(function(){
								$("#update_filed").css("display","none");
							},2000);
						}
					})
				}else{
					// 登录密码验证失败
					// 提示登录密码失败提示框
					$("#write_filed").css("display","block");
					setTimeout(function(){
						$("#write_filed").css("display","none");
					},2000);
				}
			}
		})
	})
})
// 点击取消，退出修改
$("#off_update").click(function(){
	$("#update_step1").css("display","none");
})

// 收货地址
$("#left_address").click(function(){
	$.ajax({
		type:"get",
		url:"http://139.199.79.192:8081/ShunDian/findShouDiZhi.do",
		data:{},
		dataType:"json",
		async:true,
		success:function(data){
			console.log(data);
			var b = data.result;
			console.log(b);
			if(data != "null"){
				$(".tbody_first").html("");
				var a = "";
				for(i in b){
					var reg = /\//g;
					var diqu = b[i].sArea.replace(reg," ");
					a += `<tr class="highlight first ">
				            <td class="shipping_name">${b[i].sName}</td>
				            <td class="shipping_address">${diqu}</td>
				            <td class="shipping_address">${b[i].sAddress}</td>
				            <td class="shipping_Zip_code">${b[i].sZip}</td>
				            <td class="shipping_contact">${b[i].sPhone}</td>
				            <td class="shipping_active">
				              <span class="edit_act" sId="${b[i].sId}">删除</span>
				            </td>
				        </tr>`
				}
				$(".tbody_first").append(a);
				del_address();
			}
		}
	})
})
// 点击添加新地址
$("#addBtn").click(function(){
	$("#replay_address").css("display","block");
	address_sl();
	$("#yes_btn").click(function(){
		var s1 = $("#sName").prop("value");
		var s21 = $("#x_0 option:selected").html();
		var s22 = $("#x_1 option:selected").html();
		var s23 = $("#x_2 option:selected").html();
		var s3 = $("#all_address").prop("value");
		var s4 = $("#add_sZip").prop("value");
		var s5 = $("#add_sPhone").prop("value");
		var str = "sName="+s1+"&sArea="+s21+"/"+s22+"/"+s23+"&sAddress="+s3+"&sZip="+s4+"&sPhone="+s5;
		console.log(str);
		$.ajax({
			type:"get",
			url:"http://139.199.79.192:8081/ShunDian/addShouDiZhi.do",
			data:{
				sName:s1,
				sArea:s21+"/"+s22+"/"+s23,
				sAddress:s3,
				sZip:s4,
				sPhone:s5
			},
			async:true,
			dataType:"json",
			success:function(data){
				console.log(data);
				$("#replay_address").css("display","none");
			}
		})
	})
})
// 点击叉号退出添加新地址
$("#exit_addAddress").click(function(){
	$("#replay_address").css("display","none");
})
// 点击取消退出添加新地址
$("#no_btn").click(function(){
	$("#replay_address").css("display","none");
})
// 点击删除
function del_address(){
	$(".edit_act").each(function(index,obj){
		$(obj).click(function(){
			console.log($(this).attr("sId"));
			$(obj).parents(".highlight").remove();
			$.ajax({
				type:"get",
				url:"http://139.199.79.192:8081/ShunDian/deleteShouDiZhi.do",
				data:{"sId":$(this).attr("sId")},
				async:true,
				dataType:"json",
				success:function(data){
					console.log(data);
				}
			})
		})
	})
}
// 添加地址表里面的地址选择
function address_sl(){
	var isok = true;
	$("#x_0").click(function(){
		if(isok){
			$.ajax({
				type:"get",
				url:"http://139.199.79.192:8081/ShunDian/findDiZhi.do",
				data:{"parentid":"0"},
				dataType:"json",
				async:true,
				success:function(data){
					isok = false;
					console.log(data);
					for(i in data){
						var option = document.createElement("option");
						option.value = data[i].cityid;
						option.innerHTML = data[i].cityname;
						$("#x_0").append(option);
					}
				}
			})
		}
	})
	//市 省得状态发生改变
	$("#x_0").change(function(){
		$.ajax({
			type:"get",
			url:"http://139.199.79.192:8081/ShunDian/findDiZhi.do",
			data:{"cityid":this.value},
			dataType:"json",
			async:true,
			success:function(data){
				if(document.getElementById("x_1")){
					$("#x_1").remove();
				}
				if(document.getElementById("x_2")){
					$("#x_2").remove();
				}
				var citys = document.createElement("select");
				citys.id = "x_1";
				citys.name = "address";
				$(".replay_memberinfo").find(".region").append(citys);
				var option = document.createElement("option");
				option.innerHTML = "请选择";
				$("#x_1").append(option);
				for(i in data){
					var option = document.createElement("option");
					option.value = data[i].cityid;
					option.innerHTML = data[i].cityname;
					$("#x_1").append(option);
				}
				$("#x_1").change(c);
			}
		})
	})

	// 区 市的状态发生改变
	function c(){
		$.ajax({
			type:"get",
			url:"http://139.199.79.192:8081/ShunDian/findDiZhi.do",
			data:{"cityid":this.value},
			dataType:"json",
			async:true,
			success:function(data){
				if(document.getElementById("x_2")){
					$("#x_2").remove();
				}
				if(data != ""){
					var qus = document.createElement("select");
					qus.id = "x_2";
					qus.name = "address";
					$(".replay_memberinfo").find(".region").append(qus);
					var option = document.createElement("option");
					option.innerHTML = "请选择";
					$("#x_2").append(option);
					for(i in data){
						var option = document.createElement("option");
						option.value = data[i].cityid;
						option.innerHTML = data[i].cityname;
						$("#x_2").append(option);
					}
				}
			}
		})
	}
}






