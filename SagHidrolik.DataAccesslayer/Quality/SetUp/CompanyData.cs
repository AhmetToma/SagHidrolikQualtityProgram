using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using System.Data.SqlClient;
using SagHidrolik.Models.ViewModesl;
using SagHidrolik.Models.SqlRepository;

namespace SagHidrolik.DataAccesslayer.Quality.SetUp
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
        public static async Task<IEnumerable<int>> GetAllCompanyCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.QueryAsync<int>(SqlQueryRepo.GetAllCompanyCount);
                return count;
            }
        }

        public static async Task<int> AddCompnay(CompanyViewModel companyViewModel)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.AddCompnay(companyViewModel));
                return count;
            }
        }
        public static async Task<int> DeleteCompany(int compnayId)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.DeleteCompany(compnayId));
                return count;
            }
        }


        public static async Task<int> UpdateCompany(CompanyViewModel companyViewModel)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.UpdateCompany(companyViewModel));
                return count;
            }
        }
    }
}
