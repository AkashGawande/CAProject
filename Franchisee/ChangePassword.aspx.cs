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
   
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (Session["FranchiseeID"] == null)
            {
                Response.Redirect("../Login.aspx");
                //_password = Session["Password"].ToString();
            }
            else
            {
                Name = Session["FranchiseeID"].ToString();
                AddedBy = Session["FranchiseeID"].ToString();
                _password = Session["Password"].ToString();
                //Emp_Id = Session["Emp_Id"].ToString();
                //Email = Session["Email"].ToString();

            }
        }
        catch (Exception ex)
        {
            Response.Redirect("../Login.aspx");

        }
    }
    public void ChangeSessionValue(string password)
    {
        Session["Password"] = password;
    }
    public string GetFranchiseeID()
    {
        string FID = HttpContext.Current.Session["FranchiseeID"].ToString();
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
                string FID = fc.GetFranchiseeID();
                string str = "Update franchiseemaster set Password='" + New_Password + "' where FranchiseeID='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "'";

                b = da.insertUpdate(str);
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
            //Admin_ChangePassword c1 = new Admin_ChangePassword();
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