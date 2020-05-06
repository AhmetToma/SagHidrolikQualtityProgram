using System;
using System.Collections.Generic;
using System.Text;

namespace SagHidrolik.Models.ViewModesl
{
    public class RequestQuery
    {
        public int  pageSize { get; set; }
        public int pageNumber { get; set; }
        public string companyType { get; set; }
        public string Stk { get; set; }
        public string month { get; set; }
        public string year { get; set; }
        public string pid { get; set; }
        public string lotNo { get; set; }
        public string Group { get; set; }
        public string Machine_no { get; set; }
        public string processAdi { get; set; }
        public string uretimPlaniType { get; set; }
        public string machineNo { get; set; }
    }
}
