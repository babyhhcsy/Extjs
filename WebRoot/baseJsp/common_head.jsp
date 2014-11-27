<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String basePath = request.getContextPath();
%>
<%--
	引入基础文件注意以下问题：
		1、css文件必须在js文件的上面；
		2、公共的问题才添加到该文件下
 --%>
<%--css文件 --%>
<link href="<%=basePath %>/baseJS/Extjs/extjs4.2/resources/css/ext-all.css" rel="stylesheet" type="text/css"/>
<%--js文件 --%>
<script type="text/javascript" src="<%=basePath %>/baseJS/Extjs/extjs4.2/bootstrap.js"></script>
<script type="text/javascript" src="<%=basePath %>/baseJS/Extjs/extjs4.2/locale/ext-lang-zh_CN.js"></script>
<%--工具包--%>
<script type="text/javascript" src="<%=basePath %>/expandJS/xunClound/init.js"></script>
<script type="text/javascript" src="<%=basePath %>/expandJS/xunClound/beanUtil.js"></script>
<script type="text/javascript" src="<%=basePath %>/expandJS/xunClound/jsonUtil.js"></script>
<script type="text/javascript" src="<%=basePath %>/expandJS/xunClound/Map.js"></script>