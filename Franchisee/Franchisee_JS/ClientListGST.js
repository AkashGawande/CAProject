/// <reference path="ClientList.js" />

$(document).ready(function () {
    //==================Start GST Type Dropdown Change===================
    $('#ddlGSTType').change(function () {
        $('#ddlGSTEmployeeID').val('0');
        $('#ddlGSTEmployeeName').val('0');
        $('#tblGSTaxDeductor').hide();
        $('#tblGSTaxPayer').hide();
        if ($('#ddlGSTType').val() != "0") {
            $('#divDropdown').show();
        } else {
            $('#divDropdown').hide();
        }
    });
    //==================End GST Type Dropdown Change===================

    //===================================Start GST Clients DDL Change=============================
    $('#ddlGSTEmployeeID').change(function () {
        $('#ddlGSTEmployeeName').val($('#ddlGSTEmployeeID').val());

        if ($('#ddlGSTType').val() == "TAX_Payer") {
            GetGSTTAXPayer($('#ddlGSTEmployeeID').val());
            $('#tblGSTaxPayer').show();
            $('#tblGSTaxDeductor').hide();
        } else if ($('#ddlGSTType').val() == "TAX_Deductor") {
            GetGSTTAXDeductor($('#ddlGSTEmployeeID').val());
            $('#tblGSTaxDeductor').show();
            $('#tblGSTaxPayer').hide();
        }        
    });
    //===================================End GST Clients DDL Change=============================

    //===================================Start GST Clients DDL Change============================
    $('#ddlGSTEmployeeName').change(function () {
        $('#ddlGSTFranchiseeID').val($('#ddlGSTEmployeeName').val());

        if ($('#ddlGSTType').val() == "TAX_Payer") {
            GetGSTTAXPayer($('#ddlGSTEmployeeName').val());
            $('#tblGSTaxPayer').show();
            $('#tblGSTaxDeductor').hide();
        } else if ($('#ddlGSTType').val() == "TAX_Deductor") {
            GetGSTTAXDeductor($('#ddlGSTEmployeeName').val());
            $('#tblGSTaxDeductor').show();
            $('#tblGSTaxPayer').hide();
        }
    });
    //===================================End GST Clients DDL Change=============================

    //=======================Start View GST Payer Client Details On ModalBox=============================
    $(document).on('click', '#btnGSTPEdit', function () {
        BindStateDropdown();
        var $row = $(this).closest("tr");
        var ClientID = $row.find("td:nth-child(3)").text();
        ViewGSTP(ClientID);
    });
    //=======================End View GST Payer Client Details On ModalBox=============================
    //=======================Start View GST Deductor Client Details On ModalBox=============================
    $(document).on('click', '#btnGSTDEdit', function () {
        BindStateDropdown();
        var $row = $(this).closest("tr");
        var ClientID = $row.find("td:nth-child(3)").text();
        ViewGSTD(ClientID);
        ViewGSTDDoc(ClientID);
    });
    //=======================End View GST Deductor Client Details On ModalBox=============================

    //=======================Start Update GST Payer Client Details=============================
    $('#btnGSTPUpdate').click(function () {        
        if ($('#txtGSTPApplicanteName').val() != "") {
            if ($('#txtGSTPFatherName').val() != "") {
                if ($('#txtGSTPApplicantAddress').val() != "") {
                    if ($('#txtGSTPPinCode').val() != "") {
                        if ($('#ddlGSTPState').val() != "0") {
                            if ($('#txtGSTPBirthDate').val() != "") {
                                if ($('#txtGSTPMobileNo').val() != "") {
                                    if ($('#txtGSTPApplicantEmail').val() != "") {
                                        GSTPUpdate();
                                    } else {
                                        $('#txtGSTPApplicantEmail').focus();
                                    }
                                } else {
                                    $('#txtGSTPMobileNo').focus();
                                }
                            } else {
                                $('#txtGSTPBirthDate').focus();
                            }
                        } else {
                            $('#ddlGSTPState').focus();
                        }
                    } else {
                        $('#txtGSTPPinCode').focus();
                    }
                } else {
                    $('#txtGSTPApplicantAddress').focus();
                }
            } else {
                $('#txtGSTPFatherName').focus();
            }
        } else {
            $('#txtGSTPApplicanteName').focus();
        }
                
    });
    //=======================End Update GST Payer Client Details=============================

    //=======================Start Update GST Deductor Client Details=============================
    $('#btnGSTDUpdate').click(function () {
        if ($('#txtGSTDOfficeName').val() != "") {
            if ($('#txtGSTDAuthorisedPersonName').val() != "") {
                if ($('#txtGSTDOfficeAddress').val() != "") {
                    if ($('#txtGSTDPinCode').val() != "") {
                        if ($('#ddlGSTDState').val() != "0") {
                            if ($('#txtGSTDOfficeEmail').val() != "") {
                                GSTDUpdate();
                            } else {
                                $('#txtGSTDOfficeEmail').focus();
                            }
                        } else {
                            $('#ddlGSTDState').focus();
                        }
                    } else {
                        $('#txtGSTDPinCode').focus();
                    }
                } else {
                    $('#txtGSTDOfficeAddress').focus();
                }
            } else {
                $('#txtGSTDAuthorisedPersonName').focus();
            }
        } else {
            $('#txtGSTDOfficeName').focus();
        }

    });
    //=======================End Update GST Deductor Client Details=============================

    //=======================Start Send Message to Franchisee=============================
    $(document).on('click', '#btnGSTPReply', function () {
        $('#tblAttachment tr').remove();
        var $row = $(this).closest("tr");
        var ClientID = $row.find("td:nth-child(3)").text();
        var ApplicantName = $row.find("td:nth-child(5)").text();
        StaffId = $row.find("td:nth-child(7)").text();

        $('#lblFranchiseeID').text($('#ddlGSTFranchiseeID').val());
        $('#lblClientID1').text(ClientID);
        $('#lblApplicantName1').text(ApplicantName);
        AddAttachmentRow();
    });
    //=======================End Send Message to Franchisee=============================

    //=======================Start Send Message to Franchisee=============================
    $(document).on('click', '#btnGSTDReply', function () {
        $('#tblAttachment tr').remove();
        var $row = $(this).closest("tr");
        var ClientID = $row.find("td:nth-child(3)").text();
        var ApplicantName = $row.find("td:nth-child(5)").text();
        StaffId = $row.find("td:nth-child(7)").text();

        $('#lblFranchiseeID').text($('#ddlGSTFranchiseeID').val());
        $('#lblClientID1').text(ClientID);
        $('#lblApplicantName1').text(ApplicantName);
        AddAttachmentRow();
    });
    //=======================End Send Message to Franchisee=============================

    //=================Start Add New Row Button======================
    $(document).on('click', '#AddRowGSTD', function () {
        AddRowGSTD();
    });
    //=================End Add New Row Button======================
    //==========================Start Delete Row Button======================================
    $(document).on('click', '#btndeleteGSTD', function () {
        $(this).closest('tr').remove();
    });
    //==========================End Delete Row Button======================================
});

//===================================Start Get GST Tax Payer Clients Method============================
function GetGSTTAXPayer(SID) {
    $('#tblGSTaxPayerList tr').remove();
    var count = 0;
    $.ajax({
        type: "POST",
        url: "ClientsList.aspx/GetGSTaxPayerList",
        data: '{StaffId:"' + SID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            console.log(r);
            if (r.d != "") {
                $.each(r.d, function (key, value) {
                    count = count + 1;
                    var rows = "<tr class='odd gradeX'>"
                        + "<td class='customertd'>" + count + "</td>"
                        + "<td class='customertd'>" + value.RegDate + "</td>"
                        + "<td class='customertd'>" + value.ClientId + "</td>"
                        + "<td class='customertd'>" + value.GSTNumber + "</td>"
                        + "<td class='customertd'>" + value.ApplicantName + "</td>"
                        + "<td class='customertd'>" + value.ApplicantMobileNo + "</td>"
                        + "<td class='customertd' style='display:none;'>" + value.StaffId + "</td>"
                        + "<td class='center'><button id='btnGSTPEdit' title='View/Edit Details' class='btn btn-primary btn-xs' data-toggle='modal' data-target='#myGSTPModal'><i class='ace-icon fa fa-edit  bigger-110 icon-only'></i></button>&nbsp;"
                        + "<button id='btnGSTPReply' style='Display:none' title='Reply to Franchisee' class='btn btn-success btn-xs'  data-toggle='modal' data-target='#myModalReply'><i class='ace-icon fa fa-reply  bigger-110 icon-only'></i></button>&nbsp;"
                        + "<button id='btnGSTPExport' title='Export to Excel' class='btn btn-danger btn-xs'><i class='ace-icon fa fa-file-excel-o bigger-110 icon-only'></i></button></td>"
                        + "</tr>";
                    $('#tblGSTaxPayerList').append(rows);
                });
            } else {
                var rows = "<tr><td colspan='8' style='text-align: center;font-family:Calibri;font-size:16px;font-weight:bold;color:Red' >data does not exist..!</td></tr>"
                $('#tblGSTaxPayerList').append(rows);
            }
        }
    });
}
//===================================End Get GST Tax Payer Clients Method=============================

//===================================Start Get GST Tax Deductor Clients Method============================
function GetGSTTAXDeductor(SID) {
    $('#tblGSTaxDeductorList tr').remove();
    var count = 0;
    $.ajax({
        type: "POST",
        url: "ClientsList.aspx/GetGSTaxDeductorList",
        data: '{StaffId:"' + SID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            console.log(r);
            if (r.d != "") {
                $.each(r.d, function (key, value) {
                    count = count + 1;
                    var rows = "<tr class='odd gradeX'>"
                        + "<td class='customertd'>" + count + "</td>"
                        + "<td class='customertd'>" + value.RegDate + "</td>"
                        + "<td class='customertd'>" + value.ClientId + "</td>"
                        + "<td class='customertd'>" + value.GSTNumber + "</td>"
                        + "<td class='customertd'>" + value.OfficeName + "</td>"
                        + "<td class='customertd'>" + value.AuthorisedPersone + "</td>"
                        + "<td class='customertd' style='display:none;'>" + value.StaffId + "</td>"
                        + "<td class='center'><button id='btnGSTDEdit' title='View/Edit Details' class='btn btn-primary btn-xs' data-toggle='modal' data-target='#myGSTDModal'><i class='ace-icon fa fa-edit  bigger-110 icon-only'></i></button>&nbsp;"
                        + "<button id='btnGSTDReply' style='Display:none' title='Reply to Franchisee' class='btn btn-success btn-xs'  data-toggle='modal' data-target='#myModalReply'><i class='ace-icon fa fa-reply  bigger-110 icon-only'></i></button>&nbsp;"
                        + "<button id='btnGSTDExport' title='Export to Excel' class='btn btn-danger btn-xs'><i class='ace-icon fa fa-file-excel-o bigger-110 icon-only'></i></button></td>"
                        + "</tr>";
                    $('#tblGSTaxDeductorList').append(rows);
                });
            } else {
                var rows = "<tr><td colspan='8' style='text-align: center;font-family:Calibri;font-size:16px;font-weight:bold;color:Red' >data does not exist..!</td></tr>"
                $('#tblGSTaxDeductorList').append(rows);
            }
        }
    });
}
//===================================End Get GST Tax Deductor Clients Method=============================

//===========================Start View GST Payer Client Details On ModalBox==============================
function ViewGSTP(ClientID) {
    $('#tblGSTPDocuments tr').remove();
    var count = 0;
    var data = '{ClientID:"' + ClientID + '"}';

    $.ajax({
        type: "post",
        url: "ClientsList.aspx/ViewGSTPModelBox",
        data: data,
        contentType: "application/json",
        dataType: "json",

        success: function (response) {
            $.each(response.d, function (index, value) {
                console.log(response);
                count = count + 1;
                //GST Payer Client Details
                $("#txtGSTPClientID").val(value.ClientId);
                $("#txtGSTPGSTNumber").val(value.GSTNumber);
                $("#txtGSTPApplicanteName").val(value.ApplicantName);
                $("#lblGSTPRegDate").text(value.RegDate);
                $("#txtGSTPFatherName").val(value.ApplicantFatherName);
                $("#txtGSTPApplicantAddress").val(value.ApplicantAddress);
                $("#txtGSTPPinCode").val(value.Pincode);
                $("#txtGSTPApplicantEmail").val(value.ApplicantEmail);
                $("#txtGSTPBirthDate").val(value.BirthDate);
                $("#txtGSTPMobileNo").val(value.ApplicantMobileNo);
                $("#txtGSTNPUserId").val(value.GSTNUserID);
                $("#txtGSTNPPassword").val(value.GSTNPassword);

                //===Select State=====
                var State = value.StateCode;
                var j = $('#ddlGSTPState option').length;
                var val1 = "";
                for (var i = 0; i < j; i++) {
                    val1 = $('#ddlGSTPState option')[i].value;
                    if (val1 == State) {
                        $('#ddlGSTPState option')[i].selected = true;
                        $('#ddlGSTPState').trigger('change');
                        break;
                    }
                }

                //===Bind Documents=====
                var rows = "";
                var a = $('#tblGSTPDocuments tr:first td:nth-child(1)').text();
                if (a == "") {
                    rows += "<tr>"
                    + "<td class='customertd' style='width:20px;'>" + value.DocumentName + "</td>"
                    + "</tr>"
                    + "<tr>"
                    if (getExtension(value.DocumentPath) == "pdf") {
                        rows += "<td class='customertd'><a id='Downloadpdf' onClick='openTab(this)' name='" + value.DocumentPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a></td>";
                    } else {
                        rows += "<td class='customertd'><img id='myImg' src='" + value.DocumentPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' data-id='" + value.DocumentPath + "' /></td>";
                    }
                    + "</tr>"

                    $('#tblGSTPDocuments').append(rows);
                } else {
                    rows += "<td class='customertd' style='width:20px;'></td>";
                    $('#tblGSTPDocuments tr:first').append(rows);
                    $('#tblGSTPDocuments tr:first td:nth-child(' + count + ')').append(value.DocumentName);


                    var rows1 = "<td class='customertd'></td>";
                    $('#tblGSTPDocuments tr:last').append(rows1);
                    var rows2 = "";
                    if (getExtension(value.DocumentPath) == "pdf") {
                        rows2 += "<a id='Downloadpdf' onClick='openTab(this)' name='" + value.DocumentPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a>";
                    } else {
                        rows2 += "<img id='myImg' src='" + value.DocumentPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' data-id='" + value.DocumentPath + "' />";
                    }
                    $('#tblGSTPDocuments tr:last td:nth-child(' + count + ')').append(rows2);
                }
                
            });

        },
        failure: function () {
        }
    });
}
//==============================End View GST Payer Client Details On ModalBox==================================

//===========================Start View GST Deductor Client Details On ModalBox==============================
function ViewGSTD(ClientID) {
    $('#tblPersonGSTD tr').remove();
    var count = 0;
    var data = '{ClientID:"' + ClientID + '"}';

    $.ajax({
        type: "post",
        url: "ClientsList.aspx/ViewGSTDModelBox",
        data: data,
        contentType: "application/json",
        dataType: "json",

        success: function (response) {
            $.each(response.d, function (index, value) {
                debugger;
                //GST Deductor Client Details
                $("#txtGSTDClientID").val(value.ClientId);
                $("#txtGSTDGSTNumber").val(value.GSTNumber);
                $("#txtGSTDOfficeName").val(value.OfficeName);
                $("#lblGSTDRegDate").text(value.RegDate);
                $("#txtGSTDAuthorisedPersonName").val(value.AuthorisedPersone);
                $("#txtGSTDOfficeAddress").val(value.OfficeAddress);
                $("#txtGSTDPinCode").val(value.Pincode);
                $("#txtGSTDOfficeEmail").val(value.OfficeEmail);
                $("#txtGSTNDUserId").val(value.GSTNUserID);
                $("#txtGSTNDPassword").val(value.GSTNPassword);

                //===Select State=====
                var State = value.StateCode;
                var j = $('#ddlGSTDState option').length;
                var val1 = "";
                for (var i = 0; i < j; i++) {
                    val1 = $('#ddlGSTDState option')[i].value;
                    if (val1 == State) {
                        $('#ddlGSTDState option')[i].selected = true;
                        $('#ddlGSTDState').trigger('change');
                        break;
                    }
                }
                //===Bind Contact Person=====
                var rows = "";
                var a = $('#tblPersonGSTD tr:last td:nth-child(1)').text();
                if (a == "") {
                    rows = "<tr class='data-contact-personGSTD'>"
                         + "<td style='display:none;'><lable id='lblPersonId' class='PersonId'>" + value.PersonID + "</lable></td>"
                    + "<td>"
                + "<div class='row' style='margin-top: 10px'>"
                + "<div class='col-lg-6 col-md-6 col-sm-6'>"
                + "<div class='form-group'>"
                + "<label class='control-label col-lg-4 col-md-4 col-sm-4' style='color: #337ab7;'>Contact Person</label>"
                 + "<div class='col-lg-8 col-md-8 col-sm-8'>"
                + "<input type='text' placeholder='Enter Contact Person Name' value='" + value.PersoneName + "' class='PersonName form-control' name='req' id='txtPersonName' />"
                + "</div>"
                + "</div>"
                + "</div>"
                + "<div class='col-lg-6 col-md-6 col-sm-6'>"
                + "<div class='form-group'>"
                + "<label class='control-label col-lg-3 col-md-3 col-sm-3' style='color: #337ab7;'>"
                + "Mobile No"
                + "</label>"
                + "<div class='col-lg-7 col-md-7 col-sm-7'>"
                + "<input type='text' placeholder='Enter Person Mobile No' maxlength='10' value='" + value.MobileNo + "' class='MobileNo form-control' name='req' id='txtPersonMobileNo' onkeypress='return isNumber(event)' />"
               + "</div>"
                + "<div class='col-lg-1 col-md-1 col-sm-1'>"
                + "<button id='AddRowGSTD' class='btn btn-primary btn-xs' title='Add Multiple Contact Person'>"
                + "<i class='ace-icon fa fa-plus  bigger-110 icon-only'></i>"
                + " </button>"
                + "</div>"
                + "</div>"
                + "</div>"
                + "</div>"
                + "</td>"
                + "</tr>"
                    $("#tblPersonGSTD").append(rows);
                }
                else {
                    rows = "<tr class='data-contact-personGSTD'>"
                         + "<td style='display:none;'><lable id='lblPersonId' class='PersonId'>" + value.PersonID + "</lable></td>"
                            + "<td>"
                        + "<div class='row' style='margin-top: 10px'>"
                        + "<div class='col-lg-6 col-md-6 col-sm-6'>"
                        + "<div class='form-group'>"
                        + "<label class='control-label col-lg-4 col-md-4 col-sm-4' style='color: #337ab7;'>Contact Person</label>"
                        + "<div class='col-lg-8 col-md-8 col-sm-8'>"
                        + "<input type='text' placeholder='Enter Contact Person Name' value='" + value.PersoneName + "' class='PersonName form-control' name='req' id='txtPersonName' />"
                        + "</div>"
                        + "</div>"
                        + "</div>"
                        + "<div class='col-lg-6 col-md-6 col-sm-6'>"
                        + "<div class='form-group'>"
                        + "<label class='control-label col-lg-3 col-md-3 col-sm-3' style='color: #337ab7;'>"
                        + "Mobile No"
                        + "</label>"
                        + "<div class='col-lg-7 col-md-7 col-sm-7'>"
                        + "<input type='text' placeholder='Enter Person Mobile No' maxlength='10' value='" + value.MobileNo + "' class='MobileNo form-control' name='req' id='txtPersonMobileNo' onkeypress='return isNumber(event)' />"
                        + "</div>"
                        //+ "<div class='col-lg-1 col-md-1 col-sm-1'>"
                        //+ "<a  id='btndelete'><i class='ace-icon fa fa-trash-o red icon-only bigger-130'></i></a>"
                        //+ "</div>"
                        + "</div>"
                        + "</div>"
                        + "</div>"
                        + "</td>"
                        + "</tr>"
                    $("#tblPersonGSTD").append(rows);
                }
            });

        },
        failure: function () {
        }
    });
}
//==============================End View GST Deductor Client Details On ModalBox==================================

//===========================Start View GST Deductor Documents Method==============================
function ViewGSTDDoc(ClientID) {
    $("#tblGSTDDocuments tr").remove();
    var count = 0;
    var data = '{ClientID:"' + ClientID + '"}';

    $.ajax({
        type: "post",
        url: "ClientsList.aspx/ViewGSTDDocumentsModelBox",
        data: data,
        contentType: "application/json",
        dataType: "json",

        success: function (response) {
            $.each(response.d, function (index, value) {
                console.log(response);
                count = count + 1;
                var rows = "";

                var a = $('#tblGSTDDocuments tr:first td:nth-child(1)').text();
                if (a == "") {
                    rows += "<tr>"
                    + "<td class='customertd' style='width:20px;'>" + value.DocumentName + "</td>"
                    + "</tr>"
                    + "<tr>"
                    if (getExtension(value.DocumentPath) == "pdf") {
                        rows += "<td class='customertd'><a id='Downloadpdf' onClick='openTab(this)' name='" + value.DocumentPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a></td>";
                    } else {
                        rows += "<td class='customertd'><img id='myImg' src='" + value.DocumentPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' data-id='" + value.DocumentPath + "' /></td>";
                    }
                    + "</tr>"

                    $('#tblGSTDDocuments').append(rows);
                } else {
                    rows += "<td class='customertd' style='width:20px;'></td>";
                    $('#tblGSTDDocuments tr:first').append(rows);
                    $('#tblGSTDDocuments tr:first td:nth-child(' + count + ')').append(value.DocumentName);


                    var rows1 = "<td class='customertd'></td>";
                    $('#tblGSTDDocuments tr:last').append(rows1);
                    var rows2 = "";
                    if (getExtension(value.DocumentPath) == "pdf") {
                        rows2 += "<a id='Downloadpdf' onClick='openTab(this)' name='" + value.DocumentPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a>";
                    } else {
                        rows2 += "<img id='myImg' src='" + value.DocumentPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' data-id='" + value.DocumentPath + "' />";
                    }
                    $('#tblGSTDDocuments tr:last td:nth-child(' + count + ')').append(rows2);
                }
            });

        },
        failure: function () {
        }
    });
}
//==============================End View GST Deductor Documents Method==================================

//=================================Start Update GST Payer Client  Method Code==========================================
function GSTPUpdate() {
    $("#loaderFrClient").show();
    $("#loaderFrClient").fadeOut("slow");
    
    var GSTPClientID = $('#txtGSTPClientID').val();
    var GSTPGSTNumber = $('#txtGSTPGSTNumber').val();
    var GSTPApplicanteName = $('#txtGSTPApplicanteName').val().toUpperCase();
    var GSTPFatherName = $('#txtGSTPFatherName').val().toUpperCase();

    var Address = $('#txtGSTPApplicantAddress').val();
    var GSTPApplicantAddress = escape(Address);
    var GSTPPinCode = $('#txtGSTPPinCode').val();    
    var GSTPState = $('#ddlGSTPState option:selected').val();
    var GSTPBirthDate = $('#txtGSTPBirthDate').val();
    var GSTPMobileNo = $('#txtGSTPMobileNo').val();
    var GSTPApplicantEmail = $('#txtGSTPApplicantEmail').val();
    var GSTNPUserId = $('#txtGSTNPUserId').val();
    var GSTNPPassword = $('#txtGSTNPPassword').val();
    var Status = "Active";

    var data;
    var url;
    data = '{GSTPClientID:"' + GSTPClientID +
            '",GSTPGSTNumber:"' + GSTPGSTNumber +
           '",GSTPApplicanteName:"' + GSTPApplicanteName +
            '",GSTPFatherName:"' + GSTPFatherName +
           '",GSTPApplicantAddress:"' + GSTPApplicantAddress +
           '",GSTPPinCode:"' + GSTPPinCode +
           '",GSTPState:"' + GSTPState +
           '",GSTPBirthDate:"' + GSTPBirthDate +
           '",GSTPMobileNo:"' + GSTPMobileNo +
           '",GSTPApplicantEmail:"' + GSTPApplicantEmail +
            '",GSTNPUserId:"' + GSTNPUserId +
           '",GSTNPPassword:"' + GSTNPPassword +
           '" ,Status:"' + Status + '"}';

    url = "ClientsList.aspx/UpdateGSTPClientMasterData";

    if (GSTPGSTNumber != "") {
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: data,
            success: function (response) {
                if (response.d != "Record Not Added ..?") {
                    alert("Updated Successfully..!!");
                    $('#myGSTPModal').modal('toggle');
                    GetGSTTAXPayer($('#ddlGSTEmployeeID').val());
                    $("#loaderFrClient").hide();
                }
                else {
                    $("#loaderFrClient").hide();
                    alert('Failed....! Try Again.');
                }
            }
        });
    }
    else {
        //document.getElementById("txtTANError1").style.display = "block";
        //$('#txtPAN').focus();
    }
}
//=================================End Update GST Payer Client  Method Code==========================================

var GSTDClientID = "";
//=================================Start Update GST Deductor Client  Method Code==========================================
function GSTDUpdate() {
    $("#loaderFrClient").show();
    $("#loaderFrClient").fadeOut("slow");
    
    GSTDClientID = $('#txtGSTDClientID').val();
    var GSTDGSTNumber = $('#txtGSTDGSTNumber').val();
    var GSTDOfficeName = $('#txtGSTDOfficeName').val().toUpperCase();
    var GSTDAuthorisedPersonName = $('#txtGSTDAuthorisedPersonName').val().toUpperCase();

    var Address = $('#txtGSTDOfficeAddress').val();
    var GSTDOfficeAddress = escape(Address);
    var GSTDPinCode = $('#txtGSTDPinCode').val();
    var GSTDState = $('#ddlGSTDState option:selected').val();
   
    var GSTDOfficeEmail = $('#txtGSTDOfficeEmail').val();
    var GSTNDUserId = $('#txtGSTNDUserId').val();
    var GSTNDPassword = $('#txtGSTNDPassword').val();
    var Status = "Active";

    var data;
    var url;
    data = '{GSTDClientID:"' + GSTDClientID +
            '",GSTDGSTNumber:"' + GSTDGSTNumber +
           '",GSTDOfficeName:"' + GSTDOfficeName +
           '",GSTDAuthorisedPersonName:"' + GSTDAuthorisedPersonName +
           '",GSTDOfficeAddress:"' + GSTDOfficeAddress +
           '",GSTDPinCode:"' + GSTDPinCode +
           '",GSTDState:"' + GSTDState +          
           '",GSTDOfficeEmail:"' + GSTDOfficeEmail +
            '",GSTNDUserId:"' + GSTNDUserId +
           '",GSTNDPassword:"' + GSTNDPassword +
           '" ,Status:"' + Status + '"}';

    url = "ClientsList.aspx/UpdateGSTDClientMasterData";

    if (GSTDGSTNumber != "") {
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: data,
            success: function (response) {
                if (response.d != "Record Not Added ..?") {
                    //alert("Updated Successfully..!!");
                    //$('#myGSTDModal').modal('toggle');


                    GSTDClientID = response.d;

                    var data = "";
                    var url = "";
                    //AllAttachment = JSON.stringify(GetDocumentAttachmentDetails());
                    var GSTDContactPersoneDetails = JSON.stringify(GetGSTDBasedContactPersoneDetails());
                    $.ajax({
                        url: 'ClientsList.aspx/UpdateGSTDClientDetails',
                        type: 'POST',
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify({ 'GSTDContactPersoneDetails': GSTDContactPersoneDetails }),
                        success: function (response) {
                            if (response.d != "Record Not Added ..?") {
                                alert("Updated Successfully..!!");
                                $('#myGSTDModal').modal('toggle');
                                GetGSTTAXDeductor($('#ddlGSTEmployeeID').val());
                                $("#loaderFrClient").hide();
                            }
                            else {
                                $("#loaderFrClient").hide();
                                alert('Failed....! Try Again.');
                            }
                        }
                    });
                }
                else {
                    alert('Failed....! Try Again.');
                }
            }
        });
    }
    else {
        //document.getElementById("txtTANError1").style.display = "block";
        //$('#txtPAN').focus();
    }
}

//-------------------------------Start Update Contact person Details Method--------------------------
function GetGSTDBasedContactPersoneDetails() {
  
    var GSTDContactPersoneDetail = [];
    $('tr.data-contact-personGSTD').each(function () {
        var PersonID = "";
        if ($(this).find(".PersonId").text() != "") {
            var PersonID = $(this).find(".PersonId").text();
        }

        if ($(this).find(".PersonName").val() != "") {
            var GSTDContactPersoneName = $(this).find(".PersonName").val();
        }
        if ($(this).find(".MobileNo").val() != "") {
            var GSTDContactPersoneMobile = $(this).find(".MobileNo").val();
        }
        var Status = 'InActive';
        var alldata = {
            'ClientId': GSTDClientID,
            'PersonID': PersonID,
            'PersoneName': GSTDContactPersoneName,
            'MobileNo': GSTDContactPersoneMobile
        }

        GSTDContactPersoneDetail.push(alldata);
    });
    console.log(GSTDContactPersoneDetail);
    return GSTDContactPersoneDetail;
}
//-------------------------------End Update Contact person Details Method--------------------------

//=================================End Update GST Deductor Client  Method Code==========================================


//=================Start Add New Row Function======================
function AddRowGSTD() {
    var rows = "";
    var a = $('#tblPersonGSTD tr:first td:nth-child(1)').text();

    if (a == "") {
        rows = "<tr class='data-contact-personGSTD'>"
             + "<td style='display:none;'><lable id='lblPersonId' class='PersonId'></lable></td>"
        + "<td>"
    + "<div class='row' style='margin-top: 10px'>"
    + "<div class='col-lg-6 col-md-6 col-sm-6'>"
    + "<div class='form-group'>"
    + "<label class='control-label col-lg-4 col-md-4 col-sm-4' style='color: #337ab7;'>Contact Person</label>"
     + "<div class='col-lg-8 col-md-8 col-sm-8'>"
    + "<input type='text' placeholder='Enter Contact Person Name' class='PersonName form-control' name='req' id='txtPersonName' />"
    + "</div>"
    + "</div>"
    + "</div>"
    + "<div class='col-lg-6 col-md-6 col-sm-6'>"
    + "<div class='form-group'>"
    + "<label class='control-label col-lg-3 col-md-3 col-sm-3' style='color: #337ab7;'>"
    + "Mobile No"
    + "</label>"
    + "<div class='col-lg-7 col-md-7 col-sm-7'>"
    + "<input type='text' placeholder='Enter Person Mobile No' maxlength='10' class='MobileNo form-control' name='req' id='txtPersonMobileNo' onkeypress='return isNumber(event)' />"
   + "</div>"
    + "<div class='col-lg-1 col-md-1 col-sm-1'>"
    + "<button id='AddRowGSTD' class='btn btn-primary btn-xs' title='Add Multiple Contact Person'>"
    + "<i class='ace-icon fa fa-plus  bigger-110 icon-only'></i>"
    + " </button>"
    + "</div>"
    + "</div>"
    + "</div>"
    + "</div>"
    + "</td>"
    + "</tr>"
        $("#tblPersonGSTD").append(rows);
    }
    else {
        rows = "<tr class='data-contact-personGSTD'>"
             + "<td style='display:none;'><lable id='lblPersonId' class='PersonId'></lable></td>"
                + "<td>"
            + "<div class='row' style='margin-top: 10px'>"
            + "<div class='col-lg-6 col-md-6 col-sm-6'>"
            + "<div class='form-group'>"
            + "<label class='control-label col-lg-4 col-md-4 col-sm-4' style='color: #337ab7;'>Contact Person</label>"
            + "<div class='col-lg-8 col-md-8 col-sm-8'>"
            + "<input type='text' placeholder='Enter Contact Person Name' class='PersonName form-control' name='req' id='txtPersonName' />"
            + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='col-lg-6 col-md-6 col-sm-6'>"
            + "<div class='form-group'>"
            + "<label class='control-label col-lg-3 col-md-3 col-sm-3' style='color: #337ab7;'>"
            + "Mobile No"
            + "</label>"
            + "<div class='col-lg-7 col-md-7 col-sm-7'>"
            + "<input type='text' placeholder='Enter Person Mobile No' maxlength='10' class='MobileNo form-control' name='req' id='txtPersonMobileNo' onkeypress='return isNumber(event)' />"
            + "</div>"
            + "<div class='col-lg-1 col-md-1 col-sm-1'>"
            + "<a  id='btndeleteGSTD'><i class='ace-icon fa fa-trash-o red icon-only bigger-130'></i></a>"
            + "</div>"
            + "</div>"
            + "</div>"
            + "</div>"
            + "</td>"
            + "</tr>"
        $("#tblPersonGSTD").append(rows);
    }
}
//=================End Add New Row Function======================
