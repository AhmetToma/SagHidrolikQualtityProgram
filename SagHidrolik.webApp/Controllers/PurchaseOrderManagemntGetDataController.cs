using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SagHidrolik.DataAccesslayer.OrdersManagement;
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

        public PurchaseOrderManagemntGetDataController(SignInManager<IdentityUser> signInManager, IHttpContextAccessor httpContextAccessor, ILogger<PurchaseOrderManagemntGetDataController> logger, RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _logger = logger;
            _httpContextAccessor = httpContextAccessor;
        }
        public async void SetUpTTfixOrdersAndGetData()
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var findedUser = await _userManager.FindByIdAsync(userId);
            var mesage = PurchaseOrderMangement.SetUpTTfixOrdersTable(findedUser.UserName).Result;
        }
        public async void SetUpStokProductionTable()
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var findedUser = await _userManager.FindByIdAsync(userId);
            var message = PurchaseOrderMangement.SetUpTTfixOrdersTable(findedUser.UserName);
        }
        public async Task<JsonResult> GetAllPurchaseOrders()
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var findedUser = await _userManager.FindByIdAsync(userId);
    var message = await PurchaseOrderMangement.DropAllTable(findedUser.UserName);
            if (message == "done")
            {
                PurchaseOrderMangement.CreateAllTable(findedUser.UserName);
               string m=  await PurchaseOrderMangement.SetUpTTfixOrdersTable(findedUser.UserName);
            }
            var list = PurchaseOrderMangement.GetAllPurchaseOrders().Result.Where(x => x.RemainQty > 0).ToList();
            return Json(list);
        }
    }
}