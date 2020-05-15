using SagHidrolik.Models.SqlRepository;
using SagHidrolik.Models.ViewModesl;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using System.Data.SqlClient;

namespace SagHidrolik.DataAccesslayer.Settings
{
   public static class OpertorData
    {
        public static async Task<IEnumerable<SettingsOperatorViewModel>> GetSettingsOperator(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<SettingsOperatorViewModel>(SqlQueryRepo.GetSettingsOperator(requestQuery));
                return list;
            }
        }
        public static async Task<int> GetSettingsOperatorCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.QueryFirstAsync<int>(SqlQueryRepo.GetSettingsOperatorCount());
                return count;
            }
        }


        public static async Task<IEnumerable<SettingsOperatorViewModel>> AddToSettingOperator(SettingsOperatorViewModel s)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();

                var list = await connection.QueryAsync<SettingsOperatorViewModel>(SqlQueryRepo.AddToSettingOperator(s));
                return list;
            }
        }
        public static async Task<int> DeleteSettingOperator(int operatorId)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.ExecuteAsync(SqlQueryRepo.DeleteSettingOperator(operatorId));
                return list;
            }
        }


        public static async Task<int> EditSettingsOperator(SettingsOperatorViewModel s)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.EditSettingsOperator(s));
                return count;
            }
        }

        public static async Task<IEnumerable<OperatorPolivalanceViewModel2>> GetSettingsOperatorPolivalance(int operatorId)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<OperatorPolivalanceViewModel2>(SqlQueryRepo.GetSettingsOperatorPolivalance(operatorId));
                return list;
            }
        }
    }
}
