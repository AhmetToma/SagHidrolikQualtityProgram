﻿using Microsoft.AspNetCore.Mvc;
using SagHidrolik.DataAccesslayer.Settings;
using SagHidrolik.Models.ViewModesl;
namespace SagHidrolik.webApp.Controllers
{
    public class SettingDataController : Controller
    {
        #region Box Type
        public JsonResult GetBoxType([FromBody]RequestQuery requestQuery)
        {
            var list = BoxTypeDate.GetBoxType(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GetBoxTypeCount()
        {
            int count = BoxTypeDate.GetBoxTypeCount().Result;
            return Json(count);
        }

        #endregion

        #region  Machine
        public JsonResult GetMachineSettings([FromBody]RequestQuery requestQuery)
        {
            var list = MachineData.GetMachineSettings(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GetMachineSettingsCount()
        {
            int count = MachineData.GetMachineSettingsCount().Result;
            return Json(count);
        }

        #endregion



        #region Process 

        public JsonResult GetProcessNew([FromBody]RequestQuery requestQuery)
        {
            var list = ProcessNewGetData.GetProcessNew(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GetProcessNewCount()
        {
            int count = ProcessNewGetData.GetProcessNewCount().Result;
            return Json(count);
        }

        public JsonResult AddsettingsProcessNew([FromBody] settingsProcessNewViewModel s)
        {
            int count = ProcessNewGetData.AddsettingsProcessNew(s).Result;
            return Json(count);
        }

        public JsonResult DeleteSettingsProcessNew([FromQuery]int processId)
        {
            int count = ProcessNewGetData.DeleteSettingsProcessNew(processId).Result;
            return Json(count);
        }
        public JsonResult EditSettingsProcessNew([FromBody] settingsProcessNewViewModel s)
        {
            int count = ProcessNewGetData.EditSettingsProcessNew(s).Result;
            return Json(count);
        }
        #endregion
    }
}