using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Text.RegularExpressions;

/// <summary>
/// Summary description for Messenger_Controller
/// </summary>
public class Messenger_Controller
{
    static DataAccess da = new DataAccess();
    string FilePath = "/Documents/";
	public Messenger_Controller()
	{
		//
		// TODO: Add constructor logic here
		//
	}


    public GetMsgFullDetail[] GetallMsgDetl(string str)
    {
        List<GetMsgFullDetail> li = new List<GetMsgFullDetail>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                GetMsgFullDetail msg = new GetMsgFullDetail();
                msg.MessageID = ds.Tables[0].Rows[i]["MessageID"].ToString();
                msg.Date_Time = ds.Tables[0].Rows[i]["DateTime"].ToString();
                msg.FileTransactionID = ds.Tables[0].Rows[i]["FileTransactionID"].ToString();
                msg.MessageType = ds.Tables[0].Rows[i]["MessageType"].ToString();
                msg.FranchiseeID = ds.Tables[0].Rows[i]["FranchiseeID"].ToString();
                msg.StaffId = ds.Tables[0].Rows[i]["StaffId"].ToString();
                msg.ClientId = ds.Tables[0].Rows[i]["ClientId"].ToString();
                msg.Message = ds.Tables[0].Rows[i]["Message"].ToString();
                msg.Sender = ds.Tables[0].Rows[i]["Sender"].ToString();
                msg.Sender_Id = ds.Tables[0].Rows[i]["Sender_Id"].ToString();
                msg.Subject = ds.Tables[0].Rows[i]["Subject"].ToString();
                msg.Status = ds.Tables[0].Rows[i]["Status"].ToString();
                msg.Count = ds.Tables[0].Rows[i]["FileCount"].ToString();


                if (ds.Tables[0].Rows[i]["Sender_Id"].ToString() != "Admin" && ds.Tables[0].Rows[i]["Sender"].ToString() == "Head Office")
                {
                    string strEmpName = "";
                    strEmpName += "select EmpName from employeemaster where EmpId='" + ds.Tables[0].Rows[i]["Sender_Id"].ToString() + "'";
                    msg.Sender_Name = da.getString(strEmpName)+" (Head Office)";
                }
                else
                {
                    msg.Sender_Name = "Admin (Head Office)";
                }

                msg.Receiver = ds.Tables[0].Rows[i]["MemberName"].ToString();                
                li.Add(msg);
            }
        }
        return li.ToArray();
    }



    public GetMsgFullDetail[] GetallHeadOfficeMsgDetl(string str)
    {
        List<GetMsgFullDetail> li = new List<GetMsgFullDetail>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                GetMsgFullDetail msg = new GetMsgFullDetail();
                msg.MessageID = ds.Tables[0].Rows[i]["MessageID"].ToString();
                msg.Date_Time = ds.Tables[0].Rows[i]["DateTime"].ToString();
                msg.FileTransactionID = ds.Tables[0].Rows[i]["FileTransactionID"].ToString();
                msg.MessageType = ds.Tables[0].Rows[i]["MessageType"].ToString();
                msg.FranchiseeID = ds.Tables[0].Rows[i]["FranchiseeID"].ToString();
                msg.StaffId = ds.Tables[0].Rows[i]["StaffId"].ToString();
                msg.ClientId = ds.Tables[0].Rows[i]["ClientId"].ToString();
                msg.Message = ds.Tables[0].Rows[i]["Message"].ToString();
                msg.Sender = ds.Tables[0].Rows[i]["Sender"].ToString();                
                msg.Subject = ds.Tables[0].Rows[i]["Subject"].ToString();
                msg.Status = ds.Tables[0].Rows[i]["Status"].ToString();
                msg.Count = ds.Tables[0].Rows[i]["FileCount"].ToString();

                if (ds.Tables[0].Rows[i]["Sender"].ToString() == "Franchisee")
                {
                    string firmName = "";
                    firmName+="SELECT FirmName FROM franchiseemaster WHERE FranchiseeID='"+ds.Tables[0].Rows[i]["Sender_Id"].ToString()+"'";                        
                    msg.Sender_Name = da.getString(firmName);
                }
                else if (ds.Tables[0].Rows[i]["Sender"].ToString() == "Staff")
                {
                   string MemberName = "";
                   MemberName += "SELECT MemberName FROM franchiseestaffdetails WHERE StaffID='" + ds.Tables[0].Rows[i]["Sender_Id"].ToString() + "'";
                    msg.Sender_Name = da.getString(MemberName);
                }
                

                li.Add(msg);
            }
        }
        return li.ToArray();
    }




    public GetMsgFullDetail[] GetallSendMsgDetl(string str)
    {
        List<GetMsgFullDetail> li = new List<GetMsgFullDetail>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                GetMsgFullDetail msg = new GetMsgFullDetail();
                msg.MessageID = ds.Tables[0].Rows[i]["MessageID"].ToString();
                msg.Date_Time = ds.Tables[0].Rows[i]["DateTime"].ToString();
                msg.MessageType = ds.Tables[0].Rows[i]["MessageType"].ToString();
                msg.Message = ds.Tables[0].Rows[i]["Message"].ToString();
               
                msg.Subject = ds.Tables[0].Rows[i]["Subject"].ToString();
                msg.Status = ds.Tables[0].Rows[i]["Status"].ToString();

                msg.Count = ds.Tables[0].Rows[i]["FileCount"].ToString();


                msg.Receiver = ds.Tables[0].Rows[i]["EmpName"].ToString();
                
                li.Add(msg);
            }
        }
        return li.ToArray();
    }



    public GetMsgFullDetail[] GetallHeadOfficeSendMsgDetl(string str)
    {
        List<GetMsgFullDetail> li = new List<GetMsgFullDetail>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                GetMsgFullDetail msg = new GetMsgFullDetail();
                msg.MessageID = ds.Tables[0].Rows[i]["MessageID"].ToString();
                msg.Date_Time = ds.Tables[0].Rows[i]["DateTime"].ToString();
                msg.MessageType = ds.Tables[0].Rows[i]["MessageType"].ToString();
                msg.Message = ds.Tables[0].Rows[i]["Message"].ToString();
                msg.Subject = ds.Tables[0].Rows[i]["Subject"].ToString();
                msg.Status = ds.Tables[0].Rows[i]["Status"].ToString();
                msg.Count = ds.Tables[0].Rows[i]["FileCount"].ToString();

                
                string receivers=ds.Tables[0].Rows[i]["Receiver_Id"].ToString();
                string[] sepreceivers=Regex.Split(receivers,",");
                string MultipalName = "";
                for (int j = 0; j < sepreceivers.Length; j++)
                {
                    string firmName = "";
                    firmName += "SELECT FirmName FROM franchiseemaster WHERE FranchiseeID='" + sepreceivers[j].ToString() + "'";                   
                    MultipalName += da.getString(firmName) + " , ";
                }
                MultipalName = MultipalName.TrimEnd(' ');
                msg.Receiver = MultipalName.TrimEnd(',');
                



                //msg.Receiver = ds.Tables[0].Rows[i]["EmpName"].ToString();
               
                li.Add(msg);
            }
        }
        return li.ToArray();
    }






    public GetMsgFullDetail[] GetMessageDetails(string str)
    {
        List<GetMsgFullDetail> li = new List<GetMsgFullDetail>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                GetMsgFullDetail msg = new GetMsgFullDetail();
                msg.MessageID = ds.Tables[0].Rows[i]["MessageID"].ToString();                
                msg.Date_Time = ds.Tables[0].Rows[i]["DateTime"].ToString();
                msg.FileTransactionID = ds.Tables[0].Rows[i]["FileTransactionID"].ToString();
                msg.MessageType = ds.Tables[0].Rows[i]["MessageType"].ToString();
                msg.FranchiseeID = ds.Tables[0].Rows[i]["FranchiseeID"].ToString();
                msg.StaffId = ds.Tables[0].Rows[i]["StaffId"].ToString();
                msg.ClientId = ds.Tables[0].Rows[i]["ClientId"].ToString();
                msg.Message = ds.Tables[0].Rows[i]["Message"].ToString();
                msg.Sender = ds.Tables[0].Rows[i]["Sender"].ToString();
                msg.Sender_Id = ds.Tables[0].Rows[i]["Sender_Id"].ToString();
                msg.Subject = ds.Tables[0].Rows[i]["Subject"].ToString();
                msg.Status = ds.Tables[0].Rows[i]["Status"].ToString();

                msg.ID = ds.Tables[0].Rows[i]["Status"].ToString();
                msg.FilePath = FilePath+ds.Tables[0].Rows[i]["FilePath"].ToString();
                msg.FileName = ds.Tables[0].Rows[i]["FileName"].ToString();

                if (ds.Tables[0].Rows[i]["Sender_Id"].ToString() != "Admin" && ds.Tables[0].Rows[i]["Sender"].ToString() == "Head Office")
                {
                    string strEmpName = "";
                    strEmpName += "select EmpName from employeemaster where EmpId='" + ds.Tables[0].Rows[i]["Sender_Id"].ToString() + "'";
                    msg.Sender_Name = da.getString(strEmpName) + " (Head Office)";
                }
                else
                {
                    msg.Sender_Name = "Admin (Head Office)";
                }


                
                li.Add(msg);
            }
        }
        return li.ToArray();
    }



    public GetMsgFullDetail[] GetMessageHeadOfficeDetails(string str)
    {
        List<GetMsgFullDetail> li = new List<GetMsgFullDetail>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                GetMsgFullDetail msg = new GetMsgFullDetail();
                msg.MessageID = ds.Tables[0].Rows[i]["MessageID"].ToString();
                msg.Date_Time = ds.Tables[0].Rows[i]["DateTime"].ToString();
                msg.FileTransactionID = ds.Tables[0].Rows[i]["FileTransactionID"].ToString();
                msg.MessageType = ds.Tables[0].Rows[i]["MessageType"].ToString();
                msg.FranchiseeID = ds.Tables[0].Rows[i]["FranchiseeID"].ToString();
                msg.StaffId = ds.Tables[0].Rows[i]["StaffId"].ToString();
                msg.ClientId = ds.Tables[0].Rows[i]["ClientId"].ToString();
                msg.Message = ds.Tables[0].Rows[i]["Message"].ToString();
                msg.Sender = ds.Tables[0].Rows[i]["Sender"].ToString();
                msg.Subject = ds.Tables[0].Rows[i]["Subject"].ToString();
                msg.Status = ds.Tables[0].Rows[i]["Status"].ToString();

                msg.ID = ds.Tables[0].Rows[i]["Status"].ToString();
                msg.FilePath = FilePath + ds.Tables[0].Rows[i]["FilePath"].ToString();
                msg.FileName = ds.Tables[0].Rows[i]["FileName"].ToString();


                if (ds.Tables[0].Rows[i]["Sender"].ToString() == "Franchisee")
                {
                    string firmName = "";
                    firmName += "SELECT FirmName FROM franchiseemaster WHERE FranchiseeID='" + ds.Tables[0].Rows[i]["Sender_Id"].ToString() + "'";
                    msg.Sender_Name = da.getString(firmName);
                }
                else if (ds.Tables[0].Rows[i]["Sender"].ToString() == "Staff")
                {
                    string MemberName = "";
                    MemberName += "SELECT MemberName FROM franchiseestaffdetails WHERE StaffID='" + ds.Tables[0].Rows[i]["Sender_Id"].ToString() + "'";
                    msg.Sender_Name = da.getString(MemberName);
                }


                li.Add(msg);
            }
        }
        return li.ToArray();
    }



    public GetMsgFullDetail[] GetSendMessageDetails(string str)
    {
        List<GetMsgFullDetail> li = new List<GetMsgFullDetail>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                GetMsgFullDetail msg = new GetMsgFullDetail();
                msg.MessageID = ds.Tables[0].Rows[i]["MessageID"].ToString();
                msg.Date_Time = ds.Tables[0].Rows[i]["DateTime"].ToString();
                //msg.FileTransactionID = ds.Tables[0].Rows[i]["FileTransactionID"].ToString();
                msg.MessageType = ds.Tables[0].Rows[i]["MessageType"].ToString();
               // msg.FranchiseeID = ds.Tables[0].Rows[i]["FranchiseeID"].ToString();
               // msg.StaffId = ds.Tables[0].Rows[i]["StaffId"].ToString();
                //msg.ClientId = ds.Tables[0].Rows[i]["ClientId"].ToString();
                msg.Message = ds.Tables[0].Rows[i]["Message"].ToString();
                //msg.Sender = ds.Tables[0].Rows[i]["Sender"].ToString();
                msg.Subject = ds.Tables[0].Rows[i]["Subject"].ToString();
                msg.Status = ds.Tables[0].Rows[i]["Status"].ToString();
                msg.Receiver = ds.Tables[0].Rows[i]["EmpName"].ToString();
                //msg.ID = ds.Tables[0].Rows[i]["Status"].ToString();
                msg.FilePath = FilePath + ds.Tables[0].Rows[i]["FilePath"].ToString();
                msg.FileName = ds.Tables[0].Rows[i]["FileName"].ToString();


                li.Add(msg);
            }
        }
        return li.ToArray();
    }



    public GetMsgFullDetail[] GetSendHeadOfficeMessageDetails(string str)
    {
        List<GetMsgFullDetail> li = new List<GetMsgFullDetail>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                GetMsgFullDetail msg = new GetMsgFullDetail();
                msg.MessageID = ds.Tables[0].Rows[i]["MessageID"].ToString();
                msg.Date_Time = ds.Tables[0].Rows[i]["DateTime"].ToString();
                msg.MessageType = ds.Tables[0].Rows[i]["MessageType"].ToString();
                msg.Message = ds.Tables[0].Rows[i]["Message"].ToString();
                msg.Subject = ds.Tables[0].Rows[i]["Subject"].ToString();
                msg.Status = ds.Tables[0].Rows[i]["Status"].ToString();
                msg.Receiver = ds.Tables[0].Rows[i]["EmpName"].ToString();
                msg.FilePath = FilePath + ds.Tables[0].Rows[i]["FilePath"].ToString();
                msg.FileName = ds.Tables[0].Rows[i]["FileName"].ToString();


                string receivers = ds.Tables[0].Rows[i]["Receiver_Id"].ToString();
                string[] sepreceivers = Regex.Split(receivers, ",");
                string MultipalName = "";
                for (int j = 0; j < sepreceivers.Length; j++)
                {
                    string firmName = "";
                    firmName += "SELECT FirmName FROM franchiseemaster WHERE FranchiseeID='" + sepreceivers[j].ToString() + "'";
                    MultipalName += da.getString(firmName) + " , ";
                }
                MultipalName = MultipalName.TrimEnd(' ');
                msg.Receiver = MultipalName.TrimEnd(',');


                li.Add(msg);
            }
        }
        return li.ToArray();
    }






    public MasterPageMsg[] GetUnreadMessage(string str)
    {
        List<MasterPageMsg> li = new List<MasterPageMsg>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                MasterPageMsg CM = new MasterPageMsg();

                CM.Id = ds.Tables[0].Rows[i]["MessageID"].ToString();
                CM.Sender_Name = ds.Tables[0].Rows[i]["Sender"].ToString();
                CM.Subject = ds.Tables[0].Rows[i]["Subject"].ToString();
                //CM.Date = Convert.ToDateTime(ds.Tables[0].Rows[i]["DateTime"]).ToString("dd/MM/yyyy hh:mm:ss tt");
                CM.Date =ds.Tables[0].Rows[i]["DateTime"].ToString();
                //CM.Time = ds.Tables[0].Rows[i]["MTime"].ToString();

                li.Add(CM);
            }
        }
        return li.ToArray();
    }

}