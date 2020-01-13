using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SagHidrolik.Quality.DataAccesslayer.NewNC;
using SagHidrolik.Quality.Models.ViewModesl;

namespace SagHidrolik.Quality.webApp.Controllers
{
    public class NewNcGetDataController : Controller
    {
        public JsonResult AddNewNc([FromBody]NewNcViewModel newNcViewModel)
        {
            var list = NewNcData.AddNewNc(newNcViewModel).Result;
            return Json(list);
        }
    }
}