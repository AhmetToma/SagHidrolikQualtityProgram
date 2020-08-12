using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SagHidrolik.DataAccesslayer.OrdersManagement;
using SagHidrolik.Models.ViewModesl;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SagHidrolik.webApp.Controllers
{
    [Authorize]
    public class PurchaseOrderManagemntGetDataController : Controller
    {

        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly ILogger<PurchaseOrderManagemntGetDataController> _logger;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public PurchaseOrderManagemntGetDataController(SignInManager<IdentityUser> signInManager,
            IHttpContextAccessor httpContextAccessor, ILogger<PurchaseOrderManagemntGetDataController> logger, RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _logger = logger;
            _httpContextAccessor = httpContextAccessor;
        }


        public async Task<JsonResult> GetAllPurchaseOrders()
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var findedUser = await _userManager.FindByIdAsync(userId);
            var message = await PurchaseOrderMangement.DropAllTable(findedUser.UserName);
            if (message == "done")
            {
                PurchaseOrderMangement.CreateAllTable(findedUser.UserName);
                string m = await PurchaseOrderMangement.SetUpTTfixOrdersTable(findedUser.UserName);
            }
            var list = PurchaseOrderMangement.GetAllPurchaseOrders().Result.Where(x => x.RemainQty > 0).ToList();
            return Json(list);
        }

        public async Task<JsonResult> DropAllPurcahseOrdersTable()
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var findedUser = await _userManager.FindByIdAsync(userId);
            var message = await PurchaseOrderMangement.DropAllTable(findedUser.UserName);
            return Json(message);
        }


        public async Task<JsonResult> RunMrp(int lotSize)
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var findedUser = await _userManager.FindByIdAsync(userId);
            string message = PurchaseOrderMangement.RunMrp(findedUser.UserName, lotSize).Result;

            if (message == "done")
            {
                var TTfixOrdersList = PurchaseOrderMangement.GetAllFromTTFixOrdersTable(findedUser.UserName).Result;
                return Json(TTfixOrdersList);
            }
            return Json("error");
        }


        #region partOrderSummary

        public JsonResult GetWoStatusLastOpen()
        {
            return Json(PurchaseOrderMangement.GetWoStatusLastOpen().Result);
        }
        public JsonResult GetWoStatuslastInprogress()
        {
            return Json(PurchaseOrderMangement.GetWoStatuslastInprogress().Result);
        }
        public async Task<JsonResult> GetTTfixOrdersOrderSummary()
        {

            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var findedUser = await _userManager.FindByIdAsync(userId);
            return Json(PurchaseOrderMangement.GetTTfixOrdersOrderSummary(findedUser.UserName).Result);
        }
        #endregion


        #region Monthly Weekly

        public async Task<JsonResult> GetMonthlyMaterialUsage([FromBody]WeeklyMonthlyFilterModel m)
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var findedUser = await _userManager.FindByIdAsync(userId);
            var list = await PurchaseOrderMangement.GetMonthlyMaterialUsage(m, findedUser.UserName);
            return Json(list);
        }
        public async Task<JsonResult> GetWeeklyMaterialUsage([FromBody]WeeklyMonthlyFilterModel m)
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var findedUser = await _userManager.FindByIdAsync(userId);
            return Json(await PurchaseOrderMangement.GetWeeklyMaterialUsage(m, findedUser.UserName));
        }


        #endregion

        #region New Wo Plan Wo
        public async Task<JsonResult> GetNewWoListInPurchaseOrders()
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var findedUser = await _userManager.FindByIdAsync(userId);
            return Json(await PurchaseOrderMangement.GetNewWoListInPurchaseOrders(findedUser.UserName));
        }
        public async Task<JsonResult> GetWoPlanListInPurchaseOrders()
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var findedUser = await _userManager.FindByIdAsync(userId);
            return Json(await PurchaseOrderMangement.GetWoPlanListInPurchaseOrders(findedUser.UserName));
        }

        #endregion

        #region Palning Mrp 
        public async Task<JsonResult> PalningMrp()
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var findedUser = await _userManager.FindByIdAsync(userId);
            return Json(await PurchaseOrderMangement.PalningMrp(findedUser.UserName));
        }
        public async Task<JsonResult> ProcessDates()
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var findedUser = await _userManager.FindByIdAsync(userId);
            return Json(await PurchaseOrderMangement.ProcessDates(findedUser.UserName));
        }
        #endregion

    }
}