using SagHidrolik.Quality.Models.ViewModesl;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using SagHidrolik.Quality.Models.SqlRepository;
using Dapper;
namespace SagHidrolik.Quality.DataAccesslayer.SetUp
{
   public static  class ClaimData
    { 
        public static async Task<IEnumerable<ClaimTypeViewModel>> GetAllClaim(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<ClaimTypeViewModel>(SqlQueryRepo.GetAllClaim(requestQuery));
                return list;
            }
        }
        public static async Task<IEnumerable<int>> GetAllClaimCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.QueryAsync<int>(SqlQueryRepo.GetAllClaimCount);
                return count;
            }
        }

        public static async  Task <int> AddClaimType(ClaimTypeViewModel claimTypeViewModel)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.AddClaimType(claimTypeViewModel));
                return count ;
            }
        }

        public static async Task<int> DeleteClaimType(int  claimId)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.DeleteClaimType(claimId));
                return count;
            }
        }

        public static async Task<int> UpdateClaimType(ClaimTypeViewModel claimTypeViewModel)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.UpdateClaimType(claimTypeViewModel));
                return count;
            }
        }
    }
}
