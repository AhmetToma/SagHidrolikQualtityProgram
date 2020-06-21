using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SagHidrolik.Models.ViewModesl
{
    public class BomProcessViewModel
    {
    
        public float? Qty { get; set; }
        public string Quality { get; set; }
        public string prosesAdi { get; set; }
        public int? SubPartNo { get; set; }
        public int? SubPartNoNext { get; set; }

        public int? OrderNo { get; set; }
        public string PartNo_ID { get; set; }
        public string ProcessName { get; set; }
        public string ProcessNo { get; set; }

    }
}
