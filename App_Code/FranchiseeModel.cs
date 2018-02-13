using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for FranchiseeModel
/// </summary>
public class FranchiseeModel
{
	public FranchiseeModel()
	{
		//
		// TODO: Add constructor logic here
		//
	}
}

public class FranchiseeDetails
{
    public string StateCode { get; set; }
    public string StateName { get; set; }
    public string DistrictId { get; set; }
    public string DistrictName { get; set; }
}
public class EmplyeeList
{
    public string StaffID { get; set; }
    public string MemberName { get; set; }
    public string JoiningDate { get; set; }
    public string Status { get; set; }
    public string StaffPassword { get; set; }
}