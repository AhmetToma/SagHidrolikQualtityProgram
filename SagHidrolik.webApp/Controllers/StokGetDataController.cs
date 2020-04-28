using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SagHidrolik.DataAccesslayer.Stok;
using SagHidrolik.Models.ViewModesl;
using SagHidrolik.webApp.Functions;

namespace SagHidrolik.webApp.Controllers
{
    public class StokGetDataController : Controller
    {

        RequestQuery requestQuery = new RequestQuery();
        public JsonResult GetStokByStk([FromBody]string searcedValue)
        {
            requestQuery.Stk = searcedValue;
            var list = StokReadingData.GetStokkenByStkList(requestQuery).Result;
            return Json(list);
        }

        public JsonResult GetStokkenByStkListOnlypageSize([FromBody]RequestQuery requestQuery)
        {
            var list = StokReadingData.GetStokkenByStkListOnlypageSize(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GetProductOrdersByStokgenId([FromBody]RequestQuery requstQueryForProductOrders)
        {
            // var list = stokReadingDataHelper.GetProductOrdersByStokgenId(requestQuery).Result;
            var list = StokReadingData.GetProductOrdersByStokgenId(requstQueryForProductOrders).Result;
            return Json(list);
        }
        public JsonResult GetAllStokAlt([FromBody]RequestQuery requestQuery)
        {
            var list = StokReadingData.GetAllStokAlt(requestQuery).Result;
            foreach (var item in list)
            {
                item.formatedTarih = item.Tarih.ToString("dd/MM/yyyy");
                item.Tarih.ToString("dd/MM/yyyy");
                // item.Tarih("dd/MM/yyyy");
            }
            return Json(list);
        }
        public JsonResult GetaltStokToplam(string stk)
        {
            requestQuery.Stk = stk;
            var toplam = StokReadingData.GetaltStokToplam(requestQuery).Result;
            return Json(toplam);
        }

        public JsonResult GetGalvanize([FromBody]RequestQuery requestQuery)
        {
            var list = StokReadingData.GetGalvanize(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GetproductFile([FromQuery] string pid)
        {
            var file = StokReadingData.GetproductFile(pid).Result;

            return Json(file);
        }
        public JsonResult GetStokRecetesi([FromBody]RequestQuery requestQuery)
        {
            var list = StokReadingData.GetStokRecetesi(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GetBomProcessInStok([FromBody]RequestQuery requestQuery)
        {
            var list = StokReadingData.GetBomProcessInStok(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GetProcessFlowInStok([FromBody]RequestQuery requestQuery)
        {
            var list = StokReadingData.GetProcessFlowInStok(requestQuery).Result;
            return Json(list);
        }

        public JsonResult GetCurrentYear()
        {

            var currentYear = WorkingWithYears.currentYear;
            return Json(currentYear);
        }
        public JsonResult ChangeYear([FromQuery] string year)
        {
            WorkingWithYears.changeYear(year);
            var currentYear = WorkingWithYears.currentYear;
            return Json(currentYear);
        }

        public IActionResult OpenFileFromServer([FromQuery]string filePath)
        {
            // beim bilgisayarim   
            filePath = filePath.Substring(8);
            filePath = "//10.54.8.15/" + filePath;
            // silebilirsiniz
            var stream = new FileStream(filePath, FileMode.Open);
            var contentType = FunctionsHelper.GetMimeTypeByWindowsRegistry(filePath);
            return File(stream, contentType);
        }
        public JsonResult GetProductImage(string stk)
        {
            var productImage = StokReadingData.GetProductImage(stk).Result;
            return Json(productImage);
        }
        public JsonResult GetStokAll([FromBody]RequestQuery requestQuery)
        {
            var list = StokReadingData.GetStokAll(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GetStokAllCount()
        {
            var count = StokReadingData.GetStokAllCount().Result;
            return Json(count);
        }
    }
}