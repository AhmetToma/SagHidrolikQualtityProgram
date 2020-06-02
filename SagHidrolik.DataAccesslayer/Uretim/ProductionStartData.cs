using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Dapper;
using System.Linq;
using SagHidrolik.Models.ViewModesl;
using SagHidrolik.DataAccesslayer.Stok;
using SagHidrolik.Models.SqlRepository;

namespace SagHidrolik.DataAccesslayer.Uretim
{
    public static class ProductionStartData
    {

        public static async Task<IEnumerable<ProductionStatusViewModel>> GetAllProductionStatus(RequestQuery requestQuery)
        {
            var stkList = StokReadingData.GetStokkenByStkList(requestQuery).Result;
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            List<ProductionStatusViewModel> newList = new List<ProductionStatusViewModel>();

            if (stkList.Count() <= 0) return newList;
            else
            {
                string values = "";
                foreach (var item in stkList)
                {
                    values = values + "'" + item.P_ID + "'" + ",";
                }
                values = values.Substring(0, values.Length - 1);
                using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
                {
                    await connection.OpenAsync();
                    var list = await connection.QueryAsync<ProductionStatusViewModel>(SqlQueryRepo.GetAllProductionStatus(values, requestQuery));
                    foreach (var item in list)
                    {
                        var dboStokgen = stkList.Where(x => x.P_ID == item.PartNo_ID).SingleOrDefault();
                        if (dboStokgen != null)
                        {
                            item.Stk = dboStokgen.Stk;
                            newList.Add(item);
                        }
                    }
                    return newList;
                }
            }
        }

        public static async void DeleteproductionStatus(int sheetId)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<ProductionStatusViewModel>(SqlQueryRepo.DeleteproductionStatus(sheetId));
            }
        }


        public static async Task<string> AddToProductionStatus(string inputDate, int productId, int Qty)
        {
            string message = "";
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                var prodcutionStatusList = await connection.QueryAsync<int>($"select * from ProductionStatusTemp where ProductionSheet={productId}");
                if (prodcutionStatusList.Count() >= 1)
                {
                    message = "Tabloya eklenmiş iş emri !";
                    return message;
                }
                else
                {
                    var bomList = await connection.QueryAsync<BomProcess>($"SELECT  dbo.Local_ProductionOrders.ProductOrderID, BOM_Process.OrderNo,BOM_Process.SubPartNo FROM dbo.Local_ProductionOrders INNER JOIN BOM_Process " +
                        $"ON dbo.Local_ProductionOrders.PartNo_ID = BOM_Process.PartNo_ID WHERE(((dbo.Local_ProductionOrders.ProductOrderID) = {productId}))ORDER BY BOM_Process.OrderNo; ");
                    if (bomList.Count() <= 0) message = "there is no order No!";
                    else
                    {
                        var orderNo = bomList.ElementAt(0).OrderNo;
                        var result = await connection.QueryAsync<int>(SqlQueryRepo.AddToProductionStatus(inputDate, productId, orderNo, Qty));
                        message = "successfully added!";
                    }
                    return message;
                }
            }
        }
        public static  async Task<string> TransferToSystem(int productId)
        {
            string message = "";
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var response1 = await connection.ExecuteScalarAsync<int>(SqlQueryRepo.UpdateRevisedDateInLocalProductionOrders(productId));
                var response2 = await connection.ExecuteScalarAsync<int>(SqlQueryRepo.InsertIntoProcessFlowInProductionStart(productId));
                int x = 5;
                message = "Successfuly Done!";
            }
            return message;
        }
    }
}
