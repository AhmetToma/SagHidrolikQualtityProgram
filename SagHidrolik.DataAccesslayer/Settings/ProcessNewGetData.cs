using Dapper;
using SagHidrolik.Models.SqlRepository;
using SagHidrolik.Models.ViewModesl;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace SagHidrolik.DataAccesslayer.Settings
{
   public static  class ProcessNewGetData
    {
 
        public static async Task<IEnumerable<ProcessNew>> GetProcessNew(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                string xxx = SqlQueryRepo.GetProcessNew(requestQuery);
                var list = await connection.QueryAsync<ProcessNew>(SqlQueryRepo.GetProcessNew(requestQuery));
                return list;
            }
        }
        public static async Task<int> GetProcessNewCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.QueryFirstAsync<int>(SqlQueryRepo.GetProcessNewCount());
                return count;
            }
        }

        public static async Task<int> AddsettingsProcessNew(settingsProcessNewViewModel settingsProcessNewViewModel)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.AddsettingsProcessNew(settingsProcessNewViewModel));
                return count;
            }
        }

        public static async Task<int> DeleteSettingsProcessNew(int processId)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.DeleteSettingsProcessNew(processId));
                return count;
            }
        }

        public static async Task<int> EditSettingsProcessNew(settingsProcessNewViewModel settingsProcessNewViewModel)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.EditSettingsProcessNew(settingsProcessNewViewModel));
                return count;
            }
        }

    }

}
