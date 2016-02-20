<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page import="javax.servlet.http.HttpServletRequest"%>
<%@ page import="javax.servlet.RequestDispatcher"%>
<% 

%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script Charset="UTF-8" type="text/javascript" src="../js/jquery-1.8.3.min.js"></script>
</head>
<script  type="text/javascript">
$(document).ready(function() {
	if (self != top) {
		self = top;
	}
	self.location.href="${url}";
});
</script>
<body>
</body>
</html>