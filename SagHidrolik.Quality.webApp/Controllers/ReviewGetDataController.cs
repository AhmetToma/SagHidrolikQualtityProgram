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

        public JsonResult SaveReviewDetalis([FromBody]ReviewViewModel reviewViewModel)
        {
            var model = ReviewData.SaveReviewDetalis(reviewViewModel);
            return Json("");
        }


        public JsonResult DeleteDocument([FromQuery]int docId)
        {
            var model = ReviewData.DeleteDocument(docId).Result;
            return Json(model);
        }

        public JsonResult AddDocument([FromBody]DocumnetViewModel documentModel)
        {
            var model = ReviewData.AddDocument(documentModel).Result;
            return Json(model);
        }

        public JsonResult DeleteAction([FromQuery] int  actionId)
        {
            var model = ReviewData.DeleteAction(actionId).Result;
            return Json(model);
        }

        public JsonResult AddAction([FromBody]ActionListViewModel actionListViewModel )
        {
            var model = ReviewData.AddAction(actionListViewModel).Result;
            return Json(model);
        }
        public JsonResult UpdateAction([FromBody]ActionListViewModel actionListViewModel)
        {
            var model = ReviewData.UpdateAction(actionListViewModel).Result;
            return Json(model);
        }

        public JsonResult AddDocumentControl([FromBody]DocumentControlViewModel dc)
        {
            var model = ReviewData.AddDocumentControl(dc).Result;
            return Json(model);
        }

        public JsonResult DeleteDocumentControl(int docConId)
        {
            var model = ReviewData.DeleteDocumentControl(docConId).Result;
            return Json(model);
        }

        public JsonResult UpdateDocumentControl([FromBody] DocumentControlViewModel dc)
        {
            var model = ReviewData.UpdateDocumentControl(dc).Result;
            return Json(model);
        }

    }
}