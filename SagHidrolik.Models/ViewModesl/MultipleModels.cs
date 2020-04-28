using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SagHidrolik.Models.ViewModesl
{
    public class MultipleModels
    {
        public IEnumerable<DboStokgen> DboStokgensList { get; set; }
        public IEnumerable<DboLocalProductionOrders> DboLocalProductionOrdersList { get; set; }
        public IEnumerable<DboStokAlt> DboStokAltList { get; set; }
        public IEnumerable<DboStokAlt> Galvanize { get; set; }
        public string Stk { get; set; }
    }
}
