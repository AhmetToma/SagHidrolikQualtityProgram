using System;
using System.Collections.Generic;
using System.Text;

namespace SagHidrolik.Models.ViewModesl
{
    public  class BakimGirisiModel
    {
        public int machine_Id { get; set; }
        public string Tarih { get; set; }
        public int BakimTipi { get; set; }
        public int BakimYapan { get; set; }
        public string BaslamaSaat { get; set; }
        public string BitisSaat { get; set; }
        public string ArizaTanimi { get; set; }
        public string YapilanIslem { get; set; }
    }
}
