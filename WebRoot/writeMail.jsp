<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">

		<title>写邮件内容</title>

		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

	</head>

	<body>
		<form action="sendmailAction!sendmail.action" method="post">
			<table border="1px" cellspacing="1px" cellpadding="1px"
				align="center">
				<tr>
					<td width="34%">
						收件人地址:
					</td>
					<td width="66">
						<input name="mail" id="to" />
					</td>
				</tr>
				<tr>
					<td width="34%">
						主题:
					</td>
					<td width="66">
						<input name="title" id="title" />
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<textarea rows="5" cols="50" name="content" id="content"></textarea>
					</td>
				</tr>
				<tr>
					<td colspan="2" align="center">
						<input type="submit" value="发送" />
						<input type="reset" value="重输" />
					</td>
				</tr>
			</table>
		</form>
	</body>
</html>
