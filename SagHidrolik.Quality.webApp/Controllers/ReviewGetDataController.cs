using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SagHidrolik.Quality.DataAccesslayer.Review;
using SagHidrolik.Quality.Models.Functions;
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

        public JsonResult GetImmediateAction(int ncId)
        {
            var model = ReviewData.GetImmediateAction(ncId).Result;
            return Json(model);
        }

        public JsonResult GetDocumnetList(int ncId)
        {
            var model = ReviewData.GetDocumnetList(ncId).Result;
            return Json(model);
        }

        public IActionResult openDocument(string documentLink)
        {
            // beim bilgisayarim   
            documentLink = documentLink.Substring(8);
            documentLink = "//10.54.8.15/" + documentLink;
            // silebilirsiniz
            documentLink = "C:/Users/ahmed/Desktop/new/connections.png";

            var stream = new FileStream(documentLink, FileMode.Open);
            var contentType = FunctionsHelper.GetMimeTypeByWindowsRegistry(documentLink);
            return File(stream, contentType);
        }

        public JsonResult GetDocumentControlList(int ncId)
        {
            var model = ReviewData.GetDocumentControlList(ncId).Result;
            return Json(model);
        }
    }
}