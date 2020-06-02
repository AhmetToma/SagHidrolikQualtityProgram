using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SagHidrolik.Models.ViewModesl
{
    public class ProductionStatusViewModel
    {

        public int ProductionSheet { get; set; }
        public int Qty { get; set; }
        public string InputDate { get; set; }
        public int Process_ID { get; set; }
        public string ProsesAdi { get; set; }
        public string PartNo_ID { get; set; }
        public string Stk { get; set; }
        public int LotNo { get; set; }

    }
}
