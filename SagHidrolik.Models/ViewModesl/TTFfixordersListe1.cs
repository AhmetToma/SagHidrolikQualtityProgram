using System;
using System.Collections.Generic;
using System.Text;

namespace SagHidrolik.Models.ViewModesl
{
    public class TTFfixordersListe1
    {

        public string Location { get; set; }
        public   string PartNo { get; set; }
        public string RequireDate { get; set; }
        public int RequireQTY { get; set; }
        public float TotalStock { get; set; }
        public int Balance { get; set; }
        public int WOLot { get; set; }
        public string WONewDate { get; set; }
        public int LotQty { get; set; }
        public int BomLevel { get; set; }
        public long WOPlanned { get; set; }
    }

}
