using System;
using System.Collections.Generic;
using System.Text;

namespace SagHidrolik.Models.ViewModesl
{
   public class KapatBakimArizaModel
    {
        public int bakimId { get; set; }
        public string bitisSaat { get; set; }
        public string tarih { get; set; }
        public int bakimYapan { get; set; }
        public string arizaTanim { get; set; }
        public string yapilanIslemler { get; set; }
    }

}
