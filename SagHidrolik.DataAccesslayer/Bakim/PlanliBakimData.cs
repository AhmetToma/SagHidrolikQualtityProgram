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
    public static class PlanliBakimData
    {
        public static async Task<IEnumerable<object>> GetAllPlanliBakim(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;

            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<object>(SqlQueryRepo.GetAllPlanliBakim(requestQuery));
                return list;
            }
        }

        public static async Task<int> GetAllPlanliBakimCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                int count = await connection.ExecuteScalarAsync<int>(SqlQueryRepo.GetAllPlanliBakimCount);
                return count;
            }
        }
        public static async Task<string> UpdatePlanliBakim(planliBakimModel m)
        {
            var newDate = DateTime.ParseExact(m.tarih, "dd/M/yyyy",null);
            newDate.AddDays(m.periodu);
            string d = newDate.ToString("dd'/'MM'/'yyyy");
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                int c = await connection.ExecuteAsync(SqlQueryRepo.UpdatePlanliBakim(m, d));
                if (c > 0) return "done";
                return "none";
            }
        }
    }
}
