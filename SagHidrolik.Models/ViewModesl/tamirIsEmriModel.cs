using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SagHidrolik.Models.ViewModesl
{
    public class tamirIsEmriModel
    {
        public string stk { get; set; }
        public string lotNo { get; set; }
        public string p_id { get; set; }
        public string tamirMiktari { get; set; }
        public string tarih { get; set; }
        public TamirViewModel tamir1 { get; set; }
        public TamirViewModel tamir2 { get; set; }
        public TamirViewModel tamir3 { get; set; }
        public TamirViewModel tamir4 { get; set; }
        public TamirViewModel tamir5 { get; set; }
        public TamirViewModel tamir6 { get; set; }

    }
}
