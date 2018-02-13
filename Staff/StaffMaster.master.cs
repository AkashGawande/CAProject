using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Staff_StaffMaster : System.Web.UI.MasterPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            try
            {
                if (HttpContext.Current.Session["FranchiseeID"] == null)
                {
                    Response.Redirect("../Login.aspx");

                }
                else
                {

                    Username.InnerText =HttpContext.Current.Session["MemberName"].ToString();
                    if (HttpContext.Current.Session["Photo"].ToString() != "")
                    {
                        userPhoto.Src = "../ProfilePhoto/" + Session["Photo"].ToString();
                    }
                    else
                    {
                        userPhoto.Src = "../ProfilePhoto/Default.png";
                    }
                    //string role = Session["Role"].ToString();

                }

            }
            catch (Exception ex)
            {
                Response.Redirect("../Login.aspx");

            }
        }

    }
}
