var count = 0;
var ClientId = "";

var FileTransactionId = "";
var AccountId = "";
var YearType = "";
var Year = "";
var PaymentMode = "";
var Amount = "";
var PaymentMode = "", ChequeNo = "", Narratin = "", ChequePhotoSource = "", ChequeFileName = "", DueDate = "";
var PaymentStatus = "";
var Status = "InActive";

var Attachment = [];

var AllAttachment = "";

var FileTId = "";
var PhotoSource = "";
var PhotoName = "";
var DocumentName = "";
var fileExtension = "";

var ITNoticeStaffId = "";
var duedate = "", Narration = "", ChequeNo = "", Amount = "", filename = "", Sfilename = "";



$(document).ready(function () {
    ActiveClass("ITN");

    BindYear();
    AddAttachmentRow();
    BindStateDropdown();
    GetITNoticeFiles();


    //==========================Start Save Button======================================
    $('#btnSave').click(function () {

        var data = "";
        var url = "";
        url = "ITNoticeCompliance.aspx/GetSessionStatus";

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
            else {
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


    //===========================start IFSC Code on  AccountNo on change ==================================
    $(".AccountNo").change(function () {
        var accountid = $(".AccountNo option:selected").val();
        if ($(".AccountNo option:selected").index() != 0) {
            GetIFSCCode(accountid);
        }
        else {
            $('#txtIfseCode').val("");
        }

    });
    //===========================End IFSC Code on  AccountNo on change ====================================

    //===========================Start Get Year ddlAssesmentYear On Change ==================================
    $(".AssesmentYear").change(function () {
        YearType = $(".AssesmentYear").val();
        BindYear(YearType);

    });
    //===========================End Get Year ddlAssesmentYear On Change ====================================

    //************************Update Methods************************************************
    //===================================Start Credit and Cheque Validations=============================
    $('#ddlITNoticePaymentMode').change(function () {
         
        var PaymentMode = $("#ddlITNoticePaymentMode option:selected").val();

        if ($("#ddlITNoticePaymentMode option:selected").index() != 0) {

            if (PaymentMode == "Cheque") {
                $('#txtITNoticeAmount').val(Amount);
                $('#divChequeNotice').show();
                $('#divDueDateNotice').hide();
                $('#txtITNoticeDueDate').val("");
                $('#txtNoticeChequeNo').val(ChequeNo);
                $('#txtNoticeNarration').val(Narration);
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
                $('#txtITNoticeAmount').val(Amount);
                $('#txtITNoticeDueDate').val(duedate);
                $('#txtNoticeChequeNo').val("");
                $('#txtNoticeNarration').val("");
                $('#divChequeNotice').hide();
                $('#divDueDateNotice').show();
            }
            else {
                $('#ChequePhotoSource').val("");
                $('#ChequeFileName').val("");
                $('#txtNoticeChequeNo').val("");
                $('#txtNoticeNarration').val("");
                $('#txtITNoticeAmount').val(Amount);
                $('#divChequeNotice').hide();
                $('#divDueDateNotice').hide();
                $('#txtITNoticeDueDate').val("");
            }
        }
        else {
            //$('#ChequeDetailsRow').hide();
            $('#ChequePhotoSource').val("");
            $('#ChequeFileName').val("");
            $('#txtITNoticeAmount').val("");
            $('#txtNoticeChequeNo').val("");
            $('#txtNoticeNarration').val("");
            $('#divChequeNotice').hide();
            $('#divDueDateNotice').hide();
            $('#txtITNoticeDueDate').val("");

        }
    });
    //===================================End Credit and Cheque Validations=============================

    //===================================Start Get IFSC on DDL Account change=============================
    $('#ddlAccountNoNotice').change(function () {
        if ($('#ddlAccountNoNotice').val() != "0") {
            var data = '{AccountId:"' + $('#ddlAccountNoNotice').val() + '"}';
            $.ajax({
                type: "post",
                url: "ITNoticeCompliance.aspx/GetITIFSC",
                data: data,
                contentType: "application/json",
                dataType: "json",
                success: function (response) {
                    console.log(response);
                    $.each(response.d, function (index, value) {
                        $('#txtIFSC').val(value.IFSC);
                    });
                },
                failure: function () {
                }
            });
        } else {
            $('#txtIFSC').val("");
        }
    });
    //===================================End Get IFSC on DDL Account change=============================

    //=======================Start Get Image On Modal Box=============================   
    $('#ChequePhotoNotice').click(function () {
        var ImagePath = $('#ChequePhotoNotice').attr('src');
        var img = ".." + ImagePath;
        $("#ModalImage").attr("src", img);

        $("#btnDownload").attr('href', img);
        $("#btnDownload").attr('download', img);
    });
    //=======================End Get Image On Modal Box=============================


    //=======================Start Update IT Client Details=============================
    $('#btnUpdateITNotice').click(function () {
        
        if ($('#ddlAccountNoNotice option:selected').index() != 0) {
            if ($('#ddlITNoticeYearType option:selected').index() != 0) {
                if ($('#ddlITNoticeYear option:selected').val() != "") {
                    if ($('#ddlITNoticePaymentMode option:selected').index() != 0) {
                        if ($('#txtITNoticeAmount').val() != "") {
                            UpdateITNotice();

                        } else {
                            $('#txtITNoticeAmount').focus();
                        }
                    } else {
                        $('#ddlITNoticePaymentMode').focus();
                    }
                } else {
                    $('#ddlITNoticeYear').focus();
                }
            } else {
                $('#ddlITNoticeYearType').focus();
            }
        } else {
            $('#ddlAccountNoNotice').focus();
        }

    });
    //=======================End Update IT Client Details=============================

    //=======================Start Save Update or Add New IT Document =============================
    $('#btnITUploadChange').click(function () {
        
        if ($('#ITtxtDocumentName').val() != "") {
            if ($('#ITFileChangePhotoSource').val() != "" && $('#ITFileChangeFileName').val() != "") {
                UpdateOrAddITNoticeNewDocument();
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


    //***********************End Update Method****************************************

    //=======================Start btnGSTPChequechange Document=============================
    $('#btnITNChequechange').click(function () {
        
        UpdatePhotoSource = "";
        UpdateFileName = "";
        FileTId = "";
        ExistingDocument = "";

        $('#ChangeChequePhotoSource').val("");
        $('#ChangeChequeFileName').val("");


        var Imgsrc = "";
        var pdfName = "";

        FileTId = $('#txtITNoticeFileTransactionID').val();

        if ($("#ChequePhotoNotice").attr('src')) {
            Imgsrc = $("#ChequePhotoNotice").attr('src');
        }
        if ($("#DownloadChequeNotice").attr('name')) {
            pdfName = $("#DownloadChequeNotice").attr('name');
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


//=================================Save Button Method Code==========================================
function Save() {
     
    $("#loaderITN").show();
    //$("#loaderITN").fadeOut("slow");

    AccountId = $('.AccountNo option:selected').val();
    YearType = $('.AssesmentYear option:selected').val();
    Year = $('.Year option:selected').val();
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

    var data;
    var url;
    data = '{ClientId:"' + ClientId +
            '",AccountId:"' + AccountId +
           '",YearType:"' + YearType +
           '",Year:"' + Year +
           '",PaymentMode:"' + PaymentMode +
            '",Amount:"' + Amount +
           '",PaymentStatus:"' + PaymentStatus +
           '",ChequeNo:"' + ChequeNo +
           '",DueDate:"' + DueDate +
           '",Narratin:"' + Narratin +
           '",ChequePhotoSource:"' + ChequePhotoSource +
           '",ChequeFileName:"' + ChequeFileName +
           '",Status:"' + Status + '"}';

    url = "ITNoticeCompliance.aspx/SaveITNoticeMasterData";

    //if (PANCard != "" || TAN_No != "") {
    // document.getElementById("txtPANError1").style.display = "none";

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
                    url: 'ITNoticeCompliance.aspx/SaveITNoticeDocumentData',
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({ 'AllAttachment': AllAttachment }),
                    success: function (response) {
                        if (response.d != "Record Not Added ..?") {
                            $('#ITForm').hide();
                            $('#MessageForm').show();
                            $("#loaderITN").hide();
                        }
                        else {
                            $("#loaderITN").hide();
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

//=====================================End Save Method Code=========================================



//============================ Bind Year Dropdown=====================================
function BindYear(yeartype) {
    
    $('#ddlYear option').remove();
    var selectBox = document.getElementById('ddlYear');
    var date = new Date()
    var year = date.getFullYear();
    var month = date.getMonth() + 1;

    if (yeartype == "Assesment_Year") {
        if (month >= 4) {
            for (var i = year + 1; i > year; i--) {
                var option = document.createElement('option');
                var j = i;
                Fyear = (--j) + "-" + i
                option.value = Fyear;
                option.innerHTML = Fyear;
                selectBox.appendChild(option);
            }
        }
        else {
            for (var i = year; i > year - 1; i--) {
                var option = document.createElement('option');
                var j = i;
                Fyear = (--j) + "-" + i
                option.value = Fyear;
                option.innerHTML = Fyear;
                selectBox.appendChild(option);
            }
        }
    }
    else if (yeartype == "Financial_Year") {
        for (var i = year; i >= year - 10; i--) {
            var option = document.createElement('option');
            var j = i;
            Fyear = (--j) + "-" + i
            option.value = Fyear;
            option.innerHTML = Fyear;
            selectBox.appendChild(option);
        }
    }


}

//==========================End  Bind Year DropDown====================================


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
                $("#"+count).val("");
                alert("Only Pdf/jpg/jpeg/png Format allowed");
            }
            }
        filerdr.readAsDataURL(input.files[0]);
    }

}
//========================End Get  Attachment Details================================


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
//===============================End Bind Start DropDown============================


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

//========================Fill All The Details On The Basic Of Pan No Or TAN No==========================
function FillAllTheClientDetails() {

    var PanNo = $('#txtPAN').val();
    


    var data = "";
    var url = "";

    data = '{PanNo:"' + PanNo +'"}';

    url = "ITNoticeCompliance.aspx/GetClientDetails"

    if (PanNo != "") {
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {
                console.log(r);
                if (r.d != "") {

                    document.getElementById("nodataerror").style.display = "none";
                    $.each(r.d, function (key, value) {
                        $('#txtPAN').val(value.PANNumber);                        
                        $('#txtClientName').val(value.ApplicantName);
                        $('#txtDOB').val(value.BirthDate);
                        $('#txtAppmobile').val(value.ApplicantMobileNo);
                        $('#txtemail').val(value.ApplicantEmail);
                        $('#ddlstate').val(value.StateCode);
                        $('#txtAadharNo').val(value.AadharNo);
                        
                        BindAccountNoDropdown(value.ClientID);
                        ClientId = value.ClientID;
                    });
                }
                else {

                    document.getElementById("nodataerror").style.display = "block";
                    Cleartextbox();
                }


            }
        });
    } else {
        document.getElementById("nodataerror").style.display = "none";
        $('#txtPAN').val("");
       
        Cleartextbox();
    }
}
//====================================End Fill All The Details On The Basic Of Pan No Or TAN No==========================

//============================start Clear and diabled All the Textbox=================================================
function Cleartextbox() {

    $('#txtClientName').val("");
    $('#txtDOB').val("");
    $('#txtAppmobile').val("");
    $('#txtemail').val("");   
    $('#txtAadharNo').val("");

    $('.StateName option')[0].selected = true;
    var AccountNo = $(".AccountNo");
    AccountNo.empty().append('<option selected="selected" value=""></option>');
    $('#txtIfseCode').val("");

}

//============================End Clear and diabled All the Textbox=================================================



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


//===============================Start Bind Start DropDown============================
function BindAccountNoDropdown(CID) {
    var data;
    var url;
    data = '{ClientId:"' + CID + '"}';

    url = "IncomeTaxFiling.aspx/BindAccountNoDropDown";
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {

            var AccountNo = $(".AccountNo");
            AccountNo.empty().append('<option selected="selected" value="0">--Select Account No--</option>');
            $.each(r.d, function (key, value) {
                AccountNo.append($("<option></option>").val(this['AccountId']).text(this['BankAccono']));
            });

        }
    });
}
//========================================End Bind Start DropDown========================================


//================================Start Get IFSc Code On Account No Change Event========================
function GetIFSCCode(AccountId) {
    var data;
    var url;
    data = '{AccountId:"' + AccountId + '"}';

    url = "IncomeTaxFiling.aspx/GetIFSC_Code";

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: data,
        success: function (response) {
            if (response.d != "Record Not Added ..?") {
                $('#txtIfseCode').val(response.d);
            }
            else {
                alert('Failed....! Try Again.');
            }
        }
    });
}
//================================End Get IFSc Code On Account No Change Event========================



//**************************************Update Part Start*****************************************
//=======================Start View IT File Details=============================
$(document).on('click', '#btnEdit', function () {
    BindStateDropdown();
    var $row = $(this).closest("tr");
    var FileTransactionID = $row.find("td:nth-child(3)").text();
    View(FileTransactionID);
    ViewDoc(FileTransactionID);
});
//=======================End View IT File Details=============================



//===================================Start Get IT Files Method============================
function GetITNoticeFiles() {
    $('#tblITNoticeFiling tr').remove();
    var data = "";
    var url = "ITNoticeCompliance.aspx/GetITFiles";
    var count = 0;
    $.ajax({
        type: "POST",
        url: url,
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
                        + "<td class='customertd'>" + value.Date + "</td>"
                        + "<td class='customertd'>" + value.FileTransactionID + "</td>"
                        + "<td class='customertd'>" + value.ClientID + "</td>"
                        + "<td class='customertd'>" + value.ApplicantName + "</td>"
                        + "<td class='customertd'>" + value.ApplicantMobileNo + "</td>"
                        + "<td class='customertd' style='display:none;'>" + value.StaffID + "</td>"
                        //+ "<td class='customertd'>" + value.FirmLicense + "</td>"
                        //+ "<td class='customertd'><img  class='img-rounded zoom' style='height:30px;width:30px;' src=" + value.FirmLicense + " /></td>"
                        + "<td class='center'><button id='btnEdit' title='View Details' class='btn btn-primary btn-xs' data-toggle='modal' data-target='#myModal'><i class='ace-icon fa fa-edit  bigger-110 icon-only'></i></button>&nbsp;"
                        //+ "<button id='btnITReply1' title='Reply to Franchisee' class='btn btn-success btn-xs'  data-toggle='modal' data-target='#myModalReply'><i class='ace-icon fa fa-reply  bigger-110 icon-only'></i></button>&nbsp;"
                        + "<button id='btnExport' title='Export to Excel' class='btn btn-danger btn-xs'><i class='ace-icon fa fa-file-excel-o bigger-110 icon-only'></i></button></td>"
                        + "</tr>";
                    $('#tblITNoticeFiling').append(rows);
                });
            } else {
                var rows = "<tr><td colspan='8' style='text-align: center;font-family:Calibri;font-size:16px;font-weight:bold;color:Red' >data does not exist..!</td></tr>"
                $('#tblITNoticeFiling').append(rows);
            }


        }
    });
}
//===================================End Get Clients Method=============================
//===========================Start View Data Method==============================
function View(FileTransactionID) {
    $("#tblAccountNos tr").remove();
    var count = 0;
    var data = '{FileTransactionID:"' + FileTransactionID + '"}';

    $.ajax({
        type: "post",
        url: "ITNoticeCompliance.aspx/ViewModelBox",
        data: data,
        contentType: "application/json",
        dataType: "json",

        success: function (response) {

            var AccountNo = $(".ddlAccountNo");
            AccountNo.empty().append('<option selected="selected" value="0">--Select--</option>');

            $.each(response.d, function (index, value) {

                //IT File Details
                $("#txtITNoticeFileTransactionID").val(value.FileTransactionID);
                $("#txtITNoticeClientID").val(value.ClientID);
                $("#txtITNoticePANNumber").val(value.PANNumber);
                $("#lblITNoticeDate").text(value.Date);
                $("#txtITNoticeApplicantName").val(value.ApplicantName);
                $("#txtITNoticeBirthDate").val(value.BirthDate);
                $("#txtITNoticeApplicantMobileNo").val(value.ApplicantMobileNo);
                $("#txtITNoticeApplicantEmailID").val(value.ApplicantEmail);


                //===Select State=====
                var State = value.StateCode;
                var j = $('#ddlITNoticeState option').length;
                var val1 = "";
                for (var i = 0; i < j; i++) {
                    val1 = $('#ddlITNoticeState option')[i].value;
                    if (val1 == State) {
                        $('#ddlITNoticeState option')[i].selected = true;
                        $('#ddlITNoticeState').trigger('change');
                        break;
                    }
                }


                $("#txtITNoticeAadharNumber").val(value.AadharNo);

                BindYearForUpdate(value.YearType);
                $("#ddlITNoticeYearType").val(value.YearType);
                $("#ddlITNoticeYear").val(value.Year);

                $("#txtITNoticeAmount").val(value.Amount);

                duedate = value.DueDate;
                Narration = value.Narration;
                ChequeNo = value.ChequeNo;
                Amount = value.Amount;
                filename = value.ChequeFileName.split("/")[2];

                //===Select Payment Mode=====
                var Payment = value.PaymentMode;
                var j2 = $('#ddlITNoticePaymentMode option').length;
                var val2 = "";
                for (var i = 0; i < j2; i++) {
                    val2 = $('#ddlITNoticePaymentMode option')[i].value;
                    if (val2 == Payment) {
                        $('#ddlITNoticePaymentMode option')[i].selected = true;
                        $('#ddlITNoticePaymentMode').trigger('change');
                        break;
                    }
                }
                
                //====Get Cheque and Credit Details=======
                if (value.PaymentMode == "Cheque") {
                    $("#txtITNoticeChequeNo").val(value.ChequeNo);
                    $("#txtITNoticeNarration").val(value.Narration);

                    if (getExtension(value.ChequeFileName) == "pdf") {
                        $("#ChequePhotoNotice").hide();
                        $("#DownloadChequeNotice").show();
                        $("#DownloadChequeNotice").attr('name', value.ChequeFileName);
                    } else {
                        $("#DownloadChequeNotice").hide();
                        $("#ChequePhotoNotice").show();
                        $("#ChequePhotoNotice").attr("src", value.ChequeFileName);
                    }
                } else if (value.PaymentMode == "Credit") {
                    $("#txtITNoticeDueDate").val(value.DueDate);
                }

                //Account Details
                AccountNo.append($("<option></option>").val(this['AccountId']).text(this['AccountNo']));

                //===Select Account Nos=====
                var accountid = value.AccountID;
                var j3 = $('#ddlAccountNoNotice option').length;
                var val3 = "";
                for (var i = 0; i < j3; i++) {
                    val3 = $('#ddlAccountNoNotice option')[i].value;
                    if (val3 == accountid) {
                        $('#ddlAccountNoNotice option')[i].selected = true;
                        $('#ddlAccountNoNotice').trigger('change');
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
    $("#tblDocuments tr").remove();
    $("#tblITFooter tr").remove();
    var count = 0;
    var data = '{FileTransactionID:"' + FileTransactionID + '"}';

    $.ajax({
        type: "post",
        url: "ITNoticeCompliance.aspx/ViewDocumentsModelBox",
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
                var a = $('#tblDocuments tr:first td:nth-child(1)').text();
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

                    $('#tblDocuments').append(rows);
                } else {
                    rows += "<td class='customertd' style='width:20px;'></td>";
                    $('#tblDocuments tr:first').append(rows);
                    $('#tblDocuments tr:first td:nth-child(' + count + ')').append(value.DocumentName);


                    var rows1 = "<td class='customertd'></td>";
                    $('#tblDocuments tr:last').append(rows1);
                    var rows2 = "";
                    if (getExtension(value.DocumentPath) == "pdf") {
                        rows2 += "<label id='ITdocumentId' style='display:none;'>" + value.DocumentId + "</label><a id='Downloadpdf' onClick='openTab(this)' name='" + value.DocumentPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a>&nbsp;<a id='btnITchange' href='#' data-toggle='modal' data-target='#ChangeITDocument'>Change</a>";
                    } else {
                        rows2 += "<label id='ITdocumentId' style='display:none;'>" + value.DocumentId + "</label><img id='myImg' src='" + value.DocumentPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' data-id='" + value.DocumentPath + "' />&nbsp;<a id='btnITchange' href='#' data-toggle='modal' data-target='#ChangeITDocument'>Change</a>";
                    }
                    $('#tblDocuments tr:last td:nth-child(' + count + ')').append(rows2);
                }

            });
            var footer_rows = "<tr><td colspan='" + count + "' style='text-align:right;'><a class='btn btn-sm' id='btnITAddDocument' href='#' data-toggle='modal' data-target='#ChangeITDocument'><i class='fa fa-plus '></i> Upload New Documents</a></td></tr>";
            $('#tblITFooter').append(footer_rows);

        },
        failure: function () {
        }
    });
}
//==============================End View Documents Method==================================

var UpdateDocumentName = "";
var ExistingDocument = "";
var UpdateDocumentId = "";
var UpdatePhotoSource = "";
var UpdateFileName = "";
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
    FileTransactionId = $('#txtITNoticeFileTransactionID').val();

    UpdatePhotoSource = "";
    UpdateFileName = "";
    $('#ITtxtDocumentName').val("");
    $('#ITFileChangePhotoSource').val("");
    $('#ITFileChangeFileName').val("");
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
    FileTransactionId = $('#txtITNoticeFileTransactionID').val();

    $('#btnITupload').val("Submit");

});
//=======================End Add New IT Document Document=============================


//============================ Bind Year Dropdown=====================================
function BindYearForUpdate(yeartype) {
    $('#ddlITNoticeYear option').remove();
    var selectBox = document.getElementById('ddlITNoticeYear');
    var date = new Date()
    var year = date.getFullYear();
    var month = date.getMonth() + 1;

    for (var i = year + 1; i >= year - 10; i--) {
        var option = document.createElement('option');
        var j = i;
        Fyear = (--j) + "-" + i
        option.value = Fyear;
        option.innerHTML = Fyear;
        selectBox.appendChild(option);
    }
    //}


}

//==========================End  Bind Year DropDown====================================


//=======================Start Get Image On Modal Box=============================
$(document).on('click', '#myImg', function () {
    var ImagePath = $(this).data('id');
    var img = ".." + ImagePath;
    $("#ModalImage").attr("src", img);

    $("#btnDownload").attr('href', img);
    $("#btnDownload").attr('download', img);
});
//=======================End Get Image On Modal Box=============================


//=================================Start Update IT Client  Method Code==========================================
function UpdateITNotice() {
    $("#loaderITN").show();
    //$("#loaderITN").fadeOut("slow");
     
    var FileTransactionID = $('#txtITNoticeFileTransactionID').val();
    var ClientID = $('#txtITNoticeClientID').val();
    var AccountID = $('#ddlAccountNoNotice option:selected').val();
    var YearType = $('#ddlITNoticeYearType option:selected').val();
    var Year = $('#ddlITNoticeYear option:selected').val();

    var PaymentMode = $('#ddlITNoticePaymentMode option:selected').val();
    var Amount = $('#txtITNoticeAmount').val();
    var DueDate = $('#txtITNoticeDueDate').val();
    var ChequeNo = $('#txtNoticeChequeNo').val();
    var Narration = $('#txtNoticeNarration').val();
    var PhotoPath = $('#ChequePhotoSource').val();
    var PhotoName = $('#ChequeFileName').val();

    var Status = "Active";

    var data;
    var url;
    data = '{FileTransactionID:"' + FileTransactionID +
            '",ClientID:"' + ClientID +
            '",AccountID:"' + AccountID +
           '",YearType:"' + YearType +
           '",Year:"' + Year +
           '",PaymentMode:"' + PaymentMode +
           '",Amount:"' + Amount +
           '",DueDate:"' + DueDate +
           '",ChequeNo:"' + ChequeNo +
           '",Narration:"' + Narration +
           '",PhotoPath:"' + PhotoPath +
           '",PhotoName:"' + PhotoName +
           '",Sfilename:"' + filename +
           '" ,Status:"' + Status + '"}';



    url = "ITNoticeCompliance.aspx/UpdateITNoticeClientMasterData";
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: data,
        success: function (response) {
            if (response.d != "Record Not Added ..?") {
                alert("Updated Successfully..!!");
                $('#myModal').modal('toggle');
                $("#loaderITN").hide();
            }
            else {
                $("#loaderITN").hide();
                alert('Failed....! Try Again.');
            }
        }
    });
}
//=================================End Update IT Client  Method Code==========================================



//===================================Start Update Or Add New Documents========================
function UpdateOrAddITNoticeNewDocument() {
    
    UpdatePhotoSource = $('#ITFileChangePhotoSource').val();
    UpdateFileName = $('#ITFileChangeFileName').val();
    UpdateDocumentName = $('#ITtxtDocumentName').val();
    var data;
    var url;
    data = '{FileTransactionId:"' + FileTransactionId +
            '",UpdateDocumentId:"' + UpdateDocumentId +
             '",UpdateDocumentName:"' + UpdateDocumentName +
              '",ExistingDocument:"' + ExistingDocument +
           '",UpdatePhotoSource:"' + UpdatePhotoSource +
            '",UpdateFileName:"' + UpdateFileName + '"}';

    url = "ITNoticeCompliance.aspx/Update_AddITNoticeDocument";
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: data,
        success: function (response) {
            if (response.d != "Record Not Added ..?") {

                FileTransactionId = response.d;
                $('#ChangeITDocument').modal('toggle');
                ViewDoc(FileTransactionId);
            }
            else {
                alert('Failed....! Try Again.');
            }
        }
    });

}
//===================================End Update Or Add New Documents========================

//===================================Start Update Cheque Documents========================
function UpdateChequeDocument(UpdatePhotoSource, UpdateFileName) {
    
    var data;
    var url;
    data = '{FileTId:"' + FileTId +
              '",ExistingDocument:"' + ExistingDocument +
           '",UpdatePhotoSource:"' + UpdatePhotoSource +
            '",UpdateFileName:"' + UpdateFileName + '"}';

    url = "ITNoticeCompliance.aspx/UpdateChequeDocument";
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




//************************************Update Part End**********************************************


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