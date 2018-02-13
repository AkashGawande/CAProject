using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using Newtonsoft.Json;
using System.Data;
using MySql.Data.MySqlClient;
using System.Text.RegularExpressions;

public partial class Head_Office_ClientsList : System.Web.UI.Page
{
    static DataAccess da = new DataAccess();
  
    static ImageUpload IU = new ImageUpload();
    static string Franchisee_Id = "";
    //static string Staff_Id = "";
    static string Role = "";
    static string Client_Id = "";
    static string FileTransaction_Id = "";
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
                Franchisee_Id =  HttpContext.Current.Session["FranchiseeID"].ToString();                
                Role = HttpContext.Current.Session["Role"].ToString();
            }
        }
        catch (Exception ex)
        {
            Response.Redirect("../Login.aspx");

        }

    }

    //===================Start Bind EmployeeID==========================
    [WebMethod]
    public static BindEmpDropDown[] BindEmployeeID()
    {
        ClientController Contl = new ClientController();
        string str = "";
        str += "SELECT StaffID,MemberName FROM franchiseestaffdetails where FranchiseeID='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "' and Status='Active'";

        BindEmpDropDown[] md = Contl.GetEmployeeDDL(str);
        return md.ToArray();
    }
    //===================End Bind EmployeeID==========================




    //===================Start Get IT Files==========================
    [WebMethod]
    public static ITFiles[] GetITFiles(string StaffId)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "SELECT im.*,pm.* FROM itmaster im LEFT JOIN clientpanmaster pm ON im.ClientID=pm.ClientID WHERE im.FranchiseeID='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "' and im.StaffID='" + StaffId + "' ORDER BY im.Date DESC";
        ITFiles[] md = Contl.GetITFile(str);
        return md.ToArray();
    }
    //===================End Get IT Files List==========================

    //===================Start View IT File Details==========================
    [WebMethod]
    public static ITFiles[] ViewModelBox(string FileTransactionID)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";

        str += "SELECT im.*,pm.*,pa.*,ip.* FROM itmaster im ";
        str += "LEFT JOIN clientpanmaster pm ON im.ClientID=pm.ClientID ";
        str += "LEFT JOIN clientpanaccounts pa ON im.ClientID=pa.ClientID ";
        str += "LEFT JOIN itpayment ip ON im.FileTransactionID=ip.FileTransactionID ";
        str += "WHERE im.FileTransactionID='" + FileTransactionID + "' ";


        ITFiles[] md = Contl.GetITFileDetails(str);
        return md.ToArray();
    }
    //===================End View IT File Details==========================

    //===================Start View IT File Documents==========================
    [WebMethod]
    public static ITFiles[] ViewDocumentsModelBox(string FileTransactionID)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT * FROM itdocuments WHERE FileTransactionID='" + FileTransactionID + "' ";

        ITFiles[] md = Contl.GetITFileDocuments(str);
        return md.ToArray();
    }
    //===================End View IT File Documents==========================

    //=====================Start Send Message to Franchisee=================================
    [WebMethod]
    public static string SaveMasterData(string FileTransactionID, string FranchiseeID, string ITStaffId, string ClientId, string Subject, string Message)
    {
        bool b = false;
        string str = "";
        try
        {
            FileTransaction_Id = FileTransactionID;
            str += "insert into messagemaster(FileTransactionID,DateTime,MessageType,FranchiseeID,ClientId,StaffId,Subject,Message,Sender,Status) ";
            str += "values (" + FileTransactionID + ",'" + DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss tt") + "','IT File','" + FranchiseeID + "','" + ClientId + "','" + ITStaffId + "','" + Subject + "','" + Message.Trim() + "','Head Office','UnRead')";
            b = da.insertUpdate(str);
        }
        catch (Exception ex)
        {

        }

        if (b)
            //return "Record Added SuccessFully..!";
            return FileTransaction_Id;
        else
            return "Record Not Added ..?";
    }
    //=================================End Send Message to Franchisee===============================

    //==============================Start Send Attachments into MEssage Details=======================================  
    [WebMethod]
    public static string SaveDetails(string AllAttachment)
    {
        bool b = false;
        bool c = false;
        string NewPhotoImageName = "";
        try
        {
            var serializeData = JsonConvert.DeserializeObject<List<ITClientList>>(AllAttachment);
            foreach (var data in serializeData)
            {

                //Client_Id = data.ClientId;
                string stt = "Select MessageID from messagemaster where FileTransactionID='" + FileTransaction_Id + "' order by MessageID desc";
                int mID = da.getInt(stt);

                if (data.FilePath != "" && data.PhotoName != "")
                {   
                    string photoName = data.FileName.Replace(" ", "_") + "_" + mID;
                    //--------------Start Photo Name Changing Section---------------------
                    NewPhotoImageName = IU.changePhotoName(data.PhotoName, photoName);
                    //--------------End Photo Name Changing Section---------------------

                    string str = "insert into messagedetails(MessageID, FilePath, FileName)values(@MessageID, @FilePath, @FileName)";
                    MySqlCommand cmd = new MySqlCommand(str);
                    cmd.Parameters.Add("@MessageID", MySqlDbType.Int32).Value = mID;
                    cmd.Parameters.Add("@FilePath", MySqlDbType.VarChar).Value = NewPhotoImageName;
                    cmd.Parameters.Add("@FileName", MySqlDbType.VarChar).Value = data.FileName;

                    b = da.InsertUpdateData(cmd);

                    if (data.FilePath != "" && data.PhotoName != "")
                    {
                        //--------------Start Photo Uploading Section---------------------
                        c = IU.UploadFile(data.FilePath, NewPhotoImageName);
                        //--------------End Photo Uploading Section---------------------  
                    }
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
            return Client_Id;
        else
            return "Record Not Added ..?";
    }
    //=========================End Send Attachments into MEssage Details=========================================== 


    //===================Start Get IFSC Code==========================
    [WebMethod]
    public static ITFiles[] GetITIFSC(string AccountId)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT IFSC FROM clientpanaccounts WHERE AccountId=" + AccountId + "";

        ITFiles[] md = Contl.GetITIFSCCode(str);
        return md.ToArray();
    }
    //===================End Get IFSC Code==========================

    ////------------------------------Start Update IT Client Master Data---------------------------------------------
    //[WebMethod]
    //public static string UpdateITClientMasterData(string FileTransactionID, string ClientID, string AccountID, string YearType, string Year, string PaymentMode, string Amount, string DueDate, string ChequeNo, string Narration, string Status)
    //{
    //    bool b = false;
    //    bool c = false;
    //    string str = "";
    //    try
    //    {
    //        str += "update itmaster set AccountID=" + AccountID + ",YearType='" + YearType + "',Year='" + Year + "' where FileTransactionID=" + FileTransactionID + " and ClientID='" + ClientID + "'";
           
    //        if (b = da.insertUpdate(str))
    //        {
    //            string str1 = "";
    //            string duedate="";
    //            if (PaymentMode == "Credit")
    //            {
    //                if(DueDate!=""){
    //                    duedate=Convert.ToDateTime(DueDate).ToString("yyyy-MM-dd");
    //                }
    //                str1 = "Update itpayment set PaymentMode='" + PaymentMode + "',Amount='" + Amount + "',DueDate='" + duedate + "',PaymentStatus='UnPaid' where FileTransactionID=" + FileTransactionID + "";
    //            }
    //            else if(PaymentMode=="Cheque")
    //            {
    //                str1 = "Update itpayment set PaymentMode='" + PaymentMode + "',Amount='" + Amount + "',ChequeNo='" + ChequeNo + "',Narration='" + Narration + "',PaymentStatus='Paid' where FileTransactionID=" + FileTransactionID + "";
    //            }
    //            else if (PaymentMode == "CASH")
    //            {
    //                str1 = "Update itpayment set PaymentMode='" + PaymentMode + "',Amount='" + Amount + "',PaymentStatus='Paid' where FileTransactionID=" + FileTransactionID + "";
    //            }
    //            c = da.insertUpdate(str1);
    //        }
    //    }
    //    catch (Exception ex)
    //    {

    //    }

    //    if (b==true && c==true)
    //        return "Record Added SuccessFully..!";
    //    //return Client_Id;
    //    else
    //        return "Record Not Added ..?";
    //}
    ////------------------------------End Update IT Client Master Data---------------------------------------------



    //------------------------------Start Update IT Client Master Data---------------------------------------------
    [WebMethod]
    public static string UpdateITClientMasterData(string FileTransactionID, string ClientID, string AccountID, string YearType, string Year, string PaymentMode, string Amount, string DueDate, string ChequeNo, string Narration, string PhotoSource, string FileName, string Sfilename, string Status)
    {
        bool b = false;
        bool c = false;
        string str = "";
        string NewChequeName = "";
        try
        {
            if (PhotoSource != "" && FileName != "") { string photoName = "IT" + FileTransactionID + "_Cheque"; NewChequeName = IU.changePhotoName(FileName, photoName); }
            else if (ChequeNo != "" && Narration != "" && PhotoSource == "" && FileName == "" && Sfilename != "") { NewChequeName = Sfilename; }
            else { NewChequeName = ""; }


            str += "update itmaster set AccountID=" + AccountID + ",YearType='" + YearType + "',Year='" + Year + "' where FileTransactionID=" + FileTransactionID + " and ClientID='" + ClientID + "'";

            if (b = da.insertUpdate(str))
            {
                string str1 = "";
                DateTime duedate;
                if (PaymentMode == "Credit")
                {
                    if (DueDate != "")
                    {
                        string[] dt = Regex.Split(DueDate, "-");
                        int d = Convert.ToInt32(dt[0]);
                        int m = Convert.ToInt32(dt[1]);
                        int y = Convert.ToInt32(dt[2]);
                        duedate = new DateTime(y, m, d);
                        DueDate = Convert.ToDateTime(duedate).ToString("yyyy-MM-dd");
                    }
                    str1 = "Update itpayment set PaymentMode='" + PaymentMode + "',Amount='" + Amount + "',DueDate='" + DueDate + "',ChequeNo='" + ChequeNo + "',Narration='" + Narration + "',ChequeFileName='" + NewChequeName + "',PaymentStatus='UnPaid' where FileTransactionID=" + FileTransactionID + "";
                }
                else if (PaymentMode == "Cheque")
                {
                    str1 = "Update itpayment set PaymentMode='" + PaymentMode + "',Amount='" + Amount + "',DueDate='" + DueDate + "',ChequeNo='" + ChequeNo + "',Narration='" + Narration + "',ChequeFileName='" + NewChequeName + "',PaymentStatus='Paid' where FileTransactionID=" + FileTransactionID + "";
                }
                else if (PaymentMode == "CASH")
                {
                    str1 = "Update itpayment set PaymentMode='" + PaymentMode + "',Amount='" + Amount + "',DueDate='" + DueDate + "',ChequeNo='" + ChequeNo + "',Narration='" + Narration + "',ChequeFileName='" + NewChequeName + "',PaymentStatus='Paid' where FileTransactionID=" + FileTransactionID + "";
                }
                c = da.insertUpdate(str1);
            }
        }
        catch (Exception ex)
        {

        }

        if (b == true && c == true)
        {
            if (ChequeNo == "" && Narration == "" && PhotoSource == "" && FileName == "" && Sfilename != "")
            {
                string filePath = HttpContext.Current.Server.MapPath("~/Documents/" + Sfilename);
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
            }


            if (PhotoSource != "" && FileName != "") { c = IU.UploadFile(PhotoSource, NewChequeName); }
            return "Record Added SuccessFully..!";
            //return Client_Id;
        }
        else
        {
            return "Record Not Added ..?";
        }

    }
    //------------------------------End Update IT Client Master Data---------------------------------------------
}