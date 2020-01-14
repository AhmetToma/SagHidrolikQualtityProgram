using SagHidrolik.Quality.Models.ViewModesl;
using System;
using System.Collections.Generic;
using System.Text;

namespace SagHidrolik.Quality.Models.SqlRepository
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



        #region Operators 

        public static string GetAllOperators(RequestQuery requestQuery)
        {
            query = $"select * from dbo.F_Operator order by  Op_ID" +
                $" OFFSET {requestQuery.pageNumber} ROWS FETCH NEXT {requestQuery.pageSize} ROWS ONLY; ";
            return query;
        }

        public static string GetAllOperatorsCount = "select COUNT(F_Operator.Op_ID)from F_Operator";

        public static string AddOperator(OperatorViewModel operatorViewModel)
        {
            query = $"insert into dbo.F_Operator (OperatorName) Values ('{operatorViewModel.OperatorName}')";
            return query;
        }

        public static string DeleteOperator(int operatorId)
        {
            query = $"delete from dbo.F_Operator where Op_ID = {operatorId}";
            return query;
        }


        public static string UpdateOperator(OperatorViewModel operatorViewModel)
        {
            query = $"update dbo.F_Operator set OperatorName = '{operatorViewModel.OperatorName}' where  Op_ID = {operatorViewModel.Op_ID}";
            return query;
        }
        #endregion



        #region Iprocess


        public static string GetAllIprocessCount = "select COUNT(PR_ID) from I_Process";
        public static string GetAllIprocess(RequestQuery requestQuery)
        {
            query = "select  * from dbo.I_Process order by PR_ID"+
               $" OFFSET {requestQuery.pageNumber} ROWS FETCH NEXT {requestQuery.pageSize} ROWS ONLY; ";
            return query;
        }


        public static string AddIprocess(IprocessViewModel iprocessViewModel)
        {
            query = $" insert  into I_Process (Process,[Desc]) Values ('{iprocessViewModel.Process}','{iprocessViewModel.Desc}')";
            return query;
        }
        public static string DeleteIprocess(int IprocessId)
        {
            query = $" delete from I_Process where PR_ID={IprocessId}";
            return query;
        }
        public static string UpdateIprocess(IprocessViewModel iprocessViewModel)
        {
            query = $" update dbo.I_Process set Process='{iprocessViewModel.Process}', [Desc]='{iprocessViewModel.Desc}' where PR_ID= {iprocessViewModel.PR_ID}";
            return query;
        }
        #endregion

        #region partNumbers
        public static string GetAllPartNumbersCount = "select COUNT(ID) from G_PartNumbers";
        public static string GetAllPartNumbers(RequestQuery requestQuery)
        {
            query = $"select * from G_PartNumbers  where  STK like '%{requestQuery.Stk}%' order By ID desc " +
               $" OFFSET {requestQuery.pageNumber} ROWS FETCH NEXT {requestQuery.pageSize} ROWS ONLY; ";
            return query;
        }

        public static string AddPartNumber(PartNumbersViewModel partNumbersViewModel)
        {
            query = $"insert into G_PartNumbers (STK,STA,[Type]) Values ('{partNumbersViewModel.STK}','{partNumbersViewModel.STA}',{partNumbersViewModel.Type})";
            return query;
        }
        public static string DeletePartNumber(int partNumberId)
        {
            query = $" delete from G_PartNumbers where ID={partNumberId}";
            return query;
        }

        public static string UpdatePartNumber(PartNumbersViewModel p)
        {
            query = $"update G_PartNumbers set STK ='{p.STK}', STA='{p.STA}',[Type]= {p.Type} " +
                $" where ID = {p.ID}";
            return query;
        }
        #endregion

        #endregion


        #region New NC

        public static string AddNewNc(NewNcViewModel nc)
        {
            int corrective = 0,preventative=0,repetive=0;
            if (nc.activityType == 1) corrective = 1;
            if (nc.activityType == 2) preventative = 2;
            if (nc.activityType == 3) repetive = 3;

            query = "SET DATEFORMAT dmy; insert into dbo.B_NonConformityReport(NC_Type, NC_Id_Def, " +
                "CorrectiveAction, PreventativeAction, Repetitive, NC_Customer_Supplier, Department, " +
                "Process, PartNo, NonConformity, Nc_OpenedBy, NonConformty_qty, NC_OpenDate, NC_TargetDate," +
                $"NC_Responsible, NC_CloseDate, Nc_desc2, NC_Status, ActionImme, ActionPer) Values({nc.ncType},'{nc.def}', {corrective},{preventative},{repetive}," +
                $"{nc.customerSupplier},{nc.department},{nc.process},{nc.partNo},'{nc.conformity}',{nc.openBy},{nc.qty},'{nc.openDate}'," +
                $"'{nc.targetDate}',{nc.responsible},'{nc.closeDate}','{nc.description}',{0},{1},{2})";
            return query;
        }
        #endregion


        #region Review 
        public static string GetAllReview(RequestQuery requestQuery)
        {
            query = "SET DATEFORMAT dmy;SELECT B_NonConformityReport.NC_ID,G_PartNumbers.STK," +
                "B_NonConformityReport.NonConformity," +
                "B_NonConformityReport.PartNo,B_NonConformityReport.NC_TargetDate, B_NonConformityReport.NC_Type as NcTypeId, " +
                " dbo.A_NCType.ClaimType as TypeName,B_NonConformityReport.NC_Responsible as resbonsibleId, " +
                " F_Operator.OperatorName as resbonsibleName, B_NonConformityReport.NC_OpenDate, " +
                " B_NonConformityReport.NC_Status,NC_Customer_Supplier as CompanyId,CompanyName,B_NonConformityReport.Department as DepartmentId, " +
                " E_Department.Department as DepartmentName FROM B_NonConformityReport left join dbo.A_NCType " +
                " on B_NonConformityReport.NC_Type = dbo.A_NCType.ClaimTypeID left join F_Operator on " +
                " B_NonConformityReport.NC_Responsible = F_Operator.Op_ID left join dbo.D_Company on B_NonConformityReport.NC_Customer_Supplier = D_Company.Id_Cust " +
                " left join E_Department on B_NonConformityReport.Department = E_Department.DEPT_ID " +
                " left join G_PartNumbers on PartNo=G_PartNumbers.ID" +
                $" where STK like '%{requestQuery.Stk}%'  ORDER BY B_NonConformityReport.NC_TargetDate DESC" +
              $" OFFSET {requestQuery.pageNumber} ROWS FETCH NEXT {requestQuery.pageSize} ROWS ONLY; ";

            return query;
        }


        public static string GetAllReviewCount = "select count(*)from(SELECT B_NonConformityReport.NC_ID, B_NonConformityReport.NonConformity, B_NonConformityReport.PartNo," +
            " B_NonConformityReport.NC_TargetDate, B_NonConformityReport.NC_Type as NcTypeId, dbo.A_NCType.ClaimType " +
            " as TypeName, B_NonConformityReport.NC_Responsible as OperatorId," +
            " F_Operator.OperatorName, B_NonConformityReport.NC_OpenDate," +
            " B_NonConformityReport.NC_Status, NC_Customer_Supplier as CompanyId, CompanyName, B_NonConformityReport.Department as DepartmentId," +
            " E_Department.Department as DepartmentName FROM B_NonConformityReport left join dbo.A_NCType " +
            " on B_NonConformityReport.NC_Type = dbo.A_NCType.ClaimTypeID left join F_Operator on " +
            "B_NonConformityReport.NC_Responsible = F_Operator.Op_ID left join dbo.D_Company on B_NonConformityReport.NC_Customer_Supplier = D_Company.Id_Cust  left join E_Department " +
            "on B_NonConformityReport.Department = E_Department.DEPT_ID)countNumber";
        #endregion


        public static  string GetReviewDetails(int ncId)
        {
            query = "SELECT B_NonConformityReport.NC_ID,B_NonConformityReport.Nc_desc2,G_PartNumbers.STK,B_NonConformityReport.NonConformity,B_NonConformityReport.PartNo," +
                " B_NonConformityReport.Nc_OpenedBy,CorrectiveAction,PreventativeAction,Repetitive,I_Process.Process as processName," +
                " B_NonConformityReport.NC_TargetDate, B_NonConformityReport.NC_Type as NcTypeId,  dbo.A_NCType.ClaimType as TypeName, " +
                " B_NonConformityReport.NC_Responsible as responsibleId," +
                " F_Operator.OperatorName as resbonsibleName, B_NonConformityReport.Process as ProcessId, B_NonConformityReport.Nc_OpenedBy as OpenById, " +
                " B_NonConformityReport.NC_OpenDate,B_NonConformityReport.NC_Id_Def, B_NonConformityReport.NC_RootCauseAnalysis, " +
                " B_NonConformityReport.NC_CloseDate,B_NonConformityReport.NonConformty_qty as qty," +
                " B_NonConformityReport.NC_Status,NC_Customer_Supplier as CompanyId,CompanyName,B_NonConformityReport.Department as DepartmentId," +
                " E_Department.Department as DepartmentName FROM B_NonConformityReport left join dbo.A_NCType " +
                " on B_NonConformityReport.NC_Type = dbo.A_NCType.ClaimTypeID left join " +
                " F_Operator on  B_NonConformityReport.NC_Responsible = F_Operator.Op_ID left join dbo.D_Company on " +
                " B_NonConformityReport.NC_Customer_Supplier = D_Company.Id_Cust" +
                " left join E_Department on B_NonConformityReport.Department = E_Department.DEPT_ID" +
                $" left join G_PartNumbers on PartNo = G_PartNumbers.ID" +
                $" left join dbo.I_Process on B_NonConformityReport.Process = I_Process.PR_ID where NC_ID = {ncId}";
            return query;
        }
    }
}
