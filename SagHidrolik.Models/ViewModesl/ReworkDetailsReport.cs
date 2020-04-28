using System;
using System.Collections.Generic;
using System.Text;

namespace SagHidrolik.Models.ViewModesl
{
    public class ReworkDetailsReport
    {
      
            public DateTime FinishTime { get; set; }
            public string PartNo_ID { get; set; }
            public int ReworkQty { get; set; }
            public string ProsesAdi { get; set; }
            public string RejectName { get; set; }
            public string Stk { get; set; }
            public string finishTimeAsString { get; set; }

    }
}
