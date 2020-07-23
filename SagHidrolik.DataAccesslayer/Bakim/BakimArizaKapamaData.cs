using SagHidrolik.Models.SqlRepository;
using SagHidrolik.Models.ViewModesl;
using System.Collections.Generic;
using System.Data.SqlClient;
using Dapper;
using System.Threading.Tasks;

namespace SagHidrolik.DataAccesslayer.Bakim
{
   public static class BakimArizaKapamaData
    {
        public static async Task<IEnumerable<object>> GetAllBakimArizaKapama(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<object>(SqlQueryRepo.GetAllBakimArizaKapama(requestQuery));
                return list;
            }
        }
        public static async Task<string> KapatBakimAriza(KapatBakimArizaModel m)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                int c = await connection.ExecuteAsync(SqlQueryRepo.KapatBakimArizaModel(m));
                if (c > 0) return "done";
                return "none";
            }
        }
    }
}
