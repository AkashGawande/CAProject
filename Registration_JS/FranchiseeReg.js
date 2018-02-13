var count = 0;
var prefix = "";
var FName = "";
var middleName = "";
var lName = "";

var Franchisee_Id = "";
var OwnerName = "";
var FirmName = "";
var FirmLicenseSource = "";
var FirmLicenseName = "";
var PANCard = "";
var FatherName = "";
var FirstLine = "";
var SecondLine = ""
var LandMark = "";
var City = "";
var DistrictId = "";

var Pincode = "";
var MobileNo = "";
var EmailId = "";
var Qualification = "";
var Currentprofession = "";
var Status = "";

var MemberData = [];
var Staff_Member_Name = "";


$(document).ready(function ()
{
    AddNewMember();
    BindStateDropdown();
    //$("#txtFirstName").focus();


    //==========================Start Add New Row Button======================================
    $('#AddRow').click(function () {
        AddNewMember();
    });
    //==========================End Add New Row Button======================================

    $("#ddlPrefix").change(function () {
        validatePAN_Number('txtPANNo');
    });


    //==========================Start Cancel Button======================================
    $('#btnCancel').click(function () {
        window.location.reload();
        window.location.href = "Login.aspx";
        
    });
    //==========================End Cancel Button========================================



    //===========================Start bind District On State On Change ==================================
    $(".StateName").change(function () {
        var State_Code = $(".StateName option:selected").val();
       // var getcountId;
        data = '{State_Code:"' + State_Code + '"}';

        $.ajax({
            type: "POST",
            url: "FranchiseeRegistration.aspx/BindDistrictDrpDown",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {
                console.log(r);
                var dept = $(".CityName");
                dept.empty().append('<option selected="selected" value="0">--Select--</option>');
                $.each(r.d, function (key, value) {
                    dept.append($("<option></option>").val(this['DistrictId']).text(this['DistrictName']));
                });
               // getcountId = $(".CityName option").length;
                //getcount1(getcountId);
            }
        });

    });
    //===========================End bind District On State On Change ====================================


    //==========================Start Cancel Button======================================
    $('#btnSubmit').click(function () {
        SavaFranchiseeRegData();
    });
    //==========================End Cancel Button======================================

});

//==========================Start Delete Row Button======================================

$(document).on('click', '#btndelete', function () {
    $(this).closest('tr').remove();
    
});
//==========================End Delete Row Button======================================


//======================Start Save Franchisee Registration Data==============================
function SavaFranchiseeRegData()
{
    
    prefix = $('#ddlPrefix option:selected').val();
    FName = $('#txtFirstName').val().toUpperCase();
    middleName = $('#txtMiddelName').val().toUpperCase();
    lName = $('#txtLastName').val().toUpperCase();

    OwnerName = prefix + " " + FName + " " + middleName + " " + lName;
    FirmName = $('#txtfirmName').val();
    FirmLicenseName = $('#LicensePhotoFileName').val();
    FirmLicenseSource = $('#LicensePhotoSource').val();
    PANCard = $('#txtPANNo').val();
    FatherName = $('#txtFatherName').val();
    var fline = $('#txtfirstline').val();
    FirstLine = escape(fline);
    var sline = $('#txtsecondline').val();
    SecondLine = escape(sline);
    var landmark = $('#txtLandmark').val();
    LandMark = escape(landmark)
    City = $('#txtcity').val();
    DistrictId = $('.CityName option:selected').val();
    Pincode = $('#txtpincode').val();
    MobileNo = $('#txtmobileNo').val();
    EmailId = $('#txtEmailid').val();
    Qualification = $('#txtqualification').val();
    Currentprofession = $('#txtcurrentprofession').val();
    Status = "InActive";


    var data;
    var url;

    data = '{OwnerName:"' + OwnerName +
           '",FirmName:"' + FirmName +
           '",FirmLicenseName:"' + FirmLicenseName +
           '",FirmLicenseSource:"' + FirmLicenseSource +
            '",PANCard:"' + PANCard +
           '",FatherName:"' + FatherName +
           '",FirstLine:"' + FirstLine +
           '",SecondLine:"' + SecondLine +
           '",LandMark:"' + LandMark +
           '",City:"' + City +
           '",DistrictId:"' + DistrictId +
           '",Pincode:"' + Pincode +
           '",MobileNo:"' + MobileNo +
           '",EmailId:"' + EmailId +
           '",Qualification:"' + Qualification +
           '",Currentprofession:"' + Currentprofession +
           '" ,Status:"' + Status + '"}';

    url = "FranchiseeRegistration.aspx/SaveFranchiseeData";


    if(FName!=""){        
        if (middleName != "") {
            if (lName != "") {
                if (FirmName != "") {
                    if (FirmLicenseName != ""&&FirmLicenseSource!="") {
                        document.getElementById("fileuploadError").style.display = 'none';
                        if (PANCard != "" ) {
                            if (FatherName != "") {
                                if (FirstLine != "") {
                                    if (LandMark != "") {
                                        if (City != "") {
                                            if ($("#ddlState option:selected").index() != 0) {
                                                if ($("#ddlDistrict option:selected").index() != 0) {
                                                    if (Pincode != "") {
                                                        if (MobileNo != "") {
                                                            if (EmailId != "") {
                                                                if (Qualification != "") {

                                                                    $.ajax({
                                                                        url: url,
                                                                        type: 'POST',
                                                                        dataType: 'json',
                                                                        contentType: 'application/json; charset=utf-8',
                                                                        data: data,
                                                                        success: function (response) {
                                                                            if (response.d != "Record Not Added ..?") {
                                                                                Franchisee_Id = response.d;

                                                                                var data = "";
                                                                                var url = "";
                                                                                AllMemberData = JSON.stringify(SaveStaffMemberData());
                                                                                $.ajax({
                                                                                    url: 'FranchiseeRegistration.aspx/SaveStaffMemberData',
                                                                                    type: 'POST',
                                                                                    dataType: 'json',
                                                                                    contentType: 'application/json; charset=utf-8',
                                                                                    data: JSON.stringify({ 'AllMemberData': AllMemberData }),
                                                                                    success: function (response) {
                                                                                        if (response.d != "Record Not Added ..?") {
                                                                                            $('#EnquiryForm').hide();
                                                                                            $('#MessageForm').show();
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
                                                                else {
                                                                    x = "txtqualification";
                                                                    gotoError(x, "");
                                                                }
                                                            }
                                                            else {
                                                                x = "txtEmailid";
                                                                gotoError(x, 1);
                                                            }
                                                        }
                                                        else {
                                                            x = "txtmobileNo";
                                                            gotoError(x, 1);
                                                        }
                                                    }
                                                    else {
                                                        x = "txtpincode";
                                                        gotoError(x, "");
                                                    }
                                                }
                                                else {
                                                    x = "ddlDistrict";
                                                    gotoError(x, "");
                                                }

                                            }
                                            else {
                                                x = "ddlState";
                                                gotoError(x, "");
                                            }
                                           
                                        }
                                        else {
                                            x = "txtcity";
                                            gotoError(x, "");
                                        }
                                    }
                                    else {
                                        x = "txtLandmark";
                                        gotoError(x, "");
                                    }
                                }
                                else {
                                    x = "txtfirstline";
                                    gotoError(x, "");
                                }
                            }
                            else {
                                x = "txtFatherName";
                                gotoError(x,"");                                
                            }
                        }
                        else {
                            x = "txtPANNo";
                            gotoError(x,2);                           
                        }
                    }
                    else {
                        x = "fileupload";
                        gotoError(x,"");                        
                    }
                }
                else {
                    x = "txtfirmName";
                    gotoError(x,"");                    
                }
            }
            else {
                x = "txtLastName";
                gotoError(x,"");                
            }
        }        
        else {
            x = "txtMiddelName";
            gotoError(x,"");            
        }
    }
    else
    {
        x = "txtFirstName";
        gotoError(x,"");        
        }
}


function gotoError(x,i)
{
    document.getElementById(x).style.background = '#ffffff';
    document.getElementById(x + "Error"+i).style.display = 'block';
    //$('#btnSubmit').prop('disabled', true);
    $("#" + x).focus();
}
//======================End Save Franchisee Registration Data==============================

//-------------------------------Start Save Member Details Method--------------------------
function SaveStaffMemberData() {

    MemberData = [];
    $('tr.data-contact-person1').each(function () {

        if ($(this).find(".MemberName").val() != "") {
            Staff_Member_Name = $(this).find(".MemberName").val();
        }
        Status = 'InActive';
        var alldata = {
            'Franchisee_Id': Franchisee_Id,
            'Staff_Member_Name': Staff_Member_Name,
            'Status': Status
        }

        MemberData.push(alldata);
    });
    console.log(MemberData);
    return MemberData;
}
//-------------------------------End Save Member Details Method--------------------------


var fileExtension = "";
//=================Start Get Firm Attachment Details========================================
function Attachments(input) {
    if (input.files && input.files[0]) {
       
        var filerdr = new FileReader();
        filerdr.onload = function (e) {

            fileExtension = (input.value.substring((input.value.lastIndexOf("\\")) + 1)).replace(/^.*\./, '');
            if (fileExtension == "jpg" || fileExtension == "jpeg" || fileExtension == "pdf" || fileExtension == "png") {
                document.getElementById('LicensePhotoSource').value = e.target.result; //Generated DataURL
                document.getElementById('LicensePhotoFileName').value = input.value.substring((input.value.lastIndexOf("\\")) + 1)
                $('#btnSubmit').prop('disabled', false);
                document.getElementById("fileuploadError").style.display = 'none';
            }
            else {
                $('#fileupload').val("");
                alert("Only Pdf/jpg/jpeg/png Format allowed");
            }
        }
        filerdr.readAsDataURL(input.files[0]);
    }

}
//========================End Get Firm Attachment Details================================


//==========================Start Add New Row======================================
function AddNewMember()
{
    var a = $('#tblnewrow tr:last td:nth-child(1)').text();
    if (a=="") {
        count++;
        var rows = "";
        rows = "<tr class='data-contact-person1' style='text-align:center; background-color: white; color: #337ab7; font-size: 15px;'>"
        + "<td style='border:0px solid #ddd'>" + count + "</td>"
        + "<td style='border:0px solid #ddd'>"
        + "<div class='form-group'>"
        + "<div class='col-sm-12'>"
        + "<input type='text' id='txtMemberName' placeholder='Enter Member Name' class='MemberName col-xs-10 col-sm-5' />"         
        + "</div>"
        + "</div>"
        + "</td>"
        + "</tr>"
        $("#tblnewrow").append(rows);
    }
    else if (count == a)
    {
        count++;
        var rows = "";
        rows = "<tr class='data-contact-person1' style='text-align:center; background-color: white; color: #337ab7; font-size: 15px;'>"
        + "<td style='border:0px solid #ddd'>" + count + "</td>"
        + "<td style='border:0px solid #ddd'>"
        + "<div class='form-group'>"
        + "<div class='col-sm-12'>"
        + "<input type='text' id='txtMemberName' placeholder='Enter Member Name' class='MemberName col-xs-10 col-sm-5' />"
         + "<a  id='btndelete'><i class='ace-icon fa fa-trash-o red icon-only bigger-130'></i></a>"
        + "</div>"
        + "</div>"       
        + "</td>"        
        + "</tr>"
        $("#tblnewrow").append(rows);
    }
    else
    {

        a++;
        count = a;
        var rows = "";
        rows = "<tr class='data-contact-person1' style='text-align: center; background-color: white; color: #337ab7; font-size: 15px;'>"
        + "<td style='border:0px solid #ddd'>" + count + "</td>"
        + "<td style='border:0px solid #ddd'>"
        + "<div class='form-group'>"
        + "<div class='col-sm-12'>"
        + "<input type='text' id='txtMemberName' placeholder='Enter Member Name' class=' MemberName col-xs-10 col-sm-5' />"
        + "<a id='btndelete'><i class='ace-icon fa fa-trash-o red icon-only bigger-130'></i></a>"
        + "</div>"
        + "</div>"        
        + "</td>"       
        + "</tr>"
        $("#tblnewrow").append(rows);
    }    
}
//==========================End Add New Row======================================


//===============================Start Bind Start DropDown============================
function BindStateDropdown() {
  
    $.ajax({
        type: "POST",
        url: "FranchiseeRegistration.aspx/BindStateDropDown",
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

//=========================================Start Copy First Name On 1st membet Position==========================
function CopyName(x) {
    
    var val = document.getElementById(x).value;    
    if (val != "")
    {
        document.getElementById(x).style.background = '#ffffff';
        document.getElementById(x + "Error").style.display = 'none';
        $('#btnSubmit').prop('disabled', false);
        
        prefix = $('#ddlPrefix option:selected').val();
        if (x == "txtFirstName") {
            FName = document.getElementById(x).value;
            //document.getElementById("txtMemberName").value = prefix + " " + FName + " " + middleName + " " + lName;
            document.getElementById("txtMemberName").value = FName + " " + middleName + " " + lName;
        }
        else if (x == "txtMiddelName") {
            middleName = document.getElementById(x).value;
            //document.getElementById("txtMemberName").value = prefix + " " + FName + " " + middleName + " " + lName;
            document.getElementById("txtMemberName").value = FName + " " + middleName + " " + lName;
        }
        else if (x == "txtLastName") {
            lName = document.getElementById(x).value;
            //document.getElementById("txtMemberName").value = prefix + " " + FName + " " + middleName + " " + lName;
            document.getElementById("txtMemberName").value = FName + " " + middleName + " " + lName;
        }
        else {
            document.getElementById("txtName").value = "";
        }
    }
else
{
        document.getElementById(x).style.background = '#ffffff';
        document.getElementById(x + "Error").style.display = 'block';
        //$('#btnSubmit').prop('disabled', true);
        if (x == "txtFirstName" || x == "txtMiddelName" || x == "txtLastName")
        {
            //$("#" + x).focus();
        }       
    }


}
//=========================================End Copy First Name On 1st membet Position==========================


//================Start Allow Only Enter Numbers Mobile No Textbox=======================
function isNumber(evt) {
    //return evt.which !== 32;
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        
        return false;
    }
    return true;
}
//================End Allow Only Enter Numbers Mobile No Textbox=======================


//========================Start Do not Allow Space in TextBox===============================
function nospaces(t)
{
        return t.which !== 32;
}
//=================End Do Not Allow Spaces In Textbox===================================

//===================Start Mail & Mobile no Valication====================================
var re = "";
function validateName(x) {

    if (document.getElementById(x).value != "") {
        if (x == "txtEmailid") {
            re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        }
        else if (x == "txtmobileNo")
        { re = /[0-9]{10,10}$/; }

        if (re.test(document.getElementById(x).value)) {
            document.getElementById(x + "Error").style.display = "none";
            document.getElementById(x + "Error1").style.display = 'none';
            $('#btnSubmit').prop('disabled', false);
            return true;
        }
        else {
            document.getElementById(x).style.background = '#ffffff';
            document.getElementById(x + "Error").style.display = "block";
            document.getElementById(x + "Error1").style.display = 'none';
            $("#" + x).focus();
            $('#btnSubmit').prop('disabled', true);            
            return false;
        }
    }

    document.getElementById(x).style.background = '#ffffff';
    document.getElementById(x + "Error").style.display = 'none';
    document.getElementById(x + "Error1").style.display = 'block';
    //$("#" + x).focus();
    $('#btnSubmit').prop('disabled', false);
}
//===================End Mail & Mobile no Valication======================================


//========================Start PAN Card Validation=================================
function upperCaseF(a) {
    setTimeout(function () {
        a.value = a.value.toUpperCase();
    }, 1);
}

function validatePAN_Number(x) {
    
    var char = lName[0].toUpperCase();
    var PanNo = document.getElementById(x).value;   
    var panchar = PanNo[4];
     prefix = $('#ddlPrefix option:selected').val();
   
    if (PanNo != "") {
        document.getElementById(x + "Error2").style.display = 'none';
        if (lName != "") {

            if (x == "txtPANNo")
            { re = /[A-Z]{5}[0-9]{4}[A-Z]{1}/; }
            if (re.test(PanNo)) {
                if (prefix != "Mrs")
                {
                if (char == panchar) {
                    document.getElementById(x + "Error").style.display = "none";
                    document.getElementById(x + "Error1").style.display = 'none';
                    $('#btnSubmit').prop('disabled', false);
                    return true;
                }
                else {
                    document.getElementById(x).style.background = '#ffffff';
                    document.getElementById(x + "Error").style.display = "block";
                    document.getElementById(x + "Error1").style.display = 'none';
                    $("#" + x).focus();
                    $('#btnSubmit').prop('disabled', true);
                    return false;
                }
                }
                else
                {
                    document.getElementById(x + "Error").style.display = "none";
                    document.getElementById(x + "Error1").style.display = 'none';
                    $('#btnSubmit').prop('disabled', false);
                    return true;
                }
            }
            else {
                document.getElementById(x).style.background = '#ffffff';
                document.getElementById(x + "Error").style.display = "block";
                document.getElementById(x + "Error1").style.display = 'none';
                $("#" + x).focus();
                $('#btnSubmit').prop('disabled', true);
                return false;
            }
        }

        else {
            document.getElementById(x).style.background = '#ffffff';
            document.getElementById(x + "Error1").style.display = 'block';
            document.getElementById(x + "Error").style.display = 'none';
            $('#btnSubmit').prop('disabled', true);
            $('#txtFirstName').focus();
            document.getElementById(x).value = "";
        }
        }
        document.getElementById(x).style.background = '#ffffff';
        document.getElementById(x + "Error").style.display = 'none';
        document.getElementById(x + "Error2").style.display = 'block';
       // $("#" + x).focus();
        $('#btnSubmit').prop('disabled', false);
    
}
//==========================End PAN Card Validation================================

