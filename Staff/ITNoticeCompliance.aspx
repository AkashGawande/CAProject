<%@ Page Title="" Language="C#" MasterPageFile="~/Staff/StaffMaster.master" AutoEventWireup="true" CodeFile="ITNoticeCompliance.aspx.cs" Inherits="Staff_ITNoticeCompliance" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <link rel="stylesheet" href="../../assets/css/select2.min.css" />
    <script src="../assets/js/jquery-2.1.4.min.js"></script>
    <script src="Staff_JS/ITNoticeCompliance.js"></script>
    <style>
        label
        {
           color:steelblue;
           font-family:Calibri;
           font-size:17px;
           /*font-weight:bold;*/
        }

        /*input[type=button]
        {
            border-radius:20px;
        }*/
        h1
        {
            text-align:center;
            font-family:'Times New Roman';
            font-size:30px;
            font-weight:bold;
            color:lightgray;
        }
         h5
        {            
            color:coral;
        }
         input[type=button]
        {
            border-radius:20px;
        }
    </style>

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
    <div id="loaderITN" class="loader" style="display:none;"></div>
    <div class="breadcrumbs ace-save-state" id="breadcrumbs">
        <ul class="breadcrumb">
            <li>
                <i class="ace-icon fa fa-home home-icon"></i>
                <a href="Dashboard.aspx">Home</a>
            </li>
            <li class="active">IT Notice Compliance</li>
        </ul>
        <!-- /.breadcrumb -->

        <div id="ITForm">
        <div class="row">
            <div class="col-xs-12">
                <div class="space"></div>
                <div class="row">
                    <div class="vspace-6-sm"></div>
                   <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                        <div class="tabbable">
                            <ul class="nav nav-tabs padding-12 tab-color-blue background-blue" id="myTab">
                                <li class="active">
                                    <a data-toggle="tab" href="#IncomeTax">IT Notice Compliance</a>
                                </li>

                                <li>
                                    <a data-toggle="tab" href="#Details">IT Notice Compliance List</a>
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

                                <div id="Details" class="tab-pane">
                                    <div class="panel panel-default">
                                        <div class="panel-body">
                                             <%--<div class="row">
                                                <div class="col-lg-12 col-md-12 col-sm-12">
                                                    <div class="form-group">
                                                        <label class="control-label col-sm-2">Employee ID</label>
                                                        <div class="col-lg-3 col-md-3 col-sm-3">
                                                            <select name="ddaugender" id="ddlEmployeeID" class="EmployeeID validate[required] form-control">
                                                            </select>
                                                        </div>
                                                        <label class="control-label col-sm-2">Employee Name</label>
                                                        <div class="col-lg-5 col-md-5 col-sm-5">
                                                            <select name="ddaugender" id="ddlEmployeeName" class="EmployeeName validate[required] form-control">
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>--%>

                                            <div class="table-responsive" id="tblITNotice">
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

                                            <%--<div class="table-responsive" id="tblIT">
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
                                                    <tbody id="tblITFiling">
                                                    </tbody>
                                                </table>
                                            </div>--%>
                                        </div>
                                    </div>
                                </div>

                                <div id="IncomeTax" class="tab-pane in active">
                                    <div class="panel panel-default" style="border: transparent;">
                                        <div class="widget-body">
                                            <div class="widget-main">
                                                <div id="fuelux-wizard-container"></div>
                                                <br />
                                                <div class="row">
                                                    <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                                        <div class="form-group">
                                                            <div class="col-lg-4 col-md-4 col-sm-4">
                                                                <label class="control-label col-sm-4">PAN No. <label style="color: red;">*</label></label>
                                                                <div class="col-lg-8 col-md-8 col-sm-8">
                                                                    <input type="text" class="form-control" name="req" id="txtPAN" maxlength="10" placeholder="Enter PAN Number" style="text-transform: uppercase" onblur="validate_PAN_TAN_GST_Number('txtPAN')" onkeydown="upperCaseF(this)" onkeypress="return nospaces(event)"  />
                                                                    <span id="txtPANError" style="margin-top: 6px; display: none; font-size: 15px; color: red; font-family: cursive">InValid PAN No</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                 <div class="row">
                                                    <div class="col-lg-8 col-md-8 col-sm-8 col-lg-push-4">
                                                                    <span id="nodataerror" style="display: none; font-size: 15px; color: red; font-family: cursive">No Client Found  &nbsp;&nbsp;<a href="ClientRegistration.aspx" style="font-size:15px;">Register Client</a></span>
                                                     </div>
                                                </div>
                                                <div class="row" style="margin-top:10px;">
                                                    <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                                        <div class="form-group">
                                                            <label class="control-label col-lg-2 col-md-2 col-sm-2">Applicant Name <label style="color: red;">*</label></label>
                                                            <div class="col-lg-1 col-md-1 col-sm-1">
                                                                <label id="lblprefix">Mr/Mrs.</label>
                                                            </div>
                                                            <div class="col-lg-7 col-md-7 col-sm-7">
                                                                <input type="text" class="form-control" name="req" id="txtClientName" placeholder="Enter Client Name" style="text-transform:uppercase"  />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>                                               
                                                <hr />
                                               
                                                <div class="row" style="margin-top: 10px">
                                                    <div class="col-lg-6 col-md-6 col-sm-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-lg-4 col-md-4 col-sm-4">
                                                                Birth Date 
                                                                <%--<label style="color: red;">*</label>--%></label>
                                                            <div class="col-lg-8 col-md-8 col-sm-8">
                                                                <input type="text" id="txtDOB" placeholder="dd-MM-yyyy" name="date" class="validate[required,custom[date]] form-control col-lg-6" readonly="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6 col-sm-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-lg-4 col-md-4 col-sm-4">
                                                                Mobile Number 
                                                                <%--<label style="color: red;">*</label>--%></label>
                                                            <div class="col-lg-8">
                                                                <input type="text" class="form-control" name="req" maxlength="10" placeholder="Enter Mobile Number" id="txtAppmobile" onblur="validateName('txtAppmobile')" onkeypress="return isNumber(event)" readonly="" />
                                                                <span id="txtAppmobileError" style="margin-top: 6px; display: none; font-size: 15px; color: red; font-family: cursive">Please Enter Valid Mobile No e.g "1234567890"</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row" style="margin-top: 10px">
                                                    <div class="col-lg-6 col-md-6 col-sm-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-lg-4 col-md-4 col-sm-4">
                                                                Applicant Email 
                                                                <%--<label style="color: red;">*</label>--%></label>
                                                            <div class="col-lg-8 col-md-8 col-sm-8">
                                                                <input type="text" placeholder="Enter Email Address" class="form-control" name="req" id="txtemail" onblur="validateName('txtemail')" readonly="" />
                                                                <span id="txtemailError" style="margin-top:6px;display:none;font-size:15px;color: red; font-family: cursive">Please Enter The Valid Mail Address e.g "a@gmail.com"</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                     <div class="col-lg-6 col-md-6 col-sm-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-lg-4 col-md-4 col-sm-4">State 
                                                                <%--<label style="color: red;">*</label>--%></label>
                                                            <div class="col-lg-8 col-md-8 col-sm-8">
                                                                <select name="ddaugender" id="ddlstate" class="StateName validate[required] form-control" disabled="disabled">
                                                                    
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row" style="margin-top: 10px">
                                                    <div class="col-lg-6 col-md-6 col-sm-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-lg-4 col-md-4 col-sm-4">Aadhar Number 
                                                                <%--<label style="color: red;">*</label>--%></label>
                                                            <div class="col-lg-8 col-md-8 col-sm-8">
                                                                <input type="text" placeholder="Enter Aadhar Number" maxlength="12" class="form-control" name="req" id="txtAadharNo"  onblur="validatePAN_Number('txtAadharNo')" onkeypress="return isNumber(event)" readonly="" />
                                                                <span id="txtAadharNoError" style="display: none;font-size:15px;color:red">Invalid Adhar No eg "123456789012"</span>
                                                
                                                            </div>
                                                        </div>
                                                    </div>                                     
                                                </div>
                                                <hr />
                                                 <div class="row" style="margin-top: 10px">
                                                    <div class="col-lg-6 col-md-6 col-sm-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-lg-4 col-md-4 col-sm-4">Account No 
                                                                <label style="color: red;">*</label></label>
                                                            <div class="col-lg-8 col-md-8 col-sm-8">
                                                                <select name="ddaugender" id="ddlAccountNo" class="AccountNo validate[required] form-control">
                                                                    
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6 col-sm-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-lg-4 col-md-4 col-sm-4">IFSC Code 
                                                                <label style="color: red;">*</label></label>
                                                            <div class="col-lg-8 col-md-8 col-sm-8">
                                                               <input type="text" placeholder="ENTER IFSC Code" class=" IfseCode form-control" name="req" id="txtIfseCode" readonly="" />
                                                            
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                      
                                                <div class="row" style="margin-top: 10px">
                                                    <div class="col-lg-6 col-md-6 col-sm-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-lg-4 col-md-4 col-sm-4">Assesment Year
                                                                <label style="color: red;">*</label></label>
                                                            <div class="col-lg-8 col-md-8 col-sm-8">
                                                                <select name="ddaugender" id="ddlAssesmentYear" class="AssesmentYear validate[required] form-control">
                                                                    <option value="0">--Select--</option>
                                                                    <option value="Assesment_Year">Assesment Year</option>
                                                                    <option value="Financial_Year">Financial Year</option>

                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6 col-sm-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-lg-4 col-md-4 col-sm-4">Year 
                                                                <label style="color: red;">*</label></label>
                                                            <div class="col-lg-8 col-md-8 col-sm-8">
                                                               <select name="ddaugender" id="ddlYear" class="Year validate[required] form-control">
                                                                   <option value="0">--Select--</option>
                                                                     
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row" style="margin-top: 10px">
                                                    <div class="col-lg-6 col-md-6 col-sm-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-lg-4 col-md-4 col-sm-4">Payment Mode<label style="color: red;">*</label></label>
                                                            <div class="col-lg-8 col-md-8 col-sm-8">
                                                                <select name="ddaugender" id="ddlPaymentMode" class="PaymentMode validate[required] form-control">
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
                                                            <label class="control-label col-lg-4 col-md-4 col-sm-4">Amount (Rs)
                                                                <label style="color: red;">*</label></label>
                                                            <div class="col-lg-8 col-md-8 col-sm-8">
                                                              <input type="text" placeholder="ENTER AMOUNT" class=" IfseCode form-control" name="req" id="txtAmount" />
                                                            </div>
                                                        </div>
                                                    </div>                                                                                                     
                                                </div>
                                                <div class="row" style="margin-top: 10px;display:none;" id="ChequeDetailsRow">
                                                        <div class="col-lg-2 col-md-2 col-sm-2">
                                                            <div class="form-group">
                                                                 <input type="text" placeholder="CHEUQE NO" maxlength="6" class=" Cheque form-control"  name="req" id="txtAmountCheque" onkeypress="return isNumber(event)" />
                                                             </div>
                                                        </div>
                                                        <div class="col-lg-5 col-md-5 col-sm-5">
                                                            <div class="form-group">
                                                               <input type="text" placeholder="ENTER NARRATION" class="Naration form-control" name="req" id="txtNaration" />
                                                             </div>
                                                        </div>
                                                        <div class="col-lg-5 col-md-5 col-sm-5">
                                                            <div class="form-group">
                                                                <input type="file" class="form-control" name="file[]" id="AmountCheque" onchange="AttachmentsCheque(this,'AmountCheque')" />
                                                                       <input type="hidden" id="AmountChequePhotoSource" value="" class="AmountChequeSource" />
                                                                        <input type="hidden" id="AmountChequeFileName" value="" class="AmountChequeName" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                <div class="row" style="margin-top: 10px;display:none;" id="CreditDueDate">
                                                        <div class="col-lg-3 col-md-3 col-sm-3 col-lg-push-2">
                                                            <div class="form-group">
                                                                 <input type="text" placeholder="dd-MM-yyyy" class=" Cheque form-control"  name="req" id="txtDueDate"  />
                                                             </div>
                                                        </div>
                                                    </div>
                                                <br />
                                                <div class="row" id="divAccount1">
                                                    <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                                        <table style="width: 100%;">
                                                            <tbody id="tblAttachment">
                                                               
                                                            </tbody>
                                                            
                                                        </table>
                                                    </div>
                                                </div>
                                                <%--<div class="row" id="divAccount">                                                   
                                                    <div class="col-lg-12 col-md-12 col-sm-12">
                                                        <table style="width:100%;">                                                            
                                                            <tbody id="tblAccount">
                                                                                                                             
                                                            </tbody>
                                                            
                                                        </table>
                                                    </div>                                    
                                                </div>--%>
                                                                                               
                                                <div class="row">
                                                    <div style="margin-top: 30px; text-align: center;">
                                                        <input type="button" class="btn btn-success" id="btnSave" value="Save" />
                                                        <input type="button" style="display: none;" class="btn btn-info" id="btnUpdate" value="Update" />
                                                        <input type="button" class="btn btn-danger" id="btnCancel" value="Cancel" />
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
    </div>

        </div>


        <div class="page-content" id="MessageForm" style="text-align:center;display:none;">
                        <br />
                        <br />
                        <br />
                        <br />
                        <span id="" style="margin-top:6px;font-size:25px;color:darkgreen;font-family:cursive">Submitted Successfully...!</span><br />
                        <%--<span id="" style="margin-top:6px;font-size:15px;color:red;font-family:cursive">Thank you..! </span>--%>
                        <span id="" style="margin-top:6px;font-size:15px;color:red;font-family:cursive">Go To  <a id="GoToLogin" href="ITNoticeCompliance.aspx">IT Notice Compliance</a> </span>
                                        
                    </div>
        </div>

     <%-- -------------<!-- #dialog-message -->----------------------%>

    
     <!-- Start View Modal  Box-->
    <div class="modal fade" id="myModal" role="dialog" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <div class="row">
                        <div class="col-sm-12" style="text-align: center;">
                            <h4 class="modal-title" style="color: steelblue;">Income Tax File Details</h4>
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
                                        <select id="ddlAccountNoNotice" class="ddlAccountNo validate[required] form-control">                                            
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
                                    <label class="col-sm-3 control-label" style="color: #337ab7">Year<label style="color: red;">*</label></label>
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
                                    <div class="col-sm-12" >
                                        <div id="Photocheque">
                                            <img id="ChequePhotoNotice" style="height: 50px; width: 50px; cursor: zoom-in;" data-toggle="modal" data-target="#myImgModal" />
                                            <a id="DownloadChequeNotice" onclick="openTab(this)" href="#"><img src="../Logo/pdf-icon.png" height="50" width="50" /></a>
                                        <a id="btnITNChequechange" href="#" data-toggle="modal" data-target="#ChangeChequeDocument">Change</a>
                                      </div>
                                        <div id="UploadPhotocheque">
                                            <input type="file" class="form-control" name="file[]" id="Cheque" onchange="AttachmentsCheque(this,'Cheque')" />
                                            <input type="hidden" id="ChequePhotoSource" value="" class="ChequeSource" />
                                            <input type="hidden" id="ChequeFileName" value="" class="ChequeName" />

                                        </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                       
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
                                         <tfoot id="tblITFooter">
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
                        <div class="col-sm-12">
                            <label style="color: #337ab7">Subject</label>
                        </div>
                        <div class="col-sm-12 col-sm-pull-0">
                            <input type="text" id="txtSubject" class="form-control" />
                        </div>
                        <div class="col-sm-12">
                            <label style="color: #337ab7">Message</label>
                        </div>
                        <div class="col-sm-12 col-sm-pull-0">
                            <textarea id="txtMessage" maxlength="250" class="form-control" style="height: 150px;"></textarea>
                        </div>
                    </div>                   
                    <div class="row" id="tblITNAttachment">
                        <div class="col-lg-12 col-md-12 col-sm-12">
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


    <!-- Start View Modal  Box-->
    <div class="modal fade" id="ChangeITDocument" role="dialog" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <div class="row">
                        <div class="col-sm-12" style="text-align: center;">
                            <h4 class="modal-title" style="color: steelblue;">Change Document</h4>
                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="row" style="margin-top: 0px">
                        <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                            <div class="form-group">
                                <label class="control-label col-lg-12 col-md-12 col-sm-12" style="color: #337ab7;width:100%;">Enter Document Name</label>
                            </div>
                        </div>
                    </div>
                     <div class="row" style="margin-top: 5px">
                        <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                            <div class="form-group">
                               <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                    <input type="text" placeholder="Enter Document Name" class="DocumentName form-control" name="req" id="ITtxtDocumentName" />
                                </div>
                            </div>
                        </div>
                    </div>
                     <div class="row" style="margin-top: 5px">
                        <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                            <div class="form-group">
                               <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                    <input type="file" class="form-control" name="file[]" id="ITFileChange" onchange="AttachmentsCheque(this, 'ITFileChange')" />
                                    <label style="color: lightgray; font-weight: normal;">only pdf/jpg/jpeg/gif/bmp format</label>
                                    <input type="hidden" id="ITFileChangePhotoSource" value="" class="FileChangeSource" />
                                    <input type="hidden" id="ITFileChangeFileName" value="" class="FileChangeFileName" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="modal-footer" style="text-align:center;">
                    <a id="btnITUploadChange"><input id="btnITupload" type="button" value="" style="font-family: Calibri; font-size: 16px;" class="btn btn-primary btn-sm" /></a>
                    <%--<button type="button" style="font-family: Calibri; font-size: 16px;" class="btn btn-default btn-sm" data-dismiss="modal">Close</button>--%>
                </div>
            </div>
        </div>
    </div>
  <!-- End View Modal  Box-->


    <!-- Start View Modal cheque  Box-->
    <div class="modal fade" id="ChangeChequeDocument" role="dialog" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <div class="row">
                        <div class="col-sm-12" style="text-align: center;">
                            <h4 class="modal-title" style="color: steelblue;">Change Cheque Document</h4>
                        </div>
                    </div>
                </div>
                <div class="modal-body">                  
                     <div class="row" style="margin-top: 5px">
                        <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                            <div class="form-group">
                               <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                    <input type="file" class="form-control" name="file[]" id="ChangeCheque" onchange="AttachmentsCheque(this, 'ChangeCheque')" />
                                    <label style="color: lightgray; font-weight: normal;">only pdf/jpg/jpeg/gif/bmp format</label>
                                    <input type="hidden" id="ChangeChequePhotoSource" value="" class="ChangeChequePhotoSource" />
                                    <input type="hidden" id="ChangeChequeFileName" value="" class="ChangeChequeFileName" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="modal-footer" style="text-align: center;">
                    <a id="btnChequeChange"><input id="btnChequeupload" type="button" value="Change" style="font-family: Calibri; font-size: 16px;" class="btn btn-primary btn-sm" /></a>
                </div>
            </div>
        </div>
    </div>
  <!-- End View Modal cheque  Box-->


		<script src="../assets/js/bootstrap.min.js"></script>

        <script src="../assets/js/wizard.min.js"></script>
		<script src="../assets/js/jquery.validate.min.js"></script>
		<script src="../assets/js/jquery-additional-methods.min.js"></script>
		<script src="../assets/js/bootbox.js"></script>
		<script src="../assets/js/jquery.maskedinput.min.js"></script>
		<script src="../assets/js/select2.min.js"></script>

    <script src="../assets/js/ace-elements.min.js"></script>
		<script src="../assets/js/ace.min.js"></script>

   


      <link href="../css/jquery-ui.css" rel="stylesheet" />   
    <script src="../Js/jquery-ui.js"></script>
    <script type="text/javascript">
        //$('#txtDOB').datepicker({
        //    dateFormat: 'dd-mm-yy'
        //});
        $('#txtDueDate').datepicker({
            dateFormat: 'dd-mm-yy'
        });
        $('#txtITNoticeDueDate').datepicker({
            dateFormat: 'dd-mm-yy'
        });
    </script>
</asp:Content>
