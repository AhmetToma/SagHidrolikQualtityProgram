using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ErpSagHidrolik.DataAccessLayer.AddUpadateprocess;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SagHidrolik.DataAccesslayer.Uretim;
using SagHidrolik.Models.ViewModesl;

namespace SagHidrolik.webApp.Controllers
{
    [Authorize]
    public class UretimDataController : Controller
    {

        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly ILogger<AuthenticationDataController> _logger;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UretimDataController(SignInManager<IdentityUser> signInManager, ILogger<AuthenticationDataController> logger, 
            IHttpContextAccessor httpContextAccessor,
            RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
            _httpContextAccessor = httpContextAccessor;
        }


        #region Uretim Basla
        public IActionResult GetProcessFLowInUretim([FromBody]RequestQuery requestQuery)
        {
            var list = UretimData.GetProcessFlowInUretim(requestQuery).Result;
            return Json(list);
        }
        [HttpGet]
        public IActionResult GetAktiveOperators()
        {
            var list = UretimData.GetAktiveOperators().Result;
            return Json(list);
        }
        [HttpGet]
        public IActionResult GetAktiveMachine()
        {
            try
            {
                var list = UretimData.GetAktiveMachine().Result;
                return Json(list);
            }
            catch (Exception ex )
            {

                return Json(ex);
            }
        }
        [HttpGet]
        public IActionResult GetMachineNameByMachineNo(string machineNo)
        {
            var list = UretimData.GetMachineNameByMachineNo(machineNo).Result;
            return Json(list);
        }

        public IActionResult GetOperatorPolivalance([FromBody] OperatorPolivalanceViewModel operatorPolivalanceViewModel)
        {
            var list = UretimData.GetOperatorPolivalance(operatorPolivalanceViewModel).Result;
            return Json(list);
        }


        [HttpGet]
        public IActionResult CheckFlowIdByFinishTimeInFlowDetails(string flow_ID)
        {
            var list = UretimData.CheckFlowIdByFinishTimeInFlowDetails(flow_ID).Result;
            return Json(list);
        }

        public IActionResult StartIsEmriAndWriteToFlowDetails([FromBody]  ProcessFlowDetailsViewModel StartIsEmriAndWriteToFlowDetails)
        {
            var list = UretimData.StartIsEmriAndWriteToFlowDetails(StartIsEmriAndWriteToFlowDetails).Result;
            return Json("");
        }
        #endregion


        #region Uretim Bitir
        public IActionResult GetProcessFlowClose([FromBody]RequestQuery requestQuery)
        {
            var list = UretimData.GetProcessFlowClose(requestQuery).Result;
            return Json(list);
        }

        [HttpGet]
        public IActionResult GetFire(int Reject_ID)
        {
            var list = UretimData.GetFire(Reject_ID).Result;
            return Json(list);
        }
        public IActionResult UretimBitirConfirm([FromBody]UretimBitirViewModel uretimBitirViewModel)
        {
            var done = UretimData.UretimBitirConfirm(uretimBitirViewModel);
            return Json("");
        }

        #endregion

        #region uretim plani
        public IActionResult GetAllUretimPlani([FromBody]RequestQuery requestQuery)
        {
            var list = UretimPlaniData.GetAllUretimPlani(requestQuery).Result;
            return Json(list);
        }
        #endregion

        #region Gunluk Uretim

        public IActionResult getAllProcessInGunlukHatBazindUretim()
        {
            var list = GunlukHatBazindaUretimData.getAllProcessInGunlukHatBazindUretim().Result;
            return Json(list);
        }
        public IActionResult GetAllGunlukHatBazindUretimList([FromBody] RequestQuery requestQuery)
        {
            var list = GunlukHatBazindaUretimData.GetAllGunlukHatBazindUretimList(requestQuery).Result;
            return Json(list);
        }

        #endregion

        #region Production Summary
        public JsonResult GetProductionSummaryReport([FromBody]RequestQuery requestQuery)
        {
            var list = ProductionSummaryGetData.GetProductionSummaryReport(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GetProcutionSummaryCount()
        {
            var list = ProductionSummaryGetData.GetProcutionSummaryCount().Result;
            int listCount = list.Count();
            return Json(listCount);
        }
        #endregion

        #region Rework/tamirIsEmri

        public JsonResult GetTamirIsEmriAdimlari()
        {
            var list = TamirIsEmriGetData.GetTamirIsEmriAdimlari().Result;
            return Json(list);
        }
        public JsonResult InsertTamirIsEmri([FromBody] tamirIsEmriModel tamirIsEmriModel)
        {
            var LotNo = TamirIsEmriGetData.InsertTamirIsEmri(tamirIsEmriModel).Result;
            return Json(LotNo);
        }
        #endregion

        #region Add-Update Process

        public IActionResult GetAllBomProcessInAddOrUpdateProcess([FromBody] RequestQuery requestQuery)
        {
            var list = AddUpdateProcesssData.GetAllBomProcessInAddOrUpdateProcess(requestQuery).Result;
            return Json(list);
        }


        public IActionResult DeleteBomProcess([FromBody]  BomProcessViewModel bom)
        {

            if(bom!=null)
            {
                var list = AddUpdateProcesssData.DeleteBomProcess(bom).Result;
                return Json(list);
            }
            return  Json("model is empty");
         
        }



        public IActionResult GetProcessPlanning()
        {
            var list = AddUpdateProcesssData.GetProcessPlanning().Result;
            return Json(list);
        }
        public IActionResult UpdateBomProcess([FromBody]BomProcessViewModel bom)
        {
            string message = AddUpdateProcesssData.UpdateBomProcess(bom).Result;
            return Json(message);
        }
        #endregion

        #region Process Details
        public JsonResult GetProcessFlowInProcessDetails([FromBody]RequestQuery requestQuery)
        {
            var list = ProcessDetailsData.GetProcessFlowInProcessDetails(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GetProcessFlowDetailsInProcessDetails([FromBody]RequestQuery requestQuery)
        {
            var list = ProcessDetailsData.GetProcessFlowDetailsInProcessDetails(requestQuery).Result;
            return Json(list);
        }
        #endregion

        #region production Start 

        public async Task<JsonResult> GetAllProductionStatus([FromBody]RequestQuery requestQuery)
        {
            var list = ProductionStartData.GetAllProductionStatus(requestQuery).Result;
            List<ProductionStatusViewModel> filtredList=  new  List<ProductionStatusViewModel>();
            var userId =  _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var findedUser = await _userManager.FindByIdAsync(userId);
            var roles = await _userManager.GetRolesAsync(findedUser);
            foreach (var role in roles)
            {
                foreach (var item in list)
                {
                    var xxx = item;
                    if (role == item.RoleName) filtredList.Add(item);
                }
            }
            return Json(filtredList);
        }

        public async Task<JsonResult> DeleteproductionStatus(int sheetId)
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var findedUser = await _userManager.FindByIdAsync(userId);
            var roles = await _userManager.GetRolesAsync(findedUser);
         var c=    ProductionStartData.DeleteproductionStatus(sheetId, roles[0]).Result;
            
            return Json(c);
        }


        public  async Task<JsonResult> AddToProductionStatus([FromQuery] string inputDate, [FromQuery] int productId, [FromQuery]int qty)
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var findedUser = await _userManager.FindByIdAsync(userId);
            var roles = await _userManager.GetRolesAsync(findedUser);

            var message = ProductionStartData.AddToProductionStatus(inputDate, productId, qty,roles[0]).Result;
            return Json(message);
        }
        public async Task<JsonResult> TransferToSystem()
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var findedUser = await _userManager.FindByIdAsync(userId);
            var roles = await _userManager.GetRolesAsync(findedUser);

            var message = ProductionStartData.TransferToSystem(roles[0]).Result;
            return Json(message);
        }
        #endregion

    }
}