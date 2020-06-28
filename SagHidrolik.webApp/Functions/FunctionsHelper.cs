
namespace SagHidrolik.webApp.Functions
{
    public static class FunctionsHelper
    {
        public static string GetMimeTypeByWindowsRegistry(string fileNameOrExtension)
        {
            string mimeType = "application/unknown";
            string ext = (fileNameOrExtension.Contains(".")) ? System.IO.Path.GetExtension(fileNameOrExtension).ToLower() : "." + fileNameOrExtension;
            Microsoft.Win32.RegistryKey regKey = Microsoft.Win32.Registry.ClassesRoot.OpenSubKey(ext);
            if (regKey != null && regKey.GetValue("Content Type") != null) mimeType = regKey.GetValue("Content Type").ToString();
            return mimeType;
        }

        public  static string GetUserNameFromEmail (string email)
        {
            int indexOfAt = email.IndexOf('@');
            string userName = email.Substring(0, indexOfAt);
            return userName;
        }
            
    }
}
