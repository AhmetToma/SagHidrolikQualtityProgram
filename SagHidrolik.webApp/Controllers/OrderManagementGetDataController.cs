using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SagHidrolik.DataAccesslayer.OrdersManagement;
using SagHidrolik.Models.ViewModesl;
namespace SagHidrolik.webApp.Controllers
{
    public class OrderManagementGetDataController : Controller
    {
        public JsonResult GetOrderDetails([FromBody]RequestQuery requestQuery)
        {
            var list = OrderManagementData.GetOrderDetails(requestQuery).Result;
            return Json(list);
        }

        public JsonResult GetInProgress()
        {
            var list = OrderManagementData.GetInProgress().Result;
            list = list.GroupBy(x => x.PartNo_ID).Select(g => new InProgresViewModel { PartNo_ID = g.First().PartNo_ID, total = g.Sum(s => s.total), STK = g.First().STK }).ToList();
            return Json(list);
        }

        public JsonResult GetComponentOrders([FromBody]RequestQuery requestQuery)
        {
            var list = OrderManagementData.GetComponentOrders(requestQuery).Result;
            return Json(list);
        }

        public JsonResult GetCustomerOrders([FromBody]RequestQuery requestQuery)
        {
            var list = OrderManagementData.GetCustomerOrders(requestQuery).Result;
            return Json(list);
        }
    }
}