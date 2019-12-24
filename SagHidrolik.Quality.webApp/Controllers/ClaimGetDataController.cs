using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SagHidrolik.Quality.DataAccesslayer.SetUp;
using SagHidrolik.Quality.Models.ViewModesl;

namespace SagHidrolik.Quality.webApp.Controllers
{
    public class ClaimGetDataController : Controller
    {
        public JsonResult GetAllClaim([FromBody] RequestQuery requestQuery)
        {
            var list = ClaimData.GetAllClaim(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GetAllClaimCount()
        {
            RequestQuery requestQuery = new RequestQuery()
            {
                pageNumber = 1,
                pageSize = 10
            };
            var list = ClaimData.GetAllClaimCount().Result;
            return Json(list);
        }
        public JsonResult AddClaimType([FromBody] ClaimTypeViewModel claimTypeViewModel)
        {
          var count= ClaimData.AddClaimType(claimTypeViewModel).Result;
            return Json(count);
        }
        public JsonResult DeleteClaimType(int claimId)
        {
            var count = ClaimData.DeleteClaimType(claimId).Result;
            return Json(count);
        }
        public JsonResult UpdateClaimType([FromBody] ClaimTypeViewModel claimTypeViewModel)
        {
            var count = ClaimData.UpdateClaimType(claimTypeViewModel).Result;
            return Json(count);
        }
    }
}