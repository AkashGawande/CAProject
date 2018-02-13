$(document).ready(function () {

    ActiveClass("Dashboard");

    BindEmployeeID($("#ddlEmployeeID"));
    BindEmployeeName($("#ddlEmployeeName"));
    CallMethods("0");

    //$('#week').click(function () {
    //    alert('Hello');
    //});

    //===================================Start On Change Event=============================
    $('#ddlEmployeeID').change(function () {
        $('#ddlEmployeeName').val($('#ddlEmployeeID').val());       
        CallMethods($('#ddlEmployeeID').val());
    });

    $('#ddlEmployeeName').change(function () {
        $('#ddlEmployeeID').val($('#ddlEmployeeName').val());       
        CallMethods($('#ddlEmployeeName').val());
    });
    //===================================End On Change Event=============================





});


function CallMethods(ID)
{
    getClientRegCount(ID);
    getITFilesCount(ID);
    getTDSFilesCount(ID);
    getGSTRegFilesCount(ID);
    getGSTReturnFilesCount(ID);
    getITNoticeFilesCount(ID);
    Chart(ID);
}


//===================================Start Bind EmpolyeeID Drop Down=============================
function BindEmployeeID(dept) {
    $.ajax({
        type: "POST",
        url: "Dashboard.aspx/BindEmployeeID",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            console.log(r);
            //var dept = $("#ddlEmployeeID");
            dept.empty().append('<option selected="selected" value="0">--Select--</option>');
            $.each(r.d, function (key, value) {
                dept.append($("<option></option>").val(value.EmployeeID).text(value.EmployeeID));
            });
        }
    });
}
//===================================End Bind EmpolyeeID Drop Down=============================

//===================================Start Bind EmpolyeeID Drop Down=============================
function BindEmployeeName(dept) {
    $.ajax({
        type: "POST",
        url: "Dashboard.aspx/BindEmployeeID",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            console.log(r);
            //var dept = $("#ddlEmployeeName");
            dept.empty().append('<option selected="selected" value="0">--Select--</option>');
            $.each(r.d, function (key, value) {
                dept.append($("<option></option>").val(value.EmployeeID).text(value.EmployeeName));
            });
        }
    });
}
//==============================End Bind EmpolyeeID Drop Down=============================


//======================================Start Function Get Client Registration Count===============================
function getClientRegCount(StaffId)
{
    
    var data = '{StaffId:"' + StaffId + '"}';
    $.ajax({
        type: "POST",
        url: "Dashboard.aspx/GetClientRegCount",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            console.log(r);
            $('#ClientCount').text(r.d);
        }
    });
}
//======================================End Function Get Client Registration Count===============================

//======================================Start Function Get IT Files Count===============================
function getITFilesCount(StaffId) {
    var data = '{StaffId:"' + StaffId + '"}';
    $.ajax({
        type: "POST",
        url: "Dashboard.aspx/GetITFilesCount",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            console.log(r);
            $('#ITFileCount').text(r.d);
        }
    });
}
//======================================End Function Get IT Files Count===============================

//======================================Start Function Get TDS Files Count===============================
function getTDSFilesCount(StaffId) {
    var data = '{StaffId:"' + StaffId + '"}';
    $.ajax({
        type: "POST",
        url: "Dashboard.aspx/GetTDSFilesCount",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            console.log(r);
            $('#TDSFileCount').text(r.d);
        }
    });
}
//======================================End Function Get TDS Files Count===============================

//======================================Start Function Get GSTReg Files Count===============================
function getGSTRegFilesCount(StaffId) {
    var data = '{StaffId:"' + StaffId + '"}';
    $.ajax({
        type: "POST",
        url: "Dashboard.aspx/GetGSTRegFilesCount",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            console.log(r);
            $('#GSTRegCount').text(r.d);
        }
    });
}
//======================================End Function Get GSTReg Files Count===============================

//======================================Start Function Get GSTReturn Files Count===============================
function getGSTReturnFilesCount(StaffId) {
    var data = '{StaffId:"' + StaffId + '"}';
    $.ajax({
        type: "POST",
        url: "Dashboard.aspx/GetGSTReturnFilesCount",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            console.log(r);
            $('#GSTreturnFileCount').text(r.d);
        }
    });
}
//======================================End Function Get GSTReturn Files Count===============================

//======================================Start Function Get GSTReturn Files Count===============================
function getITNoticeFilesCount(StaffId) {
    var data = '{StaffId:"' + StaffId + '"}';
    $.ajax({
        type: "POST",
        url: "Dashboard.aspx/GetITNoticeFilesCount",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            console.log(r);
            $('#ITNoticeCount').text(r.d);
        }
    });
}
//======================================End Function Get GSTReturn Files Count===============================

function Chart(StaffId)
{
    var data = '{StaffId:"' + StaffId + '"}';
    $.ajax({
        type: "POST",
        url: "Dashboard.aspx/DrawChart",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            console.log(r);
            $.each(r.d, function (key, value) {

                DrawChart(value.ClientCount, value.ITCount, value.TDSCount, value.GSTREgCount, value.GSTReturnCount, value.ITNoticeCount);
            });
        }
    });
}


function DrawChart(client,IT,TDS,GSTReg,GSTreturn,ITNotice)
{
   
    var clientreg = parseFloat(client);
    var gstreg = parseFloat(GSTReg);
    var ITFiles = parseFloat(IT);
    var TDSFile = parseFloat(TDS);
    var GSTReturn = parseFloat(GSTreturn);
    var ITNotice = parseFloat(ITNotice);
    
    //var value = parseFloat(100 / (clientreg + gstreg + ITFiles + TDSFile + GSTReturn + ITNotice)).toFixed(2);

    if (clientreg == 0 && gstreg == 0 && ITFiles == 0 && TDSFile == 0 && GSTReturn == 0 && ITNotice == 0) {
        var value = parseFloat(100 / (clientreg + gstreg + ITFiles + TDSFile + GSTReturn + ITNotice));
        var data = [
   { label: "No Data Found", data: 100, color: "#C8C8C8" },

        ]
    }
    else {
        var value = parseFloat(100 / (clientreg + gstreg + ITFiles + TDSFile + GSTReturn + ITNotice));
        var data = [
   { label: "Clients Registrations", data: (clientreg * value).toFixed(2), color: "#9ABC32" },
   { label: "GST Registrations", data: (gstreg * value), color: "#D53F40" },
   { label: "Income Tax Files", data: (ITFiles * value), color: "#6FB3E0" },
   { label: "TDS Files", data: (TDSFile * value), color: "#CB6FD7" },
   { label: "GST Return Files", data: (GSTReturn * value), color: "#F79263" },
   { label: "IT Notice Compliance", data: (ITNotice * value), color: "#3983C2" }
        ]
    }


    var placeholder = $('#piechart-placeholder').css({ 'width': '100%', 'min-height': '225px' });
    //var data=[]
    //var data = [
    //{ label: "Clients Registrations", data: (clientreg * value).toFixed(2), color: "#9ABC32" },
    //{ label: "GST Registrations", data: (gstreg * value).toFixed(2), color: "#D53F40" },
    //{ label: "Income Tax Files", data: (ITFiles * value).toFixed(2), color: "#6FB3E0" },
    //{ label: "TDS Files", data: (TDSFile * value).toFixed(2), color: "#CB6FD7" },
    //{ label: "GST Return Files", data: (GSTReturn * value).toFixed(2), color: "#F79263" },
    //{ label: "IT Notice Compliance", data: (ITNotice * value).toFixed(2), color: "#3983C2" }
    //]
    function drawPieChart(placeholder, data, position) {
        $.plot(placeholder, data, {
            series: {
                pie: {
                    show: true,
                    tilt: 0.8,
                    highlight: {
                        opacity: 0.25
                    },
                    stroke: {
                        color: '#fff',
                        width: 2
                    },
                    startAngle: 2
                }
            },
            legend: {
                show: true,
                position: position || "ne",
                labelBoxBorderColor: null,
                margin: [-30, 15]
            }
          ,
            grid: {
                hoverable: true,
                clickable: true
            }
        })
    }
    drawPieChart(placeholder, data);


    placeholder.data('chart', data);
    placeholder.data('draw', drawPieChart);



}