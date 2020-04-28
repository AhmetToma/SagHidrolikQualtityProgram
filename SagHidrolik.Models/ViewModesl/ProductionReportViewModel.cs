using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SagHidrolik.Models.ViewModesl
{
   public  class ProductionReportViewModel
    {

        [Column("finishTime")]
        public string FinishTime { get; set; }

        [Column("[02_Büküm]")]
        public int Bukum { get; set; }
        [Column("[01_Kesim]")]
        public int Kesim { get; set; }
        [Column("[04_Kaynak]")]
        public int Kaynak { get; set; }
        [Column("total")]
        public int total { get; set; }



    }
}
