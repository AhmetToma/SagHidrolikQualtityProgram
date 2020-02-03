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
        public string TypeNameTr { get; set; }

        public string NonConformity { get; set; }
        public string NC_OpenDate { get; set; }
        public string Nc_desc2 { get; set; }

        public string NC_CloseDate { get; set; }
        public int Repetitive { get; set; }
        public int CorrectiveAction { get; set; }
        public int PreventativeAction { get; set; }
        public int ProcessId { get; set; }
        public string processName { get; set; }


        public int responsibleId { get; set; }
        public string resbonsibleName { get; set; }
        public string NC_Id_Def { get; set; }

        public int OpenById { get; set; }
        public string OpenByName { get; set; }
        public string STK { get; set; }

        public int NC_Status { get; set; }
        public int qty { get; set; }
        public string NC_RootCauseAnalysis { get; set; }

        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public string CompanyType { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public string DepatrmentTr { get; set; }

    }
}
