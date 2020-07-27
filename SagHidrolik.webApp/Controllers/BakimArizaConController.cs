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

        #region Bakim Raporu
        public JsonResult GetBakimRaporu()
        {
            var list = BakimRapor.GetBakimRaporu().Result;
            return Json(list);
        }
        #endregion

        #region Bakim Ariza Kapama
        public JsonResult GetAllBakimArizaKapama([FromBody] RequestQuery requestQuery)
        {
            var list = BakimArizaKapamaData.GetAllBakimArizaKapama(requestQuery).Result;
            return Json(list);
        }

        public JsonResult KapatBakimAriza([FromBody] KapatBakimArizaModel m)
        {
            var list = BakimArizaKapamaData.KapatBakimAriza(m).Result;
            return Json(list);
        }
        #endregion

        #region Bakim Ariza Girisi
        public JsonResult InsertIntoBakimGirisi([FromBody] BakimGirisiModel m)
        {
            var list = BakimGirisiData.InsertIntoBakimGirisi(m).Result;
            return Json(list);
        }
        #endregion

        #region Bakim planlama
        public JsonResult insertIntoBakimPlanlama([FromBody] BakimPlanlamaModel m)
        {
            var list = BakimPlanlamaData.insertIntoBakimPlanlama(m).Result;
            return Json(list);
        }
        #endregion

        #region Planli Bakim Giris
        public JsonResult GetAllPlanliBakim([FromBody] RequestQuery requestQuery)
        {
            var list = PlanliBakimData.GetAllPlanliBakim(requestQuery).Result;
            return Json(list);
        }

        public JsonResult GetAllPlanliBakimCount()
        {
            return Json(PlanliBakimData.GetAllPlanliBakimCount().Result);
        }

        public JsonResult UpdatePlanliBakim([FromBody] planliBakimModel m)
        {
            var list = PlanliBakimData.UpdatePlanliBakim(m).Result;
            return Json(list);
        }
        #endregion

        #region Makineler
        public JsonResult GetAllMakineler([FromBody] RequestQuery requestQuery)
        {
            var list = MakinerlerData.GetAllMakineler(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GetAllMakinelerCount()
        {
            var list = MakinerlerData.GetAllMakinelerCount().Result;
            return Json(list);
        }
        public JsonResult DeleteMakine([FromQuery] int machineId)
        {
            var list = MakinerlerData.DeleteMakine(machineId).Result;
            return Json(list);
        }
        public JsonResult AddNewMakine([FromBody] makinelerViewModel model)
        {
            var list = MakinerlerData.AddNewMakine(model).Result;
            return Json(list);
        }
        public JsonResult UpdateMakine([FromBody] makinelerViewModel model)
        {
            var list = MakinerlerData.UpdateMakine(model).Result;
            return Json(list);
        }
        #endregion
        #region All Bakim Records
        public JsonResult GetAllBakimRecords([FromBody] RequestQuery requestQuery)
        {
            var list = AllBakimRecordsData.GetAllBakimRecords(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GetAllBakimRecordsCount()
        {
            var list = AllBakimRecordsData.GetAllBakimRecordsCount().Result;
            return Json(list);
        }

        public JsonResult DeleteFromTbleBakimKayit([FromQuery] int bakimId)
        {
            var list = AllBakimRecordsData.DeleteFromTbleBakimKayit(bakimId).Result;
            return Json(list);
        }
        #endregion
    }
}