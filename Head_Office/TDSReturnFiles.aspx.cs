﻿using MySql.Data.MySqlClient;
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
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    //===================Start Bind Emp Name For AssignedTo==========================
    [WebMethod]
    public static ITFiles[] BindAssignedTo()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT DISTINCT(im.AssignedTo),em.EmpName FROM tdsmaster im ";
        str += "LEFT JOIN employeemaster em ON im.AssignedTo=em.EmpId ";
        str += "WHERE im.FileStatus='Assigned'";


        ITFiles[] md = Contl.GetEmpNameAssignedTo(str);
        return md.ToArray();
    }
    //===================End Bind Emp Name For AssignedTo==========================

    //===================Start Bind Emp Name For Verified By==========================
    [WebMethod]
    public static ITFiles[] BindVerifiedBy()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT DISTINCT(im.AssignedTo),em.EmpName FROM tdsmaster im ";
        str += "LEFT JOIN employeemaster em ON im.AssignedTo=em.EmpId ";
        str += "WHERE im.FileStatus='Verified'";
        
        ITFiles[] md = Contl.GetEmpNameAssignedTo(str);
        return md.ToArray();
    }
    //===================End Bind Emp Name For Verified By==========================

    //===================Start Bind Emp Name For Completed By==========================
    [WebMethod]
    public static ITFiles[] BindCompletedBy()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT DISTINCT(im.AssignedTo),em.EmpName FROM tdsmaster im ";
        str += "LEFT JOIN employeemaster em ON im.AssignedTo=em.EmpId ";
        str += "WHERE im.FileStatus='Completed'";

        ITFiles[] md = Contl.GetEmpNameAssignedTo(str);
        return md.ToArray();
    }
    //===================End Bind Emp Name For Completed By==========================

    //===================Start Bind Firm Name New==========================
    [WebMethod]
    public static FranchiseeList[] BindFirmNameNew()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT DISTINCT(tm.FranchiseeID),fm.FirmName FROM tdsmaster tm ";
        str += "LEFT JOIN franchiseemaster fm ON tm.FranchiseeID=fm.FranchiseeID WHERE tm.FileStatus='New'";

        FranchiseeList[] md = Contl.GetFirmName(str);
        return md.ToArray();
    }
    //===================End Bind Firm Name New==========================

    //===================Start Bind Firm Name Assigned==========================
    [WebMethod]
    public static FranchiseeList[] BindFirmNameAssigned()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT DISTINCT(tm.FranchiseeID),fm.FirmName FROM tdsmaster tm ";
        str += "LEFT JOIN franchiseemaster fm ON tm.FranchiseeID=fm.FranchiseeID WHERE tm.FileStatus='Assigned'";

        FranchiseeList[] md = Contl.GetFirmName(str);
        return md.ToArray();
    }
    //===================End Bind Firm Name Assigned==========================

    //===================Start Bind Firm Name Verified==========================
    [WebMethod]
    public static FranchiseeList[] BindFirmNameVerified()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT DISTINCT(tm.FranchiseeID),fm.FirmName FROM tdsmaster tm ";
        str += "LEFT JOIN franchiseemaster fm ON tm.FranchiseeID=fm.FranchiseeID WHERE tm.FileStatus='Verified'";
        FranchiseeList[] md = Contl.GetFirmName(str);
        return md.ToArray();
    }
    //===================End Bind Firm Name Verified==========================

    //===================Start Bind Firm Name Completed==========================
    [WebMethod]
    public static FranchiseeList[] BindFirmNameCompleted()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT DISTINCT(tm.FranchiseeID),fm.FirmName FROM tdsmaster tm ";
        str += "LEFT JOIN franchiseemaster fm ON tm.FranchiseeID=fm.FranchiseeID WHERE tm.FileStatus='Completed'";
        FranchiseeList[] md = Contl.GetFirmName(str);
        return md.ToArray();
    }
    //===================End Bind Firm Name Completed==========================

    //===================Start Get TDS Files==========================
    [WebMethod]
    public static TDSList[] GetTDSFiles(string FranchiseeID, string StartDate, string EndDate, string AssignedTo, string SearchText, string FileStatus)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";

        if (AssignedTo == "0" || AssignedTo == "null")
        {
            AssignedTo = "";
        }
        string FIDs = ReplacingQuot(FranchiseeID);

        if (FileStatus == "New" && StartDate == "" && EndDate == "")
        {
            str += "SELECT im.*,pm.*,em.EmpName,tdsc.MobileNo FROM tdsmaster im ";
            str += "LEFT JOIN clienttanmaster pm ON im.ClientID=pm.ClientID ";
            str += "LEFT JOIN employeemaster em ON im.AssignedTo=em.EmpId ";
            str += "LEFT JOIN clienttancontactpersons tdsc ON im.PersonId=tdsc.PersonID ";
            str += "WHERE im." + FIDs + " AND im.FileStatus LIKE '%New%' AND ";            
            str += "(im.FranchiseeID LIKE '%" + SearchText + "%' OR ContactPerson LIKE '%" + SearchText + "%' OR ContactPersonMobile LIKE '%" + SearchText + "%' OR ";
            str += "OfficeName LIKE '%" + SearchText + "%' OR AuthorisedPersone LIKE '%" + SearchText + "%' OR OfficeAddress LIKE '%" + SearchText + "%' OR  EmpName LIKE '%" + SearchText + "%') ORDER BY im.Date DESC";

        }
        else if (FileStatus == "New" && StartDate != "" && EndDate != "")
        {
            str += "SELECT im.*,pm.*,em.EmpName,tdsc.MobileNo FROM tdsmaster im ";
            str += "LEFT JOIN clienttanmaster pm ON im.ClientID=pm.ClientID ";
            str += "LEFT JOIN employeemaster em ON im.AssignedTo=em.EmpId ";
            str += "LEFT JOIN clienttancontactpersons tdsc ON im.PersonId=tdsc.PersonID ";
            str += "WHERE im." + FIDs + " AND im.FileStatus LIKE '%New%' AND ";
            str += "(im.FranchiseeID LIKE '%" + SearchText + "%' OR ContactPerson LIKE '%" + SearchText + "%' OR ContactPersonMobile LIKE '%" + SearchText + "%' OR ";
            str += "OfficeName LIKE '%" + SearchText + "%' OR AuthorisedPersone LIKE '%" + SearchText + "%' OR OfficeAddress LIKE '%" + SearchText + "%' OR  EmpName LIKE '%" + SearchText + "%') AND ";
            str += "(im.Date BETWEEN '" + Convert.ToDateTime(StartDate).ToString("yyyy-MM-dd") + "' AND '" + Convert.ToDateTime(EndDate).ToString("yyyy-MM-dd") + "') ORDER BY im.Date DESC";
        }
        else if (FileStatus == "Assigned" && StartDate == "" && EndDate == "")
        {
            str += "SELECT im.*,pm.*,em.EmpName,tdsc.MobileNo FROM tdsmaster im ";
            str += "LEFT JOIN clienttanmaster pm ON im.ClientID=pm.ClientID ";
            str += "LEFT JOIN employeemaster em ON im.AssignedTo=em.EmpId ";
            str += "LEFT JOIN clienttancontactpersons tdsc ON im.PersonId=tdsc.PersonID ";
            str += "WHERE im." + FIDs + " AND im.AssignedTo LIKE '%" + AssignedTo + "%' AND ";
            str += "(im.FranchiseeID LIKE '%" + SearchText + "%' OR ContactPerson LIKE '%" + SearchText + "%' OR ContactPersonMobile LIKE '%" + SearchText + "%' OR ";
            str += "OfficeName LIKE '%" + SearchText + "%' OR AuthorisedPersone LIKE '%" + SearchText + "%' OR OfficeAddress LIKE '%" + SearchText + "%' OR EmpName LIKE '%" + SearchText + "%') ";
            str += "AND im.FileStatus LIKE '%Assigned%' ORDER BY im.AssignedDate DESC";            
        }
        else if (FileStatus == "Assigned" && StartDate != "" && EndDate != "")
        {
            str += "SELECT im.*,pm.*,em.EmpName,tdsc.MobileNo FROM tdsmaster im ";
            str += "LEFT JOIN clienttanmaster pm ON im.ClientID=pm.ClientID ";
            str += "LEFT JOIN employeemaster em ON im.AssignedTo=em.EmpId ";
            str += "LEFT JOIN clienttancontactpersons tdsc ON im.PersonId=tdsc.PersonID ";
            str += "WHERE im." + FIDs + " AND im.AssignedTo LIKE '%" + AssignedTo + "%' AND ";
            str += "(im.FranchiseeID LIKE '%" + SearchText + "%' OR ContactPerson LIKE '%" + SearchText + "%' OR ContactPersonMobile LIKE '%" + SearchText + "%' OR ";
            str += "OfficeName LIKE '%" + SearchText + "%' OR AuthorisedPersone LIKE '%" + SearchText + "%' OR OfficeAddress LIKE '%" + SearchText + "%' OR EmpName LIKE '%" + SearchText + "%') ";
            str += "AND im.FileStatus LIKE '%Assigned%' AND";
            str += "(im.AssignedDate BETWEEN '" + Convert.ToDateTime(StartDate).ToString("yyyy-MM-dd") + "' AND '" + Convert.ToDateTime(EndDate).ToString("yyyy-MM-dd") + "') ORDER BY im.AssignedDate DESC";
        }
        else if (FileStatus == "Verified" && StartDate == "" && EndDate == "")
        {
            str += "SELECT im.*,pm.*,em.EmpName,tdsc.MobileNo FROM tdsmaster im ";
            str += "LEFT JOIN clienttanmaster pm ON im.ClientID=pm.ClientID ";
            str += "LEFT JOIN employeemaster em ON im.AssignedTo=em.EmpId ";
            str += "LEFT JOIN clienttancontactpersons tdsc ON im.PersonId=tdsc.PersonID ";
            str += "WHERE im." + FIDs + " AND im.AssignedTo LIKE '%" + AssignedTo + "%' AND ";
            str += "(im.FranchiseeID LIKE '%" + SearchText + "%' OR ContactPerson LIKE '%" + SearchText + "%' OR ContactPersonMobile LIKE '%" + SearchText + "%' OR ";
            str += "OfficeName LIKE '%" + SearchText + "%' OR AuthorisedPersone LIKE '%" + SearchText + "%' OR OfficeAddress LIKE '%" + SearchText + "%' OR EmpName LIKE '%" + SearchText + "%') ";
            str += "AND im.FileStatus LIKE '%Verified%' ORDER BY im.VerifiedDate DESC";
        }
        else if (FileStatus == "Verified" && StartDate != "" && EndDate != "")
        {
            str += "SELECT im.*,pm.*,em.EmpName,tdsc.MobileNo FROM tdsmaster im ";
            str += "LEFT JOIN clienttanmaster pm ON im.ClientID=pm.ClientID ";
            str += "LEFT JOIN employeemaster em ON im.AssignedTo=em.EmpId ";
            str += "LEFT JOIN clienttancontactpersons tdsc ON im.PersonId=tdsc.PersonID ";
            str += "WHERE im." + FIDs + " AND im.AssignedTo LIKE '%" + AssignedTo + "%' AND ";
            str += "(im.FranchiseeID LIKE '%" + SearchText + "%' OR ContactPerson LIKE '%" + SearchText + "%' OR ContactPersonMobile LIKE '%" + SearchText + "%' OR ";
            str += "OfficeName LIKE '%" + SearchText + "%' OR AuthorisedPersone LIKE '%" + SearchText + "%' OR OfficeAddress LIKE '%" + SearchText + "%' OR EmpName LIKE '%" + SearchText + "%') ";
            str += "AND im.FileStatus LIKE '%Verified%' AND";
            str += "(im.VerifiedDate BETWEEN '" + Convert.ToDateTime(StartDate).ToString("yyyy-MM-dd") + "' AND '" + Convert.ToDateTime(EndDate).ToString("yyyy-MM-dd") + "') ORDER BY im.VerifiedDate DESC";
        }
        else if (FileStatus == "Completed" && StartDate == "" && EndDate == "")
        {
            str += "SELECT im.*,pm.*,em.EmpName,tdsc.MobileNo FROM tdsmaster im ";
            str += "LEFT JOIN clienttanmaster pm ON im.ClientID=pm.ClientID ";
            str += "LEFT JOIN employeemaster em ON im.AssignedTo=em.EmpId ";
            str += "LEFT JOIN clienttancontactpersons tdsc ON im.PersonId=tdsc.PersonID ";
            str += "WHERE im." + FIDs + " AND im.AssignedTo LIKE '%" + AssignedTo + "%' AND ";
            str += "(im.FranchiseeID LIKE '%" + SearchText + "%' OR ContactPerson LIKE '%" + SearchText + "%' OR ContactPersonMobile LIKE '%" + SearchText + "%' OR ";
            str += "OfficeName LIKE '%" + SearchText + "%' OR AuthorisedPersone LIKE '%" + SearchText + "%' OR OfficeAddress LIKE '%" + SearchText + "%' OR EmpName LIKE '%" + SearchText + "%') ";
            str += "AND im.FileStatus LIKE '%Completed%' ORDER BY im.CompletedDate DESC";
        }
        else if (FileStatus == "Completed" && StartDate != "" && EndDate != "")
        {
            str += "SELECT im.*,pm.*,em.EmpName,tdsc.MobileNo FROM tdsmaster im ";
            str += "LEFT JOIN clienttanmaster pm ON im.ClientID=pm.ClientID ";
            str += "LEFT JOIN employeemaster em ON im.AssignedTo=em.EmpId ";
            str += "LEFT JOIN clienttancontactpersons tdsc ON im.PersonId=tdsc.PersonID ";
            str += "WHERE im." + FIDs + " AND im.AssignedTo LIKE '%" + AssignedTo + "%' AND ";
            str += "(im.FranchiseeID LIKE '%" + SearchText + "%' OR ContactPerson LIKE '%" + SearchText + "%' OR ContactPersonMobile LIKE '%" + SearchText + "%' OR ";
            str += "OfficeName LIKE '%" + SearchText + "%' OR AuthorisedPersone LIKE '%" + SearchText + "%' OR OfficeAddress LIKE '%" + SearchText + "%' OR EmpName LIKE '%" + SearchText + "%') ";
            str += "AND im.FileStatus LIKE '%Completed%' AND ";
            str += "(im.CompletedDate BETWEEN '" + Convert.ToDateTime(StartDate).ToString("yyyy-MM-dd") + "' AND '" + Convert.ToDateTime(EndDate).ToString("yyyy-MM-dd") + "') ORDER BY im.CompletedDate DESC";
        }
        TDSList[] md = Contl.GetTDSFileHO(str);
        return md.ToArray();
    }


    public static string ReplacingQuot(string FID)
    {
        string FIDstring = "";
        string FIDSingle = "";
        if (FID == "0" || FID == "" || FID == "null")
        {
            FID = "";
            FIDstring += "FranchiseeID LIKE '%" + FID + "%'";
        }
        else
        {
            string[] eid = Regex.Split(FID, ",");
            for (int i = 0; i < eid.Length; i++)
            {
                FIDSingle += "'" + eid[i] + "',";
            }

            FIDstring += "FranchiseeID IN (" + FIDSingle.TrimEnd(',') + ")";
        }


        return FIDstring;
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
    public static string SaveMasterData(string FileTransactionID, string FranchiseeID, string ClientId, string Subject,string TDSStaffId, string Message)
    {
        bool b = false;
        string str = "";
        try
        {
            FileTransaction_ID = FileTransactionID;
            str += "insert into messagemaster(FileTransactionID,DateTime,MessageType,Receiver_Id,ClientId,StaffId,Subject,Message,Sender,Sender_Id,Status,DeleteStatus) ";
            str += "values ('" + FileTransactionID + "','" + DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss tt") + "','TDS File','" + FranchiseeID + "','" + ClientId + "','" + TDSStaffId + "','" + Subject + "','" + Message.Trim() + "','Head Office','" + HttpContext.Current.Session["EmpId"].ToString() + "','UnRead','Active')";
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

    //=====================Start Update To Completed File=================================
    [WebMethod]
    public static string UpdateToCompleted(string FileTransactionID)
    {
        bool b = false;
        string str = "";
        try
        {
            //FileTransaction_ID = FileTransactionID;
            str += "update tdsmaster set FileStatus='Completed',CompletedDate='" + Convert.ToDateTime(DateTime.Now).ToString("yyyy-MM-dd") + "' where FileTransactionID=" + FileTransactionID + "";

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
    public static string DownloadAllTDSDocument(string FileTransactionID, string ClientName, string TableName)
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