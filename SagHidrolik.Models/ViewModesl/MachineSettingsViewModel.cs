using System;
using System.Collections.Generic;
using System.Text;

namespace SagHidrolik.Models.ViewModesl
{
    public class MachineSettingsViewModel
    {
        public int Machine_Id { get; set; }
        public string Machine_no { get; set; }
        public string Machine_Name { get; set; }
        public string model { get; set; }
        public string Bolum { get; set; }
        public string Producer { get; set; }
        public string Yil { get; set; }
    }
}
