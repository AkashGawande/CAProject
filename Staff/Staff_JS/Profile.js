var StaffID = "";

$(document).ready(function () {

    $('#btneditPersonal').click(function () {

        $('[id$=lblusername]').hide()
       

        
        $('[id$=lblAddress]').hide();
        $('[id$=lbldob]').hide();
        $('[id$=lblmobileNo]').hide();
        $('[id$=lblGender]').hide();
        $('[id$=lblEmailId]').hide();

        $('#txtUserName').show();
        $('#txtAddress').show();
        $('#txtdob').show();
        $('#txtMobileNo').show();
        $('#ddlGender').show();
        $('#txtEmailId').show();

        $('#txtUserName').val($('[id$=lblusername]').text());
        $('#txtAddress').val($('[id$=lblAddress]').text());
        $('#txtdob').val($('[id$=lbldob]').text());
        $('#txtMobileNo').val($('[id$=lblmobileNo]').text());
        $('#txtEmailId').val($('[id$=lblEmailId]').text());
        if ($('[id$=lblGender]').text() != "")
        {
            $('#ddlGender').val($('[id$=lblGender]').text());
        }
        else
        {
            $('#ddlGender option')[0].selected = true;
        }
       

        $('#btneditPersonal').hide();
        $('#btnsavePersonal').show();
        $('#btnCancel').show();

    });


    $('#btnCancel').click(function () {

        $('[id$=lblusername]').show();
        $('[id$=lblAddress]').show();
        $('[id$=lbldob]').show();
        $('[id$=lblmobileNo]').show();
        $('[id$=lblGender]').show();
        $('[id$=lblEmailId]').show();

        $('#txtUserName').hide();
        $('#txtAddress').hide();
        $('#txtdob').hide();
        $('#txtMobileNo').hide();
        $('#ddlGender').hide();
        $('#txtEmailId').hide();

        $('#txtUserName').val("");
        $('#txtAddress').val("");
        $('#txtdob').val("");
        $('#txtMobileNo').val("");
        $('#txtEmailId').val("");

        $('#ddlGender option')[0].selected = true;

        $('#btneditPersonal').show();
        $('#btnsavePersonal').hide();
        $('#btnCancel').hide();

    });

    $('#btnsavePersonal').click(function () {
        $("#loaderStaffProf").show();
        //$("#loaderStaffProf").fadeOut("slow");
        
        StaffID = $('[id$=lblempId]').text();
        var Name = $('#txtUserName').val();
        var Line = $('#txtAddress').val();
        var Address = escape(Line);
        var DOB = $('#txtdob').val();
        var Mobile_No = $('#txtMobileNo').val();
        var EmailId = $('#txtEmailId').val();

        var Gender=$('#ddlGender option:selected').val();

        var data, url;

        data = '{StaffID:"' + StaffID +
                '",Name:"' + Name +
                 '",Address:"' + Address +
                 '",DOB:"' + DOB +
                 '",Mobile_No:"' + Mobile_No +
                  '",EmailId:"' + EmailId +
                '",Gender:"' + Gender + '"}';

        url = "Profile.aspx/UpdateProfile";

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: data,
            success: function (response) {
                if (response.d != "Record Not Added ..?") {
                    StaffID = response.d;                    
                    window.location.reload("Profile.aspx");
                    $("#loaderStaffProf").hide();
                }
                else {
                    $("#loaderStaffProf").hide();
                    alert('Failed....! Try Again.');
                }
            }
        });



    });




});

function Attachments(input, Id) {   
    if (input.files && input.files[0]) {

        var filerdr = new FileReader();
        filerdr.onload = function (e) {
            var fileExtension = (input.value.substring((input.value.lastIndexOf("\\")) + 1)).replace(/^.*\./, '');
            if (fileExtension == "jpg" || fileExtension == "jpeg" || fileExtension == "pdf" || fileExtension == "png") {

                document.getElementById('UserPhotoSource').value = e.target.result; //Generated DataURL
                document.getElementById('UserFileName').value = input.value.substring((input.value.lastIndexOf("\\")) + 1)
                //alert(document.getElementById('UserFileName').value);
            }
            else {
                $("#" + Id).val("");
                alert("Only Pdf/jpg/jpeg/png Format allowed");
            }
        }
        filerdr.readAsDataURL(input.files[0]);
        
    }

}


$(document).on('click', '#btnChange', function () {
    StaffID = $('[id$=lblempId]').text();
    var UserPhotoSource = $('#UserPhotoSource').val();
    var UserPhotoName = $('#UserFileName').val();
    var ExistingImgSrc = $('[id$=avatar2]').attr('src');

    var data, url;

    data = '{StaffID:"' + StaffID +
            '",UserPhotoSource:"' + UserPhotoSource +
             '",UserPhotoName:"' + UserPhotoName +
            '",ExistingImgSrc:"' + ExistingImgSrc + '"}';

    url = "Profile.aspx/ChangeUserPhoto";

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: data,
        success: function (response) {            
            if (response.d != "Record Not Added ..?") {
                StaffID = response.d;
                //alert("Upload Successfully");
                window.location.reload("Profile.aspx");

            }
            else {
                alert('Failed....! Try Again.');
            }
        }
    });




});