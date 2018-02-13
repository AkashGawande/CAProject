using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using MySql.Data.MySqlClient;

public partial class Head_Office_HeadOfficeMaster : System.Web.UI.MasterPage
{
    DataAccess da = new DataAccess();
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                if (Session["EmpId"] == null)
                {
                    Response.Redirect("../Login.aspx");

                }
                else
                {
                    Username.InnerText = Session["EmpName"].ToString();
                    //------Get Total New Franchisee Count-------------------
                    string strFranchisee = "SELECT COUNT(FranchiseeID) FROM franchiseemaster WHERE STATUS='InActive'";
                    lblFranchiseeCount.InnerHtml = da.getInt(strFranchisee).ToString();

                    ////------Get Total Clients Count-------------------
                    //string strClients = "SELECT COUNT(ClientID) FROM clientmaster WHERE STATUS='Active'";
                    //lblClientCount.InnerHtml = da.getInt(strClients).ToString();

                    //------Get Total IT Files Count-------------------
                    //string strITFiles = "SELECT COUNT(FileTransactionID) FROM itmaster WHERE STATUS='InActive'";
                    //lblITFilesCount.InnerHtml = da.getInt(strITFiles).ToString();

                    ////------Get Total GST Reg Count-------------------
                    //string strGSTReg = "SELECT COUNT(ReferenceId) FROM gstregistrationmaster WHERE STATUS='InActive'";
                    //lblGSTRegCount.InnerHtml = da.getInt(strGSTReg).ToString();

                    //------Get Total TDS Files Count-------------------
                    //string strTDSFile = "SELECT COUNT(FileTransactionID) FROM tdsmaster WHERE STATUS='InActive'";
                    //lblTDSFile.InnerHtml = da.getInt(strTDSFile).ToString();
                }
            }
        }
        catch (Exception) { }
    }
}
