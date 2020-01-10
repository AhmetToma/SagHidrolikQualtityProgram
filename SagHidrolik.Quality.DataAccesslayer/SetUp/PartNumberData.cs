using SagHidrolik.Quality.Models.ViewModesl;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using SagHidrolik.Quality.Models.SqlRepository;
using Dapper;

namespace SagHidrolik.Quality.DataAccesslayer.SetUp
{
   public static class PartNumberData
    {
        public static async Task<IEnumerable<PartNumbersViewModel>> GetAllPartNumbers(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<PartNumbersViewModel>(SqlQueryRepo.GetAllPartNumbers(requestQuery));
                return list;
            }
        }
        public static async Task<IEnumerable<int>> GetAllPartNumbersCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.QueryAsync<int>(SqlQueryRepo.GetAllPartNumbersCount);
                return count;
            }
        }
        public static async Task<int> AddPartNumber(PartNumbersViewModel partNumbersViewModel)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.AddPartNumber(partNumbersViewModel));
                return count;
            }
        }
        public static async Task<int> DeletePartNumber(int partNumberId)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.DeletePartNumber(partNumberId));
                return count;
            }
        }

        public static async Task<int> UpdatePartNumber(PartNumbersViewModel partNumbersViewModel)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.UpdatePartNumber(partNumbersViewModel));
                return count;
            }
        }


    }
}
