using System;
using System.Collections.Generic;

namespace SagHidrolik.Models.ViewModesl
{
    public partial class BomProcess
    {
        public int ProcessNoId { get; set; }
        public string PartNoId { get; set; }
        public int? SubPartNo { get; set; }
        public int? SubPartNoNext { get; set; }
        public int? OrderNo { get; set; }
        public float? Qty { get; set; }
        public string Quality { get; set; }
      public string prosesAdi { get; set; }
    }
}
