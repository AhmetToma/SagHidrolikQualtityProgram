using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using System.Data.SqlClient;
using SagHidrolik.Models.ViewModesl;
using SagHidrolik.Models.SqlRepository;

namespace SagHidrolik.DataAccesslayer.Bakim
{
     public static  class AllBakimRecordsData
    {

        public static async Task<IEnumerable<object>> GetAllBakimRecords(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<object>(SqlQueryRepo.GetAllBakimRecords(requestQuery));
                return list;
            }
        }

        public static async Task<int> GetAllBakimRecordsCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                int count = await connection.ExecuteScalarAsync<int>(SqlQueryRepo.GetAllBakimRecordsCount);
                return count;
            }
        }

        public static async Task<string> DeleteFromTbleBakimKayit(int bakimId)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                int c = await connection.ExecuteAsync(SqlQueryRepo.DeleteFromTbleBakimKayit(bakimId));
                if (c > 0) return "done";
                return "none";
            }
        }
    }
}
