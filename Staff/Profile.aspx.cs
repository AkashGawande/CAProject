using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using MySql.Data.MySqlClient;
using System.Data;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
public partial class Staff_Profile : System.Web.UI.Page
{
    MySqlConnection con = new MySqlConnection(DataAccess.getConnection());
    MySqlCommand cmd = new MySqlCommand();
    MySqlDataReader dr;
   

    static DataAccess da = new DataAccess();
    static ImageUpload IU = new ImageUpload();
    //static string Franchisee_Id="BIPPG0355Q";
    static string Franchisee_Id = "";
    static string Staff_Id = "";
    static string Role = "";
    static string Client_Id = "";
    static int i = 0;
   
    protected void Page_Load(object sender, EventArgs e)
    {

        try
        {
            if (HttpContext.Current.Session["FranchiseeID"] == null)
            {
                Response.Redirect("../Login.aspx");

            }
            else
            {
                Franchisee_Id = HttpContext.Current.Session["FranchiseeID"].ToString();
                Staff_Id = HttpContext.Current.Session["StaffID"].ToString();
                Role = HttpContext.Current.Session["Role"].ToString();

                if(Staff_Id!="")
                {
                    string str = "Select Address,DOB,MobileNo,Email,Gender,JoiningDate,UserPhoto,StaffPassword from franchiseestaffdetails where StaffID='" + HttpContext.Current.Session["StaffID"].ToString() + "' And FranchiseeID='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "'";
                    MySqlCommand cmd1 = new MySqlCommand(str);
                    cmd1.CommandType = CommandType.Text;
                    cmd1.Connection = con;

                    if (con.State == ConnectionState.Closed)
                    {
                        con.Open();
                    }
                    dr = cmd1.ExecuteReader();
                    if (dr.HasRows)
                    {
                        while (dr.Read())
                        {
                            UserName.InnerText = Session["MemberName"].ToString();
                            lblPassword.InnerText = Session["Password"].ToString();
                            lblempId.InnerText = Session["StaffID"].ToString();
                            lblusername.InnerText = Session["MemberName"].ToString();
                            lblAddress.InnerText = dr["Address"].ToString();
                            lblEmailId.InnerText = dr["Email"].ToString();

                            if(dr["DOB"].ToString()!="")
                            {
                                lbldob.InnerText = Convert.ToDateTime(dr["DOB"]).ToString("dd-MM-yyyy");
                            }
                            else
                            {
                                lbldob.InnerText = "";
                            }

                            lblmobileNo.InnerText = dr["MobileNo"].ToString();
                            lblGender.InnerText = dr["Gender"].ToString();

                            if (dr["JoiningDate"].ToString() != "")
                            {
                                lbljoiningDate.InnerText = Convert.ToDateTime(dr["JoiningDate"]).ToString("dd-MM-yyyy");
                            }
                            else
                            {
                                lbljoiningDate.InnerText = "";
                            }
                            if(dr["UserPhoto"].ToString()!="")
                            {
                                avatar2.Src = "../ProfilePhoto/" + dr["UserPhoto"].ToString();
                            }
                            else
                            {
                                avatar2.Src = "../ProfilePhoto/profile-pic.jpg";
                            }
                           

                        }
                    }
                    dr.Close();
                    con.Close();
                    //}
                }


               
            }
        }
        catch (Exception ex)
        {
            Response.Redirect("../Login.aspx");

        }
    }


    public string GetSessionValue()
    {
        return Staff_Id;
    }

    public void ChangeSessionPhotoValue(string PhotoName)
    {
        Session["Photo"] = PhotoName;
    }

    public void ChangeSessionNameValue(string MemberName)
    {
        Session["MemberName"] = MemberName;
    }

    //------------------------------Start Change User Photo Data---------------------------------------------
    [WebMethod]
    public static string ChangeUserPhoto(string StaffID, string UserPhotoSource, string UserPhotoName, string ExistingImgSrc)
    {

        Staff_Profile cr = new Staff_Profile();
        
        bool b = false,c=false;
        string str = "";
        string NewPhotoImageName="";
        try
        {
            

            if (UserPhotoSource != "" && UserPhotoName != "")
            {
                string photoName = StaffID + "_ProfilePhoto";
                //--------------Start Photo Name Changing Section---------------------
                NewPhotoImageName = IU.changePhotoName(UserPhotoName, photoName);
                //--------------End Photo Name Changing Section---------------------


                str += "Update franchiseestaffdetails set UserPhoto=@UserPhoto where StaffID=@StaffId and FranchiseeID=@FranchiseeID ";
               

                MySqlCommand cmd = new MySqlCommand(str);
                cmd.Parameters.Add("@FranchiseeID", MySqlDbType.VarChar).Value = HttpContext.Current.Session["FranchiseeID"].ToString();
                cmd.Parameters.Add("@StaffID", MySqlDbType.VarChar).Value = HttpContext.Current.Session["StaffID"].ToString();
                cmd.Parameters.Add("@UserPhoto", MySqlDbType.VarChar).Value = NewPhotoImageName;

                string sessionvalue = cr.GetSessionValue();

                if (sessionvalue != ""&& StaffID==Staff_Id)
                {
                    b = da.InsertUpdateData(cmd);

                }



            }
        }
        catch (Exception ex)
        {

        }

        if (b)
        {
            string filePath = HttpContext.Current.Server.MapPath(ExistingImgSrc);
            if (System.IO.File.Exists(filePath) && ExistingImgSrc != "../ProfilePhoto/profile-pic.jpg")
            {
                System.IO.File.Delete(filePath);
            }

            //--------------Start Photo Uploading Section---------------------
            c = IU.UserPhoto(UserPhotoSource, NewPhotoImageName);
            //--------------End Photo Uploading Section--------------------- 
           if(c)
           {
               cr.ChangeSessionPhotoValue(NewPhotoImageName);//"~/ProfilePhoto/" + photoName
               
           }

            return StaffID;
        }
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Change User Photo Data---------------------------------------------


    //------------------------------Start Update Employee Data---------------------------------------------
    [WebMethod]
    public static string UpdateProfile(string StaffID, string Name, string Address, string DOB, string Mobile_No,string EmailId, string Gender)
    {

        Staff_Profile cr = new Staff_Profile();

        bool b = false;
        string str = "";
        
        try
        {
            string[] dt = Regex.Split(DOB, "-");
            int d = Convert.ToInt32(dt[0]);
            int m = Convert.ToInt32(dt[1]);
            int y = Convert.ToInt32(dt[2]);
            DateTime Birthdate = new DateTime(y, m, d);
            str += "Update franchiseestaffdetails set MemberName=@MemberName,Address=@Address,DOB=@DOB,MobileNo=@MobileNo,Email=@Email,Gender=@Gender where StaffID=@StaffId and FranchiseeID=@FranchiseeID ";


            MySqlCommand cmd = new MySqlCommand(str);
            cmd.Parameters.Add("@FranchiseeID", MySqlDbType.VarChar).Value = HttpContext.Current.Session["FranchiseeID"].ToString();
            cmd.Parameters.Add("@StaffID", MySqlDbType.VarChar).Value = HttpContext.Current.Session["StaffID"].ToString();
            cmd.Parameters.Add("@MemberName", MySqlDbType.VarChar).Value = Name;
            cmd.Parameters.Add("@Address", MySqlDbType.VarChar).Value = System.Uri.UnescapeDataString(Address);
            cmd.Parameters.Add("@DOB", MySqlDbType.Date).Value = Convert.ToDateTime(Birthdate).ToString("yyyy-MM-dd");
            cmd.Parameters.Add("@MobileNo", MySqlDbType.VarChar).Value = Mobile_No;
            cmd.Parameters.Add("@Email", MySqlDbType.VarChar).Value = EmailId;
            cmd.Parameters.Add("@Gender", MySqlDbType.VarChar).Value = Gender;

            string sessionvalue = cr.GetSessionValue();

            if (sessionvalue != "" && StaffID == Staff_Id)
            {
                b = da.InsertUpdateData(cmd);

            }
        }
        catch (Exception ex)
        {

        }

        if (b)
        {
            cr.ChangeSessionNameValue(Name);
            return StaffID;
        }
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Update Employee Data---------------------------------------------





}