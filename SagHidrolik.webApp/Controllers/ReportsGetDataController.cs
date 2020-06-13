using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mime;
using System.Text.Json;
using System.Threading.Tasks;
using ClosedXML.Excel;
using Magnum.FileSystem;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using SagHidrolik.Models.ViewModesl;
using SagHidrolik.Quality.DataAccesslayer.Reports;

namespace SagHidrolik.webApp.Controllers
{
    public class ReportsGetDataController : Controller
    {
        #region production Report
        public JsonResult GetProcutionReport([FromBody]RequestQuery requestQuery)
        {
            var list = ReportsData.GetProcutionReport(requestQuery).Result;
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

        public JsonResult DeleteProcessplan([FromQuery]int id)
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


        public IActionResult ExportToExcel([FromBody] List<Object> list)
        {



            // keys
            var zzz = JsonSerializer.Serialize<object>(list.ElementAt(0));
            JObject jsonObj = JObject.Parse(zzz.ToString());
            Dictionary<string, string> dictObj = jsonObj.ToObject<Dictionary<string, string>>();
            List<string> keys = new List<string>();
            foreach (var item in dictObj)
            {

                keys.Add(item.Key.ToString());
            }
            var workbook = new XLWorkbook();
            IXLWorksheet worksheet = workbook.Worksheets.Add("Users");
            //headers
            for (int i = 0; i < keys.Count(); i++)
            {
                worksheet.Cell(1, i + 1).Value = keys.ElementAt(i);
            }
            foreach (var item in list)
            {

                var one = JsonSerializer.Serialize<object>(item);
                JObject two = JObject.Parse(one.ToString());
                Dictionary<string, string> three = jsonObj.ToObject<Dictionary<string, string>>();

                for (int i = 0; i <three.Count; i++)
                {

                    for (int j = 0; j < keys.Count; j++)
                    {
            
                        worksheet.Cell(i + 1, j + 1).Value = three.ElementAt(j).Value;
                        int zz = 4;

                    }
                }
            }

            using (var stream = new MemoryStream())
            {
                workbook.SaveAs(stream);
                System.IO.Stream spreadsheetStream = new System.IO.MemoryStream();
                var content = stream.ToArray();
                spreadsheetStream.Position = 0;
                return new FileStreamResult(spreadsheetStream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") { FileDownloadName = "users.xlsx" };

            }
        }
        public ActionResult XLSX()
        {
            System.IO.Stream spreadsheetStream = new System.IO.MemoryStream();
            XLWorkbook workbook = new XLWorkbook();
            IXLWorksheet worksheet = workbook.Worksheets.Add("example");
            worksheet.Cell(1, 1).SetValue("example");
            workbook.SaveAs(spreadsheetStream);
            spreadsheetStream.Position = 0;

            return new FileStreamResult(spreadsheetStream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") { FileDownloadName = "example.xlsx" };
        }

    }
 
}
