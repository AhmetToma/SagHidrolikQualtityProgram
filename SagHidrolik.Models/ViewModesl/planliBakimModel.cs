using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SagHidrolik.Models.ViewModesl
{
   public  class planliBakimModel
    {

        [Required]
        public int machineId { get; set; }
        [Required]
        public int bakimId { get; set; }
        [Required]
        public int bakimYapan { get; set; }
        public string yapilanIslem { get; set; }
        public string tarih { get; set; }
        public int periodu { get; set; }
        public string baslamaSaat { get; set; }
        public string bitisSaat { get; set; }
        public int planananBakimici { get; set; }
        public string PlanlananIslem { get; set; }
    }

}
