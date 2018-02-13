var old_password = "";
var New_Password = "";
var Confirm_New_Password = "";
$(document).ready(function () {
    
    $('#btnChange').prop('disabled', true)


    //======================Start Change Password=============================
    $('#btnChange').click(function () {
        var result = confirm("Do you want to changed the password..?");
        if (result) {
            $("#loaderFranchiseeProf").show();
            $("#loaderFranchiseeProf").fadeOut("slow");           
           
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
                        $("#loaderFranchiseeProf").hide();
                        alert(msg);
                        ClearText();
                        window.location.replace("ChangePassword.aspx");
                    }
                    else {
                        $("#loaderFranchiseeProf").hide();
                        ClearText();
                        alert("Old Password incorrect!");
                    }
                },
                failure: function () {
                    alert(response);
                }
            });
        }
    });
    //======================End Change Password=============================


    //======================Start Cancel Button============================
    $('#btnCancel').click(function () {
        window.location.replace("Dashboard.aspx");
    });
    //======================End Cancel Button============================

});


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
