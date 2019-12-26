using System;
using System.Collections.Generic;
using System.Text;

namespace SagHidrolik.Quality.Models.ViewModesl
{
    public static class SqlQueryRepo
    {

        /*public static string query;

       public const string ServerName = "APPSERVER\\SAGHD";

       public const string userId = "sagsql";

       public const string password = "zrvsql";

       public  static string connctionString_SAG_PRODUCTION = $"Server={ServerName};Database=SAG_PRODUCTION;User Id='{userId}';Password='{password}';";

      */
        public static string query;
        public const string ServerName = "AhmetPc\\SQLEXPRESS";
        public const string userId = "";
        public const string password = "";
        public static string connctionString_SAG_PRODUCTION = $"Server={ServerName};Database=SAG_PRODUCTION;Trusted_Connection=True";

        #region Setup

        #region Claim
        public static string GetAllClaimCount = " select COUNT(dbo.A_NCType.ClaimTypeID) from dbo.A_NCType;";
        public static string GetAllClaim(RequestQuery requestQuery)
        {
            query = "select * from dbo.A_NCType order by dbo.A_NCType.ClaimTypeID asc " +
               $" OFFSET {requestQuery.pageNumber} ROWS FETCH NEXT {requestQuery.pageSize} ROWS ONLY; ";
            return query;
        }

        public static string AddClaimType(ClaimTypeViewModel claimTypeViewModel)
        {
            query = $"insert into dbo.A_NCType(ClaimType,ClaimType_a) values ('{claimTypeViewModel.ClaimType}','{claimTypeViewModel.ClaimType_a}');";
            return query;
        }
        public static string DeleteClaimType(int ClaimID)
        {
            query = $"delete from dbo.A_NCType where A_NCType.ClaimTypeID={ClaimID}";
            return query;
        }
        public static string UpdateClaimType(ClaimTypeViewModel claimTypeViewModel)
        {
            query = $"update dbo.A_NCType set ClaimType='{claimTypeViewModel.ClaimType}'," +
                $" ClaimType_a='{claimTypeViewModel.ClaimType_a}' where dbo.A_NCType.ClaimTypeID = {claimTypeViewModel.ClaimTypeID}; ";
            return query;
        }
        #endregion



        #region company
        public static string GetAllCompany(RequestQuery requestQuery)
        {
            query = $"select * from dbo.D_Company where D_Company.CompanyType like '%{requestQuery.companyType}%' order by Id_Cust" +
               $" OFFSET {requestQuery.pageNumber} ROWS FETCH NEXT {requestQuery.pageSize} ROWS ONLY; ";
            return query;
        }

        public static string GetAllCompanyCount = "select COUNT(Id_Cust) from dbo.D_Company";

        public static string AddCompnay(CompanyViewModel companyViewModel)
        {
            query = $"insert into dbo.D_Company (CompanyName,CompanyType) Values('{companyViewModel.CompanyName}', '{companyViewModel.CompanyType}')";
            return query;
        }

        public static string DeleteCompany(int companyId)
        {
            query = $"delete from dbo.D_Company where Id_Cust ={companyId};";
            return query;
        }


        public static string UpdateCompany(CompanyViewModel companyViewModel)
        {
            query = $"update D_Company  set CompanyName = '{companyViewModel.CompanyName}', " +
                $"CompanyType = '{companyViewModel.CompanyType}' where Id_Cust = {companyViewModel.Id_Cust}";
            return query;
        }
        #endregion


        #region Departmnet


        #endregion

        public static string GetAllDepartments(RequestQuery requestQuery)
        {
            query = $"select  E_Department.DEPT_ID,E_Department.Depatrment_1 as Department_tr, " +
                $" E_Department.Department as Department_en  from E_Department order by DEPT_ID" +
                $" OFFSET {requestQuery.pageNumber} ROWS FETCH NEXT {requestQuery.pageSize} ROWS ONLY; ";
            return query;
        }
        public static string GetAllDepartmentCount = "select COUNT (DEPT_ID)from E_Department";

        public static string AddDepartment(Department department)
        {
            query = $"insert into E_Department(Department,Depatrment_1) values ('{department.Department_en}','{department.Department_tr}')";
            return query;
        }
        public static string DeleteDepartment(int deptId)
        {
            query = $"delete from E_Department where DEPT_ID={deptId}";
            return query;
        }

        public static string UpdateDepartment(Department department)
        {
            query = $"update E_Department set Department = '{department.Department_en}'," +
                $" Depatrment_1 = '{department.Department_tr}' where DEPT_ID = {department.DEPT_ID}";
            return query;
        }

        #endregion
    }
}
