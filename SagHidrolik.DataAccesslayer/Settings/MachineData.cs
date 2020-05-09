using Dapper;
using SagHidrolik.Models.SqlRepository;
using SagHidrolik.Models.ViewModesl;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
namespace SagHidrolik.DataAccesslayer.Settings
{
   public static class MachineData
    {

        #region Machine 
        public static async Task<IEnumerable<MachineSettingsViewModel>> GetMachineSettings(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<MachineSettingsViewModel>(SqlQueryRepo.GetMachineSettings(requestQuery));
                return list;
            }
        }
        public static async Task<int> GetMachineSettingsCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.QueryFirstAsync<int>(SqlQueryRepo.GetMachineSettingsCount());
                return count;
            }
        }

        #endregion
    }
}
