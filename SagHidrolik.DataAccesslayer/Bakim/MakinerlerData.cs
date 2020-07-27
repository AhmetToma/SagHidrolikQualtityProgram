using SagHidrolik.Models.SqlRepository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Data.SqlClient;
using SagHidrolik.Models.ViewModesl;

namespace SagHidrolik.DataAccesslayer.Bakim
{
    public static class MakinerlerData
    {
        public static async Task<IEnumerable<object>> GetAllMakineler(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;

            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<object>(SqlQueryRepo.GetAllMakineler(requestQuery));
                return list;
            }
        }
        public static async Task<int> GetAllMakinelerCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                int count = await connection.ExecuteScalarAsync<int>(SqlQueryRepo.GetAllMakinelerCount);
                return count;
            }
        }
        public static async Task<string> DeleteMakine(int machineId)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                int c = await connection.ExecuteAsync(SqlQueryRepo.DeleteMakine(machineId));
                if (c > 0) return "done";
                return "none";
            }
        }
        public static async Task<string> AddNewMakine(makinelerViewModel m)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var c = await connection.QueryAsync<object>($"select * from  dbo.[10_MakinaListesiNew] where Machine_no =N'{m.machineNo}'");
                if (c.AsList().Count > 0) return "exist";
                else
                {
                    if (m.guc == null) m.guc = 0;
                    int cc = await connection.ExecuteAsync(SqlQueryRepo.AddNewMakine(m));
                    if (cc > 0) return "done";
                    return "none";
                }
            }
        }

        public static async Task<string> UpdateMakine(makinelerViewModel m)
        {
            if (m.guc == null) m.guc = 0;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                int cc = await connection.ExecuteAsync(SqlQueryRepo.UpdateMakine(m));
                if (cc > 0) return "done";
                return "none";
            }
        }
    }
}
