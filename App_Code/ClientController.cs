using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

/// <summary>
/// Summary description for ClientController
/// </summary>
public class ClientController
{
    DataAccess da = new DataAccess();
	public ClientController()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public ClientDetails[] GetPANClientAllData(string str)
    {
        List<ClientDetails> li = new List<ClientDetails>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                ClientDetails BD = new ClientDetails();
                BD.ClientID = ds.Tables[0].Rows[i]["ClientId"].ToString();
                BD.PANNumber = ds.Tables[0].Rows[i]["PANNumber"].ToString();                
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

    public ClientDetails[] GetTANClientAllData(string str)
    {
        List<ClientDetails> li = new List<ClientDetails>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                ClientDetails BD = new ClientDetails();
                BD.ClientID = ds.Tables[0].Rows[i]["ClientId"].ToString();               
                BD.TANNumber = ds.Tables[0].Rows[i]["TANNumber"].ToString();              
                BD.OfficeName = ds.Tables[0].Rows[i]["OfficeName"].ToString();
                BD.AuthorisedPersonName = ds.Tables[0].Rows[i]["AuthorisedPersone"].ToString();
                BD.OfficeAddress = ds.Tables[0].Rows[i]["OfficeAddress"].ToString();
                BD.Pincode = ds.Tables[0].Rows[i]["Pincode"].ToString();               
                BD.ApplicantEmail = ds.Tables[0].Rows[i]["OfficeEmail"].ToString();               
                BD.StateCode = ds.Tables[0].Rows[i]["StateCode"].ToString();
                
                li.Add(BD);
            }
        }
        return li.ToArray();
    }

    public ClientDetails[] GetClientAllAccountNo(string str)
    {
        List<ClientDetails> li = new List<ClientDetails>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                ClientDetails BD = new ClientDetails();
                BD.AccountId = ds.Tables[0].Rows[i]["AccountId"].ToString();
                BD.BankAccono = ds.Tables[0].Rows[i]["AccountNo"].ToString();
                
                li.Add(BD);
            }
        }
        return li.ToArray();
    }



    public ClientDetails[] GetClientAllContactPersone(string str)
    {
        List<ClientDetails> li = new List<ClientDetails>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                ClientDetails BD = new ClientDetails();
                BD.PersonID = ds.Tables[0].Rows[i]["PersonID"].ToString();
                BD.TANContactPersoneName = ds.Tables[0].Rows[i]["PersoneName"].ToString();

                li.Add(BD);
            }
        }
        return li.ToArray();
    }


    //========================Start Bind Employee DDL=========================
    public BindEmpDropDown[] GetEmployeeDDL(string str)
    {
        List<BindEmpDropDown> li = new List<BindEmpDropDown>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                BindEmpDropDown BD = new BindEmpDropDown();
                BD.EmployeeID = ds.Tables[0].Rows[i]["StaffID"].ToString();
                BD.EmployeeName = ds.Tables[0].Rows[i]["MemberName"].ToString();

                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //========================End Bind Employee DDL=========================

    //======================Start Get Clients list==================================
    public ClientDetails[] GetClients(string str)
    {
        List<ClientDetails> li = new List<ClientDetails>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                ClientDetails BD = new ClientDetails();
                BD.RegDate = Convert.ToDateTime(ds.Tables[0].Rows[i]["RegDate"]).ToString("dd-MM-yyyy");
                BD.ClientID = ds.Tables[0].Rows[i]["ClientId"].ToString();
                string PAN = BD.PANNumber = ds.Tables[0].Rows[i]["PANNumber"].ToString();
                if (PAN != "")
                {
                    BD.TANNumber = ds.Tables[0].Rows[i]["PANNumber"].ToString();
                }
                else
                {
                    BD.TANNumber = ds.Tables[0].Rows[i]["TANNumber"].ToString();
                }                
                BD.GSTNumber = ds.Tables[0].Rows[i]["GSTNumber"].ToString();
                BD.ApplicantName = ds.Tables[0].Rows[i]["ApplicantName"].ToString();
                BD.ApplicantMobileNo = ds.Tables[0].Rows[i]["ApplicantMobileNo"].ToString();
                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //======================End Get Clients list==================================
}