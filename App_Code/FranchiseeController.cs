using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
/// <summary>
/// Summary description for FranchiseeController
/// </summary>
public class FranchiseeController
{
    DataAccess da = new DataAccess();
	public FranchiseeController()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public FranchiseeDetails[] GetStateDetails(string str)
    {
        List<FranchiseeDetails> li = new List<FranchiseeDetails>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                FranchiseeDetails BD = new FranchiseeDetails();
                if (ds.Tables[0].Rows[i]["StateCode"].ToString().Length==1)
                {
                    BD.StateCode ="0"+ds.Tables[0].Rows[i]["StateCode"].ToString();
                }
                else
                {
                    BD.StateCode = ds.Tables[0].Rows[i]["StateCode"].ToString();
                }

                //BD.StateCode = ds.Tables[0].Rows[i]["StateCode"].ToString();
                BD.StateName = ds.Tables[0].Rows[i]["StateName"].ToString();
                li.Add(BD);
            }
        }
        return li.ToArray();
    }



    public FranchiseeDetails[] GetDistrictDetails(string str)
    {
        List<FranchiseeDetails> li = new List<FranchiseeDetails>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                FranchiseeDetails BD = new FranchiseeDetails();
                BD.DistrictId = ds.Tables[0].Rows[i]["DistrictId"].ToString();
                BD.DistrictName = ds.Tables[0].Rows[i]["DistrictName"].ToString();
                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //=========================Start Get Empoyees List=====================
    public EmplyeeList[] GetEmployees(string str)
    {
        List<EmplyeeList> li = new List<EmplyeeList>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                EmplyeeList BD = new EmplyeeList();
                BD.StaffID = ds.Tables[0].Rows[i]["StaffID"].ToString();
                BD.MemberName = ds.Tables[0].Rows[i]["MemberName"].ToString();
                BD.JoiningDate = Convert.ToDateTime(ds.Tables[0].Rows[i]["JoiningDate"]).ToString("dd-MM-yyyy");
                BD.Status = ds.Tables[0].Rows[i]["Status"].ToString();
                BD.StaffPassword = ds.Tables[0].Rows[i]["StaffPassword"].ToString();
                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //=========================End Get Empoyees List=====================
}