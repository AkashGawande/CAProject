<%@ Page Title="" Language="C#" MasterPageFile="~/Head_Office/HeadOfficeMaster.master" AutoEventWireup="true" CodeFile="FranchiseeList.aspx.cs" Inherits="Head_Office_FranchiseeList" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
     <link rel="stylesheet" href="../assets/css/select2.min.css" />
    <script src="../assets/js/jquery-2.1.4.min.js"></script>
    <script src="HO_JS/FranchiseeList.js"></script>
    <link href="../css/ZoomImage.css" rel="stylesheet" />

    <style>
        /*p {
            font-size: 40px;
        }*/
        .loader {
            position: fixed;
            left: 0px;
            top: 0px;
            width: 100%;
            height: 100%;
            z-index: 9999;
            background: url('../Logo/ajax-loader.gif') 50% 50% no-repeat rgb(249,249,249);
            opacity: .8;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div id="loaderHdFrachisee" class="loader" style="display:none;"></div>

    <div class="breadcrumbs ace-save-state" id="breadcrumbs">
        <ul class="breadcrumb">
            <li>
                <i class="ace-icon fa fa-home home-icon"></i>
                <a href="Dashboard.aspx">Home</a>
            </li>
            <li class="active">Franchisee List</li>
        </ul>
        <!-- /.breadcrumb -->
        <div class="row">
            <div class="col-xs-12">
                <div class="space"></div>
                <div class="row">
                    <div class="vspace-6-sm"></div>
                    <div class="col-sm-12">
                        <div class="tabbable">
                            <ul class="nav nav-tabs padding-12 tab-color-blue background-blue" id="myTab">
                                <li class="active">
                                    <a data-toggle="tab" href="#New">New Registration</a>
                                </li>

                                <li>
                                    <a data-toggle="tab" href="#Approved">Approved Franchisee</a>
                                </li>
                                <div class="nav-search" id="nav-search">
                                    <form class="form-search">
                                        <span class="input-icon">
                                            <input type="text" placeholder="Search ..." class="nav-search-input" id="nav-search-input" autocomplete="off" />
                                            <i class="ace-icon fa fa-search nav-search-icon"></i>
                                        </span>
                                    </form>
                                </div>

                            </ul>
                            <div class="tab-content">
                                <div id="New" class="tab-pane in active">
                                    <div class="panel panel-default">
                                        <div class="panel-body">
                                            <div class="table-responsive">
                                                <table class="table table-striped table-bordered table-hover" id="dataTables-example" style="width: 100%">
                                                    <thead>
                                                        <tr>
                                                            <th style="text-align: center" class="TextBoxColor">Sr. No</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Enquiry Date</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Franchisee ID</th>
                                                            <th style="text-align: center" class="TextBoxColor">Owner Name</th>
                                                            <th style="text-align: center" class="TextBoxColor">Firm Name</th>
                                                            <th style="text-align: center" class="TextBoxColor">City</th>
                                                            <th style="text-align: center" class="TextBoxColor">District</th>
                                                            <th style="text-align: center" class="TextBoxColor">Firm License</th>
                                                            <th style="text-align: center" class="TextBoxColor">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="tblNewRegistration">
                                                    </tbody>
                                                </table>
                                            </div>                                           
                                        </div>
                                    </div>
                                </div>
                                <div id="Approved" class="tab-pane">
                                    <div class="panel panel-default">
                                        <div class="panel-body">
                                            <div class="table-responsive">
                                                <table class="table table-striped table-bordered table-hover" id="dataTables-example1" style="width: 100%">
                                                    <thead>
                                                        <tr>
                                                            <th style="text-align: center" class="TextBoxColor">Sr. No</th>
                                                            <th style="text-align:center;" class="TextBoxColor">Reg. Date</th>
                                                            <th style="text-align:center;" class="TextBoxColor">Franchisee ID</th>
                                                            <th style="text-align: center" class="TextBoxColor">Owner Name</th>
                                                            <th style="text-align: center" class="TextBoxColor">Firm Name</th>                                                           
                                                            <th style="text-align: center" class="TextBoxColor">City</th>
                                                            <th style="text-align: center" class="TextBoxColor">District</th>
                                                            <th style="text-align: center" class="TextBoxColor">Firm License</th>                                                            
                                                            <th style="text-align: center"  class="TextBoxColor">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="tblApprovedFranchisee">
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
        </div>

        
		<script src="../assets/js/bootstrap.min.js"></script>

        <script src="../assets/js/wizard.min.js"></script>
		<script src="../assets/js/jquery.validate.min.js"></script>
		<script src="../assets/js/jquery-additional-methods.min.js"></script>
		<script src="../assets/js/bootbox.js"></script>
		<script src="../assets/js/jquery.maskedinput.min.js"></script>
		<script src="../assets/js/select2.min.js"></script>

    <script src="../assets/js/ace-elements.min.js"></script>
		<script src="../assets/js/ace.min.js"></script>

    <script type="text/javascript">
			jQuery(function($) {
			
				$('[data-rel=tooltip]').tooltip();
			
				$('.select2').css('width','200px').select2({allowClear:true})
				.on('change', function(){
					$(this).closest('form').validate().element($(this));
				}); 
			
			
				var $validation = false;
				$('#fuelux-wizard-container')
				.ace_wizard({
					//step: 2 //optional argument. wizard will jump to step "2" at first
					//buttons: '.wizard-actions:eq(0)'
				})
				.on('actionclicked.fu.wizard' , function(e, info){
					if(info.step == 1 && $validation) {
						if(!$('#validation-form').valid()) e.preventDefault();
					}
				})
				//.on('changed.fu.wizard', function() {
				//})
				.on('finished.fu.wizard', function(e) {
					bootbox.dialog({
						message: "Thank you! Your information was successfully saved!", 
						buttons: {
							"success" : {
								"label" : "OK",
								"className" : "btn-sm btn-primary"
							}
						}
					});
				}).on('stepclick.fu.wizard', function(e){
					//e.preventDefault();//this will prevent clicking and selecting steps
				});
			
			
				
				//this is for demo only, you usullay want just one form in your application
				$('#skip-validation').removeAttr('checked').on('click', function(){
					$validation = this.checked;
					if(this.checked) {
						$('#sample-form').hide();
						$('#validation-form').removeClass('hide');
					}
					else {
						$('#validation-form').addClass('hide');
						$('#sample-form').show();
					}
				})
			
			
			
				//documentation : http://docs.jquery.com/Plugins/Validation/validate
			
			
				$.mask.definitions['~']='[+-]';
				$('#phone').mask('(999) 999-9999');
			
				jQuery.validator.addMethod("phone", function (value, element) {
					return this.optional(element) || /^\(\d{3}\) \d{3}\-\d{4}( x\d{1,6})?$/.test(value);
				}, "Enter a valid phone number.");
			
				$('#validation-form').validate({
					errorElement: 'div',
					errorClass: 'help-block',
					focusInvalid: false,
					ignore: "",
					rules: {
						email: {
							required: true,
							email:true
						},
						password: {
							required: true,
							minlength: 5
						},
						password2: {
							required: true,
							minlength: 5,
							equalTo: "#password"
						},
						name: {
							required: true
						},
						phone: {
							required: true,
							phone: 'required'
						},
						url: {
							required: true,
							url: true
						},
						comment: {
							required: true
						},
						state: {
							required: true
						},
						platform: {
							required: true
						},
						subscription: {
							required: true
						},
						gender: {
							required: true,
						},
						agree: {
							required: true,
						}
					},
			
					messages: {
						email: {
							required: "Please provide a valid email.",
							email: "Please provide a valid email."
						},
						password: {
							required: "Please specify a password.",
							minlength: "Please specify a secure password."
						},
						state: "Please choose state",
						subscription: "Please choose at least one option",
						gender: "Please choose gender",
						agree: "Please accept our policy"
					},
			
			
					highlight: function (e) {
						$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
					},
			
					success: function (e) {
						$(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
						$(e).remove();
					},
			
					errorPlacement: function (error, element) {
						if(element.is('input[type=checkbox]') || element.is('input[type=radio]')) {
							var controls = element.closest('div[class*="col-"]');
							if(controls.find(':checkbox,:radio').length > 1) controls.append(error);
							else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
						}
						else if(element.is('.select2')) {
							error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
						}
						else if(element.is('.chosen-select')) {
							error.insertAfter(element.siblings('[class*="chosen-container"]:eq(0)'));
						}
						else error.insertAfter(element.parent());
					},
			
					submitHandler: function (form) {
					},
					invalidHandler: function (form) {
					}
				});
			
				
				
				
				$('#modal-wizard-container').ace_wizard();
				$('#modal-wizard .wizard-actions .btn[data-dismiss=modal]').removeAttr('disabled');
				
				
				
				
				$(document).one('ajaxloadstart.page', function(e) {
					
					$('[class*=select2]').remove();
				});
			})
		</script>
    <%-- -------------<!-- #dialog-message -->----------------------%>
    <!-- Start View Modal  Box-->
    <div class="modal fade" id="myModal" role="dialog" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <div class="row">
                        <div class="col-sm-12" style="text-align: center;">
                            <h4 class="modal-title" style="color: steelblue;">Franchisee Details</h4>
                        </div>
                    </div>
                </div>
                <div class="modal-body">

                    <br />
                    <div class="row">
                        <div class="col-sm-2">
                            <label style="color: #337ab7">Franchisee Id:</label>
                        </div>
                        <div class="col-sm-3 col-sm-pull-0">
                            <label id="lblFranchiseeID"></label>
                        </div>
                        <div class="col-sm-2" id="divlblPassword">
                            <label style="color: #337ab7">Password:</label>
                        </div>
                        <div class="col-sm-3 col-sm-pull-0" id="divPassword">
                            <label id="lblPassword"></label>
                        </div>
                    </div>
                    <br />
                    <div class="row">
                        <div class="col-sm-2">
                            <label style="color: #337ab7">Enquiry Date:</label>
                        </div>
                        <div class="col-sm-3 col-sm-pull-0">
                            <label id="lblEnquiryDate"></label>
                        </div>
                        <div class="col-sm-2" id="divlblRegDate">
                            <label style="color: #337ab7">Reg Date:</label>
                        </div>
                        <div class="col-sm-3 col-sm-pull-0" id="divRegDate">
                            <label id="lblRegDate"></label>
                        </div>
                    </div>
                    <br />
                    <div class="row">
                        <div class="col-sm-2">
                            <label style="color: #337ab7">Owner Name:</label>
                        </div>
                        <div class="col-sm-6 col-sm-pull-0">
                            <label id="lblOwnerName"></label>
                        </div>
                    </div>

                    <br />
                    <div class="row">
                        <div class="col-sm-2">
                            <label style="color: #337ab7">Firm Name:</label>
                        </div>
                        <div class="col-sm-3 col-sm-pull-0">
                            <label id="lblFirmName"></label>
                        </div>
                        <div class="col-sm-2">
                            <label style="color: #337ab7">PAN Number:</label>
                        </div>
                        <div class="col-sm-3 col-sm-pull-0">
                            <label id="lblPANNumber"></label>
                        </div>
                    </div>
                    <br />
                    <div class="row">
                        <div class="col-sm-2">
                            <label style="color: #337ab7">Father Name:</label>
                        </div>
                        <div class="col-sm-6 col-sm-pull-0">
                            <label id="lblFatherName"></label>
                        </div>
                    </div>
                    <br />
                    <div class="row">
                        <div class="col-sm-2">
                            <label style="color: #337ab7">Qualification:</label>
                        </div>
                        <div class="col-sm-3 col-sm-pull-0">
                            <label id="lblQualification"></label>
                        </div>
                        <div class="col-sm-3">
                            <label style="color: #337ab7">Current Profession:</label>
                        </div>
                        <div class="col-sm-3 col-sm-pull-0">
                            <label id="lblCurrentProfession"></label>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div class="row">
                        <div class="col-sm-12" style="text-align: center;">
                            <h4 class="modal-title" style="color: steelblue;">Office Address &nbsp;&nbsp;
                                                                <%--<a href="#" title = "Payment History" id="btnPaymentHistory" data-toggle="modal" data-target="#myModal2"><i class="fa fa-history"></i></a>--%>
                            </h4>
                        </div>
                    </div>
                    <br />
                    <div class="row">
                        <div class="col-sm-2">
                            <label style="color: #337ab7">First Line:</label>
                        </div>
                        <div class="col-sm-3 col-sm-pull-0">
                            <label id="lblFirstLine"></label>
                        </div>
                        <div class="col-sm-2">
                            <label style="color: #337ab7">Second Line:</label>
                        </div>
                        <div class="col-sm-3 col-sm-pull-0">
                            <label id="lblSecondLine"></label>
                        </div>
                    </div>
                    <br />
                    <div class="row">
                        <div class="col-sm-2">
                            <label style="color: #337ab7">City:</label>
                        </div>
                        <div class="col-sm-3 col-sm-pull-0">
                            <label id="lblCity"></label>
                        </div>
                        <div class="col-sm-2">
                            <label style="color: #337ab7">District:</label>
                        </div>
                        <div class="col-sm-3 col-sm-pull-0">
                            <label id="lblDistrictName"></label>
                        </div>
                    </div>
                    <br />
                    <div class="row">
                        <div class="col-sm-2">
                            <label style="color: #337ab7">Pin Code:</label>
                        </div>
                        <div class="col-sm-3 col-sm-pull-0">
                            <label id="lblPincode"></label>
                        </div>
                        <div class="col-sm-2">
                            <label style="color: #337ab7">State:</label>
                        </div>
                        <div class="col-sm-3 col-sm-pull-0">
                            <label id="lblStateName"></label>
                        </div>
                    </div>
                    <br />
                    <div class="row">
                        <div class="col-sm-2">
                            <label style="color: #337ab7">Mobile Number:</label>
                        </div>
                        <div class="col-sm-3 col-sm-pull-0">
                            <label id="lblMobileNo"></label>
                        </div>
                        <div class="col-sm-2">
                            <label style="color: #337ab7">Email:</label>
                        </div>
                        <div class="col-sm-3 col-sm-pull-0">
                            <label id="lblEmailId"></label>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div class="row">
                        <div class="col-sm-12" style="text-align: center;">
                            <h4 class="modal-title" style="color: steelblue;">Staff Details</h4>
                        </div>
                    </div>

                    <br />
                    <div class="row">
                        <div class="col-lg-11 col-sm-push-0" style="margin-left: 15px">
                            <div class="table-responsive ">
                                <table class="table table-hover table-bordered " id="tblmoreDetails">

                                    <thead>
                                        <tr>

                                            <th style="text-align: center; color: #337ab7">Sr.no</th>
                                            <th style="text-align: center; color: #337ab7">Staff Id</th>
                                            <th style="text-align: center; color: #337ab7">Member Name</th>
                                            <th style="text-align: center; color: #337ab7">Joining Date</th>
                                            <th style="text-align: center; color: #337ab7;">Password</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tblStaffDetails">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" style="font-family: Calibri; font-size: 16px;" class="btn btn-default btn-sm" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
 <!-- End View Modal  Box-->

    <!-- Start View Modal  Box-->
    <div class="modal fade" id="myImgModal" role="dialog" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <div class="row">
                        <div class="col-sm-12" style="text-align: center;">
                            <h4 class="modal-title" style="color: steelblue;">Franchisee License Copy</h4>
                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <img src="" id="ModalImage" height="100%" width="100%" />
                </div>
                <div class="modal-footer">
                    <a id="btnDownload"><button id="" type="button" style="font-family: Calibri; font-size: 16px;" class="btn btn-primary btn-sm">Download</button></a>
                    <button type="button" style="font-family: Calibri; font-size: 16px;" class="btn btn-default btn-sm" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
  <!-- End View Modal  Box-->




</asp:Content>

