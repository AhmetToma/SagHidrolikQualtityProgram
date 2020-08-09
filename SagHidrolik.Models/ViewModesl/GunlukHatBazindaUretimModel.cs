using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SagHidrolik.Models.ViewModesl
{
    public class GunlukHatBazindaUretimModel
    {
        public string  STK { get; set; }
        public string FinishTime { get; set; }
        public string ProsesAdi { get; set; }
        public string PartNo_ID { get; set; }
        public string Total { get; set; }
        public string Operator_Name { get; set; }
        public string Start_time { get; set; }
        public string Np_time { get; set; }
        public int? Ok_Qty { get; set; }
        public string Machine_no { get; set; }
        public int? FlowDetailsId { get; set; }

    }
}
