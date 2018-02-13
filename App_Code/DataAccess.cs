using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Configuration;
using MySql.Data.MySqlClient;
using System.Net.Mail;
using System.Net;
using System.IO;
using System.Text;
using Ionic.Zip;
/// <summary>
/// Summary description for DataAccess
/// </summary>
public class DataAccess
{

    MySqlConnection con = new MySqlConnection(DataAccess.getConnection());  
     MySqlDataAdapter da = new MySqlDataAdapter();
     DataSet ds = new DataSet();
    public static string getConnection()
    {
        return ConfigurationManager.ConnectionStrings["MyConnection"].ConnectionString;
    }
   public bool insertUpdate(string str)
    {
        try
        {
            MySqlConnection _connect = new MySqlConnection(DataAccess.getConnection());
            _connect.Open();
            MySqlCommand cmd = new MySqlCommand(str, _connect);
            int x = cmd.ExecuteNonQuery();
            _connect.Close();
            _connect.Dispose();
            if (x > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        catch
        {
            throw;
        }
    }
    //this return dataset
    public DataSet fillDataset(string str)
   {
       MySqlConnection con2 = new MySqlConnection(DataAccess.getConnection());
       DataSet ds1 = new DataSet();
       try {
           con2.Open();
           ds1.Reset();
           MySqlCommand cmd = new MySqlCommand(str, con2);
           da = new MySqlDataAdapter(cmd);
           da.SelectCommand = cmd;
           da.Fill(ds1);
          // con.Close();
       }
       catch (Exception exc) { }
       finally {
           con2.Close();
          // con.Dispose();
       }
       return ds1;
   }
    //following method return integer

    public DataSet fillDataset1(string str)
    {
        MySqlConnection con2 = new MySqlConnection(DataAccess.getConnection());
        DataSet ds1 = new DataSet();
        try
        {
            con2.Open();
            
            ds1.Reset();
            MySqlCommand cmd = new MySqlCommand(str, con2);
            da = new MySqlDataAdapter(cmd);
            da.SelectCommand = cmd;
            da.Fill(ds1);
            // con.Close();
        }
        catch (Exception exc) { }
        finally
        {
            con2.Close();
            // con.Dispose();
        }
        return ds1;
    }
    //following method return integer

    public int getInt(string str)
    {
        MySqlConnection con3 = new MySqlConnection(DataAccess.getConnection());
        int id = 0;
        try {
            con3.Open();
            MySqlCommand cmd = new MySqlCommand(str, con3);
            id = Convert.ToInt32(cmd.ExecuteScalar());

            
        }
        catch (Exception e) { }
        finally {
            con3.Close();
        }
        
        return id;
    }
    //following method return string
    public  string getString(string str)
    {
        string username = "";
        //SqlConnection con1 = new SqlConnection("Data Source=(local);Initial Catalog=ShivaiDB;User ID=sa;Password=123");
        MySqlConnection con1 = new MySqlConnection(DataAccess.getConnection());
        try {
            
            con1.Open();
            MySqlCommand cmd = new MySqlCommand(str, con1);
            username = cmd.ExecuteScalar().ToString();
        }
        catch (Exception e) { }
        finally {
            con1.Close();
        }        
        return username;
    }
    public bool isAvailable(string str)
    {
        string username="";
        con.Open();
        try
        {
            MySqlCommand cmd = new MySqlCommand(str, con);
            username = cmd.ExecuteScalar().ToString();          
        }
        catch (Exception exc)
        {

        }
        finally
        {
            con.Close();
        }
        if ( username==null || username=="") 
            return true;
        else
            return false;
    }
    public Boolean InsertUpdateData(MySqlCommand cmd)
    {
        MySqlConnection con = new MySqlConnection(getConnection());  //#GuardiansTheSuperheroes
        cmd.CommandType = CommandType.Text;
        cmd.Connection = con;
        try
        {
            con.Open();
            cmd.ExecuteNonQuery();
            return true;
        }
        catch (Exception ex)
        {
            // Response.Write(ex.Message);
            return false;
        }
        finally
        {
            con.Close();
            con.Dispose();
        }
    }

    public string generatepassword(int no)
    {
        //int lenght = 6;
        int lenght = no;
        char[] charArr = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".ToCharArray();
        string password = string.Empty;
        Random objran = new Random();
        //int noofcharacters = Convert.ToInt32(Number);
        for (int i = 0; i < lenght; i++)
        {
            //It will not allow Repetation of Characters
            int pos = objran.Next(1, charArr.Length);
            if (!password.Contains(charArr.GetValue(pos).ToString()))
                password += charArr.GetValue(pos);


            else
                i--;
        }
        return password;
    }

    public string SendMail(string Id, string Name, string password, string Email, string Operation)
    {
        string id = Id;
        string name = Name;
        string Messege = "";
        
        string from = "donotreplyefimitra@gmail.com";
        string pass = "efimitra@123";

        try
        {
            MailMessage ml = new MailMessage();
            ml.From = new MailAddress(from);
            ml.To.Add(new MailAddress(Email));
            //if (Operation == "Registerd")
            //{
            //    ml.Subject = "Your MGPL Credentials";
            //    Messege += "Hello" + "  " + "Mr/miss. " + name + "," + "\n\n";
            //    Messege += "\t Thank you for registering at Lokvikas. Your account has been created and must be activated before you can use it." + "\n\n";
            //    Messege += "\t After activation you may login to your Account. Your will get Your username and password After Activation." + "\n\n";
            //    //Messege += "Username:-" + " " + id + "\n";
            //    //Messege += "Password:-" + " " + password;

            //}
            if (Operation == "Activate")
            {
                ml.Subject = "Your Franchisee Credentials";
                Messege += "Hello" + "  " + name + "," + "\n\n";
                Messege += "\t Thank you for registering at Efi Tax Mitra. Your account has been created and Verifird Successfully." + "\n\n";
                Messege += "\t  Please Use below Username & Password For Login." + "\n\n";
                Messege += "Username:-" + " " + id + "\n";
                Messege += "Password:-" + " " + password + "\n";
                Messege += "Url For Login:- http://efimitra.com/";
            }
            //else if (Operation == "Change_Password")
            //{
            //    ml.Subject = "Your MGPl Credentials";
            //    Messege += "Hello" + "  " + "Mr/miss. " + name + "," + "\n\n";
            //    Messege += "\t Your Password has been Changed." + "\n\n";
            //    Messege += "\t Please Use below Username & Password For Login." + "\n\n";
            //    Messege += "Username:-" + " " + id + "\n";
            //    Messege += "Password:-" + " " + password + "\n";
            //    Messege += "Url For Login:- http://aps.emgpl.in/";
            //}
            else if (Operation == "Password_Recovery")
            {
                ml.Subject = "Your Login Credentials";
                Messege += "Hello" + "  " + name + "," + "\n\n";
                Messege += "\t Please Use below Username & Password For Login." + "\n\n";
                Messege += "Username:-" + " " + id + "\n";
                Messege += "Password:-" + " " + password + "\n";
                Messege += "Url For Login:- http://efimitra.com/";
            }
            else if (Operation == "Rejected")
            {
                ml.Subject = "Franchisee Rejected";
                Messege += "Hello" + "  " + name + "," + "\n\n";
                Messege += "\t Your request for Franchisee has been rejected by Efi Tax Mitra." + "\n\n";
                Messege += "\t  Please contact to Head Office." + "\n\n";
                Messege += "Conatct:- +91 9922477700" + " \n";
            }
            else if (Operation == "mail")
            {
                ml.Subject = password;
                Messege += "Hello \n";
                Messege += "\t You have received a message from Efi Tax Mitra on your panel regarding (Client ID:" + Name + ").\n";
                Messege += "\t Please login from http://efimitra.com and check the message in your inbox.";               
            }


            ml.Body = Messege;
            ml.IsBodyHtml = false;
            ml.Priority = MailPriority.High;

            SmtpClient smtp = new SmtpClient();
            //smtp.Host = "smtp.1and1.com";
            //smtp.Port = 587;
            smtp.Host = "smtp.gmail.com";
            smtp.Port = 587;
            // NetworkCredential nc=new NetworkCredential();
            NetworkCredential nc = new NetworkCredential(from, pass);
            smtp.Credentials = nc;
            smtp.EnableSsl = true;
            smtp.Send(ml);
            return "Mail Send Successfully";
        }
        catch (SmtpException ex)
        {
            return "mail not send successfully.....?";
        }

    }

    public string DownloadAllDoc(string ClientName, ITClientList[] md)
    {
        string SourcePath = HttpContext.Current.Server.MapPath("/Documents/");
        string DestinationPath = HttpContext.Current.Server.MapPath("/Efi_Mitra_Documents/" + ClientName);
        string DestPath = HttpContext.Current.Server.MapPath("/Efi_Mitra_Documents/");
        
        //File.Delete(DestPath + "*");
        
        if (Directory.Exists(DestPath))
        {
            foreach (string file in Directory.GetFiles(DestPath))
            {
                File.Delete(file);
            }
            //Directory.Delete(DestPath);
        }

        if (!Directory.Exists(DestinationPath))
        {
            Directory.CreateDirectory(DestinationPath);
        }

        int i = md.Length;
        for (int j = 0; j < i; j++)
        {
            string Document = md[j].DocumentPath.ToString();

            string sourceFile = Path.Combine(SourcePath, Document);
            string destFile = Path.Combine(DestinationPath, Document);
            System.IO.File.Copy(sourceFile, destFile, true);
        }

        using (var zip = new ZipFile())
        {
            //zip folder(Images Folder)
            zip.AddFiles(Directory.GetFiles(DestinationPath), ClientName);
            zip.Save(DestPath + ClientName + ".zip");

            //delete unzip subfolder(Image Folder)
            string deletesubfolderpath = DestinationPath;
            Directory.Delete(deletesubfolderpath, true);
        }
        return ClientName + ".zip";       
    }

    public string DownloadAllGSTPDoc(string ClientName, GSTRegistrationList[] md)
    {
        string SourcePath = HttpContext.Current.Server.MapPath("/Documents/");
        string DestinationPath = HttpContext.Current.Server.MapPath("/Efi_Mitra_Documents/" + ClientName);
        string DestPath = HttpContext.Current.Server.MapPath("/Efi_Mitra_Documents/");

        //File.Delete(DestPath + "*");

        if (Directory.Exists(DestPath))
        {
            foreach (string file in Directory.GetFiles(DestPath))
            {
                File.Delete(file);
            }
            //Directory.Delete(DestPath);
        }

        if (!Directory.Exists(DestinationPath))
        {
            Directory.CreateDirectory(DestinationPath);
        }

        int i = md.Length;
        for (int j = 0; j < i; j++)
        {
            if (md[j].PhotoPath.ToString() != "")
            {
                CopyPhotos(SourcePath, DestinationPath, md[j].PhotoPath.ToString());
            }
            if (md[j].EleOfficePath.ToString() != "")
            {
                CopyPhotos(SourcePath, DestinationPath, md[j].EleOfficePath.ToString());
            }
            if (md[j].PanCardPath.ToString() != "")
            {
                CopyPhotos(SourcePath, DestinationPath, md[j].PanCardPath.ToString());
            } 
            if (md[j].AadharPath.ToString() != "")
            {
                CopyPhotos(SourcePath, DestinationPath, md[j].AadharPath.ToString());
            }
            if (md[j].ShopAct_NOCPath.ToString() != "")
            {
                CopyPhotos(SourcePath, DestinationPath, md[j].ShopAct_NOCPath.ToString());
            }
            if (md[j].EleHomePath.ToString() != "")
            {
                CopyPhotos(SourcePath, DestinationPath, md[j].EleHomePath.ToString());
            }
            if (md[j].BankStatementPath.ToString() != "")
            {
                CopyPhotos(SourcePath, DestinationPath, md[j].BankStatementPath.ToString());
            } 
            if (md[j].CancelChequePath.ToString() != "")
            {
                CopyPhotos(SourcePath, DestinationPath, md[j].CancelChequePath.ToString());
            } 
            if (md[j].PartnerShipPath.ToString() != "")
            {
                CopyPhotos(SourcePath, DestinationPath, md[j].PartnerShipPath.ToString());
            } 
            if (md[j].OtherPath.ToString() != "")
            {
                CopyPhotos(SourcePath, DestinationPath, md[j].OtherPath.ToString());
            }   
        }

        using (var zip = new ZipFile())
        {
            //zip folder(Images Folder)
            zip.AddFiles(Directory.GetFiles(DestinationPath), ClientName);
            zip.Save(DestPath + ClientName + ".zip");

            //delete unzip subfolder(Image Folder)
            string deletesubfolderpath = DestinationPath;
            Directory.Delete(deletesubfolderpath, true);
        }
        return ClientName + ".zip";
    }


    public void CopyPhotos(string SourcePath, string DestinationPath, string Document)
    {
        string sourceFile = Path.Combine(SourcePath, Document);
        string destFile = Path.Combine(DestinationPath, Document);
        System.IO.File.Copy(sourceFile, destFile, true);
        
    }
}