using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using SagHidrolik.Models.SqlRepository;
using SagHidrolik.Models.ViewModesl;

namespace SagHidrolik.DataAccesslayer.Etiketler
{
    public static class SekiyetKutuEtiketData
    {

        public static async Task<IEnumerable<SevkiyetKutuEtiketiModel>> GetSevkiyetKutuEtiketiList(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<SevkiyetKutuEtiketiModel>(SqlQueryRepo.GetSevkiyetKutuEtiketiList(requestQuery));
                return list;
            }
        }
    }
}
