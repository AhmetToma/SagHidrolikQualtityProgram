using System;
using System.Collections.Generic;
using System.Text;

namespace SagHidrolik.Models.ViewModesl
{
  public  class processFlowEditViewModel
    {

        public int flowId { get; set; }
        public int okQty { get; set; }
        public int orderNo { get; set; }
        public int processNo { get; set; }
        public int processQty { get; set; }
        public int productOrderId { get; set; }
        public int reject { get; set; }
        public int rework { get; set; }
    }
}
