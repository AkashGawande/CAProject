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
        //try
        //{
        //    if (Session["FranchiseeID"] == null)
        //    {
        //        Response.Redirect("../Login.aspx");

        //    }
        //    else
        //    {
        //        Franchisee_Id = Session["FranchiseeID"].ToString();
               
        //        Role = Session["Role"].ToString();
        //    }
        //}
        //catch (Exception ex)
        //{
        //    Response.Redirect("../Login.aspx");

        //}

    }

    //===================Start Bind FranchiseeID==========================
    [WebMethod]
    public static FranchiseeList[] BindFranchiseeID()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT FranchiseeID FROM franchiseemaster where Status='Active'";

        FranchiseeList[] md = Contl.GetFranchiseeID(str);
        return md.ToArray();
    }
    //===================End Bind FranchiseeID==========================

    //===================Start Bind Firm Name==========================
    [WebMethod]
    public static FranchiseeList[] BindFirmName()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT Distinct(FranchiseeID),FirmName FROM franchiseemaster WHERE STATUS='Active'";

        FranchiseeList[] md = Contl.GetFirmName(str);
        return md.ToArray();
    }
    //===================End Bind Firm Name==========================




    //===================Start Bind EmployeeID==========================
    [WebMethod]
    public static BindEmpDropDown[] BindEmployeeID()
    {
        ClientController Contl = new ClientController();
        string str = "";
        str += "SELECT StaffID,MemberName FROM franchiseestaffdetails where FranchiseeID='" + Franchisee_Id + "' and Status='Active'";

        BindEmpDropDown[] md = Contl.GetEmployeeDDL(str);
        return md.ToArray();
    }
    //===================End Bind EmployeeID==========================


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




    //======================================Start Function Get Client Registration Count===============================
    [WebMethod]
    public static int GetClientRegCount(string FranchiseeId, string StaffId)
    {
        int Count = 0;
        string str = "";
        if (FranchiseeId == "0" && StaffId == "0")
        {
            str += "SELECT ";
            str += "(SELECT COUNT(*) FROM clientpanmaster)+ ";
            str += "(SELECT COUNT(*) FROM clienttanmaster)+ ";
            str += "(SELECT COUNT(*) FROM clientgstpayermaster)+ ";
            str += "(SELECT COUNT(*) FROM clientgstdeductormaster) ";
            str += "AS SumCount";
        }

        else if (FranchiseeId != "" && StaffId == "0")
        {
            str += "SELECT ";
            str += "(SELECT COUNT(*) FROM clientpanmaster WHERE FranchiseeId='" + FranchiseeId + "')+ ";
            str += "(SELECT COUNT(*) FROM clienttanmaster WHERE FranchiseeId='" + FranchiseeId + "')+ ";
            str += "(SELECT COUNT(*) FROM clientgstpayermaster WHERE FranchiseeId='" + FranchiseeId + "')+ ";
            str += "(SELECT COUNT(*) FROM clientgstdeductormaster WHERE FranchiseeId='" + FranchiseeId + "') ";
            str += "AS SumCount";
        }
        else
        {
            str += "SELECT ";
            str += "(SELECT COUNT(*) FROM clientpanmaster WHERE FranchiseeId='" + FranchiseeId + "' and StaffId = '" + StaffId + "')+ ";
            str += "(SELECT COUNT(*) FROM clienttanmaster WHERE FranchiseeId='" + FranchiseeId + "'  and StaffId = '" + StaffId + "')+ ";
            str += "(SELECT COUNT(*) FROM clientgstpayermaster WHERE FranchiseeId='" + FranchiseeId + "'  and StaffId = '" + StaffId + "')+ ";
            str += "(SELECT COUNT(*) FROM clientgstdeductormaster WHERE FranchiseeId='" + FranchiseeId + "'  and StaffId = '" + StaffId + "') ";
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
    public static int GetITFilesCount(string FranchiseeId, string StaffId)
    {
        int Count = 0;
        string str = "";
        if (FranchiseeId == "0" && StaffId == "0")
        {
            str += "SELECT ";
            str += "(SELECT COUNT(*) FROM itmaster)";
            str += "AS SumCount";
        }

        else if (FranchiseeId != "" && StaffId == "0")
        {
            str += "SELECT ";
            str += "(SELECT COUNT(*) FROM itmaster WHERE FranchiseeId='" + FranchiseeId + "')";
            str += "AS SumCount";
        }
        else
        {
            str += "SELECT ";
            str += "(SELECT COUNT(*) FROM itmaster WHERE FranchiseeId='" + FranchiseeId + "' and StaffId = '" + StaffId + "')";
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
    public static int GetTDSFilesCount(string FranchiseeId, string StaffId)
    {
        int Count = 0;
        string str = "";
        if (FranchiseeId == "0" && StaffId == "0")
        {
            str += "SELECT ";
            str += "(SELECT COUNT(*) FROM tdsmaster)";
            str += "AS SumCount";
        }
        else if (FranchiseeId != "" && StaffId == "0")
        {
            str += "SELECT ";
            str += "(SELECT COUNT(*) FROM tdsmaster WHERE FranchiseeId='" + FranchiseeId + "')";
            str += "AS SumCount";
        }
        else
        {
            str += "SELECT ";
            str += "(SELECT COUNT(*) FROM tdsmaster WHERE FranchiseeId='" + FranchiseeId + "' and StaffId = '" + StaffId + "')";
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
    public static int GetGSTRegFilesCount(string FranchiseeId, string StaffId)
    {
        int Count = 0;
        string str = "";
        if (FranchiseeId == "0" && StaffId == "0")
        {
            str += "SELECT ";
            str += "(SELECT COUNT(*) FROM gstregistrationmaster)";
            str += "AS SumCount";
        }
        else if (FranchiseeId != "" && StaffId == "0")
        {
            str += "SELECT ";
            str += "(SELECT COUNT(*) FROM gstregistrationmaster WHERE FranchiseeId='" + FranchiseeId + "')";
            str += "AS SumCount";
        }
        else
        {
            str += "SELECT ";
            str += "(SELECT COUNT(*) FROM gstregistrationmaster WHERE FranchiseeId='" + FranchiseeId + "' and StaffId = '" + StaffId + "')";
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
    public static int GetGSTReturnFilesCount(string FranchiseeId, string StaffId)
    {
        int Count = 0;
        int GSTReturnCount = 0;
        string str = "";
        if (FranchiseeId == "0" && StaffId == "0")
        {
            str += "SELECT ";
            str += "(SELECT COUNT(*) FROM gstregistrationmaster)";
            str += "AS SumCount";
        }
        else if (FranchiseeId != "" && StaffId == "0")
        {
            str += "SELECT ";
            str += "(SELECT COUNT(*) FROM gstregistrationmaster WHERE FranchiseeId='" + FranchiseeId + "')";
            str += "AS SumCount";
        }else
        {
            str += "SELECT ";
            str += "(SELECT COUNT(*) FROM gstregistrationmaster WHERE FranchiseeId='" + FranchiseeId + "' and StaffId = '" + StaffId + "')";
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
    public static int getITNoticeFilesCount(string FranchiseeId, string StaffId)
    {
        int Count = 0;
        int ITNoticeCount = 0;
        string str = "";
        if (FranchiseeId == "0" && StaffId == "0")
        {
            str += "SELECT ";
            str += "(SELECT COUNT(*) FROM itnoticemaster)";
            str += "AS SumCount";
        }
        else if (FranchiseeId != "" && StaffId == "0")
        {
            str += "SELECT ";
            str += "(SELECT COUNT(*) FROM itnoticemaster WHERE FranchiseeId='" + FranchiseeId + "')";
            str += "AS SumCount";
        }
        else
        {
            str += "SELECT ";
            str += "(SELECT COUNT(*) FROM itnoticemaster WHERE FranchiseeId='" + FranchiseeId + "' and StaffId = '" + StaffId + "')";
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
    public static StaffClientDetails[] DrawChart(string FranchiseeId, string StaffId)
    {
        StaffController Contrl = new StaffController();
        string str1 = "", str2 = "", str3 = "", str4 = "", str5 = "", str6 = "";
        if (FranchiseeId == "0" && StaffId == "0")
        {
            str1 += "SELECT ";
            str1 += "(SELECT COUNT(*) FROM clientpanmaster)+ ";
            str1 += "(SELECT COUNT(*) FROM clienttanmaster)+ ";
            str1 += "(SELECT COUNT(*) FROM clientgstpayermaster)+ ";
            str1 += "(SELECT COUNT(*) FROM clientgstdeductormaster) ";
            str1 += "AS SumCount";

            str2 += "SELECT ";
            str2 += "(SELECT COUNT(*) FROM itmaster)";
            str2 += "AS SumCount";

            str3 += "SELECT ";
            str3 += "(SELECT COUNT(*) FROM tdsmaster)";
            str3 += "AS SumCount";

            str4 += "SELECT ";
            str4 += "(SELECT COUNT(*) FROM gstregistrationmaster)";
            str4 += "AS SumCount";

            //str5 += "SELECT ";
            //str5 += "(SELECT COUNT(*) FROM gstregistrationmaster)";
            //str5 += "AS SumCount";

            str6 += "SELECT ";
            str6 += "(SELECT COUNT(*) FROM itnoticemaster)";
            str6 += "AS SumCount";
        }
        else if (FranchiseeId != "" && StaffId == "0")
        {
            str1 += "SELECT ";
            str1 += "(SELECT COUNT(*) FROM clientpanmaster WHERE FranchiseeId='" + FranchiseeId + "')+ ";
            str1 += "(SELECT COUNT(*) FROM clienttanmaster WHERE FranchiseeId='" + FranchiseeId + "')+ ";
            str1 += "(SELECT COUNT(*) FROM clientgstpayermaster WHERE FranchiseeId='" + FranchiseeId + "')+ ";
            str1 += "(SELECT COUNT(*) FROM clientgstdeductormaster WHERE FranchiseeId='" + FranchiseeId + "') ";
            str1 += "AS SumCount";

            str2 += "SELECT ";
            str2 += "(SELECT COUNT(*) FROM itmaster WHERE FranchiseeId='" + FranchiseeId + "')";
            str2 += "AS SumCount";

            str3 += "SELECT ";
            str3 += "(SELECT COUNT(*) FROM tdsmaster WHERE FranchiseeId='" + FranchiseeId + "')";
            str3 += "AS SumCount";

            str4 += "SELECT ";
            str4 += "(SELECT COUNT(*) FROM gstregistrationmaster WHERE FranchiseeId='" + FranchiseeId + "')";
            str4 += "AS SumCount";

            //str5 += "SELECT ";
            //str5 += "(SELECT COUNT(*) FROM gstregistrationmaster WHERE FranchiseeId='" + FranchiseeId + "' and StaffId = '" + Staff_Id + "')";
            //str5 += "AS SumCount";

            str6 += "SELECT ";
            str6 += "(SELECT COUNT(*) FROM itnoticemaster WHERE FranchiseeId='" + FranchiseeId + "')";
            str6 += "AS SumCount";
        }
        else
        {
            str1 += "SELECT ";
            str1 += "(SELECT COUNT(*) FROM clientpanmaster WHERE FranchiseeId='" + FranchiseeId + "' and StaffId = '" + StaffId + "')+ ";
            str1 += "(SELECT COUNT(*) FROM clienttanmaster WHERE FranchiseeId='" + FranchiseeId + "' and StaffId = '" + StaffId + "')+ ";
            str1 += "(SELECT COUNT(*) FROM clientgstpayermaster WHERE FranchiseeId='" + FranchiseeId + "' and StaffId = '" + StaffId + "')+ ";
            str1 += "(SELECT COUNT(*) FROM clientgstdeductormaster WHERE FranchiseeId='" + FranchiseeId + "' and StaffId = '" + StaffId + "') ";
            str1 += "AS SumCount";

            str2 += "SELECT ";
            str2 += "(SELECT COUNT(*) FROM itmaster WHERE FranchiseeId='" + FranchiseeId + "' and StaffId = '" + StaffId + "')";
            str2 += "AS SumCount";

            str3 += "SELECT ";
            str3 += "(SELECT COUNT(*) FROM tdsmaster WHERE FranchiseeId='" + FranchiseeId + "' and StaffId = '" + StaffId + "')";
            str3 += "AS SumCount";

            str4 += "SELECT ";
            str4 += "(SELECT COUNT(*) FROM gstregistrationmaster WHERE FranchiseeId='" + FranchiseeId + "' and StaffId = '" + StaffId + "')";
            str4 += "AS SumCount";

            //str5 += "SELECT ";
            //str5 += "(SELECT COUNT(*) FROM gstregistrationmaster WHERE FranchiseeId='" + FranchiseeId + "' and StaffId = '" + StaffId + "')";
            //str5 += "AS SumCount";

            str6 += "SELECT ";
            str6 += "(SELECT COUNT(*) FROM itnoticemaster WHERE FranchiseeId='" + FranchiseeId + "' and StaffId = '" + StaffId + "')";
            str6 += "AS SumCount";
        }

        StaffClientDetails[] BCDP = Contrl.GetDrawChartValue(str1, str2, str3, str4, str5, str6);
        return BCDP.ToArray();
    }

    //============================================End Draw Chart============================================


    
}