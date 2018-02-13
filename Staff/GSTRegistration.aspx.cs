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

public partial class Franchisee_GSTFiling : System.Web.UI.Page
{
    static DataAccess da = new DataAccess();
    static ImageUpload IU = new ImageUpload();
    static string Franchisee_Id = "";
    static string Staff_Id = "";
    static string Role = "";
    static string Client_Id = "";
    static string ReferanceId = "";
    static int i = 0;
    static DateTime Duedate;
    static string NewGSTAppName="",NewChequeName="",NewPhotoName = "", NewofficeEleBill = "", NewPanCardName = "", NewAadharName = "", NewShopAct_NOCName = "", NewHomeEleBill = "", NewBankStatement = "", NewCancelCheck = "", NewPartnerShip = "", NewOtherName = "";
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

    public string GetSessionValue()
    {
        return Franchisee_Id;
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

   


    //===================Start Get Client Data On His Pan or TAN No==========================
    [WebMethod]
    public static StaffClientDetails[] GetGStBasedClientDetails(string ClientId, string GSTType)
    {
        StaffController Contl = new StaffController();
        string str = "";
        
        if(GSTType=="TAX_Payer")
        {
            str += "SELECT * FROM clientpanmaster WHERE ClientId='" + ClientId + "'";
        }
        else if (GSTType == "TAX_Deductor")
        {
           
            str += "SELECT tm.* ,tcp.PersoneName,tcp.MobileNo FROM clienttanmaster tm LEFT JOIN clienttancontactpersons tcp ON tm.ClientId= tcp.ClientId WHERE tm.ClientId='" + ClientId + "'";
        }
        

        StaffClientDetails[] md = Contl.GetGstBasedClientAllData(str, GSTType);
        return md.ToArray();
    }
    //===================End Get Client Data On His Pan or TAN No==========================


    //------------------------------Start Save Tax Payer Data---------------------------------------------
    [WebMethod]
    public static string SaveTaxPayerGSTRegistrationFile(string ClientId, string PANNo, string ApplicantName, string AppFatherName, string AppMobileNo, string AppEmail, string State, string GSTType, string PaymentMode, string PaymentStatus, string ChequeNo, string Narratin, string ChequePhotoSource, string ChequeFileName, string DueDate, string GSTApplicationFileName, string GSTApplicationPhotoSource, string TaxPayerPhotoDocumentName, string TaxPayerPhotoName, string TaxPayerPhotoSource, string TaxPayerOfficeEleBillDocumentName, string TaxPayerOfficeEleBillSource, string TaxPayerOfficeEleBillName, string TaxPayerPANCardDocumentName, string TaxPayerPANCardSource, string TaxPayerPANCardName, string TaxPayerAadharDocumentName, string TaxPayerAadharSource, string TaxPayerAadharName, string TaxPayerShopActDocumentName, string TaxPayerShopActSource, string TaxPayerShopActName, string TaxPayerHomeEleBillDocumentName, string TaxPayerHomeEleBillSource, string TaxPayerHomeEleBillName, string TaxPayerBankStateDocumentName, string TaxPayerBankStateSource, string TaxPayerBankStateName, string TaxPayerCancelChequeDocumentName, string TaxPayerCancelChequeSource, string TaxPayerCancelChequeName, string TaxPayerPartnerShipDocumentName, string TaxPayerPartnerShipSource, string TaxPayerPartnerShipName, string TaxOtherDetailsDocumentName, string TaxOtherDetailsSource, string TaxOtherDetailsName, string Amount, string Status)
    {
        NewGSTAppName = ""; NewChequeName = ""; NewPhotoName = ""; NewofficeEleBill = ""; NewPanCardName = ""; NewAadharName = ""; NewShopAct_NOCName = ""; NewHomeEleBill = ""; NewBankStatement = ""; NewCancelCheck = ""; NewPartnerShip = ""; NewOtherName = "";
        bool b = false;
        bool c = false;
        
        string str = "";
        string str2 = "";
        string str1 = "";
        string str3 = "";
        string str4 = "";
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

            str += "insert into gstregistrationmaster(FranchiseeID,StaffID,ClientID,Date,GSTType,PAN_TAN,Name1,Name2,MobileNo,Email,StateCode,PaymentMode,";
            str += "Amount,ChequeNo,Narration,DueDate,PaymentStatus,FileStatus,Status) ";
            str += "values(@FranchiseeID,@StaffID,@ClientID,@Date,@GSTType,@PAN_TAN,@Name1,@Name2,@MobileNo,@Email,@StateCode,@PaymentMode,@Amount,";
            str += "@ChequeNo,@Narration,@DueDate,@PaymentStatus,@FileStatus,@Status)";

            MySqlCommand cmd = new MySqlCommand(str);
            cmd.Parameters.Add("@FranchiseeID", MySqlDbType.VarChar).Value = HttpContext.Current.Session["FranchiseeID"].ToString();
            cmd.Parameters.Add("@StaffID", MySqlDbType.VarChar).Value = HttpContext.Current.Session["StaffID"].ToString();
            cmd.Parameters.Add("@ClientID", MySqlDbType.VarChar).Value = Client_Id;
            cmd.Parameters.Add("@Date", MySqlDbType.Date).Value = Convert.ToDateTime(DateTime.Now).ToString("yyyy-MM-dd");
            cmd.Parameters.Add("@GSTType", MySqlDbType.VarChar).Value = GSTType;
            cmd.Parameters.Add("@PAN_TAN", MySqlDbType.VarChar).Value = PANNo;

            cmd.Parameters.Add("@Name1", MySqlDbType.VarChar).Value = ApplicantName;
            cmd.Parameters.Add("@Name2", MySqlDbType.VarChar).Value = AppFatherName;
            cmd.Parameters.Add("@MobileNo", MySqlDbType.VarChar).Value = AppMobileNo;
            cmd.Parameters.Add("@Email", MySqlDbType.VarChar).Value = AppEmail;
            cmd.Parameters.Add("@StateCode", MySqlDbType.VarChar).Value = State;


            //cmd.Parameters.Add("@GSTAppFile", MySqlDbType.VarChar).Value = NewGSTAppName;
            cmd.Parameters.Add("@PaymentMode", MySqlDbType.VarChar).Value = PaymentMode;
            cmd.Parameters.Add("@Amount", MySqlDbType.VarChar).Value = Amount;
            cmd.Parameters.Add("@ChequeNo", MySqlDbType.VarChar).Value = ChequeNo;
            cmd.Parameters.Add("@Narration", MySqlDbType.VarChar).Value = Narratin;
            cmd.Parameters.Add("@DueDate", MySqlDbType.VarChar).Value = DueDate;  
            //cmd.Parameters.Add("@ChequeFileName", MySqlDbType.VarChar).Value = NewChequeName;
            cmd.Parameters.Add("@PaymentStatus", MySqlDbType.VarChar).Value = PaymentStatus;
            cmd.Parameters.Add("@FileStatus", MySqlDbType.VarChar).Value = "New";
            cmd.Parameters.Add("@Status", MySqlDbType.VarChar).Value = Status;


            //b = da.InsertUpdateData(cmd);


            Franchisee_GSTFiling gst = new Franchisee_GSTFiling();
            string sessionvalue = gst.GetSessionValue();


            if (sessionvalue != "")
            {
                b = da.InsertUpdateData(cmd);

                str2 = "Select MAX(ReferenceId) from gstregistrationmaster";
                string Refid = da.getString(str2);

                if (Refid != "")
                {
                    ReferanceId = (Convert.ToInt32(Refid)).ToString(); ;
                }
                else
                {
                    ReferanceId = "1";
                }

                if (GSTApplicationPhotoSource != "" && GSTApplicationFileName != "") { string photoName = "GSTReg" + ReferanceId + "_GSTApplication"; NewGSTAppName = IU.changePhotoName(GSTApplicationFileName, photoName); }
                if (ChequePhotoSource != "" && ChequeFileName != "") { string photoName = "GSTReg" + ReferanceId + "_Cheque"; NewChequeName = IU.changePhotoName(ChequeFileName, photoName); }

                //if (GSTApplicationPhotoSource != "" && GSTApplicationFileName != "") { c = IU.UploadFile1(GSTApplicationPhotoSource, NewGSTAppName); }

                str4 += "update gstregistrationmaster set GSTAppFile=@GSTAppFile,ChequeFileName=@ChequeFileName Where ReferenceId=@ReferenceId";
                MySqlCommand cmd1 = new MySqlCommand(str4);
                cmd1.Parameters.Add("@ReferenceId", MySqlDbType.VarChar).Value = ReferanceId;
                cmd1.Parameters.Add("@GSTAppFile", MySqlDbType.VarChar).Value = NewGSTAppName;
                cmd1.Parameters.Add("@ChequeFileName", MySqlDbType.VarChar).Value = NewChequeName;
                b = da.InsertUpdateData(cmd1);
            }
           
        }
        catch (Exception ex)
        {

        }

        if (b)
        {
            if (GSTApplicationPhotoSource != "" && GSTApplicationFileName != "") { c = IU.UploadFile(GSTApplicationPhotoSource, NewGSTAppName); }
            if (ChequePhotoSource != "" && ChequeFileName != "") { c = IU.UploadFile(ChequePhotoSource, NewChequeName); }

             str1 = "Select MAX(ReferenceId) from gstregistrationmaster";
            ReferanceId = da.getString(str1);

            if (TaxPayerPhotoSource != "" && TaxPayerPhotoName != "") { string photoName = "GSTReg" + ReferanceId + "_" + TaxPayerPhotoDocumentName.Replace(" ", "_"); NewPhotoName = IU.changePhotoName(TaxPayerPhotoName, photoName); }
            if (TaxPayerOfficeEleBillSource != "" && TaxPayerOfficeEleBillName != "") { string photoName = "GSTReg" + ReferanceId + "_" + TaxPayerOfficeEleBillDocumentName.Replace(" ", "_");  NewofficeEleBill = IU.changePhotoName(TaxPayerOfficeEleBillName, photoName); }
            if (TaxPayerPANCardSource != "" && TaxPayerPANCardName != "") { string photoName = "GSTReg" + ReferanceId + "_" + TaxPayerPANCardDocumentName.Replace(" ", "_");  NewPanCardName = IU.changePhotoName(TaxPayerPANCardName, photoName); }
            if (TaxPayerAadharSource != "" && TaxPayerAadharName != "") { string photoName = "GSTReg" + ReferanceId + "_" + TaxPayerAadharDocumentName.Replace(" ", "_"); NewAadharName = IU.changePhotoName(TaxPayerAadharName, photoName); }
            if (TaxPayerShopActSource != "" && TaxPayerShopActName != "") { string photoName = "GSTReg" + ReferanceId + "_" + TaxPayerShopActDocumentName.Replace(" ", "_");  NewShopAct_NOCName = IU.changePhotoName(TaxPayerShopActName, photoName); }
            if (TaxPayerHomeEleBillSource != "" && TaxPayerHomeEleBillName != "") { string photoName = "GSTReg" + ReferanceId + "_" + TaxPayerHomeEleBillDocumentName.Replace(" ", "_");  NewHomeEleBill = IU.changePhotoName(TaxPayerHomeEleBillName, photoName); }
            if (TaxPayerBankStateSource != "" && TaxPayerBankStateName != "") { string photoName = "GSTReg" + ReferanceId + "_" + TaxPayerBankStateDocumentName.Replace(" ", "_"); NewBankStatement = IU.changePhotoName(TaxPayerBankStateName, photoName); }
            if (TaxPayerCancelChequeSource != "" && TaxPayerCancelChequeName != "") { string photoName = "GSTReg" + ReferanceId + "_" + TaxPayerCancelChequeDocumentName.Replace(" ", "_"); NewCancelCheck = IU.changePhotoName(TaxPayerCancelChequeName, photoName); }
            if (TaxPayerPartnerShipSource != "" && TaxPayerPartnerShipName != "") { string photoName = "GSTReg" + ReferanceId + "_" + TaxPayerPartnerShipDocumentName.Replace(" ", "_"); NewPartnerShip = IU.changePhotoName(TaxPayerPartnerShipName, photoName); }
            if (TaxOtherDetailsSource != "" && TaxOtherDetailsName != "") { string photoName = "GSTReg" + ReferanceId + "_" + TaxOtherDetailsDocumentName.Replace(" ", "_"); NewOtherName = IU.changePhotoName(TaxOtherDetailsName, photoName); }
            

             str3 = "";
             str3 += "insert into gstregistrationdocuments(ReferenceId,PhotoName,PhotoPath,EleOfficeName,EleOfficePath,PanCardName,PanCardPath,";
            str3 += "AadharName,AadharPath,ShopAct_NOCName,ShopAct_NOCPath,EleHomeName,EleHomePath,BankStatementName,";
            str3 += "BankStatementPath,CancelChequeName,CancelChequePath,PartnerShipName,PartnerShipPath,OtherName,OtherPath) ";
            str3 += "values(@ReferenceId,@PhotoName,@PhotoPath,@EleOfficeName,@EleOfficePath,@PanCardName,@PanCardPath,";
            str3 += "@AadharName,@AadharPath,@ShopAct_NOCName,@ShopAct_NOCPath,@EleHomeName,@EleHomePath,@BankStatementName,";
            str3 += "@BankStatementPath,@CancelChequeName,@CancelChequePath,@PartnerShipName,@PartnerShipPath,@OtherName,@OtherPath)";
            

            MySqlCommand cmd = new MySqlCommand(str3);
            cmd.Parameters.Add("@ReferenceId", MySqlDbType.VarChar).Value = Convert.ToInt32(ReferanceId);
            cmd.Parameters.Add("@PhotoName", MySqlDbType.VarChar).Value = TaxPayerPhotoDocumentName;
            cmd.Parameters.Add("@PhotoPath", MySqlDbType.VarChar).Value = NewPhotoName;
            cmd.Parameters.Add("@EleOfficeName", MySqlDbType.VarChar).Value = TaxPayerOfficeEleBillDocumentName;
            cmd.Parameters.Add("@EleOfficePath", MySqlDbType.VarChar).Value = NewofficeEleBill;
            cmd.Parameters.Add("@PanCardName", MySqlDbType.VarChar).Value = TaxPayerPANCardDocumentName;
            cmd.Parameters.Add("@PanCardPath", MySqlDbType.VarChar).Value = NewPanCardName;
            cmd.Parameters.Add("@AadharName", MySqlDbType.VarChar).Value = TaxPayerAadharDocumentName;
            cmd.Parameters.Add("@AadharPath", MySqlDbType.VarChar).Value = NewAadharName;
            cmd.Parameters.Add("@ShopAct_NOCName", MySqlDbType.VarChar).Value = TaxPayerShopActDocumentName;
            cmd.Parameters.Add("@ShopAct_NOCPath", MySqlDbType.VarChar).Value = NewShopAct_NOCName;
            cmd.Parameters.Add("@EleHomeName", MySqlDbType.VarChar).Value = TaxPayerHomeEleBillDocumentName;
            cmd.Parameters.Add("@EleHomePath", MySqlDbType.VarChar).Value = NewHomeEleBill;
            cmd.Parameters.Add("@BankStatementName", MySqlDbType.VarChar).Value = TaxPayerBankStateDocumentName;
            cmd.Parameters.Add("@BankStatementPath", MySqlDbType.VarChar).Value = NewBankStatement;
            cmd.Parameters.Add("@CancelChequeName", MySqlDbType.VarChar).Value = TaxPayerCancelChequeDocumentName;
            cmd.Parameters.Add("@CancelChequePath", MySqlDbType.VarChar).Value = NewCancelCheck;
            cmd.Parameters.Add("@PartnerShipName", MySqlDbType.VarChar).Value = TaxPayerPartnerShipDocumentName;
            cmd.Parameters.Add("@PartnerShipPath", MySqlDbType.VarChar).Value = NewPartnerShip;
            cmd.Parameters.Add("@OtherName", MySqlDbType.VarChar).Value = TaxOtherDetailsDocumentName;
            cmd.Parameters.Add("@OtherPath", MySqlDbType.VarChar).Value = NewOtherName;

            if ((TaxPayerPhotoSource != "" && TaxPayerPhotoName != "") || (TaxPayerOfficeEleBillSource != "" && TaxPayerOfficeEleBillName != "") || (TaxPayerPANCardSource != "" && TaxPayerPANCardName != "") || (TaxPayerAadharSource != "" && TaxPayerAadharName != "") || (TaxPayerShopActSource != "" && TaxPayerShopActName != "") || (TaxPayerHomeEleBillSource != "" && TaxPayerHomeEleBillName != "") || (TaxPayerBankStateSource != "" && TaxPayerBankStateName != "") || (TaxPayerCancelChequeSource != "" && TaxPayerCancelChequeName != "") || (TaxPayerPartnerShipSource != "" && TaxPayerPartnerShipName != "") || (TaxOtherDetailsSource != "" && TaxOtherDetailsName != ""))
            {
                c = da.InsertUpdateData(cmd);
            }
            else
            {
                c = true;
            }
           

            
            if (c)
            {
                if (TaxPayerPhotoSource != "" && TaxPayerPhotoName != "") { c = IU.UploadFile(TaxPayerPhotoSource, NewPhotoName); }
                if (TaxPayerOfficeEleBillSource != "" && TaxPayerOfficeEleBillName != "") { c = IU.UploadFile(TaxPayerOfficeEleBillSource, NewofficeEleBill); }
                if (TaxPayerPANCardSource != "" && TaxPayerPANCardName != "") { c = IU.UploadFile(TaxPayerPANCardSource, NewPanCardName); }
                if (TaxPayerAadharSource != "" && TaxPayerAadharName != "") { c = IU.UploadFile(TaxPayerAadharSource, NewAadharName); }
                if (TaxPayerShopActSource != "" && TaxPayerShopActName != "") { c = IU.UploadFile(TaxPayerShopActSource, NewShopAct_NOCName); }
                if (TaxPayerHomeEleBillSource != "" && TaxPayerHomeEleBillName != "") { c = IU.UploadFile(TaxPayerHomeEleBillSource, NewHomeEleBill); }
                if (TaxPayerBankStateSource != "" && TaxPayerBankStateName != "") { c = IU.UploadFile(TaxPayerBankStateSource, NewBankStatement); }
                if (TaxPayerCancelChequeSource != "" && TaxPayerCancelChequeName != "") { c = IU.UploadFile(TaxPayerCancelChequeSource, NewCancelCheck); }
                if (TaxPayerPartnerShipSource != "" && TaxPayerPartnerShipName != "") { c = IU.UploadFile(TaxPayerPartnerShipSource, NewPartnerShip); }
                if (TaxOtherDetailsSource != "" && TaxOtherDetailsName != "") { c = IU.UploadFile(TaxOtherDetailsSource, NewOtherName); }
            
                return ReferanceId;
            }
            else
            {
                return "Record Not Added ..?";
            }

        }

        else
            return "Record Not Added ..?";
    }
    //------------------------------End Save Tax Payer Data---------------------------------------------


    //------------------------------Start Save Tax Deductor Data---------------------------------------------
    [WebMethod]
    public static string SaveTaxDeductorGSTRegistrationFile(string ClientId, string TANNo, string OfficeName, string AuthorisedPersonName, string OfficeEmail, string State, string GSTType, string PaymentMode, string PaymentStatus, string ChequeNo, string Narratin, string ChequePhotoSource, string ChequeFileName, string DueDate, string GSTApplicationFileName, string GSTApplicationPhotoSource, string TaxPayerPhotoDocumentName, string TaxPayerPhotoName, string TaxPayerPhotoSource, string TaxPayerOfficeEleBillDocumentName, string TaxPayerOfficeEleBillSource, string TaxPayerOfficeEleBillName, string TaxPayerPANCardDocumentName, string TaxPayerPANCardSource, string TaxPayerPANCardName, string TaxPayerAadharDocumentName, string TaxPayerAadharSource, string TaxPayerAadharName, string TaxPayerShopActDocumentName, string TaxPayerShopActSource, string TaxPayerShopActName, string TaxOtherDetailsDocumentName, string TaxOtherDetailsSource, string TaxOtherDetailsName, string Amount, string Status)
    {
        NewGSTAppName = ""; NewChequeName = ""; NewPhotoName = ""; NewofficeEleBill = ""; NewPanCardName = ""; NewAadharName = ""; NewShopAct_NOCName = "";NewOtherName = "";
        bool b = false;
        bool c = false;
       
        string str = "";
        string str2 = "";
        string str1 = "";
        string str3 = "";
        string str4 = "";
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

            str += "insert into gstregistrationmaster(FranchiseeID,StaffID,ClientID,Date,GSTType,PAN_TAN,Name1,Name2,Email,StateCode,PaymentMode,";
            str += "Amount,ChequeNo,Narration,DueDate,PaymentStatus,FileStatus,Status) ";
            str += "values(@FranchiseeID,@StaffID,@ClientID,@Date,@GSTType,@PAN_TAN,@Name1,@Name2,@Email,@StateCode,@PaymentMode,@Amount,";
            str += "@ChequeNo,@Narration,@DueDate,@PaymentStatus,@FileStatus,@Status)";


            MySqlCommand cmd = new MySqlCommand(str);
            cmd.Parameters.Add("@FranchiseeID", MySqlDbType.VarChar).Value = HttpContext.Current.Session["FranchiseeID"].ToString();
            cmd.Parameters.Add("@StaffID", MySqlDbType.VarChar).Value = HttpContext.Current.Session["StaffID"].ToString();
            cmd.Parameters.Add("@ClientID", MySqlDbType.VarChar).Value = Client_Id;
            cmd.Parameters.Add("@Date", MySqlDbType.Date).Value = Convert.ToDateTime(DateTime.Now).ToString("yyyy-MM-dd");
            cmd.Parameters.Add("@GSTType", MySqlDbType.VarChar).Value = GSTType;

            cmd.Parameters.Add("@PAN_TAN", MySqlDbType.VarChar).Value = TANNo;

            cmd.Parameters.Add("@Name1", MySqlDbType.VarChar).Value = OfficeName;
            cmd.Parameters.Add("@Name2", MySqlDbType.VarChar).Value = AuthorisedPersonName;
            //cmd.Parameters.Add("@MobileNo", MySqlDbType.VarChar).Value = AppMobileNo;
            cmd.Parameters.Add("@Email", MySqlDbType.VarChar).Value = OfficeEmail;
            cmd.Parameters.Add("@StateCode", MySqlDbType.VarChar).Value = State;
            
            cmd.Parameters.Add("@PaymentMode", MySqlDbType.VarChar).Value = PaymentMode;
            cmd.Parameters.Add("@Amount", MySqlDbType.VarChar).Value = Amount;
            cmd.Parameters.Add("@ChequeNo", MySqlDbType.VarChar).Value = ChequeNo;
            cmd.Parameters.Add("@Narration", MySqlDbType.VarChar).Value = Narratin;
            cmd.Parameters.Add("@DueDate", MySqlDbType.VarChar).Value = DueDate; 
            //cmd.Parameters.Add("@ChequeFileName", MySqlDbType.VarChar).Value = NewChequeName;
            cmd.Parameters.Add("@PaymentStatus", MySqlDbType.VarChar).Value = PaymentStatus;
            cmd.Parameters.Add("@FileStatus", MySqlDbType.VarChar).Value = "New";
            cmd.Parameters.Add("@Status", MySqlDbType.VarChar).Value = Status;


            Franchisee_GSTFiling gst = new Franchisee_GSTFiling();
            string sessionvalue = gst.GetSessionValue();


            if (sessionvalue != "")
            {
                b = da.InsertUpdateData(cmd);

                str2 = "Select MAX(ReferenceId) from gstregistrationmaster";
                string Refid = da.getString(str2);

                if (Refid != "")
                {
                    ReferanceId = (Convert.ToInt32(Refid)).ToString(); ;
                }
                else
                {
                    ReferanceId = "1";
                }

                if (GSTApplicationPhotoSource != "" && GSTApplicationFileName != "") { string photoName = "GSTReg" + ReferanceId + "_GSTApplication"; NewGSTAppName = IU.changePhotoName(GSTApplicationFileName, photoName); }
                if (ChequePhotoSource != "" && ChequeFileName != "") { string photoName = "GSTReg" + ReferanceId + "_Cheque"; NewChequeName = IU.changePhotoName(ChequeFileName, photoName); }


                str4 += "update gstregistrationmaster set GSTAppFile=@GSTAppFile,ChequeFileName=@ChequeFileName Where ReferenceId=@ReferenceId";
                MySqlCommand cmd1 = new MySqlCommand(str4);
                cmd1.Parameters.Add("@ReferenceId", MySqlDbType.VarChar).Value = ReferanceId;
                cmd1.Parameters.Add("@GSTAppFile", MySqlDbType.VarChar).Value = NewGSTAppName;
                cmd1.Parameters.Add("@ChequeFileName", MySqlDbType.VarChar).Value = NewChequeName;
                b = da.InsertUpdateData(cmd1);
            }
           

            
        }
        catch (Exception ex)
        {

        }

        if (b)
        {
            if (GSTApplicationPhotoSource != "" && GSTApplicationFileName != "") { c = IU.UploadFile(GSTApplicationPhotoSource, NewGSTAppName); }
            if (ChequePhotoSource != "" && ChequeFileName != "") { c = IU.UploadFile(ChequePhotoSource, NewChequeName); }

            str1 = "Select MAX(ReferenceId) from gstregistrationmaster";
            ReferanceId = da.getString(str1);

            if (TaxPayerPhotoSource != "" && TaxPayerPhotoName != "") { string photoName = "GSTReg" + ReferanceId + "_" + TaxPayerPhotoDocumentName.Replace(" ", "_"); NewPhotoName = IU.changePhotoName(TaxPayerPhotoName, photoName); }
            if (TaxPayerOfficeEleBillSource != "" && TaxPayerOfficeEleBillName != "") { string photoName = "GSTReg" + ReferanceId + "_" + TaxPayerOfficeEleBillDocumentName.Replace(" ", "_"); NewofficeEleBill = IU.changePhotoName(TaxPayerOfficeEleBillName, photoName); }
            if (TaxPayerPANCardSource != "" && TaxPayerPANCardName != "") { string photoName = "GSTReg" + ReferanceId + "_" + TaxPayerPANCardDocumentName.Replace(" ", "_"); NewPanCardName = IU.changePhotoName(TaxPayerPANCardName, photoName); }
            if (TaxPayerAadharSource != "" && TaxPayerAadharName != "") { string photoName = "GSTReg" + ReferanceId + "_" + TaxPayerAadharDocumentName.Replace(" ", "_"); NewAadharName = IU.changePhotoName(TaxPayerAadharName, photoName); }
            if (TaxPayerShopActSource != "" && TaxPayerShopActName != "") { string photoName = "GSTReg" + ReferanceId + "_" + TaxPayerShopActDocumentName.Replace(" ", "_"); NewShopAct_NOCName = IU.changePhotoName(TaxPayerShopActName, photoName); }
            if (TaxOtherDetailsSource != "" && TaxOtherDetailsName != "") { string photoName = "GSTReg" + ReferanceId + "_" + TaxOtherDetailsDocumentName.Replace(" ", "_"); NewOtherName = IU.changePhotoName(TaxOtherDetailsName, photoName); }


            str3 = "";
            str3 += "insert into gstregistrationdocuments(ReferenceId,PhotoName,PhotoPath,EleOfficeName,EleOfficePath,PanCardName,PanCardPath,";
            str3 += "AadharName,AadharPath,ShopAct_NOCName,ShopAct_NOCPath,OtherName,OtherPath) ";
            str3 += "values(@ReferenceId,@PhotoName,@PhotoPath,@EleOfficeName,@EleOfficePath,@PanCardName,@PanCardPath,";
            str3 += "@AadharName,@AadharPath,@ShopAct_NOCName,@ShopAct_NOCPath,@OtherName,@OtherPath)";


            MySqlCommand cmd = new MySqlCommand(str3);
            cmd.Parameters.Add("@ReferenceId", MySqlDbType.VarChar).Value = Convert.ToInt32(ReferanceId);
            cmd.Parameters.Add("@PhotoName", MySqlDbType.VarChar).Value = TaxPayerPhotoDocumentName;
            cmd.Parameters.Add("@PhotoPath", MySqlDbType.VarChar).Value = NewPhotoName;
            cmd.Parameters.Add("@EleOfficeName", MySqlDbType.VarChar).Value = TaxPayerOfficeEleBillDocumentName;
            cmd.Parameters.Add("@EleOfficePath", MySqlDbType.VarChar).Value = NewofficeEleBill;
            cmd.Parameters.Add("@PanCardName", MySqlDbType.VarChar).Value = TaxPayerPANCardDocumentName;
            cmd.Parameters.Add("@PanCardPath", MySqlDbType.VarChar).Value = NewPanCardName;
            cmd.Parameters.Add("@AadharName", MySqlDbType.VarChar).Value = TaxPayerAadharDocumentName;
            cmd.Parameters.Add("@AadharPath", MySqlDbType.VarChar).Value = NewAadharName;
            cmd.Parameters.Add("@ShopAct_NOCName", MySqlDbType.VarChar).Value = TaxPayerShopActDocumentName;
            cmd.Parameters.Add("@ShopAct_NOCPath", MySqlDbType.VarChar).Value = NewShopAct_NOCName;
            cmd.Parameters.Add("@OtherName", MySqlDbType.VarChar).Value = TaxOtherDetailsDocumentName;
            cmd.Parameters.Add("@OtherPath", MySqlDbType.VarChar).Value = NewOtherName;

            if ((TaxPayerPhotoSource != "" && TaxPayerPhotoName != "") || (TaxPayerOfficeEleBillSource != "" && TaxPayerOfficeEleBillName != "") || (TaxPayerPANCardSource != "" && TaxPayerPANCardName != "") || (TaxPayerAadharSource != "" && TaxPayerAadharName != "") || (TaxPayerShopActSource != "" && TaxPayerShopActName != "") || (TaxOtherDetailsSource != "" && TaxOtherDetailsName != ""))
            {
                c = da.InsertUpdateData(cmd);
            }
            else
            {
                c = true;
            }
           
            if (c)
            {
                if (TaxPayerPhotoSource != "" && TaxPayerPhotoName != "") { c = IU.UploadFile(TaxPayerPhotoSource, NewPhotoName); }
                if (TaxPayerOfficeEleBillSource != "" && TaxPayerOfficeEleBillName != "") { c = IU.UploadFile(TaxPayerOfficeEleBillSource, NewofficeEleBill); }
                if (TaxPayerPANCardSource != "" && TaxPayerPANCardName != "") { c = IU.UploadFile(TaxPayerPANCardSource, NewPanCardName); }
                if (TaxPayerAadharSource != "" && TaxPayerAadharName != "") { c = IU.UploadFile(TaxPayerAadharSource, NewAadharName); }
                if (TaxPayerShopActSource != "" && TaxPayerShopActName != "") { c = IU.UploadFile(TaxPayerShopActSource, NewShopAct_NOCName); }
               if (TaxOtherDetailsSource != "" && TaxOtherDetailsName != "") { c = IU.UploadFile(TaxOtherDetailsSource, NewOtherName); }

                return ReferanceId;
            }
            else
            {
                return "Record Not Added ..?";
            }

        }

        else
            return "Record Not Added ..?";
    }
    //------------------------------End Save Tax Deductor Data---------------------------------------------



    //------------------------------Start Save GST Based Deductor Document Data---------------------------------------------    
    [WebMethod]
    public static string SaveGSTDeductorContactDetails(string GSTDeductorContactPersoneDetails)
    {
        i = 0;
        bool b = false;
        bool c = false;
       // string NewPhotoImageName = "";
        try
        {
            var serializeData1 = JsonConvert.DeserializeObject<List<ClientDetails>>(GSTDeductorContactPersoneDetails);
            foreach (var data in serializeData1)
            {
                ReferanceId = data.ReferanceId;

                if (data.BankAccono != "" || data.IFSCCode != "")
                {
                    string str1 = "insert into gstregistrationcontacts(ReferenceId,PersoneName,MobileNo) values(@ReferenceId,@PersoneName,@MobileNo)";
                    MySqlCommand cmd = new MySqlCommand(str1);
                    cmd.Parameters.Add("@ReferenceId", MySqlDbType.VarChar).Value = ReferanceId;
                    cmd.Parameters.Add("@PersoneName", MySqlDbType.VarChar).Value = data.GSTDeductorContactPersoneName;
                    cmd.Parameters.Add("@MobileNo", MySqlDbType.VarChar).Value = data.GSTDeductorContactPersoneMobile;

                    b = da.InsertUpdateData(cmd);
                    i++;
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
            return ReferanceId;
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Save GST Based Deductor Deductor Data---------------------------------------------  







    //============================================Start Bind Contact Persone ============================================
    [WebMethod]
    public static StaffClientDetails[] BindDecuctorContactPersoneDropDown(string ClientId)
    {
        StaffController Contrl = new StaffController();
        string str = "";
        str += " Select PersonID,PersoneName from clienttancontactpersons where ClientId='" + ClientId + "'";
        StaffClientDetails[] BCDP = Contrl.GetClientAllContactPersone(str);
        return BCDP.ToArray();
    }

    //============================================End Bind Contact Persone============================================


    //=============================================Start Get IFEC Code=====================================
    [WebMethod]
    public static string GetContactPersonMobileNo(string PersonId)
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


    //===================Start Get GST Reg Tax Payer List==========================
    [WebMethod]
    public static GSTRegistrationList[] GetGSTRegTP()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT * from gstregistrationmaster where FranchiseeID='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "' and StaffID='" + HttpContext.Current.Session["StaffID"].ToString() + "' and Status='InActive' and GSTType='TAX_Payer' order by ReferenceId desc";

        GSTRegistrationList[] md = Contl.GetGSTRegListTP(str);
        return md.ToArray();
    }
    //===================End Get GST Reg Tax Payer List==========================

    //===================Start Get GST Reg Tax Deductor List==========================
    [WebMethod]
    public static GSTRegistrationList[] GetGSTRegTD()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT * from gstregistrationmaster where FranchiseeID='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "' and StaffID='" + HttpContext.Current.Session["StaffID"].ToString() + "' and Status='InActive' and GSTType='TAX_Deductor' order by ReferenceId desc";

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
            else if (TPChequeNo != "" && TPNarration != "" && PhotoSource == "" && FileName == "" && Sfilename != "") { NewChequeName = Sfilename; }
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
                str += "ChequeNo='" + TPChequeNo + "',Narration='" + TPNarration + "',DueDate='" + TPDueDate + "',ChequeFileName='" + NewChequeName + "',PaymentStatus='UnPaid' ";
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
            if (TPChequeNo == "" && TPNarration == "" && PhotoSource == "" && FileName == "" && Sfilename != "")
            {
                string filePath = HttpContext.Current.Server.MapPath("~/Documents/" + Sfilename);
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
            return TDReferenceID;
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
                ReferanceId = data.ReferenceId;
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
            return ReferanceId;
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Update GST Deductor Member Data---------------------------------------------



    //------------------------------Start Update Or Add GSTP New Document---------------------------------------------
    [WebMethod]
    public static string Update_AddGSTPDocument(string RefId, string UpdateDocumentId, string UpdateDocumentName, string ExistingDocument, string UpdatePhotoSource, string UpdateFileName, string UpdateNameColumn, string UpdatePathColumn)
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
                string photoName = "GSTReg" + RefId + "_" + UpdateDocumentName.Replace(" ", "_");
                //--------------Start Photo Name Changing Section---------------------
                NewPhotoImageName = IU.changePhotoName(UpdateFileName, photoName);
                //--------------End Photo Name Changing Section---------------------
               
                str1 = "update gstregistrationdocuments set " + UpdateNameColumn + "=@DocumentName," + UpdatePathColumn + "=@DocumentPath where ID=@ID AND ReferenceId=@ReferenceId";
                    cmd = new MySqlCommand(str1);
                    cmd.Parameters.Add("@ID", MySqlDbType.VarChar).Value = UpdateDocumentId;
                    cmd.Parameters.Add("@ReferenceId", MySqlDbType.VarChar).Value = RefId;
                    cmd.Parameters.Add("@DocumentName", MySqlDbType.VarChar).Value = UpdateDocumentName;
                    cmd.Parameters.Add("@DocumentPath", MySqlDbType.VarChar).Value = NewPhotoImageName;                

                Franchisee_GSTFiling cr = new Franchisee_GSTFiling();
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

            return RefId;
        }
        else
            return "Record Not Added ..?";

    }
    //------------------------------End Update Or Add GSTP New Document---------------------------------------------

    //------------------------------Start Update Cheque New Document---------------------------------------------
    [WebMethod]
    public static string UpdateChequeDocument(string RefId, string ExistingDocument, string UpdatePhotoSource, string UpdateFileName)
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
                string photoName = "GSTReg" + RefId + "_Cheque";
                //--------------Start Photo Name Changing Section---------------------
                NewPhotoImageName = IU.changePhotoName(UpdateFileName, photoName);
                //--------------End Photo Name Changing Section---------------------

                str1 = "update gstregistrationmaster set ChequeFileName=@ChequeFileName where ReferenceId=@ReferenceId";
                cmd = new MySqlCommand(str1);
                cmd.Parameters.Add("@ReferenceId", MySqlDbType.VarChar).Value = RefId;
                cmd.Parameters.Add("@ChequeFileName", MySqlDbType.VarChar).Value = NewPhotoImageName;

                Franchisee_GSTFiling cr = new Franchisee_GSTFiling();
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
            return RefId;
        }
        else
            return "Record Not Added ..?";

    }
    //------------------------------End Cheque New Document---------------------------------------------


   
}