using System;
using System.Collections.Generic;
using System.Text;

namespace SagHidrolik.Models.ViewModesl
{
   public  class DocumentControlViewModel
    {

        public int ID { get; set; }
        public int NC_ID { get; set; }
        public string DocumentType { get; set; }
        public string ChangeDate { get; set; }
        public string NewRev { get; set; }
        public string Notes { get; set; }
    }
}
