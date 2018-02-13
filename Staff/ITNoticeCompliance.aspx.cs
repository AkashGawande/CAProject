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
public partial class Staff_ITNoticeCompliance : System.Web.UI.Page
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
    public static ClientDetails[] GetClientDetails(string PanNo)
    {
        ClientController Contl = new ClientController();
        string str = "";
        if (PanNo != "")
        {
            str += "SELECT * FROM clientpanmaster WHERE ClientId='" + PanNo + "' OR PANNumber='" + PanNo + "'";
        }


        ClientDetails[] md = Contl.GetPANClientAllData(str);
        return md.ToArray();
    }
    //===================End Get Client Data On His Pan or TAN No==========================



    //------------------------------Start Save Client Master Data---------------------------------------------
    [WebMethod]
    public static string SaveITNoticeMasterData(string ClientId, string AccountId, string YearType, string Year, string PaymentMode, string Amount, string PaymentStatus, string ChequeNo, string DueDate, string Narratin, string ChequePhotoSource, string ChequeFileName, string Status)
    {
        bool b = false;
        bool c = false;
        string str = "";
        string str1 = "";
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
                DueDate = Convert.ToDateTime(Duedate).ToString("yyyy-MM-dd");
            }
            else
            {
                DueDate = "";
            }

            str += "insert into itnoticemaster(FranchiseeID,StaffID,ClientID,AccountID,Date,YearType,Year, ";
            str += "PaymentMode,Amount,ChequeNo,Narration,DueDate,PaymentStatus,FileStatus,Status)  ";
            str += "values(@FranchiseeID,@StaffID,@ClientID,@AccountID,@Date,@YearType,@year,@PaymentMode, ";
            str += "@Amount,@ChequeNo,@Narration,@DueDate,@PaymentStatus,@FileStatus,@Status)";

            MySqlCommand cmd = new MySqlCommand(str);
            cmd.Parameters.Add("@FranchiseeID", MySqlDbType.VarChar).Value = HttpContext.Current.Session["FranchiseeID"].ToString();
            cmd.Parameters.Add("@StaffID", MySqlDbType.VarChar).Value = HttpContext.Current.Session["StaffID"].ToString();
            cmd.Parameters.Add("@ClientID", MySqlDbType.VarChar).Value = Client_Id;
            cmd.Parameters.Add("@AccountID", MySqlDbType.VarChar).Value = AccountId;
            cmd.Parameters.Add("@Date", MySqlDbType.Date).Value = Convert.ToDateTime(DateTime.Now).ToString("yyyy-MM-dd");  
            cmd.Parameters.Add("@YearType", MySqlDbType.VarChar).Value = YearType;
            cmd.Parameters.Add("@Year", MySqlDbType.VarChar).Value = Year;                     
            cmd.Parameters.Add("@PaymentMode", MySqlDbType.VarChar).Value = PaymentMode; ;
            cmd.Parameters.Add("@Amount", MySqlDbType.VarChar).Value = Amount;
            cmd.Parameters.Add("@ChequeNo", MySqlDbType.VarChar).Value = ChequeNo;
            cmd.Parameters.Add("@Narration", MySqlDbType.VarChar).Value = Narratin;
            //cmd.Parameters.Add("@ChequeFileName", MySqlDbType.VarChar).Value = NewChequeName;
            cmd.Parameters.Add("@DueDate", MySqlDbType.VarChar).Value = DueDate;
            cmd.Parameters.Add("@PaymentStatus", MySqlDbType.VarChar).Value = PaymentStatus;
            cmd.Parameters.Add("@FileStatus", MySqlDbType.VarChar).Value = "New";
            cmd.Parameters.Add("@Status", MySqlDbType.VarChar).Value = Status;

            Staff_ITNoticeCompliance itn = new Staff_ITNoticeCompliance();
            string sessionvalue = itn.GetSessionValue();

            if(sessionvalue!="")
            {
                b = da.InsertUpdateData(cmd);

                str1 = "Select MAX(FileTransactionID) from itnoticemaster";
                string FileTId = da.getString(str1);

                if (FileTId != "")
                {
                    FileTransactionId = (Convert.ToInt32(FileTId)).ToString(); ;
                }
                else
                {
                    FileTransactionId = "1";
                }

                if (ChequePhotoSource != "" && ChequeFileName != "") { string photoName = "ITNotice" + FileTransactionId + "_Cheque"; NewChequeName = IU.changePhotoName(ChequeFileName, photoName); }

                str3 += "update itnoticemaster set ChequeFileName=@ChequeFileName Where FileTransactionID=@FileTransactionID";
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
            if (ChequePhotoSource != "" && ChequeFileName != "") { c = IU.UploadFile(ChequePhotoSource, ChequeFileName); }

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
    public static string SaveITNoticeDocumentData(string AllAttachment)
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

                if (data.PhotoSource != "" && data.PhotoName != "") { string photoName = "ITNotice" + FileTransactionId + "_" + data.DocumentName.Replace(" ", "_"); NewPhotoImageName = IU.changePhotoName(data.PhotoName, photoName); }

                string str = "insert into itnoticedocuments(FileTransactionID, DocumentName,DocumentPath)values(@FileTransactionID, @DocumentName,@DocumentPath)";
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




    //************************Update Part Start**************************************************
    //===================Start Get IT Files==========================
    [WebMethod]
    public static ITFiles[] GetITFiles()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "SELECT im.*,pm.* FROM itnoticemaster im LEFT JOIN clientpanmaster pm ON im.ClientID=pm.ClientID WHERE im.FranchiseeID='" + Franchisee_Id + "' And im.StaffID='" + Staff_Id + "' ORDER BY im.Date DESC";
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

        str += "SELECT im.*,pm.*,pa.*,ip.* FROM itnoticemaster im ";
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
        str += "SELECT * FROM itnoticedocuments WHERE FileTransactionID='" + FileTransactionID + "' ";

        ITFiles[] md = Contl.GetITFileDocuments(str);
        return md.ToArray();
    }
    //===================End View IT File Documents==========================

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


    //------------------------------Start Update IT Notice Client Master Data---------------------------------------------
    [WebMethod]
    public static string UpdateITNoticeClientMasterData(string FileTransactionID, string ClientID, string AccountID, string YearType, string Year, string PaymentMode, string Amount, string DueDate, string ChequeNo, string Narration, string PhotoPath, string PhotoName, string Sfilename, string Status)
    {
        bool b = false;
        bool c = false;
        string str = "";
        string NewChequeName1 = "";
        try
        {

            if (PhotoPath != "" && PhotoName != "") { string photoName = "ITNotice" + FileTransactionID + "_Cheque"; NewChequeName1 = IU.changePhotoName(PhotoName, photoName); }
            //else { NewChequeName1 = Sfilename; }
             else if (ChequeNo != "" && Narration != "" && PhotoPath == "" && PhotoName == "" && Sfilename != "") { NewChequeName = Sfilename; }
            else { NewChequeName = ""; }
            

            str += "update itnoticemaster set AccountID=" + AccountID + ",YearType='" + YearType + "',Year='" + Year + "' ";
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
                    str1 = "Update itnoticemaster set PaymentMode='" + PaymentMode + "',Amount='" + Amount + "',DueDate='" + DueDate + "',ChequeNo='" + ChequeNo + "',Narration='" + Narration + "',ChequeFileName='" + NewChequeName1 + "',PaymentStatus='UnPaid' where FileTransactionID=" + FileTransactionID + "";
                }
                else if (PaymentMode == "Cheque")
                {
                    str1 = "Update itnoticemaster set PaymentMode='" + PaymentMode + "',Amount='" + Amount + "',DueDate='" + DueDate + "',ChequeNo='" + ChequeNo + "',Narration='" + Narration + "',ChequeFileName='" + NewChequeName1 + "',PaymentStatus='Paid' where FileTransactionID=" + FileTransactionID + "";
                }
                else if (PaymentMode == "CASH")
                {
                    str1 = "Update itnoticemaster set PaymentMode='" + PaymentMode + "',Amount='" + Amount + "',DueDate='" + DueDate + "',ChequeNo='" + ChequeNo + "',Narration='" + Narration + "',ChequeFileName='" + NewChequeName1 + "',PaymentStatus='Paid' where FileTransactionID=" + FileTransactionID + "";
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


            if (PhotoName != "" && PhotoPath != "") { c = IU.UploadFile(PhotoPath, NewChequeName1); }

            return "Record Updated SuccessFully..!";
        }
        //return Client_Id;
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Update IT Notice Client Master Data---------------------------------------------


    //------------------------------Start Update Or Add IT New Document---------------------------------------------
    [WebMethod]
    public static string Update_AddITNoticeDocument(string FileTransactionId, string UpdateDocumentId, string UpdateDocumentName, string ExistingDocument, string UpdatePhotoSource, string UpdateFileName)
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
                string photoName = "IT" + FileTransactionId + "_" + UpdateDocumentName.Replace(" ", "_");
                //--------------Start Photo Name Changing Section---------------------
                NewPhotoImageName = IU.changePhotoName(UpdateFileName, photoName);
                //--------------End Photo Name Changing Section---------------------

                if (UpdateDocumentId == "")
                {
                    str1 = "insert into itnoticedocuments(FileTransactionID,DocumentName,DocumentPath) values(@FileTransactionID,@DocumentName,@DocumentPath)";
                    cmd = new MySqlCommand(str1);
                    cmd.Parameters.Add("@FileTransactionID", MySqlDbType.VarChar).Value = FileTransactionId;
                    cmd.Parameters.Add("@DocumentName", MySqlDbType.VarChar).Value = UpdateDocumentName;
                    cmd.Parameters.Add("@DocumentPath", MySqlDbType.VarChar).Value = NewPhotoImageName;
                }
                else
                {
                    str1 = "update itnoticedocuments set DocumentName=@DocumentName,DocumentPath=@DocumentPath where DocumentId=@DocumentId";
                    cmd = new MySqlCommand(str1);
                    cmd.Parameters.Add("@DocumentId", MySqlDbType.VarChar).Value = UpdateDocumentId;
                    cmd.Parameters.Add("@DocumentName", MySqlDbType.VarChar).Value = UpdateDocumentName;
                    cmd.Parameters.Add("@DocumentPath", MySqlDbType.VarChar).Value = NewPhotoImageName;
                }

                Staff_ITNoticeCompliance cr = new Staff_ITNoticeCompliance();
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
    //------------------------------End Update Or Add IT New Document---------------------------------------------



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
                string photoName = "ITNotice" + FileTId + "_Cheque";
                //--------------Start Photo Name Changing Section---------------------
                NewPhotoImageName = IU.changePhotoName(UpdateFileName, photoName);
                //--------------End Photo Name Changing Section---------------------

                str1 = "update itnoticemaster set ChequeFileName=@ChequeFileName where FileTransactionID=@FileTransactionID";
                cmd = new MySqlCommand(str1);
                cmd.Parameters.Add("@FileTransactionID", MySqlDbType.VarChar).Value = FileTId;
                cmd.Parameters.Add("@ChequeFileName", MySqlDbType.VarChar).Value = NewPhotoImageName;

                Staff_ITNoticeCompliance cr = new Staff_ITNoticeCompliance();
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


    //**********************Update part End****************************************************




}