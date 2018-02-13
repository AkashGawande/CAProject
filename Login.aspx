<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Login.aspx.cs" Inherits="Login" %>

<!--
	Author: W3layouts
	Author URL: http://w3layouts.com
	License: Creative Commons Attribution 3.0 Unported
	License URL: http://creativecommons.org/licenses/by/3.0/
-->
<!DOCTYPE html>
<html lang="en">
<head>
<title>efi Mitra | Login</title>
<style>
/* Paste this css to your style sheet file or under head tag */
/* This only works with JavaScript, 
if it's not present, don't show loader */
.no-js #loader { display: none;  }
.js #loader { display: block; position: absolute; left: 100px; top: 0; }
.se-pre-con {
	position: fixed;
	left: 0px;
	top: 0px;
	width: 100%;
	height: 100%;
	z-index: 9999;
	background: url(Logo/ajax-loader.gif) center no-repeat #fff;
}
</style>
    <script src="Js/jquery.min.js"></script>
    <script src="Js/modernizr.js"></script>
<script>
    //paste this code under head tag or in a seperate js file.
    // Wait for window load
    $(window).load(function () {
        // Animate loader off screen
        $(".se-pre-con").fadeOut("slow");;
    });
</script>


<!-- Meta tag Keywords -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="Classic Forms Responsive Widget,Login form widgets, Sign up Web forms , Login signup Responsive web form,Flat Pricing table,Flat Drop downs,Registration Forms,News letter Forms,Elements" />
<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false);
function hideURLbar(){ window.scrollTo(0,1); } </script>
<!-- Meta tag Keywords -->
<!-- css files -->   
<link href="css/Loginstyle.css" rel="stylesheet" type="text/css" media="all">
<link rel="stylesheet" href="css/Loginfont-awesome.css"> <!-- Font-Awesome-Icons-CSS -->
<!-- //css files -->
    <style>
        .Dropdown
        {
             /*outline: none;*/
    /*font-size: 1em;*/
    font-size: 18px;
    color: #000;
    padding: 1em .5em;
    margin: 0;
    width: 100%;
    border: none;
    border: 1px solid #999;
    /*-webkit-appearance: none;*/
    margin-bottom: 1em;
    font-family: 'Josefin Sans', sans-serif;
    border-left: 4px solid #33b5e5;

        }     

    </style>


<!-- Web-Fonts -->
<link href="//fonts.googleapis.com/css?family=Josefin+Sans:100,100i,300,300i,400,400i,600,600i,700,700i" rel="stylesheet">
<link href='//fonts.googleapis.com/css?family=Open+Sans:400,600,700' rel='stylesheet' type='text/css'>
<!-- //Web-Fonts -->
</head>
<body style="background-color:#e9e9e9;">
 <div class="se-pre-con"></div>
<h1>efi Mitra</h1>
<div class="main" <%--style="border:1px groove"--%>>
	<div id="horizontalTab" style="display: block; width: 100%; margin: 0px;">
		<div class="img-w3l-agile">
		<img src="Logo/login_logo.jpg" alt=" ">
            
		</div>
		<ul class="resp-tabs-list">
			<li id="tabSignIn" class="resp-tab-item" ><span>Sign In</span></li>
			<li id="tabSignUp" class="resp-tab-item"><h2><span>Sign Up</span></h2></li>
		</ul>			
		<div class="resp-tabs-container">
			<div class="tab-1 resp-tab-content" id="signin">
				<div class="login-top">
                    <form runat="server">
                        <asp:dropdownlist runat="server" ID="ddlrole" CssClass="Dropdown" >
                        <asp:ListItem Value="Head_Office">Head Office</asp:ListItem>
                        <asp:ListItem Value="Franchisee">Franchisee</asp:ListItem>
                        <asp:ListItem Value="Employee">Employee</asp:ListItem>
                    </asp:dropdownlist><br />

                        <asp:TextBox ID="txtUsername" runat="server" placeHolder="Username"  required=""></asp:TextBox>
                        <asp:TextBox ID="txtPassword" runat="server" placeHolder="Password" TextMode="Password"  required=""></asp:TextBox>
                        <div class="login-bottom">
                            <ul>
                                <li>
                                    <%--<input type="checkbox" id="brand" value="">
                                    <label for="brand"><span></span>Remember me?</label>--%>
                                </li>
                                <li>
                                    <a style="cursor:pointer;" id="ForgotPass">Forgot password?</a>
                                </li>
                            </ul>
                            <div class="clear"></div>
                        </div>                       
                        <asp:Button ID="btnLogin" runat="server" Text="Sign In" OnClick="btnLogin_Click" />
                    </form>
				</div>
			</div>
            
            <div id="Forgot">
                <div class="login-top sign-top">
					<form action="#" method="post">	   
    
    

                        <h2 style="color:white;background-color:#d9b6b9;height:35px; padding-top: 12px;font-size: 20px;font-weight: bold;">Password Recovery</h2><br />
                        <select class="Dropdown" id="ddlForgotEmpType">
                            <option Value="Head_Office">Head Office</option>
                        <option Value="Franchisee">Franchisee</option>
                        <option Value="Employee">Employee</option>
                        </select>
                        <input type="text" name="name" class="name" placeholder="Enter Login Id"  id="txtloginid" onkeydown="upperCaseF(this)" onkeypress="return nospaces(event)" required="" />
                         <input type="email" name="email" class="email" placeholder="Enter Email Id" id="txtEmailId" required="" />
						<%--<input type="text" name="phone" class="phone" placeholder="Enter Mobile No" />--%>

                        <div class="login-bottom">
                            <ul>
                                <li>
                                    <%--<input type="checkbox" id="brand1" value="" checked="checked">
                                    <label for="brand1"><span></span>Send Email</label>--%>
                                </li>
                                <li>
                                    <a style="cursor:pointer;"></a>
                                </li>
                            </ul>
                            <div class="clear"></div>
                        </div> 
						                       
                        <input type="submit" value="Submit" id="btnSubmit">
					</form>
				</div>
            </div>
        </div>	
	</div>
	<div class="clear"> </div>
</div>
<div class="footer">
	<p> &copy; 2018 efi Mitra. All Rights Reserved <%--| Design & Developed by <a href="http://regalsoftindia.com">Regal Soft India</a>--%></p>
</div>

<!-- js-scripts -->			
<!-- js -->
	<script type="text/javascript" src="Js/Loginjquery-2.1.4.min.js"></script>
   
<!-- //js -->
<!-- tabs -->
<script src="Js/LogineasyResponsiveTabs.js" type="text/javascript"></script>
<script type="text/javascript">
    	$(document).ready(function () {
		$('#horizontalTab').easyResponsiveTabs({
			type: 'default', //Types: default, vertical, accordion           
			width: 'auto', //auto or any width like 600px
			fit: true   // 100% fit in a container
		});


		$('#tabSignUp').click(function () {
		    $('#signin').show();
		    $('#Forgot').hide();
		    window.location.href = "FranchiseeRegistration.aspx";
		});

		$('#ForgotPass').click(function () {
		    $('#signin').hide();
		    $('#Forgot').show();
		    $('[id$=txtUsername]').val("");
		    $('[id$=txtPassword]').val("");
		});
		$('#tabSignIn').click(function () {
		    $('#signin').show();
		    $('#Forgot').hide();
		    $('#txtloginid').val("");
		    $('#txtEmailId').val("");
		});



	    ////======================Start Change Password=============================
		$('#btnSubmit').click(function () {
		    if($('#txtloginid').val()!="")
		    {
		        if ($('#txtEmailId').val() != "") {
		            GetPassword();
		        }
		        else {		           
		            $('#txtEmailId').focus();
		        }
		    }
		    else
		    {		       
		        $('#txtloginid').focus();
		    }
		});


		    function GetPassword()
		{
		        debugger;
		        var EmpType = $('#ddlForgotEmpType option:selected').val()
		        var EmpId = $('#txtloginid').val();
		        var EmailId = $('#txtEmailId').val()
		                var data;
		                var url;

		                data = '{EmpType:"' + EmpType +
		                         '",EmpId:"' + EmpId +
                                 '",EmailId:"' + EmailId + '"}';

		                url = "Login.aspx/SendPassword";		        
		                $.ajax({
		                    type: "post",
		                    url: url,
		                    data: data,
		                    contentType: "application/json",
		                    dataType: "json",
		                    success: function (response) {
		                        console.log(response);
		                        var msg;
		                        if (response.d != "Password Not Send ..?") {
		                            alert(response.d);
		                        }		                        
		                        else {
		                            ClearText();
		                            alert("Filed...! Contact to your Administrator.");
		                        }
		                    },
		                    failure: function () {
		                        alert(response);
		                    }
		                });
		    }
		
	    ////======================End Change Password============================
    	});


    	//========================Start Do not Allow Space And Lowercase Charactor in TextBox===============================

    	function upperCaseF(a) {
    	    setTimeout(function () {
    	        a.value = a.value.toUpperCase();
    	    }, 1);
    	}


    	function nospaces(t) {
    	    return t.which !== 32;
    	}
    	//=================End Do Not Allow Spaces And Lowercase Charactor In Textbox===================================


</script>
<!-- //tabs -->
<!-- //js-scripts -->	
</body>
</html>
