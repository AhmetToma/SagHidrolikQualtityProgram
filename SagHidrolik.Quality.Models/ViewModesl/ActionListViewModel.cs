using System;
using System.Collections.Generic;
using System.Text;

namespace SagHidrolik.Quality.Models.ViewModesl
{
    public   class ActionListViewModel
    {
        public int? ACTN_ID { get; set; }
        public int? NC_ID { get; set; }
        public int? Action_Type { get; set; }
        public string Actin_Def { get; set; }
        public int ResponsibleId { get; set; }
        public string ResposibleName { get; set; }
        public string TargetDate { get; set; }
        public string CloseDate { get; set; }
        public bool? Status { get; set; }

    }
}
