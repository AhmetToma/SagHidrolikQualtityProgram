using SagHidrolik.Models.ViewModesl;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using System.Data.SqlClient;
using SagHidrolik.Models.SqlRepository;

namespace SagHidrolik.DataAccesslayer.Bakim
{
    public static class BakimOzetiData
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
        public static async Task<IEnumerable<object>> GetBakimKayitByMakineID(int MakineId)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<object>(SqlQueryRepo.GetBakimKayitByMakineID(MakineId));
                return list;
            }
        }

    }
}
