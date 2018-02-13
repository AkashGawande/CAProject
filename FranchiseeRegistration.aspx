<%@ Page Language="C#" AutoEventWireup="true" CodeFile="FranchiseeRegistration.aspx.cs" Inherits="FranchiseeRegistration" %>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		 <title>efi Tax Mitra | Registration</title>
        <link rel="shortcut icon" href="Logo/Logo_Icon.ico" />
    
		<meta name="description" content="Common form elements and layouts" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

	
		<link rel="stylesheet" href="assets/css/bootstrap.min.css" />
		<link rel="stylesheet" href="assets/font-awesome/4.5.0/css/font-awesome.min.css" />

	
		<link rel="stylesheet" href="assets/css/jquery-ui.custom.min.css" />
		<link rel="stylesheet" href="assets/css/chosen.min.css" />
		<link rel="stylesheet" href="assets/css/bootstrap-datepicker3.min.css" />
		<link rel="stylesheet" href="assets/css/bootstrap-timepicker.min.css" />
		<link rel="stylesheet" href="assets/css/daterangepicker.min.css" />
		<link rel="stylesheet" href="assets/css/bootstrap-datetimepicker.min.css" />
		<link rel="stylesheet" href="assets/css/bootstrap-colorpicker.min.css" />

	
		<link rel="stylesheet" href="assets/css/fonts.googleapis.com.css" />

		
		<link rel="stylesheet" href="assets/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />

		<link rel="stylesheet" href="assets/css/ace-skins.min.css" />
		<link rel="stylesheet" href="assets/css/ace-rtl.min.css" />

		<script src="assets/js/ace-extra.min.js"></script>

        <script src="assets/js/jquery-1.11.3.min.js"></script>
        <script src="assets/js/jquery-2.1.4.min.js"></script>
        <script src="Registration_JS/FranchiseeReg.js"></script>
	</head>

	<body class="no-skin">	

		<div class="main-container ace-save-state" id="main-container">
			<script type="text/javascript">
				try{ace.settings.loadState('main-container')}catch(e){}
			</script>
			<div class="main-content">
				<div class="main-content-inner">				
					<div class="page-content" id="EnquiryForm">
						<div class="page-header" style="text-align:center;">
							<h1 style="font-size:30pt;font-family:'Times New Roman'">
                                <img src="Logo/MainPageLogo.png" style="height:50px;width:50px"/>
								E Filer Company<br />
								 <i><label style="font-size:13pt;">Aplication Form - Efi Seva Kendra (Taxation)</label></i>
							</h1>
						</div><!-- /.page-header -->

						<div class="row">
							<div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">								
								<form class="form-horizontal" role="form">
                                     <div class="page-header" style="text-align: left;">
                                        <h1 style="font-size: 20pt; font-family: 'Times New Roman'">Personal Details</h1>
                                    </div>
									<div class="form-group">
										<label class="col-sm-3 col-lg-3 col-md-3 control-label no-padding-right" > Name of the Owner <label style="color:red;">*</label> </label>
										<div class="col-lg-9 col-md-9 col-sm-9">
											<%--<input type="text" id="txtOwner" placeholder="Enter Owner Name" class="col-xs-10 col-sm-7" />--%>
                                            <%--<input type="text" id="txtPrefix" placeholder="Prefix" onblur="CopyName('txtPrefix')" class="col-xs-10 col-sm-1" onkeypress="return nospaces(event)" />--%>
                                            <select class=" Prefix col-xs-10 col-sm-1" id="ddlPrefix">                                                
                                                <option value="Mr">Mr</option>
                                                <option value="Mrs">Mrs</option>
                                            </select>
                                            <input type="text" id="txtFirstName" placeholder="Enter First Name" onblur="CopyName('txtFirstName')" class="col-xs-10 col-sm-2"  onkeypress="return nospaces(event)" style="text-transform:uppercase"/>
                                            <input type="text" id="txtMiddelName" placeholder="Enter Middle Name" onblur="CopyName('txtMiddelName')" class="col-xs-10 col-sm-2" onkeypress="return nospaces(event)" style="text-transform:uppercase" />
                                            <input type="text" id="txtLastName" placeholder="Enter Last Name" onblur="CopyName('txtLastName')" class="col-xs-10 col-sm-2"  onkeypress="return nospaces(event)" style="text-transform:uppercase"/>
										<span id="txtFirstNameError" style="margin-top:6px;font-size:15px;color:red;display: none;font-family:cursive">Enter Owner First Name</span>
                                        <span id="txtMiddelNameError" style="margin-top:6px;font-size:15px;color:red;display: none;font-family:cursive">Enter Owner Middle Name</span>
                                        <span id="txtLastNameError" style="margin-top:6px;font-size:15px;color:red;display: none;font-family:cursive">Enter Owner Last Name</span>
                                        
                                        
                                        </div>
									</div>

                                    <div class="form-group">
										<label class="col-sm-3 col-lg-3 col-md-3 control-label no-padding-right" for="form-field-1-1"> Firm Name <label style="color:red;">*</label></label>
										<div class="col-lg-9 col-md-9 col-sm-9">
											<input type="text" id="txtfirmName" placeholder="Enter Firm Name" class="col-xs-10 col-sm-4" onblur="CopyName('txtfirmName')" />
                                            <input type="file"style="margin-top:7px;" class="col-xs-10 col-sm-3" id="fileupload" onchange="Attachments(this)" />
                                            <input type="hidden" id="LicensePhotoSource" value="" />
                                             <input type="hidden" id="LicensePhotoFileName" value="" />
                                            <span id="txtfirmNameError" style="margin-top:6px;font-size:15px;color:red;display: none;font-family:cursive">Enter Firm Name</span>
                                        <span id="fileuploadError" style="margin-top:6px;font-size:15px;color:red;display: none;font-family:cursive">Attach License Copy</span>
                                       
										</div>
                                         <label style="color:gray;font-weight:normal;margin-left:330px;" >Upload Firm License Copy</label>
									</div>

                                    <div class="form-group">
										<label class="col-sm-3 col-lg-3 col-md-3 control-label no-padding-right" for="form-field-1-1"> PAN Number <label style="color:red;">*</label></label>
										<div class="col-lg-9 col-md-9 col-sm-9">
											<input type="text" id="txtPANNo" maxlength="10" placeholder="Enter PAN Number" class="col-xs-10 col-sm-2" onblur="validatePAN_Number('txtPANNo')" style="text-transform:uppercase" onkeydown="upperCaseF(this)" onkeypress="return nospaces(event)"/>
										<span id="txtPANNoError" style="margin-top:6px;display: none;font-size:15px;color:red;font-family:cursive">InValid PAN No</span>
                                        <span id="txtPANNoError1" style="margin-top:6px;display: none;font-size:15px;color:red;font-family:cursive">Please Fill Owner Full Name First</span>
                                       <span id="txtPANNoError2" style="margin-top:6px;display: none;font-size:15px;color:red;font-family:cursive">Enter Pan Number</span>
                                         </div>
									</div>

                                    <div class="form-group">
										<label class="col-sm-3 col-lg-3 col-md-3 control-label no-padding-right" > Father Name <label style="color:red;">*</label></label>
										<div class="col-lg-9 col-md-9 col-sm-9">
											<input type="text" id="txtFatherName" placeholder="Enter Father Name" class="col-xs-10 col-sm-7" onblur="CopyName('txtFatherName')" />
										 <span id="txtFatherNameError" style="margin-top:6px;font-size:15px;color:red;display: none;font-family:cursive">Enter Father Name</span>
                                        </div>
									</div>
                                    <hr />

                                    <div class="page-header" style="text-align: left;">
                                        <h1 style="font-size: 20pt; font-family: 'Times New Roman'">Office Address</h1>
                                    </div>


                                    <div class="form-group">
										<label class="col-sm-3 col-lg-3 col-md-3 control-label no-padding-right" for="form-field-1-1"> First Line <label style="color:red;">*</label></label>
										<div class="col-lg-9 col-md-9 col-sm-9">
											<input type="text" id="txtfirstline" placeholder="Enter First Line" class="col-xs-10 col-sm-5" onblur="CopyName('txtfirstline')" />
                                            <span id="txtfirstlineError" style="margin-top:6px;font-size:15px;color:red;display: none;font-family:cursive">Enter Address First Line</span>
                                         
                                          </div>                                        
									</div>

                                    <div class="form-group">
										<label class="col-sm-3 col-lg-3 col-md-3 control-label no-padding-right" for="form-field-1-1"> Second Line </label>
										<div class="col-lg-9 col-md-9 col-sm-9">
											<input type="text" id="txtsecondline" placeholder="Enter Second Line" class="col-xs-10 col-sm-5" />
                                           </div>                                        
									</div>

                                    <div class="form-group">
										<label class="col-sm-3 col-lg-3 col-md-3 control-label no-padding-right" for="form-field-1-1"> Nearest Landmark <label style="color:red;">*</label></label>
										<div class="col-lg-9 col-md-9 col-sm-9">
											<input type="text" id="txtLandmark" placeholder="Enter Nearest Landmark" class="col-xs-10 col-sm-5" onblur="CopyName('txtLandmark')" />
                                           <span id="txtLandmarkError" style="margin-top:6px;font-size:15px;color:red;display: none;font-family:cursive">Enter Landmark</span>
                                        </div>                                        
									</div>

                                    <div class="form-group">
										<label class="col-sm-3 col-lg-3 col-md-3 control-label no-padding-right" for="form-field-1-1"> City <label style="color:red;">*</label></label>
										<div class="col-lg-9 col-md-9 col-sm-9">
											<input type="text" id="txtcity" placeholder="Enter City" class="col-xs-10 col-sm-3" onblur="CopyName('txtcity')" />
                                            <span id="txtcityError" style="margin-top:6px;font-size:15px;color:red;display: none;font-family:cursive">Enter City Name</span>
                                        </div>                                        
									</div>    
                                                                    
                                    <div class="form-group">
										<label class="col-sm-3 col-lg-3 col-md-3 control-label no-padding-right" for="form-field-1-1"> State <label style="color:red;">*</label></label>
                                        <div class="col-lg-9 col-md-9 col-sm-9">
                                            <%--<input type="text" id="ddlState" placeholder="Enter Pincode" class="col-xs-10 col-sm-3" />--%>
                                            <select class="StateName col-xs-10 col-sm-3" id="ddlState">
                                                <option value="0">--Select--</option>
                                                <%--<option value="MH">Maharashtra</option>--%>
                                            </select>
                                        <span id="ddlStateError" style="margin-top:6px;font-size:15px;color:red;display: none;font-family:cursive">Select State Name</span>
                                        </div>                                        
									</div>

                                    <div class="form-group">
										<label class="col-sm-3 col-lg-3 col-md-3 control-label no-padding-right" for="form-field-1-1"> District <label style="color:red;">*</label></label>
										<div class="col-lg-9 col-md-9 col-sm-9">
											<%--<input type="text" id="ddlDistrict" placeholder="Enter Pincode" class="col-xs-10 col-sm-3" />--%>
                                             <select class=" CityName col-xs-10 col-sm-3" id="ddlDistrict">
                                                <option value="0">--Select--</option>
                                                <%--<option value="MH">Aurangabad</option>--%>
                                            </select>
                                           <span id="ddlDistrictError" style="margin-top:6px;font-size:15px;color:red;display: none;font-family:cursive">Select District Name</span>
                                        </div>                                        
									</div>

                                    <div class="form-group">
										<label class="col-sm-3 col-lg-3 col-md-3 control-label no-padding-right" for="form-field-1-1"> Pincode <label style="color:red;">*</label></label>
										<div class="col-lg-9 col-md-9 col-sm-9">
											<input type="text" id="txtpincode" maxlength="6" placeholder="Enter Pincode" class="col-xs-10 col-sm-2" onkeypress="return isNumber(event)"  onblur="CopyName('txtpincode')" />
                                           <span id="txtpincodeError" style="margin-top:6px;font-size:15px;color:red;display: none;font-family:cursive">Enter Pincode</span>
                                         </div>                                        
									</div>

                                    <div class="form-group">
										<label class="col-sm-3 col-lg-3 col-md-3 control-label no-padding-right" for="form-field-1-1"> Mobile No <label style="color:red;">*</label></label>
										<div class="col-lg-9 col-md-9 col-sm-99">
											<input type="text" id="txtmobileNo" maxlength="10" placeholder="Enter Mobile Number" class="col-xs-10 col-sm-2" onkeypress="return isNumber(event)" onblur="validateName('txtmobileNo')"/>
                                             <span id="txtmobileNoError" style="margin-top:6px;display: none;font-size:15px;color:red;font-family:cursive">Please Enter Valid Mobile No e.g "1234567890"</span>   
                                        <span id="txtmobileNoError1" style="margin-top:6px;font-size:15px;color:red;display: none;font-family:cursive">Enter Mobile No</span>
                                         </div>                                        
									</div>

                                    <div class="form-group">
										<label class="col-sm-3 col-lg-3 col-md-3 control-label no-padding-right" for="form-field-1-1"> Email Id <label style="color:red;">*</label></label>
										<div class="col-lg-9 col-md-9 col-sm-9">
											<input type="text" id="txtEmailid" placeholder="Enter Valid Email Id" class="col-xs-10 col-sm-4" onblur="validateName('txtEmailid')" onkeypress="return nospaces(event)" />
                                           <span id="txtEmailidError" style="margin-top:6px;display: none;font-size:15px;color:red;font-family:cursive">Please Enter The Valid Mail Address e.g "a@gmail.com"</span>
                                           <span id="txtEmailidError1" style="margin-top:6px;font-size:15px;color:red;display: none;font-family:cursive">Enter Email Id</span>
                                         </div>                                        
									</div>
                                    <hr />

                                    <div class="page-header" style="text-align: left;">
                                        <h1 style="font-size: 20pt; font-family: 'Times New Roman'">Profession Details</h1>
                                    </div>

                                     <div class="form-group">
										<label class="col-sm-3 col-lg-3 col-md-3 control-label no-padding-right" for="form-field-1-1"> Qualification <label style="color:red;">*</label></label>
										<div class="col-lg-9 col-md-9 col-sm-99">
											<input type="text" id="txtqualification" placeholder="Enter Qualification" class="col-xs-10 col-sm-4" onblur="CopyName('txtqualification')" />
                                           <span id="txtqualificationError" style="margin-top:6px;font-size:15px;color:red;display: none;font-family:cursive">Enter Qualification</span>
                                         </div>                                        
									</div>

                                    <div class="form-group">
										<label class="col-sm-3 col-lg-3 col-md-3 control-label no-padding-right" for="form-field-1-1"> Current Profession</label>
										<div class="col-lg-9 col-md-9 col-sm-9">
											<input type="text" id="txtcurrentprofession" placeholder="Enter Current Profession" class="col-xs-10 col-sm-4" />
                                           </div>                                        
									</div>

                                     <hr />
                                    <div class="page-header" style="text-align: left;">
                                        <h1 style="font-size: 20pt; font-family: 'Times New Roman'">Staff Details<%--<br />--%>
                                            <i>
                                                <label style="font-size: 13pt; margin-left: 160px;">Name Of Staff Member</label></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <a id="AddRow" class="btn btn-primary btn-xs" title="Add Multiple Member"><i class="ace-icon fa fa-plus  bigger-70 icon-only"></i> &nbsp;Add Staff Member</a>
                                        </h1>
                                    </div>                                 
                                    
                                    <div class="row">
                                        <div class="col-lg-9 col-md-9 col-sm-9" style="width:100%;">
                                            <div class="col-lg-12 col-lg-push-3">                                               
                                                    <table class="table " id="table_List1" style="border-color:white;">   
                                                        <tr style="display:none;">
                                                            <td style="width:5%">Sr. No</td>
                                                            <td style="width:20%">Name</td>
                                                            <td style="width:5%">Action</td>
                                                        </tr>                                                     
                                                           <tbody id="tblnewrow">                                                                                                                      
                                                        </tbody>                                                        
                                                    </table>                                             
                                            </div>
                                        </div>
                                    </div>
									<div class="clearfix form-actions">
										<div class="col-md-offset-3 col-md-9">
											<button class="btn btn-info" type="button" id="btnSubmit">
												<i class="ace-icon fa fa-check bigger-110"></i>
												Submit
											</button>

											&nbsp; &nbsp; &nbsp;
											<button class="btn" type="reset" id="btnCancel">
												<i class="ace-icon fa fa-arrow-circle-left bigger-110"></i>
												Cancel
											</button>
										</div>
									</div>
								</form>
                                <!-- PAGE CONTENT ENDS -->
							</div><!-- /.col -->
						</div><!-- /.row -->
					</div><!-- /.page-content -->

                    <div class="page-content" id="MessageForm" style="text-align:center;display:none;">
                        <br />
                        <br />
                         <br />
                        <br />
                        <span id="" style="margin-top:6px;font-size:25px;color:darkgreen;font-family:cursive">Submitted Successfully...!</span><br />
                        <span id="" style="margin-top:6px;font-size:15px;color:red;font-family:cursive">Thank you..! </span><br />
                        <span id="" style="margin-top:6px;font-size:15px;color:red;font-family:cursive">Wait For Approval..!  Go To  <a id="GoToLogin" href="Login.aspx">Login</a> </span>
                                        
                    </div>
				</div>
			</div><!-- /.main-content -->

			<div class="footer">
				<div class="footer-inner">
					<div class="footer-content">
						<span class="bigger-120">
							<span class="blue bolder">CA</span>
							Application &copy; 2016-2017
						</span>

						&nbsp; &nbsp;
						<span class="action-buttons">
							<a href="#">
								<i class="ace-icon fa fa-twitter-square light-blue bigger-150"></i>
							</a>

							<a href="#">
								<i class="ace-icon fa fa-facebook-square text-primary bigger-150"></i>
							</a>

							<a href="#">
								<i class="ace-icon fa fa-rss-square orange bigger-150"></i>
							</a>
						</span>
					</div>
				</div>
			</div>

			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
				<i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
			</a>
		</div><!-- /.main-container -->

		
	

		
		<script type="text/javascript">
			if('ontouchstart' in document.documentElement) document.write("<script src='assets/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
		</script>
		<script src="assets/js/bootstrap.min.js"></script>

		
		<script src="assets/js/jquery-ui.custom.min.js"></script>
		<script src="assets/js/jquery.ui.touch-punch.min.js"></script>
		<script src="assets/js/chosen.jquery.min.js"></script>
		<script src="assets/js/spinbox.min.js"></script>
		<script src="assets/js/bootstrap-datepicker.min.js"></script>
		<script src="assets/js/bootstrap-timepicker.min.js"></script>
		<script src="assets/js/moment.min.js"></script>
		<script src="assets/js/daterangepicker.min.js"></script>
		<script src="assets/js/bootstrap-datetimepicker.min.js"></script>
		<script src="assets/js/bootstrap-colorpicker.min.js"></script>
		<script src="assets/js/jquery.knob.min.js"></script>
		<script src="assets/js/autosize.min.js"></script>
		<script src="assets/js/jquery.inputlimiter.min.js"></script>
		<script src="assets/js/jquery.maskedinput.min.js"></script>
		<script src="assets/js/bootstrap-tag.min.js"></script>
        <script src="assets/js/bootstrap-multiselect.min.js"></script>

		<!-- ace scripts -->
		<script src="assets/js/ace-elements.min.js"></script>
		<script src="assets/js/ace.min.js"></script>
	</body>
</html>
