var old_password = "";
var New_Password = "";
var Confirm_New_Password = "";

$(document).ready(function () {
    
    $('#btnChange').prop('disabled', true)


    //======================Start Change Password=============================
    $('#btnChange').click(function () {

        var data = "";
        var url = "";
        url = "ChangePassword.aspx/GetSessionStatus";

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: data,
            success: function (response) {

                if (response.d != "") {
                    changePassword();
                }
                else {
                    window.location.replace("../SessionExpired.aspx");
                }
            }
        });
        
    });
    //======================End Change Password=============================


    //======================Start Cancel Button============================
    $('#btnCancel').click(function () {
        window.location.replace("Profile.aspx");
    });
    //======================End Cancel Button============================

});

//=========================Start Change Password===========================================
function changePassword()
    {
    var result = confirm("Do you want to changed the password..?");
    if (result) {
        $("#loaderChangePass").show();
        var data;
        var url;
        data = '{old_password:"' + old_password +
                 '",New_Password:"' + New_Password + '"}';

        url = "ChangePassword.aspx/ChangePassword";
        // alert(Meeting_Time);
        $.ajax({
            type: "post",
            url: url,
            data: data,
            contentType: "application/json",
            dataType: "json",
            success: function (response) {
                console.log(response);
                var msg;
                if (response.d != "Password Not Changed ..?") {
                    msg = "Password Changed..!";
                }
                if (msg == "Password Changed..!") {
                    $("#loaderChangePass").hide();
                    alert(msg);
                    ClearText();
                    window.location.replace("Profile.aspx");
                }
                else {
                    $("#loaderChangePass").hide();
                    ClearText();
                    alert("Old Password incorrect!");
                }
            },
            failure: function () {
                alert(response);
            }
        });
    }
}
//=========================End Change Password===========================================




//======================Start Clear textboxe=============================
function ClearText()
{
     $('#password').val('');
    $('#password2').val('');
   $('#confirm_password2').val('');
}
//======================End Clear textboxe=============================


//======================Start Check Confirm Password=============================
function CheckPassword()
{
    old_password = $('#password').val();
    New_Password = $('#password2').val();
    Confirm_New_Password = $('#confirm_password2').val();
    if(New_Password!=Confirm_New_Password)
    {
        $('#ErrorMessage').show();
        $('#btnChange').prop('disabled',true)
        //alert("New Password Does Not Match");
    }
    else
    {
        $('#ErrorMessage').hide();
        $('#btnChange').prop('disabled', false)
    }
}
//======================End Check Confirm Password=============================


//======================Start Check Confirm Password=============================
function CheckPasswordONKeyup() {
    old_password = $('#password').val();
    New_Password = $('#password2').val();
    Confirm_New_Password = $('#confirm_password2').val();
    var len = New_Password.length;
    var len1 = Confirm_New_Password.length;


    if (len<=len1-1) {
        //$('#ErrorMessage').show();
        //$('#btnChange').prop('disabled', true)
        CheckPassword();
    }
    else {

    }
}
//======================End Check Confirm Password=============================


