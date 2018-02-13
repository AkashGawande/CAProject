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
using System.IO;
using Ionic.Zip;
public partial class Head_Office_ClientsList : System.Web.UI.Page
{
    static DataAccess da = new DataAccess();
    static string Client_Id = "";
    static ImageUpload IU = new ImageUpload();
    protected void Page_Load(object sender, EventArgs e)
    {
        
    }
    //===================Start Bind IT FranchiseeID==========================
    [WebMethod]
    public static FranchiseeList[] BindFranchiseeIDIT()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT DISTINCT(FranchiseeID) FROM clientpanmaster where Status='Active'";

        FranchiseeList[] md = Contl.GetFranchiseeID(str);
        return md.ToArray();
    }
    //===================End Bind IT FranchiseeID==========================

    //===================Start Bind IT Firm Name==========================
    [WebMethod]
    public static FranchiseeList[] BindFirmNameIT()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT DISTINCT(pm.FranchiseeID),fm.FirmName FROM clientpanmaster pm ";
        str += "LEFT JOIN franchiseemaster fm ON pm.FranchiseeID=fm.FranchiseeID WHERE pm.STATUS='Active'";

        FranchiseeList[] md = Contl.GetFirmName(str);
        return md.ToArray();
    }
    //===================End Bind IT Firm Name==========================

    //===================Start Bind TDS FranchiseeID==========================
    [WebMethod]
    public static FranchiseeList[] BindFranchiseeIDTDS()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT DISTINCT(FranchiseeID) FROM clienttanmaster where Status='Active'";

        FranchiseeList[] md = Contl.GetFranchiseeID(str);
        return md.ToArray();
    }
    //===================End Bind TDS FranchiseeID==========================

    //===================Start Bind TDS Firm Name==========================
    [WebMethod]
    public static FranchiseeList[] BindFirmNameTDS()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT DISTINCT(tm.FranchiseeID),fm.FirmName FROM clienttanmaster tm ";
        str += "LEFT JOIN franchiseemaster fm ON tm.FranchiseeID=fm.FranchiseeID WHERE tm.STATUS='Active'";

        FranchiseeList[] md = Contl.GetFirmName(str);
        return md.ToArray();
    }
    //===================End Bind TDS Firm Name==========================

    //===================Start Bind GSTP FranchiseeID==========================
    [WebMethod]
    public static FranchiseeList[] BindFranchiseeIDGSTP()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT DISTINCT(FranchiseeID) FROM clientgstpayermaster where Status='Active'";

        FranchiseeList[] md = Contl.GetFranchiseeID(str);
        return md.ToArray();
    }
    //===================End Bind GST FranchiseeID==========================

    //===================Start Bind GSTP Firm Name==========================
    [WebMethod]
    public static FranchiseeList[] BindFirmNameGSTP()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT DISTINCT(gpm.FranchiseeID),fm.FirmName FROM clientgstpayermaster gpm ";
        str += "LEFT JOIN franchiseemaster fm ON gpm.FranchiseeID=fm.FranchiseeID WHERE gpm.STATUS='Active'";

        FranchiseeList[] md = Contl.GetFirmName(str);
        return md.ToArray();
    }
    //===================End Bind GSTP Firm Name==========================

    //===================Start Bind GSTD FranchiseeID==========================
    [WebMethod]
    public static FranchiseeList[] BindFranchiseeIDGSTD()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT DISTINCT(FranchiseeID) FROM clientgstdeductormaster where Status='Active'";

        FranchiseeList[] md = Contl.GetFranchiseeID(str);
        return md.ToArray();
    }
    //===================End Bind GSTD FranchiseeID==========================

    //===================Start Bind GSTD Firm Name==========================
    [WebMethod]
    public static FranchiseeList[] BindFirmNameGSTD()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT DISTINCT(gdm.FranchiseeID),fm.FirmName FROM clientgstdeductormaster gdm ";
        str += "LEFT JOIN franchiseemaster fm ON gdm.FranchiseeID=fm.FranchiseeID WHERE gdm.STATUS='Active'";

        FranchiseeList[] md = Contl.GetFirmName(str);
        return md.ToArray();
    }
    //===================End Bind GSTD Firm Name==========================

    //===================Start Get IT Client List==========================
    [WebMethod]
    public static ITClientList[] GetITClientsDetails(string FranchiseeID,string SDate,string EDate,string SearchText)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        string FIDs = ReplacingQuot(FranchiseeID);
        if (SDate == "" && EDate == "")
        {
            str += "SELECT * FROM clientpanmaster ";
            str += "WHERE " + FIDs + " AND STATUS='Active' AND ";
            str += "(PANNumber LIKE '%" + SearchText + "%' OR ApplicantName LIKE '%" + SearchText + "%' OR ApplicantFatherName LIKE '%" + SearchText + "%' OR ";
            str += "ApplicantAddress LIKE '%" + SearchText + "%' OR Pincode LIKE '%" + SearchText + "%' OR BirthDate LIKE '%" + SearchText + "%' OR ";
            str += "ApplicantMobileNo LIKE '%" + SearchText + "%' OR ApplicantEmail LIKE '%" + SearchText + "%' OR EmployedType LIKE '%" + SearchText + "%' OR ";
            str += "StateCode LIKE '%" + SearchText + "%' OR AadharNo LIKE '%" + SearchText + "%') ";
            str += "ORDER BY ID DESC";
        }
        else if (SDate != "" && EDate != "")
        {
            str += "SELECT * FROM clientpanmaster ";
            str += "WHERE " + FIDs + " AND STATUS='Active' AND ";
            str += "(PANNumber LIKE '%" + SearchText + "%' OR ApplicantName LIKE '%" + SearchText + "%' OR ApplicantFatherName LIKE '%" + SearchText + "%' OR ";
            str += "ApplicantAddress LIKE '%" + SearchText + "%' OR Pincode LIKE '%" + SearchText + "%' OR BirthDate LIKE '%" + SearchText + "%' OR ";
            str += "ApplicantMobileNo LIKE '%" + SearchText + "%' OR ApplicantEmail LIKE '%" + SearchText + "%' OR EmployedType LIKE '%" + SearchText + "%' OR ";
            str += "StateCode LIKE '%" + SearchText + "%' OR AadharNo LIKE '%" + SearchText + "%') AND ";
            str += "(RegDate BETWEEN '" + Convert.ToDateTime(SDate).ToString("yyyy-MM-dd") + "' AND '" + Convert.ToDateTime(EDate).ToString("yyyy-MM-dd") + "') ";
            str += "ORDER BY ID DESC";
        }
        ITClientList[] md = Contl.GetITClients(str);
        return md.ToArray();
    }
    //===================End Get IT Client List==========================
    //===================Start Get TDS Client List==========================
    [WebMethod]
    public static TDSClientList[] GetTDSClientsDetails(string FranchiseeID, string SDate, string EDate, string SearchText)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        string FIDs = ReplacingQuot(FranchiseeID);
        if (SDate == "" && EDate == "")
        {
            str += "SELECT * FROM clienttanmaster ";
            str += "WHERE " + FIDs + " AND STATUS='Active' AND ";
            str += "(TANNumber LIKE '%" + SearchText + "%' OR OfficeName LIKE '%" + SearchText + "%' OR AuthorisedPersone LIKE '%" + SearchText + "%' OR ";
            str += "OfficeAddress LIKE '%" + SearchText + "%' OR Pincode LIKE '%" + SearchText + "%' OR OfficeEmail LIKE '%" + SearchText + "%' OR StateCode LIKE '%" + SearchText + "%') ";
            str += "ORDER BY ID DESC";
        }
        else if (SDate != "" && EDate != "")
        {
            str += "SELECT * FROM clienttanmaster ";
            str += "WHERE " + FIDs + " AND STATUS='Active' AND ";
            str += "(TANNumber LIKE '%" + SearchText + "%' OR OfficeName LIKE '%" + SearchText + "%' OR AuthorisedPersone LIKE '%" + SearchText + "%' OR ";
            str += "OfficeAddress LIKE '%" + SearchText + "%' OR Pincode LIKE '%" + SearchText + "%' OR OfficeEmail LIKE '%" + SearchText + "%' OR StateCode LIKE '%" + SearchText + "%') AND ";
            str += "(RegDate BETWEEN '" + Convert.ToDateTime(SDate).ToString("yyyy-MM-dd") + "' AND '" + Convert.ToDateTime(EDate).ToString("yyyy-MM-dd") + "') ";
            str += "ORDER BY ID DESC";
        }
        TDSClientList[] md = Contl.GetTDSClients(str);
        return md.ToArray();
    }
    //===================End Get TDS Client List==========================
    //===================Start Get GST Client List==========================
    [WebMethod]
    public static GSTTaxPayer[] GetGSTaxPayerList(string FranchiseeID, string SDate, string EDate, string SearchText)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        string FIDs = ReplacingQuot(FranchiseeID);
        if (SDate == "" && EDate == "")
        {
            str += "SELECT * FROM clientgstpayermaster ";
            str += "WHERE " + FIDs + " AND STATUS='Active' AND ";
            str += "(GSTNumber LIKE '%" + SearchText + "%' OR ApplicantName LIKE '%" + SearchText + "%' OR ApplicantFatherName LIKE '%" + SearchText + "%' OR ";
            str += "ApplicantAddress LIKE '%" + SearchText + "%' OR Pincode LIKE '%" + SearchText + "%' OR BirthDate LIKE '%" + SearchText + "%' OR ";
            str += "ApplicantMobileNo LIKE '%" + SearchText + "%' OR ApplicantEmail LIKE '%" + SearchText + "%' OR StateCode LIKE '%" + SearchText + "%') ";
            str += "ORDER BY ID DESC";
        }
        else if (SDate != "" && EDate != "")
        {
            str += "SELECT * FROM clientgstpayermaster ";
            str += "WHERE " + FIDs + " AND STATUS='Active' AND ";
            str += "(GSTNumber LIKE '%" + SearchText + "%' OR ApplicantName LIKE '%" + SearchText + "%' OR ApplicantFatherName LIKE '%" + SearchText + "%' OR ";
            str += "ApplicantAddress LIKE '%" + SearchText + "%' OR Pincode LIKE '%" + SearchText + "%' OR BirthDate LIKE '%" + SearchText + "%' OR ";
            str += "ApplicantMobileNo LIKE '%" + SearchText + "%' OR ApplicantEmail LIKE '%" + SearchText + "%' OR StateCode LIKE '%" + SearchText + "%') AND ";
            str += "(RegDate BETWEEN '" + Convert.ToDateTime(SDate).ToString("yyyy-MM-dd") + "' AND '" + Convert.ToDateTime(EDate).ToString("yyyy-MM-dd") + "') ";
            str += "ORDER BY ID DESC";
        }
        GSTTaxPayer[] md = Contl.GetGSTaxPayer(str);
        return md.ToArray();
    }
    //===================End Get GST Client List==========================
    //===================Start Get GST Client List==========================
    [WebMethod]
    public static GSTTaxDeductor[] GetGSTaxDeductorList(string FranchiseeID, string SDate, string EDate, string SearchText)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        string FIDs = ReplacingQuot(FranchiseeID);
        if (SDate == "" && EDate == "")
        {
            str += "SELECT * FROM clientgstdeductormaster ";
            str += "WHERE " + FIDs + " AND STATUS='Active' AND ";
            str += "(GSTNumber LIKE '%" + SearchText + "%' OR OfficeName LIKE '%" + SearchText + "%' OR AuthorisedPersone LIKE '%" + SearchText + "%' OR ";
            str += "OfficeAddress LIKE '%" + SearchText + "%' OR Pincode LIKE '%" + SearchText + "%' OR ";
            str += "OfficeEmail LIKE '%" + SearchText + "%' OR StateCode LIKE '%" + SearchText + "%') ";
            str += "ORDER BY ID DESC";
        }
        else if (SDate != "" && EDate != "")
        {
            str += "SELECT * FROM clientgstdeductormaster ";
            str += "WHERE " + FIDs + " AND STATUS='Active' AND ";
            str += "(GSTNumber LIKE '%" + SearchText + "%' OR OfficeName LIKE '%" + SearchText + "%' OR AuthorisedPersone LIKE '%" + SearchText + "%' OR ";
            str += "OfficeAddress LIKE '%" + SearchText + "%' OR Pincode LIKE '%" + SearchText + "%' OR ";
            str += "OfficeEmail LIKE '%" + SearchText + "%' OR StateCode LIKE '%" + SearchText + "%') AND ";
            str += "(RegDate BETWEEN '" + Convert.ToDateTime(SDate).ToString("yyyy-MM-dd") + "' AND '" + Convert.ToDateTime(EDate).ToString("yyyy-MM-dd") + "') ";
            str += "ORDER BY ID DESC";
        }
        GSTTaxDeductor[] md = Contl.GetGSTaxDeductor(str);
        return md.ToArray();
    }
    //===================End Get GST Client List==========================

    //===================Start View IT Client Details==========================
    [WebMethod]
    public static ITClientList[] ViewModelBox(string ClientID)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT pm.*,pa.*,sm.statecode FROM clientpanmaster pm ";
        str += "LEFT JOIN clientpanaccounts pa ON pm.ClientId=pa.ClientId ";
        str += "LEFT JOIN state_master sm ON pm.statecode=sm.statecode ";
        str += "WHERE pm.ClientId='" + ClientID + "' ";
        
        ITClientList[] md = Contl.GetITClientDetails(str);
        return md.ToArray();
    }
    //===================End View IT Client Details==========================

    //===================Start View TDS Client Details==========================
    [WebMethod]
    public static TDSClientList[] ViewTDSModelBox(string ClientID)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT tm.*,tc.* FROM clienttanmaster  tm ";
        str += "LEFT JOIN clienttancontactpersons tc ON tm.ClientId=tc.ClientId ";
        //str += "LEFT JOIN state_master sm ON tm.StateCode=sm.StateCode ";
        str += "WHERE tm.ClientId='" + ClientID + "' ";

        TDSClientList[] md = Contl.GetTDSClientDetails(str);
        return md.ToArray();
    }
    //===================End View TDS Client Details==========================

    //===================Start View GST Payer Client Details==========================
    [WebMethod]
    public static GSTTaxPayer[] ViewGSTPModelBox(string ClientID)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT pm.*,pd.* FROM clientgstpayermaster pm LEFT JOIN clientgstpayerdocument pd ON pm.ClientId=pd.ClientId ";
        str += "WHERE pm.ClientId='" + ClientID + "' ";

        GSTTaxPayer[] md = Contl.GetGSTPClientDetails(str);
        return md.ToArray();
    }
    //===================End View GST Payer Client Details==========================

    //===================Start View GST Deductor Client Details==========================
    [WebMethod]
    public static GSTTaxDeductor[] ViewGSTDModelBox(string ClientID)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT dm.*,cp.* FROM clientgstdeductormaster dm LEFT JOIN clientgstdeductorcontactpersone cp ON dm.ClientId=cp.ClientId ";
        str += "WHERE dm.ClientId='" + ClientID + "' ";

        GSTTaxDeductor[] md = Contl.GetGSTDClientDetails(str);
        return md.ToArray();
    }
    //===================End View GST Deductor Client Details==========================

    //===================Start View IT Client Documents==========================
    [WebMethod]
    public static ITClientList[] ViewDocumentsModelBox(string ClientID)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT * FROM clientpandocuments WHERE ClientId='" + ClientID + "' ";

        ITClientList[] md = Contl.GetClientDocuments(str);
        return md.ToArray();
    }
    //===================End View IT Client Documents==========================

    //===================Start View TDS Client Documents==========================
    [WebMethod]
    public static TDSClientList[] ViewTDSDocumentsModelBox(string ClientID)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT * FROM clienttandocuments WHERE ClientId='" + ClientID + "' ";

        TDSClientList[] md = Contl.GetTDSClientDocuments(str);
        return md.ToArray();
    }
    //===================End View TDS Client Documents==========================

    //===================Start View GST Deductor Client Documents==========================
    [WebMethod]
    public static GSTTaxDeductor[] ViewGSTDDocumentsModelBox(string ClientID)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT * FROM clientgstdeductordocument WHERE ClientId='" + ClientID + "' ";

        GSTTaxDeductor[] md = Contl.GetGSTDClientDocuments(str);
        return md.ToArray();
    }
    //===================End View GST Deductor Client Documents==========================

    //=====================Start Send Message to Franchisee=================================
    [WebMethod]
    public static string SaveMasterData(string FranchiseeID, string StaffId, string ClientId, string Subject, string Message)
    {
        string datetime = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss tt");
        bool b = false;
        string str = "";
        try
        {
            Client_Id = ClientId;
            str += "insert into messagemaster(DateTime,MessageType,Receiver_Id,ClientId,StaffId,Subject,Message,Sender,Sender_Id,Status,DeleteStatus) ";
            str += "values ('" + datetime + "','Client Registration','" + FranchiseeID + "','" + ClientId + "','" + StaffId + "','" + Subject + "','" + Message.Trim() + "','Head Office','" + HttpContext.Current.Session["EmpId"].ToString() + "','UnRead','Active')";
            b = da.insertUpdate(str);
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
                string stt = "Select MessageID from messagemaster where ClientId='" + Client_Id + "' order by MessageID desc";
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
            return Client_Id;
        else
            return "Record Not Added ..?";
    }
    //=========================End Send Attachments into MEssage Details=========================================== 


    //------------------------------Start Update Pan Based Client Master Data---------------------------------------------
    [WebMethod]
    public static string UpdatePANClientMasterData(string ITClientID, string ITPANNumber, string ITApplicantName, string ITApplicantFatherName, string ITApplicantAddress, string ITPinCode, string ITBirthDate, string ITApplicantMobileNo, string ITApplicantEmailID, string ITEmployedType, string ITState, string ITCitizenship, string ITAadharNumber, string ITDPortalPassword, string Status)
    {
        bool b = false;
        string str = "";
        
        try
        {
            Client_Id = ITClientID;
            string[] dt = Regex.Split(ITBirthDate, "-");
            int d = Convert.ToInt32(dt[0]);
            int m = Convert.ToInt32(dt[1]);
            int y = Convert.ToInt32(dt[2]);
            DateTime ITbirthdate = new DateTime(y, m, d);

            str += "update clientpanmaster set ApplicantName='" + ITApplicantName + "',ApplicantFatherName='" + ITApplicantFatherName + "',";
            str += "ApplicantAddress='" + System.Uri.UnescapeDataString(ITApplicantAddress) + "',Pincode=" + ITPinCode + ",BirthDate='" + Convert.ToDateTime(ITbirthdate).ToString("yyyy-MM-dd") + "',";
            str += "ApplicantMobileNo='" + ITApplicantMobileNo + "',ApplicantEmail='" + ITApplicantEmailID + "',StateCode=" + ITState + ",";
            str += "Citizenship='" + ITCitizenship + "',EmployedType='" + ITEmployedType + "',AadharNo='" + ITAadharNumber + "',ITDPortalPassword='" + ITDPortalPassword + "' ";
            str += "where ClientId='" + ITClientID + "'";

            b = da.insertUpdate(str);
           

           
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
    //------------------------------End Save Pan Based Client Master Data---------------------------------------------

    //------------------------------Start Save Pan Based Member Data---------------------------------------------    
    [WebMethod]
    public static string UpdatePANClientDetails(string AllBankDetails)
    {
        bool b = false;
        try
        {
            var serializeData1 = JsonConvert.DeserializeObject<List<ITClientList>>(AllBankDetails);
            foreach (var data in serializeData1)
            {
                //Client_Id = data.ITClientID;
                string str1 = "";
                MySqlCommand cmd;
                if (data.AccountNo != "" || data.IFSC != "")
                {
                    if (data.AccountId == "")
                    {
                        str1 = "insert into clientpanaccounts(ClientId,AccountNo,IFSC) values(@ClientId,@AccountNo,@IFSC)";
                        cmd = new MySqlCommand(str1);
                        cmd.Parameters.Add("@ClientId", MySqlDbType.VarChar).Value = data.ClientId;
                        cmd.Parameters.Add("@AccountNo", MySqlDbType.VarChar).Value = data.AccountNo;
                        cmd.Parameters.Add("@IFSC", MySqlDbType.VarChar).Value = data.IFSC;
                    }
                    else
                    {
                        str1 = "update clientpanaccounts set AccountNo=@AccountNo,IFSC=@IFSC where AccountId=@AccountId";
                        cmd = new MySqlCommand(str1);
                        cmd.Parameters.Add("@AccountId", MySqlDbType.VarChar).Value = data.AccountId;
                        cmd.Parameters.Add("@AccountNo", MySqlDbType.VarChar).Value = data.AccountNo;
                        cmd.Parameters.Add("@IFSC", MySqlDbType.VarChar).Value = data.IFSC;
                    }
                    

                    b = da.InsertUpdateData(cmd);
                    //i++;
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
    //------------------------------End Update PAN Based Member Data---------------------------------------------  
    //------------------------------Start Update TAN Based Client Master Data---------------------------------------------
    [WebMethod]
    public static string UpdateTANClientMasterData(string TDSClientID, string TDSTANNumber, string TDSOfficeName, string TDSAuthorisedPerson, string TDSOfficeAddress, string TDSPinCode, string TDSOfficeEmailID, string TDSState, string TDSTracesUserId, string TDSTracesPassword, string Status)
    {
        bool b = false;
        string str = "";
        try
        {
            Client_Id = TDSClientID;

            str += "Update clienttanmaster set OfficeName='" + TDSOfficeName + "',AuthorisedPersone='" + TDSAuthorisedPerson + "',";
            str += "OfficeAddress='" + System.Uri.UnescapeDataString(TDSOfficeAddress) + "',Pincode=" + TDSPinCode + ",OfficeEmail='" + TDSOfficeEmailID + "',";
            str += "StateCode=" + TDSState + ",TracesUserId='" + TDSTracesUserId + "',TracesPassword='"+TDSTracesPassword+"' ";
            str += "where ClientId='" + TDSClientID + "'";
            b = da.insertUpdate(str);            
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
    //------------------------------End Update TAN Based Client Master Data---------------------------------------------

    //------------------------------Start Update TAN Based Member Data---------------------------------------------    
    [WebMethod]
    public static string UpdateTANClientDetails(string TANContactPersoneDetails)
    {
        bool b = false;
        try
        {
            var serializeData1 = JsonConvert.DeserializeObject<List<TDSClientList>>(TANContactPersoneDetails);
            foreach (var data in serializeData1)
            {
                Client_Id = data.ClientId;
                string str1 = "";
                MySqlCommand cmd;
                if (data.PersoneName != "" || data.MobileNo != "")
                {
                    if (data.PersonID == "")
                    {
                        str1 = "insert into clienttancontactpersons(ClientId,PersoneName,MobileNo) values(@ClientId,@PersoneName,@MobileNo)";
                        cmd = new MySqlCommand(str1);
                        cmd.Parameters.Add("@ClientId", MySqlDbType.VarChar).Value = data.ClientId;
                        cmd.Parameters.Add("@PersoneName", MySqlDbType.VarChar).Value = data.PersoneName;
                        cmd.Parameters.Add("@MobileNo", MySqlDbType.VarChar).Value = data.MobileNo;
                    }
                    else
                    {
                        str1 = "update clienttancontactpersons set PersoneName=@PersoneName,MobileNo=@MobileNo where PersonID=@PersonID";
                        cmd = new MySqlCommand(str1);
                        cmd.Parameters.Add("@PersonID", MySqlDbType.VarChar).Value = data.PersonID;
                        cmd.Parameters.Add("@PersoneName", MySqlDbType.VarChar).Value = data.PersoneName;
                        cmd.Parameters.Add("@MobileNo", MySqlDbType.VarChar).Value = data.MobileNo;
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
            return Client_Id;
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Update TAN Based Member Data---------------------------------------------  

    //------------------------------Start Update GST Payer Client Master Data---------------------------------------------
    [WebMethod]
    public static string UpdateGSTPClientMasterData(string GSTPClientID, string GSTPGSTNumber, string GSTPApplicanteName, string GSTPFatherName, string GSTPApplicantAddress, string GSTPPinCode, string GSTPState, string GSTPBirthDate, string GSTPMobileNo, string GSTPApplicantEmail, string GSTNPUserId, string GSTNPPassword, string Status)
    {
        bool b = false;
        string str = "";
        try
        {
            str += "Update clientgstpayermaster set ApplicantName='" + GSTPApplicanteName + "',ApplicantFatherName='"+GSTPFatherName+"',";
            str += "ApplicantAddress='" + System.Uri.UnescapeDataString(GSTPApplicantAddress) + "',Pincode=" + GSTPPinCode + ",";
            str += "BirthDate='" + Convert.ToDateTime(GSTPBirthDate).ToString("yyyy-MM-dd") + "',ApplicantMobileNo='" + GSTPMobileNo + "',";
            str += "ApplicantEmail='" + GSTPApplicantEmail + "',StateCode=" + GSTPState + ",GSTNUserID='" + GSTNPUserId + "',GSTNPassword='" + GSTNPPassword + "' ";
            str += "where ClientId='" + GSTPClientID + "'";

            b = da.insertUpdate(str);
        }
        catch (Exception ex)
        {

        }

        if (b)
            return "Record Added SuccessFully..!";
            //return Client_Id;
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Update GST Payer Client Master Data---------------------------------------------

    //------------------------------Start Update GST Deductor Client Master Data---------------------------------------------
    [WebMethod]
    public static string UpdateGSTDClientMasterData(string GSTDClientID, string GSTDGSTNumber, string GSTDOfficeName, string GSTDAuthorisedPersonName, string GSTDOfficeAddress, string GSTDPinCode, string GSTDState, string GSTDOfficeEmail, string GSTNDUserId, string GSTNDPassword, string Status)
    {
        bool b = false;
        string str = "";
        try
        {
            Client_Id = GSTDClientID;

            str += "Update clientgstdeductormaster set OfficeName='" + GSTDOfficeName + "',AuthorisedPersone='" + GSTDAuthorisedPersonName + "',";
            str += "OfficeAddress='" + System.Uri.UnescapeDataString(GSTDOfficeAddress) + "',Pincode=" + GSTDPinCode + ",OfficeEmail='" + GSTDOfficeEmail + "',";
            str += "StateCode=" + GSTDState + ",GSTNUserID='" + GSTNDUserId + "',GSTNPassword='" + GSTNDPassword + "' ";
            str += "where ClientId='" + GSTDClientID + "'";
           
            b = da.insertUpdate(str);
        }
        catch (Exception ex)
        {

        }

        if (b)
            //return "Record Added SuccessFully..!";
            return Client_Id;
        else
            return "Record Not Added..?";
    }
    //------------------------------End Update GST Deductor Client Master Data---------------------------------------------

    //------------------------------Start Update GST Deductor Member Data---------------------------------------------    
    [WebMethod]
    public static string UpdateGSTDClientDetails(string GSTDContactPersoneDetails)
    {
        bool b = false;
        try
        {
            var serializeData1 = JsonConvert.DeserializeObject<List<GSTTaxDeductor>>(GSTDContactPersoneDetails);
            foreach (var data in serializeData1)
            {
                Client_Id = data.ClientId;
                string str1 = "";
                MySqlCommand cmd;
                if (data.PersoneName != "" || data.MobileNo != "")
                {
                    if (data.PersonID == "")
                    {
                        str1 = "insert into clientgstdeductorcontactpersone(ClientId,PersoneName,MobileNo) values(@ClientId,@PersoneName,@MobileNo)";
                        cmd = new MySqlCommand(str1);
                        cmd.Parameters.Add("@ClientId", MySqlDbType.VarChar).Value = data.ClientId;
                        cmd.Parameters.Add("@PersoneName", MySqlDbType.VarChar).Value = data.PersoneName;
                        cmd.Parameters.Add("@MobileNo", MySqlDbType.VarChar).Value = data.MobileNo;
                    }
                    else
                    {
                        str1 = "update clientgstdeductorcontactpersone set PersoneName=@PersoneName,MobileNo=@MobileNo where PersonID=@PersonID";
                        cmd = new MySqlCommand(str1);
                        cmd.Parameters.Add("@PersonID", MySqlDbType.VarChar).Value = data.PersonID;
                        cmd.Parameters.Add("@PersoneName", MySqlDbType.VarChar).Value = data.PersoneName;
                        cmd.Parameters.Add("@MobileNo", MySqlDbType.VarChar).Value = data.MobileNo;
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
            return Client_Id;
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Update GST Deductor Member Data--------------------------------------------- 



    //===================Start DownLaad IT Client All Documents==========================
    [WebMethod]
    public static string DownloadAllItDocument(string ClientID, string ClientName,string TableName)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT * FROM " + TableName + " WHERE ClientId='" + ClientID + "' ";

        ITClientList[] md = Contl.DownloadITClientDocument(str);
        string zipFileName = da.DownloadAllDoc(ClientName, md);
        return zipFileName;        
    }
    //===================End DownLaad IT Client All Documents==========================

    public static string ReplacingQuot(string FID)
    {
        string FIDstring = "";
        string FIDSingle = "";
        if (FID == "0" || FID == "" || FID == "null")
        {
            FID = "";
            FIDstring += "FranchiseeId LIKE '%" + FID + "%'";
        }
        else
        {
            string[] eid = Regex.Split(FID, ",");
            for (int i = 0; i < eid.Length; i++)
            {
                FIDSingle += "'" + eid[i] + "',";
            }

            FIDstring += "FranchiseeId IN (" + FIDSingle.TrimEnd(',') + ")";
        }


        return FIDstring;
    }
}