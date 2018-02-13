using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using MySql.Data.MySqlClient;
using System.Data;
using System.Text.RegularExpressions;
using Newtonsoft.Json;

public partial class Head_Office_WorkAllocation : System.Web.UI.Page
{
    static DataAccess da = new DataAccess();
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    //===================Start Bind IT Franchisee Name==========================
    [WebMethod]
    public static FranchiseeList[] BindFranchiseeNameIT()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT DISTINCT(im.FranchiseeID),fm.FirmName FROM itmaster im ";
        str += "LEFT JOIN franchiseemaster fm ON im.FranchiseeID=fm.FranchiseeID where im.FileStatus='New'";

        FranchiseeList[] md = Contl.GetFirmName(str);
        return md.ToArray();
    }
    //===================End Bind IT Franchisee Name==========================

    //===================Start Bind TDS Franchisee Name==========================
    [WebMethod]
    public static FranchiseeList[] BindFranchiseeNameTDS()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT DISTINCT(tm.FranchiseeID),fm.FirmName FROM tdsmaster tm ";
        str += "LEFT JOIN franchiseemaster fm ON tm.FranchiseeID=fm.FranchiseeID where tm.FileStatus='New'";

        FranchiseeList[] md = Contl.GetFirmName(str);
        return md.ToArray();
    }
    //===================End Bind TDS Franchisee Name==========================
    //===================Start Bind GSTP Franchisee Name==========================
    [WebMethod]
    public static FranchiseeList[] BindFranchiseeNameGSTP()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT DISTINCT(gp.FranchiseeID),fm.FirmName FROM gstregistrationmaster gp ";
        str += "LEFT JOIN franchiseemaster fm ON gp.FranchiseeID=fm.FranchiseeID where gp.GSTType='TAX_Payer' and gp.FileStatus='New'";

        FranchiseeList[] md = Contl.GetFirmName(str);
        return md.ToArray();
    }
    //===================End Bind GSTP Franchisee Name==========================

    //===================Start Bind GSTD Franchisee Name==========================
    [WebMethod]
    public static FranchiseeList[] BindFranchiseeNameGSTD()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT DISTINCT(gp.FranchiseeID),fm.FirmName FROM gstregistrationmaster gp ";
        str += "LEFT JOIN franchiseemaster fm ON gp.FranchiseeID=fm.FranchiseeID where gp.GSTType='TAX_Deductor' and gp.FileStatus='New'";

        FranchiseeList[] md = Contl.GetFirmName(str);
        return md.ToArray();
    }
    //===================End Bind GSTD Franchisee Name==========================

    //===================Start Bind ITN Franchisee Name==========================
    [WebMethod]
    public static FranchiseeList[] BindFranchiseeNameITN()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT DISTINCT(im.FranchiseeID),fm.FirmName FROM itnoticemaster im ";
        str += "LEFT JOIN franchiseemaster fm ON im.FranchiseeID=fm.FranchiseeID where im.FileStatus='New'";

        FranchiseeList[] md = Contl.GetFirmName(str);
        return md.ToArray();
    }
    //===================End Bind ITN Franchisee Name==========================

    //===================Start Bind Employee Name==========================
    [WebMethod]
    public static EmployeeData[] BindEmployeeName()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT Distinct(EmpId),EmpName FROM employeemaster WHERE STATUS='Active' and Designation!='Admin'";

        EmployeeData[] md = Contl.GetHeadOfficeName(str);
        return md.ToArray();
    }
    //===================End Bind Employee Name==========================

    //===================Start Get IT Files==========================
    [WebMethod]
    public static ITFiles[] GetITFiles(string EID)
    {
        string str = "";
        HeadOfficeController Contl = new HeadOfficeController();
        if(EID=="0" || EID=="null")
        {
            str += "SELECT im.*,pm.* FROM itmaster im LEFT JOIN clientpanmaster pm ON im.ClientID=pm.ClientID where FileStatus='New' ORDER BY im.FileTransactionID DESC";
            //str += "SELECT im.*,pm.*,em.EmpName FROM itmaster im ";
            //str += "LEFT JOIN clientpanmaster pm ON im.ClientID=pm.ClientID ";
            //str += "LEFT JOIN employeemaster em ON im.AssignedTo=em.EmpId ";
            //str += "WHERE FileStatus='New' ORDER BY im.FileTransactionID DESC";
        }
        else
        {
            string FIDs = "";
            string[] eid = Regex.Split(EID,",");
            for (int i = 0; i < eid.Length;i++)
            {
                FIDs += "'" + eid[i] + "',";
            }
            str += " SELECT im.*,pm.* FROM itmaster im LEFT JOIN clientpanmaster pm ON im.ClientID=pm.ClientID where FileStatus='New' and im.FranchiseeID IN (" + FIDs.TrimEnd(',') + ") ORDER BY im.FileTransactionID DESC";

            //str += "SELECT im.*,pm.*,em.EmpName FROM itmaster im ";
            //str += "LEFT JOIN clientpanmaster pm ON im.ClientID=pm.ClientID ";
            //str += "LEFT JOIN employeemaster em ON im.AssignedTo=em.EmpId ";
            //str += "where FileStatus='New' and im.FranchiseeID IN (" + FIDs.TrimEnd(',') + ") ORDER BY im.FileTransactionID DESC";
        }
        
        ITFiles[] md = Contl.GetITFile(str);
        return md.ToArray();
    }
    //===================End Get IT Files List==========================


    //===================Start Get TDS Files==========================
    [WebMethod]
    public static TDSList[] GetTDSFiles(string EID)
    {
        string str = "";
        HeadOfficeController Contl = new HeadOfficeController();
        if (EID == "0" || EID == "null")
        {
            str = "SELECT tm.*,cm.* FROM tdsmaster tm LEFT JOIN clienttanmaster cm ON tm.clientid=cm.clientid where FileStatus='New' order by tm.FileTransactionID desc";
        }
        else
        {
            string FIDs = "";
            string[] eid = Regex.Split(EID, ",");
            for (int i = 0; i < eid.Length; i++)
            {
                FIDs += "'" + eid[i] + "',";
            }
            str = "SELECT tm.*,cm.* FROM tdsmaster tm LEFT JOIN clienttanmaster cm ON tm.clientid=cm.clientid where FileStatus='New' and tm.FranchiseeID IN (" + FIDs.TrimEnd(',') + ") order by tm.FileTransactionID desc";
        }
        TDSList[] md = Contl.GetTDSFile(str);
        return md.ToArray();
    }
    //===================End Get TDS Files List==========================

    //===================Start Get IT Files==========================
    [WebMethod]
    public static ITFiles[] GetITNFiles(string EID)
    {
        string str = "";
        HeadOfficeController Contl = new HeadOfficeController();
        if (EID == "0" || EID == "null")
        {
            str = "SELECT im.*,pm.* FROM itnoticemaster im LEFT JOIN clientpanmaster pm ON im.ClientID=pm.ClientID where FileStatus='New' ORDER BY im.FileTransactionID DESC";
        }
        else
        {
            string FIDs = "";
            string[] eid = Regex.Split(EID, ",");
            for (int i = 0; i < eid.Length; i++)
            {
                FIDs += "'" + eid[i] + "',";
            }
            str = "SELECT im.*,pm.* FROM itnoticemaster im LEFT JOIN clientpanmaster pm ON im.ClientID=pm.ClientID where FileStatus='New' and im.FranchiseeID IN (" + FIDs.TrimEnd(',') + ") ORDER BY im.FileTransactionID DESC";
            
        }
         
        ITFiles[] md = Contl.GetITFile(str);
        return md.ToArray();
    }
    //===================End Get IT Files List==========================


    //===================Start Get GST Reg Tax Payer List==========================
    [WebMethod]
    public static GSTRegistrationList[] GetGSTRegTP(string EID, string GSTType)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        if (EID == "0" || EID == "null")
        {
            str += "SELECT * from gstregistrationmaster where FileStatus='New' and GSTType='" + GSTType + "' order by ReferenceId desc";
        }
        else
        {
            string FIDs = "";
            string[] eid = Regex.Split(EID, ",");
            for (int i = 0; i < eid.Length; i++)
            {
                FIDs += "'" + eid[i] + "',";
            }
            str += "SELECT * from gstregistrationmaster where FileStatus='New' and GSTType='" + GSTType + "' and FranchiseeID IN (" + FIDs.TrimEnd(',') + ") order by ReferenceId desc";
        }        
        GSTRegistrationList[] md = Contl.GetGSTRegListTP(str);
        return md.ToArray();
    }
    //===================End Get GST Reg Tax Payer List==========================

    //===================Start Get GST Reg Tax Deductor List==========================
    [WebMethod]
    public static GSTRegistrationList[] GetGSTRegTD(string EID, string GSTType)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        if (EID == "0" || EID == "null")
        {
            str += "SELECT * from gstregistrationmaster where FileStatus='New' and GSTType='" + GSTType + "' order by ReferenceId desc";
        }
        else
        {
            string FIDs = "";
            string[] eid = Regex.Split(EID, ",");
            for (int i = 0; i < eid.Length; i++)
            {
                FIDs += "'" + eid[i] + "',";
            }
            str += "SELECT * from gstregistrationmaster where FileStatus='New' and GSTType='" + GSTType + "' and FranchiseeID IN (" + FIDs.TrimEnd(',') + ") order by ReferenceId desc";
        }   
        GSTRegistrationList[] md = Contl.GetGSTRegListTD(str);
        return md.ToArray();
    }
    //===================End Get GST Reg Tax Deductor List==========================

    //------------------------------Start Save Assigned IT Files---------------------------------------------    
    [WebMethod]
    public static string SaveAssignedIT(string AllAttachmentIT)
    {
        bool b = false;
        string empid = "";
        try
        {
            var serializeData = JsonConvert.DeserializeObject<List<AssignedFiles>>(AllAttachmentIT);
            foreach (var data in serializeData)
            {
                empid = data.EmpId;
                if (data.EmpId != "" && data.FileID != "")
                {                    
                    string str = "Update itmaster set FileStatus=@FileStatus,AssignedTo=@AssignedTo,AssignedDate=@AssignedDate where FileTransactionID=@FileTransactionID";
                    MySqlCommand cmd = new MySqlCommand(str);
                    cmd.Parameters.Add("@FileTransactionID", MySqlDbType.VarChar).Value = data.FileID;
                    cmd.Parameters.Add("@FileStatus", MySqlDbType.VarChar).Value = "Assigned";
                    cmd.Parameters.Add("@AssignedTo", MySqlDbType.VarChar).Value = data.EmpId;
                    cmd.Parameters.Add("@AssignedDate", MySqlDbType.VarChar).Value = Convert.ToDateTime(DateTime.Now).ToString("yyyy-MM-dd");

                    b = da.InsertUpdateData(cmd);
                }
            }

        }

        catch (Exception ex)
        {

        }

        if (b)
            //return "Record Added SuccessFully..!";
            return empid;
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Save Assigned IT Files--------------------------------------------- 

    //------------------------------Start Save Assigned TDS Files---------------------------------------------    
    [WebMethod]
    public static string SaveAssignedTDS(string AllAttachmentTDS)
    {
        bool b = false;
        string empid = "";
        try
        {
            var serializeData = JsonConvert.DeserializeObject<List<AssignedFiles>>(AllAttachmentTDS);
            foreach (var data in serializeData)
            {
                empid = data.EmpId;
                if (data.EmpId != "" && data.FileID != "")
                {
                    string str = "Update tdsmaster set FileStatus=@FileStatus,AssignedTo=@AssignedTo,AssignedDate=@AssignedDate where FileTransactionID=@FileTransactionID";
                    MySqlCommand cmd = new MySqlCommand(str);
                    cmd.Parameters.Add("@FileTransactionID", MySqlDbType.VarChar).Value = data.FileID;
                    cmd.Parameters.Add("@FileStatus", MySqlDbType.VarChar).Value = "Assigned";
                    cmd.Parameters.Add("@AssignedTo", MySqlDbType.VarChar).Value = data.EmpId;
                    cmd.Parameters.Add("@AssignedDate", MySqlDbType.VarChar).Value = Convert.ToDateTime(DateTime.Now).ToString("yyyy-MM-dd");

                    b = da.InsertUpdateData(cmd);
                }
            }

        }

        catch (Exception ex)
        {

        }

        if (b)
            //return "Record Added SuccessFully..!";
            return empid;
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Save Assigned TDS Files---------------------------------------------  


    //------------------------------Start Save Assigned GST Files---------------------------------------------    
    [WebMethod]
    public static string SaveAssignedGST(string AllAttachmentGST)
    {
        bool b = false;
        string empid = "";
        try
        {
            var serializeData = JsonConvert.DeserializeObject<List<AssignedFiles>>(AllAttachmentGST);
            foreach (var data in serializeData)
            {
                empid = data.EmpId;
                if (data.EmpId != "" && data.FileID != "")
                {
                    string str = "Update gstregistrationmaster set FileStatus=@FileStatus,AssignedTo=@AssignedTo,AssignedDate=@AssignedDate where ReferenceId=@ReferenceId";
                    MySqlCommand cmd = new MySqlCommand(str);
                    cmd.Parameters.Add("@ReferenceId", MySqlDbType.VarChar).Value = data.FileID;
                    cmd.Parameters.Add("@FileStatus", MySqlDbType.VarChar).Value = "Assigned";
                    cmd.Parameters.Add("@AssignedTo", MySqlDbType.VarChar).Value = data.EmpId;
                    cmd.Parameters.Add("@AssignedDate", MySqlDbType.VarChar).Value = Convert.ToDateTime(DateTime.Now).ToString("yyyy-MM-dd");

                    b = da.InsertUpdateData(cmd);
                }
            }

        }

        catch (Exception ex)
        {

        }

        if (b)
            //return "Record Added SuccessFully..!";
            return empid;
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Save Assigned GST Files--------------------------------------------- 

    //------------------------------Start Save Assigned ITN Files---------------------------------------------    
    [WebMethod]
    public static string SaveAssignedITN(string AllAttachmentITN)
    {
        bool b = false;
        string empid = "";
        try
        {
            var serializeData = JsonConvert.DeserializeObject<List<AssignedFiles>>(AllAttachmentITN);
            foreach (var data in serializeData)
            {
                empid = data.EmpId;
                if (data.EmpId != "" && data.FileID != "")
                {
                    string str = "Update itnoticemaster set FileStatus=@FileStatus,AssignedTo=@AssignedTo,AssignedDate=@AssignedDate where FileTransactionID=@FileTransactionID";
                    MySqlCommand cmd = new MySqlCommand(str);
                    cmd.Parameters.Add("@FileTransactionID", MySqlDbType.VarChar).Value = data.FileID;
                    cmd.Parameters.Add("@FileStatus", MySqlDbType.VarChar).Value = "Assigned";
                    cmd.Parameters.Add("@AssignedTo", MySqlDbType.VarChar).Value = data.EmpId;
                    cmd.Parameters.Add("@AssignedDate", MySqlDbType.VarChar).Value = Convert.ToDateTime(DateTime.Now).ToString("yyyy-MM-dd");

                    b = da.InsertUpdateData(cmd);
                }
            }

        }

        catch (Exception ex)
        {

        }

        if (b)
            //return "Record Added SuccessFully..!";
            return empid;
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Save Assigned ITN Files---------------------------------------------  
}