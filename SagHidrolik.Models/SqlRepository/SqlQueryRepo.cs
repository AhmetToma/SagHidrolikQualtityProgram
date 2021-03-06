﻿using SagHidrolik.Models.ViewModesl;
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

       public  static string SagHidrolikAuthentication = $"Server={ServerName};Database=SagHidrolikAuthentication;User Id='{userId}';Password='{password}';";
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
            query = $"select * from dbo.STOKGEN where dbo.STOKGEN.STK like N'%{requestQuery.Stk}%'";
            return query;
        }


        public static string GetStokkenByStkListOnlypageSize(RequestQuery requestQuery)
        {
            query = $"select * from dbo.STOKGEN where dbo.STOKGEN.STK like N'%{requestQuery.Stk}%' order By STK" +
                $" OFFSET {requestQuery.pageNumber} ROWS FETCH NEXT {requestQuery.pageSize} ROWS ONLY; ";
            return query;
        }
        public static string GetDboStokgenPIdByStk(string stk)
        {

            query = $"select * from dbo.STOKGEN where dbo.STOKGEN.STK= N'{stk}'";
            return query;
        }
        public static string GetProductOrdersByStokgenId(RequestQuery requestQuery)
        {

            query = $@"select  ProductOrderID,PartNo,PartNo_ID,LotNo,Qty,Completed_Qty,
convert(varchar(10), cast(IssueDate As Date), 103) as IssueDate ,
convert(varchar(10), cast(RequireDate As Date), 103) as RequireDate ,
convert(varchar(10), cast(RevisedDate As Date), 103) as RevisedDate ,
convert(varchar(10), cast(CloseDate As Date), 103) as CloseDate ,
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
                $" FROM dbo.STOK_ALT left JOIN dbo.STOKGEN ON dbo.STOK_ALT.STOKP_ID = dbo.STOKGEN.P_ID  where dbo.STOK_ALT.STK like N'%{request.Stk}%'" +
                $" GROUP BY STOK_ALT.STK, dbo.STOK_ALT.STA,STOKGEN.TUR" +
                $" order by STOK_ALT.STK OFFSET  {request.pageNumber} rows fetch next {request.pageSize} rows only; ";
            return query;
        }
        public static string GetStokAllCount()
        {
            query = "select count(*)from (SELECT  dbo.STOK_ALT.STK, dbo.STOK_ALT.STA,dbo.STOKGEN.TUR, sum ( isnull((dbo.STOK_ALT.GRMIK-dbo.STOK_ALT.CKMIK),0)) as totalStok FROM dbo.STOK_ALT left JOIN dbo.STOKGEN ON dbo.STOK_ALT.STOKP_ID = dbo.STOKGEN.P_ID  where dbo.STOK_ALT.STK like N'%%'" +
                "GROUP BY STOK_ALT.STK, dbo.STOK_ALT.STA,STOKGEN.TUR )countNumber";
            return query;
        }
        #endregion


        #region FindInBom

        public static string GetAllFindInBom(RequestQuery requestQuery)
        {
            query = $"SELECT dbo.STOKGEN.STK AS PartNo, dbo.TSTOKRECETESI.STK AS Material, dbo.TSTOKRECETESI.STA, dbo.TSTOKRECETESI.MIKTAR" +
                $" FROM dbo.TSTOKRECETESI INNER JOIN dbo.STOKGEN ON dbo.TSTOKRECETESI.STOKP_ID = dbo.STOKGEN.P_ID where STOKGEN.STK like N'%{requestQuery.Stk}%'" +
                $"  and  dbo.TSTOKRECETESI.STK like N'%{requestQuery.material}%'GROUP BY dbo.STOKGEN.STK, dbo.TSTOKRECETESI.STK, dbo.TSTOKRECETESI.STA, dbo.TSTOKRECETESI.MIKTAR" +
                $"  order By PartNo OFFSET {requestQuery.pageNumber} ROWS FETCH NEXT {requestQuery.pageSize} ROWS ONLY; ";
            return query;
        }


        public static string GetAllFindInBomCount = "select COUNT(*) from( SELECT dbo.STOKGEN.STK AS PartNo, dbo.TSTOKRECETESI.STK AS Material, dbo.TSTOKRECETESI.STA, dbo.TSTOKRECETESI.MIKTAR" +
            " FROM dbo.TSTOKRECETESI INNER JOIN dbo.STOKGEN ON dbo.TSTOKRECETESI.STOKP_ID = dbo.STOKGEN.P_ID" +
            " GROUP BY dbo.STOKGEN.STK, dbo.TSTOKRECETESI.STK, dbo.TSTOKRECETESI.STA, dbo.TSTOKRECETESI.MIKTAR)numberCount";
        #endregion
        #endregion

        #region Uretim


        #region uretim Basla-uretim Bitir
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
                $" and LotNo like N'%{requestQuery.lotNo}%' " +
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
                $" And dbo.Local_ProductionOrders.LotNo like N'%{requestQuery.lotNo}%'" +
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
        public static string uretimBitir3_processFlow(int flowId)
        {
            query = $" SELECT  * FROM ProcessFlow WHERE ProcessFlow.Flow_ID={flowId}";
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
            query = $"UPDATE dbo.Local_ProductionOrders SET dbo.Local_ProductionOrders.Status = 3, dbo.Local_ProductionOrders.CloseDate =GetDate() where " +
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
            query = "SELECT ProcessPlanFollowTable.ID, " +
                "  convert(varchar(10), cast(ProcessPlanFollowTable.ProcessDate As Date), 103) as ProcessDate, " +
                   " dbo.ProcessPlanFollowTable.[Group], ProcessPlanFollowTable.ProsesAdi, ProcessPlanFollowTable.PartNo," +
                   " ProcessPlanFollowTable.WOLot, ProcessPlanFollowTable.RemainProcessqty, " +
                   "  convert(varchar(10), cast( ProcessPlanFollowTable.WONewDate As Date), 103) as WONewDate," +
                   "ProcessPlanFollowTable.Balance, ProcessPlanFollowTable.Order_no, ProcessPlanFollowTable.ProcessNo_ID, " +
                   "ProcessPlanFollowTable.Qty, ProcessPlanFollowTable.Process_qty, ProcessPlanFollowTable.Ok_Qty, " +
                   "ProcessPlanFollowTable.Process_reject, ProcessPlanFollowTable.Process_Rework, ProcessPlanFollowTable.Complete " +
                   " FROM ProcessPlanFollowTable " +
                   " WHERE(((ProcessPlanFollowTable.RemainProcessqty) > 0)) " +
                   $" and ProcessPlanFollowTable.PartNo like N'%{requestQuery.Stk}%'" +
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
$" where Process_Planning.ProsesAdi like N'%{requestQuery.processAdi}%' and dbo.[10_MakinaListesiNew].Machine_no like N'%{requestQuery.machineNo}%' " +
$" GROUP BY ProcessFlowDetail.Finish_time, Process_Planning.ProsesAdi,Operator.Operator_Name, ProcessFlowDetail.Start_time, " +
$" ProcessFlowDetail.Finish_time,ProcessFlowDetail.Machine,ProcessFlowDetail.Finish_time, Local_ProductionOrders.PartNo_ID " +
$" ,dbo.[10_MakinaListesiNew].Machine_no ORDER BY Finish_time DESC" +
$" OFFSET {requestQuery.pageNumber} ROWS FETCH NEXT {requestQuery.pageSize} ROWS ONLY;";
            return query;
        }
        #endregion

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
            query = $"Select Process_Planning.ProcessNo, BOM_Process.OrderNo, SubPartNo, PartNo_ID ,Qty,Quality,ProcessName, Process_Planning.ProsesAdi from BOM_Process inner join" +
                $" Process_Planning on SubPartNo = Process_Planning.ProcessNo" +
                $" where PartNo_ID = '{request.pid}' order by BOM_Process.OrderNo ";
            return query;
        }
        public static string DeleteBomProcess(BomProcessViewModel bom) => $@"delete from BOM_Process where PartNo_ID ='{bom.PartNo_ID}' and OrderNo ={bom.OrderNo} and SubPartNo = {bom.SubPartNo}";
        public static string UpdateBomProcess(BomProcessViewModel bom) => $@"
update BOM_Process set Quality = '{bom.Quality}' ,
SubPartNo={bom.ProcessNo},Qty={bom.Qty} where OrderNo ={bom.OrderNo} and PartNo_ID='{bom.PartNo_ID}'
";
        public static string GetProcessPlanning = "select Distinct  ProcessNo,ProsesAdi,ProcessName from Process_Planning";


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


        public static string AddBomProcess(BomProcessViewModel b)
        {
            query = $"insert into BOM_Process(PartNo_ID,Qty,Quality,SubPartNo,SubPartNoNext)" +
                $" values('{b.PartNo_ID}', {b.Qty}, '{b.Quality}', {b.SubPartNo}, {b.SubPartNoNext});";
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
            query = $"select Flow_ID,ProcessNo_ID,ProductOrder_ID,Ok_Qty,Process_qty,Process_reject,Process_Rework,Order_no ," +
                $"ProsesAdi from ProcessFlow  inner join Process_Planning On  ProcessFlow.ProcessNo_ID =Process_Planning.ProcessNo" +
                $" where ProductOrder_ID={requestQuery.ProductOrderId} order by Flow_ID" +
                 $" OFFSET {requestQuery.pageNumber} ROWS FETCH NEXT {requestQuery.pageSize} ROWS ONLY; ";
            return query;
        }
        public static string DeleteFromProceeFlow(int flowId) => $"delete from ProcessFlow where Flow_ID = {flowId}";

        public static string UpdateProcessFlowInProcessDetails(processFlowEditViewModel m) => $@"
update ProcessFlow set Ok_Qty = {m.okQty},ProcessNo_ID={m.processNo},
Process_qty={m.processQty},Process_reject = {m.reject},Process_Rework={m.rework}
where Flow_ID = {m.flowId} and Order_no = {m.orderNo} and ProductOrder_ID = {m.productOrderId};
";


        public static string GetProcessFlowDetailsInProcessDetails(RequestQuery requestQuery)
        {
            query = $"select   convert(varchar(10), cast(ProcessFlowDetail.Finish_time As Date), 103) as FinishTime," +
                $"   ProcessFlowDetail.Np_time,ProcessFlowDetail.ID as FlowDetailsId, ProcessFlowDetail.Np_Def," +
                $"ProcessFlowDetail.Defect1_qty,ProcessFlowDetail.Defect1_Name,ProcessFlowDetail.Defect2_qty,ProcessFlowDetail.Defect2_Name," +
                $"ProcessFlowDetail.Rework_qty,ProcessFlowDetail.Rework_Name," +
                $"convert(varchar(10), cast(ProcessFlowDetail.InputDate As Date), 103) as InputDate," +
                $"Operator.Operator_ID," +
                $" Process_Planning.ProsesAdi, ProcessFlowDetail.Ok_Qty,dbo.[10_MakinaListesiNew].Machine_Id," +
                $" Operator.Operator_Name, convert(varchar(10), cast(ProcessFlowDetail.Start_time As Date), 103) as Start_time,dbo.[10_MakinaListesiNew].Machine_no" +
                $" FROM(((ProcessFlowDetail INNER JOIN ProcessFlow ON ProcessFlowDetail.Flow_ID = ProcessFlow.Flow_ID)" +
                $" INNER JOIN Process_Planning ON ProcessFlow.ProcessNo_ID = Process_Planning.ProcessNo)" +
                $" inner join dbo.[10_MakinaListesiNew] on dbo.[10_MakinaListesiNew].Machine_Id = ProcessFlowDetail.Machine" +
                $" inner join Local_ProductionOrders  ON ProcessFlow.ProductOrder_ID = Local_ProductionOrders.ProductOrderID)" +
                $" INNER JOIN Operator ON ProcessFlowDetail.Operator = Operator.Operator_ID" +
                $" where Local_ProductionOrders.ProductOrderID ={requestQuery.ProductOrderId} " +
                $" ORDER BY Finish_time DESC OFFSET {requestQuery.pageNumber} ROWS FETCH NEXT {requestQuery.pageSize} ROWS ONLY;";
            return query;
        }
        public static string DeleteFromProceesFlowDetails(int Id) => $"delete from ProcessFlowDetail where ID = {Id}";

        public static string UpdateProcessFlowDetailsInProcessDetails(ProcessFlowDetailsEditViewModel m) => $@"
set dateformat dmy;
update ProcessFlowDetail set
Start_time = '{m.startTime}', Finish_time ='{m.finishTime}',Ok_Qty={m.okQty},Machine={m.machineId},Operator={m.operatorId},
Np_time={m.npTime},Np_Def='{m.npDef}',Defect1_qty={m.defect1Qty},Defect1_Name='{m.defect1Name}',Defect2_qty={m.defect2Qty},Defect2_Name='{m.defect2Name}',
Rework_Name='{m.reworkName}',Rework_qty={m.reworkQty} where ID  ={m.flowDtailsId}
";

        #endregion

        #region Production Start
        public static string GetAllProductionStatus(RequestQuery r)
        {
            query = $"select ProductionSheet,LotNo,RoleId, ProductionStatusTemp.Qty ,Stock,Stock_Out,InputDate,Process_ID,Process_Planning.ProsesAdi,PartNo_ID from" +
                $" ProductionStatusTemp inner join Process_Planning on ProductionStatusTemp.Process_ID = Process_Planning.ProcessNo" +
                $" inner join Local_ProductionOrders on ProductionSheet = Local_ProductionOrders.ProductOrderID  order by ProductionSheet" +
                $" OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY; ";
            return query;
        }

        public static string DeleteproductionStatus(int sheetId, string roleId)
        {
            query = $"delete from ProductionStatusTemp where ProductionSheet= {sheetId} and  RoleId ='{roleId}'";
            return query;
        }
        public static string DeleteAllProductionStatus(string roleId)
        {
            query = $"delete from ProductionStatusTemp where  RoleId = '{roleId}'";
            return query;
        }

        public static string AddToProductionStatus(string date, int sheetId, int? orderNo, int qty, string roleId)
        {
            query = $"SET DATEFORMAT dmy; insert into ProductionStatusTemp(ProductionSheet,Qty,Process_ID,InputDate,RoleId)" +
                $" values ({sheetId},{qty},{orderNo},'{date}','{roleId}')";
            return query;
        }

        public static string CheckProdcutionOrdersStatus(int productId, string RoleId) =>
            $@"select* from ProductionStatusTemp where ProductionSheet={productId} 
and RoleId = '{RoleId}'";


        public static string UpdateRevisedDateInLocalProductionOrders() => @"update  Local_ProductionOrders 
 SET dbo.Local_ProductionOrders.RevisedDate = GETDATE(), dbo.Local_ProductionOrders.Status = 2
 from  Local_ProductionOrders   inner join  ProductionStatusTemp
 on Local_ProductionOrders.ProductOrderID = ProductionStatusTemp.ProductionSheet ;";

        public static string InsertIntoProcessFlowInProductionStart()
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



        #region Bakim
      
        #region Bakim Ariza
        public static string GetAllMachine(RequestQuery requestQuery)
        {
            query = "SELECT [dbo].[10_MakinaListesiNew].Machine_Id, [dbo].[10_MakinaListesiNew].Machine_no,[dbo].[10_MakinaListesiNew].Machine_Name , [dbo].[10_MakinaListesiNew].MODEL," +
             $" [dbo].[10_MakinaListesiNew].Bölüm  as Bolum,[10_MakinaListesiNew].Producer FROM[dbo].[10_MakinaListesiNew] where [dbo].[10_MakinaListesiNew].Machine_no " +
             $"like N'%{requestQuery.machineNo}%'" +
             "ORDER BY [dbo].[10_MakinaListesiNew].Machine_no" +
             $" OFFSET  {requestQuery.pageNumber} rows fetch next {requestQuery.pageSize} rows only; ";
            return query;
        }


        public static string GetAllMachineCount = "select count(*) from ( select * from dbo.[10_MakinaListesiNew])countNumber";

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

        #region Bakim ozet

        public static string GetBakimKayitByMakineID(int makineId) => $@"
SELECT Tbl_BakımKayit.Makina_ID,
convert(varchar(10), cast(Tbl_BakımKayit.Tarih As Date), 103) as Tarih,
 Tbl_BakımKayit.BakımTipi as BakimTipi,
  Tbl_BakımKayit.BakımıYapan as BakimYapan, 
  convert(varchar(25), cast(BaslamaSaat As datetime), 103) 
  + ' '+ convert(varchar(25), cast(BaslamaSaat As datetime), 14)
   as BaslamaSaat,
   convert(varchar(25), cast(BitisSaat As datetime), 103) 
  + ' '+ convert(varchar(25), cast(BitisSaat As datetime), 14)
   as BitisSaat,
  Tbl_BakımKayit.ArizaTanım as ArizaTanimi,
    Tbl_BakımKayit.Yapılanİslem as YapilanIslem
	 FROM Tbl_BakımKayit WHERE (((Tbl_BakımKayit.Tamamlanma)=1))
	 and Tbl_BakımKayit.Makina_ID = {makineId}; 

";
        #endregion

        #region Bakim Sorumlulari
        public static string GetAllBakimSorumlulari(RequestQuery r) => $@"select SorumluID as sorumluId,BakımSorumlusu as bakimSorumlusu,Departman as departman  
from dbo.[12_BakımSorumluları] where BakımSorumlusu like N'%{r.operatorName}%' order by 1 OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY; ";


        public static string GetAllBakimSorumlulariCount = $"select COUNT(*) from(select  *  from dbo.[12_BakımSorumluları] )countNumber";
        public static string DeleteBakimSorumlu(int sorumluId)=> $"delete  from [12_BakımSorumluları] where SorumluID = {sorumluId}";
        public static string AddBakimSorumlu(BakimSorumluModel m)=> $"insert into  [12_BakımSorumluları] values('{m.bakimSorumlusu}','{m.departman}')";
        public static string EditBakimSorumlu(BakimSorumluModel m) => $"update[12_BakımSorumluları] set BakımSorumlusu = '{m.bakimSorumlusu}',Departman='{m.departman}' where SorumluID = {m.sorumluId}";
        #endregion

        #region Bakim Raprou

        public static string GetBakimRaporu = @"
with BakimRapor as
(
SELECT [11_BakımTipi].BakımTipi as BakimTipi,month( CAST(Tbl_BakımKayit.Tarih as date)) AS Expr1, 
count([10_MakinaListesiNew].Machine_Id) as countOfMakinId,
 Format([Tarih],'yyyy') AS yil
FROM (Tbl_BakımKayit Tbl_BakımKayit INNER JOIN [11_BakımTipi] ON Tbl_BakımKayit.BakımTipi = 
[11_BakımTipi].BakımID) INNER JOIN dbo.[10_MakinaListesiNew] ON Tbl_BakımKayit.Makina_ID = [10_MakinaListesiNew].Machine_Id
WHERE ((([10_MakinaListesiNew].Aktif2)=1))  and  Format([Tarih],'yyyy') is not Null
group by  [11_BakımTipi].BakımTipi,Format([Tarih],'yyyy'),Tarih
) select * from BakimRapor
               PIVOT(sum(countOfMakinId) 
			   FOR Expr1 IN ([01],[02],[03],[04],[05],[06],[07],[08],[09],[10],[11],[12] )) P; 
		";

        #endregion

        #region  bakim Kapama
        public static string GetAllBakimArizaKapama(RequestQuery r) => $@"
set DateFormat dmy;
SELECT Tbl_BakımKayit.Makina_ID, Tbl_BakımKayit.Tamamlanma, 
Tbl_BakımKayit.Planlananİslem as planlanaIslem,
 Tbl_BakımKayit.BakımTipi as BakimTipi,dbo.[10_MakinaListesiNew].Machine_Name,
 dbo.[10_MakinaListesiNew].Machine_no,
  FORMAT(Tbl_BakımKayit.BaslamaSaat,'dd/MM/yyyy hh:mm:ss') as BaslamaSaat, Tbl_BakımKayit.BitisSaat,
   Tbl_BakımKayit.BakımıTalepEden as BakimTalepEden,
   Operator.Operator_Name,
   FORMAT(Tbl_BakımKayit.PlanlananTarih,'dd/MM/yyyy hh:mm:ss')as PlanlananTarih,
    Tbl_BakımKayit.Bakim_ID, Tbl_BakımKayit.PlanlananTarih
FROM Tbl_BakımKayit inner join dbo.[10_MakinaListesiNew]
on Tbl_BakımKayit.Makina_ID=dbo.[10_MakinaListesiNew].Machine_Id
inner join Operator on
Operator.Operator_ID = Tbl_BakımKayit.BakımıTalepEden
WHERE (((Tbl_BakımKayit.Tamamlanma)=0) AND ((Tbl_BakımKayit.BakımTipi)=2))
order by 1 OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY; 
";
        #endregion

        #region  Bakim kapat

        public static string KapatBakimArizaModel(KapatBakimArizaModel m) => $@"
set dateformat dmy;
update Tbl_BakımKayit set 
BitisSaat='{m.bitisSaat}',ArizaTanım='{m.arizaTanim}',Yapılanİslem='{m.yapilanIslemler}',Tarih='{m.tarih}',
BakımıYapan={m.bakimYapan},Tamamlanma=1
where Bakim_ID={m.bakimId}
";
        #endregion

        #region  Bakim Girisi

        public static string InsertIntoBakimGirisi(BakimGirisiModel m) => $@"
set DateFormat dmy;
insert into Tbl_BakımKayit (Makina_ID,BakımTipi,BakımıYapan,BaslamaSaat,BitisSaat,Tarih,
ArizaTanım,Yapılanİslem,Tamamlanma)
values ({m.machine_Id},{m.BakimTipi},{m.BakimYapan},'{m.BaslamaSaat}','{m.BitisSaat}','{m.Tarih}','{m.ArizaTanimi}','{m.YapilanIslem}',1)
";
        #endregion

        #region Bakim planlama

        public static string insertIntoBakimPlanlama(BakimPlanlamaModel m,string newDate) => $@"
set DateFormat dmy;
insert into Tbl_BakımKayit(Makina_ID,PlanlananTarih,BakımTipi,PlanlananBakımci,
Planlananİslem,
Tamamlanma)
values({m.machineId},'{newDate}',1,{m.plananaBakimici},'{m.plananIslemler}',0)";
        #endregion

        #region Planli Bakim
        public static string GetAllPlanliBakim(RequestQuery r) => $@"
SELECT Tbl_BakımKayit.Bakim_ID,
 CONVERT(VARCHAR(10), Tbl_BakımKayit.PlanlananTarih, 103) as PlanlananTarih , [10_MakinaListesiNew].Machine_no, Tbl_BakımKayit.PlanlananBakımci as planananBakimici,[12_BakımSorumluları].BakımSorumlusu as BakimSorumlusu,
 Tbl_BakımKayit.Planlananİslem as PlanlananIslem,
  dbo.[10_MakinaListesiNew] .Machine_Name,[10_MakinaListesiNew].Machine_Id,
  [10_MakinaListesiNew].MODEL ,Tbl_BakımKayit.Yapılanİslem as YapilanIslem  FROM Tbl_BakımKayit INNER JOIN [10_MakinaListesiNew] ON 
  Tbl_BakımKayit.Makina_ID = [10_MakinaListesiNew].Machine_Id
inner join [12_BakımSorumluları] 
  on [12_BakımSorumluları].SorumluID = Tbl_BakımKayit.PlanlananBakımci
WHERE 
  (((Tbl_BakımKayit.BakımTipi)=1) AND ((Tbl_BakımKayit.Tamamlanma)=0) 
  AND (([10_MakinaListesiNew].Aktif2)=1))
  and Machine_no like N'%{r.machineNo}%' 
  ORDER BY Tbl_BakımKayit.PlanlananTarih, [10_MakinaListesiNew].Machine_no
  OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY; 

";

        public static string GetAllPlanliBakimCount=$@"
 select count(1) from( SELECT * FROM Tbl_BakımKayit INNER JOIN [10_MakinaListesiNew] ON 
  Tbl_BakımKayit.Makina_ID = [10_MakinaListesiNew].Machine_Id WHERE 
  (((Tbl_BakımKayit.BakımTipi)=1) AND ((Tbl_BakımKayit.Tamamlanma)=0) 
  AND (([10_MakinaListesiNew].Aktif2)=1))
)countNumber; 

";

        public static string UpdatePlanliBakim(planliBakimModel m,string newDate) => $@"
set DateFormat dmy;
update Tbl_BakımKayit  set Tarih = '{m.tarih}' ,BakımıYapan= {m.bakimYapan}, BaslamaSaat ='{m.baslamaSaat}',BitisSaat='{m.bitisSaat}',ArizaTanım ='Planlı',
Yapılanİslem='{m.yapilanIslem}',Tamamlanma=1 where Bakim_ID = 5566515;
insert into Tbl_BakımKayit(Makina_ID,PlanlananTarih,BakımTipi,PlanlananBakımci,Planlananİslem,Tamamlanma)
values({m.machineId},'{newDate}',1,{m.planananBakimici},'{m.PlanlananIslem}',0);
";
        #endregion

        #region Makineler
        public static string GetAllMakineler(RequestQuery r)  => $@"
select Machine_Id, [10_MakinaListesiNew].Bölüm as bolum,[10_MakinaListesiNew].Güç as guc,
Machine_no,Machine_Name,
model,[10_MakinaListesiNew].Yıl as Yil ,ElektrikBağlantı as elec, Birim 
,Producer,[Yetkili Servis] as YetkiliServis,PlanlıBakım as planliBakim, Aktif as aktif,Aktif2 as  uretimMakinesi
from [10_MakinaListesiNew]  where Machine_no  like '%{r.machineNo}%'
order by  1 OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY; 
";
        public static string GetAllMakinelerCount="select count(*)from (select * from [10_MakinaListesiNew]) countNumber";
        public static string DeleteMakine(int machineId) => $"delete from [10_MakinaListesiNew] where Machine_Id={machineId}";

        public static string AddNewMakine(makinelerViewModel m) => $@"
set dateformat dmy;
insert into dbo.[10_MakinaListesiNew] (Machine_no,Machine_Name,MODEL,Bölüm,Producer,Yıl,[Yetkili Servis],
ElektrikBağlantı,Güç,Birim,PlanlıBakım,Aktif,Aktif2)

values('{m.machineNo}','{m.machineAdi}','{m.model}','{m.bolum}','{m.uretici}', '{m.yil}','{m.YetkiliServis}','{m.elec}',{m.guc},'{m.birim}',{m.planliBakim},{m.aktif},{m.uretimMakinesi})
";

        public static string UpdateMakine(makinelerViewModel m) => $@"
update dbo.[10_MakinaListesiNew] set Machine_no='{m.machineNo}',
Machine_Name='{m.machineAdi}' ,MODEL='{m.model}',Bölüm='{m.bolum}',Producer='{m.uretici}',[Yetkili Servis]='{m.YetkiliServis}',Yıl='{m.yil}',ElektrikBağlantı='{m.elec}',
Güç={m.guc},Birim='{m.birim}',PlanlıBakım={m.planliBakim},Aktif={m.aktif},Aktif2={m.uretimMakinesi} where Machine_Id={m.machineId}
";
        #endregion

        #region AllBakimKayit

        #endregion
        public static string GetAllBakimRecords(RequestQuery r) => $@"

set dateformat dmy;
select Makina_ID,Bakim_ID,
convert(varchar(10), cast(Tarih As Date), 103) as Tarih,
BakımTipi as bakimTipi,
 CONVERT(CHAR(8),BaslamaSaat,108) as baslamaSaat,
 CONVERT(CHAR(8),BitisSaat,108) as bitisSaat, ArizaTanım as arizaTanim ,Yapılanİslem as  yapilanIslem,
convert(varchar(10), cast(PlanlananTarih As Date), 103) as PlanlananTarih 
,Planlananİslem as planlananIslem ,Tamamlanma,PlanlananBakımci as planlananBakimci,
dbo.[10_MakinaListesiNew].Machine_no,
 BakımıTalepEden as BakimTalepEden from Tbl_BakımKayit
 left join dbo.[10_MakinaListesiNew] on
 Tbl_BakımKayit.Makina_ID = dbo.[10_MakinaListesiNew].Machine_Id
 where Machine_no like N'%{r.machineNo}%' order by Bakim_ID
 OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY;
";

        public static string GetAllBakimRecordsCount = @"select Count(*) from (select Makina_ID,Bakim_ID,
convert(varchar(10), cast(Tarih As Date), 103) as Tarih,
BakımTipi as bakimTipi,
 CONVERT(CHAR(8),BaslamaSaat,108) as baslamaSaat,
 CONVERT(CHAR(8),BitisSaat,108) as bitisSaat, ArizaTanım as arizaTanim ,Yapılanİslem as  yapilanIslem,
convert(varchar(10), cast(PlanlananTarih As Date), 103) as PlanlananTarih 
,Planlananİslem as planlananIslem ,Tamamlanma,PlanlananBakımci as planlananBakimci,
dbo.[10_MakinaListesiNew].Machine_no,
 BakımıTalepEden as BakimTalepEden from Tbl_BakımKayit
 left join dbo.[10_MakinaListesiNew] on
 Tbl_BakımKayit.Makina_ID = dbo.[10_MakinaListesiNew].Machine_Id
 where Machine_no like N'%%')countNumber
";

        public static string DeleteFromTbleBakimKayit(int bakimId) => $"delete from Tbl_BakımKayit where Bakim_ID={bakimId}";

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
            query = $"select * from dbo.D_Company where D_Company.CompanyType like N'%{requestQuery.companyType}%' order by Id_Cust" +
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
            query = $"select * from G_PartNumbers  where  STK like N'%{requestQuery.Stk}%' order By ID desc " +
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
                $" where STK like N'%{requestQuery.Stk}%'  and F_Operator.OperatorName like N'%{requestQuery.operatorName}%'   ORDER BY B_NonConformityReport.NC_TargetDate DESC" +
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
                "convert(varchar(10), cast(B_NonConformityReport.NC_TargetDate As Date), 103) as NC_TargetDate , B_NonConformityReport.NC_Type as NcTypeId,  dbo.A_NCType.ClaimType as TypeName,A_NCType.ClaimType_a as TypeNameTr, " +
                " B_NonConformityReport.NC_Responsible as responsibleId," +
                " F_Operator.OperatorName as resbonsibleName, B_NonConformityReport.Process as ProcessId, B_NonConformityReport.Nc_OpenedBy as OpenById, " +
                " convert(varchar(10), cast(B_NonConformityReport.NC_OpenDate As Date), 103) as NC_OpenDate,B_NonConformityReport.NC_Id_Def, B_NonConformityReport.NC_RootCauseAnalysis, " +
                " convert(varchar(10), cast(B_NonConformityReport.NC_CloseDate As Date), 103) as NC_CloseDate,B_NonConformityReport.NonConformty_qty as qty," +
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
                $" convert(varchar(10), cast(TargetDate As Date), 103) as TargetDate ,convert(varchar(10), cast(CloseDate As Date), 103) as CloseDate,[Status] from  dbo.C_ActionList where" +
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
            query = $"select ID, NC_ID,Document as DocumentType, convert(varchar(10), cast(ChangeDate As Date), 103) as ChangeDate,NewRev,Notes  from J_DocumentControl  where NC_ID = {ncId}";
            return query;
        }
        public static string SaveReviewDetalis(ReviewViewModel rev)
        {
            query = $"set dateFormat dmy; update B_NonConformityReport  set NC_Type={rev.NcTypeId},  NC_Id_Def='{rev.NC_Id_Def}',CorrectiveAction={rev.CorrectiveAction},PreventativeAction={rev.PreventativeAction}," +
                $" Repetitive={rev.Repetitive},NC_Customer_Supplier = {rev.CompanyId},Department = {rev.DepartmentId},Process = {rev.ProcessId},PartNo = {rev.PartNo}," +
                $" NonConformity = '{rev.NonConformity}',NonConformty_qty = {rev.qty}, " +
                $" Nc_OpenedBy = {rev.OpenById},NC_OpenDate = '{rev.NC_OpenDate}',NC_TargetDate = '{rev.NC_TargetDate}',NC_Responsible = {rev.responsibleId},NC_CloseDate ='{rev.NC_CloseDate}'," +
                $" Nc_desc2='{rev.Nc_desc2}',NC_Status = 0 ,NC_RootCauseAnalysis = '{rev.NC_RootCauseAnalysis}',ActionImme = 1,ActionPer = 2 " +
                $" where NC_ID ={rev.NC_ID};";
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
                $" B_NonConformityReport.Department, B_NonConformityReport.Process, B_NonConformityReport.PartNo as STK, B_NonConformityReport.Nc_OpenedBy, B_NonConformityReport.NC_OpenDate, B_NonConformityReport.NC_TargetDate, B_NonConformityReport.NC_Responsible FROM C_ActionList INNER JOIN B_NonConformityReport ON C_ActionList.NC_ID = B_NonConformityReport.NC_ID" +
                $" left join F_Operator on C_ActionList.Responsible = Op_ID" +
                $" left Join D_Company on D_Company.Id_Cust = NC_Customer_Supplier" +
                $" left Join E_Department on E_Department.DEPT_ID = NC_Customer_Supplier" +
                $" WHERE C_ActionList.Status = 0 OR C_ActionList.Status Is Null and PartNo like N'%{requestQuery.Stk}%' or PartNo Is Null" +
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
            query = "SET DATEFORMAT dmy; WITH Sales AS(SELECT convert(varchar(10), cast(Finish_time As Date), 103) as finishTime, SUM(S.Ok_Qty) as total,[Group]  FROM  dbo.ProcessFlowDetail S INNER JOIN dbo.ProcessFlow I ON S.Flow_ID = I.Flow_ID INNER JOIN dbo.Process_Planning z     ON I.ProcessNo_ID = z.ProcessNo " +
                $" where Finish_time between '{startAt}' and '{endAt}' group by Finish_time, [Group], S.Ok_Qty " +
                    ") SELECT * FROM   Sales PIVOT(SUM(total) FOR[Group] IN([01_Kesim],[02_Büküm],[03_Havşa],[04_Kaynak],[041_KesDel],[042_Hazirlik],[05_Hortum],[06_Paketleme]" +
                    $",[06_PaketlemeDiğer],[06_test],[07_Mercedes],[99_Proto],[09_Kaplama],[08_UçŞekil])) P order by finishTime desc OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY";
            return query;
        }

        public static string GetProcutionReportWithoutFilter(RequestQuery r)
        {
            query = "SET DATEFORMAT dmy; WITH Sales AS( SELECT  convert(varchar(10), cast(Finish_time As Date), 103) as finishTime, SUM(S.Ok_Qty) as total,[Group]  FROM  dbo.ProcessFlowDetail S INNER JOIN dbo.ProcessFlow I ON S.Flow_ID = I.Flow_ID INNER JOIN dbo.Process_Planning z     ON I.ProcessNo_ID = z.ProcessNo " +
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
        public static string GetProcutionDetailsReport(RequestQuery r, string startAt, string endAt, string v) => $@" SET DATEFORMAT dmy;
 select convert(varchar(10), cast( Finish_time As Date), 103) as FinishTime,
Process_Planning.ProsesAdi,
 Sum(ProcessFlowDetail.Ok_Qty) AS Total,Local_ProductionOrders.PartNo_ID,
  dbo.Operator.Operator_Name as OperatorName,  FORMAT(Start_time, 'dd-MM-yyyy hh:mm:ss') as startTime
  ,   FORMAT(Finish_time, 'dd-MM-yyyy hh:mm:ss') as   finishTimeWithHour, ProcessFlowDetail.Machine
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
                ", 1, 1, ''); set @query = N'WITH Sales AS (SELECT " +
                " right(convert(varchar(10), cast( S.Finish_time As Date), 104),7 )as finishTime, Z.REject_Name, [Group], sum(S.Defect1_qty) as totalQty" +
                " FROM  dbo.ProcessFlowDetail S INNER JOIN dbo.ProcessFlow I on S.Flow_ID = I.Flow_ID inner join Process_Planning P on I.ProcessNo_ID = p.ProcessNo " +
                $"inner join Reject_def Z  on Z.Reject_ID = S.Defect1_Name WHERE S.Defect1_qty > 0   and Finish_time between ''{startAt}'' and ''{endAt}''" +
                " Group by S.Defect1_Name, Z.REject_Name, right(convert(varchar(10), cast( S.Finish_time As Date), 104),7 ),[Group] ) select* from Sales " +
                $" PIVOT(SUM(totalQty) FOR[Group] IN('+@cols+')) P order by finishTime OFFSET {r.pageNumber}  rows fetch next {r.pageSize} ROWS ONLY;   'EXECUTE sp_executesql @query;";
            return query;
        }

        public static string GeDefectReportWithoutFilter(RequestQuery r)
        {
            query = "DECLARE @cols AS nvarchar(max)DECLARE @query AS nvarchar(max)SELECT @cols = STUFF((SELECT DISTINCT    ',' + QUOTENAME([Group])FROM[dbo].Process_Planning order by 1 FOR xml PATH(''), TYPE ).value('.', 'NVARCHAR(MAX)')" +
                ", 1, 1, ''); set @query = N'WITH Sales AS (SELECT  " +
                "right(convert(varchar(10), cast( S.Finish_time As Date), 104),7 )as finishTime, Z.REject_Name, [Group], sum(S.Defect1_qty) as totalQty" +
                " FROM  dbo.ProcessFlowDetail S INNER JOIN dbo.ProcessFlow I on S.Flow_ID = I.Flow_ID inner join Process_Planning P on I.ProcessNo_ID = p.ProcessNo " +
                $" inner join Reject_def Z  on Z.Reject_ID = S.Defect1_Name WHERE S.Defect1_qty > 0" +
                " Group by S.Defect1_Name, Z.REject_Name,  right(convert(varchar(10), cast( S.Finish_time As Date), 104),7 ),[Group] ) select* from Sales " +
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
            query = "SET DATEFORMAT dmy;SELECT  convert(varchar(10), cast(Finish_time As Date), 104) as Finish_time,Local_ProductionOrders.PartNo_ID, ProcessFlowDetail.Ok_Qty as OkQty, ProcessFlowDetail.Defect1_qty AS Adet," +
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
            query = "SET DATEFORMAT dmy;SELECT   " +
                "  convert(varchar(10), cast(Finish_time As Date), 104) as Finish_time" +
                ",Local_ProductionOrders.PartNo_ID, ProcessFlowDetail.Ok_Qty as OkQty, ProcessFlowDetail.Defect1_qty AS Adet," +
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
WHERE (((STOKGEN.TUR)=3 Or (STOKGEN.TUR)=4)) and dbo.STOKGEN.STK like N'%{r.Stk}%'
and  STOK_ALT.TARIH between '{startAt}' and '{endAt}'

GROUP BY CAST(STOK_ALT.TARIH AS DATE),  STOKGEN.STK, STOKGEN.TUR,[CKMIK],[GRMIK]
order by 2";

        public static string GetSellDateReportCount() => @"SELECT  dbo.STOKGEN.STK,MAX( CAST(STOK_ALT.TARIH AS DATE)) as tarih,STOKGEN.TUR,
  Sum(dbo.STOK_ALT.[GRMIK]-dbo.STOK_ALT.[CKMIK]) AS TotalStock
FROM dbo.STOK_ALT RIGHT JOIN dbo.STOKGEN ON dbo.STOK_ALT.STOKP_ID = dbo.STOKGEN.P_ID
WHERE (((STOKGEN.TUR)=3 Or (STOKGEN.TUR)=4))  and  STOK_ALT.TARIH is not  null

GROUP BY CAST(STOK_ALT.TARIH AS DATE),  STOKGEN.STK, STOKGEN.TUR,[CKMIK],[GRMIK]
order by 2";
        #endregion
        #endregion

        #region Order Management
        public static string GetOrderDetails(RequestQuery r)
        {
            query = "SELECT dbo.SIPARIS_ALT.STK, Sum(dbo.SIPARIS_ALT.MIKTAR) AS OrderQty, Sum(dbo.STOK_ALT.MIKTAR) AS TotalInvoice, dbo.SIPARIS_ALT.P_ID, dbo.SIPARIS_ALT.TURAC, dbo.SIPAR.EVRAKNO AS SIPEVRAKNO, dbo.SIPARIS_ALT.FATIRSTUR, dbo.SIPARIS_ALT.STOKP_ID, dbo.SIPARIS_ALT.TUR,CONVERT(varchar,dbo.SIPARIS_ALT.TESTARIHI,103) as TESTARIHI, dbo.SIPARIS_ALT.CARIREF, dbo.CARIGEN.STA" +
                " FROM((dbo.SIPARIS_ALT LEFT JOIN dbo.STOK_ALT ON(dbo.SIPARIS_ALT.STOKP_ID = dbo.STOK_ALT.STOKP_ID) AND(dbo.SIPARIS_ALT.P_ID = dbo.STOK_ALT.SIP_PID)) LEFT JOIN dbo.SIPAR ON dbo.SIPARIS_ALT.P_ID = dbo.SIPAR.P_ID) LEFT JOIN dbo.CARIGEN ON dbo.SIPARIS_ALT.CARIREF = dbo.CARIGEN.REF " +
                $" where SIPARIS_ALT.STK like N'%{r.Stk}%' GROUP BY dbo.SIPARIS_ALT.STK, dbo.SIPARIS_ALT.MIKTAR, dbo.SIPARIS_ALT.P_ID, dbo.SIPARIS_ALT.TURAC, dbo.SIPAR.EVRAKNO, dbo.SIPARIS_ALT.FATIRSTUR, dbo.SIPARIS_ALT.STOKP_ID, dbo.SIPARIS_ALT.TUR, dbo.SIPARIS_ALT.TESTARIHI, dbo.SIPARIS_ALT.CARIREF, dbo.CARIGEN.STA " +
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

        public static string GetComponentOrders(RequestQuery r, string startAt, string endAt) => $@"
set dateformat dmy;
DECLARE @cols AS nvarchar(max);
 DECLARE @query AS nvarchar(max);
  SELECT @cols = STUFF(( 
  SELECT DISTINCT      ',' + QUOTENAME( convert(varchar(10), cast( TESTARIHI As Date), 103))  
	 FROM[dbo].SIPARIS_ALT  where TESTARIHI between '{startAt}' and '{endAt}'
	  order by 1  FOR xml PATH(''), TYPE ).value('.', 'NVARCHAR(MAX)'), 1, 1, '');
	  set @query = 'WITH Sales AS ( SELECT S.STK, convert(varchar(10), cast( S.TESTARIHI As Date), 103) as YearDate,CARIGEN.STA as carigenSta, S.CARIREF,S.STA,S.MIKTAR - 
	  isNull(Sum(I.MIKTAR), 0) AS RemainQty_total FROM ((dbo.SIPARIS_ALT S left JOIN dbo.STOK_ALT I ON(S.STOKP_ID = I.STOKP_ID) 
	  and(S.P_ID = I.SIP_PID)) left JOIN SIPAR on S.P_ID = SIPAR.P_ID) left join CARIGEN  on S.CARIREF = CARIGEN.REF 
	   where  S.STK like N''%{r.Stk}%''  GROUP BY S.STK, S.MIKTAR, S.TURAC, dbo.SIPAR.EVRAKNO, S.FATIRSTUR, S.STOKP_ID, S.TUR, CARIGEN.STA  ,
	      S.TESTARIHI, S.CARIREF, S.STA)  SELECT* FROM   Sales    PIVOT(SUM(RemainQty_total)  FOR  YearDate IN('+@cols+' )) P;'
		  EXECUTE sp_executesql @query;
";

        public static string GetCustomerOrders(RequestQuery r, string startAt, string endAt) => $@"set dateformat dmy;
DECLARE @cols AS nvarchar(max) DECLARE @query AS nvarchar(max) SELECT
 @cols = STUFF((        SELECT DISTINCT  
     ',' + QUOTENAME( convert(varchar(10), cast( TESTARIHI As Date), 103))  
	 FROM[dbo].SIPARIS_ALT  where TESTARIHI between '{startAt}' and '{endAt}' order by 1   FOR xml PATH(''), TYPE  ).value('.', 'NVARCHAR(MAX)') 
	 , 1, 1, '');     set @query = 'WITH Sales AS (SELECT   S.STK, cast(S.TESTARIHI as date) as YearDate,CARIGEN.STA as carigenSta,
	  S.CARIREF,S.STA, S.MIKTAR - isNull(Sum(I.MIKTAR), 0) AS RemainQty FROM ((dbo.SIPARIS_ALT S
	    left JOIN dbo.STOK_ALT I     ON(S.STOKP_ID = I.STOKP_ID) and(S.P_ID = I.SIP_PID)) 
		left JOIN SIPAR on S.P_ID = SIPAR.P_ID) left join CARIGEN on S.CARIREF = CARIGEN.REF
		 WHERE(((S.MIKTAR - isnull(I.MIKTAR, 0)) > 0) And((S.TUR) = 90)) 
	 and S.STK like N''%{r.Stk}%''  GROUP BY S.STK,S.P_ID, S.TURAC, S.STOKP_ID, S.TUR, S.TESTARIHI,CARIGEN.STA  ,
	  S.CARIREF, S.STA ,S.MIKTAR )  SELECT* FROM   Sales  PIVOT(SUM(RemainQty)  FOR  
	  YearDate IN('+@cols+')) P order by 5 ';EXECUTE sp_executesql @query;
	  ";
        #endregion
        #region Wo 
        public static string GetAllProductionOrders(RequestQuery r) => $@"SET DATEFORMAT dmy; select ProductOrderID,PartNo,PartNo_ID,LotNo,Qty,
Completed_Qty,
convert(varchar(10), cast(RequireDate As Date), 103) as RequireDate ,
convert(varchar(10), cast(IssueDate As Date), 103) as IssueDate ,
convert(varchar(10), cast(RevisedDate As Date), 103) as RevisedDate ,
convert(varchar(10), cast(CloseDate As Date), 103) as CloseDate ,
Printed,Status,CONVERT(varchar,RevisedDate,103) as RevisedDate,
Remark,CONVERT(varchar,CloseDate,103) as CloseDate
  from dbo.Local_ProductionOrders where   [Status] like N'%{r.uretimPlaniType}%' 
                 ORDER BY dbo.Local_ProductionOrders.RequireDate DESC OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY;";


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




        public static string GetBomProcessForPrint(string partNoId) => $@"select PartNo_ID ,Process_Planning.ProsesAdi,Process_Planning.ProcessName,
SubPartNo,BOM_Process.Qty,BOM_Process.Quality from BOM_Process inner join Process_Planning on
SubPartNo = Process_Planning.ProcessNo  where PartNo_ID = '{partNoId}' ";


        public static string GetTStokReceteForPrint(string stk) => $@"select STK,STA,STB,MIKTAR  from   [TSTOKRECETESI] where STK= N{stk}
";



        #endregion

        #region settings

        #region Box Type


        public static string GetBoxType(RequestQuery r) => $@"select P_ID, STK,STA,STR_3,STR_4,TUR from dbo.STOKGEN
where STK like N'%{r.Stk}%' order  by STR_3 DESC OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY;";
        public static string GetBoxTypeCount() => @"select count(*) from(select  STK,STA,STR_3,STR_4,TUR from dbo.STOKGEN)countNumber";

        public static string UpdateBoxType(BoxTypeViewModel b) => $@"
update STOKGEN set STR_3 ='{b.STR_3}' ,STR_4='{b.STR_4}',TUR={b.TUR} where P_ID ='{b.P_ID}'";

        #endregion
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
 select Operator_ID ,Operator_Name,Bolum,Aktif,CONVERT(varchar,GirisTarihi,103) as GirisTarihi FROM Operator where Operator_Name like N'%{r.operatorName}%'
order by 1  
OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY; ";

        public static string GetSettingsOperatorCount() => @" select count(1) from( select Operator_ID ,Operator_Name,Bolum,
CAST(GirisTarihi AS date)GirisTarihi,Aktif FROM Operator )countNumber  
";

        public static string AddToSettingOperator(SettingsOperatorViewModel s) => $@"SET DATEFORMAT dmy insert into Operator (Operator_Name,Bolum,GirisTarihi,Aktif)
values ('{s.Operator_Name}','{s.Bolum}','{s.GirisTarihi}','{s.Aktif}')";
        public static string GetSettingsOperatorPolivalance(int operatorId) => $@"select PP.ProcessNo,Op.Level,PP.ProcessName ,Op.ID
from OperatorPolivalance Op
 inner join Process_Planning PP on  Op.ProcessNo = PP.ProcessNo
 where Op.OperatorNo={operatorId} order by Op.ProcessNo ";

        public static string DeleteSettingOperator(int opertorId) => $"delete from Operator where Operator_ID ={opertorId}";
        public static string EditSettingsOperator(SettingsOperatorViewModel s) => $@"SET DATEFORMAT dmy;update Operator set Operator_Name='{s.Operator_Name}' ,Bolum='{s.Bolum}', GirisTarihi='{s.GirisTarihi}'
,Aktif='{s.Aktif}'
where Operator_ID ={s.Operator_ID}";
        #endregion


        public static string DeleteOperatorPolivalance(int id) => $"delete  from dbo.OperatorPolivalance where ID ={id}";
        public static string AddOperatorPolivalance(OperatorPolivalanceViewModel2 m) => $@"insert into dbo.OperatorPolivalance (Level,OperatorNo,ProcessNo)
values ({m.Level},{m.operatorNo},{m.ProcessNo})";
        public static string UpdateOperatorPolivalance(OperatorPolivalanceViewModel2 m ) => $@"update OperatorPolivalance
set Level = {m.Level},OperatorNo={m.operatorNo},ProcessNo={m.ProcessNo}
where ID = {m.ID}";

        #region #systemUsers
        public static string GetAllSyetemUsers(RequestQuery requestQuery) => $@"
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
                $" Mştrlok as mstrlok,VdGlnMkt as vdGlnmkt,[olcuBirimi] as olcuBirimi ,Göndtrh as gondtrh" +
                $" FROM TTFTeslimat where[Ürün] like N'%{requestQuery.Stk}%' order by  [Ürün] OFFSET {requestQuery.pageNumber} ROWS FETCH NEXT {requestQuery.pageSize} ROWS ONLY;";
            return query;
        }


        public static string AddTeslimatDurumu(TeslimatDurumuViewModel m) => $@"
insert Into TTFTeslimat  ([Ürün] , [Sipariş blgtürü],[Sprşblgno],[Mştrlok] ,[VdGlnMkt],[olcuBirimi],[Göndtrh])
values('{m.urunKodu}', '{m.siparisBlturu}', '{m.sprsblgno}', '{m.mstrlok}', '{m.vdGlnmkt}', '{m.olcuBirimi}', '{m.gondtrh}')
";

        public static string GetTeslimatDurumuCount = "select COUNT(*) from ( SELECT [Sipariş blgtürü] as siparisBlturu,Sprşblgno as sprsblgno,Klmno,[Ürün]as urunKodu," +
                " Mştrlok as mstrlok,VdGlnMkt as vdGlnmkt,[Ölçü birimi] as olcuBirimi ,Göndtrh as gondtrh" +
                " FROM TTFTeslimat)countNumber ";



        public static string GetShippmentReport(RequestQuery r) => $@"set DateFormat dmy;
DECLARE @cols AS nvarchar(max)DECLARE @query AS nvarchar(max)SELECT @cols =
 STUFF((SELECT DISTINCT    ',' + QUOTENAME(convert(varchar(10), cast( dbo.TTFTeslimat.Göndtrh As Date), 
 103)) FROM[dbo].TTFTeslimat order by 1 FOR xml PATH(''), TYPE ).value('.', 'NVARCHAR(MAX)'), 1, 1, ''); set @query = N'WITH Sales AS (SELECT S.[Sipariş blgtürü] as BilgiTuru,
   S.Mştrlok as mstrlok, S.Ürün as stk, S.VdGlnMkt,   S.[olcuBirimi] as OlcuBirimi,convert(varchar(10), cast(S.Göndtrh As Date), 103) as [month], I.FIELD18 +''-''+I.FIELD19 as Raf ,
	 I.STR_3 as kutuTipi, I.STR_4 as KutuIciMiktari,Sum(S.VdGlnMkt) AS ToplamSevk,Sum(S.VdGlnMkt)  AS Toplam FROM dbo.TTFTeslimat S left JOIN dbo.STOKGEN I on S.Ürün = I.STK where S.Ürün like  ''%{r.Stk}%''Group by S.[Sipariş blgtürü], S.Mştrlok, S.Ürün,S.VdGlnMkt, S.[olcuBirimi],Göndtrh,
	 I.FIELD18,I.FIELD19, I.STR_3, I.STR_4)SELECT* FROM   Sales PIVOT(SUM(ToplamSevk) FOR  
	 [month] IN ('+@cols+')) P  ORDER BY 1 OFFSET {r.pageNumber} ROWS FETCH NEXT {r.pageSize} ROWS ONLY ;; ' EXECUTE sp_executesql @query;";


        public static string DropAllTTFTeslimatTable = "DROP TABLE IF EXISTS dbo.TTFTeslimat;";

        public static string CreateTTFTeslimatTabel = @"CREATE TABLE [dbo].[TTFTeslimat](
	[Sipariş blgtürü] [nvarchar](255) NULL,
	[Sprşblgno] [nvarchar](255) NULL,
	[Klmno] [nvarchar](255) NULL,
	[Ürün] [nvarchar](255) NULL,
	[Mştrlok] [nvarchar](255) NULL,
	[VdGlnMkt] [float] NULL,
	[Göndtrh] [datetime] NULL,
	[olcuBirimi] [nvarchar](255) NULL,
	)
";
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

        public static string CheckTransferInStokgen()
        {
            query = $@"SELECT dbo.STOKGEN.STK, dbo.STOKGEN.tur, dbo.STOKGEN.P_ID 
                FROM dbo.STOKGEN WHERE ((dbo.STOKGEN.tur) = 2 Or(dbo.STOKGEN.tur) = 3)";
            return query;
        }

        public static string Transfer_InsertIntoProductionOrders_getlotNo(TrnasferWoToSystemViewModel m)
        {
            query = "SET DATEFORMAT dmy;" +
                $"insert into Local_ProductionOrders(PartNo_ID, Qty, IssueDate, RequireDate, Remark,[Status], Printed)" +
                $" values('{m.partNoId}', {m.qty}, '{m.issueDate}', '{m.requireDate}', '{m.remark}', 1, 0); SELECT CAST(SCOPE_IDENTITY() as int);";
            return query;
        }
        #endregion

        #region Etiketler

        // sevkiyet etiketi
        public static string GetSevkiyetKutuEtiketiList(RequestQuery requestQuery)
        {
            query = "SELECT dbo.STOK_ALT.TARIH, dbo.CARIGEN.STA as carigen_sta, dbo.STOK_ALT.STK, dbo.STOKGEN.STA as stokgen_sta,dbo.STOK_ALT.MIKTAR, dbo.STOK_ALT.SIPEVRAKNO, dbo.STOK_ALT.STB, dbo.STOK_ALT.TUR, dbo.STOK_ALT.TURAC, dbo.STOKGEN.P_ID, dbo.STOKGEN.FIELD18, dbo.STOKGEN.FIELD19,dbo.STOK_ALT.CARIREF, dbo.STOK_ALT.KALITEKODU, dbo.STOK_ALT.KALITEKODU, dbo.STOK_ALT.IRSEVRAKNO, " +
                " dbo.STOK_ALT.SIPSATIRP_ID, dbo.CARIGEN.ADRES1, dbo.CARIGEN.ADRES2, dbo.CARIGEN.SEMT,  dbo.CARIGEN.SEHIR ,dbo.CARIGEN.POSTAKODU AS ADRESS, dbo.CARISUBE.ADRESI FROM((((dbo.STOKGEN RIGHT JOIN dbo.STOK_ALT ON dbo.STOKGEN.P_ID = dbo.STOK_ALT.STOKP_ID) LEFT JOIN dbo.CARIGEN ON dbo.STOK_ALT.CARIREF = dbo.CARIGEN.REF) LEFT JOIN dbo.SIPARIS_ALT ON dbo.STOK_ALT.SIPSATIRP_ID = dbo.SIPARIS_ALT.SATIRP_ID) LEFT JOIN dbo.IRSALIYE ON dbo.STOK_ALT.IRS_PID = dbo.IRSALIYE.P_ID) LEFT JOIN dbo.CARISUBE ON dbo.IRSALIYE.CARISUBE = dbo.CARISUBE.REF WHERE(((dbo.STOK_ALT.TUR) = 60 Or(dbo.STOK_ALT.TUR) = 70 Or(dbo.STOK_ALT.TUR) = 280)) " +
                $"and dbo.STOKGEN.STK like N'%{requestQuery.Stk}%' ORDER BY dbo.STOK_ALT.TARIH DESC, dbo.CARIGEN.STA, dbo.STOK_ALT.STK " +
                $"OFFSET { requestQuery.pageNumber} ROWS FETCH NEXT { requestQuery.pageSize} ROWS ONLY;";
            return query;
        }

        // stok etiketi
        public static string GetAllStokEtiketi(RequestQuery requestQuery)
        {
            query = $" SELECT STOKGEN.STK, SUM(IIf(AORS = 'S', -1, 1) * MIKTAR) AS TotalStok," +
                $" STOKGEN.TUR,STOKGEN.STA,STOKGEN.REF,STOK_ALT.STOKREF,STOKGEN.P_ID,STOKGEN.FIELD18,STOKGEN.FIELD19 " +
                $" from dbo.STOK_ALT right join STOKGEN On STOK_ALT.STK = STOKGEN.STK " +
                $" where dbo.STOKGEN.STK like N'%{requestQuery.Stk}%'" +
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
                $" and dbo.STOKGEN.STK like N'%{requestQuery.Stk}%' ORDER BY dbo.IRSALIYE_ALT.TARIH DESC ,dbo.CARIGEN.STA,dbo.IRSALIYE_ALT.STK" +
                $" OFFSET {requestQuery.pageNumber}  ROWS FETCH NEXT {requestQuery.pageSize} ROWS ONLY";
            return query;
        }


        #region Giris Kontrol
        public static string GetGirisKontrol(RequestQuery r) => $@"
SELECT convert(varchar(10), cast( dbo.IRSALIYE_ALT.TARIH As Date), 103) as Tarih, dbo.CARIGEN.STA, dbo.IRSALIYE_ALT.STK, dbo.IRSALIYE_ALT.MIKTAR,
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


        public static string DeleteKaliteKodu(int irsRef, string stk) => $@"update dbo.IRSALIYE_ALT set  KALITEKODU ='' where REF ={irsRef} and STK = N'{stk}' ";
        #endregion
        #endregion

        #region Purchase Orders Managment 
        public static string GetAllPurchaseOrders = @"set DateFormat dmy;
SELECT dbo.SIPARIS_ALT.STK,
 convert(varchar(10), cast( dbo.SIPARIS_ALT.TESTARIHI As Date), 103) as RequireDate,
 dbo.CARIGEN.STA,
 dbo.SIPARIS_ALT.MIKTAR -isnull( Sum(dbo.STOK_ALT.MIKTAR),0) as RemainQty
FROM ((dbo.SIPARIS_ALT LEFT JOIN dbo.STOK_ALT ON (dbo.SIPARIS_ALT.STOKP_ID = dbo.STOK_ALT.STOKP_ID) AND
 (dbo.SIPARIS_ALT.P_ID = dbo.STOK_ALT.SIP_PID)) LEFT JOIN dbo.SIPAR ON dbo.SIPARIS_ALT.P_ID = dbo.SIPAR.P_ID)
  LEFT JOIN dbo.CARIGEN ON dbo.SIPARIS_ALT.CARIREF = dbo.CARIGEN.REF
GROUP BY dbo.SIPARIS_ALT.STK, dbo.SIPARIS_ALT.MIKTAR,
convert(varchar(10), cast( dbo.SIPARIS_ALT.TESTARIHI As Date), 103), dbo.CARIGEN.STA

";
       public static string  DropTableByName(string tableName) => $"DROP TABLE IF EXISTS dbo.[{tableName}] ;";
        public static string CreateTTdFixOrdersTable(string userName) => $@"CREATE TABLE [dbo].[TTFixOrders_{userName}](
	[Type] [nvarchar](255) NULL,
	[Order#] [nvarchar](255) NULL,
	[Edition#] [nvarchar](255) NULL,
	[Edition1#] [nvarchar](255) NULL,
	[PartNo] [nvarchar](255) NULL,
	[Location] [nvarchar](255) NULL,
	[RequireDate] [datetime] NULL,
	[RequireQTY] [int] NULL,
	[BomLevel] [int] NULL
) ";
        public static string CreateStokProductionTable(string userName) => $@"
CREATE TABLE [dbo].[StokProduction_{userName}](
	[STK] [nvarchar](50) NULL,
	[P_ID] [nvarchar](80) NULL,
	[Warehouse] [float] NULL,
	[TUR] [smallint] NULL,
	[Prod] [float] NULL,
	[PackToday] [int] NULL,
	[WOInprogress] [int] NULL
) 
";
        public static string SetUpTTfixOrdersAndGetData(string userName) => $@"
set DateFormat dmy;
insert into dbo.[TTFixOrders_{userName}] (PartNo,RequireDate,Location,RequireQTY,BomLevel)  SELECT dbo.SIPARIS_ALT.STK,
convert(varchar(10), cast( dbo.SIPARIS_ALT.TESTARIHI As Date), 103) as RequireDate,CARIGEN.STA,
 dbo.SIPARIS_ALT.MIKTAR -isnull( Sum(dbo.STOK_ALT.MIKTAR),0) as RemainQty,1
FROM ((dbo.SIPARIS_ALT LEFT JOIN dbo.STOK_ALT ON (dbo.SIPARIS_ALT.STOKP_ID = dbo.STOK_ALT.STOKP_ID) AND
 (dbo.SIPARIS_ALT.P_ID = dbo.STOK_ALT.SIP_PID)) LEFT JOIN dbo.SIPAR ON dbo.SIPARIS_ALT.P_ID = dbo.SIPAR.P_ID)
  LEFT JOIN dbo.CARIGEN ON dbo.SIPARIS_ALT.CARIREF = dbo.CARIGEN.REF
GROUP BY dbo.SIPARIS_ALT.STK, dbo.SIPARIS_ALT.MIKTAR,CARIGEN.REF,
convert(varchar(10), cast( dbo.SIPARIS_ALT.TESTARIHI As Date), 103), dbo.CARIGEN.STA
Having  dbo.SIPARIS_ALT.MIKTAR -isnull( Sum(dbo.STOK_ALT.MIKTAR),0)>0
";
        public static string CreateTTdFixOrdersList1Table(string userName) => $@"CREATE TABLE [dbo].[TTFixOrdersList1_{userName}](
	[Location] [nvarchar](255) NULL,
	[PartNo] [nvarchar](255) NULL,
	[RequireDate] [datetime] NULL,
	[RequireQTY] [int] NULL,
	[TotalStock] [float] NULL,
	[Balance] [int] NULL,
	[WOLot] [int] NULL,
	[WONewDate] [datetime] NULL,
	[LotQty] [int] NULL,
	[BomLevel] [int] NULL,
	[WOPlanned] [int] NULL
) ";

        public static string CreateTTdFixOrdersListTable(string userName) => $@"
CREATE TABLE [dbo].[TTFfixordersListe_{userName}](
	[Location] [nvarchar](255) NULL,
	[PartNo] [nvarchar](255) NULL,
	[RequireDate] [datetime] NULL,
	[RequireQTY] [int] NULL,
	[TotalStock] [float] NULL,
	[Balance] [int] NULL,
	[WOLot] [int] NULL,
	[WONewDate] [datetime] NULL,
	[WOLotSize] [int] NULL,
	[WoPlanned] [int] NULL
)

";

        public static string CreateTTdFixOrdersListWoTable(string userName) => $@"
CREATE TABLE [dbo].[TTFFixordersListeWO_{userName}](
	[PartNo] [nvarchar](255) NULL,
	[WOLot] [int] NULL,
	[WONewDate] [datetime] NULL,
	[Balance] [int] NULL,
	[Order_no] [int] NULL,
	[ProcessNo_ID] [int] NULL,
	[Qty] [int] NULL,
	[Process_qty] [int] NULL,
	[Ok_Qty] [int] NULL,
	[ProsessDay] [real] NULL,
	[Process_reject] [int] NULL,
	[Process_Rework] [int] NULL,
	[RemainProcessqty] [int] NULL,
	[ProcessDate] [datetime] NULL,
	[CompleteRatio] [real] NULL,
	[Process_Manhour] [int] NULL,
[id] [int] IDENTITY(1,1) NOT NULL
)";
        public static string GetAllTTFixorders(string userName) => $@"set dateformat dmy;SELECT TTFixOrders_{userName}.PartNo,
   convert(varchar(10), cast( dbo.TTFixOrders_{userName}.RequireDate As Date), 103) as RequireDate,
 Sum(TTFixOrders_{userName}.RequireQTY) AS RequireQTY,
        ( isnull(StokProduction_{userName}.Warehouse,0)+
			 IIf(dbo.STOKGEN.TUR=4,0,isnull(StokProduction_{userName}.[Prod],0))+
			 isnull(StokProduction_{userName}.PackToday,0) )
			 AS TotalStock, 
             0 AS Balance, dbo.STOKGEN.TUR FROM (TTFixOrders_{userName} LEFT JOIN StokProduction_{userName}
			  ON TTFixOrders_{userName}.PartNo = StokProduction_{userName}.STK) 
             LEFT JOIN dbo.STOKGEN ON StokProduction_{userName}.P_ID = dbo.STOKGEN.P_ID 
			 GROUP BY TTFixOrders_{userName}.PartNo,
              TTFixOrders_{userName}.RequireDate, isnull(StokProduction_{userName}.[Warehouse],0)
			  +IIf(dbo.STOKGEN.TUR=4,0,
              isnull(StokProduction_{userName}.Prod,0))+isnull(StokProduction_{userName}.PackToday,0),  dbo.STOKGEN.TUR
			   ORDER BY TTFixOrders_{userName}.PartNo, TTFixOrders_{userName}.RequireDate";
        public static string CreateMrpWeekLast(string userName) => $@"
CREATE TABLE [dbo].[MRPWEEKCALC_Last_{userName}](
	[STK] [nvarchar](50) NULL,
	[Week] [nvarchar](255) NULL,
	[TotalStock] [float] NULL,
	[ASSTOK] [float] NULL,
	[Usage] [float] NULL,
	[CalculatedStock] [float] NULL,
	[P_ID] [nvarchar](50) NULL
) 
";
        public static string UpdateTTFixOrdersList1(string userName, TTFfixordersListe1 m) => $@"
set dateformat dmy;insert into  TTFixOrdersList1_{userName} (TotalStock,Balance,WOPlanned,PartNo,RequireDate,BomLevel)
 values ({m.TotalStock},{m.Balance},{m.WOPlanned},'{m.PartNo}','{m.RequireDate}',{m.BomLevel})";


        public static string MarvelQurey(string userName) => $@"
INSERT INTO TTFixOrders_{userName} ( partNo, RequireDate, Requireqty, BomLevel )
SELECT dbo.TSTOKRECETESI.STK AS partNo, TTFixOrdersList1_{userName}.RequireDate, [Balance]*-1 AS Requireqty, 2
FROM TTFixOrdersList1_{userName} INNER JOIN (dbo.STOKGEN INNER JOIN dbo.TSTOKRECETESI ON dbo.STOKGEN.P_ID = dbo.TSTOKRECETESI.STOKP_ID)
ON TTFixOrdersList1_{userName}.PartNo = dbo.STOKGEN.STK
GROUP BY dbo.TSTOKRECETESI.STK, TTFixOrdersList1_{userName}.RequireDate, [Balance]*-1, TTFixOrdersList1_{userName}.BomLevel,
dbo.TSTOKRECETESI.STOKTUR
HAVING ((([Balance]*-1)>0) AND ((TTFixOrdersList1_{userName}.BomLevel)=1) AND ((dbo.TSTOKRECETESI.STOKTUR)=2 Or (dbo.TSTOKRECETESI.STOKTUR)=3))
ORDER BY dbo.TSTOKRECETESI.STK, TTFixOrdersList1_{userName}.RequireDate;

";
        public static string GetAllTTFixorders2(string userName) => $@"
SELECT TTFixOrders_{userName}.PartNo, TTFixOrders_{userName}.RequireDate, 
Sum(TTFixOrders_{userName}.RequireQTY) AS RequireQTY, isnull(StokProduction_{userName}.Warehouse,0)
+isnull(StokProduction_{userName}.[Prod],0)+isnull(StokProduction_{userName}.[PackToday],0) 
            AS TotalStock, 0 AS Balance, TTFixOrders_{userName}.BomLevel FROM TTFixOrders_{userName} LEFT JOIN StokProduction_{userName} ON 
			TTFixOrders_{userName}.PartNo = StokProduction_{userName}.STK GROUP BY TTFixOrders_{userName}.PartNo, TTFixOrders_{userName}.RequireDate, 
            isnull(StokProduction_{userName}.Warehouse,0)+isnull(StokProduction_{userName}.Prod,0)+isnull(StokProduction_{userName}.PackToday,0)
			, TTFixOrders_{userName}.BomLevel HAVING (((TTFixOrders_{userName}.BomLevel) = 2)) ORDER BY TTFixOrders_{userName}.PartNo, 
            TTFixOrders_{userName}.RequireDate;
";

        public static string GetAllFromTTFixOrdersTable(string userName) => $@"
select RequireQTY,PartNo,Location,  convert(varchar(10), cast( RequireDate As Date), 103) as RequireDate ,RequireQTY,BomLevel from TTFixOrders_{userName}
";


        public static string GetWoStatusLastOpen = @"SELECT dbo.Local_ProductionOrders.ProductOrderID,
 dbo.Local_ProductionOrders.PartNo_ID ,sum( dbo.Local_ProductionOrders.Qty)  as SumOfQty
FROM dbo.Local_ProductionOrders
WHERE (((dbo.Local_ProductionOrders.Status)=1)) and PartNo_ID is not null  and  PartNo_ID!=''
group by PartNo_ID, ProductOrderID,Qty";


        public static string GetwoStatuslastInprogress = @"
SELECT 
 dbo.Local_ProductionOrders.PartNo_ID,
  sum(IIf(([Qty]-isnull([Completed_Qty],0))<0,0,[Qty]-isnull([Completed_Qty],0))) AS WoInProgress
FROM dbo.Local_ProductionOrders
WHERE (((dbo.Local_ProductionOrders.Status)=2))
group by  
 dbo.Local_ProductionOrders.PartNo_ID";


        public static string GetTTfixOrdersOrderSummary(string userName) => $@"
set dateformat dmy;
DECLARE @cols AS nvarchar(max);
 DECLARE @query AS nvarchar(max);
  SELECT @cols = STUFF(( 
  SELECT    distinct    ',' + QUOTENAME( CAST(TTFixOrders_{userName}.RequireDate as date)) 
	 FROM TTFixOrders_{userName}   group by  TTFixOrders_{userName}.PartNo ,RequireDate
	  order by 1  desc   FOR xml PATH(''), TYPE ).value('.', 'NVARCHAR(MAX)'), 1, 1, '');
	  print @cols;
	  set @query = 'WITH Sales AS ( select TTF.PartNo,S.ASSTOK,  CAST(TTF.RequireDate as date) as RequireDate,Sum(TTF.RequireQTY) as SumOfRequireQTY from TTFixOrders_{userName} TTF
left join dbo.STOKGEN S on
TTF.PartNo = S.STK
group by TTF.PartNo,CAST(TTF.RequireDate as date),TTF.RequireQTY,S.ASSTOK
)  SELECT* FROM   Sales
               PIVOT(SUM(SumOfRequireQTY) FOR  RequireDate IN ('+ @cols+'
                  )) P '
		  EXECUTE sp_executesql @query;

";

        public static string deleteFrom(string userName)=>$"delete From {userName}";


        public static string CreateMrpWeekCalc(string userName) => $@"CREATE TABLE [dbo].[MRPWEEKCALC_{userName}](
	[STK] [nvarchar](50) NULL,
	[Week] [nvarchar](255) NULL,
	[TotalStock] [float] NULL,
	[ASSTOK] [float] NULL,
	[Usage] [float] NULL,
	[CalculatedStock] [float] NULL,
	[P_ID] [nvarchar](50) NULL
) ";

        public static string MrpMonthlyCalc1(string userName) => $@"
SET DateFormat dmy;
INSERT INTO MRPWEEKCALC_{userName} ( STK, P_ID, [Week], usage )
SELECT STOKGEN_1.STK, dbo.TSTOKRECETESI.GSTOKP_ID,
 TTFixOrdersList1_{userName}.RequireDate,
 dbo.TSTOKRECETESI.MIKTAR*TTFixOrdersList1_{userName}.WOPlanned AS [usage]
FROM dbo.STOKGEN AS STOKGEN_1 INNER JOIN (TTFixOrdersList1_{userName}
INNER JOIN (dbo.STOKGEN INNER JOIN dbo.TSTOKRECETESI 
ON dbo.STOKGEN.P_ID = dbo.TSTOKRECETESI.STOKP_ID) ON TTFixOrdersList1_{userName}.PartNo = dbo.STOKGEN.STK) 
ON STOKGEN_1.P_ID = dbo.TSTOKRECETESI.GSTOKP_ID
WHERE (((STOKGEN_1.TUR)=1 Or (STOKGEN_1.TUR)=4))
ORDER BY STOKGEN_1.STK;
";

        public static string MrpMonthlyCalc2(string userName) => $@"
SET DateFormat dmy;
INSERT INTO MRPWEEKCALC_{userName} ( STK, [Usage], week, P_ID )
select  SIPARIS_ALT.STK,sum ( SIPARIS_ALT.MIKTAR ) -  
ISNULL(STOK_ALT.totaInviloance,0) as RemainQty,
SIPARIS_ALT.TESTARIHI,
SIPARIS_ALT.STOKP_ID
from SIPARIS_ALT as SIPARIS_ALT
    left join 
     ( 
        select Sum(dbo.STOK_ALT.MIKTAR) totaInviloance,STOKP_ID
        from STOK_ALT  
        group by MIKTAR ,STOKP_ID
    ) STOK_ALT on SIPARIS_ALT.STOKP_ID = STOK_ALT.STOKP_ID
	group by totaInviloance,SIPARIS_ALT.TESTARIHI,SIPARIS_ALT.STK,SIPARIS_ALT.TUR,
	SIPARIS_ALT.STOKP_ID
	HAVING (((Sum(SIPARIS_ALT.MIKTAR- ISNULL(STOK_ALT.totaInviloance,0))))>0)
 AND ((SIPARIS_ALT.TUR)=91);
";
        public static string MrpMonthlyCalc3(string userName) => $@"
SET DateFormat dmy;
INSERT INTO MRPWEEKCALC_{userName} ( STK, [Usage], week, P_ID )
select  SIPARIS_ALT.STK,sum ( SIPARIS_ALT.MIKTAR ) -  
ISNULL(STOK_ALT.totaInviloance,0) as RemainQty,
SIPARIS_ALT.TESTARIHI,
SIPARIS_ALT.STOKP_ID
from SIPARIS_ALT as SIPARIS_ALT
    left join 
     ( 
        select Sum(dbo.STOK_ALT.MIKTAR) totaInviloance,STOKP_ID
        from STOK_ALT  
        group by MIKTAR ,STOKP_ID
    ) STOK_ALT on SIPARIS_ALT.STOKP_ID = STOK_ALT.STOKP_ID
	group by totaInviloance,SIPARIS_ALT.TESTARIHI,SIPARIS_ALT.STK,SIPARIS_ALT.TUR,
	SIPARIS_ALT.STOKP_ID
	HAVING (((Sum(SIPARIS_ALT.MIKTAR- ISNULL(STOK_ALT.totaInviloance,0))))>0)
 AND ((SIPARIS_ALT.TUR)=91) AND  SIPARIS_ALT.TESTARIHI>GETDATE()
";


        public static string MrpMonthlyCalc4_SafetStok(string userName)=>$@"SET DateFormat dmy;
INSERT INTO MRPWEEKCALC_{userName} ( STK, P_ID, week, [usage] )

SELECT dbo.STOKGEN.STK, dbo.STOKGEN.P_ID, 
 convert(varchar, getdate(), 103), dbo.STOKGEN.[ASSTOK]*-1 AS Expr1
FROM dbo.STOKGEN
WHERE (((dbo.STOKGEN.[ASSTOK]*-1)<0) 
AND ((dbo.STOKGEN.TUR)=1 Or (dbo.STOKGEN.TUR)=4))
ORDER BY dbo.STOKGEN.STK;";

     

        public static string MrpWeekCalcQuery(string userName) => $@"
--- MRPWEEKCALCQUERY
INSERT INTO MRPWEEKCALC_Last_{userName} ( STK, TotalStock, Week, ASSTOK, [Usage], P_ID )
SELECT dbo.STOKGEN.STK,
sum (isnull((dbo.STOK_ALT.GRMIK-dbo.STOK_ALT.CKMIK),0)) as totalStok
, MRPWEEKCALC_{userName}.Week, dbo.STOKGEN.ASSTOK,
 Sum(MRPWEEKCALC_{userName}.Usage) AS SumOfUsage, MRPWEEKCALC_{userName}.P_ID
FROM (MRPWEEKCALC_{userName} LEFT JOIN STOK_ALT
 ON MRPWEEKCALC_{userName}.STK = STOK_ALT.STK) 
LEFT JOIN dbo.STOKGEN ON MRPWEEKCALC_{userName}.STK = dbo.STOKGEN.STK
GROUP BY dbo.STOKGEN.STK, MRPWEEKCALC_{userName}.Week, dbo.STOKGEN.ASSTOK, 
MRPWEEKCALC_{userName}.P_ID
ORDER BY dbo.STOKGEN.STK, MRPWEEKCALC_{userName}.Week;
";


        public static string GetMrpWeekLast(string userName) => $@"select STK,Week,TotalStock,ASSTOK,Usage,CalculatedStock,P_ID from MRPWEEKCALC_Last_{userName}";

        public static string updateMrpWeekLast( string userName,double CalculatedStock, string stk) => $@"
update MRPWEEKCALC_Last_{userName} set CalculatedStock = {CalculatedStock} where STK='{stk}';

";

        public static string MRPWEEKCALC_Crosstab_month(string userName) => $@"
set dateformat dmy;
DECLARE @cols AS nvarchar(max);
 DECLARE @query AS nvarchar(max);
  SELECT @cols = STUFF(( 
  SELECT    distinct    ',' + QUOTENAME(CONCAT (MONTH(MRPWEEKCALC_Last_{userName}.[Week]) ,'-', year(MRPWEEKCALC_Last_{userName}.[Week])) ) 
	 FROM MRPWEEKCALC_Last_{userName}  
	  order by 1  asc   FOR xml PATH(''), TYPE ).value('.', 'NVARCHAR(MAX)'), 1, 1, '');
	  print @cols
	  set @query = 'WITH Sales AS 
( SELECT S.STK, S.STA, MrpCal.TotalStock, 
MrpCal.ASSTOK, DATEPART(WEEK, GETDATE())AS Currentweek, S.TUR,
 Sum(MrpCal.CalculatedStock) as SumOfCalculatedStock,
 CONCAT (MONTH(MrpCal.[Week]),''-'', year(MrpCal.[Week])) as weeks
FROM dbo.MRPWEEKCALC_Last_{userName} MrpCal  LEFT JOIN dbo.STOKGEN  S
  ON MrpCal.P_ID = S.P_ID
GROUP BY S.STK, S.STA, MrpCal.TotalStock, MrpCal.ASSTOK, 
S.TUR, MrpCal.[Week]) SELECT* FROM   Sales
               PIVOT(SUM(SumOfCalculatedStock) 
			   FOR weeks IN ('+ @cols+' )) P; '
		  EXECUTE sp_executesql @query;
";

        public static string CreateMrpWeekMinus(string userName) => $@"
CREATE TABLE [dbo].[MRPWEEKCALC_Minus_{userName}](
	[STK] [nvarchar](50) NULL,
	[STA] [nvarchar](50) NULL,
	[Week] [nvarchar](255) NULL,
	[TotalStock] [float] NULL,
	[ASSTOK] [float] NULL,
	[Currentweek] [float] NULL,
	[SumOfCalculatedStock] [float] NULL,
	[TUR] [float] NULL,
);
insert into MRPWEEKCALC_Minus_{userName} (STK,STA,TotalStock,ASSTOK,Week,Currentweek,TUR,SumOfCalculatedStock)
SELECT MRPWEEKCALC_Last_{userName}.STK, dbo.STOKGEN.STA, MRPWEEKCALC_Last_{userName}.TotalStock, MRPWEEKCALC_Last_{userName}.ASSTOK,
 MRPWEEKCALC_Last_{userName}.Week,DATEPART(WEEK, GETDATE())AS Currentweek, dbo.STOKGEN.TUR, Sum(MRPWEEKCALC_Last_{userName}.CalculatedStock) AS SumOfCalculatedStock
FROM MRPWEEKCALC_Last_{userName} LEFT JOIN dbo.STOKGEN ON MRPWEEKCALC_Last_{userName}.STK = dbo.STOKGEN.STK
GROUP BY MRPWEEKCALC_Last_{userName}.STK, dbo.STOKGEN.STA, MRPWEEKCALC_Last_{userName}.TotalStock,
 MRPWEEKCALC_Last_{userName}.ASSTOK, MRPWEEKCALC_Last_{userName}.Week, dbo.STOKGEN.TUR
HAVING (((Sum(MRPWEEKCALC_Last_{userName}.CalculatedStock))<0));
";



        public static string MRPWEEKCALC_Minus_Crosstab_month(string userName) => $@"
set dateformat dmy;
DECLARE @cols AS nvarchar(max);
 DECLARE @query AS nvarchar(max);
  SELECT @cols = STUFF(( 
  SELECT    distinct    ',' + QUOTENAME(CONCAT (MONTH(MRPWEEKCALC_Minus_{userName}.[Week]) ,'-', year(MRPWEEKCALC_Minus_{userName}.[Week]))) 
	 FROM MRPWEEKCALC_Minus_{userName}  
	  order by 1  desc   FOR xml PATH(''), TYPE ).value('.', 'NVARCHAR(MAX)'), 1, 1, '');
	  print @cols
	  set @query = 'WITH Sales AS 
( SELECT MRPWEEKCALC_Minus.STK, MRPWEEKCALC_Minus.STA,MRPWEEKCALC_Minus.SumOfCalculatedStock,
 MRPWEEKCALC_Minus.TUR, MRPWEEKCALC_Minus.ASSTOK, MRPWEEKCALC_Minus.Currentweek,
CONCAT (MONTH(MRPWEEKCALC_Minus.[Week]) ,''-'', year(MRPWEEKCALC_Minus.[Week])) as weeks
FROM MRPWEEKCALC_Minus_{userName} MRPWEEKCALC_Minus
GROUP BY MRPWEEKCALC_Minus.STK, MRPWEEKCALC_Minus.STA, MRPWEEKCALC_Minus.TUR, 
MRPWEEKCALC_Minus.ASSTOK, MRPWEEKCALC_Minus.Currentweek,MRPWEEKCALC_Minus.SumOfCalculatedStock,
 MRPWEEKCALC_Minus.Week
) SELECT* FROM   Sales
               PIVOT(SUM(SumOfCalculatedStock) 
			   FOR weeks IN ('+ @cols+' )) P; '
		  EXECUTE sp_executesql @query;
";

        public static string MRPWEEKCALC_Crosstab_week(string userName) => $@"
set dateformat dmy;
DECLARE @cols AS nvarchar(max);
 DECLARE @query AS nvarchar(max);
  SELECT @cols = STUFF(( 
  SELECT    distinct    ',' + QUOTENAME(CONCAT (DATEPART(wk,MRPWEEKCALC_Last_{userName}.[Week]) ,'-', year(MRPWEEKCALC_Last_{userName}.[Week])) ) 
	 FROM MRPWEEKCALC_Last_{userName}
	  order by 1  asc   FOR xml PATH(''), TYPE ).value('.', 'NVARCHAR(MAX)'), 1, 1, '');
	  print @cols
	  set @query = 'WITH Sales AS 
( SELECT S.STK, S.STA, MrpCal.TotalStock, 
MrpCal.ASSTOK, DATEPART(WEEK, GETDATE())AS Currentweek, S.TUR,
 Sum(MrpCal.CalculatedStock) as SumOfCalculatedStock,
 CONCAT (DATEPART(wk,MrpCal.[Week]) ,''-'', year(MrpCal.[Week])) as weeks
FROM dbo.MRPWEEKCALC_Last_{userName} MrpCal  LEFT JOIN dbo.STOKGEN  S
  ON MrpCal.P_ID = S.P_ID
GROUP BY S.STK, S.STA, MrpCal.TotalStock, MrpCal.ASSTOK, 
S.TUR, MrpCal.[Week]) SELECT* FROM   Sales
               PIVOT(SUM(SumOfCalculatedStock) 
			   FOR weeks IN ('+ @cols+' )) P; '
		  EXECUTE sp_executesql @query
";

        public static string MRPWEEKCALC_Minus_Crosstab_week(string userName) => $@"
set dateformat dmy;
DECLARE @cols AS nvarchar(max);
 DECLARE @query AS nvarchar(max);
  SELECT @cols = STUFF(( 
  SELECT    distinct    ',' + QUOTENAME( CONCAT (DATEPART(wk,MRPWEEKCALC_Minus_{userName}.[Week]) ,'-', year(MRPWEEKCALC_Minus_{userName}.[Week])) ) 
	 FROM MRPWEEKCALC_Minus_{userName} 
	  order by 1  desc   FOR xml PATH(''), TYPE ).value('.', 'NVARCHAR(MAX)'), 1, 1, '');
	  set @query = 'WITH Sales AS 
( SELECT MRPWEEKCALC_Minus.STK, MRPWEEKCALC_Minus.STA,MRPWEEKCALC_Minus.SumOfCalculatedStock,
 MRPWEEKCALC_Minus.TUR, MRPWEEKCALC_Minus.ASSTOK, MRPWEEKCALC_Minus.Currentweek,

CONCAT (DATEPART(wk,MRPWEEKCALC_Minus.[Week]) ,''-'', year(MRPWEEKCALC_Minus.[Week]))as weeks
FROM MRPWEEKCALC_Minus_{userName} MRPWEEKCALC_Minus
GROUP BY MRPWEEKCALC_Minus.STK, MRPWEEKCALC_Minus.STA, MRPWEEKCALC_Minus.TUR, 
MRPWEEKCALC_Minus.ASSTOK, MRPWEEKCALC_Minus.Currentweek,MRPWEEKCALC_Minus.SumOfCalculatedStock,
 MRPWEEKCALC_Minus.Week
) SELECT* FROM   Sales
               PIVOT(SUM(SumOfCalculatedStock) 
			   FOR weeks IN ('+ @cols+' )) P; '
		  EXECUTE sp_executesql @query;
";


        public static string GetNewWoListInPurchaseOrders(string userName,string currentyear) => $@"
SELECT TTFixOrdersList1_{userName}.PartNo, lastStatusInProgrss.WoInProgress,

CONCAT (DATEPART(wk,WONewDate) ,'-', year(WONewDate)) as WONewDate , TTFixOrdersList1_{userName}.WOPlanned, StokProduction_{userName}.Prod,
 isnull(lastStatusInProgrss.WoInProgress,0)-isnull([Prod],0) AS InProgress
FROM (TTFixOrdersList1_{userName} LEFT JOIN 
 (SELECT 
SAG_PRODUCTION.dbo.Local_ProductionOrders.PartNo_ID,SAG_HIDROLIK_{currentyear}T.dbo.STOKGEN.STK,
  sum(IIf(([Qty]-isnull([Completed_Qty],0))<0,0,[Qty]-isnull([Completed_Qty],0))) AS WoInProgress
FROM SAG_PRODUCTION.dbo.Local_ProductionOrders
left join SAG_HIDROLIK_{currentyear}T.dbo.STOKGEN 
on SAG_PRODUCTION.dbo.Local_ProductionOrders.PartNo_ID=SAG_HIDROLIK_{currentyear}T.dbo.STOKGEN.P_ID
WHERE (((SAG_PRODUCTION.dbo.Local_ProductionOrders.Status)=2))
group by  
 SAG_PRODUCTION.dbo.Local_ProductionOrders.PartNo_ID,SAG_HIDROLIK_{currentyear}T.dbo.STOKGEN.STK ) lastStatusInProgrss
 on TTFixOrdersList1_{userName}.PartNo= lastStatusInProgrss.STK
) LEFT JOIN StokProduction_{userName} ON TTFixOrdersList1_{userName}.PartNo = StokProduction_{userName}.STK
WHERE (((TTFixOrdersList1_{userName}.WOPlanned)<>0))
ORDER BY TTFixOrdersList1_{userName}.WONewDate
";

        public static string GetWoPlanListInPurchaseOrders(string userName,string currentYear) => $@"
set dateformat dmy;
DECLARE @cols AS nvarchar(max);
 DECLARE @query AS nvarchar(max);
  SELECT @cols = STUFF(( 
  SELECT    distinct    ',' + QUOTENAME( CONCAT (DATEPART(wk,TTFixOrdersList1_{userName}.WONewDate) ,'-',
   year(TTFixOrdersList1_{userName}.WONewDate)) ) 
	 FROM TTFixOrdersList1_{userName} 
	  order by 1  desc   FOR xml PATH(''), TYPE ).value('.', 'NVARCHAR(MAX)'), 1, 1, '');
	  set @query = '
with ss As
(
SELECT TTFixOrdersList1_{userName}.PartNo, lastStatusInProgrss.WoInProgress,
CONCAT (DATEPART(wk,WONewDate) ,''-'', year(WONewDate)) as WONewDate , 
TTFixOrdersList1_{userName}.WOPlanned, StokProduction_{userName}.Prod,
 isnull(lastStatusInProgrss.WoInProgress,0)-isnull([Prod],0) AS InProgress
FROM (TTFixOrdersList1_{userName} LEFT JOIN 
 (SELECT 
SAG_PRODUCTION.dbo.Local_ProductionOrders.PartNo_ID,SAG_HIDROLIK_{currentYear}T.dbo.STOKGEN.STK,
  sum(IIf(([Qty]-isnull([Completed_Qty],0))<0,0,[Qty]-isnull([Completed_Qty],0))) AS WoInProgress
FROM SAG_PRODUCTION.dbo.Local_ProductionOrders
left join SAG_HIDROLIK_{currentYear}T.dbo.STOKGEN 
on SAG_PRODUCTION.dbo.Local_ProductionOrders.PartNo_ID=SAG_HIDROLIK_{currentYear}T.dbo.STOKGEN.P_ID
WHERE (((SAG_PRODUCTION.dbo.Local_ProductionOrders.Status)=2))
group by  
 SAG_PRODUCTION.dbo.Local_ProductionOrders.PartNo_ID,SAG_HIDROLIK_{currentYear}T.dbo.STOKGEN.STK ) lastStatusInProgrss
 on TTFixOrdersList1_{userName}.PartNo= lastStatusInProgrss.STK
) LEFT JOIN StokProduction_{userName} ON TTFixOrdersList1_{userName}.PartNo = StokProduction_{userName}.STK
WHERE (((TTFixOrdersList1_{userName}.WOPlanned)<>0))
	 )select * from  ss
               PIVOT(SUM(WOPlanned) 
			   FOR WONewDate IN ('+ @cols+' )) P; '
		  EXECUTE sp_executesql @query;
";

        public static string PlaningMrp1(string userName) => $@"
SELECT TTFixOrdersList1_{userName}.PartNo, TTFixOrdersList1_{userName}.RequireDate, 
            Sum([TTFixOrdersList1_{userName}].[Balance]*-1) AS RequireQTY,
             isnull(StokProduction_{userName}.Warehouse,0)+isnull(StokProduction_{userName}.Prod,0)+
isnull(StokProduction_{userName}.[PackToday],0)
              AS TotalStock, 0 AS Balance FROM TTFixOrdersList1_{userName} LEFT 
JOIN StokProduction_{userName} ON TTFixOrdersList1_{userName}.PartNo =
			   StokProduction_{userName}.STK 
              GROUP BY TTFixOrdersList1_{userName}.PartNo, TTFixOrdersList1_{userName}.RequireDate, isnull(StokProduction_{userName}.[Warehouse],0)+
			  isnull(StokProduction_{userName}.[Prod],0)
              +isnull(StokProduction_{userName}.[PackToday],0) ORDER BY TTFixOrdersList1_{userName}.PartNo, TTFixOrdersList1_{userName}.RequireDate;
";


        public static string stokWarepackCoat(string userName) => $@"

--stok all

INSERT INTO StokProduction_{userName}( STK, P_ID, Warehouse, TUR, Prod, PackToday, WOInprogress )
select StokMerkez.STK ,StokMerkez.STOKP_ID,StokMerkez.totalStok,StokMerkez.TUR,
ProductionStatus_Planning.Miktar,lastStatusInProgrss.WoInProgress,StokPackToday.qty
from(
SELECT  dbo.STOK_ALT.STK,dbo.STOKGEN.TUR, STOK_ALT.STOKP_ID,
sum ( isnull((dbo.STOK_ALT.GRMIK-dbo.STOK_ALT.CKMIK),0)) as totalStok
 FROM dbo.STOK_ALT left JOIN dbo.STOKGEN ON dbo.STOK_ALT.STOKP_ID = dbo.STOKGEN.P_ID 
   GROUP BY STOK_ALT.STK, STOKGEN.TUR,STOK_ALT.STOKP_ID
   ) StokMerkez
 LEFT JOIN 
--production Status
(SELECT sum([Process_qty]-[Ok_Qty]-[Process_reject]-[Process_Rework]) AS Miktar, 
SAG_PRODUCTION.dbo.Local_ProductionOrders.PartNo_ID
FROM SAG_PRODUCTION.dbo.Local_ProductionOrders INNER JOIN SAG_PRODUCTION.dbo.ProcessFlow 
ON ProcessFlow.ProductOrder_ID = SAG_PRODUCTION.dbo.Local_ProductionOrders.ProductOrderID
 INNER JOIN SAG_PRODUCTION.dbo.Process_Planning ON ProcessFlow.ProcessNo_ID = Process_Planning.ProcessNo
WHERE ((([Process_qty]-[Ok_Qty]-[Process_reject]-[Process_Rework])>0) AND ((SAG_PRODUCTION.dbo.Local_ProductionOrders.Status)=2) 
AND ((Process_Planning.[Group])='06_Paketleme' 
Or (Process_Planning.[Group])='09_Kaplama' Or (Process_Planning.[Group])='06_test'))
Group by  PartNo_ID )ProductionStatus_Planning
on StokMerkez.STOKP_ID =ProductionStatus_Planning.PartNo_ID

left join

 -- stak pack today
( SELECT SAG_PRODUCTION.dbo.Local_ProductionOrders.PartNo_ID, Sum(ProcessFlowDetail.Ok_Qty) AS qty
FROM (SAG_PRODUCTION.dbo.ProcessFlowDetail INNER JOIN SAG_PRODUCTION.dbo.ProcessFlow ON ProcessFlowDetail.Flow_ID = ProcessFlow.Flow_ID)
 INNER JOIN SAG_PRODUCTION.dbo.Local_ProductionOrders ON ProcessFlow.ProductOrder_ID = SAG_PRODUCTION.dbo.Local_ProductionOrders.ProductOrderID
GROUP BY SAG_PRODUCTION.dbo.Local_ProductionOrders.PartNo_ID, ProcessFlow.ProcessNo_ID, Format([Finish_time],'Short Date')
HAVING (((ProcessFlow.ProcessNo_ID)=55) AND ((Format([Finish_time],'Short Date'))=Format(getDate(),'Short Date'))))StokPackToday
on StokPackToday.PartNo_ID= ProductionStatus_Planning.PartNo_ID

 LEFT JOIN 
-- status In Progress
 (SELECT 
SAG_PRODUCTION.dbo.Local_ProductionOrders.PartNo_ID,
  sum(IIf(([Qty]-isnull([Completed_Qty],0))<0,0,[Qty]-isnull([Completed_Qty],0))) AS WoInProgress
FROM SAG_PRODUCTION.dbo.Local_ProductionOrders
WHERE (((SAG_PRODUCTION.dbo.Local_ProductionOrders.Status)=2))
group by  
 SAG_PRODUCTION.dbo.Local_ProductionOrders.PartNo_ID ) lastStatusInProgrss
 on  lastStatusInProgrss.PartNo_ID=ProductionStatus_Planning.PartNo_ID

";

        public static string ProcessPlaningFlowDates(string userName) => $@"
INSERT INTO TTFFixordersListeWO_{userName} ( PartNo, WOLot, WONewDate, Balance,
 Order_no, ProcessNo_ID, Qty, Process_qty, Ok_Qty, ProsessDay, Process_reject, Process_Rework, RemainProcessqty, Process_Manhour )
SELECT TTFfixordersListe_{userName}.PartNo, TTFfixordersListe_{userName}.WOLot,
 TTFfixordersListe_{userName}.WONewDate, TTFfixordersListe_{userName}.Balance,
  SAG_PRODUCTION.dbo.ProcessFlow.Order_no,  SAG_PRODUCTION.dbo.ProcessFlow.ProcessNo_ID, 
   SAG_PRODUCTION.dbo.Local_ProductionOrders.Qty, 
  SAG_PRODUCTION.dbo.ProcessFlow.Process_qty, SAG_PRODUCTION.dbo.ProcessFlow.Ok_Qty,
   SAG_PRODUCTION.dbo.Process_Planning.ProsessDay,
   SAG_PRODUCTION.dbo.ProcessFlow.Process_reject, SAG_PRODUCTION.dbo.ProcessFlow.Process_Rework, 
   IIf((([Ok_Qty]+[Process_reject]+[Process_Rework])/[Qty])>=0.95,0,
   [Qty]-[Ok_Qty]-[Process_reject]-[Process_Rework])
    AS RemainProcessqty, SAG_PRODUCTION.dbo.Process_Planning.Manhour
FROM ((TTFfixordersListe_{userName} LEFT JOIN SAG_PRODUCTION.dbo.Local_ProductionOrders 
ON TTFfixordersListe_{userName}.WOLot = SAG_PRODUCTION.dbo.Local_ProductionOrders.ProductOrderID) 
LEFT JOIN SAG_PRODUCTION.dbo.ProcessFlow ON TTFfixordersListe_{userName}.WOLot = ProcessFlow.ProductOrder_ID) 
LEFT JOIN SAG_PRODUCTION.dbo.Process_Planning ON ProcessFlow.ProcessNo_ID = 
SAG_PRODUCTION.dbo.Process_Planning.ProcessNo
ORDER BY TTFfixordersListe_{userName}.WOLot, ProcessFlow.Order_no DESC;

";

        public static string ProcessplanLast(string userName) => $@"
INSERT INTO SAG_PRODUCTION.dbo.ProcessPlanFollowTable
 ( ProcessDate, [Group], ProsesAdi, PartNo, WOLot, RemainProcessqty, WONewDate, Balance, Order_no, ProcessNo_ID, Qty, Process_qty, Ok_Qty, Process_reject, Process_Rework,Complete )
SELECT TTFFixordersListeWO_{userName}.ProcessDate,
 SAG_PRODUCTION.dbo.Process_Planning.[Group],
 SAG_PRODUCTION.dbo.Process_Planning.ProsesAdi, 
 TTFFixordersListeWO_{userName}.PartNo, TTFFixordersListeWO_{userName}.WOLot, TTFFixordersListeWO_{userName}.RemainProcessqty, 
 TTFFixordersListeWO_{userName}.WONewDate, TTFFixordersListeWO_{userName}.Balance,
  TTFFixordersListeWO_{userName}.Order_no, TTFFixordersListeWO_{userName}.ProcessNo_ID, 
  TTFFixordersListeWO_{userName}.Qty, TTFFixordersListeWO_{userName}.Process_qty,
   TTFFixordersListeWO_{userName}.Ok_Qty, TTFFixordersListeWO_{userName}.Process_reject, 
   TTFFixordersListeWO_{userName}.Process_Rework,0
FROM TTFFixordersListeWO_{userName} LEFT JOIN SAG_PRODUCTION.dbo.Process_Planning 
ON TTFFixordersListeWO_{userName}.ProcessNo_ID = SAG_PRODUCTION.dbo.Process_Planning .ProcessNo
WHERE (((TTFFixordersListeWO_{userName}.RemainProcessqty)>0))
ORDER BY TTFFixordersListeWO_{userName}.ProcessDate, SAG_PRODUCTION.dbo.Process_Planning.[Group],
 TTFFixordersListeWO_{userName}.PartNo;

";
        #endregion

    }
}
