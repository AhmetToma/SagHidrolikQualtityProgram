
using SagHidrolik.Models.SqlRepository;
using SagHidrolik.Models.ViewModesl;
using System.Collections.Generic;
using System.Data.SqlClient;
using Dapper;
using System.Threading.Tasks;
using System;
using SagHidrolik.DataAccesslayer.Stok;
using System.Linq;
using System.Collections;
using SagHidrolik.Models;
using SagHidrolik.ViewModels;

namespace SagHidrolik.DataAccesslayer.OrdersManagement
{
    public class PurchaseOrderMangement
    {

        #region Drop Create Table
        public static async Task<string> DropTableByName(string TableName)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                await connection.ExecuteAsync(SqlQueryRepo.DropTableByName(TableName));
            }
            return "done";
        }
        public static async void CreateTableByName(string userName, int type)
        {
            string query = "";
            if (type == 1) query = SqlQueryRepo.CreateTTdFixOrdersList1Table(userName);
            if (type == 2) query = SqlQueryRepo.CreateTTdFixOrdersTable(userName);
            if (type == 3) query = SqlQueryRepo.CreateStokProductionTable(userName);
            if (type == 4) query = SqlQueryRepo.CreateMrpWeekLast(userName);
            if (type == 5) query = SqlQueryRepo.CreateMrpWeekCalc(userName);
            if (type == 6) query = SqlQueryRepo.CreateTTdFixOrdersListTable(userName);
            if (type == 7) query = SqlQueryRepo.CreateTTdFixOrdersListWoTable(userName);
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                await connection.ExecuteAsync(query);
            }
        }
        public static async Task<string> DropAllTable(string userName)
        {
            var m = await DropTableByName($"StokProduction_{userName}");
            var m1 = await DropTableByName($"TTFixOrders_{userName}");
            var m2 = await DropTableByName($"TTFixOrdersList1_{userName}");
            var m3 = await DropTableByName($"MRPWEEKCALC_Last_{userName}");
            var m4 = await DropTableByName($"MRPWEEKCALC_{userName}");
            if (m == "done" && m1 == "done" && m2 == "done" && m4 == "done") return "done";
            return "not completed";
        }

        public static void CreateAllTable(string userName)
        {
            for (int i = 1; i <= 7; i++)
            {
                CreateTableByName(userName, i);
            }
        }

        #endregion

        public static async Task<IEnumerable<PurchaseOrdersViewModel>> GetAllPurchaseOrders()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<PurchaseOrdersViewModel>(SqlQueryRepo.GetAllPurchaseOrders);
                return list;
            }
        }

        public static async Task<IEnumerable<TTfixOrdersModel>> GetAllFromTTFixOrdersTable(string userName)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();

                var list = await connection.QueryAsync<TTfixOrdersModel>(SqlQueryRepo.GetAllFromTTFixOrdersTable(userName));
                return list;


            }
        }
        public static async Task<string> SetUpTTfixOrdersTable(string userName)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.SetUpTTfixOrdersAndGetData(userName));
                if (count > 0) return "done";
                return "not completed";
            }
        }

        #region Mrp
        public static async Task<string> RunMrp(string userName, int lotSize)

        {
            IEnumerable<TTfixOrders_StokProduction> tfixOrders_StokProductions;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync($@"delete from StokProduction_{userName};
DELETE  FROM TTFixOrders_{userName} WHERE (((TTFixOrders_{userName}.BomLevel)=2));
DELETE  FROM TTFixOrdersList1_{userName};
");
            }
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                tfixOrders_StokProductions = await connection.QueryAsync<TTfixOrders_StokProduction>(SqlQueryRepo.GetAllTTFixorders(userName));
            }

            int stokSay = 0;
            long woRemain = 0;
            string partNo = "";

            TTFfixordersListe1 List1_model = new TTFfixordersListe1();
            if (tfixOrders_StokProductions.AsList().Count > 0)
                foreach (var item in tfixOrders_StokProductions)
                {
                    if (partNo != item.PartNo)
                    {
                        stokSay = item.TotalStock;
                        woRemain = 0;
                    }
                    if (stokSay - item.RequireQTY > 0)
                    {
                        List1_model.TotalStock = stokSay;
                        stokSay = stokSay - item.RequireQTY;
                        List1_model.Balance = 0;
                        List1_model.WOPlanned = 0;
                        List1_model.WONewDate = item.RequireDate;
                        List1_model.PartNo = item.PartNo;
                        List1_model.RequireQTY = item.RequireQTY;
                        List1_model.BomLevel = 1;
                        using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
                        {
                            await connection.OpenAsync();
                            var res = await connection.ExecuteAsync(SqlQueryRepo.UpdateTTFixOrdersList1(userName, List1_model));
                        }
                    }
                    else
                    {
                        List1_model.TotalStock = stokSay;
                        stokSay = stokSay = item.RequireQTY;
                        List1_model.Balance = stokSay;
                        if ((woRemain + stokSay) < 0)
                        {

                            // var num = Convert.ToDecimal((-(woRemain + stokSay) / lotSize) * lotSize);
                            List1_model.WOPlanned = Convert.ToInt16(Math.Ceiling(Convert.ToDecimal((-(woRemain + stokSay) / lotSize) * lotSize)));
                            woRemain = Convert.ToInt16(Math.Ceiling(Convert.ToDecimal((-(woRemain + stokSay) / lotSize) * lotSize + woRemain)));

                        }
                        else
                        {
                            List1_model.WOPlanned = 0;
                        }
                        woRemain = woRemain + stokSay;
                        stokSay = 0;
                        List1_model.WONewDate = item.RequireDate;
                        List1_model.PartNo = item.PartNo;
                        List1_model.RequireDate = item.RequireDate;
                        List1_model.RequireQTY = item.RequireQTY;
                        List1_model.BomLevel = 1;
                        using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
                        {
                            await connection.OpenAsync();
                            var res = await connection.ExecuteAsync(SqlQueryRepo.UpdateTTFixOrdersList1(userName, List1_model));
                        }
                    }
                    partNo = item.PartNo;
                }

            // marvel query
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                int enteredToTTFixOrdersCount = await connection.ExecuteAsync(SqlQueryRepo.MarvelQurey(userName));
            }

            // TTfixOrders
            IEnumerable<TTfixOrders_StokProduction> TTfixOrders_StokProductionList;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                TTfixOrders_StokProductionList = await connection.QueryAsync<TTfixOrders_StokProduction>(SqlQueryRepo.GetAllTTFixorders2(userName));
            }

            TTFfixordersListe1 List1_model_2 = new TTFfixordersListe1();


            stokSay = 0;
            partNo = "";
            if (TTfixOrders_StokProductionList.AsList().Count > 0)
            {
                foreach (var item in TTfixOrders_StokProductionList)
                {
                    if (partNo != item.PartNo)
                    {
                        stokSay = item.TotalStock;
                        woRemain = 0;
                    }
                    if ((stokSay - item.RequireQTY) >= 0)
                    {
                        List1_model_2.TotalStock = stokSay;
                        stokSay = stokSay - item.RequireQTY;
                        List1_model_2.Balance = 0;
                        List1_model_2.WOPlanned = 0;

                        List1_model_2.WONewDate = DateTime.Parse(item.RequireDate).AddDays(-10).ToString();
                        List1_model_2.PartNo = item.PartNo;
                        List1_model_2.RequireDate = DateTime.Parse(item.RequireDate).AddDays(-10).ToString();
                        List1_model_2.RequireQTY = item.RequireQTY;
                        List1_model_2.BomLevel = 2;
                        using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
                        {
                            await connection.OpenAsync();
                            var res = await connection.ExecuteAsync(SqlQueryRepo.UpdateTTFixOrdersList1(userName, List1_model_2));
                        }
                    }
                    else
                    {
                        List1_model_2.TotalStock = stokSay;
                        stokSay = stokSay - item.RequireQTY;
                        List1_model_2.Balance = stokSay;
                        if ((woRemain + stokSay) <= 0)
                        {
                            List1_model_2.WOPlanned = Convert.ToInt16(Math.Ceiling(Convert.ToDecimal((-(woRemain + stokSay) / lotSize) * lotSize)));
                            woRemain = Convert.ToInt16(Math.Ceiling(Convert.ToDecimal((-(woRemain + stokSay) / lotSize) * lotSize + woRemain)));
                        }
                        else List1_model_2.WOPlanned = 0;

                        woRemain = woRemain + stokSay;
                        stokSay = 0;
                        List1_model_2.WONewDate = DateTime.Parse(item.RequireDate).AddDays(-10).ToString();
                        List1_model_2.PartNo = item.PartNo;
                        List1_model_2.RequireDate = item.RequireDate;
                        List1_model_2.RequireQTY = item.RequireQTY;
                        List1_model_2.BomLevel = 2;
                        using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
                        {
                            await connection.OpenAsync();
                            var res = await connection.ExecuteAsync(SqlQueryRepo.UpdateTTFixOrdersList1(userName, List1_model_2));
                        }
                    }
                    partNo = item.PartNo;
                }
            }

            return "done";
        }

        #endregion


        #region part Order Summary

        // woStatusLastOpen
        public static async Task<IEnumerable<WoStatusLastOpenViewModel>> GetWoStatusLastOpen()
        {

            RequestQuery r = new RequestQuery()
            {
                Stk = ""
            };
            var stkList = StokReadingData.GetStokkenByStkList(r).Result;
            IEnumerable<WoStatusLastOpenViewModel> woLastOpenList;
            List<WoStatusLastOpenViewModel> newList = new List<WoStatusLastOpenViewModel>();
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                woLastOpenList = await connection.QueryAsync<WoStatusLastOpenViewModel>(SqlQueryRepo.GetWoStatusLastOpen);
            }
            if (woLastOpenList.AsList().Count > 0)
            {
                foreach (var item in woLastOpenList)
                {
                    var dboStokgen = stkList.Where(x => x.P_ID == item.PartNo_ID).SingleOrDefault();
                    if (dboStokgen != null)
                        item.PartNo_ID = dboStokgen.Stk;
                    newList.Add(item);
                }
            }
            return newList;
        }

        // WoStatuslastInprogress
        public static async Task<IEnumerable<WoStatuslastInprogressViewModel>> GetWoStatuslastInprogress()
        {

            RequestQuery r = new RequestQuery()
            {
                Stk = ""
            };
            var stkList = StokReadingData.GetStokkenByStkList(r).Result;
            IEnumerable<WoStatuslastInprogressViewModel> woLastOpenList;
            List<WoStatuslastInprogressViewModel> newList = new List<WoStatuslastInprogressViewModel>();
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                woLastOpenList = await connection.QueryAsync<WoStatuslastInprogressViewModel>(SqlQueryRepo.GetwoStatuslastInprogress);
            }
            if (woLastOpenList.AsList().Count > 0)
            {
                foreach (var item in woLastOpenList)
                {
                    var dboStokgen = stkList.Where(x => x.P_ID == item.PartNo_ID).FirstOrDefault();
                    if (dboStokgen != null)
                    {
                        item.PartNo_ID = dboStokgen.Stk;
                        newList.Add(item);
                    }

                }
            }
            return newList;
        }

        public static async Task<IEnumerable<object>> GetTTfixOrdersOrderSummary(string userName)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<object>(SqlQueryRepo.GetTTfixOrdersOrderSummary(userName));
                return list;
            }

        }


        #endregion




        #region  Monthly
        public static async Task<IEnumerable<object>> GetMonthlyMaterialUsage(WeeklyMonthlyFilterModel m, string userName)
        {

            IEnumerable<MrpWeekLastModel> mrpWeekLastList;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                await connection.ExecuteAsync(SqlQueryRepo.deleteFrom($"MRPWEEKCALC_Last_{userName}"));
                await connection.ExecuteAsync(SqlQueryRepo.deleteFrom($" MRPWEEKCALC_{userName}"));
            }

            // Mrp MonthlyCalc1
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                await connection.ExecuteAsync(SqlQueryRepo.MrpMonthlyCalc1(userName));
            }
            // Mrp MonthlyCalc2
            if (m.bakcOrders == "Yes")
                using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
                {
                    await connection.OpenAsync();
                    await connection.ExecuteAsync(SqlQueryRepo.MrpMonthlyCalc2(userName));
                }

            // Mrp MonthlyCalc3
            if (m.bakcOrders == "No")
                using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
                {
                    await connection.OpenAsync();
                    await connection.ExecuteAsync(SqlQueryRepo.MrpMonthlyCalc3(userName));
                }

            // Mrp MonthlyCalc4 Safty Stok
            if (m.safetyStok == "Yes")
                using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
                {
                    await connection.OpenAsync();
                    await connection.ExecuteAsync(SqlQueryRepo.MrpMonthlyCalc4_SafetStok(userName));
                }


            // Mrp Week Calc Query
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                await connection.ExecuteAsync(SqlQueryRepo.MrpWeekCalcQuery(userName));
            }


            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                mrpWeekLastList = await connection.QueryAsync<MrpWeekLastModel>(SqlQueryRepo.GetMrpWeekLast(userName));
            }
            string partNo = "";
            double StokSay = 0, stokyeni = 0;

            if (mrpWeekLastList.Count() > 0)
            {
                foreach (var item in mrpWeekLastList)
                {
                    partNo = item.STK;
                    StokSay = item.TotalStock;
                    if (partNo != item.STK)
                    {
                        partNo = item.STK;
                        StokSay = item.TotalStock;
                        stokyeni = item.Usage + StokSay;
                        item.CalculatedStock = stokyeni;


                    }
                    else
                    {
                        stokyeni = item.Usage + stokyeni;
                        item.CalculatedStock = stokyeni;
                    }
                    try
                    {
                        using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
                        {
                            await connection.OpenAsync();
                            await connection.ExecuteAsync(SqlQueryRepo.updateMrpWeekLast(userName, item.CalculatedStock, item.STK));
                        }

                    }
                    catch (Exception e)
                    {

                        throw e;
                    }


                }

                if (m.onlyMissing == "No")
                {
                    using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
                    {
                        await connection.OpenAsync();
                        var list = await connection.QueryAsync<object>(SqlQueryRepo.MRPWEEKCALC_Crosstab_month(userName));

                        return list;
                    }
                }
                else
                {
                    await DropTableByName($"MRPWEEKCALC_Minus_{userName}");
                    using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
                    {
                        await connection.OpenAsync();
                        await connection.ExecuteAsync(SqlQueryRepo.CreateMrpWeekMinus(userName));
                    }

                    using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
                    {
                        await connection.OpenAsync();
                        var list = await connection.QueryAsync<object>(SqlQueryRepo.MRPWEEKCALC_Minus_Crosstab_month(userName));
                        return list;
                    }
                }
            }
            else
            {
                return new List<object>();
            }
        }

        #endregion


        #region  Weekly
        public static async Task<IEnumerable<Object>> GetWeeklyMaterialUsage(WeeklyMonthlyFilterModel m, string userName)
        {
            IEnumerable<MrpWeekLastModel> mrpWeekLastList;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                await connection.ExecuteAsync(SqlQueryRepo.deleteFrom($"MRPWEEKCALC_Last_{userName}"));
                await connection.ExecuteAsync(SqlQueryRepo.deleteFrom($" MRPWEEKCALC_{userName}"));
            }

            // Mrp MonthlyCalc1
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                await connection.ExecuteAsync(SqlQueryRepo.MrpMonthlyCalc1(userName));
            }
            // Mrp MonthlyCalc2
            if (m.bakcOrders == "yes")
                using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
                {
                    await connection.OpenAsync();
                    await connection.ExecuteAsync(SqlQueryRepo.MrpMonthlyCalc2(userName));
                }

            // Mrp MonthlyCalc3
            if (m.bakcOrders == "no")
                using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
                {
                    await connection.OpenAsync();
                    await connection.ExecuteAsync(SqlQueryRepo.MrpMonthlyCalc3(userName));
                }


            // Mrp Week Calc Query
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                await connection.ExecuteAsync(SqlQueryRepo.MrpWeekCalcQuery(userName));
            }


            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                mrpWeekLastList = await connection.QueryAsync<MrpWeekLastModel>(SqlQueryRepo.GetMrpWeekLast(userName));
            }
            string partNo = "";
            double StokSay = 0, stokyeni = 0;

            if (mrpWeekLastList.Count() > 0)
            {
                foreach (var item in mrpWeekLastList)
                {
                    partNo = item.STK;
                    StokSay = item.TotalStock;
                    if (partNo != item.STK)
                    {
                        partNo = item.STK;
                        StokSay = item.TotalStock;
                        stokyeni = item.Usage + StokSay;
                        item.CalculatedStock = stokyeni;
                    }
                    else
                    {
                        stokyeni = item.Usage + stokyeni;
                        item.CalculatedStock = stokyeni;
                    }
                    using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
                    {
                        await connection.OpenAsync();
                        await connection.ExecuteAsync(SqlQueryRepo.updateMrpWeekLast(userName, item.CalculatedStock, item.STK));
                    }

                }

                if (m.onlyMissing == "no")
                {
                    using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
                    {
                        await connection.OpenAsync();
                        var list = await connection.QueryAsync<object>(SqlQueryRepo.MRPWEEKCALC_Crosstab_week(userName));

                        return list;
                    }
                }
                else
                {
                    await DropTableByName($"MRPWEEKCALC_Minus_{userName}");
                    using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
                    {
                        await connection.OpenAsync();
                        await connection.ExecuteAsync(SqlQueryRepo.CreateMrpWeekMinus(userName));
                    }
                    using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
                    {
                        await connection.OpenAsync();
                        var list = await connection.QueryAsync<object>(SqlQueryRepo.MRPWEEKCALC_Minus_Crosstab_week(userName));
                        return list;
                    }
                }
            }
            else
            {
                return new List<object>();
            }
        }
        #endregion

        #region Stok Ware pack

        public static async Task<string> StokWarePack(string TableName)
        {
            IEnumerable<StokAllViewModel> stokAllViewModels;
            IEnumerable<WoStatuslastInprogressViewModel> woStatusLastInProgress;
            RequestQuery r = new RequestQuery()
            {
                Stk = "",
                pageNumber = 0,
                pageSize = 50000000
            };
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                stokAllViewModels = await connection.QueryAsync<StokAllViewModel>(SqlQueryRepo.GetStokAll(r));
            }
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                woStatusLastInProgress = await connection.QueryAsync<WoStatuslastInprogressViewModel>(SqlQueryRepo.GetwoStatuslastInprogress);
            }
            return "done";
        }

        #endregion

        #region New Wo - Wo Plan



        public static async Task<object> newWoTest()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<object>(@"
SELECT TTFfixordersListe1.PartNo, lastStatusInProgrss.WoInProgress,
WONewDate AS WODate, TTFfixordersListe1.WOPlanned, STOK_Production.Prod,
 isnull(lastStatusInProgrss.WoInProgress,0)-isnull([Prod],0) AS InProgress
FROM (TTFfixordersListe1 LEFT JOIN 
 (SELECT 
SAG_PRODUCTION.dbo.Local_ProductionOrders.PartNo_ID,SAG_HIDROLIK_2019T.dbo.STOKGEN.STK,
  sum(IIf(([Qty]-isnull([Completed_Qty],0))<0,0,[Qty]-isnull([Completed_Qty],0))) AS WoInProgress
FROM SAG_PRODUCTION.dbo.Local_ProductionOrders
left join SAG_HIDROLIK_2019T.dbo.STOKGEN 
on SAG_PRODUCTION.dbo.Local_ProductionOrders.PartNo_ID=SAG_HIDROLIK_2019T.dbo.STOKGEN.P_ID
WHERE (((SAG_PRODUCTION.dbo.Local_ProductionOrders.Status)=2))
group by  
 SAG_PRODUCTION.dbo.Local_ProductionOrders.PartNo_ID,SAG_HIDROLIK_2019T.dbo.STOKGEN.STK ) lastStatusInProgrss
 on TTFfixordersListe1.PartNo= lastStatusInProgrss.STK
) LEFT JOIN STOK_Production ON TTFfixordersListe1.PartNo = STOK_Production.STK
WHERE (((TTFfixordersListe1.WOPlanned)<>0))
ORDER BY TTFfixordersListe1.PartNo
");
                return list;
            }
        }
        public static async Task<object> GetNewWoListInPurchaseOrders(string userName)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<object>(SqlQueryRepo.GetNewWoListInPurchaseOrders(userName,WorkingWithYears.currentYear));
                return list;
            }
        }
        public static async Task<object> GetWoPlanListInPurchaseOrders(string userName)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<object>(SqlQueryRepo.GetWoPlanListInPurchaseOrders(userName, WorkingWithYears.currentYear));
                return list;
            }
        }
        #endregion



        #region Planing Mrp 
        public static async Task<string> PalningMrp(string userName)
        {
            IEnumerable<TTFfixordersListe1> TTFfixordersListe1;
            IEnumerable<TTfixOrdersModel> TTfixOrdersList;
            IEnumerable<DboLocalProductionOrders_Stogken> local_stokgen=null;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                await connection.ExecuteAsync(SqlQueryRepo.deleteFrom($"StokProduction_{userName}"));
            }
            // stokWare Pack Coat

            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                int z = await connection.ExecuteAsync(SqlQueryRepo.stokWarepackCoat(userName));
            }

            string partNo = "";
            double stoksay = 0;
            double remain =0;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                TTFfixordersListe1 = await connection.QueryAsync<TTFfixordersListe1>(SqlQueryRepo.PlaningMrp1(userName));
            }

            if(TTFfixordersListe1.Count()>0)
            {
                using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
                {
                    await connection.OpenAsync();
                    await connection.ExecuteAsync(SqlQueryRepo.deleteFrom($"TTFixOrders_{userName}"));
                    TTfixOrdersList= await connection.QueryAsync<TTfixOrdersModel>(SqlQueryRepo.deleteFrom($"TTFixOrders_{userName}"));
                }

                foreach (var item in TTFfixordersListe1)
                {
                    if(partNo !=item.PartNo)
                    {
                        using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
                        {
                            await connection.OpenAsync();
                            local_stokgen = await connection.QueryAsync<DboLocalProductionOrders_Stogken>($@"
SELECT SAG_PRODUCTION.dbo.Local_ProductionOrders.ProductOrderID, 
                            dbo.STOKGEN.STK, 

convert(varchar(10), cast(SAG_PRODUCTION.dbo.Local_ProductionOrders.IssueDate As Date), 103) as IssueDate,
SAG_PRODUCTION.dbo.Local_ProductionOrders.Status,
                             IIf((SAG_PRODUCTION.dbo.Local_ProductionOrders.Qty-isnull(SAG_PRODUCTION.dbo.Local_ProductionOrders.Completed_Qty,0))<0,0,
                             SAG_PRODUCTION.dbo.Local_ProductionOrders.Qty-isnull(SAG_PRODUCTION.dbo.Local_ProductionOrders.Completed_Qty,0)) AS remainQty
                              FROM dbo.STOKGEN INNER JOIN SAG_PRODUCTION.dbo.Local_ProductionOrders 
							  ON dbo.STOKGEN.P_ID = SAG_PRODUCTION.dbo.Local_ProductionOrders.PartNo_ID
                               WHERE (((dbo.STOKGEN.STK) = '{item.PartNo}') And ((SAG_PRODUCTION.dbo.Local_ProductionOrders.Status) = 2))ORDER BY
                                dbo.STOKGEN.STK, SAG_PRODUCTION.dbo.Local_ProductionOrders.IssueDate;
");
                        }

                        if (local_stokgen.Count() > 0)
                        {
                            stoksay = 0;
                        }
                    }

                    if(stoksay-item.RequireQTY>=0)
                    {
                        var balnace = remain-item.RequireQTY;
                        using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
                        {
                            await connection.OpenAsync();
                            int c = await connection.ExecuteAsync($@"
insert into TTFfixordersListe_superAdmin (TotalStock,WONewDate,Balance,
PartNo,RequireDate,RequireQTY) values
({stoksay},'{item.RequireDate}',,'{item.PartNo}','{item.RequireDate}',{remain})
");
                            stoksay = stoksay - item.RequireQTY;
                            remain = stoksay;
                           
                        }
                    }
                    else
                    {
                        if(local_stokgen.Count()>0)
                        {

                            foreach (var lo in local_stokgen)
                            {
                                TTFixOrdersListModel m = new TTFixOrdersListModel();
                                stoksay = stoksay + lo.remainQty;
                                m.WOLotSize = lo.remainQty;
                                m.TotalStock = stoksay;
                                remain = stoksay - item.RequireQTY;
                                stoksay = stoksay - item.RequireQTY;
                                m.WOLot = lo.remainQty;
                                m.WONewDate = item.RequireDate;
                                m.WOLot =lo.ProductOrderID;
                                m.Balance = Convert.ToInt16(stoksay);
                                m.PartNo = item.PartNo;
                                m.RequireDate = item.RequireDate;
                                m.RequireQTY = item.RequireQTY;
                                using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
                                {
                                    await connection.OpenAsync();
                                    int c = await connection.ExecuteAsync($@"
insert into TTFfixordersListe_superAdmin (WOLotSize,TotalStock,WOLot,WONewDate,
Balance,PartNo,RequireDate,RequireQTY) values
({m.WOLotSize},{m.TotalStock},{m.WOLot},'{m.WONewDate}',{m.Balance},{m.PartNo},{m.RequireDate},{m.RequireQTY})
");
                                }
                                if (stoksay < 0)
                                {
                                    stoksay = stoksay + lo.remainQty;
                                    m.WOLotSize = lo.remainQty;
                                    m.TotalStock = stoksay;
                                    m.WOLot = lo.ProductOrderID;
                                    m.WONewDate = m.RequireDate;
                                    m.Balance = Convert.ToInt16(stoksay);
                                    m.PartNo = item.PartNo;
                                    m.RequireDate = item.RequireDate;
                                    m.RequireQTY = Convert.ToInt16(remain);
                                    using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
                                    {
                                        await connection.OpenAsync();
                                        int c = await connection.ExecuteAsync($@"
insert into TTFfixordersListe_superAdmin (WOLotSize,TotalStock,WOLot,WONewDate,
Balance,PartNo,RequireDate,RequireQTY) values
({m.WOLotSize},{m.TotalStock},{m.WOLot},'{m.WONewDate}',{m.Balance},{m.PartNo},{m.RequireDate},{m.RequireQTY})
");
                                    }
                                }
                                if (stoksay + lo.remainQty < 0)
                                {
                                    stoksay = stoksay + lo.remainQty;
                                    m.WOLotSize = lo.remainQty;
                                    m.TotalStock = stoksay;
                                    m.WOLot = lo.ProductOrderID;
                                    m.WONewDate = m.RequireDate;
                                    m.Balance = Convert.ToInt16(stoksay - remain);
                                    m.PartNo = item.PartNo;
                                    m.RequireDate = item.RequireDate;
                                    m.RequireQTY = Convert.ToInt16(remain);
                                }
                                using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
                                {
                                    await connection.OpenAsync();
                                    int c = await connection.ExecuteAsync($@"
insert into TTFfixordersListe_superAdmin (WOLotSize,TotalStock,WOLot,WONewDate,
Balance,PartNo,RequireDate,RequireQTY) values
({m.WOLotSize},{m.TotalStock},{m.WOLot},'{m.WONewDate}',{m.Balance},{m.PartNo},{m.RequireDate},{m.RequireQTY})
");
                                }
                                m.TotalStock = stoksay;
                                    m.WONewDate = item.RequireDate;
                                    m.Balance =  Convert.ToInt16(remain - item.RequireQTY);
                                    m.PartNo = item.PartNo;
                                    m.RequireDate = item.RequireDate;
                                    m.RequireQTY = m.RequireQTY;
                                    remain = remain - item.RequireQTY;
                                if (stoksay - item.RequireQTY < 0) stoksay = 0;


   using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
                                {
                                    await connection.OpenAsync();
                                    int c = await connection.ExecuteAsync($@"
insert into TTFfixordersListe_superAdmin (WOLotSize,TotalStock,WOLot,WONewDate,
Balance,PartNo,RequireDate,RequireQTY) values
({m.WOLotSize},{m.TotalStock},{m.WOLot},'{m.WONewDate}',{m.Balance},{m.PartNo},{m.RequireDate},{m.RequireQTY})
");
                                }

                            }



                        }
                        partNo = item.PartNo;
                    }
                    return "done";
                }
            }

            return "none";
           
        }
        #endregion


        #region Process Data

        public static async Task<string> ProcessDates(string userName)
        {

            IEnumerable<TTFFixordersListeWOModel> list = null;
            int lotNo = 0;
            double k =0;
            string ProcessDate = "";
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                await connection.ExecuteAsync(SqlQueryRepo.deleteFrom($"StokProduction_{userName}"));
                await connection.ExecuteAsync(SqlQueryRepo.deleteFrom($"ProcessPlanFollowTable"));
            }

            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                int z = await connection.ExecuteAsync(SqlQueryRepo.ProcessPlaningFlowDates(userName));
            }

            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                list =  await connection.QueryAsync<TTFFixordersListeWOModel>($"select * from TTFFixordersListeWO_{userName}");
            }

            foreach (var item in list)
            {
                item.Qty = Convert.ToInt16(item.Qty);
                item.Process_Manhour = Convert.ToInt16(item.Process_Manhour);
                item.ProsessDay = Convert.ToInt16(item.ProsessDay);

                if (lotNo!=item.WOLot)
                {
                    k = -(item.Process_Manhour / 3600 * (item.Qty / 8));
                    ProcessDate= DateTime.Parse(item.WONewDate).AddDays(item.ProsessDay - k).ToString();

                }
                else
                {
                    DateTime newDate = new DateTime();
                  string ConvertedDate =  newDate.ToString("dd-MM-yyyy");
                    k = -(item.Process_Manhour / 3600 * (item.Qty / 8));
                    ProcessDate= DateTime.Parse(ConvertedDate).AddDays(item.ProsessDay - k).ToString();
                }
                item.ProcessDate = ProcessDate;

                using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
                {
                    await connection.OpenAsync();

                    int c = await connection.ExecuteAsync($@"

UPDATE [dbo].[TTFFixordersListeWO_{userName}]
   SET [PartNo] = {item.PartNo},[WOLot] = {item.WOLot}   ,[WONewDate] ='{item.WONewDate}'  ,[Balance] = {item.Balance} ,[Order_no] = {item.Order_no}
      ,[ProcessNo_ID] = {item.ProcessNo_ID} ,[Qty] = {item.Qty} ,[Process_qty] = {item.Process_qty} ,
[Ok_Qty] = {item.Ok_Qty} ,[ProsessDay] = {item.ProsessDay} ,[Process_reject] = {item.Process_reject} ,[Process_Rework] = {item.Process_Rework}
      ,[RemainProcessqty] = {item.RemainProcessqty},[ProcessDate] = {item.ProcessDate} ,[CompleteRatio] = {item.CompleteRatio},[Process_Manhour] = {item.Process_Manhour}
 WHERE id={item.id}
");
                }

                lotNo = item.WOLot;


            }

      
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                int z = await connection.ExecuteAsync(SqlQueryRepo.ProcessplanLast(userName));
            }

            return "none";
        }
            #endregion


        }
}
