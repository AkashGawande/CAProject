<%@ Page Title="" Language="C#" MasterPageFile="~/Head_Office/HeadOfficeMaster.master" AutoEventWireup="true" CodeFile="WorkAllocation.aspx.cs" Inherits="Head_Office_WorkAllocation" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
      <link rel="stylesheet" href="../assets/css/bootstrap-duallistbox.min.css" />
    <link rel="stylesheet" href="../assets/css/bootstrap-multiselect.min.css" />
    <link rel="stylesheet" href="../assets/css/select2.min.css" />

    <script src="../assets/js/jquery-2.1.4.min.js"></script>
    <script src="HO_JS/WorkAllocation.js"></script>


    <style>
        label {
            color: steelblue;
            font-family: Calibri;
            font-size: 16px;
          
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
            border-radius: 10px;
        }
    </style>

    <style>       
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
    <div id="loaderHdWork" class="loader" style="display:none;"></div>

    <div class="breadcrumbs ace-save-state" id="breadcrumbs">
        <ul class="breadcrumb">
            <li>
                <i class="ace-icon fa fa-home home-icon"></i>
                <a href="Dashboard.aspx">Home</a>
            </li>
            <li class="active">Work Allocations</li>
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
                                    <a data-toggle="tab" href="#ITList">Income Tax Files</a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#TDSList">TDS Files</a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#GSTRegistrationList">GST Registration Files</a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#ITNoticeList">IT Notice Files</a>
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
                                <div id="ITList" class="tab-pane in active">
                                    <div class="panel panel-default">
                                        <div class="page-header">
                                            <h1>Income Tax File List</h1>
                                        </div>
                                        <div class="panel-body">
                                            <div class="row">
                                                <div class="col-lg-12 col-md-12 col-sm-12" style="width: 100%;">
                                                    <div class="form-group">
                                                        <label class="control-label col-sm-2">Franchisee Name</label>
                                                        <div class="col-lg-3 col-md-3 col-sm-3">
                                                            <select name="ddaugender" id="ddlFranchiseeNameIT" class="FranchiseeName multiselect validate[required] form-control" multiple="">
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="table-responsive" id="tblIT">
                                                <table class="table table-striped table-bordered table-hover" id="dataTables-example1" style="width: 100%">
                                                    <thead>
                                                        <tr>
                                                            <th style="text-align: center" class="TextBoxColor">Sr. No</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Date</th>
                                                            <th style="text-align: center;" class="TextBoxColor">File TransactionID</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Client ID</th>
                                                            <th style="text-align: center" class="TextBoxColor">Applicant Name</th>
                                                            <th style="text-align: center" class="TextBoxColor">Mobile Number</th>
                                                            <th style="text-align: center" class="TextBoxColor">
                                                                <%-- <input type="checkbox" id="chkITSelectAll" style="zoom: 1.4; cursor: pointer;" />--%>
                                                                <div class="">
                                                                    <label class="inline middle">
                                                                        <input type="checkbox" id="chkITSelectAll" class="ace" />
                                                                        <span class="lbl"></span>
                                                                    </label>
                                                                </div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="tblITFiling">
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div class="row" id="emplistIT" style="display:none;">
                                                <div class="col-lg-10 col-md-10 col-sm-10">
                                                    <div class="form-group">
                                                        <label class="control-label col-sm-2">Employee Name</label>
                                                        <div class="col-lg-4 col-md-4 col-sm-4">
                                                            <select name="ddaugender" id="ddlITEmployeeName" class="EmployeeName validate[required] form-control">
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-2 col-md-2 col-sm-2 col-md-pull-5">
                                                    <button id="btnAssignIT" type="button" style="font-family: Calibri; font-size: 16px; border-radius: 10px;" class="btn btn-info btn-sm">Assign</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="TDSList" class="tab-pane">
                                    <div class="panel panel-default">
                                        <div class="page-header">
                                            <h1>TDS Files List </h1>
                                        </div>
                                        <div class="panel-body">
                                            <div class="row">
                                                <div class="col-lg-12 col-md-12 col-sm-12" style="width: 100%;">
                                                    <div class="form-group">
                                                        <label class="control-label col-sm-2">Franchisee Name</label>
                                                        <div class="col-lg-3 col-md-3 col-sm-3">
                                                            <select name="ddaugender" id="ddlFranchiseeNameTDS" class="FranchiseeName multiselect validate[required] form-control" multiple="">
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                                                                                                             
                                            <div class="table-responsive"  id="tblTDS">
                                                <table class="table table-striped table-bordered table-hover" id="dataTables-example2" style="width: 100%">
                                                    <thead>
                                                        <tr>
                                                            <th style="text-align: center" class="TextBoxColor">Sr. No</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Date</th>
                                                            <th style="text-align: center;" class="TextBoxColor">File TransactionID</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Client ID</th>                                                           
                                                            <th style="text-align: center" class="TextBoxColor">Office/Deductor Name</th>
                                                            <th style="text-align: center" class="TextBoxColor">Authorised Person</th>
                                                            <th style="text-align: center" class="TextBoxColor">
                                                                <%--<input type="checkbox" id="chkTDSSelectAll" style="zoom:1.4;cursor:pointer;" />--%>
                                                                <div class="">
                                                                    <label class="inline middle">
                                                                        <input type="checkbox" id="chkTDSSelectAll" class="ace" />
                                                                        <span class="lbl"></span>
                                                                    </label>
                                                                </div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="tblTDSFiles">
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div class="row" id="emplistTDS" style="display:none;">
                                                <div class="col-lg-10 col-md-10 col-sm-10">
                                                    <div class="form-group">
                                                        <label class="control-label col-sm-2">Employee Name</label>
                                                        <div class="col-lg-4 col-md-4 col-sm-4">
                                                            <select name="ddaugender" id="ddlTDSEmployeeName" class="EmployeeName validate[required] form-control">
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-2 col-md-2 col-sm-2 col-md-pull-5">
                                                    <button id="btnAssignTDS" type="button" style="font-family: Calibri; font-size: 16px; border-radius: 10px;" class="btn btn-info btn-sm">Assign</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="GSTRegistrationList" class="tab-pane">
                                    <div class="panel panel-default">
                                        <div class="page-header">
                                            <h1>GST File List</h1>
                                        </div>
                                        <div class="panel-body">
                                            <div class="row">
                                                <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
                                                    <div class="row">
                                                        <div class="col-lg-6 col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label class="control-label col-sm-3">GST Type</label>
                                                                <div class="col-lg-6 col-md-6 col-sm-6">
                                                                    <select name="ddaugender" id="ddlGSTType" class="validate[required] form-control">
                                                                    <option value="0">--Select--</option>
                                                                    <option value="TAX_Payer">TAX Payer</option>
                                                                    <option value="TAX_Deductor">TAX Deductor</option>
                                                                </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-md-6 col-sm-6" id="divFranchiseeName" style="display:none;">
                                                            <div class="form-group">
                                                                <label class="control-label col-sm-4">Franchisee Name</label>
                                                                <div class="col-lg-6 col-md-6 col-sm-6">
                                                                    <select name="ddaugender" id="ddlFranchiseeNameGST" class="FranchiseeName multiselect validate[required] form-control" multiple="">
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="table-responsive" style="display: none;" id="tblGSTRegTP">
                                                <table class="table table-striped table-bordered table-hover" id="dataTables-example3" style="width: 100%">
                                                    <thead>
                                                        <tr>
                                                            <th style="text-align: center" class="TextBoxColor">Sr. No</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Date</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Reference ID</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Client ID</th>
                                                            <th style="text-align: center;" class="TextBoxColor">PAN Number</th>
                                                            <th style="text-align: center" class="TextBoxColor">Applicant Name</th>
                                                            <th style="text-align: center" class="TextBoxColor">Mobile Number</th>
                                                            <th style="text-align: center" class="TextBoxColor">
                                                                <%--<input type="checkbox" id="chkGSTPSelectAll" style="zoom:1.4;cursor:pointer;" />--%>
                                                                <div class="">
                                                                    <label class="inline middle">
                                                                        <input type="checkbox" id="chkGSTPSelectAll" class="ace" />
                                                                        <span class="lbl"></span>
                                                                    </label>
                                                                </div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="tblGSTRegListTP">
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="table-responsive" style="display: none;" id="tblGSTRegTD">
                                                <table class="table table-striped table-bordered table-hover" id="dataTables-example4" style="width: 100%">
                                                    <thead>
                                                        <tr>
                                                            <th style="text-align: center" class="TextBoxColor">Sr. No</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Date</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Reference ID</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Client ID</th>
                                                            <th style="text-align: center;" class="TextBoxColor">TAN Number</th>
                                                            <th style="text-align: center" class="TextBoxColor">Office/Deductor Name</th>
                                                            <th style="text-align: center" class="TextBoxColor">Authorised Person</th>
                                                            <th style="text-align: center" class="TextBoxColor">
                                                                <%-- <input type="checkbox" id="chkGSTDSelectAll" style="zoom:1.4;cursor:pointer;" />--%>
                                                                <div class="">
                                                                    <label class="inline middle">
                                                                        <input type="checkbox" id="chkGSTDSelectAll" class="ace" />
                                                                        <span class="lbl"></span>
                                                                    </label>
                                                                </div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="tblGSTRegListTD">
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div class="row" id="emplist" style="display:none;">
                                                <div class="col-lg-10 col-md-10 col-sm-10">
                                                    <div class="form-group">
                                                        <label class="control-label col-sm-2">Employee Name</label>
                                                        <div class="col-lg-4 col-md-4 col-sm-4">
                                                            <select name="ddaugender" id="ddlGSTEmployeeName" class="EmployeeName validate[required] form-control">
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-2 col-md-2 col-sm-2 col-md-pull-5">
                                                    <button id="btnAssignGST" type="button" style="font-family: Calibri; font-size: 16px; border-radius: 10px;" class="btn btn-info btn-sm">Assign</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="ITNoticeList" class="tab-pane">
                                    <div class="panel panel-default">
                                        <div class="page-header">
                                            <h1>IT Notice Files List</h1>
                                        </div>
                                        <div class="panel-body">
                                            <div class="row">
                                                <div class="col-lg-12 col-md-12 col-sm-12" style="width: 100%;">
                                                    <div class="form-group">
                                                        <label class="control-label col-sm-2">Franchisee Name</label>
                                                        <div class="col-lg-3 col-md-3 col-sm-3">
                                                            <select name="ddaugender" id="ddlFranchiseeNameITN" class="FranchiseeName multiselect validate[required] form-control" multiple="">
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                           
                                            <div class="table-responsive" id="tblITNotice">
                                                <table class="table table-striped table-bordered table-hover" id="dataTables-example5" style="width: 100%">
                                                    <thead>
                                                        <tr>
                                                            <th style="text-align: center" class="TextBoxColor">Sr. No</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Date</th>
                                                            <th style="text-align: center;" class="TextBoxColor">File TransactionID</th>
                                                            <th style="text-align: center;" class="TextBoxColor">Client ID</th>
                                                            <th style="text-align: center" class="TextBoxColor">Applicant Name</th>
                                                            <th style="text-align: center" class="TextBoxColor">Mobile Number</th>
                                                            <th style="text-align: center" class="TextBoxColor">
                                                               <%-- <input type="checkbox" id="chkITNSelectAll" style="zoom:1.4;cursor:pointer;" />--%>
                                                                <div class="">
                                                                    <label class="inline middle">
                                                                        <input type="checkbox" id="chkITNSelectAll" class="ace" />
                                                                        <span class="lbl"></span>
                                                                    </label>
                                                                </div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="tblITNoticeFiling">
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div class="row" id="emplistITN" style="display:none;">
                                                <div class="col-lg-10 col-md-10 col-sm-10">
                                                    <div class="form-group">
                                                        <label class="control-label col-sm-2">Employee Name</label>
                                                        <div class="col-lg-4 col-md-4 col-sm-4">
                                                            <select name="ddaugender" id="ddlITNEmployeeName" class="EmployeeName validate[required] form-control">
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-2 col-md-2 col-sm-2 col-md-pull-5">
                                                    <button id="btnAssignITN" type="button" style="font-family: Calibri; font-size: 16px; border-radius: 10px;" class="btn btn-info btn-sm">Assign</button>
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
</asp:Content>

