using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Marketing_LogOut : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if(!this.IsPostBack)
        {
            try
            {

                Session.Abandon();
                Session.Clear();
                Session.RemoveAll();
                Response.Cache.SetExpires(DateTime.UtcNow.AddMinutes(-1));
                Response.Cache.SetCacheability(HttpCacheability.NoCache);
                Response.Cache.SetNoStore();                
               
                Response.Redirect("Login.aspx");
            }
            catch(Exception ex)
            {
                Response.Redirect("Login.aspx");
            }
        }

    }
}