using System;
using System.Collections.Generic;
using System.Text;

namespace SagHidrolik.Models.ViewModesl
{
  public  class MrpWeekLastModel
    {
        public string STK { get; set; }
        public string Week { get; set; }
        public double TotalStock { get; set; }
        public double ASSTOK { get; set; }
        public double Usage { get; set; }
        public double CalculatedStock { get; set; }
        public string P_ID { get; set; }

    }
}
