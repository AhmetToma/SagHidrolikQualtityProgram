using System;
using System.Collections.Generic;
using System.Text;

namespace SagHidrolik.Models.ViewModesl
{
    public class ProcessPlanReportViewModel
    {
        public int ID { get; set; }
        public string Group { get; set; }
        public string ProsesAdi { get; set; }
        public string ProcessDate { get; set; }
        public string PartNo { get; set; }
        public int WOLot { get; set; }
        public int RemainProcessqty { get; set; }
        public string WONewDate { get; set; }
        public int Balance { get; set; }

    }
}
