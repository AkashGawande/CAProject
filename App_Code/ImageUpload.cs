using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.IO;
using System.Drawing;
/// <summary>
/// Summary description for ImageUpload
/// </summary>
public class ImageUpload
{
	public ImageUpload()
	{
		//
        // TODO: Add constructor logic here  
		//
	}
    //---------------------------------Start Image Upload Code------------------------------
    public bool UploadFile(string dataURL, string fileName)
    {
        string directoryPath = HttpContext.Current.Server.MapPath("~/Documents/");
        try
        {

            if (!Directory.Exists(directoryPath))
            {

                Directory.CreateDirectory(directoryPath);

            }
            byte[] byteBuffer = Convert.FromBase64String(dataURL.Split(',')[1].ToString());

            using (MemoryStream ms = new MemoryStream(byteBuffer))
            {
                using (FileStream bm2 = new FileStream(HttpContext.Current.Server.MapPath("~/Documents/") + fileName, FileMode.Create))
                {
                    ms.WriteTo(bm2);
                    ms.Close();
                    bm2.Close();
                    bm2.Dispose();
                }
            }

            return true;


        }
        catch (Exception ex)
        {

            return false;
        }

    }
    //public bool UploadFile(string dataURL, string fileName)
    //{
    //    string directoryPath = HttpContext.Current.Server.MapPath("~/Documents/");
    //    try
    //    {

    //        if (!Directory.Exists(directoryPath))
    //        {

    //            Directory.CreateDirectory(directoryPath);

    //        }
    //        byte[] byteBuffer = Convert.FromBase64String(dataURL.Split(',')[1].ToString());

    //        using (MemoryStream ms = new MemoryStream(byteBuffer))
    //        {
    //            using (Bitmap bm2 = new Bitmap(ms))
    //            {
    //                bm2.Save(HttpContext.Current.Server.MapPath("~/Documents/" + fileName));
    //            }
    //        }

    //        return true;


    //    }
    //    catch (Exception ex)
    //    {

    //        return false;
    //    }

   // }
    //---------------------------------End Image Upload Code------------------------------



    //---------------------------------Start User Profile Image Upload Code------------------------------
    public bool UserPhoto(string dataURL, string fileName)
    {
        string directoryPath = HttpContext.Current.Server.MapPath("~/ProfilePhoto/");
        try
        {

            if (!Directory.Exists(directoryPath))
            {

                Directory.CreateDirectory(directoryPath);

            }
            byte[] byteBuffer = Convert.FromBase64String(dataURL.Split(',')[1].ToString());

            using (MemoryStream ms = new MemoryStream(byteBuffer))
            {
                using (FileStream bm2 = new FileStream(HttpContext.Current.Server.MapPath("~/ProfilePhoto/") + fileName, FileMode.Create))
                {
                    ms.WriteTo(bm2);
                    ms.Close();
                    bm2.Close();
                    bm2.Dispose();
                }
            }

            return true;


        }
        catch (Exception ex)
        {

            return false;
        }

    }


    //---------------------------------End User Profile Image Upload Code------------------------------



    //----------------Start Changing Photo Name----------------------------------
    public string changePhotoName(string filename,string NewFileName)
    {
        string file = Path.GetFileNameWithoutExtension(filename);
        string ext = Path.GetExtension(filename);
        string NewUserPhotoName = filename.Replace(file, NewFileName);

        return NewUserPhotoName;
    }
    //----------------End Changing Photo Name----------------------------------



    // public bool UploadFile1(string dataURL, string fileName)
    //{
    //    string directoryPath = HttpContext.Current.Server.MapPath("~/Documents/");
    //    try
    //    {

    //        if (!Directory.Exists(directoryPath))
    //        {

    //            Directory.CreateDirectory(directoryPath);

    //        }
    //        byte[] byteBuffer = Convert.FromBase64String(dataURL.Split(',')[1].ToString());

    //        using (MemoryStream ms = new MemoryStream(byteBuffer))
    //        {
    //            using (FileStream bm2 = new FileStream(HttpContext.Current.Server.MapPath("~/Documents/") + fileName,FileMode.Create))
    //            {
    //                ms.WriteTo(bm2);
    //                ms.Close();
    //                bm2.Close();
    //                bm2.Dispose();
    //            }
    //        }

    //        return true;


    //    }
    //    catch (Exception ex)
    //    {

    //        return false;
    //    }

    //}


}