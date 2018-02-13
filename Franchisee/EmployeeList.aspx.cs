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
public partial class Franchisee_GSTFiling : System.Web.UI.Page
{
    static DataAccess da = new DataAccess();
    static string Franchisee_Id = "";
    static string ReferenceID = "";
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
                // Staff_Id = Session["StaffID"].ToString();

            }
        }
        catch (Exception ex)
        {
            Response.Redirect("../Login.aspx");

        }
    }
    public string GetFranchiseeID()
    {
        string FID = HttpContext.Current.Session["FranchiseeID"].ToString();
        return FID;
    }

    //===================Start Get Employee List==========================
    [WebMethod]
    public static EmplyeeList[] GetEmployeeDetails(string StaffID)
    {
        Franchisee_GSTFiling fg = new Franchisee_GSTFiling();
        string FranchiseeID = fg.GetFranchiseeID();

        FranchiseeController Contl = new FranchiseeController();
        string str = "";
        if (StaffID == "0")
        {
            str += "SELECT * FROM franchiseestaffdetails where FranchiseeID='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "' order by ID desc";
        }
        
        EmplyeeList[] md = Contl.GetEmployees(str);
        return md.ToArray();
    }
    //===================End Get Employee List==========================

    //===================Start Generate System generated password=============================
    [WebMethod]
    public static string GeneratePassword(string StaffID)
    {
        string Password = "";
        try
        {
            Password = da.generatepassword(8);           
        }
        catch (Exception ex)
        {

        }
        return Password;       
    }
    //=====================End Generate System generated password===============================



    //===================Start Update Employee password=============================
    [WebMethod]
    public static string UpdateEmployeePassowrd(string StaffID,string Password)
    {
        bool b = false;
       
        try
        {
            string str = "";
            str += "Update franchiseestaffdetails set StaffPassword=@StaffPassword,Status=@Status where StaffID=@StaffID";

            MySqlCommand cmd = new MySqlCommand(str);
            cmd.Parameters.Add("@StaffPassword", MySqlDbType.VarChar).Value = Password;
            cmd.Parameters.Add("@Status", MySqlDbType.VarChar).Value = "Active";
            cmd.Parameters.Add("@StaffID", MySqlDbType.VarChar).Value = StaffID;

            b = da.InsertUpdateData(cmd);
            
        }
        catch (Exception ex)
        {

        }
        if(b)
        {
            return StaffID;
        }
        else
        {
            return "Not Updated..!";
        }
        return Password;
    }
    //=====================End Update Employee password===============================

    //-------------------------------Start Show Next Customer Id--------------------------
    [WebMethod]
    public static string GtEmpId()
    {
        bool b = false;
        string UserID = "";
        try
        {
            string str2 = "SELECT MAX(StaffID) FROM franchiseestaffdetails WHERE FranchiseeID='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "'";
            string id = da.getString(str2);
            if (id != "")
            {
                int Empid = Convert.ToInt32(Regex.Split(id, "-")[1])+1;
                UserID = Franchisee_Id + "-" + Empid;
            }
            else
            {
                UserID = Franchisee_Id + "-1";
            }
        }
        catch (Exception ex)
        {

        }
        return UserID;
    }
    //-------------------------------End Show NExt Customer Id--------------------------


    //-----------------------Start Save Employee data--------------------------------------
    [WebMethod]
    public static string SaveEmployeeData(string EmpId, string JoiningDate, string EmpName, string MobileNo,string EmailId,string Status)
    {
        bool b = false;        
        string str = "";
        
        try
        {
            if (JoiningDate != "")
            {
                string[] dt = Regex.Split(JoiningDate, "-");
                int d = Convert.ToInt32(dt[0]);
                int m = Convert.ToInt32(dt[1]);
                int y = Convert.ToInt32(dt[2]);
                DateTime join = new DateTime(y, m, d);
                JoiningDate = Convert.ToDateTime(join).ToString("yyyy-MM-dd");
            }
            else
            {
                JoiningDate = "";
            }


            str += "Insert into franchiseestaffdetails(FranchiseeID,StaffID,MemberName,JoiningDate,MobileNo,Email,Status)";
            str += "values(@FranchiseeID,@StaffID,@MemberName,@JoiningDate,@MobileNo,@Email,@Status)";
            
            MySqlCommand cmd = new MySqlCommand(str);
            cmd.Parameters.Add("@FranchiseeID", MySqlDbType.VarChar).Value = HttpContext.Current.Session["FranchiseeID"].ToString();
            cmd.Parameters.Add("@StaffID", MySqlDbType.VarChar).Value = EmpId;
            cmd.Parameters.Add("@MemberName", MySqlDbType.VarChar).Value = EmpName;
            cmd.Parameters.Add("@JoiningDate", MySqlDbType.Date).Value = JoiningDate;
            cmd.Parameters.Add("@MobileNo", MySqlDbType.VarChar).Value = MobileNo;
            cmd.Parameters.Add("@Email", MySqlDbType.VarChar).Value = EmailId;
            cmd.Parameters.Add("@Status", MySqlDbType.VarChar).Value = Status;

            b = da.InsertUpdateData(cmd);

        }
        catch (Exception ex)
        {

        }

        if (b)
        {  
            return EmpId;
        }
        else
        {
            return "Record Not Added ..?";
        }

    }

    //----------------------------End Save Employee data-------------------------------------



}