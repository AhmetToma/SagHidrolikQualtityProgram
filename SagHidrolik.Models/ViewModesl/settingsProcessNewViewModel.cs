using System;
using System.Collections.Generic;
using System.Text;

namespace SagHidrolik.Models.ViewModesl
{
   public class settingsProcessNewViewModel
    {
        public int processNo { get; set; }
        public int? ProcessID { get; set; }
        public string processAdi { get; set; }
        public string processName { get; set; }

        public string group { get; set; }
        public int processDay { get; set; }
        public int manHour { get; set; }
    }
}
