using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace SagHidrolik.Quality.webApp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult WelcomePage()
        {
            return View();
        }
        public IActionResult NewNc()
        {
            return View();
        }

        public IActionResult NewNc2()
        {
            return View();
        }

        public IActionResult Review()
        {
            return View();
        }

        public IActionResult OpenAction()
        {
            return View();
        }
        public IActionResult SetUp()
        {
            return View();
        }
        public IActionResult DetailsNc()
        {
            return View();
        }

    }
}
