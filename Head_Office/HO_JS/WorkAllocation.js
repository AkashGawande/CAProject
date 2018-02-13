$(document).ready(function () {
    ActiveClass("Workallocation");


    BindFranchiseeName($('#ddlFranchiseeNameIT'), "WorkAllocation.aspx/BindFranchiseeNameIT");
    BindFranchiseeName($('#ddlFranchiseeNameTDS'), "WorkAllocation.aspx/BindFranchiseeNameTDS");

    BindFranchiseeName($('#ddlFranchiseeNameITN'), "WorkAllocation.aspx/BindFranchiseeNameITN");

    BindEmployeeName();
    GetITFiles("0");
    GetTDSFiles("0");
    GetITNoticeFiles("0");
   

    //-----------------------------------Start Get GST Tax Deductor on Firm name DDL Change------------------------------
    $('#ddlGSTType').change(function () {
        $('#chkGSTPSelectAll').prop("checked", false);
        $('#chkGSTDSelectAll').prop("checked", false);

        var GSTType = $('#ddlGSTType option:selected').val();
        if ($('#ddlGSTType option:selected').index() != 0) {
            if (GSTType == "TAX_Payer") {
                GetGSTRegTP("0", GSTType);
                $('#tblGSTRegTP').show();
                $('#tblGSTRegTD').hide();
                $('#divFranchiseeName').show();
                $('#tblGSTRegListTD tr').remove();


                BindFranchiseeName($('#ddlFranchiseeNameGST'), "WorkAllocation.aspx/BindFranchiseeNameGSTP");
            }
            else if (GSTType == "TAX_Deductor") {
                GetGSTRegTD("0", GSTType);
                $('#tblGSTRegTP').hide();
                $('#tblGSTRegListTP tr').remove();
                $('#tblGSTRegTD').show();
                $('#divFranchiseeName').show();                

                BindFranchiseeName($('#ddlFranchiseeNameGST'), "WorkAllocation.aspx/BindFranchiseeNameGSTD");
            }
        }
        else
        {
            $('#divFranchiseeName').hide();
            $('#tblGSTRegTP').hide();
            $('#tblGSTRegTD').hide();
        }
       
    });
    //-------------------------------End Get GST Tax Deductor on Firm name DDL Change----------------------------------


    //********************************************************************************************************************************
    //------------------Start btn IT Files To employee------------------------------------
    $('#btnAssignIT').click(function () {
        
        if ($('#ddlITEmployeeName option:selected').index() != 0)
        {
            var EmpName = $('#ddlITEmployeeName option:selected').text();
            var AllAttachmentIT = JSON.stringify(GetAssignITFiles());           
            if (AllAttachmentIT.length >= 3)
            {
                $("#loaderHdWork").show();
                //$("#loaderHdWork").fadeOut("slow");
               
                var data = "";
                var url = "";
                $.ajax({
                    url: 'WorkAllocation.aspx/SaveAssignedIT',
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({ 'AllAttachmentIT': AllAttachmentIT }),
                    success: function (response) {
                        if (response.d != "Record Not Added ..?") {                           
                            alert("Selected Files Assigned to " + EmpName);
                            $('#chkITSelectAll').prop("checked", false);
                            GetITFiles("0");
                            BindFranchiseeName($('#ddlFranchiseeNameIT'), "WorkAllocation.aspx/BindFranchiseeNameIT");
                            $("#loaderHdWork").hide();
                        }
                        else {
                            $("#loaderHdWork").hide();
                            alert('Failed....! Try Again.');
                        }
                    }
                });
            }
            else {
                  alert("Please Select at least one file to assign");               
            }
        }
        else
        {
            $('#ddlITEmployeeName').focus();
            alert("Select Employee Name First");
        }
        
    });
    //------------------End btn IT Files To employee------------------------------------


    //------------------Start btn TDS Files To employee------------------------------------
    $('#btnAssignTDS').click(function () {       
        if ($('#ddlTDSEmployeeName option:selected').index() != 0) {
            var EmpName = $('#ddlTDSEmployeeName option:selected').text();
            var AllAttachmentTDS = JSON.stringify(GetAssignTDSFiles());           
            if (AllAttachmentTDS.length >= 3) {
                $("#loaderHdWork").show();
                //$("#loaderHdWork").fadeOut("slow");
                
                var data = "";
                var url = "";
                $.ajax({
                    url: 'WorkAllocation.aspx/SaveAssignedTDS',
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({ 'AllAttachmentTDS': AllAttachmentTDS }),
                    success: function (response) {
                        if (response.d != "Record Not Added ..?") {
                            alert("Selected Files Assigned to " + EmpName);
                            $('#chkTDSSelectAll').prop("checked", false);
                            GetTDSFiles("0");
                            BindFranchiseeName($('#ddlFranchiseeNameTDS'), "WorkAllocation.aspx/BindFranchiseeNameTDS");
                            $("#loaderHdWork").hide();
                        }
                        else {
                            $("#loaderHdWork").hide();
                            alert('Failed....! Try Again.');
                        }
                    }
                });
            }
            else {
                alert("Please Select at least one file to assign");
            }
        }
        else {
            $('#ddlTDSEmployeeName').focus();
            alert("Select Employee Name First");
        }

    });
    //------------------End btn TDS Files To employee------------------------------------


    //------------------Start btn GST Files To employee------------------------------------
    $('#btnAssignGST').click(function () {        
        if ($('#ddlGSTEmployeeName option:selected').index() != 0) {

            if ($('#ddlGSTType option:selected').val() == "TAX_Payer")
            {
                var EmpName = $('#ddlGSTEmployeeName option:selected').text();
                var AllAttachmentGSTP = JSON.stringify(GetAssignGSTPFiles());
                if (AllAttachmentGSTP.length >= 3) {
                    $("#loaderHdWork").show();
                    //$("#loaderHdWork").fadeOut("slow");
                    
                    var data = "";
                    var url = "";
                    $.ajax({
                        url: 'WorkAllocation.aspx/SaveAssignedGST',
                        type: 'POST',
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify({ 'AllAttachmentGST': AllAttachmentGSTP }),
                        success: function (response) {
                            if (response.d != "Record Not Added ..?") {
                                alert("Selected Files Assigned to " + EmpName);
                                $('#chkGSTPSelectAll').prop("checked", false);
                                GetGSTRegTP("0");
                                BindFranchiseeName($('#ddlFranchiseeNameGST'), "WorkAllocation.aspx/BindFranchiseeNameGSTP");
                                $("#loaderHdWork").hide();
                            }
                            else {
                                $("#loaderHdWork").hide();
                                alert('Failed....! Try Again.');
                            }
                        }
                    });
                }
                else {
                    alert("Please Select at least one file to assign");
                }
            }
            else if ($('#ddlGSTType option:selected').val() == "TAX_Deductor") {
                var EmpName = $('#ddlGSTEmployeeName option:selected').text();
                    var AllAttachmentGSTD = JSON.stringify(GetAssignGSTDFiles());
                    if (AllAttachmentGSTD.length >= 3) {
                        $("#loaderHdWork").show();
                        //$("#loaderHdWork").fadeOut("slow");                        

                        var data = "";
                        var url = "";
                        $.ajax({
                            url: 'WorkAllocation.aspx/SaveAssignedGST',
                            type: 'POST',
                            dataType: 'json',
                            contentType: 'application/json; charset=utf-8',
                            data: JSON.stringify({ 'AllAttachmentGST': AllAttachmentGSTD }),
                            success: function (response) {
                                if (response.d != "Record Not Added ..?") {
                                    alert("Selected Files Assigned to " + EmpName);
                                    $('#chkGSTDSelectAll').prop("checked", false);
                                    GetGSTRegTP("0");
                                    BindFranchiseeName($('#ddlFranchiseeNameGST'), "WorkAllocation.aspx/BindFranchiseeNameGSTD");
                                    $("#loaderHdWork").hide();
                                }
                                else {
                                    $("#loaderHdWork").hide();
                                    alert('Failed....! Try Again.');
                                }
                            }
                        });
                    }
                    else {
                        alert("Please Select at least one file to assign");
                    }
                }
        }
        else {
            $('#ddlGSTEmployeeName').focus();
            alert("Select Employee Name First");
        }

    });
    //------------------End btn GST Files To employee------------------------------------


    //------------------Start btn ITN Files To employee------------------------------------
    $('#btnAssignITN').click(function () {
        
        if ($('#ddlITNEmployeeName option:selected').index() != 0) {
            var EmpName = $('#ddlITNEmployeeName option:selected').text();
            var AllAttachmentITN = JSON.stringify(GetAssignITNFiles());
            if (AllAttachmentITN.length >= 3) {
                $("#loaderHdWork").show();
                //$("#loaderHdWork").fadeOut("slow");
                
                var data = "";
                var url = "";
                $.ajax({
                    url: 'WorkAllocation.aspx/SaveAssignedITN',
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({ 'AllAttachmentITN': AllAttachmentITN }),
                    success: function (response) {
                        if (response.d != "Record Not Added ..?") {
                            alert("Selected Files Assigned to " + EmpName);
                            $('#chkITNSelectAll').prop("checked", false);
                            GetITNoticeFiles("0");
                            BindFranchiseeName($('#ddlFranchiseeNameITN'), "WorkAllocation.aspx/BindFranchiseeNameITN");
                            $("#loaderHdWork").hide();
                        }
                        else {
                            $("#loaderHdWork").hide();
                            alert('Failed....! Try Again.');
                        }
                    }
                });
            }
            else {
                alert("Please Select at least one file to assign");
            }
        }
        else {
            $('#ddlITNEmployeeName').focus();
            alert("Select Employee Name First");
        }

    });
    //------------------End btn ITN Files To employee------------------------------------
   
    //------------------Start IT Select All Checkboxes------------------------------------
    $('#chkITSelectAll').change(function () {        
        if ($("#chkITSelectAll").is(":checked")) {
            $('tr.IT-data').each(function () {                
                $(this).find(".ITAssign").prop("checked",true);
            });
        } else {
            $('tr.IT-data').each(function () {
                $(this).find(".ITAssign").prop("checked", false);
            });
        }

       
    });
    //------------------End IT Select All Checkboxes------------------------------------

    //------------------Start TDS Select All Checkboxes------------------------------------
    $('#chkTDSSelectAll').change(function () {
        if ($("#chkTDSSelectAll").is(":checked")) {
            $('tr.TDS-data').each(function () {
                $(this).find(".TDSAssign").prop("checked", true);
            });
        } else {
            $('tr.TDS-data').each(function () {
                $(this).find(".TDSAssign").prop("checked", false);
            });
        }


    });
    //------------------End TDS Select All Checkboxes------------------------------------

    //------------------Start GSTP Select All Checkboxes------------------------------------
    $('#chkGSTPSelectAll').change(function () {
        if ($("#chkGSTPSelectAll").is(":checked")) {
            $('tr.GSTP-data').each(function () {
                $(this).find(".GSTPAssign").prop("checked", true);
            });
        } else {
            $('tr.GSTP-data').each(function () {
                $(this).find(".GSTPAssign").prop("checked", false);
            });
        }


    });
    //------------------End GSTP Select All Checkboxes------------------------------------

    //------------------Start GSTD Select All Checkboxes------------------------------------
    $('#chkGSTDSelectAll').change(function () {
        if ($("#chkGSTDSelectAll").is(":checked")) {
            $('tr.GSTD-data').each(function () {
                $(this).find(".GSTDAssign").prop("checked", true);
            });
        } else {
            $('tr.GSTD-data').each(function () {
                $(this).find(".GSTDAssign").prop("checked", false);
            });
        }


    });
    //------------------End GSTD Select All Checkboxes------------------------------------

    //------------------Start ITN Select All Checkboxes------------------------------------
    $('#chkITNSelectAll').change(function () {
        if ($("#chkITNSelectAll").is(":checked")) {
            $('tr.ITN-data').each(function () {
                $(this).find(".ITNAssign").prop("checked", true);
            });
        } else {
            $('tr.ITN-data').each(function () {
                $(this).find(".ITNAssign").prop("checked", false);
            });
        }


    });
    //------------------End ITN Select All Checkboxes------------------------------------

    //------------------Start Get IT Data On Franchisee dropdown------------------------------------
    $('#ddlFranchiseeNameIT').change(function () {
        GetITFiles($('#ddlFranchiseeNameIT').val());
    });
    //------------------End Get IT Data On Franchisee dropdown------------------------------------

    //------------------Start Get TDS Data On Franchisee dropdown------------------------------------
    $('#ddlFranchiseeNameTDS').change(function () {
        GetTDSFiles($('#ddlFranchiseeNameTDS').val());
    });
    //------------------End Get TDS Data On Franchisee dropdown------------------------------------

    //------------------Start Get TDS Data On Franchisee dropdown------------------------------------
    $('#ddlFranchiseeNameGST').change(function () {
        if ($('#ddlGSTType').val() == "TAX_Payer") {
            GetGSTRegTP($('#ddlFranchiseeNameGST').val(), "TAX_Payer");
        } else if ($('#ddlGSTType').val() == "TAX_Deductor") {
            GetGSTRegTD($('#ddlFranchiseeNameGST').val(), "TAX_Deductor");
        } else {

        }

        
    });
    //------------------End Get TDS Data On Franchisee dropdown------------------------------------

    //------------------Start Get ITN Data On Franchisee dropdown------------------------------------
    $('#ddlFranchiseeNameITN').change(function () {
        GetITNoticeFiles($('#ddlFranchiseeNameITN').val());
    });
    //------------------End Get ITN Data On Franchisee dropdown------------------------------------

    //********************************************************************************************************************************

});

//------------------Start IT Select All Validations------------------------------------
$(document).on('click', '#chkITAssign', function () {
    $('tr.IT-data').each(function () {
        if ($(this).find(".ITAssign").is(":checked")) {
            $('#chkITSelectAll').prop("checked", true);
        } else {
            $('#chkITSelectAll').prop("checked", false);
            return false;
        }        
    });
});
//------------------End IT Select All Validations------------------------------------
//------------------Start TDS Select All Validations------------------------------------
$(document).on('click', '#chkTDSAssign', function () {
    $('tr.TDS-data').each(function () {
        if ($(this).find(".TDSAssign").is(":checked")) {
            $('#chkTDSSelectAll').prop("checked", true);
        } else {
            $('#chkTDSSelectAll').prop("checked", false);
            return false;
        }
    });
});
//------------------End TDS Select All Validations------------------------------------
//------------------Start GSTP Select All Validations------------------------------------
$(document).on('click', '#chkGSTPAssign', function () {
    $('tr.GSTP-data').each(function () {
        if ($(this).find(".GSTPAssign").is(":checked")) {
            $('#chkGSTPSelectAll').prop("checked", true);
        } else {
            $('#chkGSTPSelectAll').prop("checked", false);
            return false;
        }
    });
});
//------------------End GSTP Select All Validations------------------------------------
//------------------Start GSTD Select All Validations------------------------------------
$(document).on('click', '#chkGSTDAssign', function () {
    $('tr.GSTD-data').each(function () {
        if ($(this).find(".GSTDAssign").is(":checked")) {
            $('#chkGSTDSelectAll').prop("checked", true);
        } else {
            $('#chkGSTDSelectAll').prop("checked", false);
            return false;
        }
    });
});
//------------------End GSTD Select All Validations------------------------------------
//------------------Start ITN Select All Validations------------------------------------
$(document).on('click', '#chkITNAssign', function () {
    $('tr.ITN-data').each(function () {
        if ($(this).find(".ITNAssign").is(":checked")) {
            $('#chkITNSelectAll').prop("checked", true);
        } else {
            $('#chkITNSelectAll').prop("checked", false);
            return false;
        }
    });
});
//------------------End ITN Select All Validations------------------------------------


//------------------------Start Bind IT Franchisee Name Dropdown -------------------------------------------
function BindFranchiseeName(dept, customUrlIT) {    
    $('.FranchiseeName option').remove();
    $.ajax({       
        type: "POST",
        url: customUrlIT,
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            console.log(r);
            //var dept = $("#ddlFranchiseeNameIT");
            //dept.empty().append('<option selected="selected" value="0">--Select--</option>');
            $.each(r.d, function (key, value) {
                dept.append($("<option></option>").val(value.FranchiseeID).text(value.FirmName));
            });            
            dept.multiselect('rebuild');
        }
    });
}
//--------------------End Bind IT Franchisee Name Dropdown -------------------------------------------


//------------------------Start Bind Employee Dropdown -------------------------------------------
function BindEmployeeName()
{
    debugger;
    $.ajax({
        type: "POST",
        url: "WorkAllocation.aspx/BindEmployeeName",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            console.log(r);
            var dept = $(".EmployeeName");
            dept.empty().append('<option selected="selected" value="0">--Select--</option>');
            $.each(r.d, function (key, value) {
                dept.append($("<option></option>").val(value.Emp_Id).text(value.Emp_Name));
            });
        }
    });
}
//--------------------End Bind Employee Dropdown -------------------------------------------

//********************************************************************************************************************************
//===================================Start Get IT Files Method============================
function GetITFiles(EID) {    
    $('#tblITFiling tr').remove();
    var count = 0;
    var url = "WorkAllocation.aspx/GetITFiles";
    var data = '{EID:"'+EID+'"}';
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            console.log(r);
            if (r.d != "") {
                $('#emplistIT').show();
                $.each(r.d, function (key, value) {
                    count = count + 1;
                    var rows = "<tr class='odd gradeX IT-data'>"
                        + "<td class='customertd'>" + count + "</td>"
                        + "<td class='customertd'>" + value.Date + "</td>"
                        + "<td class='customertd'>" + value.FileTransactionID + "</td>"
                        + "<td class='customertd'>" + value.ClientID + "</td>"
                        + "<td class='customertd'>" + value.ApplicantName + "</td>"
                        + "<td class='customertd'>" + value.ApplicantMobileNo + "</td>"
                        //+ "<td class='customertd' style='text-align:center;'><input type='checkbox'  name='Assign' id='chkITAssign' class='ITAssign' title='Assign' style='zoom:1.2;cursor:pointer;' /></td>"
                        + "<td class='customertd' style='text-align:center;'><div class=''><label class='inline middle'><input name='Assign' type='checkbox' id='chkITAssign' title='Assign' class='ITAssign ace' /><span class='lbl'></span></label></div></td>"
                        + "</tr>";
                    $('#tblITFiling').append(rows);
                });
            } else {
                var rows = "<tr><td colspan='8' style='text-align: center;font-family:Calibri;font-size:16px;font-weight:bold;color:Red' >data does not exist..!</td></tr>"
                $('#tblITFiling').append(rows);
                $('#emplistIT').hide();
            }


        }
    });
}
//===================================End Get IT files Method=============================

//===================================Start Get TDS Files Method============================
function GetTDSFiles(EID) {   
    $('#tblTDSFiles tr').remove();
    var count = 0;
    var url = "WorkAllocation.aspx/GetTDSFiles";
    var data = '{EID:"' + EID + '"}';
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            console.log(r);
            if (r.d != "") {
                $('#emplistTDS').show();
                $.each(r.d, function (key, value) {
                    count = count + 1;
                    var rows = "<tr class='odd gradeX TDS-data'>"
                        + "<td class='customertd'>" + count + "</td>"
                        + "<td class='customertd'>" + value.Date + "</td>"
                        + "<td class='customertd'>" + value.FileTransactionID + "</td>"
                        + "<td class='customertd'>" + value.ClientID + "</td>"
                        + "<td class='customertd'>" + value.OfficeName + "</td>"
                        + "<td class='customertd'>" + value.AuthorisedPersone + "</td>"
                        //+ "<td class='customertd' style='text-align:center;'><input type='checkbox' name='Assign' id='chkTDSAssign' class='TDSAssign' title='Assign' style='zoom:1.2;cursor:pointer;'/></td>"
                        + "<td class='customertd' style='text-align:center;'><div class=''><label class='inline middle'><input name='Assign' type='checkbox' id='chkTDSAssign' title='Assign' class='TDSAssign ace' /><span class='lbl'></span></label></div></td>"
                        + "</tr>";
                    $('#tblTDSFiles').append(rows);
                });
            } else {
                var rows = "<tr><td colspan='8' style='text-align: center;font-family:Calibri;font-size:16px;font-weight:bold;color:Red' >data does not exist..!</td></tr>"
                $('#tblTDSFiles').append(rows);
                $('#emplistTDS').hide();
            }
        }
    });
}
//===================================End Get TDS Method=============================

//===================================Start Get IT Files Method============================
function GetITNoticeFiles(EID) {
    $('#tblITNoticeFiling tr').remove();
    var count = 0;
    var url = "WorkAllocation.aspx/GetITNFiles";
    var data = '{EID:"' + EID + '"}';
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            console.log(r);
            if (r.d != "") {
                $('#emplistITN').show();
                $.each(r.d, function (key, value) {
                    count = count + 1;
                    var rows = "<tr class='odd gradeX ITN-data'>"
                        + "<td class='customertd'>" + count + "</td>"
                        + "<td class='customertd'>" + value.Date + "</td>"
                        + "<td class='customertd'>" + value.FileTransactionID + "</td>"
                        + "<td class='customertd'>" + value.ClientID + "</td>"
                        + "<td class='customertd'>" + value.ApplicantName + "</td>"
                        + "<td class='customertd'>" + value.ApplicantMobileNo + "</td>"
                        //+ "<td class='customertd' style='text-align:center;'><input type='checkbox' name='Assign' id='chkITNAssign' class='ITNAssign' title='Assign' style='zoom:1.2;cursor:pointer;'/></td>"
                        + "<td class='customertd' style='text-align:center;'><div class=''><label class='inline middle'><input name='Assign' type='checkbox' id='chkITNAssign' title='Assign' class='ITNAssign ace' /><span class='lbl'></span></label></div></td>"
                        + "</tr>";
                    $('#tblITNoticeFiling').append(rows);
                });
            } else {
                var rows = "<tr><td colspan='8' style='text-align: center;font-family:Calibri;font-size:16px;font-weight:bold;color:Red' >data does not exist..!</td></tr>"
                $('#tblITNoticeFiling').append(rows);
                $('#emplistITN').hide();
            }


        }
    });
}
//===================================End Get Clients Method=============================

//===================================Start Get GST Reg Tax Payer Method============================

function GetGSTRegTP(EID,GSTType) {
    $('#tblGSTRegListTP tr').remove();
    var count = 0;
    var url = "WorkAllocation.aspx/GetGSTRegTP";
    var data = '{EID:"' + EID +
        '",GSTType:"' + GSTType + '"}';
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            console.log(r);
            if (r.d != "") {
                $('#emplist').show();
                $.each(r.d, function (key, value) {
                    count = count + 1;
                    var rows = "<tr class='odd gradeX GSTP-data'>"
                        + "<td class='customertd'>" + count + "</td>"
                        + "<td class='customertd'>" + value.Date + "</td>"
                        + "<td class='customertd'>" + value.ReferenceId + "</td>"
                        + "<td class='customertd'>" + value.ClientID + "</td>"
                        + "<td class='customertd'>" + value.PAN_TAN + "</td>"
                        + "<td class='customertd'>" + value.Name1 + "</td>"
                        + "<td class='customertd'>" + value.MobileNo + "</td>"
                        //+ "<td class='customertd' style='text-align:center;'><input type='checkbox' name='Assign' id='chkGSTPAssign' class='GSTPAssign' title='Assign' style='zoom:1.2;cursor:pointer;' /></td>"
                        + "<td class='customertd' style='text-align:center;'><div class=''><label class='inline middle'><input name='Assign' type='checkbox' id='chkGSTPAssign' title='Assign' class='GSTPAssign ace' /><span class='lbl'></span></label></div></td>"
                        + "</tr>";
                    $('#tblGSTRegListTP').append(rows);
                });
            } else {
                var rows = "<tr><td colspan='8' style='text-align: center;font-family:Calibri;font-size:16px;font-weight:bold;color:Red' >data does not exist..!</td></tr>"
                $('#tblGSTRegListTP').append(rows);
                $('#emplist').hide();
            }


        }
    });
}
//===================================End Get GST Reg Tax Payer Method=============================

//===================================Start Get GST Reg Tax Deductor Method============================
function GetGSTRegTD(EID, GSTType) {
    $('#tblGSTRegListTD tr').remove();
    var count = 0;
    var url = "WorkAllocation.aspx/GetGSTRegTD";
    var data = '{EID:"' + EID +
        '",GSTType:"'+GSTType+'"}';
    $.ajax({
        type: "POST",
        url: url                    ,
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            console.log(r);
            if (r.d != "") {
                $('#emplist').show();
                $.each(r.d, function (key, value) {
                    count = count + 1;
                    var rows = "<tr class='odd gradeX GSTD-data'>"
                        + "<td class='customertd'>" + count + "</td>"
                        + "<td class='customertd'>" + value.Date + "</td>"
                        + "<td class='customertd'>" + value.ReferenceId + "</td>"
                        + "<td class='customertd'>" + value.ClientID + "</td>"
                        + "<td class='customertd'>" + value.PAN_TAN + "</td>"
                        + "<td class='customertd'>" + value.Name1 + "</td>"
                        + "<td class='customertd'>" + value.Name2 + "</td>"
                        //+ "<td class='customertd' style='text-align:center;'><input type='checkbox' name='Assign' id='chkGSTDAssign' class='GSTDAssign' title='Assign' style='zoom:1.2;cursor:pointer;'/></td>"
                        + "<td class='customertd' style='text-align:center;'><div class=''><label class='inline middle'><input name='Assign' type='checkbox' id='chkGSTDAssign' title='Assign' class='GSTDAssign ace' /><span class='lbl'></span></label></div></td>"
                        + "</tr>";
                    $('#tblGSTRegListTD').append(rows);
                });
            } else {
                var rows = "<tr><td colspan='8' style='text-align: center;font-family:Calibri;font-size:16px;font-weight:bold;color:Red' >data does not exist..!</td></tr>"
                $('#tblGSTRegListTD').append(rows);
                $('#emplist').hide();
            }


        }
    });
}
//===================================End Get GST Reg Tax Payer Method=============================
//********************************************************************************************************************************


//********************************************************************************************************************************
//=================Start Get IT File Data=====================
//$(document).on('click', '#chkITAssign', function () {
function GetAssignITFiles()
{
    var ITFilesID = [];
    var EmpId=$('#ddlITEmployeeName option:selected').val();
    var FileID = "";
    var alldata = "";
    $('tr.IT-data').each(function () {

        if ($(this).find(".ITAssign").is(":checked")) {
            FileID = $(this).find("td:nth-child(3)").text();
            alldata = {
                'EmpId': EmpId,
                'FileID': FileID
            }
            ITFilesID.push(alldata);
        }
        
    });
    console.log(ITFilesID);

    if (ITFilesID.length != 0)
    {
        return ITFilesID;
    }
    else
    {
        return "";
    }
}    
//});
//=================End Get IT File Data======================

//=================Start Get TDS File Data=====================
function GetAssignTDSFiles()
{
    var TDSFilesID = [];
    var EmpId=$('#ddlTDSEmployeeName option:selected').val();
    var FileID = "";
    var alldata = "";
    $('tr.TDS-data').each(function () {

        if ($(this).find(".TDSAssign").is(":checked")) {
            FileID = $(this).find("td:nth-child(3)").text();
            alldata = {
                'EmpId': EmpId,
                'FileID': FileID
            }
            TDSFilesID.push(alldata);
        }
        
    });
    console.log(TDSFilesID);

    if (TDSFilesID.length != 0)
    {
        return TDSFilesID;
    }
    else
    {
        return "";
    }
}
//=================End Get TDS File Data======================

//=================Start Get GSTP File Data=====================
function GetAssignGSTPFiles() {    
    var GSTPFilesID = [];
    var EmpId = $('#ddlGSTEmployeeName option:selected').val();
    var FileID = "";
    var alldata = "";
    $('tr.GSTP-data').each(function () {

        if ($(this).find(".GSTPAssign").is(":checked")) {
            FileID = $(this).find("td:nth-child(3)").text();
            alldata = {
                'EmpId': EmpId,
                'FileID': FileID
            }
            GSTPFilesID.push(alldata);
        }

    });
    console.log(GSTPFilesID);

    if (GSTPFilesID.length != 0) {
        return GSTPFilesID;
    }
    else {
        return "";
    }
}
//=================End Get GSTP File Data======================

//=================Start Get GSTP File Data=====================
function GetAssignGSTDFiles() {   
    var GSTDFilesID = [];
    var EmpId = $('#ddlGSTEmployeeName option:selected').val();
    var FileID = "";
    var alldata = "";
    $('tr.GSTD-data').each(function () {

        if ($(this).find(".GSTDAssign").is(":checked")) {
            FileID = $(this).find("td:nth-child(3)").text();
            alldata = {
                'EmpId': EmpId,
                'FileID': FileID
            }
            GSTDFilesID.push(alldata);
        }

    });
    console.log(GSTDFilesID);

    if (GSTDFilesID.length != 0) {
        return GSTDFilesID;
    }
    else {
        return "";
    }
}
//=================End Get GSTP File Data======================

//=================Start Get TDS File Data=====================
function GetAssignITNFiles() {    
    var ITNFilesID = [];
    var EmpId = $('#ddlITNEmployeeName option:selected').val();
    var FileID = "";
    var alldata = "";
    $('tr.ITN-data').each(function () {

        if ($(this).find(".ITNAssign").is(":checked")) {
            FileID = $(this).find("td:nth-child(3)").text();
            alldata = {
                'EmpId': EmpId,
                'FileID': FileID
            }
            ITNFilesID.push(alldata);
        }

    });
    console.log(ITNFilesID);

    if (ITNFilesID.length != 0) {
        return ITNFilesID;
    }
    else {
        return "";
    }
}
//=================End Get TDS File Data======================
//********************************************************************************************************************************