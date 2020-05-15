using System;
using System.Collections.Generic;
using System.Text;

namespace SagHidrolik.Models.ViewModesl
{
  public  class SettingsOperatorViewModel
    {

        public int? Operator_ID { get; set; }
        public string Operator_Name { get; set; }
        public string Bolum { get; set; }
        public string GirisTarihi { get; set; }
        public string Aktif { get; set; }
    }
}
