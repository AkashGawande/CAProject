$(document).ready(function () {
    ActiveClass("Dashboard");

    getClientRegCount();
    getITFilesCount();
    getTDSFilesCount();
    getGSTRegFilesCount();
    getGSTReturnFilesCount();
    getITNoticeFilesCount();
    Chart();

    $('#week').click(function () {
        alert('Hello');
    });
});

//======================================Start Function Get Client Registration Count===============================
function getClientRegCount()
{
    $.ajax({
        type: "POST",
        url: "Dashboard.aspx/GetClientRegCount",
        data: '{}',
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
function getITFilesCount() {
    $.ajax({
        type: "POST",
        url: "Dashboard.aspx/GetITFilesCount",
        data: '{}',
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
function getTDSFilesCount() {
    $.ajax({
        type: "POST",
        url: "Dashboard.aspx/GetTDSFilesCount",
        data: '{}',
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
function getGSTRegFilesCount() {
    $.ajax({
        type: "POST",
        url: "Dashboard.aspx/GetGSTRegFilesCount",
        data: '{}',
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
function getGSTReturnFilesCount() {
    $.ajax({
        type: "POST",
        url: "Dashboard.aspx/GetGSTReturnFilesCount",
        data: '{}',
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
function getITNoticeFilesCount() {
    $.ajax({
        type: "POST",
        url: "Dashboard.aspx/GetITNoticeFilesCount",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            console.log(r);
            $('#ITNoticeCount').text(r.d);
        }
    });
}
//======================================End Function Get GSTReturn Files Count===============================

function Chart()
{
    debugger;
    $.ajax({
        type: "POST",
        url: "Dashboard.aspx/DrawChart",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            console.log(r);
            $.each(r.d, function (key, value) {

                DrawChart(value.ClientCount, value.ITCount, value.TDSCount, value.GSTREgCount, value.GSTReturnCount, value.ITNoticeCount);
            });
        }
    });

    //var clientreg = parseFloat($('#ClientCount').text());
    //var gstreg = parseFloat($('#GSTRegCount').text());
    //var ITFiles = parseFloat($('#ITFileCount').text());
    //var TDSFile = parseFloat($('#TDSFileCount').text());
    //var GSTReturn = parseFloat($('#GSTreturnFileCount').text());
    //var ITNotice = parseFloat($('#ITNoticeCount').text());
    
}


function DrawChart(client,IT,TDS,GSTReg,GSTreturn,ITNotice)
{
    debugger;
    var clientreg = parseFloat(client);
    var gstreg = parseFloat(GSTReg);
    var ITFiles = parseFloat(IT);
    var TDSFile = parseFloat(TDS);
    var GSTReturn = parseFloat(GSTreturn);
    var ITNotice = parseFloat(ITNotice);
   // var value = parseFloat(100 / (clientreg + gstreg + ITFiles + TDSFile + GSTReturn + ITNotice));
    if (clientreg == 0 && gstreg == 0 && ITFiles == 0 && TDSFile == 0 && GSTReturn == 0 && ITNotice==0)
    {
        var value = parseFloat(100 / (clientreg + gstreg + ITFiles + TDSFile + GSTReturn + ITNotice));
        var data = [
   { label: "No Data Found", data: 100, color: "#C8C8C8" },
   
        ]
    }
    else
    {
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
   
    var placeholder = $('#piechart-placeholder').css({ 'width': '100%', 'min-height': '235px' });
    //var data=[]
    //var data = [
    //{ label: "Clients Registrations", data: (clientreg * value).toFixed(2), color: "#9ABC32" },
    //{ label: "GST Registrations", data: (gstreg * value), color: "#D53F40" },
    //{ label: "Income Tax Files", data: (ITFiles * value), color: "#6FB3E0" },
    //{ label: "TDS Files", data: (TDSFile * value), color: "#CB6FD7" },
    //{ label: "GST Return Files", data: (GSTReturn * value), color: "#F79263" },
    //{ label: "IT Notice Compliance", data: (ITNotice * value), color: "#3983C2" }
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