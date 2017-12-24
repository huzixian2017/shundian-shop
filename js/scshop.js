// 当 菜单栏里面的加号点击的时候 列表栏里面 加减号的判断
$('.slide_nav_allChecked').click(function(){
	if(($(this).find("a").html()) == "+"){
		$(this).find("a")[0].innerHTML = "-";
		$('.slide_nav_Checked_ol').each(function(index,obj){
			$(obj).show();
		})
	}else {
		$(this).find("a")[0].innerHTML = "+";
		$('.slide_nav_Checked_ol').each(function(index,obj){
			$(obj).hide();
		})
	}
	$('.slide_nav_Checked').each(function(index,obj){
		$(obj).find("a").html($('.slide_nav_allChecked').find("a").html());
	})
})
// 当点击  列表栏  加减号的时候  展开 | 收起  三级标题
$('.slide_nav_Checked').each(function(index,obj){
	$(obj).click(function(){
		// $(this).find("a").html();
		$(this).find("a")[0].innerHTML = $(this).find("a").html() == "+" ? "-" : "+";
		$(this).next().find('.slide_nav_Checked_ol').fadeToggle();
	})
})
$(".clickactive").each(function(index,obj){ 
	obj.index = index;
	$(obj).click(function(){
		$(".active").each(function(index,obj){
			$(obj).css("display","none");
		})
		$(".active").eq(index).css("display","block");
	})
})
$(".active")[0].style.display="block";