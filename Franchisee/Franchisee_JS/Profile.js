var FranchiseeId = "";

$(document).ready(function () {

    $('#btneditPersonal').click(function () {
        //$('[id$=lblusername]').hide()
        $('[id$=lblFirmName]').hide();
        $('[id$=lblOwnerName]').hide();
        $('[id$=lblFirstLine]').hide();
        $('[id$=lblSecondLine]').hide();
        $('[id$=lblLandmark]').hide();
        $('[id$=lblCity]').hide();
        $('[id$=lblPincode]').hide();
        $('[id$=lblmobileNo]').hide();
        $('[id$=lblEmailId]').hide();
        $('[id$=lblfirst]').hide();
        $('[id$=lblSecond]').hide();
        $('[id$=lblLand]').hide();
        $('[id$=lbldist]').hide();
        
        $('#txtFirmName').show();
        $('#txtOwnerName').show();
        $('#txtFirstLine').show();
        $('#txtSecondLine').show();
        $('#txtLandmark').show();
        $('#txtCity').show();
        $('#txtPincode').show();
        $('#txtMobileNo').show();
        $('#txtEmailId').show();        

        $('#txtFirmName').val($('[id$=lblFirmName]').text());
        $('#txtOwnerName').val($('[id$=lblOwnerName]').text());
        $('#txtFirstLine').val($('[id$=lblFirstLine]').text());
        $('#txtSecondLine').val($('[id$=lblSecondLine]').text());
        $('#txtLandmark').val($('[id$=lblLandmark]').text());
        $('#txtCity').val($('[id$=lblCity]').text());
        $('#txtPincode').val($('[id$=lblPincode]').text());
        $('#txtMobileNo').val($('[id$=lblmobileNo]').text());
        $('#txtEmailId').val($('[id$=lblEmailId]').text());             

        $('#btneditPersonal').hide();
        $('#btnsavePersonal').show();
        $('#btnCancel').show();

    });


    $('#btnCancel').click(function () {

        $('[id$=lblFirmName]').show();
        $('[id$=lblOwnerName]').show();
        $('[id$=lblFirstLine]').show();
        $('[id$=lblSecondLine]').show();
        $('[id$=lblLandmark]').show();
        $('[id$=lblCity]').show();
        $('[id$=lblPincode]').show();
        $('[id$=lblmobileNo]').show();
        $('[id$=lblEmailId]').show();
        $('[id$=lblfirst]').show();
        $('[id$=lblSecond]').show();
        $('[id$=lblLand]').show();
        $('[id$=lbldist]').show();

        $('#txtFirmName').hide();
        $('#txtOwnerName').hide();
        $('#txtFirstLine').hide();
        $('#txtSecondLine').hide();
        $('#txtLandmark').hide();
        $('#txtCity').hide();
        $('#txtPincode').hide();
        $('#txtMobileNo').hide();
        $('#txtEmailId').hide();

        $('#txtFirmName').val("");
        $('#txtOwnerName').val("");
        $('#txtFirstLine').val("");
        $('#txtSecondLine').val("");
        $('#txtLandmark').val("");
        $('#txtCity').val("");
        $('#txtPincode').val("");
        $('#txtMobileNo').val("");
        $('#txtEmailId').val("");

        $('#btneditPersonal').show();
        $('#btnsavePersonal').hide();
        $('#btnCancel').hide();

    });




    $('#btnsavePersonal').click(function () {
        $("#loaderFrProf").show();
        $("#loaderFrProf").fadeOut("slow");
       
        FranchiseeId = $('[id$=lblFranchiseeId]').text();

        var FirmName = $('#txtFirmName').val();
        var OwnerName = $('#txtOwnerName').val();

        var Fline = $('#txtFirstLine').val();
        var FirstLine = escape(Fline);
        var SecondLine = $('#txtSecondLine').val();
        var LandMark = $('#txtLandmark').val();
        var City = $('#txtCity').val();
        var Pincode = $('#txtPincode').val();
        var Mobile_No = $('#txtMobileNo').val();
        var Email = $('#txtEmailId').val();
        
        var data, url;

        data = '{FranchiseeId:"' + FranchiseeId +
                '",FirmName:"' + FirmName +
                 '",OwnerName:"' + OwnerName +
                 '",FirstLine:"' + FirstLine +
                 '",SecondLine:"' + SecondLine +
                 '",LandMark:"' + LandMark +
                 '",City:"' + City +
                  '",Pincode:"' + Pincode +
                 '",Mobile_No:"' + Mobile_No +
                '",Email:"' + Email + '"}';

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
                    $("#loaderFrProf").hide();
                }
                else {
                    $("#loaderFrProf").hide();
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
    debugger;
    FranchiseeId = $('[id$=lblFranchiseeId]').text();
    var UserPhotoSource = $('#UserPhotoSource').val();
    var UserPhotoName = $('#UserFileName').val();
    //var ExistingImgSrc = $('[id$=avatar2]').attr('src');
    var ExistingImgSrc = "";
    var Image = $('[id$=avatar2]').attr('src');
    var Pdf = $('[id$=Downloadpdf]').attr('href');

    if (Image != "" && Pdf == undefined)
    {
        ExistingImgSrc = $('[id$=avatar2]').attr('src');
    }
    else if (Image == undefined && Pdf != "")
    {
        ExistingImgSrc = $('[id$=Downloadpdf]').attr('href')
    }

    var data, url;

    data = '{FranchiseeId:"' + FranchiseeId +
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