using Microsoft.AspNetCore.Mvc;
using SagHidrolik.DataAccessLayer.SagHidrolik.DataAccesslayer.BakimAriza;
using SagHidrolik.Models.ViewModesl;

namespace SagHidrolik.webApp.Controllers
{
    public class BakimArizaConController : Controller
    {
        public JsonResult GetAllMachine([FromBody] RequestQuery requestQuery)
        {
            var list = BakimArizaData.GetAllMachine(requestQuery).Result;
            return Json(list);
        }
        public JsonResult insertIntoBakimKayit([FromBody] BakimArizaModel bakimArizaModel)
        {
            var x= BakimArizaData.insertIntoBakimKayit(bakimArizaModel);
            return Json("");
        }
        public JsonResult gecmisTalepler([FromBody] RequestQuery requestQuery)
        {
            var list = BakimArizaData.GetAllGecmisTalepler(requestQuery).Result;
            return Json(list);
        }
    }
}