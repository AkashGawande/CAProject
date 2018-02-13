using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Messenger_Module
/// </summary>
public class Messenger_Module
{
	public Messenger_Module()
	{
		//
		// TODO: Add constructor logic here
		//
	}
}

public class GetMsgDetail
{
   
    public string Msg_ID { get; set; }
    public string MDate { get; set; }
    public string MTime { get; set; }
    public string ID { get; set; }
    public string Subject { get; set; }
    public string Messenger { get; set; }
    public string UnReadmsg { get; set; }
    public string Readmsg { get; set; }
    public string Status { get; set; }
    public string AddedBy { get; set; }
    public string Customer_Name { get; set; }
}

public class MasterPageMsg
{   
    public string Id { get; set; }
    public string Time { get; set; }
    public string Date { get; set; }
    public string Subject { get; set; }
    public string Sender_Name { get; set; }     
}


public class GetMsgFullDetail
{
    //----------Message Master Details---------------------
    public string MessageID { get; set; }
    public string FileTransactionID { get; set; }
    public string Date_Time { get; set; }
    public string MessageType { get; set; }
    public string FranchiseeID { get; set; }
    public string ClientId { get; set; }
    public string StaffId { get; set; }
    public string Subject { get; set; }
    public string Message { get; set; }
    public string Sender { get; set; }

    public string Sender_Id { get; set; }
    public string Sender_Name { get; set; }
    public string Id { get; set; }
    public string Status { get; set; }
    public string Receiver { get; set; }

    //-------------------Message Details Document---------------
    public string ID { get; set; }
    public string FilePath { get; set; }
    public string FileName { get; set; }
    public string Count { get; set; }
}