using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SagHidrolik.Models.ViewModesl
{
    public class ProcessFlowViewModel
    {
        public string ProsesAdi { get; set; }
        public string Flow_ID { get; set; }
        public string PartNo_ID { get; set; }


        public string ProductOrder_ID { get; set; }
        public string ProcessNo_ID { get; set; }
        public string Miktar { get; set; }
        public string Require_Date { get; set; }
        public string Status { get; set; }
        public string STK { get; set; }
        public string LotNo { get; set; }
        public string P_ID { get; set; }
        public string ProcessNo_next { get; set; }
        public virtual ICollection<ProcessFlowViewModel> ProcessFlowViewModelList { get; set; }
    }
}
