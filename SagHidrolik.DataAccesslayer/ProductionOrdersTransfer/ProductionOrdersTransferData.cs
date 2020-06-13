using System.Collections.Generic;
using Dapper;
using System.Threading.Tasks;
using System.Linq;
using System.Data.SqlClient;
using SagHidrolik.Models.SqlRepository;
using SagHidrolik.DataAccesslayer.Stok;
using SagHidrolik.Models.ViewModesl;

namespace SagHidrolik.DataAccessLayer.ProductionOrdersTransfer
{
    public class ProductionOrdersTransferData
    {
        public static async Task<IEnumerable<ProductionOrdersTransferModel>> GetProductionOrdersTransfer(RequestQuery requestQuery)
        {
            var stkList = StokReadingData.GetStokkenByStkList(requestQuery).Result;
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            List<ProductionOrdersTransferModel> newList = new List<ProductionOrdersTransferModel>();

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
                    var list = await connection.QueryAsync<ProductionOrdersTransferModel>(SqlQueryRepo.GetProductionOrdersTransfer(requestQuery, values));
                    foreach (var item in list)
                    {
                        var dboStokgen = stkList.Where(x => x.P_ID == item.PartNo).SingleOrDefault();
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


        public static async Task<int> GetprocutionOrdersTranferCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.QueryFirstAsync<int>(SqlQueryRepo.GetprocutionOrdersTranferCount());
                return count;
            }
        }

        public static async Task<string> DeleteFromTranferWo(string partNo)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.DeleteFromTranferWo(partNo));
                string message = "Successfuly has been deleted !";
                return message;
            }
        }

        public static async Task<string> DeleteAllTranferWo()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.DeleteAllTranferWo());
                string message = "Successfuly has been deleted !";
                return message;
            }
        }
        public static async Task<string> TrnasferToSystem()
        {
            string message = "";
            RequestQuery requestQuery = new RequestQuery()
            {
                pageSize = 200000000,
                pageNumber = 1
            };
            var TranferList = GetProductionOrdersTransfer(requestQuery).Result;
            if (TranferList.Count() <= 0) message = "there is no record to transfer";
            else
            {
                string values = "";
                IEnumerable<DboStokgen> sotkgenList;
                foreach (var item in TranferList)
                {
                    values = values + "'" + item.PartNo + "'" + ",";
                }
                values = values.Substring(0, values.Length - 1); 
                using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
                {
                    await connection.OpenAsync();
                    var list = await connection.QueryAsync<DboStokgen>(SqlQueryRepo.CheckTransferInStokgen(values));
                    sotkgenList = list;
                }

                List<ProductionOrdersTransferModel> matchedList = new List<ProductionOrdersTransferModel>();
                foreach (var item in sotkgenList)
                {

                    var matchedModel = TranferList.Where(x => x.PartNo == item.P_ID).FirstOrDefault();
                    if (matchedModel != null) matchedList.Add(matchedModel);
                }
                using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
                {
                    await connection.OpenAsync();
                    foreach (var item in matchedList)
                    {
                        int newLotNot = connection.QuerySingle<int>(SqlQueryRepo.Transfer_InsertIntoProductionOrders_getlotNo(item));
                        if (newLotNot != 0)
                        {
                            var q = connection.ExecuteAsync(SqlQueryRepo.InsertTamirIsEmri_productionOrders_setLotNo(newLotNot));
                            var a = connection.ExecuteAsync($"update dbo.ProductionOrders_Transfer set [Control]='OK' where PartNo='{item.PartNo}'") ;
                        }
                    }
                    var z = connection.ExecuteAsync($"delete from ProductionOrders_Transfer where [Control]='Ok'");
                }
                message = "Successfuly trnasferd and cleared.Remaining data's have problems!";
            }
            return message;
        }
    }
}
