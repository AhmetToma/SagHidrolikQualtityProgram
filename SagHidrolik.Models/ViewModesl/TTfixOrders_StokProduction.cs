using System;
using System.Collections.Generic;
using System.Text;

namespace SagHidrolik.Models.ViewModesl
{
    public class TTfixOrders_StokProduction
    {

        public string PartNo { get; set; }
        public string RequireDate { get; set; }
        public int RequireQTY { get; set; }
        public int TotalStock { get; set; }
        public int TUR { get; set; }
        public int Balance { get; set; }
    }
}
