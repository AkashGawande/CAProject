using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Text.RegularExpressions;
/// <summary>
/// Summary description for EmployeeController
/// </summary>
public class EmployeeController
{
    DataAccess da = new DataAccess();
    string FilePath = "/Documents/";
	public EmployeeController()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    //======================Start Get IT Files==================================
    public ITFiles[] GetITAssignedFile(string str)
    {
        List<ITFiles> li = new List<ITFiles>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                ITFiles BD = new ITFiles();
                BD.StaffID = ds.Tables[0].Rows[i]["StaffID"].ToString();
                BD.Date = Convert.ToDateTime(ds.Tables[0].Rows[i]["AssignedDate"]).ToString("dd-MM-yyyy");
                BD.FileTransactionID = ds.Tables[0].Rows[i]["FileTransactionID"].ToString();
                BD.ClientID = ds.Tables[0].Rows[i]["ClientID"].ToString();
                BD.ApplicantName = ds.Tables[0].Rows[i]["ApplicantName"].ToString();
                BD.ApplicantMobileNo = ds.Tables[0].Rows[i]["ApplicantMobileNo"].ToString();
                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //======================End Get IT Files==================================


}