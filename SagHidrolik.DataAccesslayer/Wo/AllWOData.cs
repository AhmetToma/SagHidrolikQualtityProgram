using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Linq;
using SagHidrolik.Models.ViewModesl;
using SagHidrolik.DataAccesslayer.Stok;
using SagHidrolik.Models.SqlRepository;

namespace SagHidrolik.DataAccesslayer.Wo
{
    public static class AllWOData
    {
        public static async Task<IEnumerable<DboLocalProductionOrders>> GetAllProductionOrders(RequestQuery requestQuery)
        {
            var stkList = StokReadingData.GetStokkenByStkList(requestQuery).Result;
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            List<DboLocalProductionOrders> newList = new List<DboLocalProductionOrders>();

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
                    var list = await connection.QueryAsync<DboLocalProductionOrders>(SqlQueryRepo.GetAllProductionOrders(values, requestQuery));
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
        public static async Task<int> GetprocutionOrdersCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.QueryFirstAsync<int>(SqlQueryRepo.GetprocutionOrdersCount());
                return count;
            }
        }
        public static async Task<string> DeleteWo(int[] arr)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {

                string values = "";
                foreach (var item in arr)
                {
                    values = values + "'" + item + "'" + ",";
                }
                values = values.Substring(0, values.Length - 1);
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.DeleteWo(values));
                string messag = "Successfully Deleted Proccess Done!";
                return messag;
            }
        }
        public static async Task<DboLocalProductionOrders> AddNewWorkOrder(ProductOrderViewModel product)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var productId =  connection.QuerySingle<int>(SqlQueryRepo.AddNewWorkOrder(product));
                var x = connection.Execute(SqlQueryRepo.InsertTamirIsEmri_productionOrders_setLotNo(productId));
                var model = connection.QueryFirstAsync<DboLocalProductionOrders>(SqlQueryRepo.GetprocutionOrderByProductId(productId)).Result;
                return model;
            }
        }

        public static async Task<IEnumerable<DboLocalProductionOrders>> GetAllProductionOrdersPrintOut(RequestQuery requestQuery)
        {
            var stkList = StokReadingData.GetStokkenByStkList(requestQuery).Result;
            var DosyaList = StokReadingData.GetAllProductFile().Result;
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            List<DboLocalProductionOrders> newList = new List<DboLocalProductionOrders>();
            if (stkList.Count() <= 0) return newList;
            else
            {
             
               
                using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
                {
                    await connection.OpenAsync();
                    var list = await connection.QueryAsync<DboLocalProductionOrders>(SqlQueryRepo.GetAllProductionOrdersPrintOut(requestQuery));
              foreach (var item in list)
                    {
                        var dboStokgen = stkList.Where(x => x.P_ID == item.PartNo_ID).FirstOrDefault();
                        var dosya= DosyaList.Where(x => x.P_ID == item.PartNo_ID).FirstOrDefault();

                        if(dosya !=null || dosya!=null)
                        {
                            if (dboStokgen != null)
                            {
                                item.Stk = dboStokgen.Stk;
                            }
                            if (dosya != null)
                            {
                                item.DosyaUrl = dosya.DOSYAADI;
                            }
                        }
                        newList.Add(item);
                    }
                    return newList;
                }
            }
        }


        public static async Task<string> AddToProductionOrdersPrintOut(int[] arr)
        {
            string message;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                var productOrderIdArray = await connection.QueryAsync<int>(" select ProductOrderID from ProductionOrdersPrintout");
                List<int> finalArray=new List<int>();
                for (int i = 0; i < arr.Length; i++)
                {
                    var match = productOrderIdArray.Where(x => x == arr[i]);
                    int xxx = match.Count();
                    if (match.Count() <= 0)
                    {
                        finalArray.Add(arr[i]);
                    }

                }
               
                if (finalArray.Count <= 0) message = "already in PrintOut Table";
                else
                {
                    string values = "";
                    foreach (var item in finalArray)
                    {
                        values = values + "'" + item + "'" + ",";
                    }
                    values = values.Substring(0, values.Length - 1);
                    await connection.OpenAsync();
                    var count = await connection.ExecuteAsync(SqlQueryRepo.AddToProductionOrdersPrintOut(values));
                    message = "Successfully Added to Production Oriders PrintOut";
                }
                return message;
            }
                      
               
        }


        public static async Task<string> DeleteFromPrintOut(int productId)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.DeleteFromPrintOut(productId));
                string messag = "Successfully Deleted Proccess Done!";
                return messag;
            }
        }

        public static async Task<string> DeleteAllPrintOut()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.DeleteAllPrintOut);
                string messag = "Successfully Deleted Proccess Done!";
                return messag;
            }
        }



        
    }
}
