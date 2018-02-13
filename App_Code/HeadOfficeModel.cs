using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for FranchiseeModel
/// </summary>
public class HeadOfficeModel
{
    public HeadOfficeModel()
	{
		//
		// TODO: Add constructor logic here
		//
	}
}


public class EmployeeData
{
    public string ID { get; set; }
    public string Emp_Id { get; set; }
    public string Emp_Name { get; set; }
    public string Joining_Date { get; set; }
    public string DOB { get; set; }
    public string Address { get; set; }
    public string Mobile_No { get; set; }
    public string Email_Id { get; set; }
    public string Designation { get; set; }
    public string CityId { get; set; }
    public string StateId { get; set; }
    public string CityName { get; set; }
    public string StateName { get; set; }
    public string Pincode { get; set; }
    public string Password { get; set; }
    public string AddressProof { get; set; }  
    public string Status { get; set; }
}
public class StateCity
{
    public string StateId { get; set; }
    public string StateName { get; set; }
    public string CityId { get; set; }
    public string CityName { get; set; }
}

public class FranchiseeList
{
    public string FranchiseeID { get; set; }
    public string EnquiryDate { get; set; }
    public string RegDate { get; set; }
    public string OwnerName { get; set; }
    public string FirmName { get; set; }
    public string FirmLicense { get; set; }
    public string PANNumber { get; set; }
    public string FatherName { get; set; }
    public string FirstLine { get; set; }
    public string SecondLine { get; set; }
    public string Landmark { get; set; }
    public string City { get; set; }
    public string DistrictName { get; set; }
    public string Pincode { get; set; }
    public string MobileNo { get; set; }
    public string EmailId { get; set; }
    public string Qualification { get; set; }
    public string CurrentProfession { get; set; }
    public string ApprovedBy { get; set; }
    public string StaffID { get; set; }
    public string MemberName { get; set; }
    public string JoiningDate { get; set; }
    public string StateName { get; set; }
    public string FranchiseePassword { get; set; }
    public string StaffPassword { get; set; }
}

public class ITClientList
{
    public string FranchiseeId { get; set; }
    public string ITClientID { get; set; }
    public string StaffId { get; set; }
    public string ClientId { get; set; }
    public string PANNumber { get; set; }
    public string RegDate { get; set; }
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
   
    
    public string AccountId { get; set; }
    public string AccountNo { get; set; }
    public string IFSC { get; set; }
    public string DocumentId { get; set; }
    public string DocumentName { get; set; }
    public string DocumentPath { get; set; }




    //-------AttacementDetails--------------
    public string MessageID { get; set; }
    public string FileName { get; set; }
    public string FilePath { get; set; }
    public string PhotoName { get; set; }
    public string BoxType { get; set; }

}

public class ITFiles
{
    public string FileTransactionID { get; set; }
    public string FranchiseeID { get; set; }
    public string StaffID { get; set; }
    public string StaffEmail { get; set; }

    public string ClientID { get; set; }
    public string AccountID { get; set; }    
    public string Date { get; set; }
    public string YearType { get; set; }
    public string Year { get; set; }
    public string FileStatus { get; set; }
    public string AssignedTo { get; set; }
    public string AssignedDate { get; set; }
    public string VerifiedDate { get; set; }
    public string CompletedDate { get; set; }


    public string PaymentID { get; set; }
    public string PaymentMode { get; set; }
    public string Amount { get; set; }
    public string ChequeNo { get; set; }
    public string Narration { get; set; }
    public string ChequeFileName { get; set; }
    public string DueDate { get; set; }
    public string PaymentStatus { get; set; }

    public string DocumentId { get; set; }
    public string DocumentName { get; set; }
    public string DocumentPath { get; set; }

    public string AccountId { get; set; }
    public string AccountNo { get; set; }
    public string IFSC { get; set; }
    //--------Cliets--------------------   
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


    public string EmpId { get; set; }
    public string EmpName { get; set; }
}

public class GSTRegistrationList
{
    public string ReferenceId { get; set; }
    public string FranchiseeID { get; set; }
    public string StaffID { get; set; }
    public string ClientID { get; set; }
    public string Date { get; set; }
    public string GSTType { get; set; }
    public string PAN_TAN { get; set; }
    public string Name1 { get; set; }
    public string Name2 { get; set; }
    public string MobileNo { get; set; }
    public string Email { get; set; }
    public string StateCode { get; set; }

    public string GSTAppFile { get; set; }
    public string PaymentMode { get; set; }
    public string Amount { get; set; }
    public string ChequeNo { get; set; }
    public string Narration { get; set; }
    public string ChequeFileName { get; set; }
    public string DueDate { get; set; }
    public string PaymentStatus { get; set; }   
    public string FileStatus { get; set; }

    public string PersonID { get; set; }
    public string PersoneName { get; set; }
    public string PersonMobileNo { get; set; }

    public string MessageID { get; set; }
    public string FilePath { get; set; }
    public string FileName { get; set; }
   

    //----Document List
    public string ID { get; set; }
    public string PhotoName { get; set; }
    public string PhotoPath { get; set; }
    public string EleOfficeName { get; set; }
    public string EleOfficePath { get; set; }
    public string PanCardName { get; set; }
    public string PanCardPath { get; set; }
    public string AadharName { get; set; }
    public string AadharPath { get; set; }
    public string ShopAct_NOCName { get; set; }
    public string ShopAct_NOCPath { get; set; }
    public string EleHomeName { get; set; }
    public string EleHomePath { get; set; }
    public string BankStatementName { get; set; }
    public string BankStatementPath { get; set; }
    public string CancelChequeName { get; set; }
    public string CancelChequePath { get; set; }
    public string PartnerShipName { get; set; }
    public string PartnerShipPath { get; set; }
    public string OtherName { get; set; }
    public string OtherPath { get; set; }
}

public class TDSList
{
    public string FileTransactionID { get; set; }
    public string FranchiseeID { get; set; }
    public string StaffID { get; set; }
    public string ClientID { get; set; }
    public string Date { get; set; }
    public string PersonId { get; set; }
    public string TypesOfReturn { get; set; }
    public string QuarterlyReturn { get; set; }

    public string PaymentMode { get; set; }
    public string Amount { get; set; }
    public string ChequeNo { get; set; }
    public string Narration { get; set; }
    public string ChequeFileName { get; set; }
    public string DueDate { get; set; }
    public string PaymentStatus { get; set; }
    public string FileStatus { get; set; }
    public string AssignedTo { get; set; }
    public string AssignedDate { get; set; }
    public string VerifiedDate { get; set; }
    public string CompletedDate { get; set; }
    public string EmpId { get; set; }
    public string EmpName { get; set; }

    public string ContactPersoneID { get; set; }
    public string PersoneName { get; set; }
    public string MobileNo { get; set; }

    //====Clients====
    public string TANNumber { get; set; }
    public string OfficeName { get; set; }
    public string AuthorisedPersone { get; set; }
    public string OfficeEmail { get; set; }
    public string StateName { get; set; }
   
   

    //====Documents====
    public string DocumentID { get; set; }
    public string DocumentName { get; set; }
    public string DocumentPath { get; set; }
}

public class TDSClientList
{
    public string FranchiseeId { get; set; }
    public string StaffId { get; set; }
    public string ClientId { get; set; }
    public string RegDate { get; set; }
    public string TANNumber { get; set; }
    public string OfficeName { get; set; }
    public string AuthorisedPersone { get; set; }
    public string OfficeAddress { get; set; }
    public string Pincode { get; set; }
    public string OfficeEmail { get; set; }
    public string StateCode { get; set; }
    public string TracesUserId { get; set; }
    public string TracesPassword { get; set; }

    public string PersonID { get; set; }
    public string PersoneName { get; set; }
    public string MobileNo { get; set; }

    public string DocumentId { get; set; }
    public string DocumentName { get; set; }
    public string DocumentPath { get; set; }
}

public class GSTTaxPayer
{
    public string ID { get; set; }
    public string FranchiseeId { get; set; }
    public string StaffId { get; set; }
    public string ClientId { get; set; }
    public string RegDate { get; set; }
    public string GSTNumber { get; set; }
    public string ApplicantName { get; set; }
    public string ApplicantFatherName { get; set; }
    public string ApplicantAddress { get; set; }
    public string Pincode { get; set; }
    public string BirthDate { get; set; }
    public string ApplicantMobileNo { get; set; }
    public string ApplicantEmail { get; set; }
    public string StateCode { get; set; }
    public string GSTNUserID { get; set; }
    public string GSTNPassword { get; set; }

    public string DocumentId { get; set; }
    public string DocumentName { get; set; }
    public string DocumentPath { get; set; }
}

public class GSTTaxDeductor
{
    public string FranchiseeId { get; set; }
    public string StaffId { get; set; }
    public string ClientId { get; set; }
    public string RegDate { get; set; }
    public string GSTNumber { get; set; }
    public string OfficeName { get; set; }
    public string AuthorisedPersone { get; set; }
    public string OfficeAddress { get; set; }
    public string Pincode { get; set; }
    public string OfficeEmail { get; set; }
    public string StateCode { get; set; }
    public string GSTNUserID { get; set; }
    public string GSTNPassword { get; set; }

    public string PersonID { get; set; }
    public string PersoneName { get; set; }
    public string MobileNo { get; set; }

    public string DocumentId { get; set; }
    public string DocumentName { get; set; }
    public string DocumentPath { get; set; }    
}

public class AssignedFiles
{
    public string EmpId { get; set; }
    public string FileID { get; set; }   
}

