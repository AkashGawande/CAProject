
var CityId = "";
var ExistingImage = "";
var TempExistingimg = "";

$(document).ready(function () {
    ActiveClass("Employee");


    GetTodaydate();
    BindStateDropdown();
    ShowEmployeeDetl();

    $(".StateName").change(function () {
        var StateCode = $("#ddlState option:selected").val();
        BindCity(StateCode);
    });

    $('#btnCancel').click(function () {
        window.location.replace("EmployeeRegistration.aspx");
    });

    $('#change').click(function () {
        //var image = ExistingImage;
        //ExistingImage = "";
        $('#NewUpload').show();
        $('#changecanceldiv').show();
        $('#Image').hide();
    });


    $('#changeCancel').click(function () {
        ExistingImage = TempExistingimg;
        //var image = ExistingImage;
        $('#NewUpload').hide();
        $('#changecanceldiv').hide();
        $('#Image').show();

        $('#AddressProofPhotoSource').val("");
        $('#AddressProofFileName').val("");
        $('#AddressProof').val("");
    });

    //---------------------- Start btn Save Code -----------------------------------
    $('#btnSave').click(function () {
        if ($('#txtEmpId').val() != "") {
            if ($('#txtTodyDate').val() != "") {
                if ($('#txtempname').val() != "") {
                    if ($('#txtMobileNo').val() != "") {
                        if ($('#txtemail').val() != "") {
                            if ($('#AddressProofPhotoSource').val() != "" && $('#AddressProofFileName').val() != "") {
                                if ($('#ddlDesignation option:selected').index() != 0) {
                                    if ($('#txtLine_No').val() != "") {
                                        if ($('#ddlState option:selected').index() != 0) {
                                        if ($('#ddlCity option:selected').index() != 0) {
                                            if ($('#txtPincode').val() != "") {
                                                SaveEmployee();
                                            }
                                            else {
                                                $('#txtPincode').focus();
                                            }
                                        }
                                        else {
                                            $('#ddlCity').focus();
                                        }
                                        }
                                        else {
                                            $('#ddlState').focus();
                                        }
                                    }
                                    else {
                                        $('#txtLine_No').focus();
                                    }
                                }
                                else {
                                    $('#ddlDesignation').focus();
                                }
                            }
                            else {
                                $('#AddressProof').focus();
                            }
                        }
                        else {
                            $('#txtemail').focus();
                        }
                    }
                    else {
                        $('#txtMobileNo').focus();
                    }
                }
                else {
                    $('#txtempname').focus();
                }
            }
            else {
                $('#txtTodyDate').focus();
            }
        }
        else {
            $('#txtEmpId').focus();
        }
        
    });
    //----------------------End btn Save Code -----------------------------------



    //---------------------- Start btn Update Code -----------------------------------
    $('#btnUpdate').click(function () {
        if ($('#txtEmpId').val() != "") {
            if ($('#txtTodyDate').val() != "") {
                if ($('#txtempname').val() != "") {
                    if ($('#txtMobileNo').val() != "") {
                        if ($('#txtemail').val() != "") {
                            if (($('#AddressProofPhotoSource').val() != "" && $('#AddressProofFileName').val() != "") || ExistingImage!="") {
                                if ($('#ddlDesignation option:selected').index() != 0) {
                                    if ($('#txtLine_No').val() != "") {
                                        if ($('#ddlState option:selected').index() != 0) {
                                            if ($('#ddlCity option:selected').index() != 0) {
                                                if ($('#txtPincode').val() != "") {
                                                    UpdateEmployee();
                                                }
                                                else {
                                                    $('#txtPincode').focus();
                                                }
                                            }
                                            else {
                                                $('#ddlCity').focus();
                                            }
                                        }
                                        else {
                                            $('#ddlState').focus();
                                        }
                                    }
                                    else {
                                        $('#txtLine_No').focus();
                                    }
                                }
                                else {
                                    $('#ddlDesignation').focus();
                                }
                            }
                            else {
                                $('#AddressProof').focus();
                            }
                        }
                        else {
                            $('#txtemail').focus();
                        }
                    }
                    else {
                        $('#txtMobileNo').focus();
                    }
                }
                else {
                    $('#txtempname').focus();
                }
            }
            else {
                $('#txtTodyDate').focus();
            }
        }
        else {
            $('#txtEmpId').focus();
        }

    });
    //----------------------End btn Update Code -----------------------------------



    //=======================Start Get Image On Modal Box=============================   
    $('#ChequePhotoNotice').click(function () {
        var ImagePath = $('#ChequePhotoNotice').attr('src');
        var img = ".." + ImagePath;
        $("#ModalImage").attr("src", img);

        $("#btnDownload").attr('href', img);
        $("#btnDownload").attr('download', img);
    });
    //=======================End Get Image On Modal Box=============================

});



//----------------------------Start Get Today Date-----------------------------------
function GetTodaydate() {
    today = new Date();
    var TodayDate = $.datepicker.formatDate('dd-mm-yy', today);    
    $('#txtTodyDate').val(TodayDate);
}
//-------------------------End Get Today Date-----------------------------

//---------------------Bind State DropDown----------------------------------
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
//--------------------End Bind State Dropdown----------------------------------

//-------------------Start Bind City On State Change Event-------------------------------
function BindCity(SID)
{    
        var getcountId;
    data = '{StateCode:"' + SID + '"}';

        $.ajax({
            type: "POST",
            url: "EmployeeRegistration.aspx/BindCityDrpDown",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {
                console.log(r);
                var City = $(".CityName");
                City.empty().append('<option selected="selected" value="0">--Select--</option>');
                $.each(r.d, function (key, value) {
                    City.append($("<option></option>").val(this['CityId']).text(this['CityName']));
                });
                getcountId = $("#ddlCity option").length;
                CityBindForEdit(getcountId);
            }
        });

    
}

//----------------------End Bind City On State Change Event-------------------------------

//--------------------Start Save Employee Details-----------------------------------------
function SaveEmployee() {
    $("#loaderHdEmp").show();
    //$("#loaderHdEmp").fadeOut("slow");
   
    var EmpId = $('#txtEmpId').val();
    var JoiningDate = $('#txtTodyDate').val();
    var EmpName = $('#txtempname').val();
    var DOB = $('#txtDOB').val();
    var MobileNo = $('#txtMobileNo').val();
    var EmailId = $('#txtemail').val();
    var photoSource = $('#AddressProofPhotoSource').val();
    var PhotoName = $('#AddressProofFileName').val();
    var Designation = $('#ddlDesignation option:selected').val();
    var Line_No = $('#txtLine_No').val();
    var Address = escape(Line_No);
    var CityId = $('#ddlCity option:selected').val();
    var Pincode = $('#txtPincode').val();
    var Status = "InActive";

    var data = "";
    var url = "";
    url = "EmployeeRegistration.aspx/SaveEmployeeData";

    data = '{EmpId:"' + EmpId +
        '",JoiningDate:"' + JoiningDate +
        '",EmpName:"'+EmpName+
        '",DOB:"' + DOB +
        '",MobileNo:"' + MobileNo +
        '",EmailId:"' + EmailId +
        '",PhotoSource:"' + photoSource +
        '",PhotoName:"' + PhotoName +
        '",Designation:"'+Designation+
        '",Address:"' + Address +
        '",CityId:"' + CityId +
        '",PinCode:"' + Pincode +
        '",Status:"'+Status+'"}';
   
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: data,
        success: function (response) {
            if(response.d!="Record Not Added")
            {                
                var EmpId1 = response.d;
                $("#loaderHdEmp").hide();
                alert("Employee Added Successfully!");
                window.location.replace("EmployeeRegistration.aspx");
            }
            else
            {
                $("#loaderHdEmp").hide();
                alert("Failed....! Try Again.");
            }
        }

    });
}
//--------------------End Save Employee Details-----------------------------------------


//--------------------Start Save Employee Details-----------------------------------------
function UpdateEmployee() {
    $("#loaderHdEmp").show();
    //$("#loaderHdEmp").fadeOut("slow");
   
    var EmpId = $('#txtEmpId').val();
    var JoiningDate = $('#txtTodyDate').val();
    var EmpName = $('#txtempname').val();
    var DOB = $('#txtDOB').val();
    var MobileNo = $('#txtMobileNo').val();
    var EmailId = $('#txtemail').val();
    var photoSource = $('#AddressProofPhotoSource').val();
    var PhotoName = $('#AddressProofFileName').val();
    var Designation = $('#ddlDesignation option:selected').val();
    var Line_No = $('#txtLine_No').val();
    var Address = escape(Line_No);
    var CityId = $('#ddlCity option:selected').val();
    var Pincode = $('#txtPincode').val();
   // var Status = "InActive";

    var data = "";
    var url = "";
    url = "EmployeeRegistration.aspx/UpdateEmployeeData";

    data = '{EmpId:"' + EmpId +
        '",JoiningDate:"' + JoiningDate +
        '",EmpName:"' + EmpName +
        '",DOB:"' + DOB +
        '",MobileNo:"' + MobileNo +
        '",EmailId:"' + EmailId +
        '",PhotoSource:"' + photoSource +
        '",PhotoName:"' + PhotoName +
         '",ExistingImage:"' + ExistingImage +
        '",Designation:"' + Designation +
        '",Address:"' + Address +
        '",CityId:"' + CityId +
        '",PinCode:"' + Pincode +'"}';

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: data,
        success: function (response) {
            if (response.d != "Record Not Added") {
                var EmpId1 = response.d;
                alert("Updated SuccessFully...!");
                window.location.replace("EmployeeRegistration.aspx");
                ShowEmployeeDetl();
                $("#loaderHdEmp").hide();
            }
            else {
                $("#loaderHdEmp").hide();
                alert("Failed....! Try Again.");
            }
        }

    });
}
//--------------------End Save Employee Details-----------------------------------------

//------------------------Start Show Employee Details In Table-----------------------------
function ShowEmployeeDetl() {
    
    $("#tblEmpData tr").remove();
    //$("tr:even").css("background-color", " #eeffee");
    
    var count = 0;
    $.ajax({
        type: "post",
        url: "EmployeeRegistration.aspx/ShowEmployeeData",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $.each(response.d, function (index, value) {
                
                count = count + 1
                console.log(response);
                var rows = "";
                if (value.Status == "Active" || value.Status == "InActive") {
                    rows += "<tr class='odd gradeX' >";
                     rows += "<td class='customertd'>" + count + "</td>";
                     rows += "<td class='customertd' style='Display:none;'>" + value.Emp_Id + "</td>";
                     rows += "<td class='customertd'>" + value.Emp_Name + "</td>";
                     rows += "<td class='customertd'>" + value.Joining_Date + "</td>";
                     rows += "<td class='customertd'>" + value.Address + "</td>";
                     rows += "<td class='customertd'>" + value.Mobile_No + "</td>";                     
                     if (getExtension(value.AddressProof) == "pdf") {
                         rows += "<td class='customertd'><a id='Downloadpdf' onClick='openTab(this)' name='" + value.AddressProof + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a></td>";
                     } else {
                         rows += "<td class='customertd'><img id='myImg' src='" + value.AddressProof + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' data-id='" + value.AddressProof + "' /></td>";
                     }
                     rows += "<td class='customertd' style='Display:none;'>" + value.DOB + "</td>";
                     rows += "<td class='customertd' style='Display:none;'>" + value.Email_Id + "</td>";
                     rows += "<td class='customertd' style='Display:none;'>" + value.Designation + "</td>";
                     rows += "<td class='customertd' style='Display:none;'>" + value.CityId + "</td>";
                     rows += "<td class='customertd' style='Display:none;'>" + value.StateId + "</td>";
                     rows += "<td class='customertd' style='Display:none;'>" + value.Pincode + "</td>";

                     rows += "<td class='customertd'>";
                     rows += '<a class="btn btn-flat btn-info btn-xs" title = "Edit" style="" id="btnedit" href="#EditCustomer" data-toggle="tab"><i class="fa fa-pencil-square-o"></i></a>';
                     rows += '&nbsp;<a class="btn btn-danger btn-xs  btn-grad" style="" title = "Remove" id="btnDelete" href="#tab2primary" data-toggle="tab"><i class="fa fa-trash-o"></i></a>';
                    if (value.Status == 'Active') {
                        rows += '&nbsp;<a class="btn btn-flat btn-success btn-xs" style="" title = "Active" id="btnActive" data-toggle="tab"><i class="fa fa-check"></i></a>';
                    }
                    else {
                        rows += '&nbsp;<a class="btn btn-flat btn-warning btn-xs" style="" title = "InActive" id="btnInActive" data-toggle="tab"><i class="fa fa-close"></i></a>';
                    }
                    rows += "</td>";
                    rows += "</tr>";
                    $('#tblEmpData').append(rows);
                }
            });

        },
        failure: function () {
        }

    });
}
//------------------------End Show Employee Details In Table-----------------------------

//---------------------------------Start Active Status--------------------------------------
$(document).on('click', '#btnInActive', function () {
    $("#loaderHdEmp").show();
    //$("#loaderHdEmp").fadeOut("slow");
    
    var $row = $(this).closest("tr");
    var Emp_Id = $row.find("td:nth-child(2)").text();
    var data = '{Emp_Id:"' + Emp_Id + '"}';

    $.ajax({
        type: "post",
        url: "EmployeeRegistration.aspx/ActiveStatus",
        data: data,
        contentType: "application/json",
        dataType: "json",

        success: function (response) {
            alert(response.d);
            //$("#tblBranchdetail td").remove();
            ShowEmployeeDetl();
            $("#loaderHdEmp").hide();

        },
        failure: function () {
            $("#loaderHdEmp").hide();
        }
    });
});
//----------------------------------End Active Status---------------------------------------

//-----------------------------Start InActive Status-------------------------------------
$(document).on('click', '#btnActive', function () {
    $("#loaderHdEmp").show();
    //$("#loaderHdEmp").fadeOut("slow");

    var $row = $(this).closest("tr");
    var Emp_Id = $row.find("td:nth-child(2)").text();
    var data = '{Emp_Id:"' + Emp_Id + '"}';

    $.ajax({
        type: "post",
        url: "EmployeeRegistration.aspx/INActiveStatus",
        data: data,
        contentType: "application/json",
        dataType: "json",

        success: function (response) {
            alert(response.d);
            //$("#tblBranchdetail td").remove();
            ShowEmployeeDetl();
            $("#loaderHdEmp").hide();
        },
        failure: function () {
            $("#loaderHdEmp").hide();
        }
    });
});
//------------------------------End InActive Status-----------------------------------------

//-----------------------Start Delete User ---------------------------------------------
$(document).on('click', '#btnDelete', function () {
    var result = confirm("Want to Remove..?");
    if (result) {
        $("#loaderHdEmp").show();
        //$("#loaderHdEmp").fadeOut("slow");

        var $row = $(this).closest("tr");
        var Emp_Id = $row.find("td:nth-child(2)").text();
        var data = '{Emp_Id:"' + Emp_Id + '"}';

        $.ajax({
            type: "post",
            url: "EmployeeRegistration.aspx/DeleteData",
            data: data,
            contentType: "application/json",
            dataType: "json",

            success: function (response) {
                console.log(response);
                var msg;
                if (response.d != "Record Not Removed..?") {
                    msg = "Removed Successfully...!";
                }
                if (msg == "Removed Successfully...!") {
                    alert(msg);
                    ShowEmployeeDetl();
                    $("#loaderHdEmp").hide();
                }
                else {
                    $("#loaderHdEmp").hide();
                    alert("Error While Removing..?Try Again!");
                }
            },
            failure: function () {
            }
        });
    }

});
//-------------------------End Delete User --------------------------------------------


//------------------------Start Edit Data For Update---------------------------------------------
$(document).on('click', '#btnedit', function () {
    var result = confirm("Want to Update..?");
    if (result) {
        $('#myTab a[href="#ADD"]').tab('show');
        var $row = $(this).closest("tr");

        var Emp_Id = $row.find("td:nth-child(2)").text();;
        var Emp_Name = $row.find("td:nth-child(3)").text();
        var Joining_Date = $row.find("td:nth-child(4)").text();
        var Address = $row.find("td:nth-child(5)").text();
        var Mobile_No = $row.find("td:nth-child(6)").text();
       
        var DOB = $row.find("td:nth-child(8)").text();
        var Email_Id = $row.find("td:nth-child(9)").text();
        var Designation = $row.find("td:nth-child(10)").text();       
         CityId = $row.find("td:nth-child(11)").text();
        var StateId = $row.find("td:nth-child(12)").text();
        var Pincode = $row.find("td:nth-child(13)").text();

        var Imgsrc = "";
        var pdfName = "";
        var AddressProff = "";
        if ($row.find("#myImg").attr('src')) {
            Imgsrc = $row.find("#myImg").attr('src');
        }
        if ($row.find("#Downloadpdf").attr('name')) {
            pdfName = $row.find("#Downloadpdf").attr('name');
        }

        if (Imgsrc != "") {
            AddressProff = Imgsrc;
            ExistingImage = Imgsrc;
            TempExistingimg = Imgsrc;
            //ExistingImage = Imgsrc.split("/")[2];
            $('#ChequePhotoNotice').show();
            $('#DownloadChequeNotice').hide();
            $('#ChequePhotoNotice').attr('src', AddressProff);
        }
        else if (pdfName != "") {
            AddressProff = pdfName;
           // ExistingImage = Imgsrc.split("/")[2];
            ExistingImage = pdfName;
            TempExistingimg = pdfName;
            $('#DownloadChequeNotice').show();
            $('#ChequePhotoNotice').hide();
            $('#DownloadChequeNotice').attr('name', AddressProff);
        }



        $('#txtEmpId').val(Emp_Id);
        $('#txtTodyDate').val(Joining_Date);
        $("#txtempname").val(Emp_Name);
        $("#txtDOB").val(DOB);
        $('#txtLine_No').val(Address);
        $("#txtMobileNo").val(Mobile_No);
        $("#txtemail").val(Email_Id);
        $("#txtPincode").val(Pincode);
        

        var j = $('#ddlDesignation option').length;
        var value1 = "";
        for (var i = 0; i < j; i++) {
            value1 = $('#ddlDesignation option')[i].value;
            if (value1 == Designation) {
                $('#ddlDesignation option')[i].selected = true;
                $('#ddlDesignation').trigger('change');
                break;

            }
        }

        var k = $('#ddlState option').length;
        var value2 = "";
        for (var i = 0; i < k; i++) {
            value2 = $('#ddlState option')[i].value;
            if (value2 == StateId) {
                $('#ddlState option')[i].selected = true;
                $('#ddlState').trigger('change');
                break;

            }
        }
        
        $('#btnSave').hide();
        $('#btnUpdate').show();
        $('#NewUpload').hide();
        $('#Image').show();

    }

});
//------------------------End Edit Data For Update---------------------------------------------

//-------------------------------start Bind city For Update-------------------------------
function CityBindForEdit(CityCount) {

    var j = CityCount;
    if (CityId != "") {

        var value1 = "";
        for (var i = 0; i < j; i++) {
            value1 = $('#ddlCity option')[i].value;
            if (value1 == CityId) {
                //               
                $('#ddlCity option')[i].selected = true;
                $('#ddlCity').trigger('change');
                break;

            }
        }
    }
}
//-------------------------------End Bind city For Update-------------------------------



//=======================Start Get Image On Modal Box=============================
$(document).on('click', '#myImg', function () {
    var ImagePath = $(this).data('id');
    var img = ".." + ImagePath;
    $("#ModalImage").attr("src", img);

    $("#btnDownload").attr('href', img);
    $("#btnDownload").attr('download', img);
});

//=======================End Get Image On Modal Box=============================


//-----------------------Start Validation----------------------------
var re = "";
function upperCaseF(a) {
    setTimeout(function () {
        a.value = a.value.toUpperCase();
    }, 1);
}

function nospaces(t) {
    return t.which !== 32;
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {

        return false;
    }
    return true;
}

function validate_PAN_Mobile_Email(x) {

    var No = document.getElementById(x).value;
    if (No != "") {

        if (x == "txtEmpId")
        { re = /[A-Z]{4}[A-Z,0-9]{1}[0-9]{4}[A-Z]{1}/; }
        else if (x == "txtemail")
        { re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; }
        else if (x == "txtMobileNo")
        { re = /[0-9]{10,10}$/; }
        if (re.test(No)) {
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
    $('#btnSave').prop('disabled', false);

}

//----------------- Start txtDOB KeyHandler----------------------------
$(document).on('ready', function () {
    $('#txtDOB').on('keyup', keyUpHandler);
});

function keyUpHandler(e) {
    var element = this;
    var key = e.keyCode || e.which;
    insertTimingColor(element, key)
}

function insertTimingColor(element, key) {
    var dob = $('#txtDOB').val();
    var inputValue = element.value;
    if (element.value.trim().length == 2 && key !== 10) {
        
        element.value = element.value + '-';
      
    }
    else if (element.value.trim().length == 5 && key !== 10) {
        element.value = element.value + '-';
    }
}
//-----------------End txtDOB KeyHandler----------------------------
//--------------End Validation-----------------------------------

//-------------------Start File Attachment-------------------------------------- 
function Attachments(input, Id) {
    if (input.files && input.files[0]) {

        var filerdr = new FileReader();
        filerdr.onload = function (e) {
            fileExtension = (input.value.substring((input.value.lastIndexOf("\\")) + 1)).replace(/^.*\./, '');
            if (fileExtension == "jpg" || fileExtension == "jpeg" || fileExtension == "png" || fileExtension == "pdf") {

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
//-------------------End File Attachment-------------------------------------- 

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