<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
    <%
        String path = request.getContextPath();
        String basePath = request.getScheme()+"://"
                +request.getServerName()+":"
                +request.getServerPort()+path+"/";
    %>
</head>
<body>
<h1>文件上传</h1>
<form action="<%=basePath%>insertupload.do" method="post" enctype="multipart/form-data">
    <input type="file" name="myFile">
    <input type="submit" value="上传">
</form>
<h1>文件修改</h1>
<form action="<%=basePath%>updateupload.do" method="post" enctype="multipart/form-data">
    <input type="file" name="myFile">
    <input type="text" name="name">
    <input type="submit" value="修改">
</form>
<h1>文件删除</h1>
<form action="<%=basePath%>deleteupload.do" method="post" enctype="multipart/form-data">
    <input type="file" name="myFile">
    <input type="text" name="name">
    <input type="submit" value="删除">
</form>
</body>
</html>