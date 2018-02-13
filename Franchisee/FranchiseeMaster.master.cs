using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Franchisee_FranchiseeMaster : System.Web.UI.MasterPage
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

                    Username.InnerText = HttpContext.Current.Session["FirmName"].ToString();
                   
                    //if (HttpContext.Current.Session["FirmLicense"].ToString() != "")
                    //{
                    //    userPhoto.Src = "../ProfilePhoto/" + HttpContext.Current.Session["FirmLicense"].ToString();
                    //}
                    //else
                    //{
                    //    userPhoto.Src = "../ProfilePhoto/Default.png";
                    //}

                }

            }
            catch (Exception ex)
            {
                Response.Redirect("../Login.aspx");

            }
        }

    }
}
