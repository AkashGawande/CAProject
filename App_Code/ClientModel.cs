using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ClientModel
/// </summary>
public class ClientModel
{
	public ClientModel()
	{
		//
		// TODO: Add constructor logic here
		//
	}
}

public class ClientDetails
{
    public string ReferanceId { get; set; }
    public string ClientID { get; set; }
    public string PANNumber { get; set; }
    public string TANNumber { get; set; }
    public string GSTNumber { get; set; }
    public string ApplicantName { get; set; }
    public string ApplicantFatherName { get; set; }
    public string ApplicantAddress { get; set; }
    public string Pincode { get; set; }
    public string BirthDate { get; set; }
    public string ApplicantMobileNo { get; set; }
    public string ApplicantEmail { get; set; }
    public string EmployedType { get; set; }
    public string StateCode { get; set; }
    public string Citizenship { get; set; }
    public string AadharNo { get; set; }
    public string ITDPortalPassword { get; set; }
    public string FranchiseeId { get; set; }
    public string StaffId { get; set; }
    public string RegDate { get; set; }
    public string Status { get; set; }


    //-------------Office / Deductor Name-------------------
    public string OfficeName { get; set; }
    public string AuthorisedPersonName { get; set; }
    public string OfficeAddress { get; set; }


    //-------AttacementDetails--------------
    public string DocumentName { get; set; }
    public string PhotoSource { get; set; }
    public string PhotoName { get; set; }

    //------------Account Details----------
    public string BankAccono { get; set; }
    public string IFSCCode { get; set; }
    public string AccountId { get; set; }

    //------------ContactPersone Details----------
    public string PersonID { get; set; }
    public string TANContactPersoneName { get; set; }
    public string TANContactPersoneMobile { get; set; }

    //---------------Gst Contact Person Details---------------
    public string GSTDeductorContactPersoneName { get; set; }
    public string GSTDeductorContactPersoneMobile { get; set; }
}

public class BindEmpDropDown
{
    public string EmployeeID { get; set; }
    public string EmployeeName { get; set; }
}