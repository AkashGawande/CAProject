using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using System.Data;
using MySql.Data.MySqlClient;

public partial class Franchisee_ChangePassword : System.Web.UI.Page
{
    static DataAccess da = new DataAccess();
    static string AddedBy = "", _password = "", Email = "", Emp_Id = "", Name = "";
    static string StaffID="";
   
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
                Name = HttpContext.Current.Session["FranchiseeID"].ToString();
                AddedBy = HttpContext.Current.Session["FranchiseeID"].ToString();
                _password = HttpContext.Current.Session["Password"].ToString();
                StaffID = HttpContext.Current.Session["StaffID"].ToString();
                //Email = Session["Email"].ToString();

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
        return Name;
    }

    public void ChangeSessionValue(string password)
    {
        Session["Password"] = password;
    }
    public string GetFranchiseeID()
    {
        string FID = Session["FranchiseeID"].ToString();
        return FID;
    }

    //=======================START UPDATE DATA==========================================
    [WebMethod]
    public static string ChangePassword(string old_password, string New_Password)
    {
        Franchisee_ChangePassword fc = new Franchisee_ChangePassword();
        bool b = false;
        try
        {
            if (old_password == _password)
            {

                string str = "Update franchiseestaffdetails set StaffPassword='" + New_Password + "' where StaffID='" + HttpContext.Current.Session["StaffID"].ToString() + "'";

              
                string sessionvalue = fc.GetSessionValue();


                if (sessionvalue != "")
                {
                    b = da.insertUpdate(str); 
                }
               
                
            }
            else
            {
                // Page.ClientScript.RegisterStartupScript(this.GetType(), "Scripts", "<script>alert('Old Password incorrect!')</script>");

            }

        }
        catch (Exception ex)
        {

        }

        if (b)
        {
           
            fc.ChangeSessionValue(New_Password);
            //string op = "Change_Password";
            //var msg = da.SendMail(User_Id, Name, New_Password, Email, op);
            return "Password Changed..!";
        }
        else
        {
            return "Password Not Changed ..?";
        }

    }
    //=======================END UPDATE DATA============================================
}