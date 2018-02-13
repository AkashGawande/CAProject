/// <reference path="../assets/js/jquery-2.1.4.min.js" />


var totalmessagecount = 0;
$(document).ready(function () {
    ShowUnreadMsgDetl();
});


//--------------------------Start Show Unread Message Data-------------------------------------------
function ShowUnreadMsgDetl() {

    $("#tblUnreadmsgList tr").remove();
    var count = 0;
    var countunread = 0;
    totalmessagecount = 0;
    $.ajax({
        type: "post",
        url: "Dashboard.aspx/ShowMsg",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $.each(response.d, function (index, value) {
                count = count + 1
                totalmessagecount = totalmessagecount + 1
                console.log(response);

                var rows = "";
                rows += "<tr>"
                        + "<td class='customertd' style='text-align:center;Display:none'>" + count + "</td>"
                        + "<td class='customertd' style='Display:none'>" + value.Id + "</td>"
                        + "<td class='customertd'>"
                        + "<a href='Inbox.aspx' id='OpenMsg' class='clearfix'><img src='../assets/images/avatars/avatar.png' class='msg-photo' alt='Alex's Avatar' /><span class='msg-body'><span class='msg-title'><span class='blue' >" + value.Sender_Name + ":</span>" + value.Subject + " ...</span><span class='msg-time'><i class='ace-icon fa fa-clock-o'></i><span>" + value.Date +"</span></span></span></a>"
                        + "</td>"
                        + "</tr>";

                $('#tblUnreadmsgList').append(rows);


                //$('#lblmessagecount').text(totalmessagecount + "  Messages Total");
            });
            $('#unreadmsgcount').text(count);
            $('#Messagecount').text(count + " Unread Messages");

        },
        failure: function () {
        }

    });
}
//--------------------------Start Show Unread Message Data-------------------------------------------