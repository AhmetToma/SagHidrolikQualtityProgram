using SagHidrolik.Models.ViewModesl;
using System;
using System.Collections.Generic;
using System.Text;

namespace SagHidrolik.Models.SqlRepository
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
        public static string connctionString_SAG_HIDROLIK_ByYear() =>
        $"Server=AhmetPc\\SQLEXPRESS;Database=SAG_HIDROLIK_{WorkingWithYears.currentYear}T;Trusted_Connection=True";

        #region Stok
        public static string GetStokkenByStkList(RequestQuery requestQuery)
        {
            query = $"select * from dbo.STOKGEN where dbo.STOKGEN.STK like '%{requestQuery.Stk}%'";
            return query;
        }


        public static string GetStokkenByStkListOnlypageSize(RequestQuery requestQuery)
        {
            query = $"select * from dbo.STOKGEN where dbo.STOKGEN.STK like '%{requestQuery.Stk}%' order By STK" +
                $" OFFSET {requestQuery.pageNumber} ROWS FETCH NEXT {requestQuery.pageSize} ROWS ONLY; ";
            return query;
        }
        public static string GetDboStokgenPIdByStk(string stk)
        {

            query = $"select * from dbo.STOKGEN where dbo.STOKGEN.STK='{stk}'";
            return query;
        }


        public static string GetProductOrdersByStokgenId(RequestQuery requestQuery)
        {

            query = $"select * from dbo.Local_ProductionOrders where dbo.Local_ProductionOrders.PartNo_ID='{requestQuery.pid}' Order By LotNo desc  " +
                $" OFFSET { requestQuery.pageNumber} ROWS FETCH NEXT { requestQuery.pageSize} ROWS ONLY;";
            return query;
        }


        public static string GetAllStokAlt(RequestQuery requestQuery)
        {
            query = "SELECT STOK_ALT.STOKREF,STOK_ALT.STK,STOK_ALT.STA,STOK_ALT.STB,STOK_ALT.MIKTAR,STOK_ALT.BRKODU,STOK_ALT.TURAC,STOK_ALT.AORS,  IIf(AORS = 'S', -1, 1) * MIKTAR AS Toplam," +
                "STOK_ALT.TARIH,STOKGEN.TUR,STOKGEN.P_ID,STOK_ALT.LOTNO,STOK_ALT.DEPOREF,STOK_ALT.DEPOREF,STOK_ALT.GRMIK,STOK_ALT.CKMIK, " +
                " isNull(STOK_ALT.GRMIK, 0)-isNull(STOK_ALT.CKMIK, 0) AS Stok,STOK_ALT.IPTAL FROM STOK_ALT INNER JOIN STOKGEN ON STOK_ALT.STOKP_ID =STOKGEN.P_ID " +
                $" WHERE STOK_ALT.TURAC <> 'Depo Transfer Fişi'AND STOK_ALT.IPTAL <> 1 and STOKGEN.P_ID = '{requestQuery.pid}' ORDER BY STOK_ALT.TARIH DESC " +
                $" OFFSET {requestQuery.pageNumber} ROWS FETCH NEXT {requestQuery.pageSize} ROWS ONLY; ";
            return query;
        }


        public static string GetaltStokToplam(RequestQuery requestQuery)
        {
            query = "SELECT SUM(IIf(AORS = 'S', -1, 1) * MIKTAR) AS Toplam from dbo.STOK_ALT " +
                $" where STK = '{requestQuery.Stk}'";
            return query;
        }


        public static string GetGalvanize = "SELECT STOK_ALT.REF,STOK_ALT.STOKREF,STOK_ALT.STK,STOK_ALT.TURAC,STOK_ALT.MIKTAR, Left([STK], Len([STK])-2) AS stokrefnew,STOK_ALT.TARIH, IIf([AORS] = 'S',-1,1) AS carpan " +
             " FROM STOK_ALT WHERE(((STOK_ALT.STK)Like '%-g%' Or(STOK_ALT.STK) Like '%-k%') AND((Left([STK], Len([STK]) - 2)) Is Not Null))" +
           " order by STOK_ALT.TARIH desc";


        public static string GetBomProcessInStok(RequestQuery requestQuery)
        {
            query = " select Qty,Quality ,Process_Planning.ProsesAdi from dbo.BOM_Process inner join Process_Planning on dbo.BOM_Process.SubPartNo = Process_Planning.ProcessNo " +
                $" where BOM_Process.PartNo_ID = '{requestQuery.pid}' " +
                $" order By Process_Planning.ProsesAdi OFFSET {requestQuery.pageNumber} ROWS FETCH NEXT {requestQuery.pageSize} ROWS ONLY; ";
            return query;

        }

        public static string GetProcessFlowInStok(RequestQuery requestQuery)
        {
            query = "SELECT dbo.Process_Planning.ProsesAdi, ProcessFlow.Flow_ID, ProcessFlow.ProductOrder_ID, ProcessFlow.ProcessNo_ID,dbo.Local_ProductionOrders.PartNo_ID," +
              " [Process_qty]-[Ok_Qty] -[Process_reject]-[Process_Rework] AS Miktar,ProcessFlow.Require_Date, dbo.Local_ProductionOrders.Status, " +
              " dbo.Local_ProductionOrders.LotNo " +
              " FROM  ProcessFlow INNER JOIN Local_ProductionOrders ON ProcessFlow.ProductOrder_ID = Local_ProductionOrders.ProductOrderID " +
              " inner join dbo.Process_Planning on " +
              " Process_Planning.ProcessNo= ProcessFlow.ProcessNo_ID  WHERE ((([Process_qty]-[Ok_Qty]-[Process_reject]-[Process_Rework])>0) AND((Local_ProductionOrders.Status)= 2)) " +
              $" and dbo.Local_ProductionOrders.PartNo_ID='{requestQuery.pid}'" +
              $" order by ProsesAdi OFFSET { requestQuery.pageNumber}ROWS FETCH NEXT { requestQuery.pageSize}ROWS ONLY;";
            return query;
        }

        public static string GetStokRecetesi(RequestQuery request)
        {
            query = $"SELECT * FROM TSTOKRECETESI WHERE STOKP_ID ='{request.pid}'" +
                $" order by STK OFFSET  {request.pageNumber} rows fetch next {request.pageSize} rows only; ";
            return query;
        }

        public static string GetproductFile(string pid)
        {
            query = "SELECT STOKDOSYALAR.DOSYAADI FROM STOKGEN LEFT JOIN STOKDOSYALAR ON STOKGEN.P_ID = STOKDOSYALAR.P_ID " +
                $" WHERE STOKDOSYALAR.DOSYAADI Is Not Null and dbo.STOKDOSYALAR.P_ID = '{pid}';";
            return query;
        }

        public static string GetAllProductFile = "select P_ID,DOSYAADI  from STOKDOSYALAR";



        public static string GetProductImage(string stk)
        {
            query = $"select RESIM as imageUrl,Stk ,P_ID from dbo.STOKGEN where  STK ='{stk}';";
            return query;
        }

        #region StokAll

        public static string GetStokAll(RequestQuery request)
        {
            query = $"SELECT  dbo.STOK_ALT.STK, dbo.STOK_ALT.STA,dbo.STOKGEN.TUR, sum ( isnull((dbo.STOK_ALT.GRMIK-dbo.STOK_ALT.CKMIK),0)) as totalStok" +
                $" FROM dbo.STOK_ALT left JOIN dbo.STOKGEN ON dbo.STOK_ALT.STOKP_ID = dbo.STOKGEN.P_ID  where dbo.STOK_ALT.STK like '%{request.Stk}%'" +
                $" GROUP BY STOK_ALT.STK, dbo.STOK_ALT.STA,STOKGEN.TUR" +
                $" order by STOK_ALT.STK OFFSET  {request.pageNumber} rows fetch next {request.pageSize} rows only; ";
            return query;
        }
        public static string GetStokAllCount()
        {
            query = "select count(*)from (SELECT  dbo.STOK_ALT.STK, dbo.STOK_ALT.STA,dbo.STOKGEN.TUR, sum ( isnull((dbo.STOK_ALT.GRMIK-dbo.STOK_ALT.CKMIK),0)) as totalStok FROM dbo.STOK_ALT left JOIN dbo.STOKGEN ON dbo.STOK_ALT.STOKP_ID = dbo.STOKGEN.P_ID  where dbo.STOK_ALT.STK like '%%'" +
                "GROUP BY STOK_ALT.STK, dbo.STOK_ALT.STA,STOKGEN.TUR )countNumber";
            return query;
        }
        #endregion

        #endregion

        #region Quality
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
            query = "select  * from dbo.I_Process order by PR_ID" +
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
            int corrective = 0, preventative = 0, repetive = 0;
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



        public static string GetReviewDetails(int ncId)
        {
            query = "SELECT B_NonConformityReport.NC_ID,B_NonConformityReport.Nc_desc2,G_PartNumbers.STK,B_NonConformityReport.NonConformity,B_NonConformityReport.PartNo," +
                " B_NonConformityReport.Nc_OpenedBy,CorrectiveAction,PreventativeAction,Repetitive,I_Process.Process as processName," +
                " B_NonConformityReport.NC_TargetDate, B_NonConformityReport.NC_Type as NcTypeId,  dbo.A_NCType.ClaimType as TypeName,A_NCType.ClaimType_a as TypeNameTr, " +
                " B_NonConformityReport.NC_Responsible as responsibleId," +
                " F_Operator.OperatorName as resbonsibleName, B_NonConformityReport.Process as ProcessId, B_NonConformityReport.Nc_OpenedBy as OpenById, " +
                " B_NonConformityReport.NC_OpenDate,B_NonConformityReport.NC_Id_Def, B_NonConformityReport.NC_RootCauseAnalysis, " +
                " B_NonConformityReport.NC_CloseDate,B_NonConformityReport.NonConformty_qty as qty," +
                " B_NonConformityReport.NC_Status,NC_Customer_Supplier as CompanyId,CompanyName,CompanyType,B_NonConformityReport.Department as DepartmentId," +
                " E_Department.Department as DepartmentName ,E_Department.Depatrment_1 as DepatrmentTr FROM B_NonConformityReport left join dbo.A_NCType " +
                " on B_NonConformityReport.NC_Type = dbo.A_NCType.ClaimTypeID left join " +
                " F_Operator on  B_NonConformityReport.NC_Responsible = F_Operator.Op_ID left join dbo.D_Company on " +
                " B_NonConformityReport.NC_Customer_Supplier = D_Company.Id_Cust" +
                " left join E_Department on B_NonConformityReport.Department = E_Department.DEPT_ID" +
                $" left join G_PartNumbers on PartNo = G_PartNumbers.ID" +
                $" left join dbo.I_Process on B_NonConformityReport.Process = I_Process.PR_ID where NC_ID = {ncId}";
            return query;
        }

        public static string GetOpenByName(int openByID)
        {
            query = $"select F_Operator.OperatorName from F_Operator where F_Operator.Op_ID={openByID}";
            return query;
        }
        public static string GetImmediateAction(int ncId)
        {
            query = $"SET DATEFORMAT dmy;select ACTN_ID,NC_ID,Action_Type,Actin_Def,Responsible as ResponsibleId,TargetDate,CloseDate,[Status] from  dbo.C_ActionList where" +
                $" NC_ID = {ncId}";
            return query;
        }


        public static string GetDocumnetList(int ncId)
        {
            query = $"select Document_ID,NC_ID,Document as DocumentLink from H_Documents where NC_ID ={ncId}";
            return query;
        }

        public static string GetDocumentControlList(int ncId)
        {
            query = $"select ID, NC_ID,Document as DocumentType,ChangeDate,NewRev,Notes  from J_DocumentControl  where NC_ID = {ncId}";
            return query;
        }
        public static string SaveReviewDetalis(ReviewViewModel rev)
        {
            query = $"update B_NonConformityReport  set NC_Type={rev.NcTypeId},  NC_Id_Def='{rev.NC_Id_Def}',CorrectiveAction={rev.CorrectiveAction},PreventativeAction={rev.PreventativeAction}," +
                $" Repetitive={rev.Repetitive},NC_Customer_Supplier = {rev.CompanyId},Department = {rev.DepartmentId},Process = {rev.ProcessId},PartNo = {rev.PartNo}," +
                $" NonConformity = '{rev.NonConformity}',NonConformty_qty = {rev.qty}, " +
                $" Nc_OpenedBy = {rev.OpenById},NC_OpenDate = '{rev.NC_OpenDate}',NC_TargetDate = '{rev.NC_TargetDate}',NC_Responsible = {rev.responsibleId},NC_CloseDate = {rev.NC_CloseDate}," +
                $" Nc_desc2='{rev.Nc_desc2}',NC_Status = 0 ,NC_RootCauseAnalysis = '{rev.NC_RootCauseAnalysis}',ActionImme = 1,ActionPer = 2 " +
                $" where NC_ID = ${rev.NC_ID}; ";
            return query;
        }


        public static string AddDocuemnt(DocumnetViewModel doc)
        {
            query = $"insert into H_Documents (NC_ID,Document) Values({doc.NC_ID}, '{doc.DocumentLink}')";
            return query;
        }

        public static string AddDocument(DocumnetViewModel doc)
        {
            query = $"insert into H_Documents (NC_ID,Document) Values({doc.NC_ID}, '{doc.DocumentLink}')";
            return query;
        }

        public static string DeleteDocument(int docId)
        {
            query = $"delete from H_Documents where  Document_ID={docId}";
            return query;
        }
        public static string AddAction(ActionListViewModel ac)
        {
            query = $"SET DATEFORMAT dmy;insert into C_ActionList (NC_ID,Action_Type,Actin_Def,Responsible,TargetDate,CloseDate,[Status]) " +
                $" values({ac.NC_ID}, {ac.Action_Type}, '{ac.Actin_Def}', {ac.ResponsibleId}, '{ac.TargetDate}'," +
                $" '{ac.CloseDate}', '{ac.Status}')";
            return query;
        }

        public static string DeleteAction(int actionId)
        {
            query = $"delete from C_ActionList where ACTN_ID ={actionId}";
            return query;
        }

        public static string UpdateAction(ActionListViewModel ac)
        {
            query = $"SET DATEFORMAT dmy;update C_ActionList set " +
                $"NC_ID ={ac.NC_ID},Action_Type ={ac.Action_Type},Actin_Def ='{ac.Actin_Def}'" +
                $",Responsible ={ac.ResponsibleId},TargetDate ='{ac.TargetDate}',CloseDate ='{ac.CloseDate}'" +
                $",[Status]='{ac.Status}' where ACTN_ID = {ac.ACTN_ID}";
            return query;
        }


        public static string AddDocumentControl(DocumentControlViewModel dc)
        {
            query = $"insert into J_DocumentControl (NC_ID,Document,ChangeDate,NewRev,Notes)" +
                $"values({dc.NC_ID},'{dc.DocumentType}','{dc.ChangeDate}','{dc.NewRev}','{dc.Notes}')";
            return query;
        }

        public static string DeleteDocumentControl(int dcId)
        {
            query = $"delete  from J_DocumentControl where ID={dcId}";
            return query;
        }

        public static string UpdateDocumentControl(DocumentControlViewModel doc)
        {
            query = $"update J_DocumentControl set NC_ID={doc.NC_ID},Document='{doc.DocumentType}'" +
                $",ChangeDate='{doc.ChangeDate}',NewRev='{doc.NewRev}',Notes='{doc.Notes}' where ID={doc.ID}";
            return query;
        }


        #endregion

        #region OpenAction


        public static string GetAllOpenAction(RequestQuery requestQuery)
        {
            query = $"SELECT C_ActionList.ACTN_ID,C_ActionList.NC_ID, C_ActionList.Action_Type, C_ActionList.Actin_Def, C_ActionList.Responsible, C_ActionList.TargetDate, C_ActionList.CloseDate, C_ActionList.Status, B_NonConformityReport.NC_Type, B_NonConformityReport.NC_Id_Def," +
                $"B_NonConformityReport.NC_Customer_Supplier as CompanyId," +
                $" F_Operator.OperatorName as resbonsibleName,D_Company.CompanyName,E_Department.Department as DepartmentName," +
                $" B_NonConformityReport.Department, B_NonConformityReport.Process, B_NonConformityReport.PartNo as STK, B_NonConformityReport.Nc_OpenedBy, B_NonConformityReport.NC_OpenDate, B_NonConformityReport.NC_TargetDate, B_NonConformityReport.NC_Responsible,  C_ActionList.Status FROM C_ActionList INNER JOIN B_NonConformityReport ON C_ActionList.NC_ID = B_NonConformityReport.NC_ID" +
                $" left join F_Operator on C_ActionList.Responsible = Op_ID" +
                $" left Join D_Company on D_Company.Id_Cust = NC_Customer_Supplier" +
                $" left Join E_Department on E_Department.DEPT_ID = NC_Customer_Supplier" +
                $" WHERE C_ActionList.Status = 0 OR C_ActionList.Status Is Null and PartNo like '%{requestQuery.Stk}%' or PartNo Is Null" +
                $" order By ACTN_ID OFFSET {requestQuery.pageNumber} ROWS FETCH NEXT {requestQuery.pageSize} ROWS ONLY; ";
            return query;
        }


        public static string GetAllOpenActionCount = $" select COUNT(*) from (SELECT C_ActionList.ACTN_ID,C_ActionList.NC_ID, C_ActionList.Action_Type, C_ActionList.Actin_Def, C_ActionList.Responsible, C_ActionList.TargetDate, C_ActionList.CloseDate, B_NonConformityReport.NC_Type, B_NonConformityReport.NC_Id_Def," +
                  $"B_NonConformityReport.NC_Customer_Supplier as CompanyId," +
                  $" F_Operator.OperatorName as resbonsibleName,D_Company.CompanyName,E_Department.Department as DepartmentName," +
                  $" B_NonConformityReport.Department, B_NonConformityReport.Process, B_NonConformityReport.PartNo as STK, B_NonConformityReport.Nc_OpenedBy, B_NonConformityReport.NC_OpenDate, B_NonConformityReport.NC_TargetDate, B_NonConformityReport.NC_Responsible,  C_ActionList.Status FROM C_ActionList INNER JOIN B_NonConformityReport ON C_ActionList.NC_ID = B_NonConformityReport.NC_ID" +
                  $" left join F_Operator on C_ActionList.Responsible = Op_ID" +
                  $" left Join D_Company on D_Company.Id_Cust = NC_Customer_Supplier" +
                  $" left Join E_Department on E_Department.DEPT_ID = NC_Customer_Supplier" +
                  $" WHERE C_ActionList.Status = 0 OR C_ActionList.Status Is Null and PartNo like '%%' or PartNo Is Null) countNumber;";
        #endregion

        #endregion

        #region Reports 


        #region Production
        public static string GetProcutionReportWithFilter(RequestQuery r, string startAt, string endAt)

        {
            query = "SET DATEFORMAT dmy; WITH Sales AS(SELECT cast(S.Finish_time as Date) as finishTime, SUM(S.Ok_Qty) as total,[Group]  FROM  dbo.ProcessFlowDetail S INNER JOIN dbo.ProcessFlow I ON S.Flow_ID = I.Flow_ID INNER JOIN dbo.Process_Planning z     ON I.ProcessNo_ID = z.ProcessNo " +
                $" where Finish_time between '{startAt}' and '{endAt}' group by Finish_time, [Group], S.Ok_Qty " +
                    ") SELECT * FROM   Sales PIVOT(SUM(total) FOR[Group] IN([01_Kesim],[02_Büküm],[03_Havşa],[04_Kaynak],[041_KesDel],[042_Hazirlik],[05_Hortum],[06_Paketleme]" +
                    $",[06_PaketlemeDiğer],[06_test],[07_Mercedes],[99_Proto],[09_Kaplama],[08_UçŞekil])) P order by finishTime OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY";
            return query;
        }

        public static string GetProcutionReportWithoutFilter(RequestQuery r)
        {
            query = "SET DATEFORMAT dmy; WITH Sales AS(SELECT cast(S.Finish_time as Date) as finishTime, SUM(S.Ok_Qty) as total,[Group]  FROM  dbo.ProcessFlowDetail S INNER JOIN dbo.ProcessFlow I ON S.Flow_ID = I.Flow_ID INNER JOIN dbo.Process_Planning z     ON I.ProcessNo_ID = z.ProcessNo " +
                $"group by Finish_time, [Group], S.Ok_Qty " +
                    ") SELECT * FROM   Sales PIVOT(SUM(total) FOR[Group] IN([01_Kesim],[02_Büküm],[03_Havşa],[04_Kaynak],[041_KesDel],[042_Hazirlik],[05_Hortum],[06_Paketleme]" +
                    $",[06_PaketlemeDiğer],[06_test],[07_Mercedes],[99_Proto],[09_Kaplama],[08_UçŞekil])) P order by finishTime OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY";
            return query;
        }
        public static string GetProcutionReportCount()
        {
            query = "WITH Sales AS(SELECT cast(S.Finish_time as Date) as finishTime, SUM(S.Ok_Qty) as total,[Group]  FROM  dbo.ProcessFlowDetail S INNER JOIN dbo.ProcessFlow I ON S.Flow_ID = I.Flow_ID INNER JOIN dbo.Process_Planning z     ON I.ProcessNo_ID = z.ProcessNo group by Finish_time, [Group], S.Ok_Qty " +
                    ") SELECT * FROM   Sales PIVOT(SUM(total) FOR[Group] IN([01_Kesim],[02_Büküm],[03_Havşa],[04_Kaynak],[041_KesDel],[042_Hazirlik],[05_Hortum],[06_Paketleme]" +
                    $",[06_PaketlemeDiğer],[06_test],[07_Mercedes],[99_Proto],[09_Kaplama],[08_UçŞekil])) P ";
            return query;
        }
        #endregion
        #region ProductionDetails
        public static string GetProcutionDetailsReport(RequestQuery r, string startAt, string endAt, string v) => $@" SET DATEFORMAT dmy;SELECT CAST (Finish_time as date) AS FinishTime, Process_Planning.ProsesAdi,
 Sum(ProcessFlowDetail.Ok_Qty) AS Total,Local_ProductionOrders.PartNo_ID,
  dbo.Operator.Operator_Name as OperatorName, CAST (Start_time as datetime) AS startTime
  , CAST (Start_time as datetime) AS finishTimeWithHour, ProcessFlowDetail.Machine
FROM ProcessFlowDetail 
 INNER JOIN ProcessFlow ON ProcessFlowDetail.Flow_ID = ProcessFlow.Flow_ID 
 INNER JOIN Process_Planning ON ProcessFlow.ProcessNo_ID = Process_Planning.ProcessNo
  INNER JOIN dbo.Local_ProductionOrders on
    ProcessFlow.ProductOrder_ID = dbo.Local_ProductionOrders.ProductOrderID
	 INNER JOIN dbo.Operator ON ProcessFlowDetail.Operator = dbo.Operator.Operator_ID
	 where ProcessFlowDetail.Ok_Qty is not  null and PartNo_ID in ({v}) and Finish_time between '{startAt}' and '{endAt}'
GROUP BY CAST(Finish_time as date),PartNo_ID, Process_Planning.ProsesAdi, dbo.Operator.Operator_Name, ProcessFlowDetail.Start_time,
 ProcessFlowDetail.Finish_time, ProcessFlowDetail.Machine, ProcessFlowDetail.Finish_time
ORDER BY Finish_time  desc OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY

";

        public static string GetProcutionDetailsReportCount() => @" 
select COUNT(*) from( SELECT CAST (Finish_time as date) AS FinishTime, Process_Planning.ProsesAdi,
 Sum(ProcessFlowDetail.Ok_Qty) AS Total,Local_ProductionOrders.PartNo_ID,
  dbo.Operator.Operator_Name as OperatorName, CAST (Start_time as datetime) AS startTime
, ProcessFlowDetail.Machine
FROM ProcessFlowDetail 
 INNER JOIN ProcessFlow ON ProcessFlowDetail.Flow_ID = ProcessFlow.Flow_ID 
 INNER JOIN Process_Planning ON ProcessFlow.ProcessNo_ID = Process_Planning.ProcessNo
  INNER JOIN dbo.Local_ProductionOrders on
    ProcessFlow.ProductOrder_ID = dbo.Local_ProductionOrders.ProductOrderID
	 INNER JOIN dbo.Operator ON ProcessFlowDetail.Operator = dbo.Operator.Operator_ID
	 where ProcessFlowDetail.Ok_Qty is not  null 
GROUP BY CAST(Finish_time as date),PartNo_ID, Process_Planning.ProsesAdi, dbo.Operator.Operator_Name,
 ProcessFlowDetail.Start_time, ProcessFlowDetail.Finish_time, ProcessFlowDetail.Machine, ProcessFlowDetail.Finish_time) countNumber
";
        #endregion

        #region Defect 
        public static string GeDefectReportWithtFilter(RequestQuery r, string startAt, string endAt)
        {
            query = "SET DATEFORMAT dmy;DECLARE @cols AS nvarchar(max)DECLARE @query AS nvarchar(max)SELECT @cols = STUFF((SELECT DISTINCT    ',' + QUOTENAME([Group])FROM[dbo].Process_Planning order by 1 FOR xml PATH(''), TYPE ).value('.', 'NVARCHAR(MAX)')" +
                ", 1, 1, ''); set @query = N'WITH Sales AS (SELECT  DATEFROMPARTS(year(S.Finish_time), month(S.Finish_time), 1) as finishTime, Z.REject_Name, [Group], sum(S.Defect1_qty) as totalQty" +
                " FROM  dbo.ProcessFlowDetail S INNER JOIN dbo.ProcessFlow I on S.Flow_ID = I.Flow_ID inner join Process_Planning P on I.ProcessNo_ID = p.ProcessNo " +
                $"inner join Reject_def Z  on Z.Reject_ID = S.Defect1_Name WHERE S.Defect1_qty > 0   and Finish_time between ''{startAt}'' and ''{endAt}''" +
                " Group by S.Defect1_Name, Z.REject_Name, DATEFROMPARTS(year(S.Finish_time), month(S.Finish_time), 1),[Group] ) select* from Sales " +
                $" PIVOT(SUM(totalQty) FOR[Group] IN('+@cols+')) P order by finishTime OFFSET {r.pageNumber}  rows fetch next {r.pageSize} ROWS ONLY;   'EXECUTE sp_executesql @query;";
            return query;
        }

        public static string GeDefectReportWithoutFilter(RequestQuery r)
        {
            query = "DECLARE @cols AS nvarchar(max)DECLARE @query AS nvarchar(max)SELECT @cols = STUFF((SELECT DISTINCT    ',' + QUOTENAME([Group])FROM[dbo].Process_Planning order by 1 FOR xml PATH(''), TYPE ).value('.', 'NVARCHAR(MAX)')" +
                ", 1, 1, ''); set @query = N'WITH Sales AS (SELECT  DATEFROMPARTS(year(S.Finish_time), month(S.Finish_time), 1) as finishTime, Z.REject_Name, [Group], sum(S.Defect1_qty) as totalQty" +
                " FROM  dbo.ProcessFlowDetail S INNER JOIN dbo.ProcessFlow I on S.Flow_ID = I.Flow_ID inner join Process_Planning P on I.ProcessNo_ID = p.ProcessNo " +
                $" inner join Reject_def Z  on Z.Reject_ID = S.Defect1_Name WHERE S.Defect1_qty > 0" +
                " Group by S.Defect1_Name, Z.REject_Name, DATEFROMPARTS(year(S.Finish_time), month(S.Finish_time), 1),[Group] ) select* from Sales " +
                $" PIVOT(SUM(totalQty) FOR[Group] IN('+@cols+')) P order by finishTime OFFSET {r.pageNumber}  rows fetch next {r.pageSize} ROWS ONLY;   'EXECUTE sp_executesql @query;";
            return query;
        }

        public static string GeDefectReportCount()
        {
            query = "DECLARE @cols AS nvarchar(max)DECLARE @query AS nvarchar(max)SELECT @cols = STUFF((SELECT DISTINCT    ',' + QUOTENAME([Group])FROM[dbo].Process_Planning order by 1 FOR xml PATH(''), TYPE ).value('.', 'NVARCHAR(MAX)')" +
                ", 1, 1, ''); set @query = N'WITH Sales AS (SELECT  DATEFROMPARTS(year(S.Finish_time), month(S.Finish_time), 1) as finishTime, Z.REject_Name, [Group], sum(S.Defect1_qty) as totalQty" +
                " FROM  dbo.ProcessFlowDetail S INNER JOIN dbo.ProcessFlow I on S.Flow_ID = I.Flow_ID inner join Process_Planning P on I.ProcessNo_ID = p.ProcessNo " +
                $"inner join Reject_def Z  on Z.Reject_ID = S.Defect1_Name WHERE S.Defect1_qty > 0 " +
                " Group by S.Defect1_Name, Z.REject_Name, DATEFROMPARTS(year(S.Finish_time), month(S.Finish_time), 1),[Group] ) select* from Sales " +
                $" PIVOT(SUM(totalQty) FOR[Group] IN('+@cols+')) P ;'EXECUTE sp_executesql @query;";
            return query;
        }
        #endregion
        #region DefectDetails
        public static string GetDefectDetailsWithoutFilter(RequestQuery r, string v)
        {
            query = "SET DATEFORMAT dmy;SELECT Finish_time,Local_ProductionOrders.PartNo_ID, ProcessFlowDetail.Ok_Qty as OkQty, ProcessFlowDetail.Defect1_qty AS Adet," +
                " Reject_def.REject_Name as RejectName , Process_Planning.ProsesAdi " +
                " FROM ProcessFlowDetail INNER JOIN ProcessFlow ON ProcessFlowDetail.Flow_ID = ProcessFlow.Flow_ID " +
                " INNER JOIN dbo.Local_ProductionOrders ON ProcessFlow.ProductOrder_ID = dbo.Local_ProductionOrders.ProductOrderID " +
                " INNER JOIN Process_Planning ON ProcessFlow.ProcessNo_ID = Process_Planning.ProcessNo " +
                " INNER JOIN Reject_def ON ProcessFlowDetail.Defect1_Name = Reject_def.Reject_ID" +
                $" WHERE ProcessFlowDetail.Defect1_qty > 0 and PartNo_ID in ({v}) order by Finish_time offset {r.pageNumber} rows fetch next {r.pageSize} rows only;";
            return query;
        }


        public static string GetDefectDetailsWithFilter(RequestQuery r, string v, string startAt, string endAt)
        {
            query = "SET DATEFORMAT dmy;SELECT  cast(Finish_time as Date) as Finish_time,Local_ProductionOrders.PartNo_ID, ProcessFlowDetail.Ok_Qty as OkQty, ProcessFlowDetail.Defect1_qty AS Adet," +
                " Reject_def.REject_Name as RejectName , Process_Planning.ProsesAdi " +
                " FROM ProcessFlowDetail INNER JOIN ProcessFlow ON ProcessFlowDetail.Flow_ID = ProcessFlow.Flow_ID " +
                " INNER JOIN dbo.Local_ProductionOrders ON ProcessFlow.ProductOrder_ID = dbo.Local_ProductionOrders.ProductOrderID " +
                " INNER JOIN Process_Planning ON ProcessFlow.ProcessNo_ID = Process_Planning.ProcessNo " +
                " INNER JOIN Reject_def ON ProcessFlowDetail.Defect1_Name = Reject_def.Reject_ID" +
                $" WHERE ProcessFlowDetail.Defect1_qty > 0 and PartNo_ID in ({v}) and Finish_time between '{startAt}' and '{endAt}' " +
                $" order by Finish_time offset {r.pageNumber} rows fetch next {r.pageSize} rows only;";
            return query;
        }


        public static string GetDefectDetailsCount()
        {
            query = " select COUNT (*) from(SELECT Finish_time,Local_ProductionOrders.PartNo_ID, ProcessFlowDetail.Ok_Qty as OkQty, ProcessFlowDetail.Defect1_qty AS Adet," +
                " Reject_def.REject_Name as RejectName , Process_Planning.ProsesAdi " +
                " FROM ProcessFlowDetail INNER JOIN ProcessFlow ON ProcessFlowDetail.Flow_ID = ProcessFlow.Flow_ID " +
                " INNER JOIN dbo.Local_ProductionOrders ON ProcessFlow.ProductOrder_ID = dbo.Local_ProductionOrders.ProductOrderID " +
                " INNER JOIN Process_Planning ON ProcessFlow.ProcessNo_ID = Process_Planning.ProcessNo " +
                " INNER JOIN Reject_def ON ProcessFlowDetail.Defect1_Name = Reject_def.Reject_ID" +
                $" WHERE ProcessFlowDetail.Defect1_qty > 0 )countNumber";
            return query;
        }
        #endregion

        #region Rework 
        public static string GetReworkReport(RequestQuery r, string startAt, string endAt)
        {
            query = " SET DATEFORMAT dmy;WITH Sales AS(SELECT  DATEFROMPARTS(year(S.Finish_time), month(S.Finish_time), 1)" +
                " as finishTime, Z.REject_Name, sum(S.Rework_qty) as totalQty, p.ProsesAdi, Z.Reject_Code FROM  dbo.ProcessFlowDetail S " +
                " INNER JOIN dbo.ProcessFlow I on S.Flow_ID = I.Flow_ID inner join Process_Planning P on I.ProcessNo_ID =p.ProcessNo inner join Reject_def Z  on Z.Reject_ID = S.Rework_Name" +
                $" WHERE S.Rework_qty > 0  and S.Finish_time  between '{startAt}' and '{endAt}' Group by  DATEFROMPARTS(year(S.Finish_time), month(S.Finish_time), 1),S.Defect1_Name, Z.Reject_Code, Z.REject_Name, p.ProsesAdi)" +
                " select* from Sales PIVOT(SUM(totalQty) FOR ProsesAdi IN([Basınç Testi],[Basınç Testi 1],[Büküm],[Çinko Kaplama],[Etiketleme],[Fikstür Kontrol],[Hortum Sıkma],[Hortum Üretim],[Markalama],[Paketleme],[Sızdırmazlık Kaynağı]))" +
               $" P order by finishTime   OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY";
            return query;
        }
        public static string GetReworkReportCount() => @"SET DATEFORMAT dmy;
WITH Sales AS 
(SELECT  DATEFROMPARTS(year(S.Finish_time), month(S.Finish_time), 1) 
   as finishTime, Z.REject_Name, sum(S.Rework_qty) as totalQty,p.ProsesAdi ,Z.Reject_Code FROM  dbo.ProcessFlowDetail S
    INNER JOIN dbo.ProcessFlow I on S.Flow_ID = I.Flow_ID inner join Process_Planning P on I.ProcessNo_ID = 
	p.ProcessNo inner join Reject_def Z  on Z.Reject_ID = S.Rework_Name
	WHERE S.Rework_qty>0
	 Group by  DATEFROMPARTS(year(S.Finish_time), month(S.Finish_time), 1),
	S.Defect1_Name,Z.Reject_Code, Z.REject_Name, p.ProsesAdi)
	select* from Sales  
	PIVOT(SUM(totalQty) FOR ProsesAdi IN([Basınç Testi],[Basınç Testi 1],[Büküm],[Çinko Kaplama],[Etiketleme],[Fikstür Kontrol],[Hortum Sıkma],[Hortum Üretim],[Markalama],[Paketleme],[Sızdırmazlık Kaynağı]))
	 P order by finishTime 
";
        #endregion
        #region ReWork Details

        public static string GetReworkDetailsReport(RequestQuery r ,string startAt ,string endAt,string v) => $@"SET DATEFORMAT dmy;SELECT  Local_ProductionOrders.PartNo_ID, 
 CAST(ProcessFlowDetail.Finish_time as date) as FinishTime,  ProcessFlowDetail.Rework_Name,ProcessFlowDetail.Rework_qty as ReworkQty,Process_Planning.ProsesAdi,
  ProcessFlow.ProcessNo_ID,Reject_def.REject_Name as RejectName
FROM ProcessFlowDetail INNER JOIN ProcessFlow ON ProcessFlowDetail.Flow_ID = ProcessFlow.Flow_ID
INNER JOIN dbo.Local_ProductionOrders ON ProcessFlow.ProductOrder_ID = dbo.Local_ProductionOrders.ProductOrderID
inner join Process_Planning on ProcessFlow.ProcessNo_ID= Process_Planning.ProcessNo
inner join dbo.Reject_def on dbo.Reject_def.Reject_ID=ProcessFlowDetail.Rework_Name
WHERE (((ProcessFlowDetail.Rework_qty)>0)) and PartNo_ID in ({v})   and  Finish_time between '{startAt}' and '{endAt}' 
 order by Finish_time OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY;
";

        public static string GetReworkDetailsReportCount() => @"select count(*) from(SELECT  Local_ProductionOrders.PartNo_ID, 
 CAST(ProcessFlowDetail.Finish_time as date) as FinishTime,  ProcessFlowDetail.Rework_Name,ProcessFlowDetail.Rework_qty,Process_Planning.ProsesAdi,
  ProcessFlow.ProcessNo_ID,Reject_def.REject_Name
FROM ProcessFlowDetail INNER JOIN ProcessFlow ON ProcessFlowDetail.Flow_ID = ProcessFlow.Flow_ID
INNER JOIN dbo.Local_ProductionOrders ON ProcessFlow.ProductOrder_ID = dbo.Local_ProductionOrders.ProductOrderID
inner join Process_Planning on ProcessFlow.ProcessNo_ID= Process_Planning.ProcessNo
inner join dbo.Reject_def on dbo.Reject_def.Reject_ID=ProcessFlowDetail.Rework_Name
WHERE ProcessFlowDetail.Rework_qty>0) countnumber
";
        #endregion


        #region LostQty
        public static string GetLostQtyReport (RequestQuery r) => $@"SELECT Local_ProductionOrders.PartNo_ID,Local_ProductionOrders.LotNo, Process_Planning.ProsesAdi,
[Process_qty]-[Ok_Qty]-[Process_reject]-[Process_Rework] AS Miktar
 FROM ProcessFlow INNER JOIN 
 dbo.Local_ProductionOrders ON ProcessFlow.ProductOrder_ID = dbo.Local_ProductionOrders.ProductOrderID
 inner join Process_Planning on ProcessFlow.ProcessNo_ID= Process_Planning.ProcessNo
   WHERE ((([Process_qty]-[Ok_Qty]-[Process_reject]-[Process_Rework])>0) AND
    ((dbo.Local_ProductionOrders.Status)=3)) and LotNo like '%{r.lotNo}%'
	ORDER BY LotNo  desc OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY;";

        public static string GetLostQtyReportCount() => @"select count(*) from(SELECT Local_ProductionOrders.PartNo_ID,Local_ProductionOrders.LotNo, Process_Planning.ProsesAdi,
[Process_qty]-[Ok_Qty]-[Process_reject]-[Process_Rework] AS Miktar
 FROM ProcessFlow INNER JOIN 
 dbo.Local_ProductionOrders ON ProcessFlow.ProductOrder_ID = dbo.Local_ProductionOrders.ProductOrderID
 inner join Process_Planning on ProcessFlow.ProcessNo_ID= Process_Planning.ProcessNo
   WHERE ((([Process_qty]-[Ok_Qty]-[Process_reject]-[Process_Rework])>0) AND
    ((dbo.Local_ProductionOrders.Status)=3)))countNumber";
        #endregion

        #region SupplierPref 
        public static string GetSupplierPerfReport(RequestQuery r,string startAt,string endAt) => $@"SET DATEFORMAT dmy;SELECT dbo.CARIGEN.STA, dbo.SIPAR.EVRAKNO AS SIPEVRAKNO, dbo.SIPARIS_ALT.STK, dbo.SIPARIS_ALT.MIKTAR AS OrderQty,
CAST(dbo.SIPARIS_ALT.TESTARIHI as date)SiparisAltiTestTarihi,CAST(dbo.STOK_ALT.TARIH as date)StokAltTarihi, Sum(dbo.STOK_ALT.MIKTAR) AS TotalInvoice,
dbo.SIPARIS_ALT.TURAC, dbo.SIPARIS_ALT.TUR
FROM((dbo.SIPARIS_ALT LEFT JOIN dbo.STOK_ALT ON (dbo.SIPARIS_ALT.STOKP_ID = dbo.STOK_ALT.STOKP_ID) AND(dbo.SIPARIS_ALT.P_ID = dbo.STOK_ALT.SIP_PID)) 
LEFT JOIN dbo.SIPAR ON dbo.SIPARIS_ALT.P_ID = dbo.SIPAR.P_ID) 
LEFT JOIN dbo.CARIGEN ON dbo.SIPAR.CARIREF = dbo.CARIGEN.REF
where SIPARIS_ALT.STK like '%{r.Stk}%' and STOK_ALT.TARIH between '{startAt}' and '{endAt}'
GROUP BY dbo.CARIGEN.STA, dbo.SIPAR.EVRAKNO, dbo.SIPARIS_ALT.STK, dbo.SIPARIS_ALT.MIKTAR,
dbo.SIPARIS_ALT.TESTARIHI, dbo.STOK_ALT.TARIH, dbo.SIPARIS_ALT.TURAC, dbo.SIPARIS_ALT.TUR
HAVING (((dbo.SIPARIS_ALT.TESTARIHI)<GETDATE()) AND((dbo.SIPARIS_ALT.TUR)= 91))
ORDER BY dbo.CARIGEN.STA, dbo.SIPAR.EVRAKNO, dbo.SIPARIS_ALT.TESTARIHI
OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY

";

        public static string GetSupplierPerfReportCount() => @"select Count(*) from (SELECT dbo.CARIGEN.STA, dbo.SIPAR.EVRAKNO AS SIPEVRAKNO, dbo.SIPARIS_ALT.STK, dbo.SIPARIS_ALT.MIKTAR AS OrderQty,
CAST(dbo.SIPARIS_ALT.TESTARIHI as date)SiparisAltiTestTarihi,CAST(dbo.STOK_ALT.TARIH as date)StokAltTarihi, Sum( dbo.STOK_ALT.MIKTAR) AS TotalInvoice, 
 dbo.SIPARIS_ALT.TURAC, dbo.SIPARIS_ALT.TUR
FROM (( dbo.SIPARIS_ALT LEFT JOIN dbo.STOK_ALT ON ( dbo.SIPARIS_ALT.STOKP_ID = dbo.STOK_ALT.STOKP_ID) AND ( dbo.SIPARIS_ALT.P_ID = dbo.STOK_ALT.SIP_PID)) 
LEFT JOIN dbo.SIPAR ON dbo.SIPARIS_ALT.P_ID = dbo.SIPAR.P_ID) 
LEFT JOIN dbo.CARIGEN ON dbo.SIPAR.CARIREF = dbo.CARIGEN.REF
GROUP BY dbo.CARIGEN.STA, dbo.SIPAR.EVRAKNO, dbo.SIPARIS_ALT.STK, dbo.SIPARIS_ALT.MIKTAR, 
dbo.SIPARIS_ALT.TESTARIHI, dbo.STOK_ALT.TARIH, dbo.SIPARIS_ALT.TURAC, dbo.SIPARIS_ALT.TUR
HAVING ((( dbo.SIPARIS_ALT.TESTARIHI)<GETDATE()) AND (( dbo.SIPARIS_ALT.TUR)=91)))countNumber

";

        #endregion

        #region Customer Perf

        public static string GetCustomerperfReport(RequestQuery r, string startAt, string endAt) => $@"SET DATEFORMAT dmy;SELECT  dbo.SIPAR.CARIADI,  dbo.SIPAR.EVRAKNO AS SIPEVRAKNO,  dbo.SIPARIS_ALT.STK, 
 dbo.SIPARIS_ALT.MIKTAR AS OrderQty,  CAST(dbo.SIPARIS_ALT.TESTARIHI as date) SiparisAltiTestTarihi,
   cast(dbo.STOK_ALT.TARIH as date) StokAltiTarihi, Sum( dbo.STOK_ALT.MIKTAR) AS TotalInvoice,  dbo.SIPARIS_ALT.TURAC, 
    dbo.SIPARIS_ALT.TUR
FROM ( dbo.SIPARIS_ALT LEFT JOIN  dbo.STOK_ALT ON ( dbo.SIPARIS_ALT.STOKP_ID =  dbo.STOK_ALT.STOKP_ID) 
AND ( dbo.SIPARIS_ALT.P_ID =  dbo.STOK_ALT.SIP_PID)) LEFT JOIN  dbo.SIPAR ON  dbo.SIPARIS_ALT.P_ID =  dbo.SIPAR.P_ID
where SIPARIS_ALT.STK like '%{r.Stk}%' and  STOK_ALT.TARIH between '{startAt}' and '{endAt}'
GROUP BY  dbo.SIPAR.CARIADI,  dbo.SIPAR.EVRAKNO,  dbo.SIPARIS_ALT.STK,  dbo.SIPARIS_ALT.MIKTAR,
  dbo.SIPARIS_ALT.TESTARIHI,  dbo.STOK_ALT.TARIH,  dbo.SIPARIS_ALT.TURAC,  dbo.SIPARIS_ALT.TUR
HAVING ((( dbo.SIPARIS_ALT.TESTARIHI)<GetDate()) AND (( dbo.SIPARIS_ALT.TUR)=90))
ORDER BY  dbo.SIPAR.CARIADI,  dbo.SIPAR.EVRAKNO,  dbo.SIPARIS_ALT.TESTARIHI 
 OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY;";

        public static string GetCustomerperfReportCount() => @"select Count(*) from(SELECT  dbo.SIPAR.CARIADI,  dbo.SIPAR.EVRAKNO AS SIPEVRAKNO,  dbo.SIPARIS_ALT.STK, 
 dbo.SIPARIS_ALT.MIKTAR AS OrderQty,  CAST(dbo.SIPARIS_ALT.TESTARIHI as date) SiparisAltiTestTarihi,
   cast(dbo.STOK_ALT.TARIH as date) StokAltiTarihi, Sum( dbo.STOK_ALT.MIKTAR) AS TotalInvoice,  dbo.SIPARIS_ALT.TURAC, 
    dbo.SIPARIS_ALT.TUR
FROM ( dbo.SIPARIS_ALT LEFT JOIN  dbo.STOK_ALT ON ( dbo.SIPARIS_ALT.STOKP_ID =  dbo.STOK_ALT.STOKP_ID) 
AND ( dbo.SIPARIS_ALT.P_ID =  dbo.STOK_ALT.SIP_PID)) LEFT JOIN  dbo.SIPAR ON  dbo.SIPARIS_ALT.P_ID =  dbo.SIPAR.P_ID
GROUP BY  dbo.SIPAR.CARIADI,  dbo.SIPAR.EVRAKNO,  dbo.SIPARIS_ALT.STK,  dbo.SIPARIS_ALT.MIKTAR,
  dbo.SIPARIS_ALT.TESTARIHI,  dbo.STOK_ALT.TARIH,  dbo.SIPARIS_ALT.TURAC,  dbo.SIPARIS_ALT.TUR
HAVING ((( dbo.SIPARIS_ALT.TESTARIHI)<GetDate()) AND (( dbo.SIPARIS_ALT.TUR)=90)) )countNumber
";
        #endregion


        #region ProcessPlan
        public static string GetProcessPlanReport(RequestQuery r,string startAt,string endAt) =>$@" SET DATEFORMAT dmy; select    ID,ProcessDate,[Group],ProsesAdi,PartNo,WOLot,RemainProcessqty,
 WONewDate,Balance
 from  dbo.ProcessPlanFollowTable where RemainProcessqty >0 and [Group] like
  '%{r.Group}%' and PartNo like '%{r.Stk}%'  and ProcessDate between '{startAt}' and '{endAt}'
  ORDER BY ID  asc OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY";
        public static string GetProcessPlanReportCount() => @"select COUNT(*) from( select    ID,ProcessDate,[Group],ProsesAdi,PartNo,WOLot,RemainProcessqty,
 WONewDate,Balance
 from  dbo.ProcessPlanFollowTable where RemainProcessqty >0)countNumber";
        #endregion


        #endregion
    }
}
