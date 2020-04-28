using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SagHidrolik.Models.ViewModesl
{
    public class BakimArizaGecmisTaleplerModel
    {

        public string Makina_ID { get; set; }
        public string Machine_Name { get; set; }
        public string Operator_Name { get; set; }
        public string Tamamlanma { get; set; }
        public string Planlananİslem { get; set; }
        public string BakimTipi { get; set; }
        public string BaslamaSaat { get; set; }
        public string BitisSaat { get; set; }
        public string BakimiTalepEden { get; set; }
        public string Bakim_ID { get; set; }
        public string PlanlananTarih { get; set; }

    }
}
