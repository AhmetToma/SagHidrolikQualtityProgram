using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SagHidrolik.DataAccesslayer.Etiketler;
using SagHidrolik.Models.ViewModesl;

namespace SagHidrolik.webApp.Controllers
{
    public class EtiketlerGetDataController : Controller
    {
        #region Giris Kontrol
        public JsonResult GetGirisKontrol([FromBody]RequestQuery requestQuery)
        {
            var list = GiriskontrolData.GetGirisKontrol(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GetGirisKontrolCount()
        {
            int count = GiriskontrolData.GetGirisKontrolCount().Result;
            return Json(count);
        }

        public JsonResult UpdateKaliteKodu([FromBody] kaliteKoduModel kaliteKoduModel)
        {
            string kaliteKodu = GiriskontrolData.UpdateKaliteKodu(kaliteKoduModel).Result;
            return Json(kaliteKodu);
        }

        public JsonResult DeleteKaliteKodu([FromQuery]int irsRef, [FromQuery] string stk)
        {
            var list = GiriskontrolData.DeleteKaliteKodu(irsRef, stk).Result;
            return Json(list);
        }
        #endregion


        public IActionResult GetSevkiyetKutuEtiketiList([FromBody] RequestQuery requestQuery)
        {
            var list = SekiyetKutuEtiketData.GetSevkiyetKutuEtiketiList(requestQuery).Result;
            return Json(list);
        }


        public JsonResult GetAllStokEtiketi([FromBody] RequestQuery requestQuery)
        {
            var list = StokEtiketiData.GetAllStokEtiketi(requestQuery).Result;
            return Json(list);
        }

        public JsonResult GetGirisKabulEtiketiList([FromBody] RequestQuery requestQuery)
        {
            var list = GirisKabulEtiketiGetData.GirisKabulEtiketiList(requestQuery).Result;
            return Json(list);
        }

    
    }
}