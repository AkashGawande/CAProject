using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text.RegularExpressions;

public partial class Head_Office_TDSReturnFiles : System.Web.UI.Page
{
    static DataAccess da = new DataAccess();
    static string Client_Id = "";
    static ImageUpload IU = new ImageUpload();
    static string FileTransaction_ID = "";    
    static string Franchisee_Id = "";
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

    //===================Start Get TDS Files==========================
    [WebMethod]
    public static TDSList[] GetTDSFiles(string StaffId)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "SELECT tm.*,cm.* FROM tdsmaster tm LEFT JOIN clienttanmaster cm ON tm.clientid=cm.clientid where tm.FranchiseeID='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "' and tm.StaffID='" + StaffId + "' order by tm.FileTransactionID desc";
        TDSList[] md = Contl.GetTDSFile(str);
        return md.ToArray();
    }
    //===================End Get TDS Files List==========================
    //===================Start View TDS File Details==========================
    [WebMethod]
    public static TDSList[] ViewModelBox(string FileTransactionID)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";      
        str += "SELECT tm.*,cm.*,cp.*,sm.StateName FROM tdsmaster tm ";
        str += "LEFT JOIN clienttanmaster cm ON tm.ClientID=cm.ClientID ";
        str += "LEFT JOIN clienttancontactpersons cp ON tm.ClientID=cp.ClientID ";
        str += "LEFT JOIN state_master sm ON cm.StateCode=sm.StateCode ";
        str += "where tm.FileTransactionID='" + FileTransactionID + "'";

        TDSList[] md = Contl.GetTDSFileDetails(str);
        return md.ToArray();
    }
    //===================End View TDS File Details==========================
    //===================Start View TDS File Documents==========================
    [WebMethod]
    public static TDSList[] ViewDocumentsModelBox(string FileTransactionID)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT * FROM tdsdocuments WHERE FileTransactionID='" + FileTransactionID + "' ";

        TDSList[] md = Contl.GetTDSFileDocuments(str);
        return md.ToArray();
    }
    //===================End View TDS File Documents==========================

    //=====================Start Send Message to Franchisee=================================
    [WebMethod]
    public static string SaveMasterData(string FileTransactionID, string FranchiseeID, string ClientId, string Subject, string Message)
    {
        bool b = false;
        string str = "";
        try
        {
            FileTransaction_ID = FileTransactionID;
            str += "insert into messagemaster(FileTransactionID,FranchiseeID,ClientId,Subject,Message,Sender,Status) ";
            str += "values ('" + FileTransactionID + "','" + FranchiseeID + "','" + ClientId + "','" + Subject + "','" + Message.Trim() + "','Head Office','UnRead')";
            b = da.insertUpdate(str);
        }
        catch (Exception ex)
        {

        }

        if (b)
            //return "Record Added SuccessFully..!";
            return FileTransaction_ID;
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
                string stt = "Select MessageID from messagemaster where FileTransactionID='" + FileTransaction_ID + "' order by MessageID desc";
                int mID = da.getInt(stt);

                if (data.FilePath != "" && data.PhotoName != "")
                {
                    string photoName = "M"+mID+"_"+ data.FileName.Replace(" ", "_");
                    //--------------Start Photo Name Changing Section---------------------
                    NewPhotoImageName = IU.changePhotoName(data.PhotoName, photoName);
                    //--------------End Photo Name Changing Section---------------------
                }

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

    //===================Start Get Contact Person for DropDown==========================
    [WebMethod]
    public static TDSList[] GetTDSPersonMobile(string PersonId)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT * from clienttancontactpersons where PersonID=" + PersonId + "";

        TDSList[] md = Contl.GetTDSMobile(str);
        return md.ToArray();
    }
    //===================End Get Contact Person for DropDown==========================


    //------------------------------Start Update IT Client Master Data---------------------------------------------
    [WebMethod]
    //public static string UpdateITClientMasterData(string FileTransactionID, string ClientID, string ApplicantName, string ApplicantFatherName, string ApplicantAddress, string PinCode, string BirthDate, string ApplicantMobileNo, string ApplicantEmailID, string State, string Citizenship, string EmployedType, string AadharNumber, string ITDPortalPassword, string AccountNo, string IFSC, string YearType, string Year, string PaymentMode, string Amount, string DueDate, string ChequeNo, string Narration, string Status)
    public static string UpdateTDSClientMasterData(string FileTransactionID, string ClientID, string ContactPersone, string TypesOfRetutn, string Quarter, string PaymentMode, string Amount, string DueDate, string ChequeNo, string Narration, string PhotoPath, string PhotoName,string Sfilename, string Status)
    {
        bool b = false;
        bool c = false;
        string str = "";
        string NewChequeName = "";
        try
        {

            if (PhotoPath != "" && PhotoName != "") { string photoName = "TDS" + FileTransactionID + "_Cheque"; NewChequeName = IU.changePhotoName(PhotoName, photoName); }
            //else { NewChequeName = Sfilename; }
            else if (ChequeNo != "" && Narration != "" && PhotoPath == "" && PhotoName == "" && Sfilename != "") { NewChequeName = Sfilename; }
            else { NewChequeName = ""; }



            str += "update tdsmaster set PersonId=" + ContactPersone + ",TypesOfReturn='" + TypesOfRetutn + "',QuarterlyReturn='" + Quarter + "' ";
            str += "where FileTransactionID=" + FileTransactionID + " and ClientID='" + ClientID + "'";

            if (b = da.insertUpdate(str))
            {
                string str1 = "";
                DateTime duedate ;
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
                    str1 = "Update tdsmaster set PaymentMode='" + PaymentMode + "',Amount='" + Amount + "',DueDate='" + DueDate + "',ChequeNo='" + ChequeNo + "',Narration='" + Narration + "',ChequeFileName='"+NewChequeName+"',PaymentStatus='UnPaid' where FileTransactionID=" + FileTransactionID + "";
                }
                else if (PaymentMode == "Cheque")
                {
                    str1 = "Update tdsmaster set PaymentMode='" + PaymentMode + "',Amount='" + Amount + "',DueDate='" + DueDate + "',ChequeNo='" + ChequeNo + "',Narration='" + Narration + "',ChequeFileName='" + NewChequeName + "',PaymentStatus='Paid' where FileTransactionID=" + FileTransactionID + "";
                }
                else if (PaymentMode == "CASH")
                {
                    str1 = "Update tdsmaster set PaymentMode='" + PaymentMode + "',Amount='" + Amount + "',DueDate='" + DueDate + "',ChequeNo='" + ChequeNo + "',Narration='" + Narration + "',ChequeFileName='" + NewChequeName + "',PaymentStatus='Paid' where FileTransactionID=" + FileTransactionID + "";
                }
                c = da.insertUpdate(str1);
            }
        }
        catch (Exception ex)
        {

        }

        if (b == true && c == true)
        {
            if (ChequeNo == "" && Narration == "" && PhotoName == "" && PhotoName == "" && Sfilename != "")
            {
                string filePath = HttpContext.Current.Server.MapPath("~/Documents/" + Sfilename);
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
            }


            if (PhotoName != "" && PhotoPath != "") { c = IU.UploadFile(PhotoPath, NewChequeName); }

            return "Record Updated SuccessFully..!";
        }
        //return Client_Id;
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Update IT Client Master Data---------------------------------------------
}