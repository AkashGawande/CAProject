


var count = 0;
var contactPersoneCount = 0;
var GSTDeductorcontactPersoneCount = 0;
var ClientType = "";
var GSTType = "";

var ClientId = "";
var PANCard = "";
var TAN_No = "";
var GST_No = "";
var FName = "";
var Middle = "";
var LName = "";
var FullName = "";

var FatherFName = ""
var FatherMName = "";
var FatherLName = "";
var Father_FullName = "";
var Address = "";
var PinCode = "";
var BirthDate = "";
var MobileNo = "";
var Email = "";
var EmployesType = "";
var StateId = "";
var Citizen = "";
var AdharNo = "";
var ITdPassword = "";
var Status = "";

var Attachment = [];
var AllAttachment = "";
var PhotoSource = "";
var PhotoName = "";
var DocumentName = "";
var fileExtension = "";


var BankDetails = [];
var AllBankDetails = "";
var BankAccono = "";
var IFSCCode = "";

var TANContactPersoneDetail = [];
var TANContactPersoneDetails = "";
var TANContactPersoneName = "";
var TANContactPersoneMobile = "";


var GSTDeductorContactPersoneDetail = [];
var GSTDeductorContactPersoneDetails = "";
var GSTDeductorContactPersoneName = "";
var GSTDeductorContactPersoneMobile = "";


$(document).ready(function () {
   
    ActiveClass("Client");


    //==========================Start Save Button======================================
    $('#btnSave').click(function () {
        
        var data = "";
        var url = "";
        url = "ClientRegistration.aspx/GetSessionStatus";

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: data,
            success: function (response) {
                
                if (response.d != "") {
                    if (ClientType == "PAN") {
                        PANBasedClientSave();
                    }
                    else if (ClientType == "TAN") {

                        TANBasedClientSave();
                    }
                    else if (ClientType == "GST") {
                        if (GSTType == "TAX_Payer")
                        {
                            GSTBasedPayerClientSave();
                        }
                        else if (GSTType == "TAX_Deductor")
                        {
                            GSTBasedDeductorClientSave()
                        }
                    }
                }                   
                else {
                    window.location.replace("../SessionExpired.aspx");
                }
            }
        });
    });
    //==========================End Save Button======================================

    //=======================Start Client Type On change===================================
    $(".ClientType").change(function () {
        
        $('#tblAccount tr').remove();
        $('#tblAttachment tr').remove();
        $('#tblContactpersone tr').remove();


        if ($(".ClientType option:selected").index() != 0) {
            ClientType = $(".ClientType option:selected").val();
            if (ClientType == "PAN") {                
                $('#panno').show();
                $('#tanno').hide();
                $('#gstno').hide();


                $('#PANBased').show();
                $('#TANBased').hide();
                $('#GSTBased').hide();
                $('#Document').show();
                $('#gstnUserid').hide();

                for (var i = 1; i <= 3; i++) {
                    AddAttachmentRow();
                }
                var j = 1;
                $('tr.data-contact-person2').each(function () {
                   if (j == 1) {
                       $(this).find(".DocumentName").val("PAN CARD");
                       $(this).find(".DocumentName").attr('disabled', true);
                       $(this).find(".Star").text('*');
                        } else if (j == 2) {
                            $(this).find(".DocumentName").val("AADHAR CARD");
                            $(this).find(".DocumentName").attr('disabled', true);
                            $(this).find(".deleteattach").remove();
                            $(this).find(".Star").text('*');
                        } else if (j == 3) {
                            $(this).find(".DocumentName").val("BANK STATEMENT OR BANK PASSBOOK");
                            $(this).find(".DocumentName").attr('disabled', true);
                            $(this).find(".deleteattach").remove();
                            $(this).find(".Star").text('*');
                        }
                    j++;
                });

                AddRow();               
                BindStateDropdown();

            }
            else if (ClientType == "TAN") {
                contactPersoneCount = 0;
                $('#panno').hide();
                $('#tanno').show();
                $('#gstno').hide();
                $('#gstnUserid').hide();
                
                $('#TANBased').show();
                $('#PANBased').hide();
                $('#GSTBased').hide();
                $('#Document').show();
                AddAttachmentRow();
                BindStateDropdown();
                AddContactPersoneRow();
            }
            else if (ClientType == "GST") {
               
                $('#panno').hide();
                $('#tanno').hide();
                $('#gstno').show();

                $('#TANBased').hide();
                $('#PANBased').hide();
                $('#GSTBased').show();
                
                $('#GSTTaxPayer').hide();
                $('#GSTTaxDeductor').hide();
                $('.GSTType option')[0].selected = true;
                $('.GSTType').trigger('change');
            }

        }

        else {
            $('#panno').hide();
            $('#tanno').hide();
            $('#gstno').hide();

            $('#TANBased').hide();
            $('#PANBased').hide();
            $('#GSTBased').hide();

            $('#GSTTaxPayer').hide();
            $('#GSTTaxDeductor').hide();
            $('.GSTType option')[0].selected = true;
            $('.GSTType').trigger('change');

        }
    });
    //=======================End Client Type On change===================================    

    //=======================Start GST Type On change===================================
    $(".GSTType").change(function () {
        
        $('#tblAttachment tr').remove();
        $('#tblGSTDeductorContactpersone tr').remove();
        GSTType = $(".GSTType option:selected").val();

        $('#txtGST').val("");
        $('#txtGSTError').hide();
        
        if ($(".GSTType option:selected").index() != 0) {           
                if (GSTType == "TAX_Payer") {
                    $('#GSTTaxPayer').show();
                    $('#GSTTaxDeductor').hide();
                    $('#Document').show();
                    $('#gstnUserid').show();

                    AddAttachmentRow();
                    var j = 1;
                    $('tr.data-contact-person2').each(function () {
                        if (j == 1) {
                            $(this).find(".Star").text('*');
                            $(this).find(".DocumentName").val("GST Certificate");
                            $(this).find(".DocumentName").attr('disabled', true);
                        } 
                        j++;
                    });


                    
                    BindStateDropdown();
                    AddGSTDeductorContactPersoneRow();
                    
                }
                else if (GSTType == "TAX_Deductor") {
                    GSTDeductorcontactPersoneCount = 0;
                    $('#GSTTaxPayer').hide();
                    $('#GSTTaxDeductor').show();
                    $('#Document').show();
                    $('#gstnUserid').show();

                    AddAttachmentRow();
                    var j = 1;
                    $('tr.data-contact-person2').each(function () {
                        if (j == 1) {
                            $(this).find(".Star").text('*');
                            $(this).find(".DocumentName").val("GST Certificate");
                            $(this).find(".DocumentName").attr('disabled', true);
                        }
                        j++;
                    });

                    
                    BindStateDropdown();
                    AddGSTDeductorContactPersoneRow();
                }
        }

        else {
            $('#GSTTaxPayer').hide();
            $('#GSTTaxDeductor').hide();
            $('#Document').hide();
            $('#gstnUserid').hide();
            
        }
    });
    //=======================End GST Type On change===================================

    //=======================Start Get Image On Modal Box=============================
    $(document).on('click', '#myImg', function () {
        var ImagePath = $(this).data('id');
        var img = ".." + ImagePath;
        $("#ModalImage").attr("src", img);

        $("#btnDownload").attr('href', img);
        $("#btnDownload").attr('download', img);
    });

    //=======================End Get Image On Modal Box=============================

});


//*********************************Start Client Registration All Methods***********************************
//=================================Save PAN Based Client  Method Code==========================================
function PANBasedClientSave()
{
    $("#loaderClientReg").show();
    //$("#loaderClientReg").fadeOut("slow");

    PANCard = $('#txtPAN').val();    
    if (PANCard != "")
    {
        ClientId = PANCard;
    }
    
    FName = $('#txtAppName').val().toUpperCase();
    Middle = $('#txtAppMiddleName').val().toUpperCase();
    LName = $('#txtAppLastName').val().toUpperCase();
    FullName = FName + " " + Middle + " " + LName;

    FatherFName = $('#txtAppFatherName').val().toUpperCase();
    FatherMName = $('#txtAppFatherMiddleName').val().toUpperCase();
    FatherLName = $('#txtAppFatherLastName').val().toUpperCase();
    Father_FullName = FatherFName + " " + FatherMName + " " + FatherLName;
    var Line_No = $('#txtAddress').val();
    Address = escape(Line_No);

    PinCode = $('#txtpincode').val();
    BirthDate = $('#txtDOB').val();
    MobileNo = $('#txtAppmobile').val();
    Email = $('#txtemail').val();
    EmployesType = $('#ddlsalary option:selected').text();
    StateId = $('#ddlstate option:selected').val();
    Citizen = $('#ddlCitizen option:selected').text();
    AdharNo = $('#txtAadharNo').val();
    ITdPassword = $('#txtItdPassword').val();
    Status = "Active";

    var data;
    var url;
    data = '{ClientId:"' + ClientId +
            '",PANCard:"' + PANCard +
           '",FullName:"' + FullName +
            '",Father_FullName:"' + Father_FullName +
           '",Address:"' + Address +
           '",PinCode:"' + PinCode +
           '",BirthDate:"' + BirthDate +
           '",MobileNo:"' + MobileNo +
           '",Email:"' + Email +
           '",EmployesType:"' + EmployesType +
           '",StateId:"' + StateId +
           '",Citizen:"' + Citizen +
           '",AdharNo:"' + AdharNo +
           '",ITdPassword:"' + ITdPassword +
           '" ,Status:"' + Status + '"}';

    url = "ClientRegistration.aspx/SavePANClientMasterData";

    if(PANCard!="")
    {
        document.getElementById("txtPANError1").style.display = "none";
       
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
                    AllAttachment = JSON.stringify(GetDocumentAttachmentDetails());
                    AllBankDetails = JSON.stringify(GetPANBasedBankDetails());
                    $.ajax({
                        url: 'ClientRegistration.aspx/SavePANClientDetails',
                        type: 'POST',
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify({ 'AllAttachment': AllAttachment, 'AllBankDetails': AllBankDetails }),
                        success: function (response) {
                            if (response.d != "Record Not Added ..?") {
                                $('#ClentReg').hide();
                                $('#MessageForm').show();
                                $("#loaderClientReg").hide();
                            }
                            else {
                                $("#loaderClientReg").hide();
                                alert('Failed....! Try Again.');
                            }
                        }
                    });
                }
                //else if (response.d != "Record Not Added ..?" || response.d == "Session Expired")
                //{
                //    window.location.replace("../SessionExpired.aspx");
                //}
                else {
                    alert('Failed....! Try Again.');
                }
            }
        });
    }
else
{
        document.getElementById("txtPANError1").style.display = "block";
        $('#txtPAN').focus();
} 
}

//-------------------------------Start Save Member Details Method--------------------------
function GetPANBasedBankDetails() {
    
    BankDetails = [];
    $('tr.data-contact-person1').each(function () {

        if ($(this).find(".BankAccno").val() != "") {
            BankAccono = $(this).find(".BankAccno").val();
        }
        if ($(this).find(".IFSC").val() != "") {
            IFSCCode = $(this).find(".IFSC").val();
        }
        Status = 'InActive';
        var alldata = {
            'ClientId': ClientId,
            'BankAccono': BankAccono,
            'IFSCCode': IFSCCode
        }

        BankDetails.push(alldata);
    });
    console.log(BankDetails);
    return BankDetails;
}
//-------------------------------End Save Member Details Method--------------------------
//=====================================End PAN Based Client Method Code=========================================

//=================================Save TAN Based Client  Method Code==========================================
function TANBasedClientSave() {
    $("#loaderClientReg").show();
    //$("#loaderClientReg").fadeOut("slow");

    TAN_No = $('#txtTAN').val();
    if (TAN_No != "") {
        ClientId = TAN_No;
    }
    var OfficeName = $('#txtOfficeName').val().toUpperCase();
    var AuthorisedPersoneName = $('#txtAuthorisedName').val().toUpperCase();  
    
    var Line_No = $('#txtOfficeAddress').val();
    var OfficeAddress = escape(Line_No);
    var OfficePinCode = $('#txtOfficepincode').val();   
    var OfficeEmail = $('#txtOfficeemail').val();   
    var OfficeStateId = $('#ddlTANstate option:selected').val();

    
    var TracesUserId = $('#txtTracesUserId').val();
    var TracesPassword = $('#txtTracesPassword').val();
    Status = "Active";

    var data;
    var url;
    data = '{ClientId:"' + ClientId +
            '",TAN_No:"' + TAN_No +
           '",OfficeName:"' + OfficeName +
            '",AuthorisedPersoneName:"' + AuthorisedPersoneName +
           '",OfficeAddress:"' + OfficeAddress +
           '",OfficePinCode:"' + OfficePinCode +           
           '",OfficeEmail:"' + OfficeEmail +
           '",OfficeStateId:"' + OfficeStateId +
           '",TracesUserId:"' + TracesUserId +
           '",TracesPassword:"' + TracesPassword +
           '" ,Status:"' + Status + '"}';

    url = "ClientRegistration.aspx/SaveTANClientMasterData";

    if (TAN_No != "") {
        document.getElementById("txtTANError1").style.display = "none";

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
                    AllAttachment = JSON.stringify(GetDocumentAttachmentDetails());
                    TANContactPersoneDetails = JSON.stringify(GetTANBasedContactPersoneDetails());
                    $.ajax({
                        url: 'ClientRegistration.aspx/SaveTANClientDetails',
                        type: 'POST',
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify({ 'AllAttachment': AllAttachment, 'TANContactPersoneDetails': TANContactPersoneDetails }),
                        success: function (response) {
                            if (response.d != "Record Not Added ..?") {
                                $('#ClentReg').hide();
                                $('#MessageForm').show();
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
        document.getElementById("txtTANError1").style.display = "block";
        $('#txtTAN').focus();
    }
}

//-------------------------------Start Save Contact person Details Method--------------------------
function GetTANBasedContactPersoneDetails() {

    TANContactPersoneDetail = [];
    $('tr.data-contact-person3').each(function () {

        if ($(this).find(".ContactPerson").val() != "") {
            TANContactPersoneName = $(this).find(".ContactPerson").val();
        }
        if ($(this).find(".ContactPersonMobile").val() != "") {
            TANContactPersoneMobile = $(this).find(".ContactPersonMobile").val();
        }
        Status = 'InActive';
        var alldata = {
            'ClientId': ClientId,
            'TANContactPersoneName': TANContactPersoneName,
            'TANContactPersoneMobile': TANContactPersoneMobile
        }

        TANContactPersoneDetail.push(alldata);
    });
    console.log(TANContactPersoneDetail);
    return TANContactPersoneDetail;
}
//-------------------------------End Save Contact person Details Method--------------------------
//=================================End TAN Based Client  Method Code==========================================

//=================================Save GST Based TAX Payer Client  Method Code==========================================
function GSTBasedPayerClientSave() {
    $("#loaderClientReg").show();
    //$("#loaderClientReg").fadeOut("slow");

    GST_No = $('#txtGST').val();
    if (GST_No != "") {
        ClientId = GST_No;
    }

    FName = $('#txtGSTPayerAppName').val().toUpperCase();
    Middle = $('#txtGSTPayerAppMiddleName').val().toUpperCase();
    LName = $('#txtGSTPayerAppLastName').val().toUpperCase();
    FullName = FName + " " + Middle + " " + LName;

    FatherFName = $('#txtGSTPayerAppFatherName').val().toUpperCase();
    FatherMName = $('#txtGSTPayerAppFatherMiddleName').val().toUpperCase();
    FatherLName = $('#txtGSTPayerAppFatherLastName').val().toUpperCase();
    Father_FullName = FatherFName + " " + FatherMName + " " + FatherLName;
    var Line_No = $('#txtGSTPayerAddress').val();
    Address = escape(Line_No);

    PinCode = $('#txtGSTPayerpincode').val();
    BirthDate = $('#txtGSTPayerDOB').val();
    MobileNo = $('#txtGSTPayerAppmobile').val();
    Email = $('#txtGSTPayeremail').val();   
    StateId = $('#ddlGSTPayerstate option:selected').val();   
    var GSTNUserId = $('#txtGSTNUserId').val();
    var GSTNPassword = $('#txtGSTNPassword').val();
    Status = "Active";

    var data;
    var url;
    data = '{ClientId:"' + ClientId +
            '",GST_No:"' + GST_No +
           '",FullName:"' + FullName +
            '",Father_FullName:"' + Father_FullName +
           '",Address:"' + Address +
           '",PinCode:"' + PinCode +
           '",BirthDate:"' + BirthDate +
           '",MobileNo:"' + MobileNo +
           '",Email:"' + Email +
           '",StateId:"' + StateId +
           '",GSTNUserId:"' + GSTNUserId +
           '",GSTNPassword:"' + GSTNPassword +
           '" ,Status:"' + Status + '"}';

    url = "ClientRegistration.aspx/SaveGSTPayerClientMasterData";

    if (GST_No != "") {
        document.getElementById("txtGSTError1").style.display = "none";

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
                    AllAttachment = JSON.stringify(GetDocumentAttachmentDetails());
                    //AllBankDetails = JSON.stringify(GetPANBasedBankDetails());
                    $.ajax({
                        url: 'ClientRegistration.aspx/SaveGSTPayerClientDetails',
                        type: 'POST',
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify({ 'AllAttachment': AllAttachment}),
                        success: function (response) {
                            if (response.d != "Record Not Added ..?") {
                                $('#ClentReg').hide();
                                $('#MessageForm').show();
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
        document.getElementById("txtGSTError1").style.display = "block";
        $('#txtPAN').focus();
    }
}
//=====================================End GST Based TAX Payer Client Method Code=========================================


//=================================Save GST Based TAX Deductor Client  Method Code==========================================
function GSTBasedDeductorClientSave() {
    $("#loaderClientReg").show();
    //$("#loaderClientReg").fadeOut("slow");

    GST_No = $('#txtGST').val();
    if (GST_No != "") {
        ClientId = GST_No;
    }
    var OfficeName = $('#txtGSTDeductorOfficeName').val().toUpperCase();
    var AuthorisedPersoneName = $('#txtGSTDeductorAuthorisedName').val().toUpperCase();

    var Line_No = $('#txtGSTDeductorOfficeAddress').val();
    var OfficeAddress = escape(Line_No);
    var OfficePinCode = $('#txtGSTDeductorOfficepincode').val();
    var OfficeEmail = $('#txtGSTDeductorOfficeemail').val();
    var OfficeStateId = $('#ddlGSTDeductorstate option:selected').val();


    var GSTNUserId = $('#txtGSTNUserId').val();
    var GSTNPassword = $('#txtGSTNPassword').val();
    Status = "Active";

    var data;
    var url;
    data = '{ClientId:"' + ClientId +
            '",GST_No:"' + GST_No +
           '",OfficeName:"' + OfficeName +
            '",AuthorisedPersoneName:"' + AuthorisedPersoneName +
           '",OfficeAddress:"' + OfficeAddress +
           '",OfficePinCode:"' + OfficePinCode +
           '",OfficeEmail:"' + OfficeEmail +
           '",OfficeStateId:"' + OfficeStateId +
           '",GSTNUserId:"' + GSTNUserId +
           '",GSTNPassword:"' + GSTNPassword +
           '" ,Status:"' + Status + '"}';

    url = "ClientRegistration.aspx/SaveGSTDeductorClientMasterData";

    if (GST_No != "") {
        document.getElementById("txtGSTError1").style.display = "none";

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
                    AllAttachment = JSON.stringify(GetDocumentAttachmentDetails());
                    GSTDeductorContactPersoneDetails = JSON.stringify(GetGSTBasedDeductorContactPersoneDetails());
                    $.ajax({
                        url: 'ClientRegistration.aspx/SaveGSTDeductorClientDetails',
                        type: 'POST',
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify({ 'AllAttachment': AllAttachment, 'GSTDeductorContactPersoneDetails': GSTDeductorContactPersoneDetails }),
                        success: function (response) {
                            if (response.d != "Record Not Added ..?") {
                                $('#ClentReg').hide();
                                $('#MessageForm').show();
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
        document.getElementById("txtGSTError1").style.display = "block";
        $('#txtPAN').focus();
    }
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
            'ClientId': ClientId,
            'GSTDeductorContactPersoneName': GSTDeductorContactPersoneName,
            'GSTDeductorContactPersoneMobile': GSTDeductorContactPersoneMobile
        }

        GSTDeductorContactPersoneDetail.push(alldata);
    });
    console.log(GSTDeductorContactPersoneDetail);
    return GSTDeductorContactPersoneDetail;
}
//-------------------------------End Save Contact Person Details Method--------------------------
//=================================End GST Based TAX Deductor Client  Method Code==========================================


//===================Start Document Common Method================================================
//-------------------------------Start Save Member Details Method--------------------------
function GetDocumentAttachmentDetails() {

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
            'ClientId': ClientId,
            'DocumentName': DocumentName,
            'PhotoSource': PhotoSource,
            'PhotoName': PhotoName
        }

        Attachment.push(alldata);
    });
    console.log(Attachment);
    return Attachment;
}
//-------------------------------End Save Member Details Method--------------------------
//===================End Document Common Method================================================
//*********************************End Client Registration All Methods***********************************



//*********************************Start create Dynamic Row ***********************************
//=================Start Add New Row Function======================
function AddRow() {
    var rows = "";
   // $('#tblAccount tr').remove();
    var a = $('#tblAccount tr:last td:nth-child(1)').text();
    if (a == "") {
        rows = "<tr class='data-contact-person1'>"
        + "<td>"
    + "<div class='row' style='margin-top: 10px'>"
    + "<div class='col-lg-6 col-md-6 col-sm-6'>"
    + "<div class='form-group'>"
    + "<label class='control-label col-lg-4 col-md-4 col-sm-4'>Account Number<label style='color: red;'>*</label></label>"
     + "<div class='col-lg-8 col-md-8 col-sm-8'>"
    + "<input type='text' placeholder='ENTER BANK ACCOUNT NUMBER' class='BankAccno form-control' name='req' id='txtBankAccno' onkeypress='return nospaces(event)' />"
    + "</div>"
    + "</div>"
    + "</div>"
    + "<div class='col-lg-6 col-md-6 col-sm-6'>"
    + "<div class='form-group'>"
    + "<label class='control-label col-lg-4 col-md-4 col-sm-4'>"
    + "IFSC Code"
    + "<label style='color: red;'>*</label></label>"
    + "<div class='col-lg-7 col-md-7 col-sm-7'>"
    + "<input type='text' placeholder='ENTER IFSC CODE' maxlength='11' class='IFSC form-control' name='req' id='txtIFSC' onkeydown='upperCaseF(this)' onkeypress='return nospaces(event)'   />"
   + "</div>"
    + "<div class='col-lg-1 col-md-1 col-sm-1'>"
    + "<button id='AddRow' class='btn btn-primary btn-xs' title='Add Multiple Account Number'>"
    +"<i class='ace-icon fa fa-plus  bigger-110 icon-only'></i>"
    +" </button>"
    + "</div>"
    + "</div>"
    + "</div>"
    + "</div>"
    + "</td>"
    + "</tr>"
        $("#tblAccount").append(rows);
    }   
    else
    {
        rows = "<tr class='data-contact-person1'>"
                + "<td>"
            + "<div class='row' style='margin-top: 10px'>"
            + "<div class='col-lg-6 col-md-6 col-sm-6'>"
            + "<div class='form-group'>"
            + "<label class='control-label col-lg-4 col-md-4 col-sm-4'>Account Number</label>"
            + "<div class='col-lg-8 col-md-8 col-sm-8'>"
            + "<input type='text' placeholder='ENTER BANK ACCOUNT NUMBER' class='BankAccno form-control' name='req' id='txtBankAccno ' onkeypress='return nospaces(event)' />"
            + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='col-lg-6 col-md-6 col-sm-6'>"
            + "<div class='form-group'>"
            + "<label class='control-label col-lg-4 col-md-4 col-sm-4'>"
            + "IFSC Code"
            + "</label>"
            + "<div class='col-lg-7 col-md-7 col-sm-7'>"
            + "<input type='text' placeholder='ENTER IFSC CODE' maxlength='11' class='IFSC form-control' name='req' id='txtIFSC' onkeydown='upperCaseF(this)' onkeypress='return nospaces(event)'   />"
            + "</div>"
            + "<div class='col-lg-1 col-md-1 col-sm-1'>"
            + "<a  id='btndelete'><i class='ace-icon fa fa-trash-o red icon-only bigger-130'></i></a>"
            + "</div>"
            + "</div>"
            + "</div>"
            + "</div>"
            + "</td>"
            + "</tr>"
        $("#tblAccount").append(rows);
    }


    

    
}
//=================End Add New Row Function======================


//=================Start Add New Attachment Function======================
function AddAttachmentRow() {
    var rows = "";
    //$('#tblAttachment tr').remove();
    var a = $('#tblAttachment tr:last td:nth-child(1)').text();
    if (a == "") {
        count++;
        rows = "<tr class='data-contact-person2'>"
          + "<td tabindex='10' style='display:none;'> " + count + "</td>"
         + "<td>"
         + "<div class='row' style='margin-top: 10px'>"      

         + " <div class='col-lg-10 col-md-10 col-sm-10'>"
         + "<div class='form-group'>"
         + "<label class='control-label col-lg-3 col-md-3 col-sm-3'>Upload Attchment <label style='color: red;' id='lblstar' class='Star'></label></label>"
         + "<div class='col-lg-4 col-md-4 col-sm-4'>"
         + "<input type='text' placeholder='Enter Document Name' class='DocumentName form-control' name='req' id='txtDocumentName' />"
         + "</div>"         
         + "<div class='col-lg-5 col-md-5 col-sm-5'>"
         + "<input type='file' class='form-control' name='file[]' id="+count+" multiple='multiple' onchange='Attachments(this,"+count+")' />"
         +"<label style='color: lightgray; font-weight: normal;'>only pdf/jpg/jpeg/gif/bmp format</label>"
         +"<input type='hidden' id='PhotoSource"+count+"' value='' class='PhotoSource'/>"
         + "<input type='hidden' id='PhotoFileName" + count + "' value='' class='PhotoFileName' />"
         +"</div>"
         +"</div>"
         +"</div>"
         +"<div class='col-lg-1 col-md-1 col-sm-1'>"
         +"<a id='NewAttach'>"
         +"<i class='ace-icon fa fa-plus fa-2x  bigger-110 icon-only'></i>"
         +"</a>"
         +"</div>"
         +"</div>"
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
         + "<label class='control-label col-lg-3 col-md-3 col-sm-3'>Upload Attchment <label style='color: red;' id='lblstar' class='Star'></label></label>"
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
         + "<a  id='btndeleteattach' class='deleteattach'><i class='ace-icon fa fa-trash-o red icon-only bigger-130'></i></a>"
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
         + "<label class='control-label col-lg-3 col-md-3 col-sm-3'>Upload Attchment <label style='color: red;' id='lblstar' class='Star'></label></label>"
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
        + "<a  id='btndeleteattach' class='deleteattach'><i class='ace-icon fa fa-trash-o red icon-only bigger-130'></i></a>"
        + "</div>"
        + "</div>"
        + "</td>"
        + "</tr>"
        $("#tblAttachment").append(rows);
    }

}
//=================End Add New Attachment Function======================

//=========================Start Add Contact persone Name And MObile No===================
function AddContactPersoneRow() {
    var rows = "";
    //$('#tblContactpersone tr').remove();
    var a = $('#tblContactpersone tr:last td:nth-child(1)').text();
    if (a == "") {
        contactPersoneCount++;
        rows = "<tr class='data-contact-person3'>"
          + "<td tabindex='10' style='display:none;'> " + contactPersoneCount + "</td>"
         + "<td>"
         + "<div class='row' style='margin-top: 10px'>"
         +"<div class='col-lg-6 col-md-6 col-sm-6'>"
        +"<div class='form-group'>"
        +"<label class='control-label col-lg-4 col-md-4 col-sm-4'>"
        + "Contact Persone " + contactPersoneCount + "</label>"
        +"<div class='col-lg-8 col-md-8 col-sm-8'>"
        + "<input type='text' id='txtContactPerson'  placeholder='Enter Contact Persone Name' name='date' class='ContactPerson validate[required,custom[date]] form-control col-lg-6' />"
        +"</div>"
        +"</div>"
        +"</div>"
        +"<div class='col-lg-5 col-md-5 col-sm-5'>"
        +"<div class='form-group'>"
        + "<label class='control-label col-lg-5 col-md-5 col-sm-5'>Mobile Number</label>"
        +"<div class='col-lg-7'>"
        + "<input type='text' class='ContactPersonMobile form-control' name='req' maxlength='10' placeholder='Enter Contact Person Mobile Number' id='txtContactPersonMobile' onblur='validateMobileNOAndEmail('txtContactPersonMobile')' onkeypress='return isNumber(event)' />"
        +"<span id='txtContactPersonMobileError' style='margin-top: 6px; display: none; font-size: 15px; color: red; font-family: cursive'>Please Enter Valid Mobile No e.g '1234567890'</span>"
        +"</div>"
        +"</div>"
        +"</div>"
        +"<div class='col-lg-1 col-md-1 col-sm-1'>"
        +"<a id='NewContactAttach'><i class='ace-icon fa fa-plus fa-2x  bigger-110 icon-only'></i></a>"
        +"</div>"
        +"</div>"
         + "</td>"
         + "</tr>"

        $("#tblContactpersone").append(rows);
    }
    else if (contactPersoneCount == a) {
        contactPersoneCount++;

        rows = "<tr class='data-contact-person3'>"
             + "<td tabindex='10' style='display:none;'> " + contactPersoneCount + "</td>"
        + "<td>"
           + "<div class='row' style='margin-top: 10px'>"
         + "<div class='col-lg-6 col-md-6 col-sm-6'>"
        + "<div class='form-group'>"
        + "<label class='control-label col-lg-4 col-md-4 col-sm-4'>"
        + "Contact Persone " + contactPersoneCount + "</label>"
        + "<div class='col-lg-8 col-md-8 col-sm-8'>"
        + "<input type='text' id='txtContactPerson' placeholder='Enter Contact Persone Name' name='date' class=' ContactPerson validate[required,custom[date]] form-control col-lg-6' />"
        + "</div>"
        + "</div>"
        + "</div>"
        + "<div class='col-lg-5 col-md-5 col-sm-5'>"
        + "<div class='form-group'>"
        + "<label class='control-label col-lg-5 col-md-5 col-sm-5'>Mobile Number</label>"
        + "<div class='col-lg-7'>"
        + "<input type='text' class='ContactPersonMobile form-control' name='req' maxlength='10' placeholder='Enter Contact Person Mobile Number' id='txtContactPersonMobile' onblur='validateMobileNOAndEmail('txtContactPersonMobile')' onkeypress='return isNumber(event)' />"
        + "<span id='txtContactPersonMobileError' style='margin-top: 6px; display: none; font-size: 15px; color: red; font-family: cursive'>Please Enter Valid Mobile No e.g '1234567890'</span>"
        + "</div>"
        + "</div>"
        + "</div>"
        + "<div class='col-lg-1 col-md-1 col-sm-1'>"
         + "<a  id='btnConatctdelete'><i class='ace-icon fa fa-trash-o red icon-only bigger-130'></i></a>"
         + "</div>"
         + "</div>"
         + "</td>"
         + "</tr>"
        $("#tblContactpersone").append(rows);
    }
    else {

        a++;
        contactPersoneCount = a;
        rows = "<tr class='data-contact-person2'>"
             + "<td tabindex='10' style='display:none;'> " + contactPersoneCount + "</td>"
       + "<td>"
           + "<div class='row' style='margin-top: 10px'>"
         + "<div class='col-lg-6 col-md-6 col-sm-6'>"
        + "<div class='form-group'>"
        + "<label class='control-label col-lg-4 col-md-4 col-sm-4'>"
        + "Contact Persone " + contactPersoneCount + " <label style='color: red;'>*</label></label>"
        + "<div class='col-lg-8 col-md-8 col-sm-8'>"
        + "<input type='text' id='txtContactPerson'  placeholder='Enter Contact Persone Name' name='date' class=' ContactPerson validate[required,custom[date]] form-control col-lg-6' />"
        + "</div>"
        + "</div>"
        + "</div>"
        + "<div class='col-lg-5 col-md-5 col-sm-5'>"
        + "<div class='form-group'>"
        + "<label class='control-label col-lg-5 col-md-5 col-sm-5'>Mobile Number <label style='color: red;'>*</label></label>"
        + "<div class='col-lg-7'>"
        + "<input type='text' class=' ContactPersonMobile form-control' name='req' maxlength='10' placeholder='Enter Contact Person Mobile Number' id='txtContactPersonMobile' onblur='validateMobileNOAndEmail('txtContactPersonMobile')' onkeypress='return isNumber(event)' />"
        + "<span id='txtContactPersonMobileError' style='margin-top: 6px; display: none; font-size: 15px; color: red; font-family: cursive'>Please Enter Valid Mobile No e.g '1234567890'</span>"
        + "</div>"
        + "</div>"
        + "</div>"

         + "<div class='col-lg-1 col-md-1 col-sm-1'>"
        + "<a  id='btnConatctdelete'><i class='ace-icon fa fa-trash-o red icon-only bigger-130'></i></a>"
        + "</div>"
        + "</div>"
        + "</td>"
        + "</tr>"
        $("#tblContactpersone").append(rows);
    }

}
//=========================Start Add Contact persone Name And MObile No===================

//=========================Start Add Contact persone Name And MObile No===================
function AddGSTDeductorContactPersoneRow() {
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
        + "Contact Persone " + GSTDeductorcontactPersoneCount + " <label style='color: red;'>*</label></label>"
        + "<div class='col-lg-8 col-md-8 col-sm-8'>"
        + "<input type='text' id='txtContactPerson'  placeholder='Enter Contact Persone Name' name='date' class='ContactPerson validate[required,custom[date]] form-control col-lg-6' />"
        + "</div>"
        + "</div>"
        + "</div>"
        + "<div class='col-lg-5 col-md-5 col-sm-5'>"
        + "<div class='form-group'>"
        + "<label class='control-label col-lg-5 col-md-5 col-sm-5'>Mobile Number <label style='color: red;'>*</label></label>"
        + "<div class='col-lg-7'>"
        + "<input type='text' class='ContactPersonMobile form-control' name='req' maxlength='10' placeholder='Enter Contact Person Mobile Number' id='txtContactPersonMobile' onblur='validateMobileNOAndEmail('txtContactPersonMobile')' onkeypress='return isNumber(event)' />"
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
        + "<input type='text' id='txtContactPerson' placeholder='Enter Contact Persone Name' name='date' class='ContactPerson validate[required,custom[date]] form-control col-lg-6' />"
        + "</div>"
        + "</div>"
        + "</div>"
        + "<div class='col-lg-5 col-md-5 col-sm-5'>"
        + "<div class='form-group'>"
        + "<label class='control-label col-lg-5 col-md-5 col-sm-5'>Mobile Number</label>"
        + "<div class='col-lg-7'>"
        + "<input type='text' class='ContactPersonMobile form-control' name='req' maxlength='10' placeholder='Enter Contact Person Mobile Number' id='txtContactPersonMobile' onblur='validateMobileNOAndEmail('txtContactPersonMobile')' onkeypress='return isNumber(event)' />"
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
        + "<input type='text' id='txtContactPerson'  placeholder='Enter Contact Persone Name' name='date' class='ContactPerson validate[required,custom[date]] form-control col-lg-6' />"
        + "</div>"
        + "</div>"
        + "</div>"
        + "<div class='col-lg-5 col-md-5 col-sm-5'>"
        + "<div class='form-group'>"
        + "<label class='control-label col-lg-5 col-md-5 col-sm-5'>Mobile Number</label>"
        + "<div class='col-lg-7'>"
        + "<input type='text' class=' ContactPersonMobile form-control' name='req' maxlength='10' placeholder='Enter Contact Person Mobile Number' id='txtContactPersonMobile' onblur='validateMobileNOAndEmail('txtContactPersonMobile')' onkeypress='return isNumber(event)' />"
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
//*********************************End create Dynamic Row ***********************************



//*********************************Start Add OR Remove  Dynamic Row ***********************************
//==========================Start Delete Row Button======================================
$(document).on('click', '#btndelete', function () {
    $(this).closest('tr').remove();    
});
//==========================End Delete Row Button======================================


//=================Start Add New Row Button======================
$(document).on('click', '#AddRow', function () {
    AddRow();
});
//=================End Add New Row Button======================



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

//==========================Start Delete Attachment Button======================================
$(document).on('click', '#btnConatctdelete', function () {
    $(this).closest('tr').remove();
});
//==========================End Delete Attachment Button======================================


//=================Start Add New Attachment Button======================
$(document).on('click', '#NewContactAttach', function () {
    AddContactPersoneRow();
});
//=================End Add New Attachment Button======================


//==========================Start Delete Attachment Button======================================
$(document).on('click', '#btnGSTDeductorConatctdelete', function () {
    $(this).closest('tr').remove();
});
//==========================End Delete Attachment Button======================================


//=================Start Add New Attachment Button======================
$(document).on('click', '#NewGSTDeductorContactAttach', function () {
    AddGSTDeductorContactPersoneRow();
});
//=================End Add New Attachment Button======================
//*********************************End Add OR Remove  Dynamic Row ***********************************




//*********************************Start Get Attachment Values***********************************
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
//*********************************End Get Attachment Values***********************************



//*********************************Start All Validation***********************************
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


//===================Start Mail & Mobile no Valication====================================
var re = "";
function validateMobileNOAndEmail(x) {

    if (document.getElementById(x).value != "") {
        if (x == "txtemail" || x == "txtOfficeemail" || x == "txtGSTPayeremail" || x == "txtGSTDeductorOfficeemail") {
            re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        }
        else if (x == "txtAppmobile" || x == "txtGSTPayerAppmobile")
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
//===================End Mail & Mobile no Valication======================================


//========================Start PAN Card Validation=================================
function upperCaseF(a) {
    setTimeout(function () {
        a.value = a.value.toUpperCase();
    }, 1);
}

function validate_PAN_TAN_GST_Number(x) {
   
    
    var No = document.getElementById(x).value;    
    //var panchar = PanNo[4];

   if (No != "") {
                
        if (x == "txtPAN")
        { re = /[A-Z]{5}[0-9]{4}[A-Z]{1}/; }        
        else if (x == "txtAadharNo" )
        { re = /[0-9]{12,12}$/; }
        else if (x == "txtGST")
        {
            if ($("#ddlGSTType").val() == "TAX_Payer") {
                re = /[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9,A-Z]{1}/;
            } else if ($("#ddlGSTType").val() == "TAX_Deductor") {
                re = /[0-9]{2}[A-Z]{4}[0-9]{5}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9,A-Z]{1}/;
            }
            
        }
        else if (x == "txtTAN")
        { re = /[A-Z]{4}[0-9]{5}[A-Z]{1}/; }
        else if (x == "txtIFSC")
        { re = /[A-Z]{4}[0-9,A-Z]{2}[0-9]{5}/; }
        if (re.test(No)) {
           
            var GSTvalidateonpan = "";
            if (x == "txtGST")
            {
                var panno = document.getElementById("txtPAN").value
                if (panno != "") {
                    var gstno = document.getElementById(x).value
                    for (var j = 2; j < 12; j++) {
                        GSTvalidateonpan += gstno[j];
                    }
                    if (panno == GSTvalidateonpan) {
                        document.getElementById(x + "Error").style.display = "none";
                        $('#btnSave').prop('disabled', false);
                        return true;
                    } else {
                        document.getElementById(x + "Error").style.display = "block";
                        $('#btnSave').prop('disabled', true);
                        return false;
                    }
                }
            }
            else
            {
                document.getElementById(x + "Error").style.display = "none";
                //document.getElementById(x + "Error1").style.display = 'none';
                $('#btnSave').prop('disabled', false);
                return true;
            }                           
            }
            else {
                document.getElementById(x).style.background = '#ffffff';
                document.getElementById(x + "Error").style.display = "block";
                document.getElementById(x + "Error1").style.display = 'none';
                //$("#" + x).focus();
                $('#btnSave').prop('disabled', true);
                return false;
            }
        
    }
    document.getElementById(x).style.background = '#ffffff';
    document.getElementById(x + "Error").style.display = 'none';
    //if (x == "txtPAN") {
    //    document.getElementById(x + "Error1").style.display = 'block';
    //    $("#" + x).focus();
    //}
    $('#btnSave').prop('disabled', false);

}

function DisabledPAN_TANOnKeyup(x)
{
    
    var No = document.getElementById(x).value;
    if (No != "")
    {
        if (x == "txtPAN")
        {
            $('#txtTAN').attr('disabled', true);

        }
        else if (x == "txtTAN") {
            $('#txtPAN').attr('disabled', true);

        }

    }
    else
    {
        $('#txtTAN').attr('disabled', false     );
        $('#txtPAN').attr('disabled', false);
    }
}

//==========================End PAN Card Validation================================

//========================Start Do not Allow Space in TextBox===============================
function nospaces(t) {
    return t.which !== 32;
}
//=================End Do Not Allow Spaces In Textbox===================================
//*********************************End All Validation***********************************


//=====================================Start Gst Textbox KeyupCode=========================================
function BindStateOnGSTFirstTwoNO() {
    var Gstno = $('#txtGST').val();
    var i = Gstno.length;
    var statecode = "";

    if (i > 1) {
        for (var j = 0; j < 2; j++) {
            statecode += Gstno[j];
        }

        $('#ddlGSTDeductorstate').val(statecode);
        $('#ddlGSTDeductorstate').trigger('change');
        $('#ddlGSTDeductorstate').attr('disabled', true);
        $('#ddlGSTPayerstate').val(statecode);
        $('#ddlGSTPayerstate').trigger('change');
        $('#ddlGSTPayerstate').attr('disabled', true);

    }
    else {
        $('#ddlGSTPayerstate option')[0].selected = true;
        $('#ddlGSTPayerstate').attr('disabled', false);
        $('#ddlGSTDeductorstate option')[0].selected = true;
        $('#ddlGSTDeductorstate').attr('disabled', false);
    }

}
//=====================================End Gst Textbox KeyupCode=========================================


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
//========================================End Bind Start DropDown=============================


//===================================Start Bind EmpolyeeID Drop Down=============================
function BindEmployeeID() {
    $.ajax({
        type: "POST",
        url: "ClientRegistration.aspx/BindEmployeeID",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            console.log(r);
            var dept = $("#ddlEmployeeID");
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
        url: "ClientRegistration.aspx/BindEmployeeID",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            console.log(r);
            var dept = $("#ddlEmployeeName");
            dept.empty().append('<option selected="selected" value="0">--Select--</option>');
            $.each(r.d, function (key, value) {
                dept.append($("<option></option>").val(value.EmployeeID).text(value.EmployeeName));
            });
        }
    });
}
//===================================End Bind EmpolyeeID Drop Down=============================


//===================================Start Get Clients Method============================
function GetClientsDetails(EmpID) {
    $('#tblClientList tr').remove();
    var count = 0;
    $.ajax({
        type: "POST",
        url: "ClientRegistration.aspx/GetClientsDetails",
        data: '{EmployeeID:"' + EmpID + '"}',
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
                        + "<td class='customertd'>" + value.ClientID + "</td>"
                        + "<td class='customertd'>" + value.TANNumber + "</td>"
                        + "<td class='customertd'>" + value.GSTNumber + "</td>"
                        + "<td class='customertd'>" + value.ApplicantName + "</td>"
                        + "<td class='customertd'>" + value.ApplicantMobileNo + "</td>"
                        //+ "<td class='customertd'>" + value.FirmLicense + "</td>"
                        //+ "<td class='customertd'><img  class='img-rounded zoom' style='height:30px;width:30px;' src=" + value.FirmLicense + " /></td>"
                        + "<td class='center'><button id='btnView' title='View Details' class='btn btn-primary btn-xs' data-toggle='modal' data-target='#myModal'><i class='ace-icon fa fa-folder-o  bigger-110 icon-only'></i></button>&nbsp;"
                        + "<button id='btnEdit' title='Edit Details' class='btn btn-success btn-xs'><i class='ace-icon fa fa-edit  bigger-110 icon-only'></i></button>&nbsp;"
                        + "<button id='btnExport' title='Export to Excel' class='btn btn-danger btn-xs'><i class='ace-icon fa fa-file-excel-o bigger-110 icon-only'></i></button></td>"
                        + "</tr>";
                    $('#tblClientList').append(rows);
                });
            } else {
                var rows = "<tr><td colspan='8' style='text-align: center;font-family:Calibri;font-size:16px;font-weight:bold;color:Red' >data does not exist..!</td></tr>"
                $('#tblClientList').append(rows);
            }


        }
    });
}
//===================================End Get Clients Method=============================


//=======================Start View Client Details=============================
$(document).on('click', '#btnView', function () {
    var $row = $(this).closest("tr");
    var ClientID = $row.find("td:nth-child(3)").text();
    View(ClientID);
    ViewDoc(ClientID);
});
//=======================End View Client Details=============================


//===========================Start View Data Method==============================
function View(ClientID) {
    $("#tblAccountNos tr").remove();
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
                $("#lblClientID").text(value.ClientId);
                $("#lblTANNo").text(value.ClientId);
                $("#lblGSTNo").text(value.GSTNumber);
                $("#lblRegDate").text(value.RegDate);
                $("#lblApplicantName").text(value.ApplicantName);
                $("#lblFatherName").text(value.ApplicantFatherName);
                $("#lblApplicantAddress").text(value.ApplicantAddress);
                $("#lblPincode").text(value.Pincode);
                $("#lblBirthDate").text(value.BirthDate);
                $("#lblMobileNo").text(value.ApplicantMobileNo);
                $("#lblEmail").text(value.ApplicantEmail);
                $("#lblSalariedSelf").text(value.EmployedType);
                $("#lblState").text(value.StateName);
                $("#lblCitizen").text(value.Citizenship);
                $("#lblAadharNo").text(value.AadharNo);
                $("#lblITDPortalPassword").text(value.ITDPortalPassword);

                //Account Details
                count = count + 1
                console.log(response);

                var rows = "<tr style='text-align:center;color: #337ab7;font-family:Calibri;font-size:15px;'>"
                   + "<td class='customertd'>" + count + "</td>"
                   + "<td class='customertd'>" + value.AccountNo + "</td>"
                   + "<td class='customertd'>" + value.IFSC + "</td>"
                   + "</tr>";
                $('#tblAccountNos').append(rows);

            });

        },
        failure: function () {
        }
    });
}
//==============================End View Data Method==================================


//===========================Start View Documents Method==============================
function ViewDoc(ClientID) {
    $("#tblDocuments tr").remove();
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

                //Documents Details
                count = count + 1
                console.log(response);

                var rows = "<tr style='text-align:center;color: #337ab7;font-family:Calibri;font-size:15px;'>"
                   + "<td class='customertd'>" + count + "</td>"
                   + "<td class='customertd'>" + value.DocumentName + "</td>"
                   + "<td class='customertd'><img id='myImg' class='img-rounded zoom' style='height:30px;width:30px;' src=" + value.DocumentPath + " data-toggle='modal' data-target='#myImgModal' data-id=" + value.DocumentPath + " /></td>"
                   + "</tr>";
                $('#tblDocuments').append(rows);

            });

        },
        failure: function () {
        }
    });
}
//==============================End View Documents Method==================================



$(document).on('ready', function () {
    $('#txtDOB').on('keyup', keyUpHandler);
});


function keyUpHandler(e) {
    var element = this;
    var key = e.keyCode || e.which;
    insertTimingColor(element, key)
}

function insertTimingColor(element, key) {
    var dob=$('#txtDOB').val();
    var inputValue = element.value;
    if (element.value.trim().length == 2 && key !== 10) {
        //if (dob >= 31 && dob < 0) {
            element.value = element.value + '-';
        //}
        //else
        //{
        //    alert("Invalid date");
        //    $('#txtDOB').val("");
        //}
    }
    else if (element.value.trim().length == 5 && key !== 10) {
        element.value = element.value + '-';
    }
}
