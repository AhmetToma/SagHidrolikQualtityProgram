using System;
using System.Collections.Generic;

namespace SagHidrolik.Models.ViewModesl
{
    public partial class DboLocalProductionOrders
    {
        public int? ProductOrderId { get; set; }
        public int? PartNo { get; set; }
        public string PartNoId { get; set; }
        public string PartNo_ID { get; set; }
        public int? LotNo { get; set; }
        public int? Qty { get; set; }
        public int? Completed_Qty { get; set; }
        public string IssueDate { get; set; }
        public string RequireDate { get; set; }
        public bool? Printed { get; set; }
        public int? Status { get; set; }
        public  string RevisedDate { get; set; }
        public string Remark { get; set; }
        public string CloseDate { get; set; }
        public  string Stk { get; set; }
        public  string DosyaUrl { get; set; }


    }
}
