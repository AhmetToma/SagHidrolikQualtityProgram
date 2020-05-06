using Microsoft.AspNetCore.Mvc;
using SagHidrolik.DataAccesslayer.Quality.SetUp;
using SagHidrolik.Models.ViewModesl;

namespace SagHidrolik.webApp.Controllers
{
    public class SetupGetDataController : Controller
    {
        #region claim

        public JsonResult GetAllClaim([FromBody] RequestQuery requestQuery)
        {
            var list = ClaimData.GetAllClaim(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GetAllClaimCount()
        {
            var list = ClaimData.GetAllClaimCount().Result;
            return Json(list);
        }
        public JsonResult AddClaimType([FromBody] ClaimTypeViewModel claimTypeViewModel)
        {
            var count = ClaimData.AddClaimType(claimTypeViewModel).Result;
            return Json(count);
        }
        public JsonResult DeleteClaimType(int claimId)
        {
            var count = ClaimData.DeleteClaimType(claimId).Result;
            return Json(count);
        }
        public JsonResult UpdateClaimType([FromBody] ClaimTypeViewModel claimTypeViewModel)
        {
            var count = ClaimData.UpdateClaimType(claimTypeViewModel).Result;
            return Json(count);
        }
        #endregion

        #region Company

        public JsonResult GetAllCompany([FromBody] RequestQuery requestQuery)
        {
            var list = CompanyData.GetAllCompany(requestQuery).Result;
            return Json(list);
        }

        public JsonResult GetAllCompanyCount()
        {
            var list = CompanyData.GetAllCompanyCount().Result;
            return Json(list);
        }

        public JsonResult AddCompnay([FromBody]CompanyViewModel companyViewModel)
        {
            var list = CompanyData.AddCompnay(companyViewModel).Result;
            return Json(list);
        }
        public JsonResult DeleteCompany(int companyId)
        {
            var count = CompanyData.DeleteCompany(companyId).Result;
            return Json(count);
        }

        public JsonResult UpdateCompany([FromBody] CompanyViewModel companyViewModel)
        {
            var count = CompanyData.UpdateCompany(companyViewModel).Result;
            return Json(count);
        }
        #endregion

        #region  Department

        public JsonResult GetAllDepartments([FromBody] RequestQuery requestQuery)
        {
            var list = DepartmentData.GetAllDepartments(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GetAllDepartmentCount()
        {
            var list = DepartmentData.GetAllDepartmentCount().Result;
            return Json(list);
        }

        public JsonResult AddDepartment([FromBody] Department department)
        {
            var count = DepartmentData.AddDepartment(department).Result;
            return Json(count);
        }

        public JsonResult DeleteDepartment(int deptId)
        {
            var count = DepartmentData.DeleteDepartment(deptId).Result;
            return Json(count);
        }

        public JsonResult UpdateDepartment([FromBody] Department department)
        {
            var count = DepartmentData.UpdateDepartment(department).Result;
            return Json(count);
        }
        #endregion


        #region Operators 
        public JsonResult GetAllOperators([FromBody] RequestQuery requestQuery)
        {
            var list = OperatorData.GetAllOperators(requestQuery).Result;
            return Json(list);
        }

        public JsonResult AddOperator([FromBody] OperatorViewModel operatorViewModel)
        {
            var count = OperatorData.AddOperator(operatorViewModel).Result;
            return Json(count);
        }


        public JsonResult GetAllOperatorsCount()
        {
            var list = OperatorData.GetAllOperatorsCount().Result;
            return Json(list);
        }

        public JsonResult DeleteOperator(int operatorId)
        {
            var count = OperatorData.DeleteOperator(operatorId).Result;
            return Json(count);
        }

        public JsonResult UpdateOperator([FromBody] OperatorViewModel operatorViewModel)
        {
            var count = OperatorData.UpdateOperator(operatorViewModel).Result;
            return Json(count);
        }
        #endregion


        #region Iprocess

        public JsonResult GetAllIprocess([FromBody] RequestQuery requestQuery)
        {
        var list = IprocessData.GetAllIprocess(requestQuery).Result;
            return Json(list);
        }
        public JsonResult GetAllIprocessCount()
        {
            var list = IprocessData.GetAllIprocessCount().Result;
            return Json(list);
        }
        public JsonResult AddIprocess([FromBody] IprocessViewModel iprocessViewModel)
        {
            var count = IprocessData.AddIprocess(iprocessViewModel).Result;
            return Json(count);
        }
        public JsonResult DeleteIprocess(int IprocessId)
        {
            var count = IprocessData.DeleteIprocess(IprocessId).Result;
            return Json(count);
        }
        public JsonResult UpdateIprocess([FromBody] IprocessViewModel iprocessViewModel)
        {
            var count = IprocessData.UpdateIprocess(iprocessViewModel).Result;
            return Json(count);
        }
        #endregion




        #region PartNumbers 

        public JsonResult GetAllPartNumbers([FromBody] RequestQuery requestQuery)
        {
            var list = PartNumberData.GetAllPartNumbers(requestQuery).Result;
            return Json(list);
        }

        public JsonResult GetAllPartNumbersCount()
        {
            var list = PartNumberData.GetAllPartNumbersCount().Result;
            return Json(list);
        }

        public JsonResult AddPartNumber([FromBody] PartNumbersViewModel partNumbersViewModel)
        {
            var count = PartNumberData.AddPartNumber(partNumbersViewModel).Result;
            return Json(count);
        }
        public JsonResult DeletePartNumber(int partNumberId)
        {
            var count = PartNumberData.DeletePartNumber(partNumberId).Result;
            return Json(count);
        }


        public JsonResult UpdatePartNumber([FromBody] PartNumbersViewModel partNumbersViewModel)
        {
            var count = PartNumberData.UpdatePartNumber(partNumbersViewModel).Result;
            return Json(count);
        }
        #endregion
    }
}