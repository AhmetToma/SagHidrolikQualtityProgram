﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SagHidrolik.DataAccesslayer.TTFTeslimat;
using SagHidrolik.Models.ViewModesl;

namespace SagHidrolik.webApp.Controllers
{
    public class TTFTeslimatGetDataController : Controller
    {


        public void DropAllTTFTeslimatTable()
        {
            TTFTeslimatData.DropAllTTFTeslimatTable();
        }
        public JsonResult GetTeslimatDurumu([FromBody] RequestQuery requestQuery)
        {
            var list = TTFTeslimatData.GetTeslimatDurumu(requestQuery).Result;
            return Json(list);
        }

        public JsonResult AddTeslimatDurumu([FromBody] List<TeslimatDurumuViewModel>  list )
        {
            var result = TTFTeslimatData.AddTeslimatDurumu(list).Result;
            return Json(result);
        }
        public JsonResult GetTeslimatDurumuCount()
        {
            var list = TTFTeslimatData.GetTeslimatDurumuCount().Result;
            return Json(list);
        }
        public JsonResult GetShippmentReport([FromBody] RequestQuery requestQuery)
        {
            var list = TTFTeslimatData.GetShippmentReport(requestQuery).Result;
            return Json(list);
        }
    }
}