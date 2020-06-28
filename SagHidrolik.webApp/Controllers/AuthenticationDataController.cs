using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SagHidrolik.Models.ViewModesl;
using SagHidrolik.DataAccesslayer.SystemUsers;
using SagHidrolik.webApp.Functions;

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

        [Authorize]
        public IActionResult AllSystemUsers()
        {
            return View();
        }
        public JsonResult GetAllSyetemUsers([FromBody]RequestQuery requestQuery)
        {
            var list = SystemUsersData.GetAllSyetemUsers(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GetAllSyetemUsersCount()
        {
            int count = SystemUsersData.GetAllSyetemUsersCount().Result;
            return Json(count);
        }

        public JsonResult GetAllUsersRoles()
        {
            var list = SystemUsersData.GetAllUsersRoles().Result;
            return Json(list);
        }

        [Authorize]
        public async Task<JsonResult> AddSystemUser([FromBody] SystemUserViewModel s)
        {
            IdentityResult result,result1;
            IdentityUser findedUser=null;
            string userName = FunctionsHelper.GetUserNameFromEmail(s.Email);
            if(s!=null)
            {
                var user = new IdentityUser { UserName = userName, Email = s.Email, EmailConfirmed = true };
                 result = await _userManager.CreateAsync(user, s.PassWord);
                if(result.Succeeded)
                {
                     findedUser = await _userManager.FindByEmailAsync(s.Email);
                     result1 = await _userManager.AddToRoleAsync(findedUser,s.RoleName);
                }
                return Json(findedUser);
            }
            else
            {
                return Json("");
            }
        }
        [Authorize]
        public async Task<JsonResult> deleteSystemUser(string email)
        {
            var findedUser =  await _userManager.FindByEmailAsync(email);
            var result =  await _userManager.DeleteAsync(findedUser);
            if (result.Succeeded) return Json("done");
            else return Json("");
        }

        [Authorize]
        public async Task<JsonResult> ResetUserPassword([FromBody] SystemUserViewModel s)
        {
            if(s!=null)
            {
                var findedUser = await _userManager.FindByEmailAsync(s.Email);
                var result = await _userManager.RemovePasswordAsync(findedUser);
                var result1 = await _userManager.AddPasswordAsync(findedUser,s.PassWord);
                if (result1.Succeeded) return Json("done");
                else return Json("");
            }
            else return Json("");
        }


        public async Task<IActionResult> changeRole([FromBody] SystemUserViewModel s)
        {
            if (s != null)
            {
                var findedUser = await _userManager.FindByEmailAsync(s.Email);
                if (findedUser != null) ;
                {
                    var roles = await _userManager.GetRolesAsync(findedUser);
                    foreach (var role in roles)
                    {
                        await _userManager.RemoveFromRoleAsync(findedUser, role);
                    }

                    var result = await _userManager.AddToRoleAsync(findedUser, s.RoleName);
                    if (result.Succeeded) return Ok("done");
                    else return Ok("");
                }
            }
            else return Ok("");
        }
    }
}