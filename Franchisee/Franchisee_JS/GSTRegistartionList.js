var StaffID = "";
var ReferenceID = "";
var ClientId = "";
var FileName = "";
var FilePath = "";
var PhotoName = "";
var AllAttachment = "";
var Attachment = "";

var duedate = "", Narration = "", ChequeNo = "", Amount = "", filename = "", Sfilename = "";


$(document).ready(function () {
    //BindFranchiseeID();
    //BindFirmName();
    ActiveClass("GSTReg");

    BindEmployeeID();
    BindEmployeeName();


    //===================================Start Bind EmpolyeeID Drop Down=============================
    function BindEmployeeID() {        
        $.ajax({
            type: "POST",
            url: "GSTRegistartionList.aspx/BindEmployeeID",
            data: '{}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {
                console.log(r);
                var dept = $(".EmployeeID");
                dept.empty().append('<option selected="selected" value="0">--Select--</option>');
                $.each(r.d, function (key, value) {
                    dept.append($("<option></option>").val(value.EmployeeID).text(value.EmployeeID));
                });
            }
        });
    }
    //===================================End Bind EmpolyeeID Drop Down=============================
    //===================================Start Bind EmpolyeeID Drop Down=============================
    function BindEmployeeName() {
        $.ajax({
            type: "POST",
            url: "GSTRegistartionList.aspx/BindEmployeeID",
            data: '{}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {
                console.log(r);
                var dept = $(".EmployeeName");
                dept.empty().append('<option selected="selected" value="0">--Select--</option>');
                $.each(r.d, function (key, value) {
                    dept.append($("<option></option>").val(value.EmployeeID).text(value.EmployeeName));
                });
            }
        });
    }
    //===================================End Bind EmpolyeeID Drop Down=============================
    
    //===================================Start Get GST Tax Payer on FranchiseeID DDL Change=============================
    $('#ddlEmployeeIDTP').change(function () {
        $('#ddlEmployeeNameTP').val($('#ddlEmployeeIDTP').val());
        GetGSTRegTP($('#ddlEmployeeIDTP').val());
        $('#tblGSTRegTP').show();
    });
    //===================================End Get Get GST Tax Payer on FranchiseeID DDL Change=============================

    //===================================Start Get GST Tax Payer on Firm name DDL Change=============================
    $('#ddlEmployeeNameTP').change(function () {
        $('#ddlEmployeeIDTP').val($('#ddlEmployeeNameTP').val());
        GetGSTRegTP($('#ddlEmployeeNameTP').val());
        $('#tblGSTRegTP').show();
    });
    //===================================End Get GST Tax Payer on Firm name DDL Change=============================
     
    //===================================Start Get GST Tax Deductor on FranchiseeID DDL Change=============================
    $('#ddlEmployeeIDTD').change(function () {
        $('#ddlEmployeeNameTD').val($('#ddlEmployeeIDTD').val());
        GetGSTRegTD($('#ddlEmployeeIDTD').val());
        $('#tblGSTRegTD').show();
    });
    //===================================End Get Get GST Tax Deductor on FranchiseeID DDL Change=============================

    //===================================Start Get GST Tax Deductor on Firm name DDL Change=============================
    $('#ddlEmployeeNameTD').change(function () {
        $('#ddlEmployeeIDTD').val($('#ddlEmployeeNameTD').val());
        GetGSTRegTD($('#ddlEmployeeNameTD').val());
        $('#tblGSTRegTD').show();
    });
    //===================================End Get GST Tax Deductor on Firm name DDL Change=============================

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
   
    //=======================Start Get Image On Modal Box Method=============================  
    function GetModalImage(ImagePath) {
        var img = ".." + ImagePath;
        $("#ModalImage").attr("src", img);

        $("#btnDownload").attr('href', img);
        $("#btnDownload").attr('download', img);
    }
    //=======================End Get Image On Modal Box Method=============================
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

    //=======================Start Get Image On Modal Box=============================   
    $(document).on('click', '#DPhoto', function () {
        GetModalImage($('#DPhoto').attr('src'));
    });   
    //=======================End Get Image On Modal Box=============================
    //=======================Start Get Image On Modal Box=============================   
    $(document).on('click', '#DElectricBill', function () {
        var ImagePath = $('#DElectricBill').attr('src');
        GetModalImage(ImagePath);
    });
    //=======================End Get Image On Modal Box=============================
    //=======================Start Get Image On Modal Box=============================   
    $(document).on('click', '#DPAN', function () {
        var ImagePath = $('#DPAN').attr('src');
        GetModalImage(ImagePath);
    });
    //=======================End Get Image On Modal Box=============================
    //=======================Start Get Image On Modal Box=============================   
    $(document).on('click', '#DTAN', function () {
        var ImagePath = $('#DTAN').attr('src');
        GetModalImage(ImagePath);
    });
    //=======================End Get Image On Modal Box=============================
    //=======================Start Get Image On Modal Box=============================   
    $(document).on('click', '#DAadhar', function () {
        var ImagePath = $('#DAadhar').attr('src');
        GetModalImage(ImagePath);
    });
    //=======================End Get Image On Modal Box=============================
    //=======================Start Get Image On Modal Box=============================   
    $(document).on('click', '#DOther', function () {
        var ImagePath = $('#DOther').attr('src');
        GetModalImage(ImagePath);
    });
    //=======================End Get Image On Modal Box=============================


    //=======================Start Get Image On Modal Box=============================   
    $(document).on('click', '#PPhoto', function () {
        var ImagePath = $('#PPhoto').attr('src');
        GetModalImage(ImagePath);
    });
    //=======================End Get Image On Modal Box=============================
    //=======================Start Get Image On Modal Box=============================   
    $(document).on('click', '#PElectricBill', function () {
        var ImagePath = $('#PElectricBill').attr('src');
        GetModalImage(ImagePath);
    });
    //=======================End Get Image On Modal Box=============================
    //=======================Start Get Image On Modal Box=============================   
    $(document).on('click', '#PPAN', function () {
        var ImagePath = $('#PPAN').attr('src');
        GetModalImage(ImagePath);
    });
    //=======================End Get Image On Modal Box=============================
    //=======================Start Get Image On Modal Box=============================   
    $(document).on('click', '#PAadhar', function () {
        var ImagePath = $('#PAadhar').attr('src');
        GetModalImage(ImagePath);
    });
    //=======================End Get Image On Modal Box=============================
    //=======================Start Get Image On Modal Box=============================   
    $(document).on('click', '#PShop', function () {
        var ImagePath = $('#PShop').attr('src');
        GetModalImage(ImagePath);
    });
    //=======================End Get Image On Modal Box=============================
    //=======================Start Get Image On Modal Box=============================   
    $(document).on('click', '#PElectricBillHome', function () {
        var ImagePath = $('#PElectricBillHome').attr('src');
        GetModalImage(ImagePath);
    });
    //=======================End Get Image On Modal Box=============================
    //=======================Start Get Image On Modal Box=============================   
    $(document).on('click', '#PBankStatement', function () {
        var ImagePath = $('#PBankStatement').attr('src');
        GetModalImage(ImagePath);
    });
    //=======================End Get Image On Modal Box=============================
    //=======================Start Get Image On Modal Box=============================   
    $(document).on('click', '#PCancelCheque', function () {
        var ImagePath = $('#PCancelCheque').attr('src');
        GetModalImage(ImagePath);
    });
    //=======================End Get Image On Modal Box=============================
    //=======================Start Get Image On Modal Box=============================   
    $(document).on('click', '#PPartnerShip', function () {
        var ImagePath = $('#PPartnerShip').attr('src');
        GetModalImage(ImagePath);
    });
    //=======================End Get Image On Modal Box=============================
    //=======================Start Get Image On Modal Box=============================   
    $(document).on('click', '#POther', function () {
        var ImagePath = $('#POther').attr('src');
        GetModalImage(ImagePath);
    });
    //=======================End Get Image On Modal Box=============================


    ////=======================Start Get Image On Modal Box=============================   
    //$(document).on('click', '#ChequePhotoTP', function () {
    //    var ImagePath = $('#ChequePhotoTP').attr('src');
    //    GetModalImage(ImagePath);
    //});
    ////=======================End Get Image On Modal Box=============================


    

    //=======================Start Send Message to Franchisee=============================
    $(document).on('click', '#btnReply', function () {
        
        $('#tblAttachment tr').remove();
        var $row = $(this).closest("tr");
        var ReferenceID = $row.find("td:nth-child(3)").text();
        var ClientID = $row.find("td:nth-child(4)").text();
        var Name = $row.find("td:nth-child(6)").text();
        StaffID = $row.find("td:nth-child(8)").text();

        $('#lblReferenceID1').text(ReferenceID);
        $('#lblFranchiseeID').text($('.FranchiseeID').val());
        $('#lblClientID1').text(ClientID);
        $('#lblName1').text(Name);
        AddAttachmentRow();
    });
    //=======================End Send Message to Franchisee=============================

    //=======================Start Send Message to Franchisee=============================
    $('#btnSend').click(function () {
        if ($('#txtSubject').val() != "") {
            if ($('#txtMessage').val() != "") {
                SendMessageGST();
            } else {
                $('#txtMessage').focus();
            }
        } else {
            $('#txtSubject').focus();
        }        
    });
    //=======================End Send Message to Franchisee=============================

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

});

//===================================Start Get GST Reg Tax Payer Method============================
function GetGSTRegTP(SID) {
    $('#tblGSTRegListTP tr').remove();
    var count = 0;
    $.ajax({
        type: "POST",
        url: "GSTRegistartionList.aspx/GetGSTRegTP",
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
function GetGSTRegTD(SID) {
    $('#tblGSTRegListTD tr').remove();
    var count = 0;
    $.ajax({
        type: "POST",
        url: "GSTRegistartionList.aspx/GetGSTRegTD",
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

//===========================Start View Data Method==============================
function ViewTP(RefID) {
    $("#tblGSTDocumentsTP tr").remove();
    var count = 0;
    var data = '{RefID:"' + RefID + '"}';

    $.ajax({
        type: "post",
        url: "GSTRegistartionList.aspx/ViewModelBoxTP",
        data: data,
        contentType: "application/json",
        dataType: "json",

        success: function (response) {
            $.each(response.d, function (index, value) {
                debugger;
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
                Amount = value.Amount;
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
                        rows += "<td class='customertd'><a id='pdfPPhoto' onClick='openTab(this)' name='" + value.PhotoPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a></td>";
                    } else {
                        rows += "<td class='customertd'><img id='PPhoto' src='" + value.PhotoPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' /></td>";
                    }

                    if (getExtension(value.EleOfficePath) == "pdf") {
                        rows += "<td class='customertd'><a id='pdfPElectricBill' onClick='openTab(this)' name='" + value.EleOfficePath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a></td>";
                    } else {
                        rows += "<td class='customertd'><img id='PElectricBill' src='" + value.EleOfficePath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' /></td>";
                    }

                    if (getExtension(value.PanCardPath) == "pdf") {
                        rows += "<td class='customertd'><a id='pdfPPAN' onClick='openTab(this)' name='" + value.PanCardPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a></td>";
                    } else {
                        rows += "<td class='customertd'><img id='PPAN' src='" + value.PanCardPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' /></td>";
                    }

                    if (getExtension(value.AadharPath) == "pdf") {
                        rows += "<td class='customertd'><a id='pdfPAadhar' onClick='openTab(this)' name='" + value.AadharPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a></td>";
                    } else {
                        rows += "<td class='customertd'><img id='PAadhar' src='" + value.AadharPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' /></td>";
                    }

                    if (getExtension(value.ShopAct_NOCPath) == "pdf") {
                        rows += "<td class='customertd'><a id='pdfPShop' onClick='openTab(this)' name='" + value.ShopAct_NOCPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a></td>";
                    } else {
                        rows += "<td class='customertd'><img id='PShop' src='" + value.ShopAct_NOCPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' /></td>";
                    }

                    if (getExtension(value.EleHomePath) == "pdf") {
                        rows += "<td class='customertd'><a id='pdfPElectricBillHome' onClick='openTab(this)' name='" + value.EleHomePath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a></td>";
                    } else {
                        rows += "<td class='customertd'><img id='PElectricBillHome' src='" + value.EleHomePath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' /></td>";
                    }

                    if (getExtension(value.BankStatementPath) == "pdf") {
                        rows += "<td class='customertd'><a id='pdfPBankStatement' onClick='openTab(this)' name='" + value.BankStatementPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a></td>";
                    } else {
                        rows += "<td class='customertd'><img id='PBankStatement' src='" + value.BankStatementPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' /></td>";
                    }

                    if (getExtension(value.CancelChequePath) == "pdf") {
                        rows += "<td class='customertd'><a id='pdfPCancelCheque' onClick='openTab(this)' name='" + value.CancelChequePath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a></td>";
                    } else {
                        rows += "<td class='customertd'><img id='PCancelCheque' src='" + value.CancelChequePath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' /></td>";
                    }

                    if (getExtension(value.PartnerShipPath) == "pdf") {
                        rows += "<td class='customertd'><a id='pdfPPartnerShip' onClick='openTab(this)' name='" + value.PartnerShipPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a></td>";
                    } else {
                        rows += "<td class='customertd'><img id='PPartnerShip' src='" + value.PartnerShipPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' /></td>";
                    }

                    if (getExtension(value.OtherPath) == "pdf") {
                        rows += "<td class='customertd'><a id='pdfPOther' onClick='openTab(this)' name='" + value.OtherPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a></td>";
                    } else {
                        rows += "<td class='customertd'><img id='POther' src='" + value.OtherPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' /></td>";
                    }
                    rows += "</tr>";
                    $('#tblGSTDocumentsTP').append(rows);
            });

        },
        failure: function () {
        }
    });
}
//==============================End View Data Method==================================

//===========================Start View Data Method==============================
function ViewTD(RefID) {
    $("#tblGSTDocumentsTD tr").remove();
    var count = 0;
    var data = '{RefID:"' + RefID + '"}';

    $.ajax({
        type: "post",
        url: "GSTRegistartionList.aspx/ViewModelBoxTD",
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
                Amount = value.Amount;

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
                        rows += "<td class='customertd'><a id='pdfDPhoto' onClick='openTab(this)' name='" + value.PhotoPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a></td>";
                    } else {
                        rows += "<td class='customertd'><img id='DPhoto' src='" + value.PhotoPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' /></td>";
                    }

                    if (getExtension(value.EleOfficePath) == "pdf") {
                        rows += "<td class='customertd'><a id='pdfDElectricBill' onClick='openTab(this)' name='" + value.EleOfficePath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a></td>";
                    } else {
                        rows += "<td class='customertd'><img id='DElectricBill' src='" + value.EleOfficePath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' /></td>";
                    }

                    if (getExtension(value.PanCardPath) == "pdf") {
                        rows += "<td class='customertd'><a id='pdfDPAN' onClick='openTab(this)' name='" + value.PanCardPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a></td>";
                    } else {
                        rows += "<td class='customertd'><img id='DPAN' src='" + value.PanCardPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' /></td>";
                    }

                    if (getExtension(value.ShopAct_NOCPath) == "pdf") {
                        rows += "<td class='customertd'><a id='pdfDTAN' onClick='openTab(this)' name='" + value.ShopAct_NOCPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a></td>";
                    } else {
                        rows += "<td class='customertd'><img id='DTAN' src='" + value.ShopAct_NOCPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' /></td>";
                    }

                    if (getExtension(value.AadharPath) == "pdf") {
                        rows += "<td class='customertd'><a id='pdfDAadhar' onClick='openTab(this)' name='" + value.AadharPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a></td>";
                    } else {
                        rows += "<td class='customertd'><img id='DAadhar' src='" + value.AadharPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' /></td>";
                    }

                    if (getExtension(value.OtherPath) == "pdf") {
                        rows += "<td class='customertd'><a id='pdfDOther' onClick='openTab(this)' name='" + value.OtherPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a></td>";
                    } else {
                        rows += "<td class='customertd'><img id='DOther' src='" + value.OtherPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' /></td>";
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
        url: "GSTRegistartionList.aspx/ViewContactPerson",
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

//===============================Start Bind Start DropDown============================
function BindStateDropdown() {
    $.ajax({
        type: "POST",
        url: "../Staff/ClientRegistration.aspx/BindStateDropDown",
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

//=================================Start Update GST Tax Payer  Method Code==========================================
function GSTUpdateTP() {
    $("#loaderFrGST").show();
    $("#loaderFrGST").fadeOut("slow");
    
    var TPReferenceID = $('#txtTPReferenceID').val();
    var TPClientID = $('#txtTPClientID').val();
    var TPApplicanteName = $('#txtTPApplicanteName').val().toUpperCase();
    var TPFatherName = $('#txtTPFatherName').val().toUpperCase();

    var TPApplicantEmail = $('#txtTPApplicantEmail').val();
    var TPMobileNo = $('#txtTPMobileNo').val();
    var TPState = $('#ddlTPState option:selected').val();
    //var TPPaymentMode = $('#ddlTPPaymentMode option:selected').val();
    //var TPAmount = $('#txtTPAmount').val();
    //var TPDueDate = $('#txtTPDueDate').val();
    //var TPChequeNo = $('#txtTPChequeNo').val();
    //var TPNarration = $('#txtITNarration').val(); 
    var TPPaymentMode = $('#ddlTPPaymentMode option:selected').val();
    var TPAmount = $('#txtTPAmount').val();
    var TPDueDate = $('#txtTPDueDate').val();
    var TPChequeNo = $('#txtTPChequeNo').val();
    var TPNarration = $('#txtTPNarration').val();
    var PhotoSource = $('#ChequePhotoSource').val();
    var FileName = $('#ChequeFileName').val();

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

    url = "GSTRegistartionList.aspx/UpdateMasterDataTP";
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
                $("#loaderFrGST").hide();
            }
            else {
                $("#loaderFrGST").hide();
                alert('Failed....! Try Again.');
            }
        }
    });
}
//=================================End Update GST Tax Payer Method Code==========================================
var TDReferenceID = "";
//=================================Start Update GST Tax Deductor  Method Code==========================================
function GSTUpdateTD() {
    $("#loaderFrGST").show();
    $("#loaderFrGST").fadeOut("slow");
    
    TDReferenceID = $('#txtTDReferenceID').val();
    var TDClientID = $('#txtTDClientID').val();
    var TDOfficeName = $('#txtTDOfficeName').val().toUpperCase();
    var TDAuthorisedPersonName = $('#txtTDAuthorisedPersonName').val().toUpperCase();

    var TDOfficeEmail = $('#txtTDOfficeEmail').val();   
    var TDState = $('#ddlTDState option:selected').val();
    //var TDPaymentMode = $('#ddlTDPaymentMode option:selected').val();
    //var TDAmount = $('#txtTDAmount').val();
    //var TDDueDate = $('#txtTDDueDate').val();
    //var TDChequeNo = $('#txtTDChequeNo').val();
    //var NarrationTD = $('#txtNarrationTD').val();
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

    url = "GSTRegistartionList.aspx/UpdateMasterDataTD";
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
                    url: 'GSTRegistartionList.aspx/UpdateDetailDataTD',
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({ 'GSTDContactPersoneDetails': GSTDContactPersoneDetails }),
                    success: function (response) {
                        if (response.d != "Record Not Added ..?") {
                            alert("Updated Successfully..!!");
                            $('#myGSTModalTD').modal('toggle');
                            $("#loaderFrGST").hide();
                        }
                        else {
                            $("#loaderFrGST").hide();
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


//=================================Save Button Method Code For Send Message==========================================
function SendMessageGST() {
    
     AllAttachment = "";
    ReferenceID = $('#lblReferenceID1').text();
    var FranchiseeID = $('#lblFranchiseeID').text();
    ClientId = $('#lblClientID1').text();
    var Subject = $('#txtSubject').val();
    var Message = $('#txtMessage').val();

    var data;
    var url;
    data = '{ReferenceID1:"' + ReferenceID +
            '",StaffID:"' + StaffID +
            '",FranchiseeID:"' + FranchiseeID +
            '",ClientId:"' + ClientId +
           '",Subject:"' + Subject +
           '",Message:"' + Message + '"}';
    url = "GSTRegistartionList.aspx/SendMasterData";
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: data,
        success: function (response) {
            if (response.d != "Record Not Added ..?") {
                ReferenceID = response.d;
                debugger;
                var data = "";
                var url = "";
                AllAttachment = JSON.stringify(GetAttachmentDetails());
                //AllBankDetails = JSON.stringify(GetBankDetails());
                $.ajax({
                    url: 'GSTRegistartionList.aspx/SendDetails',
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({ 'AllAttachment': AllAttachment }),
                    success: function (response) {
                        if (response.d != "Record Not Added ..?") {
                            alert("Message Send Successfully");
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
function GetAttachmentDetails() {
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
            'ReferenceID': ReferenceID,
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
         + "<label class='control-label col-lg-3 col-md-3 col-sm-3' style='color: #337ab7;'>Upload Attchment</label>"
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
         + "<label class='control-label col-lg-3 col-md-3 col-sm-3'>Upload Attchment</label>"
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
         + "<label class='control-label col-lg-3 col-md-3 col-sm-3'>Upload Attchment</label>"
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
function ChequeAttachments(input, id) {

    if (input.files && input.files[0]) {

        var filerdr = new FileReader();
        filerdr.onload = function (e) {
            fileExtension = (input.value.substring((input.value.lastIndexOf("\\")) + 1)).replace(/^.*\./, '');
            if (fileExtension == "jpg" || fileExtension == "jpeg" || fileExtension == "pdf" || fileExtension == "png") {

                document.getElementById(id + 'PhotoSource').value = e.target.result; //Generated DataURL
                document.getElementById(id + 'FileName').value = input.value.substring((input.value.lastIndexOf("\\")) + 1)
            }
            else {
                $("#" + id).val("");
                alert("Only Pdf/jpg/jpeg/png Format allowed");
            }
        }
        filerdr.readAsDataURL(input.files[0]);
    }

}
//========================End Get  Attachment Details================================



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
