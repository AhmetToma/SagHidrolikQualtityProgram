using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SagHidrolik.Models.ViewModesl;

namespace SagHidrolik.webApp.Controllers
{
    public class AuthenticationDataController : Controller
    {

        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly ILogger<AuthenticationDataController> _logger;
        private readonly RoleManager<IdentityRole> _roleManager;


        public AuthenticationDataController(SignInManager<IdentityUser> signInManager, ILogger<AuthenticationDataController> logger, RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _logger = logger;
        }
        public IActionResult loginPage()
        {
            return View();
        }
        public async Task<JsonResult> checkLogin([FromBody]userLoginViewModel user)
        {
            var result = await _signInManager.PasswordSignInAsync(user.email, user.password, true, false);
            return Json(result);
        }

        [Authorize]
        public async Task<JsonResult> logout()
        {
            await _signInManager.SignOutAsync();
            _logger.LogInformation("User logged out.");
            return Json("done");
        }
    }
}