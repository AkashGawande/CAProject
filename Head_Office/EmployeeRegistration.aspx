<%@ Page Title="" Language="C#" MasterPageFile="~/Head_Office/HeadOfficeMaster.master" AutoEventWireup="true" CodeFile="EmployeeRegistration.aspx.cs" Inherits="Head_Office_EmployeeRegistration" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
      <link rel="stylesheet" href="../assets/css/select2.min.css" />
    <script src="../assets/js/jquery-2.1.4.min.js"></script>
    
    <script src="HO_JS/EmployeeReg.js"></script>
    <link href="../css/ZoomImage.css" rel="stylesheet" />
    <style>
        input[type=button]
        {
            border-radius:20px;
        }
        .classlabel
        {
            color:steelblue;
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
    <div id="loaderHdEmp" class="loader" style="display:none;"></div>
    <div class="breadcrumbs ace-save-state" id="breadcrumbs">
        <ul class="breadcrumb">
            <li>
                <i class="ace-icon fa fa-home home-icon"></i>
                <a href="Dashboard.aspx">Home</a>
            </li>
            <li class="active">Employee Master</li>
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
                                 <li class="active">
                                    <a data-toggle="tab" href="#ADD">New Employee</a>
                                </li>
                                <li >
                                    <a data-toggle="tab" href="#EmployeeEdit">Employee Details</a>
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
                            <div class="tab-content" style="background-color:white;border:3px solid #C5D0DC">
                                <div id="EmployeeEdit" class="tab-pane">
                                    <div class="panel panel-default">
                                        <div class="table-responsive">
                                            <table class="table table-striped table-bordered table-hover" id="dataTables-example" style="width: 100%">
                                                <%--<thead>--%>
                                                <tr >
                                                    <th style="text-align: center">Sr.No</th>
                                                    <th style="text-align: center; display: none">Emp.id</th>
                                                    <th style="text-align: center">Emp.Name</th>
                                                    <th style="text-align: center">Date Of Joining</th>
                                                    <th style="text-align: center">Address</th>
                                                    <th style="text-align: center">Mobile No</th>
                                                    <th style="text-align: center">Address Proof</th>
                                                    <th style="text-align: center; display: none">DOB</th>
                                                    <th style="text-align: center; display: none">Email_Id</th>
                                                    <th style="text-align: center; display: none">Designation</th>
                                                    <th style="text-align: center; display: none">City Name</th>
                                                    <th style="text-align: center; display: none">State Name</th>
                                                    <th style="text-align: center; display: none">Pincode</th>
                                                    <th style="text-align: center">Action</th>
                                                </tr>
                                                <%--                                                    </thead>--%>
                                                <tbody id="tblEmpData">
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div id="ADD" class="tab-pane in active">
                                    <div class="panel panel-default">
                                        <div class="widget-body">
                                            <div class="widget-main">
                                                <div id="fuelux-wizard-container"></div>
                                                <div class="row">
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-lg-4 classlabel">Emp Id</label>
                                                            <div class="col-lg-8">
                                                                <input type="text" id="txtEmpId" class="form-control" title="Enter PAN No ,TAN No etc." maxlength="10" placeholder="Enter PAN,TAN For Emp Id " name="req"  onblur="validate_PAN_Mobile_Email('txtEmpId')" onkeydown="upperCaseF(this)" onkeypress="return nospaces(event)" />
                                                            <span id="txtEmpIdError" style="margin-top: 6px; display: none; font-size: 15px; color: red; font-family: cursive">InValid PAN/TAN No</span>
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
                                                            <label class="control-label col-lg-4 classlabel">Birth Date</label>
                                                            <div class="col-lg-8">
                                                                <input type="text" id="txtDOB" placeholder="dd-MM-yyyy" maxlength="10" name="date" class="validate[required,custom[date]] form-control col-lg-6" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                 <div class="row" style="margin-top: 10px">
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-lg-4 classlabel">Mobile No</label>
                                                            <div class="col-lg-8">
                                                                <input type="text" class="validate[required] form-control" maxlength="10" name="req" id="txtMobileNo" placeholder="Enter Mobile No"  onblur="validate_PAN_Mobile_Email('txtMobileNo')" onkeypress="return isNumber(event)" />
                                                           <span id="txtMobileNoError" style="margin-top: 6px; display: none; font-size: 15px; color: red; font-family: cursive">Please Enter Valid Mobile No</span>
                                                                </div>
                                                        </div>
                                                    </div>
                                                     <div class="col-lg-6" >
                                                        <div class="form-group">
                                                            <label class="control-label col-lg-4 classlabel">Email</label>
                                                            <div class="col-lg-8">
                                                                <input type="text" placeholder="Enter Email Address" class="form-control" name="req" id="txtemail" onblur="validate_PAN_Mobile_Email('txtemail')" onkeypress="return nospaces(event)" />
                                                            <span id="txtemailError" style="margin-top: 6px; display: none; font-size: 15px; color: red; font-family: cursive">Please Enter Valid Email Id</span>
                                                               </div>
                                                        </div>
                                                    </div>
                                                    
                                                </div>                                               
                                                <div class="row" style="margin-top: 10px">
                                                    <div class="col-lg-6">
                                                          <div class="form-group">
                                                            <label class="control-label col-lg-4 classlabel">Address Proof</label>
                                                            <div class="col-lg-8">
                                                                <div id="NewUpload">
                                                                    <div class="row">
                                                                        <div class="col-lg-10">
                                                                            <input type="file" class="form-control" name="file[]" id="AddressProof" onchange="Attachments(this,'AddressProof')" />
                                                                            <input type="hidden" id="AddressProofPhotoSource" value="" class="PhotoSource" />
                                                                            <input type="hidden" id="AddressProofFileName" value="" class="FileName" />
                                                                        </div>
                                                                        <div class="col-lg-2" id="changecanceldiv" style="display:none;">
                                                                            <a class="btn btn-flat btn-warning btn-xs" style="border-radius: 20px;" title="Cancel" id="changeCancel" data-toggle="tab"><i class="fa fa-close"></i></a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div id="Image" style="display: none;">
                                                                    <img id="ChequePhotoNotice" style="height: 50px; width: 50px; cursor: zoom-in;" data-toggle="modal" data-target="#myImgModal" />
                                                                    <a id="DownloadChequeNotice" onclick="openTab(this)" href="#"><img src="../Logo/pdf-icon.png" height="50" width="50" /></a>
                                                                    <a id="change" href="#">update</a>
                                                                </div>
                                                            </div>
                                                        </div>                                                       
                                                    </div>
                                                    <div class="col-lg-6">
                                                          <div class="form-group">
                                                            <label class="control-label col-lg-4 classlabel">Designation</label>
                                                            <div class="col-lg-8">
                                                                <select name="ddaugender" id="ddlDesignation" class="validate[required] form-control">
                                                                    <option value="0">--Select--</option>
                                                                    <option value="Admin">Admin</option>
                                                                    <option value="Employee">Employee</option>                                                                    
                                                                </select>

                                                            </div>
                                                        </div>                                                      
                                                    </div>
                                                </div>
                                                <div class="row" style="margin-top: 10px">
                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-lg-4 classlabel">
                                                                Address
                                                             </label>
                                                            <div class="col-lg-8">
                                                                <textarea type="text" placeholder="Enter Address...." rows="4" class="validate[required] form-control" name="req" id="txtLine_No"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div class="col-lg-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-lg-4 classlabel">State</label>
                                                            <div class="col-lg-8">
                                                                 <select name="ddaugender" id="ddlState" class="StateName validate[required] form-control">
                                                                                                                                       
                                                                </select>

                                                            </div>
                                                        </div>   
                                                        <br />  
                                                         <div class="form-group">
                                                            <label class="control-label col-lg-2 classlabel">City</label>
                                                            <div class="col-lg-5">
                                                                <select name="ddaugender" id="ddlCity" class="CityName validate[required] form-control">
                                                                        <option value="0">--Select--</option>                                                                 
                                                                </select>
                                                            </div>
                                                             <label class="control-label col-lg-2 classlabel">Pincode</label>
                                                            <div class="col-lg-3">
                                                                <input type="text" class="validate[required] form-control" maxlength="6" name="req" id="txtPincode" placeholder="Enter Pincode"  onkeypress="return isNumber(event)" />
                                                            </div>
                                                        </div>                                                   
                                                                                                                                                                      
                                                    </div>
                                                </div>
                                               
                                               
                                            <div  class="row">
                                                <div style="margin-top:30px;text-align:center;">
                                                    <input type="button"  class="btn btn-success" id="btnSave" value="Submit"  />
                                                     <input type="button" style="display:none;" class="btn btn-info" id="btnUpdate" value="Update"  />
                                                     <input type="button"  class="btn btn-danger" id="btnCancel" value="Cancel"  />
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
    <script src="../assets/js/bootstrap.min.js"></script>    
    <script src="../assets/js/jquery.ui.touch-punch.min.js"></script>

    <!-- ace scripts -->
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


</asp:Content>

