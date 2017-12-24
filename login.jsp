<%--
  Created by IntelliJ IDEA.
  User: lanou
  Date: 2017/12/2
  Time: 上午11:27
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <%
        String path = request.getContextPath();
        String basePath = request.getScheme()+"://"
                +request.getServerName()+":"
                +request.getServerPort()+path+"/";
    %>
    <title>Title</title>
</head>
<body>

    <h1>登录</h1>
        <form action="<%=basePath %>findDiZhi.do">
            <input type="text" name="parentid">

            <input type="submit" value="提交">
        </form>
</body>
</html>
