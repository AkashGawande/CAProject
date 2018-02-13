var GSTDeductorcontactPersoneCount = 0;
var ClientId = "";

var GSTType = "";
var ContactPersone = "";
var ReferanceId = "";
var PaymentMode = "", ChequeNo = "", Narratin = "", ChequePhotoSource = "", ChequeFileName = "", DueDate = "";
var GSTApplicationPhotoSource = "", GSTApplicationFileName = "";
var Amount = "";
var PaymentStatus = "";
var fileExtension = "";

var Status = "InActive";

//==========================================Tax Payer Document=========================
var TaxPayerPhotoSource = "", TaxPayerPhotoName = "", TaxPayerPhotoDocumentName = "";
var TaxPayerOfficeEleBillSource = "", TaxPayerOfficeEleBillName = "", TaxPayerOfficeEleBillDocumentName = "";
var TaxPayerPANCardSource = "", TaxPayerPANCardName = "", TaxPayerPANCardDocumentName = "";
var TaxPayerAadharSource = "", TaxPayerAadharName = "", TaxPayerAadharDocumentName = "";
var TaxPayerShopActSource = "", TaxPayerShopActName = "", TaxPayerShopActDocumentName = "";
var TaxPayerHomeEleBillSource = "", TaxPayerHomeEleBillName = "", TaxPayerHomeEleBillDocumentName = "";
var TaxPayerBankStateSource = "", TaxPayerBankStateName = "", TaxPayerBankStateDocumentName = "";
var TaxPayerCancelChequeSource = "", TaxPayerCancelChequeName = "", TaxPayerCancelChequeDocumentName = "";
var TaxPayerPartnerShipSource = "", TaxPayerPartnerShipName = "", TaxPayerPartnerShipDocumentName = "";

//==================Tax Deductore Document===============
var PhotoOfDDOPhotoSource = "", PhotoOfDDOFileName = "", PhotoOfDDODocumentName = "";
var ElectricBillDDOPhotoSource = "", ElectricBillDDOFileName = "", ElectricBillDDODocumentName = "";
var PANCardDDOPhotoSource = "", PANCardDDOFileName = "", PANCardDDODocumentName = "";
var TANOfDDOPhotoSource = "", TANOfDDOFileName = "", TANOfDDODocumentName = "";
var AadharDDOPhotoSource = "", AadharDDOFileName = "", AadharDDODocumentName = "";

var TaxOtherDetailsSource = "", TaxOtherDetailsName = "", TaxOtherDetailsDocumentName = "";


var GSTDeductorContactPersoneDetail = [];
var GSTDeductorContactPersoneDetails = "";
var GSTDeductorContactPersoneName = "";
var GSTDeductorContactPersoneMobile = "";

var duedate = "", Narration = "", ChequeNo = "", Amount = "", filename = "", Sfilename = "";


$(document).ready(function () {

    ActiveClass("GSTReg");


    BindStateDropdown();
    GetGSTRegTP();
    GetGSTRegTD();
    

    //==================================Start Btn Save Code=============================================
    $('#btnSave').click(function () {

        var data = "";
        var url = "";
        url = "GSTRegistration.aspx/GetSessionStatus";

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: data,
            success: function (response) {

                if (response.d != "") {


                    if ($(".GSTType option:selected").index() != 0) {
                        if (GSTType == "TAX_Payer") {
                            SaveTaxPayer();
                        }
                        else if (GSTType == "TAX_Deductor") {
                            SaveTaxDeductor();
                        }
                    }
                    else {
                        alert("Please Select GST Type");
                        $(".GSTType").focus();
                    }
                }
                else {
                    window.location.replace("../SessionExpired.aspx");
                }
            }
        });
    });
    //=================================End btn Save Code============================================

    
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


    //===========================Start Hide & Show File Uploads GSTType On Change ==================================
    $(".GSTType").change(function () {
        document.getElementById("nodataerror").style.display = "none";
        $('#errorNo').text("");

        GSTType = $(".GSTType option:selected").val();
        if ($(".GSTType option:selected").index() != 0) {
            if (GSTType == "TAX_Payer")
            {
                $('#panno').show();
                $('#tanno').hide();
                $('#txtTAN').val("");
                $('#txtGST').val("");
                $('#TAXDeductor').hide();
                $('#TAXPayer').show();
                $('#Other').show();
                $('#gstappfile').show();
                $('#gstpayment').show();
            }
            else if (GSTType == "TAX_Deductor")
            {
                $('#panno').hide();
                $('#tanno').show();
                $('#txtPAN').val("");
                $('#txtGST').val("");
                $('#TAXPayer').hide();
                $('#TAXDeductor').show();
                $('#Other').show();
                $('#gstappfile').show();
                $('#gstpayment').show();

                GSTDeductorcontactPersoneCount = 0;
                var contactPersoneName = "";
                var contactPersonMobile = "";
                AddGSTDeductorContactPersoneRow(contactPersoneName, contactPersonMobile);
                
            }
        }
        else {
            $('#txtGST').val("");
            $('#TAXPayer').hide();
            $('#TAXDeductor').hide();
            $('#Other').hide();
            $('#gstappfile').hide();
            $('#gstpayment').hide();
            $('#panno').hide();
            $('#tanno').hide();

        }

    });
    //===========================End Hide & Show File Uploads GSTType On Change ====================================

    //===========================start Contact Persone Mobile No on  ContactName on change ==================================
    $(".ContactName").change(function () {
        
        var PersonId = $(".ContactName option:selected").val();
        if ($(".ContactName option:selected").index() != 0) {
            GetDeductorConatcPersonMobileNo(PersonId);
        }
        else {
            $('#txtDeductorContactPersonMobile').val("");
        }

    });
    //===========================end Contact Persone Mobile No on  ContactName on change ====================================


    //===================================Start Tax payer Credit and Cheque Validations=============================    
    $('#ddlTPPaymentMode').change(function () {

        var PaymentMode = $("#ddlTPPaymentMode option:selected").val();

        if ($("#ddlTPPaymentMode option:selected").index() != 0) {

            if (PaymentMode == "Cheque") {
                $('#txtTPAmount').val(Amount);
                $('#divChequeTP').show();
                $('#divDueDateTP').hide();
                $('#txtTPDueDate').val("");
                $('#txtTPChequeNo').val(ChequeNo);
                $('#txtTPNarration').val(Narration);
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
                $('#txtTPAmount').val(Amount);
                $('#txtTPDueDate').val(duedate);
                $('#txtTPChequeNo').val("");
                $('#txtTPNarration').val("");
                $('#divChequeTP').hide();
                $('#divDueDateTP').show();
            }
            else {
                $('#ChequePhotoSource').val("");
                $('#ChequeFileName').val("");
                $('#txtTPChequeNo').val("");
                $('#txtTPNarration').val("");
                $('#txtTPAmount').val(Amount);
                $('#divChequeTP').hide();
                $('#divDueDateTP').hide();
                $('#txtTPDueDate').val("");
            }
        }
        else {
            $('#ChequePhotoSource').val("");
            $('#ChequeFileName').val("");
            $('#txtTPAmount').val("");
            $('#txtTPChequeNo').val("");
            $('#txtTPNarration').val("");
            $('#divChequeTP').hide();
            $('#divDueDateTP').hide();
            $('#txtTPDueDate').val("");

        }
    });
    //===================================End Tax payer Credit and Cheque Validations=============================

    //===================================Start Tax Deductor Credit and Cheque Validations=============================    
    $('#ddlTDPaymentMode').change(function () {

        var PaymentMode = $("#ddlTDPaymentMode option:selected").val();

        if ($("#ddlTDPaymentMode option:selected").index() != 0) {

            if (PaymentMode == "Cheque") {
                $('#txtTDAmount').val(Amount);
                $('#divChequeTD').show();
                $('#divDueDateTD').hide();
                $('#txtTDDueDate').val("");
                $('#txtTDChequeNo').val(ChequeNo);
                $('#txtNarrationTD').val(Narration);
                if (filename != "") {
                    $('#PhotochequeTD').show();
                    $('#UploadPhotochequeTD').hide();
                }
                else {
                    $('#PhotochequeTD').hide();
                    $('#UploadPhotochequeTD').show();
                }
            }
            else if (PaymentMode == "Credit") {
                $('#ChequeTDPhotoSource').val("");
                $('#ChequeTDFileName').val("");
                $('#txtTDAmount').val(Amount);
                $('#txtTDDueDate').val(duedate);
                $('#txtTDChequeNo').val("");
                $('#txtNarrationTD').val("");
                $('#divChequeTD').hide();
                $('#divDueDateTD').show();
            }
            else {
                $('#ChequeTDPhotoSource').val("");
                $('#ChequeTDFileName').val("");
                $('#txtTDChequeNo').val("");
                $('#txtNarrationTD').val("");
                $('#txtTDAmount').val(Amount);
                $('#divChequeTD').hide();
                $('#divDueDateTD').hide();
                $('#txtTDDueDate').val("");
            }
        }
        else {
            $('#ChequeTDPhotoSource').val("");
            $('#ChequeTDFileName').val("");
            $('#txtTDAmount').val("");
            $('#txtTDChequeNo').val("");
            $('#txtNarrationTD').val("");
            $('#divChequeTD').hide();
            $('#divDueDateTD').hide();
            $('#txtTDDueDate').val("");

        }
    });
    //===================================End Tax Deductor Credit and Cheque Validations=============================

    //=======================Start Get Image On Modal Box=============================   
    $('#ChequePhotoTP').click(function () {
        var ImagePath = $('#ChequePhotoTP').attr('src');
        GetModalImage(ImagePath);
    });
    $('#ChequePhotoTD').click(function () {
        var ImagePath = $('#ChequePhotoTD').attr('src');
        GetModalImage(ImagePath);
    });
    //=======================End Get Image On Modal Box=============================

    //==========================Start Update GST Tax Payer======================================
    $('#btnGSTPUpdate').click(function () {
        if ($('#txtTPApplicanteName').val() != "") {
            if ($('#txtTPFatherName').val() != "") {
                if ($('#txtTPApplicantEmail').val() != "") {
                    if ($('#txtTPMobileNo').val() != "") {
                        if ($('#ddlTPState').val() != "0") {
                            if ($('#ddlTPPaymentMode').val() != "0") {
                                if ($('#txtTPAmount').val() != "") {
                                    GSTUpdateTP();
                                } else {
                                    $('#txtTPAmount').focus();
                                }
                            } else {
                                $('#ddlTPPaymentMode').focus();
                            }
                        } else {
                            $('#ddlTPState').focus();
                        }
                    } else {
                        $('#txtTPMobileNo').focus();
                    }
                } else {
                    $('#txtTPApplicantEmail').focus();
                }
            } else {
                $('#txtTPFatherName').focus();
            }
        } else {
            $('#txtTPApplicanteName').focus();
        }
    });
    //==========================End Update GST Tax Payer======================================

    //==========================Start Update GST Tax Deductor======================================
    $('#btnGSTDUpdate').click(function () {
        if ($('#txtTDOfficeName').val() != "") {
            if ($('#txtTDAuthorisedPersonName').val() != "") {
                if ($('#txtTDOfficeEmail').val() != "") {
                    if ($('#ddlTDState').val() != "0") {
                        if ($('#ddlTDPaymentMode').val() != "0") {
                            if ($('#txtTDAmount').val() != "") {
                                GSTUpdateTD();
                            } else {
                                $('#txtTDAmount').focus();
                            }
                        } else {
                            $('#ddlTDPaymentMode').focus();
                        }
                    } else {
                        $('#ddlTDState').focus();
                    }
                } else {
                    $('#txtTDOfficeEmail').focus();
                }
            } else {
                $('#txtTDAuthorisedPersonName').focus();
            }
        } else {
            $('#txtTDOfficeName').focus();
        }
    });
    //==========================End Update GST Tax Deductor======================================


    //=======================Start Save Update or Add New GSTP  Document =============================
    $('#btnGSTPUploadChange').click(function () {
        
        if ($('#GSTPtxtDocumentName').val() != "") {
            if ($('#GSTPFileChangePhotoSource').val() != "" && $('#GSTPFileChangePhotoFileName').val() != "") {
                UpdateOrAddGSTPNewDocument();
            } else {
                alert("Select Attachment");
                $('#GSTPFileChange').focus();

            }
        } else {
            alert("Enter Document Name");
            $('#GSTPtxtDocumentName').focus();
        }
    });
    //=======================End Save Update or Add New GSTP Document =============================

    //=======================Start Save Update or Add New GSTP  Document =============================
    $('#btnGSTDUploadChange').click(function () {

        if ($('#GSTDtxtDocumentName').val() != "") {
            if ($('#GSTDFileChangePhotoSource').val() != "" && $('#GSTDFileChangeFileName').val() != "") {
                UpdateOrAddGSTDNewDocument();
            } else {
                alert("Select Attachment");
                $('#GSTDFileChange').focus();

            }
        } else {
            alert("Enter Document Name");
            $('#GSTDtxtDocumentName').focus();
        }
    });
    //=======================End Save Update or Add New GSTP Document =============================


    //=======================Start btnGSTPChequechange Document=============================
    $('#btnGSTPChequechange').click(function () {
        
        UpdatePhotoSource = "";
        UpdateFileName = "";
        RefId = "";
        ExistingDocument = "";
        
       $('#ChangeChequePhotoSource').val("");
       $('#ChangeChequeFileName').val("");
       

        var Imgsrc = "";
        var pdfName = "";

        RefId = $('#txtTPReferenceID').val();
        
        if ($("#ChequePhotoTP").attr('src')) {
            Imgsrc = $("#ChequePhotoTP").attr('src');
        }
        if ($("#DownloadChequeTP").attr('name')) {
            pdfName = $("#DownloadChequeTP").attr('name');
        }

        if (Imgsrc != "") {
            ExistingDocument = Imgsrc;
        }
        else if (pdfName != "") {
            ExistingDocument = pdfName;
        }
    });
    //=======================End btnGSTPChequechange Document=============================

    
    //=======================Start btnGSTPChequechange Document=============================
    $('#btnGSTDChequechange').click(function () {
        
        UpdatePhotoSource = "";
        UpdateFileName = "";
        RefId = "";
        ExistingDocument = "";

        $('#ChangeChequePhotoSource').val("");
        $('#ChangeChequeFileName').val("");


        var Imgsrc = "";
        var pdfName = "";

        RefId = $('#txtTDReferenceID').val();

        if ($("#ChequePhotoTD").attr('src')) {
            Imgsrc = $("#ChequePhotoTD").attr('src');
        }
        if ($("#DownloadChequeTD").attr('name')) {
            pdfName = $("#DownloadChequeTD").attr('name');
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

//=================================Start Save TaxPayer Details==========================================
function SaveTaxPayer() {
    $("#loaderGST").show();
    //$("#loaderGST").fadeOut("slow");   
    

    var ApplicantName = $('#txtClientName').val();
    var AppFatherName = $('#txtFatherName').val();
    var AppMobileNo = $('#txtAppmobile').val();
    var AppEmail = $('#txtemail').val();
    var State = $('#ddlstate option:selected').val();
    var PANNo = $('#txtPAN').val();
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
    ContactPersone = $('#txtContactName').val();
   
    GSTApplicationFileName = $('#GSTApplicationFileName').val();
    GSTApplicationPhotoSource = $('#GSTApplicationPhotoSource').val();

     TaxPayerPhotoDocumentName= $('#txtPhoto').val();
     TaxPayerPhotoName = $('#PhotoFileName').val();
     TaxPayerPhotoSource = $('#PhotoPhotoSource').val(); 

     TaxPayerOfficeEleBillDocumentName= $('#txtElectricBill').val();
     TaxPayerOfficeEleBillSource = $('#ElectricBillPhotoSource').val();
     TaxPayerOfficeEleBillName= $('#ElectricBillFileName').val();

     TaxPayerPANCardDocumentName= $('#txtPANCard').val();
     TaxPayerPANCardSource = $('#PANCardPhotoSource').val();
     TaxPayerPANCardName= $('#PANCardFileName').val();

     TaxPayerAadharDocumentName= $('#txtAadhar').val();
     TaxPayerAadharSource = $('#AadharPhotoSource').val();
     TaxPayerAadharName= $('#AadharFileName').val();
   
     TaxPayerShopActDocumentName= $('#txtShopAct').val();
     TaxPayerShopActSource = $('#ShopActPhotoSource').val();
     TaxPayerShopActName= $('#ShopActFileName').val();

    TaxPayerHomeEleBillDocumentName = $('#txtHomeElectricBill').val();
    TaxPayerHomeEleBillSource = $('#HomeElectricBillPhotoSource').val();
    TaxPayerHomeEleBillName= $('#HomeElectricBillFileName').val();
    
    TaxPayerBankStateDocumentName = $('#txtBankStatement').val();
    TaxPayerBankStateSource = $('#BankStatementPhotoSource').val();
    TaxPayerBankStateName= $('#BankStatementFileName').val();

    TaxPayerCancelChequeDocumentName = $('#txtCheque').val();
    TaxPayerCancelChequeSource = $('#ChequePhotoSource').val();
    TaxPayerCancelChequeName= $('#ChequeFileName').val();

    TaxPayerPartnerShipDocumentName = $('#txtPartnerShip').val();
    TaxPayerPartnerShipSource = $('#PartnerShipPhotoSource').val();
    TaxPayerPartnerShipName= $('#PartnerShipFileName').val();

    TaxOtherDetailsDocumentName = $('#txtOther').val();
    TaxOtherDetailsSource = $('#OtherDetailsPhotoSource').val();
    TaxOtherDetailsName = $('#OtherDetailsFileName').val();
    

    var data;
    var url;
    data = '{ClientId:"' + ClientId +
         '",PANNo:"' + PANNo +
        '",ApplicantName:"' + ApplicantName +
            '",AppFatherName:"' + AppFatherName +
           '",AppMobileNo:"' + AppMobileNo +
           '",AppEmail:"' + AppEmail +
           '",State:"' + State +       
            '",GSTType:"' + GSTType +
           '",PaymentMode:"' + PaymentMode +
           '",PaymentStatus:"' + PaymentStatus +
           '",ChequeNo:"' + ChequeNo +
           '",Narratin:"' + Narratin +
           '",ChequePhotoSource:"' + ChequePhotoSource +
           '",ChequeFileName:"' + ChequeFileName +
           '",DueDate:"' + DueDate +
           '",GSTApplicationFileName:"' + GSTApplicationFileName +
           '",GSTApplicationPhotoSource:"' + GSTApplicationPhotoSource +

           '",TaxPayerPhotoDocumentName:"' + TaxPayerPhotoDocumentName +
           '",TaxPayerPhotoName:"' + TaxPayerPhotoName +
           '",TaxPayerPhotoSource:"' + TaxPayerPhotoSource +
           '",TaxPayerOfficeEleBillDocumentName:"' + TaxPayerOfficeEleBillDocumentName +
           '",TaxPayerOfficeEleBillSource:"' + TaxPayerOfficeEleBillSource +
           '",TaxPayerOfficeEleBillName:"' + TaxPayerOfficeEleBillName +
           '",TaxPayerPANCardDocumentName:"' + TaxPayerPANCardDocumentName +
           '",TaxPayerPANCardSource:"' + TaxPayerPANCardSource +
           '",TaxPayerPANCardName:"' + TaxPayerPANCardName +
           '",TaxPayerAadharDocumentName:"' + TaxPayerAadharDocumentName +
           '",TaxPayerAadharSource:"' + TaxPayerAadharSource +
           '",TaxPayerAadharName:"' + TaxPayerAadharName +         
           '",TaxPayerShopActDocumentName:"' + TaxPayerShopActDocumentName +
           '",TaxPayerShopActSource:"' + TaxPayerShopActSource +
           '",TaxPayerShopActName:"' + TaxPayerShopActName +
           '",TaxPayerHomeEleBillDocumentName:"' + TaxPayerHomeEleBillDocumentName +
           '",TaxPayerHomeEleBillSource:"' + TaxPayerHomeEleBillSource +
           '",TaxPayerHomeEleBillName:"' + TaxPayerHomeEleBillName +
           '",TaxPayerBankStateDocumentName:"' + TaxPayerBankStateDocumentName +
           '",TaxPayerBankStateSource:"' + TaxPayerBankStateSource +
           '",TaxPayerBankStateName:"' + TaxPayerBankStateName +
           '",TaxPayerCancelChequeDocumentName:"' + TaxPayerCancelChequeDocumentName +
           '",TaxPayerCancelChequeSource:"' + TaxPayerCancelChequeSource +
           '",TaxPayerCancelChequeName:"' + TaxPayerCancelChequeName +           
           '",TaxPayerPartnerShipDocumentName:"' + TaxPayerPartnerShipDocumentName +
           '",TaxPayerPartnerShipSource:"' + TaxPayerPartnerShipSource +
           '",TaxPayerPartnerShipName:"' + TaxPayerPartnerShipName +
           '",TaxOtherDetailsDocumentName:"' + TaxOtherDetailsDocumentName +
           '",TaxOtherDetailsSource:"' + TaxOtherDetailsSource +
           '",TaxOtherDetailsName:"' + TaxOtherDetailsName +
           '",Amount:"' + Amount +
           '",Status:"' + Status + '"}';

    url = "GSTRegistration.aspx/SaveTaxPayerGSTRegistrationFile";
   
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: data,
        success: function (response) {
            if (response.d != "Record Not Added ..?") {
                ReferanceId = response.d;
                $('#GSTForm').hide();
                $('#MessageForm').show();
                // alert("Successfully");
                $("#loaderGST").hide();
            }
            else {
                $("#loaderGST").hide();
                alert('Failed....! Try Again.');
            }
        }
    });
    
}
//=================================End Save TaxPayer Details==========================================


//=================================Start Save Deductor Details==========================================
function SaveTaxDeductor() {
    $("#loaderGST").show();
    //$("#loaderGST").fadeOut("slow");

    var OfficeName = $('#txtGSTDeductorOfficeName').val();
    var AuthorisedPersonName = $('#txtGSTDeductorAuthorisedName').val();    
    var OfficeEmail = $('#txtGSTDeductorOfficeemail').val();
    var State = $('#ddlGSTDeductorstate option:selected').val();
    var TANNo = $('#txtTAN').val();


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
    ContactPersone = $('#txtContactName').val();

    GSTApplicationFileName = $('#GSTApplicationFileName').val();
    GSTApplicationPhotoSource = $('#GSTApplicationPhotoSource').val();



    TaxPayerPhotoDocumentName = $('#txtPhotoOfDDO').val();
    TaxPayerPhotoName = $('#PhotoOfDDOFileName').val();
    TaxPayerPhotoSource = $('#PhotoOfDDOPhotoSource').val();

    TaxPayerOfficeEleBillDocumentName = $('#txtElectricBillDDO').val();
    TaxPayerOfficeEleBillSource = $('#ElectricBillDDOPhotoSource').val();
    TaxPayerOfficeEleBillName = $('#ElectricBillDDOFileName').val();

    TaxPayerPANCardDocumentName = $('#txtPANCardDDO').val();
    TaxPayerPANCardSource = $('#PANCardDDOPhotoSource').val();
    TaxPayerPANCardName = $('#PANCardDDOFileName').val();

    TaxPayerAadharDocumentName = $('#txtAadharDDO').val();
    TaxPayerAadharSource = $('#AadharDDOPhotoSource').val();
    TaxPayerAadharName = $('#AadharDDOFileName').val();

    TaxPayerShopActDocumentName = $('#txtTANOfDDO').val();
    TaxPayerShopActSource = $('#TANOfDDOPhotoSource').val();
    TaxPayerShopActName = $('#TANOfDDOFileName').val();    

    TaxOtherDetailsDocumentName = $('#txtOther').val();
    TaxOtherDetailsSource = $('#OtherDetailsPhotoSource').val();
    TaxOtherDetailsName = $('#OtherDetailsFileName').val();


    var data;
    var url;
    data = '{ClientId:"' + ClientId +
        '",TANNo:"' + TANNo +
        '",OfficeName:"' + OfficeName +
        '",AuthorisedPersonName:"' + AuthorisedPersonName +
           '",OfficeEmail:"' + OfficeEmail +
           '",State:"' + State +
            '",GSTType:"' + GSTType +
           '",PaymentMode:"' + PaymentMode +
           '",PaymentStatus:"' + PaymentStatus +
           '",ChequeNo:"' + ChequeNo +
           '",Narratin:"' + Narratin +
           '",ChequePhotoSource:"' + ChequePhotoSource +
           '",ChequeFileName:"' + ChequeFileName +
           '",DueDate:"' + DueDate +
           '",GSTApplicationFileName:"' + GSTApplicationFileName +
           '",GSTApplicationPhotoSource:"' + GSTApplicationPhotoSource +

           '",TaxPayerPhotoDocumentName:"' + TaxPayerPhotoDocumentName +
           '",TaxPayerPhotoName:"' + TaxPayerPhotoName +
           '",TaxPayerPhotoSource:"' + TaxPayerPhotoSource +
           '",TaxPayerOfficeEleBillDocumentName:"' + TaxPayerOfficeEleBillDocumentName +
           '",TaxPayerOfficeEleBillSource:"' + TaxPayerOfficeEleBillSource +
           '",TaxPayerOfficeEleBillName:"' + TaxPayerOfficeEleBillName +
           '",TaxPayerPANCardDocumentName:"' + TaxPayerPANCardDocumentName +
           '",TaxPayerPANCardSource:"' + TaxPayerPANCardSource +
           '",TaxPayerPANCardName:"' + TaxPayerPANCardName +
           '",TaxPayerAadharDocumentName:"' + TaxPayerAadharDocumentName +
           '",TaxPayerAadharSource:"' + TaxPayerAadharSource +
           '",TaxPayerAadharName:"' + TaxPayerAadharName +
           '",TaxPayerShopActDocumentName:"' + TaxPayerShopActDocumentName +
           '",TaxPayerShopActSource:"' + TaxPayerShopActSource +
           '",TaxPayerShopActName:"' + TaxPayerShopActName +           
           '",TaxOtherDetailsDocumentName:"' + TaxOtherDetailsDocumentName +
           '",TaxOtherDetailsSource:"' + TaxOtherDetailsSource +
           '",TaxOtherDetailsName:"' + TaxOtherDetailsName +
           '",Amount:"' + Amount +
           '",Status:"' + Status + '"}';

    url = "GSTRegistration.aspx/SaveTaxDeductorGSTRegistrationFile";

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: data,
        success: function (response) {
            if (response.d != "Record Not Added ..?") {

                ReferanceId = response.d;

                var data = "";
                var url = "";
               
                GSTDeductorContactPersoneDetails = JSON.stringify(GetGSTBasedDeductorContactPersoneDetails());
                $.ajax({
                    url: 'GSTRegistration.aspx/SaveGSTDeductorContactDetails',
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({ 'GSTDeductorContactPersoneDetails': GSTDeductorContactPersoneDetails }),
                    success: function (response) {
                        if (response.d != "Record Not Added ..?") {
                            $('#GSTForm').hide();
                            $('#MessageForm').show();
                            $("#loaderGST").hide();
                        }
                        else {
                            $("#loaderGST").hide();
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

//-------------------------------Start Save Contact person Details Method--------------------------
function GetGSTBasedDeductorContactPersoneDetails() {

    GSTDeductorContactPersoneDetail = [];
    $('tr.data-contact-person4').each(function () {

        if ($(this).find(".ContactPerson").val() != "") {
            GSTDeductorContactPersoneName = $(this).find(".ContactPerson").val();
        }
        if ($(this).find(".ContactPersonMobile").val() != "") {
            GSTDeductorContactPersoneMobile = $(this).find(".ContactPersonMobile").val();
        }
        Status = 'InActive';
        var alldata = {
            'ReferanceId': ReferanceId,
            'GSTDeductorContactPersoneName': GSTDeductorContactPersoneName,
            'GSTDeductorContactPersoneMobile': GSTDeductorContactPersoneMobile
        }

        GSTDeductorContactPersoneDetail.push(alldata);
    });
    console.log(GSTDeductorContactPersoneDetail);
    return GSTDeductorContactPersoneDetail;
}
//-------------------------------End Save Contact Person Details Method--------------------------

//=================================End Save Deductor Details==========================================


//=================Start Get  Attachment Details========================================
function Attachments(input,Id) {
    if (input.files && input.files[0]) {

        var filerdr = new FileReader();
        filerdr.onload = function (e) {
            fileExtension = (input.value.substring((input.value.lastIndexOf("\\")) + 1)).replace(/^.*\./, '');
            if (fileExtension == "jpg" || fileExtension == "jpeg" || fileExtension == "png" || fileExtension=="pdf") {

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

function AttachmentsExcel(input, Id) {
    if (input.files && input.files[0]) {

        var filerdr = new FileReader();
        filerdr.onload = function (e) {
            fileExtension = (input.value.substring((input.value.lastIndexOf("\\")) + 1)).replace(/^.*\./, '');
            if (fileExtension == "xls" || fileExtension == "xlsx") {

                document.getElementById(Id + 'PhotoSource').value = e.target.result; //Generated DataURL
                document.getElementById(Id + 'FileName').value = input.value.substring((input.value.lastIndexOf("\\")) + 1)
            }
            else {
                $("#" + Id).val("");
                alert("Only xls/xlsx Format allowed");
            }
        }
        filerdr.readAsDataURL(input.files[0]);
    }

}
//========================End Get  Attachment Details================================



//============================Start Featch All Client Details By Client Id========================================
function FillAllTheClientDetails() {
    $('#tblGSTDeductorContactpersone tr').remove();
     var GST_No = $('#txtGST').val();
     var PANNo = $('#txtPAN').val();
     var TANNo = $('#txtTAN').val();
     var CID="";
     if (GSTType == "TAX_Payer")
     {
         CID = PANNo;
     } else if (GSTType == "TAX_Deductor")
     {
         CID = TANNo;
     }

    var data = "";
    var url = "";

    data = '{ClientId:"' + CID +
            '",GSTType:"' + GSTType +'"}';

    url = "GSTRegistration.aspx/GetGStBasedClientDetails"

    if (CID != "") {
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
                        $('#txtGST').val(value.GSTNumber);
                        if (GSTType == "TAX_Payer")
                        {                            
                            $('#txtClientName').val(value.ApplicantName);
                            $('#txtFatherName').val(value.ApplicantFatherName);
                            $('#txtAppmobile').val(value.ApplicantMobileNo);
                            $('#txtemail').val(value.ApplicantEmail);
                            $('#ddlstate').val(value.StateCode);
                            $('#txtAadharNo').val(value.AadharNo);
                        }
                        else if (GSTType == "TAX_Deductor")
                        {
                            $('#txtGSTDeductorOfficeName').val(value.OfficeName);
                            $('#txtGSTDeductorAuthorisedName').val(value.AuthorisedPersoneName);                           
                            $('#txtGSTDeductorOfficeemail').val(value.OfficeEmail);
                            $('#ddlGSTDeductorstate').val(value.StateCode);
                            //BindDeductorContactPersoneDropdown(value.ClientID);
                            GSTDeductorcontactPersoneCount = 0;
                            AddGSTDeductorContactPersoneRow(value.ContactPersoneName, value.ContactPersoneMobile);
                        }
                        
                        ClientId = value.ClientID;
                        
                    });
                }
                else {
                    ClientId = "";
                    document.getElementById("nodataerror").style.display = "block";
                    $('#errorNo').text(CID);
                    //setTimeout(function () { document.getElementById("nodataerror").style.display = "none"; }, 2800);
                    setTimeout(function () { hide(); }, 1000);
                    GSTDeductorcontactPersoneCount = 0;
                    var contactPersoneName = "";
                    var contactPersonMobile = "";
                    AddGSTDeductorContactPersoneRow(contactPersoneName, contactPersonMobile);

                    Cleartextbox();
                }


            }
        });
    } else {

        document.getElementById("nodataerror").style.display = "none";
        GSTDeductorcontactPersoneCount = 0;
        var contactPersoneName = "";
        var contactPersonMobile = "";
        AddGSTDeductorContactPersoneRow(contactPersoneName, contactPersonMobile);
       
        Cleartextbox();
    }
}

function hide()
{
    document.getElementById("nodataerror").style.display = "none";
    $('#errorNo').text("");

}

//============================End Featch All Client Details By Client Id========================================

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

//============================start Clear and diabled All the Textbox=================================================
function Cleartextbox() {
   
    $('#txtClientName').val("");
    $('#txtFatherName').val("");
    $('#txtAppmobile').val("");
    $('#txtemail').val("");
    $('.StateName option')[0].selected = true;
    $('#txtAadharNo').val("");


    $('#txtGSTDeductorOfficeName').val("");
    $('#txtGSTDeductorAuthorisedName').val("");
    $('#txtGSTDeductorOfficeemail').val("");   
    $('#ddlGSTDeductorstate option')[0].selected = true;
    $('#ddlDeductorContactName option').remove();
    $('#txtDeductorContactPersonMobile').val("");
   
}

//============================End Clear and diabled All the Textbox=================================================

//=======================Start Validation Pan And Tan===================================
function validate_PAN_TAN_GST_Number(x) {
    
    var re = "";

    var No = document.getElementById(x).value;
    //var panchar = PanNo[4];

    if (No != "") {

        if (x == "txtPAN")
        { re = /[A-Z]{5}[0-9]{4}[A-Z]{1}/; }
     else if (x == "txtGST")
        { re = /[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9,A-Z]{1}/; }
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


//=========================Start Add Contact persone Name And MObile No===================
function AddGSTDeductorContactPersoneRow(CPN, CPM) {
     
    var rows = "";
    //$('#tblContactpersone tr').remove();
    var a = $('#tblGSTDeductorContactpersone tr:last td:nth-child(1)').text();
    if (a == "") {
        GSTDeductorcontactPersoneCount++;
        rows = "<tr class='data-contact-person4'>"
          + "<td tabindex='10' style='display:none;'> " + GSTDeductorcontactPersoneCount + "</td>"
         + "<td>"
         + "<div class='row' style='margin-top: 10px'>"
         + "<div class='col-lg-6 col-md-6 col-sm-6'>"
        + "<div class='form-group'>"
        + "<label class='control-label col-lg-4 col-md-4 col-sm-4'>"
        + "Contact Persone " + GSTDeductorcontactPersoneCount + "  <label style='color: red;'>*</label></label>"
        + "<div class='col-lg-8 col-md-8 col-sm-8'>"
        + "<input type='text' id='txtContactPerson' value='"+CPN+"' placeholder='Enter Contact Persone Name' name='date' class='ContactPerson validate[required,custom[date]] form-control col-lg-6' />"
        + "</div>"
        + "</div>"
        + "</div>"
        + "<div class='col-lg-5 col-md-5 col-sm-5'>"
        + "<div class='form-group'>"
        + "<label class='control-label col-lg-5 col-md-5 col-sm-5'>Mobile Number <label style='color: red;'>*</label></label>"
        + "<div class='col-lg-7'>"
        + "<input type='text' class='ContactPersonMobile form-control' value='"+CPM+"' name='req' maxlength='10' placeholder='Enter Contact Person Mobile Number' id='txtContactPersonMobile' onblur='validateMobileNOAndEmail('txtContactPersonMobile')' onkeypress='return isNumber(event)' />"
        + "<span id='txtContactPersonMobileError' style='margin-top: 6px; display: none; font-size: 15px; color: red; font-family: cursive'>Please Enter Valid Mobile No e.g '1234567890'</span>"
        + "</div>"
        + "</div>"
        + "</div>"
        + "<div class='col-lg-1 col-md-1 col-sm-1'>"
        + "<a id='NewGSTDeductorContactAttach'><i class='ace-icon fa fa-plus fa-2x  bigger-110 icon-only'></i></a>"
        + "</div>"
        + "</div>"
         + "</td>"
         + "</tr>"

        $("#tblGSTDeductorContactpersone").append(rows);
    }
    else if (GSTDeductorcontactPersoneCount == a) {
        GSTDeductorcontactPersoneCount++;

        rows = "<tr class='data-contact-person4'>"
             + "<td tabindex='10' style='display:none;'> " + GSTDeductorcontactPersoneCount + "</td>"
        + "<td>"
           + "<div class='row' style='margin-top: 10px'>"
         + "<div class='col-lg-6 col-md-6 col-sm-6'>"
        + "<div class='form-group'>"
        + "<label class='control-label col-lg-4 col-md-4 col-sm-4'>"
        + "Contact Persone " + GSTDeductorcontactPersoneCount + "</label>"
        + "<div class='col-lg-8 col-md-8 col-sm-8'>"
        + "<input type='text' id='txtContactPerson' value='" + CPN + "' placeholder='Enter Contact Persone Name' name='date' class='ContactPerson validate[required,custom[date]] form-control col-lg-6' />"
        + "</div>"
        + "</div>"
        + "</div>"
        + "<div class='col-lg-5 col-md-5 col-sm-5'>"
        + "<div class='form-group'>"
        + "<label class='control-label col-lg-5 col-md-5 col-sm-5'>Mobile Number</label>"
        + "<div class='col-lg-7'>"
        + "<input type='text' class='ContactPersonMobile form-control'  value='" + CPM + "' name='req' maxlength='10' placeholder='Enter Contact Person Mobile Number' id='txtContactPersonMobile' onblur='validateMobileNOAndEmail('txtContactPersonMobile')' onkeypress='return isNumber(event)' />"
        + "<span id='txtContactPersonMobileError' style='margin-top: 6px; display: none; font-size: 15px; color: red; font-family: cursive'>Please Enter Valid Mobile No e.g '1234567890'</span>"
        + "</div>"
        + "</div>"
        + "</div>"
        + "<div class='col-lg-1 col-md-1 col-sm-1'>"
         + "<a  id='btnGSTDeductorConatctdelete'><i class='ace-icon fa fa-trash-o red icon-only bigger-130'></i></a>"
         + "</div>"
         + "</div>"
         + "</td>"
         + "</tr>"
        $("#tblGSTDeductorContactpersone").append(rows);
    }
    else {

        a++;
        GSTDeductorcontactPersoneCount = a;
        rows = "<tr class='data-contact-person4'>"
             + "<td tabindex='10' style='display:none;'> " + GSTDeductorcontactPersoneCount + "</td>"
       + "<td>"
           + "<div class='row' style='margin-top: 10px'>"
         + "<div class='col-lg-6 col-md-6 col-sm-6'>"
        + "<div class='form-group'>"
        + "<label class='control-label col-lg-4 col-md-4 col-sm-4'>"
        + "Contact Persone " + GSTDeductorcontactPersoneCount + "</label>"
        + "<div class='col-lg-8 col-md-8 col-sm-8'>"
        + "<input type='text' id='txtContactPerson' value='" + CPN + "'  placeholder='Enter Contact Persone Name' name='date' class='ContactPerson validate[required,custom[date]] form-control col-lg-6' />"
        + "</div>"
        + "</div>"
        + "</div>"
        + "<div class='col-lg-5 col-md-5 col-sm-5'>"
        + "<div class='form-group'>"
        + "<label class='control-label col-lg-5 col-md-5 col-sm-5'>Mobile Number</label>"
        + "<div class='col-lg-7'>"
        + "<input type='text' class=' ContactPersonMobile form-control'  value='" + CPM + "' name='req' maxlength='10' placeholder='Enter Contact Person Mobile Number' id='txtContactPersonMobile' onblur='validateMobileNOAndEmail('txtContactPersonMobile')' onkeypress='return isNumber(event)' />"
        + "<span id='txtContactPersonMobileError' style='margin-top: 6px; display: none; font-size: 15px; color: red; font-family: cursive'>Please Enter Valid Mobile No e.g '1234567890'</span>"
        + "</div>"
        + "</div>"
        + "</div>"

         + "<div class='col-lg-1 col-md-1 col-sm-1'>"
        + "<a  id='btnGSTDeductorConatctdelete'><i class='ace-icon fa fa-trash-o red icon-only bigger-130'></i></a>"
        + "</div>"
        + "</div>"
        + "</td>"
        + "</tr>"
        $("#tblGSTDeductorContactpersone").append(rows);
    }

}
//=========================Start Add Contact persone Name And MObile No===================

//==========================Start Delete Attachment Button======================================
$(document).on('click', '#btnGSTDeductorConatctdelete', function () {
    $(this).closest('tr').remove();
});
//==========================End Delete Attachment Button======================================


//=================Start Add New Attachment Button======================
$(document).on('click', '#NewGSTDeductorContactAttach', function () {
    var contactPersoneName = "";
    var contactPersonMobile="";
    AddGSTDeductorContactPersoneRow(contactPersoneName, contactPersonMobile);
});
//=================End Add New Attachment Button======================


//***********************************Updation code start From Here**********************************

//===================================Start Get GST Reg Tax Payer Method============================
function GetGSTRegTP() {
    $('#tblGSTRegListTP tr').remove();
    var count = 0;
    var url = "GSTRegistration.aspx/GetGSTRegTP";
    var data = "";
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
                        + "<td class='customertd'>" + value.ReferenceId + "</td>"
                        + "<td class='customertd'>" + value.ClientID + "</td>"
                        + "<td class='customertd'>" + value.PAN_TAN + "</td>"
                        + "<td class='customertd'>" + value.Name1 + "</td>"
                        + "<td class='customertd'>" + value.MobileNo + "</td>"
                        + "<td class='customertd' style='display:none;'>" + value.StaffID + "</td>"
                        + "<td class='center'><button id='btnEditTP' title='View and Edit' class='btn btn-primary btn-xs' data-toggle='modal' data-target='#myGSTModalTP'><i class='ace-icon fa fa-edit  bigger-110 icon-only'></i></button>&nbsp;"
                        + "<button id='btnReply' style='display:none;' title='Reply to Franchisee' class='btn btn-success btn-xs'  data-toggle='modal' data-target='#myModalReply'><i class='ace-icon fa fa-reply  bigger-110 icon-only'></i></button>&nbsp;"
                        + "<button id='btnExportTP' title='Export to Excel' class='btn btn-danger btn-xs'><i class='ace-icon fa fa-file-excel-o bigger-110 icon-only'></i></button></td>"
                        + "</tr>";
                    $('#tblGSTRegListTP').append(rows);
                });
            } else {
                var rows = "<tr><td colspan='8' style='text-align: center;font-family:Calibri;font-size:16px;font-weight:bold;color:Red' >data does not exist..!</td></tr>"
                $('#tblGSTRegListTP').append(rows);
            }


        }
    });
}
//===================================End Get GST Reg Tax Payer Method=============================

//===================================Start Get GST Reg Tax Deductor Method============================
function GetGSTRegTD() {
    $('#tblGSTRegListTD tr').remove();
    var count = 0;
    var url = "GSTRegistration.aspx/GetGSTRegTD";
    var data = "";
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
                        + "<td class='customertd'>" + value.ReferenceId + "</td>"
                        + "<td class='customertd'>" + value.ClientID + "</td>"
                        + "<td class='customertd'>" + value.PAN_TAN + "</td>"
                        + "<td class='customertd'>" + value.Name1 + "</td>"
                        + "<td class='customertd'>" + value.Name2 + "</td>"
                        + "<td class='customertd' style='display:none;'>" + value.StaffID + "</td>"
                        + "<td class='center'><button id='btnEditTD' title='View and Edit' class='btn btn-primary btn-xs' data-toggle='modal' data-target='#myGSTModalTD'><i class='ace-icon fa fa-edit  bigger-110 icon-only'></i></button>&nbsp;"
                        + "<button id='btnReply' style='display:none;' title='Reply to Franchisee' class='btn btn-success btn-xs'  data-toggle='modal' data-target='#myModalReply'><i class='ace-icon fa fa-reply  bigger-110 icon-only'></i></button>&nbsp;"
                        + "<button id='btnExportTD' title='Export to Excel' class='btn btn-danger btn-xs'><i class='ace-icon fa fa-file-excel-o bigger-110 icon-only'></i></button></td>"
                        + "</tr>";
                    $('#tblGSTRegListTD').append(rows);
                });
            } else {
                var rows = "<tr><td colspan='8' style='text-align: center;font-family:Calibri;font-size:16px;font-weight:bold;color:Red' >data does not exist..!</td></tr>"
                $('#tblGSTRegListTD').append(rows);
            }


        }
    });
}
//===================================End Get GST Reg Tax Payer Method=============================

//=======================Start View GST Reg Tax Payer Details=============================
$(document).on('click', '#btnEditTP', function () {
    BindStateDropdown();
    var $row = $(this).closest("tr");
    var RefID = $row.find("td:nth-child(3)").text();
    ViewTP(RefID);
});
//=======================End View GST Reg Tax Payer Details=============================

//=======================Start View GST Reg Tax Deductor Details=============================
$(document).on('click', '#btnEditTD', function () {
    BindStateDropdown();
    var $row = $(this).closest("tr");
    var RefID = $row.find("td:nth-child(3)").text();
    ViewTD(RefID);
    ViewContactPerson(RefID);
});
//=======================End View GST Tax Deductor Reg Details=============================


//===========================Start View Data Method==============================
function ViewTP(RefID) {
    $("#tblGSTDocumentsTP tr").remove();
    $("#tblGSTTPFooter tr").remove();
    var count = 0;
    var data = '{RefID:"' + RefID + '"}';

    $.ajax({
        type: "post",
        url: "GSTRegistration.aspx/ViewModelBoxTP",
        data: data,
        contentType: "application/json",
        dataType: "json",

        success: function (response) {
            $.each(response.d, function (index, value) {

                //GST Reg Details
                $("#txtTPReferenceID").val(value.ReferenceId);
                $("#txtTPClientID").val(value.ClientID);
                $("#txtTPPANNumber").val(value.PAN_TAN);
                $("#lblTPDate").text(value.Date);
                $("#txtTPApplicanteName").val(value.Name1);
                $("#txtTPFatherName").val(value.Name2);

                $("#txtTPApplicantEmail").val(value.Email);
                $("#txtTPMobileNo").val(value.MobileNo);
                $("#txtTPAmount").val(value.Amount);

                //===Select State=====
                var State = value.StateCode;
                var j = $('#ddlTPState option').length;
                var val1 = "";
                for (var i = 0; i < j; i++) {
                    val1 = $('#ddlTPState option')[i].value;
                    if (val1 == State) {
                        $('#ddlTPState option')[i].selected = true;
                        $('#ddlTPState').trigger('change');
                        break;
                    }
                }


                Amount = value.Amount;
                Narration = value.Narration;
                ChequeNo = value.ChequeNo;
                duedate = value.DueDate;
                filename = value.ChequeFileName.split("/")[2];

                //===Select PaymentMode=====
                var PayMode = value.PaymentMode;
                var j2 = $('#ddlTPPaymentMode option').length;
                var val2 = "";
                for (var i = 0; i < j2; i++) {
                    val2 = $('#ddlTPPaymentMode option')[i].value;
                    if (val2 == PayMode) {
                        $('#ddlTPPaymentMode option')[i].selected = true;
                        $('#ddlTPPaymentMode').trigger('change');
                        break;
                    }
                }

                //====Get Cheque Details=======
                if (value.PaymentMode == "Cheque") {
                    $("#txtTPChequeNo").val(value.ChequeNo);
                    $("#txtITNarration").val(value.Narration);

                    if (getExtension(value.ChequeFileName) == "pdf") {
                        $("#ChequePhotoTP").hide();
                        $("#DownloadChequeTP").show();
                        $("#DownloadChequeTP").attr('name', value.ChequeFileName);
                    } else {
                        $("#DownloadChequeTP").hide();
                        $("#ChequePhotoTP").show();
                        $("#ChequePhotoTP").attr("src", value.ChequeFileName);
                    }
                } else if (value.PaymentMode == "Credit") {
                    $('#txtTPDueDate').val(value.DueDate);
                }

                //====Get GST Application=======
                $("#DownloadApplicationTP").attr('href', value.GSTAppFile);

                //====Get Photos======= 
                $("#DocumentIDTP").text(value.ID);


                var rows = "<tr style='color: #337ab7'>";
                rows += "<td>Photo Of Tax Payer</td>";
                rows += "<td>Electric Bill Of Office</td>";
                rows += "<td>PAN Card Of Tax Payer</td>";
                rows += "<td>Aadhar Of Tax Payer</td>";
                rows += "<td>Shop Act</td>";
                rows += "<td>Electric Bill Of Home</td>";
                rows += "<td>Bank Statement</td>";
                rows += "<td>Cancel Cheque</td>";
                rows += "<td>PartnerShip</td>";
                rows += "<td>Other</td>";
                rows += "</tr>";
                
                rows += "<tr class='odd gradeX'>"
                if (getExtension(value.PhotoPath) == "pdf") {
                    rows += "<td class='customertd'><label id='GSTTPDocument' style='display:none;'>" + value.PhotoName + ",PhotoName,PhotoPath" + "</label><a id='Downloadpdf' onClick='openTab(this)' name='" + value.PhotoPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a>&nbsp;<a id='btnGSTPchange' href='#' data-toggle='modal' data-target='#ChangeGSTPDocument'>Change</a></td>";
                } else {
                    rows += "<td class='customertd'><label id='GSTTPDocument' style='display:none;'>" + value.PhotoName + ",PhotoName,PhotoPath" + "</label><img id='myImgTP' src='" + value.PhotoPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' />&nbsp;<a id='btnGSTPchange' href='#' data-toggle='modal' data-target='#ChangeGSTPDocument'>Change</a></td>";
                }

                if (getExtension(value.EleOfficePath) == "pdf") {
                    rows += "<td class='customertd'><label id='GSTTPDocument' style='display:none;'>" + value.EleOfficeName + ",EleOfficeName,EleOfficePath" + "</label><a id='Downloadpdf' onClick='openTab(this)' name='" + value.EleOfficePath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a>&nbsp;<a id='btnGSTPchange' href='#' data-toggle='modal' data-target='#ChangeGSTPDocument'>Change</a></td>";
                } else {
                    rows += "<td class='customertd'><label id='GSTTPDocument' style='display:none;'>" + value.EleOfficeName + ",EleOfficeName,EleOfficePath" + "</label><img id='myImgTP' src='" + value.EleOfficePath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' />&nbsp;<a id='btnGSTPchange' href='#' data-toggle='modal' data-target='#ChangeGSTPDocument'>Change</a></td>";
                }

                if (getExtension(value.PanCardPath) == "pdf") {
                    rows += "<td class='customertd'><label id='GSTTPDocument' style='display:none;'>" + value.PanCardName + ",PanCardName,PanCardPath" + "</label><a id='Downloadpdf' onClick='openTab(this)' name='" + value.PanCardPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a>&nbsp;<a id='btnGSTPchange' href='#' data-toggle='modal' data-target='#ChangeGSTPDocument'>Change</a></td>";
                } else {
                    rows += "<td class='customertd'><label id='GSTTPDocument' style='display:none;'>" + value.PanCardName + ",PanCardName,PanCardPath" + "</label><img id='myImgTP' src='" + value.PanCardPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' />&nbsp;<a id='btnGSTPchange' href='#' data-toggle='modal' data-target='#ChangeGSTPDocument'>Change</a></td>";
                }

                if (getExtension(value.AadharPath) == "pdf") {
                    rows += "<td class='customertd'><label id='GSTTPDocument' style='display:none;'>" + value.AadharName + ",AadharName,AadharPath" + "</label><a id='Downloadpdf' onClick='openTab(this)' name='" + value.AadharPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a>&nbsp;<a id='btnGSTPchange' href='#' data-toggle='modal' data-target='#ChangeGSTPDocument'>Change</a></td>";
                } else {
                    rows += "<td class='customertd'><label id='GSTTPDocument' style='display:none;'>" + value.AadharName + ",AadharName,AadharPath" + "</label><img id='myImgTP' src='" + value.AadharPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' />&nbsp;<a id='btnGSTPchange' href='#' data-toggle='modal' data-target='#ChangeGSTPDocument'>Change</a></td>";
                }

                if (getExtension(value.ShopAct_NOCPath) == "pdf") {
                    rows += "<td class='customertd'><label id='GSTTPDocument' style='display:none;'>" + value.ShopAct_NOCName + ",ShopAct_NOCName,ShopAct_NOCPath" + "</label><a id='Downloadpdf' onClick='openTab(this)' name='" + value.ShopAct_NOCPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a>&nbsp;<a id='btnGSTPchange' href='#' data-toggle='modal' data-target='#ChangeGSTPDocument'>Change</a></td>";
                } else {
                    rows += "<td class='customertd'><label id='GSTTPDocument' style='display:none;'>" + value.ShopAct_NOCName + ",ShopAct_NOCName,ShopAct_NOCPath" + "</label><img id='myImgTP' src='" + value.ShopAct_NOCPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' />&nbsp;<a id='btnGSTPchange' href='#' data-toggle='modal' data-target='#ChangeGSTPDocument'>Change</a></td>";
                }

                if (getExtension(value.EleHomePath) == "pdf") {
                    rows += "<td class='customertd'><label id='GSTTPDocument' style='display:none;'>" + value.EleHomeName + ",EleHomeName,EleHomePath" + "</label><a id='Downloadpdf' onClick='openTab(this)' name='" + value.EleHomePath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a>&nbsp;<a id='btnGSTPchange' href='#' data-toggle='modal' data-target='#ChangeGSTPDocument'>Change</a></td>";
                } else {
                    rows += "<td class='customertd'><label id='GSTTPDocument' style='display:none;'>" + value.EleHomeName + ",EleHomeName,EleHomePath" + "</label><img id='myImgTP' src='" + value.EleHomePath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' />&nbsp;<a id='btnGSTPchange' href='#' data-toggle='modal' data-target='#ChangeGSTPDocument'>Change</a></td>";
                }

                if (getExtension(value.BankStatementPath) == "pdf") {
                    rows += "<td class='customertd'><label id='GSTTPDocument' style='display:none;'>" + value.BankStatementName + ",BankStatementName,BankStatementPath" + "</label><a id='Downloadpdf' onClick='openTab(this)' name='" + value.BankStatementPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a>&nbsp;<a id='btnGSTPchange' href='#' data-toggle='modal' data-target='#ChangeGSTPDocument'>Change</a></td>";
                } else {
                    rows += "<td class='customertd'><label id='GSTTPDocument' style='display:none;'>" + value.BankStatementName + ",BankStatementName,BankStatementPath" + "</label><img id='myImgTP' src='" + value.BankStatementPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' />&nbsp;<a id='btnGSTPchange' href='#' data-toggle='modal' data-target='#ChangeGSTPDocument'>Change</a></td>";
                }

                if (getExtension(value.CancelChequePath) == "pdf") {
                    rows += "<td class='customertd'><label id='GSTTPDocument' style='display:none;'>" + value.CancelChequeName + ",CancelChequeName,CancelChequePath" + "</label><a id='Downloadpdf' onClick='openTab(this)' name='" + value.CancelChequePath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a>&nbsp;<a id='btnGSTPchange' href='#' data-toggle='modal' data-target='#ChangeGSTPDocument'>Change</a></td>";
                } else {
                    rows += "<td class='customertd'><label id='GSTTPDocument' style='display:none;'>" + value.CancelChequeName + ",CancelChequeName,CancelChequePath" + "</label><img id='myImgTP' src='" + value.CancelChequePath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' />&nbsp;<a id='btnGSTPchange' href='#' data-toggle='modal' data-target='#ChangeGSTPDocument'>Change</a></td>";
                }

                if (getExtension(value.PartnerShipPath) == "pdf") {
                    rows += "<td class='customertd'><label id='GSTTPDocument' style='display:none;'>" + value.PartnerShipName + ",PartnerShipName,PartnerShipPath" + "</label><a id='Downloadpdf' onClick='openTab(this)' name='" + value.PartnerShipPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a>&nbsp;<a id='btnGSTPchange' href='#' data-toggle='modal' data-target='#ChangeGSTPDocument'>Change</a></td>";
                } else {
                    rows += "<td class='customertd'><label id='GSTTPDocument' style='display:none;'>" + value.PartnerShipName + ",PartnerShipName,PartnerShipPath" + "</label><img id='myImgTP' src='" + value.PartnerShipPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' />&nbsp;<a id='btnGSTPchange' href='#' data-toggle='modal' data-target='#ChangeGSTPDocument'>Change</a></td>";
                }

                if (getExtension(value.OtherPath) == "pdf") {
                    rows += "<td class='customertd'><label id='GSTTPDocument' style='display:none;'>" + value.OtherName + ",OtherName,OtherPath" + "</label><a id='Downloadpdf' onClick='openTab(this)' name='" + value.OtherPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a>&nbsp;<a id='btnGSTPchange' href='#' data-toggle='modal' data-target='#ChangeGSTPDocument'>Change</a></td>";
                } else {
                    rows += "<td class='customertd'><label id='GSTTPDocument' style='display:none;'>" + value.OtherName + ",OtherName,OtherPath" + "</label><img id='myImgTP' src='" + value.OtherPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' />&nbsp;<a id='btnGSTPchange' href='#' data-toggle='modal' data-target='#ChangeGSTPDocument'>Change</a></td>";
                }
                rows += "</tr>";
                $('#tblGSTDocumentsTP').append(rows);
            });
            //var footer_rows = "<tr><td colspan='10' style='text-align:right;'><a class='btn btn-sm' id='btnITAddDocument' href='#' data-toggle='modal' data-target='#ChangeITDocument'><i class='fa fa-plus '></i> Upload New Documents</a></td></tr>";
            //$('#tblGSTTPFooter').append(footer_rows);

        },
        failure: function () {
        }
    });
}
//==============================End View Data Method==================================

//=======================Start  btnGSTPchange Document =============================
var FullName = "";
var RefId = "";
var UpdateDocumentName = "";
var UpdateNameColumn = "";
var UpdatePathColumn = "";
var ExistingDocument = "";
var UpdateDocumentId = "";
var UpdatePhotoSource = "";
var UpdateFileName = "";

$(document).on('click', '#btnGSTPchange', function () {
    
    UpdatePhotoSource = "";
    UpdateFileName = "";
    FullName = "";
    RefId = "";
    UpdateDocumentName = "";
    UpdateNameColumn = "";
    UpdatePathColumn = "";
    ExistingDocument = "";
    UpdateDocumentId = "";

    $('#GSTPtxtDocumentName').val("");
    $('#GSTPFileChangePhotoSource').val("");
    $('#GSTPFileChangeFileName').val("");
    $('#GSTPFileChange').val("");
   

    var Imgsrc = "";
    var pdfName = "";

    var $row = $(this).closest("td");
    RefId = $('#txtTPReferenceID').val();
    UpdateDocumentId = $('#DocumentIDTP').text();

    FullName = $row.find("#GSTTPDocument").text();
    var DefaultName = FullName.split(",")[0];   
    UpdateNameColumn = FullName.split(",")[1];
    UpdatePathColumn = FullName.split(",")[2];

    if ($row.find("#myImgTP").attr('src')) {
        Imgsrc = $row.find("#myImgTP").attr('src');
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
    if (DefaultName != "")
    {
        $('#GSTPtxtDocumentName').val(DefaultName);
        $('#GSTPtxtDocumentName').attr('disabled', true);
    }
    else
    {
        $('#GSTPtxtDocumentName').attr('disabled', false);
    }

    if (ExistingDocument != "" && DefaultName != "")
    {
        $('#btnGSTPupload').val("Change");
    }
    else
    {
        $('#btnGSTPupload').val("Upload");
    }
});
//=======================End btnGSTPchange Document=============================



//===================================Start Update Or Add New GSTP Documents========================
function UpdateOrAddGSTPNewDocument() {
     
    UpdatePhotoSource = $('#GSTPFileChangePhotoSource').val();
    UpdateFileName = $('#GSTPFileChangeFileName').val();
    UpdateDocumentName = $('#GSTPtxtDocumentName').val();
    var data;
    var url;
    data = '{RefId:"' + RefId +
            '",UpdateDocumentId:"' + UpdateDocumentId +
             '",UpdateDocumentName:"' + UpdateDocumentName +
              '",ExistingDocument:"' + ExistingDocument +
           '",UpdatePhotoSource:"' + UpdatePhotoSource +
            '",UpdateFileName:"' + UpdateFileName +
            '",UpdateNameColumn:"' + UpdateNameColumn +
           '",UpdatePathColumn:"' + UpdatePathColumn + '"}';

    url = "GSTRegistration.aspx/Update_AddGSTPDocument";
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: data,
        success: function (response) {
            if (response.d != "Record Not Added ..?") {

                RefId = response.d;
                $('#ChangeGSTPDocument').modal('toggle');
                ViewTP(RefId);
            }
            else {
                alert('Failed....! Try Again.');
            }
        }
    });

}
//===================================End Update Or Add New GSTP Documents========================



//===========================Start View Data Method==============================
function ViewTD(RefID) {
    $("#tblGSTDocumentsTD tr").remove();
    var count = 0;
    var data = '{RefID:"' + RefID + '"}';

    $.ajax({
        type: "post",
        url: "GSTRegistration.aspx/ViewModelBoxTD",
        data: data,
        contentType: "application/json",
        dataType: "json",

        success: function (response) {
            $.each(response.d, function (index, value) {

                //GST Reg Details
                $("#txtTDReferenceID").val(value.ReferenceId);
                $("#txtTDClientID").val(value.ClientID);
                $("#txtTDTANNumber").val(value.PAN_TAN);
                $("#lblTDDate").text(value.Date);
                $("#txtTDOfficeName").val(value.Name1);
                $("#txtTDAuthorisedPersonName").val(value.Name2);

                $("#txtTDOfficeEmail").val(value.Email);
                $("#txtTDAmount").val(value.Amount);

                //===Select State=====
                var State = value.StateCode;
                var j = $('#ddlTDState option').length;
                var val1 = "";
                for (var i = 0; i < j; i++) {
                    val1 = $('#ddlTDState option')[i].value;
                    if (val1 == State) {
                        $('#ddlTDState option')[i].selected = true;
                        $('#ddlTDState').trigger('change');
                        break;
                    }
                }

                Amount = value.Amount;
                Narration = value.Narration;
                ChequeNo = value.ChequeNo;
                duedate = value.DueDate;
                filename = value.ChequeFileName.split("/")[2];

                //===Select PaymentMode=====
                var PayMode = value.PaymentMode;
                var j2 = $('#ddlTDPaymentMode option').length;
                var val2 = "";
                for (var i = 0; i < j2; i++) {
                    val2 = $('#ddlTDPaymentMode option')[i].value;
                    if (val2 == PayMode) {
                        $('#ddlTDPaymentMode option')[i].selected = true;
                        $('#ddlTDPaymentMode').trigger('change');
                        break;
                    }
                }

                //====Get Cheque Details=======
                if (value.PaymentMode == "Cheque") {
                    $("#txtTDChequeNo").val(value.ChequeNo);
                    $("#txtNarrationTD").val(value.Narration);

                    if (getExtension(value.ChequeFileName) == "pdf") {
                        $("#ChequePhotoTD").hide();
                        $("#DownloadChequeTD").show();
                        $("#DownloadChequeTD").attr('name', value.ChequeFileName);
                    } else {
                        $("#DownloadChequeTD").hide();
                        $("#ChequePhotoTD").show();
                        $("#ChequePhotoTD").attr("src", value.ChequeFileName);
                    }
                } else if (value.PaymentMode == "Credit") {
                    $('#txtTDDueDate').val(value.DueDate);
                }

                //====Get GST Application=======
                $("#DownloadApplicationTD").attr('href', value.GSTAppFile);


                //====Get Photos=======  
                $("#DocumentIDTD").text(value.ID);


                var rows = "";
                rows += "<tr class='odd gradeX'>";
                rows += "<tr style='color: #337ab7'>";
                rows += "<td>Photo Of DDO</td>";
                rows += "<td>Electric Bill Of Office</td>";
                rows += "<td>PAN Card Of DDO</td>";
                rows += "<td>TAN Of Office</td>";
                rows += "<td>Aadhar Of DDO</td>";
                rows += "<td>Other</td>";
                rows += "</tr>";

                if (getExtension(value.PhotoPath) == "pdf") {
                    rows += "<td class='customertd'><label id='GSTTDDocument' style='display:none;'>" + value.PhotoName + ",PhotoName,PhotoPath" + "</label><a id='Downloadpdf' onClick='openTab(this)' name='" + value.PhotoPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a>&nbsp;<a id='btnGSTDchange' href='#' data-toggle='modal' data-target='#ChangeGSTDDocument'>Change</a></td>";
                } else {
                    rows += "<td class='customertd'><label id='GSTTDDocument' style='display:none;'>" + value.PhotoName + ",PhotoName,PhotoPath" + "</label><img id='myImgTD' src='" + value.PhotoPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' />&nbsp;<a id='btnGSTDchange' href='#' data-toggle='modal' data-target='#ChangeGSTDDocument'>Change</a></td>";
                }

                if (getExtension(value.EleOfficePath) == "pdf") {
                    rows += "<td class='customertd'><label id='GSTTDDocument' style='display:none;'>" + value.EleOfficeName + ",EleOfficeName,EleOfficePath" + "</label><a id='Downloadpdf' onClick='openTab(this)' name='" + value.EleOfficePath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a>&nbsp;<a id='btnGSTDchange' href='#' data-toggle='modal' data-target='#ChangeGSTDDocument'>Change</a></td>";
                } else {
                    rows += "<td class='customertd'><label id='GSTTDDocument' style='display:none;'>" + value.EleOfficeName + ",EleOfficeName,EleOfficePath" + "</label><img id='myImgTD' src='" + value.EleOfficePath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' />&nbsp;<a id='btnGSTDchange' href='#' data-toggle='modal' data-target='#ChangeGSTDDocument'>Change</a></td>";
                }

                if (getExtension(value.PanCardPath) == "pdf") {
                    rows += "<td class='customertd'><label id='GSTTDDocument' style='display:none;'>" + value.PanCardName + ",PanCardName,PanCardPath" + "</label><a id='Downloadpdf' onClick='openTab(this)' name='" + value.PanCardPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a>&nbsp;<a id='btnGSTDchange' href='#' data-toggle='modal' data-target='#ChangeGSTDDocument'>Change</a></td>";
                } else {
                    rows += "<td class='customertd'><label id='GSTTDDocument' style='display:none;'>" + value.PanCardName + ",PanCardName,PanCardPath" + "</label><img id='myImgTD' src='" + value.PanCardPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' />&nbsp;<a id='btnGSTDchange' href='#' data-toggle='modal' data-target='#ChangeGSTDDocument'>Change</a></td>";
                }

                if (getExtension(value.ShopAct_NOCPath) == "pdf") {
                    rows += "<td class='customertd'><label id='GSTTDDocument' style='display:none;'>" + value.ShopAct_NOCName + ",ShopAct_NOCName,ShopAct_NOCPath" + "</label><a id='Downloadpdf' onClick='openTab(this)' name='" + value.ShopAct_NOCPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a>&nbsp;<a id='btnGSTDchange' href='#' data-toggle='modal' data-target='#ChangeGSTDDocument'>Change</a></td>";
                } else {
                    rows += "<td class='customertd'><label id='GSTTDDocument' style='display:none;'>" + value.ShopAct_NOCName + ",ShopAct_NOCName,ShopAct_NOCPath" + "</label><img id='myImgTD' src='" + value.ShopAct_NOCPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' />&nbsp;<a id='btnGSTDchange' href='#' data-toggle='modal' data-target='#ChangeGSTDDocument'>Change</a></td>";
                }

                if (getExtension(value.AadharPath) == "pdf") {
                    rows += "<td class='customertd'><label id='GSTTDDocument' style='display:none;'>" + value.AadharName + ",AadharName,AadharPath" + "</label><a id='Downloadpdf' onClick='openTab(this)' name='" + value.AadharPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a>&nbsp;<a id='btnGSTDchange' href='#' data-toggle='modal' data-target='#ChangeGSTDDocument'>Change</a></td>";
                } else {
                    rows += "<td class='customertd'><label id='GSTTDDocument' style='display:none;'>" + value.AadharName + ",AadharName,AadharPath" + "</label><img id='myImgTD' src='" + value.AadharPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' />&nbsp;<a id='btnGSTDchange' href='#' data-toggle='modal' data-target='#ChangeGSTDDocument'>Change</a></td>";
                }

                if (getExtension(value.OtherPath) == "pdf") {
                    rows += "<td class='customertd'><label id='GSTTDDocument' style='display:none;'>" + value.OtherName + ",OtherName,OtherPath" + "</label><a id='Downloadpdf' onClick='openTab(this)' name='" + value.OtherPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a>&nbsp;<a id='btnGSTDchange' href='#' data-toggle='modal' data-target='#ChangeGSTDDocument'>Change</a></td>";
                } else {
                    rows += "<td class='customertd'><label id='GSTTDDocument' style='display:none;'>" + value.OtherName + ",OtherName,OtherPath" + "</label><img id='myImgTD' src='" + value.OtherPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' />&nbsp;<a id='btnGSTDchange' href='#' data-toggle='modal' data-target='#ChangeGSTDDocument'>Change</a></td>";
                }
                rows += "</tr>";
                $('#tblGSTDocumentsTD').append(rows);
            });

        },
        failure: function () {
        }
    });
}
//==============================End View Data Method==================================

//===========================Start View GST Deductor Client Details On ModalBox==============================
function ViewContactPerson(RefID) {
     
    $('#tblPersonGSTD tr').remove();
    var count = 0;
    var data = '{RefID:"' + RefID + '"}';

    $.ajax({
        type: "post",
        url: "GSTRegistration.aspx/ViewContactPerson",
        data: data,
        contentType: "application/json",
        dataType: "json",

        success: function (response) {
            $.each(response.d, function (index, value) {

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
                + "<input type='text' placeholder='Enter Person Mobile No' maxlength='10' value='" + value.PersonMobileNo + "' class='MobileNo form-control' name='req' id='txtPersonMobileNo' onkeypress='return isNumber(event)' />"
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
                        + "<input type='text' placeholder='Enter Person Mobile No' maxlength='10' value='" + value.PersonMobileNo + "' class='MobileNo form-control' name='req' id='txtPersonMobileNo' onkeypress='return isNumber(event)' />"
                        + "</div>"                        
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

//=======================Start  btnGSTDchange Document =============================
$(document).on('click', '#btnGSTDchange', function () {
     
    UpdatePhotoSource = "";
    UpdateFileName = "";
    FullName = "";
    RefId = "";
    UpdateDocumentName = "";
    UpdateNameColumn = "";
    UpdatePathColumn = "";
    ExistingDocument = "";
    UpdateDocumentId = "";

    $('#GSTDtxtDocumentName').val("");
    $('#GSTDFileChangePhotoSource').val("");
    $('#GSTDFileChangeFileName').val("");
    $('#GSTDFileChange').val("");


    var Imgsrc = "";
    var pdfName = "";

    var $row = $(this).closest("td");
    RefId = $('#txtTDReferenceID').val();
    UpdateDocumentId = $('#DocumentIDTD').text();

    FullName = $row.find("#GSTTDDocument").text();
    var DefaultName = FullName.split(",")[0];
    UpdateNameColumn = FullName.split(",")[1];
    UpdatePathColumn = FullName.split(",")[2];

    if ($row.find("#myImgTD").attr('src')) {
        Imgsrc = $row.find("#myImgTD").attr('src');
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
    if (DefaultName != "") {
        $('#GSTDtxtDocumentName').val(DefaultName);
        $('#GSTDtxtDocumentName').attr('disabled', true);
    }
    else {
        $('#GSTDtxtDocumentName').attr('disabled', false);
    }

    if (ExistingDocument != "" && DefaultName != "") {
        $('#btnGSTDupload').val("Change");
    }
    else {
        $('#btnGSTDupload').val("Upload");
    }

});
//=======================End btnGSTDchange Document=============================


//===================================Start Update Or Add New GSTD Documents========================
function UpdateOrAddGSTDNewDocument() {
     
    UpdatePhotoSource = $('#GSTDFileChangePhotoSource').val();
    UpdateFileName = $('#GSTDFileChangeFileName').val();
    UpdateDocumentName = $('#GSTDtxtDocumentName').val();
    var data;
    var url;
    data = '{RefId:"' + RefId +
            '",UpdateDocumentId:"' + UpdateDocumentId +
             '",UpdateDocumentName:"' + UpdateDocumentName +
              '",ExistingDocument:"' + ExistingDocument +
           '",UpdatePhotoSource:"' + UpdatePhotoSource +
            '",UpdateFileName:"' + UpdateFileName +
            '",UpdateNameColumn:"' + UpdateNameColumn +
           '",UpdatePathColumn:"' + UpdatePathColumn + '"}';

    url = "GSTRegistration.aspx/Update_AddGSTPDocument";
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: data,
        success: function (response) {
            if (response.d != "Record Not Added ..?") {

                RefId = response.d;
                $('#ChangeGSTDDocument').modal('toggle');
                ViewTD(RefId);
            }
            else {
                alert('Failed....! Try Again.');
            }
        }
    });

}
//===================================End Update Or Add New GSTD Documents========================

//===================================Start Update Cheque Documents========================
function UpdateChequeDocument(UpdatePhotoSource, UpdateFileName) {
    
    var data;
    var url;
    data = '{RefId:"' + RefId +            
              '",ExistingDocument:"' + ExistingDocument +
           '",UpdatePhotoSource:"' + UpdatePhotoSource +
            '",UpdateFileName:"' + UpdateFileName +'"}';

    url = "GSTRegistration.aspx/UpdateChequeDocument";
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: data,
        success: function (response) {
            if (response.d != "Record Not Added ..?") {

                RefId = response.d;
                $('#ChangeChequeDocument').modal('toggle');
                ViewTD(RefId);
                ViewTP(RefId);
            }
            else {
                alert('Failed....! Try Again.');
            }
        }
    });

}
//===================================End Update Cheque Documents========================




//=================Start Add New Row Button======================
$(document).on('click', '#AddRowGSTD', function () {
    AddRowPerson();
});
//=================End Add New Row Button======================

//==========================Start Delete Row Button======================================
$(document).on('click', '#btndelete', function () {
    $(this).closest('tr').remove();
});
//==========================End Delete Row Button======================================



//=================Start Add New Row Function======================
function AddRowPerson() {

    //===Bind Contact Person=====
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
            + "<a  id='btndelete'><i class='ace-icon fa fa-trash-o red icon-only bigger-130'></i></a>"
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



//=======================Start Get Image On Modal Box Method=============================  
function GetModalImage(ImagePath) {
    var img = ".." + ImagePath;
    $("#ModalImage").attr("src", img);

    $("#btnDownload").attr('href', img);
    $("#btnDownload").attr('download', img);
}
//=======================End Get Image On Modal Box Method=============================

//=======================Start GST TD Get Image On Modal Box============================= 
$(document).on('click', '#myImgTD', function () {
    var ImagePath = "";
    var Imgsrc = "";
    var pdfName = "";
    var $row = $(this).closest("td");
    if ($row.find("#myImgTD").attr('src')) {
        Imgsrc = $row.find("#myImgTD").attr('src');
        ImagePath = Imgsrc;
    }
    GetModalImage(ImagePath);
});
//=======================End GST TD Get Image On Modal Box=============================



//=======================Start GST TP Get Image On Modal Box============================= 
$(document).on('click', '#myImgTP', function () {
    var ImagePath = "";
    var Imgsrc = "";
    var pdfName = "";
    var $row = $(this).closest("td");    
    if ($row.find("#myImgTP").attr('src')) {
        Imgsrc = $row.find("#myImgTP").attr('src');
        ImagePath = Imgsrc;
    }
    GetModalImage(ImagePath);
});
//=======================End GST TP Get Image On Modal Box=============================

//=================================Start Update GST Tax Payer  Method Code==========================================
function GSTUpdateTP() {
    $("#loaderGST").show();
    //$("#loaderGST").fadeOut("slow");

    var TPReferenceID = $('#txtTPReferenceID').val();
    var TPClientID = $('#txtTPClientID').val();
    var TPApplicanteName = $('#txtTPApplicanteName').val().toUpperCase();
    var TPFatherName = $('#txtTPFatherName').val().toUpperCase();

    var TPApplicantEmail = $('#txtTPApplicantEmail').val();
    var TPMobileNo = $('#txtTPMobileNo').val();
    var TPState = $('#ddlTPState option:selected').val();
    var TPPaymentMode = $('#ddlTPPaymentMode option:selected').val();
    var TPAmount = $('#txtTPAmount').val();
    var TPDueDate = $('#txtTPDueDate').val();
    var TPChequeNo = $('#txtTPChequeNo').val();
    var TPNarration = $('#txtTPNarration').val();
    var PhotoSource = $('#ChequeTPPhotoSource').val();
    var FileName = $('#ChequeTPFileName').val();



    var Status = "Active";

    var data;
    var url;
    data = '{TPReferenceID:"' + TPReferenceID +
            '",TPClientID:"' + TPClientID +
           '",TPApplicanteName:"' + TPApplicanteName +
            '",TPFatherName:"' + TPFatherName +
           '",TPApplicantEmail:"' + TPApplicantEmail +
           '",TPMobileNo:"' + TPMobileNo +
           '",TPState:"' + TPState +
           '",TPPaymentMode:"' + TPPaymentMode +
           '",TPAmount:"' + TPAmount +
           '",TPDueDate:"' + TPDueDate +
            '",TPChequeNo:"' + TPChequeNo +
           '",TPNarration:"' + TPNarration +
           '",PhotoSource:"' + PhotoSource +
           '",FileName:"' + FileName +
           '",Sfilename:"' + filename +
           '" ,Status:"' + Status + '"}';

    url = "GSTRegistration.aspx/UpdateMasterDataTP";
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: data,
        success: function (response) {
            if (response.d != "Record Not Added ..?") {
                alert("Updated Successfully..!!");
                $('#myGSTModalTP').modal('toggle');
                $("#loaderGST").hide();
            }
            else {
                $("#loaderGST").hide();
                alert('Failed....! Try Again.');
            }
        }
    });
}
//=================================End Update GST Tax Payer Method Code==========================================

var TDReferenceID = "";
//=================================Start Update GST Tax Deductor  Method Code==========================================
function GSTUpdateTD() {
    $("#loaderGST").show();
    //$("#loaderGST").fadeOut("slow");

    TDReferenceID = $('#txtTDReferenceID').val();
    var TDClientID = $('#txtTDClientID').val();
    var TDOfficeName = $('#txtTDOfficeName').val().toUpperCase();
    var TDAuthorisedPersonName = $('#txtTDAuthorisedPersonName').val().toUpperCase();

    var TDOfficeEmail = $('#txtTDOfficeEmail').val();
    var TDState = $('#ddlTDState option:selected').val();
    var TDPaymentMode = $('#ddlTDPaymentMode option:selected').val();
    var TDAmount = $('#txtTDAmount').val();
    var TDDueDate = $('#txtTDDueDate').val();
    var TDChequeNo = $('#txtTDChequeNo').val();
    var NarrationTD = $('#txtNarrationTD').val();
    var PhotoSource = $('#ChequeTDPhotoSource').val();
    var FileName = $('#ChequeTDFileName').val();

    var Status = "Active";

    var data;
    var url;
    data = '{TDReferenceID:"' + TDReferenceID +
            '",TDClientID:"' + TDClientID +
           '",TDOfficeName:"' + TDOfficeName +
            '",TDAuthorisedPersonName:"' + TDAuthorisedPersonName +
           '",TDOfficeEmail:"' + TDOfficeEmail +
           '",TDState:"' + TDState +
           '",TDPaymentMode:"' + TDPaymentMode +
           '",TDAmount:"' + TDAmount +
           '",TDDueDate:"' + TDDueDate +
            '",TDChequeNo:"' + TDChequeNo +
           '",NarrationTD:"' + NarrationTD +
           '",PhotoSource:"' + PhotoSource +
           '",FileName:"' + FileName +
           '",Sfilename:"' + filename +
           '" ,Status:"' + Status + '"}';

    url = "GSTRegistration.aspx/UpdateMasterDataTD";
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: data,
        success: function (response) {
            if (response.d != "Record Not Added ..?") {

                TDReferenceID = response.d;
                var data = "";
                var url = "";
                //AllAttachment = JSON.stringify(GetDocumentAttachmentDetails());
                var GSTDContactPersoneDetails = JSON.stringify(GetGSTDBasedContactPersoneDetails());
                $.ajax({
                    url: 'GSTRegistration.aspx/UpdateDetailDataTD',
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({ 'GSTDContactPersoneDetails': GSTDContactPersoneDetails }),
                    success: function (response) {
                        if (response.d != "Record Not Added ..?") {
                            alert("Updated Successfully..!!");
                            $('#myGSTModalTD').modal('toggle');
                            ("#loaderGST").hide();
                        }
                        else {
                            $("#loaderGST").hide();
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
//=================================End Update GST Tax Deductor Method Code==========================================

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
            'ReferenceID': TDReferenceID,
            'PersonID': PersonID,
            'PersoneName': GSTDContactPersoneName,
            'PersonMobileNo': GSTDContactPersoneMobile
        }

        GSTDContactPersoneDetail.push(alldata);
    });
    console.log(GSTDContactPersoneDetail);
    return GSTDContactPersoneDetail;
}
//-------------------------------End Update Contact person Details Method--------------------------


//========================Start Open pdf in new tab================================
function openTab(th) {
    window.open(th.name, '_blank');
}
//========================end Open pdf in new tab================================

//==============================Start Split Path For Checking the extenion==================================
function getExtension(fpath) {
    var sp = fpath.split(".");
    return sp[1];
}
//==============================End Split Path For Checking the extenion==================================





