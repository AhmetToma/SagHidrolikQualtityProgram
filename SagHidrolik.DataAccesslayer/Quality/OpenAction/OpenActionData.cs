
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using SagHidrolik.Models.SqlRepository;
using Dapper;
using SagHidrolik.Models.ViewModesl;

namespace SagHidrolik.DataAccesslayer.Quality.OpenAction
{
      static public class OpenActionData
    {
        public static async Task<IEnumerable<ReviewViewModel>> GetAllOpenAction(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<ReviewViewModel>(SqlQueryRepo.GetAllOpenAction(requestQuery));
                return list;
            }
        }

        public static async Task<IEnumerable<int>> GetAllOpenActionCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.QueryAsync<int>(SqlQueryRepo.GetAllOpenActionCount);
                return count;
            }
        }
    }
}
