<%@ Page Title="" Language="C#" MasterPageFile="~/Staff/StaffMaster.master" AutoEventWireup="true" CodeFile="ClientRegistration.aspx.cs" Inherits="Franchisee_ClientRegistration" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link rel="stylesheet" href="../assets/css/select2.min.css" />
    <script src="../assets/js/jquery-2.1.4.min.js"></script>
    <script src="Staff_JS/ClientRegistration.js"></script>
    <script src="Staff_JS/ClientList.js"></script>
    <script src="Staff_JS/ClientListGST.js"></script>
    <script src="Staff_JS/ClientListTAN.js"></script>
    <style>
        label {
            color: steelblue;
            font-family: Calibri;
            font-size: 17px;
            /*font-weight: bold;*/
        }

        /*input[type=button]
        {
            border-radius:20px;
        }*/
        h1 {
            text-align: center;
            font-family: 'Times New Roman';
            font-size: 30px;
            font-weight: bold;
            color: lightgray;
        }

        h5 {
            color: coral;
        }

        input[type=button] {
            border-radius: 20px;
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
    <div id="loaderClientReg" class="loader" style="display:none;"></div>
    <div class="breadcrumbs ace-save-state" id="breadcrumbs">
        <ul class="breadcrumb">
            <li>
                <i class="ace-icon fa fa-home home-icon"></i>
                <a href="Dashboard.aspx">Home</a>
            </li>
            <li class="active">Client Registration</li>
        </ul>
        <!-- /.breadcrumb -->

        <div id="ClentReg">
            <div class="row">
            <div class="col-xs-12">
                <div class="space"></div>
                <div class="row">
                    <div class="vspace-6-sm"></div>
                   <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                        <div class="tabbable">
                            <ul class="nav nav-tabs padding-12 tab-color-blue background-blue" id="myTab">
                                <li class="active">
                                    <a data-toggle="tab" href="#PanADD">Registration Form</a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#IT">IT Clients</a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#TDS">TDS Clients</a>
                                </li>
                                 <li>
                                    <a data-toggle="tab" href="#GST">GST Clients</a>
                                </li>
                                <%--<li>
                                    <a data-toggle="tab" href="#EmployeeEdit">Client List</a>
                                </li>--%>
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
                                
                                <div id="IT" class="tab-pane">
                                    <div class="panel panel-default">
                                         <div class="page-header">
                                            <h1>Income Tax Client List</h1>
                                        </div>
                                        <div class="panel-body">
                                            
                                            

                                            <div class="table-responsive" id="tblITClient">
                                                <table class="table table-striped table-bordered table-hover" id="dataTables-example1" style="width: 100%">
                                                    <thead>
                                                        <tr>
                                                            <th style="text-align: center" class="TextBoxColor">Sr. No</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Reg Date</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Client ID</th>
                                                            <th style="text-align: center" class="TextBoxColor">PAN Number</th>
                                                            <th style="text-align: center" class="TextBoxColor">Applicant Name</th>
                                                            <th style="text-align: center" class="TextBoxColor">Mobile Number</th>
                                                            <th style="text-align: center" class="TextBoxColor">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="tblITClientList">
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="TDS" class="tab-pane">
                                    <div class="panel panel-default">
                                         <div class="page-header">
                                            <h1>TDS Client List</h1>
                                        </div>
                                        <div class="panel-body">                                            
                                            
                                            <div class="table-responsive" id="tblTDSClient">
                                                <table class="table table-striped table-bordered table-hover" id="dataTables-example2" style="width: 100%">
                                                    <thead>
                                                        <tr>
                                                            <th style="text-align: center" class="TextBoxColor">Sr. No</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Reg Date</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Client ID</th>
                                                            <th style="text-align: center" class="TextBoxColor">TAN Number</th>
                                                            <th style="text-align: center" class="TextBoxColor">Office Name</th>
                                                            <th style="text-align: center" class="TextBoxColor">Authorised Person</th>
                                                            <th style="text-align: center" class="TextBoxColor">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="tblTDSClientList">
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="GST" class="tab-pane">
                                    <div class="panel panel-default">
                                         <div class="page-header">
                                            <h1>GST Client List</h1>
                                        </div>
                                        <div class="panel-body">
                                            <div class="row">
                                                <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                                    <div class="row">
                                                        <div class="form-group">
                                                            <label class="control-label col-sm-2">GST Type</label>
                                                            <div class="col-lg-3 col-md-3 col-sm-3">
                                                                <select name="ddaugender" id="ddlGSTType1" class="validate[required] form-control">
                                                                    <option value="0">--Select--</option>
                                                                    <option value="TAX_Payer">TAX Payer</option>
                                                                    <option value="TAX_Deductor">TAX Deductor</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            <div class="table-responsive" style="display:none;" id="tblGSTaxPayer">
                                                <table class="table table-striped table-bordered table-hover" id="dataTables-example3" style="width: 100%">
                                                    <thead>
                                                        <tr>
                                                            <th colspan="7" style="text-align:center;">GST Tax Payer</th>
                                                        </tr>
                                                        <tr>
                                                            <th style="text-align: center" class="TextBoxColor">Sr. No</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Reg Date</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Client ID</th>
                                                            <th style="text-align: center" class="TextBoxColor">GST Number</th>
                                                            <th style="text-align: center" class="TextBoxColor">Applicant Name</th>
                                                            <th style="text-align: center" class="TextBoxColor">Mobile Number</th>
                                                            <th style="text-align: center" class="TextBoxColor">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="tblGSTaxPayerList">
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="table-responsive" style="display:none;" id="tblGSTaxDeductor">
                                                <table class="table table-striped table-bordered table-hover" id="dataTables-example4" style="width: 100%">
                                                    <thead>
                                                         <tr>
                                                            <th colspan="7" style="text-align:center;">GST Tax Deductor</th>
                                                        </tr>
                                                        <tr>
                                                            <th style="text-align: center" class="TextBoxColor">Sr. No</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Reg Date</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Client ID</th>
                                                            <th style="text-align: center" class="TextBoxColor">GST Number</th>
                                                            <th style="text-align: center" class="TextBoxColor">Office Name</th>
                                                            <th style="text-align: center" class="TextBoxColor">Authorised Person</th>
                                                            <th style="text-align: center" class="TextBoxColor">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="tblGSTaxDeductorList">
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>




                                <div id="PanADD" class="tab-pane in active">
                                    <div class="panel panel-default" style="border: transparent;" id="EnquiryForm">
                                        <div class="widget-body">
                                            <div class="widget-main">
                                                <div id="fuelux-wizard-container"></div>
                                                <div class="row" style="margin-top: 10px;">
                                                    <div class="col-lg-6 col-md-6 col-sm-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-lg-4 col-md-4 col-sm-4">
                                                                Select Client Type
                                                            </label>
                                                            <div class="col-lg-8 col-md-8 col-sm-8">
                                                                <select name="ddauGSTType" id="ddlClientType" class="ClientType validate[required] form-control">
                                                                    <option value="0">--Select--</option>
                                                                    <option value="PAN">PAN Based</option>
                                                                    <option value="TAN">TAN Based</option>
                                                                     <option value="GST">GST Based</option>
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
                                                </div>
                                                <div id="PANBased" style="display:none">
                                                    <div class="row" style="margin-top: 3px">
                                                        <div class="col-lg-8 col-md-8 col-sm-8 col-lg-push-4">
                                                            <div class="form-group">
                                                                <span id="txtPANError1" style="margin-top: 0px; display: none; font-size: 15px; color: red; font-family: cursive">Enter PAN No</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                                            <div class="form-group">
                                                                <label class="control-label col-lg-2 col-md-2 col-sm-2">Applicant Name
                                                                    <label style="color: red;">*</label></label>
                                                                <div class="col-lg-1 col-md-1 col-sm-1">
                                                                    <label id="lblprefix">Mr/Mrs.</label>
                                                                </div>
                                                                <div class="col-lg-3 col-md-3 col-sm-3">
                                                                    <input type="text" class="form-control" name="req" id="txtAppName" placeholder="Enter First Name" style="text-transform: uppercase" onkeydown="upperCaseF(this)" onkeypress="return nospaces(event)" />
                                                                </div>
                                                                <div class="col-lg-3 col-md-3 col-sm-3">
                                                                    <input type="text" class="form-control" name="req" id="txtAppMiddleName" placeholder="Enter Middle Name" style="text-transform: uppercase" onkeydown="upperCaseF(this)" onkeypress="return nospaces(event)" />
                                                                </div>
                                                                <div class="col-lg-3 col-md-3 col-sm-3">
                                                                    <input type="text" class="form-control" name="req" id="txtAppLastName" placeholder="Enter Last Name" style="text-transform: uppercase" onkeydown="upperCaseF(this)" onkeypress="return nospaces(event)" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                                            <div class="form-group">
                                                                <label class="control-label col-lg-2">Father Name <label style="color: red;">*</label></label>
                                                                <div class="col-lg-1 col-md-1 col-sm-1">
                                                                    <label id="lblFprefix">Mr.</label>
                                                                </div>
                                                                <div class="col-lg-3 col-md-3 col-sm-3">
                                                                    <input type="text" class="form-control" name="req" id="txtAppFatherName" placeholder="Enter First Name" style="text-transform: uppercase" onkeydown="upperCaseF(this)" onkeypress="return nospaces(event)" />
                                                                </div>
                                                                <div class="col-lg-3 col-md-3 col-sm-3">
                                                                    <input type="text" class="form-control" name="req" id="txtAppFatherMiddleName" placeholder="Enter Middle Name" style="text-transform: uppercase" onkeydown="upperCaseF(this)" onkeypress="return nospaces(event)" />
                                                                </div>
                                                                <div class="col-lg-3 col-md-3 col-sm-3">
                                                                    <input type="text" class="form-control" name="req" id="txtAppFatherLastName" placeholder="Enter Last Name" style="text-transform: uppercase" onkeydown="upperCaseF(this)" onkeypress="return nospaces(event)" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div class="row" style="margin-top: 10px">
                                                        <div class="col-lg-6 col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label class="control-label col-lg-4 col-md-4 col-sm-4">
                                                                    Applicant Address<label style="color: red;">*</label></label>
                                                                <div class="col-lg-8 col-md-8 col-sm-8">
                                                                    <textarea placeholder="Enter Address...." rows="4" class="validate[required] form-control" name="req" id="txtAddress"></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label class="control-label col-lg-4 col-md-4 col-sm-4">Pin code<label style="color: red;">*</label></label>
                                                                <div class="col-lg-8 col-md-8 col-sm-8">
                                                                    <input type="text" class="validate[required] form-control" maxlength="6" name="req" id="txtpincode" placeholder="Pin Code" style="text-transform: uppercase" onkeypress="return isNumber(event)" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row" style="margin-top: 10px">
                                                        <div class="col-lg-6 col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label class="control-label col-lg-4 col-md-4 col-sm-4">
                                                                    Birth Date 
                                                                <label style="color: red;">*</label></label>
                                                                <div class="col-lg-8 col-md-8 col-sm-8">
                                                                    <input type="text" id="txtDOB" maxlength="10" placeholder="dd-MM-yyyy" name="date" class="validate[required,custom[date]] form-control col-lg-6" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label class="control-label col-lg-4 col-md-4 col-sm-4">
                                                                    Mobile Number 
                                                                <label style="color: red;">*</label></label>
                                                                <div class="col-lg-8">
                                                                    <input type="text" class="form-control" name="req" maxlength="10" placeholder="Enter Mobile Number" id="txtAppmobile" onblur="validateMobileNOAndEmail('txtAppmobile')" onkeypress="return isNumber(event)" />
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
                                                                <label style="color: red;">*</label></label>
                                                                <div class="col-lg-8 col-md-8 col-sm-8">
                                                                    <input type="text" placeholder="Enter Email Address" class="form-control" name="req" id="txtemail" onblur="validateMobileNOAndEmail('txtemail')" onkeypress="return nospaces(event)" />
                                                                    <span id="txtemailError" style="margin-top: 6px; display: none; font-size: 15px; color: red; font-family: cursive">Please Enter The Valid Mail Address e.g "a@gmail.com"</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label class="control-label col-lg-4 col-md-4 col-sm-4">
                                                                    Salaried/Self Employed 
                                                                <label style="color: red;">*</label></label>
                                                                <div class="col-lg-8 col-md-8 col-sm-8">
                                                                    <select name="ddaugender" id="ddlsalary" class="validate[required] form-control">
                                                                        <option value="0">--Select--</option>
                                                                        <option value="1">Salary</option>
                                                                        <option value="2">Self-Employed</option>
                                                                        <option value="3">Both</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row" style="margin-top: 10px">
                                                        <div class="col-lg-6 col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label class="control-label col-lg-4 col-md-4 col-sm-4">
                                                                    State 
                                                                <label style="color: red;">*</label></label>
                                                                <div class="col-lg-8 col-md-8 col-sm-8">
                                                                    <select name="ddaugender" id="ddlstate" class="StateName validate[required] form-control">
                                                                        <%--<option value="0">--Select--</option>
                                                                    <option value="1">Maharashtra</option>--%>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label class="control-label col-lg-4 col-md-4 col-sm-4">
                                                                    Citizen 
                                                                <label style="color: red;">*</label></label>
                                                                <div class="col-lg-8 col-md-8 col-sm-8">
                                                                    <select name="ddaugender" id="ddlCitizen" class="validate[required] form-control">
                                                                        <option value="0">--Select--</option>
                                                                        <option value="1">INDIAN</option>

                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row" style="margin-top: 10px">
                                                        <div class="col-lg-6 col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label class="control-label col-lg-4 col-md-4 col-sm-4">
                                                                    Aadhar Number 
                                                                <label style="color: red;">*</label></label>
                                                                <div class="col-lg-8 col-md-8 col-sm-8">
                                                                    <input type="text" placeholder="Enter Aadhar Number" maxlength="12" class="form-control" name="req" id="txtAadharNo" onblur="validate_PAN_TAN_GST_Number('txtAadharNo')" onkeypress="return isNumber(event)" />
                                                                    <span id="txtAadharNoError" style="display: none; font-size: 15px; color: red">Invalid Adhar No eg "123456789012"</span>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-md- col-sm-6">
                                                            <div class="form-group">
                                                                <label class="control-label col-lg-4 col-md-4 col-sm-4">ITD Portal Pass</label>
                                                                <div class="col-lg-8 col-md-8 col-sm-8">
                                                                    <input type="text" placeholder="ENTER ITD PORTAL PASSWORD" class="form-control" name="req" id="txtItdPassword" onkeypress="return nospaces(event)" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row" id="divAccount">
                                                        <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                                            <table style="width: 100%;">
                                                                <tbody id="tblAccount">
                                                                </tbody>

                                                            </table>
                                                        </div>
                                                    </div>

                                                </div>
                                                
                                                <div id="TANBased" style="display:none">
                                                    
                                                    <div class="row" style="margin-top: 3px">
                                                        <div class="col-lg-8 col-md-8 col-sm-8 col-lg-push-4">
                                                            <div class="form-group">
                                                                <span id="txtTANError1" style="margin-top: 0px; display: none; font-size: 15px; color: red; font-family: cursive">Enter TAN No</span>
                                                            </div>
                                                        </div>
                                                    </div>                                                  
                                                    <div class="row">
                                                        <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                                            <div class="form-group">
                                                                <label class="control-label col-lg-3 col-md-3 col-sm-3">Name Of Office/Deductor
                                                                    <label style="color: red;">*</label></label>                                                               
                                                                <div class="col-lg-9 col-md-9 col-sm-9">
                                                                    <input type="text" class="form-control" name="req" id="txtOfficeName" placeholder="Enter Office/Deductor Name" style="text-transform: uppercase" onkeydown="upperCaseF(this)"  />
                                                                </div>
                                                               
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                                            <div class="form-group">
                                                                <label class="control-label col-lg-3">Name Of Authorised Person <label style="color: red;">*</label></label>
                                                                <%--<div class="col-lg-1 col-md-1 col-sm-1" style="text-align:right;">
                                                                    <label id="lblAuthorisedprefix">Mr.</label>
                                                                </div>--%>
                                                                <div class="col-lg-9 col-md-9 col-sm-9">
                                                                    <input type="text" class="form-control" name="req" id="txtAuthorisedName" placeholder="Enter Authorised Person Name" style="text-transform: uppercase" onkeydown="upperCaseF(this)"  />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div class="row" style="margin-top: 10px">
                                                        <div class="col-lg-6 col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label class="control-label col-lg-4 col-md-4 col-sm-4">
                                                                    Office Address<label style="color: red;">*</label></label>
                                                                <div class="col-lg-8 col-md-8 col-sm-8">
                                                                    <textarea placeholder="Enter Address...." rows="4" class="validate[required] form-control" name="req" id="txtOfficeAddress"></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label class="control-label col-lg-4 col-md-4 col-sm-4">Pin code<label style="color: red;">*</label></label>
                                                                <div class="col-lg-8 col-md-8 col-sm-8">
                                                                    <input type="text" class="validate[required] form-control" maxlength="6" name="req" id="txtOfficepincode" placeholder="Pin Code" style="text-transform: uppercase" onkeypress="return isNumber(event)" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row" id="divContactpersone">
                                                        <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                                            <table style="width: 100%;">
                                                                <tbody id="tblContactpersone">
                                                                    
                                                                </tbody>

                                                            </table>
                                                        </div>
                                                    </div>                                                   
                                                    <div class="row" style="margin-top: 10px">
                                                        <div class="col-lg-6 col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label class="control-label col-lg-4 col-md-4 col-sm-4">
                                                                    Office Email 
                                                                <label style="color: red;">*</label></label>
                                                                <div class="col-lg-8 col-md-8 col-sm-8">
                                                                    <input type="text" placeholder="Enter Email Address" class="form-control" name="req" id="txtOfficeemail" onblur="validateMobileNOAndEmail('txtOfficeemail')" onkeypress="return nospaces(event)" />
                                                                    <span id="txtOfficeemailError" style="margin-top: 6px; display: none; font-size: 15px; color: red; font-family: cursive">Please Enter The Valid Mail Address e.g "a@gmail.com"</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label class="control-label col-lg-4 col-md-4 col-sm-4">
                                                                    State 
                                                                <label style="color: red;">*</label></label>
                                                                <div class="col-lg-8 col-md-8 col-sm-8">
                                                                    <select name="ddaugender" id="ddlTANstate" class="StateName validate[required] form-control">
                                                                        
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>                                                    
                                                    <div class="row" style="margin-top: 10px">
                                                        <div class="col-lg-6 col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label class="control-label col-lg-4 col-md-4 col-sm-4">
                                                                   User Id Traces
                                                                </label>
                                                                <div class="col-lg-8 col-md-8 col-sm-8">
                                                                    <input type="text" placeholder="Enter Traces User ID" maxlength="12" class="form-control" name="req" id="txtTracesUserId" onblur="validate_PAN_TAN_GST_Number('txtAadharNo')" onkeypress="return isNumber(event)" />
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-md- col-sm-6">
                                                            <div class="form-group">
                                                                <label class="control-label col-lg-4 col-md-4 col-sm-4">Traces Password</label>
                                                                <div class="col-lg-8 col-md-8 col-sm-8">
                                                                    <input type="text" placeholder="ENTER Traces PASSWORD" class="form-control" name="req" id="txtTracesPassword" onkeypress="return nospaces(event)" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div id="GSTBased"  style="display:none">
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
                                                           <div id="gstno">
                                                               <label class="control-label col-sm-3">GST No. <label style="color: red;">*</label></label>                                                            
                                                            <div class="col-lg-8 col-md-8 col-sm-8">
                                                                <input type="text" class="form-control" name="req" id="txtGST" maxlength="15" placeholder="Enter GST Number" onkeyup="BindStateOnGSTFirstTwoNO()" onblur="validate_PAN_TAN_GST_Number('txtGST')"  onkeydown="upperCaseF(this)" onkeypress="return nospaces(event)"/>
                                                          <span id="txtGSTError" style="margin-top: 6px; display: none; font-size: 15px; color: red; font-family: cursive">InValid GST No</span>
                                                                 </div> 
                                                           </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                     <div class="row" style="margin-top: 3px">
                                                        <div class="col-lg-8 col-md-8 col-sm-8 col-lg-push-4">
                                                            <div class="form-group">
                                                                <span id="txtGSTError1" style="margin-top: 0px; display: none; font-size: 15px; color: red; font-family: cursive">Enter GST No</span>
                                                            </div>
                                                        </div>
                                                    </div> 
                                                    <div id="GSTTaxPayer">
                                                        <div class="row">
                                                            <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                                                <div class="form-group">
                                                                    <label class="control-label col-lg-2 col-md-2 col-sm-2">
                                                                        Applicant Name
                                                                    <label style="color: red;">*</label></label>
                                                                    <div class="col-lg-1 col-md-1 col-sm-1">
                                                                        <label id="lblGSTPayerprefix">Mr/Mrs.</label>
                                                                    </div>
                                                                    <div class="col-lg-3 col-md-3 col-sm-3">
                                                                        <input type="text" class="form-control" name="req" id="txtGSTPayerAppName" placeholder="Enter First Name" style="text-transform: uppercase" onkeydown="upperCaseF(this)" onkeypress="return nospaces(event)" />
                                                                    </div>
                                                                    <div class="col-lg-3 col-md-3 col-sm-3">
                                                                        <input type="text" class="form-control" name="req" id="txtGSTPayerAppMiddleName" placeholder="Enter Middle Name" style="text-transform: uppercase" onkeydown="upperCaseF(this)" onkeypress="return nospaces(event)" />
                                                                    </div>
                                                                    <div class="col-lg-3 col-md-3 col-sm-3">
                                                                        <input type="text" class="form-control" name="req" id="txtGSTPayerAppLastName" placeholder="Enter Last Name" style="text-transform: uppercase" onkeydown="upperCaseF(this)" onkeypress="return nospaces(event)" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                                                <div class="form-group">
                                                                    <label class="control-label col-lg-2">Father Name <label style="color: red;">*</label></label>
                                                                    <div class="col-lg-1 col-md-1 col-sm-1">
                                                                        <label id="lblGSTPayerFprefix">Mr.</label>
                                                                    </div>
                                                                    <div class="col-lg-3 col-md-3 col-sm-3">
                                                                        <input type="text" class="form-control" name="req" id="txtGSTPayerAppFatherName" placeholder="Enter First Name" style="text-transform: uppercase" onkeydown="upperCaseF(this)" onkeypress="return nospaces(event)" />
                                                                    </div>
                                                                    <div class="col-lg-3 col-md-3 col-sm-3">
                                                                        <input type="text" class="form-control" name="req" id="txtGSTPayerAppFatherMiddleName" placeholder="Enter Middle Name" style="text-transform: uppercase" onkeydown="upperCaseF(this)" onkeypress="return nospaces(event)" />
                                                                    </div>
                                                                    <div class="col-lg-3 col-md-3 col-sm-3">
                                                                        <input type="text" class="form-control" name="req" id="txtGSTPayerAppFatherLastName" placeholder="Enter Last Name" style="text-transform: uppercase" onkeydown="upperCaseF(this)" onkeypress="return nospaces(event)" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div class="row" style="margin-top: 10px">
                                                            <div class="col-lg-6 col-md-6 col-sm-6">
                                                                <div class="form-group">
                                                                    <label class="control-label col-lg-4 col-md-4 col-sm-4">
                                                                        Applicant Address<label style="color: red;">*</label></label>
                                                                    <div class="col-lg-8 col-md-8 col-sm-8">
                                                                        <textarea placeholder="Enter Address...." rows="4" class="validate[required] form-control" name="req" id="txtGSTPayerAddress"></textarea>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-6">
                                                                <div class="form-group">
                                                                    <label class="control-label col-lg-4 col-md-4 col-sm-4">Pin code<label style="color: red;">*</label></label>
                                                                    <div class="col-lg-8 col-md-8 col-sm-8">
                                                                        <input type="text" class="validate[required] form-control" maxlength="6" name="req" id="txtGSTPayerpincode" placeholder="Pin Code" style="text-transform: uppercase" onkeypress="return isNumber(event)" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row" style="margin-top: 10px">
                                                            <div class="col-lg-6 col-md-6 col-sm-6">
                                                                <div class="form-group">
                                                                    <label class="control-label col-lg-4 col-md-4 col-sm-4">
                                                                        Birth Date 
                                                                <label style="color: red;">*</label></label>
                                                                    <div class="col-lg-8 col-md-8 col-sm-8">
                                                                        <input type="text" id="txtGSTPayerDOB" maxlength="10" placeholder="dd-MM-yyyy" name="date" class="validate[required,custom[date]] form-control col-lg-6" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-6">
                                                                <div class="form-group">
                                                                    <label class="control-label col-lg-4 col-md-4 col-sm-4">
                                                                        Mobile Number 
                                                                <label style="color: red;">*</label></label>
                                                                    <div class="col-lg-8">
                                                                        <input type="text" class="form-control" name="req" maxlength="10" placeholder="Enter Mobile Number" id="txtGSTPayerAppmobile" onblur="validateMobileNOAndEmail('txtGSTPayerAppmobile')" onkeypress="return isNumber(event)" />
                                                                        <span id="txtGSTPayerAppmobileError" style="margin-top: 6px; display: none; font-size: 15px; color: red; font-family: cursive">Please Enter Valid Mobile No e.g "1234567890"</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row" style="margin-top: 10px">
                                                            <div class="col-lg-6 col-md-6 col-sm-6">
                                                                <div class="form-group">
                                                                    <label class="control-label col-lg-4 col-md-4 col-sm-4">
                                                                        Applicant Email 
                                                                <label style="color: red;">*</label></label>
                                                                    <div class="col-lg-8 col-md-8 col-sm-8">
                                                                        <input type="text" placeholder="Enter Email Address" class="form-control" name="req" id="txtGSTPayeremail" onblur="validateMobileNOAndEmail('txtGSTPayeremail')" onkeypress="return nospaces(event)" />
                                                                        <span id="txtGSTPayeremailError" style="margin-top: 6px; display: none; font-size: 15px; color: red; font-family: cursive">Please Enter The Valid Mail Address e.g "a@gmail.com"</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-6">
                                                                <div class="form-group">
                                                                    <label class="control-label col-lg-4 col-md-4 col-sm-4">
                                                                        State 
                                                                <label style="color: red;">*</label></label>
                                                                    <div class="col-lg-8 col-md-8 col-sm-8">
                                                                        <select name="ddaugender" id="ddlGSTPayerstate" class="StateName validate[required] form-control">
                                                                           
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                       
                                                    </div>

                                                    <div id="GSTTaxDeductor">
                                                        <div class="row">
                                                        <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                                            <div class="form-group">
                                                                <label class="control-label col-lg-3 col-md-3 col-sm-3">Name Of Office/Deductor
                                                                    <label style="color: red;">*</label></label>                                                               
                                                                <div class="col-lg-9 col-md-9 col-sm-9">
                                                                    <input type="text" class="form-control" name="req" id="txtGSTDeductorOfficeName" placeholder="Enter Office/Deductor Name" style="text-transform: uppercase" onkeydown="upperCaseF(this)"  />
                                                                </div>
                                                               
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                                            <div class="form-group">
                                                                <label class="control-label col-lg-3">Name Of Authorised Person <label style="color: red;">*</label></label>
                                                                <%--<div class="col-lg-1 col-md-1 col-sm-1" style="text-align:right;">
                                                                    <label id="lblGSTDeductorAuthorisedprefix">Mr.</label>
                                                                </div>--%>
                                                                <div class="col-lg-9 col-md-9 col-sm-9">
                                                                    <input type="text" class="form-control" name="req" id="txtGSTDeductorAuthorisedName" placeholder="Enter Authorised Person Name" style="text-transform: uppercase" onkeydown="upperCaseF(this)"  />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div class="row" style="margin-top: 10px">
                                                        <div class="col-lg-6 col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label class="control-label col-lg-4 col-md-4 col-sm-4">
                                                                    Office Address<label style="color: red;">*</label></label>
                                                                <div class="col-lg-8 col-md-8 col-sm-8">
                                                                    <textarea placeholder="Enter Address...." rows="4" class="validate[required] form-control" name="req" id="txtGSTDeductorOfficeAddress"></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label class="control-label col-lg-4 col-md-4 col-sm-4">Pin code<label style="color: red;">*</label></label>
                                                                <div class="col-lg-8 col-md-8 col-sm-8">
                                                                    <input type="text" class="validate[required] form-control" maxlength="6" name="req" id="txtGSTDeductorOfficepincode" placeholder="Pin Code" style="text-transform: uppercase" onkeypress="return isNumber(event)" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row" id="divGSTDeductorContactpersone">
                                                        <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                                            <table style="width: 100%;">
                                                                <tbody id="tblGSTDeductorContactpersone">
                                                                    
                                                                </tbody>

                                                            </table>
                                                        </div>
                                                    </div>                                                   
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
                                                    </div>

                                                    <div id="gstnUserid" style="display:none">
                                                        <div class="row" style="margin-top: 10px">
                                                            <div class="col-lg-6 col-md-6 col-sm-6">
                                                                <div class="form-group">
                                                                    <label class="control-label col-lg-4 col-md-4 col-sm-4">
                                                                        GSTN User Id 
                                                                <label style="color: red;">*</label></label>
                                                                    <div class="col-lg-8 col-md-8 col-sm-8">
                                                                        <input type="text" placeholder="Enter GSTN User ID" maxlength="12" class="form-control" name="req" id="txtGSTNUserId" onkeypress="return nospaces(event)" />


                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md- col-sm-6">
                                                                <div class="form-group">
                                                                    <label class="control-label col-lg-4 col-md-4 col-sm-4">GSTN Password</label>
                                                                    <div class="col-lg-8 col-md-8 col-sm-8">
                                                                        <input type="text" placeholder="ENTER GSTN PASSWORD" class="form-control" name="req" id="txtGSTNPassword" onkeypress="return nospaces(event)" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            <div id="Document" style="display:none">
                                                <div class="row" id="divAccount1">
                                                    <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                                        <table style="width: 100%;">
                                                            <tbody id="tblAttachment">
                                                            </tbody>

                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                                  
                                                <div class="row">
                                                    <div style="margin-top: 30px; text-align: center;">
                                                        <input type="button" class="btn btn-success" id="btnSave" value="Save" />
                                                        <%--<input type="button" style="display: none;" class="btn btn-info" id="btnUpdate" value="Update" />--%>
                                                        <input type="button" class="btn btn-danger" id="btnCancel" value="Cancel" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                    
                                    <%--<div id="MessageForm" style="text-align: center;display:none; ">
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <span id="" style="margin-top: 6px; font-size: 25px; color: darkgreen; font-family: cursive">Submitted Successfully...!</span><br />
                                        <span id="" style="margin-top: 6px; font-size: 15px; color: red; font-family: cursive">Go To  <a id="GoToLogin" href="ClientRegistration.aspx">New Client Registration</a> </span>

                                    </div>  --%>                                 
                                </div>
                                
                               
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </div>
        <div id="MessageForm" style="text-align: center; display: none;">
            <br />
            <br />
            <br />
            <br />
            <span id="" style="margin-top: 6px; font-size: 25px; color: darkgreen; font-family: cursive">Submitted Successfully...!</span><br />
            <span id="" style="margin-top: 6px; font-size: 15px; color: red; font-family: cursive">Go To  <a id="GoToLogin" href="ClientRegistration.aspx">New Client Registration</a> </span>
        </div>  
        </div>

        
    <%-- -------------<!-- #dialog-message -->----------------------%>

    <!-- Start IT View Modal  Box-->
    <div class="modal fade" id="myITModal" role="dialog" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <div class="row">
                        <div class="col-sm-12" style="text-align: center;">
                            <h4 class="modal-title" style="color: steelblue;">Income Tax Client Details</h4>
                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Client ID<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtITClientID" readonly="" type="text" class="form-control" placeholder="Enter Client ID" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label" style="color: #337ab7">PAN No.<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtITPANNumber" readonly="" type="text" class="form-control" placeholder="Enter PAN Number" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label" style="color: #337ab7">Applicant Name<label style="color: red;">*</label></label>
                                    <div class="col-sm-6">
                                        <input id="txtITApplicantName" type="text" class="form-control" placeholder="Enter Applicant Name" />
                                    </div>
                                    <label class="col-sm-2 col-sm-pull-1 control-label" style="color: #337ab7">Reg Date</label>
                                    <label id="lblITRegDate" class="col-sm-2 col-sm-pull-1 control-label"></label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label" style="color: #337ab7">Father Name</label>
                                    <div class="col-sm-6">
                                        <input id="txtITApplicantFatherName" type="text" class="form-control" placeholder="Enter Applicant Father Name" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label" style="color: #337ab7">App Address<label style="color: red;">*</label></label>
                                    <div class="col-sm-6">
                                        <textarea id="txtITApplicantAddress" class="form-control"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Pin Code<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtITPinCode" type="text" class="form-control" placeholder="Enter Pin Code" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label" style="color: #337ab7">Birth Date<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtITBirthDate" type="text" class="form-control " />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Applicant Mobile<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtITApplicantMobileNo" type="text" class="form-control" placeholder="Enter Applicant Mobile" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label" style="color: #337ab7">Email<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtITApplicantEmailID" type="text" class="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">State<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <select name="ddlITState" id="ddlITState" class="StateName validate[required] form-control">
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label" style="color: #337ab7">Citizenship<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtITCitizenship" type="text" class="form-control" placeholder="Enter Citizenship" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Employed Type<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <select name="ddlITEmployedType" id="ddlITEmployedType" class="validate[required] form-control">
                                            <option value="0">--Select--</option>
                                            <option value="1">Salary</option>
                                            <option value="2">Self-Employed</option>
                                            <option value="3">Both</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label" style="color: #337ab7">Aadhar No.<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtITAadharNumber" type="text" class="form-control" placeholder="Enter Aadhar Number" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">ITD Portal Pass</label>
                                    <div class="col-sm-8">
                                        <input id="txtITDPortalPassword" type="text" class="form-control" placeholder="Enter ITD Portal Password" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" id="divAccount2">
                            <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                <table style="width: 100%;">
                                    <tbody id="tblAccount2">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-2 col-md-2 col-sm-2 col-sm-push-5">
                                <button id="btnUpdate" type="button" style="font-family: Calibri; font-size: 16px;" class="btn btn-success btn-sm">Update</button>
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-sm-push-0" style="width:100%;">
                                <div class="row">
                                    <div class="col-sm-12" style="text-align: center;">
                                        <h4 class="modal-title" style="color: steelblue;">Attachment File(s)</h4>
                                    </div>
                                </div>
                                <div class="table-responsive ">
                                    <table class="table table-bordered " id="tblITDoc">                                       
                                        <tbody id="tblITDocuments">
                                           
                                        </tbody>
                                        <tfoot id="tblITFooter">
                                            <%--<tr>
                                                <td colspan="">
                            <a id="btnAddDocument" href="#"><i class="fa fa-plus "></i></a>
                                                </td>
                                            </tr>--%>
                                            
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>    
                    </div>
                    <div class="modal-footer">
                        <%--<button id="btnUpdate" type="button" style="font-family: Calibri; font-size: 16px;" class="btn btn-success btn-sm">Update</button>--%>
                        <button type="button" style="font-family: Calibri; font-size: 16px;" class="btn btn-default btn-sm" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End IT View Modal  Box-->

    <!-- Start TDS View Modal  Box-->
    <div class="modal fade" id="myTDSModal" role="dialog" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <div class="row">
                        <div class="col-sm-12" style="text-align: center;">
                            <h4 class="modal-title" style="color: steelblue;">TDS Client Details</h4>
                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
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
                                    <label class="col-sm-3 control-label" style="color: #337ab7">TAN No<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtTDSTANNumber" readonly="" type="text" class="form-control" placeholder="Enter TAN Number" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label" style="color: #337ab7">Office Name<label style="color: red;">*</label></label>
                                    <div class="col-sm-6">
                                        <input id="txtTDSOfficeName" type="text" class="form-control" placeholder="Enter Office Name" />
                                    </div>
                                    <label class="col-sm-2 col-sm-pull-1 control-label" style="color: #337ab7">Reg Date</label>
                                    <label id="lblTDSRegDate" class="col-sm-2 col-sm-pull-1 control-label"></label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label" style="color: #337ab7">Authorised Person<label style="color: red;">*</label></label>
                                    <div class="col-sm-6">
                                        <input id="txtTDSAuthorisedPerson" type="text" class="form-control" placeholder="Enter Authorised Person Name" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label" style="color: #337ab7">Office Address<label style="color: red;">*</label></label>
                                    <div class="col-sm-6">
                                        <textarea id="txtTDSOfficeAddress" class="form-control"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Pin Code<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtTDSPinCode" type="text" class="form-control" placeholder="Enter Pin Code" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label" style="color: #337ab7">State<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <select name="ddlState" id="ddlTDSState" class="StateName validate[required] form-control">
                                        </select>
                                    </div>
                                </div>
                            </div>  
                        </div>
                        <div class="row">
                             <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Office Email<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtTDSOfficeEmailID" type="text" class="form-control" placeholder="Enter Office Email" />
                                    </div>
                                </div>
                            </div>                
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Traces UserId</label>
                                    <div class="col-sm-8">
                                         <input id="txtTDSTracesUserId" type="text" class="form-control" placeholder="Enter Traces UserId" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label" style="color: #337ab7">Traces Password</label>
                                    <div class="col-sm-8">
                                        <input id="txtTDSTracesPassword" type="text" class="form-control" placeholder="Enter Traces Password" />
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                        <div class="row" id="divPerson">
                            <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                <table style="width: 100%;">
                                    <tbody id="tblPerson">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-2 col-md-2 col-sm-2 col-sm-push-5">
                                <button id="btnTDSUpdate" type="button" style="font-family: Calibri; font-size: 16px;" class="btn btn-success btn-sm">Update</button>
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-sm-push-0" style="width:100%;">
                                <div class="row">
                                    <div class="col-sm-12" style="text-align: center;">
                                        <h4 class="modal-title" style="color: steelblue;">Attachment File(s)</h4>
                                    </div>
                                </div>
                                <div class="table-responsive ">
                                    <table class="table table-bordered " id="tblTDSDoc">                                       
                                        <tbody id="tblTDSDocuments">
                                           
                                        </tbody>
                                        <tfoot id="tblTDSFooter">

                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>    
                    </div>
                    <div class="modal-footer">
                        <%--<button id="btnTDSUpdate" type="button" style="font-family: Calibri; font-size: 16px;" class="btn btn-success btn-sm">Update</button>--%>
                        <button type="button" style="font-family: Calibri; font-size: 16px;" class="btn btn-default btn-sm" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End TDS View Modal  Box-->

     <!-- Start GST Payer View Modal  Box-->
    <div class="modal fade" id="myGSTPModal" role="dialog" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <div class="row">
                        <div class="col-sm-12" style="text-align: center;">
                            <h4 class="modal-title" style="color: steelblue;">GST Tax Payer Client Details</h4>
                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Client ID<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtGSTPClientID" readonly="" type="text" class="form-control" placeholder="Enter Client ID" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label" style="color: #337ab7">GST No<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtGSTPGSTNumber" readonly="" type="text" class="form-control" placeholder="Enter TAN Number" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label" style="color: #337ab7">Applicant Name<label style="color: red;">*</label></label>
                                    <div class="col-sm-6">
                                        <input id="txtGSTPApplicanteName" type="text" class="form-control" placeholder="Enter Applicant Name" />
                                    </div>
                                    <label class="col-sm-2 col-sm-pull-1 control-label" style="color: #337ab7">Reg Date</label>
                                    <label id="lblGSTPRegDate" class="col-sm-2 col-sm-pull-1 control-label"></label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label" style="color: #337ab7">Father Name<label style="color: red;">*</label></label>
                                    <div class="col-sm-6">
                                        <input id="txtGSTPFatherName" type="text" class="form-control" placeholder="Enter Father Name" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label" style="color: #337ab7">Applicant Address<label style="color: red;">*</label></label>
                                    <div class="col-sm-6">
                                        <textarea id="txtGSTPApplicantAddress" class="form-control"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Pin Code<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtGSTPPinCode" type="text" class="form-control" placeholder="Enter Pin Code" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label" style="color: #337ab7">State<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <select name="ddlState" id="ddlGSTPState" class="StateName validate[required] form-control">
                                        </select>
                                    </div>
                                </div>
                            </div>  
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Birth Date<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtGSTPBirthDate" type="text" class="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label" style="color: #337ab7">Mobile No<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                       <input id="txtGSTPMobileNo" type="text" class="form-control" placeholder="Enter Mobile Number" />
                                    </div>
                                </div>
                            </div>  
                        </div>
                        <div class="row">
                             <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Applicant Email<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtGSTPApplicantEmail" type="text" class="form-control" placeholder="Enter Applicant Email" />
                                    </div>
                                </div>
                            </div>                
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">GSTN UserId</label>
                                    <div class="col-sm-8">
                                         <input id="txtGSTNPUserId" type="text" class="form-control" placeholder="Enter GSTN UserId" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label" style="color: #337ab7">GSTN Password</label>
                                    <div class="col-sm-8">
                                        <input id="txtGSTNPPassword" type="text" class="form-control" placeholder="Enter GSTN Password" />
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
                                    </div>
                                </div>
                                <div class="table-responsive ">
                                    <table class="table table-bordered " id="tblGSTPDoc">                                       
                                        <tbody id="tblGSTPDocuments">
                                           
                                        </tbody>
                                        <tfoot id="tblGSTPFooter">

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
    <div class="modal fade" id="myGSTDModal" role="dialog" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <div class="row">
                        <div class="col-sm-12" style="text-align: center;">
                            <h4 class="modal-title" style="color: steelblue;">GST Tax Deductor Client Details</h4>
                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Client ID<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtGSTDClientID" readonly="" type="text" class="form-control" placeholder="Enter Client ID" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label" style="color: #337ab7">GST No<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtGSTDGSTNumber" readonly="" type="text" class="form-control" placeholder="Enter TAN Number" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label" style="color: #337ab7">Office/Deductor Name<label style="color: red;">*</label></label>
                                    <div class="col-sm-6">
                                        <input id="txtGSTDOfficeName" type="text" class="form-control" placeholder="Enter Office/Deductor Name" />
                                    </div>
                                    <label class="col-sm-2 col-sm-pull-1 control-label" style="color: #337ab7">Reg Date</label>
                                    <label id="lblGSTDRegDate" class="col-sm-2 col-sm-pull-1 control-label"></label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label" style="color: #337ab7">Authorised Person<label style="color: red;">*</label></label>
                                    <div class="col-sm-6">
                                        <input id="txtGSTDAuthorisedPersonName" type="text" class="form-control" placeholder="Enter Authorised Person Name" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label" style="color: #337ab7">Office Address<label style="color: red;">*</label></label>
                                    <div class="col-sm-6">
                                        <textarea id="txtGSTDOfficeAddress" class="form-control"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Pin Code<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtGSTDPinCode" type="text" class="form-control" placeholder="Enter Pin Code" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label" style="color: #337ab7">State<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <select name="ddlState" id="ddlGSTDState" class="StateName validate[required] form-control">
                                        </select>
                                    </div>
                                </div>
                            </div>  
                        </div>
                        <div class="row">
                             <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">Office Email<label style="color: red;">*</label></label>
                                    <div class="col-sm-8">
                                        <input id="txtGSTDOfficeEmail" type="text" class="form-control" placeholder="Enter Office Email" />
                                    </div>
                                </div>
                            </div>                
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label" style="color: #337ab7">GSTN UserId</label>
                                    <div class="col-sm-8">
                                         <input id="txtGSTNDUserId" type="text" class="form-control" placeholder="Enter GSTN UserId" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label" style="color: #337ab7">GSTN Password</label>
                                    <div class="col-sm-8">
                                        <input id="txtGSTNDPassword" type="text" class="form-control" placeholder="Enter GSTN Password" />
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
                                    </div>
                                </div>
                                <div class="table-responsive ">
                                    <table class="table table-bordered " id="tblGSTDDoc">                                       
                                        <tbody id="tblGSTDDocuments">
                                           
                                        </tbody>
                                        <tfoot id="tblGSTDFooter">

                                        </tfoot>
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
                            <label id="lblStaffId" style="display:none;"></label>
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
                    <div class="row" id="divAccount3">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <table style="width: 100%;">
                                <tbody id="tblAttachment3">
                                  
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
                            <h4 class="modal-title" style="color: steelblue;">Client Document</h4>
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
                                    <input type="file" class="form-control" name="file[]" id="ITFileChange" onchange="UpdateAttachments(this, 'ITFileChange')" />
                                    <label style="color: lightgray; font-weight: normal;">only pdf/jpg/jpeg/gif/bmp format</label>
                                    <input type="hidden" id="ITFileChangePhotoSource" value="" class="FileChangeSource" />
                                    <input type="hidden" id="ITFileChangePhotoFileName" value="" class="FileChangeFileName" />
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
                                <label class="control-label col-lg-12 col-md-12 col-sm-12" style="color: #337ab7;width:100%;">Enter Document Name</label>
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
                                    <input type="file" class="form-control" name="file[]" id="TDSFileChange" onchange="UpdateAttachments(this, 'TDSFileChange')" />
                                    <label style="color: lightgray; font-weight: normal;">only pdf/jpg/jpeg/gif/bmp format</label>
                                    <input type="hidden" id="TDSFileChangePhotoSource" value="" class="TDSFileChangeSource" />
                                    <input type="hidden" id="TDSFileChangePhotoFileName" value="" class="TDSFileChangeFileName" />
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
                                    <input type="text" placeholder="Enter Document Name" class="DocumentName form-control" name="req" id="GSTPtxtDocumentName" />
                                </div>
                            </div>
                        </div>
                    </div>
                     <div class="row" style="margin-top: 5px">
                        <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                            <div class="form-group">
                               <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                    <input type="file" class="form-control" name="file[]" id="GSTPFileChange" onchange="UpdateAttachments(this, 'GSTPFileChange')" />
                                    <label style="color: lightgray; font-weight: normal;">only pdf/jpg/jpeg/gif/bmp format</label>
                                    <input type="hidden" id="GSTPFileChangePhotoSource" value="" class="GSTPFileChangeSource" />
                                    <input type="hidden" id="GSTPFileChangePhotoFileName" value="" class="GSTPFileChangeFileName" />
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
                                    <input type="file" class="form-control" name="file[]" id="GSTDFileChange" onchange="UpdateAttachments(this, 'GSTDFileChange')" />
                                    <label style="color: lightgray; font-weight: normal;">only pdf/jpg/jpeg/gif/bmp format</label>
                                    <input type="hidden" id="GSTDFileChangePhotoSource" value="" class="GSTPFileChangeSource" />
                                    <input type="hidden" id="GSTDFileChangePhotoFileName" value="" class="GSTPFileChangeFileName" />
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
        $('#txtDOB').datepicker({
            dateFormat: 'dd-mm-yy'
        });
        $('#txtGSTPayerDOB').datepicker({
            dateFormat: 'dd-mm-yy'
        });
    </script>
</asp:Content>

