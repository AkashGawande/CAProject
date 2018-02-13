using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using MySql.Data.MySqlClient;
using System.Web.Services;
using Newtonsoft.Json;
public partial class FranchiseeRegistration : System.Web.UI.Page
{
    static DataAccess da = new DataAccess();
    static ImageUpload IU = new ImageUpload();
    static string Franchisee_Id="";
    static string NewName = "";
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    //============================================Start Bind State ============================================
    [WebMethod]
    public static FranchiseeDetails[] BindStateDropDown()
    {
        FranchiseeController Contrl = new FranchiseeController();
        string str = "";
        str += " Select StateCode,StateName from state_master where CountryCode='IN' AND Status='Active'";
        FranchiseeDetails[] BCDP = Contrl.GetStateDetails(str);
        return BCDP.ToArray();
    }

    //============================================End Bind State============================================


    //============================================Start Bind City Dropdown============================================
    [WebMethod]
    public static FranchiseeDetails[] BindDistrictDrpDown(string State_Code)
    {
        FranchiseeController Contrl = new FranchiseeController();
        string str = " Select DistrictId,DistrictName from district_master where Status='Active' and StateCode='" + State_Code + "'";
        FranchiseeDetails[] ObjCM = Contrl.GetDistrictDetails(str);
        return ObjCM;
    }
    //============================================End Bind City Dropdown============================================

    //------------------------------Start Save Master Data---------------------------------------------
    [WebMethod]
    public static string SaveFranchiseeData(string OwnerName, string FirmName, string FirmLicenseName, string FirmLicenseSource, string PANCard, string FatherName, string FirstLine, string SecondLine, string LandMark, string City, string DistrictId, string Pincode, string MobileNo, string EmailId, string Qualification, string Currentprofession, string Status)
    {
        bool b = false;
        bool c = false;
        try
        {
            Franchisee_Id = PANCard;
            if (FirmLicenseName != "" && FirmLicenseSource != "")
            {
                string License =  FirmName.Replace(" ", "_");
                //--------------Start Photo Name Changing Section---------------------
                NewName = IU.changePhotoName(FirmLicenseName, PANCard);
                //--------------End Photo Name Changing Section---------------------
            }

            string str = "insert into franchiseemaster(FranchiseeID,EnquiryDate,OwnerName,FirmName,FirmLicense,PANNumber,FatherName,FirstLine,SecondLine,Landmark,City,DistrictID,Pincode,MobileNo,EmailId,Qualification,CurrentProfession,Status) values(@FranchiseeID,@EnquiryDate,@OwnerName,@FirmName,@FirmLicense,@PANNumber,@FatherName,@FirstLine,@SecondLine,@Landmark,@City,@DistrictID,@Pincode,@MobileNo,@EmailId,@Qualification,@CurrentProfession,@Status)";

            MySqlCommand cmd = new MySqlCommand(str);
            cmd.Parameters.Add("@FranchiseeID", MySqlDbType.VarChar).Value = PANCard;
            cmd.Parameters.Add("@EnquiryDate", MySqlDbType.Date).Value = Convert.ToDateTime(DateTime.Now).ToString("yyyy-MM-dd");
            cmd.Parameters.Add("@OwnerName", MySqlDbType.VarChar).Value = OwnerName;
            cmd.Parameters.Add("@FirmName", MySqlDbType.VarChar).Value = FirmName;
            cmd.Parameters.Add("@FirmLicense", MySqlDbType.VarChar).Value = NewName;
            cmd.Parameters.Add("@PANNumber", MySqlDbType.VarChar).Value = PANCard;
            cmd.Parameters.Add("@FatherName", MySqlDbType.VarChar).Value = FatherName;
            cmd.Parameters.Add("@FirstLine", MySqlDbType.VarChar).Value = System.Uri.UnescapeDataString(FirstLine);
            cmd.Parameters.Add("@SecondLine", MySqlDbType.VarChar).Value = System.Uri.UnescapeDataString(SecondLine);
            cmd.Parameters.Add("@Landmark", MySqlDbType.VarChar).Value = System.Uri.UnescapeDataString(LandMark);
            cmd.Parameters.Add("@City", MySqlDbType.VarChar).Value = City;
            cmd.Parameters.Add("@DistrictID", MySqlDbType.VarChar).Value = DistrictId;
            cmd.Parameters.Add("@Pincode", MySqlDbType.VarChar).Value = Pincode;
            cmd.Parameters.Add("@MobileNo", MySqlDbType.VarChar).Value = MobileNo;
            cmd.Parameters.Add("@EmailId", MySqlDbType.VarChar).Value = EmailId;
            cmd.Parameters.Add("@Qualification", MySqlDbType.VarChar).Value = Qualification;
            cmd.Parameters.Add("@CurrentProfession", MySqlDbType.VarChar).Value = Currentprofession;
            cmd.Parameters.Add("@Status", MySqlDbType.VarChar).Value = Status;
            
            b = da.InsertUpdateData(cmd);

            if (FirmLicenseName != "" && FirmLicenseSource != "")
            {
                //--------------Start Photo Uploading Section---------------------
                c = IU.UploadFile(FirmLicenseSource, NewName);
                //--------------End Photo Uploading Section---------------------  

            }
        }
        catch (Exception ex)
        {

        }

        if (b)
            //return "Record Added SuccessFully..!";
            return Franchisee_Id;
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Save Master Data---------------------------------------------

    //------------------------------Start Save Member Data---------------------------------------------    
    [WebMethod]
    public static string SaveStaffMemberData(string AllMemberData)
    {        
        bool b = false;
        string Staff_Id = "";
        int i = 1;
        try
        {
            var serializeData = JsonConvert.DeserializeObject<List<StaffMember>>(AllMemberData);
            foreach (var data in serializeData)
            {
                Staff_Id = data.Franchisee_Id + "-"+i;
                string str = "insert into franchiseestaffdetails(FranchiseeID, StaffID,MemberName,JoiningDate, Status)values(@FranchiseeID, @StaffID,@MemberName,@JoiningDate, @Status)";
                MySqlCommand cmd = new MySqlCommand(str);
                cmd.Parameters.Add("@FranchiseeID", MySqlDbType.VarChar).Value = data.Franchisee_Id;
                cmd.Parameters.Add("@StaffID", MySqlDbType.VarChar).Value = Staff_Id;
                cmd.Parameters.Add("@MemberName", MySqlDbType.VarChar).Value = data.Staff_Member_Name;
                cmd.Parameters.Add("@JoiningDate", MySqlDbType.VarChar).Value = Convert.ToDateTime(DateTime.Now).ToString("yyyy-MM-dd");
                cmd.Parameters.Add("@Status", MySqlDbType.VarChar).Value = data.Status;
                b = da.InsertUpdateData(cmd);
                i++;
            }

        }
        catch (Exception ex)
        {

        }

        if (b)
            //return "Record Added SuccessFully..!";
            return Franchisee_Id;
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Save Member Data---------------------------------------------   

}

public class StaffMember
{

    public string Franchisee_Id { get; set; }
    public string Staff_Member_Name { get; set; }
    public string Status { get; set; }
       



}