using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SagHidrolik.DataAccesslayer.Bakim;
using SagHidrolik.DataAccessLayer.SagHidrolik.DataAccesslayer.Bakim;
using SagHidrolik.Models.ViewModesl;
using System.Threading.Tasks;

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

        #region  Bakim Sorumlulari

        public  JsonResult GetAllBakimSorumlulari([FromBody]RequestQuery r)
        {
            return Json( BakimSorumlulariData.GetAllBakimSorumlulari(r).Result);
        }
        public JsonResult GetAllBakimSorumlulariCount()
        {
            return Json(BakimSorumlulariData.GetAllBakimSorumlulariCount().Result);
        }

        public JsonResult DeleteBakimSorumlu(int sorumluId)
        {
            return Json(BakimSorumlulariData.DeleteBakimSorumlu(sorumluId).Result);
        }
        public JsonResult AddBakimSorumlu([FromBody]BakimSorumluModel m)
        {
            return Json(BakimSorumlulariData.AddBakimSorumlu(m).Result);
        }
        public JsonResult EditBakimSorumlu([FromBody]BakimSorumluModel m)
        {
            return Json(BakimSorumlulariData.EditBakimSorumlu(m).Result);
        }
        #endregion
    }
}