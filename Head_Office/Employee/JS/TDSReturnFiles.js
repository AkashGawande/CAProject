﻿var TDSStaffId = "";

var FileTransactionID = "";
var ClientId = "";
var FileName = "";
var FilePath = "";
var PhotoName = "";
var AllAttachment = "";
var Attachment = "";



var SDate = "";
var EDate = "";
var SearchText = "";

var duedate = "", Narration = "", ChequeNo = "", Amount = "", filename = "", Sfilename = "";

$(document).ready(function () {
    ActiveClass("TDS");


    GetTDSFiles(SDate, EDate, SearchText, "Assigned");

    //=======================Start Edit TDS File Details=============================
    $(document).on('click', '#btnEdit', function () {       
        var $row = $(this).closest("tr");
        var FileTransactionID = $row.find("td:nth-child(3)").text();
        View(FileTransactionID);
        //ViewDoc(FileTransactionID);
        ViewDoc(FileTransactionID);
    });
    //=======================End Edit TDS File Details=============================

    //===================================Start Credit and Cheque Validations=============================
    $('#ddlTDSPaymentMode').change(function () {
        
        var PaymentMode = $("#ddlTDSPaymentMode option:selected").val();

        if ($("#ddlTDSPaymentMode option:selected").index() != 0) {

            if (PaymentMode == "Cheque") {
                $('#txtTDSAmount').val(Amount);
                $('#divChequeTDS').show();
                $('#divDueDateTDS').hide();
                $('#txtTDSDueDate').val("");
                $('#txtTDSChequeNo').val(ChequeNo);
                $('#txtTDSNarration').val(Narration);
                if(filename!="")
                {
                    $('#Photocheque').show();
                    $('#UploadPhotocheque').hide();
                }
                else
                {
                    $('#Photocheque').hide();
                    $('#UploadPhotocheque').show();
                }
            }
            else if (PaymentMode == "Credit") {
                $('#ChequePhotoSource').val("");
                $('#ChequeFileName').val("");
                $('#txtTDSAmount').val(Amount);
                $('#txtTDSDueDate').val(duedate);
                $('#txtTDSChequeNo').val("");
                $('#txtTDSNarration').val("");
                $('#divChequeTDS').hide();
                $('#divDueDateTDS').show();
            }
            else {
                $('#ChequePhotoSource').val("");
                $('#ChequeFileName').val("");
                $('#txtTDSChequeNo').val("");
                $('#txtTDSNarration').val("");
                $('#txtTDSAmount').val(Amount);
                $('#divChequeTDS').hide();
                $('#divDueDateTDS').hide();
                $('#txtTDSDueDate').val("");
            }
        }
        else {
            //$('#ChequeDetailsRow').hide();
            $('#ChequePhotoSource').val("");
            $('#ChequeFileName').val("");
            $('#txtTDSAmount').val("");
            $('#txtTDSChequeNo').val("");
            $('#txtTDSNarration').val("");
            $('#divChequeTDS').hide();
            $('#divDueDateTDS').hide();
            $('#txtTDSDueDate').val("");

        }
    });
    //===================================End Credit and Cheque Validations=============================
    
    //===================================Start Get IFSC on DDL Account change=============================
    $('#ddlTDSContactPerson').change(function () {
        if ($('#ddlTDSContactPerson').val() != "0") {
            var data = '{PersonId:"' + $('#ddlTDSContactPerson').val() + '"}';
            $.ajax({
                type: "post",
                url: "TDSReturnFiles.aspx/GetTDSPersonMobile",
                data: data,
                contentType: "application/json",
                dataType: "json",
                success: function (response) {
                    console.log(response);
                    $.each(response.d, function (index, value) {
                        $('#txtTDSMobileNumber').val(value.MobileNo);
                    });
                },
                failure: function () {
                }
            });
        } else {
            $('#txtTDSMobileNumber').val("");
        }
    });
    //===================================End Get IFSC on DDL Account change=============================
    
    //=======================Start Get Image On Modal Box=============================
    $(document).on('click', '#myImg', function () {
        debugger;
        var ImagePath = $(this).data('id');
        var img = "../.." + ImagePath;
        $("#ModalImage").attr("src", img);

        $("#btnDownload").attr('href', img);
        $("#btnDownload").attr('download', img);
    });    
    //=======================End Get Image On Modal Box=============================

    //=======================Start Get Image On Modal Box=============================   
    $('#ChequePhotoTDS').click(function () {
        var ImagePath = $('#ChequePhotoTDS').attr('src');
        var img = ".." + ImagePath;
        $("#ModalImage").attr("src", img);

        $("#btnDownload").attr('href', img);
        $("#btnDownload").attr('download', img);
    });
    //=======================End Get Image On Modal Box=============================



    //=======================Start Send Message to Franchisee=============================
    $(document).on('click', '#btnReply', function () {
        $('#tblAttachment tr').remove();
        var $row = $(this).closest("tr");
        var FileTransactionID = $row.find("td:nth-child(3)").text();
        var ClientID = $row.find("td:nth-child(4)").text();
        var ApplicantName = $row.find("td:nth-child(5)").text();
        TDSStaffId= $row.find("td:nth-child(9)").text();
        $('#lblFileTransactionID1').text(FileTransactionID);
        $('#lblFranchiseeID').text($row.find("td:nth-child(8)").text());
        $('#lblClientID1').text(ClientID);
        $('#lblApplicantName1').text(ApplicantName);
        AddAttachmentRow();
    });
    //=======================End Send Message to Franchisee=============================

    //=======================Start Send Message to Franchisee=============================
    $('#btnSend').click(function () {
        if ($('#txtSubject').val() != "") {
            if ($('#txtMessage').val() != "") {
                SendTDSMessage();
            } else {
                $('#txtMessage').focus()
            }
        } else {
            $('#txtSubject').focus()
        }
        //Save();
    });
    //=======================End Send Message to Franchisee=============================

    //=======================Start Update TDS Client Details=============================
    $('#btnUpdateTDS').click(function () {
        
        if ($('#ddlTDSContactPerson option:selected').index() != 0) {
            if ($('#ddlTDSTypofReturn').val() != null) {
                if ($('#ddlTDSQuarterlyReturn option:selected').index() != 0) {
                    if ($('#ddlTDSPaymentMode option:selected').index() != 0) {
                        if ($('#txtTDSAmount').val() != "") {                            
                            UpdateTDS();
                            //duedate = "";
                            //Narration = "";
                            //ChequeNo = "";
                            //Amount = "";
                        } else {
                            $('#txtTDSAmount').focus();
                        }
                    } else {
                        $('#ddlTDSPaymentMode').focus();
                    }
                } else {
                    $('#ddlTDSQuarterlyReturn').focus();
                }
            } else {
                $('#ddlTDSTypofReturn').focus();
            }
        } else {
            $('#ddlTDSContactPerson').focus();
        }

    });
    //=======================End Update TDS Client Details=============================

    
    //==========================Start Assigned Files Tab======================================
    $('#liAssigned').click(function () {
        GetTDSFiles("", "", "", "Assigned");       
    });
    //==========================End Assigned Files Tab======================================

    //==========================Start Verified Files Tab======================================
    $('#liVerified').click(function () {        
        GetTDSFiles("", "", "", "Verified,0");
    });
    //==========================End Verified Files Tab======================================

    
    //==========================Start Assigned Files Search Button======================================
    $('#btnSearchAssigned').click(function () {
        SDate = $('#StartDateAssigned').val();
        EDate = $('#EndDateAssigned').val();
        SearchText = $('#txtSearchTextAssigned').val();
        GetTDSFiles(SDate, EDate, SearchText, "Assigned");
    });
    //==========================End Assigned Files Search Button======================================

    //==========================Start Verified Files Search Button======================================
    $('#btnSearchVerified').click(function () {
        SDate = $('#StartDateVerified').val();
        EDate = $('#EndDateVerified').val();
        SearchText = $('#txtSearchTextVerified').val();
        var Status = $('#ddlFileStatus').val();
        GetTDSFiles(SDate, EDate, SearchText, "Verified," + Status);
    });
    //==========================End Verified Files Search Button======================================

    
});

//=================================Save Button Method Code For Send Message==========================================
function SendTDSMessage() {
    
     AllAttachment = "";

    $("#loaderHdTDS").show();
    //$("#loaderHdTDS").fadeOut("slow");
    
    FileTransactionID = $('#lblFileTransactionID1').text();
    var FranchiseeID = $('#lblFranchiseeID').text();
    ClientId = $('#lblClientID1').text();
    var Subject = $('#txtSubject').val();
    var Message = $('#txtMessage').val();

    var data;
    var url;
    data = '{FileTransactionID:"' + FileTransactionID +
            '",FranchiseeID:"' + FranchiseeID +
            '",ClientId:"' + ClientId +
           '",Subject:"' + Subject +
           '",TDSStaffId:"' + TDSStaffId +
           '",Message:"' + Message + '"}';
    url = "TDSReturnFiles.aspx/SaveMasterData";
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: data,
        success: function (response) {
            if (response.d != "Record Not Added ..?") {
                FileTransactionID = response.d;
                debugger;
                var data = "";
                var url = "";
                AllAttachment = JSON.stringify(GetAttachmentDetails());
                //AllBankDetails = JSON.stringify(GetBankDetails());
                $.ajax({
                    url: 'TDSReturnFiles.aspx/SaveDetails',
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({ 'AllAttachment': AllAttachment }),
                    success: function (response) {
                        if (response.d != "Record Not Added ..?") {
                            alert("Message Send Successfully");
                            //window.location.reload();
                            $('#txtSubject').val("");
                            $('#txtMessage').val("");
                            $('#myModalReply').modal('toggle');
                            $("#loaderHdTDS").hide();
                        }
                        else {
                            $("#loaderHdTDS").hide();
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
//-------------------------------Start Save Member Details Method --------------------------
function GetAttachmentDetails() {
    debugger;
     FileName = "";
     FilePath = "";
     PhotoName = "";
    Attachment = [];
    $('tr.data-contact-person2').each(function () {

        if ($(this).find(".DocumentName").val() != "") {
            FileName = $(this).find(".DocumentName").val();
        }
        if ($(this).find(".PhotoSource").val() != "") {
            FilePath = $(this).find(".PhotoSource").val();
        }
        if ($(this).find(".PhotoFileName").val() != "") {
            PhotoName = $(this).find(".PhotoFileName").val();
        }
        Status = 'InActive';
        var alldata = {
            'FileTransactionID': FileTransactionID,
            'ClientId': ClientId,
            'FileName': FileName,
            'FilePath': FilePath,
            'PhotoName': PhotoName
        }

        Attachment.push(alldata);
    });
    console.log(Attachment);
    return Attachment;
}
//-------------------------------End Save Member Details Method--------------------------

//=====================================End Save Method Code For Send Message=========================================

//=================================Start Update TDS Client File  Method Code==========================================
function UpdateTDS() {
    $("#loaderHdTDS").show();
    //$("#loaderHdTDS").fadeOut("slow");
   
    var FileTransactionID = $('#txtTDSFileTransactionID').val();
    var ClientID = $('#txtTDSClientID').val();
    var ContactPersone = $('#ddlTDSContactPerson option:selected').val();
    var TypesOfRetutn = $('#ddlTDSTypofReturn').val();
    var Quarter = $('#ddlTDSQuarterlyReturn option:selected').val();

    var PaymentMode = $('#ddlTDSPaymentMode option:selected').val();
    var Amount = $('#txtTDSAmount').val();
    var DueDate = $('#txtTDSDueDate').val();
    var ChequeNo = $('#txtTDSChequeNo').val();
    var Narration = $('#txtTDSNarration').val();
    var PhotoPath = $('#ChequePhotoSource').val();
    var PhotoName = $('#ChequeFileName').val();

    var Status = "Active";

    var data;
    var url;
    data = '{FileTransactionID:"' + FileTransactionID +
            '",ClientID:"' + ClientID +
           '",ContactPersone:"' + ContactPersone +
           '",TypesOfRetutn:"' + TypesOfRetutn +
           '",Quarter:"' + Quarter +
           '",PaymentMode:"' + PaymentMode +
           '",Amount:"' + Amount +
           '",DueDate:"' + DueDate +
           '",ChequeNo:"' + ChequeNo +
           '",Narration:"' + Narration +
           '",PhotoPath:"' + PhotoPath +
           '",PhotoName:"' + PhotoName +
           '",Sfilename:"' + filename +
           '" ,Status:"' + Status + '"}';

    url = "TDSReturnFiles.aspx/UpdateTDSClientMasterData";
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: data,
        success: function (response) {
            if (response.d != "Record Not Added ..?") {
                alert("Updated Successfully..!!");
                $('#myModalTDS').modal('toggle');
                $("#loaderHdTDS").hide();
            }
            else {
                $("#loaderHdTDS").hide();
                alert('Failed....! Try Again.');
            }
        }
    });
}
//=================================End Update TDS Client File  Method Code==========================================




//===================================Start Get TDS Files Method============================
function GetTDSFiles(SDate, EDate, SearchText, FStatus) {
    debugger;
    $('#tblTDS').show();
    $('#tblTDSFiles tr').remove();
    debugger;

    var Data = '{StartDate:"' + SDate +
        '",EndDate:"' + EDate +
        '",SearchText:"' + SearchText +
        '",FileStatus:"' + FStatus +
        '"}';

    var count = 0;
    $.ajax({
        type: "POST",
        url: "TDSReturnFiles.aspx/GetTDSFiles",
        data: Data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {

            console.log(r);
            if (r.d != "") {
                $.each(r.d, function (key, value) {
                    count = count + 1;
                    debugger;
                    var rows = "";
                    rows += "<tr class='odd gradeX'>";
                    rows += "<td class='customertd'>" + count + "</td>";
                    rows += "<td class='customertd' style='text-align: center;'>" + value.Date + "</td>";
                    rows += "<td class='customertd'>" + value.FileTransactionID + "</td>";
                    rows += "<td class='customertd'>" + value.ClientID + "</td>";
                    rows += "<td class='customertd'>" + value.OfficeName + "</td>";
                    rows += "<td class='customertd'>" + value.AuthorisedPersone + "</td>";
                    rows += "<td class='customertd'>" + value.MobileNo + "</td>";
                    rows += "<td class='customertd' style='display:none;'>" + value.FranchiseeID + "</td>";
                    rows += "<td class='customertd' style='display:none;'>" + value.StaffID + "</td>";

                    if (FStatus == "Assigned") {
                        $('#VerifiedDateColumn').hide();
                        $('#AssignedDateColumn').show();
                        $('#CompletedDateColumn').hide();
                        rows += "<td class='customertd'>" + value.AssignedDate + "</td>";

                    } else if (FStatus.split(",")[1] == "0" || FStatus.split(",")[1] == "Verified" || FStatus.split(",")[1] == "Completed") {
                        $('#VerifiedDateColumn').show();
                        $('#AssignedDateColumn').hide();
                        $('#CompletedDateColumn').show();
                        rows += "<td class='customertd'>" + value.VerifiedDate + "</td>";
                        rows += "<td class='customertd'>" + value.CompletedDate + "</td>";
                    }
                    rows += "<td class='customertd' style='display:none;'>" + value.StaffID + "</td>";

                    if (FStatus == "Assigned") {
                        rows += "<td class='center'><button id='btnEdit' title='View Details' class='btn btn-primary btn-xs' data-toggle='modal' data-target='#myModalTDS'><i class='ace-icon fa fa-edit  bigger-110 icon-only'></i></button>&nbsp;";
                        rows += "<button id='btnReply' title='Reply to Franchisee' class='btn btn-success btn-xs'  data-toggle='modal' data-target='#myModalReply'><i class='ace-icon fa fa-reply  bigger-110 icon-only'></i></button>&nbsp;";
                        rows += "<button id='btnVerify' title='Click to Verify' class='btn btn-info btn-xs'><i class='ace-icon fa fa-check-square-o bigger-110 icon-only'></i></button></td>";
                    }
                    else if (FStatus.split(",")[0] == "Verified") {
                        if (value.FileStatus == "Verified") {
                            rows += "<td class='center'><button id='btnEdit' style='display:none;' title='View Details' class='btn btn-primary btn-xs' data-toggle='modal' data-target='#myModalTDS'><i class='ace-icon fa fa-edit  bigger-110 icon-only'></i></button>&nbsp;";
                            rows += "<button id='btnReply' style='display:none;' title='Reply to Franchisee' class='btn btn-success btn-xs'  data-toggle='modal' data-target='#myModalReply'><i class='ace-icon fa fa-reply  bigger-110 icon-only'></i></button>&nbsp;";
                            rows += "<button id='btnComplete' title='Mark As Completed' class='btn btn-danger btn-sm'><i class='ace-icon fa fa-check-square bigger-110 icon-only'> Complete</i></button></td>";
                        }
                        else if (value.FileStatus == "Completed") {
                            rows += "<td class='center'><button id='btnEdit' style='display:none;' title='View Details' class='btn btn-primary btn-xs' data-toggle='modal' data-target='#myModalTDS'><i class='ace-icon fa fa-edit  bigger-110 icon-only'></i></button>&nbsp;";
                            rows += "<button id='btnReply' style='display:none;' title='Reply to Franchisee' class='btn btn-success btn-xs'  data-toggle='modal' data-target='#myModalReply'><i class='ace-icon fa fa-reply  bigger-110 icon-only'></i></button>&nbsp;";
                            rows += "<button id='btnCompleted' title='Completed' class='btn btn-success btn-sm' disabled='disabled'>Completed</button></td>";
                        }
                    }
                    rows += "</tr>";
                    $('#tblTDSFiles').append(rows);
                });

            }
            else {
                var rows1 = "";
                if (FStatus == "Assigned") {
                    $('#VerifiedDateColumn').hide();
                    $('#AssignedDateColumn').show();
                    $('#CompletedDateColumn').hide();
                }
                else if (FStatus == "Verified") {
                    $('#VerifiedDateColumn').show();
                    $('#AssignedDateColumn').hide();
                    $('#CompletedDateColumn').show();
                }
                rows1 = "<tr><td colspan='10' style='text-align: center;font-family:Calibri;font-size:16px;font-weight:bold;color:Red' >data does not exist..!</td></tr>";
                $('#tblTDSFiles').append(rows1);
            }
        }
    });
}
//===================================End Get TDS files Method=============================

//==========================Start Verify Button======================================
$(document).on('click', '#btnVerify', function () {
    var $row = $(this).closest("tr");
    var FileTransactionID = $row.find("td:nth-child(3)").text();
    var OfficeName = $row.find("td:nth-child(5)").text();
    var result = confirm("Do you want to Verify " + OfficeName + " file");
    if (result) {
        UpdateToVerify(FileTransactionID);
        //alert("Hi");
    }

});
//==========================End Verify Button======================================

//===========================Start Verify Method====================================
function UpdateToVerify(FileId) {
    var data;
    var url;
    data = '{FileTransactionID:"' + FileId + '"}';
    url = "TDSReturnFiles.aspx/UpdateToVerify";
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: data,
        success: function (response) {
            if (response.d != "Record Not Added ..?") {
                // FileTransactionID = response.d;
                alert("Verified Successfuly....!");
                GetTDSFiles("", "", "", "Verified,0");

            }
            else {
                alert('Failed....! Try Again.');
            }
        }
    });

}

//===========================End Verify Method===================================

//==========================Start Completed Button======================================
$(document).on('click', '#btnComplete', function () {
    var $row = $(this).closest("tr");
    var FileTransactionID = $row.find("td:nth-child(3)").text();
    var OfficeName = $row.find("td:nth-child(5)").text();
    var result = confirm("Do you want to mark as completed..?");
    if (result) {
        UpdateToCompleted(FileTransactionID);
        //alert("Hi");
    }

});
//==========================End Completed Button======================================




//===========================Start Completed Method====================================
function UpdateToCompleted(FileId) {
    var data;
    var url;
    data = '{FileTransactionID:"' + FileId + '"}';
    url = "TDSReturnFiles.aspx/UpdateToCompleted";
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: data,
        success: function (response) {
            if (response.d != "Record Not Added ..?") {
                // FileTransactionID = response.d;
                alert("Completed Successfuly....!");
                GetTDSFiles("", "", "", "Verified,0");

            }
            else {
                alert('Failed....! Try Again.');
            }
        }
    });

}

//===========================End Completed Method===================================




//===========================Start View Data Method==============================
function View(FileTransactionID) {
    var count = 0;
    var data = '{FileTransactionID:"' + FileTransactionID + '"}';

    $.ajax({
        type: "post",
        url: "TDSReturnFiles.aspx/ViewModelBox",
        data: data,
        contentType: "application/json",
        dataType: "json",

        success: function (response) {
            var TDSContactPerson = $(".ddlTDSContactPerson");
            TDSContactPerson.empty().append('<option selected="selected" value="0">--Select--</option>');

            $.each(response.d, function (index, value) {
               
                //TDS File Details
                $("#txtTDSFileTransactionID").val(value.FileTransactionID);
                $("#txtTDSClientID").val(value.ClientID);
                $("#txtTDSTANNumber").val(value.TANNumber);
                $("#lblTDSDate").text(value.Date);
                $("#txtTDSOfficeName").val(value.OfficeName);
                $("#txtTDSAuthorisedParsonName").val(value.AuthorisedPersone);
                $("#txtTDSOfficeEmail").val(value.OfficeEmail);
                $("#txtTDSStateName").val(value.StateName);
                
                //===Select Type of Return=====               
                var ReturnType = value.TypesOfReturn;
                var dataarray = ReturnType.split(",");
                $("#ddlTDSTypofReturn").val(dataarray);                
                $("#ddlTDSTypofReturn").multiselect("refresh");
                $('#ddlTDSTypofReturn').trigger('change');


                //===Select Quarter Type=====
                var Quarter = value.QuarterlyReturn;
                var j6 = $('#ddlTDSQuarterlyReturn option').length;
                var val6 = "";
                for (var i = 0; i < j6; i++) {
                    val6 = $('#ddlTDSQuarterlyReturn option')[i].value;
                    if (val6 == Quarter) {
                        $('#ddlTDSQuarterlyReturn option')[i].selected = true;
                        $('#ddlTDSQuarterlyReturn').trigger('change');
                        break;
                    }
                }

                duedate = value.DueDate;
                Narration = value.Narration;
                ChequeNo = value.ChequeNo;
                Amount = value.Amount;
                filename = value.ChequeFileName.split("/")[2];

                $("#txtTDSAmount").val(value.Amount);
                //===Select Payment Mode=====
                var Payment = value.PaymentMode;
                var j2 = $('#ddlTDSPaymentMode option').length;
                var val2 = "";
                for (var i = 0; i < j2; i++) {
                    val2 = $('#ddlTDSPaymentMode option')[i].value;
                    if (val2 == Payment) {
                        $('#ddlTDSPaymentMode option')[i].selected = true;
                        $('#ddlTDSPaymentMode').trigger('change');
                        break;
                    }
                }

                //====Get Cheque and Credit Details=======
                if (value.PaymentMode == "Cheque") {
                    $("#txtTDSChequeNo").val(value.ChequeNo);
                    $("#txtTDSNarration").val(value.Narration);

                    if (getExtension(value.ChequeFileName) == "pdf") {
                        $("#ChequePhotoTDS").hide();
                        $("#DownloadChequeTDS").show();
                        $("#DownloadChequeTDS").attr('name', value.ChequeFileName);
                    } else {
                        $("#DownloadChequeTDS").hide();
                        $("#ChequePhotoTDS").show();
                        $("#ChequePhotoTDS").attr("src", value.ChequeFileName);
                    }
                } else if (value.PaymentMode == "Credit") {
                    $("#txtTDSDueDate").val(value.DueDate);
                }

                //Contact Person drop down
                TDSContactPerson.append($("<option></option>").val(this['ContactPersoneID']).text(this['PersoneName']));

                //===Select Contact Person=====
                var personid = value.PersonId;
                var j3 = $('#ddlTDSContactPerson option').length;
                var val3 = "";
                for (var i = 0; i < j3; i++) {
                    val3 = $('#ddlTDSContactPerson option')[i].value;
                    if (val3 == personid) {
                        $('#ddlTDSContactPerson option')[i].selected = true;
                        $('#ddlTDSContactPerson').trigger('change');
                        break;
                    }
                }
               

            });
        },
        failure: function () {
        }
    });
}
//==============================End View Data Method==================================

//===========================Start View Documents Method==============================
function ViewDoc(FileTransactionID) {
    $("#tblDocumentsTDS tr").remove();
    $("#tblTDSfooter tr").remove();
    var count = 0;
    var data = '{FileTransactionID:"' + FileTransactionID + '"}';

    $.ajax({
                type: "post",
                url: "TDSReturnFiles.aspx/ViewDocumentsModelBox",
                data: data,
                contentType: "application/json",
                dataType: "json",

        success: function (response) {
            $.each(response.d, function (index, value) {

                //Documents Details
                count = count + 1
                console.log(response);

                //===Bind Documents=====
                var rows = "";
                var a = $('#tblDocumentsTDS tr:first td:nth-child(1)').text();
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

                    $('#tblDocumentsTDS').append(rows);
                } else {
                    rows += "<td class='customertd' style='width:20px;'></td>";
                    $('#tblDocumentsTDS tr:first').append(rows);
                    $('#tblDocumentsTDS tr:first td:nth-child(' + count + ')').append(value.DocumentName);


                    var rows1 = "<td class='customertd'></td>";
                    $('#tblDocumentsTDS tr:last').append(rows1);
                    var rows2 = "";
                    if (getExtension(value.DocumentPath) == "pdf") {
                        rows2 += "<a id='Downloadpdf' onClick='openTab(this)' name='" + value.DocumentPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a>";
                    } else {
                        rows2 += "<img id='myImg' src='" + value.DocumentPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' data-id='" + value.DocumentPath + "' />";
                    }
                    $('#tblDocumentsTDS tr:last td:nth-child(' + count + ')').append(rows2);
                }
            });
            var footer_rows = "<tr><td colspan='" + count + "' style='text-align:left;'><a class='btn btn-sm btn-info' id='btnTDSAllDownLoad' href='#' ><i class='ace-icon fa fa-download fa-2x bigger-110 icon-only'></i> Download All</a></td></tr>";
            $('#tblTDSfooter').append(footer_rows);
        },
        failure: function () {
        }
    });
}
//==============================End View Documents Method==================================






//=======================Start Download All Documents=============================
$(document).on('click', '#btnTDSAllDownLoad', function () {
    var $row = $(this).closest("tr");
    $($row.find("#btnDownload").remove());
    var FID = $('#txtTDSFileTransactionID').val();
    var ClientName = $('#txtTDSOfficeName').val();

    var data = '{FileTransactionID:"' + FID +
        '",ClientName:"' + ClientName + '",TableName:"tdsdocuments"}';

    $.ajax({
        type: "post",
        url: "TDSReturnFiles.aspx/DownloadAllTDSDocument",
        data: data,
        contentType: "application/json",
        dataType: "json",

        success: function (response) {

            var FileName = /Efi_Mitra_Documents/ + response.d;

            var rows = "&nbsp;&nbsp;<a href='' style='display:none;' class='target' id='btnDownload' >Download</a>";
            $($row.find("td:nth-child(1)")).append(rows);
            $($row.find("#btnDownload").attr('href', FileName));
            //$($row.find("#btnDownload").trigger('click'));
            document.getElementById("btnDownload").click();
            rows = "";

            //alert("Downloaded");
        },
        failure: function () {
        }
    });
});
//=======================End Download All Documents=============================






//=================Start Add New Attachment Button======================
$(document).on('click', '#NewAttach', function () {
    AddAttachmentRow();
});
//=================End Add New Attachment Button======================
//==========================Start Delete Attachment Button======================================
$(document).on('click', '#btndeleteattach', function () {
    $(this).closest('tr').remove();
});
//==========================End Delete Attachment Button======================================

var count = 0;
//=================Start Add New Attachment Function======================
function AddAttachmentRow() {
    var rows = "";
    var a = $('#tblAttachment tr:last td:nth-child(1)').text();
    if (a == "") {
        count++;
        rows = "<tr class='data-contact-person2'>"
          + "<td tabindex='10' style='display:none;'> " + count + "</td>"
         + "<td>"
         + "<div class='row' style='margin-top: 10px'>"

         + " <div class='col-lg-10 col-md-10 col-sm-10'>"
         + "<div class='form-group'>"
         + "<label class='control-label col-lg-3 col-md-3 col-sm-3' style='color: #337ab7;'>Upload Attchment<label style='color: red;'>*</label></label>"
         + "<div class='col-lg-4 col-md-4 col-sm-4'>"
         + "<input type='text' placeholder='Enter Document Name' class='DocumentName form-control' name='req' id='txtDocumentName' />"
         + "</div>"
         + "<div class='col-lg-5 col-md-5 col-sm-5'>"
         + "<input type='file' class='form-control' name='file[]' id=" + count + " multiple='multiple' onchange='Attachments(this," + count + ")' />"
         + "<label style='color: lightgray; font-weight: normal;'>only pdf/jpg/jpeg/gif/bmp format</label>"
         + "<input type='hidden' id='PhotoSource" + count + "' value='' class='PhotoSource'/>"
         + "<input type='hidden' id='PhotoFileName" + count + "' value='' class='PhotoFileName' />"
         + "</div>"
         + "</div>"
         + "</div>"
         + "<div class='col-lg-1 col-md-1 col-sm-1'>"
         + "<a id='NewAttach'>"
         + "<i class='ace-icon fa fa-plus fa-2x  bigger-110 icon-only'></i>"
         + "</a>"
         + "</div>"
         + "</div>"
         + "</td>"
         + "</tr>"

        $("#tblAttachment").append(rows);
    }
    else if (count == a) {
        count++;

        rows = "<tr class='data-contact-person2'>"
             + "<td tabindex='10' style='display:none;'> " + count + "</td>"
        + "<td>"
         + "<div class='row' style='margin-top: 10px'>"
         + " <div class='col-lg-10 col-md-10 col-sm-10'>"
         + "<div class='form-group'>"
         + "<label class='control-label col-lg-3 col-md-3 col-sm-3'>Upload Attchment<label style='color: red;'>*</label></label>"
         + "<div class='col-lg-4 col-md-4 col-sm-4'>"
         + "<input type='text' placeholder='Enter Document Name' class='DocumentName form-control' name='req' id='txtDocumentName' />"
         + "</div>"
         + "<div class='col-lg-5 col-md-5 col-sm-5'>"
         + "<input type='file' class='form-control' name='file[]' id=" + count + " multiple='multiple' onchange='Attachments(this," + count + ")' />"
         + "<label style='color: lightgray; font-weight: normal;'>only pdf/jpg/jpeg/gif/bmp format</label>"
         + "<input type='hidden' id='PhotoSource" + count + "' value='' class='PhotoSource'/>"
         + "<input type='hidden' id='PhotoFileName" + count + "' value='' class='PhotoFileName' />"
         + "</div>"
         + "</div>"
         + "</div>"
         + "<div class='col-lg-1 col-md-1 col-sm-1'>"
         + "<a  id='btndeleteattach'><i class='ace-icon fa fa-trash-o red icon-only bigger-130'></i></a>"
         + "</div>"
         + "</div>"
         + "</td>"
         + "</tr>"
        $("#tblAttachment").append(rows);
    }
    else {

        a++;
        count = a;
        rows = "<tr class='data-contact-person2'>"
             + "<td tabindex='10' style='display:none;'> " + count + "</td>"
       + "<td>"
         + "<div class='row' style='margin-top: 10px'>"
         + " <div class='col-lg-10 col-md-10 col-sm-10'>"
         + "<div class='form-group'>"
         + "<label class='control-label col-lg-3 col-md-3 col-sm-3'>Upload Attchment<label style='color: red;'>*</label></label>"
         + "<div class='col-lg-4 col-md-4 col-sm-4'>"
         + "<input type='text' placeholder='Enter Document Name' class='DocumentName form-control' name='req' id='txtDocumentName' />"
         + "</div>"
         + "<div class='col-lg-5 col-md-5 col-sm-5'>"
         + "<input type='file' class='form-control' name='file[]' id=" + count + " multiple='multiple' onchange='Attachments(this," + count + ")' />"
         + "<label style='color: lightgray; font-weight: normal;'>only pdf/jpg/jpeg/gif/bmp format</label>"
         + "<input type='hidden' id='PhotoSource" + count + "' value='' class='PhotoSource'/>"
         + "<input type='hidden' id='PhotoFileName" + count + "' value='' class='PhotoFileName' />"
         + "</div>"
         + "</div>"
         + "</div>"
        + "<div class='col-lg-1 col-md-1 col-sm-1'>"
        + "<a  id='btndeleteattach'><i class='ace-icon fa fa-trash-o red icon-only bigger-130'></i></a>"
        + "</div>"
        + "</div>"
        + "</td>"
        + "</tr>"
        $("#tblAttachment").append(rows);
    }
}
//=================End Add New Attachment Function======================


//=================Start Get  Attachment Details========================================
function Attachments(input, count) {
    if (input.files && input.files[0]) {

        var filerdr = new FileReader();
        filerdr.onload = function (e) {
           
               document.getElementById('PhotoSource' + count + '').value = e.target.result; //Generated DataURL
               document.getElementById('PhotoFileName' + count + '').value = input.value.substring((input.value.lastIndexOf("\\")) + 1)
          
            }
        filerdr.readAsDataURL(input.files[0]);
    }

}
//========================End Get  Attachment Details================================
//=================Start Get  Attachment Details========================================
function ChequeAttachments(input, Id) {
    if (input.files && input.files[0]) {

        var filerdr = new FileReader();
        filerdr.onload = function (e) {
            var fileExtension = (input.value.substring((input.value.lastIndexOf("\\")) + 1)).replace(/^.*\./, '');
            if (fileExtension == "jpg" || fileExtension == "jpeg" || fileExtension == "pdf" || fileExtension == "png") {

            document.getElementById(Id+'PhotoSource').value = e.target.result; //Generated DataURL
            document.getElementById(Id+'FileName').value = input.value.substring((input.value.lastIndexOf("\\")) + 1)
            }
            else {
                $("#" + Id).val("");
                alert("Only Pdf/jpg/jpeg/png Format allowed");
            }
        }
        filerdr.readAsDataURL(input.files[0]);
    }

}
//========================End Get  Attachment Details================================


//==============================Start Split Path For Checking the extenion==================================
function getExtension(fpath) {
    var sp = fpath.split(".");
    return sp[1];
}
//==============================End Split Path For Checking the extenion==================================
//========================Start Open pdf in new tab================================
function openTab(th) {
    window.open(th.name, '_blank');
}
//========================end Open pdf in new tab================================
