using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SagHidrolik.DataAccesslayer.Bakim;
using SagHidrolik.DataAccessLayer.SagHidrolik.DataAccesslayer.Bakim;
using SagHidrolik.Models.ViewModesl;

namespace SagHidrolik.webApp.Controllers
{
    [Authorize]
    public class BakimArizaConController : Controller
    {

        #region Bakim Ariza
        public JsonResult GetAllMachine([FromBody] RequestQuery requestQuery)
        {
            var list = BakimArizaData.GetAllMachine(requestQuery).Result;
            return Json(list);
        }

        public JsonResult GetAllMachineCount()
        {
            return Json(BakimArizaData.GetAllMachineCount().Result);
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

        #endregion

        #region Bakim ozeti
        public JsonResult GetBakimKayitByMakineID([FromQuery]int makineId )
        {
            var list = BakimOzetiData.GetBakimKayitByMakineID(makineId).Result;
            return Json(list);
        }
        #endregion
    }
}