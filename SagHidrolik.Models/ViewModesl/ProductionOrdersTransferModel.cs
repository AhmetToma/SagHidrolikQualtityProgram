using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SagHidrolik.Models.ViewModesl
{
    public class ProductionOrdersTransferModel
    {
        public string PartNo { get; set; }
        public string Stk { get; set; }
        public int Qty { get; set; }
        public string IssueDate { get; set; }
        public string RequireDate { get; set; }
        public string Remark { get; set; }
        public string Control { get; set; }
    }
}
