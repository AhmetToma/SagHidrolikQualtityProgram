using SagHidrolik.Models.ViewModesl;
using System;
using System.Collections.Generic;
using Dapper;
using SagHidrolik.Models.SqlRepository;
using System.Data.SqlClient;
using System.Threading.Tasks;
namespace SagHidrolik.DataAccesslayer.Bakim
{
   public static class BakimSorumlulariData
    {
        public static async Task<IEnumerable<BakimSorumluModel>> GetAllBakimSorumlulari(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<BakimSorumluModel>(SqlQueryRepo.GetAllBakimSorumlulari(requestQuery));
                return list;
            }
        }

        public static async Task<int> GetAllBakimSorumlulariCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                int count = await connection.ExecuteScalarAsync<int>(SqlQueryRepo.GetAllBakimSorumlulariCount);
                return count;
            }
        }

        public static async Task<string> AddBakimSorumlu(BakimSorumluModel m)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                int c = await connection.ExecuteAsync(SqlQueryRepo.AddBakimSorumlu(m));
                if (c > 0) return "done";
                return "none";
            }
        }
        public static async Task<string> DeleteBakimSorumlu(int sorumluId)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                int c = await connection.ExecuteAsync(SqlQueryRepo.DeleteBakimSorumlu(sorumluId));
                if (c > 0) return "done";
                return "none";
            }
        }
        public static async Task<string> EditBakimSorumlu(BakimSorumluModel m)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                int c = await connection.ExecuteAsync(SqlQueryRepo.EditBakimSorumlu(m));
                if (c > 0) return "done";
                return "none";
            }
        }
    }
}
