using System;
using System.Collections.Generic;
using System.Text;

namespace SagHidrolik.Models.ViewModesl
{
    public  class BakimPlanlamaModel
    {
        public int machineId { get; set; }
        public int plananaBakimici { get; set; }
        public string plananIslemler { get; set; }
        public string tarih { get; set; }
        public int periodu { get; set; }

    }
}
