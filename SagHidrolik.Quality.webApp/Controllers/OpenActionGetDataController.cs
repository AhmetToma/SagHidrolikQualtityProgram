using Microsoft.AspNetCore.Mvc;
using SagHidrolik.Quality.DataAccesslayer.OpenAction;

using SagHidrolik.Quality.Models.ViewModesl;

namespace SagHidrolik.Quality.webApp.Controllers
{
    public class OpenActionGetDataController : Controller
    {
        public JsonResult GetAllOpenAction([FromBody] RequestQuery requestQuery)
        {
            var list = OpenActionData.GetAllOpenAction(requestQuery).Result;
            return Json(list);
        }
    }
}