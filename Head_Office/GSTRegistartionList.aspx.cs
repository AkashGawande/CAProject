using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using Newtonsoft.Json;
using MySql.Data.MySqlClient;
using System.Text.RegularExpressions;
public partial class Head_Office_GSTRegistartionList : System.Web.UI.Page
{
    static DataAccess da = new DataAccess();
    static string Client_Id = "";
    static ImageUpload IU = new ImageUpload();
    static string FileTransaction_ID = "";
    static string ReferenceID = "";
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    //===================Start Bind GST Payer FranchiseeID==========================
    [WebMethod]
    public static FranchiseeList[] BindFranchiseeIDP()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT Distinct(FranchiseeID) FROM gstregistrationmaster where GSTType='TAX_Payer' and FileStatus='New'";

        FranchiseeList[] md = Contl.GetFranchiseeID(str);
        return md.ToArray();
    }
    //===================End Bind GST Payer FranchiseeID==========================

    //===================Start Bind GST Payer Firm Name==========================
    [WebMethod]
    public static FranchiseeList[] BindFirmNameP()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        //str += "SELECT Distinct(FranchiseeID),FirmName FROM itmaster where FileStatus=''";
        str += "SELECT DISTINCT(gm.FranchiseeID),fm.FirmName FROM gstregistrationmaster gm ";
        str += "LEFT JOIN franchiseemaster fm ON gm.FranchiseeID=fm.FranchiseeID where gm.GSTType='TAX_Payer' and gm.FileStatus='New'";

        FranchiseeList[] md = Contl.GetFirmName(str);
        return md.ToArray();
    }
    //===================End Bind GST Payer Firm Name==========================

    //===================Start Bind GST Deductor FranchiseeID==========================
    [WebMethod]
    public static FranchiseeList[] BindFranchiseeIDD()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT Distinct(FranchiseeID) FROM gstregistrationmaster where GSTType='TAX_Deductor' and FileStatus='New'";

        FranchiseeList[] md = Contl.GetFranchiseeID(str);
        return md.ToArray();
    }
    //===================End Bind GST Deductor FranchiseeID==========================

    //===================Start Bind GST Deductor Firm Name==========================
    [WebMethod]
    public static FranchiseeList[] BindFirmNameD()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        //str += "SELECT Distinct(FranchiseeID),FirmName FROM itmaster where FileStatus=''";
        str += "SELECT DISTINCT(gm.FranchiseeID),fm.FirmName FROM gstregistrationmaster gm ";
        str += "LEFT JOIN franchiseemaster fm ON gm.FranchiseeID=fm.FranchiseeID where gm.GSTType='TAX_Deductor' and gm.FileStatus='New'";

        FranchiseeList[] md = Contl.GetFirmName(str);
        return md.ToArray();
    }
    //===================End Bind GST Deductor Firm Name==========================

    //===================Start Get GST Reg Tax Payer List==========================
    [WebMethod]
    public static GSTRegistrationList[] GetGSTRegTP(string FranchiseeID)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT * from gstregistrationmaster where FranchiseeID='" + FranchiseeID + "' and Status='InActive' and GSTType='TAX_Payer' order by ReferenceId desc";

        GSTRegistrationList[] md = Contl.GetGSTRegListTP(str);
        return md.ToArray();
    }
    //===================End Get GST Reg Tax Payer List==========================

    //===================Start Get GST Reg Tax Deductor List==========================
    [WebMethod]
    public static GSTRegistrationList[] GetGSTRegTD(string FranchiseeID)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT * from gstregistrationmaster where FranchiseeID='" + FranchiseeID + "' and Status='InActive' and GSTType='TAX_Deductor' order by ReferenceId desc";

        GSTRegistrationList[] md = Contl.GetGSTRegListTD(str);
        return md.ToArray();
    }
    //===================End Get GST Reg Tax Deductor List==========================

    //===================Start View GST Reg Tax Payer Details==========================
    [WebMethod]
    public static GSTRegistrationList[] ViewModelBoxTP(string RefID)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        //str += "SELECT * from gstregistrationmaster where ReferenceId='" + RefID + "' and GSTType='TAX_Payer'";

        str += "SELECT gm.*,gd.* FROM gstregistrationmaster gm ";
        str += "LEFT JOIN gstregistrationdocuments gd ON gm.ReferenceId=gd.ReferenceId ";
        str += "where gm.ReferenceId='" + RefID + "' and gm.GSTType='TAX_Payer'";       

        GSTRegistrationList[] md = Contl.GetGSTRegDetailsTP(str);
        return md.ToArray();
    }
    //===================End View GST Reg Tax Payer Details==========================

    //===================Start View GST Reg Tax Deductor Details==========================
    [WebMethod]
    public static GSTRegistrationList[] ViewModelBoxTD(string RefID)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT gm.*,gd.* FROM gstregistrationmaster gm ";
        str += "LEFT JOIN gstregistrationdocuments gd ON gm.ReferenceId=gd.ReferenceId ";
        str += "where gm.ReferenceId=" + RefID + " and gm.GSTType='TAX_Deductor'";
        GSTRegistrationList[] md = Contl.GetGSTRegDetailsTD(str);
        return md.ToArray();
    }
    //===================End View GST Reg Tax Deductor Details==========================

    //===================Start View GST Reg Tax Deductor Contact Person Details==========================
    [WebMethod]
    public static GSTRegistrationList[] ViewContactPerson(string RefID)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT * FROM gstregistrationcontacts WHERE ReferenceId=" + RefID + "";       

        GSTRegistrationList[] md = Contl.GetGSTRegDetailsTDPerson(str);
        return md.ToArray();
    }
    //===================End View GST Reg Tax Deductor Contact Person Details==========================

    //=====================Start Send Message to Franchisee=================================
    [WebMethod]
    public static string SendMasterData(string ReferenceID1, string StaffID, string FranchiseeID, string ClientId, string Subject, string Message)
    {
        bool b = false;
        string str = "";
        try
        {
            ReferenceID = ReferenceID1;
            str += "insert into messagemaster(FileTransactionID,DateTime,MessageType,Receiver_Id,ClientId,StaffId,Subject,Message,Sender,Sender_Id,Status,DeleteStatus) ";
            str += "values (" + ReferenceID1 + ",'" + DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss tt") + "','GST Registration','" + FranchiseeID + "','" + ClientId + "','" + StaffID + "','" + Subject + "','" + Message.Trim() + "','Head Office','" + HttpContext.Current.Session["EmpId"].ToString() + "','UnRead','Active')";
            b = da.insertUpdate(str);
        }
        catch (Exception ex)
        {

        }

        if (b)
            //return "Record Added SuccessFully..!";
            return ReferenceID;
        else
            return "Record Not Added ..?";
    }
    //=================================End Send Message to Franchisee===============================

    //==============================Start Send Attachments into MEssage Details=======================================  
    [WebMethod]
    public static string SendDetails(string AllAttachment)
    {
        bool b = false;
        bool c = false;
        string NewPhotoImageName = "";
        try
        {
            var serializeData = JsonConvert.DeserializeObject<List<GSTRegistrationList>>(AllAttachment);
            foreach (var data in serializeData)
            {

                //Client_Id = data.ClientId;
                string stt = "Select MessageID from messagemaster where FileTransactionID=" + ReferenceID + " order by MessageID desc";
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
            return ReferenceID;
        else
            return "Record Not Added ..?";
    }
    //=========================End Send Attachments into MEssage Details=========================================== 

    //------------------------------Start Update GST Tax Payer Master Data---------------------------------------------
    [WebMethod]
    public static string UpdateMasterDataTP(string TPReferenceID, string TPClientID, string TPApplicanteName, string TPFatherName, string TPApplicantEmail, string TPMobileNo, string TPState, string TPPaymentMode, string TPAmount, string TPDueDate, string TPChequeNo, string TPNarration, string PhotoSource, string FileName, string Sfilename, string Status)
    {
        bool b = false;
        bool c = false;
        string str = "";
        string NewChequeName = "";
        try
        {

            if (PhotoSource != "" && FileName != "") { string photoName = "GSTReg" + TPReferenceID + "_Cheque"; NewChequeName = IU.changePhotoName(FileName, photoName); }
            else if(TPChequeNo!=""&&TPNarration!=""&&PhotoSource==""&&FileName==""&&Sfilename!="") { NewChequeName = Sfilename; }
            else { NewChequeName = ""; }


            str += "Update gstregistrationmaster set Name1='" + TPApplicanteName + "',Name2='" + TPFatherName + "',MobileNo='" + TPMobileNo + "',";
            str += "Email='" + TPApplicantEmail + "',StateCode='" + TPState + "',PaymentMode='" + TPPaymentMode + "',Amount='" + TPAmount + "',";

            if (TPPaymentMode == "Cheque")
            {
                str += "ChequeNo='" + TPChequeNo + "',Narration='" + TPNarration + "',DueDate='" + TPDueDate + "',ChequeFileName='" + NewChequeName + "',PaymentStatus='Paid' ";
            }
            else if (TPPaymentMode == "Credit")
            {
                DateTime duedate;
                if (TPDueDate != "")
                {
                    string[] dt = Regex.Split(TPDueDate, "-");
                    int d = Convert.ToInt32(dt[0]);
                    int m = Convert.ToInt32(dt[1]);
                    int y = Convert.ToInt32(dt[2]);
                    duedate = new DateTime(y, m, d);
                    TPDueDate = Convert.ToDateTime(duedate).ToString("yyyy-MM-dd");
                }
                str += "ChequeNo='" + TPChequeNo + "',Narration='" + TPNarration + "',DueDate='" + TPDueDate + "',ChequeFileName='"+NewChequeName+"',PaymentStatus='UnPaid' ";
            }
            else if (TPPaymentMode == "CASH")
            {
                str += "ChequeNo='" + TPChequeNo + "',Narration='" + TPNarration + "',DueDate='" + TPDueDate + "',,ChequeFileName='" + NewChequeName + "',PaymentStatus='Paid' ";
            }
            str += "where ReferenceId=" + TPReferenceID + " and GSTType='TAX_Payer'";
            b = da.insertUpdate(str);
        }
        catch (Exception ex)
        {

        }

        if (b)
        {
            if(TPChequeNo==""&&TPNarration==""&&PhotoSource==""&&FileName==""&&Sfilename!="")
            {
                string filePath = HttpContext.Current.Server.MapPath("~/Documents/"+Sfilename);
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }
}


            if (PhotoSource != "" && FileName != "") { c = IU.UploadFile(PhotoSource, NewChequeName); }

            return "Record Added SuccessFully..!";
        }
        else
        {
            return "Record Not Added ..?";
        }
            
    }
    //------------------------------End Update GST Tax Payer Master Data---------------------------------------------

    //------------------------------Start Update GST Tax Deductor Master Data---------------------------------------------
    [WebMethod]
    public static string UpdateMasterDataTD(string TDReferenceID, string TDClientID, string TDOfficeName, string TDAuthorisedPersonName, string TDOfficeEmail, string TDState, string TDPaymentMode, string TDAmount, string TDDueDate, string TDChequeNo, string NarrationTD, string PhotoSource, string FileName, string Sfilename, string Status)
    {
        bool b = false;
        bool c = false;
        string str = "";
        string NewChequeName = "";
        try
        {
            if (PhotoSource != "" && FileName != "") { string photoName = "GSTReg" + TDReferenceID + "_Cheque"; NewChequeName = IU.changePhotoName(FileName, photoName); }
            else if (TDChequeNo != "" && NarrationTD != "" && PhotoSource == "" && FileName == "" && Sfilename != "") { NewChequeName = Sfilename; }
            else { NewChequeName = ""; }


            ReferenceID = TDReferenceID;
            str += "Update gstregistrationmaster set Name1='" + TDOfficeName + "',Name2='" + TDAuthorisedPersonName + "',";
            str += "Email='" + TDOfficeEmail + "',StateCode='" + TDState + "',PaymentMode='" + TDPaymentMode + "',Amount='" + TDAmount + "',";

            if (TDPaymentMode == "Cheque")
            {
                str += "ChequeNo='" + TDChequeNo + "',Narration='" + NarrationTD + "',DueDate='" + TDDueDate + "',ChequeFileName='" + NewChequeName + "',PaymentStatus='Paid' ";
            }
            else if (TDPaymentMode == "Credit")
            {
                DateTime duedate;
                if (TDDueDate != "")
                {
                    string[] dt = Regex.Split(TDDueDate, "-");
                    int d = Convert.ToInt32(dt[0]);
                    int m = Convert.ToInt32(dt[1]);
                    int y = Convert.ToInt32(dt[2]);
                    duedate = new DateTime(y, m, d);
                    TDDueDate = Convert.ToDateTime(duedate).ToString("yyyy-MM-dd");
                }
                str += "ChequeNo='" + TDChequeNo + "',Narration='" + NarrationTD + "',DueDate='" + TDDueDate + "',ChequeFileName='" + NewChequeName + "',PaymentStatus='UnPaid' ";
            }
            else if (TDPaymentMode == "CASH")
            {
                str += "ChequeNo='" + TDChequeNo + "',Narration='" + NarrationTD + "',DueDate='" + TDDueDate + "',ChequeFileName='" + NewChequeName + "',PaymentStatus='Paid' ";
            }
            str += "where ReferenceId=" + TDReferenceID + " and GSTType='TAX_Deductor'";
            b = da.insertUpdate(str);
        }
        catch (Exception ex)
        {

        }

        if (b)
        {
            if (TDChequeNo == "" && NarrationTD == "" && PhotoSource == "" && FileName == "" && Sfilename != "")
            {
                string filePath = HttpContext.Current.Server.MapPath("~/Documents/" + Sfilename);
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
            }
            if (PhotoSource != "" && FileName != "") { c = IU.UploadFile(PhotoSource, NewChequeName); }
            return ReferenceID;
        }
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Update GST Tax Deductor Master Data---------------------------------------------

    //------------------------------Start Update GST Deductor Member Data---------------------------------------------    
    [WebMethod]
    public static string UpdateDetailDataTD(string GSTDContactPersoneDetails)
    {
        bool b = false;
        try
        {
            var serializeData1 = JsonConvert.DeserializeObject<List<GSTRegistrationList>>(GSTDContactPersoneDetails);
            foreach (var data in serializeData1)
            {
                ReferenceID = data.ReferenceId;
                string str1 = "";
                MySqlCommand cmd;
                if (data.PersoneName != "" || data.PersonMobileNo != "")
                {
                    if (data.PersonID == "")
                    {
                        str1 = "insert into gstregistrationcontacts(ReferenceId,PersoneName,MobileNo) values(@ReferenceId,@PersoneName,@MobileNo)";
                        cmd = new MySqlCommand(str1);
                        cmd.Parameters.Add("@ReferenceId", MySqlDbType.VarChar).Value = data.ReferenceId;
                        cmd.Parameters.Add("@PersoneName", MySqlDbType.VarChar).Value = data.PersoneName;
                        cmd.Parameters.Add("@MobileNo", MySqlDbType.VarChar).Value = data.PersonMobileNo;
                    }
                    else
                    {
                        str1 = "update gstregistrationcontacts set PersoneName=@PersoneName,MobileNo=@MobileNo where PersonID=@PersonID";
                        cmd = new MySqlCommand(str1);
                        cmd.Parameters.Add("@PersonID", MySqlDbType.VarChar).Value = data.PersonID;
                        cmd.Parameters.Add("@PersoneName", MySqlDbType.VarChar).Value = data.PersoneName;
                        cmd.Parameters.Add("@MobileNo", MySqlDbType.VarChar).Value = data.PersonMobileNo;
                    }


                    b = da.InsertUpdateData(cmd);
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
            return ReferenceID;
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Update GST Deductor Member Data---------------------------------------------

    //===================Start DownLaad All Documents==========================
    [WebMethod]
    public static string DownloadAllGSTDocument(string RefID, string ClientName, string TableName)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT * FROM " + TableName + " WHERE ReferenceId=" + RefID + "";

        GSTRegistrationList[] md = Contl.DownloadGSTPDocument(str);
        string zipFileName = da.DownloadAllGSTPDoc(ClientName, md);
        return zipFileName;
    }
    //===================End DownLaad All Documents==========================
}