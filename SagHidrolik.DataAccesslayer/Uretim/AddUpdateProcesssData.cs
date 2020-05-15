using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using System.Data.SqlClient;
using SagHidrolik.Models.ViewModesl;
using SagHidrolik.DataAccesslayer.Stok;
using SagHidrolik.Models.SqlRepository;

namespace ErpSagHidrolik.DataAccessLayer.AddUpadateprocess
{
    public static class AddUpdateProcesssData
    {
        public static async Task<IEnumerable<BomProcessViewModel>> GetAllBomProcessInAddOrUpdateProcess(RequestQuery requestQuery)
        {
            var stokModel = StokReadingData.GetDboStokgenPIdByStk(requestQuery.Stk).Result;
            requestQuery.pid = stokModel.P_ID;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<BomProcessViewModel>(SqlQueryRepo.GetAllBomProcessInAddOrUpdateProcess(requestQuery));
                return list;
            }
        }

        public static async Task<IEnumerable<BomProcessViewModel>> GetBomProcessTemp(RequestQuery requestQuery)
        {
            var stokModel = StokReadingData.GetDboStokgenPIdByStk(requestQuery.Stk).Result;
            requestQuery.pid = stokModel.P_ID;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<BomProcessViewModel>(SqlQueryRepo.GetBomProcessTemp(requestQuery));
                return list;
            }
        }
        public static async Task<IEnumerable<BomProcessViewModel>> CopyToBomProcessTemp(string pId)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<BomProcessViewModel>(SqlQueryRepo.CopyToBomProcessTemp(pId));
                return list;
            }
        }

        public static async Task<IEnumerable<BomProcessViewModel>> DeleteFromBomProcessTemp(string pId)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<BomProcessViewModel>(SqlQueryRepo.DeleteFromBomProcessTemp(pId));
                return list;
            }
        }

        public static async Task<string> addUpdateProceecSave(RequestQuery requestQuery)
        {
            var message = "";
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var orderNo = connection.QueryAsync<OrderNoViewModel>(SqlQueryRepo.CheckOrderNo).Result.AsList<OrderNoViewModel>();
                var SubPartNo = connection.QueryAsync<SubPartNoViewModel>(SqlQueryRepo.CheckSubPartNo).Result.AsList<SubPartNoViewModel>();
                var BomProccessTemp = connection.QueryAsync<BomProcessViewModel>(SqlQueryRepo.GetBomProcessTemp(requestQuery)).Result.AsList<BomProcessViewModel>();
                if (orderNo.Count>0) message = "Mistake in OrderNo!";
                else if (SubPartNo.Count>0) message = "Mistake in Process!";
                else
                {
                    var bomProcessTempCount = BomProccessTemp.Count;

                    if (bomProcessTempCount > 0) connection.Execute(SqlQueryRepo.DeleteFromBomProcess(requestQuery.pid));
                    int nextProcess = 0;

                    foreach (var item in BomProccessTemp)
                    {
                        BomProcessViewModel b = new BomProcessViewModel()
                        {
                            PartNo_ID = item.PartNo_ID,
                            SubPartNo = item.SubPartNo,
                            SubPartNoNext = nextProcess,
                            OrderNo = bomProcessTempCount,
                            Qty = item.Qty,
                            Quality = item.Quality
                        };
                     var x =   connection.Execute(SqlQueryRepo.InsertIntoBomProcess(b));
                        bomProcessTempCount = bomProcessTempCount - 1;
                    }

                   await DeleteFromBomProcessTemp(requestQuery.pid);
                    message = "işlem başarıyla tamamlandı";
                    }
                    return message;
                }
            }
        }
    }

