using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SagHidrolik.Quality.DataAccesslayer.Review;
using SagHidrolik.Quality.Models.ViewModesl;

namespace SagHidrolik.Quality.webApp.Controllers
{
    public class ReviewGetDataController : Controller
    {
        public JsonResult GetAllReview([FromBody] RequestQuery requestQuery)
        {
            var list = ReviewData.GetAllReview(requestQuery).Result;
            return Json(list);
        }

        public JsonResult GetAllReviewCount()
        {
            var list = ReviewData.GetAllReviewCount().Result;
            return Json(list);
        }

        public JsonResult GetReviewDetails(int ncId)
        {
            var model = ReviewData.GetReviewDetails(ncId).Result;
            return Json(model);
        }
        
    }
}