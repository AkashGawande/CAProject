<%@ Page Title="" Language="C#" MasterPageFile="~/Franchisee/FranchiseeMaster.master" AutoEventWireup="true" CodeFile="EmployeeList.aspx.cs" Inherits="Franchisee_GSTFiling" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <link rel="stylesheet" href="../../assets/css/select2.min.css" />
    <script src="../assets/js/jquery-2.1.4.min.js"></script>
    <script src="Franchisee_JS/EmployeeList.js"></script>
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
    <div id="loaderFrEmp" class="loader" style="display:none;"></div>
    <div class="breadcrumbs ace-save-state" id="breadcrumbs">
        <ul class="breadcrumb">
            <li>
                <i class="ace-icon fa fa-home home-icon"></i>
                <a href="Dashboard.aspx">Home</a>
            </li>
            <li class="active">Employee List</li>
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
                                    <a data-toggle="tab" href="#ADD">Employee Details</a>
                                </li>
                                <%-- <li >
                                    <a data-toggle="tab" href="#EMPList">Employee Details</a>
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
                                <div id="EMPList" class="tab-pane in active">
                                    <div class="panel panel-default">
                                        <div class="page-header">
                                            <h1>Create New Employee</h1>
                                        </div>
                                        <div class="panel-body">
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        <label class="control-label col-lg-4 classlabel">Emp Id</label>
                                                        <div class="col-lg-8">
                                                            <input type="text" id="txtEmpId" class="form-control" title="" maxlength="10" placeholder="Enter Emp Id " name="req" onkeydown="upperCaseF(this)" onkeypress="return nospaces(event)" disabled="disabled" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        <label class="control-label col-lg-4 classlabel">Joining Date</label>
                                                        <div class=" col-lg-8">
                                                            <input class="validate[required,custom[date]] form-control" maxlength="10" type="text" name="date3" id="txtTodyDate" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row" style="margin-top: 10px">
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        <label class="control-label col-lg-4 classlabel">Emp.Name</label>
                                                        <div class="col-lg-8">
                                                            <input type="text" class="form-control" placeholder="Enter Employee Name" name="req" id="txtempname" <%--onkeydown="upperCaseF(this)" --%>/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-lg-4 classlabel">Mobile No</label>
                                                            <div class="col-lg-8">
                                                                <input type="text" class="validate[required] form-control" maxlength="10" name="req" id="txtMobileNo" placeholder="Enter Mobile No"  onblur="validate_PAN_Mobile_Email('txtMobileNo')" onkeypress="return isNumber(event)" />
                                                           <span id="txtMobileNoError" style="margin-top: 6px; display: none; font-size: 15px; color: red; font-family: cursive">Please Enter Valid Mobile No</span>
                                                                </div>
                                                        </div>
                                                    </div>
                                            </div>
                                            <div class="row" style="margin-top: 10px">                                                    
                                                     <div class="col-lg-6" >
                                                        <div class="form-group">
                                                            <label class="control-label col-lg-4 classlabel">Email Id</label>
                                                            <div class="col-lg-8">
                                                                <input type="text" placeholder="Enter Email Address" class="form-control" name="req" id="txtemail" onblur="validate_PAN_Mobile_Email('txtemail')" onkeypress="return nospaces(event)" />
                                                            <span id="txtemailError" style="margin-top: 6px; display: none; font-size: 15px; color: red; font-family: cursive">Please Enter Valid Email Id</span>
                                                               </div>
                                                        </div>
                                                    </div>
                                                    
                                                </div>  
                                            <div class="row">
                                                <div style="margin-top: 30px; text-align: center;">
                                                    <input type="button" class="btn btn-success" id="btnSave" value="Submit" />
                                                    <input type="button" class="btn btn-danger" id="btnCancel" value="Cancel" />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="page-header">
                                            <h1>Employee List</h1>
                                        </div>
                                        <div class="panel-body">
                                            <div class="table-responsive" id="tblClient">
                                                <table class="table table-striped table-bordered table-hover" id="dataTables-example" style="width: 100%">
                                                    <thead>
                                                        <tr>
                                                            <th style="text-align: center" class="TextBoxColor">Sr. No</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Emp ID</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Member Name</th>
                                                            <th style="text-align: center" class="TextBoxColor">Joining Date</th>
                                                            <th style="text-align: center" class="TextBoxColor">User ID</th>
                                                            <th style="text-align: center" class="TextBoxColor">Password</th>
                                                            <th style="text-align: center" class="TextBoxColor">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="tblEmployeeList">
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                                <%--<div id="ADD" class="tab-pane in active">
                                    <div class="panel panel-default">
                                        <div class="widget-body">
                                            <div class="widget-main">
                                                <div id="fuelux-wizard-container"></div>
                                                <div class="row">
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-lg-4 classlabel">Emp Id</label>
                                                            <div class="col-lg-8">
                                                                <input type="text" id="txtEmpId" class="form-control" title="" maxlength="10" placeholder="Enter Emp Id " name="req"  onkeydown="upperCaseF(this)" onkeypress="return nospaces(event)" disabled="disabled"/>
                                                           </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row" style="margin-top: 10px">
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-lg-4 classlabel">Emp.Name</label>
                                                            <div class="col-lg-8">
                                                                <input type="text" class="form-control" placeholder="Enter Employee Name" name="req" id="txtempname"  onkeydown="upperCaseF(this)" />
                                                             </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-lg-4 classlabel">Joining Date</label>
                                                            <div class=" col-lg-8">
                                                                <input  class="validate[required,custom[date]] form-control" maxlength="10" type="text"  name="date3" id="txtTodyDate" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                               
                                               
                                            <div  class="row">
                                                <div style="margin-top:30px;text-align:center;">
                                                    <input type="button"  class="btn btn-success" id="btnSave" value="Submit"  />
                                                    <input type="button"  class="btn btn-danger" id="btnCancel" value="Cancel"  />
                                                </div>
                                            </div>
                                        </div>
                                    </div>--%>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
     <%-- -------------<!-- #dialog-message -->----------------------%>

    <!-- Start View Modal  Box-->
    <div class="modal fade" id="myModal" role="dialog" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <div class="row">
                        <div class="col-sm-12" style="text-align: center;">
                            <h4 id="lblMemberName" class="modal-title" style="color: steelblue;"></h4>
                        </div>
                    </div>
                </div>
                <div class="modal-body">                    
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                            <label style="color: #337ab7">User ID:</label>
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                            <input type="text" id="txtUserID" readonly="" class="form-control" />
                        </div>
                    </div>
                    <br />
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                            <label style="color: #337ab7">Enter Password:</label>
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                            <input type="text" id="txtPassword" class="form-control" />
                        </div>
                    </div>
                    <br />
                    <div class="row">
                        <div class="col-sm-2">
                            <button id="btnGenerate" class="btn btn-primary btn-xs" title="Generate system generated password">Generate</button>
                        </div>                      
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btnSubmit" type="button" style="font-family: Calibri; font-size: 16px;" class="btn btn-success btn-sm" >Submit</button>
                    <button type="button" style="font-family: Calibri; font-size: 16px;" class="btn btn-default btn-sm" data-dismiss="modal">Close</button>
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
        $('#txtTodyDate').datepicker({
            dateFormat: 'dd-mm-yy'
        });
    </script>
</asp:Content>

