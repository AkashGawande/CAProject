/// <reference path="ClientList.js" />



var ITStaffId = "";

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

$(document).ready(function () {
    ActiveClass("IT");

    GetITFiles(SDate, EDate, SearchText, "Assigned");


    //===================================Start Credit and Cheque Validations=============================
    $('#ddlITPaymentMode').change(function () {
        if ($('#ddlITPaymentMode').val() == "Credit") {
            $('#divDueDate').show();
            $('#divCheque').hide();
        } else if ($('#ddlITPaymentMode').val() == "Cheque") {
            $('#divDueDate').hide();
            $('#divCheque').show();
        } else {
            $('#divDueDate').hide();
            $('#divCheque').hide();
        }
    });
    //===================================End Credit and Cheque Validations=============================

    //===================================Start Get IFSC on DDL Account change=============================
    $('#ddlAccountNo').change(function () {
        if ($('#ddlAccountNo').val() != "0") {
            var data = '{AccountId:"' + $('#ddlAccountNo').val() + '"}';
            $.ajax({
                type: "post",
                url: "IncomeTaxFiles.aspx/GetITIFSC",
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
    $(document).on('click', '#myImg', function () {
        var ImagePath = $(this).data('id');
        var img = "../.." + ImagePath;
        $("#ModalImage").attr("src", img);

        $("#btnDownload").attr('href', img);
        $("#btnDownload").attr('download', img);
    });

    //=======================End Get Image On Modal Box=============================

    //=======================Start Get Image On Modal Box=============================   
    $('#ChequePhoto').click(function () {
        var ImagePath = $('#ChequePhoto').attr('src');
        $("#ModalImage").attr("src", ImagePath);

        $("#btnDownload").attr('href', ImagePath);
        $("#btnDownload").attr('download', ImagePath);
    });
    //=======================End Get Image On Modal Box=============================

    //=======================Start Send Message to Franchisee=============================
    $(document).on('click', '#btnITReply1', function () {
        debugger;
        $('#tblITAttachment tr').remove();
        var $row = $(this).closest("tr");
        var FileTransactionID = $row.find("td:nth-child(3)").text();
        var ClientID = $row.find("td:nth-child(4)").text();
        var ApplicantName = $row.find("td:nth-child(5)").text();
        ITStaffId = $row.find("td:nth-child(8)").text();

        $('#lblITFileTransactionID1').text(FileTransactionID);
        $('#lblITFranchiseeID1').text($row.find("td:nth-child(7)").text());
        $('#lblITClientID1').text(ClientID);
        $('#lblITApplicantName1').text(ApplicantName);        
        AddAttachmentRowIT();
    });
    //=======================End Send Message to Franchisee=============================

    //=======================Start Send Message to Franchisee=============================
    $('#btnITSend').click(function () {
        if ($('#txtITSubject1').val() != "") {
            if ($('#txtITMessage1').val() != "") {
                SendITMessage();
            } else {
                $('#txtITMessage1').focus()
            }
        } else {
            $('#txtITSubject1').focus()
        }
    });
    //=======================End Send Message to Franchisee=============================

    //=================Start Add New Attachment Button======================
    $(document).on('click', '#NewAttach', function () {
        AddAttachmentRowIT();
    });
    //=================End Add New Attachment Button======================
    //==========================Start Delete Attachment Button======================================
    $(document).on('click', '#btndeleteattach', function () {
        $(this).closest('tr').remove();
    });
    //==========================End Delete Attachment Button======================================

    //==========================Start Update Method======================================
    $('#btnUpdateIT').click(function () {
        if ($('#txtITApplicantName').val() != "") {
            if ($('#txtITApplicantFatherName').val() != "") {
                if ($('#txtITApplicantAddress').val() != "") {
                    if ($('#txtITPinCode').val() != "") {
                        if ($('#txtITBirthDate').val() != "") {
                            if ($('#txtITApplicantMobileNo').val() != "") {
                                if ($('#txtITApplicantEmailID').val() != "") {
                                        if ($('#txtITCitizenship').val() != "") {
                                            if ($('#ddlITEmployedType').val() != "0") {
                                                if ($('#txtITAadharNumber').val() != "") {
                                                    if ($('#ddlAccountNo').val() != "0") {
                                                        if ($('#ddlITYearType').val() != "0") {
                                                            if ($('#ddlITYear').val() != "0") {
                                                                if ($('#ddlITPaymentMode').val() != "0") {
                                                                    if ($('#txtITAmount').val() != "") {
                                                                        UpdateIT();
                                                                    } else {
                                                                        $('#txtITAmount').focus();
                                                                    }
                                                                } else {
                                                                    $('#ddlITPaymentMode').focus();
                                                                }
                                                            } else {
                                                                $('#ddlITYear').focus();
                                                            }
                                                        } else {
                                                            $('#ddlITYearType').focus();
                                                        }
                                                    } else {
                                                        $('#ddlAccountNo').focus();
                                                    }
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
    //==========================End Update Method======================================

    //==========================Start Assigned Files Tab======================================
    $('#liAssigned').click(function () {        
        GetITFiles("", "","", "Assigned");
    });
    //==========================End Assigned Files Tab======================================

    //==========================Start Verified Files Tab======================================
    $('#liVerified').click(function () {
        GetITFiles("", "", "", "Verified,0");
    });
    //==========================End Verified Files Tab======================================


    //==========================Start Assigned Files Search Button======================================
    $('#btnSearchAssigned').click(function () {
        SDate = $('#StartDateAssigned').val();
        EDate = $('#EndDateAssigned').val();
        SearchText = $('#txtSearchTextAssigned').val();
        GetITFiles(SDate, EDate, SearchText, "Assigned");
    });
    //==========================End Assigned Files Search Button======================================

    //==========================Start Assigned Files Search Button======================================
    $('#btnSearchVerified').click(function () {
        SDate = $('#StartDateVerified').val();
        EDate = $('#EndDateVerified').val();
        SearchText = $('#txtSearchTextVerified').val();
        var Status = $('#ddlFileStatus').val();
        GetITFiles(SDate, EDate, SearchText, "Verified,"+Status);
    });
    //==========================End Assigned Files Search Button======================================
});

//===============================Start Bind Start DropDown============================
function BindStateDropdown() {
    $.ajax({
        type: "POST",
        url: "../../Staff/ClientRegistration.aspx/BindStateDropDown",
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



//=================================Start Update IT Client  Method Code==========================================
function UpdateIT() {
    
    var FileTransactionID = $('#txtITFileTransactionID').val();
    var ClientID = $('#txtITClientID').val();  
    var AccountID = $('#ddlAccountNo option:selected').val();   
    var YearType = $('#ddlITYearType option:selected').val();
    var Year = $('#ddlITYear option:selected').val();

    var PaymentMode = $('#ddlITPaymentMode option:selected').val();
    var Amount = $('#txtITAmount').val();
    var DueDate = $('#txtITDueDate').val();
    var ChequeNo = $('#txtITChequeNo').val();
    var Narration = $('#txtITNarration').val();
    
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
           '" ,Status:"' + Status + '"}';

    url = "IncomeTaxFiles.aspx/UpdateITClientMasterData";
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
            }
            else {
                alert('Failed....! Try Again.');
            }
        }
    });
}
//=================================End Update IT Client  Method Code==========================================



//===================================Start Get IT Files Method============================
function GetITFiles(SDate, EDate, SearchText, FStatus) {
    $('#tblIT').show();
    $('#tblITFiling tr').remove();
    debugger;

    var Data = '{StartDate:"' + SDate +
        '",EndDate:"' + EDate +
        '",SearchText:"' + SearchText +
        '",FileStatus:"' + FStatus +
        '"}';

    var count = 0;
    $.ajax({
        type: "POST",
        url: "IncomeTaxFiles.aspx/GetITFiles",
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
                        rows += "<button id='btnITReply1' title='Reply to Franchisee' class='btn btn-success btn-xs'  data-toggle='modal' data-target='#myModalReply'><i class='ace-icon fa fa-reply  bigger-110 icon-only'></i></button>&nbsp;";
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
                    $('#tblITFiling').append(rows);
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
                $('#tblITFiling').append(rows1);                     
            }
        }
    });
}
//===================================End Get Clients Method=============================

//==========================Start Verify Button======================================
$(document).on('click', '#btnVerify', function () {
    var $row = $(this).closest("tr");
    var FileTransactionID = $row.find("td:nth-child(3)").text();
    var ApplicantName = $row.find("td:nth-child(5)").text();
    var result = confirm("Do you want to Verify " + ApplicantName + " file");
    if(result){
        UpdateToVerify(FileTransactionID);
        //alert("Hi");
    }
    
});
//==========================End Verify Button======================================

//===========================Start Verify Method====================================
function UpdateToVerify(FileId)
{
    var data;
    var url;
    data = '{FileTransactionID:"' + FileId +'"}';
    url = "IncomeTaxFiles.aspx/UpdateToVerify";
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
                GetITFiles("", "", "", "Verified,0");

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
    url = "IncomeTaxFiles.aspx/UpdateToCompleted";
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
                GetITFiles("", "", "", "Verified,0");

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
    $("#tblAccountNos tr").remove();
    var count = 0;
    var data = '{FileTransactionID:"' + FileTransactionID + '"}';

    $.ajax({
        type: "post",
        url: "IncomeTaxFiles.aspx/ViewModelBox",
        data: data,
        contentType: "application/json",
        dataType: "json",

        success: function (response) {

            var AccountNo = $(".ddlAccountNo");
            AccountNo.empty().append('<option selected="selected" value="0">--Select--</option>');

            $.each(response.d, function (index, value) {

                //IT File Details
                $("#txtITFileTransactionID").val(value.FileTransactionID);
                $("#txtITClientID").val(value.ClientID);
                $("#txtITPANNumber").val(value.PANNumber);
                $("#lblITDate").text(value.Date);
                $("#txtITApplicantName").val(value.ApplicantName);
                $("#txtITApplicantFatherName").val(value.ApplicantFatherName);
                $("#txtITApplicantAddress").val(value.ApplicantAddress);
                $("#txtITPinCode").val(value.Pincode);
                $("#txtITBirthDate").val(value.BirthDate);
                $("#txtITApplicantMobileNo").val(value.ApplicantMobileNo);
                $("#txtITApplicantEmailID").val(value.ApplicantEmail);


                //===Select State=====
                var State = value.StateCode;
                var j = $('#ddlITState option').length;
                var val1 = "";
                for (var i = 0; i < j; i++) {
                    val1 = $('#ddlITState option')[i].value;
                    if (val1 == State) {
                        $('#ddlITState option')[i].selected = true;
                        $('#ddlITState').trigger('change');
                        break;
                    }
                }

                $("#txtITCitizenship").val(value.Citizenship);
                $("#ddlITEmployedType").val(value.EmployedType);

                $("#txtITAadharNumber").val(value.AadharNo);
                $("#txtITDPortalPassword").val(value.ITDPortalPassword);

                BindYear(value.YearType);
                $("#ddlITYearType").val(value.YearType);
                $("#ddlITYear").val(value.Year);

                $("#txtITAmount").val(value.Amount);


                //===Select Payment Mode=====
                var Payment = value.PaymentMode;
                var j2 = $('#ddlITPaymentMode option').length;
                var val2 = "";
                for (var i = 0; i < j2; i++) {
                    val2 = $('#ddlITPaymentMode option')[i].value;
                    if (val2 == Payment) {
                        $('#ddlITPaymentMode option')[i].selected = true;
                        $('#ddlITPaymentMode').trigger('change');
                        break;
                    }
                }

                //====Get Cheque and Credit Details=======
                if (value.PaymentMode == "Cheque") {
                    $("#txtITChequeNo").val(value.ChequeNo);
                    $("#txtITNarration").val(value.Narration);

                    if (getExtension(value.ChequeFileName) == "pdf") {
                        $("#ChequePhoto").hide();
                        $("#DownloadCheque").show();
                        $("#DownloadCheque").attr('name', value.ChequeFileName);
                    } else {
                        $("#DownloadCheque").hide();
                        $("#ChequePhoto").show();
                        $("#ChequePhoto").attr("src", value.ChequeFileName);
                    }
                } else if (value.PaymentMode == "Credit") {
                    $("#txtITDueDate").val(value.DueDate);
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
    $("#tblFooter tr").remove();
    var count = 0;
    var data = '{FileTransactionID:"' + FileTransactionID + '"}';

    $.ajax({
        type: "post",
        url: "IncomeTaxFiles.aspx/ViewDocumentsModelBox",
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
                        rows += "<td class='customertd'><a id='Downloadpdf' onClick='openTab(this)' name='" + value.DocumentPath + "' href='#'><img src='../../Logo/pdf-icon.png' height='50' width='50' /></a></td>";
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
                        rows2 += "<a id='Downloadpdf' onClick='openTab(this)' name='" + value.DocumentPath + "' href='#'><img src='../../Logo/pdf-icon.png' height='50' width='50' /></a>";
                    } else {
                        rows2 += "<img id='myImg' src='" + value.DocumentPath + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' data-id='" + value.DocumentPath + "' />";
                    }
                    $('#tblDocuments tr:last td:nth-child(' + count + ')').append(rows2);
                }

            });
            var footer_rows = "<tr><td colspan='" + count + "' style='text-align:left;'><a class='btn btn-sm btn-info' id='btnIncomeTaxAllDownLoad' href='#' ><i class='ace-icon fa fa-download fa-2x bigger-110 icon-only'></i> Download All</a></td></tr>";
            $('#tblFooter').append(footer_rows);


        },
        failure: function () {
        }
    });
}
//==============================End View Documents Method==================================

//=======================Start Download All Documents=============================
$(document).on('click', '#btnIncomeTaxAllDownLoad', function () {
    var $row = $(this).closest("tr");
    $($row.find("#btnDownload").remove());
    var FID = $('#txtITFileTransactionID').val();
    var ClientName = $('#txtITApplicantName').val();

    var data = '{FileTransactionID:"' + FID +
        '",ClientName:"' + ClientName + '",TableName:"itdocuments"}';

    $.ajax({
        type: "post",
        url: "IncomeTaxFiles.aspx/DownloadAllItDocument",
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




//=================================Save Button Method Code For Send Message==========================================
function SendITMessage() {   
    FileTransactionID = $('#lblITFileTransactionID1').text();
    var FranchiseeID = $('#lblITFranchiseeID1').text();
    ClientId = $('#lblITClientID1').text();
    var Subject = $('#txtITSubject1').val();
    var Message = $('#txtITMessage1').val();

    var data;
    var url;
    data = '{FileTransactionID:"' + FileTransactionID +
            '",FranchiseeID:"' + FranchiseeID +
            '",ITStaffId:"' + ITStaffId +
            '",ClientId:"' + ClientId +
           '",Subject:"' + Subject +
           '",Message:"' + Message + '"}';
    url = "IncomeTaxFiles.aspx/SaveMasterData";
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
                    url: 'IncomeTaxFiles.aspx/SaveDetails',
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({ 'AllAttachment': AllAttachment }),
                    success: function (response) {
                        if (response.d != "Record Not Added ..?") {
                            alert("Message Send Successfully");
                            //window.location.reload();
                            $('#txtITSubject1').val("");
                            $('#txtITMessage1').val("");
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

var count = 0;
//=================Start Add New Attachment Function======================
function AddAttachmentRowIT() {    
    var rows = "";
    var a = $('#tblITAttachment tr:last td:nth-child(1)').text();
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

        $("#tblITAttachment").append(rows);
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
        $("#tblITAttachment").append(rows);
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
        $("#tblITAttachment").append(rows);
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
//============================ Bind Year Dropdown=====================================
function BindYear(yeartype) {    
    $('#ddlITYear option').remove();
    var selectBox = document.getElementById('ddlITYear');
    var date = new Date()
    var year = date.getFullYear();
    var month = date.getMonth() + 1;

    
        for (var i = year+1; i >= year - 10; i--) {
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
