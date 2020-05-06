using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SagHidrolik.Models.ViewModesl;
using SagHidrolik.Quality.DataAccesslayer.Reports;

namespace SagHidrolik.webApp.Controllers
{
    public class ReportsGetDataController : Controller
    {
        #region production Report
        public JsonResult GetProcutionReport([FromBody]RequestQuery requestQuery)
        {
            var list =   ReportsData.GetProcutionReport(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GetProcutionReportCount()
        {
            var list = ReportsData.GetProcutionReportCount().Result;
            int listCount = list.Count();
            return Json(listCount);
        }
        #endregion
        #region production Details Report
        public JsonResult GetProcutionDetailsReport([FromBody]RequestQuery requestQuery)
        {
            var list = ReportsData.GetProcutionDetailsReport(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GetProcutionDetailsReportCount()
        {
            int count = ReportsData.GetProcutionDetailsReportCount().Result;
            return Json(count);
        }
        #endregion


        #region  Defect
        public JsonResult GeDefectReport([FromBody]RequestQuery requestQuery)
        {
            var list = ReportsData.GeDefectReport(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GeDefectReportCount()
        {
            var list = ReportsData.GeDefectReportCount().Result;
            int listCount = list.Count();
            return Json(listCount);
        }
        #endregion
        #region  Defect Details
        public JsonResult GetDefectDetails([FromBody]RequestQuery requestQuery)
        {
            var list = ReportsData.GetDefectDetails(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GetDefectDetailsCount()
        {
            int count = ReportsData.GetDefectDetailsCount().Result;
            return Json(count);
        }
        #endregion

        #region  Rework
        public JsonResult GetReworkReport([FromBody]RequestQuery requestQuery)
        {
            var list = ReportsData.GetReworkReport(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GetReworkReportCount()
        {
            var list = ReportsData.GetReworkReportCount().Result;
            int listCount = list.Count();
            return Json(listCount);
        }
        #endregion
        #region  Rework Details Report
        public JsonResult GetReworkDetailsReport([FromBody]RequestQuery requestQuery)
        {
            var list = ReportsData.GetReworkDetailsReport(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GetReworkDetailsReportCount()
        {
            int count = ReportsData.GetReworkDetailsReportCount().Result;
            return Json(count);
        }
        #endregion

        #region  LostQty Report
        public JsonResult GetLostQtyReport([FromBody]RequestQuery requestQuery)
        {
            var list = ReportsData.GetLostQtyReport(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GetLostQtyReportCount()
        {
            int count = ReportsData.GetLostQtyReportCount().Result;
            return Json(count);
        }
        #endregion

        #region  Supplier Perf
        public JsonResult GetSupplierPerfReport([FromBody]RequestQuery requestQuery)
        {
            var list = ReportsData.GetSupplierPerfReport(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GetSupplierPerfReportCount()
        {
            int count = ReportsData.GetSupplierPerfReportCount().Result;
            return Json(count);
        }
        #endregion

        #region  Customer Perf
        public JsonResult GetCustomerperfReport([FromBody]RequestQuery requestQuery)
        {
            var list = ReportsData.GetCustomerperfReport(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GetCustomerperfReportCount()
        {
            int count = ReportsData.GetCustomerperfReportCount().Result;
            return Json(count);
        }
        #endregion


        #region  Process Plan
        public JsonResult GetProcessPlanReport([FromBody]RequestQuery requestQuery)
        {
            var list = ReportsData.GetProcessPlanReport(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GetProcessPlanReportCount()
        {
            int count = ReportsData.GetProcessPlanReportCount().Result;
            return Json(count);
        }

        public JsonResult DeleteProcessplan([FromQuery]int id )
        {
            int count = ReportsData.DeleteProcessplan(id).Result;
            return Json(count);
        }
        #endregion

        #region  Monthly Production
        public JsonResult GetMonthlyProduction([FromBody]RequestQuery requestQuery)
        {
            var list = ReportsData.GetMonthlyProduction(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GetMonthlyProductionCount()
        {
            int count = ReportsData.GetMonthlyProductionCount().Result;
            return Json(count);
        }
        #endregion

        #region  Sell Date
        public JsonResult GetSellDateReport([FromBody]RequestQuery requestQuery)
        {
            var list = ReportsData.GetSellDateReport(requestQuery).Result;
            return Json(list);
        }

        public JsonResult GetSellDateReportCount()
        {
            int count = ReportsData.GetSellDateReportCount().Result;
            return Json(count);
        }

        #endregion

    }
}