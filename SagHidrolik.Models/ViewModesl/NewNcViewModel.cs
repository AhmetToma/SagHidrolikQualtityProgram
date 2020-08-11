using System;
using System.Collections.Generic;
using System.Text;

namespace SagHidrolik.Models.ViewModesl
{
    public class NewNcViewModel
    {
        public int? ncType { get; set; }
        public int? activityType { get; set; }
        public int? customerSupplier { get; set; }
        public int? department { get; set; }
        public int? process { get; set; }
        public int? partNo { get; set; }
        public int? openBy { get; set; }
        public int? responsible { get; set; }
        public string def { get; set; }
        public string conformity { get; set; }
        public int? qty { get; set; }
        public string description { get; set; }
        public string openDate { get; set; }
        public string targetDate { get; set; }
        public string closeDate { get; set; }
    }
}
