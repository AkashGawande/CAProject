using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
public partial class Franchisee_Dashboard : System.Web.UI.Page
{
    static DataAccess da = new DataAccess();
    static ImageUpload IU = new ImageUpload();
    static string Franchisee_Id = "";
    static string Staff_Id = "";
    static string Role = "";
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
               
                Role =HttpContext.Current.Session["Role"].ToString();
            }
        }
        catch (Exception ex)
        {
            Response.Redirect("../Login.aspx");

        }

    }


    

    //=================================Start Show Unread Messages================================
    [WebMethod]
    public static MasterPageMsg[] ShowMsg()
    {
        Messenger_Controller Contl = new Messenger_Controller();
        string str = "";
        str += " Select  * from  messagemaster where Status='UnRead' AND StaffId='' AND  Receiver_Id like '%" + HttpContext.Current.Session["FranchiseeID"].ToString() + "%' order by MessageID desc";
        MasterPageMsg[] ObjMsg = Contl.GetUnreadMessage(str);
        return ObjMsg;
    }
    //=================================End Show Unread Messages================================




    //===================Start Bind EmployeeID==========================
    [WebMethod]
    public static BindEmpDropDown[] BindEmployeeID()
    {
        ClientController Contl = new ClientController();
        string str = "";
        str += "SELECT StaffID,MemberName FROM franchiseestaffdetails where FranchiseeID='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "' and Status='Active'";

        BindEmpDropDown[] md = Contl.GetEmployeeDDL(str);
        return md.ToArray();
    }
    //===================End Bind EmployeeID==========================





    //======================================Start Function Get Client Registration Count===============================
    [WebMethod]
    public static int GetClientRegCount(string StaffId)
    {
        int Count = 0;
        string str = "";
        if (StaffId=="0")
        {
            str += "SELECT ";
            str += "(SELECT COUNT(*) FROM clientpanmaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "')+ ";
            str += "(SELECT COUNT(*) FROM clienttanmaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "')+ ";
            str += "(SELECT COUNT(*) FROM clientgstpayermaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "')+ ";
            str += "(SELECT COUNT(*) FROM clientgstdeductormaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "') ";
            str += "AS SumCount";
        }
        else
        {
            str += "SELECT ";
            str += "(SELECT COUNT(*) FROM clientpanmaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "' and StaffId = '" + StaffId + "')+ ";
            str += "(SELECT COUNT(*) FROM clienttanmaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "'  and StaffId = '" + StaffId + "')+ ";
            str += "(SELECT COUNT(*) FROM clientgstpayermaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "'  and StaffId = '" + StaffId + "')+ ";
            str += "(SELECT COUNT(*) FROM clientgstdeductormaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "'  and StaffId = '" + StaffId + "') ";
            str += "AS SumCount";
        }
        
        int PanCount = da.getInt(str);
        if (PanCount > 0)
        {
            Count = PanCount;
        }
        return Count;
    }
    //======================================End Function Get Client Registration Count===============================


    //======================================Start Function Get IT Files Count===============================
    [WebMethod]
    public static int GetITFilesCount(string StaffId)
    {
        int Count = 0;
        string str = "";
        if (StaffId == "0")
        {
            str += "SELECT ";
            str += "(SELECT COUNT(*) FROM itmaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "')";
            str += "AS SumCount";
        }
        else
        {
            str += "SELECT ";
            str += "(SELECT COUNT(*) FROM itmaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "' and StaffId = '" + StaffId + "')";
            str += "AS SumCount";
        }
        int ITCount = da.getInt(str);
        if (ITCount > 0)
        {
            Count = ITCount;
        }
        return Count;
    }
    //==============================End Function Get IT Files Count===============================


    //======================================Start Function Get TDS Files Count===============================
    [WebMethod]
    public static int GetTDSFilesCount(string StaffId)
    {
        int Count = 0;
        string str = "";
        if(StaffId=="0")
        {
            str += "SELECT ";
            str += "(SELECT COUNT(*) FROM tdsmaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "')";
            str += "AS SumCount";
        }
        else
        {
            str += "SELECT ";
            str += "(SELECT COUNT(*) FROM tdsmaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "' and StaffId = '" + StaffId + "')";
            str += "AS SumCount";
        }
        
        int TDSCount = da.getInt(str);
        if (TDSCount > 0)
        {
            Count = TDSCount;
        }
        return Count;
    }
    //==============================End Function Get TDS Files Count===============================


    //======================================Start Function Get GST Registration Count===============================
    [WebMethod]
    public static int GetGSTRegFilesCount(string StaffId)
    {
        int Count = 0;
        string str = "";
        if(StaffId=="0")
        {
            str += "SELECT ";
            str += "(SELECT COUNT(*) FROM gstregistrationmaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "')";
            str += "AS SumCount";
        }
        else
        {
            str += "SELECT ";
            str += "(SELECT COUNT(*) FROM gstregistrationmaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "' and StaffId = '" + StaffId + "')";
            str += "AS SumCount";
        }
        
        int GSTRegCount = da.getInt(str);
        if (GSTRegCount > 0)
        {
            Count = GSTRegCount;
        }
        return Count;
    }
    //======================================End Function Get GST Registration Count===============================


    //======================================Start Function Get GST Registration Count===============================
    [WebMethod]
    public static int GetGSTReturnFilesCount(string StaffId)
    {
        int Count = 0;
        int GSTReturnCount = 0;
        string str = "";
        if(StaffId=="0")
        {
            str += "SELECT ";
            str += "(SELECT COUNT(*) FROM gstregistrationmaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "')";
            str += "AS SumCount";
        }else
        {
            str += "SELECT ";
            str += "(SELECT COUNT(*) FROM gstregistrationmaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "' and StaffId = '" + StaffId + "')";
            str += "AS SumCount";
        }
        
        
        // GSTReturnCount = da.getInt(str);
        if (GSTReturnCount > 0)
        {
            Count = GSTReturnCount;
        }
        return Count;
    }
    //======================================End Function Get GST Registration Count===============================


    //======================================Start Function Get GST Registration Count===============================
    [WebMethod]
    public static int getITNoticeFilesCount(string StaffId)
    {
        int Count = 0;
        int ITNoticeCount = 0;
        string str = "";
        if(StaffId=="0")
        {
            str += "SELECT ";
            str += "(SELECT COUNT(*) FROM itnoticemaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "')";
            str += "AS SumCount";
        }
        else
        {
            str += "SELECT ";
            str += "(SELECT COUNT(*) FROM itnoticemaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "' and StaffId = '" + StaffId + "')";
            str += "AS SumCount";
        }
        
        ITNoticeCount = da.getInt(str);
        if (ITNoticeCount > 0)
        {
            Count = ITNoticeCount;
        }
        return Count;
    }
    //======================================End Function Get GST Registration Count===============================



    //============================================Start Draw Chart ============================================
    [WebMethod]
    public static StaffClientDetails[] DrawChart( string StaffId)
    {
        StaffController Contrl = new StaffController();
        string str1 = "", str2 = "", str3 = "", str4 = "", str5 = "", str6 = "";
        if (StaffId == "0")
        {
            str1 += "SELECT ";
            str1 += "(SELECT COUNT(*) FROM clientpanmaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "')+ ";
            str1 += "(SELECT COUNT(*) FROM clienttanmaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "')+ ";
            str1 += "(SELECT COUNT(*) FROM clientgstpayermaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "')+ ";
            str1 += "(SELECT COUNT(*) FROM clientgstdeductormaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "') ";
            str1 += "AS SumCount";

            str2 += "SELECT ";
            str2 += "(SELECT COUNT(*) FROM itmaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "')";
            str2 += "AS SumCount";

            str3 += "SELECT ";
            str3 += "(SELECT COUNT(*) FROM tdsmaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "')";
            str3 += "AS SumCount";

            str4 += "SELECT ";
            str4 += "(SELECT COUNT(*) FROM gstregistrationmaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "')";
            str4 += "AS SumCount";

            //str5 += "SELECT ";
            //str5 += "(SELECT COUNT(*) FROM gstregistrationmaster WHERE FranchiseeId='" + Franchisee_Id + "' and StaffId = '" + Staff_Id + "')";
            //str5 += "AS SumCount";

            str6 += "SELECT ";
            str6 += "(SELECT COUNT(*) FROM itnoticemaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "')";
            str6 += "AS SumCount";
        }
        else
        {
            str1 += "SELECT ";
            str1 += "(SELECT COUNT(*) FROM clientpanmaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "' and StaffId = '" + StaffId + "')+ ";
            str1 += "(SELECT COUNT(*) FROM clienttanmaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "' and StaffId = '" + StaffId + "')+ ";
            str1 += "(SELECT COUNT(*) FROM clientgstpayermaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "' and StaffId = '" + StaffId + "')+ ";
            str1 += "(SELECT COUNT(*) FROM clientgstdeductormaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "' and StaffId = '" + StaffId + "') ";
            str1 += "AS SumCount";

            str2 += "SELECT ";
            str2 += "(SELECT COUNT(*) FROM itmaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "' and StaffId = '" + StaffId + "')";
            str2 += "AS SumCount";

            str3 += "SELECT ";
            str3 += "(SELECT COUNT(*) FROM tdsmaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "' and StaffId = '" + StaffId + "')";
            str3 += "AS SumCount";

            str4 += "SELECT ";
            str4 += "(SELECT COUNT(*) FROM gstregistrationmaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "' and StaffId = '" + StaffId + "')";
            str4 += "AS SumCount";

            //str5 += "SELECT ";
            //str5 += "(SELECT COUNT(*) FROM gstregistrationmaster WHERE FranchiseeId='" + Franchisee_Id + "' and StaffId = '" + StaffId + "')";
            //str5 += "AS SumCount";

            str6 += "SELECT ";
            str6 += "(SELECT COUNT(*) FROM itnoticemaster WHERE FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "' and StaffId = '" + StaffId + "')";
            str6 += "AS SumCount";
        }

        StaffClientDetails[] BCDP = Contrl.GetDrawChartValue(str1, str2, str3, str4, str5, str6);
        return BCDP.ToArray();
    }

    //============================================End Draw Chart============================================


    
}