<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
	<h1 class="p1">点击</h1>
</body>
<script type="text/javascript" src="../js/jquery-1.8.3.min.js"></script>
<script>


    $('.p1').click(function(){
        $.ajax({
            type:"get",
            url:"http://139.199.79.192:8081/ShunDian/findCollGoods.do",
            success:function(data){
                console.log(data);

            }
        })

    })
</script>
</html>