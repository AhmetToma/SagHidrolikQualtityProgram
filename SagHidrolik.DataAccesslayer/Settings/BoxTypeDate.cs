using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Dapper;
using SagHidrolik.Models.SqlRepository;
using SagHidrolik.Models.ViewModesl;

namespace SagHidrolik.DataAccesslayer.Settings
{
    public static class  BoxTypeDate
    {
        #region Box Type 
        public static async Task<IEnumerable<BoxTypeViewModel>> GetBoxType(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<BoxTypeViewModel>(SqlQueryRepo.GetBoxType(requestQuery));
                return list;
            }
        }
        public static async Task<int> GetBoxTypeCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var count = await connection.QueryFirstAsync<int>(SqlQueryRepo.GetBoxTypeCount());
                return count;
            }
        }

        public static async Task<int> UpdateBoxType(BoxTypeViewModel boxTypeViewModel)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var list = await connection.ExecuteAsync(SqlQueryRepo.UpdateBoxType(boxTypeViewModel));
                return list;
            }
        }

        #endregion
    }
}
