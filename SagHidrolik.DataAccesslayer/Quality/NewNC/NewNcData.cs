using System.Data.SqlClient;
using System.Threading.Tasks;
using SagHidrolik.Models.SqlRepository;
using Dapper;
using SagHidrolik.Models.ViewModesl;

namespace SagHidrolik.DataAccesslayer.Quality.NewNC
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
