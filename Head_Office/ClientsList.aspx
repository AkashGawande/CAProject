<%@ Page Title="" Language="C#" MasterPageFile="~/Head_Office/HeadOfficeMaster.master" AutoEventWireup="true" CodeFile="ClientsList.aspx.cs" Inherits="Head_Office_ClientsList" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <link rel="stylesheet" href="../assets/css/select2.min.css" />
    <script src="../assets/js/jquery-2.1.4.min.js"></script>
    <script src="HO_JS/ClientList.js"></script>
    <script src="HO_JS/ClientListTAN.js"></script>
    <script src="HO_JS/ClientListGST.js"></script>
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
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="loaderHdClientReg" class="loader" style="display:none;"></div>

    <div class="breadcrumbs ace-save-state" id="breadcrumbs">
        <ul class="breadcrumb">
            <li>
                <i class="ace-icon fa fa-home home-icon"></i>
                <a href="Dashboard.aspx">Home</a>
            </li>
            <li class="active">Clients List</li>
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
                                <li id="liIT" class="active">
                                    <a data-toggle="tab" href="#IT">IT Clients</a>
                                </li>
                                <li id="liTDS">
                                    <a data-toggle="tab" href="#TDS">TDS Clients</a>
                                </li>
                                 <li id="liGST">
                                    <a data-toggle="tab" href="#GST">GST Clients</a>
                                </li>                              
                            </ul>
                            <div class="panel panel-default">
                                <div class="panel-body">
                                    <div class="tab-content">
                                        <div id="IT" class="tab-pane in active">
                                            <div class="panel panel-default">
                                                <div class="page-header">
                                                    <h1>Income Tax Client List</h1>
                                                </div>
                                                <div class="panel-body">
                                                    <div class="row">
                                                        <div class="col-lg-2 col-md-2 col-sm-2">
                                                            <label>Firm Name</label>
                                                        </div>
                                                        <div class="col-lg-3 col-md-3 col-sm-3 col-lg-pull-1">
                                                            <select name="ddaugender" id="ddlITFirmName" class="ITFirmName multiselect validate[required] form-control" multiple="">
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-lg-2 col-md-2 col-sm-2">
                                                            <label>Search Text</label>
                                                        </div>
                                                        <div class="col-lg-3 col-md-3 col-sm-3 col-lg-pull-1">
                                                            <input id="txtSearchTextIT" title="Search by following keywords: PAN Number,Applicant Name,Applicant Father Name,Applicant Address,City,Pincode,BirthDate(yyyy-MM-dd),Applicant MobileNo,Applicant Email,Employed Type,State Code,AadharNo." type="text" class="form-control" placeholder="Enter Text Here..." />
                                                        </div>
                                                        <div class="col-lg-1 col-md-1 col-sm-1">
                                                            <label>From</label>
                                                        </div>
                                                        <div class="col-lg-2 col-md-2 col-sm-2">
                                                            <input id="txtStartDateIT" type="text" class="SDate form-control" placeholder="dd-MM-yyyy" />
                                                        </div>
                                                        <div class="col-lg-1 col-md-1 col-sm-1">
                                                            <label>To</label>
                                                        </div>
                                                        <div class="col-lg-2 col-md-2 col-sm-2">
                                                            <input id="txtEndDateIT" type="text" class="SDate form-control" placeholder="dd-MM-yyyy" />
                                                        </div>
                                                        <div class="col-lg-1 col-md-1 col-sm-1">
                                                            <button id="btnSearchIT" class="btn btn-primary btn-xs">Search</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
                                        <div id="TDS" class="tab-pane">
                                            <div class="panel panel-default">
                                                <div class="page-header">
                                                    <h1>TDS Client List</h1>
                                                </div>
                                                <div class="panel-body">
                                                    <div class="row">
                                                        <div class="col-lg-2 col-md-2 col-sm-2">
                                                            <label>Firm Name</label>
                                                        </div>
                                                        <div class="col-lg-3 col-md-3 col-sm-3 col-lg-pull-1">
                                                            <select name="ddaugender" id="ddlTDSFirmName" class="TDSFirmName multiselect validate[required] form-control" multiple="">
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-lg-2 col-md-2 col-sm-2">
                                                            <label>Search Text</label>
                                                        </div>
                                                        <div class="col-lg-3 col-md-3 col-sm-3 col-lg-pull-1">
                                                            <input id="txtSearchTextTDS" title="Search by following keywords: PAN Number,Applicant Name,Applicant Father Name,Applicant Address,City,Pincode,BirthDate(yyyy-MM-dd),Applicant MobileNo,Applicant Email,Employed Type,State Code,AadharNo." type="text" class="form-control" placeholder="Enter Text Here..." />
                                                        </div>
                                                        <div class="col-lg-1 col-md-1 col-sm-1">
                                                            <label>From</label>
                                                        </div>
                                                        <div class="col-lg-2 col-md-2 col-sm-2">
                                                            <input id="txtStartDateTDS" type="text" class="SDate form-control" placeholder="dd-MM-yyyy" />
                                                        </div>
                                                        <div class="col-lg-1 col-md-1 col-sm-1">
                                                            <label>To</label>
                                                        </div>
                                                        <div class="col-lg-2 col-md-2 col-sm-2">
                                                            <input id="txtEndDateTDS" type="text" class="SDate form-control" placeholder="dd-MM-yyyy" />
                                                        </div>
                                                        <div class="col-lg-1 col-md-1 col-sm-1">
                                                            <button id="btnSearchTDS" class="btn btn-primary btn-xs">Search</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
                                        <div id="GST" class="tab-pane">
                                            <div class="panel panel-default">
                                                <div class="page-header">
                                                    <h1>GST Client List</h1>
                                                </div>
                                                <%--<div class="panel-body">
                                                    <div class="row">
                                                        <div class="col-lg-12 col-md-12 col-sm-12" style="width: 100%;">
                                                            <div class="row">
                                                                <div class="form-group">
                                                                    <label class="control-label col-sm-2">GST Type</label>
                                                                    <div class="col-lg-3 col-md-3 col-sm-3">
                                                                        <select name="ddaugender" id="ddlGSTType" class="validate[required] form-control">
                                                                            <option value="0">--Select--</option>
                                                                            <option value="TAX_Payer">TAX Payer</option>
                                                                            <option value="TAX_Deductor">TAX Deductor</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div id="divDropdown" class="row" style="display: none;">
                                                                <div class="form-group">
                                                                    <label class="control-label col-sm-2">Franchisee ID</label>
                                                                    <div class="col-lg-3 col-md-3 col-sm-3">
                                                                        <select name="ddaugender" id="ddlGSTFranchiseeID" class="validate[required] form-control">
                                                                        </select>
                                                                    </div>
                                                                    <label class="control-label col-sm-2">Firm Name</label>
                                                                    <div class="col-lg-5 col-md-5 col-sm-5">
                                                                        <select name="ddaugender" id="ddlGSTFirmName" class="validate[required] form-control">
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>--%>

                                                <div class="panel-body">
                                                    <div class="row">
                                                        <div class="col-lg-2 col-md-2 col-sm-2">
                                                            <label>GST Type</label>
                                                        </div>
                                                        <div class="col-lg-3 col-md-3 col-sm-3 col-lg-pull-1">
                                                            <select name="ddaugender" id="ddlGSTType" class="validate[required] form-control">
                                                                <option value="0">--Select--</option>
                                                                <option value="TAX_Payer">TAX Payer</option>
                                                                <option value="TAX_Deductor">TAX Deductor</option>
                                                            </select>
                                                        </div>
                                                        <div id="FirstRow1" style="display:none;" class="col-lg-2 col-md-2 col-sm-2">
                                                            <label>Firm Name</label>
                                                        </div>
                                                        <div id="FirstRow2" style="display:none;" class="col-lg-3 col-md-3 col-sm-3 col-lg-pull-1">
                                                            <select name="ddaugender" id="ddlGSTFirmName" class="GSTFirmName multiselect validate[required] form-control" multiple="">
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div id="SecondRow" style="display:none;" class="row">
                                                        <div class="col-lg-2 col-md-2 col-sm-2">
                                                            <label>Search Text</label>
                                                        </div>
                                                        <div class="col-lg-3 col-md-3 col-sm-3 col-lg-pull-1">
                                                            <input id="txtSearchTextGST" title="Search by following keywords: PAN Number,Applicant Name,Applicant Father Name,Applicant Address,City,Pincode,BirthDate(yyyy-MM-dd),Applicant MobileNo,Applicant Email,Employed Type,State Code,AadharNo." type="text" class="form-control" placeholder="Enter Text Here..." />
                                                        </div>
                                                        <div class="col-lg-1 col-md-1 col-sm-1">
                                                            <label>From</label>
                                                        </div>
                                                        <div class="col-lg-2 col-md-2 col-sm-2">
                                                            <input id="txtStartDateGST" type="text" class="SDate form-control" placeholder="dd-MM-yyyy" />
                                                        </div>
                                                        <div class="col-lg-1 col-md-1 col-sm-1">
                                                            <label>To</label>
                                                        </div>
                                                        <div class="col-lg-2 col-md-2 col-sm-2">
                                                            <input id="txtEndDateGST" type="text" class="SDate form-control" placeholder="dd-MM-yyyy" />
                                                        </div>
                                                        <div class="col-lg-1 col-md-1 col-sm-1">
                                                            <button id="btnSearchGST" class="btn btn-primary btn-xs">Search</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="table-responsive" style="display: none;" id="tblGSTaxPayer">
                                                <table class="table table-striped table-bordered table-hover" id="dataTables-example3" style="width: 100%">
                                                    <thead>
                                                        <tr>
                                                            <th colspan="7" style="text-align: center;">GST Tax Payer</th>
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
                                            <div class="table-responsive" style="display: none;" id="tblGSTaxDeductor">
                                                <table class="table table-striped table-bordered table-hover" id="dataTables-example4" style="width: 100%">
                                                    <thead>
                                                        <tr>
                                                            <th colspan="7" style="text-align: center;">GST Tax Deductor</th>
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
   

     <script src="../assets/js/jquery.bootstrap-duallistbox.min.js"></script>
		<script src="../assets/js/jquery.raty.min.js"></script>
		<script src="../assets/js/bootstrap-multiselect.min.js"></script>
		<script src="../assets/js/select2.min.js"></script>
		<script src="../assets/js/jquery-typeahead.js"></script>

    <script src="../assets/js/ace-elements.min.js"></script>
    <script src="../assets/js/ace.min.js"></script>

    

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
                        <div class="row" id="divAccount">
                            <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                <table style="width: 100%;">
                                    <tbody id="tblAccount">
                                    </tbody>
                                </table>
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
                                    <table class="table table-bordered " id="tblITDoc">
                                        <tbody id="tblITDocuments">
                                        </tbody>
                                        <tfoot id="tblITClientListfooter">
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>    
                    </div>
                    <div class="modal-footer">
                        <button id="btnUpdate" type="button" style="font-family: Calibri; font-size: 16px;" class="btn btn-success btn-sm">Update</button>
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
                                        <tfoot id="tblTDSClientListfooter">
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>    
                    </div>
                    <div class="modal-footer">
                        <button id="btnTDSUpdate" type="button" style="font-family: Calibri; font-size: 16px;" class="btn btn-success btn-sm">Update</button>
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
                                         <tfoot id="tblGSTPClientListfooter">
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>    
                    </div>
                    <div class="modal-footer">
                        <button id="btnGSTPUpdate" type="button" style="font-family: Calibri; font-size: 16px;" class="btn btn-success btn-sm">Update</button>
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
                                         <tfoot id="tblGSTDClientListfooter">
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>    
                    </div>
                    <div class="modal-footer">
                        <button id="btnGSTDUpdate" type="button" style="font-family: Calibri; font-size: 16px;" class="btn btn-success btn-sm">Update</button>
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
                    <div class="row" id="divAccount1">
                        <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                            <table style="width: 100%;">
                                <tbody id="tblAttachment">
                                  
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



    <link href="../css/jquery-ui.css" rel="stylesheet" />   
    <script src="../Js/jquery-ui.js"></script>
    <script type="text/javascript">
        $('.SDate').datepicker({
            dateFormat: 'dd-mm-yy'
        });
        $('#txtITBirthDate').datepicker({
            dateFormat: 'dd-mm-yy'
        });
        $('#txtGSTPBirthDate').datepicker({
            dateFormat: 'dd-mm-yy'
        });
    </script>
</asp:Content>

