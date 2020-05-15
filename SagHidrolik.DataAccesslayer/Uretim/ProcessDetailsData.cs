using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using SagHidrolik.Models.SqlRepository;

namespace SagHidrolik.Models.ViewModesl
{
    public static class ProcessDetailsData
    {
        public static async Task<IEnumerable<ProcessFlow>> GetProcessFlowInProcessDetails(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<ProcessFlow>(SqlQueryRepo.GetProcessFlowInProcessDetails(requestQuery));
                return list;
            }
        }


        public static async Task<IEnumerable<GunlukHatBazindaUretimModel>> GetProcessFlowDetailsInProcessDetails(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<GunlukHatBazindaUretimModel>(SqlQueryRepo.GetProcessFlowDetailsInProcessDetails(requestQuery));
                return list;
            }
        }
    }
}