using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Head_Office_Employee_EmployeeMasterPage : System.Web.UI.MasterPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                if (Session["EmpName"] == null)
                {
                    Response.Redirect("../../Login.aspx");

                }
                else
                {
                    Username.InnerText = Session["EmpName"].ToString();                   
                }
            }
        }
        catch (Exception) { }
    }
}
