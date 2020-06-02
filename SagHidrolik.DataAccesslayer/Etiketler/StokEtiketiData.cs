using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using Dapper;
using System.Threading.Tasks;
using System.Transactions;
using SagHidrolik.Models.ViewModesl;
using SagHidrolik.Models.SqlRepository;

namespace SagHidrolik.DataAccesslayer.Etiketler
{
     public static class StokEtiketiData
    {
        public static async Task<IEnumerable<StokEtiketiViewModel>> GetAllStokEtiketi(RequestQuery requestQuery)
        { 
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<StokEtiketiViewModel>(SqlQueryRepo.GetAllStokEtiketi(requestQuery));
                return list;
            }
        }
    }
}
