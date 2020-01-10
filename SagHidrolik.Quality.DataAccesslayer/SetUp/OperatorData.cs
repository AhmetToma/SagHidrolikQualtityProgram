using SagHidrolik.Quality.Models.ViewModesl;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using SagHidrolik.Quality.Models.SqlRepository;

namespace SagHidrolik.Quality.DataAccesslayer.SetUp
{
   public  class OperatorData
    {

        public static async Task<IEnumerable<OperatorViewModel>> GetAllOperators(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<OperatorViewModel>(SqlQueryRepo.GetAllOperators(requestQuery));
                return list;
            }
        }
        public static async Task<IEnumerable<int>> GetAllOperatorsCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.QueryAsync<int>(SqlQueryRepo.GetAllOperatorsCount);
                return count;
            }
        }
        public static async Task<int> AddOperator(OperatorViewModel operatorViewModel)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.AddOperator(operatorViewModel));
                return count;
            }
        }
        public static async Task<int> DeleteOperator(int operatorId)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.DeleteOperator(operatorId));
                return count;
            }
        }

        public static async Task<int> UpdateOperator(OperatorViewModel operatorViewModel)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.UpdateOperator(operatorViewModel));
                return count;
            }
        }
    }
}
