﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SagHidrolik.DataAccesslayer.Quality.NewNC;
using SagHidrolik.Models.ViewModesl;

namespace SagHidrolik.Quality.webApp.Controllers
{
    [Authorize]
    public class NewNcGetDataController : Controller
    {
        public JsonResult AddNewNc([FromBody]NewNcViewModel newNcViewModel)
        {
            var list = NewNcData.AddNewNc(newNcViewModel).Result;
            return Json(list);
        }
    }
}