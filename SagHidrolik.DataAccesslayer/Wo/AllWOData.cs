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
        public static bool IsDateTime(string txtDate)
        {
            DateTime tempDate;
            return DateTime.TryParse(txtDate, out tempDate);
        }
            public static async Task<IEnumerable<DboLocalProductionOrders>> GetAllProductionOrders(RequestQuery requestQuery)
        {
            var stkList = StokReadingData.GetStokkenByStkList(requestQuery).Result;
            var productFiles = StokReadingData.GetAllProductFile().Result;
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            List<DboLocalProductionOrders> newList = new List<DboLocalProductionOrders>();

            if (stkList.Count() <= 0) return newList;
            else
            {
                
                using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
                {
                    await connection.OpenAsync();
                    var list = await connection.QueryAsync<DboLocalProductionOrders>(SqlQueryRepo.GetAllProductionOrders(requestQuery));
                    foreach (var item in list)
                    {
                        var dboStokgen = stkList.Where(x => x.P_ID == item.PartNo_ID).SingleOrDefault();
                        var matchedFile = productFiles.Where(x => x.P_ID == item.PartNo_ID).FirstOrDefault();
                        if (dboStokgen != null || matchedFile!=null)
                        {
                            if (dboStokgen != null)
                            {
                                item.Stk = dboStokgen.Stk;
                            }
                            if (matchedFile != null)
                            {
                                item.DosyaUrl = matchedFile.DOSYAADI;
                            }

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
                var productId = connection.QuerySingle<int>(SqlQueryRepo.AddNewWorkOrder(product));
                var x = connection.Execute(SqlQueryRepo.InsertTamirIsEmri_productionOrders_setLotNo(productId));
                var model = connection.QueryFirstAsync<DboLocalProductionOrders>(SqlQueryRepo.GetprocutionOrderByProductId(productId)).Result;
                return model;
            }
        }
        public static async Task<IEnumerable<TrnasferWoToSystemViewModel>> TrnasferWoToSystem(List<TrnasferWoToSystemViewModel> excelList)
        {
            IEnumerable<DboStokgen> sotkgenList;
            List<TrnasferWoToSystemViewModel> AcceptedList = new List<TrnasferWoToSystemViewModel>();
            List<TrnasferWoToSystemViewModel> AddedList = new List<TrnasferWoToSystemViewModel>();
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<DboStokgen>(SqlQueryRepo.CheckTransferInStokgen());
                sotkgenList = list;
            }
            List<TrnasferWoToSystemViewModel> matchedList = new List<TrnasferWoToSystemViewModel>();
            foreach (var item in excelList)
            {
                var mathcedModel = sotkgenList.Where(x => x.Stk == item.stk).FirstOrDefault();
                if (mathcedModel != null && item.qty > 0 && item.issueDate != ""&& IsDateTime(item.issueDate) && IsDateTime(item.requireDate))
                {
                    int x = 5;
                    AcceptedList.Add(item);
                }
            }
            if (AcceptedList.Count > 0)
            {
                using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
                {
                    await connection.OpenAsync();
                    foreach (var item in AcceptedList)
                    {
                        int newLotNot = connection.QuerySingle<int>(SqlQueryRepo.Transfer_InsertIntoProductionOrders_getlotNo(item));
                        if (newLotNot != 0)
                        {
                            AddedList.Add(item);
                        }
                    }
                }
            }
            return AddedList;


        }


        public static async Task<IEnumerable<BomProcessViewModel>> GetBomProcessForPrint(string partNoId)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<BomProcessViewModel>(SqlQueryRepo.GetBomProcessForPrint(partNoId));
                return list;
            }
        }
        public static async Task<IEnumerable<DboTstokrecetesi>> GetTStokReceteForPrint(string stk)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<DboTstokrecetesi>(SqlQueryRepo.GetTStokReceteForPrint(stk));
                return list;
            }
        }
    }

 }


