
using SagHidrolik.Models.SqlRepository;
using SagHidrolik.Models.ViewModesl;
using System.Collections.Generic;
using System.Data.SqlClient;
using Dapper;
using System.Threading.Tasks;
using System;

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
            if (m == "done" && m1 == "done" && m2 == "done") return "done";
            return "not completed";
        }

        public static void CreateAllTable(string userName)
        {
            for (int i = 1; i <= 3; i++)
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

        public static async Task<string> RunMrp(string userName,int lotSize)

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

            int stokSay=0;
            long woRemain=0;

            TTFfixordersListe1 List1_model = new TTFfixordersListe1();
            if (tfixOrders_StokProductions.AsList().Count>0)
            foreach (var item in tfixOrders_StokProductions)
            {
                    if (item.PartNo == "")
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
                           var res=await connection.ExecuteAsync(SqlQueryRepo.UpdateTTFixOrdersList1(userName, List1_model));
                        }
                    }
                    else
                    {
                        List1_model.TotalStock = stokSay;
                        stokSay = stokSay = item.RequireQTY;
                        List1_model.Balance = stokSay;
                        if((woRemain+stokSay) <0)
                        {

                            var num = Convert.ToDecimal((-(woRemain + stokSay) / lotSize) * lotSize);
                            List1_model.WOPlanned = Convert.ToInt16(Math.Ceiling(Convert.ToDecimal((-(woRemain + stokSay) / lotSize) * lotSize)));
                            woRemain = Convert.ToInt16(Math.Ceiling(Convert.ToDecimal((-(woRemain + stokSay) / lotSize) * lotSize+woRemain)));

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

                }


            // marvel query
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                int enteredToTTFixOrdersCount = await connection.ExecuteAsync(SqlQueryRepo.MarvelQurey(userName));
            }

            // TTfixOrders
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                int enteredToTTFixOrdersCount = await connection.ExecuteAsync(SqlQueryRepo.GetAllTTFixorders2(userName));
            }
            return "";
        }

    }
}
