using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SagHidrolik.DataAccesslayer.Quality.OpenAction;
using SagHidrolik.Models.ViewModesl;
namespace SagHidrolik.webApp.Controllers
{
    [Authorize]
    public class OpenActionGetDataController : Controller
    {
        public JsonResult GetAllOpenAction([FromBody] RequestQuery requestQuery)
        {
            var list = OpenActionData.GetAllOpenAction(requestQuery).Result;
            return Json(list);
        }

        public JsonResult GetAllOpenActionCount([FromBody] RequestQuery requestQuery)
        {
            var count = OpenActionData.GetAllOpenActionCount().Result;
            return Json(count);
        }
    }
}