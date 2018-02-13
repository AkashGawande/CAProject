<%@ Page Title="" Language="C#" MasterPageFile="~/Franchisee/FranchiseeMaster.master" AutoEventWireup="true" CodeFile="Profile.aspx.cs" Inherits="Staff_Profile" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <link rel="stylesheet" href="../assets/css/select2.min.css" />
    <script src="../assets/js/jquery-2.1.4.min.js"></script>
    <script src="Franchisee_JS/Profile.js"></script>
    <!-- page specific plugin styles -->
		<link rel="stylesheet" href="../assets/css/jquery-ui.custom.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery.gritter.min.css" />
		<link rel="stylesheet" href="../assets/css/select2.min.css" />
		<link rel="stylesheet" href="../assets/css/bootstrap-datepicker3.min.css" />
		<link rel="stylesheet" href="../assets/css/bootstrap-editable.min.css" />

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
    <div id="loaderFrProf" class="loader" style="display: none;"></div>
    <div class="breadcrumbs ace-save-state" id="breadcrumbs">
        <ul class="breadcrumb">
            <li>
                <i class="ace-icon fa fa-home home-icon"></i>
                <a href="Dashboard.aspx">Home</a>
            </li>


            <li class="active">User Profile</li>
        </ul>
        <!-- /.breadcrumb -->

        <div class="nav-search" id="nav-search">
            <form class="form-search">
                <span class="input-icon">
                    <input type="text" placeholder="Search ..." class="nav-search-input" id="nav-search-input" autocomplete="off" />
                    <i class="ace-icon fa fa-search nav-search-icon"></i>
                </span>
            </form>
        </div>
        <!-- /.nav-search -->
    </div>


    <br />


    <div>
        <div id="user-profile-2" class="user-profile">
            <div class="tabbable">
                <ul class="nav nav-tabs padding-18">
                    <li class="active">
                        <a data-toggle="tab" href="#home">
                            <i class="green ace-icon fa fa-user bigger-120"></i>
                            Profile
                        </a>
                    </li>
                </ul>

                <div class="tab-content no-border padding-24">
                    <div id="home" class="tab-pane in active">
                        <div class="row">
                            <div class="col-xs-12 col-sm-3 center">
                                <span class="profile-picture" id="userImage" runat="server">
                                    <a href="#">
                                        <img class="editable img-responsive avatar2" alt="Alex's Avatar" id="avatar2" runat="server" src="" /></a>
                                </span>
                                <a id="Downloadpdf" runat="server" name="" href="#">
                                    <img src="../Logo/pdf-icon.png" height="200" width="200" /></a>

                                <div class="space space-4"></div>

                                <a href="#" class="btn btn-sm  btn-success avatar2">
                                    <i class="ace-icon fa fa-photo bigger-120"></i>
                                    <span class="bigger-110">Change License</span>
                                </a>
                            </div>
                            <!-- /.col -->

                            <div class="col-xs-12 col-sm-9">
                                <h4 class="blue">
                                    <span class="middle">
                                        <label id="firmName" style="font-size: 20px" runat="server"><%--Alex M. Doe--%></label></span>

                                    <span class="label label-purple arrowed-in-right">
                                        <i class="ace-icon fa fa-circle green smaller-80 align-middle"></i>
                                        Active
                                    </span>
                                </h4>

                                <div class="profile-user-info">
                                    <div class="profile-info-row">
                                        <div class="profile-info-name">Franchisee ID</div>

                                        <div class="profile-info-value">
                                            <label id="lblFranchiseeId" runat="server"></label>
                                        </div>
                                    </div>

                                    <div class="profile-info-row">
                                        <div class="profile-info-name">Password</div>

                                        <div class="profile-info-value">

                                            <label id="lblPassword" runat="server"></label>
                                            &nbsp;&nbsp;&nbsp;&nbsp;<a href="ChangePassword.aspx" title="Change Password" id="btnchangepassword"><i class="fa fa-edit brown bigger-150"></i></a>

                                        </div>
                                    </div>

                                    <div class="profile-info-row">
                                        <div class="profile-info-name">Firm Name </div>

                                        <div class="profile-info-value">
                                            <label id="lblFirmName" runat="server"></label>
                                            <input type="text" id="txtFirmName" style="height: 25px; width: 300px; display: none;" />
                                            <span></span>
                                        </div>
                                    </div>

                                    <div class="profile-info-row">
                                        <div class="profile-info-name">Owner Name </div>

                                        <div class="profile-info-value">
                                            <label id="lblOwnerName" runat="server"></label>
                                            <input type="text" id="txtOwnerName" style="height: 25px; width: 300px; display: none;" />
                                            <span></span>
                                        </div>
                                    </div>



                                    <div class="profile-info-row">
                                        <div class="profile-info-name">Address&nbsp;&nbsp;<i class="fa fa-map-marker light-orange bigger-110"></i> </div>

                                        <div class="profile-info-value">

                                            <label id="lblFirstLine" runat="server"></label>
                                            <label id="lblfirst" runat="server">,</label>
                                            <label id="lblSecondLine" runat="server"></label>
                                            <label id="lblSecond" runat="server">,</label>
                                            <label id="lblLandmark" runat="server"></label>
                                            <label id="lblLand" runat="server">,</label>
                                            <label id="lblCity" runat="server"></label>
                                            <label id="lbldist" runat="server">-</label>
                                            <label id="lblPincode" runat="server"></label>
                                            <br />
                                            <input type="text" id="txtFirstLine" placeholder="First Line" style="height: 25px; width: 150px; display: none;" />&nbsp;<input type="text" id="txtSecondLine" placeholder="Secone Line" style="height: 25px; width: 150px; display: none;" />&nbsp;<input type="text" id="txtLandmark" placeholder="Landmark" style="height: 25px; width: 150px; display: none;" />
                                            &nbsp;<input type="text" id="txtCity" placeholder="City Name" style="height: 25px; width: 150px; display: none;" />
                                            &nbsp; 
                                            <input type="text" id="txtPincode" placeholder="Pincode" style="height: 25px; width: 150px; display: none;" />

                                        </div>
                                    </div>
                                    <div class="profile-info-row">
                                        <div class="profile-info-name">Mobile No </div>

                                        <div class="profile-info-value">
                                            <span>
                                                <label id="lblmobileNo" runat="server"></label>
                                            </span>
                                            <input type="text" id="txtMobileNo" style="height: 25px; width: 150px; display: none;" />
                                        </div>
                                    </div>
                                    <div class="profile-info-row">
                                        <div class="profile-info-name">Email Id </div>

                                        <div class="profile-info-value">
                                            <span>
                                                <label id="lblEmailId" runat="server"></label>
                                            </span>
                                            <input type="text" id="txtEmailId" style="height: 25px; width: 150px; display: none;" />
                                        </div>
                                    </div>
                                    <div class="profile-info-row">
                                        <div class="profile-info-name">Registration Date </div>

                                        <div class="profile-info-value">
                                            <span>
                                                <label id="lblRegistrationDate" runat="server"><%--20-06-2010--%></label></span>
                                        </div>
                                    </div>

                                </div>
                                <br />

                                <div class="row ">
                                    <div class="form-group col-lg-10 col-lg-push-1">
                                        <a class="btn btn-xs btn-primary" style="font-size: 14px;" title="Edit Personal Details" id="btneditPersonal"><i class="fa fa-edit white bigger-150"></i>Edit Details</a>
                                        <a class="btn btn-xs btn-success" style="font-size: 14px; display: none;" title="Save Changes" id="btnsavePersonal"><i class="fa fa-floppy-o white bigger-150"></i>Save Changes</a>
                                        <a class="btn btn-xs btn-danger" style="font-size: 14px; display: none;" title="Save Changes" id="btnCancel"><i class="fa fa-close white bigger-150"></i>Cancel</a>
                                    </div>
                                </div>
                                <hr />

                            </div>
                            <!-- /.col -->
                        </div>
                        <!-- /.row -->

                        <div class="space-20"></div>


                    </div>
                </div>
            </div>
        </div>
    </div>




    <script type="text/javascript">
        if ('ontouchstart' in document.documentElement) document.write("<script src='../assets/js/jquery.mobile.custom.min.js'>" + "<" + "/script>");
    </script>
    <script src="../assets/js/bootstrap.min.js"></script>

    <!-- page specific plugin scripts -->

    <!--[if lte IE 8]>
		  <script src="assets/js/excanvas.min.js"></script>
		<![endif]-->
    <script src="../assets/js/jquery-ui.custom.min.js"></script>
    <script src="../assets/js/jquery.ui.touch-punch.min.js"></script>
    <script src="../assets/js/jquery.gritter.min.js"></script>
    <script src="../assets/js/bootbox.js"></script>
    <script src="../assets/js/jquery.easypiechart.min.js"></script>
    <script src="../assets/js/bootstrap-datepicker.min.js"></script>
    <script src="../assets/js/jquery.hotkeys.index.min.js"></script>
    <script src="../assets/js/bootstrap-wysiwyg.min.js"></script>
    <script src="../assets/js/select2.min.js"></script>
    <script src="../assets/js/spinbox.min.js"></script>
    <script src="../assets/js/bootstrap-editable.min.js"></script>
    <script src="../assets/js/ace-editable.min.js"></script>
    <script src="../assets/js/jquery.maskedinput.min.js"></script>

    <!-- ace scripts -->
    <script src="../assets/js/ace-elements.min.js"></script>
    <script src="../assets/js/ace.min.js"></script>

    <!-- inline scripts related to this page -->
    <script type="text/javascript">
        jQuery(function ($) {

            //editables on first profile page
            $.fn.editable.defaults.mode = 'inline';
            $.fn.editableform.loading = "<div class='editableform-loading'><i class='ace-icon fa fa-spinner fa-spin fa-2x light-blue'></i></div>";
            $.fn.editableform.buttons = '<button type="submit" class="btn btn-info editable-submit"><i class="ace-icon fa fa-check"></i></button>' +
                                        '<button type="button" class="btn editable-cancel"><i class="ace-icon fa fa-times"></i></button>';

            //editables 

            //text editable
            $('#username')
            .editable({
                type: 'text',
                name: 'username'
            });



            //select2 editable
            var countries = [];
            $.each({ "CA": "Canada", "IN": "India", "NL": "Netherlands", "TR": "Turkey", "US": "United States" }, function (k, v) {
                countries.push({ id: k, text: v });
            });

            var cities = [];
            cities["CA"] = [];
            $.each(["Toronto", "Ottawa", "Calgary", "Vancouver"], function (k, v) {
                cities["CA"].push({ id: v, text: v });
            });
            cities["IN"] = [];
            $.each(["Delhi", "Mumbai", "Bangalore"], function (k, v) {
                cities["IN"].push({ id: v, text: v });
            });
            cities["NL"] = [];
            $.each(["Amsterdam", "Rotterdam", "The Hague"], function (k, v) {
                cities["NL"].push({ id: v, text: v });
            });
            cities["TR"] = [];
            $.each(["Ankara", "Istanbul", "Izmir"], function (k, v) {
                cities["TR"].push({ id: v, text: v });
            });
            cities["US"] = [];
            $.each(["New York", "Miami", "Los Angeles", "Chicago", "Wysconsin"], function (k, v) {
                cities["US"].push({ id: v, text: v });
            });

            var currentValue = "NL";
            $('#country').editable({
                type: 'select2',
                value: 'NL',
                //onblur:'ignore',
                source: countries,
                select2: {
                    'width': 140
                },
                success: function (response, newValue) {
                    if (currentValue == newValue) return;
                    currentValue = newValue;

                    var new_source = (!newValue || newValue == "") ? [] : cities[newValue];

                    //the destroy method is causing errors in x-editable v1.4.6+
                    //it worked fine in v1.4.5
                    /**			
                    $('#city').editable('destroy').editable({
                        type: 'select2',
                        source: new_source
                    }).editable('setValue', null);
                    */

                    //so we remove it altogether and create a new element
                    var city = $('#city').removeAttr('id').get(0);
                    $(city).clone().attr('id', 'city').text('Select City').editable({
                        type: 'select2',
                        value: null,
                        //onblur:'ignore',
                        source: new_source,
                        select2: {
                            'width': 140
                        }
                    }).insertAfter(city);//insert it after previous instance
                    $(city).remove();//remove previous instance

                }
            });

            $('#city').editable({
                type: 'select2',
                value: 'Amsterdam',
                //onblur:'ignore',
                source: cities[currentValue],
                select2: {
                    'width': 140
                }
            });



            //custom date editable
            $('#signup').editable({
                type: 'adate',
                date: {
                    //datepicker plugin options
                    format: 'yyyy/mm/dd',
                    viewformat: 'yyyy/mm/dd',
                    weekStart: 1

                    //,nativeUI: true//if true and browser support input[type=date], native browser control will be used
                    //,format: 'yyyy-mm-dd',
                    //viewformat: 'yyyy-mm-dd'
                }
            })

            $('#age').editable({
                type: 'spinner',
                name: 'age',
                spinner: {
                    min: 16,
                    max: 99,
                    step: 1,
                    on_sides: true
                    //,nativeUI: true//if true and browser support input[type=number], native browser control will be used
                }
            });


            $('#login').editable({
                type: 'slider',
                name: 'login',

                slider: {
                    min: 1,
                    max: 50,
                    width: 100
                    //,nativeUI: true//if true and browser support input[type=range], native browser control will be used
                },
                success: function (response, newValue) {
                    if (parseInt(newValue) == 1)
                        $(this).html(newValue + " hour ago");
                    else $(this).html(newValue + " hours ago");
                }
            });

            $('#about').editable({
                mode: 'inline',
                type: 'wysiwyg',
                name: 'about',

                wysiwyg: {
                    //css : {'max-width':'300px'}
                },
                success: function (response, newValue) {
                }
            });



            // *** editable avatar *** //
            try {//ie8 throws some harmless exceptions, so let's catch'em

                //first let's add a fake appendChild method for Image element for browsers that have a problem with this
                //because editable plugin calls appendChild, and it causes errors on IE at unpredicted points
                try {
                    document.createElement('IMG').appendChild(document.createElement('B'));
                } catch (e) {
                    Image.prototype.appendChild = function (el) { }
                }

                var last_gritter
                $('#avatar').editable({
                    type: 'image',
                    name: 'avatar',
                    value: null,
                    //onblur: 'ignore',  //don't reset or hide editable onblur?!
                    image: {
                        //specify ace file input plugin's options here
                        btn_choose: 'Change Avatar',
                        droppable: true,
                        maxSize: 110000,//~100Kb

                        //and a few extra ones here
                        name: 'avatar',//put the field name here as well, will be used inside the custom plugin
                        on_error: function (error_type) {//on_error function will be called when the selected file has a problem
                            if (last_gritter) $.gritter.remove(last_gritter);
                            if (error_type == 1) {//file format error
                                last_gritter = $.gritter.add({
                                    title: 'File is not an image!',
                                    text: 'Please choose a jpg|gif|png image!',
                                    class_name: 'gritter-error gritter-center'
                                });
                            } else if (error_type == 2) {//file size rror
                                last_gritter = $.gritter.add({
                                    title: 'File too big!',
                                    text: 'Image size should not exceed 100Kb!',
                                    class_name: 'gritter-error gritter-center'
                                });
                            }
                            else {//other error
                            }
                        },
                        on_success: function () {
                            $.gritter.removeAll();
                        }
                    },
                    url: function (params) {
                        // ***UPDATE AVATAR HERE*** //
                        //for a working upload example you can replace the contents of this function with 
                        //examples/profile-avatar-update.js

                        var deferred = new $.Deferred

                        var value = $('#avatar').next().find('input[type=hidden]:eq(0)').val();
                        if (!value || value.length == 0) {
                            deferred.resolve();
                            return deferred.promise();
                        }


                        //dummy upload
                        setTimeout(function () {
                            if ("FileReader" in window) {
                                //for browsers that have a thumbnail of selected image
                                var thumb = $('#avatar').next().find('img').data('thumb');
                                if (thumb) $('#avatar').get(0).src = thumb;
                            }

                            deferred.resolve({ 'status': 'OK' });

                            if (last_gritter) $.gritter.remove(last_gritter);
                            last_gritter = $.gritter.add({
                                title: 'Avatar Updated!',
                                text: 'Uploading to server can be easily implemented. A working example is included with the template.',
                                class_name: 'gritter-info gritter-center'
                            });

                        }, parseInt(Math.random() * 800 + 800))

                        return deferred.promise();

                        // ***END OF UPDATE AVATAR HERE*** //
                    },

                    success: function (response, newValue) {
                    }
                })
            } catch (e) { }

            /**
            //let's display edit mode by default?
            var blank_image = true;//somehow you determine if image is initially blank or not, or you just want to display file input at first
            if(blank_image) {
                $('#avatar').editable('show').on('hidden', function(e, reason) {
                    if(reason == 'onblur') {
                        $('#avatar').editable('show');
                        return;
                    }
                    $('#avatar').off('hidden');
                })
            }
            */

            //another option is using modals
            //<div><input type="file" id="User" onchange="Attachments(this,"User")" /></div>\
            //$('#avatar2').on('click', function () {
            $('.avatar2').on('click', function () {
                var modal =
                '<div class="modal fade">\
					  <div class="modal-dialog">\
					   <div class="modal-content">\
						<div class="modal-header">\
							<button type="button" class="close" data-dismiss="modal">&times;</button>\
							<h4 class="blue">Change Photo</h4>\
						</div>\
						\
						<form class="no-margin">\
						 <div class="modal-body">\
							<div class="space-4"></div>\
							<div style="width:75%;margin-left:12%;"><input type="file" name="file-input" id="User" onchange="Attachments(this)" /></div>\
                            <input type="hidden" id="UserPhotoSource" value="" class="PhotoSource" />\
                            <input type="hidden" id="UserFileName" value="" class="PhotoName" />\
						 </div>\
						\
						 <div class="modal-footer center">\
							<button type="button" id="btnChange" class="btn btn-sm btn-success"><i class="ace-icon fa fa-check"></i>Change</button>\
							<button type="button"  id="btncancel" class="btn btn-sm" data-dismiss="modal"><i class="ace-icon fa fa-times"></i> Cancel</button>\
						 </div>\
						</form>\
					  </div>\
					 </div>\
					</div>';


                var modal = $(modal);
                modal.modal("show").on("hidden", function () {
                    modal.remove();
                });

                var working = false;

                var form = modal.find('form:eq(0)');
                var file = form.find('input[type=file]').eq(0);
                file.ace_file_input({
                    style: 'well',
                    btn_choose: 'Click to choose new License',
                    btn_change: null,
                    no_icon: 'ace-icon fa fa-picture-o',
                    thumbnail: 'small',
                    before_remove: function () {
                        //don't remove/reset files while being uploaded
                        return !working;
                    },
                    allowExt: ['jpg', 'jpeg', 'png', 'gif', 'pdf'],
                    allowMime: ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/pdf']
                });

                form.on('submit', function () {
                    if (!file.data('ace_input_files')) return false;

                    file.ace_file_input('disable');
                    form.find('button').attr('disabled', 'disabled');
                    form.find('.modal-body').append("<div class='center'><i class='ace-icon fa fa-spinner fa-spin bigger-150 orange'></i></div>");

                    var deferred = new $.Deferred;
                    working = true;
                    deferred.done(function () {
                        form.find('button').removeAttr('disabled');
                        form.find('input[type=file]').ace_file_input('enable');
                        form.find('.modal-body > :last-child').remove();

                        modal.modal("hide");

                        var thumb = file.next().find('img').data('thumb');
                        if (thumb) $('#avatar2').get(0).src = thumb;

                        working = false;
                    });


                    setTimeout(function () {
                        deferred.resolve();
                    }, parseInt(Math.random() * 800 + 800));

                    return false;
                });

            });



            //////////////////////////////
            $('#profile-feed-1').ace_scroll({
                height: '250px',
                mouseWheelLock: true,
                alwaysVisible: true
            });

            $('a[ data-original-title]').tooltip();

            $('.easy-pie-chart.percentage').each(function () {
                var barColor = $(this).data('color') || '#555';
                var trackColor = '#E2E2E2';
                var size = parseInt($(this).data('size')) || 72;
                $(this).easyPieChart({
                    barColor: barColor,
                    trackColor: trackColor,
                    scaleColor: false,
                    lineCap: 'butt',
                    lineWidth: parseInt(size / 10),
                    animate: false,
                    size: size
                }).css('color', barColor);
            });

            ///////////////////////////////////////////

            //right & left position
            //show the user info on right or left depending on its position
            $('#user-profile-2 .memberdiv').on('mouseenter touchstart', function () {
                var $this = $(this);
                var $parent = $this.closest('.tab-pane');

                var off1 = $parent.offset();
                var w1 = $parent.width();

                var off2 = $this.offset();
                var w2 = $this.width();

                var place = 'left';
                if (parseInt(off2.left) < parseInt(off1.left) + parseInt(w1 / 2)) place = 'right';

                $this.find('.popover').removeClass('right left').addClass(place);
            }).on('click', function (e) {
                e.preventDefault();
            });


            ///////////////////////////////////////////
            $('#user-profile-3')
            .find('input[type=file]').ace_file_input({
                style: 'well',
                btn_choose: 'Change avatar',
                btn_change: null,
                no_icon: 'ace-icon fa fa-picture-o',
                thumbnail: 'large',
                droppable: true,

                allowExt: ['jpg', 'jpeg', 'png', 'gif'],
                allowMime: ['image/jpg', 'image/jpeg', 'image/png', 'image/gif']
            })
            .end().find('button[type=reset]').on(ace.click_event, function () {
                $('#user-profile-3 input[type=file]').ace_file_input('reset_input');
            })
            .end().find('.date-picker').datepicker().next().on(ace.click_event, function () {
                $(this).prev().focus();
            })
            $('.input-mask-phone').mask('(999) 999-9999');

            $('#user-profile-3').find('input[type=file]').ace_file_input('show_file_list', [{ type: 'image', name: $('#avatar').attr('src') }]);


            ////////////////////
            //change profile
            $('[data-toggle="buttons"] .btn').on('click', function (e) {
                var target = $(this).find('input[type=radio]');
                var which = parseInt(target.val());
                $('.user-profile').parent().addClass('hide');
                $('#user-profile-' + which).parent().removeClass('hide');
            });



            /////////////////////////////////////
            $(document).one('ajaxloadstart.page', function (e) {
                //in ajax mode, remove remaining elements before leaving page
                try {
                    $('.editable').editable('destroy');
                } catch (e) { }
                $('[class*=select2]').remove();
            });
        });
    </script>

    <link href="../css/jquery-ui.css" rel="stylesheet" />
    <script src="../Js/jquery-ui.js"></script>
    <script type="text/javascript">
        $('#txtdob').datepicker({
            dateFormat: 'dd-mm-yy'
        });
        //$('#txtGSTPayerDOB').datepicker({
        //    dateFormat: 'dd-mm-yy'
        //});
    </script>

</asp:Content>

