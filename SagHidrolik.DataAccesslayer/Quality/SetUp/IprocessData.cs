using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;


using Dapper;
using SagHidrolik.Models.SqlRepository;
using SagHidrolik.Models.ViewModesl;

namespace SagHidrolik.DataAccesslayer.Quality.SetUp
{
   public  class IprocessData
    {

        public static async Task<IEnumerable<IprocessViewModel>> GetAllIprocess(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<IprocessViewModel>(SqlQueryRepo.GetAllIprocess(requestQuery));
                return list;
            }
        }
        public static async Task<IEnumerable<int>> GetAllIprocessCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.QueryAsync<int>(SqlQueryRepo.GetAllIprocessCount);
                return count;
            }
        }
        public static async Task<int> AddIprocess(IprocessViewModel iprocessViewModel)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.AddIprocess(iprocessViewModel));
                return count;
            }
        }
        public static async Task<int> DeleteIprocess(int IporcessId)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.DeleteIprocess(IporcessId));
                return count;
            }
        }

        public static async Task<int> UpdateIprocess(IprocessViewModel iprocessViewModel)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.UpdateIprocess(iprocessViewModel));
                return count;
            }
        }
    }
}
