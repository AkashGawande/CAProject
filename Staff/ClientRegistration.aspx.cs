using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using MySql.Data.MySqlClient;
using System.Text.RegularExpressions;
using Newtonsoft.Json;


public partial class Franchisee_ClientRegistration : System.Web.UI.Page
{
    static DataAccess da = new DataAccess();
    static ImageUpload IU = new ImageUpload();
    //static string Franchisee_Id="BIPPG0355Q";
    static string Franchisee_Id = "";
    static string Staff_Id = "";
    static string Role = "";
    static string Client_Id = "";
    static int i=0;
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
            }
        }
        catch (Exception ex)
        {
            Response.Redirect("../Login.aspx");

        }
    }


    public string GetSessionValue()
    {
        return Franchisee_Id;
    }

    //============================================Start Get Session Status ============================================
    [WebMethod]
    public static string GetSessionStatus()
    {
        string sessionvalue = "";
        try
        {
            if(HttpContext.Current.Session["FranchiseeID"].ToString()!="")
            {
                sessionvalue = HttpContext.Current.Session["FranchiseeID"].ToString();
            }
        }
        catch (Exception ex)
        {
            sessionvalue = "";
        }
        return sessionvalue;
    }

    //============================================End Get Session Status.3============================================

   

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


    //------------------------------Start Save Pan Based Client Master Data---------------------------------------------
    [WebMethod]
    public static string SavePANClientMasterData(string ClientId, string PANCard, string FullName, string Father_FullName, string Address, string PinCode, string BirthDate, string MobileNo, string Email, string EmployesType, string StateId, string Citizen, string AdharNo, string ITdPassword, string Status)
    {
        bool b = false; 
         string str="";
        try
        {
            Client_Id = ClientId;
            string[] dt = Regex.Split(BirthDate, "-");
            int d = Convert.ToInt32(dt[0]);
            int m = Convert.ToInt32(dt[1]);
            int y = Convert.ToInt32(dt[2]);
            DateTime Birthdate = new DateTime(y, m, d);



            str += "insert into clientpanmaster(ClientId,PANNumber,ApplicantName,ApplicantFatherName, ";
             str += "ApplicantAddress,Pincode,BirthDate,ApplicantMobileNo,ApplicantEmail,EmployedType,StateCode,Citizenship, ";
             str += "AadharNo,ITDPortalPassword,FranchiseeId,StaffId,RegDate,Status) values(@ClientId,@PANNumber, ";
             str +="@ApplicantName,@ApplicantFatherName,@ApplicantAddress,@Pincode,@BirthDate,@ApplicantMobileNo, ";
             str +="@ApplicantEmail,@EmployedType,@StateCode,@Citizenship,@AadharNo,@ITDPortalPassword,@FranchiseeId,@StaffId, ";
             str +="@RegDate,@Status)";

            MySqlCommand cmd = new MySqlCommand(str);
            cmd.Parameters.Add("@ClientId", MySqlDbType.VarChar).Value = Client_Id;
            cmd.Parameters.Add("@PANNumber", MySqlDbType.VarChar).Value = PANCard;
            //cmd.Parameters.Add("@TANNumber", MySqlDbType.VarChar).Value = TAN_No;
            //cmd.Parameters.Add("@GSTNumber", MySqlDbType.VarChar).Value = GST_No;
            cmd.Parameters.Add("@ApplicantName", MySqlDbType.VarChar).Value = FullName;
            cmd.Parameters.Add("@ApplicantFatherName", MySqlDbType.VarChar).Value = Father_FullName;
            cmd.Parameters.Add("@ApplicantAddress", MySqlDbType.VarChar).Value = System.Uri.UnescapeDataString(Address);
            cmd.Parameters.Add("@Pincode", MySqlDbType.VarChar).Value = PinCode;
            cmd.Parameters.Add("@BirthDate", MySqlDbType.Date).Value = Convert.ToDateTime(Birthdate).ToString("yyyy-MM-dd"); ;
            cmd.Parameters.Add("@ApplicantMobileNo", MySqlDbType.VarChar).Value = MobileNo;
            cmd.Parameters.Add("@ApplicantEmail", MySqlDbType.VarChar).Value = Email;
            cmd.Parameters.Add("@EmployedType", MySqlDbType.VarChar).Value = EmployesType;
            cmd.Parameters.Add("@StateCode", MySqlDbType.VarChar).Value = StateId;
            cmd.Parameters.Add("@Citizenship", MySqlDbType.VarChar).Value = Citizen;
            cmd.Parameters.Add("@AadharNo", MySqlDbType.VarChar).Value = AdharNo;
            cmd.Parameters.Add("@ITDPortalPassword", MySqlDbType.VarChar).Value = ITdPassword;
            cmd.Parameters.Add("@FranchiseeId", MySqlDbType.VarChar).Value = HttpContext.Current.Session["FranchiseeID"].ToString();
            cmd.Parameters.Add("@StaffId", MySqlDbType.VarChar).Value = HttpContext.Current.Session["StaffID"].ToString();
            cmd.Parameters.Add("@RegDate", MySqlDbType.Date).Value = Convert.ToDateTime(DateTime.Now).ToString("yyyy-MM-dd");
            cmd.Parameters.Add("@Status", MySqlDbType.VarChar).Value = Status;

            Franchisee_ClientRegistration cr = new Franchisee_ClientRegistration();
            string sessionvalue = cr.GetSessionValue();


            if (sessionvalue != "")
            {
               b = da.InsertUpdateData(cmd);
               
            }       
        }
        catch (Exception ex)
        {

        }

        if (b)
            //return "Record Added SuccessFully..!";
            return Client_Id;
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Save Pan Based Client Master Data---------------------------------------------

    //------------------------------Start Save Pan Based Member Data---------------------------------------------    
    [WebMethod]
    public static string SavePANClientDetails(string AllAttachment, string AllBankDetails)
    {
        i = 0;
        bool b = false;
        bool c = false;
        string NewPhotoImageName = "";
        try
        {
            var serializeData = JsonConvert.DeserializeObject<List<ClientDetails>>(AllAttachment);
             
            foreach (var data in serializeData)

            {

                Client_Id = data.ClientID;
                
                if (data.PhotoSource != "" && data.PhotoName != "")
                {
                    string photoName = Client_Id + "_" + data.DocumentName.Replace(" ","_");
                    //--------------Start Photo Name Changing Section---------------------
                    NewPhotoImageName = IU.changePhotoName(data.PhotoName, photoName);
                    //--------------End Photo Name Changing Section---------------------


                    string str = "insert into clientpandocuments(ClientId, DocumentName,DocumentPath)values(@ClientId, @DocumentName,@DocumentPath)";
                    MySqlCommand cmd = new MySqlCommand(str);
                    cmd.Parameters.Add("@ClientId", MySqlDbType.VarChar).Value = Client_Id;
                    cmd.Parameters.Add("@DocumentName", MySqlDbType.VarChar).Value = data.DocumentName;
                    cmd.Parameters.Add("@DocumentPath", MySqlDbType.VarChar).Value = NewPhotoImageName;

                    b = da.InsertUpdateData(cmd);
                    //--------------Start Photo Uploading Section---------------------
                    c = IU.UploadFile(data.PhotoSource, NewPhotoImageName);
                    //--------------End Photo Uploading Section--------------------- 
                }
                else
                {
                    b = true;
                }

                
            }


            var serializeData1 = JsonConvert.DeserializeObject<List<ClientDetails>>(AllBankDetails);
            foreach (var data in serializeData1)
            {
                Client_Id = data.ClientID;

                if (data.BankAccono != "" || data.IFSCCode != "")
                {
                    string str1 = "insert into clientpanaccounts(ClientId,AccountNo,IFSC) values(@ClientId,@AccountNo,@IFSC)";
                    MySqlCommand cmd = new MySqlCommand(str1);
                    cmd.Parameters.Add("@ClientId", MySqlDbType.VarChar).Value = Client_Id;
                    cmd.Parameters.Add("@AccountNo", MySqlDbType.VarChar).Value = data.BankAccono;
                    cmd.Parameters.Add("@IFSC", MySqlDbType.VarChar).Value = data.IFSCCode;

                    b = da.InsertUpdateData(cmd);
                    i++;
                }
                else
                {
                    b = true;
                }
            }


        }
        catch (Exception ex)
        {

        }

        if (b)
            //return "Record Added SuccessFully..!";
            return Client_Id;
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Save Pan Based Member Data---------------------------------------------  



    //------------------------------Start Save TAN Based Client Master Data---------------------------------------------
    [WebMethod]
    public static string SaveTANClientMasterData(string ClientId, string TAN_No, string OfficeName, string AuthorisedPersoneName, string OfficeAddress, string OfficePinCode, string OfficeEmail, string OfficeStateId, string TracesUserId, string TracesPassword, string Status)
    {
        bool b = false;
        string str = "";
        try
        {
            Client_Id = ClientId;


            str += "insert into clienttanmaster(FranchiseeId,StaffId,RegDate,ClientId,TANNumber,OfficeName,AuthorisedPersone, ";
            str += "OfficeAddress,Pincode,OfficeEmail,StateCode, ";
            str += "TracesUserId,TracesPassword,Status) values(@FranchiseeId,@StaffId,@RegDate,@ClientId,@TANNumber, ";
            str += "@OfficeName,@AuthorisedPersone,@OfficeAddress,@Pincode, ";
            str += "@OfficeEmail,@StateCode,@TracesUserId,@TracesPassword, ";
            str += "@Status)";

            MySqlCommand cmd = new MySqlCommand(str);
            cmd.Parameters.Add("@FranchiseeId", MySqlDbType.VarChar).Value = HttpContext.Current.Session["FranchiseeID"].ToString();
            cmd.Parameters.Add("@StaffId", MySqlDbType.VarChar).Value = HttpContext.Current.Session["StaffID"].ToString();
            cmd.Parameters.Add("@RegDate", MySqlDbType.Date).Value = Convert.ToDateTime(DateTime.Now).ToString("yyyy-MM-dd");

            cmd.Parameters.Add("@ClientId", MySqlDbType.VarChar).Value = Client_Id;
            cmd.Parameters.Add("@TANNumber", MySqlDbType.VarChar).Value = TAN_No;
            cmd.Parameters.Add("@OfficeName", MySqlDbType.VarChar).Value = OfficeName;
            cmd.Parameters.Add("@AuthorisedPersone", MySqlDbType.VarChar).Value = AuthorisedPersoneName;
            cmd.Parameters.Add("@OfficeAddress", MySqlDbType.VarChar).Value = System.Uri.UnescapeDataString(OfficeAddress);
            cmd.Parameters.Add("@Pincode", MySqlDbType.VarChar).Value = OfficePinCode;
            cmd.Parameters.Add("@OfficeEmail", MySqlDbType.VarChar).Value = OfficeEmail;
            cmd.Parameters.Add("@StateCode", MySqlDbType.VarChar).Value = OfficeStateId;
            cmd.Parameters.Add("@TracesUserId", MySqlDbType.VarChar).Value = TracesUserId;
            cmd.Parameters.Add("@TracesPassword", MySqlDbType.VarChar).Value = TracesPassword;           ;
            
            cmd.Parameters.Add("@Status", MySqlDbType.VarChar).Value = Status;

            Franchisee_ClientRegistration cr = new Franchisee_ClientRegistration();
            string sessionvalue = cr.GetSessionValue();


            if (sessionvalue != "")
            {
                b = da.InsertUpdateData(cmd);

            }
        }
        catch (Exception ex)
        {

        }

        if (b)
            //return "Record Added SuccessFully..!";
            return Client_Id;
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Save TAN Based Client Master Data---------------------------------------------

    //------------------------------Start Save TAN Based Member Data---------------------------------------------    
    [WebMethod]
    public static string SaveTANClientDetails(string AllAttachment, string TANContactPersoneDetails)
    {
        i = 0;
        bool b = false;
        bool c = false;
        string NewPhotoImageName = "";
        try
        {
            var serializeData = JsonConvert.DeserializeObject<List<ClientDetails>>(AllAttachment);

            foreach (var data in serializeData)
            {

                Client_Id = data.ClientID;

                if (data.PhotoSource != "" && data.PhotoName != "")
                {
                    string photoName = Client_Id + "_" + data.DocumentName.Replace(" ", "_");
                    //--------------Start Photo Name Changing Section---------------------
                    NewPhotoImageName = IU.changePhotoName(data.PhotoName, photoName);
                    //--------------End Photo Name Changing Section---------------------


                    string str = "insert into clienttandocuments(ClientId, DocumentName,DocumentPath)values(@ClientId, @DocumentName,@DocumentPath)";
                    MySqlCommand cmd = new MySqlCommand(str);
                    cmd.Parameters.Add("@ClientId", MySqlDbType.VarChar).Value = Client_Id;
                    cmd.Parameters.Add("@DocumentName", MySqlDbType.VarChar).Value = data.DocumentName;
                    cmd.Parameters.Add("@DocumentPath", MySqlDbType.VarChar).Value = NewPhotoImageName;

                    b = da.InsertUpdateData(cmd);
                    //--------------Start Photo Uploading Section---------------------
                    c = IU.UploadFile(data.PhotoSource, NewPhotoImageName);
                    //--------------End Photo Uploading Section--------------------- 
                }
                else
                {
                    b = true;
                }


            }


            var serializeData1 = JsonConvert.DeserializeObject<List<ClientDetails>>(TANContactPersoneDetails);
            foreach (var data in serializeData1)
            {
                Client_Id = data.ClientID;

                if (data.BankAccono != "" || data.IFSCCode != "")
                {
                    string str1 = "insert into clienttancontactpersons(ClientId,PersoneName,MobileNo) values(@ClientId,@PersoneName,@MobileNo)";
                    MySqlCommand cmd = new MySqlCommand(str1);
                    cmd.Parameters.Add("@ClientId", MySqlDbType.VarChar).Value = Client_Id;
                    cmd.Parameters.Add("@PersoneName", MySqlDbType.VarChar).Value = data.TANContactPersoneName;
                    cmd.Parameters.Add("@MobileNo", MySqlDbType.VarChar).Value = data.TANContactPersoneMobile;

                    b = da.InsertUpdateData(cmd);
                    i++;
                }
                else
                {
                    b = true;
                }
            }


        }
        catch (Exception ex)
        {

        }

        if (b)
            //return "Record Added SuccessFully..!";
            return Client_Id;
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Save TAN Based Member Data---------------------------------------------  



    //------------------------------Start Save GST Based Payer Client Master Data---------------------------------------------
    [WebMethod]
    public static string SaveGSTPayerClientMasterData(string ClientId, string GST_No, string FullName, string Father_FullName, string Address, string PinCode, string BirthDate, string MobileNo, string Email, string StateId, string GSTNUserId, string GSTNPassword, string Status)
    {
        bool b = false;
        string str = "";
        try
        {
            Client_Id = ClientId;
            string[] dt = Regex.Split(BirthDate, "-");
            int d = Convert.ToInt32(dt[0]);
            int m = Convert.ToInt32(dt[1]);
            int y = Convert.ToInt32(dt[2]);
            DateTime Birthdate = new DateTime(y, m, d);



            str += "insert into clientgstpayermaster(FranchiseeId,StaffId,RegDate,ClientId,GSTNumber,ApplicantName,ApplicantFatherName, ";
            str += "ApplicantAddress,Pincode,BirthDate,ApplicantMobileNo,ApplicantEmail,StateCode,GSTNUserID, ";
            str += "GSTNPassword,Status) values(@FranchiseeId,@StaffId,@RegDate,@ClientId,@GSTNumber, ";
            str += "@ApplicantName,@ApplicantFatherName,@ApplicantAddress,@Pincode,@BirthDate,@ApplicantMobileNo, ";
            str += "@ApplicantEmail,@StateCode,@GSTNUserID,@GSTNPassword, ";
            str += "@Status)";

            MySqlCommand cmd = new MySqlCommand(str);
            cmd.Parameters.Add("@FranchiseeId", MySqlDbType.VarChar).Value = HttpContext.Current.Session["FranchiseeID"].ToString();
            cmd.Parameters.Add("@StaffId", MySqlDbType.VarChar).Value = HttpContext.Current.Session["StaffID"].ToString();
            cmd.Parameters.Add("@RegDate", MySqlDbType.VarChar).Value = Convert.ToDateTime(DateTime.Now).ToString("yyyy-MM-dd");
            cmd.Parameters.Add("@ClientId", MySqlDbType.VarChar).Value = Client_Id;
            cmd.Parameters.Add("@GSTNumber", MySqlDbType.VarChar).Value = GST_No;
            cmd.Parameters.Add("@ApplicantName", MySqlDbType.VarChar).Value = FullName;
            cmd.Parameters.Add("@ApplicantFatherName", MySqlDbType.VarChar).Value = Father_FullName;
            cmd.Parameters.Add("@ApplicantAddress", MySqlDbType.VarChar).Value = System.Uri.UnescapeDataString(Address);
            cmd.Parameters.Add("@Pincode", MySqlDbType.VarChar).Value = PinCode;
            cmd.Parameters.Add("@BirthDate", MySqlDbType.Date).Value = Convert.ToDateTime(Birthdate).ToString("yyyy-MM-dd"); ;
            cmd.Parameters.Add("@ApplicantMobileNo", MySqlDbType.VarChar).Value = MobileNo;
            cmd.Parameters.Add("@ApplicantEmail", MySqlDbType.VarChar).Value = Email;
            cmd.Parameters.Add("@StateCode", MySqlDbType.VarChar).Value = StateId;
            cmd.Parameters.Add("@GSTNUserID", MySqlDbType.VarChar).Value = GSTNUserId;
            cmd.Parameters.Add("@GSTNPassword", MySqlDbType.VarChar).Value = GSTNPassword;            
            cmd.Parameters.Add("@Status", MySqlDbType.VarChar).Value = Status;

            Franchisee_ClientRegistration cr = new Franchisee_ClientRegistration();
            string sessionvalue = cr.GetSessionValue();


            if (sessionvalue != "")
            {
                b = da.InsertUpdateData(cmd);

            }
        }
        catch (Exception ex)
        {

        }

        if (b)
            //return "Record Added SuccessFully..!";
            return Client_Id;
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Save GST Based Payer Client Master Data---------------------------------------------

    //------------------------------Start Save GST Based Payer Document Data---------------------------------------------    
    [WebMethod]
    public static string SaveGSTPayerClientDetails(string AllAttachment)
    {
        i = 0;
        bool b = false;
        bool c = false;
        string NewPhotoImageName = "";
        try
        {
            var serializeData = JsonConvert.DeserializeObject<List<ClientDetails>>(AllAttachment);

            foreach (var data in serializeData)
            {

                Client_Id = data.ClientID;

                if (data.PhotoSource != "" && data.PhotoName != "")
                {
                    string photoName = Client_Id + "_" + data.DocumentName.Replace(" ", "_");
                    //--------------Start Photo Name Changing Section---------------------
                    NewPhotoImageName = IU.changePhotoName(data.PhotoName, photoName);
                    //--------------End Photo Name Changing Section---------------------


                    string str = "insert into clientgstpayerdocument(ClientId, DocumentName,DocumentPath)values(@ClientId, @DocumentName,@DocumentPath)";
                    MySqlCommand cmd = new MySqlCommand(str);
                    cmd.Parameters.Add("@ClientId", MySqlDbType.VarChar).Value = Client_Id;
                    cmd.Parameters.Add("@DocumentName", MySqlDbType.VarChar).Value = data.DocumentName;
                    cmd.Parameters.Add("@DocumentPath", MySqlDbType.VarChar).Value = NewPhotoImageName;

                    b = da.InsertUpdateData(cmd);
                    //--------------Start Photo Uploading Section---------------------
                    c = IU.UploadFile(data.PhotoSource, NewPhotoImageName);
                    //--------------End Photo Uploading Section--------------------- 
                }
                else
                {
                    b = true;
                }


            }

        }
        catch (Exception ex)
        {

        }

        if (b)
            //return "Record Added SuccessFully..!";
            return Client_Id;
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Save  GST Based Payer Document Data--------------------------------------------- 



    //------------------------------Start Save GST Based Deductor Client Master Data---------------------------------------------
    [WebMethod]
    public static string SaveGSTDeductorClientMasterData(string ClientId, string GST_No, string OfficeName, string AuthorisedPersoneName, string OfficeAddress, string OfficePinCode, string OfficeEmail, string OfficeStateId, string GSTNUserId, string GSTNPassword, string Status)
    {
        bool b = false;
        string str = "";
        try
        {
            Client_Id = ClientId;


            str += "insert into clientgstdeductormaster(FranchiseeId,StaffId,RegDate,ClientId,GSTNumber,OfficeName,AuthorisedPersone, ";
            str += "OfficeAddress,Pincode,OfficeEmail,StateCode, ";
            str += "GSTNUserID,GSTNPassword,Status) values(@FranchiseeId,@StaffId,@RegDate,@ClientId,@GSTNumber, ";
            str += "@OfficeName,@AuthorisedPersone,@OfficeAddress,@Pincode, ";
            str += "@OfficeEmail,@StateCode,@GSTNUserID,@GSTNPassword, ";
            str += "@Status)";

            MySqlCommand cmd = new MySqlCommand(str);
            cmd.Parameters.Add("@FranchiseeId", MySqlDbType.VarChar).Value = HttpContext.Current.Session["FranchiseeID"].ToString();
            cmd.Parameters.Add("@StaffId", MySqlDbType.VarChar).Value = HttpContext.Current.Session["StaffID"].ToString();
            cmd.Parameters.Add("@RegDate", MySqlDbType.Date).Value = Convert.ToDateTime(DateTime.Now).ToString("yyyy-MM-dd");

            cmd.Parameters.Add("@ClientId", MySqlDbType.VarChar).Value = Client_Id;
            cmd.Parameters.Add("@GSTNumber", MySqlDbType.VarChar).Value = GST_No;
            cmd.Parameters.Add("@OfficeName", MySqlDbType.VarChar).Value = OfficeName;
            cmd.Parameters.Add("@AuthorisedPersone", MySqlDbType.VarChar).Value = AuthorisedPersoneName;
            cmd.Parameters.Add("@OfficeAddress", MySqlDbType.VarChar).Value = System.Uri.UnescapeDataString(OfficeAddress);
            cmd.Parameters.Add("@Pincode", MySqlDbType.VarChar).Value = OfficePinCode;
            cmd.Parameters.Add("@OfficeEmail", MySqlDbType.VarChar).Value = OfficeEmail;
            cmd.Parameters.Add("@StateCode", MySqlDbType.VarChar).Value = OfficeStateId;
            cmd.Parameters.Add("@GSTNUserID", MySqlDbType.VarChar).Value = GSTNUserId;
            cmd.Parameters.Add("@GSTNPassword", MySqlDbType.VarChar).Value = GSTNPassword; ;

            cmd.Parameters.Add("@Status", MySqlDbType.VarChar).Value = Status;

            Franchisee_ClientRegistration cr = new Franchisee_ClientRegistration();
            string sessionvalue = cr.GetSessionValue();


            if (sessionvalue != "")
            {
                b = da.InsertUpdateData(cmd);

            }
        }
        catch (Exception ex)
        {

        }

        if (b)
            //return "Record Added SuccessFully..!";
            return Client_Id;
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Save GST Based Deductor Client Master Data---------------------------------------------

    //------------------------------Start Save GST Based Deductor Document Data---------------------------------------------    
    [WebMethod]
    public static string SaveGSTDeductorClientDetails(string AllAttachment, string GSTDeductorContactPersoneDetails)
    {
        i = 0;
        bool b = false;
        bool c = false;
        string NewPhotoImageName = "";
        try
        {
            var serializeData = JsonConvert.DeserializeObject<List<ClientDetails>>(AllAttachment);

            foreach (var data in serializeData)
            {

                Client_Id = data.ClientID;

                if (data.PhotoSource != "" && data.PhotoName != "")
                {
                    string photoName = Client_Id + "_" + data.DocumentName.Replace(" ", "_");
                    //--------------Start Photo Name Changing Section---------------------
                    NewPhotoImageName = IU.changePhotoName(data.PhotoName, photoName);
                    //--------------End Photo Name Changing Section---------------------


                    string str = "insert into clientgstdeductordocument(ClientId, DocumentName,DocumentPath)values(@ClientId, @DocumentName,@DocumentPath)";
                    MySqlCommand cmd = new MySqlCommand(str);
                    cmd.Parameters.Add("@ClientId", MySqlDbType.VarChar).Value = Client_Id;
                    cmd.Parameters.Add("@DocumentName", MySqlDbType.VarChar).Value = data.DocumentName;
                    cmd.Parameters.Add("@DocumentPath", MySqlDbType.VarChar).Value = NewPhotoImageName;

                    b = da.InsertUpdateData(cmd);
                    //--------------Start Photo Uploading Section---------------------
                    c = IU.UploadFile(data.PhotoSource, NewPhotoImageName);
                    //--------------End Photo Uploading Section--------------------- 
                }
                else
                {
                    b = true;
                }


            }


            var serializeData1 = JsonConvert.DeserializeObject<List<ClientDetails>>(GSTDeductorContactPersoneDetails);
            foreach (var data in serializeData1)
            {
                Client_Id = data.ClientID;

                if (data.BankAccono != "" || data.IFSCCode != "")
                {
                    string str1 = "insert into clientgstdeductorcontactpersone(ClientId,PersoneName,MobileNo) values(@ClientId,@PersoneName,@MobileNo)";
                    MySqlCommand cmd = new MySqlCommand(str1);
                    cmd.Parameters.Add("@ClientId", MySqlDbType.VarChar).Value = Client_Id;
                    cmd.Parameters.Add("@PersoneName", MySqlDbType.VarChar).Value = data.GSTDeductorContactPersoneName;
                    cmd.Parameters.Add("@MobileNo", MySqlDbType.VarChar).Value = data.GSTDeductorContactPersoneMobile;

                    b = da.InsertUpdateData(cmd);
                    i++;
                }
                else
                {
                    b = true;
                }
            }


        }
        catch (Exception ex)
        {

        }

        if (b)
            //return "Record Added SuccessFully..!";
            return Client_Id;
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Save GST Based Deductor Deductor Data---------------------------------------------  


    //===================Start Get IT Client List==========================
    [WebMethod]
    public static ITClientList[] GetITClientsDetails()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "SELECT * FROM clientpanmaster where FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "'and StaffId='" + HttpContext.Current.Session["StaffID"].ToString() + "' and Status='Active' order by ID desc";
        ITClientList[] md = Contl.GetITClients(str);
        return md.ToArray();
    }
    //===================End Get IT Client List==========================
    //===================Start Get TDS Client List==========================
    [WebMethod]
    public static TDSClientList[] GetTDSClientsDetails()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "SELECT * FROM clienttanmaster where FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "'and StaffId='" + HttpContext.Current.Session["StaffID"].ToString() + "' and Status='Active' order by ID desc";
        TDSClientList[] md = Contl.GetTDSClients(str);
        return md.ToArray();
    }
    //===================End Get TDS Client List==========================
    //===================Start Get GST Client List==========================
    [WebMethod]
    public static GSTTaxPayer[] GetGSTaxPayerList()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "SELECT * FROM clientgstpayermaster where FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "'and StaffId='" + HttpContext.Current.Session["StaffID"].ToString() + "' and Status='Active' order by ID desc";
        GSTTaxPayer[] md = Contl.GetGSTaxPayer(str);
        return md.ToArray();
    }
    //===================End Get GST Client List==========================
    //===================Start Get GST Client List==========================
    [WebMethod]
    public static GSTTaxDeductor[] GetGSTaxDeductorList()
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "SELECT * FROM clientgstdeductormaster where FranchiseeId='" + HttpContext.Current.Session["FranchiseeID"].ToString() + "'and StaffId='" + HttpContext.Current.Session["StaffID"].ToString() + "' and Status='Active' order by ID desc";
        GSTTaxDeductor[] md = Contl.GetGSTaxDeductor(str);
        return md.ToArray();
    }
    //===================End Get GST Client List==========================







    //===================Start View IT Client Details==========================
    [WebMethod]
    public static ITClientList[] ViewModelBox(string ClientID)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT pm.*,pa.*,sm.statecode FROM clientpanmaster pm ";
        str += "LEFT JOIN clientpanaccounts pa ON pm.ClientId=pa.ClientId ";
        str += "LEFT JOIN state_master sm ON pm.statecode=sm.statecode ";
        str += "WHERE pm.ClientId='" + ClientID + "' ";

        ITClientList[] md = Contl.GetITClientDetails(str);
        return md.ToArray();
    }
    //===================End View IT Client Details==========================

    //===================Start View IT Client Documents==========================
    [WebMethod]
    public static ITClientList[] ViewDocumentsModelBox(string ClientID)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT * FROM clientpandocuments WHERE ClientId='" + ClientID + "' ";

        ITClientList[] md = Contl.GetClientDocuments(str);
        return md.ToArray();
    }
    //===================End View IT Client Documents==========================


    //===================Start View TDS Client Details==========================
    [WebMethod]
    public static TDSClientList[] ViewTDSModelBox(string ClientID)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT tm.*,tc.* FROM clienttanmaster  tm ";
        str += "LEFT JOIN clienttancontactpersons tc ON tm.ClientId=tc.ClientId ";
        //str += "LEFT JOIN state_master sm ON tm.StateCode=sm.StateCode ";
        str += "WHERE tm.ClientId='" + ClientID + "' ";

        TDSClientList[] md = Contl.GetTDSClientDetails(str);
        return md.ToArray();
    }
    //===================End View TDS Client Details==========================


    //===================Start View TDS Client Documents==========================
    [WebMethod]
    public static TDSClientList[] ViewTDSDocumentsModelBox(string ClientID)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT * FROM clienttandocuments WHERE ClientId='" + ClientID + "' ";

        TDSClientList[] md = Contl.GetTDSClientDocuments(str);
        return md.ToArray();
    }
    //===================End View TDS Client Documents==========================

    //===================Start View GST Payer Client Details==========================
    [WebMethod]
    public static GSTTaxPayer[] ViewGSTPModelBox(string ClientID)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT pm.*,pd.* FROM clientgstpayermaster pm LEFT JOIN clientgstpayerdocument pd ON pm.ClientId=pd.ClientId ";
        str += "WHERE pm.ClientId='" + ClientID + "' ";

        GSTTaxPayer[] md = Contl.GetGSTPClientDetails(str);
        return md.ToArray();
    }
    //===================End View GST Payer Client Details==========================



    //===================Start View GST Deductor Client Details==========================
    [WebMethod]
    public static GSTTaxDeductor[] ViewGSTDModelBox(string ClientID)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT dm.*,cp.* FROM clientgstdeductormaster dm LEFT JOIN clientgstdeductorcontactpersone cp ON dm.ClientId=cp.ClientId ";
        str += "WHERE dm.ClientId='" + ClientID + "' ";

        GSTTaxDeductor[] md = Contl.GetGSTDClientDetails(str);
        return md.ToArray();
    }
    //===================End View GST Deductor Client Details==========================

    //===================Start View GST Deductor Client Documents==========================
    [WebMethod]
    public static GSTTaxDeductor[] ViewGSTDDocumentsModelBox(string ClientID)
    {
        HeadOfficeController Contl = new HeadOfficeController();
        string str = "";
        str += "SELECT * FROM clientgstdeductordocument WHERE ClientId='" + ClientID + "' ";

        GSTTaxDeductor[] md = Contl.GetGSTDClientDocuments(str);
        return md.ToArray();
    }
    //===================End View GST Deductor Client Documents==========================


    //------------------------------Start Update Pan Based Client Master Data---------------------------------------------
    [WebMethod]
    public static string UpdatePANClientMasterData(string ITClientID, string ITPANNumber, string ITApplicantName, string ITApplicantFatherName, string ITApplicantAddress, string ITPinCode, string ITBirthDate, string ITApplicantMobileNo, string ITApplicantEmailID, string ITEmployedType, string ITState, string ITCitizenship, string ITAadharNumber, string ITDPortalPassword, string Status)
    {
        bool b = false;
        string str = "";

        try
        {
            Client_Id = ITClientID;
            string[] dt = Regex.Split(ITBirthDate, "-");
            int d = Convert.ToInt32(dt[0]);
            int m = Convert.ToInt32(dt[1]);
            int y = Convert.ToInt32(dt[2]);
            DateTime ITbirthdate = new DateTime(y, m, d);

            str += "update clientpanmaster set ApplicantName='" + ITApplicantName + "',ApplicantFatherName='" + ITApplicantFatherName + "',";
            str += "ApplicantAddress='" + System.Uri.UnescapeDataString(ITApplicantAddress) + "',Pincode=" + ITPinCode + ",BirthDate='" + Convert.ToDateTime(ITbirthdate).ToString("yyyy-MM-dd") + "',";
            str += "ApplicantMobileNo='" + ITApplicantMobileNo + "',ApplicantEmail='" + ITApplicantEmailID + "',StateCode=" + ITState + ",";
            str += "Citizenship='" + ITCitizenship + "',EmployedType='" + ITEmployedType + "',AadharNo='" + ITAadharNumber + "',ITDPortalPassword='" + ITDPortalPassword + "' ";
            str += "where ClientId='" + ITClientID + "'";

            b = da.insertUpdate(str);



        }
        catch (Exception ex)
        {

        }

        if (b)
            //return "Record Added SuccessFully..!";
            return Client_Id;
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Save Pan Based Client Master Data---------------------------------------------

    //------------------------------Start Save Pan Based Member Data---------------------------------------------    
    [WebMethod]
    public static string UpdatePANClientDetails(string AllBankDetails)
    {
        bool b = false;
        try
        {
            var serializeData1 = JsonConvert.DeserializeObject<List<ITClientList>>(AllBankDetails);
            foreach (var data in serializeData1)
            {
                //Client_Id = data.ITClientID;
                string str1 = "";
                MySqlCommand cmd;
                if (data.AccountNo != "" || data.IFSC != "")
                {
                    if (data.AccountId == "")
                    {
                        str1 = "insert into clientpanaccounts(ClientId,AccountNo,IFSC) values(@ClientId,@AccountNo,@IFSC)";
                        cmd = new MySqlCommand(str1);
                        cmd.Parameters.Add("@ClientId", MySqlDbType.VarChar).Value = data.ClientId;
                        cmd.Parameters.Add("@AccountNo", MySqlDbType.VarChar).Value = data.AccountNo;
                        cmd.Parameters.Add("@IFSC", MySqlDbType.VarChar).Value = data.IFSC;
                    }
                    else
                    {
                        str1 = "update clientpanaccounts set AccountNo=@AccountNo,IFSC=@IFSC where AccountId=@AccountId";
                        cmd = new MySqlCommand(str1);
                        cmd.Parameters.Add("@AccountId", MySqlDbType.VarChar).Value = data.AccountId;
                        cmd.Parameters.Add("@AccountNo", MySqlDbType.VarChar).Value = data.AccountNo;
                        cmd.Parameters.Add("@IFSC", MySqlDbType.VarChar).Value = data.IFSC;
                    }


                    b = da.InsertUpdateData(cmd);
                    //i++;
                }
                else
                {
                    b = true;
                }
            }


        }
        catch (Exception ex)
        {

        }

        if (b)
            //return "Record Added SuccessFully..!";
            return Client_Id;
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Update PAN Based Member Data---------------------------------------------

    //------------------------------Start Update TAN Based Client Master Data---------------------------------------------
    [WebMethod]
    public static string UpdateTANClientMasterData(string TDSClientID, string TDSTANNumber, string TDSOfficeName, string TDSAuthorisedPerson, string TDSOfficeAddress, string TDSPinCode, string TDSOfficeEmailID, string TDSState, string TDSTracesUserId, string TDSTracesPassword, string Status)
    {
        bool b = false;
        string str = "";
        try
        {
            Client_Id = TDSClientID;

            str += "Update clienttanmaster set OfficeName='" + TDSOfficeName + "',AuthorisedPersone='" + TDSAuthorisedPerson + "',";
            str += "OfficeAddress='" + System.Uri.UnescapeDataString(TDSOfficeAddress) + "',Pincode=" + TDSPinCode + ",OfficeEmail='" + TDSOfficeEmailID + "',";
            str += "StateCode=" + TDSState + ",TracesUserId='" + TDSTracesUserId + "',TracesPassword='" + TDSTracesPassword + "' ";
            str += "where ClientId='" + TDSClientID + "'";
            b = da.insertUpdate(str);
        }
        catch (Exception ex)
        {

        }

        if (b)
            //return "Record Added SuccessFully..!";
            return Client_Id;
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Update TAN Based Client Master Data---------------------------------------------

    //------------------------------Start Update TAN Based Member Data---------------------------------------------    
    [WebMethod]
    public static string UpdateTANClientDetails(string TANContactPersoneDetails)
    {
        bool b = false;
        try
        {
            var serializeData1 = JsonConvert.DeserializeObject<List<TDSClientList>>(TANContactPersoneDetails);
            foreach (var data in serializeData1)
            {
                Client_Id = data.ClientId;
                string str1 = "";
                MySqlCommand cmd;
                if (data.PersoneName != "" || data.MobileNo != "")
                {
                    if (data.PersonID == "")
                    {
                        str1 = "insert into clienttancontactpersons(ClientId,PersoneName,MobileNo) values(@ClientId,@PersoneName,@MobileNo)";
                        cmd = new MySqlCommand(str1);
                        cmd.Parameters.Add("@ClientId", MySqlDbType.VarChar).Value = data.ClientId;
                        cmd.Parameters.Add("@PersoneName", MySqlDbType.VarChar).Value = data.PersoneName;
                        cmd.Parameters.Add("@MobileNo", MySqlDbType.VarChar).Value = data.MobileNo;
                    }
                    else
                    {
                        str1 = "update clienttancontactpersons set PersoneName=@PersoneName,MobileNo=@MobileNo where PersonID=@PersonID";
                        cmd = new MySqlCommand(str1);
                        cmd.Parameters.Add("@PersonID", MySqlDbType.VarChar).Value = data.PersonID;
                        cmd.Parameters.Add("@PersoneName", MySqlDbType.VarChar).Value = data.PersoneName;
                        cmd.Parameters.Add("@MobileNo", MySqlDbType.VarChar).Value = data.MobileNo;
                    }


                    b = da.InsertUpdateData(cmd);
                }
                else
                {
                    b = true;
                }
            }

        }
        catch (Exception ex)
        {

        }

        if (b)
            return Client_Id;
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Update TAN Based Member Data--------------------------------------------- 


    //------------------------------Start Update GST Payer Client Master Data---------------------------------------------
    [WebMethod]
    public static string UpdateGSTPClientMasterData(string GSTPClientID, string GSTPGSTNumber, string GSTPApplicanteName, string GSTPFatherName, string GSTPApplicantAddress, string GSTPPinCode, string GSTPState, string GSTPBirthDate, string GSTPMobileNo, string GSTPApplicantEmail, string GSTNPUserId, string GSTNPPassword, string Status)
    {
        bool b = false;
        string str = "";
        try
        {
            str += "Update clientgstpayermaster set ApplicantName='" + GSTPApplicanteName + "',ApplicantFatherName='" + GSTPFatherName + "',";
            str += "ApplicantAddress='" + System.Uri.UnescapeDataString(GSTPApplicantAddress) + "',Pincode=" + GSTPPinCode + ",";
            str += "BirthDate='" + Convert.ToDateTime(GSTPBirthDate).ToString("yyyy-MM-dd") + "',ApplicantMobileNo='" + GSTPMobileNo + "',";
            str += "ApplicantEmail='" + GSTPApplicantEmail + "',StateCode=" + GSTPState + ",GSTNUserID='" + GSTNPUserId + "',GSTNPassword='" + GSTNPPassword + "' ";
            str += "where ClientId='" + GSTPClientID + "'";

            b = da.insertUpdate(str);
        }
        catch (Exception ex)
        {

        }

        if (b)
            return "Record Added SuccessFully..!";
        //return Client_Id;
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Update GST Payer Client Master Data---------------------------------------------

    //------------------------------Start Update GST Deductor Client Master Data---------------------------------------------
    [WebMethod]
    public static string UpdateGSTDClientMasterData(string GSTDClientID, string GSTDGSTNumber, string GSTDOfficeName, string GSTDAuthorisedPersonName, string GSTDOfficeAddress, string GSTDPinCode, string GSTDState, string GSTDOfficeEmail, string GSTNDUserId, string GSTNDPassword, string Status)
    {
        bool b = false;
        string str = "";
        try
        {
            Client_Id = GSTDClientID;

            str += "Update clientgstdeductormaster set OfficeName='" + GSTDOfficeName + "',AuthorisedPersone='" + GSTDAuthorisedPersonName + "',";
            str += "OfficeAddress='" + System.Uri.UnescapeDataString(GSTDOfficeAddress) + "',Pincode=" + GSTDPinCode + ",OfficeEmail='" + GSTDOfficeEmail + "',";
            str += "StateCode=" + GSTDState + ",GSTNUserID='" + GSTNDUserId + "',GSTNPassword='" + GSTNDPassword + "' ";
            str += "where ClientId='" + GSTDClientID + "'";

            b = da.insertUpdate(str);
        }
        catch (Exception ex)
        {

        }

        if (b)
            //return "Record Added SuccessFully..!";
            return Client_Id;
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Update GST Deductor Client Master Data---------------------------------------------

    //------------------------------Start Update GST Deductor Member Data---------------------------------------------    
    [WebMethod]
    public static string UpdateGSTDClientDetails(string GSTDContactPersoneDetails)
    {
        bool b = false;
        try
        {
            var serializeData1 = JsonConvert.DeserializeObject<List<GSTTaxDeductor>>(GSTDContactPersoneDetails);
            foreach (var data in serializeData1)
            {
                Client_Id = data.ClientId;
                string str1 = "";
                MySqlCommand cmd;
                if (data.PersoneName != "" || data.MobileNo != "")
                {
                    if (data.PersonID == "")
                    {
                        str1 = "insert into clientgstdeductorcontactpersone(ClientId,PersoneName,MobileNo) values(@ClientId,@PersoneName,@MobileNo)";
                        cmd = new MySqlCommand(str1);
                        cmd.Parameters.Add("@ClientId", MySqlDbType.VarChar).Value = data.ClientId;
                        cmd.Parameters.Add("@PersoneName", MySqlDbType.VarChar).Value = data.PersoneName;
                        cmd.Parameters.Add("@MobileNo", MySqlDbType.VarChar).Value = data.MobileNo;
                    }
                    else
                    {
                        str1 = "update clientgstdeductorcontactpersone set PersoneName=@PersoneName,MobileNo=@MobileNo where PersonID=@PersonID";
                        cmd = new MySqlCommand(str1);
                        cmd.Parameters.Add("@PersonID", MySqlDbType.VarChar).Value = data.PersonID;
                        cmd.Parameters.Add("@PersoneName", MySqlDbType.VarChar).Value = data.PersoneName;
                        cmd.Parameters.Add("@MobileNo", MySqlDbType.VarChar).Value = data.MobileNo;
                    }


                    b = da.InsertUpdateData(cmd);
                }
                else
                {
                    b = true;
                }
            }

        }
        catch (Exception ex)
        {

        }

        if (b)
            return Client_Id;
        else
            return "Record Not Added ..?";
    }
    //------------------------------End Update GST Deductor Member Data--------------------------------------------- 




    //------------------------------Start Update Or Add IT New Document---------------------------------------------
    [WebMethod]
    public static string Update_AddITDocument(string ClientId, string UpdateDocumentId, string UpdateDocumentName, string ExistingDocument, string UpdatePhotoSource, string UpdateFileName)
    {
        bool b = false;
        bool c=false;
        string str = "";
        string NewPhotoImageName = "";
        try
        {
            string str1 = "";
            MySqlCommand cmd;
            if (UpdatePhotoSource != "" && UpdateFileName != "")           
            {
                string photoName = ClientId + "_" + UpdateDocumentName.Replace(" ", "_");
                //--------------Start Photo Name Changing Section---------------------
                NewPhotoImageName = IU.changePhotoName(UpdateFileName, photoName);
                //--------------End Photo Name Changing Section---------------------

                if (UpdateDocumentId == "")
                {
                    str1 = "insert into clientpandocuments(ClientId,DocumentName,DocumentPath) values(@ClientId,@DocumentName,@DocumentPath)";
                    cmd = new MySqlCommand(str1);
                    cmd.Parameters.Add("@ClientId", MySqlDbType.VarChar).Value = ClientId;
                    cmd.Parameters.Add("@DocumentName", MySqlDbType.VarChar).Value = UpdateDocumentName;
                    cmd.Parameters.Add("@DocumentPath", MySqlDbType.VarChar).Value = NewPhotoImageName;
                }
                else
                {
                    str1 = "update clientpandocuments set DocumentName=@DocumentName,DocumentPath=@DocumentPath where DocumentId=@DocumentId";
                    cmd = new MySqlCommand(str1);
                    cmd.Parameters.Add("@DocumentId", MySqlDbType.VarChar).Value = UpdateDocumentId;
                    cmd.Parameters.Add("@DocumentName", MySqlDbType.VarChar).Value = UpdateDocumentName;
                    cmd.Parameters.Add("@DocumentPath", MySqlDbType.VarChar).Value = NewPhotoImageName;
                }

                Franchisee_ClientRegistration cr = new Franchisee_ClientRegistration();
            string sessionvalue = cr.GetSessionValue();


            if (sessionvalue != "")
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
            string filePath = HttpContext.Current.Server.MapPath(ExistingDocument);
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }

            //--------------Start Photo Uploading Section---------------------
            c = IU.UploadFile(UpdatePhotoSource, NewPhotoImageName);
            //--------------End Photo Uploading Section----------------------

            return ClientId;
        }
        else
            return "Record Not Added ..?";
    
    }
    //------------------------------End Update Or Add IT New Document---------------------------------------------



    //------------------------------Start Update Or Add TDS New Document---------------------------------------------
    [WebMethod]
    public static string Update_AddTDSDocument(string ClientId, string UpdateDocumentId, string UpdateDocumentName, string ExistingDocument, string UpdatePhotoSource, string UpdateFileName)
    {
        bool b = false;
        bool c = false;
        string str = "";
        string NewPhotoImageName = "";
        try
        {
            string str1 = "";
            MySqlCommand cmd;
            if (UpdatePhotoSource != "" && UpdateFileName != "")
            {
                string photoName = ClientId + "_" + UpdateDocumentName.Replace(" ", "_");
                //--------------Start Photo Name Changing Section---------------------
                NewPhotoImageName = IU.changePhotoName(UpdateFileName, photoName);
                //--------------End Photo Name Changing Section---------------------

                if (UpdateDocumentId == "")
                {
                    str1 = "insert into clienttandocuments(ClientId,DocumentName,DocumentPath) values(@ClientId,@DocumentName,@DocumentPath)";
                    cmd = new MySqlCommand(str1);
                    cmd.Parameters.Add("@ClientId", MySqlDbType.VarChar).Value = ClientId;
                    cmd.Parameters.Add("@DocumentName", MySqlDbType.VarChar).Value = UpdateDocumentName;
                    cmd.Parameters.Add("@DocumentPath", MySqlDbType.VarChar).Value = NewPhotoImageName;
                }
                else
                {
                    str1 = "update clienttandocuments set DocumentName=@DocumentName,DocumentPath=@DocumentPath where DocumentId=@DocumentId";
                    cmd = new MySqlCommand(str1);
                    cmd.Parameters.Add("@DocumentId", MySqlDbType.VarChar).Value = UpdateDocumentId;
                    cmd.Parameters.Add("@DocumentName", MySqlDbType.VarChar).Value = UpdateDocumentName;
                    cmd.Parameters.Add("@DocumentPath", MySqlDbType.VarChar).Value = NewPhotoImageName;
                }

                Franchisee_ClientRegistration cr = new Franchisee_ClientRegistration();
                string sessionvalue = cr.GetSessionValue();


                if (sessionvalue != "")
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
            string filePath = HttpContext.Current.Server.MapPath(ExistingDocument);
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }

            //--------------Start Photo Uploading Section---------------------
            c = IU.UploadFile(UpdatePhotoSource, NewPhotoImageName);
            //--------------End Photo Uploading Section----------------------

            return ClientId;
        }
        else
            return "Record Not Added ..?";

    }
    //------------------------------End Update Or Add TDS New Document---------------------------------------------


    //------------------------------Start Update Or Add GSTP New Document---------------------------------------------
    [WebMethod]
    public static string Update_AddGSTPDocument(string ClientId, string UpdateDocumentId, string UpdateDocumentName, string ExistingDocument, string UpdatePhotoSource, string UpdateFileName)
    {
        bool b = false;
        bool c = false;
        string str = "";
        string NewPhotoImageName = "";
        try
        {
            string str1 = "";
            MySqlCommand cmd;
            if (UpdatePhotoSource != "" && UpdateFileName != "")
            {
                string photoName = ClientId + "_" + UpdateDocumentName.Replace(" ", "_");
                //--------------Start Photo Name Changing Section---------------------
                NewPhotoImageName = IU.changePhotoName(UpdateFileName, photoName);
                //--------------End Photo Name Changing Section---------------------

                if (UpdateDocumentId == "")
                {
                    str1 = "insert into clientgstpayerdocument(ClientId,DocumentName,DocumentPath) values(@ClientId,@DocumentName,@DocumentPath)";
                    cmd = new MySqlCommand(str1);
                    cmd.Parameters.Add("@ClientId", MySqlDbType.VarChar).Value = ClientId;
                    cmd.Parameters.Add("@DocumentName", MySqlDbType.VarChar).Value = UpdateDocumentName;
                    cmd.Parameters.Add("@DocumentPath", MySqlDbType.VarChar).Value = NewPhotoImageName;
                }
                else
                {
                    str1 = "update clientgstpayerdocument set DocumentName=@DocumentName,DocumentPath=@DocumentPath where DocumentId=@DocumentId";
                    cmd = new MySqlCommand(str1);
                    cmd.Parameters.Add("@DocumentId", MySqlDbType.VarChar).Value = UpdateDocumentId;
                    cmd.Parameters.Add("@DocumentName", MySqlDbType.VarChar).Value = UpdateDocumentName;
                    cmd.Parameters.Add("@DocumentPath", MySqlDbType.VarChar).Value = NewPhotoImageName;
                }

                Franchisee_ClientRegistration cr = new Franchisee_ClientRegistration();
                string sessionvalue = cr.GetSessionValue();


                if (sessionvalue != "")
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
            string filePath = HttpContext.Current.Server.MapPath(ExistingDocument);
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }

            //--------------Start Photo Uploading Section---------------------
            c = IU.UploadFile(UpdatePhotoSource, NewPhotoImageName);
            //--------------End Photo Uploading Section----------------------

            return ClientId;
        }
        else
            return "Record Not Added ..?";

    }
    //------------------------------End Update Or Add GSTP New Document---------------------------------------------



    //------------------------------Start Update Or Add GSTP New Document---------------------------------------------
    [WebMethod]
    public static string Update_AddGSTDDocument(string ClientId, string UpdateDocumentId, string UpdateDocumentName, string ExistingDocument, string UpdatePhotoSource, string UpdateFileName)
    {
        bool b = false;
        bool c = false;
        string str = "";
        string NewPhotoImageName = "";
        try
        {
            string str1 = "";
            MySqlCommand cmd;
            if (UpdatePhotoSource != "" && UpdateFileName != "")
            {
                string photoName = ClientId + "_" + UpdateDocumentName.Replace(" ", "_");
                //--------------Start Photo Name Changing Section---------------------
                NewPhotoImageName = IU.changePhotoName(UpdateFileName, photoName);
                //--------------End Photo Name Changing Section---------------------

                if (UpdateDocumentId == "")
                {
                    str1 = "insert into clientgstdeductordocument(ClientId,DocumentName,DocumentPath) values(@ClientId,@DocumentName,@DocumentPath)";
                    cmd = new MySqlCommand(str1);
                    cmd.Parameters.Add("@ClientId", MySqlDbType.VarChar).Value = ClientId;
                    cmd.Parameters.Add("@DocumentName", MySqlDbType.VarChar).Value = UpdateDocumentName;
                    cmd.Parameters.Add("@DocumentPath", MySqlDbType.VarChar).Value = NewPhotoImageName;
                }
                else
                {
                    str1 = "update clientgstdeductordocument set DocumentName=@DocumentName,DocumentPath=@DocumentPath where DocumentId=@DocumentId";
                    cmd = new MySqlCommand(str1);
                    cmd.Parameters.Add("@DocumentId", MySqlDbType.VarChar).Value = UpdateDocumentId;
                    cmd.Parameters.Add("@DocumentName", MySqlDbType.VarChar).Value = UpdateDocumentName;
                    cmd.Parameters.Add("@DocumentPath", MySqlDbType.VarChar).Value = NewPhotoImageName;
                }

                Franchisee_ClientRegistration cr = new Franchisee_ClientRegistration();
                string sessionvalue = cr.GetSessionValue();


                if (sessionvalue != "")
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
            string filePath = HttpContext.Current.Server.MapPath(ExistingDocument);
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }

            //--------------Start Photo Uploading Section---------------------
            c = IU.UploadFile(UpdatePhotoSource, NewPhotoImageName);
            //--------------End Photo Uploading Section----------------------

            return ClientId;
        }
        else
            return "Record Not Added ..?";

    }
    //------------------------------End Update Or Add GSTP New Document---------------------------------------------




}