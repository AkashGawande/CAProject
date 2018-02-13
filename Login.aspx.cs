using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using MySql.Data.MySqlClient;
using System.Data;
using System.Web.Services;
public partial class Login : System.Web.UI.Page
{
    static MySqlConnection con = new MySqlConnection(DataAccess.getConnection());
    static MySqlCommand cmd = new MySqlCommand();
    static DataAccess da = new DataAccess();
    static MySqlDataReader dr;
    static MySqlDataReader dr1;

    DataAccess obj = new DataAccess();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {

            Session.Abandon();
            Session.Clear();
            Session.RemoveAll();
            Response.Cache.SetExpires(DateTime.UtcNow.AddMinutes(-1));
            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.Cache.SetNoStore();
        }

    }
    protected void btnLogin_Click(object sender, EventArgs e)
    {
        try
        {
            string _id = "", _Status = "", _role = "", _password = "",EmpRole="";
            string Id = "", Password = "",Name="";
            _id = txtUsername.Text.Trim();
            _password = txtPassword.Text.Trim();
            _role = ddlrole.SelectedItem.Value;
            string str1 = "";
            string str = " ";

            if (_role == "Head_Office")
            {
                str1 = "Select Status from employeemaster where EmpId='" + _id + "' ";
                str = "Select EmpId,Password,EmpName,EmailId,Designation from employeemaster where EmpId='" + _id + "' And Password='" + _password + "'";

            }
            else if (_role == "Franchisee")
            {
                str1 = "Select Status from franchiseemaster where FranchiseeID='" + _id + "' ";
                str = "Select FranchiseeID,Password,OwnerName,EmailId,FirmName,FirmLicense from franchiseemaster where FranchiseeID='" + _id + "' And Password='" + _password + "'";
            }
            else if (_role == "Employee")
            {
                str1 = "Select Status from franchiseestaffdetails where StaffID='" + _id + "'";
                str = "Select FranchiseeID,StaffID,MemberName,StaffPassword,UserPhoto from franchiseestaffdetails where StaffID='" + _id + "' And StaffPassword='" + _password + "'";
            }

            cmd = new MySqlCommand(str1);
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;

            if (con.State == ConnectionState.Closed)
            {
                con.Open();
            }
            dr = cmd.ExecuteReader();
            if (dr.HasRows)
            {
                while (dr.Read())
                {
                    Session["Status"] = dr["Status"].ToString();
                    _Status = dr["Status"].ToString();
                }
            }
            dr.Close();
            con.Close();



            MySqlCommand cmd1 = new MySqlCommand(str);
            cmd1.CommandType = CommandType.Text;
            cmd1.Connection = con;

            if (con.State == ConnectionState.Closed)
            {
                con.Open();
            }
            dr = cmd1.ExecuteReader();
            if (dr.HasRows)
            {
                while (dr.Read())
                {
                    if (_role == "Head_Office")
                    {
                        //Session["EmpId"] = dr["EmpId"].ToString();
                        //Session["EmpName"] = dr["EmpName"].ToString();
                        Session["Password"] = dr["Password"].ToString();
                        Session["EmailId"] = dr["EmailId"].ToString();
                        Session["Designation"] = dr["Designation"].ToString();
                        Name = dr["EmpName"].ToString();
                        Id = dr["EmpId"].ToString();
                        Password = dr["Password"].ToString();
                        EmpRole = dr["Designation"].ToString();
                    }
                    else if (_role == "Franchisee")
                    {
                        Session["FranchiseeID"] = dr["FranchiseeID"].ToString();
                        Session["OwnerName"] = dr["OwnerName"].ToString();
                        Session["FirmName"] = dr["FirmName"].ToString();
                        Session["Password"] = dr["Password"].ToString();
                        Session["EmailId"] = dr["EmailId"].ToString();
                        Session["FirmLicense"] = dr["FirmLicense"].ToString();
                        Id = dr["FranchiseeID"].ToString();
                        Password = dr["Password"].ToString();
                    }
                    else if (_role == "Employee")
                    {
                        Session["FranchiseeID"] = dr["FranchiseeID"].ToString();
                        Session["MemberName"] = dr["MemberName"].ToString();
                        Session["Password"] = dr["StaffPassword"].ToString();
                        Session["StaffID"] = dr["StaffID"].ToString();
                        Session["Photo"] = dr["UserPhoto"].ToString();
                        Id = dr["StaffID"].ToString();
                        Password = dr["StaffPassword"].ToString();
                    }
                    Session["Role"] = _role;

                }
            }
            dr.Close();
            con.Close();
            if (_id == "Admin" && _password == "Admin@123" && _role == "Head_Office")
            {
                //Session["HeadOffice"] = "Admin";
                Session["EmpId"] = "Admin";
                Session["EmpName"] = "Admin";
                    Response.Redirect("~/Head_Office/Dashboard.aspx", false);
            }
            else if (_id == Id && _password == Password && _role == "Head_Office")
            {
                Session["EmpId"] = Id;
                Session["EmpName"] = Name;
                if (EmpRole == "Admin")
                {
                    Response.Redirect("~/Head_Office/Dashboard.aspx", false);
                }
                else if(EmpRole=="Employee")
                {
                    Response.Redirect("~/Head_Office/Employee/Dashboard.aspx", false);
                }
               
            }


            else if (_id == Id && _password == Password && _role == "Franchisee")
            {
                if (_Status == "Active")
                {
                    Response.Redirect("~/Franchisee/Dashboard.aspx", false);
                }
                else
                {
                    Page.ClientScript.RegisterStartupScript(this.GetType(), "Scripts", "<script>alert('User Not Authenticated Please Contact your Administrator!')</script>");
                }
            }


            else if (_id == Id && _password == Password && _role == "Employee")
            {
                if (_Status == "Active")
                {
                    Response.Redirect("~/Staff/Dashboard.aspx", false);
                }
                else
                {
                    Page.ClientScript.RegisterStartupScript(this.GetType(), "Scripts", "<script>alert('User Not Authenticated Please Contact your Administrator!')</script>");
                }
            }


            else
            {
                Page.ClientScript.RegisterStartupScript(this.GetType(), "Scripts", "<script>alert('Username or Password incorrect!')</script>");
                txtPassword.Focus();
            }
        }

        catch (Exception ex)
        {

        }

    }


    //=======================START UPDATE DATA==========================================
    [WebMethod]
    public static string SendPassword(string EmpType, string EmpId, string EmailId)
    {
       
        bool b = false;
        string str = "";
        string Name = "", Password = "";
        try
        {
            if (EmpType == "Head_Office")
            {
                str = "Select Password,EmpName from employeemaster where EmpId='" + EmpId + "' And Password='" + EmailId + "'";
            }
            else if (EmpType == "Franchisee")
            {
                str = "Select Password,OwnerName,FirmName from franchiseemaster where FranchiseeID='" + EmpId + "' And EmailId='" + EmailId + "'";
            }
            else if (EmpType == "Employee")
            {
                str = "Select MemberName,StaffPassword from franchiseestaffdetails where StaffID='" + EmpId + "' And Email='" + EmailId + "'";
            }

            MySqlCommand cmd1 = new MySqlCommand(str);
            cmd1.CommandType = CommandType.Text;
            cmd1.Connection = con;
            

            if (con.State == ConnectionState.Closed)
            {
                con.Open();
            }
            dr = cmd1.ExecuteReader();
            if (dr.HasRows)
            {
                while (dr.Read())
                {
                    if (EmpType == "Head_Office")
                    {
                        Name = dr["EmpName"].ToString();
                        Password = dr["Password"].ToString();
                       
                    }
                    else if (EmpType == "Franchisee")
                    {
                        Name = dr["OwnerName"].ToString() + " (" + dr["FirmName"].ToString() + ")";
                        Password = dr["Password"].ToString();
                    }
                    else if (EmpType == "Employee")
                    {
                        Name = dr["MemberName"].ToString();
                        Password = dr["StaffPassword"].ToString();
                    }
                   

                }
                b = true;
            }
            else
            {
                b = false;
            }
            dr.Close();
            con.Close();

        }
        catch (Exception ex)
        {

        }

        if (b)
        {
            string op = "Password_Recovery";
            var msg = da.SendMail(EmpId, Name, Password, EmailId, op);
            return "Password Send to your registered Mail Id...!";
        }
        else
        {
            return "Password Not Send ..?";
        }

    }
    //=======================END UPDATE DATA============================================




}