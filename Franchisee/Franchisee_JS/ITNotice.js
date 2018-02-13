var FileTransactionID = "";
var ITNoticeStaffId = "";
var duedate = "", Narration = "", ChequeNo = "", Amount = "", filename = "", Sfilename = "";


$(document).ready(function () {
    ActiveClass("ITN");


    BindEmployeeID();
    BindEmployeeName();

    //===================================Start Get GST Tax Payer on FranchiseeID DDL Change=============================
    $('#ddlEmployeeID').change(function () {
        $('#ddlEmployeeName').val($('#ddlEmployeeID').val());
        GetITNoticeFiles($('#ddlEmployeeID').val());
        $('#tblITNotice').show();
    });
    //===================================End Get Get GST Tax Payer on FranchiseeID DDL Change=============================

    //===================================Start Get GST Tax Payer on Firm name DDL Change=============================
    $('#ddlEmployeeName').change(function () {
        $('#ddlEmployeeID').val($('#ddlEmployeeName').val());
        GetITNoticeFiles($('#ddlEmployeeName').val());
        $('#tblITNotice').show();
    });
    //===================================End Get GST Tax Payer on Firm name DDL Change=============================


    //===================================Start Credit and Cheque Validations=============================
    $('#ddlITNoticePaymentMode').change(function () {
        debugger;
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
    $('#ddlAccountNo').change(function () {
        if ($('#ddlAccountNo').val() != "0") {
            var data = '{AccountId:"' + $('#ddlAccountNo').val() + '"}';
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

    //=======================Start View IT File Details=============================
    $(document).on('click', '#btnEdit', function () {
        BindStateDropdown();
        var $row = $(this).closest("tr");
        var FileTransactionID = $row.find("td:nth-child(3)").text();
        View(FileTransactionID);
        ViewDoc(FileTransactionID);
    });
    //=======================End View IT File Details=============================
   
    //=======================Start Get Image On Modal Box=============================   
    $('#ChequePhotoNotice').click(function () {
        var ImagePath = $('#ChequePhotoNotice').attr('src');
        var img = ".." + ImagePath;
        $("#ModalImage").attr("src", img);

        $("#btnDownload").attr('href', img);
        $("#btnDownload").attr('download', img);
    });
    //=======================End Get Image On Modal Box=============================
    

    

    //=======================Start Send Message to Franchisee=============================
    $('#btnSend').click(function () {
        if ($('#txtSubject').val() != "") {
            if ($('#txtMessage').val() != "") {
                SendITNoticeMessage();
            } else {
                $('#txtMessage').focus()
            }
        } else {
            $('#txtSubject').focus()
        }
    });
    //=======================End Send Message to Franchisee=============================

   

    
    //=======================Start Update IT Client Details=============================
    $('#btnUpdateITNotice').click(function () {
        
        if ($('#ddlAccountNo option:selected').index() != 0) {
                if ($('#ddlITNoticeYearType option:selected').index() != 0) {
                    if ($('#ddlITNoticeYear option:selected').val()!="") {
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
            $('#ddlAccountNo').focus();
        }

    });
    //=======================End Update IT Client Details=============================
});

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
$(document).on('click', '#btnITReply1', function () {

    $('#tblITNoticeAttachment tr').remove();
    var $row = $(this).closest("tr");
    var FileTransactionID = $row.find("td:nth-child(3)").text();
    var ClientID = $row.find("td:nth-child(4)").text();
    var ApplicantName = $row.find("td:nth-child(5)").text();
    ITNoticeStaffId = $row.find("td:nth-child(7)").text();

    $('#lblFileTransactionID1').text(FileTransactionID);
    $('#lblFranchiseeID').text($('#ddlFranchiseeID').val());
    $('#lblClientID1').text(ClientID);
    $('#lblApplicantName1').text(ApplicantName);
    AddAttachmentRowITNotice();
});
//=======================End Send Message to Franchisee=============================

//=================Start Add New Attachment Button======================
$(document).on('click', '#SendNewAttach', function () {
    AddAttachmentRowITNotice();
});
//=================End Add New Attachment Button======================
//==========================Start Delete Attachment Button======================================
$(document).on('click', '#Sendbtndeleteattach', function () {
    $(this).closest('tr').remove();
});
//==========================End Delete Attachment Button======================================


var count = 0;
//=================Start Add New Attachment Function======================
function AddAttachmentRowITNotice() {
    var rows = "";
    var a = $('#tblITNoticeAttachment tr:last td:nth-child(1)').text();
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
         + "<input type='file' class='form-control' name='file[]' id=" + count + " multiple='multiple' onchange='AttachmentsITNotice(this," + count + ")' />"
         + "<label style='color: lightgray; font-weight: normal;'>only pdf/jpg/jpeg/gif/bmp format</label>"
         + "<input type='hidden' id='PhotoSource" + count + "' value='' class='PhotoSource'/>"
         + "<input type='hidden' id='PhotoFileName" + count + "' value='' class='PhotoFileName' />"
         + "</div>"
         + "</div>"
         + "</div>"
         + "<div class='col-lg-1 col-md-1 col-sm-1'>"
         + "<a id='SendNewAttach'>"
         + "<i class='ace-icon fa fa-plus fa-2x  bigger-110 icon-only'></i>"
         + "</a>"
         + "</div>"
         + "</div>"
         + "</td>"
         + "</tr>"

        $("#tblITNoticeAttachment").append(rows);
    }
    else if (count == a) {
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
         + "<input type='file' class='form-control' name='file[]' id=" + count + " multiple='multiple' onchange='AttachmentsITNotice(this," + count + ")' />"
         + "<label style='color: lightgray; font-weight: normal;'>only pdf/jpg/jpeg/gif/bmp format</label>"
         + "<input type='hidden' id='PhotoSource" + count + "' value='' class='PhotoSource'/>"
         + "<input type='hidden' id='PhotoFileName" + count + "' value='' class='PhotoFileName' />"
         + "</div>"
         + "</div>"
         + "</div>"
         + "<div class='col-lg-1 col-md-1 col-sm-1'>"
         + "<a  id='Sendbtndeleteattach'><i class='ace-icon fa fa-trash-o red icon-only bigger-130'></i></a>"
         + "</div>"
         + "</div>"
         + "</td>"
         + "</tr>"
        $("#tblITNoticeAttachment").append(rows);
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
         + "<label class='control-label col-lg-3 col-md-3 col-sm-3' style='color: #337ab7;'>Upload Attchment</label>"
         + "<div class='col-lg-4 col-md-4 col-sm-4'>"
         + "<input type='text' placeholder='Enter Document Name' class='DocumentName form-control' name='req' id='txtDocumentName' />"
         + "</div>"
         + "<div class='col-lg-5 col-md-5 col-sm-5'>"
         + "<input type='file' class='form-control' name='file[]' id=" + count + " multiple='multiple' onchange='AttachmentsITNotice(this," + count + ")' />"
         + "<label style='color: lightgray; font-weight: normal;'>only pdf/jpg/jpeg/gif/bmp format</label>"
         + "<input type='hidden' id='PhotoSource" + count + "' value='' class='PhotoSource'/>"
         + "<input type='hidden' id='PhotoFileName" + count + "' value='' class='PhotoFileName' />"
         + "</div>"
         + "</div>"
         + "</div>"
        + "<div class='col-lg-1 col-md-1 col-sm-1'>"
        + "<a  id='Sendbtndeleteattach'><i class='ace-icon fa fa-trash-o red icon-only bigger-130'></i></a>"
        + "</div>"
        + "</div>"
        + "</td>"
        + "</tr>"
        $("#tblITNoticeAttachment").append(rows);
    }
}
//=================End Add New Attachment Function======================

//=================Start Get  Attachment Details========================================
function AttachmentsITNotice(input, count) {
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

//=================================Save Button Method Code For Send Message==========================================
function SendITNoticeMessage() {
    debugger;
    FileTransactionID = $('#lblFileTransactionID1').text();
    var FranchiseeID = $('#lblFranchiseeID').text();
    ClientId = $('#lblClientID1').text();
    var Subject = $('#txtSubject').val();
    var Message = $('#txtMessage').val();

    var data;
    var url;
    data = '{FileTransactionID:"' + FileTransactionID +
            '",FranchiseeID:"' + FranchiseeID +
            '",ITNoticeStaffId:"' + ITNoticeStaffId +
            '",ClientId:"' + ClientId +
           '",Subject:"' + Subject +
           '",Message:"' + Message + '"}';

    url = "ITNoticeCompliance.aspx/SaveMasterData";
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: data,
        success: function (response) {
            if (response.d != "Record Not Added ..?") {
                FileTransactionID = response.d;
                var data = "";
                var url = "";
                var AllAttachment = JSON.stringify(GetAttachmentDetails());
                //AllBankDetails = JSON.stringify(GetBankDetails());
                $.ajax({
                    url: 'ITNoticeCompliance.aspx/SaveDetails',
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
function GetAttachmentDetails() {

    var Attachment = [];
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




//=================================Start Update IT Client  Method Code==========================================
function UpdateITNotice() {
    $("#loaderFrITN").show();
    $("#loaderFrITN").fadeOut("slow");
    
    var FileTransactionID = $('#txtITNoticeFileTransactionID').val();
    var ClientID = $('#txtITNoticeClientID').val();
    var AccountID = $('#ddlAccountNo option:selected').val();
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
                $("#loaderFrITN").hide();
            }
            else {                
                $("#loaderFrITN").hide();
                alert('Failed....! Try Again.');
            }
        }
    });
}
//=================================End Update IT Client  Method Code==========================================



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

//===================================Start Bind EmpolyeeID Drop Down=============================
function BindEmployeeID() {
    debugger;
    $.ajax({
        type: "POST",
        url: "ITNoticeCompliance.aspx/BindEmployeeID",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            debugger;
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
        url: "ITNoticeCompliance.aspx/BindEmployeeID",
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




//===================================Start Get IT Files Method============================
function GetITNoticeFiles(SID) {
    $('#tblITNoticeFiling tr').remove();
    var count = 0;
    $.ajax({
        type: "POST",
        url: "ITNoticeCompliance.aspx/GetITFiles",
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
                
                BindYear(value.YearType);
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
                debugger;
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
                var j3 = $('#ddlAccountNo option').length;
                var val3 = "";
                for (var i = 0; i < j3; i++) {
                    val3 = $('#ddlAccountNo option')[i].value;
                    if (val3 == accountid) {
                        $('#ddlAccountNo option')[i].selected = true;
                        $('#ddlAccountNo').trigger('change');
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
                        rows += "<td class='customertd'><a id='Downloadpdf' onClick='openTab(this)' name='" + value.DocumentPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a></td>";
                    } else {
                        rows += "<td class='customertd'><img id='myImg' src='" + value.DocumentPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' data-id='" + value.DocumentPath + "' /></td>";
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
                        rows2 += "<a id='Downloadpdf' onClick='openTab(this)' name='" + value.DocumentPath + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a>";
                    } else {
                        rows2 += "<img id='myImg' src='" + value.DocumentPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' data-id='" + value.DocumentPath + "' />";
                    }
                    $('#tblDocuments tr:last td:nth-child(' + count + ')').append(rows2);
                }

            });

        },
        failure: function () {
        }
    });
}
//==============================End View Documents Method==================================

//============================ Bind Year Dropdown=====================================
function BindYear(yeartype) {
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

//=================Start Get  Attachment Details========================================
function ChequeAttachments(input, Id) {
    if (input.files && input.files[0]) {

        var filerdr = new FileReader();
        filerdr.onload = function (e) {
            var fileExtension = (input.value.substring((input.value.lastIndexOf("\\")) + 1)).replace(/^.*\./, '');
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