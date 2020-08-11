using System;
using System.Collections.Generic;
using System.Text;

namespace SagHidrolik.Models.ViewModesl
{
    public class TTFixOrdersListModel
    {
        public string Location { get; set; }
        public string PartNo { get; set; }
        public string RequireDate { get; set; }
        public int RequireQTY { get; set; }
        public double TotalStock { get; set; }
        public int Balance { get; set; }
        public int WOLot { get; set; }
        public string WONewDate { get; set; }
        public int WOLotSize { get; set; }
        public int WoPlanned { get; set; }
    }
}
