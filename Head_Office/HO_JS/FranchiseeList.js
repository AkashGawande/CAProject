$(document).ready(function () {
    ActiveClass("Franchisee");



    GetNewRegistration();
    GetApprovedFranchisee();

    //=======================Start New Registration Franchisee=============================     
    function GetNewRegistration() {
        $("#loaderHdFrachisee").show();
        $('#tblNewRegistration td').remove();
        var count = 0;
        $.ajax({
            type: "POST",
            url: "FranchiseeList.aspx/GetNewRegistration",
            data: '{FranchiseeID:"' + 0 + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {
                console.log(r);
                if (r.d != "") {
                    $.each(r.d, function (key, value) {
                        count = count + 1;
                        var rows = "<tr class='odd gradeX'>"
                            + "<td class='customertd'>" + count + "</td>"
                            + "<td class='customertd'>" + value.EnquiryDate + "</td>"
                            + "<td class='customertd'>" + value.FranchiseeID + "</td>"
                            + "<td class='customertd'>" + value.OwnerName + "</td>"
                            + "<td class='customertd'>" + value.FirmName + "</td>"
                            + "<td class='customertd'>" + value.City + "</td>"
                            + "<td class='customertd'>" + value.DistrictName + "</td>"
                            //+ "<td class='customertd'>" + value.FirmLicense + "</td>"
                            //+ "<td class='customertd'><img id='myImg' class='img-rounded zoom' style='height:30px;width:30px;' src=" + value.FirmLicense + " data-toggle='modal' data-target='#myImgModal' data-id=" + value.FirmLicense + " /></td>"

                        if (value.FirmLicense == "") {

                        } else {

                        }

                        if (getExtension(value.FirmLicense) == "pdf") {
                            rows += "<td class='customertd'><a id='Downloadpdf' onClick='openTab(this)' name='" + value.FirmLicense + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a></td>";
                        } else {
                            rows += "<td class='customertd'><img id='myImg' src='" + value.FirmLicense + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' data-id='" + value.FirmLicense + "' /></td>";
                        }

                        rows += "<td class='center'><button id='btnView' title='View Details' class='btn btn-primary btn-xs' data-toggle='modal' data-target='#myModal'><i class='ace-icon fa fa-folder-o  bigger-110 icon-only'></i></button>&nbsp;";
                        rows += "<button id='btnReject' title='Reject' class='btn btn-danger btn-xs'><i class='ace-icon fa fa-remove  bigger-110 icon-only'></i></button>&nbsp;";
                        rows += "<button id='btnApprove' title='Approve' class='btn btn-success btn-xs'><i class='ace-icon fa fa-check bigger-110 icon-only'></i></button></td>";
                        rows += "</tr>";
                        $('#tblNewRegistration').append(rows);
                    });
                    $("#loaderHdFrachisee").hide();
                } else {
                    var rows = "<tr><td colspan='9' style='text-align: center;font-family:Calibri;font-size:16px;font-weight:bold;color:Red' >data does not exist..!</td></tr>"
                    $('#tblNewRegistration').append(rows);
                    $("#loaderHdFrachisee").hide();
                }
            }
        });
    }
    //=======================End New Registration Franchisee=============================

    //=======================Start Approve Franchisee=============================
    $(document).on('click', '#btnApprove', function () {
        var result = confirm("Do you want to approved this franchisee..?");
        if (result) {
            $("#loaderHdFrachisee").show();
            //$("#loaderHdFrachisee").fadeOut("slow");            

            var $row = $(this).closest("tr");
            var FranchiseeID = $row.find("td:nth-child(3)").text();
           
            var data1 = '{FranchiseeID:"' + FranchiseeID + '"}';
            var url1 = "FranchiseeList.aspx/Approved";
            $.ajax({
                type: "post",
                url: url1,
                data: data1,
                contentType: "application/json",
                dataType: "json",
                success: function (response) {
                    console.log(response);
                    if (response.d == "Success") {
                        alert("Franchisee Approved Successfully..!!");
                        GetNewRegistration();
                        GetApprovedFranchisee();
                        $("#loaderHdFrachisee").hide();
                    } else {
                        $("#loaderHdFrachisee").hide();
                        alert("Failed...Try again.");
                    }
                },
                failure: function () {
                }
            });

        }
    });
    //=======================End Approve Franchisee=============================

    //=======================Start Reject Franchisee=============================
    $(document).on('click', '#btnReject', function () {
        var result = confirm("Do you want to reject this franchisee..?");
        if (result) {
            $("#loaderHdFrachisee").show();
            //$("#loaderHdFrachisee").fadeOut("slow");
            
            var $row = $(this).closest("tr");
            var FranchiseeID = $row.find("td:nth-child(3)").text();

            var data1 = '{FranchiseeID:"' + FranchiseeID + '"}';
            var url1 = "FranchiseeList.aspx/Reject";
            $.ajax({
                type: "post",
                url: url1,
                data: data1,
                contentType: "application/json",
                dataType: "json",
                success: function (response) {
                    console.log(response);
                    if (response.d == "Success") {
                        alert("Franchisee Rejected Successfully..!!");
                        GetNewRegistration();
                        $("#loaderHdFrachisee").hide();
                    } else {
                        $("#loaderHdFrachisee").hide();
                        alert("Failed...Try again.");
                    }
                },
                failure: function () {
                }
            });

        }
    });
    //=======================End Reject Franchisee=============================
    //=======================Start View Franchisee Details=============================
    $(document).on('click', '#btnView', function () {
        var $row = $(this).closest("tr");
        var FranchiseeID = $row.find("td:nth-child(3)").text();
        View(FranchiseeID);
        $('#divlblRegDate').hide();
        $('#divRegDate').hide();
        $('#divlblPassword').hide();
        $('#divPassword').hide();
        
    });
    //=======================End View Franchisee Details=============================

    //===========================Start View Data Method==============================
    function View(FId) {
        $("#loaderHdFrachisee").show();
        $("#tblStaffDetails tr").remove();
        var count = 0;
        var data = '{FranchiseeID:"' + FId + '"}';

        $.ajax({
            type: "post",
            url: "FranchiseeList.aspx/ViewModelBox",
            data: data,
            contentType: "application/json",
            dataType: "json",

            success: function (response) {
                $.each(response.d, function (index, value) {


                    //Membership Details
                    $("#lblFranchiseeID").text(value.FranchiseeID);
                    $("#lblPassword").text(value.FranchiseePassword);
                    $("#lblEnquiryDate").text(value.EnquiryDate);
                    $("#lblRegDate").text(value.RegDate);
                    $("#lblOwnerName").text(value.OwnerName);
                    $("#lblFirmName").text(value.FirmName);
                    $("#lblPANNumber").text(value.PANNumber);
                    $("#lblFatherName").text(value.FatherName);
                    $("#lblQualification").text(value.Qualification);
                    $("#lblCurrentProfession").text(value.CurrentProfession);

                    //Office Address
                    $("#lblFirstLine").text(value.FirstLine);
                    $("#lblSecondLine").text(value.SecondLine);
                    $("#lblCity").text(value.City);
                    $("#lblDistrictName").text(value.DistrictName);
                    $("#lblPincode").text(value.Pincode);
                    $("#lblStateName").text(value.StateName);
                    $("#lblMobileNo").text(value.MobileNo);
                    $("#lblEmailId").text(value.EmailId);

                    //Staff Details
                    count = count + 1
                    console.log(response);

                    var rows = "<tr style='text-align:center;color: #337ab7;font-family:Calibri;font-size:15px;'>"
                       + "<td class='customertd'>" + count + "</td>"
                       + "<td class='customertd'>" + value.StaffID + "</td>"                      
                       + "<td class='customertd'>" + value.MemberName + "</td>"
                       + "<td class='customertd'>" + value.JoiningDate + "</td>"
                       + "<td class='customertd'>" + value.StaffPassword + "</td>"
                       //+ "<td class='customertd'>"
                       //+ '<a class="btn btn-flat btn-info btn-xs" title = "Edit" id="btnedit" data-toggle="modal" data-target="#myModal1"><i class="fa fa-pencil-square-o"></i></a>'
                       //+ "</td>"
                        + "</tr>";
                    $('#tblStaffDetails').append(rows);

                });
                $("#loaderHdFrachisee").hide();
            },
            failure: function () {
                $("#loaderHdFrachisee").hide();
            }
        });
    }
    //==============================End View Data Method==================================



    //=======================Start Approved Franchisee=============================     
    function GetApprovedFranchisee() {
        $("#loaderHdFrachisee").show();
        $('#tblApprovedFranchisee td').remove();
        var count = 0;
        $.ajax({
            type: "POST",
            url: "FranchiseeList.aspx/GetApprovedFranchisee",
            data: '{FranchiseeID:"' + 0 + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {
                console.log(r);
                $.each(r.d, function (key, value) {
                    count = count + 1;
                    var rows = "<tr class='odd gradeX'>"
                        + "<td class='customertd'>" + count + "</td>"
                        + "<td class='customertd'>" + value.RegDate + "</td>"
                        + "<td class='customertd'>" + value.FranchiseeID + "</td>"
                        + "<td class='customertd'>" + value.OwnerName + "</td>"
                        + "<td class='customertd'>" + value.FirmName + "</td>"
                        + "<td class='customertd'>" + value.City + "</td>"
                        + "<td class='customertd'>" + value.DistrictName + "</td>"
                        //+ "<td class='customertd'>" + value.FirmLicense + "</td>"
                        //+ "<td class='customertd'><img id='myImg' class='img-rounded zoom' style='height:30px;width:30px;' src=" + value.FirmLicense + " data-toggle='modal' data-target='#myImgModal' data-id=" + value.FirmLicense + "/></td>"
                        //+ "<td class='customertd'><img id='myImg' class='img-rounded zoom' style='height:30px;width:30px;' src=" + value.FirmLicense + " data-toggle='modal' data-target='#myImgModal' data-id=" + value.FirmLicense + " /></td>"

                    if (getExtension(value.FirmLicense) == "pdf") {
                        rows += "<td class='customertd'><a id='Downloadpdf' onClick='openTab(this)' name='" + value.FirmLicense + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a></td>";
                    } else {
                        rows += "<td class='customertd'><img id='myImg' src='" + value.FirmLicense + "' width='50' height='50' data-toggle='modal' data-target='#myImgModal' style='cursor:zoom-in;' data-id='" + value.FirmLicense + "' /></td>";
                    }
                    rows += "<td class='center'><button id='btnViewApproved' title='View Details' class='btn btn-primary btn-xs' data-toggle='modal' data-target='#myModal'><i class='ace-icon fa fa-folder-o  bigger-110 icon-only'></i></button>&nbsp;";
                    rows += "<button id='btnRemove' title='Remove' class='btn btn-danger btn-xs'><i class='ace-icon fa fa-trash  bigger-110 icon-only'></i></button>&nbsp;</td>";
                    rows += "</tr>";
                    $('#tblApprovedFranchisee').append(rows);
                });
                $("#loaderHdFrachisee").hide();
            }
        });
    }
    //=======================End Approved Franchisee=============================

    //=======================Start View Approved Franchisee Details=============================
    $(document).on('click', '#btnViewApproved', function () {
        var $row = $(this).closest("tr");
        var FranchiseeID = $row.find("td:nth-child(3)").text();
        View(FranchiseeID);
        $('#divlblRegDate').show();
        $('#divRegDate').show();
        $('#divlblPassword').show();
        $('#divPassword').show();
    });
    //=======================End View Approved Franchisee Details=============================

    //=======================Start Remove Approved Franchisee=============================
    $(document).on('click', '#btnRemove', function () {
        var result = confirm("Do you want to remove this franchisee..?");
        if (result) {
            $("#loaderHdFrachisee").show();
            //$("#loaderHdFrachisee").fadeOut("slow");
            
            var $row = $(this).closest("tr");
            var FranchiseeID = $row.find("td:nth-child(3)").text();

            var data1 = '{FranchiseeID:"' + FranchiseeID + '"}';
            var url1 = "FranchiseeList.aspx/Remove";
            $.ajax({
                type: "post",
                url: url1,
                data: data1,
                contentType: "application/json",
                dataType: "json",
                success: function (response) {
                    console.log(response);
                    if (response.d == "Success") {
                        alert("Franchisee Remove Successfully..!!");
                        GetApprovedFranchisee();
                        $("#loaderHdFrachisee").hide();
                    } else {
                        $("#loaderHdFrachisee").hide();
                        alert("Failed...Try again.");
                    }
                },
                failure: function () {
                }
            });

        }
    });
    //=======================End Remove Approved Franchisee=============================
    
    //=======================Start Get Image On Modal Box=============================
    $(document).on('click', '#myImg', function () {
        var ImagePath = $(this).data('id');
        //var img = ".." + ImagePath.substring(0, ImagePath.length - 1);
        var img = ".." + ImagePath;
        $("#ModalImage").attr("src", img);


        $("#btnDownload").attr('href', img);
        $("#btnDownload").attr('download', img);

    });
    
    //=======================End Get Image On Modal Box=============================
});

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
