using System;
using System.Collections.Generic;
using System.Text;

namespace SagHidrolik.Models.ViewModesl
{
    public class makinelerViewModel
    {
        public string machineNo { get; set; }
        public string machineAdi { get; set; }
        public string model { get; set; }
        public string bolum { get; set; }
        public string uretici { get; set; }
        public string yil { get; set; }
        public string elec { get; set; }
        public int? guc { get; set; }
        public string birim { get; set; }
        public string YetkiliServis { get; set; }
        public int planliBakim { get; set; }
        public int aktif { get; set; }
        public int uretimMakinesi { get; set; }
        public int? machineId { get; set; }
    }
}
