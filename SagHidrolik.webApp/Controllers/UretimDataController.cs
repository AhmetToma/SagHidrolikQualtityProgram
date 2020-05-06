using System;
using System.Collections.Generic;
using System.Linq;
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
    }
}