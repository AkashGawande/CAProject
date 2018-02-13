<%@ Page Title="" Language="C#" MasterPageFile="~/Staff/StaffMaster.master" AutoEventWireup="true" CodeFile="GSTRegistration.aspx.cs" Inherits="Franchisee_GSTFiling" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <link rel="stylesheet" href="../../assets/css/select2.min.css" />
    <script src="../assets/js/jquery-2.1.4.min.js"></script>
    <script src="Staff_JS/GSTRegistration.js"></script>
   
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
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="loaderGST" class="loader" style="display:none;"></div>
    <div class="breadcrumbs ace-save-state" id="breadcrumbs">
        <ul class="breadcrumb">
            <li>
                <i class="ace-icon fa fa-home home-icon"></i>
                <a href="Dashboard.aspx">Home</a>
            </li>
            <li class="active">GST Registration</li>
        </ul>
        <!-- /.breadcrumb -->

        <div id="GSTForm">
            <div class="row">
                <div class="col-xs-12">
                    <div class="space"></div>
                    <div class="row">
                        <div class="vspace-6-sm"></div>
                        <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                            <div class="tabbable">
                                <ul class="nav nav-tabs padding-12 tab-color-blue background-blue" id="myTab">
                                    <li class="active">
                                        <a data-toggle="tab" href="#GSTFiling">GST Registration Form</a>
                                    </li>

                                     <li>
                                    <a data-toggle="tab" href="#TaxPayer">Tax Payer</a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#TaxDeductor">Tax Deductor</a>
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

                                    <div id="TaxPayer" class="tab-pane">
                                    <div class="panel panel-default">
                                        <div class="page-header">
                                            <h1>GST Registration List (Tax Payer)</h1>
                                        </div>
                                        <div class="panel-body"> 
                                            <div class="table-responsive" id="tblGSTRegTP">
                                                <table class="table table-striped table-bordered table-hover" id="dataTables-example1" style="width: 100%">
                                                    <thead>
                                                        <tr>
                                                            <th style="text-align: center" class="TextBoxColor">Sr. No</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Date</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Reference ID</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Client ID</th>
                                                            <th style="text-align: center;" class="TextBoxColor">PAN Number</th>
                                                            <th style="text-align: center" class="TextBoxColor">Applicant Name</th>
                                                            <th style="text-align: center" class="TextBoxColor">Mobile Number</th>
                                                            <th style="text-align: center" class="TextBoxColor">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="tblGSTRegListTP">
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="TaxDeductor" class="tab-pane">
                                    <div class="panel panel-default">
                                        <div class="page-header">
                                            <h1>GST Registration List (Tax Deducotr)</h1>
                                        </div>
                                        <div class="panel-body">                                            
                                            <div class="table-responsive"  id="tblGSTRegTD">
                                                <table class="table table-striped table-bordered table-hover" id="dataTables-example2" style="width: 100%">
                                                    <thead>
                                                        <tr>
                                                            <th style="text-align: center" class="TextBoxColor">Sr. No</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Date</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Reference ID</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Client ID</th>
                                                            <th style="text-align: center;" class="TextBoxColor">TAN Number</th>
                                                            <th style="text-align: center" class="TextBoxColor">Office/Deductor Name</th>
                                                            <th style="text-align: center" class="TextBoxColor">Authorised Person</th>
                                                            <th style="text-align: center" class="TextBoxColor">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="tblGSTRegListTD">
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    
                                    <div id="GSTFiling" class="tab-pane in active">
                                        <div class="panel panel-default" style="border: transparent;">
                                            <div class="widget-body">
                                                <div class="widget-main">
                                                    <div id="fuelux-wizard-container"></div>
                                                    
                                                    <div class="row" style="margin-top: 10px;">
                                                        <div class="col-lg-6 col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label class="control-label col-lg-4 col-md-4 col-sm-4">
                                                                    GST Type
                                                                    </label>                                                                
                                                                <div class="col-lg-8 col-md-8 col-sm-8">
                                                                    <select name="ddauGSTType" id="ddlGSTType" class="GSTType validate[required] form-control">
                                                                        <option value="0">--Select--</option>
                                                                        <option value="TAX_Payer">TAX Payer</option>
                                                                        <option value="TAX_Deductor">TAX Deductor</option>
                                                                       
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="col-lg-6 col-md-6 col-sm-6">
                                                        <div class="form-group">
                                                            <div id="panno" style="display:none;">
                                                                <label class="control-label col-sm-3">PAN No. <label style="color: red;">*</label></label>

                                                                <div class="col-lg-8 col-md-8 col-sm-8">
                                                                    <input type="text" class="form-control" name="req" id="txtPAN" maxlength="10" placeholder="Enter PAN Number" onblur="validate_PAN_TAN_GST_Number('txtPAN')" style="text-transform: uppercase" onkeydown="upperCaseF(this)" onkeypress="return nospaces(event)" <%--onkeyup="DisabledPAN_TANOnKeyup('txtPAN')"--%> />
                                                                    <span id="txtPANError" style="margin-top: 6px; display: none; font-size: 15px; color: red; font-family: cursive">InValid PAN No</span>
                                                                    </div>
                                                            </div>
                                                            <div id="tanno" style="display:none;">
                                                                <div class="col-lg-3 col-md-3 col-sm-3">
                                                                    <label id="">TAN No. <label style="color: red;">*</label></label>
                                                                </div>
                                                                <div class="col-lg-8 col-md-8 col-sm-8">
                                                                    <input type="text" class="form-control" name="req" id="txtTAN" placeholder="Enter TAN Number" onblur="validate_PAN_TAN_GST_Number('txtTAN')" onkeydown="upperCaseF(this)" onkeypress="return nospaces(event)" />
                                                                    <span id="txtTANError" style="margin-top: 6px; display: none; font-size: 15px; color: red; font-family: cursive">InValid TAN No</span>
                                                                </div>
                                                            </div>                                                           
                                                        </div>
                                                    </div>
                                                            <%--<div class="form-group">                                                                
                                                                <div class="col-lg-6 col-md-6 col-sm-6">
                                                                    <label class="control-label col-sm-3">
                                                                        GST No.
                                                                        <label style="color: red;">*</label></label>
                                                                    <div class="col-lg-8 col-md-8 col-sm-8">
                                                                        <input type="text" class="form-control" name="req" id="txtGST" maxlength="15" placeholder="Enter GST Number" onkeydown="upperCaseF(this)" onkeypress="return nospaces(event)" onblur="validate_PAN_TAN_GST_Number('txtGST')" />
                                                                        <span id="txtGSTError" style="margin-top: 6px; display: none; font-size: 15px; color: red; font-family: cursive">InValid GST No</span>
                                                                    </div>
                                                                </div>
                                                            </div>--%>
                                                        
                                                    </div>
                                                  
                                                    
                                                    <div class="row">
                                                        <div class="col-lg-8 col-md-8 col-sm-8 col-lg-push-3">
                                                            <span id="nodataerror" style="display: none; font-size: 15px; color: red; font-family: cursive">We have No existing Client of this no  &nbsp;&nbsp;<label id="errorNo"></label><%--<a href="ClientRegistration.aspx" style="font-size: 15px;">Register Client</a>--%></span>
                                                        </div>
                                                    </div>

                                                    
                                                     <div id="TAXPayer" style="display:none;">
                                                         <div class="row" style="margin-top: 10px;">
                                                             <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                                                 <div class="form-group">
                                                                     <label class="control-label col-lg-2 col-md-2 col-sm-2">
                                                                         Applicant Name
                                                                    <label style="color: red;">*</label></label>
                                                                     <div class="col-lg-1 col-md-1 col-sm-1">
                                                                         <label id="lblprefix">Mr/Mrs.</label>
                                                                     </div>
                                                                     <div class="col-lg-7 col-md-7 col-sm-7">
                                                                         <input type="text" class="form-control" name="req" id="txtClientName" placeholder="Enter Client Name" style="text-transform: uppercase" onkeydown="upperCaseF(this)" />
                                                                     </div>
                                                                 </div>
                                                             </div>
                                                         </div>
                                                         <div class="row">
                                                        <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                                            <div class="form-group">
                                                                <label class="control-label col-lg-2">Father Name  <label style="color: red;">*</label></label>
                                                                <div class="col-lg-1 col-md-1 col-sm-1">
                                                                    <label id="lblFprefix">Mr.</label>
                                                                </div>
                                                                <div class="col-lg-7 col-md-7 col-sm-7">
                                                                    <input type="text" class="form-control" name="req" id="txtFatherName" placeholder="Enter Father Name" style="text-transform: uppercase" onkeydown="upperCaseF(this)" />
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                         <div class="row" style="margin-top: 10px">
                                                        
                                                        <div class="col-lg-6 col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label class="control-label col-lg-4 col-md-4 col-sm-4">
                                                                    Mobile Number  <label style="color: red;">*</label>
                                                                </label>
                                                                <div class="col-lg-8">
                                                                    <input type="text" class="form-control" name="req" maxlength="10" placeholder="Enter Mobile Number" id="txtAppmobile" onblur="validateName('txtAppmobile')" onkeypress="return isNumber(event)" />
                                                                    <span id="txtAppmobileError" style="margin-top: 6px; display: none; font-size: 15px; color: red; font-family: cursive">Please Enter Valid Mobile No e.g "1234567890"</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label class="control-label col-lg-4 col-md-4 col-sm-4">
                                                                    Applicant Email  <label style="color: red;">*</label>
                                                                </label>
                                                                <div class="col-lg-8 col-md-8 col-sm-8">
                                                                    <input type="text" placeholder="Enter Email Address" class="form-control" name="req" id="txtemail" onblur="validateName('txtemail')" />
                                                                    <span id="txtemailError" style="margin-top: 6px; display: none; font-size: 15px; color: red; font-family: cursive">Please Enter The Valid Mail Address e.g "a@gmail.com"</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                         <div class="row" style="margin-top: 10px">
                                                        <div class="col-lg-6 col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label class="control-label col-lg-4 col-md-4 col-sm-4">
                                                                    State  <label style="color: red;">*</label>
                                                                </label>
                                                                <div class="col-lg-8 col-md-8 col-sm-8">
                                                                    <select name="ddaugender" id="ddlstate" class="StateName validate[required] form-control">
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <%--<div class="col-lg-6 col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label class="control-label col-lg-4 col-md-4 col-sm-4">
                                                                    Aadhar Number 
                                                                </label>
                                                                <div class="col-lg-8 col-md-8 col-sm-8">
                                                                    <input type="text" placeholder="Enter Aadhar Number" maxlength="12" class="form-control" name="req" id="txtAadharNo" onblur="validatePAN_Number('txtAadharNo')" onkeypress="return isNumber(event)" />
                                                                    <span id="txtAadharNoError" style="display: none; font-size: 15px; color: red">Invalid Adhar No eg "123456789012"</span>

                                                                </div>
                                                            </div>
                                                        </div>--%>
                                                    </div>
                                                    <hr />
                                                   
                                                         <div class="row" style="margin-top: 10px">
                                                            <div class="col-lg-10 col-md-10 col-sm-10">
                                                                <div class="form-group">
                                                                    <label class="control-label col-lg-3 col-md-3 col-sm-3">Upload Attchment<label style="color: red;">*</label></label>
                                                                    <div class="col-lg-4 col-md-4 col-sm-4">
                                                                        <input type="text" value="Photo Of Tax Payer" class="DocumentName form-control" name="req" id="txtPhoto" readonly="readonly"/>
                                                                    </div>
                                                                    <div class="col-lg-5 col-md-5 col-sm-5">
                                                                        <input type="file" class="form-control" name="file[]" id="Photo" onchange="Attachments(this,'Photo')" />
                                                                        <input type="hidden" id="PhotoPhotoSource" value="" class="PhotoSource" />
                                                                        <input type="hidden" id="PhotoFileName" value="" class="PhotoName" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                         <div class="row" style="margin-top: 10px">
                                                            <div class="col-lg-10 col-md-10 col-sm-10">
                                                                <div class="form-group">
                                                                    <label class="control-label col-lg-3 col-md-3 col-sm-3"></label>
                                                                    <div class="col-lg-4 col-md-4 col-sm-4">
                                                                        <input type="text" value="Electric Bill Of Office" class="DocumentName form-control" name="req" id="txtElectricBill" readonly="readonly" />
                                                                    </div>
                                                                    <div class="col-lg-5 col-md-5 col-sm-5">
                                                                        <input type="file" class="form-control" name="file[]" id="ElectricBill" onchange="Attachments(this,'ElectricBill')" />
                                                                       <input type="hidden" id="ElectricBillPhotoSource" value="" class="ElectricBillSource" />
                                                                        <input type="hidden" id="ElectricBillFileName" value="" class="ElectricBillName" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                         <div class="row" style="margin-top: 10px">
                                                            <div class="col-lg-10 col-md-10 col-sm-10">
                                                                <div class="form-group">
                                                                    <label class="control-label col-lg-3 col-md-3 col-sm-3"></label>
                                                                    <div class="col-lg-4 col-md-4 col-sm-4">
                                                                        <input type="text" value="PAN Card Of Tax Payer" class="DocumentName form-control" name="req" id="txtPANCard" readonly="readonly" />
                                                                    </div>
                                                                    <div class="col-lg-5 col-md-5 col-sm-5">
                                                                        <input type="file" class="form-control" name="file[]" id="PANCard" onchange="Attachments(this,'PANCard')" />
                                                                       <input type="hidden" id="PANCardPhotoSource" value="" class="PANCardSource" />
                                                                        <input type="hidden" id="PANCardFileName" value="" class="PANCardName" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                         <div class="row" style="margin-top: 10px">
                                                            <div class="col-lg-10 col-md-10 col-sm-10">
                                                                <div class="form-group">
                                                                    <label class="control-label col-lg-3 col-md-3 col-sm-3"></label>
                                                                    <div class="col-lg-4 col-md-4 col-sm-4">
                                                                        <input type="text" value="Adhar Of Tax Payer" class="DocumentName form-control" name="req" id="txtAadhar" readonly="readonly" />
                                                                    </div>
                                                                    <div class="col-lg-5 col-md-5 col-sm-5">
                                                                        <input type="file" class="form-control" name="file[]" id="Aadhar" onchange="Attachments(this,'Aadhar')" />
                                                                       <input type="hidden" id="AadharPhotoSource" value="" class="AadharSource" />
                                                                        <input type="hidden" id="AadharFileName" value="" class="AadharName" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                         <div class="row" style="margin-top: 10px">
                                                            <div class="col-lg-10 col-md-10 col-sm-10">
                                                                <div class="form-group">
                                                                    <label class="control-label col-lg-3 col-md-3 col-sm-3"></label>
                                                                    <div class="col-lg-4 col-md-4 col-sm-4">
                                                                        <input type="text" value="Shop Act NOC (GP)" class="DocumentName form-control" name="req" id="txtShopAct" readonly="readonly" />
                                                                    </div>
                                                                    <div class="col-lg-5 col-md-5 col-sm-5">
                                                                        <input type="file" class="form-control" name="file[]" id="ShopAct" onchange="Attachments(this,'ShopAct')" />
                                                                        <input type="hidden" id="ShopActPhotoSource" value="" class="ShopActSource" />
                                                                        <input type="hidden" id="ShopActFileName" value="" class="ShopActName" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                         <div class="row" style="margin-top: 10px">
                                                            <div class="col-lg-10 col-md-10 col-sm-10">
                                                                <div class="form-group">
                                                                    <label class="control-label col-lg-3 col-md-3 col-sm-3"></label>
                                                                    <div class="col-lg-4 col-md-4 col-sm-4">
                                                                        <input type="text" value="Electric Bill Of Home" class="DocumentName form-control" name="req" id="txtHomeElectricBill" readonly="readonly" />
                                                                    </div>
                                                                    <div class="col-lg-5 col-md-5 col-sm-5">
                                                                        <input type="file" class="form-control" name="file[]" id="HomeElectricBill" onchange="Attachments(this,'HomeElectricBill')" />
                                                                       <input type="hidden" id="HomeElectricBillPhotoSource" value="" class="HomeElectricBillSource" />
                                                                        <input type="hidden" id="HomeElectricBillFileName" value="" class="HomeElectricBillName" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                         <div class="row" style="margin-top: 10px">
                                                            <div class="col-lg-10 col-md-10 col-sm-10">
                                                                <div class="form-group">
                                                                    <label class="control-label col-lg-3 col-md-3 col-sm-3"></label>
                                                                    <div class="col-lg-4 col-md-4 col-sm-4">
                                                                        <input type="text" value="Bank Statement" class="DocumentName form-control" name="req" id="txtBankStatement" readonly="readonly"/>
                                                                    </div>
                                                                    <div class="col-lg-5 col-md-5 col-sm-5">
                                                                        <input type="file" class="form-control" name="file[]" id="BankStatement" onchange="Attachments(this,'BankStatement')" />
                                                                        <input type="hidden" id="BankStatementPhotoSource" value="" class="BankStatementSource" />
                                                                        <input type="hidden" id="BankStatementFileName" value="" class="BankStatementName" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                         <div class="row" style="margin-top: 10px">
                                                            <div class="col-lg-10 col-md-10 col-sm-10">
                                                                <div class="form-group">
                                                                    <label class="control-label col-lg-3 col-md-3 col-sm-3"></label>
                                                                    <div class="col-lg-4 col-md-4 col-sm-4">
                                                                        <input type="text" value="Cancel Cheque" class="DocumentName form-control" name="req" id="txtCheque" readonly="readonly" />
                                                                    </div>
                                                                    <div class="col-lg-5 col-md-5 col-sm-5">
                                                                        <input type="file" class="form-control" name="file[]" id="Cheque" onchange="Attachments(this,'Cheque')" />
                                                                       <input type="hidden" id="ChequePhotoSource" value="" class="ChequeSource" />
                                                                        <input type="hidden" id="ChequeFileName" value="" class="ChequeName" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                         <div class="row" style="margin-top: 10px">
                                                            <div class="col-lg-10 col-md-10 col-sm-10">
                                                                <div class="form-group">
                                                                    <label class="control-label col-lg-3 col-md-3 col-sm-3"></label>
                                                                    <div class="col-lg-4 col-md-4 col-sm-4">
                                                                        <input type="text" value="PartnerShip" class="DocumentName form-control" name="req" id="txtPartnerShip" readonly="readonly" />
                                                                    </div>
                                                                    <div class="col-lg-5 col-md-5 col-sm-5">
                                                                        <input type="file" class="form-control" name="file[]" id="PartnerShip" onchange="Attachments(this,'PartnerShip')" />
                                                                        <input type="hidden" id="PartnerShipPhotoSource" value="" class="PartnerShipSource" />
                                                                        <input type="hidden" id="PartnerShipFileName" value="" class="PartnerShipName" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div id="TAXDeductor" style="display: none;">
                                                        <div class="row">
                                                            <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                                                <div class="form-group">
                                                                    <label class="control-label col-lg-3 col-md-3 col-sm-3">
                                                                        Name Of Office/Deductor
                                                                    <label style="color: red;">*</label></label>
                                                                    <div class="col-lg-9 col-md-9 col-sm-9">
                                                                        <input type="text" class="form-control" name="req" id="txtGSTDeductorOfficeName" placeholder="Enter Office/Deductor Name" style="text-transform: uppercase" onkeydown="upperCaseF(this)" />
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                                                <div class="form-group">
                                                                    <label class="control-label col-lg-3">Name Of Authorised Person  <label style="color: red;">*</label></label>
                                                                   <%-- <div class="col-lg-1 col-md-1 col-sm-1" style="text-align: right;">
                                                                        <label id="lblGSTDeductorAuthorisedprefix">Mr.</label>
                                                                    </div>--%>
                                                                    <div class="col-lg-9 col-md-9 col-sm-9">
                                                                        <input type="text" class="form-control" name="req" id="txtGSTDeductorAuthorisedName" placeholder="Enter Authorised Person Name" style="text-transform: uppercase" onkeydown="upperCaseF(this)" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div class="row" style="margin-top: 10px">
                                                            <div class="col-lg-6 col-md-6 col-sm-6">
                                                                <div class="form-group">
                                                                    <label class="control-label col-lg-4 col-md-4 col-sm-4">
                                                                        Office Email 
                                                                <label style="color: red;">*</label></label>
                                                                    <div class="col-lg-8 col-md-8 col-sm-8">
                                                                        <input type="text" placeholder="Enter Email Address" class="form-control" name="req" id="txtGSTDeductorOfficeemail" onblur="validateMobileNOAndEmail('txtGSTDeductorOfficeemail')" onkeypress="return nospaces(event)" />
                                                                        <span id="txtGSTDeductorOfficeemailError" style="margin-top: 6px; display: none; font-size: 15px; color: red; font-family: cursive">Please Enter The Valid Mail Address e.g "a@gmail.com"</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-6">
                                                                <div class="form-group">
                                                                    <label class="control-label col-lg-4 col-md-4 col-sm-4">
                                                                        State 
                                                                <label style="color: red;">*</label></label>
                                                                    <div class="col-lg-8 col-md-8 col-sm-8">
                                                                        <select name="ddaugender" id="ddlGSTDeductorstate" class="StateName validate[required] form-control">
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="row" id="divGSTDeductorContactpersone">
                                                            <div class="col-lg-12 col-md-12 col-sm-12">
                                                                <table style="width: 100%;">
                                                                    <tbody id="tblGSTDeductorContactpersone">
                                                                    </tbody>

                                                                </table>
                                                            </div>
                                                        </div>
                                                        <div class="row" style="margin-top: 10px">
                                                            <div class="col-lg-10 col-md-10 col-sm-10">
                                                                <div class="form-group">
                                                                    <label class="control-label col-lg-3 col-md-3 col-sm-3">Upload Attchment<label style="color: red;">*</label></label>
                                                                    <div class="col-lg-4 col-md-4 col-sm-4">
                                                                        <input type="text" value="Photo Of DDO" class="DocumentName form-control" name="req" id="txtPhotoOfDDO" readonly="readonly" />
                                                                    </div>
                                                                    <div class="col-lg-5 col-md-5 col-sm-5">
                                                                        <input type="file" class="form-control" name="file[]" id="PhotoOfDDO" onchange="Attachments(this,'PhotoOfDDO')" />
                                                                        <input type="hidden" id="PhotoOfDDOPhotoSource" value="" class="PhotoOfDDOSource" />
                                                                        <input type="hidden" id="PhotoOfDDOFileName" value="" class="PhotoOfDDOName" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row" style="margin-top: 10px">
                                                            <div class="col-lg-10 col-md-10 col-sm-10">
                                                                <div class="form-group">
                                                                    <label class="control-label col-lg-3 col-md-3 col-sm-3"></label>
                                                                    <div class="col-lg-4 col-md-4 col-sm-4">
                                                                        <input type="text" value="Electric Bill Of Office" class="DocumentName form-control" name="req" id="txtElectricBillDDO" readonly="readonly" />
                                                                    </div>
                                                                    <div class="col-lg-5 col-md-5 col-sm-5">
                                                                        <input type="file" class="form-control" name="file[]" id="ElectricBillDDO" onchange="Attachments(this,'ElectricBillDDO')" />
                                                                        <input type="hidden" id="ElectricBillDDOPhotoSource" value="" class="ElectricBillDDOSource" />
                                                                        <input type="hidden" id="ElectricBillDDOFileName" value="" class="ElectricBillDDOName" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row" style="margin-top: 10px">
                                                            <div class="col-lg-10 col-md-10 col-sm-10">
                                                                <div class="form-group">
                                                                    <label class="control-label col-lg-3 col-md-3 col-sm-3"></label>
                                                                    <div class="col-lg-4 col-md-4 col-sm-4">
                                                                        <input type="text" value="PAN Card Of DDO" class="DocumentName form-control" name="req" id="txtPANCardDDO" readonly="readonly" />
                                                                    </div>
                                                                    <div class="col-lg-5 col-md-5 col-sm-5">
                                                                        <input type="file" class="form-control" name="file[]" id="PANCardDDO" onchange="Attachments(this,'PANCardDDO')" />
                                                                        <input type="hidden" id="PANCardDDOPhotoSource" value="" class="PANCardDDOSource" />
                                                                        <input type="hidden" id="PANCardDDOFileName" value="" class="PANCardDDOName" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="row" style="margin-top: 10px">
                                                            <div class="col-lg-10 col-md-10 col-sm-10">
                                                                <div class="form-group">
                                                                    <label class="control-label col-lg-3 col-md-3 col-sm-3"></label>
                                                                    <div class="col-lg-4 col-md-4 col-sm-4">
                                                                        <input type="text" value="TAN Of Office" class="DocumentName form-control" name="req" id="txtTANOfDDO" readonly="readonly" />
                                                                    </div>
                                                                    <div class="col-lg-5 col-md-5 col-sm-5">
                                                                        <input type="file" class="form-control" name="file[]" id="TANOfDDO" onchange="Attachments(this,'TANOfDDO')" />
                                                                        <input type="hidden" id="TANOfDDOPhotoSource" value="" class="TANOfDDOSource" />
                                                                        <input type="hidden" id="TANOfDDOFileName" value="" class="TANOfDDOName" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row" style="margin-top: 10px">
                                                            <div class="col-lg-10 col-md-10 col-sm-10">
                                                                <div class="form-group">
                                                                    <label class="control-label col-lg-3 col-md-3 col-sm-3"></label>
                                                                    <div class="col-lg-4 col-md-4 col-sm-4">
                                                                        <input type="text" value="Adhar Of DDO" class="DocumentName form-control" name="req" id="txtAadharDDO" readonly="readonly" />
                                                                    </div>
                                                                    <div class="col-lg-5 col-md-5 col-sm-5">
                                                                        <input type="file" class="form-control" name="file[]" id="AadharDDO" onchange="Attachments(this,'AadharDDO')" />
                                                                        <input type="hidden" id="AadharDDOPhotoSource" value="" class="AadharDDOSource" />
                                                                        <input type="hidden" id="AadharDDOFileName" value="" class="AadharDDOName" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                   
                                                   
                                                    <div class="row" id="Other" style="margin-top: 10px;display:none;">
                                                        <div class="row" style="margin-top: 10px">
                                                            <div class="col-lg-10 col-md-10 col-sm-10" >
                                                                <div class="form-group">
                                                                    <label class="control-label col-lg-3 col-md-3 col-sm-3"></label>
                                                                    <div class="col-lg-4 col-md-4 col-sm-4">
                                                                        <input type="text" value=" Other Document" style="width:240px;margin-left:8px;" class="DocumentName form-control" name="req" id="txtOther" readonly="readonly"/>
                                                                    </div>
                                                                    <div class="col-lg-5 col-md-5 col-sm-5">
                                                                        <input type="file" class="form-control" name="file[]" id="OtherDetails" onchange="Attachments(this,'OtherDetails')" />
                                                                       <input type="hidden" id="OtherDetailsPhotoSource" value="" class="OtherSource" />
                                                                        <input type="hidden" id="OtherDetailsFileName" value="" class="OtherName" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                     <div class="row" style="margin-top:10px;display:none;" id="gstappfile">
                                                        <div class="col-lg-7">
                                                          <div class="form-group">
                                                            <label class="control-label col-lg-5">Upload GST Application<label style="color: red;">*</label></label>
                                                            <div class="col-lg-7">
                                                                <input type="file" class="form-control" name="File Uplaod" id="GSTApplication" onchange="AttachmentsExcel(this,'GSTApplication')" />
                                                            <input type="hidden" id="GSTApplicationPhotoSource" value="" class="GSTAppPhotoSource" />
                                                             <input type="hidden" id="GSTApplicationFileName" value="" class="GSTAppPhotoFileName" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                         <div class="col-lg-1">
                                                        <div class="form-group">
                                                            <div class="col-lg-12 ">
                                                                <a title="Download GST Application File"  href="../inbuiltFiles/FormatForPurchaseRegister.xlsx"><i class='ace-icon fa fa-download fa-3x bigger-210 icon-only'></i></a>
                                                            </div>                                                            
                                                        </div>
                                                    </div>
                                                          <div class="col-lg-4">
                                                        <div class="form-group">
                                                            <div class="col-lg-12 ">
                                                                 <label style="color:lightgray;font-weight:normal;">only xls/xlsx format</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                    <hr />
                                                   
                                                    <div class="row" style="margin-top: 10px;display:none;" id="gstpayment">
                                                        <div class="col-lg-6 col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label class="control-label col-lg-4 col-md-4 col-sm-4">
                                                                    Payment Mode                                                               
                                                                    <label style="color: red;">*</label></label>
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
                                                                <label class="control-label col-lg-4 col-md-4 col-sm-4">
                                                                    Amount (Rs)
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
                                                                <input type="file" class="form-control" name="file[]" id="AmountCheque" onchange="Attachments(this,'AmountCheque')" />
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
                                                    <%--<div class="row" id="divAccount1">
                                                        <div class="col-lg-12 col-md-12 col-sm-12">
                                                            <table style="width: 100%;">
                                                                <tbody id="tblAttachment">
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


        <div class="page-content" id="MessageForm" style="text-align: center; display: none;">
            <br />
            <br />
            <br />
            <br />
            <span id="" style="margin-top: 6px; font-size: 25px; color: darkgreen; font-family: cursive">Submitted Successfully...!</span><br />
            <span id="" style="margin-top: 6px; font-size: 15px; color: red; font-family: cursive">Go To  <a id="GoToLogin" href="GSTRegistration.aspx">GST Registration</a> </span>

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

    
      <!-- Start GST Payer View Modal  Box-->
    <div class="modal fade" id="myGSTModalTP" role="dialog" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <div class="row">
                        <div class="col-sm-12" style="text-align: center;">
                            <h4 class="modal-title" style="color: steelblue;">GST Registration (Tax Payer)</h4>
                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                         <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Reference ID<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtTPReferenceID" readonly="" type="text" class="form-control" placeholder="Enter Client ID" />
                                    </div>
                                </div>
                            </div>                           
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Client ID<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtTPClientID" readonly="" type="text" class="form-control" placeholder="Enter Client ID" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label" style="color: #337ab7">PAN No<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtTPPANNumber" readonly="" type="text" class="form-control" placeholder="Enter PAN Number" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label" style="color: #337ab7">Applicant Name<label style="color: red;">*</label></label>
                                    <div class="col-sm-6">
                                        <input id="txtTPApplicanteName" type="text" class="form-control" placeholder="Enter Applicant Name" />
                                    </div>
                                    <label class="col-sm-2 col-sm-pull-1 control-label" style="color: #337ab7">Date</label>
                                    <label id="lblTPDate" class="col-sm-2 col-sm-pull-1 control-label"></label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label" style="color: #337ab7">Father Name<label style="color: red;">*</label></label>
                                    <div class="col-sm-6">
                                        <input id="txtTPFatherName" type="text" class="form-control" placeholder="Enter Father Name" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Applicant Email<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtTPApplicantEmail" type="text" class="form-control" placeholder="Enter Applicant Email" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label" style="color: #337ab7">Mobile No<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtTPMobileNo" type="text" class="form-control" placeholder="Enter Mobile Number" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">State<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                         <select name="ddlTPState" id="ddlTPState" class="StateName validate[required] form-control">
                                        </select>
                                    </div>
                                </div>
                            </div> 
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">GST Application<label style="color: red;">*</label></label>                                   
                                    <div class="col-sm-1">                                       
                                        <a id="DownloadApplicationTP" title="click here to download" href=""><img src="../Logo/Excel-Icon.png" style="height:40px;width:40px;" /></a>                            
                                    </div>
                                </div>
                            </div>                           
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Payment Mode<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <select id="ddlTPPaymentMode" class="validate[required] form-control">
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
                                       <input id="txtTPAmount" type="text" class="form-control" placeholder="Enter Amount" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="divDueDateTP" class="row" style="display:none;">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Select Due Date<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtTPDueDate" type="text" class="GSTDueDate form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>                       
                        <div id="divChequeTP" class="row" style="display: none;">
                            <div class="col-lg-4 col-md-4 col-sm-4">
                                <div class="form-group">
                                    <label class="col-sm-5 control-label" style="color: #337ab7">Cheque No</label>
                                    <div class="col-sm-7">
                                        <input id="txtTPChequeNo" maxlength="6" type="text" class="form-control" placeholder="Cheque No" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-5 col-md-5 col-sm-5">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Narration</label>
                                    <div class="col-sm-8">
                                        <input id="txtTPNarration" type="text" class="form-control" placeholder="Enter Narration" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-3">
                                <div class="form-group">
                                    <div class="col-sm-12">
                                        <div id="Photocheque">
                                            <img id="ChequePhotoTP" class="ChequePhoto" style="height: 50px; width: 50px; cursor: zoom-in;" data-toggle="modal" data-target="#myImgModal" />
                                            <a id="DownloadChequeTP" onclick="openTab(this)" href="#">
                                                <img src="../../Logo/pdf-icon.png" height="50" width="50" /></a>
                                            <a id="btnGSTPChequechange" href="#" data-toggle="modal" data-target="#ChangeChequeDocument">Change</a>
                                        </div>
                                        <div id="UploadPhotocheque">
                                            <input type="file" class="form-control" name="file[]" id="ChequeTP" onchange="Attachments(this,'ChequeTP')" />
                                            <input type="hidden" id="ChequeTPPhotoSource" value="" class="ChequeSource" />
                                            <input type="hidden" id="ChequeTPFileName" value="" class="ChequeName" />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-2 col-md-2 col-sm-2 col-sm-push-5">
                                <button id="btnGSTPUpdate" type="button" style="font-family: Calibri; font-size: 16px;" class="btn btn-success btn-sm">Update</button>
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-sm-push-0" style="width:100%;">
                                <div class="row">
                                    <div class="col-sm-12" style="text-align: center;">
                                        <h4 class="modal-title" style="color: steelblue;">Attachment File(s)</h4>
                                        <label id="DocumentIDTP" style="display:none;"></label>
                                    </div>
                                </div>
                                <div class="table-responsive ">
                                    <table class="table table-bordered " id="tblGSTDocTP">                                       
                                        <tbody id="tblGSTDocumentsTP">
                                           
                                        </tbody>
                                        <tfoot id="tblGSTTPFooter">
                                           
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>    

                    </div>
                    <div class="modal-footer">
                        <%--<button id="btnGSTPUpdate" type="button" style="font-family: Calibri; font-size: 16px;" class="btn btn-success btn-sm">Update</button>--%>
                        <button type="button" style="font-family: Calibri; font-size: 16px;" class="btn btn-default btn-sm" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End GST Payer View Modal  Box-->

     <!-- Start GST Deductor View Modal  Box-->
    <div class="modal fade" id="myGSTModalTD" role="dialog" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <div class="row">
                        <div class="col-sm-12" style="text-align: center;">
                            <h4 class="modal-title" style="color: steelblue;">GST Registration (Tax Deductor)</h4>
                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                         <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Reference ID<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtTDReferenceID" readonly="" type="text" class="form-control" placeholder="Enter Client ID" />
                                    </div>
                                </div>
                            </div>                           
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Client ID<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtTDClientID" readonly="" type="text" class="form-control" placeholder="Enter Client ID" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label" style="color: #337ab7">TAN No<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtTDTANNumber" readonly="" type="text" class="form-control" placeholder="Enter TAN Number" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label" style="color: #337ab7">Office/Deductor Name<label style="color: red;">*</label></label>
                                    <div class="col-sm-6">
                                        <input id="txtTDOfficeName" type="text" class="form-control" placeholder="Enter Office/Deductor Name" />
                                    </div>
                                    <label class="col-sm-2 col-sm-pull-1 control-label" style="color: #337ab7">Date</label>
                                    <label id="lblTDDate" class="col-sm-2 col-sm-pull-1 control-label"></label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label" style="color: #337ab7">Authorised Person Name<label style="color: red;">*</label></label>
                                    <div class="col-sm-6">
                                        <input id="txtTDAuthorisedPersonName" type="text" class="form-control" placeholder="Enter Authorised Person Name" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Office Email<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtTDOfficeEmail" type="text" class="form-control" placeholder="Enter Office Email" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label" style="color: #337ab7">State<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                         <select name="ddlTDState" id="ddlTDState" class="StateName validate[required] form-control">
                                        </select>
                                    </div>
                                </div>
                            </div> 
                        </div>
                         <div class="row" id="divPersonGSTD">
                            <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                <table style="width: 100%;">
                                    <tbody id="tblPersonGSTD">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">GST Application<label style="color: red;">*</label></label>                                   
                                    <div class="col-sm-1">                                       
                                        <a id="DownloadApplicationTD" title="click here to download" href=""><img src="../Logo/Excel-Icon.png" style="height:40px;width:40px;" /></a>                            
                                    </div>
                                </div>
                            </div>                           
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Payment Mode<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <select id="ddlTDPaymentMode" class="validate[required] form-control">
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
                                       <input id="txtTDAmount" type="text" class="form-control" placeholder="Enter Amount" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="divDueDateTD" class="row" style="display:none;">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Select Due Date<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtTDDueDate" type="text" class="GSTDueDate form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <%--<div id="divChequeTD" class="row" style="display:none;">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Cheque No</label>
                                    <div class="col-sm-8">
                                        <input id="txtTDChequeNo" type="text" class="form-control" placeholder="Enter Cheque No" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label" style="color: #337ab7">Narration</label>
                                    <div class="col-sm-7">
                                        <input id="txtNarrationTD" type="text" class="form-control" placeholder="Enter Narration" />
                                    </div>
                                    <div class="col-sm-1">
                                        <img id="ChequePhotoTD" class="ChequePhoto" style="display:none;height: 50px; width: 50px;cursor:zoom-in;" data-toggle="modal" data-target="#myImgModal" />
                                        <a id="DownloadChequeTD" onclick="openTab(this)" style="display:none;"  href="#"><img src="../Logo/pdf-icon.png" height="50" width="50" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>--%>
                        <div id="divChequeTD" class="row" style="display: none;">
                            <div class="col-lg-4 col-md-4 col-sm-4">
                                <div class="form-group">
                                    <label class="col-sm-5 control-label" style="color: #337ab7">Cheque No</label>
                                    <div class="col-sm-7">
                                        <input id="txtTDChequeNo" maxlength="6" type="text" class="form-control" placeholder="Cheque No" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-5 col-md-5 col-sm-5">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Narration</label>
                                    <div class="col-sm-8">
                                        <input id="txtNarrationTD" type="text" class="form-control" placeholder="Enter Narration" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-3">
                                <div class="form-group">
                                    <div class="col-sm-12">
                                        <div id="PhotochequeTD">
                                            <img id="ChequePhotoTD" class="ChequePhoto" style="height: 50px; width: 50px; cursor: zoom-in;" data-toggle="modal" data-target="#myImgModal" />
                                            <a id="DownloadChequeTD" onclick="openTab(this)" href="#">
                                                <img src="../../Logo/pdf-icon.png" height="50" width="50" /></a>
                                            <a id="btnGSTDChequechange" href="#" data-toggle="modal" data-target="#ChangeChequeDocument">Change</a>
                                        
                                        </div>
                                        <div id="UploadPhotochequeTD">
                                            <input type="file" class="form-control" name="file[]" id="ChequeTD" onchange="Attachments(this,'ChequeTD')" />
                                            <input type="hidden" id="ChequeTDPhotoSource" value="" class="ChequeSource" />
                                            <input type="hidden" id="ChequeTDFileName" value="" class="ChequeName" />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-2 col-md-2 col-sm-2 col-sm-push-5">
                                <button id="btnGSTDUpdate" type="button" style="font-family: Calibri; font-size: 16px;" class="btn btn-success btn-sm">Update</button>
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-sm-push-0" style="width:100%;">
                                <div class="row">
                                    <div class="col-sm-12" style="text-align: center;">
                                        <h4 class="modal-title" style="color: steelblue;">Attachment File(s)</h4>
                                        <label id="DocumentIDTD" style="display:none;"></label>
                                    </div>
                                </div>
                                <div class="table-responsive ">
                                    <table class="table table-bordered " id="tblGSTDocTD">                                       
                                        <tbody id="tblGSTDocumentsTD">
                                           
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>    
                    </div>
                    <div class="modal-footer">
                        <%--<button id="btnGSTDUpdate" type="button" style="font-family: Calibri; font-size: 16px;" class="btn btn-success btn-sm">Update</button>--%>
                        <button type="button" style="font-family: Calibri; font-size: 16px;" class="btn btn-default btn-sm" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End GST Deductor View Modal  Box-->

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
                            <label style="color: #337ab7">Reference ID</label>
                        </div>
                        <div class="col-sm-3">
                            <label id="lblReferenceID1" style=""></label>
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
                            <label style="color: #337ab7">Name</label>
                        </div>
                        <div class="col-sm-9">
                            <label id="lblName1" style=""></label>
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
                    <div class="row" id="divAccount1">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <table style="width: 100%;">
                                <tbody id="tblAttachment">
                                  
                                </tbody>

                            </table>
                        </div>
                    </div>
                    
                </div>
                <div class="modal-footer">
                    <button id="btnSend" type="button"  style="font-family: Calibri; font-size: 16px;" class="btn btn-success btn-sm">Send</button>
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
    <div class="modal fade" id="ChangeGSTPDocument" role="dialog" data-keyboard="false" data-backdrop="static">
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
                                    <input type="text" placeholder="Enter Document Name" class="DocumentName form-control" name="req" id="GSTPtxtDocumentName" disabled="disabled"/>
                                </div>
                            </div>
                        </div>
                    </div>
                     <div class="row" style="margin-top: 5px">
                        <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                            <div class="form-group">
                               <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                    <input type="file" class="form-control" name="file[]" id="GSTPFileChange" onchange="Attachments(this, 'GSTPFileChange')" />
                                    <label style="color: lightgray; font-weight: normal;">only pdf/jpg/jpeg/gif/bmp format</label>
                                    <input type="hidden" id="GSTPFileChangePhotoSource" value="" class="GSTPFileChangeSource" />
                                    <input type="hidden" id="GSTPFileChangeFileName" value="" class="GSTPFileChangeFileName" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="modal-footer" style="text-align:center;">
                    <a id="btnGSTPUploadChange"><input id="btnGSTPupload" type="button" value="" style="font-family: Calibri; font-size: 16px;" class="btn btn-primary btn-sm" /></a>
                    <%--<button type="button" style="font-family: Calibri; font-size: 16px;" class="btn btn-default btn-sm" data-dismiss="modal">Close</button>--%>
                </div>
            </div>
        </div>
    </div>
  <!-- End View Modal  Box-->

    <!-- Start View Modal  Box-->
    <div class="modal fade" id="ChangeGSTDDocument" role="dialog" data-keyboard="false" data-backdrop="static">
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
                                    <input type="text" placeholder="Enter Document Name" class="DocumentName form-control" name="req" id="GSTDtxtDocumentName" />
                                </div>
                            </div>
                        </div>
                    </div>
                     <div class="row" style="margin-top: 5px">
                        <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                            <div class="form-group">
                               <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                    <input type="file" class="form-control" name="file[]" id="GSTDFileChange" onchange="Attachments(this, 'GSTDFileChange')" />
                                    <label style="color: lightgray; font-weight: normal;">only pdf/jpg/jpeg/gif/bmp format</label>
                                    <input type="hidden" id="GSTDFileChangePhotoSource" value="" class="GSTPFileChangeSource" />
                                    <input type="hidden" id="GSTDFileChangeFileName" value="" class="GSTPFileChangeFileName" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="modal-footer" style="text-align:center;">
                    <a id="btnGSTDUploadChange"><input id="btnGSTDupload" type="button" value="" style="font-family: Calibri; font-size: 16px;" class="btn btn-primary btn-sm" /></a>
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
                                    <input type="file" class="form-control" name="file[]" id="ChangeCheque" onchange="Attachments(this, 'ChangeCheque')" />
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
        $('#txtTPDueDate').datepicker({
            dateFormat: 'dd-mm-yy'
        });
        $('#txtTDDueDate').datepicker({
            dateFormat: 'dd-mm-yy'
        });
    </script>
</asp:Content>

