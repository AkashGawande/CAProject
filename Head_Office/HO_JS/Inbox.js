
var totalmessagecount = 0;
var totalSentmessagecount = 0;

var MessageID = ""
$(document).ready(function () {
    ActiveClass("Inbox");



    $('#id-message-content').hide();
    ShowMsgDetl();

    $('#GotoInbox').click(function () {

        $("#chkdeleteallInbox").prop("checked", false);
        $("#chkdeleteallsent").prop("checked", false);

        $('#Chk_Searchtext').show();
        $('#Chk_Searchtext1').hide();
        $('#SendBack').hide();
        $('#message-list').show();
        $('#id-message-content').hide();
        $('#GotoInbox').show();
        $('#GotoSentbox').hide();


        $('#ReceiveMessage').show();
        $('#SendMessage').hide();
        $('#ComposeMessage').hide();

        $('#btndeleteSelectedmsg').hide();

        ShowMsgDetl();
        ShowUnreadMsgDetl();
    });

    $('#GotoSentbox').click(function () {

        $("#chkdeleteallInbox").prop("checked", false);
        $("#chkdeleteallsent").prop("checked", false);

        $('#Chk_Searchtext').hide();
        $('#Chk_Searchtext1').show();
        $('#SendBack').hide();
        $('#message-list').show();
        $('#id-message-content').hide();
        $('#GotoInbox').hide();
        $('#GotoSentbox').show();

        $('#ReceiveMessage').hide();
        $('#SendMessage').show();
        $('#ComposeMessage').hide();

        $('#btndeleteSelectedmsg').hide();

        GetSentMessages();
    });

    $('#GoToSendMessageDetails').click(function () {
        
        GetSentMessages();
        
        $("#chkdeleteallInbox").prop("checked", false);
        $("#chkdeleteallsent").prop("checked", false);
        $('#Chk_Searchtext').hide();
        $('#Chk_Searchtext1').show();

        $('#Chk_Searchtext').show();
        $('#SendBack').hide();
        $('#ReceiveMessage').hide();
        $('#message-list').show();
        $('#id-message-content').hide();
        $('#id-message-infobar').hide();
        $('#id-message-infobar1').show();
        $('#SendMessage').show();
        $('#ComposeMessage').hide();

        $('#btndeleteSelectedmsg').hide();

        ShowUnreadMsgDetl();
    });

    $('#InboxMessage').click(function () {
        $("#chkdeleteallInbox").prop("checked", false);
        $("#chkdeleteallsent").prop("checked", false);
        $('#Chk_Searchtext').show();
        $('#Chk_Searchtext1').hide();
        $('#Chk_Searchtext').show();
        $('#SendBack').hide();
        $('#ReceiveMessage').show();
        $('#message-list').show();
        $('#id-message-content').hide();
        $('#id-message-infobar1').hide();
        $('#id-message-infobar').show();
        $('#SendMessage').hide();
        $('#ComposeMessage').hide();

        $('#btndeleteSelectedmsg').hide();

        ShowMsgDetl();
        ShowUnreadMsgDetl();
    });

    $('#ComposeMsg').click(function () {
        BindFirmDrop($('#ddlFirmName'), "Inbox.aspx/BindFirmName");

        $("#chkdeleteallInbox").prop("checked", false);
        $("#chkdeleteallsent").prop("checked", false);
        $("#tblSendmsgAttach tr").remove();
        AddAttachmentRow();

        $('#message-list').show();
        $('#id-message-content').hide();

        $('#ReceiveMessage').hide();
        $('#id-message-content').hide();
        $('#id-message-infobar1').hide();
        $('#id-message-infobar').hide();
        $('#SendMessage').hide();
        $('#Chk_Searchtext').hide();
        $('#Chk_Searchtext1').hide();

        $('#SendBack').show();
        $('#ComposeMessage').show();

        $('#btndeleteSelectedmsg').hide();

        ShowUnreadMsgDetl();
    });

    $('#composeback').click(function () {       
        
        $('#liinbox').prop('class', 'active')
        $("#chkdeleteallInbox").prop("checked", false);
        $('#Chk_Searchtext').show();
        $('#Chk_Searchtext1').hide();
        $('#SendBack').hide();
        $('#ReceiveMessage').show();
        $('#id-message-content').hide();
        $('#id-message-infobar1').hide();
        $('#id-message-infobar').show();
        $('#SendMessage').hide();
        $('#ComposeMessage').hide();
        $('#btndeleteSelectedmsg').hide();

        ShowMsgDetl();
        ShowUnreadMsgDetl();
    });

    $('#SendMsg').click(function () {
        
        $("#loaderinbox").show();
        var IDs = $('#ddlFirmName').val();
        var Subject = $('#Subject').val();
        var Message = $('#Message').val();
        var data;
        var url;
        data = '{IDs:"' + IDs +
                '",Subject:"' + Subject +
               '",Message:"' + Message + '"}';

        url = "Inbox.aspx/SendMasterData";
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: data,
            success: function (response) {
                if (response.d != "Record Not Added ..?") {
                    
                    MessageID = response.d;
                    var data = "";
                    var url = "";
                    var AllAttachment = JSON.stringify(GetAttachmentDetails());
                   $.ajax({
                       url: 'Inbox.aspx/SaveSendDetails',
                        type: 'POST',
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify({ 'AllAttachment': AllAttachment }),
                        success: function (response) {
                            if (response.d != "Record Not Added ..?") {
                                $("#loaderinbox").hide();
                                alert("Message Send Successfully");

                                $("#ddlFirmName").val("");
                                $("#ddlFirmName").multiselect("refresh");
                                $('#Subject').val("");
                                $('#Message').val("");
                                $('#tblSendmsgAttach tr').remove();
                                AddAttachmentRow();
                            }
                            else {
                                $("#loaderinbox").hide();
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



    });

    //------------------Start  Select All Checkboxes------------------------------------
    $('#chkdeleteallInbox').change(function () {        
        if ($("#chkdeleteallInbox").is(":checked")) {
            $('tr.Inbox').each(function () {
                $(this).find(".ReceiveDelMessage").prop("checked", true);                
            });            
            $('#deleteInboxmsg').show();
            $('#deletesentmsg').hide();
            $('#btndeleteSelectedmsg').show();
            $('#id-message-infobar1').hide();
            $('#id-message-infobar').hide();
        } else {
            $('tr.Inbox').each(function () {
                $(this).find(".ReceiveDelMessage").prop("checked", false);
            });            
            $('#deleteInboxmsg').hide();
            $('#deletesentmsg').hide();
            $('#btndeleteSelectedmsg').hide();
            $('#id-message-infobar1').hide();
            $('#id-message-infobar').show();
        }
    });


    $('#chkdeleteallsent').change(function () {        
        if ($("#chkdeleteallsent").is(":checked")) {
            $('tr.SentMessages').each(function () {                
                $(this).find(".SendDelMessage").prop("checked", true);
            });
            $('#deletesentmsg').show();
            $('#deleteInboxmsg').hide();
            $('#btndeleteSelectedmsg').show();
            $('#id-message-infobar1').hide();
            $('#id-message-infobar').hide();
        } else {
            $('tr.SentMessages').each(function () {                
                $(this).find(".SendDelMessage").prop("checked", false);
            });
            $('#deletesentmsg').hide();
            $('#deleteInboxmsg').hide();
            $('#btndeleteSelectedmsg').hide();
            $('#id-message-infobar1').show();
            $('#id-message-infobar').hide();

        }
    });
    //------------------End  Select All Checkboxes------------------------------------


    //=======================Start Delete Inbox and SentBox Messages===================================
    $('#deleteInboxmsg').click(function () {        
        var deletemsgIds = JSON.stringify(GetFileIdForDelete("Inbox", "ReceiveDelMessage","InboxDelete"));
        DeleteMessagesById(deletemsgIds);
        $('#deleteInboxmsg').hide();
        $('#deletesentmsg').hide();
        $('#btndeleteSelectedmsg').hide();
        $('#id-message-infobar').show();
        $('#id-message-infobar1').hide();

    });

    $('#deletesentmsg').click(function () {        
        var deletemsgIds = JSON.stringify(GetFileIdForDelete("SentMessages", "SendDelMessage","SentboxDelete"));
        DeleteMessagesById(deletemsgIds);

        $('#deleteInboxmsg').hide();
        $('#deletesentmsg').hide();
        $('#btndeleteSelectedmsg').hide();
        $('#id-message-infobar1').show();
        $('#id-message-infobar').hide();
    });
    //=======================End Delete Inbox and SentBox Messages====================================

});


//===================Start Delete Message Method=====================================
function DeleteMessagesById(AllIds) {
    $("#loaderinbox").show();
    
    var data = "";
    var url = "Inbox.aspx/DeleteMessages";

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ 'AllIds': AllIds }),
        success: function (response) {
            if (response.d != "Record Not Added ..?") {
                $("#loaderinbox").hide();
                alert("Deleted Successfully");
                ShowMsgDetl();
                GetSentMessages();
            }
            else {               
                $("#loaderinbox").hide();
                alert('Failed....! Try Again.');
            }
        }
    });
}
//===================End Delete Message Method=====================================



//==================================START SHOW DATA ===============================================
function ShowMsgDetl() {
        $("#tblmsgList td").remove();
    var count = 0;
    var countunread = 0;
    totalmessagecount = 0;
    $.ajax({
        type: "post",
        url: "Inbox.aspx/ShowMsg",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $.each(response.d, function (index, value) {
                
                count = count + 1
                totalmessagecount = totalmessagecount + 1
                console.log(response);

                var rows = "<tr class='Inbox' style='background-color: white;'>"
                   + "<td class='customertd' style='text-align:center'><div class='' id=''><label class='inline middle'><input  type='checkbox' id='chkinboxdelete' class='ReceiveDelMessage ace' /><span class='lbl'></span></label></div></td>"
                + "<td class='customertd' style='text-align:center;Display:none'>" + count + "</td>"
                + "<td class='customertd' style='Display:none'>" + value.MessageID + "</td>"
                + "<td class='customertd' style='text-align:left'><span class='sender' ><i class='message-star ace-icon fa fa-user orange2'></i>" + value.Sender_Name + "</span></td>"
                if (value.Status == "UnRead") {
                    countunread = countunread + 1;
                    rows += "<td class='customertd' style='text-align:left'>" + '<div class="message-item message-unread" style="background-color: transparent;border: 0px solid #EAEDF1;" ><span class="summary"><span class="badge badge-pink mail-tag"></span>&nbsp;&nbsp;&nbsp;<span class="text" id="OpenMessage">"' + value.Subject + '"</span></span></div>' + "</td>"
                }
                else {
                    rows += "<td class='customertd' style='text-align:left'><div class='message-item' style='background-color:transparent;border: 0px solid #EAEDF1;'><span class='summary'><span class='badge badge-success mail-tag' ></span>&nbsp;&nbsp;&nbsp;<span class='text' id='OpenMessage'>" + value.Subject + "</span></span></div></td>"
                }
                if (value.FileName != "" && value.Count != 0) {
                    //rows += "<td class='customertd' style='text-align:center'><span class='sender' >" + value.MessageType + " (" + value.FileTransactionID + ")  " + "&nbsp;&nbsp;&nbsp;<a id='showattach' title='" + value.Count + " Attachments' href='#'><i  class='ace-icon fa fa-paperclip fa-3x bigger-150'></i></a>" + "</span></td>"
                    rows += "<td class='customertd' style='text-align:center'></td>"
                }
                else {
                    //rows += "<td class='customertd' style='text-align:center'><span class='sender' >" + value.MessageType + " (" + value.FileTransactionID + ")</span></td>"
                    rows += "<td class='customertd' style='text-align:center'></td>"
                }
                rows += "<td class='customertd' style='text-align:center'><span class='text'>" + value.Date_Time + "</span></td>"
              + "</tr>";


                $('#tblmsgList').append(rows);
                $('#unreadmes').text(countunread);
                $('#lblmessagecount').text(totalmessagecount + "  Messages Total");
            });

        },
        failure: function () {
        }

    });
}


function GetSentMessages()
{
    $("#tblSendmsgList tr").remove();
    var count1 = 0;
    var countunread1 = 0;
    totalSentmessagecount = 0;
    $.ajax({
        type: "post",
        url: "Inbox.aspx/ShowSentMsg",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $.each(response.d, function (index, value) {
                
                count1 = count1 + 1
                totalSentmessagecount = totalSentmessagecount + 1
                console.log(response);

                var rows = "<tr class='SentMessages' style='background-color: white;'>"
                + "<td class='customertd' style='text-align:center'><div class='' id=''><label class='inline middle'><input  type='checkbox' id='chksenddelete' class='SendDelMessage ace' /><span class='lbl'></span></label></div></td>"
                + "<td class='customertd' style='text-align:center;Display:none'>" + count1 + "</td>"
                + "<td class='customertd' style='Display:none'>" + value.MessageID + "</td>"
                + "<td class='customertd' style='text-align:left'><span class='sender' ><i class='message-star ace-icon fa fa-user orange2'></i>" + value.Receiver + "</span></td>"
                if (value.FileName != "" && value.Count != 0) {
                    rows += "<td class='customertd' style='text-align:left'><div class='message-item' style='background-color:transparent;border: 0px solid #EAEDF1;'><span class='summary'><span class='badge badge-success mail-tag' ></span>&nbsp;&nbsp;&nbsp;<span class='text' id='OpenSendMessage'>" + value.Subject + "&nbsp;&nbsp;&nbsp;&nbsp;<a id='showsendattach' title='" + value.Count + " Attachments' href='#'><i  class='ace-icon fa fa-paperclip fa-3x bigger-150'></i></a></span></span></div></td>"
                }
                else {
                    rows += "<td class='customertd' style='text-align:left'><div class='message-item' style='background-color:transparent;border: 0px solid #EAEDF1;'><span class='summary'><span class='badge badge-success mail-tag' ></span>&nbsp;&nbsp;&nbsp;<span class='text' id='OpenSendMessage'>" + value.Subject + "</span></span></div></td>"
                }
                rows += "<td class='customertd' style='text-align:center'><span class='text'>" + value.Date_Time + "</span></td>"
                if (value.Status == "UnRead") {
                    countunread1 = countunread1 + 1;
                    rows += "<td class='customertd' style='text-align:center'><img src='../Logo/SingleTick.png' style='width:35px;height:23px;' title='Unread' /></td>"
                }
                else {
                    rows += "<td class='customertd' style='text-align:center'><img src='../Logo/Tick.png' style='width:30px;height:30px;' title='Read' /></td>"
                }
                + "</tr>";

                $('#tblSendmsgList').append(rows);
                $('#SentMessages').text(countunread1);
                $('#lblmessagecount').text(totalSentmessagecount + "  Messages Total");
            });

        },
        failure: function () {
        }

    });
}
//==================================END SHOW DATA==================================================


$(document).on('click', '#OpenMessage', function () {
    
    $('#Attachments tr').remove();
    var $row = $(this).closest("tr");
    var Msg_Id = $row.find("td:nth-child(3)").text();
    var msg_count = $row.find("td:nth-child(2)").text();

    var data = '{Msg_Id:"' + Msg_Id + '"}';
    var count = 0;
    $.ajax({
        type: "post",
        data: data,
        url: "Inbox.aspx/ReadMessage",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $.each(response.d, function (index, value) {
                console.log(response);
                
                $('#message-list').hide();
                $('#id-message-content').show();
                $('#GotoInbox').show();
                $('#GotoSentbox').hide();

                $('#lblsenderName').text(value.Sender_Name);
                $('#receivedTime').text(value.Date_Time);
                $('#lblSubject').text(value.Subject);
                $('#lblmessege').text(value.Message);
                $('#lblMessageno').text(msg_count + " Of " + totalmessagecount)
                $('#lblMessageno').show();

                //===Bind Documents=====
                count = count + 1;
                if (value.FileName != "" && value.FilePath != "" && count != 0) {
                    Bind(value.FileName, value.FilePath, count);
                }
            });
        },
        failure: function () {

        }
    });

});

$(document).on('click', '#showattach', function () {
    
    $('#Attachments tr').remove();
    var $row = $(this).closest("tr");
    var Msg_Id = $row.find("td:nth-child(3)").text();
    var msg_count = $row.find("td:nth-child(2)").text();

    var data = '{Msg_Id:"' + Msg_Id + '"}';
    var count = 0;
    $.ajax({
        type: "post",
        data: data,
        url: "Inbox.aspx/ReadMessage",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $.each(response.d, function (index, value) {
               
                console.log(response);
                $('#message-list').hide();
                $('#id-message-content').show();
                $('#GotoInbox').show();
                $('#GotoSentbox').hide();

                $('#lblsenderName').text(value.Sender_Name);
                $('#receivedTime').text(value.Date_Time);
                $('#lblSubject').text(value.Subject);
                $('#lblmessege').text(value.Message);
                $('#lblMessageno').text(msg_count + " Of " + totalmessagecount)
                $('#lblMessageno').show();

                count = count + 1;
                
                if (value.FileName != "" && value.FilePath != "" && count != 0) {
                    Bind(value.FileName, value.FilePath, count);
                }
                

            });
        },
        failure: function () {

        }
    });

});

$(document).on('click', '#OpenSendMessage', function () {

    $('#Attachments tr').remove();
    var $row = $(this).closest("tr");
    var Msg_Id = $row.find("td:nth-child(3)").text();
    var msg_count = $row.find("td:nth-child(2)").text();

    var data = '{Msg_Id:"' + Msg_Id + '"}';
    var count = 0;
    $.ajax({
        type: "post",
        data: data,
        url: "Inbox.aspx/ShowSendMsgDetail",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $.each(response.d, function (index, value) {
                console.log(response);
                
                //$('#message-list').hide();
                $('#message-list').hide();
                $('#id-message-content').show();

                $('#message-list').hide();
                $('#id-message-content').show();
                $('#GotoInbox').hide();
                $('#GotoSentbox').show();



                $('#lblsenderName').text(value.Receiver);
                $('#receivedTime').text(value.Date_Time);
                $('#lblSubject').text(value.Subject);
                $('#lblmessege').text(value.Message);
                $('#lblMessageno').text(msg_count + " Of " + totalmessagecount)
                $('#lblMessageno').show();

                //===Bind Documents=====
                count = count + 1;
                // BindDocument(value.FileName, value.FilePath, count);
                if (value.FileName != "" && value.FilePath != "" && count != 0)
                {
                    Bind(value.FileName, value.FilePath, count);
                }
                
            });
        },
        failure: function () {

        }
    });

});


//=================bind document =================================

function BindDocument(FileName, FilePath,count)
{
    
    var rows = "";
    var a = $('#Attachments tr:first td:nth-child(1)').text();
    if (a == "") {
        rows += "<tr    style='background-color: white;'>"
        + "<td class='customertd' style='width:20px;'>" + FilePath + "</td>"
        + "</tr>"
        + "<tr>"
        if (getExtension(FileName) == "pdf") {
            rows += "<td class='customertd'><a id='Downloadpdf' onClick='openTab(this)' name='" + FileName + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a></td>";
        } else {
            rows += "<td class='customertd'><img id='myImg' src='" + FileName + "' width='50' height='50'  style='cursor:zoom-in;' data-id='" + FileName + "' /></td>";
        }
        + "</tr>"

        $('#Attachments').append(rows);
    } else {
        rows += "<td class='customertd' style='width:20px;'></td>";
        $('#Attachments tr:first').append(rows);
        $('#Attachments tr:first td:nth-child(' + count + ')').append(FilePath);


        var rows1 = "<td class='customertd'></td>";
        $('#Attachments tr:last').append(rows1);
        var rows2 = "";
        if (getExtension(FileName) == "pdf") {
            rows2 += "<a id='Downloadpdf' onClick='openTab(this)' name='" + FileName + "' href='#'><img src='../Logo/pdf-icon.png' height='50' width='50' /></a>";
        } else {
            rows2 += "<img id='myImg' src='" + FileName + "' width='50' height='50'  style='cursor:zoom-in;' data-id='" + FileName + "' />";
        }
        $('#Attachments tr:last td:nth-child(' + count + ')').append(rows2);
    }
}


function Bind(FileName, FilePath, count) {
    var rows = "";
    if (count == 1)
    {
        rows += "<tr style='background-color:white;'><td colspan='2' style='border-top:0px'><div class='attachment-title'><span class='blue bolder bigger-110'>Attachments</span>&nbsp;<span class='grey'>(<label id='attachcount'></label>)</span></div></td></tr>"
    }        
        rows += "<tr    style='background-color: white;'>"
       
        if (getExtension(FileName) == "pdf") {
            rows += "<td class='customertd' style='border-top:0px;'><a id='Downloadpdf' onClick='openTab(this)' name='" + FilePath + "' href='#'>" + FileName + "</a>&nbsp;&nbsp;&nbsp;&nbsp;<a download='" + FilePath + "' id='btnDownlaod' href='" + FilePath + "' title='" + FilePath.split("/")[2] + "'><i  class='ace-icon fa fa-download fa-3x bigger-130 icon-only'></i></a></td>";
        } else {
            rows += "<td class='customertd' style='border-top:0px;'><a id='Downloadpdf' onClick='openTab(this)' name='" + FilePath + "'  href='#'>" + FileName + "</a>&nbsp;&nbsp;&nbsp;&nbsp;<a download='" + FilePath + "' id='btnDownlaod' href='" + FilePath + "' title='" + FilePath.split("/")[2] + "'><i  class='ace-icon fa fa-download fa-3x bigger-130 icon-only'></i></a></td>";
        }
        + "</tr>"

        $('#Attachments').append(rows);

        if (count > 1)
        {
            $('#attachcount').text(count + " files");
        }
        else
        {
            $('#attachcount').text(count + " file");
        }
        
    
}
//======================End Bind Document============================



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



var count = 0;
//=================Start Add New Attachment Function======================
function AddAttachmentRow() {
    var rows = "";
    var a = $('#tblSendmsgAttach tr:last td:nth-child(1)').text();
    if (a == "") {
        count++;        
        rows += "<tr class='Message-Attachment'>"
     + "<td tabindex='10' style='display:none;'> " + count + "</td>"
     + "<td style='border-top: 0px solid ;'>"
    + "<div class='row'>"
    + "<div class='form-group'>"
    + "<label class='col-lg-3 col-md-3 col-sm-3 col-lg-push-2'>"
    + "Attachments:"
    + "</label>"
    + "<div class='col-lg-4 col-md-4 col-sm-4 col-xs-12'>"
    + "<div class='input-icon block col-xs-12 no-padding'>"
    + "<input type='file' class='form-control' name='file[]' id=" + count + "' multiple='multiple' onchange='Attachments(this," + count + ")' />"
    + "<label style='color: lightgray; font-weight: normal;'>only pdf/jpg/jpeg/gif/bmp format</label>"
    + "<input type='hidden' id='PhotoSource" + count + "' value='' class='PhotoSource' />"
    + "<input type='hidden' id='FileName" + count + "' value='' class='PhotoFileName' />"
    + "</div>"
    + "</div>"
    + "<div class='col-lg-1 col-md-1 col-sm-1'>"
    + "<a id='NewAttach' style='cursor:pointer;'>"
    + "<i class='ace-icon fa fa-plus fa-2x  bigger-110 icon-only' style='margin-top: 13px;'></i>"
    + "</a>"
    + "</div>"
    + "</div>"
    + "</div>"
    + "</td>"
    + "</tr>";
        $("#tblSendmsgAttach").append(rows);
    }
    else if (count == a) {
        count++;
        rows += "<tr  class='Message-Attachment'>"
     + "<td tabindex='10' style='display:none;'> " + count + "</td>"
     + "<td style='border-top: 0px solid ;'>"
    + "<div class='row'>"
    + "<div class='form-group'>"
    + "<label class='col-lg-3 col-md-3 col-sm-3 col-lg-push-2'>"
   // + "Attachments:"
    + "</label>"
    + "<div class='col-lg-4 col-md-4 col-sm-4 col-xs-12'>"
    + "<div class='input-icon block col-xs-12 no-padding'>"
    + "<input type='file' class='form-control' name='file[]' id=" + count + "' multiple='multiple' onchange='Attachments(this," + count + ")' />"
    + "<label style='color: lightgray; font-weight: normal;'>only pdf/jpg/jpeg/gif/bmp format</label>"
    + "<input type='hidden' id='PhotoSource" + count + "' value='' class='PhotoSource' />"
    + "<input type='hidden' id='FileName" + count + "' value='' class='PhotoFileName' />"
    + "</div>"
    + "</div>"
    + "<div class='col-lg-1 col-md-1 col-sm-1'>"
    + "<a id='NewAttach' style='cursor:pointer;'>"
    + "<a  id='btndeleteattach'><i class='ace-icon fa fa-trash-o red icon-only bigger-130'></i></a>"
    + "</a>"
    + "</div>"
    + "</div>"
    + "</div>"
    + "</td>"
    + "</tr>";
        $("#tblSendmsgAttach").append(rows);
    }
    else {

        a++;
        count = a;
        rows += "<tr  class='Message-Attachment'>"
    + "<td tabindex='10' style='display:none;'> " + count + "</td>"
    + "<td style='border-top: 0px solid ;'>"
   + "<div class='row'>"
   + "<div class='form-group'>"
   + "<label class='col-lg-3 col-md-3 col-sm-3 col-lg-push-2'>"
   //+ "Attachments:"
   + "</label>"
   + "<div class='col-lg-4 col-md-4 col-sm-4 col-xs-12'>"
   + "<div class='input-icon block col-xs-12 no-padding'>"
   + "<input type='file' class='form-control' name='file[]' id=" + count + "' multiple='multiple' onchange='Attachments(this," + count + ")' />"
   + "<label style='color: lightgray; font-weight: normal;'>only pdf/jpg/jpeg/gif/bmp format</label>"
   + "<input type='hidden' id='PhotoSource" + count + "' value='' class='PhotoSource' />"
   + "<input type='hidden' id='FileName" + count + "' value='' class='PhotoFileName' />"
   + "</div>"
   + "</div>"
   + "<div class='col-lg-1 col-md-1 col-sm-1'>"
   + "<a id='NewAttach' style='cursor:pointer;'>"
   + "<a  id='btndeleteattach'><i class='ace-icon fa fa-trash-o red icon-only bigger-130'></i></a>"
   + "</a>"
   + "</div>"
   + "</div>"
   + "</div>"
   + "</td>"
   + "</tr>";
        $("#tblSendmsgAttach").append(rows);
    }
}

$(document).on('click', '#NewAttach', function () {
    AddAttachmentRow();
});

$(document).on('click', '#btndeleteattach', function () {
    $(this).closest('tr').remove();
});
//=================End Add New Attachment Function======================


//==========================Start Bind Franchisee Name===========================
function BindFirmDrop(dept, customUrlIT) {
    $("#loaderinbox").show();

    $('#ddlFirmName option').remove();
    $.ajax({
        type: "POST",
        url: customUrlIT,
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            console.log(r);
            //var dept = $("#ddlFranchiseeNameIT");
            //dept.empty().append('<option selected="selected" value="0">--Select--</option>');
            $.each(r.d, function (key, value) {
                dept.append($("<option></option>").val(value.FranchiseeID).text(value.FirmName));
            });
            dept.multiselect('rebuild');
            $("#loaderinbox").hide();
        }
    });
}
//============================End Bind Franchisee Name========================================


//=================Start Get  Attachment Details========================================
function Attachments(input, Id) {
    if (input.files && input.files[0]) {

        var filerdr = new FileReader();
        filerdr.onload = function (e) {
            fileExtension = (input.value.substring((input.value.lastIndexOf("\\")) + 1)).replace(/^.*\./, '');
            if (fileExtension == "jpg" || fileExtension == "jpeg" || fileExtension == "png" || fileExtension == "pdf") {

                document.getElementById('PhotoSource' + Id).value = e.target.result; //Generated DataURL
                document.getElementById('FileName' + Id).value = input.value.substring((input.value.lastIndexOf("\\")) + 1)
            }
            else {
                $("#" + Id).val("");
                alert("Only Pdf/jpg/jpeg/png Format allowed");
            }
        }
        filerdr.readAsDataURL(input.files[0]);
    }

}



//-------------------------------Start Save Member Details Method --------------------------
function GetAttachmentDetails() {
    
   var  FilePath = "";
   var  PhotoName = "";
    var Attachment = [];
    $('tr.Message-Attachment').each(function () {

        if ($(this).find(".PhotoSource").val() != "") {
            FilePath = $(this).find(".PhotoSource").val();
        }
        if ($(this).find(".PhotoFileName").val() != "") {
            PhotoName = $(this).find(".PhotoFileName").val();
        }
        Status = 'InActive';
        var alldata = {
            //'FileTransactionID': FileTransactionID,
            //'ClientId': ClientId,
            'MessageID': MessageID,
            'FilePath': FilePath,
            'PhotoName': PhotoName
        }

        Attachment.push(alldata);
    });
    console.log(Attachment);
    return Attachment;
}
//-------------------------------End Save Member Details Method--------------------------


//-------------------------------Start Get File ID For Delete --------------------------
function GetFileIdForDelete(tableclassname,chkboxid,box) {
    
    var MessageID = "";
    var AttDelIds = [];
    var alldata = [];

    $('tr.' + tableclassname + '').each(function () {        
        if ($(this).find("." + chkboxid + "").is(":checked")) {
            MessageID = $(this).find("td:nth-child(3)").text();
            alldata = {
                'MessageID': MessageID,
                'BoxType': box
            }
            AttDelIds.push(alldata);
        }
    });
    console.log(AttDelIds);
    return AttDelIds;
}
//-------------------------------End Get File ID For Delete--------------------------


//=============================Start Select or Deselect Checkbox For delete============================= 

//------------------Start Inbox Select All Validations------------------------------------
$(document).on('click', '#chkinboxdelete', function () {
    
    $('tr.Inbox').each(function () {
        if ($(this).find(".ReceiveDelMessage").is(":checked")) {
            $('#deleteInboxmsg').show();
            $('#deletesentmsg').hide();
            $('#btndeleteSelectedmsg').show();
            $('#id-message-infobar1').hide();
            $('#id-message-infobar').hide();
            return false;
        } else {
            $('#deleteInboxmsg').hide();
            $('#deletesentmsg').hide();
            $('#btndeleteSelectedmsg').hide();
            $('#id-message-infobar1').hide();
            $('#id-message-infobar').show();
            }
    });

    $('tr.Inbox').each(function () {
        if ($(this).find(".ReceiveDelMessage").is(":checked")) {
           $('#chkdeleteallInbox').prop("checked", true);
        } else {
           $('#chkdeleteallInbox').prop("checked", false);
            return false;
        }
    });




});
//------------------End Inbox Select All Validations------------------------------------

//------------------Start Sent Select All Validations------------------------------------
$(document).on('click', '#chksenddelete', function () {    
    $('tr.SentMessages').each(function () {
        if ($(this).find(".SendDelMessage").is(":checked")) {
            $('#deleteInboxmsg').hide();
            $('#deletesentmsg').show();
            $('#btndeleteSelectedmsg').show();
            $('#id-message-infobar1').hide();
            $('#id-message-infobar').hide();
            return false;
        } else {            
            $('#deleteInboxmsg').hide();
            $('#deletesentmsg').hide();
            $('#btndeleteSelectedmsg').hide();
            $('#id-message-infobar1').show();
            $('#id-message-infobar').hide();
        }
    });

    $('tr.SentMessages').each(function () {
        if ($(this).find(".SendDelMessage").is(":checked")) {
            $('#chkdeleteallsent').prop("checked", true);
        } else {
            $('#chkdeleteallsent').prop("checked", false);
            return false;
        }
    });
});
//------------------End Sent Select All Validations------------------------------------



//=============================End Select or Deselect Checkbox For delete=============================