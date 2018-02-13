/// <reference path="ClientListTAN.js" />
/// <reference path="ClientListGST.js" />
/// <reference path="IncomeTaxFiles.js" />


var StaffId = "";

var UpdateDocumentName = "";
var ExistingDocument = "";
var UpdateDocumentId = "";
var UpdatePhotoSource = "";
var UpdateFileName = "";


var ClientId = "";
var FileName = "";
var FilePath = "";
var PhotoName = "";
var AllAttachment = "";
var Attachment = "";

$(document).ready(function () {

    GetITClientsDetails();

    //=======================Start Send Message to Franchisee=============================
    $('#btnSend').click(function () {
        if ($('#txtSubject').val() != "") {
            if ($('#txtMessage').val() != "") {
                Save();
            } else {
                $('#txtMessage').focus();
            }
        } else {
            $('#txtSubject').focus();
        }
    });
    //=======================End Send Message to Franchisee=============================

    //=======================Start Update IT Client Details=============================
    $('#btnUpdate').click(function () {
        
        if ($('#txtITApplicantName').val() != "") {
            if ($('#txtITApplicantFatherName').val() != "") {
                if ($('#txtITApplicantAddress').val() != "") {
                    if ($('#txtITPinCode').val() != "") {
                        if ($('#txtITBirthDate').val() != "") {
                            if ($('#txtITApplicantMobileNo').val() != "") {
                                if ($('#txtITApplicantEmailID').val() != "") {
                                    if ($('#ddlITState').val() != "0") {
                                        if ($('#txtITCitizenship').val() != "") {
                                            if ($('#ddlITEmployedType').val() != "0") {
                                                if ($('#txtITAadharNumber').val() != "") {
                                                    PANBasedClientUpdate();
                                                } else {
                                                    $('#txtITAadharNumber').focus();
                                                }
                                            } else {
                                                $('#ddlITEmployedType').focus();
                                            }
                                        } else {
                                            $('#txtITCitizenship').focus();
                                        }
                                    } else {
                                        $('#ddlITState').focus();
                                    }
                                } else {
                                    $('#txtITApplicantEmailID').focus();
                                }
                            } else {
                                $('#txtITApplicantMobileNo').focus();
                            }
                        } else {
                            $('#txtITBirthDate').focus();
                        }
                    } else {
                        $('#txtITPinCode').focus();
                    }
                } else {
                    $('#txtITApplicantAddress').focus();
                }
            } else {
                $('#txtITApplicantFatherName').focus();
            }
        } else {
            $('#txtITApplicantName').focus();
        }
        
    });
    //=======================End Update IT Client Details=============================


    //=======================Start Save Update or Add New IT Document =============================
    $('#btnITUploadChange').click(function () {
        if ($('#ITtxtDocumentName').val() != "") {
            if ($('#ITFileChangePhotoSource').val() != "" && $('#ITFileChangePhotoFileName').val() != "") {
                UpdateOrAddITNewDocument();
            } else {
                alert("Select Attachment");
                $('#ITFileChange').focus();
                
            }
        } else {
            alert("Enter Document Name");
            $('#ITtxtDocumentName').focus();
        }
    });
    //=======================End Save Update or Add New IT Document =============================
   
});

//=================================Save Button Method Code For Send Message==========================================
function Save() {

    var FranchiseeID = $('#lblFranchiseeID').text();
    ClientId = $('#lblClientID1').text();
    var Subject = $('#txtSubject').val();
    var Message = $('#txtMessage').val();

    var data;
    var url;
    data = '{FranchiseeID:"' + FranchiseeID +
            '",StaffId:"' + StaffId +
            '",ClientId:"' + ClientId +
           '",Subject:"' + Subject +
           '",Message:"' + Message + '"}';
    url = "ClientsList.aspx/SaveMasterData";
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: data,
        success: function (response) {
            if (response.d != "Record Not Added ..?") {
                ClientId = response.d;

                var data = "";
                var url = "";
                AllAttachment = JSON.stringify(GetReplypAttachmentDetails());
                //AllBankDetails = JSON.stringify(GetBankDetails());
                $.ajax({
                    url: 'ClientsList.aspx/SaveDetails',
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
                        }
                        else {
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
function GetReplypAttachmentDetails() {

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



//===================================Start Get IT Clients Method============================
function GetITClientsDetails() {
    $('#tblITClientList tr').remove();
    var count = 0;
    var data = "";
    $.ajax({
        type: "POST",
        url: "ClientRegistration.aspx/GetITClientsDetails",
        data: data,
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
                        + "<td class='customertd'>" + value.PANNumber + "</td>"
                        + "<td class='customertd'>" + value.ApplicantName + "</td>"
                        + "<td class='customertd'>" + value.ApplicantMobileNo + "</td>"
                        + "<td class='customertd' style='display:none;'>" + value.StaffId + "</td>"
                        + "<td class='center'><button id='btnEdit' title='View/Edit Details' class='btn btn-primary btn-xs' data-toggle='modal' data-target='#myITModal'><i class='ace-icon fa fa-edit  bigger-110 icon-only'></i></button>&nbsp;"
                        + "<button id='btnReply' style='Display:none' title='Reply to HeadOffice' class='btn btn-success btn-xs'  data-toggle='modal' data-target='#myModalReply'><i class='ace-icon fa fa-reply  bigger-110 icon-only'></i></button>&nbsp;"
                        + "<button id='btnExport' title='Export to Excel' class='btn btn-danger btn-xs'><i class='ace-icon fa fa-file-excel-o bigger-110 icon-only'></i></button></td>"
                        + "</tr>";
                    $('#tblITClientList').append(rows);
                });
            } else {
                var rows = "<tr><td colspan='8' style='text-align: center;font-family:Calibri;font-size:16px;font-weight:bold;color:Red' >data does not exist..!</td></tr>"
                $('#tblITClientList').append(rows);
            }
        }
    });
}
//===================================End Get IT Clients Method=============================


//===================================Start Update Or Add New Documents========================
function UpdateOrAddITNewDocument()
{
    UpdatePhotoSource =$('#ITFileChangePhotoSource').val(); 
    UpdateFileName = $('#ITFileChangePhotoFileName').val();
    UpdateDocumentName = $('#ITtxtDocumentName').val();
    var data;
    var url;
    data = '{ClientId:"' + ClientId +
            '",UpdateDocumentId:"' + UpdateDocumentId +
             '",UpdateDocumentName:"' + UpdateDocumentName +
              '",ExistingDocument:"' + ExistingDocument +
           '",UpdatePhotoSource:"' + UpdatePhotoSource +
            '",UpdateFileName:"' + UpdateFileName +'"}';

    url = "ClientRegistration.aspx/Update_AddITDocument";
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: data,
        success: function (response) {
            if (response.d != "Record Not Added ..?") {

                ClientId = response.d;
                $('#ChangeITDocument').modal('toggle');
                ViewDoc(ClientId);
            }
            else {
                alert('Failed....! Try Again.');
            }
        }
    });

}
//===================================End Update Or Add New Documents========================

//===========================Start View IT Client Details On ModalBox==============================
function View(ClientID) {
    $('#tblAccount2 tr').remove();
    var count = 0;
    var data = '{ClientID:"' + ClientID + '"}';

    $.ajax({
        type: "post",
        url: "ClientRegistration.aspx/ViewModelBox",
        data: data,
        contentType: "application/json",
        dataType: "json",

        success: function (response) {
            $.each(response.d, function (index, value) {

                //Client Details
                $("#txtITClientID").val(value.ClientId);
                $("#txtITPANNumber").val(value.PANNumber);
                $("#txtITApplicantName").val(value.ApplicantName);
                $("#lblITRegDate").text(value.RegDate);
                $("#txtITApplicantFatherName").val(value.ApplicantFatherName);
                $("#txtITApplicantAddress").val(value.ApplicantAddress);
                $("#txtITPinCode").val(value.Pincode);
                $("#txtITBirthDate").val(value.BirthDate);
                $("#txtITApplicantMobileNo").val(value.ApplicantMobileNo);
                $("#txtITApplicantEmailID").val(value.ApplicantEmail);
                $("#ddlITState").val(value.StateCode);
                $("#txtITCitizenship").val(value.Citizenship);
                $("#txtITAadharNumber").val(value.AadharNo);
                $("#txtITDPortalPassword").val(value.ITDPortalPassword);

                //===Select EmployedType=====
                var EmpType = value.EmployedType;
                var j = $('#ddlITEmployedType option').length;
                var val1 = "";
                for (var i = 0; i < j; i++) {
                    val1 = $('#ddlITEmployedType option')[i].text;
                    if (val1 == EmpType) {
                        $('#ddlITEmployedType option')[i].selected = true;
                        $('#ddlITEmployedType').trigger('change');
                        break;
                    }
                }

                //===Bind Account Numbers=====
                var rows = "";
                var a = $('#tblAccount2 tr:last td:nth-child(1)').text();
                if (a == "") {
                    rows = "<tr class='data-contact-person1'>"
                         + "<td style='display:none;'><lable id='lblAccountId' class='lblAccountId'>" + value.AccountId + "</lable></td>"
                    + "<td>"
                + "<div class='row' style='margin-top: 10px'>"
                + "<div class='col-lg-6 col-md-6 col-sm-6'>"
                + "<div class='form-group'>"
                + "<label class='control-label col-lg-4 col-md-4 col-sm-4' style='color: #337ab7;'>Account Number<label style='color: red;'>*</label></label>"
                 + "<div class='col-lg-8 col-md-8 col-sm-8'>"
                + "<input type='text' placeholder='ENTER BANK ACCOUNT NUMBER' value='" + value.AccountNo + "' class='BankAccno form-control' name='req' id='txtBankAccno' onkeypress='return isNumber(event)' />"
                + "</div>"
                + "</div>"
                + "</div>"
                + "<div class='col-lg-6 col-md-6 col-sm-6'>"
                + "<div class='form-group'>"
                + "<label class='control-label col-lg-3 col-md-3 col-sm-3' style='color: #337ab7;'>"
                + "IFSC Code"
                + "<label style='color: red;'>*</label></label>"
                + "<div class='col-lg-7 col-md-7 col-sm-7'>"
                + "<input type='text' placeholder='ENTER IFSC CODE' maxlength='11' value='" + value.IFSC + "' class='IFSC form-control' name='req' id='txtIFSC' onkeydown='upperCaseF(this)' onkeypress='return nospaces(event)'   />"
               + "</div>"
                + "<div class='col-lg-1 col-md-1 col-sm-1'>"
                + "<button id='AddITRow' class='btn btn-primary btn-xs' title='Add Multiple Account Number'>"
                + "<i class='ace-icon fa fa-plus  bigger-110 icon-only'></i>"
                + " </button>"
                + "</div>"
                + "</div>"
                + "</div>"
                + "</div>"
                + "</td>"
                + "</tr>"
                    $("#tblAccount2").append(rows);
                }
                else {
                    rows = "<tr class='data-contact-person1'>"
                         + "<td style='display:none;'><lable id='lblAccountId' class='lblAccountId'>" + value.AccountId + "</lable></td>"
                            + "<td>"
                        + "<div class='row' style='margin-top: 10px'>"
                        + "<div class='col-lg-6 col-md-6 col-sm-6'>"
                        + "<div class='form-group'>"
                        + "<label class='control-label col-lg-4 col-md-4 col-sm-4' style='color: #337ab7;'>Account Number<label style='color: red;'>*</label></label>"
                        + "<div class='col-lg-8 col-md-8 col-sm-8'>"
                        + "<input type='text' placeholder='ENTER BANK ACCOUNT NUMBER' value='" + value.AccountNo + "' class='BankAccno form-control' name='req' id='txtBankAccno ' onkeypress='return isNumber(event)' />"
                        + "</div>"
                        + "</div>"
                        + "</div>"
                        + "<div class='col-lg-6 col-md-6 col-sm-6'>"
                        + "<div class='form-group'>"
                        + "<label class='control-label col-lg-3 col-md-3 col-sm-3' style='color: #337ab7;'>"
                        + "IFSC Code"
                        + "<label style='color: red;'>*</label></label>"
                        + "<div class='col-lg-7 col-md-7 col-sm-7'>"
                        + "<input type='text' placeholder='ENTER IFSC CODE' value='" + value.IFSC + "' maxlength='11' class='IFSC form-control' name='req' id='txtIFSC' onkeydown='upperCaseF(this)' onkeypress='return nospaces(event)'   />"
                        + "</div>"
                        //+ "<div class='col-lg-1 col-md-1 col-sm-1'>"
                        //+ "<a  id='btndelete'><i class='ace-icon fa fa-trash-o red icon-only bigger-130'></i></a>"
                        //+ "</div>"
                        + "</div>"
                        + "</div>"
                        + "</div>"
                        + "</td>"
                        + "</tr>"
                    $("#tblAccount2").append(rows);
                }
            });

        },
        failure: function () {
        }
    });
}
//==============================End View IT Client Details On ModalBox==================================

//===========================Start View IT Documents Method==============================
function ViewDoc(ClientID) {
    $("#tblITDocuments tr").remove();
    $("#tblITFooter tr").remove();
    var count = 0;
    var data = '{ClientID:"' + ClientID + '"}';

    $.ajax({
        type: "post",
        url: "ClientRegistration.aspx/ViewDocumentsModelBox",
        data: data,
        contentType: "application/json",
        dataType: "json",

        success: function (response) {
            $.each(response.d, function (index, value) {
                console.log(response);
                count = count + 1;
                var rows = "";

                var a = $('#tblITDocuments tr:first td:nth-child(1)').text();
                if (a == "") {
                    rows += "<tr>"
                    + "<td class='customertd' style='width:20px;'>" + value.DocumentName + "</td>"
                    + "</tr>"
                    + "<tr>"
                    if (getExtension(value.DocumentPath) == "pdf") {
                        rows += "<td class='customertd'><label id='ITdocumentId' style='display:none;'>" + value.DocumentId + "</label><a id='Downloadpdf' onClick='openTab(this)' name='" + value.DocumentPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a>&nbsp;<a id='btnITchange' href='#' data-toggle='modal' data-target='#ChangeITDocument'>Change</a></td>";
                    } else {
                        rows += "<td class='customertd'><label id='ITdocumentId' style='display:none;'>" + value.DocumentId + "</label><img id='myImg' src='" + value.DocumentPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' data-id='" + value.DocumentPath + "' />&nbsp;<a id='btnITchange' href='#' data-toggle='modal' data-target='#ChangeITDocument'>Change</a></td>";
                    }
                    + "</tr>"

                    $('#tblITDocuments').append(rows);
                } else {
                    rows += "<td class='customertd' style='width:20px;'></td>";
                    $('#tblITDocuments tr:first').append(rows);
                    $('#tblITDocuments tr:first td:nth-child(' + count + ')').append(value.DocumentName);


                    var rows1 = "<td class='customertd'></td>";
                    $('#tblITDocuments tr:last').append(rows1);
                    var rows2 = "";
                    if (getExtension(value.DocumentPath) == "pdf") {
                        rows2 += "<label id='ITdocumentId' style='display:none;'>" + value.DocumentId + "</label><a id='Downloadpdf' onClick='openTab(this)' name='" + value.DocumentPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a>&nbsp;<a id='btnITchange' href='#' data-toggle='modal' data-target='#ChangeITDocument'>Change</a>";
                    } else {
                        rows2 += "<label id='ITdocumentId' style='display:none;'>" + value.DocumentId + "</label><img id='myImg' src='" + value.DocumentPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' data-id='" + value.DocumentPath + "' />&nbsp;<a id='btnITchange' href='#' data-toggle='modal' data-target='#ChangeITDocument'>Change</a>";
                    }
                    $('#tblITDocuments tr:last td:nth-child(' + count + ')').append(rows2);
                }
            });

            var footer_rows = "<tr><td colspan='" + count + "' style='text-align:right;'><a class='btn btn-sm' id='btnITAddDocument' href='#' data-toggle='modal' data-target='#ChangeITDocument'><i class='fa fa-plus '></i> Upload New Documents</a></td></tr>";
            $('#tblITFooter').append(footer_rows);


        },
        failure: function () {
        }
    });
}
//==============================End View IT Documents Method==================================


//=======================Start View IT Client Details On ModalBox=============================
$(document).on('click', '#btnEdit', function () {
    BindStateDropdown();
    var $row = $(this).closest("tr");
    var ClientID = $row.find("td:nth-child(3)").text();
    View(ClientID);
    ViewDoc(ClientID);

});
//=======================End View IT Client Details On ModalBox=============================


//=======================Start  btnITchange Document =============================
$(document).on('click', '#btnITchange', function () {

    var Imgsrc = "";
    var pdfName = "";
    var $row = $(this).closest("td");
    //var ClientID = $row.find("td:nth-child(3)").text();
    UpdateDocumentId = $row.find("#ITdocumentId").text();
    if ($row.find("#myImg").attr('src')) {
        Imgsrc = $row.find("#myImg").attr('src');
    }
    if ($row.find("#Downloadpdf").attr('name')) {
        pdfName = $row.find("#Downloadpdf").attr('name');
    }

    if (Imgsrc != "") {
        ExistingDocument = Imgsrc;
    }
    else if (pdfName != "") {
        ExistingDocument = pdfName;
    }
    ClientId = $('#txtITClientID').val();

    UpdatePhotoSource = "";
    UpdateFileName = "";
    $('#ITtxtDocumentName').val("");
    $('#ITFileChangePhotoSource').val("");
    $('#ITFileChangePhotoFileName').val("");
    $('#btnITupload').val("Change");


});
//=======================End btnITchange Document=============================

//=======================Start Add New IT Document Document =============================
$(document).on('click', '#btnITAddDocument', function () {

    var $row = $(this).closest("td");   
    UpdateDocumentId = "";
    ExistingDocument = "";
    UpdateDocumentId = "";
    UpdatePhotoSource = "";
    UpdateFileName = "";
    $('#ITtxtDocumentName').val("");
    $('#ITFileChangePhotoSource').val("");
    ClientId = $('#txtITClientID').val();
    $('#btnITupload').val("Submit");
    
});
//=======================End Add New IT Document Document=============================



//=======================Start Get Image On Modal Box=============================
$(document).on('click', '#myImg', function () {
    var ImagePath = $(this).data('id');
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
    var ClientID = $row.find("td:nth-child(3)").text();
    var ApplicantName = $row.find("td:nth-child(5)").text();
    StaffId = $row.find("td:nth-child(7)").text();

    $('#lblFranchiseeID').text($('#ddlITFranchiseeID').val());
    $('#lblClientID1').text(ClientID);
    $('#lblApplicantName1').text(ApplicantName);
    GetReplypAttachmentDetails();
});
//=======================End Send Message to Franchisee=============================


//=================Start Add New Attachment Button======================
$(document).on('click', '#NewReplyAttach', function () {
    AddReplyAttachmentRow();
});
//=================End Add New Attachment Button======================
//==========================Start Delete Attachment Button======================================
$(document).on('click', '#btnReplydeleteattach', function () {
    $(this).closest('tr').remove();
});
//==========================End Delete Attachment Button======================================
    
//=================Start Add New Row Button======================
$(document).on('click', '#AddITRow', function () {
    AddITRow();
});
//=================End Add New Row Button======================

//==========================Start Delete Row Button======================================
$(document).on('click', '#btnITdelete', function () {
    $(this).closest('tr').remove();
});
//==========================End Delete Row Button======================================

var count = 0;
//=================Start Add New Attachment Function======================
function AddReplyAttachmentRow() {  
    var rows = "";
    var a = $('#tblAttachment3 tr:last td:nth-child(1)').text();
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
         + "<a id='NewReplyAttach'>"
         + "<i class='ace-icon fa fa-plus fa-2x  bigger-110 icon-only'></i>"
         + "</a>"
         + "</div>"
         + "</div>"
         + "</td>"
         + "</tr>"

        $("#tblAttachment3").append(rows);
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
         + "<a  id='btnReplydeleteattach'><i class='ace-icon fa fa-trash-o red icon-only bigger-130'></i></a>"
         + "</div>"
         + "</div>"
         + "</td>"
         + "</tr>"
        $("#tblAttachment3").append(rows);
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


//=================Start Update or Add NEw Document========================================
function UpdateAttachments(input, id) {
    
    if (input.files && input.files[0]) {

        var filerdr = new FileReader();
        filerdr.onload = function (e) {
           var fileExtension = (input.value.substring((input.value.lastIndexOf("\\")) + 1)).replace(/^.*\./, '');
           if (fileExtension == "jpg" || fileExtension == "jpeg" || fileExtension == "pdf" || fileExtension == "png") {

               document.getElementById(id + 'PhotoSource').value = e.target.result; //Generated DataURL
               document.getElementById(id + 'PhotoFileName').value = input.value.substring((input.value.lastIndexOf("\\")) + 1)
           }
           else {
               $("#" + id).val("");
               alert("Only Pdf/jpg/jpeg/png Format allowed");
           }
        }
        filerdr.readAsDataURL(input.files[0]);
    }

}
//========================End Update or Add NEw Document================================


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


//=================Start Add New Row Function======================
function AddITRow() {
    var rows = "";
    // $('#tblAccount tr').remove();
    var a = $('#tblAccount2 tr:first td:nth-child(1)').text();
    if (a == "") {
        rows = "<tr class='data-contact-person1'>"
        + "<td style='display:none;'><lable id='lblAccountId' class='lblAccountId'></lable></td>"
        + "<td>"
    + "<div class='row' style='margin-top: 10px'>"
    + "<div class='col-lg-6 col-md-6 col-sm-6'>"
    + "<div class='form-group'>"
    + "<label class='control-label col-lg-4 col-md-4 col-sm-4' style='color: #337ab7;'>Account Number<label style='color: red;'>*</label></label>"
     + "<div class='col-lg-8 col-md-8 col-sm-8'>"
    + "<input type='text' placeholder='ENTER BANK ACCOUNT NUMBER' class='BankAccno form-control' name='req' id='txtBankAccno' onkeypress='return isNumber(event)'  />"
    + "</div>"
    + "</div>"
    + "</div>"
    + "<div class='col-lg-6 col-md-6 col-sm-6'>"
    + "<div class='form-group'>"
    + "<label class='control-label col-lg-3 col-md-3 col-sm-3' style='color: #337ab7;'>"
    + "IFSC Code"
    + "<label style='color: red;'>*</label></label>"
    + "<div class='col-lg-7 col-md-7 col-sm-7'>"
    + "<input type='text' placeholder='ENTER IFSC CODE' maxlength='11' class='IFSC form-control' name='req' id='txtIFSC' onkeydown='upperCaseF(this)' onkeypress='return nospaces(event)'   />"
   + "</div>"
    + "<div class='col-lg-1 col-md-1 col-sm-1'>"
    + "<button id='AddITRow' class='btn btn-primary btn-xs' title='Add Multiple Account Number'>"
    + "<i class='ace-icon fa fa-plus  bigger-110 icon-only'></i>"
    + " </button>"
    + "</div>"
    + "</div>"
    + "</div>"
    + "</div>"
    + "</td>"
    + "</tr>"
        $("#tblAccount2").append(rows);
    }
    else {
        rows = "<tr class='data-contact-person1'>"
            + "<td style='display:none;'><lable id='lblAccountId' class='lblAccountId'></lable></td>"
                + "<td>"
            + "<div class='row' style='margin-top: 10px'>"
            + "<div class='col-lg-6 col-md-6 col-sm-6'>"
            + "<div class='form-group'>"
            + "<label class='control-label col-lg-4 col-md-4 col-sm-4' style='color: #337ab7;'>Account Number<label style='color: red;'>*</label></label>"
            + "<div class='col-lg-8 col-md-8 col-sm-8'>"
            + "<input type='text' placeholder='ENTER BANK ACCOUNT NUMBER' class='BankAccno form-control' name='req' id='txtBankAccno ' onkeypress='return isNumber(event)' />"
            + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='col-lg-6 col-md-6 col-sm-6'>"
            + "<div class='form-group'>"
            + "<label class='control-label col-lg-3 col-md-3 col-sm-3' style='color: #337ab7;'>"
            + "IFSC Code"
            + "<label style='color: red;'>*</label></label>"
            + "<div class='col-lg-7 col-md-7 col-sm-7'>"
            + "<input type='text' placeholder='ENTER IFSC CODE' maxlength='11' class='IFSC form-control' name='req' id='txtIFSC' onkeydown='upperCaseF(this)' onkeypress='return nospaces(event)'   />"
            + "</div>"
            + "<div class='col-lg-1 col-md-1 col-sm-1'>"
            + "<a  id='btnITdelete'><i class='ace-icon fa fa-trash-o red icon-only bigger-130'></i></a>"
            + "</div>"
            + "</div>"
            + "</div>"
            + "</div>"
            + "</td>"
            + "</tr>"
        $("#tblAccount2").append(rows);
    }
}
//=================End Add New Row Function======================


//========================Start Do not Allow Space in TextBox===============================
function nospaces(t) {
    return t.which !== 32;
}
//=================End Do Not Allow Spaces In Textbox===================================

//================Start Allow Only Enter Numbers Mobile No Textbox=======================
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {

        return false;
    }
    return true;
}
//================End Allow Only Enter Numbers Mobile No Textbox=======================


var ITClientID = "";
//=================================Start Update PAN Based Client  Method Code==========================================
function PANBasedClientUpdate() {
    $("#loaderClientReg").show();
    //$("#loaderClientReg").fadeOut("slow");

    ITClientID = $('#txtITClientID').val();
    var ITPANNumber = $('#txtITPANNumber').val();
    var ITApplicantName = $('#txtITApplicantName').val().toUpperCase();
    var ITApplicantFatherName = $('#txtITApplicantFatherName').val().toUpperCase();
    var Address = $('#txtITApplicantAddress').val();
    var ITApplicantAddress = escape(Address);

    var ITPinCode = $('#txtITPinCode').val();
    var ITBirthDate = $('#txtITBirthDate').val();
    var ITApplicantMobileNo = $('#txtITApplicantMobileNo').val();
    var ITApplicantEmailID = $('#txtITApplicantEmailID').val();
    var ITEmployedType = $('#ddlITEmployedType option:selected').text();
    var ITState = $('#ddlITState option:selected').val();
    var ITCitizenship = $('#txtITCitizenship').val();
    var ITAadharNumber = $('#txtITAadharNumber').val();
    var ITDPortalPassword = $('#txtITDPortalPassword').val();
    var Status = "Active";

    var data;
    var url;
    data = '{ITClientID:"' + ITClientID +
            '",ITPANNumber:"' + ITPANNumber +
           '",ITApplicantName:"' + ITApplicantName +
            '",ITApplicantFatherName:"' + ITApplicantFatherName +
           '",ITApplicantAddress:"' + ITApplicantAddress +
           '",ITPinCode:"' + ITPinCode +
           '",ITBirthDate:"' + ITBirthDate +
           '",ITApplicantMobileNo:"' + ITApplicantMobileNo +
           '",ITApplicantEmailID:"' + ITApplicantEmailID +
           '",ITEmployedType:"' + ITEmployedType +
           '",ITState:"' + ITState +
           '",ITCitizenship:"' + ITCitizenship +
           '",ITAadharNumber:"' + ITAadharNumber +
           '",ITDPortalPassword:"' + ITDPortalPassword +
           '" ,Status:"' + Status + '"}';

    url = "ClientRegistration.aspx/UpdatePANClientMasterData";

    if (ITPANNumber != "") {
        //document.getElementById("txtPANError1").style.display = "none";

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: data,
            success: function (response) {
                if (response.d != "Record Not Added ..?") {

                    ITClientID = response.d;

                    var data = "";
                    var url = "";
                    var AllBankDetails = JSON.stringify(GetPANBasedBankDetailsUpdate());
                    $.ajax({
                        url: 'ClientRegistration.aspx/UpdatePANClientDetails',
                        type: 'POST',
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify({ 'AllBankDetails': AllBankDetails }),
                        success: function (response) {
                            if (response.d != "Record Not Added ..?") {
                                alert("Updated Successfully..!!");
                                $('#myITModal').modal('toggle');
                                GetITClientsDetails();
                                $("#loaderClientReg").hide();
                            }
                            else {
                                $("#loaderClientReg").hide();
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
        //document.getElementById("txtPANError1").style.display = "block";
        //$('#txtPAN').focus();
    }
}

//-------------------------------Start Update Account Details Method--------------------------
function GetPANBasedBankDetailsUpdate() {
    
    var BankDetails = [];
    $('tr.data-contact-person1').each(function () {
        var AccountId = "";
        if ($(this).find(".lblAccountId").text() != "") {
            AccountId = $(this).find(".lblAccountId").text();
        }
        if ($(this).find(".BankAccno").val() != "") {
            var AccountNo = $(this).find(".BankAccno").val();
        }
        if ($(this).find(".IFSC").val() != "") {
            var IFSC = $(this).find(".IFSC").val();
        }
        //Status = 'InActive';
        var alldata = {
            'ClientId': ITClientID,
            'AccountId': AccountId,
            'AccountNo': AccountNo,
            'IFSC': IFSC
        }

        BankDetails.push(alldata);
    });
    console.log(BankDetails);
    return BankDetails;
}
//-------------------------------End Update Account Details Method--------------------------
//=====================================End Update PAN Based Client Method Code=========================================
//=====================================Start Upper CAse=========================================
function upperCaseF(a) {
    setTimeout(function () {
        a.value = a.value.toUpperCase();
    }, 1);
}
//=====================================End Upper CAse=========================================

//===============================Start Bind Start DropDown============================
function BindStateDropdown() {

    $.ajax({
        type: "POST",
        url: "ClientRegistration.aspx/BindStateDropDown",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {

            var State_Name = $(".StateName");
            State_Name.empty().append('<option selected="selected" value="0">--Select--</option>');
            $.each(r.d, function (key, value) {
                State_Name.append($("<option></option>").val(this['StateCode']).text(this['StateName']));
            });

        }
    });
}
//========================================End Bind Start DropDown========================================

