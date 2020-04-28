using System;
using System.Collections.Generic;
using System.Text;

namespace SagHidrolik.Models.ViewModesl
{
    public static class WorkingWithYears
    {
        public static string currentYear { get; set; }

        public static void GetcurrentYear()
        {
            //DateTime.Now.Year.ToString();
            currentYear = "2019";
        }
        public static void changeYear(string year)
        {
            currentYear = year;
        }
    }
}
