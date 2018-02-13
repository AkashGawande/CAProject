using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Text.RegularExpressions;
/// <summary>
/// Summary description for FranchiseeController
/// </summary>
public class HeadOfficeController
{
    DataAccess da = new DataAccess();
    string FilePath = "/Documents/";
    public HeadOfficeController()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    //======================Start Get TDS Clients Documents on Model Box==================================
    public StateCity[] GetCities(string str)
    {
        List<StateCity> li = new List<StateCity>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                StateCity BD = new StateCity();
                BD.CityId = ds.Tables[0].Rows[i]["DistrictId"].ToString();
                BD.CityName = ds.Tables[0].Rows[i]["DistrictName"].ToString();
                
                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //======================End Get TDS Clients Documents on Model Box==================================


    //======================Start Get New Franhcisee==================================
    public FranchiseeList[] GetFranchisee(string str)
    {
        List<FranchiseeList> li = new List<FranchiseeList>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {    
                FranchiseeList BD = new FranchiseeList();
                BD.FranchiseeID = ds.Tables[0].Rows[i]["FranchiseeID"].ToString();
                BD.EnquiryDate = Convert.ToDateTime(ds.Tables[0].Rows[i]["EnquiryDate"]).ToString("dd-MM-yyyy");             
                BD.OwnerName = ds.Tables[0].Rows[i]["OwnerName"].ToString();
                BD.FirmName = ds.Tables[0].Rows[i]["FirmName"].ToString();              
                BD.City = ds.Tables[0].Rows[i]["City"].ToString();
                BD.DistrictName = ds.Tables[0].Rows[i]["DistrictName"].ToString();
                BD.FirmLicense = FilePath + ds.Tables[0].Rows[i]["FirmLicense"].ToString();
                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //======================End Get New Franhcisee==================================

    //======================Start Get Franhcisee Details on Model Box==================================
    public FranchiseeList[] GetFranchiseeDetails(string str)
    {
        List<FranchiseeList> li = new List<FranchiseeList>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                FranchiseeList BD = new FranchiseeList();
                BD.FranchiseeID = ds.Tables[0].Rows[i]["FranchiseeID"].ToString();
                BD.FranchiseePassword = ds.Tables[0].Rows[i]["Password"].ToString();
                BD.EnquiryDate = Convert.ToDateTime(ds.Tables[0].Rows[i]["EnquiryDate"]).ToString("dd-MM-yyyy");
                if (ds.Tables[0].Rows[i]["RegDate"].ToString() == "")
                {
                    BD.RegDate = "";
                }
                else
                {
                    BD.RegDate = Convert.ToDateTime(ds.Tables[0].Rows[i]["RegDate"]).ToString("dd-MM-yyyy");
                }                
                BD.OwnerName = ds.Tables[0].Rows[i]["OwnerName"].ToString();
                BD.FirmName = ds.Tables[0].Rows[i]["FirmName"].ToString();
                BD.FirmLicense = ds.Tables[0].Rows[i]["FirmLicense"].ToString();
                BD.PANNumber = ds.Tables[0].Rows[i]["PANNumber"].ToString();
                BD.FatherName = ds.Tables[0].Rows[i]["FatherName"].ToString();
                BD.FirstLine = ds.Tables[0].Rows[i]["FirstLine"].ToString();
                BD.SecondLine = ds.Tables[0].Rows[i]["SecondLine"].ToString();
                BD.Landmark = ds.Tables[0].Rows[i]["Landmark"].ToString();
                BD.City = ds.Tables[0].Rows[i]["City"].ToString();
                BD.DistrictName = ds.Tables[0].Rows[i]["DistrictName"].ToString();
                BD.Pincode = ds.Tables[0].Rows[i]["Pincode"].ToString();
                BD.MobileNo = ds.Tables[0].Rows[i]["MobileNo"].ToString();
                BD.EmailId = ds.Tables[0].Rows[i]["EmailId"].ToString();
                BD.Qualification = ds.Tables[0].Rows[i]["Qualification"].ToString();
                BD.CurrentProfession = ds.Tables[0].Rows[i]["CurrentProfession"].ToString();
                BD.ApprovedBy = ds.Tables[0].Rows[i]["ApprovedBy"].ToString();
                BD.StateName = ds.Tables[0].Rows[i]["StateName"].ToString();
                BD.StaffID = ds.Tables[0].Rows[i]["StaffID"].ToString();
                BD.MemberName = ds.Tables[0].Rows[i]["MemberName"].ToString();
                BD.JoiningDate = Convert.ToDateTime(ds.Tables[0].Rows[i]["JoiningDate"]).ToString("dd-MM-yyyy");
                BD.StaffPassword = ds.Tables[0].Rows[i]["StaffPassword"].ToString();

                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //======================End Get Franhcisee Details on Model Box==================================

    //======================Start Get Approved Franchisees==================================
    public FranchiseeList[] GetApproved(string str)
    {
        List<FranchiseeList> li = new List<FranchiseeList>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                FranchiseeList BD = new FranchiseeList();
                BD.FranchiseeID = ds.Tables[0].Rows[i]["FranchiseeID"].ToString();
                BD.RegDate = Convert.ToDateTime(ds.Tables[0].Rows[i]["RegDate"]).ToString("dd-MM-yyyy");
                BD.OwnerName = ds.Tables[0].Rows[i]["OwnerName"].ToString();
                BD.FirmName = ds.Tables[0].Rows[i]["FirmName"].ToString();
                BD.City = ds.Tables[0].Rows[i]["City"].ToString();
                BD.DistrictName = ds.Tables[0].Rows[i]["DistrictName"].ToString();
                BD.FirmLicense = FilePath + ds.Tables[0].Rows[i]["FirmLicense"].ToString();
                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //======================End Get Approved Franchisees==================================

    //======================Start Bind Emp Name For AssignedTo==================================
    public ITFiles[] GetEmpNameAssignedTo(string str)
    {
        List<ITFiles> li = new List<ITFiles>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                ITFiles BD = new ITFiles();
                BD.EmpId = ds.Tables[0].Rows[i]["AssignedTo"].ToString();
                BD.EmpName = ds.Tables[0].Rows[i]["EmpName"].ToString();
                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //======================End Bind Emp Name For AssignedTo==================================

    //======================Start Bind FranhciseeID==================================
    public FranchiseeList[] GetFranchiseeID(string str)
    {
        List<FranchiseeList> li = new List<FranchiseeList>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                FranchiseeList BD = new FranchiseeList();
                BD.FranchiseeID = ds.Tables[0].Rows[i]["FranchiseeID"].ToString();
                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //======================End Bind FranhciseeID==================================

    //======================Start Bind Firm Name==================================
    public FranchiseeList[] GetFirmName(string str)
    {
        List<FranchiseeList> li = new List<FranchiseeList>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                FranchiseeList BD = new FranchiseeList();
                BD.FranchiseeID = ds.Tables[0].Rows[i]["FranchiseeID"].ToString();
                BD.FirmName = ds.Tables[0].Rows[i]["FirmName"].ToString();
                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //======================End Bind Firm Name==================================


    //======================Start Bind Firm Name==================================
    public EmployeeData[] GetHeadOfficeName(string str)
    {
        List<EmployeeData> li = new List<EmployeeData>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                EmployeeData BD = new EmployeeData();
                BD.Emp_Id = ds.Tables[0].Rows[i]["EmpId"].ToString();
                BD.Emp_Name = ds.Tables[0].Rows[i]["EmpName"].ToString();
                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //======================End Bind Firm Name==================================





    //======================Start Get IT Clients list==================================
    public ITClientList[] GetITClients(string str)
    {
        List<ITClientList> li = new List<ITClientList>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                ITClientList BD = new ITClientList();
                BD.StaffId = ds.Tables[0].Rows[i]["StaffId"].ToString();
                BD.RegDate = Convert.ToDateTime(ds.Tables[0].Rows[i]["RegDate"]).ToString("dd-MM-yyyy");
                BD.ClientId = ds.Tables[0].Rows[i]["ClientId"].ToString();
                BD.PANNumber = ds.Tables[0].Rows[i]["PANNumber"].ToString();             
                BD.ApplicantName = ds.Tables[0].Rows[i]["ApplicantName"].ToString();
                BD.ApplicantMobileNo = ds.Tables[0].Rows[i]["ApplicantMobileNo"].ToString();
                BD.FranchiseeId = ds.Tables[0].Rows[i]["FranchiseeId"].ToString();
                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //======================End Get IT Clients list==================================

    //======================Start Get TDS Clients list==================================
    public TDSClientList[] GetTDSClients(string str)
    {
        List<TDSClientList> li = new List<TDSClientList>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                TDSClientList BD = new TDSClientList();
                BD.StaffId = ds.Tables[0].Rows[i]["StaffId"].ToString();
                BD.RegDate = Convert.ToDateTime(ds.Tables[0].Rows[i]["RegDate"]).ToString("dd-MM-yyyy");
                BD.ClientId = ds.Tables[0].Rows[i]["ClientId"].ToString();
                BD.TANNumber = ds.Tables[0].Rows[i]["TANNumber"].ToString();
                BD.OfficeName = ds.Tables[0].Rows[i]["OfficeName"].ToString();
                BD.AuthorisedPersone = ds.Tables[0].Rows[i]["AuthorisedPersone"].ToString();
                BD.FranchiseeId = ds.Tables[0].Rows[i]["FranchiseeId"].ToString();
                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //======================End Get TDS Clients list==================================

    //======================Start Get GST Clients list==================================
    public GSTTaxPayer[] GetGSTaxPayer(string str)
    {
        List<GSTTaxPayer> li = new List<GSTTaxPayer>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                GSTTaxPayer BD = new GSTTaxPayer();
                BD.StaffId = ds.Tables[0].Rows[i]["StaffId"].ToString();
                BD.RegDate = Convert.ToDateTime(ds.Tables[0].Rows[i]["RegDate"]).ToString("dd-MM-yyyy");
                BD.ClientId = ds.Tables[0].Rows[i]["ClientId"].ToString();
                BD.GSTNumber = ds.Tables[0].Rows[i]["GSTNumber"].ToString();
                BD.ApplicantName = ds.Tables[0].Rows[i]["ApplicantName"].ToString();
                BD.ApplicantMobileNo = ds.Tables[0].Rows[i]["ApplicantMobileNo"].ToString();
                BD.FranchiseeId = ds.Tables[0].Rows[i]["FranchiseeId"].ToString();
                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //======================End Get GST Clients list==================================

    //======================Start Get GST Clients list==================================
    public GSTTaxDeductor[] GetGSTaxDeductor(string str)
    {
        List<GSTTaxDeductor> li = new List<GSTTaxDeductor>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                GSTTaxDeductor BD = new GSTTaxDeductor();
                BD.StaffId = ds.Tables[0].Rows[i]["StaffId"].ToString();
                BD.RegDate = Convert.ToDateTime(ds.Tables[0].Rows[i]["RegDate"]).ToString("dd-MM-yyyy");
                BD.ClientId = ds.Tables[0].Rows[i]["ClientId"].ToString();
                BD.GSTNumber = ds.Tables[0].Rows[i]["GSTNumber"].ToString();
                BD.OfficeName = ds.Tables[0].Rows[i]["OfficeName"].ToString();
                BD.AuthorisedPersone = ds.Tables[0].Rows[i]["AuthorisedPersone"].ToString();
                BD.FranchiseeId = ds.Tables[0].Rows[i]["FranchiseeId"].ToString();
                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //======================End Get GST Clients list==================================

    //======================Start Get IT Clients Details on Model Box==================================
    public ITClientList[] GetITClientDetails(string str)
    {
        List<ITClientList> li = new List<ITClientList>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                ITClientList BD = new ITClientList();               
                BD.ClientId = ds.Tables[0].Rows[i]["ClientId"].ToString();
                BD.PANNumber = ds.Tables[0].Rows[i]["PANNumber"].ToString();
                BD.ApplicantName = ds.Tables[0].Rows[i]["ApplicantName"].ToString();
                BD.RegDate = Convert.ToDateTime(ds.Tables[0].Rows[i]["RegDate"]).ToString("dd-MM-yyyy");
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

                BD.AccountId = ds.Tables[0].Rows[i]["AccountId"].ToString();
                BD.AccountNo = ds.Tables[0].Rows[i]["AccountNo"].ToString();
                BD.IFSC = ds.Tables[0].Rows[i]["IFSC"].ToString();
                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //======================End Get IT Clients Details on Model Box==================================

    //======================Start Get TDS Clients Details on Model Box==================================
    public TDSClientList[] GetTDSClientDetails(string str)
    {
        List<TDSClientList> li = new List<TDSClientList>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                TDSClientList BD = new TDSClientList();
                BD.ClientId = ds.Tables[0].Rows[i]["ClientId"].ToString();
                BD.TANNumber = ds.Tables[0].Rows[i]["TANNumber"].ToString();
                BD.OfficeName = ds.Tables[0].Rows[i]["OfficeName"].ToString();
                BD.RegDate = Convert.ToDateTime(ds.Tables[0].Rows[i]["RegDate"]).ToString("dd-MM-yyyy");
                BD.AuthorisedPersone = ds.Tables[0].Rows[i]["AuthorisedPersone"].ToString();
                BD.OfficeAddress = ds.Tables[0].Rows[i]["OfficeAddress"].ToString();
                BD.Pincode = ds.Tables[0].Rows[i]["Pincode"].ToString();
                BD.OfficeEmail = ds.Tables[0].Rows[i]["OfficeEmail"].ToString();
                BD.StateCode = ds.Tables[0].Rows[i]["StateCode"].ToString();
                BD.TracesUserId = ds.Tables[0].Rows[i]["TracesUserId"].ToString();
                BD.TracesPassword = ds.Tables[0].Rows[i]["TracesPassword"].ToString();

                BD.PersonID = ds.Tables[0].Rows[i]["PersonID"].ToString();
                BD.PersoneName = ds.Tables[0].Rows[i]["PersoneName"].ToString();
                BD.MobileNo = ds.Tables[0].Rows[i]["MobileNo"].ToString();
                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //======================End Get TDS Clients Details on Model Box==================================
    //======================Start Get GST Payer Clients Details on Model Box==================================
    public GSTTaxPayer[] GetGSTPClientDetails(string str)
    {
        List<GSTTaxPayer> li = new List<GSTTaxPayer>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                GSTTaxPayer BD = new GSTTaxPayer();
                BD.ClientId = ds.Tables[0].Rows[i]["ClientId"].ToString();
                BD.GSTNumber = ds.Tables[0].Rows[i]["GSTNumber"].ToString();
                BD.ApplicantName = ds.Tables[0].Rows[i]["ApplicantName"].ToString();
                BD.RegDate = Convert.ToDateTime(ds.Tables[0].Rows[i]["RegDate"]).ToString("dd-MM-yyyy");
                BD.ApplicantFatherName = ds.Tables[0].Rows[i]["ApplicantFatherName"].ToString();
                BD.ApplicantAddress = ds.Tables[0].Rows[i]["ApplicantAddress"].ToString();
                BD.Pincode = ds.Tables[0].Rows[i]["Pincode"].ToString();
                BD.ApplicantEmail = ds.Tables[0].Rows[i]["ApplicantEmail"].ToString();
                BD.StateCode = ds.Tables[0].Rows[i]["StateCode"].ToString();
                BD.BirthDate = Convert.ToDateTime(ds.Tables[0].Rows[i]["BirthDate"]).ToString("dd-MM-yyyy");
                BD.ApplicantMobileNo = ds.Tables[0].Rows[i]["ApplicantMobileNo"].ToString();
                BD.GSTNUserID = ds.Tables[0].Rows[i]["GSTNUserID"].ToString();
                BD.GSTNPassword = ds.Tables[0].Rows[i]["GSTNPassword"].ToString();

                BD.DocumentId = ds.Tables[0].Rows[i]["DocumentId"].ToString();
                BD.DocumentName = ds.Tables[0].Rows[i]["DocumentName"].ToString();
                BD.DocumentPath = FilePath + ds.Tables[0].Rows[i]["DocumentPath"].ToString();
                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //======================End Get GST Payer Clients Details on Model Box==================================

    //======================Start Get GST Deductor Clients Details on Model Box==================================
    public GSTTaxDeductor[] GetGSTDClientDetails(string str)
    {
        List<GSTTaxDeductor> li = new List<GSTTaxDeductor>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                GSTTaxDeductor BD = new GSTTaxDeductor();
                BD.ClientId = ds.Tables[0].Rows[i]["ClientId"].ToString();
                BD.GSTNumber = ds.Tables[0].Rows[i]["GSTNumber"].ToString();
                BD.OfficeName = ds.Tables[0].Rows[i]["OfficeName"].ToString();
                BD.RegDate = Convert.ToDateTime(ds.Tables[0].Rows[i]["RegDate"]).ToString("dd-MM-yyyy");
                BD.AuthorisedPersone = ds.Tables[0].Rows[i]["AuthorisedPersone"].ToString();
                BD.OfficeAddress = ds.Tables[0].Rows[i]["OfficeAddress"].ToString();
                BD.Pincode = ds.Tables[0].Rows[i]["Pincode"].ToString();
                BD.OfficeEmail = ds.Tables[0].Rows[i]["OfficeEmail"].ToString();
                BD.StateCode = ds.Tables[0].Rows[i]["StateCode"].ToString();
              
                BD.GSTNUserID = ds.Tables[0].Rows[i]["GSTNUserID"].ToString();
                BD.GSTNPassword = ds.Tables[0].Rows[i]["GSTNPassword"].ToString();

                BD.PersonID = ds.Tables[0].Rows[i]["PersonID"].ToString();
                BD.PersoneName = ds.Tables[0].Rows[i]["PersoneName"].ToString();
                BD.MobileNo = ds.Tables[0].Rows[i]["MobileNo"].ToString();
                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //======================End Get GST Deductor Clients Details on Model Box==================================

    //======================Start Get IT Clients Documents on Model Box==================================
    public ITClientList[] GetClientDocuments(string str)
    {
        List<ITClientList> li = new List<ITClientList>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                ITClientList BD = new ITClientList();
                BD.DocumentId = ds.Tables[0].Rows[i]["DocumentId"].ToString();
                BD.DocumentName = ds.Tables[0].Rows[i]["DocumentName"].ToString();
                BD.DocumentPath = FilePath + ds.Tables[0].Rows[i]["DocumentPath"].ToString();
                li.Add(BD);
            }
        }
        return li.ToArray();
    }


    public ITClientList[] DownloadITClientDocument(string str)
    {
        List<ITClientList> li = new List<ITClientList>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                ITClientList BD = new ITClientList();
                //BD.DocumentId = ds.Tables[0].Rows[i]["DocumentId"].ToString();
                //BD.DocumentName = ds.Tables[0].Rows[i]["DocumentName"].ToString();
                BD.DocumentPath = ds.Tables[0].Rows[i]["DocumentPath"].ToString();
                li.Add(BD);
            }
        }
        return li.ToArray();
    }

    public GSTRegistrationList[] DownloadGSTPDocument(string str)
    {
        List<GSTRegistrationList> li = new List<GSTRegistrationList>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                GSTRegistrationList BD = new GSTRegistrationList();               
                BD.PhotoPath = ds.Tables[0].Rows[i]["PhotoPath"].ToString();                
                BD.EleOfficePath = ds.Tables[0].Rows[i]["EleOfficePath"].ToString();              
                BD.PanCardPath = ds.Tables[0].Rows[i]["PanCardPath"].ToString();               
                BD.AadharPath = ds.Tables[0].Rows[i]["AadharPath"].ToString();               
                BD.ShopAct_NOCPath = ds.Tables[0].Rows[i]["ShopAct_NOCPath"].ToString();               
                BD.EleHomePath = ds.Tables[0].Rows[i]["EleHomePath"].ToString();               
                BD.BankStatementPath = ds.Tables[0].Rows[i]["BankStatementPath"].ToString();                
                BD.CancelChequePath = ds.Tables[0].Rows[i]["CancelChequePath"].ToString();               
                BD.PartnerShipPath = ds.Tables[0].Rows[i]["PartnerShipPath"].ToString();               
                BD.OtherPath = ds.Tables[0].Rows[i]["OtherPath"].ToString();
                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //======================End Get IT Clients Documents on Model Box==================================
    //======================Start Get TDS Clients Documents on Model Box==================================
    public TDSClientList[] GetTDSClientDocuments(string str)
    {
        List<TDSClientList> li = new List<TDSClientList>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                TDSClientList BD = new TDSClientList();
                BD.DocumentId = ds.Tables[0].Rows[i]["DocumentId"].ToString();
                BD.DocumentName = ds.Tables[0].Rows[i]["DocumentName"].ToString();
                BD.DocumentPath = FilePath + ds.Tables[0].Rows[i]["DocumentPath"].ToString();
                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //======================End Get TDS Clients Documents on Model Box==================================

    //======================Start Get GST Deductor Clients Documents on Model Box==================================
    public GSTTaxDeductor[] GetGSTDClientDocuments(string str)
    {
        List<GSTTaxDeductor> li = new List<GSTTaxDeductor>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                GSTTaxDeductor BD = new GSTTaxDeductor();
                BD.DocumentId = ds.Tables[0].Rows[i]["DocumentId"].ToString();
                BD.DocumentName = ds.Tables[0].Rows[i]["DocumentName"].ToString();
                BD.DocumentPath = FilePath + ds.Tables[0].Rows[i]["DocumentPath"].ToString();
                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //======================End Get GST Deductor Clients Documents on Model Box==================================

    //======================Start Get IT Files==================================
    public ITFiles[] GetITFile(string str)
    {
        List<ITFiles> li = new List<ITFiles>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                ITFiles BD = new ITFiles();
                BD.StaffID = ds.Tables[0].Rows[i]["StaffID"].ToString();
                BD.Date = Convert.ToDateTime(ds.Tables[0].Rows[i]["Date"]).ToString("dd-MM-yyyy");
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


    //======================Start Get IT Files==================================
    public ITFiles[] GetITFileHO(string str)
    {
        List<ITFiles> li = new List<ITFiles>();
        DataSet ds = da.fillDataset(str);

        if (ds.Tables.Count != 0)
        {
            if (ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    ITFiles BD = new ITFiles();
                    BD.FranchiseeID = ds.Tables[0].Rows[i]["FranchiseeID"].ToString();
                    BD.StaffID = ds.Tables[0].Rows[i]["StaffID"].ToString();
                    BD.Date = Convert.ToDateTime(ds.Tables[0].Rows[i]["Date"]).ToString("dd-MM-yyyy");
                    BD.FileTransactionID = ds.Tables[0].Rows[i]["FileTransactionID"].ToString();
                    BD.ClientID = ds.Tables[0].Rows[i]["ClientID"].ToString();
                    BD.ApplicantName = ds.Tables[0].Rows[i]["ApplicantName"].ToString();
                    BD.ApplicantMobileNo = ds.Tables[0].Rows[i]["ApplicantMobileNo"].ToString();
                    BD.FileStatus = ds.Tables[0].Rows[i]["FileStatus"].ToString();
                    BD.AssignedTo = ds.Tables[0].Rows[i]["EmpName"].ToString();
                    string AssignDate = ds.Tables[0].Rows[i]["AssignedDate"].ToString();
                    string Verifydate = ds.Tables[0].Rows[i]["VerifiedDate"].ToString();
                    string Completedate = ds.Tables[0].Rows[i]["CompletedDate"].ToString();
                    if (AssignDate != "")
                    {
                        BD.AssignedDate = Convert.ToDateTime(AssignDate).ToString("dd-MM-yyyy");
                    }
                    else
                    {
                        BD.AssignedDate = "";
                    }


                    if (Verifydate != "")
                    {
                        BD.VerifiedDate = Convert.ToDateTime(Verifydate).ToString("dd-MM-yyyy");
                    }
                    else
                    {
                        BD.VerifiedDate = "";
                    }
                    if (Completedate != "")
                    {
                        BD.CompletedDate = Convert.ToDateTime(Completedate).ToString("dd-MM-yyyy");
                    }
                    else
                    {
                        BD.CompletedDate = "";
                    }
                    BD.StaffEmail = ds.Tables[0].Rows[i]["Email"].ToString();


                    li.Add(BD);
                }
            }        
        }
        return li.ToArray();
    }
    //======================End Get IT Files==================================

    //======================Start Get IT File Details on Model Box==================================
    public ITFiles[] GetITFileDetails(string str)
    {
        List<ITFiles> li = new List<ITFiles>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                ITFiles BD = new ITFiles();
                BD.FileTransactionID = ds.Tables[0].Rows[i]["FileTransactionID"].ToString();
                BD.ClientID = ds.Tables[0].Rows[i]["ClientID"].ToString();
                BD.PANNumber = ds.Tables[0].Rows[i]["PANNumber"].ToString();
                //BD.TANNumber = ds.Tables[0].Rows[i]["TANNumber"].ToString();
                //BD.GSTNumber = ds.Tables[0].Rows[i]["GSTNumber"].ToString();
                BD.ApplicantName = ds.Tables[0].Rows[i]["ApplicantName"].ToString();
                BD.Date = Convert.ToDateTime(ds.Tables[0].Rows[i]["Date"]).ToString("dd-MM-yyyy");
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

                BD.YearType = ds.Tables[0].Rows[i]["YearType"].ToString().Replace(" ", "_");
                BD.Year = ds.Tables[0].Rows[i]["Year"].ToString();
               
                BD.Amount = ds.Tables[0].Rows[i]["Amount"].ToString();
                BD.PaymentMode = ds.Tables[0].Rows[i]["PaymentMode"].ToString();
                BD.PaymentStatus = ds.Tables[0].Rows[i]["PaymentStatus"].ToString();

                BD.ChequeNo = ds.Tables[0].Rows[i]["ChequeNo"].ToString();
                BD.Narration = ds.Tables[0].Rows[i]["Narration"].ToString();
                BD.ChequeFileName = FilePath + ds.Tables[0].Rows[i]["ChequeFileName"].ToString();
                //BD.DueDate = Convert.ToDateTime(ds.Tables[0].Rows[i]["DueDate"]).ToString("dd-MM-yyyy");
                string duedate = ds.Tables[0].Rows[i]["DueDate"].ToString();
                if (duedate != "")
                {
                    BD.DueDate = Convert.ToDateTime(duedate).ToString("dd-MM-yyyy");
                }
                else
                {
                    BD.DueDate = "";
                }
                BD.AccountID = ds.Tables[0].Rows[i]["AccountID"].ToString();
                BD.AccountId = ds.Tables[0].Rows[i]["AccountId1"].ToString();
                BD.AccountNo = ds.Tables[0].Rows[i]["AccountNo"].ToString();
                BD.IFSC = ds.Tables[0].Rows[i]["IFSC"].ToString();
                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //======================End Get IT File Details on Model Box==================================

    //======================Start Get IT File Documents on Model Box==================================
    public ITFiles[] GetITFileDocuments(string str)
    {
        List<ITFiles> li = new List<ITFiles>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                ITFiles BD = new ITFiles();
                BD.DocumentId = ds.Tables[0].Rows[i]["DocumentId"].ToString();
                BD.DocumentName = ds.Tables[0].Rows[i]["DocumentName"].ToString();
                BD.DocumentPath = FilePath + ds.Tables[0].Rows[i]["DocumentPath"].ToString();
                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //======================End Get IT File Documents on Model Box==================================

    //======================Start Get GST Reg Tax Payer List==================================
    public GSTRegistrationList[] GetGSTRegListTP(string str)
    {
        List<GSTRegistrationList> li = new List<GSTRegistrationList>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                GSTRegistrationList BD = new GSTRegistrationList();
                BD.StaffID = ds.Tables[0].Rows[i]["StaffID"].ToString();
                BD.Date = Convert.ToDateTime(ds.Tables[0].Rows[i]["Date"]).ToString("dd-MM-yyyy");
                BD.ReferenceId = ds.Tables[0].Rows[i]["ReferenceId"].ToString();
                BD.ClientID = ds.Tables[0].Rows[i]["ClientID"].ToString();
                BD.PAN_TAN = ds.Tables[0].Rows[i]["PAN_TAN"].ToString();
                BD.Name1 = ds.Tables[0].Rows[i]["Name1"].ToString();
                BD.MobileNo = ds.Tables[0].Rows[i]["MobileNo"].ToString();
                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //======================End Get GST Reg Tax Payer List==================================

    //======================Start Get GST Reg Tax Deducotr List==================================
    public GSTRegistrationList[] GetGSTRegListTD(string str)
    {
        List<GSTRegistrationList> li = new List<GSTRegistrationList>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                GSTRegistrationList BD = new GSTRegistrationList();
                BD.StaffID = ds.Tables[0].Rows[i]["StaffID"].ToString();
                BD.Date = Convert.ToDateTime(ds.Tables[0].Rows[i]["Date"]).ToString("dd-MM-yyyy");
                BD.ReferenceId = ds.Tables[0].Rows[i]["ReferenceId"].ToString();
                BD.ClientID = ds.Tables[0].Rows[i]["ClientID"].ToString();
                BD.PAN_TAN = ds.Tables[0].Rows[i]["PAN_TAN"].ToString();
                BD.Name1 = ds.Tables[0].Rows[i]["Name1"].ToString();
                BD.Name2 = ds.Tables[0].Rows[i]["Name2"].ToString();
                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //======================End Get GST Reg Tax Deducotr List==================================

    //======================Start Get GST Reg Tax Payer Details on Model Box==================================
    public GSTRegistrationList[] GetGSTRegDetailsTP(string str)
    {
        List<GSTRegistrationList> li = new List<GSTRegistrationList>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                GSTRegistrationList BD = new GSTRegistrationList();
                BD.ReferenceId = ds.Tables[0].Rows[i]["ReferenceId"].ToString();
                BD.ClientID = ds.Tables[0].Rows[i]["ClientID"].ToString();
                BD.PAN_TAN = ds.Tables[0].Rows[i]["PAN_TAN"].ToString();

                BD.Date = Convert.ToDateTime(ds.Tables[0].Rows[i]["Date"]).ToString("dd-MM-yyyy");
                BD.Name1 = ds.Tables[0].Rows[i]["Name1"].ToString();
                BD.Name2 = ds.Tables[0].Rows[i]["Name2"].ToString();
                BD.Email = ds.Tables[0].Rows[i]["Email"].ToString();
                BD.MobileNo = ds.Tables[0].Rows[i]["MobileNo"].ToString();
                BD.StateCode = ds.Tables[0].Rows[i]["StateCode"].ToString();
                
                BD.PaymentMode = ds.Tables[0].Rows[i]["PaymentMode"].ToString();                               
                BD.Amount = ds.Tables[0].Rows[i]["Amount"].ToString();
                BD.ChequeNo = ds.Tables[0].Rows[i]["ChequeNo"].ToString();
                BD.Narration = ds.Tables[0].Rows[i]["Narration"].ToString();
                BD.ChequeFileName = FilePath + ds.Tables[0].Rows[i]["ChequeFileName"].ToString();
                
                string duedate = ds.Tables[0].Rows[i]["DueDate"].ToString();
                if (duedate != "")
                {
                    BD.DueDate = Convert.ToDateTime(duedate).ToString("dd-MM-yyyy");
                }
                else
                {
                    BD.DueDate = "";
                }
                
                BD.GSTAppFile = FilePath + ds.Tables[0].Rows[i]["GSTAppFile"].ToString();
                //====Get Photos=====
                BD.ID = ds.Tables[0].Rows[i]["ID"].ToString();
                BD.PhotoName = ds.Tables[0].Rows[i]["PhotoName"].ToString();
                BD.PhotoPath = FilePath + ds.Tables[0].Rows[i]["PhotoPath"].ToString();
                BD.EleOfficeName = ds.Tables[0].Rows[i]["EleOfficeName"].ToString();
                BD.EleOfficePath = FilePath + ds.Tables[0].Rows[i]["EleOfficePath"].ToString();
                BD.PanCardName = ds.Tables[0].Rows[i]["PanCardName"].ToString();
                BD.PanCardPath = FilePath + ds.Tables[0].Rows[i]["PanCardPath"].ToString();
                BD.AadharName = ds.Tables[0].Rows[i]["AadharName"].ToString();
                BD.AadharPath = FilePath + ds.Tables[0].Rows[i]["AadharPath"].ToString();
                BD.ShopAct_NOCName = ds.Tables[0].Rows[i]["ShopAct_NOCName"].ToString();
                BD.ShopAct_NOCPath = FilePath + ds.Tables[0].Rows[i]["ShopAct_NOCPath"].ToString();
                BD.EleHomeName = ds.Tables[0].Rows[i]["EleHomeName"].ToString();
                BD.EleHomePath = FilePath + ds.Tables[0].Rows[i]["EleHomePath"].ToString();
                BD.BankStatementName = ds.Tables[0].Rows[i]["BankStatementName"].ToString();
                BD.BankStatementPath = FilePath + ds.Tables[0].Rows[i]["BankStatementPath"].ToString();
                BD.CancelChequeName = ds.Tables[0].Rows[i]["CancelChequeName"].ToString();
                BD.CancelChequePath = FilePath + ds.Tables[0].Rows[i]["CancelChequePath"].ToString();
                BD.PartnerShipName = ds.Tables[0].Rows[i]["PartnerShipName"].ToString();
                BD.PartnerShipPath = FilePath + ds.Tables[0].Rows[i]["PartnerShipPath"].ToString();
                BD.OtherName = ds.Tables[0].Rows[i]["OtherName"].ToString();
                BD.OtherPath = FilePath + ds.Tables[0].Rows[i]["OtherPath"].ToString();

                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //======================End Get GST Reg Details Tax Payer on Model Box==================================

    //======================Start Get GST Reg Tax Deductor Details on Model Box==================================
    public GSTRegistrationList[] GetGSTRegDetailsTD(string str)
    {
        List<GSTRegistrationList> li = new List<GSTRegistrationList>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                GSTRegistrationList BD = new GSTRegistrationList();
                BD.ReferenceId = ds.Tables[0].Rows[i]["ReferenceId"].ToString();
                BD.ClientID = ds.Tables[0].Rows[i]["ClientID"].ToString();
                BD.PAN_TAN = ds.Tables[0].Rows[i]["PAN_TAN"].ToString();

                BD.Date = Convert.ToDateTime(ds.Tables[0].Rows[i]["Date"]).ToString("dd-MM-yyyy");
                BD.Name1 = ds.Tables[0].Rows[i]["Name1"].ToString();
                BD.Name2 = ds.Tables[0].Rows[i]["Name2"].ToString();
                BD.Email = ds.Tables[0].Rows[i]["Email"].ToString();
                BD.MobileNo = ds.Tables[0].Rows[i]["MobileNo"].ToString();
                BD.StateCode = ds.Tables[0].Rows[i]["StateCode"].ToString();

                BD.PaymentMode = ds.Tables[0].Rows[i]["PaymentMode"].ToString();
                BD.Amount = ds.Tables[0].Rows[i]["Amount"].ToString();
                BD.ChequeNo = ds.Tables[0].Rows[i]["ChequeNo"].ToString();
                BD.Narration = ds.Tables[0].Rows[i]["Narration"].ToString();
                BD.ChequeFileName = FilePath + ds.Tables[0].Rows[i]["ChequeFileName"].ToString();

                string duedate = ds.Tables[0].Rows[i]["DueDate"].ToString();
                if (duedate != "")
                {
                    BD.DueDate = Convert.ToDateTime(duedate).ToString("dd-MM-yyyy");
                }
                else
                {
                    BD.DueDate = "";
                }

                BD.GSTAppFile = FilePath + ds.Tables[0].Rows[i]["GSTAppFile"].ToString();
                //====Get Photos=====
                BD.ID = ds.Tables[0].Rows[i]["ID"].ToString();
                BD.PhotoName = ds.Tables[0].Rows[i]["PhotoName"].ToString();
                BD.PhotoPath = FilePath + ds.Tables[0].Rows[i]["PhotoPath"].ToString();
                BD.EleOfficeName = ds.Tables[0].Rows[i]["EleOfficeName"].ToString();
                BD.EleOfficePath = FilePath + ds.Tables[0].Rows[i]["EleOfficePath"].ToString();
                BD.PanCardName = ds.Tables[0].Rows[i]["PanCardName"].ToString();
                BD.PanCardPath = FilePath + ds.Tables[0].Rows[i]["PanCardPath"].ToString();
                BD.AadharName = ds.Tables[0].Rows[i]["AadharName"].ToString();
                BD.AadharPath = FilePath + ds.Tables[0].Rows[i]["AadharPath"].ToString();
                BD.ShopAct_NOCName = ds.Tables[0].Rows[i]["ShopAct_NOCName"].ToString();
                BD.ShopAct_NOCPath = FilePath + ds.Tables[0].Rows[i]["ShopAct_NOCPath"].ToString();
                BD.EleHomeName = ds.Tables[0].Rows[i]["EleHomeName"].ToString();
                BD.EleHomePath = FilePath + ds.Tables[0].Rows[i]["EleHomePath"].ToString();
                BD.BankStatementName = ds.Tables[0].Rows[i]["BankStatementName"].ToString();
                BD.BankStatementPath = FilePath + ds.Tables[0].Rows[i]["BankStatementPath"].ToString();
                BD.CancelChequeName = ds.Tables[0].Rows[i]["CancelChequeName"].ToString();
                BD.CancelChequePath = FilePath + ds.Tables[0].Rows[i]["CancelChequePath"].ToString();
                BD.PartnerShipName = ds.Tables[0].Rows[i]["PartnerShipName"].ToString();
                BD.PartnerShipPath = FilePath + ds.Tables[0].Rows[i]["PartnerShipPath"].ToString();
                BD.OtherName = ds.Tables[0].Rows[i]["OtherName"].ToString();
                BD.OtherPath = FilePath + ds.Tables[0].Rows[i]["OtherPath"].ToString();

                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //======================End Get GST Reg Details Tax Deductor on Model Box==================================

    //======================Start Get GST Reg Tax Deductor Contact Person Details on Model Box==================================
    public GSTRegistrationList[] GetGSTRegDetailsTDPerson(string str)
    {
        List<GSTRegistrationList> li = new List<GSTRegistrationList>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                GSTRegistrationList BD = new GSTRegistrationList();
                BD.PersonID = ds.Tables[0].Rows[i]["PersonID"].ToString();
                BD.PersoneName = ds.Tables[0].Rows[i]["PersoneName"].ToString();
                BD.PersonMobileNo = ds.Tables[0].Rows[i]["MobileNo"].ToString();

                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //======================End Get GST Reg Details Tax Deductor Contact Person on Model Box==================================

    //======================Start Get TDS Files==================================
    public TDSList[] GetTDSFile(string str)
    {
        List<TDSList> li = new List<TDSList>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                TDSList BD = new TDSList();
                BD.Date = Convert.ToDateTime(ds.Tables[0].Rows[i]["Date"]).ToString("dd-MM-yyyy");
                BD.FileTransactionID = ds.Tables[0].Rows[i]["FileTransactionID"].ToString();
                BD.ClientID = ds.Tables[0].Rows[i]["ClientID"].ToString();
                BD.OfficeName = ds.Tables[0].Rows[i]["OfficeName"].ToString();
                BD.AuthorisedPersone = ds.Tables[0].Rows[i]["AuthorisedPersone"].ToString();
                BD.StaffID = ds.Tables[0].Rows[i]["StaffID"].ToString();
                li.Add(BD);
            }
        }
        return li.ToArray();
    }

    public TDSList[] GetTDSFileHO(string str)
    {
        List<TDSList> li = new List<TDSList>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                TDSList BD = new TDSList();
                BD.FranchiseeID = ds.Tables[0].Rows[i]["FranchiseeID"].ToString();
                BD.StaffID = ds.Tables[0].Rows[i]["StaffID"].ToString();
                BD.Date = Convert.ToDateTime(ds.Tables[0].Rows[i]["Date"]).ToString("dd-MM-yyyy");
                BD.FileTransactionID = ds.Tables[0].Rows[i]["FileTransactionID"].ToString();
                BD.ClientID = ds.Tables[0].Rows[i]["ClientID"].ToString();
                BD.OfficeName = ds.Tables[0].Rows[i]["OfficeName"].ToString();
                BD.AuthorisedPersone = ds.Tables[0].Rows[i]["AuthorisedPersone"].ToString();
                BD.MobileNo = ds.Tables[0].Rows[i]["MobileNo"].ToString();
                BD.FileStatus = ds.Tables[0].Rows[i]["FileStatus"].ToString();
                BD.AssignedTo = ds.Tables[0].Rows[i]["EmpName"].ToString();
                string AssignDate = ds.Tables[0].Rows[i]["AssignedDate"].ToString();
                string Verifydate = ds.Tables[0].Rows[i]["VerifiedDate"].ToString();
                string Completedate = ds.Tables[0].Rows[i]["CompletedDate"].ToString();
                if (AssignDate != "")
                {
                    BD.AssignedDate = Convert.ToDateTime(AssignDate).ToString("dd-MM-yyyy");
                }
                else
                {
                    BD.AssignedDate = "";
                }


                if (Verifydate != "")
                {
                    BD.VerifiedDate = Convert.ToDateTime(Verifydate).ToString("dd-MM-yyyy");
                }
                else
                {
                    BD.VerifiedDate = "";
                }
                if (Completedate != "")
                {
                    BD.CompletedDate = Convert.ToDateTime(Completedate).ToString("dd-MM-yyyy");
                }
                else
                {
                    BD.CompletedDate = "";
                }
                li.Add(BD); 
            }
        }
        return li.ToArray();
    }
    //======================End Get TDS Files==================================

    //======================Start Get TDS File Details on Model Box==================================
    public TDSList[] GetTDSFileDetails(string str)
    {
        List<TDSList> li = new List<TDSList>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                TDSList BD = new TDSList();
                BD.FileTransactionID = ds.Tables[0].Rows[i]["FileTransactionID"].ToString();
                BD.ClientID = ds.Tables[0].Rows[i]["ClientID"].ToString();               
                BD.TANNumber = ds.Tables[0].Rows[i]["TANNumber"].ToString();
                BD.OfficeName = ds.Tables[0].Rows[i]["OfficeName"].ToString();
                BD.Date = Convert.ToDateTime(ds.Tables[0].Rows[i]["Date"]).ToString("dd-MM-yyyy");
                BD.AuthorisedPersone = ds.Tables[0].Rows[i]["AuthorisedPersone"].ToString();

                BD.OfficeEmail = ds.Tables[0].Rows[i]["OfficeEmail"].ToString();
                BD.StateName = ds.Tables[0].Rows[i]["StateName"].ToString();
                BD.TypesOfReturn = ds.Tables[0].Rows[i]["TypesOfReturn"].ToString();
                BD.QuarterlyReturn = ds.Tables[0].Rows[i]["QuarterlyReturn"].ToString();
               
                
                BD.PaymentMode = ds.Tables[0].Rows[i]["PaymentMode"].ToString();
                BD.Amount = ds.Tables[0].Rows[i]["Amount"].ToString();                

                BD.ChequeNo = ds.Tables[0].Rows[i]["ChequeNo"].ToString();
                BD.Narration = ds.Tables[0].Rows[i]["Narration"].ToString();
                BD.ChequeFileName = FilePath + ds.Tables[0].Rows[i]["ChequeFileName"].ToString();

                string duedate = ds.Tables[0].Rows[i]["DueDate"].ToString();
                if (duedate != "")
                {
                    BD.DueDate = Convert.ToDateTime(duedate).ToString("dd-MM-yyyy");
                }
                else
                {
                    BD.DueDate = "";
                }

                BD.PersonId = ds.Tables[0].Rows[i]["PersonId"].ToString();
                BD.ContactPersoneID = ds.Tables[0].Rows[i]["PersonID1"].ToString();
                BD.PersoneName = ds.Tables[0].Rows[i]["PersoneName"].ToString();
                BD.MobileNo = ds.Tables[0].Rows[i]["MobileNo"].ToString();

               
                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //======================End Get TDS File Details on Model Box==================================

    //======================Start Get TDS File Documents on Model Box==================================
    public TDSList[] GetTDSFileDocuments(string str)
    {
        List<TDSList> li = new List<TDSList>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                TDSList BD = new TDSList();
                BD.DocumentID = ds.Tables[0].Rows[i]["DocumentID"].ToString();
                BD.DocumentName = ds.Tables[0].Rows[i]["DocumentName"].ToString();
                BD.DocumentPath = FilePath + ds.Tables[0].Rows[i]["DocumentPath"].ToString();
                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //======================End Get TDS File Documents on Model Box==================================

    //======================Start Get IT IFSC==================================
    public ITFiles[] GetITIFSCCode(string str)
    {
        List<ITFiles> li = new List<ITFiles>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                ITFiles BD = new ITFiles();
                BD.IFSC = ds.Tables[0].Rows[i]["IFSC"].ToString();
                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //======================End Get IT IFSC==================================

    //======================Start Get Contact Person Mobile No==================================
    public TDSList[] GetTDSMobile(string str)
    {
        List<TDSList> li = new List<TDSList>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                TDSList BD = new TDSList();
                BD.MobileNo = ds.Tables[0].Rows[i]["MobileNo"].ToString();
                li.Add(BD);
            }
        }
        return li.ToArray();
    }
    //======================End Get Contact Person Mobile No==================================


   
    //------------------------------Start Show Employee Detail-------------------------
    public EmployeeData[] EmployeeDetail(string str)
    {
        List<EmployeeData> li = new List<EmployeeData>();
        DataSet ds = da.fillDataset(str);
        if (ds.Tables[0].Rows.Count > 0)
            if (ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    EmployeeData EmpD = new EmployeeData();
                    EmpD.Emp_Id = ds.Tables[0].Rows[i]["EmpId"].ToString();
                    EmpD.Emp_Name = ds.Tables[0].Rows[i]["EmpName"].ToString();
                    EmpD.Joining_Date = Convert.ToDateTime(ds.Tables[0].Rows[i]["JoiningDate"]).ToString("dd-MM-yyyy");
                    EmpD.DOB = Convert.ToDateTime(ds.Tables[0].Rows[i]["DOB"]).ToString("dd-MM-yyyy");
                    EmpD.Mobile_No = ds.Tables[0].Rows[i]["MobileNo"].ToString();
                    EmpD.Email_Id = ds.Tables[0].Rows[i]["EmailId"].ToString();
                    EmpD.Address = ds.Tables[0].Rows[i]["Address"].ToString();
                    EmpD.CityId = ds.Tables[0].Rows[i]["CityId"].ToString();
                    EmpD.CityName = ds.Tables[0].Rows[i]["DistrictName"].ToString();
                    EmpD.StateId = ds.Tables[0].Rows[i]["StateCode"].ToString();
                    EmpD.StateName = ds.Tables[0].Rows[i]["StateName"].ToString();
                    EmpD.Pincode = ds.Tables[0].Rows[i]["Pincode"].ToString();
                    EmpD.AddressProof = FilePath + ds.Tables[0].Rows[i]["AddressProofDoc"].ToString();
                    EmpD.Designation = ds.Tables[0].Rows[i]["Designation"].ToString();
                    EmpD.Status = ds.Tables[0].Rows[i]["Status"].ToString();
                    EmpD.Password = ds.Tables[0].Rows[i]["Password"].ToString(); 

                    li.Add(EmpD);
                }
            }
        return li.ToArray();
    }
    //------------------------------End Show Employee  Detail-------------------------


}