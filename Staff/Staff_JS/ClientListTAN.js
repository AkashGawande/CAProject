/// <reference path="ClientList.js" />


$(document).ready(function () {
    GetTDSClientsDetails();

    //=======================Start Update TDS Client Details=============================
    $('#btnTDSUpdate').click(function () {
        if ($('#txtTDSOfficeName').val() != "") {
            if ($('#txtTDSAuthorisedPerson').val() != "") {
                if ($('#txtTDSOfficeAddress').val() != "") {
                    if ($('#txtTDSPinCode').val() != "") {
                        if ($('#ddlTDSState').val() != "0") {
                            if ($('#txtTDSOfficeEmailID').val() != "") {
                                TANBasedClientUpdate();
                            } else {
                                $('#txtTDSOfficeEmailID').focus();
                            }
                        } else {
                            $('#ddlTDSState').focus();
                        }
                    } else {
                        $('#txtTDSPinCode').focus();
                    }
                } else {
                    $('#txtTDSOfficeAddress').focus();
                }
            } else {
                $('#txtTDSAuthorisedPerson').focus();
            }
        } else {
            $('#txtTDSOfficeName').focus();
        }
        
    });
    //=======================End Update TDS Client Details=============================



    //=======================Start Save Update or Add New TDS  Document =============================
    $('#btnTDSUploadChange').click(function () {
        debugger;
        if ($('#TDStxtDocumentName').val() != "") {
            if ($('#TDSFileChangePhotoSource').val() != "" && $('#TDSFileChangePhotoFileName').val() != "") {
                UpdateOrAddTDSNewDocument();
            } else {
                alert("Select Attachment");
                $('#TDSFileChange').focus();

            }
        } else {
            alert("Enter Document Name");
            $('#TDStxtDocumentName').focus();
        }
    });
    //=======================End Save Update or Add New TDS Document =============================

   
});


//=======================Start Send Message to Franchisee=============================
$(document).on('click', '#btnTDSReply', function () {

    $('#tblAttachment3 tr').remove();
    var $row = $(this).closest("tr");
    var ClientID = $row.find("td:nth-child(3)").text();
    var ApplicantName = $row.find("td:nth-child(5)").text();
    StaffId = $row.find("td:nth-child(7)").text();

    $('#lblFranchiseeID').text($('#ddlTDSFranchiseeID').val());
    $('#lblClientID1').text(ClientID);
    $('#lblApplicantName1').text(ApplicantName);
    AddAttachmentRow();
});
//=======================End Send Message to Franchisee=============================


//=======================Start View TDS Client Details On ModalBox=============================
$(document).on('click', '#btnTDSEdit', function () {
    BindStateDropdown();
    var $row = $(this).closest("tr");
    var ClientID = $row.find("td:nth-child(3)").text();
    ViewTDS(ClientID);
    ViewTDSDoc(ClientID);
});
//=======================End View TDS Client Details On ModalBox=============================
//=================Start Add New Row Button======================
$(document).on('click', '#AddRowTDS', function () {
    AddTDSRow();
});
//=================End Add New Row Button======================
//==========================Start Delete Row Button======================================
$(document).on('click', '#btndeleteTDS', function () {
    $(this).closest('tr').remove();
});
//==========================End Delete Row Button======================================

//===================================Start Get TDS Clients Method============================
function GetTDSClientsDetails() {
    $('#tblTDSClientList tr').remove();
    var count = 0;
    var data = "";
    $.ajax({
        type: "POST",
        url: "ClientRegistration.aspx/GetTDSClientsDetails",
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
                        + "<td class='customertd'>" + value.TANNumber + "</td>"
                        + "<td class='customertd'>" + value.OfficeName + "</td>"
                        + "<td class='customertd'>" + value.AuthorisedPersone + "</td>"
                        + "<td class='customertd' style='display:none;'>" + value.StaffId + "</td>"
                        + "<td class='center'><button id='btnTDSEdit' title='View/Edit Details' class='btn btn-primary btn-xs' data-toggle='modal' data-target='#myTDSModal'><i class='ace-icon fa fa-edit  bigger-110 icon-only'></i></button>&nbsp;"
                        + "<button id='btnTDSReply' style='Display:none' title='Reply to Franchisee' class='btn btn-success btn-xs'  data-toggle='modal' data-target='#myModalReply'><i class='ace-icon fa fa-reply  bigger-110 icon-only'></i></button>&nbsp;"
                        + "<button id='btnTDSExport' title='Export to Excel' class='btn btn-danger btn-xs'><i class='ace-icon fa fa-file-excel-o bigger-110 icon-only'></i></button></td>"
                        + "</tr>";
                    $('#tblTDSClientList').append(rows);
                });
            } else {
                var rows = "<tr><td colspan='8' style='text-align: center;font-family:Calibri;font-size:16px;font-weight:bold;color:Red' >data does not exist..!</td></tr>"
                $('#tblTDSClientList').append(rows);
            }
        }
    });
}
//===================================End Get TDS Clients Method=============================

//===========================Start View TDS Client Details On ModalBox==============================
function ViewTDS(ClientID) {
    $('#tblPerson tr').remove();
    var count = 0;
    var data = '{ClientID:"' + ClientID + '"}';

    $.ajax({
        type: "post",
        url: "ClientRegistration.aspx/ViewTDSModelBox",
        data: data,
        contentType: "application/json",
        dataType: "json",

        success: function (response) {
            $.each(response.d, function (index, value) {

                //TDS Client Details
                $("#txtTDSClientID").val(value.ClientId);
                $("#txtTDSTANNumber").val(value.TANNumber);
                $("#txtTDSOfficeName").val(value.OfficeName);
                $("#lblTDSRegDate").text(value.RegDate);
                $("#txtTDSAuthorisedPerson").val(value.AuthorisedPersone);
                $("#txtTDSOfficeAddress").val(value.OfficeAddress);
                $("#txtTDSPinCode").val(value.Pincode);
                $("#txtTDSOfficeEmailID").val(value.OfficeEmail);
                $("#txtTDSTracesUserId").val(value.TracesUserId);
                $("#txtTDSTracesPassword").val(value.TracesPassword);
                
                //===Select State=====
                var State = value.StateCode;
                var j = $('#ddlTDSState option').length;
                var val1 = "";
                for (var i = 0; i < j; i++) {
                    val1 = $('#ddlTDSState option')[i].value;
                    if (val1 == State) {
                        $('#ddlTDSState option')[i].selected = true;
                        $('#ddlTDSState').trigger('change');
                        break;
                    }
                }
                //===Bind Contact Person=====
                var rows = "";
                var a = $('#tblPerson tr:last td:nth-child(1)').text();
                if (a == "") {
                    rows = "<tr class='data-contact-personTDS'>"
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
                + "<button id='AddRowTDS' class='btn btn-primary btn-xs' title='Add Multiple Contact Person'>"
                + "<i class='ace-icon fa fa-plus  bigger-110 icon-only'></i>"
                + " </button>"
                + "</div>"
                + "</div>"
                + "</div>"
                + "</div>"
                + "</td>"
                + "</tr>"
                    $("#tblPerson").append(rows);
                }
                else {
                    rows = "<tr class='data-contact-personTDS'>"
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
                    $("#tblPerson").append(rows);
                }
            });

        },
        failure: function () {
        }
    });
}
//==============================End View TDS Client Details On ModalBox==================================
//===========================Start View TDS Documents Method==============================
function ViewTDSDoc(ClientID) {
    $("#tblTDSDocuments tr").remove();
    $("#tblTDSFooter tr").remove();
    var count = 0;
    var data = '{ClientID:"' + ClientID + '"}';

    $.ajax({
        type: "post",
        url: "ClientRegistration.aspx/ViewTDSDocumentsModelBox",
        data: data,
        contentType: "application/json",
        dataType: "json",

        success: function (response) {
            $.each(response.d, function (index, value) {
                console.log(response);
                count = count + 1;
                var rows = "";
               
                var a = $('#tblTDSDocuments tr:first td:nth-child(1)').text();
                if (a == "") {
                    rows += "<tr>"
                    + "<td class='customertd' style='width:20px;'>" + value.DocumentName + "</td>"
                    + "</tr>"
                    + "<tr>"
                    if (getExtension(value.DocumentPath) == "pdf") {
                        rows += "<td class='customertd'><label id='TDSdocumentId' style='display:none;'>" + value.DocumentId + "</label><a id='Downloadpdf' onClick='openTab(this)' name='" + value.DocumentPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a>&nbsp;<a id='btnTDSchange' href='#' data-toggle='modal' data-target='#ChangeTDSDocument'>Change</a></td>";
                    } else {
                        rows += "<td class='customertd'><label id='TDSdocumentId' style='display:none;'>" + value.DocumentId + "</label><img id='myImg' src='" + value.DocumentPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' data-id='" + value.DocumentPath + "' />&nbsp;<a id='btnTDSchange' href='#' data-toggle='modal' data-target='#ChangeTDSDocument'>Change</a></td>";
                    }
                    + "</tr>"

                    $('#tblTDSDocuments').append(rows);
                } else {
                    rows += "<td class='customertd' style='width:20px;'></td>";
                    $('#tblTDSDocuments tr:first').append(rows);
                    $('#tblTDSDocuments tr:first td:nth-child(' + count + ')').append(value.DocumentName);


                    var rows1 = "<td class='customertd'></td>";
                    $('#tblTDSDocuments tr:last').append(rows1);
                    var rows2 = "";
                    if (getExtension(value.DocumentPath) == "pdf") {
                        rows2 += "<label id='TDSdocumentId' style='display:none;'>" + value.DocumentId + "</label><a id='Downloadpdf' onClick='openTab(this)' name='" + value.DocumentPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a>&nbsp;<a id='btnTDSchange' href='#' data-toggle='modal' data-target='#ChangeTDSDocument'>Change</a>";
                    } else {
                        rows2 += "<label id='TDSdocumentId' style='display:none;'>" + value.DocumentId + "</label><img id='myImg' src='" + value.DocumentPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' data-id='" + value.DocumentPath + "' />&nbsp;<a id='btnTDSchange' href='#' data-toggle='modal' data-target='#ChangeTDSDocument'>Change</a>";
                    }
                    $('#tblTDSDocuments tr:last td:nth-child(' + count + ')').append(rows2);
                }
            });
            var footer_rows = "<tr><td colspan='" + count + "' style='text-align:right;'><a class='btn btn-sm' id='btnTDSAddDocument' href='#' data-toggle='modal' data-target='#ChangeTDSDocument'><i class='fa fa-plus '></i> Upload New Documents</a></td></tr>";
            $('#tblTDSFooter').append(footer_rows);

        },
        failure: function () {
        }
    });
}
//==============================End View TDS Documents Method==================================

//=================Start Add New Row Function======================
function AddTDSRow() {
    var rows = "";
    var a = $('#tblPerson tr:first td:nth-child(1)').text();
    
    if (a == "") {
        rows = "<tr class='data-contact-personTDS'>"
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
    + "<button id='AddRow' class='btn btn-primary btn-xs' title='Add Multiple Contact Person'>"
    + "<i class='ace-icon fa fa-plus  bigger-110 icon-only'></i>"
    + " </button>"
    + "</div>"
    + "</div>"
    + "</div>"
    + "</div>"
    + "</td>"
    + "</tr>"
        $("#tblPerson").append(rows);
    }
    else {
        rows = "<tr class='data-contact-personTDS'>"
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
            + "<a  id='btndeleteTDS'><i class='ace-icon fa fa-trash-o red icon-only bigger-130'></i></a>"
            + "</div>"
            + "</div>"
            + "</div>"
            + "</div>"
            + "</td>"
            + "</tr>"
        $("#tblPerson").append(rows);
    }
}
//=================End Add New Row Function======================

var TDSClientID = "";
//=================================Start Update TAN Based Client  Method Code==========================================
function TANBasedClientUpdate() {
    $("#loaderClientReg").show();
    //$("#loaderClientReg").fadeOut("slow");
    
    TDSClientID = $('#txtTDSClientID').val();
    var TDSTANNumber = $('#txtTDSTANNumber').val();
    var TDSOfficeName = $('#txtTDSOfficeName').val().toUpperCase();
    var TDSAuthorisedPerson = $('#txtTDSAuthorisedPerson').val().toUpperCase();

    var Address = $('#txtTDSOfficeAddress').val();
    var TDSOfficeAddress = escape(Address);
    var TDSPinCode = $('#txtTDSPinCode').val();
    var TDSOfficeEmailID = $('#txtTDSOfficeEmailID').val();
    var TDSState = $('#ddlTDSState option:selected').val();


    var TDSTracesUserId = $('#txtTDSTracesUserId').val();
    var TDSTracesPassword = $('#txtTDSTracesPassword').val();
    var Status = "Active";

    var data;
    var url;
    data = '{TDSClientID:"' + TDSClientID +
            '",TDSTANNumber:"' + TDSTANNumber +
           '",TDSOfficeName:"' + TDSOfficeName +
            '",TDSAuthorisedPerson:"' + TDSAuthorisedPerson +
           '",TDSOfficeAddress:"' + TDSOfficeAddress +
           '",TDSPinCode:"' + TDSPinCode +
           '",TDSOfficeEmailID:"' + TDSOfficeEmailID +
           '",TDSState:"' + TDSState +
           '",TDSTracesUserId:"' + TDSTracesUserId +
           '",TDSTracesPassword:"' + TDSTracesPassword +
           '" ,Status:"' + Status + '"}';

    url = "ClientRegistration.aspx/UpdateTANClientMasterData";

    if (TDSTANNumber != "") {
        //document.getElementById("txtTANError1").style.display = "none";

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: data,
            success: function (response) {
                if (response.d != "Record Not Added ..?") {

                    TDSClientID = response.d;

                    var data = "";
                    var url = "";
                    //AllAttachment = JSON.stringify(GetDocumentAttachmentDetails());
                    var TANContactPersoneDetails = JSON.stringify(GetTANBasedContactPersoneDetailsUpdate());
                    $.ajax({
                        url: 'ClientRegistration.aspx/UpdateTANClientDetails',
                        type: 'POST',
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify({ 'TANContactPersoneDetails': TANContactPersoneDetails }),
                        success: function (response) {
                            if (response.d != "Record Not Added ..?") {
                                alert("Updated Successfully..!!");
                                $('#myTDSModal').modal('toggle');
                                GetTDSClientsDetails();
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
        //document.getElementById("txtTANError1").style.display = "block";
        //$('#txtPAN').focus();
    }
}

//-------------------------------Start Update Contact person Details Method--------------------------
function GetTANBasedContactPersoneDetailsUpdate() {
   
    var TANContactPersoneDetail = [];
    $('tr.data-contact-personTDS').each(function () {
        var PersonID = "";
        if ($(this).find(".PersonId").text() != "") {
            var PersonID = $(this).find(".PersonId").text();
        }

        if ($(this).find(".PersonName").val() != "") {
            var TANContactPersoneName = $(this).find(".PersonName").val();
        }
        if ($(this).find(".MobileNo").val() != "") {
            var TANContactPersoneMobile = $(this).find(".MobileNo").val();
        }
        var Status = 'InActive';
        var alldata = {
            'ClientId': TDSClientID,
            'PersonID': PersonID,
            'PersoneName': TANContactPersoneName,
            'MobileNo': TANContactPersoneMobile
        }

        TANContactPersoneDetail.push(alldata);
    });
    console.log(TANContactPersoneDetail);
    return TANContactPersoneDetail;
}
//-------------------------------End Update Contact person Details Method--------------------------
//=================================End Update TAN Based Client  Method Code==========================================


//=======================Start  btnTDschange Document =============================
$(document).on('click', '#btnTDSchange', function () {
    debugger;
    var Imgsrc = "";
    var pdfName = "";
    var $row = $(this).closest("td");
    //var ClientID = $row.find("td:nth-child(3)").text();
    UpdateDocumentId = $row.find("#TDSdocumentId").text();
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
    ClientId = $('#txtTDSClientID').val();

    UpdatePhotoSource = "";
    UpdateFileName = "";
    $('#TDStxtDocumentName').val("");
    $('#TDSFileChangePhotoSource').val("");
    $('#TDSFileChangePhotoFileName').val("");
    $('#btnTDSupload').val("Change");


});
//=======================End btnTDSchange Document=============================


//=======================Start Add New TDS Document Document =============================
$(document).on('click', '#btnTDSAddDocument', function () {
    debugger;
    var $row = $(this).closest("td");
    UpdateDocumentId = "";
    ExistingDocument = "";
    UpdateDocumentId = "";
    UpdatePhotoSource = "";
    UpdateFileName = "";
    $('#TDStxtDocumentName').val("");
    $('#TDSFileChangePhotoSource').val("");
    $('#TDSFileChangePhotoFileName').val("");
    ClientId = $('#txtTDSClientID').val();
    $('#btnTDSupload').val("Submit");

});
//=======================End Add New TDS Document Document=============================



//===================================Start Update Or Add New TDS Documents========================
function UpdateOrAddTDSNewDocument() {
    debugger;
    UpdatePhotoSource = $('#TDSFileChangePhotoSource').val();
    UpdateFileName = $('#TDSFileChangePhotoFileName').val();
    UpdateDocumentName = $('#TDStxtDocumentName').val();
    var data;
    var url;
    data = '{ClientId:"' + ClientId +
            '",UpdateDocumentId:"' + UpdateDocumentId +
             '",UpdateDocumentName:"' + UpdateDocumentName +
              '",ExistingDocument:"' + ExistingDocument +
           '",UpdatePhotoSource:"' + UpdatePhotoSource +
            '",UpdateFileName:"' + UpdateFileName + '"}';

    url = "ClientRegistration.aspx/Update_AddTDSDocument";
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: data,
        success: function (response) {
            if (response.d != "Record Not Added ..?") {

                ClientId = response.d;
                $('#ChangeTDSDocument').modal('toggle');
                ViewTDSDoc(ClientId);
            }
            else {
                alert('Failed....! Try Again.');
            }
        }
    });

}
//===================================End Update Or Add New TDS Documents========================
