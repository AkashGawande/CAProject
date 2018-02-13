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
using System.IO;
public partial class Staff_Profile : System.Web.UI.Page
{
    MySqlConnection con = new MySqlConnection(DataAccess.getConnection());
    MySqlCommand cmd = new MySqlCommand();
    MySqlDataReader dr;
   

    static DataAccess da = new DataAccess();
    static ImageUpload IU = new ImageUpload();

    static string Client_Id = "";    
    static string FileTransaction_ID = "";
    static string Franchisee_Id = "";
   
    protected void Page_Load(object sender, EventArgs e)
    {

        try
        {
            if (HttpContext.Current.Session["FranchiseeID"].ToString() == null)
            {
                Response.Redirect("../Login.aspx");

            }
            else
            {
                //Franchisee_Id = HttpContext.Current.Session["FranchiseeID"].ToString();

                if (HttpContext.Current.Session["FranchiseeID"].ToString() != "")
                {
                    string str = "Select OwnerName,FirmName,FirmLicense,RegDate,MobileNo,EmailId,FirstLine,SecondLine,Landmark,City,Pincode from franchiseemaster where FranchiseeID='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "'";
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
                            firmName.InnerText = dr["FirmName"].ToString();
                            lblOwnerName.InnerText = HttpContext.Current.Session["OwnerName"].ToString();
                            lblPassword.InnerText = HttpContext.Current.Session["Password"].ToString();
                            lblFranchiseeId.InnerText = HttpContext.Current.Session["FranchiseeID"].ToString();
                            lblFirmName.InnerText = dr["FirmName"].ToString();
                            //lblAddress.InnerText = dr["Address"].ToString();
                            lblmobileNo.InnerText = dr["MobileNo"].ToString();
                            lblRegistrationDate.InnerText = dr["RegDate"].ToString();
                            lblEmailId.InnerText = dr["EmailId"].ToString();
                            lblFirstLine.InnerText = dr["FirstLine"].ToString();
                            lblSecondLine.InnerText = dr["SecondLine"].ToString();
                            lblLandmark.InnerText = dr["Landmark"].ToString();
                            lblCity.InnerText = dr["City"].ToString();
                            lblPincode.InnerText = dr["Pincode"].ToString();

                            if(dr["FirstLine"].ToString()!="")
                            {
                                lblfirst.Visible = true;
                            }
                            else
                            {
                                lblfirst.Visible = false ;
                            }
                            if (dr["SecondLine"].ToString() != "")
                            {
                                lblSecond.Visible = true;
                            }
                            else
                            {
                                lblSecond.Visible = false;
                            }
                            if (dr["Landmark"].ToString() != "")
                            {
                                lblLand.Visible = true;
                            }
                            else
                            {
                                lblLand.Visible = false;
                            }
                            if (dr["City"].ToString() != "")
                            {
                                lbldist.Visible = true;
                            }
                            else
                            {
                                lbldist.Visible = false;
                            }


                            if (dr["RegDate"].ToString() != "")
                            {
                                lblRegistrationDate.InnerText = Convert.ToDateTime(dr["RegDate"]).ToString("dd-MM-yyyy");
                            }
                            else
                            {
                                lblRegistrationDate.InnerText = "";
                            }
                            if (dr["FirmLicense"].ToString() != "")
                            {
                                string FileName=dr["FirmLicense"].ToString();                                
                                string Extention = Path.GetExtension(FileName); ;
                                if(Extention==".pdf")
                                {
                                    Downloadpdf.Visible = true;
                                    userImage.Visible = false;
                                    Downloadpdf.HRef = "../Documents/" + dr["FirmLicense"].ToString();
                                    avatar2.Src = "";
                                }
                                else
                                {
                                    Downloadpdf.Visible = false;
                                    userImage.Visible = true;
                                    avatar2.Src = "../Documents/" + dr["FirmLicense"].ToString();
                                    Downloadpdf.HRef = "";
                                }
                                                                
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
        return HttpContext.Current.Session["FranchiseeID"].ToString();
    }

    public void ChangeSessionPhotoValue(string PhotoName)
    {
        HttpContext.Current.Session["FirmLicense"] = PhotoName;
    }

    public void ChangeSessionNameValue(string FirmName)
    {
        HttpContext.Current.Session["FirmName"] = FirmName;
    }



    //------------------------------Start Change User Photo Data---------------------------------------------
    [WebMethod]
    public static string ChangeUserPhoto(string FranchiseeId, string UserPhotoSource, string UserPhotoName, string ExistingImgSrc)
    {

        Staff_Profile cr = new Staff_Profile();

        bool b = false, c = false;
        string str = "";
        string NewPhotoImageName = "";
        try
        {


            if (UserPhotoSource != "" && UserPhotoName != "")
            {
                string photoName = FranchiseeId;
                //--------------Start Photo Name Changing Section---------------------
                NewPhotoImageName = IU.changePhotoName(UserPhotoName, photoName);
                //--------------End Photo Name Changing Section---------------------


                str += "Update franchiseemaster set FirmLicense=@FirmLicense where FranchiseeID=@FranchiseeID ";


                MySqlCommand cmd = new MySqlCommand(str);
                cmd.Parameters.Add("@FranchiseeID", MySqlDbType.VarChar).Value = FranchiseeId;
                cmd.Parameters.Add("@FirmLicense", MySqlDbType.VarChar).Value = NewPhotoImageName;

                string sessionvalue = cr.GetSessionValue();

                if (sessionvalue != "" && FranchiseeId == HttpContext.Current.Session["FranchiseeID"].ToString())
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
            c = IU.UploadFile(UserPhotoSource, NewPhotoImageName);
            //--------------End Photo Uploading Section--------------------- 
            if (c)
            {
                cr.ChangeSessionPhotoValue(NewPhotoImageName);//"~/ProfilePhoto/" + photoName

            }

            return FranchiseeId;
        }
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Change User Photo Data---------------------------------------------


    //------------------------------Start Update Franchisee Data---------------------------------------------
    [WebMethod]
    public static string UpdateProfile(string FranchiseeId, string FirmName, string OwnerName, string FirstLine, string SecondLine, string LandMark, string City, string Pincode, string Mobile_No, string Email)
    {

        Staff_Profile cr = new Staff_Profile();

        bool b = false;
        string str = "";

        try
        {           
            str += "Update franchiseemaster set OwnerName=@OwnerName,FirmName=@FirmName,FirstLine=@FirstLine,";
            str += "SecondLine=@SecondLine,Landmark=@Landmark,City=@City,Pincode=@Pincode,MobileNo=@MobileNo,";
            str += "EmailId=@EmailId where FranchiseeID=@FranchiseeID and FranchiseeID=@FranchiseeID ";


            MySqlCommand cmd = new MySqlCommand(str);
            cmd.Parameters.Add("@FranchiseeID", MySqlDbType.VarChar).Value = HttpContext.Current.Session["FranchiseeID"].ToString();
            cmd.Parameters.Add("@OwnerName", MySqlDbType.VarChar).Value = OwnerName;
            cmd.Parameters.Add("@FirmName", MySqlDbType.VarChar).Value = FirmName;
            cmd.Parameters.Add("@FirstLine", MySqlDbType.VarChar).Value = System.Uri.UnescapeDataString(FirstLine);
            cmd.Parameters.Add("@SecondLine", MySqlDbType.VarChar).Value = SecondLine;
            cmd.Parameters.Add("@Landmark", MySqlDbType.VarChar).Value = LandMark;
             cmd.Parameters.Add("@City", MySqlDbType.VarChar).Value = City;
            cmd.Parameters.Add("@Pincode", MySqlDbType.VarChar).Value = Pincode;
            cmd.Parameters.Add("@MobileNo", MySqlDbType.VarChar).Value = Mobile_No;
            cmd.Parameters.Add("@EmailId", MySqlDbType.VarChar).Value = Email;

            string sessionvalue = cr.GetSessionValue();

            if (sessionvalue != "" && FranchiseeId == HttpContext.Current.Session["FranchiseeID"].ToString())
            {
                b = da.InsertUpdateData(cmd);

            }
        }
        catch (Exception ex)
        {

        }

        if (b)
        {
            cr.ChangeSessionNameValue(FirmName);
            return FranchiseeId;
        }
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Update Franchisee Data---------------------------------------------





}