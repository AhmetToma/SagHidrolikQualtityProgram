using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SagHidrolik.Quality.DataAccesslayer.SetUp;
using SagHidrolik.Quality.Models.ViewModesl;

namespace SagHidrolik.Quality.webApp.Controllers
{
    public class SetupGetDataController : Controller
    {
        public JsonResult GetAllClaim([FromBody] RequestQuery requestQuery)
        {
            var list = SetUpGetData.GetAllClaim(requestQuery).Result;
            return Json(list);
        }

        public JsonResult GetAllClaimCount()
        {
            RequestQuery requestQuery = new RequestQuery()
            {
                pageNumber = 1,
                pageSize = 10
            };
            var list = SetUpGetData.GetAllClaimCount().Result;
            return Json(list);
        }


        public JsonResult AddClaimType([FromBody] ClaimTypeViewModel claimTypeViewModel)
        {
          var count= SetUpGetData.AddClaimType(claimTypeViewModel).Result;
            return Json(count);
        }
    }
}