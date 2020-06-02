using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SagHidrolik.DataAccessLayer.ProductionOrdersTransfer;
using SagHidrolik.Models.ViewModesl;

namespace SagHidrolik.webApp.Controllers
{
    public class ProductionOrderTranferGetDataController : Controller
    {
        public IActionResult GetProductionOrdersTransfer([FromBody] RequestQuery requestQuery)
        {
            var list = ProductionOrdersTransferData.GetProductionOrdersTransfer(requestQuery).Result;
            return Json(list);
        }
        public IActionResult GetprocutionOrdersTranferCount()
        {
            var count = ProductionOrdersTransferData.GetprocutionOrdersTranferCount().Result;
            return Json(count);
        }

        public IActionResult DeleteFromTranferWo([FromQuery]string partNo)
        {
            var count = ProductionOrdersTransferData.DeleteFromTranferWo(partNo).Result;
            return Json(count);
        }
        public IActionResult DeleteAllTranferWo()
        {
            var count = ProductionOrdersTransferData.DeleteAllTranferWo().Result;
            return Json(count);
        }

        public IActionResult TrnasferToSystem()
        {
            var message = ProductionOrdersTransferData.TrnasferToSystem().Result;
            return Json(message);
        }
    }
}