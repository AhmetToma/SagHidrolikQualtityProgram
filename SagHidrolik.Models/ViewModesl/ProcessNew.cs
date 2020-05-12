using System;
using System.Collections.Generic;

namespace SagHidrolik.Models.ViewModesl
{
    public partial class ProcessNew
    {
        public int? ProcessId { get; set; }
        public int? ProcessNo { get; set; }
        public string ProsesAdi { get; set; }
        public string ProcessName { get; set; }
        public float? ProsessDay { get; set; }
        public float? Manhour { get; set; }
        public string Group { get; set; }
        public string FieldA { get; set; }
        public int? FieldB { get; set; }
    }
}
