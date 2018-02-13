using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System.Text.RegularExpressions;
public partial class Staff_TDReturnFiling : System.Web.UI.Page
{

    static DataAccess da = new DataAccess();
    static ImageUpload IU = new ImageUpload();
    static string Franchisee_Id = "";
    static string Staff_Id = "";
    static string Role = "";
    static string Client_Id = "";
    static string FileTransactionId = "";
    static int i = 0;
    static DateTime Duedate;
    static string NewChequeName = "";
    
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (HttpContext.Current.Session["FranchiseeID"] == null)
            {
                Response.Redirect("../Login.aspx");
                //_password = Session["Password"].ToString();
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



    public string GetSessionValue()
    {
        return Franchisee_Id;
    }


    //===================Start Get Client Data On His Pan or TAN No==========================
    [WebMethod]
    public static ClientDetails[] GetClientDetails(string TanNo)
    {
        ClientController Contl = new ClientController();
        string str = "";
        if (TanNo != "")
        {
            str += "SELECT * FROM clienttanmaster WHERE ClientId='" + TanNo + "'";
        }
        ClientDetails[] md = Contl.GetTANClientAllData(str);
        return md.ToArray();
    }
    //===================End Get Client Data On His Pan or TAN No==========================


    //------------------------------Start Save Client Master Data---------------------------------------------
    [WebMethod]
    public static string SaveTDSMasterData(string ClientId, string PersoneId, string MobileNo, string PaymentMode, string Amount, string PaymentStatus, string ChequeNo, string DueDate, string Narratin, string ChequePhotoSource, string ChequeFileName, string TypeofReturn, string QuarterlyReturn, string Status)
    {
        bool b = false;
        bool c = false;
        string str = "";
        string str1="";
        string str3 = "";
        try
        {
            Client_Id = ClientId;
            if (DueDate != "")
            {
                string[] dt = Regex.Split(DueDate, "-");
                int d = Convert.ToInt32(dt[0]);
                int m = Convert.ToInt32(dt[1]);
                int y = Convert.ToInt32(dt[2]);
                Duedate = new DateTime(y, m, d);
                DueDate=Convert.ToDateTime(Duedate).ToString("yyyy-MM-dd");
            }
            else
            {
                DueDate="";
            }

            str += "insert into tdsmaster(FranchiseeID,StaffID,ClientID,Date,PersonId, ";
            str += "TypesOfReturn,QuarterlyReturn,PaymentMode,Amount,ChequeNo,Narration,DueDate, ";
            str += "PaymentStatus,FileStatus,Status) values(@FranchiseeID,@StaffID,@ClientID,@Date, ";
            str += "@PersonId,@TypesOfReturn,@QuarterlyReturn,@PaymentMode,@Amount, ";
            str += "@ChequeNo,@Narration,@DueDate,@PaymentStatus, ";
            str += "@FileStatus,@Status)";

            MySqlCommand cmd = new MySqlCommand(str);
            cmd.Parameters.Add("@FranchiseeID", MySqlDbType.VarChar).Value = HttpContext.Current.Session["FranchiseeID"].ToString();
            cmd.Parameters.Add("@StaffID", MySqlDbType.VarChar).Value = HttpContext.Current.Session["StaffID"].ToString();
            cmd.Parameters.Add("@ClientID", MySqlDbType.VarChar).Value = Client_Id;
            cmd.Parameters.Add("@Date", MySqlDbType.Date).Value = Convert.ToDateTime(DateTime.Now).ToString("yyyy-MM-dd");
            cmd.Parameters.Add("@PersonId", MySqlDbType.VarChar).Value = PersoneId;
            //cmd.Parameters.Add("@ContactPersonMobile", MySqlDbType.VarChar).Value = MobileNo;
            cmd.Parameters.Add("@TypesOfReturn", MySqlDbType.VarChar).Value = TypeofReturn;
            cmd.Parameters.Add("@QuarterlyReturn", MySqlDbType.VarChar).Value = QuarterlyReturn;
            cmd.Parameters.Add("@PaymentMode", MySqlDbType.VarChar).Value = PaymentMode; ;
            cmd.Parameters.Add("@Amount", MySqlDbType.VarChar).Value = Amount;
            cmd.Parameters.Add("@ChequeNo", MySqlDbType.VarChar).Value = ChequeNo;
            cmd.Parameters.Add("@Narration", MySqlDbType.VarChar).Value = Narratin;
            //cmd.Parameters.Add("@ChequeFileName", MySqlDbType.VarChar).Value = NewChequeName;
            cmd.Parameters.Add("@DueDate", MySqlDbType.VarChar).Value = DueDate;
            cmd.Parameters.Add("@PaymentStatus", MySqlDbType.VarChar).Value = PaymentStatus;
            cmd.Parameters.Add("@FileStatus", MySqlDbType.VarChar).Value = "New";
            cmd.Parameters.Add("@Status", MySqlDbType.VarChar).Value = Status;

            Staff_TDReturnFiling tds = new Staff_TDReturnFiling();
            string sessionvalue = tds.GetSessionValue();


            if (sessionvalue != "")
            {
                b = da.InsertUpdateData(cmd);

                str1 = "Select MAX(FileTransactionID) from tdsmaster";
                string FileTId = da.getString(str1);

                if (FileTId != "")
                {
                    FileTransactionId = (Convert.ToInt32(FileTId)).ToString(); ;
                }
                else
                {
                    FileTransactionId = "1";
                }

                if (ChequePhotoSource != "" && ChequeFileName != "") { string photoName = "TDS" + FileTransactionId + "_Cheque"; NewChequeName = IU.changePhotoName(ChequeFileName, photoName); }

                str3 += "update tdsmaster set ChequeFileName=@ChequeFileName Where FileTransactionID=@FileTransactionID";
                MySqlCommand cmd1 = new MySqlCommand(str3);
                cmd1.Parameters.Add("@FileTransactionID", MySqlDbType.VarChar).Value = FileTransactionId;
                cmd1.Parameters.Add("@ChequeFileName", MySqlDbType.VarChar).Value = NewChequeName;
                b = da.InsertUpdateData(cmd1);
            }
           

        }
        catch (Exception ex)
        {

        }

        if (b)
        {
            if (ChequePhotoSource != "" && ChequeFileName != "") { c = IU.UploadFile(ChequePhotoSource, NewChequeName); }
            
            //return "Record Added SuccessFully..!";
           
            return FileTransactionId;
        }
        else
        {
            return "Record Not Added ..?";
        }
    }
    //------------------------------End Save Client Master Data---------------------------------------------



    //------------------------------Start Save Member Data---------------------------------------------    
    [WebMethod]
    public static string SaveTDSDocumentData(string AllAttachment)
    {
        i = 0;
        bool b = false;
        bool c = false;
        string NewPhotoImageName = "";
        try
        {
            var serializeData = JsonConvert.DeserializeObject<List<StaffClientDetails>>(AllAttachment);
            foreach (var data in serializeData)
            {

                FileTransactionId = data.FileTransactionId;

                if (data.PhotoSource != "" && data.PhotoName != ""){string photoName = "TDS" + FileTransactionId + "_" + data.DocumentName.Replace(" ", "_"); NewPhotoImageName = IU.changePhotoName(data.PhotoName, photoName);}

                string str = "insert into tdsdocuments(FileTransactionID, DocumentName,DocumentPath)values(@FileTransactionID, @DocumentName,@DocumentPath)";
                MySqlCommand cmd = new MySqlCommand(str);
                cmd.Parameters.Add("@FileTransactionID", MySqlDbType.VarChar).Value = FileTransactionId;
                cmd.Parameters.Add("@DocumentName", MySqlDbType.VarChar).Value = data.DocumentName;
                cmd.Parameters.Add("@DocumentPath", MySqlDbType.VarChar).Value = NewPhotoImageName;

                b = da.InsertUpdateData(cmd);

                if (data.PhotoSource != "" && data.PhotoName != "") { c = IU.UploadFile(data.PhotoSource, NewPhotoImageName); }
            }


            

        }
        catch (Exception ex)
        {

        }

        if (b)
            return FileTransactionId;
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Save Member Data---------------------------------------------   


    //============================================Start Bind Contact Persone ============================================
    [WebMethod]
    public static ClientDetails[] BindContactPersoneDropDown(string ClientId)
    {
        ClientController Contrl = new ClientController();
        string str = "";
        str += " Select PersonID,PersoneName from clienttancontactpersons where ClientId='" + ClientId + "'";
        ClientDetails[] BCDP = Contrl.GetClientAllContactPersone(str);
        return BCDP.ToArray();
    }

    //============================================End Bind Contact Persone============================================

    //=============================================Start Get IFEC Code=====================================
    [WebMethod]
    public static string GetMobileNo(string PersonId)
    {
        bool b = false;
        string Mobile_No = "";
        try
        {
            string str2 = "Select MobileNo from clienttancontactpersons where PersonID=" + PersonId + "";
            Mobile_No = da.getString(str2);
        }
        catch (Exception ex)
        {

        }
        return Mobile_No;
    }
    //-------------------------------End Show NExt Customer Id--------------------------


    //===================Start Get TDS Files==========================
    [WebMethod]
    public static TDSList[] GetTDSFiles()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "SELECT tm.*,cm.* FROM tdsmaster tm LEFT JOIN clienttanmaster cm ON tm.clientid=cm.clientid where tm.FranchiseeID='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "' and tm.StaffID='" + HttpContext.Current.Session["StaffID"].ToString() + "' order by tm.FileTransactionID desc";
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
    public static string UpdateTDSClientMasterData(string FileTransactionID, string ClientID, string ContactPersone, string TypesOfRetutn, string Quarter, string PaymentMode, string Amount, string DueDate, string ChequeNo, string Narration, string PhotoPath, string PhotoName, string Sfilename, string Status)
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
                    str1 = "Update tdsmaster set PaymentMode='" + PaymentMode + "',Amount='" + Amount + "',DueDate='" + DueDate + "',ChequeNo='" + ChequeNo + "',Narration='" + Narration + "',ChequeFileName='" + NewChequeName + "',PaymentStatus='UnPaid' where FileTransactionID=" + FileTransactionID + "";
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

            if (ChequeNo == "" && Narration == "" && PhotoPath == "" && PhotoName == "" && Sfilename != "")
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



    //------------------------------Start Update Or Add TDS New Document---------------------------------------------
    [WebMethod]
    public static string Update_AddTDSDocument(string FileTransactionId, string UpdateDocumentId, string UpdateDocumentName, string ExistingDocument, string UpdatePhotoSource, string UpdateFileName)
    {
        bool b = false;
        bool c = false;
        string str = "";
        string NewPhotoImageName = "";
        try
        {
            string str1 = "";
            MySqlCommand cmd;
            if (UpdatePhotoSource != "" && UpdateFileName != "")
            {
                string photoName = "TDS" + FileTransactionId + "_" + UpdateDocumentName.Replace(" ", "_");
                //--------------Start Photo Name Changing Section---------------------
                NewPhotoImageName = IU.changePhotoName(UpdateFileName, photoName);
                //--------------End Photo Name Changing Section---------------------

                if (UpdateDocumentId == "")
                {
                    str1 = "insert into tdsdocuments(FileTransactionID,DocumentName,DocumentPath) values(@FileTransactionID,@DocumentName,@DocumentPath)";
                    cmd = new MySqlCommand(str1);
                    cmd.Parameters.Add("@FileTransactionID", MySqlDbType.VarChar).Value = FileTransactionId;
                    cmd.Parameters.Add("@DocumentName", MySqlDbType.VarChar).Value = UpdateDocumentName;
                    cmd.Parameters.Add("@DocumentPath", MySqlDbType.VarChar).Value = NewPhotoImageName;
                }
                else
                {
                    str1 = "update tdsdocuments set DocumentName=@DocumentName,DocumentPath=@DocumentPath where DocumentId=@DocumentId";
                    cmd = new MySqlCommand(str1);
                    cmd.Parameters.Add("@DocumentId", MySqlDbType.VarChar).Value = UpdateDocumentId;
                    cmd.Parameters.Add("@DocumentName", MySqlDbType.VarChar).Value = UpdateDocumentName;
                    cmd.Parameters.Add("@DocumentPath", MySqlDbType.VarChar).Value = NewPhotoImageName;
                }

                Staff_TDReturnFiling cr = new Staff_TDReturnFiling();
                string sessionvalue = cr.GetSessionValue();


                if (sessionvalue != "")
                {
                    b = da.InsertUpdateData(cmd);

                }

            }



        }
        catch (Exception ex)
        {

        }

        if (b)
        {
            string filePath = HttpContext.Current.Server.MapPath(ExistingDocument);
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }

            //--------------Start Photo Uploading Section---------------------
            c = IU.UploadFile(UpdatePhotoSource, NewPhotoImageName);
            //--------------End Photo Uploading Section----------------------

            return FileTransactionId;
        }
        else
            return "Record Not Added ..?";

    }
    //------------------------------End Update Or Add TDS New Document---------------------------------------------


    //------------------------------Start Update Cheque New Document---------------------------------------------
    [WebMethod]
    public static string UpdateChequeDocument(string FileTId, string ExistingDocument, string UpdatePhotoSource, string UpdateFileName)
    {
        bool b = false;
        bool c = false;
        string str = "";
        string NewPhotoImageName = "";
        try
        {
            string str1 = "";
            MySqlCommand cmd;
            if (UpdatePhotoSource != "" && UpdateFileName != "")
            {
                string photoName = "TDS" + FileTId + "_Cheque";
                //--------------Start Photo Name Changing Section---------------------
                NewPhotoImageName = IU.changePhotoName(UpdateFileName, photoName);
                //--------------End Photo Name Changing Section---------------------

                str1 = "update tdsmaster set ChequeFileName=@ChequeFileName where FileTransactionID=@FileTransactionID";
                cmd = new MySqlCommand(str1);
                cmd.Parameters.Add("@FileTransactionID", MySqlDbType.VarChar).Value = FileTId;
                cmd.Parameters.Add("@ChequeFileName", MySqlDbType.VarChar).Value = NewPhotoImageName;

                Staff_TDReturnFiling cr = new Staff_TDReturnFiling();
                string sessionvalue = cr.GetSessionValue();


                if (sessionvalue != "")
                {
                    b = da.InsertUpdateData(cmd);

                }
            }



        }
        catch (Exception ex)
        {

        }

        if (b)
        {

            if (UpdatePhotoSource != "" && UpdateFileName != "" && ExistingDocument != "")
            {
                string filePath = HttpContext.Current.Server.MapPath(ExistingDocument);
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }

                //--------------Start Photo Uploading Section---------------------
                c = IU.UploadFile(UpdatePhotoSource, NewPhotoImageName);
                //--------------End Photo Uploading Section----------------------
            }
            return FileTId;
        }
        else
            return "Record Not Added ..?";

    }
    //------------------------------End Cheque New Document---------------------------------------------


}