using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using MySql.Data.MySqlClient;
using System.Web.Services;
public partial class Head_Office_Employee_Dashboard : System.Web.UI.Page
{
    static string Emp_Id = "";
    static string Role = "";
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (HttpContext.Current.Session["EmpId"] == null)
            {
                Response.Redirect("../../Login.aspx");

            }
            else
            {

                Emp_Id = HttpContext.Current.Session["EmpId"].ToString();
                Role = HttpContext.Current.Session["Designation"].ToString();
            }
        }
        catch (Exception ex)
        {
            Response.Redirect("../../Login.aspx");

        }
    }


    //=================================Start Show Unread Messages================================
    [WebMethod]
    public static MasterPageMsg[] ShowMsg()
    {
        Messenger_Controller Contl = new Messenger_Controller();
        string str = "";
        str += " Select  * from  messagemaster where Status='UnRead' AND Sender_Id !='" + HttpContext.Current.Session["EmpId"].ToString() + "' AND  Sender!='Head Office' order by MessageID desc";
        MasterPageMsg[] ObjMsg = Contl.GetUnreadMessage(str);
        return ObjMsg;
    }
    //=================================End Show Unread Messages================================




}