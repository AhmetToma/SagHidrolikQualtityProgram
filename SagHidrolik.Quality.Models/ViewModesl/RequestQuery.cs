using System;
using System.Collections.Generic;
using System.Text;

namespace SagHidrolik.Quality.Models.ViewModesl
{
    public class RequestQuery
    {
        public int  pageSize { get; set; }
        public int pageNumber { get; set; }
        public string companyType { get; set; }
        public string Stk { get; set; }


    }
}
