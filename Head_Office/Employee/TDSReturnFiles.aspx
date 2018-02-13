<%@ Page Title="" Language="C#" MasterPageFile="~/Head_Office/Employee/EmployeeMasterPage.master" AutoEventWireup="true" CodeFile="TDSReturnFiles.aspx.cs" Inherits="Head_Office_TDSReturnFiles" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link rel="stylesheet" href="../../assets/css/bootstrap-duallistbox.min.css" />
    <link rel="stylesheet" href="../../assets/css/bootstrap-multiselect.min.css" />
    <link rel="stylesheet" href="../../assets/css/select2.min.css" />

    <script src="../../assets/js/jquery-2.1.4.min.js"></script>
    <script src="JS/TDSReturnFiles.js"></script>
    <link href="../../css/ZoomImage.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="breadcrumbs ace-save-state" id="breadcrumbs">
        <ul class="breadcrumb">
            <li>
                <i class="ace-icon fa fa-home home-icon"></i>
                <a href="Dashboard.aspx">Home</a>
            </li>
            <li class="active">TDS Return Files</li>
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
                                    <a data-toggle="tab" href="#TDSAssigned">Assigned Files</a>
                                </li>
                                <li id="liVerified">
                                    <a data-toggle="tab" href="#TDSVerified">Verified Files</a>
                                </li> 
                            </ul>

                             <div class="panel panel-default">
                                <div class="panel-body">
                                    <div class="tab-content">
                                        <div id="TDSAssigned" class="tab-pane in active">
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

                                        <div id="TDSVerified" class="tab-pane">
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
                                                        <%--<div class="col-lg-1 col-md-1 col-sm-1 col-lg-pull-1">
                                                            <button id="btnSearchVerified" class="btn btn-primary btn-xs">search</button>
                                                        </div>--%>
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

                                        <div class="table-responsive" style="display: none;" id="tblTDS">
                                            <table class="table table-striped table-bordered table-hover" id="dataTables-example" style="width: 100%">
                                                <thead>
                                                    <tr>
                                                        <th style="width: 50px;" class="TextBoxColor">Sr. No</th>
                                                        <th style="text-align: center; width: 110px;" class="TextBoxColor">Date</th>
                                                        <th style="text-align: center; width: 50px;" class="TextBoxColor">File TransactionID</th>
                                                        <th style="text-align: center; width: 70px;" class="TextBoxColor">Client ID</th>
                                                        <th style="text-align: center" class="TextBoxColor">Office Name</th>
                                                        <th style="text-align: center" class="TextBoxColor">Authorised Person</th>
                                                        <th style="text-align: center; width: 100px;" class="TextBoxColor">Mobile Number</th>
                                                        <th style="text-align: center; width: 100px;display:none;" class="TextBoxColor">FranchiseeId</th>
                                                        <th style="text-align: center; width: 100px;display:none;" class="TextBoxColor" >StaffId</th>
                                                        <th style="text-align: center; width: 100px;display:none;" class="TextBoxColor" id="AssignedDateColumn">Assigned Date</th>
                                                        <th style="text-align: center; width: 100px;display:none;" class="TextBoxColor" id="VerifiedDateColumn">Varified Date</th>
                                                       <th style="text-align: center; width: 100px;display:none;" class="TextBoxColor" id="CompletedDateColumn">Completed Date</th>
                                                         <th style="text-align: center; width: 125px;" class="TextBoxColor">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="tblTDSFiles">
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


    <script src="../../assets/js/bootstrap.min.js"></script>
    <script src="../../assets/js/wizard.min.js"></script>
    <script src="../../assets/js/jquery.validate.min.js"></script>
    <script src="../../assets/js/jquery-additional-methods.min.js"></script>
    <script src="../../assets/js/bootbox.js"></script>
    <script src="../../assets/js/jquery.maskedinput.min.js"></script>
    

    <script src="../../assets/js/jquery.bootstrap-duallistbox.min.js"></script>
		<script src="../../assets/js/jquery.raty.min.js"></script>
		<script src="../../assets/js/bootstrap-multiselect.min.js"></script>
		<script src="../../assets/js/select2.min.js"></script>
		<script src="../../assets/js/jquery-typeahead.js"></script>

    <script src="../../assets/js/ace-elements.min.js"></script>
    <script src="../../assets/js/ace.min.js"></script>

    
  
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
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-3">
                                <div class="form-group">
                                    <div class="col-sm-12" >
                                        <div id="Photocheque">
                                            <img id="ChequePhotoTDS" style="height: 50px; width: 50px; cursor: zoom-in;" data-toggle="modal" data-target="#myImgModal" />
                                            <a id="DownloadChequeTDS" onclick="openTab(this)" href="#"><img src="../Logo/pdf-icon.png" height="50" width="50" /></a>
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
                                        <tfoot id="tblTDSfooter">
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

     <link href="../../css/jquery-ui.css" rel="stylesheet" />   
    <script src="../../Js/jquery-ui.js"></script>
    <script type="text/javascript">
        //$('#txtDOB').datepicker({
        //    dateFormat: 'dd-mm-yy'
        //});
        $('.SDate').datepicker({
            dateFormat: 'dd-mm-yy'
        });
        $('#txtTDSDueDate').datepicker({
            dateFormat: 'dd-mm-yy'
        });
    </script>
</asp:Content>

