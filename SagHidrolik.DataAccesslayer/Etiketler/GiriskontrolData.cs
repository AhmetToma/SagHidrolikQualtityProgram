using SagHidrolik.Models.SqlRepository;
using SagHidrolik.Models.ViewModesl;
using System.Collections.Generic;
using Dapper;
using System.Data.SqlClient;
using System.Threading.Tasks;
namespace SagHidrolik.DataAccesslayer.Etiketler
{
    public static class GiriskontrolData
    {
        public static async Task<IEnumerable<GirisKontrolViwModel>> GetGirisKontrol(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<GirisKontrolViwModel>(SqlQueryRepo.GetGirisKontrol(requestQuery));
                return list;
            }
        }
        public static async Task<int> GetGirisKontrolCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var count = await connection.QueryFirstAsync<int>(SqlQueryRepo.GetGirisKontrolCount());
                return count;
            }
        }


        public static async Task<string> UpdateKaliteKodu(kaliteKoduModel k)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();

                string zzz = SqlQueryRepo.UpdateKaliteKodu(k);
                var list = await connection.QueryFirstAsync<string>(SqlQueryRepo.UpdateKaliteKodu(k));
                return list;
            }
        }
    }
}
