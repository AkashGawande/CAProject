<%@ Page Title="" Language="C#" MasterPageFile="~/Franchisee/FranchiseeMaster.master" AutoEventWireup="true" CodeFile="Dashboard.aspx.cs" Inherits="Franchisee_Dashboard" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <script src="../assets/js/jquery-2.1.4.min.js"></script>
    <script src="Franchisee_JS/Dashboard.js"></script>
    <style>
        .color {
            color: chocolate;
            font-family: cursive;
            font-size: 16px;
            font-weight: bold;
        }



        
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">


   <div>
        <div class="breadcrumbs ace-save-state" id="breadcrumbs">

            <ul class="breadcrumb">               
                <li class="active"><i class="ace-icon fa fa-home home-icon"></i><a href="#">Dashboard</a></li>
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

        <div class="page-header">
            <h1>Dashboard
								<small>
                                    <i class="ace-icon fa fa-angle-double-right"></i>
                                    overview &amp; stats
                                </small>
            </h1>
        </div>

       <div class="row">
           <div class="col-lg-12 col-md-12 col-sm-12" style="width:100%;">
               <div class="form-group">
                   <label class="control-label col-sm-2 color" >Employee ID</label>
                   <div class="col-lg-3 col-md-3 col-sm-3">
                       <select name="ddaugender" id="ddlEmployeeID" class="validate[required] form-control">
                       </select>
                   </div>
                   <label class="control-label col-sm-2 color" >Employee Name</label>
                   <div class="col-lg-5 col-md-5 col-sm-5">
                       <select name="ddaugender" id="ddlEmployeeName" class="validate[required] form-control">
                       </select>
                   </div>
               </div>
           </div>
       </div>

        <div class="row">
            <div class="space-10"></div>

            <div class="col-sm-4 infobox-container">
                <div class="infobox infobox-green" style="width: 100%;">
                    <div class="infobox-icon">
                        <i class="ace-icon fa fa-users"></i>
                    </div>

                    <div class="infobox-data" style="text-align: center;">
                        <span class="infobox-text">Registered Clients</span>
                        <div class="infobox-content">comments + 2 reviews</div>
                    </div>
                    <div class="badge badge-success" style="margin-top: 5px; width: 35px; height: 35px; border-radius: 15px; font-size: 13px;background-color:#9ABC32;">
                        <label id="ClientCount" style="font-weight:bold;margin-top: 9px;"></label>
                    </div>
                </div>
            </div>

            <div class="col-sm-4 infobox-container">
                <div class="infobox infobox-blue" style="width: 100%;">
                    <div class="infobox-icon">
                        <i class="ace-icon fa fa-percent"></i>
                    </div>

                    <div class="infobox-data">
                        <span class="infobox-text">Income Tax Files</span>
                        <div class="infobox-content">new followers</div>
                    </div>

                    <div class="badge badge-info" style="margin-top: 5px; width: 35px; height: 35px; border-radius: 15px; font-size: 13px;background-color:#6FB3E0;">
                        
                        <label id="ITFileCount" style="font-weight:bold;margin-top: 9px;"></label>

                    </div>

                </div>
            </div>

            <div class="col-sm-4 infobox-container">
                <div class="infobox infobox-pink" style="width: 100%;">
                    <div class="infobox-icon">
                        <i class="ace-icon fa fa-percent"></i>
                    </div>

                    <div class="infobox-data">
                        
                        <span class="infobox-text">TDS Files</span>
                        <div class="infobox-content">new orders</div>
                    </div>
                   <div class="badge badge-success" style="margin-top: 5px; width: 35px; height: 35px; border-radius: 15px; font-size: 13px;    background-color: #CB6FD7;">
                       <label id="TDSFileCount" style="font-weight:bold;margin-top: 9px;"></label>
                    </div>
                </div>
            </div>

        </div>

        <div class="row">
            <div class="space-10"></div>

            <div class="col-sm-4 infobox-container">
                <div class="infobox infobox-red" style="width: 100%;">
                    <div class="infobox-icon">
                        <i class="ace-icon fa fa-user"></i>
                    </div>

                    <div class="infobox-data">
                       <span class="infobox-text">GST Registrations</span>
                        <div class="infobox-content">experiments</div>
                    </div>
                    <div class="badge badge-success" style="margin-top: 5px;width: 35px; height: 35px; border-radius: 15px; font-size: 13px;background-color:#D53F40;">
                        <label id="GSTRegCount" style="font-weight:bold;margin-top: 9px;"></label>
                    </div>
                </div>
            </div>

            <div class="col-sm-4 infobox-container">
                <div class="infobox infobox-orange2" style="width: 100%;">
                   
                    <div class="infobox-icon">
                        <i class="ace-icon fa fa-percent"></i>
                    </div>

                    <div class="infobox-data">
                        <span class="infobox-text">GST Return Files</span>
                        <div class="infobox-content">pageviews</div>
                    </div>

                    <div class="badge badge-success" style="margin-top: 5px; width: 35px; height: 35px; border-radius: 15px; font-size: 13px;background-color:#F79263;">
                        <label id="GSTreturnFileCount" style="font-weight:bold;margin-top: 9px;"></label>
                    </div>
                    
                </div>
            </div>

            <div class="col-sm-4 infobox-container">
                <div class="infobox infobox-blue2" style="width: 100%;">
                    
                    <div class="infobox-icon">
                        <i class="ace-icon fa fa-percent"></i>
                    </div>

                    <div class="infobox-data">
                        <span class="infobox-text">IT Notice Compliance</span>
                        <div class="infobox-content">
                            <span class="bigger-110">~</span>
                            58GB remaining
                        </div>
                    </div>

                    <div class="badge badge-success" style="margin-top: 5px; width: 35px; height: 35px; border-radius: 15px; font-size: 13px;background-color:#3983C2;">
                        <label id="ITNoticeCount" style="font-weight:bold;margin-top: 9px;"></label>
                    </div>
                </div>
            </div>

        </div>

        <div class="row" >
            <div class="space-6"></div>
            <div class="col-lg-12 col-md-12 col-sm-12" style="width: 100%;">
                <div class="widget-box">
                    <div class="widget-header widget-header-flat widget-header-small">
                        <h5 class="widget-title">
                            <i class="ace-icon fa fa-signal"></i>
                            Overviews
                        </h5>

                        
                    </div>

                    <div class="widget-body">
                        <div class="widget-main">
                            <div class="row">
                                <div class="col-sm-10">
                                    <div id="piechart-placeholder"></div>
                                </div>
                                <%--<div class="col-sm-3">
                                    
                                </div>--%>
                            </div>
                            <div class="hr hr8 hr-double"></div>

                            <div class="clearfix">
                                <div class="grid3">
                                    <span class="grey">
                                        <i class="ace-icon fa fa-facebook-square fa-2x blue"></i>
                                        &nbsp; likes
                                    </span>
                                    <h4 class="bigger pull-right">1,255</h4>
                                </div>

                                <div class="grid3">
                                    <span class="grey">
                                        <i class="ace-icon fa fa-twitter-square fa-2x purple"></i>
                                        &nbsp; tweets
                                    </span>
                                    <h4 class="bigger pull-right">941</h4>
                                </div>

                                <div class="grid3">
                                    <span class="grey">
                                        <i class="ace-icon fa fa-pinterest-square fa-2x red"></i>
                                        &nbsp; pins
                                    </span>
                                    <h4 class="bigger pull-right">1,050</h4>
                                </div>
                            </div>
                        </div>
                        <!-- /.widget-main -->
                    </div>
                    <!-- /.widget-body -->
                </div>
                <!-- /.widget-box -->
            </div>
        </div>

        
    </div>

    <div>
        <script src="../assets/js/bootstrap.min.js"></script>
        <script src="../assets/js/jquery-ui.custom.min.js"></script>
        <script src="../assets/js/jquery.ui.touch-punch.min.js"></script>
        <script src="../assets/js/jquery.easypiechart.min.js"></script>
        <script src="../assets/js/jquery.sparkline.index.min.js"></script>
        <script src="../assets/js/jquery.flot.min.js"></script>
        <script src="../assets/js/jquery.flot.pie.min.js"></script>
        <script src="../assets/js/jquery.flot.resize.min.js"></script>

        <!-- ace scripts -->
        <script src="../assets/js/ace-elements.min.js"></script>
        <script src="../assets/js/ace.min.js"></script>

        <!-- inline scripts related to this page -->
        <script type="text/javascript">
            jQuery(function ($) {
                $('.easy-pie-chart.percentage').each(function () {
                    var $box = $(this).closest('.infobox');
                    var barColor = $(this).data('color') || (!$box.hasClass('infobox-dark') ? $box.css('color') : 'rgba(255,255,255,0.95)');
                    var trackColor = barColor == 'rgba(255,255,255,0.95)' ? 'rgba(255,255,255,0.25)' : '#E2E2E2';
                    var size = parseInt($(this).data('size')) || 50;
                    $(this).easyPieChart({
                        barColor: barColor,
                        trackColor: trackColor,
                        scaleColor: false,
                        lineCap: 'butt',
                        lineWidth: parseInt(size / 10),
                        animate: ace.vars['old_ie'] ? false : 1000,
                        size: size
                    });
                })

                $('.sparkline').each(function () {
                    var $box = $(this).closest('.infobox');
                    var barColor = !$box.hasClass('infobox-dark') ? $box.css('color') : '#FFF';
                    $(this).sparkline('html',
									 {
									     tagValuesAttribute: 'data-values',
									     type: 'bar',
									     barColor: barColor,
									     chartRangeMin: $(this).data('min') || 0
									 });
                });


                //flot chart resize plugin, somehow manipulates default browser resize event to optimize it!
                //but sometimes it brings up errors with normal resize event handlers
                $.resize.throttleWindow = false;

                var placeholder = $('#piechart-placeholder').css({ 'width': '100%', 'min-height': '235px' });

                ////var data=[]
                //var data = [
			    //{ label: "Clients Registrations", data: 30.7, color: "#9ABC32" },
			    //{ label: "GST Registrations", data: 24.5, color: "#D53F40" },
			    //{ label: "Income Tax Files", data: 8.2, color: "#6FB3E0" },
			    //{ label: "TDS Files", data: 18.6, color: "#CB6FD7" },
			    //{ label: "GST Return Files", data: 10, color: "#F79263" },
			    //{ label: "IT Notice Compliance", data: 8, color: "#3983C2" }
                //]
                //function drawPieChart(placeholder, data, position) {
                //    $.plot(placeholder, data, {
                //        series: {
                //            pie: {
                //                show: true,
                //                tilt: 0.8,
                //                highlight: {
                //                    opacity: 0.25
                //                },
                //                stroke: {
                //                    color: '#fff',
                //                    width: 2
                //                },
                //                startAngle: 2
                //            }
                //        },
                //        legend: {
                //            show: true,
                //            position: position || "ne",
                //            labelBoxBorderColor: null,
                //            margin: [-30, 15]
                //        }
                //      ,
                //        grid: {
                //            hoverable: true,
                //            clickable: true
                //        }
                //    })
                //}
                //drawPieChart(placeholder, data);

                ///**
                //we saved the drawing function and the data to redraw with different position later when switching to RTL mode dynamically
                //so that's not needed actually.
                //*/
                //placeholder.data('chart', data);
                //placeholder.data('draw', drawPieChart);


                //pie chart tooltip example
                var $tooltip = $("<div class='tooltip top in'><div class='tooltip-inner'></div></div>").hide().appendTo('body');
                var previousPoint = null;

                placeholder.on('plothover', function (event, pos, item) {
                    if (item) {
                        if (previousPoint != item.seriesIndex) {
                            previousPoint = item.seriesIndex;
                            var tip = item.series['label'] + " : " + item.series['percent'] + '%';
                            $tooltip.show().children(0).text(tip);
                        }
                        $tooltip.css({ top: pos.pageY + 10, left: pos.pageX + 10 });
                    } else {
                        $tooltip.hide();
                        previousPoint = null;
                    }

                });

                /////////////////////////////////////
                $(document).one('ajaxloadstart.page', function (e) {
                    $tooltip.remove();
                });




                var d1 = [];
                for (var i = 0; i < Math.PI * 2; i += 0.5) {
                    d1.push([i, Math.sin(i)]);
                }

                var d2 = [];
                for (var i = 0; i < Math.PI * 2; i += 0.5) {
                    d2.push([i, Math.cos(i)]);
                }

                var d3 = [];
                for (var i = 0; i < Math.PI * 2; i += 0.2) {
                    d3.push([i, Math.tan(i)]);
                }


                var sales_charts = $('#sales-charts').css({ 'width': '100%', 'height': '220px' });
                $.plot("#sales-charts", [
					{ label: "Domains", data: d1 },
					{ label: "Hosting", data: d2 },
					{ label: "Services", data: d3 }
                ], {
                    hoverable: true,
                    shadowSize: 0,
                    series: {
                        lines: { show: true },
                        points: { show: true }
                    },
                    xaxis: {
                        tickLength: 0
                    },
                    yaxis: {
                        ticks: 10,
                        min: -2,
                        max: 2,
                        tickDecimals: 3
                    },
                    grid: {
                        backgroundColor: { colors: ["#fff", "#fff"] },
                        borderWidth: 1,
                        borderColor: '#555'
                    }
                });


                $('#recent-box [data-rel="tooltip"]').tooltip({ placement: tooltip_placement });
                function tooltip_placement(context, source) {
                    var $source = $(source);
                    var $parent = $source.closest('.tab-content')
                    var off1 = $parent.offset();
                    var w1 = $parent.width();

                    var off2 = $source.offset();
                    //var w2 = $source.width();

                    if (parseInt(off2.left) < parseInt(off1.left) + parseInt(w1 / 2)) return 'right';
                    return 'left';
                }


                $('.dialogs,.comments').ace_scroll({
                    size: 300
                });


                //Android's default browser somehow is confused when tapping on label which will lead to dragging the task
                //so disable dragging when clicking on label
                var agent = navigator.userAgent.toLowerCase();
                if (ace.vars['touch'] && ace.vars['android']) {
                    $('#tasks').on('touchstart', function (e) {
                        var li = $(e.target).closest('#tasks li');
                        if (li.length == 0) return;
                        var label = li.find('label.inline').get(0);
                        if (label == e.target || $.contains(label, e.target)) e.stopImmediatePropagation();
                    });
                }

                $('#tasks').sortable({
                    opacity: 0.8,
                    revert: true,
                    forceHelperSize: true,
                    placeholder: 'draggable-placeholder',
                    forcePlaceholderSize: true,
                    tolerance: 'pointer',
                    stop: function (event, ui) {
                        //just for Chrome!!!! so that dropdowns on items don't appear below other items after being moved
                        $(ui.item).css('z-index', 'auto');
                    }
                }
				);
                $('#tasks').disableSelection();
                $('#tasks input:checkbox').removeAttr('checked').on('click', function () {
                    if (this.checked) $(this).closest('li').addClass('selected');
                    else $(this).closest('li').removeClass('selected');
                });


                //show the dropdowns on top or bottom depending on window height and menu position
                $('#task-tab .dropdown-hover').on('mouseenter', function (e) {
                    var offset = $(this).offset();

                    var $w = $(window)
                    if (offset.top > $w.scrollTop() + $w.innerHeight() - 100)
                        $(this).addClass('dropup');
                    else $(this).removeClass('dropup');
                });

            })
        </script>
    </div>
</asp:Content>

