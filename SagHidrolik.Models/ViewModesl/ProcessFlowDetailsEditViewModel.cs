using System;
using System.Collections.Generic;
using System.Text;

namespace SagHidrolik.Models.ViewModesl
{
    public class ProcessFlowDetailsEditViewModel
    {
        public int flowDtailsId { get; set; }
        public string startTime { get; set; }
        public string finishTime { get; set; } = null;
        public int okQty { get; set; }
        public int machineId { get; set; }
        public int operatorId { get; set; }
        public int npTime { get; set; } = 0;
        public string npDef { get; set; } = "";
        public int defect1Qty { get; set; } = 0;
        public int defect1Name { get; set; } = 0;
        public int defect2Qty { get; set; } = 0;
        public int defect2Name { get; set; } = 0;
        public int reworkQty { get; set; } = 0;
        public int reworkName { get; set; } = 0;
        //public string inputDate { get; set; } = null;

    }
}
