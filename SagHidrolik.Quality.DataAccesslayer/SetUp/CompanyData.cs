using SagHidrolik.Quality.Models.ViewModesl;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using System.Data.SqlClient;

namespace SagHidrolik.Quality.DataAccesslayer.SetUp
{
    public class CompanyData
    {

        public static async Task<IEnumerable<CompanyViewModel>> GetAllCompany(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<CompanyViewModel>(SqlQueryRepo.GetAllCompany(requestQuery));
                return list;
            }
        }
    }
}
