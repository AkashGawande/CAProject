<%@ Page Language="C#" AutoEventWireup="true" CodeFile="SessionExpired.aspx.cs" Inherits="SessionExpired" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <div class="page-content" id="MessageForm" style="text-align:center;">
                        <br />
                        <br />
                        <br />
                        <br />
                        <span id="" style="margin-top:6px;font-size:25px;color:black;font-family:cursive">Your Session Expired...!</span><br />
                        <%--<span id="" style="margin-top:6px;font-size:15px;color:red;font-family:cursive">Thank you..! </span>--%>
                        <span id="" style="margin-top:6px;font-size:15px;color:red;font-family:cursive">Go To  <a id="GoToLogin" href="Login.aspx">Login Page</a> </span>
                                        
                    </div>
        </div>
    </div>
    </form>
</body>
</html>
