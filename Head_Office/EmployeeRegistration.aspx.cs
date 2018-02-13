using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using System.Text.RegularExpressions;
using MySql.Data.MySqlClient;
using System.Data;

public partial class Head_Office_EmployeeRegistration : System.Web.UI.Page
{
    static DataAccess da = new DataAccess();
    static ImageUpload IU = new ImageUpload();
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    //-------------------------------Start Bind City Dropdown--------------------------
    [WebMethod]
    public static StateCity[] BindCityDrpDown(string StateCode)
    {
        HeadOfficeController Contrl = new HeadOfficeController();
        string str = " Select * from district_master where Status='Active' and StateCode='" + StateCode + "'";
        StateCity[] ObjCM = Contrl.GetCities(str);
        return ObjCM;
    }
    //-------------------------------End Bind City Dropdown--------------------------

    //-----------------------Start Save Employee data--------------------------------------
    [WebMethod]
    public static string SaveEmployeeData(string EmpId, string JoiningDate, string EmpName, string DOB, string MobileNo, string EmailId, string PhotoSource, string PhotoName, string Designation, string Address, string CityId, string PinCode, string Status)
    {
        bool b = false;
        bool c=false;
        string str = "";
        string AddressProofNewName = "";
        try
        {
        if (DOB != "")
        {
            string[] dt = Regex.Split(DOB, "-");
            int d = Convert.ToInt32(dt[0]);
            int m = Convert.ToInt32(dt[1]);
            int y = Convert.ToInt32(dt[2]);
            DateTime Birthdate = new DateTime(y, m, d);
            DOB=Convert.ToDateTime(Birthdate).ToString("yyyy-MM-dd");
        }
        else
        {
            DOB = "";
        }

        if (JoiningDate != "")
        {
            string[] dt = Regex.Split(JoiningDate, "-");
            int d = Convert.ToInt32(dt[0]);
            int m = Convert.ToInt32(dt[1]);
            int y = Convert.ToInt32(dt[2]);
            DateTime join = new DateTime(y, m, d);
            JoiningDate = Convert.ToDateTime(join).ToString("yyyy-MM-dd");
        }
        else
        {
            JoiningDate = "";
        }

        if (PhotoSource != "" && PhotoName != ""){string NewphotoName = EmpId + "_" + Regex.Split(EmpName, " ")[0] + "_AddressProof";AddressProofNewName = IU.changePhotoName(PhotoName, NewphotoName);}

            str+="Insert into employeemaster(EmpId,EmpName,JoiningDate,DOB,MobileNo,EmailId,Address,CityId,Pincode,";
            str += "AddressProofDoc,Designation,Status)values(@EmpId,@EmpName,@JoiningDate,@DOB,@MobileNo,@EmailId,@Address,";
            str += "@CityId,@Pincode,@AddressProofDoc,@Designation,@Status)";

        MySqlCommand cmd = new MySqlCommand(str);
        cmd.Parameters.Add("@EmpId", MySqlDbType.VarChar).Value = EmpId;
        cmd.Parameters.Add("@EmpName", MySqlDbType.VarChar).Value = EmpName;
        cmd.Parameters.Add("@JoiningDate", MySqlDbType.Date).Value = JoiningDate;
        cmd.Parameters.Add("@DOB", MySqlDbType.VarChar).Value = DOB;
        cmd.Parameters.Add("@MobileNo", MySqlDbType.VarChar).Value = MobileNo;
        cmd.Parameters.Add("@EmailId", MySqlDbType.VarChar).Value = EmailId;
        cmd.Parameters.Add("@Address", MySqlDbType.VarChar).Value = System.Uri.UnescapeDataString(Address); ;
        cmd.Parameters.Add("@CityId", MySqlDbType.VarChar).Value = CityId;
        cmd.Parameters.Add("@Pincode", MySqlDbType.VarChar).Value = PinCode;
        cmd.Parameters.Add("@AddressProofDoc", MySqlDbType.VarChar).Value = AddressProofNewName;
        cmd.Parameters.Add("@Designation", MySqlDbType.VarChar).Value = Designation;
        cmd.Parameters.Add("@Status", MySqlDbType.VarChar).Value = Status;
            
            b = da.InsertUpdateData(cmd);
                
        }
        catch (Exception ex)
        {

        }

        if (b)
        {
            if (PhotoSource != "" && PhotoName != "")
            {
                c = IU.UploadFile(PhotoSource, AddressProofNewName);
            }



            return EmpId;
        }
        else
        {
            return "Record Not Added ..?";
        }
            
    }

    //----------------------------End Save Employee data-------------------------------------


    //-----------------------Start Update Employee data--------------------------------------
    [WebMethod]
    public static string UpdateEmployeeData(string EmpId, string JoiningDate, string EmpName, string DOB, string MobileNo, string EmailId, string PhotoSource, string PhotoName, string ExistingImage, string Designation, string Address, string CityId, string PinCode)
    {
        bool b = false;
        bool c = false;
        string str = "";
        string AddressProofNewName = "";
        try
        {
            if (DOB != "")
            {
                string[] dt = Regex.Split(DOB, "-");
                int d = Convert.ToInt32(dt[0]);
                int m = Convert.ToInt32(dt[1]);
                int y = Convert.ToInt32(dt[2]);
                DateTime Birthdate = new DateTime(y, m, d);
                DOB = Convert.ToDateTime(Birthdate).ToString("yyyy-MM-dd");
            }
            else
            {
                DOB = "";
            }

            if (PhotoSource != "" && PhotoName != "") { string NewphotoName = EmpId + "_" + Regex.Split(EmpName, " ")[0] + "_AddressProof"; AddressProofNewName = IU.changePhotoName(PhotoName, NewphotoName); }
            else { AddressProofNewName =Regex.Split(ExistingImage,"/")[2]; }


            str += "update employeemaster set EmpName=@EmpName,DOB=@DOB,MobileNo=@MobileNo,EmailId=@EmailId,Address=@Address,";
            str += "CityId=@CityId,Pincode=@Pincode,AddressProofDoc=@AddressProofDoc,Designation=@Designation ";
            str += "where EmpId=@EmpId";

            MySqlCommand cmd = new MySqlCommand(str);
            cmd.Parameters.Add("@EmpId", MySqlDbType.VarChar).Value = EmpId;
            cmd.Parameters.Add("@EmpName", MySqlDbType.VarChar).Value = EmpName;
            cmd.Parameters.Add("@DOB", MySqlDbType.VarChar).Value = DOB;
            cmd.Parameters.Add("@MobileNo", MySqlDbType.VarChar).Value = MobileNo;
            cmd.Parameters.Add("@EmailId", MySqlDbType.VarChar).Value = EmailId;
            cmd.Parameters.Add("@Address", MySqlDbType.VarChar).Value = System.Uri.UnescapeDataString(Address); ;
            cmd.Parameters.Add("@CityId", MySqlDbType.VarChar).Value = CityId;
            cmd.Parameters.Add("@Pincode", MySqlDbType.VarChar).Value = PinCode;
            cmd.Parameters.Add("@AddressProofDoc", MySqlDbType.VarChar).Value = AddressProofNewName;
            cmd.Parameters.Add("@Designation", MySqlDbType.VarChar).Value = Designation;
            
            b = da.InsertUpdateData(cmd);

        }
        catch (Exception ex)
        {

        }

        if (b)
        {
            if (PhotoSource != "" && PhotoName != "")
            {

                string filePath = HttpContext.Current.Server.MapPath(ExistingImage);
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
                c = IU.UploadFile(PhotoSource, AddressProofNewName);
            }
            return EmpId;
        }
        else
        {
            return "Record Not Added ..?";
        }

    }

    //----------------------------End Update Employee data-------------------------------------



    //---------------------------------------Start Show Employee Detail In Table-----------------------------------
    [WebMethod]
    public static EmployeeData[] ShowEmployeeData()
    {
        HeadOfficeController EmpContrl = new HeadOfficeController();
        string str = " ";
        str += " SELECT EM.*,DM.DistrictName,SM.StateName,SM.StateCode FROM employeemaster EM LEFT JOIN district_master DM ON EM.CityId=DM.DistrictId LEFT JOIN state_master SM ON DM.StateCode=SM.StateCode";
        EmployeeData[] ObjESRD = EmpContrl.EmployeeDetail(str);
        return ObjESRD;
    }
    //---------------------------------------End Show  Show Detail In Table-----------------------------------


    //-------------------------------Start Active Status---------------------------------------------
    [WebMethod]
    public static string ActiveStatus(string Emp_Id)
    {
        string password = "";

        string str2 = "Select Password from employeemaster where EmpId='" + Emp_Id + "'";
        string Pass = da.getString(str2);
        if (Pass == "")
        {
            password = da.generatepassword(6);
        }
        else
        {
            password = Pass;
        }

        string str = "Update employeemaster Set Status='Active', Password='" + password + "' where EmpId='" + Emp_Id + "' ";
        bool b = da.insertUpdate(str);
        if (b)
        {
            string str1 = "Select EmpName,EmailId from employeemaster where EmpId='" + Emp_Id + "'";
            DataSet ds = da.fillDataset(str1);
            string EmpName = ds.Tables[0].Rows[0]["EmpName"].ToString();
            string Email = ds.Tables[0].Rows[0]["EmailId"].ToString();
            da.SendMail(Emp_Id, EmpName, password, Email, "Password_Recovery");


            return "Active Successfully..!";
        }
        else
        {
            return "Not Active..?";
        }
    }
    //-----------------------------------------------End Active Status------------------------------------------

    //-------------------------------------Start InActive Status-----------------------------------------------
    [WebMethod]
    public static string INActiveStatus(string Emp_Id)
    {
        string str = "Update employeemaster Set Status='InActive' where EmpId='" + Emp_Id + "' ";
        bool b = da.insertUpdate(str);
        if (b)
        {
            return "InActive Successfully..!";
        }
        else
        {
            return "Not InActive..?";
        }

    }
    //-----------------------------------End InActive Status-----------------------------------



    //-------------------------------------------Start Delete Country ---------------------------------------------
    [WebMethod]
    public static string DeleteData(string Emp_Id)
    {
        bool b = false;
        try
        {
            string str = " update employeemaster set Status='Removed' where EmpId='" + Emp_Id + "' ";
            b = da.insertUpdate(str);
        }
        catch (Exception ex)
        {

        }
        if (b)
        {
            return "Record Removed Successfully...!";
        }
        else
        {
            return "Record Not Removed..?";

        }
    }
    //-----------------------------------------End Delete Country --------------------------------------------------




}