using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.Web.Services;

public partial class Head_Office_FranchiseeList : System.Web.UI.Page
{
    static DataAccess da = new DataAccess();
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    //===================Start New Registration==========================
    [WebMethod]
    public static FranchiseeList[] GetNewRegistration(string FranchiseeID)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        if (FranchiseeID == "0")
        {
            str += "SELECT fm.*,dm.DistrictName,sm.StateName FROM franchiseemaster fm ";
            str += "LEFT JOIN district_master dm ON fm.DistrictId=dm.DistrictId ";
            str += "LEFT JOIN state_master sm ON dm.StateCode=sm.StateCode where fm.Status='InActive' order by fm.ID desc";
        }
        else
        {
            //str += "Select * from CustomerMaster where Status='Active' and CustID=" + CustID + " order by CustID desc ";
        }

        FranchiseeList[] md = Contl.GetFranchisee(str);
        return md.ToArray();
    }
    //===================End New Registration==========================

    //===================Start Approve Franchisee=============================
    [WebMethod]
    public static string Approved(string FranchiseeID)
    {
        bool b = false;
        string Password = "";
        try
        {
            Password = da.generatepassword(8);
            string str = "Update franchiseemaster set RegDate='" + DateTime.Now.ToString("yyyy-MM-dd") + "',Status='Active',Password='" + Password + "' where FranchiseeID='" + FranchiseeID + "'";
            b = da.insertUpdate(str);
                        
        }
        catch (Exception ex)
        {

        }

        if (b)
        {
            string str1 = "Select OwnerName,EmailId from franchiseemaster where FranchiseeID='" + FranchiseeID + "'";
            DataSet ds = da.fillDataset(str1);
            string OwnerName = ds.Tables[0].Rows[0]["OwnerName"].ToString();
            string Email = ds.Tables[0].Rows[0]["EmailId"].ToString();

            da.SendMail(FranchiseeID, OwnerName, Password, Email, "Activate");
            return "Success";
        }
        else
        {
            return "Failed";
        }

    }
    //=====================End Approve Franchisee===============================
    //===================Start Reject Franchisee=============================
    [WebMethod]
    public static string Reject(string FranchiseeID)
    {
        bool b = false;
        string OwnerName = "";
        string Email = "";
        try
        {
            string str1 = "Select OwnerName,EmailId from franchiseemaster where FranchiseeID='" + FranchiseeID + "'";
            DataSet ds = da.fillDataset(str1);
            OwnerName = ds.Tables[0].Rows[0]["OwnerName"].ToString();
            Email = ds.Tables[0].Rows[0]["EmailId"].ToString();

            string str = "Delete from franchiseemaster where FranchiseeID='" + FranchiseeID + "'";
            b = da.insertUpdate(str);

        }
        catch (Exception ex)
        {

        }

        if (b)
        {
            da.SendMail(FranchiseeID, OwnerName, "", Email, "Rejected");
            return "Success";
        }
        else
        {
            return "Failed";
        }

    }
    //=====================End Reject Franchisee===============================

    //===================Start View Franchisee Details==========================
    [WebMethod]
    public static FranchiseeList[] ViewModelBox(string FranchiseeID)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT fm.*,fsm.*,dm.DistrictName,sm.StateName FROM franchiseemaster fm ";
        str += "LEFT JOIN franchiseestaffdetails fsm ON fm.FranchiseeID=fsm.FranchiseeID ";
        str += "LEFT JOIN district_master dm ON fm.DistrictId=dm.DistrictId ";
        str += "LEFT JOIN state_master sm ON dm.StateCode=sm.StateCode where fm.FranchiseeID='" + FranchiseeID + "'";

        FranchiseeList[] md = Contl.GetFranchiseeDetails(str);
        return md.ToArray();
    }
    //===================End View Franchisee Details==========================

    //===================Start Approved Franchisee==========================
    [WebMethod]
    public static FranchiseeList[] GetApprovedFranchisee(string FranchiseeID)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        if (FranchiseeID == "0")
        {
            str += "SELECT fm.*,dm.DistrictName,sm.StateName FROM franchiseemaster fm ";
            str += "LEFT JOIN district_master dm ON fm.DistrictId=dm.DistrictId ";
            str += "LEFT JOIN state_master sm ON dm.StateCode=sm.StateCode where fm.Status='Active' order by fm.ID desc";
        }
        else
        {
            //str += "Select * from CustomerMaster where Status='Active' and CustID=" + CustID + " order by CustID desc ";
        }

        FranchiseeList[] md = Contl.GetApproved(str);
        return md.ToArray();
    }
    //===================End Approved Franchisee==========================

    //===================Start Remove Approved Franchisee=============================
    [WebMethod]
    public static string Remove(string FranchiseeID)
    {
        bool b = false;
        try
        {
            string str = "Update franchiseemaster set Status='Removed' where FranchiseeID='" + FranchiseeID + "'";
            b = da.insertUpdate(str);

        }
        catch (Exception ex)
        {

        }

        if (b)
        {
            string str1 = "Update franchiseestaffdetails set Status='Removed' where FranchiseeID='" + FranchiseeID + "'";
            b = da.insertUpdate(str1);
            return "Success";
        }
        else
        {
            return "Failed";
        }

    }
    //=====================End Remove Approved Franchisee===============================
}