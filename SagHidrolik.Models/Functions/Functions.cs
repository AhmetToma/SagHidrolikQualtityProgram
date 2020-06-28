using System;
using System.Collections.Generic;
using System.Text;

namespace SagHidrolik.Models.Functions
{
    public  class Functions
    {

        public static string GetUserNameFromEmail(string email)
        {
            int indexOfAt = email.IndexOf('@');
            string userName = email.Substring(0, indexOfAt);
            return userName;
        }
    }
}
