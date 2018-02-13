<%@ Page Title="" Language="C#" MasterPageFile="~/Staff/StaffMaster.master" AutoEventWireup="true" CodeFile="TDSReturnFiling.aspx.cs" Inherits="Staff_TDReturnFiling" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    	<link rel="stylesheet" href="../assets/css/bootstrap-duallistbox.min.css" />
		<link rel="stylesheet" href="../assets/css/bootstrap-multiselect.min.css" />		
    <link rel="stylesheet" href="../assets/css/select2.min.css" />

    <script src="../assets/js/jquery-2.1.4.min.js"></script>
    <script src="Staff_JS/TDSReturnFiling.js"></script>
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
    <div id="loaderTDS" class="loader" style="display:none;"></div>
    <div class="breadcrumbs ace-save-state" id="breadcrumbs">
        <ul class="breadcrumb">
            <li>
                <i class="ace-icon fa fa-home home-icon"></i>
                <a href="Dashboard.aspx">Home</a>
            </li>
            <li class="active">TDS Return Filing</li>
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
                                    <a data-toggle="tab" href="#IncomeTax">TDS Return Filing Form</a>
                                </li>

                                <li>
                                    <a data-toggle="tab" href="#Details">TDS Return File List</a>
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
                                            
                                            <div class="table-responsive" id="tblIT">
                                                <table class="table table-striped table-bordered table-hover" id="dataTables-example" style="width: 100%">
                                                    <thead>
                                                        <tr>
                                                            <th style="text-align: center" class="TextBoxColor">Sr. No</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Date</th>
                                                            <th style="text-align: center;" class="TextBoxColor">File TransactionID</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Client ID</th>                                                           
                                                            <th style="text-align: center" class="TextBoxColor">Office/Deductor Name</th>
                                                            <th style="text-align: center" class="TextBoxColor">Authorised Person</th>
                                                            <th style="text-align: center" class="TextBoxColor">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="tblTDSFiles">
                                                    </tbody>
                                                     <tfoot id="tblTDFooter">
                                                    </tfoot>
                                                </table>
                                            </div>
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
                                                            <div class="col-lg-6 col-md-6 col-sm-6">
                                                                <label id="" class="control-label col-sm-4">
                                                                    TAN No. <label style="color: red;">*</label>
                                                                    </label>
                                                                <div class="col-lg-8 col-md-8 col-sm-8">
                                                                    <input type="text" class="form-control" name="req" id="txtTAN" placeholder="Enter TAN Number"  onkeydown="upperCaseF(this)" onkeypress="return nospaces(event)" onblur="validate_PAN_TAN_GST_Number('txtTAN')" onkeyup="DisabledPAN_TANOnKeyup('txtTAN')"/>
                                                                    <span id="txtTANError" style="margin-top: 6px; display: none; font-size: 15px; color: red; font-family: cursive">InValid TAN No</span>
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
                                                            <label class="control-label col-lg-3 col-md-3 col-sm-3">Office/Deductor Name <label style="color: red;">*</label></label>
                                                            
                                                            <div class="col-lg-7 col-md-7 col-sm-7">
                                                                <input type="text" class="form-control" name="req" id="txtClientName" placeholder="Enter Office / Deductor Name" style="text-transform:uppercase"  readonly=""/>
                                                            </div>
                                                            </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                                        <div class="form-group">
                                                            <label class="control-label col-lg-3">Name Of Authorised Parson <label style="color: red;">*</label></label>
                                                           <div class="col-lg-7 col-md-7 col-sm-7">
                                                                <input type="text" class="form-control" name="req" id="txtAuthorisedPersonName" placeholder="Enter Authorised Person Name" readonly=""/>
                                                            </div>
                                                           
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-lg-7 col-md-7 col-sm-7">
                                                        <div class="form-group">
                                                            <label class="control-label col-lg-5">Contact Person Name <label style="color: red;">*</label></label>
                                                           <div class="col-lg-7 col-md-7 col-sm-7">
                                                                <select name="ddauContactName" id="ddlContactName" class="ContactName validate[required] form-control">
                                                                    
                                                                </select>
                                                                </div>
                                                           
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-5 col-md-5 col-sm-5">
                                                        <div class="form-group">
                                                            <label class="control-label col-lg-4">Mobile No <label style="color: red;">*</label></label>
                                                           <div class="col-lg-8 col-md-8 col-sm-8">
                                                                <input type="text" class="form-control" name="req" maxlength="10" id="txtContactPersonMobile" placeholder="Enter Contact Person Mobile No" onkeypress="return isNumber(event)" onblur="validateContactPersonrMobileNO('txtContactPersonMobile')" readonly="" />
                                                            <span id="txtContactPersonMobileError" style="margin-top: 6px; display: none; font-size: 15px; color: red; font-family: cursive">Please Enter Valid Mobile No </span>
                                                            </div>
                                                           
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr />                                               
                                                <div class="row" style="margin-top: 10px">
                                                   <div class="col-lg-6 col-md-6 col-sm-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-lg-4 col-md-4 col-sm-4">
                                                               Office Email Id 
                                                                </label>
                                                            <div class="col-lg-8 col-md-8 col-sm-8">
                                                                <input type="text" placeholder="Enter Email Address" class="form-control" name="req" id="txtemail" readonly="" />
                                                                <span id="txtemailError" style="margin-top: 6px; display: none; font-size: 15px; color: red; font-family: cursive">Please Enter The Valid Mail Address e.g "a@gmail.com"</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6 col-sm-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-lg-4 col-md-4 col-sm-4">State 
                                                                </label>
                                                            <div class="col-lg-8 col-md-8 col-sm-8">
                                                                <select name="ddaustate" id="ddlstate" class="StateName validate[required] form-control" disabled="">
                                                                    
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div> 
                                                </div>                                               
                                                                                              
                                                <hr />
                                                <div class="row" style="margin-top: 10px">
                                                    <div class="col-lg-5 col-md-5 col-sm-5">
                                                        <div class="form-group">
                                                            <label class="control-label col-lg-5 col-md-5 col-sm-5">Type of Return
                                                                <label style="color: red;">*</label></label>
                                                            <div class="col-lg-7 col-md-7 col-sm-7 ">
                                                                <select name="ddaugender" id="ddlTypofReturn" class="TypofReturn multiselect validate[required] form-control" multiple="" >
                                                                    <option value="24Q(Salary)">24Q (Salary)</option>
                                                                    <option value="26Q(Contractor)">26Q (Contractor)</option>
                                                                    <option value="27EQ(TCS)">27EQ (TCS)</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-7 col-md-7 col-sm-7">
                                                        <div class="form-group">
                                                            <label class="control-label col-lg-5 col-md-5 col-sm-5">Quarterly Return for Period
                                                                <label style="color: red;">*</label></label>
                                                            <div class="col-lg-7 col-md-7 col-sm-7">
                                                               <select name="ddaugender" id="ddlQuarterlyReturn" class="QuarterlyReturn validate[required] form-control">
                                                                   <option value="0">--Select--</option>
                                                                   <option value="Q1">Q1 (1st April to 30 June)</option>
                                                                   <option value="Q2">Q2 (1st July to 30 Sept)</option>
                                                                   <option value="Q3">Q3 (1st Oct to 31 Dec)</option>
                                                                   <option value="Q4">Q4 (1st Jan to 31 March)</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row" style="margin-top: 10px">
                                                    <div class="col-lg-6 col-md-6 col-sm-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-lg-4 col-md-4 col-sm-4">Payment Mode                                                                <label style="color: red;">*</label></label>
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
                                                <div class="row" style="margin-top: 10px; display: none;" id="ChequeDetailsRow">
                                                    <div class="col-lg-2 col-md-2 col-sm-2">
                                                        <div class="form-group">
                                                            <input type="text" placeholder="CHEUQE NO" maxlength="6" class=" Cheque form-control" name="req" id="txtAmountCheque" onkeypress="return isNumber(event)" />
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
                                                <div class="row" style="margin-top: 10px; display: none;" id="CreditDueDate">
                                                    <div class="col-lg-3 col-md-3 col-sm-3 col-lg-push-2">
                                                        <div class="form-group">
                                                            <input type="text" placeholder="dd-MM-yyyy" class=" Cheque form-control" name="req" id="txtDueDate" />
                                                        </div>
                                                    </div>
                                                </div>
                                                                                            
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
                       <span id="" style="margin-top:6px;font-size:15px;color:red;font-family:cursive">Go To  <a id="GoToLogin" href="TDSReturnFiling.aspx">TDS Return Filing</a> </span>
                                        
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
                    <br />
                    <div class="row">
                        <div class="col-sm-2">
                            <label style="color: #337ab7">File Transaction Id:</label>
                        </div>
                        <div class="col-sm-2 col-sm-pull-0">
                            <label style="color:black;font-size:14px;font-weight:400;" id="lblFileTransactionID"></label>
                        </div>                       
                    </div>
                    <br />
                    <div class="row">
                        <div class="col-sm-2">
                            <label style="color: #337ab7">Client Id:</label>
                        </div>
                        <div class="col-sm-2 col-sm-pull-0">
                            <label style="color:black;font-size:14px;font-weight:400;" id="lblClientID"></label>
                        </div>
                        <div class="col-sm-2">
                            <label style="color: #337ab7">PAN/TAN No.:</label>
                        </div>
                        <div class="col-sm-2 col-sm-pull-0">
                            <label style="color:black;font-size:14px;font-weight:400;" id="lblTANNo"></label>
                        </div>
                        <div class="col-sm-2">
                            <label style="color: #337ab7">GST No.:</label>
                        </div>
                        <div class="col-sm-2 col-sm-pull-1">
                            <label style="color:black;font-size:14px;font-weight:400;" id="lblGSTNo"></label>
                        </div>
                    </div>                   
                    <br />
                    <div class="row">
                        <div class="col-sm-2">
                            <label style="color: #337ab7">Applicant Name:</label>
                        </div>
                        <div class="col-sm-6 col-sm-pull-0">
                            <label style="color:black;font-size:14px;font-weight:400;" id="lblApplicantName"></label>
                        </div>
                        <div class="col-sm-2">
                            <label style="color: #337ab7">Date:</label>
                        </div>
                        <div class="col-sm-2 col-sm-pull-1">
                            <label style="color:black;font-size:14px;font-weight:400;" id="lblDate"></label>
                        </div>
                    </div>
                    <br />
                    <div class="row">
                        <div class="col-sm-2">
                            <label style="color: #337ab7">Father Name:</label>
                        </div>
                        <div class="col-sm-8 col-sm-pull-0">
                            <label style="color:black;font-size:14px;font-weight:400;" id="lblFatherName"></label>
                        </div>                       
                    </div>
                    <br />
                    <div class="row">
                        <div class="col-sm-2">
                            <label style="color: #337ab7">Applicant Address:</label>
                        </div>
                        <div class="col-sm-6 col-sm-pull-0">
                            <label style="color:black;font-size:14px;font-weight:400;" id="lblApplicantAddress"></label>
                        </div>
                        <div class="col-sm-2">
                            <label style="color: #337ab7">Pincode:</label>
                        </div>
                        <div class="col-sm-2 col-sm-pull-1">
                            <label style="color:black;font-size:14px;font-weight:400;" id="lblPincode"></label>
                        </div>
                    </div>
                    <br />
                    <div class="row">
                        <div class="col-sm-2">
                            <label style="color: #337ab7">Birth Date:</label>
                        </div>
                        <div class="col-sm-2 col-sm-pull-0">
                            <label style="color:black;font-size:14px;font-weight:400;" id="lblBirthDate"></label>
                        </div>
                        <div class="col-sm-2">
                            <label style="color: #337ab7">Mobile No.:</label>
                        </div>
                        <div class="col-sm-2 col-sm-pull-0">
                            <label style="color:black;font-size:14px;font-weight:400;" id="lblMobileNo"></label>
                        </div>
                        <div class="col-sm-2">
                            <label style="color: #337ab7">Email:</label>
                        </div>
                        <div class="col-sm-2 col-sm-pull-1">
                            <label style="color:black;font-size:14px;font-weight:400;" id="lblEmail"></label>
                        </div>
                    </div>  
                    <br />
                    <div class="row">
                        <div class="col-sm-2">
                            <label style="color: #337ab7">Salaried/Self Employed:</label>
                        </div>
                        <div class="col-sm-2 col-sm-pull-0">
                            <label style="color:black;font-size:14px;font-weight:400;" id="lblSalariedSelf"></label>
                        </div>
                        <div class="col-sm-2">
                            <label style="color: #337ab7">State:</label>
                        </div>
                        <div class="col-sm-2 col-sm-pull-1">
                            <label style="color:black;font-size:14px;font-weight:400;" id="lblState"></label>
                        </div>
                        <div class="col-sm-2">
                            <label style="color: #337ab7">Citizen:</label>
                        </div>
                        <div class="col-sm-2 col-sm-pull-1">
                            <label style="color:black;font-size:14px;font-weight:400;" id="lblCitizen"></label>
                        </div>
                    </div>
                     <br />
                    <div class="row">
                        <div class="col-sm-2">
                            <label style="color: #337ab7">Aadhar Number:</label>
                        </div>
                        <div class="col-sm-4 col-sm-pull-0">
                            <label style="color:black;font-size:14px;font-weight:400;" id="lblAadharNo"></label>
                        </div>
                        <div class="col-sm-2">
                            <label style="color: #337ab7">ITD Portal Password:</label>
                        </div>
                        <div class="col-sm-4 col-sm-pull-1">
                            <label style="color:black;font-size:14px;font-weight:400;" id="lblITDPortalPassword"></label>
                        </div>
                    </div>
                    <br />
                    <div class="row">
                        <div class="col-sm-2">
                            <label style="color: #337ab7">Assesment Year:</label>
                        </div>
                        <div class="col-sm-4 col-sm-pull-0">
                            <label style="color:black;font-size:14px;font-weight:400;" id="lblAssesmentYear"></label>
                        </div>
                        <div class="col-sm-2">
                            <label style="color: #337ab7">Year:</label>
                        </div>
                        <div class="col-sm-4 col-sm-pull-1">
                            <label style="color:black;font-size:14px;font-weight:400;" id="lblYear"></label>
                        </div>
                    </div>
                     <br />
                    <div class="row">
                         <div class="col-sm-2">
                            <label style="color: #337ab7">Amount:</label>
                        </div>
                        <div class="col-sm-2 col-sm-pull-1">
                            <label style="color:black;font-size:14px;font-weight:400;" id="lblAmount"></label>
                        </div>
                        <div class="col-sm-2">
                            <label style="color: #337ab7">Payment Mode:</label>
                        </div>
                        <div class="col-sm-2 col-sm-pull-0">
                            <label style="color:black;font-size:14px;font-weight:400;" id="lblPaymentMode"></label>
                        </div>
                        <div class="col-sm-2">
                            <label style="color: #337ab7">Payment Status:</label>
                        </div>
                        <div class="col-sm-2 col-sm-pull-0">
                            <label style="color:black;font-size:14px;font-weight:400;" id="lblPaymentStatus"></label>
                        </div>
                    </div>                  
                    <br />
                    <br />                    
                    <div class="row">
                        <div class="col-lg-6 col-sm-push-0" style="margin-left: 15px">
                            <div class="row">
                                <div class="col-sm-12" style="text-align: center;">
                                    <h4 class="modal-title" style="color: steelblue;">Bank Account(s)</h4>
                                </div>
                            </div>
                            <div class="table-responsive ">
                                <table class="table table-hover table-bordered " id="tblmoreDetails">
                                    <thead>
                                        <tr>

                                            <th style="text-align: center; color: #337ab7">Sr.no</th>
                                            <th style="text-align: center; color: #337ab7">Account Number</th>
                                            <th style="text-align: center; color: #337ab7">IFSC</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tblAccountNos">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="col-lg-5 col-sm-push-0" style="margin-left: 15px">
                            <div class="row">
                                <div class="col-sm-12" style="text-align: center;">
                                    <h4 class="modal-title" style="color: steelblue;">Attachment File(s)</h4>
                                </div>
                            </div>
                            <div class="table-responsive ">
                                <table class="table table-hover table-bordered " id="tblmoreDetails1">
                                    <thead>
                                        <tr>
                                            <th style="text-align: center; color: #337ab7">Sr.no</th>
                                            <th style="text-align: center; color: #337ab7">Name</th>
                                            <th style="text-align: center; color: #337ab7">File</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tblDocuments">
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


     <%-- -------------<!-- #dialog-message -->----------------------%>
        <%-- <!-- Start View Modal  Box-->
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
  <!-- End View Modal  Box-->--%>

		<script src="../assets/js/bootstrap.min.js"></script>

        <script src="../assets/js/wizard.min.js"></script>
		<script src="../assets/js/jquery.validate.min.js"></script>
		<script src="../assets/js/jquery-additional-methods.min.js"></script>
		<script src="../assets/js/bootbox.js"></script>
		<script src="../assets/js/jquery.maskedinput.min.js"></script>


   
		<script src="../assets/js/jquery.bootstrap-duallistbox.min.js"></script>
		<script src="../assets/js/jquery.raty.min.js"></script>
		<script src="../assets/js/bootstrap-multiselect.min.js"></script>
		<script src="../assets/js/select2.min.js"></script>
		<script src="../assets/js/jquery-typeahead.js"></script>


    <script src="../assets/js/ace-elements.min.js"></script>
		<script src="../assets/js/ace.min.js"></script>
    


    <%--<script type="text/javascript">
        if ('ontouchstart' in document.documentElement) document.write("<script src='assets/js/jquery.mobile.custom.min.js'>" + "<" + "/script>");
		</script>
		<script src="../assets/js/bootstrap.min.js"></script>

		<!-- page specific plugin scripts -->
		<script src="../assets/js/jquery.bootstrap-duallistbox.min.js"></script>
		<script src="../assets/js/jquery.raty.min.js"></script>
		<script src="../assets/js/bootstrap-multiselect.min.js"></script>
		<script src="../assets/js/select2.min.js"></script>
		<script src="../assets/js/jquery-typeahead.js"></script>

		<!-- ace scripts -->
		<script src="../assets/js/ace-elements.min.js"></script>
		<script src="../assets/js/ace.min.js"></script>

		<!-- inline scripts related to this page -->--%>
		<script type="text/javascript">
		    jQuery(function ($) {
		        var demo1 = $('select[name="duallistbox_demo1[]"]').bootstrapDualListbox({ infoTextFiltered: '<span class="label label-purple label-lg">Filtered</span>' });
		        var container1 = demo1.bootstrapDualListbox('getContainer');
		        container1.find('.btn').addClass('btn-white btn-info btn-bold');

		        /**var setRatingColors = function() {
					$(this).find('.star-on-png,.star-half-png').addClass('orange2').removeClass('grey');
					$(this).find('.star-off-png').removeClass('orange2').addClass('grey');
				}*/
		        $('.rating').raty({
		            'cancel': true,
		            'half': true,
		            'starType': 'i'
		            /**,
					
					'click': function() {
						setRatingColors.call(this);
					},
					'mouseover': function() {
						setRatingColors.call(this);
					},
					'mouseout': function() {
						setRatingColors.call(this);
					}*/
		        })//.find('i:not(.star-raty)').addClass('grey');



		        //////////////////
		        //select2
		        $('.select2').css('width', '200px').select2({ allowClear: true })
		        $('#select2-multiple-style .btn').on('click', function (e) {
		            var target = $(this).find('input[type=radio]');
		            var which = parseInt(target.val());
		            if (which == 2) $('.select2').addClass('tag-input-style');
		            else $('.select2').removeClass('tag-input-style');
		        });

		        //////////////////
		        $('.multiselect').multiselect({
		            enableFiltering: true,
		            enableHTML: true,
		            buttonClass: 'btn btn-white btn-primary',
		            templates: {
		                button: '<button type="button" class="multiselect dropdown-toggle" data-toggle="dropdown"><span class="multiselect-selected-text"></span> &nbsp;<b class="fa fa-caret-down"></b></button>',
		                ul: '<ul class="multiselect-container dropdown-menu"></ul>',
		                filter: '<li class="multiselect-item filter"><div class="input-group"><span class="input-group-addon"><i class="fa fa-search"></i></span><input class="form-control multiselect-search" type="text"></div></li>',
		                filterClearBtn: '<span class="input-group-btn" ><button class="btn btn-default btn-white btn-grey multiselect-clear-filter" type="button"><i class="fa fa-times-circle red2"></i></button></span>',
		                li: '<li><a tabindex="0"><label style="color:black;"></label></a></li>',
		                divider: '<li class="multiselect-item divider"></li>',
		                liGroup: '<li class="multiselect-item multiselect-group"><label></label></li>'
		            }
		        });


		        ///////////////////

		        //typeahead.js
		        //example taken from plugin's page at: https://twitter.github.io/typeahead.js/examples/
		        var substringMatcher = function (strs) {
		            return function findMatches(q, cb) {
		                var matches, substringRegex;

		                // an array that will be populated with substring matches
		                matches = [];

		                // regex used to determine if a string contains the substring `q`
		                substrRegex = new RegExp(q, 'i');

		                // iterate through the pool of strings and for any string that
		                // contains the substring `q`, add it to the `matches` array
		                $.each(strs, function (i, str) {
		                    if (substrRegex.test(str)) {
		                        // the typeahead jQuery plugin expects suggestions to a
		                        // JavaScript object, refer to typeahead docs for more info
		                        matches.push({ value: str });
		                    }
		                });

		                cb(matches);
		            }
		        }

		        $('input.typeahead').typeahead({
		            hint: true,
		            highlight: true,
		            minLength: 1
		        }, {
		            name: 'states',
		            displayKey: 'value',
		            source: substringMatcher(ace.vars['US_STATES']),
		            limit: 10
		        });


		        ///////////////


		        //in ajax mode, remove remaining elements before leaving page
		        $(document).one('ajaxloadstart.page', function (e) {
		            $('[class*=select2]').remove();
		            $('select[name="duallistbox_demo1[]"]').bootstrapDualListbox('destroy');
		            $('.rating').raty('destroy');
		            $('.multiselect').multiselect('destroy');
		        });

		    });
		</script>
   

    <!-- Start View Modal  Box-->
    <div class="modal fade" id="myModalTDS" role="dialog" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <div class="row">
                        <div class="col-sm-12" style="text-align: center;">
                            <h4 class="modal-title" style="color: steelblue;">TDS Return File Details</h4>
                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">File TransactionID<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtTDSFileTransactionID" readonly="" type="text" class="form-control" placeholder="Enter File Transaction ID" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Client ID<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtTDSClientID" readonly="" type="text" class="form-control" placeholder="Enter Client ID" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label" style="color: #337ab7">TAN No.<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtTDSTANNumber" readonly="" type="text" class="form-control" placeholder="Enter TAN Number" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label" style="color: #337ab7">Office/Deductor Name<label style="color: red;">*</label></label>
                                    <div class="col-sm-6">
                                        <input id="txtTDSOfficeName" readonly="" type="text" class="form-control" placeholder="Enter Office/Deductor Name" />
                                    </div>
                                    <label class="col-sm-2 col-sm-pull-1 control-label" style="color: #337ab7">Date</label>
                                    <label id="lblTDSDate" class="col-sm-2 col-sm-pull-1 control-label"></label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label" style="color: #337ab7">Authorised Parson Name</label>
                                    <div class="col-sm-6">
                                        <input id="txtTDSAuthorisedParsonName" readonly="" type="text" class="form-control" placeholder="Enter Authorised Parson Name" />
                                    </div>
                                </div>
                            </div>
                        </div>                      
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Office Email<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtTDSOfficeEmail" readonly="" type="text" class="form-control" placeholder="Enter Office Email" />
                                    </div>
                                </div>
                            </div>
                           <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label" style="color: #337ab7">State<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtTDSStateName" readonly="" type="text" class="form-control" placeholder="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                         <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Contact Person<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <select name="ddlTDSContactPerson" id="ddlTDSContactPerson" class="ddlTDSContactPerson validate[required] form-control">                                            
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label" style="color: #337ab7">Mobile No.<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtTDSMobileNumber" readonly="" type="text" class="form-control" placeholder="Enter Mobile Number" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Type of Return<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <select name="ddaugender" id="ddlTDSTypofReturn" class="TypofReturnTDS multiselect validate[required] form-control" multiple="">                                           
                                            <option value="24Q(Salary)">24Q (Salary)</option>
                                            <option value="26Q(Contractor)">26Q (Contractor)</option>
                                            <option value="27EQ(TCS)">27EQ (TCS)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label" style="color: #337ab7">Quarterly Return for the Period<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <select name="ddaugender" id="ddlTDSQuarterlyReturn" class="QuarterlyReturnTDS validate[required] form-control">
                                            <option value="0">--Select--</option>
                                            <option value="Q1">Q1 (1st April to 30 June)</option>
                                            <option value="Q2">Q2 (1st July to 30 Sept)</option>
                                            <option value="Q3">Q3 (1st Oct to 31 Dec)</option>
                                            <option value="Q4">Q4 (1st Jan to 31 March)</option>
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
                                        <select id="ddlTDSPaymentMode" class="validate[required] form-control">
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
                                    <label class="col-sm-3 control-label" style="color: #337ab7">Amount<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                       <input id="txtTDSAmount" type="text" class="form-control" placeholder="Enter Amount" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="divDueDateTDS" class="row" style="display:none;">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Select Due Date</label>
                                    <div class="col-sm-8">
                                        <input id="txtTDSDueDate" type="text" class="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="divChequeTDS" class="row" style="display:none;">
                            <div class="col-lg-4 col-md-4 col-sm-4">
                                <div class="form-group">
                                    <label class="col-sm-5 control-label" style="color: #337ab7">Cheque No</label>
                                    <div class="col-sm-7">
                                        <input id="txtTDSChequeNo" maxlength="6" type="text" class="form-control" placeholder="Cheque No" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-5 col-md-5 col-sm-5">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Narration</label>
                                    <div class="col-sm-8">
                                        <input id="txtTDSNarration" type="text" class="form-control" placeholder="Enter Narration" />
                                    </div>
                                    <%--<div class="col-sm-1" style="display:none;" >
                                        <div id="Photocheque">
                                            <img id="ChequePhotoTDS" style="height: 50px; width: 50px; cursor: zoom-in;" data-toggle="modal" data-target="#myImgModal" />
                                            <a id="DownloadChequeTDS" onclick="openTab(this)" href="#"><img src="../Logo/pdf-icon.png" height="50" width="50" /></a>
                                        </div>
                                        <div id="UploadPhotocheque">

                                        </div>
                                        </div>--%>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-3">
                                <div class="form-group">
                                    <div class="col-sm-12" >
                                        <div id="Photocheque">
                                            <img id="ChequePhotoTDS" style="height: 50px; width: 50px; cursor: zoom-in;" data-toggle="modal" data-target="#myImgModal" />
                                            <a id="DownloadChequeTDS" onclick="openTab(this)" href="#"><img src="../Logo/pdf-icon.png" height="50" width="50" /></a>
                                       <a id="btnTDSChequechange" href="#" data-toggle="modal" data-target="#ChangeChequeDocument">Change</a>
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
                                    <table class="table table-bordered " id="tblDocTDS">
                                        <tbody id="tblDocumentsTDS">
                                        </tbody>
                                        <tfoot id="tblTDSFooter">

                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>    
                    </div>
                    <div class="modal-footer">
                        <button id="btnUpdateTDS" type="button" style="font-family: Calibri; font-size: 16px;" class="btn btn-success btn-sm">Update</button>
                        <button type="button" style="font-family: Calibri; font-size: 16px;" class="btn btn-default btn-sm" data-dismiss="modal">Close</button>
                    </div>
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
                    <div class="row" id="divAccount2">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <table style="width: 100%;">
                                <tbody id="tblAttachment2">
                                  
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
    <div class="modal fade" id="ChangeTDSDocument" role="dialog" data-keyboard="false" data-backdrop="static">
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
                                <label class="control-label col-lg-12 col-md-12 col-sm-12" style="width:100%;color: #337ab7;">Enter Document Name</label>
                            </div>
                        </div>
                    </div>
                     <div class="row" style="margin-top: 5px">
                        <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                            <div class="form-group">
                               <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                    <input type="text" placeholder="Enter Document Name" class="DocumentName form-control" name="req" id="TDStxtDocumentName" />
                                </div>
                            </div>
                        </div>
                    </div>
                     <div class="row" style="margin-top: 5px">
                        <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                            <div class="form-group">
                               <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                    <input type="file" class="form-control" name="file[]" id="TDSFileChange" onchange="AttachmentsCheque(this, 'TDSFileChange')" />
                                    <label style="color: lightgray; font-weight: normal;">only pdf/jpg/jpeg/gif/bmp format</label>
                                    <input type="hidden" id="TDSFileChangePhotoSource" value="" class="TDSFileChangeSource" />
                                    <input type="hidden" id="TDSFileChangeFileName" value="" class="TDSFileChangeFileName" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="modal-footer" style="text-align:center;">
                    <a id="btnTDSUploadChange"><input id="btnTDSupload" type="button" value="" style="font-family: Calibri; font-size: 16px;" class="btn btn-primary btn-sm" /></a>
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



      <link href="../css/jquery-ui.css" rel="stylesheet" />   
    <script src="../Js/jquery-ui.js"></script>
    <script type="text/javascript">
        $('#txtDOB').datepicker({
            dateFormat: 'dd-mm-yy'
        });
        $('#txtDueDate').datepicker({
            dateFormat: 'dd-mm-yy'
        });
        $('#txtTDSDueDate').datepicker({
            dateFormat: 'dd-mm-yy'
        });
    </script>
</asp:Content>
