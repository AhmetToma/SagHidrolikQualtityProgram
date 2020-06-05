using SagHidrolik.Models.SqlRepository;
using SagHidrolik.Models.ViewModesl;
using System.Collections.Generic;
using System.Data.SqlClient;
using Dapper;
using System.Threading.Tasks;

namespace SagHidrolik.DataAccesslayer.SystemUsers
{
    public static class SystemUsersData
    {
        public static async Task<IEnumerable<SystemUserViewModel>> GetAllSyetemUsers(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            using (var connection = new SqlConnection(SqlQueryRepo.SagHidrolikAuthentication))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<SystemUserViewModel>(SqlQueryRepo.GetAllSyetemUsers(requestQuery));
                return list;
            }
        }

        public static async Task<int> GetAllSyetemUsersCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.SagHidrolikAuthentication))
            {
                await connection.OpenAsync();
                var count = await connection.QueryFirstAsync<int>(SqlQueryRepo.GetAllSyetemUsersCount());
                return count;
            }
        }

        public static async Task<IEnumerable<UserRolesViewModel>> GetAllUsersRoles()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.SagHidrolikAuthentication))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<UserRolesViewModel>(SqlQueryRepo.GetAllUsersRoles());
                return list;
            }
        }
    }
}
