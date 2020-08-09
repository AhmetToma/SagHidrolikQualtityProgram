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
        public static async Task<string> DeleteFromProceesFlow(int flowId)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                int c = await connection.ExecuteAsync(SqlQueryRepo.DeleteFromProceeFlow(flowId));
                if (c > 0) return "done";
                return "none";
            }
        }
        public static async Task<string> UpdateProcessFlowInProcessDetails(processFlowEditViewModel m)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                int c = await connection.ExecuteAsync(SqlQueryRepo.UpdateProcessFlowInProcessDetails(m));
                if (c > 0) return "done";
                return "none";
            }
        }

        public static async Task<IEnumerable<object>> GetProcessFlowDetailsInProcessDetails(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<object>(SqlQueryRepo.GetProcessFlowDetailsInProcessDetails(requestQuery));
                return list;
            }
        }
        public static async Task<string> DeleteFromProceesFlowDetails(int id)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                int c = await connection.ExecuteAsync(SqlQueryRepo.DeleteFromProceesFlowDetails(id));
                if (c > 0) return "done";
                return "none";
            }
        }
        public static async Task<string> UpdateProcessFlowDetailsInProcessDetails(ProcessFlowDetailsEditViewModel m)
        {
           
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                int c = await connection.ExecuteAsync(SqlQueryRepo.UpdateProcessFlowDetailsInProcessDetails(m));
                if (c > 0) return "done";
                return "none";
            }
        }


    }
}