using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SagHidrolik.Models.ViewModesl
{
    public class ProcessFlowClose
    {
        public string ID { get; set; }
        public string Flow_ID { get; set; }
        public int Operator { get; set; }
        public string Operator_Name { get; set; }
        public string Machine { get; set; }
        public string Start_time { get; set; }
        public string Finish_time { get; set; }
        public string STK { get; set; }
        public string LotNo { get; set; }
        public string PartNo_ID { get; set; }
        
        public string ProcessNo_ID { get; set; }
        public string Process_qty { get; set; }
        public string Ok_Qty { get; set; }
        public string Machine_no { get; set; }
        public string Process_reject { get; set; }
        public string Process_Rework { get; set; }
        public string ProsesAdi { get; set; }   



    }
}
