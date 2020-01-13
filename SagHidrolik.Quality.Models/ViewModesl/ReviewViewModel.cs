using System;
using System.Collections.Generic;
using System.Text;

namespace SagHidrolik.Quality.Models.ViewModesl
{
    public class ReviewViewModel
    {

        public int NC_ID { get; set; }
        public string NC_TargetDate { get; set; }
        public  int NcTypeId { get; set; }
        public int PartNo { get; set; }
        public string TypeName { get; set; }
        public string NonConformity { get; set; }
        public string NC_OpenDate { get; set; }

        public int OperatorId { get; set; }
        public string OperatorName { get; set; }
        public int NC_Status { get; set; }
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }

    }
}
