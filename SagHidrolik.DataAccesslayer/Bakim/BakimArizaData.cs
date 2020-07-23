using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using System.Data.SqlClient;
using SagHidrolik.Models.ViewModesl;
using SagHidrolik.Models.SqlRepository;

namespace SagHidrolik.DataAccessLayer.SagHidrolik.DataAccesslayer.Bakim
{
    public static class BakimArizaData
    {
        public static async Task<IEnumerable<MachineViewModel>> GetAllMachine(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<MachineViewModel>(SqlQueryRepo.GetAllMachine(requestQuery));
                return list;
            }
        }
        public static async Task<int> GetAllMachineCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                int count = await connection.ExecuteScalarAsync<int>(SqlQueryRepo.GetAllMachineCount);
                return count;
            }
        }
        public static  async Task  insertIntoBakimKayit(BakimArizaModel bakimArizaModel)
        {
      
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var x = connection.Execute(SqlQueryRepo.insertIntoBakimKayit(bakimArizaModel));
            }
        }
        public static async Task<IEnumerable<BakimArizaGecmisTaleplerModel>> GetAllGecmisTalepler(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<BakimArizaGecmisTaleplerModel>(SqlQueryRepo.GetAllGecmisTalepler(requestQuery));
                return list;
            }
        }
    }
}
