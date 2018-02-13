$(document).ready(function () {
    ActiveClass("Employee");


    GetEmployeeDetails();
    GetTodaydate();
    GetEmpID();
    

    //=======================Start Generate System Generated Password=============================
    $('#btnGenerate').click(function () {
        var data1 = '{StaffID:"' + $('#txtUserID').val() + '"}';
        var url1 = "EmployeeList.aspx/GeneratePassword";
        $.ajax({
            type: "post",
            url: url1,
            data: data1,
            contentType: "application/json",
            dataType: "json",
            success: function (response) {
                console.log(response);
                if (response.d != "") {
                    $('#txtPassword').val(response.d);
                } else {
                    $('#txtPassword').val("");
                }
            },
            failure: function () {
            }
        });
    });
    //=======================End Generate System Generated Password=============================


    //=======================Start Submit Button Code=============================
    $('#btnSubmit').click(function () {
        $("#loaderFrEmp").show();
        $("#loaderFrEmp").fadeOut("slow");
       
        var StaffID = $('#txtUserID').val();
        var Password = $('#txtPassword').val();

        var data = '{StaffID:"' + StaffID +
                    '",Password:"' + Password + '"}';

        var url = "EmployeeList.aspx/UpdateEmployeePassowrd";
        if (Password != "") {
            $.ajax({
                type: "post",
                url: url,
                data: data,
                contentType: "application/json",
                dataType: "json",
                success: function (response) {
                    console.log(response);
                    if (response.d != "Not Updated..!") {
                        alert("Password Set Successfully")
                        //$('#myModal').dialog('close');
                        $('#myModal').modal('toggle');
                        GetEmployeeDetails();
                        $("#loaderFrEmp").hide();
                    } else {
                        $("#loaderFrEmp").hide();
                        alert("Failed....!Try Again?")
                    }
                },
                failure: function () {
                }
            });
        }
        else
        {
            alert("Please Enter Password");
        }
    });
    //=======================End Submit Button Code=============================

    $('#btnCancel').click(function () {
        ClearAllTextbox();
        //window.location.replace("EmployeeList.aspx");
    });


    //---------------------- Start btn Save Code -----------------------------------
    $('#btnSave').click(function () {
        if ($('#txtEmpId').val() != "") {
            if ($('#txtTodyDate').val() != "") {
                if ($('#txtempname').val() != "") {
                    if ($('#txtMobileNo').val() != "") {
                        if ($('#txtemail').val() != "") {
                            
                            SaveEmployee();
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

});

//--------------------Start Save Employee Details-----------------------------------------
function SaveEmployee() {
    $("#loaderFrEmp").show();
    $("#loaderFrEmp").fadeOut("slow");
    
    var EmpId = $('#txtEmpId').val();
    var JoiningDate = $('#txtTodyDate').val();
    var EmpName = $('#txtempname').val();   
    var MobileNo = $('#txtMobileNo').val();
    var EmailId = $('#txtemail').val();
    var Status = "InActive";

    var data = "";
    var url = "";
    url = "EmployeeList.aspx/SaveEmployeeData";

    data = '{EmpId:"' + EmpId +
        '",JoiningDate:"' + JoiningDate +
        '",EmpName:"' + EmpName +
        '",MobileNo:"' + MobileNo +
        '",EmailId:"' + EmailId +
        '",Status:"' + Status + '"}';

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: data,
        success: function (response) {
            if (response.d != "Record Not Added") {
                var EmpId1 = response.d;
                ClearAllTextbox();
                //window.location.replace("EmployeeRegistration.aspx");
                $("#loaderFrEmp").hide();
            }
            else {
                $("#loaderFrEmp").hide();
                alert("Failed....! Try Again.");
            }
        }

    });
}
//--------------------End Save Employee Details-----------------------------------------

//-----------------Start clear all textbox--------------------------------------
function ClearAllTextbox()
{
    
     $('#txtTodyDate').val("");
     $('#txtempname').val("");
     $('#txtMobileNo').val("");
     $('#txtemail').val("");
     GetTodaydate();
     GetEmployeeDetails();
     GetEmpID();
}

//------------------End clear all Textbox--------------------------------

//===================================Start Get Employee Method============================
function GetEmployeeDetails() {
    $('#tblEmployeeList tr').remove();
    var count = 0;
    $.ajax({
        type: "POST",
        url: "EmployeeList.aspx/GetEmployeeDetails",
        data: '{StaffID:"' + 0 + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            console.log(r);
            if (r.d != "") {
                $.each(r.d, function (key, value) {
                    count = count + 1;
                    var rows = "<tr class='odd gradeX' style='font-size:14px;'>"
                        + "<td class='customertd'>" + count + "</td>"
                        + "<td class='customertd'>" + value.StaffID + "</td>"
                        + "<td class='customertd'>" + value.MemberName + "</td>"
                        + "<td class='customertd'>" + value.JoiningDate + "</td>"
                        + "<td class='customertd'>" + value.StaffID + "</td>"
                        + "<td class='customertd'>" + value.StaffPassword + "</td>"
                        + "<td class='center'><button id='btnGeneratePassword' title='Generate Password' class='btn btn-primary btn-xs' data-toggle='modal' data-target='#myModal'><i class='ace-icon fa fa-key bigger-110 icon-only'></i></button>&nbsp;"
                        //+ "<button id='btnReply' title='Reply to Franchisee' class='btn btn-success btn-xs'  data-toggle='modal' data-target='#myModalReply'><i class='ace-icon fa fa-reply  bigger-110 icon-only'></i></button>&nbsp;"
                       // + "<button id='btnExport' title='Export to Excel' class='btn btn-danger btn-xs'><i class='ace-icon fa fa-file-excel-o bigger-110 icon-only'></i></button>"
                        + "</td></tr>";
                    $('#tblEmployeeList').append(rows);
                });
            } else {
                var rows = "<tr><td colspan='7' style='text-align: center;font-family:Calibri;font-size:16px;font-weight:bold;color:Red' >data does not exist..!</td></tr>"
                $('#tblEmployeeList').append(rows);
            }


        }
    });
}
//===================================End Get Employee Method=============================

//=======================Start View Employee Details on Modal=============================
$(document).on('click', '#btnGeneratePassword', function () {
    $('#txtPassword').val("");
    var $row = $(this).closest("tr");
    var StaffID = $row.find("td:nth-child(2)").text();
    var MemberName = $row.find("td:nth-child(3)").text();
    $('#lblMemberName').text(MemberName);
    $('#txtUserID').val(StaffID);
});
//=======================End View Employee Details on Modal=============================






//----------------------------Start Get EmpId For Franchisee-----------------------------
function GetEmpID()
{
    var data1 = "";
    var url1 = "EmployeeList.aspx/GtEmpId";
    $.ajax({
        type: "post",
        url: url1,
        data: data1,
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            console.log(response);
            if (response.d != "") {
                $('#txtEmpId').val(response.d);
            }
        },
        failure: function () {
        }
    });
}

//--------------------------End Get EmpId For Franchisee------------------------------


//----------------------------Start Get Today Date-----------------------------------
function GetTodaydate() {
    today = new Date();
    var TodayDate = $.datepicker.formatDate('dd-mm-yy', today);
    $('#txtTodyDate').val(TodayDate);
}
//-------------------------End Get Today Date-----------------------------


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
