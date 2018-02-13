$(document).ready(function () {
});



function ActiveClass(form)
{
    if (form == "Dashboard") {
        $('#GstReg').prop('class', '')
        $("[id*=liDash]").prop('class', 'active')
        $('#ITFiles').prop('class', '')
        $('#TDSFiles').prop('class', '')
        $('#ITNFiles').prop('class', '')
        $("[id*=liequi]").prop('class', '')
    }
else if(form=="GSTReg")
{
    $('#GstReg').prop('class', 'active')
    $("[id*=liDash]").prop('class', '')
    $('#ITFiles').prop('class', '')
    $('#TDSFiles').prop('class', '')
    $('#ITNFiles').prop('class', '')
    $("[id*=liequi]").prop('class', '')
}
else if (form == "IT") {
    $('#GstReg').prop('class', '')
    $("[id*=liDash]").prop('class', '')
    $('#ITFiles').prop('class', 'active')
    $('#TDSFiles').prop('class', '')
    $('#ITNFiles').prop('class', '')
    $("[id*=liequi]").prop('class', '')
}
else if (form == "TDS") {
    $('#GstReg').prop('class', '')
    $("[id*=liDash]").prop('class', '')
    $('#ITFiles').prop('class', '')
    $('#TDSFiles').prop('class', 'active')
    $('#ITNFiles').prop('class', '')
    $("[id*=liequi]").prop('class', '')
}
else if (form == "ITN") {
    $('#GstReg').prop('class', '')
    $("[id*=liDash]").prop('class', '')
    $('#ITFiles').prop('class', '')
    $('#TDSFiles').prop('class', '')
    $('#ITNFiles').prop('class', 'active')
    $("[id*=liequi]").prop('class', '')
}
else if (form == "Inbox") {
    $('#GstReg').prop('class', '')
    $("[id*=liDash]").prop('class', '')
    $('#ITFiles').prop('class', '')
    $('#TDSFiles').prop('class', '')
    $('#ITNFiles').prop('class', '')
    $("[id*=liequi]").prop('class', 'active')
}
    
}