using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SagHidrolik.Quality.DataAccesslayer.SetUp;
using SagHidrolik.Quality.Models.ViewModesl;

namespace SagHidrolik.Quality.webApp.Controllers
{
    public class CompanyGetDataController : Controller
    {
        public JsonResult GetAllCompany([FromBody] RequestQuery requestQuery)
        {
            var list = CompanyData.GetAllCompany(requestQuery).Result;
            return Json(list);
        }
    }
}