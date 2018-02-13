﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for StaffModel
/// </summary>
public class StaffModel
{
	public StaffModel()
	{
		//
		// TODO: Add constructor logic here
		//
	}
}

public class StaffClientDetails
{
    //-------------Payer Details--------------
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

    //---------Deductor Details----------------------
    public string OfficeName { get; set; }
    public string AuthorisedPersoneName { get; set; }
    public string PersonId { get; set; }
    public string ContactPersoneName { get; set; }
    public string ContactPersoneMobile { get; set; }
    public string OfficeEmail { get; set; }
    public string OfficeMobile { get; set; }
    public string OfficeAddress { get; set; }
    public string GSTNUserId { get; set; }
    public string GSTNPassword { get; set; }

    //-------AttacementDetails--------------
    public string FileTransactionId { get; set; }
    public string DocumentName { get; set; }
    public string PhotoSource { get; set; }
    public string PhotoName { get; set; }

    //------------Account Details----------
    public string BankAccono { get; set; }
    public string IFSCCode { get; set; }
    public string AccountId { get; set; }

    //---------------------Count-------------------------
    public string ClientCount { get; set; }
    public string ITCount { get; set; }
    public string GSTREgCount { get; set; }
    public string TDSCount { get; set; }
    public string GSTReturnCount { get; set; }
    public string ITNoticeCount { get; set; }

}
