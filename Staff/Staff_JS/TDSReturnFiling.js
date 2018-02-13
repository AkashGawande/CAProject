var count = 0;
var ClientId = "";
var FileTransactionId = "";
var PersoneId = "";
var ContactPersone = "", MobileNo = "";
var ReferanceId = "";
var PaymentMode = "", ChequeNo = "", Narratin = "", ChequePhotoSource = "", ChequeFileName = "",DueDate="";
var Amount = "";
var PaymentStatus = "";
var TypeofReturn = "";
var QuarterlyReturn = "";

var Attachment = [];

var AllAttachment = "";

var PhotoSource = "";
var PhotoName = "";
var DocumentName = "";
var fileExtension = "";
var Status = "InActive";


var duedate = "", Narration = "", ChequeNo = "", Amount = "", filename = "", Sfilename = "";

var FileTId = "";
var UpdateDocumentName = "";
var ExistingDocument = "";
var UpdateDocumentId = "";
var UpdatePhotoSource = "";
var UpdateFileName = "";

$(document).ready(function () {
    ActiveClass("TDS");

    AddAttachmentRow();
    BindStateDropdown();
    GetTDSFiles();

    //===========================start Contact Persone Mobile No on  ContactName on change ==================================
    $(".ContactName").change(function () {
        var PersoneId = $(".ContactName option:selected").val();
        if ($(".ContactName option:selected").index() != 0) {
            GetMobileNo(PersoneId);
        }
        else {
            $('#txtContactPersonMobile').val("");
        }

    });
    //===========================end Contact Persone Mobile No on  ContactName on change ====================================


    //==========================Start Save Button======================================
    $('#btnSave').click(function () {
        var data = "";
        var url = "";
        url = "TDSReturnFiling.aspx/GetSessionStatus";

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: data,
            success: function (response) {

                if (response.d != "") {
                    Save();
                }
                else {
                    window.location.replace("../SessionExpired.aspx");
                }
            }
        });


        
    });
    //==========================End Save Button======================================


    //===========================Start Hide & Show Cheque Details PaymentMode On Change ==================================
    $(".PaymentMode").change(function () {
        var PaymentMode = $(".PaymentMode option:selected").val();

        if ($(".PaymentMode option:selected").index() != 0) {

            if (PaymentMode == "Cheque") {
                $('#ChequeDetailsRow').show();
                $('#CreditDueDate').hide();
                $('#txtDueDate').val("");
            }
            else if (PaymentMode == "Credit") {
                $('#AmountChequePhotoSource').val("");
                $('#AmountChequeFileName').val("");
                $('#AmountCheque').val("");
                $('#txtAmountCheque').val("");
                $('#txtNaration').val("");
                $('#ChequeDetailsRow').hide();
                $('#CreditDueDate').show();
            }
            else  {
                $('#AmountChequePhotoSource').val("");
                $('#AmountChequeFileName').val("");
                $('#AmountCheque').val("");
                $('#txtAmountCheque').val("");
                $('#txtNaration').val("");

                $('#ChequeDetailsRow').hide();
                $('#CreditDueDate').hide();
                $('#txtDueDate').val("");
            }
        }
        else {
            //$('#ChequeDetailsRow').hide();
            $('#AmountChequePhotoSource').val("");
            $('#AmountChequeFileName').val("");
            $('#AmountCheque').val("");
            $('#txtAmountCheque').val("");
            $('#txtNaration').val("");
            $('#ChequeDetailsRow').hide();
            $('#CreditDueDate').hide();
            $('#txtDueDate').val("");

        }

    });
    //===========================End Hide & Show Cheque Details PaymentMode On Change ====================================


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
                if (filename != "") {
                    $('#Photocheque').show();
                    $('#UploadPhotocheque').hide();
                }
                else {
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
                url: "TDSReturnFiling.aspx/GetTDSPersonMobile",
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
    $('#ChequePhotoTDS').click(function () {
        var ImagePath = $('#ChequePhotoTDS').attr('src');
        var img = ".." + ImagePath;
        $("#ModalImage").attr("src", img);

        $("#btnDownload").attr('href', img);
        $("#btnDownload").attr('download', img);
    });
    //=======================End Get Image On Modal Box=============================

    //=======================Start Save Update or Add New TDS  Document =============================
    $('#btnTDSUploadChange').click(function () {
        
        if ($('#TDStxtDocumentName').val() != "") {
            if ($('#TDSFileChangePhotoSource').val() != "" && $('#TDSFileChangeFileName').val() != "") {
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

    //=======================Start Update IT Client Details=============================
    $('#btnUpdateTDS').click(function () {
         
        if ($('#ddlTDSContactPerson option:selected').index() != 0) {
            if ($('#ddlTDSTypofReturn').val() != null) {
                if ($('#ddlTDSQuarterlyReturn option:selected').index() != 0) {
                    if ($('#ddlTDSPaymentMode option:selected').index() != 0) {
                        if ($('#txtTDSAmount').val() != "") {
                            UpdateTDS();
                            
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
    //=======================End Update IT Client Details=============================


    //=======================Start btnGSTPChequechange Document=============================
    $('#btnTDSChequechange').click(function () {
        
        UpdatePhotoSource = "";
        UpdateFileName = "";
        FileTId = "";
        ExistingDocument = "";

        $('#ChangeChequePhotoSource').val("");
        $('#ChangeChequeFileName').val("");


        var Imgsrc = "";
        var pdfName = "";

        FileTId = $('#txtTDSFileTransactionID').val();

        if ($("#ChequePhotoTDS").attr('src')) {
            Imgsrc = $("#ChequePhotoTDS").attr('src');
        }
        if ($("#DownloadChequeTDS").attr('name')) {
            pdfName = $("#DownloadChequeTDS").attr('name');
        }

        if (Imgsrc != "") {
            ExistingDocument = Imgsrc;
        }
        else if (pdfName != "") {
            ExistingDocument = pdfName;
        }
    });
    //=======================End btnGSTPChequechange Document=============================

    //==========================Start Update Cheque Document Tax Payer======================================
    $('#btnChequeChange').click(function () {
        
        UpdatePhotoSource = $('#ChangeChequePhotoSource').val();
        UpdateFileName = $('#ChangeChequeFileName').val();

        UpdateChequeDocument(UpdatePhotoSource, UpdateFileName);
    });
    //==========================End Update Cheque Document Tax Payer======================================



    
});

//=======================Start Edit TDS File Details=============================
$(document).on('click', '#btnEdit', function () {
    var $row = $(this).closest("tr");
    var FileTransactionID = $row.find("td:nth-child(3)").text();
    View(FileTransactionID);
    ViewDoc(FileTransactionID);
});
//=======================End Edit TDS File Details=============================


//========================Save TDS Master Data=================================
function Save() {   
    $("#loaderTDS").show();
    //$("#loaderTDS").fadeOut("slow");
    PaymentMode = $('.PaymentMode option:selected').val();
    if (PaymentMode == "CASH") {
        PaymentStatus = "Paid"
    }
    else if (PaymentMode == "Cheque") {
        PaymentStatus = "Paid"
        ChequeNo = $('#txtAmountCheque').val();
        Narratin = $('#txtNaration').val();
        ChequePhotoSource = $('#AmountChequePhotoSource').val();
        ChequeFileName = $('#AmountChequeFileName').val();
    }
    else if (PaymentMode == "Credit") {
        DueDate = $('#txtDueDate').val();
        PaymentStatus = "UnPaid"
    }

    Amount = $('#txtAmount').val();
    PersoneId = $('#ddlContactName').val();
    MobileNo = $('#txtContactPersonMobile').val();
    TypeofReturn = $('.TypofReturn').val();
    QuarterlyReturn = $('.QuarterlyReturn option:selected').val();
    var data;
    var url;
    data = '{ClientId:"' + ClientId +
          '",PersoneId:"' + PersoneId +
            '",MobileNo:"' + MobileNo +
           '",PaymentMode:"' + PaymentMode +
            '",Amount:"' + Amount +
           '",PaymentStatus:"' + PaymentStatus +
           '",ChequeNo:"' + ChequeNo +
           '",DueDate:"' + DueDate +
           '",Narratin:"' + Narratin +
           '",ChequePhotoSource:"' + ChequePhotoSource +
           '",ChequeFileName:"' + ChequeFileName +
           '",TypeofReturn:"' + TypeofReturn +
           '",QuarterlyReturn:"' + QuarterlyReturn +
           '",Status:"' + Status + '"}';

    url = "TDSReturnFiling.aspx/SaveTDSMasterData";

   
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: data,
        success: function (response) {
            if (response.d != "Record Not Added ..?") {
               
                FileTransactionId = response.d;

                var data = "";
                var url = "";
                AllAttachment = JSON.stringify(GetAttachmentDetails());
                
                $.ajax({
                    url: 'TDSReturnFiling.aspx/SaveTDSDocumentData',
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({ 'AllAttachment': AllAttachment }),
                    success: function (response) {
                        if (response.d != "Record Not Added ..?") {
                            $('#ITForm').hide();
                            $('#MessageForm').show();
                            $("#loaderTDS").hide();                           
                        }
                        else {
                            $("#loaderTDS").hide();
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

//-------------------------------Start Save Document Details Method--------------------------
function GetAttachmentDetails() {

    Attachment = [];
    $('tr.data-contact-person2').each(function () {

        if ($(this).find(".DocumentName").val() != "") {
            DocumentName = $(this).find(".DocumentName").val();
        }
        if ($(this).find(".PhotoSource").val() != "") {
            PhotoSource = $(this).find(".PhotoSource").val();
        }
        if ($(this).find(".PhotoFileName").val() != "") {
            PhotoName = $(this).find(".PhotoFileName").val();
        }
        Status = 'InActive';
        var alldata = {
            'FileTransactionId': FileTransactionId,
            'DocumentName': DocumentName,
            'PhotoSource': PhotoSource,
            'PhotoName': PhotoName
        }

        Attachment.push(alldata);
    });
    console.log(Attachment);
    return Attachment;
}
//-------------------------------End Save Document Details Method--------------------------

//========================End Save TDS Master Data============================

//=================================Start Update TDS Client File  Method Code==========================================
function UpdateTDS() {
    $("#loaderTDS").show();
    //$("#loaderTDS").fadeOut("slow");

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
           '",Sfilename:"' + Sfilename +
           '" ,Status:"' + Status + '"}';

    url = "TDSReturnFiling.aspx/UpdateTDSClientMasterData";
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
                $("#loaderTDS").hide();
            }
            else {
                $("#loaderTDS").hide();
                alert('Failed....! Try Again.');
            }
        }
    });
}
//=================================End Update TDS Client File  Method Code==========================================



//================Start Allow Only Enter Numbers Textbox=======================
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {

        return false;
    }
    return true;
}
//================End Allow Only Enter Numbers Textbox=======================

//===================Start Contact Persone Mobile no Valication====================================
var re = "";
function validateContactPersonrMobileNO(x) {

    if (document.getElementById(x).value != "") {
        
         if (x == "txtContactPersonMobile")
        { re = /[0-9]{10,10}$/; }

        if (re.test(document.getElementById(x).value)) {
            document.getElementById(x + "Error").style.display = "none";

            $('#btnSave').prop('disabled', false);
            return true;
        }
        else {
            document.getElementById(x).style.background = '#ffffff';
            document.getElementById(x + "Error").style.display = "block";
            $('#btnSave').prop('disabled', true);
            return false;
        }
    }

    document.getElementById(x).style.background = '#ffffff';
    document.getElementById(x + "Error").style.display = 'none';
    //$("#" + x).focus();
    $('#btnSave').prop('disabled', false);
}
//===================End Contact Persone Mobile no Valication======================================


//=================Start Get  Attachment Details========================================
function Attachments(input, count) {
    if (input.files && input.files[0]) {

        var filerdr = new FileReader();
        filerdr.onload = function (e) {
            fileExtension = (input.value.substring((input.value.lastIndexOf("\\")) + 1)).replace(/^.*\./, '');
            if (fileExtension == "jpg" || fileExtension == "jpeg" || fileExtension == "pdf" || fileExtension == "png") {

            document.getElementById('PhotoSource' + count + '').value = e.target.result; //Generated DataURL
            document.getElementById('PhotoFileName' + count + '').value = input.value.substring((input.value.lastIndexOf("\\")) + 1)
            }
            else {
                $("#" + count).val("");
                alert("Only Pdf/jpg/jpeg/png Format allowed");
            }
        }
        filerdr.readAsDataURL(input.files[0]);
    }

}
//========================End Get  Attachment Details


//=================Start Get  Attachment Cheuqe Details========================================
function AttachmentsCheque(input, Id) {
    if (input.files && input.files[0]) {

        var filerdr = new FileReader();
        filerdr.onload = function (e) {
            fileExtension = (input.value.substring((input.value.lastIndexOf("\\")) + 1)).replace(/^.*\./, '');
            if (fileExtension == "jpg" || fileExtension == "jpeg" || fileExtension == "pdf" || fileExtension == "png") {

            document.getElementById(Id + 'PhotoSource').value = e.target.result; //Generated DataURL
            document.getElementById(Id + 'FileName').value = input.value.substring((input.value.lastIndexOf("\\")) + 1)
            }
            else {
                $("#" + Id).val("");
                alert("Only Pdf/jpg/jpeg/png Format allowed");
            }
        }
        filerdr.readAsDataURL(input.files[0]);
    }

}
//========================End Get  Attachment Cheuqe Details================================


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

//==========================Start Delete Attachment Button======================================
$(document).on('click', '#btndeleteattach', function () {
    $(this).closest('tr').remove();
});
//==========================End Delete Attachment Button======================================


//=================Start Add New Attachment Button======================
$(document).on('click', '#NewAttach', function () {
    AddAttachmentRow();
});
//=================End Add New Attachment Button======================

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

//===============================Start Bind Start DropDown============================
function BindContactPersoneDropdown(CID) {
    var data;
    var url;
    data = '{ClientId:"' + CID + '"}';

    url = "TDSReturnFiling.aspx/BindContactPersoneDropDown";
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {

            var ContactPersone= $(".ContactName");
            ContactPersone.empty().append('<option selected="selected" value="0">--Select Contact Person--</option>');
            $.each(r.d, function (key, value) {
                ContactPersone.append($("<option></option>").val(this['PersonID']).text(this['TANContactPersoneName']));
            });

        }
    });
}
//========================================End Bind Start DropDown========================================


//================================Start Get IFSc Code On Account No Change Event========================
function GetMobileNo(PersonId) {
    var data;
    var url;
    data = '{PersonId:"' + PersonId + '"}';

    url = "TDSReturnFiling.aspx/GetMobileNo";

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: data,
        success: function (response) {
            if (response.d != "Record Not Added ..?") {
                $('#txtContactPersonMobile').val(response.d);
            }
            else {
                alert('Failed....! Try Again.');
            }
        }
    });
}
//================================End Get IFSc Code On Account No Change Event========================


//========================Fill All The Details On The Basic Of Pan No Or TAN No==========================
function FillAllTheClientDetails() {
    
   
    var TanNo = $('#txtTAN').val();
   

    var data = "";
    var url = "";

    data = '{TanNo:"' + TanNo +'"}';

    url = "TDSReturnFiling.aspx/GetClientDetails"

    if (TanNo != "") {
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {
                console.log(r);
                if (r.d != "") {
                    $('#btnSave').attr('disabled', false);
                    document.getElementById("nodataerror").style.display = "none";
                    $.each(r.d, function (key, value) {                       
                        $('#txtTAN').val(value.TANNumber);                       
                        $('#txtClientName').val(value.OfficeName);
                        $('#txtAuthorisedPersonName').val(value.AuthorisedPersonName);
                        $('#txtemail').val(value.ApplicantEmail);
                        $('#ddlstate').val(value.StateCode);
                        BindContactPersoneDropdown(value.ClientID)
                        ClientId = value.ClientID;
                    });
                }
                else {
                   
                    document.getElementById("nodataerror").style.display = "block";
                    Cleartextbox();
                    $('#btnSave').attr('disabled', true);
                }


            }
        });
    } else {
        document.getElementById("nodataerror").style.display = "none";
        //$('#txtPAN').val("");
        $('#txtTAN').val("");
        Cleartextbox();
    }
}
//====================================End Fill All The Details On The Basic Of Pan No Or TAN No==========================

//============================start Clear and diabled All the Textbox=================================================
function Cleartextbox() {

    $('#txtClientName').val("");
    $('#txtAuthorisedPersonName').val("");
    $('#txtemail').val("");
    $('.StateName option')[0].selected = true;
    $('.ContactName option').remove();
    $('#txtContactPersonMobile').val("");

}

//============================End Clear and diabled All the Textbox=================================================


//========================Start Convert to Upparcase n=================================
function upperCaseF(a) {
    setTimeout(function () {
        a.value = a.value.toUpperCase();
    }, 1);
}
//==========================End Convert to Upparcase Validation================================

//========================Start Do not Allow Space in TextBox===============================
function nospaces(t) {
    return t.which !== 32;
}
//=================End Do Not Allow Spaces In Textbox===================================

//=======================start disabled Or Enabled On keyup===============================
function DisabledPAN_TANOnKeyup(x) {

    var No = document.getElementById(x).value;
    if (No != "") {
        if (x == "txtPAN") {
            $('#txtTAN').attr('disabled', true);

        }
        else if (x == "txtTAN") {
            $('#txtPAN').attr('disabled', true);

        }

    }
    else {
        $('#txtTAN').attr('disabled', false);
        $('#txtPAN').attr('disabled', false);
    }
}
//=======================start disabled Or Enabled On keyup===============================

//=======================Start Validation Pan And Tan===================================
function validate_PAN_TAN_GST_Number(x) {

    
    var No = document.getElementById(x).value;
    //var panchar = PanNo[4];

    if (No != "") {

        if (x == "txtPAN")
        { re = /[A-Z]{5}[0-9]{4}[A-Z]{1}/; }
        else if (x == "txtTAN")
        { re = /[A-Z]{4}[0-9]{5}[A-Z]{1}/; }
        
        if (re.test(No)) {
                document.getElementById(x + "Error").style.display = "none";                
                $('#btnSave').prop('disabled', false);
                FillAllTheClientDetails();
                return true;
        }
        else {
            document.getElementById(x).style.background = '#ffffff';
            document.getElementById(x + "Error").style.display = "block";                  
            $('#btnSave').prop('disabled', true);
            Cleartextbox();
            return false;
        }

    }
    document.getElementById(x).style.background = '#ffffff';
    document.getElementById(x + "Error").style.display = 'none';   
    $('#btnSave').prop('disabled', false);
    FillAllTheClientDetails();

}

//======================End Validation Pan And Tan========================================

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


//===================================Start Get TDS Files Method============================
function GetTDSFiles() {
  
    $('#tblTDSFiles tr').remove();
    var url = "TDSReturnFiling.aspx/GetTDSFiles";
    var data = "";
    var count = 0;
    $.ajax({
        type: "POST",
        url: url,
        data:data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            console.log(r);
            if (r.d != "") {
                
                $.each(r.d, function (key, value) {
                    count = count + 1;
                    var rows = "<tr class='odd gradeX'>"
                        + "<td class='customertd'>" + count + "</td>"
                        + "<td class='customertd'>" + value.Date + "</td>"
                        + "<td class='customertd'>" + value.FileTransactionID + "</td>"
                        + "<td class='customertd'>" + value.ClientID + "</td>"
                        + "<td class='customertd'>" + value.OfficeName + "</td>"
                        + "<td class='customertd'>" + value.AuthorisedPersone + "</td>"
                        + "<td class='customertd' style='display:none;'>" + value.StaffID + "</td>"
                        + "<td class='center'><button id='btnEdit' title='View and Edit' class='btn btn-primary btn-xs' data-toggle='modal' data-target='#myModalTDS'><i class='ace-icon fa fa-edit  bigger-110 icon-only'></i></button>&nbsp;"
                        //+ "<button id='btnReply' title='Reply to Franchisee' class='btn btn-success btn-xs'  data-toggle='modal' data-target='#myModalReply'><i class='ace-icon fa fa-reply  bigger-110 icon-only'></i></button>&nbsp;"
                        + "<button id='btnExport' title='Export to Excel' class='btn btn-danger btn-xs'><i class='ace-icon fa fa-file-excel-o bigger-110 icon-only'></i></button></td>"
                        + "</tr>";
                    $('#tblTDSFiles').append(rows);
                });
            } else {
                var rows = "<tr><td colspan='8' style='text-align: center;font-family:Calibri;font-size:16px;font-weight:bold;color:Red' >data does not exist..!</td></tr>"
                $('#tblTDSFiles').append(rows);
            }


        }
    });
}
//===================================End Get TDS Method=============================

//===========================Start View Data Method==============================
function View(FileTransactionID) {
    
    var count = 0;
    var data = '{FileTransactionID:"' + FileTransactionID + '"}';

    $.ajax({
        type: "post",
        url: "TDSReturnFiling.aspx/ViewModelBox",
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
                duedate = value.DueDate;
                Narration = value.Narration;
                ChequeNo = value.ChequeNo;
                Amount = value.Amount;
                filename = value.ChequeFileName.split("/")[2];
                Sfilename = value.ChequeFileName.split("/")[2];
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
    $("#tblTDSFooter tr").remove();
    var count = 0;
    var data = '{FileTransactionID:"' + FileTransactionID + '"}';

    $.ajax({
        type: "post",
        url: "TDSReturnFiling.aspx/ViewDocumentsModelBox",
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
                        rows += "<td class='customertd'><label id='TDSdocumentId' style='display:none;'>" + value.DocumentID + "</label><a id='Downloadpdf' onClick='openTab(this)' name='" + value.DocumentPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a>&nbsp;<a id='btnTDSchange' href='#' data-toggle='modal' data-target='#ChangeTDSDocument'>Change</a></td>";
                    } else {
                        rows += "<td class='customertd'><label id='TDSdocumentId' style='display:none;'>" + value.DocumentID + "</label><img id='myImg' src='" + value.DocumentPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' data-id='" + value.DocumentPath + "' />&nbsp;<a id='btnTDSchange' href='#' data-toggle='modal' data-target='#ChangeTDSDocument'>Change</a></td>";
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
                        rows2 += "<label id='TDSdocumentId' style='display:none;'>" + value.DocumentID + "</label><a id='Downloadpdf' onClick='openTab(this)' name='" + value.DocumentPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a>&nbsp;<a id='btnTDSchange' href='#' data-toggle='modal' data-target='#ChangeTDSDocument'>Change</a>";
                    } else {
                        rows2 += "<label id='TDSdocumentId' style='display:none;'>" + value.DocumentID + "</label><img id='myImg' src='" + value.DocumentPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' data-id='" + value.DocumentPath + "' />&nbsp;<a id='btnTDSchange' href='#' data-toggle='modal' data-target='#ChangeTDSDocument'>Change</a>";
                    }
                    $('#tblDocumentsTDS tr:last td:nth-child(' + count + ')').append(rows2);
                }

            });
            var footer_rows = "<tr><td colspan='" + count + "' style='text-align:right;'><a class='btn btn-sm' id='btnTDSAddDocument' href='#' data-toggle='modal' data-target='#ChangeTDSDocument'><i class='fa fa-plus '></i> Upload New Documents</a></td></tr>";
            $('#tblTDSFooter').append(footer_rows);

        },
        failure: function () {
        }
    });
}
//==============================End View Documents Method==================================

//=======================Start Get Image On Modal Box=============================
$(document).on('click', '#myImg', function () {
    var ImagePath = $(this).data('id');
    var img = ".." + ImagePath;
    $("#ModalImage").attr("src", img);

    $("#btnDownload").attr('href', img);
    $("#btnDownload").attr('download', img);
});
//=======================End Get Image On Modal Box=============================

//=======================Start  btnTDschange Document =============================
$(document).on('click', '#btnTDSchange', function () {
    
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
    FileTransactionId = $('#txtTDSFileTransactionID').val();

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
    
    var $row = $(this).closest("td");
    UpdateDocumentId = "";
    ExistingDocument = "";
    UpdateDocumentId = "";
    UpdatePhotoSource = "";
    UpdateFileName = "";
    $('#TDStxtDocumentName').val("");
    $('#TDSFileChangePhotoSource').val("");
    $('#TDSFileChangePhotoFileName').val("");
    FileTransactionId = $('#txtTDSFileTransactionID').val();
    $('#btnTDSupload').val("Submit");

});
//=======================End Add New TDS Document Document=============================


//===================================Start Update Or Add New TDS Documents========================
function UpdateOrAddTDSNewDocument() {
    
    UpdatePhotoSource = $('#TDSFileChangePhotoSource').val();
    UpdateFileName = $('#TDSFileChangeFileName').val();
    UpdateDocumentName = $('#TDStxtDocumentName').val();
    var data;
    var url;
    data = '{FileTransactionId:"' + FileTransactionId +
            '",UpdateDocumentId:"' + UpdateDocumentId +
             '",UpdateDocumentName:"' + UpdateDocumentName +
              '",ExistingDocument:"' + ExistingDocument +
           '",UpdatePhotoSource:"' + UpdatePhotoSource +
            '",UpdateFileName:"' + UpdateFileName + '"}';

    url = "TDSReturnFiling.aspx/Update_AddTDSDocument";
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: data,
        success: function (response) {
            if (response.d != "Record Not Added ..?") {

                FileTransactionId = response.d;
                $('#ChangeTDSDocument').modal('toggle');
                ViewDoc(FileTransactionId);
            }
            else {
                alert('Failed....! Try Again.');
            }
        }
    });

}
//===================================End Update Or Add New TDS Documents========================


//===================================Start Update Cheque Documents========================
function UpdateChequeDocument(UpdatePhotoSource, UpdateFileName) {
    
    var data;
    var url;
    data = '{FileTId:"' + FileTId +
              '",ExistingDocument:"' + ExistingDocument +
           '",UpdatePhotoSource:"' + UpdatePhotoSource +
            '",UpdateFileName:"' + UpdateFileName + '"}';

    url = "TDSReturnFiling.aspx/UpdateChequeDocument";
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: data,
        success: function (response) {
            if (response.d != "Record Not Added ..?") {

                FileTId = response.d;
                $('#ChangeChequeDocument').modal('toggle');
                View(FileTId);
            }
            else {
                alert('Failed....! Try Again.');
            }
        }
    });

}
//===================================End Update Cheque Documents========================



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
