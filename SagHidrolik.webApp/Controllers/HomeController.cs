
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SagHidrolik.DataAccesslayer.Wo;

namespace SagHidrolik.webApp.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
    
        public IActionResult WelcomePage()
        {
            return View();
        }
        public IActionResult changeYear()
        {
            var list = AllWOData.TEST().Result;

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
        public IActionResult GirisKabulEtiketi()
        {
            return View();
        }
        public IActionResult ReviewDetails()
        {
            return View();
        }
        public IActionResult StokEtiketi()
        {
            return View();
        }
        public IActionResult AllReports()
        {
            return View();
        }
        public IActionResult StokPage()
        {
            return View();
        }

        public IActionResult StokAll()
        {
            return View();
        }
        public IActionResult SevkiyatKutuEtiketi()
        {
            return View();
        }
        public IActionResult GunlukHatBazindUretim()
        {
            return View();
        }
        public IActionResult UretimBasla()
        {
            return View();
        }
        public IActionResult UretimBitir()
        {
            return View();
        }

        public IActionResult UretimPlani()
        {
            return View();
        }
        public IActionResult BakimAriza()
        {
            return View();
        }
        public IActionResult BoxType()
        {
            return View();
        }
        public IActionResult Machine()
        {
            return View();
        }
        public IActionResult SettignsProcessNew()
        {
            return View();
        }

        public IActionResult ProductionSummary()
        {
            return View();
        }

        public IActionResult TamirIsEmri()
        {
            return View();
        }

        public IActionResult OrderMangement()
        {
            return View();
        }

        public IActionResult SettignsReject()
        {
            return View();
        }

        public IActionResult FindInBom()
        {
            return View();
        }
        public IActionResult SettignsOperator()
        {
            return View();
        }

        public IActionResult AddOrUpdateProcess()
        {
            return View();
        }
        public IActionResult ProcessDetails()
        {
            return View();
        }
        public IActionResult AllWo()
        {
            return View();
        }

        public IActionResult GirisKontrol()
        {
            return View();
        }

        public IActionResult UrunEtiketi()
        {
            return View();
        }

        public IActionResult ProductionStart()
        {
            return View();
        }
        public IActionResult TTFTeslimat()
        {
            return View();
        }
        public IActionResult TransferWoToSystem()
        {
            return View();
        }
        public IActionResult PurchaseOrderMangement()
        {
            return View();
        }
        public IActionResult BakimOzet()
        {
            return View();
        }
        public IActionResult BakimSorumlulari()
        {
            return View();
        }
        public IActionResult BakimRaporu()
        {
            return View();
        }
        public IActionResult BakimArizaKapama()
        {
            return View();
        }
        public IActionResult BakimGirisi()
        {
            return View();
        }
        public IActionResult BakimPlanlama()
        {
            return View();
        }
        public IActionResult PlanliBakim()
        {
            return View();
        }

        public IActionResult Makineler()
        {
            return View();
        }
        public IActionResult AllBakimRecords()
        {
            return View();
        }
        public IActionResult BakimEtiketi()
        {
            return View();
        }
    }
}
