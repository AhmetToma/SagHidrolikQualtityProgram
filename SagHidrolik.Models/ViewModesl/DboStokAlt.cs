using System;
using System.Collections.Generic;

namespace SagHidrolik.Models.ViewModesl
{
    public partial class DboStokAlt
    {
        public int Stokref { get; set; }
        public string Stk { get; set; }
        public string Sta { get; set; }
        public string Stb { get; set; }
        public int Ref { get; set; }
        public double? Miktar { get; set; }
        public int? Brkodu { get; set; }
        public string Turac { get; set; }
        public string Aors { get; set; }
        public int Toplam { get; set; }
        

        public int? Tur { get; set; }
        public string Lotno { get; set; }
        public string P_ID { get; set; }
        public int? Deporef { get; set; }

        public double? Grmik { get; set; }
        public double? Ckmik { get; set; }
        public double? Stok { get; set; }
        public int? Iptal { get; set; }
        public DateTime Tarih { get; set; }
        public string formatedTarih { get; set; }

    }
}
