using System;
using System.Collections.Generic;
using System.Text;

namespace SagHidrolik.Models.ViewModesl
{
   public class BakimArizaGirisiModel
    {
        public string Makina_ID { get; set; }
        public string Tamamlanma { get; set; }
        public string planlanaIslem { get; set; }
        public int BakimTipi { get; set; }
        public string Machine_Name { get; set; }
        public string Machine_no { get; set; }
        public string BaslamaSaat { get; set; }
        public string BitisSaat { get; set; }
        public int BakimTalepEden { get; set; }
        public int Bakim_ID { get; set; }
        public string PlanlananTarih { get; set; }
    }
}
