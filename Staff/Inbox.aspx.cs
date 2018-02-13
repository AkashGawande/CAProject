using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using MySql.Data.MySqlClient;
using System.Web.Services;
using Newtonsoft.Json;
public partial class Staff_Inbox : System.Web.UI.Page
{

    static DataAccess da = new DataAccess();
    static ImageUpload IU = new ImageUpload();
    //static string Franchisee_Id="BIPPG0355Q";
    static string Franchisee_Id = "";
    static string Staff_Id = "";
    static string Role = "";
    static string Client_Id = "";
    static int i = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (HttpContext.Current.Session["FranchiseeID"] == null)
            {
                Response.Redirect("../Login.aspx");

            }
            else
            {

                Franchisee_Id = HttpContext.Current.Session["FranchiseeID"].ToString();
                Staff_Id = HttpContext.Current.Session["StaffID"].ToString();
                Role = HttpContext.Current.Session["Role"].ToString();
            }
        }
        catch (Exception ex)
        {
            Response.Redirect("../Login.aspx");

        }
    }


    //============================================Start Get Session Status ============================================
    [WebMethod]
    public static string GetSessionStatus()
    {
        string sessionvalue = "";
        try
        {
            if (HttpContext.Current.Session["FranchiseeID"].ToString() != "")
            {
                sessionvalue = HttpContext.Current.Session["FranchiseeID"].ToString();
            }
        }
        catch (Exception ex)
        {
            sessionvalue = "";
        }
        return sessionvalue;
    }

    //============================================End Get Session Status.3============================================



    //======================Start Showing Staff Inbox Messages===============================
    [WebMethod]
    public static GetMsgFullDetail[] ShowMsg()
    {
        Messenger_Controller Contl = new Messenger_Controller();
        string str = "   ";

        str += "SELECT COUNT(MD.MessageID)AS FileCount,MM.MessageID,MM.FileTransactionID,MM.DateTime,MM.MessageType,";
        str += "MM.FranchiseeID,MM.ClientId,MM.StaffId,MM.Subject,MM.Message,MM.Sender,MM.Sender_Id,MM.Status,FSM.MemberName ";
        str += "FROM messagemaster MM LEFT JOIN messagedetails MD ON MM.MessageID= MD.MessageID ";
        str += "LEFT JOIN franchiseestaffdetails FSM ON MM.StaffId= FSM.StaffId ";
        str += "WHERE MM.StaffId='" + HttpContext.Current.Session["StaffID"].ToString() + "' AND MM.Receiver_Id='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "' AND MM.DeleteStatus!='DeletedFromInbox' ";
        str += "GROUP BY MM.MessageID,MM.FileTransactionID,MM.DateTime,MM.MessageType,MM.FranchiseeID,MM.ClientId,";
        str += "MM.StaffId,MM.Subject,MM.Message,MM.Sender,MM.Sender_Id,MM.Status,FSM.MemberName";
        //str += "order by MM.Status desc ";

        GetMsgFullDetail[] ObjMsg = Contl.GetallMsgDetl(str);
        return ObjMsg;
    }
    //======================End Showing Staff Inbox Messages===============================


    //======================Start Showing Staff Send Messages===============================
    [WebMethod]
    public static GetMsgFullDetail[] ShowSentMsg()
    {
        Messenger_Controller Contl = new Messenger_Controller();
        string str = "   ";

        str += "SELECT COUNT(MD.MessageID)AS FileCount,MM.MessageID,MM.FileTransactionID,MM.DateTime,MM.MessageType,";
        str += "MM.FranchiseeID,MM.ClientId,MM.StaffId,MM.Subject,MM.Message,MM.Sender,MM.Status,EM.EmpName ";
        str += "FROM messagemaster MM LEFT JOIN messagedetails MD ON MM.MessageID= MD.MessageID ";
        str += "LEFT JOIN employeemaster EM ON MM.Receiver_Id=EM.EmpId ";
        str += "WHERE MM.Sender_Id='" + HttpContext.Current.Session["StaffID"].ToString() + "' AND MM.Sender='Staff' AND MM.DeleteStatus!='DeletedFromSentBox' ";
        str += "GROUP BY MM.MessageID,MM.FileTransactionID,MM.DateTime,MM.MessageType,MM.FranchiseeID,MM.ClientId,";
        str += "MM.StaffId,MM.Subject,MM.Message,MM.Sender,MM.Status,EM.EmpName ";


        //str += "order by MM.Status desc ";

        GetMsgFullDetail[] ObjMsg = Contl.GetallSendMsgDetl(str);
        return ObjMsg;
    }
    //======================End Showing Staff Send Messages===============================



    //======================Start Showing Staff Inbox Messages Details===============================
    [WebMethod]
    public static GetMsgFullDetail[] ReadMessage(string Msg_Id)
    {
        string str = "update messagemaster set Status='Read' where MessageID='" + Msg_Id + "'";
        MySqlCommand cmd = new MySqlCommand(str);
        da.InsertUpdateData(cmd);

        Messenger_Controller Contl = new Messenger_Controller();
        string str1 = " SELECT MM.*,MD.ID,MD.FilePath,MD.FileName FROM messagemaster MM LEFT JOIN messagedetails MD ON MM.MessageID= MD.MessageID  where MM.MessageID='" + Msg_Id + "'";
        GetMsgFullDetail[] ObjCM = Contl.GetMessageDetails(str1);
        return ObjCM;
    }
    //======================End Showing Staff Inbox Messages Details===============================


    //======================Start Showing Staff Send Messages Details===============================
    [WebMethod]
    public static GetMsgFullDetail[] ShowSendMsgDetail(string Msg_Id)
    {
       
        Messenger_Controller Contl = new Messenger_Controller();
        string str1 = "";

        str1 += "SELECT MM.*,MD.ID,MD.FilePath,MD.FileName,EM.EmpName FROM messagemaster MM LEFT JOIN messagedetails MD ON MM.MessageID= MD.MessageID ";
        str1 += " LEFT JOIN employeemaster EM ON MM.Receiver_Id=EM.EmpId ";
        str1 += "where MM.MessageID='" + Msg_Id + "'";
        GetMsgFullDetail[] ObjCM = Contl.GetSendMessageDetails(str1);
        return ObjCM;
    }
    //======================End Showing Staff Send Messages Details===============================


    //===================Start Bind  Admin   Name==========================
    [WebMethod]
    public static EmployeeData[] BindAdminName()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT EmpId,EmpName FROM employeemaster where Status='Active' AND Designation='Admin'";

        EmployeeData[] md = Contl.GetHeadOfficeName(str);
        return md.ToArray();
    }
    //===================End Bind  Admin Name==========================


    //=====================Start Send Message to HeadOffice=================================
    [WebMethod]
    public static string SendMasterData(string IDs, string Subject, string Message)
    {
        string datetime = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss tt");
        bool b = false;
        string str = "";
        try
        {
            //Client_Id = ClientId;
            str += "insert into messagemaster(DateTime,MessageType,Receiver_Id,Subject,Message,Sender,Sender_Id,Status,DeleteStatus) ";
            str += "values ('" + datetime + "','Direct','" + IDs + "','" + Subject + "','" + Message.Trim() + "','Staff','" + HttpContext.Current.Session["StaffID"].ToString()+"','UnRead','Active')";
            b = da.insertUpdate(str);
        }
        catch (Exception ex)
        {

        }

        if (b)
        {
            string stt = "Select Max(MessageID) from messagemaster";
            int mID = da.getInt(stt);

            return mID.ToString();
        }

            
        else
            return "Record Not Added ..?";
    }
    //=================================End Send Message to HeadOffice===============================


    //==============================Start Send Attachments into MEssage Details=======================================  
    [WebMethod]
    public static string SaveSendDetails(string AllAttachment)
    {
        bool b = false;
        bool c = false;
        string NewPhotoImageName = "";
        string MID = "";
        try
        {
            var serializeData = JsonConvert.DeserializeObject<List<ITClientList>>(AllAttachment);
            foreach (var data in serializeData)
            {
                MID = data.MessageID;
                if (data.FilePath != "" && data.PhotoName != "")
                {
                    string photoName ="Staff"+da.generatepassword(6)+"_" + data.MessageID;
                    //--------------Start Photo Name Changing Section---------------------
                    NewPhotoImageName = IU.changePhotoName(data.PhotoName, photoName);
                    //--------------End Photo Name Changing Section---------------------

                    string str = "insert into messagedetails(MessageID, FilePath, FileName)values(@MessageID, @FilePath, @FileName)";
                    MySqlCommand cmd = new MySqlCommand(str);
                    cmd.Parameters.Add("@MessageID", MySqlDbType.Int32).Value = data.MessageID;
                    cmd.Parameters.Add("@FilePath", MySqlDbType.VarChar).Value = NewPhotoImageName;
                    cmd.Parameters.Add("@FileName", MySqlDbType.VarChar).Value = "Img" + da.generatepassword(4) + "_" + data.MessageID; ;

                    b = da.InsertUpdateData(cmd);

                    //--------------Start Photo Uploading Section---------------------
                    c = IU.UploadFile(data.FilePath, NewPhotoImageName);
                    //--------------End Photo Uploading Section---------------------  
                }
                else
                {
                    b = true;
                }
            }
        }
        catch (Exception ex)
        {

        }
        if (b)
            //return "Record Added SuccessFully..!";
            return MID;
        else
            return "Record Not Added ..?";
    }
    //=========================End Send Attachments into MEssage Details=========================================== 




    //=====================Start Delete Message From Inbox And SentBox=================================
    [WebMethod]
    public static string DeleteMessages(string AllIds)
    {
        bool b = false;
        string str = "";
         var serializeData = JsonConvert.DeserializeObject<List<ITClientList>>(AllIds);
         foreach (var data in serializeData)
         {
             str = "";

             string stt = "Select DeleteStatus from messagemaster where MessageID=" + data.MessageID + "";
             string DeleteStaus = da.getString(stt);

             if(DeleteStaus=="Active")
             {
                 if(data.BoxType=="InboxDelete")
                 {                     
                     str += "update messagemaster set DeleteStatus='DeletedFromInbox' where MessageID=" + data.MessageID + "";                    
                 }
                 else if (data.BoxType == "SentboxDelete")
                 {                     
                     str += "update messagemaster set DeleteStatus='DeletedFromSentBox' where MessageID=" + data.MessageID + "";
                 }
             }
             else if (DeleteStaus != "Active")
             {
                 str += "delete from messagemaster where MessageID=" + data.MessageID + "";
             }
             
             MySqlCommand cmd = new MySqlCommand(str);
             b = da.InsertUpdateData(cmd);
             
         }
            
   
        if(b)
        {
            return "Deleted...!";
        }
        else
        {
            return "Failed...!";
        }
    }
    //=================================End Delete Message From Inbox And SentBox===============================





}