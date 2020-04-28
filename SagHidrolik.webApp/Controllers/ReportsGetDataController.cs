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
    }
}