using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using SagHidrolik.Models.SqlRepository;
using SagHidrolik.Models.ViewModesl;

namespace SagHidrolik.DataAccesslayer.TTFTeslimat
{
   public static  class TTFTeslimatData
    {
        public static async Task<IEnumerable<TeslimatDurumuViewModel>> GetTeslimatDurumu(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<TeslimatDurumuViewModel>(SqlQueryRepo.GetTeslimatDurumu(requestQuery));
                return list;
            }
        }
        public static async Task<int> GetTeslimatDurumuCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var list = await connection.QueryFirstAsync<int>(SqlQueryRepo.GetTeslimatDurumuCount);
                return list;
            }
        }

        public static async Task<IEnumerable<dynamic>> GetShippmentReport(RequestQuery requestQuery)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<object>(SqlQueryRepo.GetShippmentReport(requestQuery));
                return list;
            }
        }
    }
}
