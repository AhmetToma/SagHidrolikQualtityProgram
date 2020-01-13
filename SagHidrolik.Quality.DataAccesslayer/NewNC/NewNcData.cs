using SagHidrolik.Quality.Models.ViewModesl;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using SagHidrolik.Quality.Models.SqlRepository;
using Dapper;

namespace SagHidrolik.Quality.DataAccesslayer.NewNC
{
   public class NewNcData
    {

        public static async Task<int> AddNewNc(NewNcViewModel newNcViewModel)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.AddNewNc(newNcViewModel));
                return count;
            }
        }
    }
}
