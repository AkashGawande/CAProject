var FileTransactionID = "";
var ITNoticeStaffId = "";

var SDate = "";
var EDate = "";
var SearchText = "";


var duedate = "", Narration = "", ChequeNo = "", Amount = "", filename = "", Sfilename = "";


$(document).ready(function () {
   
    ActiveClass("ITN");

    GetITNoticeFiles(SDate, EDate, SearchText, "Assigned");

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
        var img = "../.." + ImagePath;
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

   
    //==========================Start Assigned Files Tab======================================
    $('#liAssigned').click(function () {
        GetITNoticeFiles("", "", "", "Assigned");
    });
    //==========================End Assigned Files Tab======================================
    //==========================Start Verified Files Tab======================================
    $('#liVerified').click(function () {
        GetITNoticeFiles("", "", "", "Verified,0");
    });
    //==========================End Verified Files Tab======================================
    
    //==========================Start Assigned Files Search Button======================================
    $('#btnSearchAssigned').click(function () {
        SDate = $('#StartDateAssigned').val();
        EDate = $('#EndDateAssigned').val();
        SearchText = $('#txtSearchTextAssigned').val();
        GetITNoticeFiles(SDate, EDate, SearchText, "Assigned");
        
    });
    //==========================End Assigned Files Search Button======================================
    //==========================Start Verified Files Search Button======================================
    $('#btnSearchVerified').click(function () {
        SDate = $('#StartDateVerified').val();
        EDate = $('#EndDateVerified').val();
        SearchText = $('#txtSearchTextVerified').val();
        var Status = $('#ddlFileStatus').val();
        GetITNoticeFiles(SDate, EDate, SearchText, "Verified," + Status);
        
    });
    //==========================End Verified Files Search Button======================================

    
});

//==========================Start Verify Button======================================
$(document).on('click', '#btnVerify', function () {
    var $row = $(this).closest("tr");
    var FileTransactionID = $row.find("td:nth-child(3)").text();
    var ApplicantName = $row.find("td:nth-child(5)").text();
    var result = confirm("Do you want to Verify " + ApplicantName + " file");
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
    url = "ITNoticeCompliance.aspx/UpdateToVerify";
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
                GetITNoticeFiles("", "", "", "Assigned");

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
    var ApplicantName = $row.find("td:nth-child(5)").text();
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
    url = "ITNoticeCompliance.aspx/UpdateToCompleted";
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: data,
        success: function (response) {
            if (response.d != "Record Not Added ..?") {
                alert("Completed Successfuly....!");
                GetITNoticeFiles("", "", "", "Verified,0");

            }
            else {
                alert('Failed....! Try Again.');
            }
        }
    });

}

//===========================End Completed Method===================================







//=======================Start Get Image On Modal Box=============================
$(document).on('click', '#myImg', function () {
    var ImagePath = $(this).data('id');
    var img = "../.." + ImagePath;
    $("#ModalImage").attr("src", img);

    $("#btnDownload").attr('href', img);
    $("#btnDownload").attr('download', img);
});
//=======================End Get Image On Modal Box=============================

//=======================Start Send Message to Franchisee=============================
$(document).on('click', '#btnITNReply1', function () {
    debugger;
    $('#tblITNoticeAttachment tr').remove();
    var $row = $(this).closest("tr");
    var FileTransactionID = $row.find("td:nth-child(3)").text();
    var ClientID = $row.find("td:nth-child(4)").text();
    var ApplicantName = $row.find("td:nth-child(5)").text();
    ITNoticeStaffId = $row.find("td:nth-child(8)").text();

    $('#lblFileTransactionID1').text(FileTransactionID);
    $('#lblFranchiseeID').text($row.find("td:nth-child(7)").text());
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
    $("#loaderHdITN").show();
    //$("#loaderHdITN").fadeOut("slow");
    
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
                            $("#loaderHdITN").hide();
                        }
                        else {
                            $("#loaderHdITN").hide();
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
    var FileName = "";
    var FilePath = "";
    var PhotoName = "";
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
    $("#loaderHdITN").show();
    //$("#loaderHdITN").fadeOut("slow");
    
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
                $("#loaderHdITN").hide();
            }
            else {
                $("#loaderHdITN").hide();
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

//===================================Start Bind Employee for AssignedTo Drop Down=============================
function BindAssignedTo(dept, customUrl) {
    $.ajax({
        type: "POST",
        url: customUrl,
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            console.log(r);
            //var dept = $("#ddlAssignedTo");
            dept.empty().append('<option selected="selected" value="0">-- ALL --</option>');
            $.each(r.d, function (key, value) {
                dept.append($("<option></option>").val(value.EmpId).text(value.EmpName));
            });
        }
    });
}
//===================================End Bind Employee for AssignedTo Drop Down=============================


//===================================Start Bind Firm Name Drop Down=============================
function BindFirmName(dept, customUrl) {    
    $.ajax({
        type: "POST",
        url: customUrl,
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            console.log(r);
            //var dept = $("#ddlFirmNameNew");
            dept.empty().append('<option value="0">-- ALL --</option>');
            $.each(r.d, function (key, value) {
                dept.append($("<option></option>").val(value.FranchiseeID).text(value.FirmName));
            });
            dept.multiselect('rebuild');
        }
    });
}
//===================================End Bind Firm Name Drop Down=============================


//===================================Start Get IT Files Method============================
function GetITNoticeFiles(SDate, EDate, SearchText, FStatus) {
    $('#tblITN').show();
    $('#tblITNFiling tr').remove();
    
    var Data = '{StartDate:"' + SDate +
        '",EndDate:"' + EDate +
        '",SearchText:"' + SearchText +
        '",FileStatus:"' + FStatus +
        '"}';

    var count = 0;
    $.ajax({
        type: "POST",
        url: "ITNoticeCompliance.aspx/GetITNFiles",
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
                    rows += "<td class='customertd'>" + value.ApplicantName + "</td>";
                    rows += "<td class='customertd'>" + value.ApplicantMobileNo + "</td>";
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
                        rows += "<td class='center'><button id='btnEdit' title='View Details' class='btn btn-primary btn-xs' data-toggle='modal' data-target='#myModal'><i class='ace-icon fa fa-edit  bigger-110 icon-only'></i></button>&nbsp;";
                        rows += "<button id='btnITNReply1' title='Reply to Franchisee' class='btn btn-success btn-xs'  data-toggle='modal' data-target='#myModalReply'><i class='ace-icon fa fa-reply  bigger-110 icon-only'></i></button>&nbsp;";
                        rows += "<button id='btnVerify' title='Click to Verify' class='btn btn-info btn-xs'><i class='ace-icon fa fa-check-square-o bigger-110 icon-only'></i></button></td>";
                    }
                    else if (FStatus.split(",")[0] == "Verified") {
                        if (value.FileStatus == "Verified") {
                            rows += "<td class='center'><button id='btnEdit' style='display:none;' title='View Details' class='btn btn-primary btn-xs' data-toggle='modal' data-target='#myModal'><i class='ace-icon fa fa-edit  bigger-110 icon-only'></i></button>&nbsp;";
                            rows += "<button id='btnITReply1' style='display:none;' title='Reply to Franchisee' class='btn btn-success btn-xs'  data-toggle='modal' data-target='#myModalReply'><i class='ace-icon fa fa-reply  bigger-110 icon-only'></i></button>&nbsp;";
                            rows += "<button id='btnComplete' title='Mark As Completed' class='btn btn-danger btn-sm'><i class='ace-icon fa fa-check-square bigger-110 icon-only'> Complete</i></button></td>";
                        }
                        else if (value.FileStatus == "Completed") {
                            rows += "<td class='center'><button id='btnEdit' style='display:none;' title='View Details' class='btn btn-primary btn-xs' data-toggle='modal' data-target='#myModal'><i class='ace-icon fa fa-edit  bigger-110 icon-only'></i></button>&nbsp;";
                            rows += "<button id='btnITReply1' style='display:none;' title='Reply to Franchisee' class='btn btn-success btn-xs'  data-toggle='modal' data-target='#myModalReply'><i class='ace-icon fa fa-reply  bigger-110 icon-only'></i></button>&nbsp;";
                            rows += "<button id='btnCompleted' title='Completed' class='btn btn-success btn-sm' disabled='disabled'>Completed</button></td>";
                        }
                    }
                    rows += "</tr>";
                    $('#tblITNFiling').append(rows);
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
                rows1 = "<tr><td colspan='9' style='text-align: center;font-family:Calibri;font-size:16px;font-weight:bold;color:Red' >data does not exist..!</td></tr>";
                $('#tblITNFiling').append(rows1);
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
    $("#loaderHdITN").show();
    $("#tblDocuments tr").remove();
    $("#tblITNfooter tr").remove();
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
            var footer_rows = "<tr><td colspan='" + count + "' style='text-align:left;'><a class='btn btn-sm btn-info' id='btnITNAllDownLoad' href='#' ><i class='ace-icon fa fa-download fa-2x bigger-110 icon-only'></i> Download All</a></td></tr>";
            $('#tblITNfooter').append(footer_rows);
            $("#loaderHdITN").hide();
        },
        failure: function () {
            $("#loaderHdITN").hide();
        }
    });
}
//==============================End View Documents Method==================================


//=======================Start Download All Documents=============================
$(document).on('click', '#btnITNAllDownLoad', function () {
    debugger;
    var $row = $(this).closest("tr");
    $($row.find("#btnDownload").remove());
    var FID = $('#txtITNoticeFileTransactionID').val();
    var ClientName = $('#txtITNoticeApplicantName').val();

    var data = '{FileTransactionID:"' + FID +
        '",ClientName:"' + ClientName + '",TableName:"itnoticedocuments"}';

    $.ajax({
        type: "post",
        url: "ITNoticeCompliance.aspx/DownloadAllITNDocument",
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