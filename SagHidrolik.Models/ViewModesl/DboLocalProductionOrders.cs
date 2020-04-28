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
        public DateTime? IssueDate { get; set; }
        public DateTime? RequireDate { get; set; }
        public bool? Printed { get; set; }
        public int? Status { get; set; }
        public DateTime? RevisedDate { get; set; }
        public string Remark { get; set; }
        public DateTime? CloseDate { get; set; }
        public  string Stk { get; set; }
        public  string DosyaUrl { get; set; }


    }
}
