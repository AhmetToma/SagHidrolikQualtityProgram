using System;
using System.Collections.Generic;
using System.Linq;
using ErpSagHidrolik.DataAccessLayer.AddUpadateprocess;
using Microsoft.AspNetCore.Mvc;
using SagHidrolik.DataAccesslayer.Uretim;
using SagHidrolik.Models.ViewModesl;

namespace SagHidrolik.webApp.Controllers
{
    public class UretimDataController : Controller
    {
        #region Uretim Basla
        public IActionResult GetProcessFLowInUretim([FromBody]RequestQuery requestQuery)
        {
            var list = UretimData.GetProcessFlowInUretim(requestQuery).Result;
            return Json(list);
        }
        [HttpGet]
        public IActionResult GetAktiveOperators()
        {
            var list = UretimData.GetAktiveOperators().Result;
            return Json(list);
        }
        [HttpGet]
        public IActionResult GetAktiveMachine()
        {
            try
            {
                var list = UretimData.GetAktiveMachine().Result;
                return Json(list);
            }
            catch (Exception ex )
            {

                return Json(ex);
            }
        }
        [HttpGet]
        public IActionResult GetMachineNameByMachineNo(string machineNo)
        {
            var list = UretimData.GetMachineNameByMachineNo(machineNo).Result;
            return Json(list);
        }

        public IActionResult GetOperatorPolivalance([FromBody] OperatorPolivalanceViewModel operatorPolivalanceViewModel)
        {
            var list = UretimData.GetOperatorPolivalance(operatorPolivalanceViewModel).Result;
            return Json(list);
        }


        [HttpGet]
        public IActionResult CheckFlowIdByFinishTimeInFlowDetails(string flow_ID)
        {
            var list = UretimData.CheckFlowIdByFinishTimeInFlowDetails(flow_ID).Result;
            return Json(list);
        }

        public IActionResult StartIsEmriAndWriteToFlowDetails([FromBody]  ProcessFlowDetailsViewModel StartIsEmriAndWriteToFlowDetails)
        {
            var list = UretimData.StartIsEmriAndWriteToFlowDetails(StartIsEmriAndWriteToFlowDetails).Result;
            return Json("");
        }
        #endregion


        #region Uretim Bitir
        public IActionResult GetProcessFlowClose([FromBody]RequestQuery requestQuery)
        {
            var list = UretimData.GetProcessFlowClose(requestQuery).Result;
            return Json(list);
        }

        [HttpGet]
        public IActionResult GetFire(int Reject_ID)
        {
            var list = UretimData.GetFire(Reject_ID).Result;
            return Json(list);
        }
        public IActionResult UretimBitirConfirm([FromBody]UretimBitirViewModel uretimBitirViewModel)
        {
            var done = UretimData.UretimBitirConfirm(uretimBitirViewModel);
            return Json("");
        }

        #endregion

        #region uretim plani
        public IActionResult GetAllUretimPlani([FromBody]RequestQuery requestQuery)
        {
            var list = UretimPlaniData.GetAllUretimPlani(requestQuery).Result;
            return Json(list);
        }
        #endregion

        #region Gunluk Uretim

        public IActionResult getAllProcessInGunlukHatBazindUretim()
        {
            var list = GunlukHatBazindaUretimData.getAllProcessInGunlukHatBazindUretim().Result;
            return Json(list);
        }
        public IActionResult GetAllGunlukHatBazindUretimList([FromBody] RequestQuery requestQuery)
        {
            var list = GunlukHatBazindaUretimData.GetAllGunlukHatBazindUretimList(requestQuery).Result;
            return Json(list);
        }

        #endregion


        #region Production Summary
        public JsonResult GetProductionSummaryReport([FromBody]RequestQuery requestQuery)
        {
            var list = ProductionSummaryGetData.GetProductionSummaryReport(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GetProcutionSummaryCount()
        {
            var list = ProductionSummaryGetData.GetProcutionSummaryCount().Result;
            int listCount = list.Count();
            return Json(listCount);
        }
        #endregion

        #region Rework/tamirIsEmri

        public JsonResult GetTamirIsEmriAdimlari()
        {
            var list = TamirIsEmriGetData.GetTamirIsEmriAdimlari().Result;
            return Json(list);
        }
        public JsonResult InsertTamirIsEmri([FromBody] tamirIsEmriModel tamirIsEmriModel)
        {
            var LotNo = TamirIsEmriGetData.InsertTamirIsEmri(tamirIsEmriModel).Result;
            return Json(LotNo);
        }
        #endregion

        #region Add-Update Process

        public IActionResult GetAllBomProcessInAddOrUpdateProcess([FromBody] RequestQuery requestQuery)
        {
            var list = AddUpdateProcesssData.GetAllBomProcessInAddOrUpdateProcess(requestQuery).Result;
            return Json(list);
        }

        public IActionResult GetBomProcessTemp([FromBody] RequestQuery requestQuery)
        {
            var list = AddUpdateProcesssData.GetBomProcessTemp(requestQuery).Result;
            return Json(list);
        }

        public IActionResult CopyToBomprocessTemp([FromQuery]string pId)
        {
            var list = AddUpdateProcesssData.CopyToBomProcessTemp(pId).Result;
            return Json(list);
        }

        public IActionResult DeleteFromBomProcessTemp([FromQuery]string pId)
        {
            var list = AddUpdateProcesssData.DeleteFromBomProcessTemp(pId).Result;
            return Json(list);
        }
        public IActionResult addUpdateProceecSave([FromBody]RequestQuery request)
        {
            string message = AddUpdateProcesssData.addUpdateProceecSave(request).Result;
            return Json(message);
        }
        #endregion

        #region Process Details
        public JsonResult GetProcessFlowInProcessDetails([FromBody]RequestQuery requestQuery)
        {
            var list = ProcessDetailsData.GetProcessFlowInProcessDetails(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GetProcessFlowDetailsInProcessDetails([FromBody]RequestQuery requestQuery)
        {
            var list = ProcessDetailsData.GetProcessFlowDetailsInProcessDetails(requestQuery).Result;
            return Json(list);
        }
        #endregion

        #region production Start 

        public JsonResult GetAllProductionStatus([FromBody]RequestQuery requestQuery)
        {
            var list = ProductionStartData.GetAllProductionStatus(requestQuery).Result;
            return Json(list);
        }

        public void DeleteproductionStatus(int sheetId)
        {
            ProductionStartData.DeleteproductionStatus(sheetId);
        }


        public JsonResult AddToProductionStatus([FromQuery] string inputDate, [FromQuery] int productId, [FromQuery]int qty)
        {
            var message = ProductionStartData.AddToProductionStatus(inputDate, productId, qty).Result;
            return Json(message);
        }
        public JsonResult TransferToSystem([FromQuery]int productId)
        {
            var message = ProductionStartData.TransferToSystem(productId).Result;
            return Json(message);
        }
        #endregion

    }
}