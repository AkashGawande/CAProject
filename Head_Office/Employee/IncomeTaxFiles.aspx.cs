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
    static string Client_Id = "";
    static string FileTransaction_ID = "";
    static int i = 0;
    static DateTime Duedate;
    static string NewChequeName = "";
    static string Emp_Id = "";
    static string Role = "";
    protected void Page_Load(object sender, EventArgs e)
    {
        //try
        //{
        //    if (HttpContext.Current.Session["EmpId"] == null)
        //    {
        //        Response.Redirect("../Login.aspx");
        //        //_password = Session["Password"].ToString();
        //    }
        //}
        //catch (Exception ex)
        //{
        //    Response.Redirect("../../Login.aspx");

        //}
        try
        {
            if (HttpContext.Current.Session["EmpId"] == null)
            {
                Response.Redirect("../../Login.aspx");

            }
            else
            {

                Emp_Id = HttpContext.Current.Session["EmpId"].ToString();
                Role = HttpContext.Current.Session["Designation"].ToString();
            }
        }
        catch (Exception ex)
        {
            Response.Redirect("../../Login.aspx");

        }

    }

    //===================Start Get IT Files==========================
    [WebMethod]
    public static ITFiles[] GetITFiles(string StartDate, string EndDate, string SearchText, string FileStatus)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";

        
        
         if (FileStatus == "Assigned" && StartDate == "" && EndDate == "")
        {
            str += "SELECT im.*,pm.*,em.EmpName,fs.Email FROM itmaster im ";
            str += "LEFT JOIN clientpanmaster pm ON im.ClientID=pm.ClientID ";
            str += "LEFT JOIN employeemaster em ON im.AssignedTo=em.EmpId ";
            str += "LEFT JOIN franchiseestaffdetails fs ON im.StaffID=fs.StaffID ";
            str += "WHERE em.EmpId='" + HttpContext.Current.Session["EmpId"].ToString() + "' AND ";
            str += "(im.FranchiseeID like '%" + SearchText + "%' or YearType like '%" + SearchText + "%' or ";
            str += "Year like '%" + SearchText + "%' or ApplicantName like '%" + SearchText + "%' or ApplicantMobileNo like '%" + SearchText + "%' or ";
            str += "EmpName like '%" + SearchText + "%') AND im.FileStatus LIKE '%Assigned%' ORDER BY im.AssignedDate DESC";
        }
        else if (FileStatus == "Assigned" && StartDate != "" && EndDate != "")
        {
            str += "SELECT im.*,pm.*,em.EmpName,fs.Email FROM itmaster im ";
            str += "LEFT JOIN clientpanmaster pm ON im.ClientID=pm.ClientID ";
            str += "LEFT JOIN employeemaster em ON im.AssignedTo=em.EmpId ";
            str += "LEFT JOIN franchiseestaffdetails fs ON im.StaffID=fs.StaffID ";
            str += "WHERE em.EmpId='" + HttpContext.Current.Session["EmpId"].ToString() + "' AND ";
            str += "(im.FranchiseeID like '%" + SearchText + "%' or YearType like '%" + SearchText + "%' or ";
            str += "Year like '%" + SearchText + "%' or ApplicantName like '%" + SearchText + "%' or ApplicantMobileNo like '%" + SearchText + "%' or ";
            str += "EmpName like '%" + SearchText + "%') AND im.FileStatus LIKE '%Assigned%' AND ";
            str += "(im.AssignedDate BETWEEN '" + Convert.ToDateTime(StartDate).ToString("yyyy-MM-dd") + "' AND '" + Convert.ToDateTime(EndDate).ToString("yyyy-MM-dd") + "') ORDER BY im.AssignedDate DESC";
        }
         if (Regex.Split(FileStatus,",")[0] == "Verified" && StartDate == "" && EndDate == "")
         {
             if (Regex.Split(FileStatus, ",")[1]=="0")
             {
                 str += "SELECT im.*,pm.*,em.EmpName,fs.Email FROM itmaster im ";
                 str += "LEFT JOIN clientpanmaster pm ON im.ClientID=pm.ClientID ";
                 str += "LEFT JOIN employeemaster em ON im.AssignedTo=em.EmpId ";
                 str += "LEFT JOIN franchiseestaffdetails fs ON im.StaffID=fs.StaffID ";
                 str += "WHERE em.EmpId='" + HttpContext.Current.Session["EmpId"].ToString() + "' AND ";
                 str += "(im.FranchiseeID like '%" + SearchText + "%' or YearType like '%" + SearchText + "%' or ";
                 str += "Year like '%" + SearchText + "%' or ApplicantName like '%" + SearchText + "%' or ApplicantMobileNo like '%" + SearchText + "%' or ";
                 str += "EmpName like '%" + SearchText + "%' or FileStatus like '%" + SearchText + "%') AND im.FileStatus LIKE '%Verified%' OR im.FileStatus LIKE '%Completed%' ORDER BY im.VerifiedDate DESC";
             }
             else 
             {
                 str += "SELECT im.*,pm.*,em.EmpName,fs.Email FROM itmaster im ";
                 str += "LEFT JOIN clientpanmaster pm ON im.ClientID=pm.ClientID ";
                 str += "LEFT JOIN employeemaster em ON im.AssignedTo=em.EmpId ";
                 str += "LEFT JOIN franchiseestaffdetails fs ON im.StaffID=fs.StaffID ";
                 str += "WHERE em.EmpId='" + HttpContext.Current.Session["EmpId"].ToString() + "' AND ";
                 str += "(im.FranchiseeID like '%" + SearchText + "%' or YearType like '%" + SearchText + "%' or ";
                 str += "Year like '%" + SearchText + "%' or ApplicantName like '%" + SearchText + "%' or ApplicantMobileNo like '%" + SearchText + "%' or ";
                 str += "EmpName like '%" + SearchText + "%' or FileStatus like '%" + SearchText + "%') AND im.FileStatus LIKE '%" + Regex.Split(FileStatus, ",")[1] + "%'  ORDER BY im.VerifiedDate DESC";
             }
             
         }
         else if (Regex.Split(FileStatus, ",")[0] == "Verified" && StartDate != "" && EndDate != "")
         {
             if (Regex.Split(FileStatus, ",")[1] == "0")
             {
                 str += "SELECT im.*,pm.*,em.EmpName,fs.Email FROM itmaster im ";
                 str += "LEFT JOIN clientpanmaster pm ON im.ClientID=pm.ClientID ";
                 str += "LEFT JOIN employeemaster em ON im.AssignedTo=em.EmpId ";
                 str += "LEFT JOIN franchiseestaffdetails fs ON im.StaffID=fs.StaffID ";
                 str += "WHERE em.EmpId='" + HttpContext.Current.Session["EmpId"].ToString() + "' AND ";
                 str += "(im.FranchiseeID like '%" + SearchText + "%' or YearType like '%" + SearchText + "%' or ";
                 str += "Year like '%" + SearchText + "%' or ApplicantName like '%" + SearchText + "%' or ApplicantMobileNo like '%" + SearchText + "%' or ";
                 str += "EmpName like '%" + SearchText + "%') AND im.FileStatus LIKE '%Verified%' OR im.FileStatus LIKE '%Completed%' AND ";
                 str += "(im.VerifiedDate BETWEEN '" + Convert.ToDateTime(StartDate).ToString("yyyy-MM-dd") + "' AND '" + Convert.ToDateTime(EndDate).ToString("yyyy-MM-dd") + "') ORDER BY im.VerifiedDate DESC";
             }
             else
             {
                 str += "SELECT im.*,pm.*,em.EmpName,fs.Email FROM itmaster im ";
                 str += "LEFT JOIN clientpanmaster pm ON im.ClientID=pm.ClientID ";
                 str += "LEFT JOIN employeemaster em ON im.AssignedTo=em.EmpId ";
                 str += "LEFT JOIN franchiseestaffdetails fs ON im.StaffID=fs.StaffID ";
                 str += "WHERE em.EmpId='" + HttpContext.Current.Session["EmpId"].ToString() + "' AND ";
                 str += "(im.FranchiseeID like '%" + SearchText + "%' or YearType like '%" + SearchText + "%' or ";
                 str += "Year like '%" + SearchText + "%' or ApplicantName like '%" + SearchText + "%' or ApplicantMobileNo like '%" + SearchText + "%' or ";
                 str += "EmpName like '%" + SearchText + "%') AND im.FileStatus LIKE '%" + Regex.Split(FileStatus, ",")[1] + "%'  AND ";
                 str += "(im.VerifiedDate BETWEEN '" + Convert.ToDateTime(StartDate).ToString("yyyy-MM-dd") + "' AND '" + Convert.ToDateTime(EndDate).ToString("yyyy-MM-dd") + "') ORDER BY im.VerifiedDate DESC";
             }
         }


        ITFiles[] md = Contl.GetITFileHO(str);
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
            FileTransaction_ID = FileTransactionID;
            str += "insert into messagemaster(FileTransactionID,DateTime,MessageType,Receiver_Id,ClientId,StaffId,Subject,Message,Sender,Sender_Id,Status,DeleteStatus) ";
            str += "values (" + FileTransactionID + ",'" + DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss tt") + "','IT File','" + FranchiseeID + "','" + ClientId + "','" + ITStaffId + "','" + Subject + "','" + Message.Trim() + "','Head Office','" + HttpContext.Current.Session["EmpId"].ToString() + "','UnRead','Active')";
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

    //------------------------------Start Update IT Client Master Data---------------------------------------------
    [WebMethod]
    //public static string UpdateITClientMasterData(string FileTransactionID, string ClientID, string ApplicantName, string ApplicantFatherName, string ApplicantAddress, string PinCode, string BirthDate, string ApplicantMobileNo, string ApplicantEmailID, string State, string Citizenship, string EmployedType, string AadharNumber, string ITDPortalPassword, string AccountNo, string IFSC, string YearType, string Year, string PaymentMode, string Amount, string DueDate, string ChequeNo, string Narration, string Status)
    public static string UpdateITClientMasterData(string FileTransactionID, string ClientID, string AccountID, string YearType, string Year, string PaymentMode, string Amount, string DueDate, string ChequeNo, string Narration, string Status)
    {
        bool b = false;
        bool c = false;
        string str = "";
        try
        {
            str += "update itmaster set AccountID=" + AccountID + ",YearType='" + YearType + "',Year='" + Year + "' where FileTransactionID=" + FileTransactionID + " and ClientID='" + ClientID + "'";
           
            if (b = da.insertUpdate(str))
            {
                string str1 = "";
                string duedate="";
                if (PaymentMode == "Credit")
                {
                    if(DueDate!=""){
                        duedate=Convert.ToDateTime(DueDate).ToString("yyyy-MM-dd");
                    }
                    str1 = "Update itpayment set PaymentMode='" + PaymentMode + "',Amount='" + Amount + "',DueDate='" + duedate + "',PaymentStatus='UnPaid' where FileTransactionID=" + FileTransactionID + "";
                }
                else if(PaymentMode=="Cheque")
                {
                    str1 = "Update itpayment set PaymentMode='" + PaymentMode + "',Amount='" + Amount + "',ChequeNo='" + ChequeNo + "',Narration='" + Narration + "',PaymentStatus='Paid' where FileTransactionID=" + FileTransactionID + "";
                }
                else if (PaymentMode == "CASH")
                {
                    str1 = "Update itpayment set PaymentMode='" + PaymentMode + "',Amount='" + Amount + "',PaymentStatus='Paid' where FileTransactionID=" + FileTransactionID + "";
                }
                c = da.insertUpdate(str1);
            }
        }
        catch (Exception ex)
        {

        }

        if (b==true && c==true)
            return "Record Added SuccessFully..!";
        //return Client_Id;
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Update IT Client Master Data---------------------------------------------



    //=====================Start Update To Verify File=================================
    [WebMethod]
    public static string UpdateToVerify(string FileTransactionID)
    {
        bool b = false;
        string str = "";
        try
        {
            //FileTransaction_ID = FileTransactionID;
            str += "update itmaster set FileStatus='Verified',VerifiedDate='" + Convert.ToDateTime(DateTime.Now).ToString("yyyy-MM-dd") + "' where FileTransactionID=" + FileTransactionID + "";
           
            b = da.insertUpdate(str);
        }
        catch (Exception ex)
        {

        }

        if (b)
            return FileTransactionID;
        else
            return "Record Not Added ..?";
    }
    //=================================End Update To Verify File===============================




    //=====================Start Update To Completed File=================================
    [WebMethod]
    public static string UpdateToCompleted(string FileTransactionID)
    {
        bool b = false;
        string str = "";
        try
        {
            //FileTransaction_ID = FileTransactionID;
            str += "update itmaster set FileStatus='Completed',CompletedDate='" + Convert.ToDateTime(DateTime.Now).ToString("yyyy-MM-dd") + "' where FileTransactionID=" + FileTransactionID + "";

            b = da.insertUpdate(str);
        }
        catch (Exception ex)
        {

        }

        if (b)
            return FileTransactionID;
        else
            return "Record Not Added ..?";
    }
    //=================================End Update To Completed File===============================


    //===================Start DownLaad All Documents==========================
    [WebMethod]
    public static string DownloadAllItDocument(string FileTransactionID, string ClientName, string TableName)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT * FROM " + TableName + " WHERE FileTransactionID=" + FileTransactionID + "";

        ITClientList[] md = Contl.DownloadITClientDocument(str);
        string zipFileName = da.DownloadAllDoc(ClientName, md);
        return zipFileName;
    }
    //===================End DownLaad All Documents==========================

}