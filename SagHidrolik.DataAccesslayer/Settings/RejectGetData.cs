using SagHidrolik.Models.SqlRepository;
using SagHidrolik.Models.ViewModesl;
using System.Collections.Generic;
using Dapper;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace SagHidrolik.DataAccesslayer.Settings
{
   public static class RejectGetData
    {

        public static async Task<IEnumerable<RejectViewModel>> GetSettingsReject(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                string xxx = SqlQueryRepo.GetProcessNew(requestQuery);
                var list = await connection.QueryAsync<RejectViewModel>(SqlQueryRepo.GetSettingsReject(requestQuery));
                return list;
            }
        }
        public static async Task<int> GetSettingsRejectCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.QueryFirstAsync<int>(SqlQueryRepo.GetSettingsRejectCount());
                return count;
            }
        }

        public static async Task<int> AddSettingsReject(RejectViewModel r)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.AddSettingsReject(r));
                return count;
            }
        }
        public static async Task<int> DeleteSettingsReject(int rejectId)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.DeleteSettingsReject(rejectId));
                return count;
            }
        }
        public static async Task<int> EditSettingsReject(RejectViewModel r)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.EditSettingsReject(r));
                return count;
            }
        }
        
    }
}
