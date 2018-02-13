using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
/// <summary>
/// Summary description for StaffController
/// </summary>
public class StaffController
{
    DataAccess da = new DataAccess();
	public StaffController()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    //=====================================Start Get Client Details For GST REgistrtaion Form============================
    public StaffClientDetails[] GetClientAllData(string str)
    {
        List<StaffClientDetails> li = new List<StaffClientDetails>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                StaffClientDetails BD = new StaffClientDetails();
                BD.ClientID = ds.Tables[0].Rows[i]["ClientId"].ToString();
                BD.PANNumber = ds.Tables[0].Rows[i]["PANNumber"].ToString();
                BD.TANNumber = ds.Tables[0].Rows[i]["TANNumber"].ToString();
                BD.GSTNumber = ds.Tables[0].Rows[i]["GSTNumber"].ToString();
                BD.ApplicantName = ds.Tables[0].Rows[i]["ApplicantName"].ToString();
                BD.ApplicantFatherName = ds.Tables[0].Rows[i]["ApplicantFatherName"].ToString();
                BD.ApplicantAddress = ds.Tables[0].Rows[i]["ApplicantAddress"].ToString();
                BD.Pincode = ds.Tables[0].Rows[i]["Pincode"].ToString();
                BD.BirthDate = Convert.ToDateTime(ds.Tables[0].Rows[i]["BirthDate"]).ToString("dd-MM-yyyy");
                BD.ApplicantMobileNo = ds.Tables[0].Rows[i]["ApplicantMobileNo"].ToString();
                BD.ApplicantEmail = ds.Tables[0].Rows[i]["ApplicantEmail"].ToString();
                BD.EmployedType = ds.Tables[0].Rows[i]["EmployedType"].ToString();
                BD.StateCode = ds.Tables[0].Rows[i]["StateCode"].ToString();
                BD.Citizenship = ds.Tables[0].Rows[i]["Citizenship"].ToString();
                BD.AadharNo = ds.Tables[0].Rows[i]["AadharNo"].ToString();
                BD.ITDPortalPassword = ds.Tables[0].Rows[i]["ITDPortalPassword"].ToString();

                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //=====================================End Get Client Details For GST REgistrtaion Form============================


    //=====================================Start Get GST Based Client Details For GST Registrtaion Form============================


    public StaffClientDetails[] GetGstBasedClientAllData(string str,string GSTType)
    {
        List<StaffClientDetails> li = new List<StaffClientDetails>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                StaffClientDetails BD = new StaffClientDetails();
                BD.ClientID = ds.Tables[0].Rows[i]["ClientId"].ToString();
                //BD.GSTNumber = ds.Tables[0].Rows[i]["GSTNumber"].ToString();

                if (GSTType == "TAX_Payer")
                {
                    BD.PANNumber = ds.Tables[0].Rows[i]["PANNumber"].ToString();
                    BD.ApplicantName = ds.Tables[0].Rows[i]["ApplicantName"].ToString();
                    BD.ApplicantFatherName = ds.Tables[0].Rows[i]["ApplicantFatherName"].ToString();
                    BD.ApplicantAddress = ds.Tables[0].Rows[i]["ApplicantAddress"].ToString();
                    BD.Pincode = ds.Tables[0].Rows[i]["Pincode"].ToString();
                    if(ds.Tables[0].Rows[i]["BirthDate"].ToString()!="")
                    {
                        BD.BirthDate = Convert.ToDateTime(ds.Tables[0].Rows[i]["BirthDate"]).ToString("dd-MM-yyyy");
                    }
                    else
                    {
                        BD.BirthDate = "";
                    }
                    
                    BD.ApplicantMobileNo = ds.Tables[0].Rows[i]["ApplicantMobileNo"].ToString();
                    BD.ApplicantEmail = ds.Tables[0].Rows[i]["ApplicantEmail"].ToString();
                    BD.EmployedType = ds.Tables[0].Rows[i]["EmployedType"].ToString();
                    BD.StateCode = ds.Tables[0].Rows[i]["StateCode"].ToString();
                    BD.Citizenship = ds.Tables[0].Rows[i]["Citizenship"].ToString();
                    BD.AadharNo = ds.Tables[0].Rows[i]["AadharNo"].ToString();
                    BD.ITDPortalPassword = ds.Tables[0].Rows[i]["ITDPortalPassword"].ToString();

                    //BD.GSTNUserId = ds.Tables[0].Rows[i]["GSTNUserID"].ToString();
                    //BD.GSTNPassword = ds.Tables[0].Rows[i]["GSTNPassword"].ToString();
                }
                else if (GSTType == "TAX_Deductor")
                {
                    //BD.ClientID = ds.Tables[0].Rows[i]["ClientId"].ToString();
                    //BD.GSTNumber = ds.Tables[0].Rows[i]["GSTNumber"].ToString();
                    BD.TANNumber = ds.Tables[0].Rows[i]["TANNumber"].ToString();
                    BD.OfficeName = ds.Tables[0].Rows[i]["OfficeName"].ToString();
                    BD.AuthorisedPersoneName = ds.Tables[0].Rows[i]["AuthorisedPersone"].ToString();
                    BD.OfficeAddress = ds.Tables[0].Rows[i]["OfficeAddress"].ToString();                    
                    BD.Pincode = ds.Tables[0].Rows[i]["Pincode"].ToString();
                    BD.OfficeEmail = ds.Tables[0].Rows[i]["OfficeEmail"].ToString();                    
                    BD.StateCode = ds.Tables[0].Rows[i]["StateCode"].ToString();
                    BD.ContactPersoneName = ds.Tables[0].Rows[i]["PersoneName"].ToString();
                    BD.ContactPersoneMobile = ds.Tables[0].Rows[i]["MobileNo"].ToString();
                    //BD.GSTNUserId = ds.Tables[0].Rows[i]["GSTNUserID"].ToString();
                    //BD.GSTNPassword = ds.Tables[0].Rows[i]["GSTNPassword"].ToString();
                }
                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //=====================================End Get GST Based Client Details For GST Registrtaion Form============================


    //===================Start Get All Contact Persone Details For Bind The Dropdown=============================================
    public StaffClientDetails[] GetClientAllContactPersone(string str)
    {
        List<StaffClientDetails> li = new List<StaffClientDetails>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                StaffClientDetails BD = new StaffClientDetails();
                BD.PersonId = ds.Tables[0].Rows[i]["PersonID"].ToString();
                BD.ContactPersoneName = ds.Tables[0].Rows[i]["PersoneName"].ToString();

                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //===================End Get All Contact Persone Details For Bind The Dropdown=============================================


    //===================Start Get Draw Chart Value=============================================
    public StaffClientDetails[] GetDrawChartValue(string str1, string str2, string str3, string str4, string str5, string str6)
    {
        List<StaffClientDetails> li = new List<StaffClientDetails>();
            StaffClientDetails BD = new StaffClientDetails();

            BD.ClientCount = da.getString(str1);
            BD.ITCount = da.getString(str2);
            BD.TDSCount = da.getString(str3);
            BD.GSTREgCount = da.getString(str4);           
            //BD.GSTReturnCount = da.getString(str1);
            BD.GSTReturnCount = "0".ToString();
            BD.ITNoticeCount = da.getString(str6);            

            li.Add(BD);
      
        return li.ToArray();
    }
    //===================End Get Draw Chart Value=============================================


}