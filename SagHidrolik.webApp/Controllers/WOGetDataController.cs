using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SagHidrolik.DataAccesslayer.Wo;
using SagHidrolik.Models.ViewModesl;

namespace SagHidrolik.webApp.Controllers
{
    public class WOGetDataController : Controller
    {
        public IActionResult GetAllProductionOrders([FromBody] RequestQuery requestQuery)
        {
            var list = AllWOData.GetAllProductionOrders(requestQuery).Result;
            return Json(list);
        }

        public IActionResult GetprocutionOrdersCount()
        {
            var count = AllWOData.GetprocutionOrdersCount().Result;
            return Json(count);
        }

        public IActionResult DeleteWo([FromBody]int[] arr)
        {
            var message = AllWOData.DeleteWo(arr).Result;
            return Json(message);
        }

        public IActionResult AddNewWorkOrder([FromBody] ProductOrderViewModel productOrderModel)
        {
            var model = AllWOData.AddNewWorkOrder(productOrderModel).Result;
            return Json(model);
        }

        public IActionResult GetBomProcessForPrint(string partNoId)
        {
            var list = AllWOData.GetBomProcessForPrint(partNoId).Result;
            return Json(list);
        }
        public IActionResult GetTStokReceteForPrint(string stk)
        {
            var list = AllWOData.GetTStokReceteForPrint(stk).Result;
            return Json(list);
        }

        #region
        public IActionResult TrnasferWoToSystem([FromBody]List<TrnasferWoToSystemViewModel> list)
        {

            if(list.Count<=0)
                return Json("empty");
      
            else
            {
                var message = AllWOData.TrnasferWoToSystem(list).Result;
                return Json(message);
            }
        
        }
        #endregion
    }
}