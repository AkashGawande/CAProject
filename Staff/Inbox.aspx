<%@ Page Title="" Language="C#" MasterPageFile="~/Staff/StaffMaster.master" AutoEventWireup="true" CodeFile="Inbox.aspx.cs" Inherits="Staff_Inbox" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
  <link rel="stylesheet" href="../assets/css/bootstrap-duallistbox.min.css" />
    <link rel="stylesheet" href="../assets/css/bootstrap-multiselect.min.css" />
    <link rel="stylesheet" href="../assets/css/select2.min.css" />

    <script src="../assets/js/jquery-2.1.4.min.js"></script>
    <%--<script src="../assets/js/bootstrap.min.js"></script>--%>
    <script src="Staff_JS/Inbox.js"></script>
    <style>
       
        .fa-trash-o:hover {
            color: red;
        }


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
     <div id="loaderinbox" class="loader" style="display:none;"></div>



     <div class="breadcrumbs ace-save-state" id="breadcrumbs">
        <ul class="breadcrumb">
            <li>
                <i class="ace-icon fa fa-home home-icon"></i>
                <a href="Dashboard.aspx">Dashboard</a>
            </li>
            <li class="active">Inbox</li>
        </ul>
        
    </div>
    <div class="page-header">
        <h1>Inbox
								<small>
                                    <i class="ace-icon fa fa-angle-double-right"></i>
                                    </small>
        </h1>
    </div>
    <div class="row">
        <div class="col-xs-12">
            <div class="row">
                <div class="col-xs-12">
                    <div class="tabbable">
                        <ul id="inbox-tabs" class="inbox-tabs nav nav-tabs padding-16 tab-size-bigger tab-space-1">
                            <li class="li-new-mail pull-right">
                                <a data-toggle="tab" href="#write" data-target="write" class="btn-new-mail" id="ComposeMsg">
                                    <span class="btn btn-purple no-border">
                                        <i class="ace-icon fa fa-envelope bigger-130"></i>
                                        <span class="bigger-110">Write Mail</span>
                                    </span>
                                </a>
                            </li>

                            <li id="liinbox" class="active">
                                <a data-toggle="tab" href="#inbox"  id="InboxMessage" data-target="inbox">
                                    <i class="blue ace-icon fa fa-inbox bigger-130"></i>
                                    <span class="bigger-110">Inbox</span>
                                </a>
                            </li>
                            <li>
                                <a data-toggle="tab" href="#sent" id="GoToSendMessageDetails" data-target="sent">
                                    <i class="orange ace-icon fa fa-location-arrow bigger-130"></i>
                                    <span class="bigger-110">Sent</span>
                                </a>
                            </li>
                        </ul>
                        <div class="tab-content no-border no-padding">
                            <div id="inbox" class="tab-pane in active">
                                <div class="message-container">
                                    <%-- Start Unread Message Count At Top--%>
                                    <div id="id-message-list-navbar" class="message-navbar clearfix">
                                        <div class="message-bar">
                                            <div class="message-infobar" id="id-message-infobar">
                                                <span class="blue bigger-150" id="blinking">Inbox</span>
                                                <span class="grey bigger-110">(<label id="unreadmes"></label>
                                                    unread messages)</span>&nbsp;&nbsp;&nbsp
                                            </div>
                                            <div class="message-infobar" style="display:none;" id="id-message-infobar1">
                                                <span class="blue bigger-150" id="blinking1">Sent</span>
                                                <span class="grey bigger-110">(<label id="SentMessages"></label>
                                                    Sent messages)</span>&nbsp;&nbsp;&nbsp
                                            </div>
                                            <div id="btndeleteSelectedmsg" style="display:none;">
                                            <button style="display:none;" type="button" class="Deletebtn btn btn-xs btn-white btn-primary" id="deleteInboxmsg">
                                                <i class="ace-icon fa fa-trash-o bigger-125 orange"></i>
                                                <span class="bigger-110">Delete</span>
                                            </button>
                                                <button style="display:none;" type="button" class="Deletebtn btn btn-xs btn-white btn-primary" id="deletesentmsg">
                                                <i class="ace-icon fa fa-trash-o bigger-125 orange"></i>
                                                <span class="bigger-110">Delete</span>
                                            </button>
                                            </div>
                                            <div class="message-toolbar hide">
                                            </div>
                                        </div>

                                        <div id="Chk_Searchtext" >
                                            <div class="messagebar-item-left"  id="chkReceiveselectall">
                                                <label class="inline middle">
                                                    <input type="checkbox" id="chkdeleteallInbox" class="ace" />
                                                    <span class="lbl"></span>
                                                </label>
                                            </div>
                                            <div class="nav-search minimized" id="searchText">
                                                <form class="form-search">
                                                    <span class="input-icon">
                                                        <input type="text" autocomplete="off" class="input-small nav-search-input" placeholder="Search inbox ..." />
                                                        <i class="ace-icon fa fa-search nav-search-icon"></i>
                                                    </span>
                                                </form>
                                            </div>
                                        </div>

                                        <div id="Chk_Searchtext1" style="display:none;">                                            
                                            <div class="messagebar-item-left" id="chkSendselectall">
                                                <label class="inline middle">
                                                    <input type="checkbox" id="chkdeleteallsent" class="ace" />
                                                    <span class="lbl"></span>
                                                </label>
                                            </div>
                                            <div class="nav-search minimized" id="searchText1">
                                                <form class="form-search">
                                                    <span class="input-icon">
                                                        <input type="text" autocomplete="off" class="input-small nav-search-input" placeholder="Search inbox ..." />
                                                        <i class="ace-icon fa fa-search nav-search-icon"></i>
                                                    </span>
                                                </form>
                                            </div>
                                        </div>

                                        <div id="SendBack" style="display:none;">
                                                <div class="messagebar-item-left" id="composeback">
                                                    <a href="#" class="btn-back-message-list">
                                                        <i class="ace-icon fa fa-arrow-left bigger-110 middle blue"></i>
                                                        <b class="middle bigger-110">Back</b>
                                                    </a>
                                                </div>

                                                <div class="messagebar-item-right" id="SendMsg">
                                                    <span class="inline btn-send-message">
                                                        <button type="button" class="btn btn-sm btn-primary no-border btn-red btn-round">
                                                            <span class="bigger-110">Send</span>
                                                            <i class="ace-icon fa fa-arrow-right icon-on-right"></i>
                                                        </button>
                                                    </span>
                                                </div>
                                            </div>                                        
                                    </div>
                                    <%-- End Unread Message Count At Top--%>

                                    <div id="id-message-item-navbar" class="hide message-navbar clearfix">
                                    </div>



                                    <%--Start Message Table--%>
                                    <div class="message-list-container">
                                        <div class="message-list" id="message-list">

                                            <div class="table-responsive" style="height: 500px" id="ReceiveMessage">
                                                <table class="table table-striped  table-hover" id="dataTables-example">
                                                    <thead>
                                                        <tr>
                                                            <th style="text-align: center; width: 7%"></th>
                                                            <th style="text-align: center; display: none;">Sr.No.</th>
                                                            <th style="text-align: center; display: none;">MSg_ID</th>
                                                            <th style="text-align: center; width: 20%">From</th>
                                                            <%--<th style="text-align: center; width: 15%">To</th>--%>
                                                            <th style="text-align: center; width: 30%">Subject</th>
                                                            <th style="text-align: center; width: 20%">Issue In</th>
                                                            <th style="text-align: center; width: 20%">Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="tblmsgList">
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div class="table-responsive" style="height: 500px; display: none;" id="SendMessage">
                                                <table class="table table-striped  table-hover" id="dataTables-example2">
                                                    <thead>
                                                        <tr>
                                                            <th style="text-align: center; width: 7%"></th>
                                                            <th style="text-align: center; display: none;">Sr.No.</th>
                                                            <th style="text-align: center; display: none;">MSg_ID</th>
                                                            <%--<th style="text-align: center; width: 20%">From</th>--%>
                                                            <th style="text-align: center; width: 15%">To</th>
                                                            <th style="text-align: center; width: 30%">Subject</th>                                                            
                                                            <th style="text-align: center; width: 20%">Date</th>
                                                            <th style="text-align: center; width: 20%">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="tblSendmsgList">
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div id="ComposeMessage" style="display:none;">
                                                <div class="row" style="margin-top:10px;">
                                                    <div class="form-group">
                                                        
                                                        <label class="col-lg-3 col-md-3 col-sm-3 col-lg-push-2 " for="form-field-recipient">Recipient(s):</label>

                                                        <div class="col-lg-7 col-md-7 col-sm-7">
                                                            <span class="input-icon">
                                                                <%--<input type="email" name="recipient" id="Recipient" data-value="alex@doe.com"  placeholder="Recipient(s)" />
                                                               --%> 
                                                                <select name="ddaugender" id="ddlAdminName" class="AdminName multiselect validate[required] form-control" multiple="">
                                                                </select>
                                                                <%--<i class="ace-icon fa fa-user"></i>--%>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                   <div class="hr hr-18 dotted"></div>
                                                <div class="row"> 
                                                    <div class="form-group">
                                                        <label class="col-lg-3 col-md-3 col-sm-3 col-lg-push-2" for="form-field-subject">Subject:</label>

                                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                            <div class="input-icon block col-xs-12 no-padding">
                                                                <input maxlength="100" type="text" class="col-lg-12" name="subject" id="Subject" placeholder="Subject" />
                                                                <i class="ace-icon fa fa-comment-o"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                    <div class="hr hr-18 dotted"></div>
                                                <div class="row">
                                                    <div class="form-group">
                                                        <label class="col-lg-3 col-md-3 col-sm-3 col-lg-push-2">
                                                             Message:
                                                        </label>
                                                        <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                                                            <div class="input-icon block col-xs-12 no-padding">
                                                               <textarea type="text" class="col-lg-12" id="Message" placeholder="write message here....!" style="margin: 0px; width: 762px; height: 155px;"></textarea>
                                                                <%--<i class="ace-icon fa fa-envelope"></i>--%>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row" style="margin-top:10px;">
                                                    <div class="">
                                                        <table class="table" id="dataTables-example3">
                                                            <tbody id="tblSendmsgAttach">
                                                              
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <%-- End Message Table--%>                                   


                                    <%--Start Message Description--%>
                                    <div class=" message-content" id="id-message-content">

                                        <div class="message-header clearfix">


                                            <div class="pull-left action-buttons">
                                                <a href="#" style="display:none;" class="btn-back-message-list" id="GotoInbox">
                                                    <i class="ace-icon fa fa-arrow-left bigger-110 middle blue"></i>
                                                    <b class="middle bigger-110">Back</b>
                                                </a>
                                                <a href="#" style="display:none;" class="btn-back-message-list" id="GotoSentbox">
                                                    <i class="ace-icon fa fa-arrow-left bigger-110 middle blue"></i>
                                                    <b class="middle bigger-110">Back</b>
                                                </a>
                                            </div>
                                            <%--<div class="pull-right action-buttons">

                                                <a href="#">
                                                    <i class="ace-icon fa fa-reply green icon-only bigger-130"></i>
                                                </a>

                                                <a href="#">
                                                    <i class="ace-icon fa fa-mail-forward blue icon-only bigger-130"></i>
                                                </a>

                                                <a href="#">
                                                    <i class="ace-icon fa fa-trash-o red icon-only bigger-130"></i>
                                                </a>
                                            </div>--%>
                                        </div>

                                        <br />
                                        <div class="message-body">
                                            <i class="ace-icon fa fa-user orange2"></i><a href="#" class="sender">
                                                <label id="lblsenderName"></label>
                                            </a>
                                            &nbsp;&nbsp;<i class="ace-icon fa fa-clock-o bigger-110 orange middle"></i>&nbsp;&nbsp;<span class="time grey"><label id="receivedTime"></label></span>

                                            <div class="hr hr-double"></div>
                                            &nbsp;&nbsp; <i class="ace-icon fa fa-comment-o"></i>&nbsp;&nbsp;<label id="lblSubject" style="font-size: 15px"></label>
                                            <div class="hr hr-double"></div>
                                            <span id="lblmessege"></span>
                                        </div>
                                        <div class="hr hr-double"></div>

                                        <div>
                                            <div class="table-responsive">
                                                <table style="border: 0px solid #ddd;" class="table table-striped table-hover" id="dataTables-example1">
                                                    
                                                    <tbody id="Attachments">
                                                    </tbody>

                                                </table>
                                            </div>
                                        </div>
                                        </div>
                                    <%--End Message Description--%>    
                                                                   
                                   <%-- <br />
                                    <br />--%>
                                </div>



                                <%--Start Total Message Count--%>
                                <div class="message-footer clearfix" style="display:none;">
                                    <div class="pull-left">
                                        <label id="lblmessagecount"></label>
                                    </div>

                                    <div class="pull-right">
                                        <div class="inline middle">
                                            <label id="lblMessageno" style="display: none"></label>
                                        </div>

                                        &nbsp; &nbsp;
																<ul class="pagination middle">
                                                                    <li class="disabled">
                                                                        <span>
                                                                            <i class="ace-icon fa fa-step-backward middle"></i>
                                                                        </span>
                                                                    </li>

                                                                    <li class="disabled">
                                                                        <span>
                                                                            <i class="ace-icon fa fa-caret-left bigger-140 middle"></i>
                                                                        </span>
                                                                    </li>

                                                                    <li>
                                                                        <span>
                                                                            <input value="1" maxlength="3" type="text" />
                                                                        </span>
                                                                    </li>

                                                                    <li>
                                                                        <a href="#">
                                                                            <i class="ace-icon fa fa-caret-right bigger-140 middle"></i>
                                                                        </a>
                                                                    </li>

                                                                    <li>
                                                                        <a href="#">
                                                                            <i class="ace-icon fa fa-step-forward middle"></i>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                    </div>
                                </div>
                                <%--End Total Message Count--%>


                                <%--Start Open Message No For Total Message--%>
                                <div class="hide message-footer message-footer-style2 clearfix" style="display:none;">
                                    <div class="pull-left">simpler footer </div>

                                    <div class="pull-right">
                                        <div class="inline middle">message 1 of 151 </div>

                                        &nbsp; &nbsp;
																<ul class="pagination middle">
                                                                    <li class="disabled">
                                                                        <span>
                                                                            <i class="ace-icon fa fa-angle-left bigger-150"></i>
                                                                        </span>
                                                                    </li>

                                                                    <li>
                                                                        <a href="#">
                                                                            <i class="ace-icon fa fa-angle-right bigger-150"></i>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                    </div>
                                </div>
                                <%--End Open Message No For Total Message--%>
                            </div>
                        </div>
                    </div>
                    <!-- /.tab-content -->
                </div>
                <!-- /.tabbable -->
            </div>
            <!-- /.col -->
        </div>
    </div>
        <!-- /.row -->


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

