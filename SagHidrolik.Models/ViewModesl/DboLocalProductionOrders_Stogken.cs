using System;
using System.Collections.Generic;
using System.Text;

namespace SagHidrolik.ViewModels
{
    public class DboLocalProductionOrders_Stogken
    {

        public int ProductOrderID { get; set; }
        public string STK { get; set; }
        public int Status { get; set; }
        public string IssueDate { get; set; }
        public int remainQty { get; set; }

    }


}
