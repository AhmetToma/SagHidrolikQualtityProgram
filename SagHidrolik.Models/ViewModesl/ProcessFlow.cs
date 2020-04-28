using System;
using System.Collections.Generic;

namespace SagHidrolik.Models.ViewModesl
{
    public partial class ProcessFlow
    {
        public int Flow_ID { get; set; }
        public int? ProductOrder_ID { get; set; }
        public int? ProcessNo_ID { get; set; }
        public int? Process_qty { get; set; }
        public int? Ok_Qty { get; set; }
        public int? Process_reject { get; set; }
        public int? Process_Rework { get; set; }
        public int? ProcessNoNext { get; set; }
        public string RequireDate { get; set; }
        public string ProsesAdi { get; set; }
        public int? Order_no { get; set; }
    }
}
