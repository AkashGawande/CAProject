<%@ Page Title="" Language="C#" MasterPageFile="~/Head_Office/Employee/EmployeeMasterPage.master" AutoEventWireup="true" CodeFile="ITNoticeCompliance.aspx.cs" Inherits="Head_Office_ITNoticeCompliance" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <link rel="stylesheet" href="../../assets/css/select2.min.css" />
    <script src="../../assets/js/jquery-2.1.4.min.js"></script>
    <link href="../../css/ZoomImage.css" rel="stylesheet" />
    <script src="JS/ITNotice.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div class="breadcrumbs ace-save-state" id="breadcrumbs">
        <ul class="breadcrumb">
            <li>
                <i class="ace-icon fa fa-home home-icon"></i>
                <a href="Dashboard.aspx">Home</a>
            </li>
            <li class="active">IT Notice Compliance</li>
        </ul>
        <!-- /.breadcrumb -->
         <div class="row">
            <div class="col-xs-12">
                <div class="space"></div>
                <div class="row">
                    <div class="vspace-6-sm"></div>
                    <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                        <div class="tabbable">
                             <ul class="nav nav-tabs padding-12 tab-color-blue background-blue" id="myTab">
                                <li  id="liAssigned" class="active">
                                    <a data-toggle="tab" href="#ITNAssigned">Assigned Files</a>
                                </li>
                                <li id="liVerified">
                                    <a data-toggle="tab" href="#ITNVerified">Verified Files</a>
                                </li> 
                            </ul>
                           
                            <div class="panel panel-default">
                                <div class="panel-body">
                                    <div class="tab-content">
                                        <div id="ITNAssigned" class="tab-pane in active">
                                            <div class="panel panel-default">
                                                <div class="panel-body">
                                                    <div class="row">
                                                        <div class="col-lg-1 col-md-1 col-sm-1 ">
                                                            <label>From</label>
                                                        </div>
                                                        <div class="col-lg-2 col-md-2 col-sm-2 ">
                                                            <input id="StartDateAssigned" type="text" class="SDate form-control" placeholder="dd-MM-yyyy" />
                                                        </div>
                                                        <div class="col-lg-1 col-md-1 col-sm-1 ">
                                                            <label>To</label>
                                                        </div>
                                                        <div class="col-lg-2 col-md-2 col-sm-2 ">
                                                            <input id="EndDateAssigned" type="text" class="SDate form-control" placeholder="dd-MM-yyyy" />
                                                        </div>
                                                        <div class="col-lg-2 col-md-2 col-sm-2 ">
                                                            <label>Search Text</label>
                                                        </div>
                                                        <div class="col-lg-3 col-md-3 col-sm-3 col-lg-pull-1">
                                                            <input id="txtSearchTextAssigned" type="text" class="form-control" placeholder="Search here..." />
                                                        </div>
                                                        <div class="col-lg-1 col-md-1 col-sm-1 col-lg-pull-1">
                                                            <button id="btnSearchAssigned" class="btn btn-primary btn-xs">search</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div id="ITNVerified" class="tab-pane">
                                            <div class="panel panel-default">
                                                <div class="panel-body">
                                                    <div class="row">
                                                        <div class="col-lg-1 col-md-1 col-sm-1 ">
                                                            <label>From</label>
                                                        </div>
                                                        <div class="col-lg-2 col-md-2 col-sm-2 ">
                                                            <input id="StartDateVerified" type="text" class="SDate form-control" placeholder="dd-MM-yyyy" />
                                                        </div>
                                                        <div class="col-lg-1 col-md-1 col-sm-1 ">
                                                            <label>To</label>
                                                        </div>
                                                        <div class="col-lg-2 col-md-2 col-sm-2 ">
                                                            <input id="EndDateVerified" type="text" class="SDate form-control" placeholder="dd-MM-yyyy" />
                                                        </div>
                                                        <div class="col-lg-2 col-md-2 col-sm-2 ">
                                                            <label>Search Text</label>
                                                        </div>
                                                        <div class="col-lg-4 col-md-4 col-sm-4 col-lg-pull-1">
                                                            <input id="txtSearchTextVerified" type="text" class="form-control" placeholder="Search here..." />
                                                        </div>
                                                    </div>
                                                      <div class="row">                                                        
                                                        <div class="col-lg-2 col-md-2 col-sm-2 ">
                                                            <label>File Status</label>
                                                        </div>
                                                          <div class="col-lg-3 col-md-3 col-sm-3 col-lg-pull-1">
                                                              <select name="ddaugender" id="ddlFileStatus" class="validate[required] form-control">
                                                                  <option value="0">-- ALL --</option>
                                                                   <option value="Verified">Verified</option>
                                                                   <option value="Completed">Completed</option>
                                                              </select>
                                                          </div>
                                                        <div class="col-lg-1 col-md-1 col-sm-1 col-lg-pull-1">
                                                            <button id="btnSearchVerified" class="btn btn-primary btn-xs">search</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="table-responsive" style="display: none;" id="tblITN">
                                            <table class="table table-striped table-bordered table-hover" id="dataTables-example" style="width: 100%">
                                                <thead>
                                                    <tr>
                                                        <th style="width: 50px;" class="TextBoxColor">Sr. No</th>
                                                        <th style="text-align: center; width: 110px;" class="TextBoxColor">Date</th>
                                                        <th style="text-align: center; width: 50px;" class="TextBoxColor">File TransactionID</th>
                                                        <th style="text-align: center; width: 70px;" class="TextBoxColor">Client ID</th>
                                                        <th style="text-align: center" class="TextBoxColor">Applicant Name</th>
                                                        <th style="text-align: center; width: 100px;" class="TextBoxColor">Mobile Number</th>
                                                        <th style="text-align: center; width: 100px;display:none;" class="TextBoxColor">FranchiseeId</th>
                                                        <th style="text-align: center; width: 100px;display:none;" class="TextBoxColor" >StaffId</th>
                                                        <%--<th style="text-align: center; width: 100px;" class="TextBoxColor">File Status</th>--%>                                                        
                                                        <th style="text-align: center; width: 100px;display:none;" class="TextBoxColor" id="AssignedDateColumn">Assigned Date</th>
                                                        <th style="text-align: center; width: 100px;display:none;" class="TextBoxColor" id="VerifiedDateColumn">Varified Date</th>
                                                       <th style="text-align: center; width: 100px;display:none;" class="TextBoxColor" id="CompletedDateColumn">Completed Date</th>
                                                         <th style="text-align: center; width: 125px;" class="TextBoxColor">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="tblITNFiling">
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



      <%--  <div class="row">
            <div class="col-xs-12">
                <div class="space"></div>
                <div class="row">
                    <div class="vspace-6-sm"></div>
                    <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                        <div class="tabbable">
                            <div class="tab-content">
                                <div id="New" class="tab-pane in active">
                                    <div class="panel panel-default">
                                        <div class="page-header">
                                            <h1>IT Notice Compliance</h1>
                                        </div>
                                        <div class="panel-body">
                                            <div class="row">
                                                <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                                    <div class="form-group">
                                                        <label class="control-label col-sm-2">Franchisee ID</label>
                                                        <div class="col-lg-3 col-md-3 col-sm-3">
                                                            <select name="ddaugender" id="ddlFranchiseeID" class="validate[required] form-control">
                                                            </select>
                                                        </div>
                                                        <label class="control-label col-sm-2">Firm Name</label>
                                                        <div class="col-lg-5 col-md-5 col-sm-5">
                                                            <select name="ddaugender" id="ddlFirmName" class="validate[required] form-control">
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="table-responsive" style="display: none;" id="tblITNotice">
                                                <table class="table table-striped table-bordered table-hover" id="dataTables-example" style="width: 100%">
                                                    <thead>
                                                        <tr>
                                                            <th style="text-align: center" class="TextBoxColor">Sr. No</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Date</th>
                                                            <th style="text-align: center;" class="TextBoxColor">File TransactionID</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Client ID</th>
                                                            <th style="text-align: center" class="TextBoxColor">Applicant Name</th>
                                                            <th style="text-align: center" class="TextBoxColor">Mobile Number</th>
                                                            <th style="text-align: center" class="TextBoxColor">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="tblITNoticeFiling">
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
        </div>--%>
    </div>


    <script src="../../assets/js/bootstrap.min.js"></script>

    <script src="../../assets/js/wizard.min.js"></script>
    <script src="../../assets/js/jquery.validate.min.js"></script>
    <script src="../../assets/js/jquery-additional-methods.min.js"></script>
    <script src="../../assets/js/bootbox.js"></script>
    <script src="../../assets/js/jquery.maskedinput.min.js"></script>
    <script src="../../assets/js/select2.min.js"></script>

    <script src="../../assets/js/ace-elements.min.js"></script>
    <script src="../../assets/js/ace.min.js"></script>

    <script type="text/javascript">
        jQuery(function ($) {

            $('[data-rel=tooltip]').tooltip();

            $('.select2').css('width', '200px').select2({ allowClear: true })
            .on('change', function () {
                $(this).closest('form').validate().element($(this));
            });


            var $validation = false;
            $('#fuelux-wizard-container')
            .ace_wizard({
                //step: 2 //optional argument. wizard will jump to step "2" at first
                //buttons: '.wizard-actions:eq(0)'
            })
            .on('actionclicked.fu.wizard', function (e, info) {
                if (info.step == 1 && $validation) {
                    if (!$('#validation-form').valid()) e.preventDefault();
                }
            })
            //.on('changed.fu.wizard', function() {
            //})
            .on('finished.fu.wizard', function (e) {
                bootbox.dialog({
                    message: "Thank you! Your information was successfully saved!",
                    buttons: {
                        "success": {
                            "label": "OK",
                            "className": "btn-sm btn-primary"
                        }
                    }
                });
            }).on('stepclick.fu.wizard', function (e) {
                //e.preventDefault();//this will prevent clicking and selecting steps
            });



            //this is for demo only, you usullay want just one form in your application
            $('#skip-validation').removeAttr('checked').on('click', function () {
                $validation = this.checked;
                if (this.checked) {
                    $('#sample-form').hide();
                    $('#validation-form').removeClass('hide');
                }
                else {
                    $('#validation-form').addClass('hide');
                    $('#sample-form').show();
                }
            })



            //documentation : http://docs.jquery.com/Plugins/Validation/validate


            $.mask.definitions['~'] = '[+-]';
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
                        email: true
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
                    if (element.is('input[type=checkbox]') || element.is('input[type=radio]')) {
                        var controls = element.closest('div[class*="col-"]');
                        if (controls.find(':checkbox,:radio').length > 1) controls.append(error);
                        else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
                    }
                    else if (element.is('.select2')) {
                        error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
                    }
                    else if (element.is('.chosen-select')) {
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




            $(document).one('ajaxloadstart.page', function (e) {

                $('[class*=select2]').remove();
            });
        })
    </script>



     <!-- Start View Modal  Box-->
    <div class="modal fade" id="myModal" role="dialog" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12" style="text-align: center;">
                            <h4 class="modal-title" style="color: steelblue;">IT Notice Compliance Details</h4>
                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">File Transaction ID<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtITNoticeFileTransactionID" readonly="" type="text" class="form-control" placeholder="Enter File Transaction ID" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Client ID<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtITNoticeClientID" readonly="" type="text" class="form-control" placeholder="Enter Client ID" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label" style="color: #337ab7">PAN No.<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtITNoticePANNumber" readonly="" type="text" class="form-control" placeholder="Enter PAN Number" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label" style="color: #337ab7">Applicant Name<label style="color: red;">*</label></label>
                                    <div class="col-sm-6">
                                        <input id="txtITNoticeApplicantName" readonly="" type="text" class="form-control" placeholder="Enter Applicant Name" />
                                    </div>
                                    <label class="col-sm-2 col-sm-pull-1 control-label" style="color: #337ab7">Date</label>
                                    <label id="lblITNoticeDate" class="col-sm-2 col-sm-pull-1 control-label"></label>
                                </div>
                            </div>
                        </div>
                       <%-- <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label" style="color: #337ab7">Father Name</label>
                                    <div class="col-sm-6">
                                        <input id="txtITNoticeApplicantFatherName" readonly="" type="text" class="form-control" placeholder="Enter Applicant Father Name" />
                                    </div>
                                </div>
                            </div>
                        </div>--%>                       
                        <div class="row">                          
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Birth Date<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtITNoticeBirthDate" readonly="" type="text" class="form-control " />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Applicant Mobile<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtITNoticeApplicantMobileNo" readonly="" type="text" class="form-control" placeholder="Enter Applicant Mobile" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">                            
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Email<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtITNoticeApplicantEmailID" readonly="" type="text" class="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">State<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <select name="ddlITNoticeState"  id="ddlITNoticeState" disabled="disabled" class="StateName validate[required] form-control">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">                           
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Aadhar No.<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtITNoticeAadharNumber" readonly="" type="text" class="form-control" placeholder="Enter Aadhar Number" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                         <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Account No<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <select id="ddlAccountNo" class="ddlAccountNo validate[required] form-control">                                            
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">IFSC<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                      <input id="txtIFSC" type="text" class="form-control" placeholder="Enter IFSC" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Year Type<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <select id="ddlITNoticeYearType" class="validate[required] form-control">
                                            <option value="0">--Select--</option>
                                            <option value="Assesment_Year">Assesment Year</option>
                                            <option value="Financial_Year">Financial Year</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Year<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <select id="ddlITNoticeYear" class="validate[required] form-control">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                         <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Payment Mode<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <select id="ddlITNoticePaymentMode" class="validate[required] form-control">
                                            <option value="0">--Select--</option>
                                            <option value="CASH">CASH</option>
                                            <option value="Credit">Credit</option>
                                            <option value="Cheque">Cheque</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Amount<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                       <input id="txtITNoticeAmount" type="text" class="form-control" placeholder="Enter Amount" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="divDueDateNotice" class="row" style="display:none;">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Select Due Date</label>
                                    <div class="col-sm-8">
                                        <input id="txtITNoticeDueDate" type="text" class="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="divChequeNotice" class="row" style="display:none;">
                            <div class="col-lg-4 col-md-4 col-sm-4">
                                <div class="form-group">
                                    <label class="col-sm-5 control-label" style="color: #337ab7">Cheque No</label>
                                    <div class="col-sm-7">
                                        <input id="txtNoticeChequeNo" maxlength="6" type="text" class="form-control" placeholder="Cheque No" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-5 col-md-5 col-sm-5">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Narration</label>
                                    <div class="col-sm-8">
                                        <input id="txtNoticeNarration" type="text" class="form-control" placeholder="Enter Narration" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-3">
                                <div class="form-group">
                                    <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                        <div id="Photocheque">
                                            <img id="ChequePhotoNotice" style="height: 50px; width: 50px; cursor: zoom-in;" data-toggle="modal" data-target="#myImgModal" />
                                            <a id="DownloadChequeNotice" onclick="openTab(this)" href="#"><img src="../Logo/pdf-icon.png" height="50" width="50" /></a>
                                        </div>
                                        <div id="UploadPhotocheque">
                                            <input type="file" class="form-control" name="file[]" id="Cheque" onchange="ChequeAttachments(this,'Cheque')" />
                                            <input type="hidden" id="ChequePhotoSource" value="" class="ChequeSource" />
                                            <input type="hidden" id="ChequeFileName" value="" class="ChequeName" />

                                        </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <%--<div id="divCheque" class="row" style="display:none;">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Cheque No</label>
                                    <div class="col-sm-8">
                                        <input id="txtITNoticeChequeNo" type="text" class="form-control" placeholder="Enter Cheque No" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label" style="color: #337ab7">Narration</label>
                                    <div class="col-sm-7">
                                        <input id="txtITNarration" type="text" class="form-control" placeholder="Enter Narration" />
                                    </div>
                                    <div class="col-sm-1">
                                        <img id="ChequePhoto" style="height: 50px; width: 50px;cursor:zoom-in;" data-toggle="modal" data-target="#myImgModal" />
                                        <a id="DownloadCheque" onclick="openTab(this)" href="#"><img src="../Logo/pdf-icon.png" height="50" width="50" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>--%>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-sm-push-0" style="width:100%;">
                                <div class="row">
                                    <div class="col-sm-12" style="text-align: center;">
                                        <h4 class="modal-title" style="color: steelblue;">Attachment File(s)</h4>
                                    </div>
                                </div>
                                <div class="table-responsive ">
                                    <table class="table table-bordered " id="tblDoc">
                                        <tbody id="tblDocuments">
                                        </tbody>
                                        <tfoot id="tblITNfooter">
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>    
                    </div>
                    <div class="modal-footer">
                        <button id="btnUpdateITNotice" type="button" style="font-family: Calibri; font-size: 16px;" class="btn btn-success btn-sm">Update</button>
                        <button type="button" style="font-family: Calibri; font-size: 16px;" class="btn btn-default btn-sm" data-dismiss="modal">Close</button>
                    </div>
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
                            <h4 class="modal-title" style="color: steelblue;">Income Tax File Document</h4>
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

     <!-- Start View Modal  Box-->
    <div class="modal fade" id="myModalReply" role="dialog" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <div class="row">
                        <div class="col-sm-12" style="text-align: center;">
                            <h4 class="modal-title" style="color: steelblue;">Send Message to Franchisee</h4>
                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <br />
                    <div class="row">
                        <div class="col-sm-3">
                            <label style="color: #337ab7">File Transaction ID</label>
                        </div>
                        <div class="col-sm-3">
                            <label id="lblFileTransactionID1" style=""></label>
                        </div>
                    </div>
                    <br />
                    <div class="row">
                        <div class="col-sm-3">
                            <label style="color: #337ab7">Franchisee ID</label>
                        </div>
                        <div class="col-sm-3">
                            <label id="lblFranchiseeID" style=""></label>
                        </div>
                        <div class="col-sm-3">
                            <label style="color: #337ab7">Client ID</label>
                        </div>
                        <div class="col-sm-3">
                            <label id="lblClientID1" style=""></label>
                        </div>
                    </div><br />
                    <div class="row">
                        <div class="col-sm-3">
                            <label style="color: #337ab7">Applicant Name</label>
                        </div>
                        <div class="col-sm-9">
                            <label id="lblApplicantName1" style=""></label>
                        </div>                        
                    </div><br />
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                            <label style="color: #337ab7">Subject</label>
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                            <input type="text" id="txtSubject" class="form-control" />
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                            <label style="color: #337ab7">Message</label>
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                            <textarea id="txtMessage" maxlength="250" class="form-control" style="height: 150px;"></textarea>
                        </div>
                    </div>                   
                    <div class="row" id="tblITNAttachment">
                        <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                            <table style="width: 100%;">
                                <tbody id="tblITNoticeAttachment">
                                  
                                </tbody>

                            </table>
                        </div>
                    </div>
                    
                </div>
                <div class="modal-footer">
                    <button type="button" id="btnSend" style="font-family: Calibri; font-size: 16px;" class="btn btn-success btn-sm">Send</button>
                    <button type="button" style="font-family: Calibri; font-size: 16px;" class="btn btn-default btn-sm" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <!-- End View Modal  Box-->



    <link href="../../css/jquery-ui.css" rel="stylesheet" />   
    <script src="../../Js/jquery-ui.js"></script>
    <script type="text/javascript">
        //$('#txtITNoticeBirthDate').datepicker({
        //    dateFormat: 'dd-mm-yy'
        //});
        $('.SDate').datepicker({
            dateFormat: 'dd-mm-yy'
        });
        $('#txtITNoticeDueDate').datepicker({
            dateFormat: 'dd-mm-yy'
        });
    </script>

</asp:Content>

