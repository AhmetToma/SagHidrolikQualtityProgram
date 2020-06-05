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
       public static string connctionString_SAG_HIDROLIK_ByYear() =>
        $"Server={ServerName};Database=SAG_HIDROLIK_{WorkingWithYears.currentYear}T;User Id='{userId}';Password='{password}';";

      */
        public static string query;
        public const string ServerName = "AhmetPc\\SQLEXPRESS";
        public const string userId = "";
        public const string password = "";
        public static string connctionString_SAG_PRODUCTION = $"Server={ServerName};Database=SAG_PRODUCTION;Trusted_Connection=True";
        public static string connctionString_SAG_HIDROLIK_ByYear() =>
        $"Server=AhmetPc\\SQLEXPRESS;Database=SAG_HIDROLIK_{WorkingWithYears.currentYear}T;Trusted_Connection=True";
        public static string SagHidrolikAuthentication =
        $"Server=AhmetPc\\SQLEXPRESS;Database=SagHidrolikAuthentication;Trusted_Connection=True";

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

            query = $@"select  ProductOrderID,PartNo,PartNo_ID,LotNo,Qty,Completed_Qty,
convert(varchar(10), cast(IssueDate As Date), 104) as IssueDate ,
convert(varchar(10), cast(RequireDate As Date), 104) as RequireDate ,
convert(varchar(10), cast(RevisedDate As Date), 104) as RevisedDate ,
convert(varchar(10), cast(CloseDate As Date), 104) as CloseDate ,
Printed,[Status],Remark from dbo.Local_ProductionOrders where dbo.Local_ProductionOrders.PartNo_ID='{requestQuery.pid}' Order By LotNo desc  
                 OFFSET { requestQuery.pageNumber} ROWS FETCH NEXT { requestQuery.pageSize} ROWS ONLY;";
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
                $" order By BOM_Process.OrderNo OFFSET {requestQuery.pageNumber} ROWS FETCH NEXT {requestQuery.pageSize} ROWS ONLY; ";
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
              $" order by ProsesAdi OFFSET { requestQuery.pageNumber}ROWS FETCH NEXT { requestQuery.pageSize} ROWS ONLY;";
            return query;
        }
        public static string GetStokRecetesi(RequestQuery request)
        {
            query = $"SELECT * FROM TSTOKRECETESI WHERE STOKP_ID ='{request.pid}'" +
                $" order by TSTOKRECETESI.REF OFFSET  {request.pageNumber} rows fetch next {request.pageSize} rows only; ";
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


        #region FindInBom

        public static string GetAllFindInBom(RequestQuery requestQuery)
        {
            query = $"SELECT dbo.STOKGEN.STK AS PartNo, dbo.TSTOKRECETESI.STK AS Material, dbo.TSTOKRECETESI.STA, dbo.TSTOKRECETESI.MIKTAR" +
                $" FROM dbo.TSTOKRECETESI INNER JOIN dbo.STOKGEN ON dbo.TSTOKRECETESI.STOKP_ID = dbo.STOKGEN.P_ID where STOKGEN.STK like '%{requestQuery.Stk}%'" +
                $"  and  dbo.TSTOKRECETESI.STK like'%{requestQuery.material}%'GROUP BY dbo.STOKGEN.STK, dbo.TSTOKRECETESI.STK, dbo.TSTOKRECETESI.STA, dbo.TSTOKRECETESI.MIKTAR" +
                $"  order By PartNo OFFSET {requestQuery.pageNumber} ROWS FETCH NEXT {requestQuery.pageSize} ROWS ONLY; ";
            return query;
        }


        public static string GetAllFindInBomCount = "select COUNT(*) from( SELECT dbo.STOKGEN.STK AS PartNo, dbo.TSTOKRECETESI.STK AS Material, dbo.TSTOKRECETESI.STA, dbo.TSTOKRECETESI.MIKTAR" +
            " FROM dbo.TSTOKRECETESI INNER JOIN dbo.STOKGEN ON dbo.TSTOKRECETESI.STOKP_ID = dbo.STOKGEN.P_ID" +
            " GROUP BY dbo.STOKGEN.STK, dbo.TSTOKRECETESI.STK, dbo.TSTOKRECETESI.STA, dbo.TSTOKRECETESI.MIKTAR)numberCount";
        #endregion
        #endregion

        #region Uretim

        public static string GetAktiveMachine = "SELECT  [dbo].[10_MakinaListesiNew].Machine_Id, " +
            "[dbo].[10_MakinaListesiNew].Machine_no,[dbo].[10_MakinaListesiNew].Machine_Name," +
            "[dbo].[10_MakinaListesiNew].Aktif2 FROM  [dbo].[10_MakinaListesiNew]" +
            " WHERE((( [dbo].[10_MakinaListesiNew].Aktif2)= 1))ORDER BY  [dbo].[10_MakinaListesiNew].Machine_no";
        public static string GetMachineNameByMachineNo(string Machine_Id)
        {
            query = $"SELECT  [dbo].[10_MakinaListesiNew].Machine_Id, [dbo].[10_MakinaListesiNew].Machine_no," +
                $" [dbo].[10_MakinaListesiNew].Machine_Name," +
                $" [dbo].[10_MakinaListesiNew].MODEL FROM  [dbo].[10_MakinaListesiNew] " +
                $"where  [dbo].[10_MakinaListesiNew].Machine_Id='{Machine_Id}'";
            return query;
        }

        public static string GetFire(int Reject_ID)
        {
            if (Reject_ID == 0)
                return query = "SELECT Reject_def.Reject_ID,Reject_def.Reject_Code,Reject_def.REject_Name" +
                  " FROM Reject_def";
            return query = "SELECT Reject_def.Reject_ID,Reject_def.Reject_Code,Reject_def.REject_Name" +
               $" FROM Reject_def where Reject_ID  like '%{Reject_ID}%'";

        }


        public static string GetProceesFlow(RequestQuery requestQuery)
        {
            query = "SELECT dbo.Process_Planning.ProsesAdi,ProcessNo,dbo.Local_ProductionOrders.PartNo_ID, ProcessFlow.Flow_ID, ProcessFlow.ProductOrder_ID, ProcessFlow.ProcessNo_ID, " +
                " [Process_qty] -[Ok_Qty] -[Process_reject] -[Process_Rework] AS Miktar, ProcessFlow.Require_Date, dbo.Local_ProductionOrders.Status, " +
                " dbo.Local_ProductionOrders.LotNo FROM   ProcessFlow INNER JOIN dbo.Local_ProductionOrders ON ProcessFlow.ProductOrder_ID = dbo.Local_ProductionOrders.ProductOrderID" +
                " left join dbo.Process_Planning on Process_Planning.ProcessNo = ProcessFlow.ProcessNo_ID WHERE((([Process_qty] -[Ok_Qty] -[Process_reject] -[Process_Rework]) > 0) AND((dbo.Local_ProductionOrders.Status) = 2))" +
                $" and LotNo like '%{requestQuery.lotNo}%' " +
                " order By  dbo.Local_ProductionOrders.LotNo asc ;";
            return query;
        }
        public static string StartIsEmriAndWriteToFlowDetails(ProcessFlowDetailsViewModel proFlowVM)
        {
            query = $" SET DATEFORMAT dmy;insert into dbo.ProcessFlowDetail(Flow_ID,Operator,Machine,Start_time) values ({proFlowVM.Flow_ID},{proFlowVM.Operator},{proFlowVM.processno_id},GETDATE())";
            return query;
        }
        public static string GetOperatorPolivalance(OperatorPolivalanceViewModel operatorPolivalanceViewModel)
        {
            query = $"SELECT OperatorPolivalance.OperatorNo, OperatorPolivalance.ProcessNo FROM OperatorPolivalance WHERE OperatorPolivalance.OperatorNo = '{operatorPolivalanceViewModel.operator_ID}'" +
                $" AND OperatorPolivalance.ProcessNo = '{operatorPolivalanceViewModel.processno_id}'";
            return query;
        }
        public static string CheckFlowIdByFinishTimeInFlowDetails(string flow_ID)
        {
            query = " SELECT ProcessFlowDetail.Flow_ID, ProcessFlowDetail.Operator,ProcessFlowDetail.Machine,ProcessFlowDetail.Start_time FROM ProcessFlowDetail" +
             $" WHERE ProcessFlowDetail.Flow_ID = {flow_ID}  AND ProcessFlowDetail.Finish_time Is Null;";
            return query;
        }
        public static string GetProcessFlowClose(RequestQuery requestQuery)
        {
            query = "SELECT ProcessFlowDetail.ID,ProcessFlowDetail.Flow_ID, [dbo].[10_MakinaListesiNew].Machine_no, ProcessFlowDetail.Operator, " +
                " dbo.Operator.Operator_Name, ProcessFlowDetail.Machine," +
                " dbo.Local_ProductionOrders.PartNo_ID," +
                " ProcessFlowDetail.Start_time,ProcessFlowDetail.Finish_time,dbo.Local_ProductionOrders.LotNo, ProcessFlow.ProcessNo_ID, ProcessFlow.Process_qty, " +
                " ProcessFlow.Ok_Qty, ProcessFlow.Process_reject, Process_Planning.ProsesAdi," +
                " ProcessFlow.Process_Rework FROM ProcessFlowDetail INNER JOIN ProcessFlow " +
                " ON ProcessFlowDetail.Flow_ID = ProcessFlow.Flow_ID INNER JOIN dbo.Local_ProductionOrders " +
                " ON ProcessFlow.ProductOrder_ID = dbo.Local_ProductionOrders.ProductOrderID " +
                " inner Join Process_Planning on Process_Planning.ProcessNo = ProcessFlow.ProcessNo_ID " +
                " inner join dbo.Operator on dbo.Operator.Operator_ID = ProcessFlowDetail.Operator " +
                " inner Join  [dbo].[10_MakinaListesiNew] on  [dbo].[10_MakinaListesiNew].Machine_Id = ProcessFlowDetail.Machine " +
                " WHERE(((ProcessFlowDetail.Finish_time)Is Null) AND((dbo.Local_ProductionOrders.Status) = 2))" +
                $" And dbo.Local_ProductionOrders.LotNo like '%{requestQuery.lotNo}%'" +
                $" order By dbo.Local_ProductionOrders.LotNo asc OFFSET { requestQuery.pageNumber} ROWS FETCH NEXT { requestQuery.pageSize}ROWS ONLY;";
            return query;
        }
        public static string uretimBitir1_processflow(UretimBitirViewModel ubvm)
        {
            int f1 = ubvm.fire1.inpValue ?? 0;
            int f2 = ubvm.fire2.inpValue ?? 0;
            int toplamFire = f1 + f2;
            query = $"UPDATE ProcessFlow SET ProcessFlow.Ok_Qty = ProcessFlow.Ok_Qty +{ ubvm.Miktar}," +
                $" ProcessFlow.Process_reject = ProcessFlow.Process_reject + {toplamFire} ," +
                $" ProcessFlow.Process_Rework = ProcessFlow.Process_Rework + {ubvm.tamir.inpValue} " +
                $" WHERE ProcessFlow.Flow_ID ='{ ubvm.flow_Id}'";

            return query;
        }
        public static string uretimBitir2_processflowDetails(UretimBitirViewModel ubvm)
        {
            int f1 = ubvm.fire1.inpValue ?? 0;
            int f2 = ubvm.fire2.inpValue ?? 0;
            string finishTime = DateTime.Now.ToString("dd/MM/yyyy HH:mm");
            int toplamFire = f1 + f2;
            query = $"SET DATEFORMAT dmy;UPDATE ProcessFlowDetail SET ProcessFlowDetail.Finish_time = '{finishTime}', ProcessFlowDetail.Np_time ={ ubvm.durus.dk},  " +
                $" ProcessFlowDetail.Np_Def = '{ubvm.durus.note}',ProcessFlowDetail.Defect1_qty = { ubvm.fire1.inpValue}," +
                $" ProcessFlowDetail.Defect1_Name = { ubvm.fire1.id},ProcessFlowDetail.Defect2_qty = { ubvm.fire2.inpValue}, ProcessFlowDetail.Defect2_Name = { ubvm.fire2.id} ,ProcessFlowDetail.Rework_qty = { ubvm.tamir.inpValue}," +
                $" ProcessFlowDetail.Rework_Name = {ubvm.tamir.id}, " +
                $"  ProcessFlowDetail.Ok_Qty = {ubvm.Miktar} WHERE ProcessFlowDetail.ID ={ubvm.FlowDetailsId}";
            return query;
        }
        public static string uretimBitir3_processFlow(string flowId)
        {
            query = $" SELECT  * FROM ProcessFlow WHERE ProcessFlow.Flow_ID='{flowId}'";
            return query;

        }
        public static string uretimBitir4_ProcessPlanFollowTable(int Miktar, int lotNo, string ProcessNo_ID)
        {
            query = $"UPDATE ProcessPlanFollowTable SET ProcessPlanFollowTable.RemainProcessqty =ProcessPlanFollowTable.RemainProcessqty-{Miktar} WHERE ProcessPlanFollowTable.WOLot = {lotNo}" +
                $"  AND ProcessPlanFollowTable.ProcessNo_ID = {ProcessNo_ID}";
            return query;
        }
        // if nextproceess=0
        public static string uretimBitir5_ProductionOrdersQty1(int Miktar, string WoNo)
        {
            query = " UPDATE dbo.Local_ProductionOrders SET dbo.Local_ProductionOrders.Completed_Qty = isnull(dbo.Local_ProductionOrders.Completed_Qty,0)+" +
                $"{Miktar} WHERE dbo.Local_ProductionOrders.ProductOrderID ='{WoNo}'";
            return query;
        }

        public static string uretimBitir6_ProductionOrdersQty2(int? fire1, int? fire2, int? tamir, string WoNo)
        {
            query = $"UPDATE dbo.Local_ProductionOrders SET dbo.Local_ProductionOrders.Completed_Qty = isnull(dbo.Local_ProductionOrders.Completed_Qty,0)+{fire1} +{fire2}" +
                $"+{ tamir} WHERE dbo.Local_ProductionOrders.ProductOrderID ='{WoNo}'";
            return query;
        }
        public static string uretimBitir7ProcessFlowWithNextProcess(int Miktar, string WoNo, string NextProcess)
        {
            query = $"UPDATE ProcessFlow SET ProcessFlow.Process_qty = isNull(ProcessFlow.Process_qty,0)+ {Miktar} WHERE ProcessFlow.ProductOrder_ID= {WoNo}" +
                $" AND ProcessFlow.ProcessNo_ID = { NextProcess}";
            return query;
        }
        public static string uretimBitir6_ProductionOrdersStatus()
        {
            var now = DateTime.Now.ToString("MM/dd/yyyy HH:mm");
            query = $"UPDATE dbo.Local_ProductionOrders SET dbo.Local_ProductionOrders.Status = 3, dbo.Local_ProductionOrders.CloseDate ='{now}' where " +
                $"dbo.Local_ProductionOrders.Status = 2 AND IIf((dbo.Local_ProductionOrders.Completed_Qty / dbo.Local_ProductionOrders.Qty) > 0.95, 1, 0) = 1";
            return query;
        }

        public static string GetAktiveOperators = "SELECT dbo.Operator.Operator_ID, dbo.Operator.Operator_Name, dbo.Operator.Aktif FROM dbo.Operator WHERE(((Operator.Aktif)= 1)) " +
                        "ORDER BY dbo.Operator.Operator_Name";
        public static string GetProductOrderByStokgenId(RequestQuery requetQuery)
        {
            query = $"select * from dbo.Local_ProductionOrders where dbo.Local_ProductionOrders.PartNo_ID={requetQuery.pid}" +
 "order By dbo.Local_ProductionOrders.LotNo desc";

            return query;
        }



        public static string GetAllUretimPlani(RequestQuery requestQuery)
        {
            query = "SELECT ProcessPlanFollowTable.ID, ProcessPlanFollowTable.ProcessDate, " +
                   " dbo.ProcessPlanFollowTable.[Group], ProcessPlanFollowTable.ProsesAdi, ProcessPlanFollowTable.PartNo, ProcessPlanFollowTable.WOLot, ProcessPlanFollowTable.RemainProcessqty, ProcessPlanFollowTable.WONewDate, ProcessPlanFollowTable.Balance, ProcessPlanFollowTable.Order_no, ProcessPlanFollowTable.ProcessNo_ID, ProcessPlanFollowTable.Qty, ProcessPlanFollowTable.Process_qty, ProcessPlanFollowTable.Ok_Qty, ProcessPlanFollowTable.Process_reject, ProcessPlanFollowTable.Process_Rework, ProcessPlanFollowTable.Complete " +
                   " FROM ProcessPlanFollowTable " +
                   " WHERE(((ProcessPlanFollowTable.RemainProcessqty) > 0)) " +
                   $" and ProcessPlanFollowTable.PartNo like '%{requestQuery.Stk}%'" +
                   $" and ProcessPlanFollowTable.[Group] like N'%{requestQuery.uretimPlaniType}%'" +
                   $" order by ProcessDate asc OFFSET {requestQuery.pageNumber} ROWS FETCH NEXT {requestQuery.pageSize} ROWS ONLY";
            return query;
        }


        public static string GetAllGunlukHatBazindUretimList(RequestQuery requestQuery)
        {
            query = $"select ProcessFlowDetail.Finish_time AS FinishTime,Process_Planning.ProsesAdi,dbo.Local_ProductionOrders.PartNo_ID," +
$" Sum(ProcessFlowDetail.Ok_Qty) AS Total, Operator.Operator_Name,ProcessFlowDetail.Start_time,dbo.[10_MakinaListesiNew].Machine_no " +
$" FROM (((ProcessFlowDetail INNER JOIN ProcessFlow ON ProcessFlowDetail.Flow_ID = ProcessFlow.Flow_ID) INNER JOIN Process_Planning " +
$" ON ProcessFlow.ProcessNo_ID = Process_Planning.ProcessNo)" +
$" inner join dbo.[10_MakinaListesiNew] on dbo.[10_MakinaListesiNew].Machine_Id = ProcessFlowDetail.Machine inner join Local_ProductionOrders " +
$" ON ProcessFlow.ProductOrder_ID = Local_ProductionOrders.ProductOrderID) " +
$" INNER JOIN Operator ON ProcessFlowDetail.Operator = Operator.Operator_ID " +
$" where Process_Planning.ProsesAdi like N'%{requestQuery.processAdi}%' and dbo.[10_MakinaListesiNew].Machine_no like '%{requestQuery.machineNo}%' " +
$" GROUP BY ProcessFlowDetail.Finish_time, Process_Planning.ProsesAdi,Operator.Operator_Name, ProcessFlowDetail.Start_time, " +
$" ProcessFlowDetail.Finish_time,ProcessFlowDetail.Machine,ProcessFlowDetail.Finish_time, Local_ProductionOrders.PartNo_ID " +
$" ,dbo.[10_MakinaListesiNew].Machine_no ORDER BY Finish_time DESC" +
$" OFFSET {requestQuery.pageNumber} ROWS FETCH NEXT {requestQuery.pageSize} ROWS ONLY;";
            return query;
        }

        #region Production Summary
        public static string GetProductionSummaryReport(RequestQuery r, string m)
        {
            query = $"WITH Sales AS ( SELECT S.PartNo_ID, z.[Group],SUM((I.Process_qty - I.Ok_Qty - I.Process_reject - I.Process_Rework)) as toplam " +
                $" FROM dbo.Local_ProductionOrders S INNER JOIN dbo.ProcessFlow I  ON S.ProductOrderID = I.ProductOrder_ID" +
                $" INNER JOIN dbo.Process_Planning z ON I.ProcessNo_ID = z.ProcessNo" +
                $" WHERE([Process_qty] -[Ok_Qty] -[Process_reject] -[Process_Rework])> 0 AND S.[Status]=2 and S.PartNo_ID in ({m}) " +
                $" Group by PartNo_ID,I.Process_qty,I.Ok_Qty,I.Process_reject,I.Process_Rework,z.[Group])  SELECT* FROM   Sales" +
                $" PIVOT(SUM(toplam) FOR  [Group] IN ([01_Kesim],[02_Büküm],[03_Havşa],[04_Kaynak],[041_KesDel],[042_Hazirlik],[05_Hortum],[06_Paketleme],[06_PaketlemeDiğer],[06_test],[07_Mercedes],[99_Proto],[09_Kaplama],[08_UçŞekil]" +
                $"   )) P order by PartNo_ID OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY;";
            return query;
        }

        public static string GetProcutionSummaryCount()
        {
            query = $"WITH Sales AS ( SELECT S.PartNo_ID, z.[Group],SUM((I.Process_qty - I.Ok_Qty - I.Process_reject - I.Process_Rework)) as toplam " +
                $" FROM dbo.Local_ProductionOrders S INNER JOIN dbo.ProcessFlow I  ON S.ProductOrderID = I.ProductOrder_ID" +
                $" INNER JOIN dbo.Process_Planning z ON I.ProcessNo_ID = z.ProcessNo" +
                $" WHERE([Process_qty] -[Ok_Qty] -[Process_reject] -[Process_Rework])> 0 AND S.[Status]=2" +
                $" Group by PartNo_ID,I.Process_qty,I.Ok_Qty,I.Process_reject,I.Process_Rework,z.[Group])  SELECT* FROM   Sales" +
                $" PIVOT(SUM(toplam) FOR  [Group] IN ([01_Kesim],[02_Büküm],[03_Havşa],[04_Kaynak],[041_KesDel],[042_Hazirlik],[05_Hortum],[06_Paketleme],[06_PaketlemeDiğer],[06_test],[07_Mercedes],[99_Proto],[09_Kaplama],[08_UçŞekil]" +
                $"   )) P ";
            return query;
        }



        #endregion

        #region Add-update Process 
        public static string GetAllBomProcessInAddOrUpdateProcess(RequestQuery request)
        {
            query = $"Select SubPartNo, PartNo_ID ,Qty,Quality,ProcessName, Process_Planning.ProsesAdi from BOM_Process inner join" +
                $" Process_Planning on SubPartNo = Process_Planning.ProcessNo" +
                $" where PartNo_ID = '{request.pid}'";
            return query;
        }

        public static string GetBomProcessTemp(RequestQuery requestQuery)
        {
            query = $"Select SubPartNo, PartNo_ID ,Qty,Quality,ProcessName, Process_Planning.ProsesAdi from BOM_Process_Temp inner join" +
                $" Process_Planning on SubPartNo = Process_Planning.ProcessNo" +
                $" where PartNo_ID = '{requestQuery.pid}'";
            return query;
        }

        public static string CheckOrderNo = "SELECT BOM_Process_Temp.OrderNo, Count(*) AS say FROM BOM_Process_temp GROUP BY BOM_Process_Temp.OrderNo HAVING Count(*)>1";
        public static string CheckSubPartNo = "SELECT BOM_Process_Temp.SubPartNo, Count(*) AS say FROM BOM_Process_temp GROUP BY BOM_Process_Temp.SubPartNo HAVING (((Count(*))>1));";
        public static string bomProcessTempCount = "select Count(*) from  BOM_Process_Temp";


        public static string DeleteFromBomProcessTemp(string pId)
        {
            query = $"delete  from BOM_Process_Temp where PartNo_ID ='{pId}'";
            return query;
        }

        public static string CopyToBomProcessTemp(string pId)
        {
            query = $"delete  from BOM_Process_Temp where PartNo_ID ='{pId}';insert into BOM_Process_Temp (PartNo_ID,SubPartNo,SubPartNoNext,OrderNo,Qty,Quality)" +
                "(SELECT BOM_Process.PartNo_ID," +
                "BOM_Process.SubPartNo, BOM_Process.SubPartNoNext, BOM_Process.OrderNo, BOM_Process.Qty, BOM_Process.Quality" +
                $" FROM BOM_Process WHERE BOM_Process.PartNo_ID = '{pId}'); ";
            return query;
        }


        public static string DeleteFromBomProcess(string pId)
        {
            query = $"delete From BOM_Process where PartNo_ID ='{pId}'";
            return query;
        }


        public static string InsertIntoBomProcess(BomProcessViewModel b)
        {
            query = $"insert into BOM_Process(PartNo_ID,OrderNo,Qty,Quality,SubPartNo,SubPartNoNext)" +
                $" values('{b.PartNo_ID}', {b.OrderNo}, {b.Qty}, '{b.Quality}', {b.SubPartNo}, {b.SubPartNoNext});";
            return query;
        }
        #endregion

        #region tamir is emri 
        public static string GetTamirIsEmriAdimlari = "SELECT Process_Planning.ProcessNo, Process_Planning.ProsesAdi,Process_Planning.ProcessName FROM Process_Planning;";


        public static string InsertTamirIsEmri_productionOrders_getLotNo(tamirIsEmriModel tamirIsEmriModel)
        {
            int miktar = int.Parse(tamirIsEmriModel.tamirMiktari);
            query = "SET DATEFORMAT dmy;insert into dbo.Local_ProductionOrders(PartNo_ID,Qty,IssueDate,Remark,[Status],Printed) " +
                $" values('{tamirIsEmriModel.p_id}', {miktar}, '{tamirIsEmriModel.tarih}', 'TAMİR Lot:${tamirIsEmriModel.lotNo}', 2, 0); " +
                " SELECT CAST(SCOPE_IDENTITY() as int)";
            return query;
        }
        public static string InsertTamirIsEmri_productionOrders_setLotNo(int lotNo)
        {
            query = $" update dbo.Local_ProductionOrders set LotNo={lotNo} where ProductOrderID={lotNo}";
            return query;
        }
        public static string InsertTamirIsEmri_processFlowTamir6(int newLotNo, tamirIsEmriModel tamirIsEmriModel, int lastProcess)
        {
            query = $"SET DATEFORMAT dmy;insert into ProcessFlow(ProductOrder_ID,ProcessNo_ID," +
                $"Process_qty,ProcessNo_next,Require_Date,Ok_Qty,Process_reject,Process_Rework,Order_no)" +
                $" values({newLotNo}, {tamirIsEmriModel.tamir6.ProcessNo}, 0, {lastProcess}, {tamirIsEmriModel.tarih},0, 0, 0, 6);";
            return query;
        }
        public static string InsertTamirIsEmri_processFlowTamir5(int newLotNo, tamirIsEmriModel tamirIsEmriModel, int lastProcess)
        {
            query = $"SET DATEFORMAT dmy;insert into ProcessFlow(ProductOrder_ID,ProcessNo_ID," +
                $"Process_qty,ProcessNo_next,Require_Date,Ok_Qty,Process_reject,Process_Rework,Order_no)" +
                $" values({newLotNo}, {tamirIsEmriModel.tamir5.ProcessNo}, 0, {lastProcess}, {tamirIsEmriModel.tarih},0, 0, 0, 5);";
            return query;
        }
        public static string InsertTamirIsEmri_processFlowTamir4(int newLotNo, tamirIsEmriModel tamirIsEmriModel, int lastProcess)
        {
            query = $"SET DATEFORMAT dmy;insert into ProcessFlow(ProductOrder_ID,ProcessNo_ID," +
                $"Process_qty,ProcessNo_next,Require_Date,Ok_Qty,Process_reject,Process_Rework,Order_no)" +
                $" values({newLotNo}, {tamirIsEmriModel.tamir4.ProcessNo}, 0, {lastProcess}, {tamirIsEmriModel.tarih},0, 0, 0, 4);";
            return query;
        }
        public static string InsertTamirIsEmri_processFlowTamir3(int newLotNo, tamirIsEmriModel tamirIsEmriModel, int lastProcess)
        {
            query = $"SET DATEFORMAT dmy;insert into ProcessFlow(ProductOrder_ID,ProcessNo_ID," +
                $"Process_qty,ProcessNo_next,Require_Date,Ok_Qty,Process_reject,Process_Rework,Order_no)" +
                $" values({newLotNo}, {tamirIsEmriModel.tamir3.ProcessNo}, 0, {lastProcess}, {tamirIsEmriModel.tarih},0, 0, 0, 3);";
            return query;
        }
        public static string InsertTamirIsEmri_processFlowTamir2(int newLotNo, tamirIsEmriModel tamirIsEmriModel, int lastProcess)
        {
            query = $"SET DATEFORMAT dmy;insert into ProcessFlow(ProductOrder_ID,ProcessNo_ID," +
                $"Process_qty,ProcessNo_next,Require_Date,Ok_Qty,Process_reject,Process_Rework,Order_no)" +
                $" values({newLotNo}, {tamirIsEmriModel.tamir2.ProcessNo}, 0, {lastProcess}, {tamirIsEmriModel.tarih},0, 0, 0, 2);";
            return query;
        }
        public static string InsertTamirIsEmri_processFlowTamir1(int newLotNo, tamirIsEmriModel tamirIsEmriModel, int lastProcess)
        {
            query = $"SET DATEFORMAT dmy;insert into ProcessFlow(ProductOrder_ID,ProcessNo_ID," +
                $"Process_qty,ProcessNo_next,Require_Date,Ok_Qty,Process_reject,Process_Rework,Order_no)" +
                $" values({newLotNo}, {tamirIsEmriModel.tamir1.ProcessNo}, 0, {lastProcess}, {tamirIsEmriModel.tarih},0, 0, 0, 1);";
            return query;
        }

        #endregion

        #region processDetails
        public static string GetProcessFlowInProcessDetails(RequestQuery requestQuery)
        {
            query = $"select Flow_ID,ProcessNo_ID,ProductOrder_ID,Ok_Qty,Process_qty,Process_reject,Process_Rework,Order_no ,ProsesAdi from ProcessFlow  inner join Process_Planning On  ProcessFlow.ProcessNo_ID =Process_Planning.ProcessNo where ProductOrder_ID={requestQuery.ProductOrderId} order by Flow_ID" +
                 $" OFFSET {requestQuery.pageNumber} ROWS FETCH NEXT {requestQuery.pageSize} ROWS ONLY; ";
            return query;
        }


        public static string GetProcessFlowDetailsInProcessDetails(RequestQuery requestQuery)
        {
            query = $"select ProcessFlowDetail.Finish_time AS FinishTime,ProcessFlowDetail.Np_time," +
                $" Process_Planning.ProsesAdi, ProcessFlowDetail.Ok_Qty," +
                $" Operator.Operator_Name,ProcessFlowDetail.Start_time,dbo.[10_MakinaListesiNew].Machine_no" +
                $" FROM(((ProcessFlowDetail INNER JOIN ProcessFlow ON ProcessFlowDetail.Flow_ID = ProcessFlow.Flow_ID)" +
                $" INNER JOIN Process_Planning ON ProcessFlow.ProcessNo_ID = Process_Planning.ProcessNo)" +
                $" inner join dbo.[10_MakinaListesiNew] on dbo.[10_MakinaListesiNew].Machine_Id = ProcessFlowDetail.Machine" +
                $" inner join Local_ProductionOrders  ON ProcessFlow.ProductOrder_ID = Local_ProductionOrders.ProductOrderID)" +
                $" INNER JOIN Operator ON ProcessFlowDetail.Operator = Operator.Operator_ID" +
                $" where Local_ProductionOrders.ProductOrderID like'%{requestQuery.ProductOrderId}%' " +
                $" ORDER BY Finish_time DESC OFFSET {requestQuery.pageNumber} ROWS FETCH NEXT {requestQuery.pageSize} ROWS ONLY;";
            return query;
        }
        #endregion

        #region Production Start
        public static string GetAllProductionStatus(string m, RequestQuery r)
        {
            query = $"select ProductionSheet,LotNo, ProductionStatusTemp.Qty ,Stock,Stock_Out,InputDate,Process_ID,Process_Planning.ProsesAdi,PartNo_ID from" +
                $" ProductionStatusTemp inner join Process_Planning on ProductionStatusTemp.Process_ID = Process_Planning.ProcessNo" +
                $" inner join Local_ProductionOrders on ProductionSheet = Local_ProductionOrders.ProductOrderID where PartNo_ID  in({m}) order by ProductionSheet" +
                $" OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY; ";
            return query;
        }

        public static string DeleteproductionStatus(int sheetId)
        {
            query = $"delete from ProductionStatusTemp where ProductionSheet= {sheetId}";
            return query;
        }


        public static string AddToProductionStatus(string date, int sheetId, int? orderNo, int qty)
        {
            query = $"SET DATEFORMAT dmy; insert into ProductionStatusTemp(ProductionSheet,Qty,Process_ID,InputDate) values ({sheetId},{qty},{orderNo},'{date}')";
            return query;
        }
        public static string UpdateRevisedDateInLocalProductionOrders(int productId)
        {
            query = $"SET DATEFORMAT dmy; Update Local_ProductionOrders set RevisedDate = GETDATE(), [Status] = 2 where ProductOrderID = {productId}";
            return query;
        }

        public static string InsertIntoProcessFlowInProductionStart(int productId)
        {
            query = $"SET DATEFORMAT dmy; INSERT INTO ProcessFlow(ProductOrder_ID, OK_Qty, Process_reject, Process_Rework," +
                $" ProcessNo_ID, ProcessNo_next, Order_no, Require_Date, Process_qty)SELECT dbo.Local_ProductionOrders.ProductOrderID, 0 AS OK_Qty, 0 AS Process_reject, " +
                $"0 AS Process_Rework, BOM_Process.SubPartNo, BOM_Process.SubPartNoNext, BOM_Process.OrderNo,dbo.Local_ProductionOrders.RequireDate," +
                $" IIf([BOM_Process].[OrderNo] = 1,dbo.Local_ProductionOrders.Qty,0) AS QTY FROM ProductionStatusTemp INNER JOIN " +
                $" (dbo.Local_ProductionOrders INNER JOIN BOM_Process ON dbo.Local_ProductionOrders.PartNo_ID = BOM_Process.PartNo_ID) " +
                $" ON ProductionStatusTemp.ProductionSheet = dbo.Local_ProductionOrders.ProductOrderID " +
                $" ORDER BY dbo.Local_ProductionOrders.ProductOrderID, BOM_Process.OrderNo;";
            return query;
        }
        #endregion
        #endregion



        #region Bakim Ariza
        public static string GetAllMachine(RequestQuery requestQuery)
        {
            query = "SELECT [dbo].[10_MakinaListesiNew].Machine_Id, [dbo].[10_MakinaListesiNew].Machine_no,[dbo].[10_MakinaListesiNew].Machine_Name , [dbo].[10_MakinaListesiNew].MODEL," +
             $" [dbo].[10_MakinaListesiNew].Bölüm  as Bolum FROM[dbo].[10_MakinaListesiNew] where [dbo].[10_MakinaListesiNew].Machine_no like '%{requestQuery.machineNo}%'" +
             "ORDER BY [dbo].[10_MakinaListesiNew].Machine_no" +
             $" OFFSET  {requestQuery.pageNumber} rows fetch next {requestQuery.pageSize} rows only; ";
            return query;
        }


        public static string insertIntoBakimKayit(BakimArizaModel bakimArizaModel)
        {
            //DBCC USEROPTIONS;
            //SET DATEFORMAT dmy;
            query = "SET DATEFORMAT dmy;insert into Tbl_BakımKayit (Makina_ID,PlanlananTarih,BakımTipi,BakımıTalepEden,BaslamaSaat,Planlananİslem,Tamamlanma)" +
               $" values({bakimArizaModel.machineId}, '{bakimArizaModel.tarih}', 2, {bakimArizaModel.operatorId}, GETDATE(),'{bakimArizaModel.tanim}',0)";
            return query;
        }
        public static string GetAllGecmisTalepler(RequestQuery requestQuery)
        {
            query = "SELECT Tbl_BakımKayit.Makina_ID,dbo.Operator.Operator_Name,Tbl_BakımKayit.Tamamlanma, Tbl_BakımKayit.Planlananİslem,dbo.[10_MakinaListesiNew].Machine_Name, Tbl_BakımKayit.BakımTipi as BakimTipi, Tbl_BakımKayit.BaslamaSaat, Tbl_BakımKayit.BitisSaat, Tbl_BakımKayit.BakımıTalepEden as BakimiTalepEden  , Tbl_BakımKayit.Bakim_ID, Tbl_BakımKayit.PlanlananTarih " +
                "FROM Tbl_BakımKayit inner join dbo.Operator on dbo.Operator.Operator_ID=Tbl_BakımKayit.BakımıTalepEden" +
                " inner join dbo.[10_MakinaListesiNew] on  dbo.[10_MakinaListesiNew].Machine_Id=Tbl_BakımKayit.Makina_ID" +
                " WHERE(((Tbl_BakımKayit.Tamamlanma) = 0) AND((Tbl_BakımKayit.BakımTipi) = 2)) " +
                $"order by  Tbl_BakımKayit.Makina_ID desc OFFSET {requestQuery.pageNumber} ROWS FETCH NEXT {requestQuery.pageSize}  ROWS ONLY; ";
            return query;
        }

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
            query = $"SET DATEFORMAT dmy;select ACTN_ID,NC_ID,Action_Type,Actin_Def,Responsible as ResponsibleId," +
                $" convert(varchar(10), cast(TargetDate As Date), 104) as TargetDate ,convert(varchar(10), cast(CloseDate As Date), 104) as CloseDate,[Status] from  dbo.C_ActionList where" +
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
            query = $"select ID, NC_ID,Document as DocumentType, convert(varchar(10), cast(ChangeDate As Date), 104) as ChangeDate,NewRev,Notes  from J_DocumentControl  where NC_ID = {ncId}";
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
            query = $" SET DATEFORMAT dmy;insert into J_DocumentControl (NC_ID,Document,ChangeDate,NewRev,Notes)" +
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
            query = $"  set DateFormat dmy; update J_DocumentControl set NC_ID={doc.NC_ID},Document='{doc.DocumentType}'" +
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
            query = "SET DATEFORMAT dmy; WITH Sales AS(SELECT convert(varchar(10), cast(Finish_time As Date), 104) as finishTime, SUM(S.Ok_Qty) as total,[Group]  FROM  dbo.ProcessFlowDetail S INNER JOIN dbo.ProcessFlow I ON S.Flow_ID = I.Flow_ID INNER JOIN dbo.Process_Planning z     ON I.ProcessNo_ID = z.ProcessNo " +
                $" where Finish_time between '{startAt}' and '{endAt}' group by Finish_time, [Group], S.Ok_Qty " +
                    ") SELECT * FROM   Sales PIVOT(SUM(total) FOR[Group] IN([01_Kesim],[02_Büküm],[03_Havşa],[04_Kaynak],[041_KesDel],[042_Hazirlik],[05_Hortum],[06_Paketleme]" +
                    $",[06_PaketlemeDiğer],[06_test],[07_Mercedes],[99_Proto],[09_Kaplama],[08_UçŞekil])) P order by finishTime desc OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY";
            return query;
        }

        public static string GetProcutionReportWithoutFilter(RequestQuery r)
        {
            query = "SET DATEFORMAT dmy; WITH Sales AS( SELECT  convert(varchar(10), cast(Finish_time As Date), 104) as finishTime, SUM(S.Ok_Qty) as total,[Group]  FROM  dbo.ProcessFlowDetail S INNER JOIN dbo.ProcessFlow I ON S.Flow_ID = I.Flow_ID INNER JOIN dbo.Process_Planning z     ON I.ProcessNo_ID = z.ProcessNo " +
                $"group by Finish_time, [Group], S.Ok_Qty " +
                    ") SELECT * FROM   Sales PIVOT(SUM(total) FOR[Group] IN([01_Kesim],[02_Büküm],[03_Havşa],[04_Kaynak],[041_KesDel],[042_Hazirlik],[05_Hortum],[06_Paketleme]" +
                    $",[06_PaketlemeDiğer],[06_test],[07_Mercedes],[99_Proto],[09_Kaplama],[08_UçŞekil])) P order by finishTime desc OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY";
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

        public static string GetReworkDetailsReport(RequestQuery r, string startAt, string endAt, string v) => $@"SET DATEFORMAT dmy;SELECT  Local_ProductionOrders.PartNo_ID, 
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
        public static string GetLostQtyReport(RequestQuery r) => $@"SELECT Local_ProductionOrders.PartNo_ID,Local_ProductionOrders.LotNo, Process_Planning.ProsesAdi,
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
        public static string GetSupplierPerfReport(RequestQuery r, string startAt, string endAt) => $@"SET DATEFORMAT dmy;SELECT dbo.CARIGEN.STA, dbo.SIPAR.EVRAKNO AS SIPEVRAKNO, dbo.SIPARIS_ALT.STK, dbo.SIPARIS_ALT.MIKTAR AS OrderQty,
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
        public static string GetProcessPlanReport(RequestQuery r, string startAt, string endAt) => $@" SET DATEFORMAT dmy; select    ID,ProcessDate,[Group],ProsesAdi,PartNo,WOLot,RemainProcessqty,
 WONewDate,Balance
 from  dbo.ProcessPlanFollowTable where RemainProcessqty >0 and [Group] like
  '%{r.Group}%' and PartNo like '%{r.Stk}%'  and ProcessDate between '{startAt}' and '{endAt}'
  ORDER BY ID  asc OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY";
        public static string GetProcessPlanReportCount() => @"select COUNT(*) from( select    ID,ProcessDate,[Group],ProsesAdi,PartNo,WOLot,RemainProcessqty,
 WONewDate,Balance
 from  dbo.ProcessPlanFollowTable where RemainProcessqty >0)countNumber";


        public static string DeleteProcessplan(int id) => $@"delete from ProcessPlanFollowTable where ID ={id}";
        #endregion
        #region Monthly production
        public static string GetMonthlyProduction(RequestQuery r, string startAt, string endAt) => $@"SET DATEFORMAT dmy;SELECT  CAST(MONTH(Finish_time) AS VARCHAR(2)) + '/' + CAST(YEAR(Finish_time) AS VARCHAR(4)) as FinsihTime,
 Sum(ProcessFlowDetail.Ok_Qty) AS Total, 
  ProcessFlowDetail.Machine as MachineId,dbo.[10_MakinaListesiNew].Machine_no,MODEL as Model
FROM (((ProcessFlow INNER JOIN Process_Planning ON 
ProcessFlow.ProcessNo_ID = Process_Planning.ProcessNo) INNER JOIN ProcessFlowDetail 
ON ProcessFlowDetail.Flow_ID = ProcessFlow.Flow_ID)) 
INNER JOIN dbo.Operator ON ProcessFlowDetail.Operator = dbo.Operator.Operator_ID
inner join  dbo.[10_MakinaListesiNew] on ProcessFlowDetail.Machine = [10_MakinaListesiNew].Machine_Id
where ProcessFlowDetail.Ok_Qty is not null and Machine_no  like '%{r.Machine_no}%'
and Finish_time between '{startAt}' and '{endAt}'
Group BY CAST(MONTH(Finish_time) AS VARCHAR(2)) + '/' + CAST(YEAR(Finish_time) AS VARCHAR(4)), 
ProcessFlowDetail.Machine,Machine_no,MODEL
ORDER BY Machine_no  OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY 
";
        public static string GetMonthlyProductionCount() => @"select COUNT(*) from( SELECT  CAST(MONTH(Finish_time) AS VARCHAR(2)) + '/' + CAST(YEAR(Finish_time) AS VARCHAR(4)) as FinsihTime,
 Sum(ProcessFlowDetail.Ok_Qty) AS Total, 
  ProcessFlowDetail.Machine as MachineId,dbo.[10_MakinaListesiNew].Machine_no,MODEL as Model
FROM (((ProcessFlow INNER JOIN Process_Planning ON 
ProcessFlow.ProcessNo_ID = Process_Planning.ProcessNo) INNER JOIN ProcessFlowDetail 
ON ProcessFlowDetail.Flow_ID = ProcessFlow.Flow_ID)) 
INNER JOIN dbo.Operator ON ProcessFlowDetail.Operator = dbo.Operator.Operator_ID
inner join  dbo.[10_MakinaListesiNew] on ProcessFlowDetail.Machine = [10_MakinaListesiNew].Machine_Id
where ProcessFlowDetail.Ok_Qty is not null 
Group BY CAST(MONTH(Finish_time) AS VARCHAR(2)) + '/' + CAST(YEAR(Finish_time) AS VARCHAR(4)), 
ProcessFlowDetail.Machine,Machine_no,MODEL)countNumber
";
        #endregion

        #region SellDate

        public static string GetSellDateReport(RequestQuery r, string startAt, string endAt) => $@"SET DATEFORMAT dmy;SELECT  dbo.STOKGEN.STK,MAX( CAST(STOK_ALT.TARIH AS DATE)) as tarih,STOKGEN.TUR,
  Sum(dbo.STOK_ALT.[GRMIK]-dbo.STOK_ALT.[CKMIK]) AS TotalStock
FROM dbo.STOK_ALT RIGHT JOIN dbo.STOKGEN ON dbo.STOK_ALT.STOKP_ID = dbo.STOKGEN.P_ID
WHERE (((STOKGEN.TUR)=3 Or (STOKGEN.TUR)=4)) and dbo.STOKGEN.STK like'%{r.Stk}%'
and  STOK_ALT.TARIH between '{startAt}' and '{endAt}'

GROUP BY CAST(STOK_ALT.TARIH AS DATE),  STOKGEN.STK, STOKGEN.TUR,[CKMIK],[GRMIK]
order by 2";

        public static string GetSellDateReportCount() => @"SELECT  dbo.STOKGEN.STK,MAX( CAST(STOK_ALT.TARIH AS DATE)) as tarih,STOKGEN.TUR,
  Sum(dbo.STOK_ALT.[GRMIK]-dbo.STOK_ALT.[CKMIK]) AS TotalStock
FROM dbo.STOK_ALT RIGHT JOIN dbo.STOKGEN ON dbo.STOK_ALT.STOKP_ID = dbo.STOKGEN.P_ID
WHERE (((STOKGEN.TUR)=3 Or (STOKGEN.TUR)=4)) 

GROUP BY CAST(STOK_ALT.TARIH AS DATE),  STOKGEN.STK, STOKGEN.TUR,[CKMIK],[GRMIK]
order by 2";
        #endregion
        #endregion

        #region Box Type


        public static string GetBoxType(RequestQuery r) => $@"select  STK,STA,STR_3,STR_4,TUR from dbo.STOKGEN
where STK like '%{r.Stk}%' order  by STR_3 DESC OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY;";
        public static string GetBoxTypeCount() => @"select count(*) from(select  STK,STA,STR_3,STR_4,TUR from dbo.STOKGEN)countNumber";
        #endregion

        #region Order Management
        public static string GetOrderDetails(RequestQuery r)
        {
            query = "SELECT dbo.SIPARIS_ALT.STK, dbo.SIPARIS_ALT.MIKTAR AS OrderQty, Sum(dbo.STOK_ALT.MIKTAR) AS TotalInvoice, dbo.SIPARIS_ALT.P_ID, dbo.SIPARIS_ALT.TURAC, dbo.SIPAR.EVRAKNO AS SIPEVRAKNO, dbo.SIPARIS_ALT.FATIRSTUR, dbo.SIPARIS_ALT.STOKP_ID, dbo.SIPARIS_ALT.TUR,CONVERT(varchar,dbo.SIPARIS_ALT.TESTARIHI,104) as TESTARIHI, dbo.SIPARIS_ALT.CARIREF, dbo.CARIGEN.STA" +
                " FROM((dbo.SIPARIS_ALT LEFT JOIN dbo.STOK_ALT ON(dbo.SIPARIS_ALT.STOKP_ID = dbo.STOK_ALT.STOKP_ID) AND(dbo.SIPARIS_ALT.P_ID = dbo.STOK_ALT.SIP_PID)) LEFT JOIN dbo.SIPAR ON dbo.SIPARIS_ALT.P_ID = dbo.SIPAR.P_ID) LEFT JOIN dbo.CARIGEN ON dbo.SIPARIS_ALT.CARIREF = dbo.CARIGEN.REF " +
                $" where SIPARIS_ALT.STK like '%{r.Stk}%' GROUP BY dbo.SIPARIS_ALT.STK, dbo.SIPARIS_ALT.MIKTAR, dbo.SIPARIS_ALT.P_ID, dbo.SIPARIS_ALT.TURAC, dbo.SIPAR.EVRAKNO, dbo.SIPARIS_ALT.FATIRSTUR, dbo.SIPARIS_ALT.STOKP_ID, dbo.SIPARIS_ALT.TUR, dbo.SIPARIS_ALT.TESTARIHI, dbo.SIPARIS_ALT.CARIREF, dbo.CARIGEN.STA " +
                $"order by STK OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY";
            return query;
        }

        public static string GetInProgress()
        {

            query = "SELECT dbo.Local_ProductionOrders.PartNo_ID,Sum(IIf(([Qty] - isNull([Completed_Qty], 0)) < 0, 0,[Qty] - isnull([Completed_Qty], 0))) as total " +
                " FROM dbo.Local_ProductionOrders " +
                " WHERE(((dbo.Local_ProductionOrders.Status) = 2))" +
                " Group by PartNo_ID,Completed_Qty,[Qty] order by PartNo_ID";
            return query;
        }

        public static string GetComponentOrders(RequestQuery r)
        {
            query = "DECLARE @cols AS nvarchar(max) DECLARE @query AS nvarchar(max) SELECT @cols = STUFF((     SELECT DISTINCT  ',' + QUOTENAME(YEAR(TESTARIHI)) " +
                " FROM[dbo].SIPARIS_ALT order by 1  FOR xml PATH(''), TYPE ).value('.', 'NVARCHAR(MAX)'), 1, 1, '');" +
                " set @query = 'WITH Sales AS ( SELECT S.STK, year(S.TESTARIHI) as YearDate, S.CARIREF,S.STA,	S.MIKTAR - isNull(Sum(I.MIKTAR), 0) AS RemainQty_total FROM" +
                " ((dbo.SIPARIS_ALT S left JOIN dbo.STOK_ALT I ON(S.STOKP_ID = I.STOKP_ID) and(S.P_ID = I.SIP_PID)) left JOIN SIPAR on S.P_ID = SIPAR.P_ID) left join CARIGEN " +
                $" on S.CARIREF = CARIGEN.REF  where  S.STK like ''%{r.Stk}%'' " +
                " GROUP BY S.STK, S.MIKTAR, S.TURAC, dbo.SIPAR.EVRAKNO, S.FATIRSTUR, S.STOKP_ID, S.TUR,  " +
                " S.TESTARIHI, S.CARIREF, S.STA)  SELECT* FROM   Sales " +  
                "   PIVOT(SUM(RemainQty_total)  FOR  YearDate IN('+@cols+' )) P; 'EXECUTE sp_executesql @query;";
            return query;
        }
        public static string GetCustomerOrders(RequestQuery r)
        {
            query = "DECLARE @cols AS nvarchar(max) DECLARE @query AS nvarchar(max) SELECT @cols = STUFF((        SELECT DISTINCT      ',' + QUOTENAME(YEAR(TESTARIHI))" +
                " FROM[dbo].SIPARIS_ALT order by 1 FOR xml PATH(''), TYPE  ).value('.', 'NVARCHAR(MAX)') , 1, 1, '');     set @query = 'WITH Sales AS (SELECT   S.STK, year(S.TESTARIHI) as YearDate, S.CARIREF,S.STA," +
                " S.MIKTAR - isNull(Sum(I.MIKTAR), 0) AS RemainQty FROM ((dbo.SIPARIS_ALT S  left JOIN dbo.STOK_ALT I     ON(S.STOKP_ID = I.STOKP_ID)" +
                " and(S.P_ID = I.SIP_PID)) left JOIN SIPAR on S.P_ID = SIPAR.P_ID)" +
                $" left join CARIGEN on S.CARIREF = CARIGEN.REF WHERE(((S.MIKTAR - isnull(I.MIKTAR, 0)) > 0) And((S.TUR) = 90)) and S.STK like ''%{r.Stk}%''" +
                "  GROUP BY S.STK,S.P_ID, S.TURAC, S.STOKP_ID, S.TUR, S.TESTARIHI, S.CARIREF, S.STA ,S.MIKTAR" +
                " )  SELECT* FROM   Sales  PIVOT(SUM(RemainQty)  FOR  YearDate IN('+@cols+')) P;';EXECUTE sp_executesql @query; ";
            return query;
        }
        #endregion
        #region Wo 
        public static string GetAllProductionOrders(string m, RequestQuery r)
        {
            query = $@"SET DATEFORMAT dmy; select ProductOrderID,PartNo,PartNo_ID,LotNo,Qty,
Completed_Qty,
convert(varchar(10), cast(RequireDate As Date), 104) as RequireDate ,
convert(varchar(10), cast(IssueDate As Date), 104) as IssueDate ,
convert(varchar(10), cast(RevisedDate As Date), 104) as RevisedDate ,
convert(varchar(10), cast(CloseDate As Date), 104) as CloseDate ,
Printed,Status,CONVERT(varchar,RevisedDate,104) as RevisedDate,
Remark,CONVERT(varchar,CloseDate,104) as CloseDate
  from dbo.Local_ProductionOrders where PartNo_ID in ({m})  and  [Status] like '%{r.uretimPlaniType}%' 
                 ORDER BY dbo.Local_ProductionOrders.RequireDate DESC OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY;"
;
            return query;
        }

        public static string GetprocutionOrdersCount()
        {
            query = "select Count(*) from (select * from Local_ProductionOrders)countNumber";

            return query;
        }

        public static string GetprocutionOrderByProductId(int productId)
        {
            query = $"select * from Local_ProductionOrders  where ProductOrderID={productId}";

            return query;
        }

        public static string DeleteWo(string v)
        {
            query = $"delete  from Local_ProductionOrders where ProductOrderID in ({v})";
            return query;
        }
        public static string AddNewWorkOrder(ProductOrderViewModel p)
        {
            query = $"SET DATEFORMAT dmy;insert into Local_ProductionOrders(PartNo_ID,IssueDate,RequireDate,Remark,Qty,Status,Printed) values ('{p.PartNo_ID}','{p.IssueDate}','{p.RequireDate}','{p.Remark}',{p.Qty},1,0);SELECT CAST(SCOPE_IDENTITY() as int)";
            return query;
        }

        public static string GetAllProductionOrdersPrintOut(RequestQuery r)
        {
            query = $"select  ProductionOrdersPrintout.ProductOrderID,PartNo_ID,LotNo,Qty,Completed,convert(varchar(10), cast(RequireDate As Date), 104) as RequireDate ," +
                $" convert(varchar(10), cast(IssueDate As Date), 104) as IssueDate,[Closed],[Status]," +
                $" convert(varchar(10), cast(RevisedDate As Date), 104) as RevisedDate ,  RevisedDate,Remark " +
                $" from dbo.ProductionOrdersPrintout where  [Status] like '%{r.uretimPlaniType}%' " +
                $" ORDER BY dbo.ProductionOrdersPrintout.ProductOrderID DESC OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY; ";
            return query;
        }

        public static string AddToProductionOrdersPrintOut(string v)
        {
            query = $"insert into ProductionOrdersPrintout " +
                $"(ProductOrderID, PartNo_ID, PartNo, LotNo, Qty, IssueDate, RequireDate, Remark,[Status])" +
                $"(select ProductOrderID, PartNo_ID, PartNo_ID, LotNo, Qty, IssueDate, RequireDate, Remark,[Status] from Local_ProductionOrders where ProductOrderID in ({v}))";
            return query;
        }

        public static string DeleteFromPrintOut(int productId)
        {
            query = $"delete from ProductionOrdersPrintout where ProductOrderID={productId}";
            return query;
        }

        public static string DeleteAllPrintOut = "delete from ProductionOrdersPrintout";

        #endregion

        #region settings
        #region machine 

        public static string GetMachineSettings(RequestQuery r) => $@"Select  Machine_Id ,Machine_no,Machine_Name,MODEL as model,[Bölüm] as Bolum, Producer,Yıl as Yil from [10_MakinaListesiNew]
where Machine_no like N'%{r.machineNo}%' and  Machine_Name like N'%{r.machineName}%'
order by(1) OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY;";


        public static string GetMachineSettingsCount() => @"select count(1) from(Select  Machine_Id ,Machine_no,Machine_Name,MODEL as model,[Bölüm] as Bolum, Producer,Yıl as 
Yil from [10_MakinaListesiNew] )countNumber";
        #endregion

        #region process New

        public static string GetProcessNew(RequestQuery r) => $@"select  ProcessID,ProcessNo,ProsesAdi,ProcessName,ProsessDay,Manhour,[Group]   from dbo.Process_Planning 
where ProsesAdi like N'%{r.processAdi}%' and [Group] like N'%{r.Group}%'
order by (1) asc OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY; ";

        public static string GetProcessNewCount() => @"select count(*) from( select
 ProcessNo,ProsesAdi,ProcessName,ProsessDay,Manhour,[Group]   from dbo.Process_Planning)countNumber";


        public static string AddsettingsProcessNew(settingsProcessNewViewModel s) => $@"insert into Process_Planning (ProcessNo,ProsesAdi,ProcessName,ProsessDay,Manhour,[Group])

values({s.processNo},'{s.processAdi}','{s.processName}',{s.processDay},{s.manHour},'{s.group}')";

        public static string DeleteSettingsProcessNew(int processId) => $"delete from Process_Planning where ProcessID={processId}";

        public static string EditSettingsProcessNew(settingsProcessNewViewModel s) => $@"
update Process_Planning set 
ProcessNo={s.processNo} ,ProsesAdi='{s.processAdi}',ProcessName='{s.processName}',ProsessDay={s.processDay},Manhour={s.manHour},[Group]='{s.group}'
where ProcessID={s.ProcessID}
";
        #endregion


        #region Reject
        public static string GetSettingsReject(RequestQuery r) => $@"select Reject_ID,Reject_Code,REject_Name from dbo.Reject_def
where REject_Name like N'%{r.rejectName}%' 
order by 1 OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY; 
";

        public static string GetSettingsRejectCount() => $@"select count(1) from (select Reject_ID,Reject_Code,REject_Name from dbo.Reject_def)countNumber
";

        public static string AddSettingsReject(RejectViewModel r) => $@"insert into Reject_def (Reject_Code,REject_Name) values('{r.Reject_Code}','{r.REject_Name}')";
        public static string DeleteSettingsReject(int rejectId) => $"delete from Reject_def where Reject_ID={rejectId}";

        public static string EditSettingsReject(RejectViewModel r) => $"update Reject_def set Reject_Code='{r.Reject_Code}' ,REject_Name='{r.REject_Name}' where Reject_ID={r.Reject_ID}";
        #endregion

        #region Operator
        public static string GetSettingsOperator(RequestQuery r) => $@" set DateFormat dmy; 
 select Operator_ID ,Operator_Name,Bolum,Aktif,CONVERT(varchar,GirisTarihi,104) as GirisTarihi FROM Operator where Operator_Name like N'%{r.operatorName}%'
order by 1  
OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY; ";

        public static string GetSettingsOperatorCount() => @" select count(1) from( select Operator_ID ,Operator_Name,Bolum,
CAST(GirisTarihi AS date)GirisTarihi,Aktif FROM Operator )countNumber  
";

        public static string AddToSettingOperator(SettingsOperatorViewModel s) => $@"SET DATEFORMAT dmy insert into Operator (Operator_Name,Bolum,GirisTarihi,Aktif)
values ('{s.Operator_Name}','{s.Bolum}','{s.GirisTarihi}','{s.Aktif}')";
        public static string GetSettingsOperatorPolivalance(int operatorId) => $@"select PP.ProcessNo,Op.Level,PP.ProcessName 
from OperatorPolivalance Op
 inner join Process_Planning PP on  Op.ProcessNo = PP.ProcessNo
 where Op.OperatorNo={operatorId}";

        public static string DeleteSettingOperator(int opertorId) => $"delete from Operator where Operator_ID ={opertorId}";
        public static string EditSettingsOperator(SettingsOperatorViewModel s) => $@"SET DATEFORMAT dmy;update Operator set Operator_Name='{s.Operator_Name}' ,Bolum='{s.Bolum}', GirisTarihi='{s.GirisTarihi}'
,Aktif='{s.Aktif}'
where Operator_ID ={s.Operator_ID}";
        #endregion


        #region #systemUsers
        public static string GetAllSyetemUsers(RequestQuery requestQuery)=>$@"
select Users.Id as UserId,Email ,Roles.[Name] as RoleName,RoleId from dbo.AspNetUsers Users inner Join AspNetUserRoles UserRoles on
Users.Id =UserRoles.UserId inner join AspNetRoles Roles on
UserRoles.RoleId= Roles.Id where Users.Email like'%{requestQuery.email}%' and Roles.Id like'%{requestQuery.roleId}%'
order by UserId OFFSET {requestQuery.pageNumber} ROWS FETCH NEXT {requestQuery.pageSize} ROWS ONLY;
";


        public static string GetAllSyetemUsersCount() => @" select count(1) from ( select Users.Id as UserId,Email ,Roles.[Name] as RoleName,RoleId from dbo.AspNetUsers Users inner Join AspNetUserRoles UserRoles on
Users.Id =UserRoles.UserId inner join AspNetRoles Roles on
UserRoles.RoleId= Roles.Id )countNumber
";

        public static string GetAllUsersRoles() => @"select Id as RoleId ,[Name] as RoleName from AspNetRoles";
        #endregion
        #endregion

        #region TTF Teslimat
        public static string GetTeslimatDurumu(RequestQuery requestQuery)
        {
            query = $"SELECT [Sipariş blgtürü] as siparisBlturu,Sprşblgno as sprsblgno,Klmno,[Ürün]as urunKodu," +
                $" Mştrlok as mstrlok,VdGlnMkt as vdGlnmkt,[Ölçü birimi] as olcuBirimi ,Göndtrh as gondtrh" +
                $" FROM TTFTeslimat where[Ürün] like'%{requestQuery.Stk}%' order by  [Ürün] OFFSET {requestQuery.pageNumber} ROWS FETCH NEXT {requestQuery.pageSize} ROWS ONLY;";
            return query;
        }

        public static string GetTeslimatDurumuCount = "select COUNT(*) from ( SELECT [Sipariş blgtürü] as siparisBlturu,Sprşblgno as sprsblgno,Klmno,[Ürün]as urunKodu," +
                " Mştrlok as mstrlok,VdGlnMkt as vdGlnmkt,[Ölçü birimi] as olcuBirimi ,Göndtrh as gondtrh" +
                " FROM TTFTeslimat)countNumber ";



        public static string GetShippmentReport(RequestQuery r)
        {
            query = "DECLARE @cols AS nvarchar(max)DECLARE @query AS nvarchar(max)SELECT @cols = STUFF((" +
                "SELECT DISTINCT    ',' + QUOTENAME(Month(TTFTeslimat.Göndtrh))FROM[dbo].TTFTeslimat order by 1 FOR xml PATH(''), TYPE ).value('.', 'NVARCHAR(MAX)')," +
                " 1, 1, ''); set @query = N'WITH Sales AS (SELECT S.[Sipariş blgtürü] as BilgiTuru, S.Mştrlok as mstrlok, S.Ürün as stk, S.VdGlnMkt, S.[Ölçü birimi] as OlcuBirimi, MONTH(S.Göndtrh) as [month], I.FIELD18 +''-''+I.FIELD19 as Raf , I.STR_3 as kutuTipi, I.STR_4 as KutuIciMiktari,Sum(S.VdGlnMkt) AS ToplamSevk," +
                $"Sum(S.VdGlnMkt) AS Toplam FROM dbo.TTFTeslimat S left JOIN dbo.STOKGEN I on S.Ürün = I.STK where S.Ürün like ''%{r.Stk}%''Group by S.[Sipariş blgtürü], S.Mştrlok, S.Ürün,S.VdGlnMkt, S.[Ölçü birimi],Göndtrh,I.FIELD18,I.FIELD19, I.STR_3, I.STR_4)SELECT* FROM   Sales PIVOT(SUM(ToplamSevk) FOR  [month] IN ('+@cols+')) P; '" +
                " EXECUTE sp_executesql @query;";
            return query;
        }
        #endregion

        #region ProductionOrders Transfer 
        public static string GetProductionOrdersTransfer(RequestQuery r, string m)
        {
            query = $"select * from ProductionOrders_Transfer where PartNo in ({m}) order by PartNo  OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY";
            return query;
        }

        public static string GetprocutionOrdersTranferCount()
        {
            query = "select Count(*) from(select * from ProductionOrders_Transfer) countNumber";
            return query;
        }

        public static string DeleteFromTranferWo(string partNo)
        {
            query = $"delete from ProductionOrders_Transfer where PartNo ='{partNo}';";
            return query;
        }
        public static string DeleteAllTranferWo()
        {
            query = $"delete from ProductionOrders_Transfer";
            return query;
        }

        public static string CheckTransferInStokgen(string m)
        {
            query = $"SELECT dbo.STOKGEN.STK, dbo.STOKGEN.tur, dbo.STOKGEN.P_ID " +
                $" FROM dbo.STOKGEN WHERE P_ID in({m}) and((dbo.STOKGEN.tur) = 2 Or(dbo.STOKGEN.tur) = 3)";
            return query;
        }

        public static string Transfer_InsertIntoProductionOrders_getlotNo(ProductionOrdersTransferModel m)
        {
            query = "SET DATEFORMAT dmy;" +
                $"insert into Local_ProductionOrders(PartNo_ID, Qty, IssueDate, RequireDate, Remark,[Status], Printed)" +
                $" values('{m.PartNo}', {m.Qty}, '{m.IssueDate}', '{m.RequireDate}', '{m.Remark}', 1, 0); SELECT CAST(SCOPE_IDENTITY() as int);";
            return query;
        }
        #endregion

        #region Etiketler

        // sevkiyet etiketi
        public static string GetSevkiyetKutuEtiketiList(RequestQuery requestQuery)
        {
            query = "SELECT dbo.STOK_ALT.TARIH, dbo.CARIGEN.STA as carigen_sta, dbo.STOK_ALT.STK, dbo.STOKGEN.STA as stokgen_sta,dbo.STOK_ALT.MIKTAR, dbo.STOK_ALT.SIPEVRAKNO, dbo.STOK_ALT.STB, dbo.STOK_ALT.TUR, dbo.STOK_ALT.TURAC, dbo.STOKGEN.P_ID, dbo.STOKGEN.FIELD18, dbo.STOKGEN.FIELD19,dbo.STOK_ALT.CARIREF, dbo.STOK_ALT.KALITEKODU, dbo.STOK_ALT.KALITEKODU, dbo.STOK_ALT.IRSEVRAKNO, " +
                " dbo.STOK_ALT.SIPSATIRP_ID, dbo.CARIGEN.ADRES1, dbo.CARIGEN.ADRES2, dbo.CARIGEN.SEMT,  dbo.CARIGEN.SEHIR ,dbo.CARIGEN.POSTAKODU AS ADRESS, dbo.CARISUBE.ADRESI FROM((((dbo.STOKGEN RIGHT JOIN dbo.STOK_ALT ON dbo.STOKGEN.P_ID = dbo.STOK_ALT.STOKP_ID) LEFT JOIN dbo.CARIGEN ON dbo.STOK_ALT.CARIREF = dbo.CARIGEN.REF) LEFT JOIN dbo.SIPARIS_ALT ON dbo.STOK_ALT.SIPSATIRP_ID = dbo.SIPARIS_ALT.SATIRP_ID) LEFT JOIN dbo.IRSALIYE ON dbo.STOK_ALT.IRS_PID = dbo.IRSALIYE.P_ID) LEFT JOIN dbo.CARISUBE ON dbo.IRSALIYE.CARISUBE = dbo.CARISUBE.REF WHERE(((dbo.STOK_ALT.TUR) = 60 Or(dbo.STOK_ALT.TUR) = 70 Or(dbo.STOK_ALT.TUR) = 280)) " +
                $"and dbo.STOKGEN.STK like'%{requestQuery.Stk}%' ORDER BY dbo.STOK_ALT.TARIH DESC, dbo.CARIGEN.STA, dbo.STOK_ALT.STK " +
                $"OFFSET { requestQuery.pageNumber} ROWS FETCH NEXT { requestQuery.pageSize} ROWS ONLY;";
            return query;
        }

        // stok etiketi
        public static string GetAllStokEtiketi(RequestQuery requestQuery)
        {
            query = $" SELECT STOKGEN.STK, SUM(IIf(AORS = 'S', -1, 1) * MIKTAR) AS TotalStok," +
                $" STOKGEN.TUR,STOKGEN.STA,STOKGEN.REF,STOK_ALT.STOKREF,STOKGEN.P_ID,STOKGEN.FIELD18,STOKGEN.FIELD19 " +
                $" from dbo.STOK_ALT right join STOKGEN On STOK_ALT.STK = STOKGEN.STK " +
                $" where dbo.STOKGEN.STK like '%{requestQuery.Stk}%'" +
                $" group by dbo.STOKGEN.STK,STOKGEN.TUR,STOKGEN.STA,STOKGEN.REF,STOK_ALT.STOKREF,STOKGEN.P_ID,STOKGEN.FIELD18,STOKGEN.FIELD19" +
              $" order by dbo.STOKGEN.STK  OFFSET {requestQuery.pageNumber} ROWS FETCH NEXT {requestQuery.pageSize} ROWS ONLY;";
            return query;
        }
        // giris kabul etiketi

        public static string GirisKabulEtiketiList(RequestQuery requestQuery)
        {
            query = "SELECT dbo.IRSALIYE_ALT.TARIH,dbo.CARIGEN.STA as CARIGENSTA,dbo.IRSALIYE_ALT.STK," +
                " dbo.STOKGEN.STA as STOKGENSTA ,dbo.IRSALIYE_ALT.MIKTAR, dbo.IRSALIYE_ALT.SIPEVRAKNO, dbo.IRSALIYE_ALT.STB, " +
                " dbo.IRSALIYE_ALT.TUR, dbo.IRSALIYE_ALT.TURAC, dbo.STOKGEN.P_ID,dbo.STOKGEN.FIELD18, dbo.STOKGEN.FIELD19, dbo.IRSALIYE_ALT.CARIREF,dbo.IRSALIYE_ALT.KALITEKODU," +
                " dbo.IRSALIYE_ALT.REF,dbo.IRSALIYE_ALT.IRSEVRAKNO FROM (STOKGEN INNER JOIN dbo.IRSALIYE_ALT ON dbo.STOKGEN.P_ID =dbo.IRSALIYE_ALT.STOKP_ID)" +
                " INNER JOIN dbo.CARIGEN ON dbo.IRSALIYE_ALT.CARIREF =dbo.CARIGEN.REF " +
                " WHERE (((IRSALIYE_ALT.TUR)=1 Or (dbo.IRSALIYE_ALT.TUR)=62 Or (dbo.IRSALIYE_ALT.TUR)=72)) " +
                $" and dbo.STOKGEN.STK like '%{requestQuery.Stk}%' ORDER BY dbo.IRSALIYE_ALT.TARIH DESC ,dbo.CARIGEN.STA,dbo.IRSALIYE_ALT.STK" +
                $" OFFSET {requestQuery.pageNumber}  ROWS FETCH NEXT {requestQuery.pageSize} ROWS ONLY";
            return query;
        }


        #region Giris Kontrol
        public static string GetGirisKontrol(RequestQuery r ) => $@"
SELECT convert(varchar(10), cast( dbo.IRSALIYE_ALT.TARIH As Date), 104) as Tarih, dbo.CARIGEN.STA, dbo.IRSALIYE_ALT.STK, dbo.IRSALIYE_ALT.MIKTAR,
 dbo.IRSALIYE_ALT.SIPEVRAKNO, dbo.STOKGEN.P_ID, dbo.STOKGEN.FIELD18, dbo.STOKGEN.FIELD19
  , dbo.IRSALIYE_ALT.KALITEKODU,dbo.IRSALIYE_ALT.CARIREF,
   dbo.IRSALIYE_ALT.REF, dbo.IRSALIYE_ALT.IRSEVRAKNO
FROM (dbo.STOKGEN INNER JOIN dbo.IRSALIYE_ALT ON dbo.STOKGEN.P_ID = dbo.IRSALIYE_ALT.STOKP_ID) INNER JOIN dbo.CARIGEN ON dbo.IRSALIYE_ALT.CARIREF = dbo.CARIGEN.REF
WHERE (((dbo.IRSALIYE_ALT.TUR)=1 Or (dbo.IRSALIYE_ALT.TUR)=62 Or (dbo.IRSALIYE_ALT.TUR)=72)) and IRSALIYE_ALT.STK like N'%{r.Stk}%'
ORDER BY dbo.IRSALIYE_ALT.TARIH DESC , dbo.CARIGEN.STA, dbo.IRSALIYE_ALT.STK OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY;";
        public static string GetGirisKontrolCount() => @"
 select COUNT(*) from (SELECT convert(varchar(10), cast( dbo.IRSALIYE_ALT.TARIH As Date), 103) as Tarih, dbo.CARIGEN.STA, dbo.IRSALIYE_ALT.STK, dbo.IRSALIYE_ALT.MIKTAR,
 dbo.IRSALIYE_ALT.SIPEVRAKNO, dbo.STOKGEN.P_ID, dbo.STOKGEN.FIELD18, dbo.STOKGEN.FIELD19
  , dbo.IRSALIYE_ALT.KALITEKODU,dbo.IRSALIYE_ALT.CARIREF,
   dbo.IRSALIYE_ALT.REF, dbo.IRSALIYE_ALT.IRSEVRAKNO
FROM (dbo.STOKGEN INNER JOIN dbo.IRSALIYE_ALT ON dbo.STOKGEN.P_ID = dbo.IRSALIYE_ALT.STOKP_ID) INNER JOIN dbo.CARIGEN ON dbo.IRSALIYE_ALT.CARIREF = dbo.CARIGEN.REF
WHERE (((dbo.IRSALIYE_ALT.TUR)=1 Or (dbo.IRSALIYE_ALT.TUR)=62 Or (dbo.IRSALIYE_ALT.TUR)=72)))countNumber
";

        public static string UpdateKaliteKodu(kaliteKoduModel k) => $@"UPDATE dbo.IRSALIYE_ALT SET dbo.IRSALIYE_ALT.KALITEKODU ='{k.kaliteKodu}'
  WHERE (((dbo.IRSALIYE_ALT.REF)='{k.refKodu}' ));select top(1) IRSALIYE_ALT.KALITEKODU from IRSALIYE_ALT where IRSALIYE_ALT.REF='{k.refKodu}'; ";
        #endregion
        #endregion
    }
}
