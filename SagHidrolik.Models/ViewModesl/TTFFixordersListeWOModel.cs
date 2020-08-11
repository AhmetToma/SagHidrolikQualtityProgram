using System;
using System.Collections.Generic;
using System.Text;

namespace SagHidrolik.Models.ViewModesl
{
   public  class TTFFixordersListeWOModel
    {

        public string PartNo { get; set; }
        public int WOLot { get; set; }
        public string WONewDate { get; set; }
        public int Balance { get; set; }
        public int Order_no { get; set; }
        public int ProcessNo_ID { get; set; }
        public int Qty { get; set; }
        public int Process_qty { get; set; }
        public int Ok_Qty { get; set; }
        public double ProsessDay { get; set; }
        public int Process_reject { get; set; }
        public int Process_Rework { get; set; }
        public int RemainProcessqty { get; set; }
        public string ProcessDate { get; set; }
        public int Process_Manhour { get; set; }
        public double CompleteRatio { get; set; }
        public int id { get; set; }
    }
}
