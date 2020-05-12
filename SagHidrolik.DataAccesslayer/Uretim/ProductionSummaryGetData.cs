using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using SagHidrolik.DataAccesslayer.Stok;
using SagHidrolik.Models.SqlRepository;
using SagHidrolik.Models.ViewModesl;

namespace SagHidrolik.DataAccesslayer.Uretim
{
    public static class ProductionSummaryGetData
    {

        public static async Task<IEnumerable<object>> GetProductionSummaryReport(RequestQuery requestQuery)
        {
            var stkList = StokReadingData.GetStokkenByStkList(requestQuery).Result;
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            List<object> newList = new List<object>();

            if (stkList.Count() <= 0) return newList;
            else
            {
                string values = "";
                foreach (var item in stkList)
                {
                    values = values + "'" + item.P_ID + "'" + ",";
                }
                values = values.Substring(0, values.Length - 1);
                using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
                {
                    await connection.OpenAsync();
                    var list = await connection.QueryAsync<object>(SqlQueryRepo.GetProductionSummaryReport(requestQuery, values));
                    return list;
                }
            }
        }
        public static async Task<IEnumerable<dynamic>> GetProcutionSummaryCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<dynamic>(SqlQueryRepo.GetProcutionSummaryCount());
                return list;
            }
        }
    }
}
