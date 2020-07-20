using System;
using System.Collections.Generic;
using System.Text;

namespace SagHidrolik.Models.ViewModesl
{
   public  class TTfixOrdersModel
    {
        public string PartNo { get; set; }
        public string Location { get; set; }
        public string RequireDate { get; set; }
        public int BomLevel { get; set; }
        public int RequireQTY { get; set; }
    }
}
