using SagHidrolik.Quality.Models.ViewModesl;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using SagHidrolik.Quality.Models.SqlRepository;
using Dapper;


namespace SagHidrolik.Quality.DataAccesslayer.OpenAction
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
    }
}
