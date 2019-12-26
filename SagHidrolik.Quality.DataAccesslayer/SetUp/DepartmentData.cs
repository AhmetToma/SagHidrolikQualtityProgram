using SagHidrolik.Quality.Models.ViewModesl;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;
using Dapper;
namespace SagHidrolik.Quality.DataAccesslayer.SetUp
{
   public  class DepartmentData
    {


        public static async Task<IEnumerable<Department>> GetAllDepartments(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<Department>(SqlQueryRepo.GetAllDepartments(requestQuery));
                return list;
            }
        }
        public static async Task<IEnumerable<int>> GetAllDepartmentCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.QueryAsync<int>(SqlQueryRepo.GetAllDepartmentCount);
                return count;
            }
        }
        public static async Task<int> AddDepartment(Department department)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.AddDepartment(department));
                return count;
            }
        }
        public static async Task<int> DeleteDepartment(int deptId)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.DeleteDepartment(deptId));
                return count;
            }
        }

        public static async Task<int> UpdateDepartment(Department department)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.UpdateDepartment(department));
                return count;
            }
        }
    }
}
