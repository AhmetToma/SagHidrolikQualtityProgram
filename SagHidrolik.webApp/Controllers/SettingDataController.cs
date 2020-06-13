using Microsoft.AspNetCore.Mvc;
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

        public JsonResult UpdateBoxType([FromBody]BoxTypeViewModel boxTypeViewModel)
        {
            var list = BoxTypeDate.UpdateBoxType(boxTypeViewModel).Result;
            return Json(list);
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


        #region Reject
        public JsonResult GetSettingsReject([FromBody]RequestQuery requestQuery)
        {
            var list = RejectGetData.GetSettingsReject(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GetSettingsRejectCount()
        {
            int count = RejectGetData.GetSettingsRejectCount().Result;
            return Json(count);
        }

        public JsonResult AddSettingsReject([FromBody]RejectViewModel r)
        {
            int count = RejectGetData.AddSettingsReject(r).Result;
            return Json(count);
        }

        public JsonResult DeleteSettingsReject([FromQuery]int rejectId)
        {
            int count = RejectGetData.DeleteSettingsReject(rejectId).Result;
            return Json(count);
        }

        public JsonResult EditSettingsReject([FromBody]RejectViewModel r)
        {
            int count = RejectGetData.EditSettingsReject(r).Result;
            return Json(count);
        }
        #endregion

        #region operator
        public JsonResult GetSettingsOperator([FromBody]RequestQuery requestQuery)
        {
            var list = OpertorData.GetSettingsOperator(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GetSettingsOperatorCount()
        {
            int count = OpertorData.GetSettingsOperatorCount().Result;
            return Json(count);
        }

        public JsonResult AddToSettingOperator([FromBody]SettingsOperatorViewModel s)
        {
            var list = OpertorData.AddToSettingOperator(s).Result;
            return Json(list);
        }

        public JsonResult DeleteSettingOperator(int operatorId)
        {
            var list = OpertorData.DeleteSettingOperator(operatorId).Result;
            return Json(list);
        }

        public JsonResult EditSettingsOperator([FromBody]SettingsOperatorViewModel s)
        {
            var list = OpertorData.EditSettingsOperator(s).Result;
            return Json(list);
        }
        public JsonResult GetSettingsOperatorPolivalance([FromQuery]int operatorId)
        {
            var list = OpertorData.GetSettingsOperatorPolivalance(operatorId).Result;
            return Json(list);
        }
        #endregion
    }
}