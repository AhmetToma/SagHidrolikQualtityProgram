using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Dapper;
using SagHidrolik.Models.SqlRepository;

namespace SagHidrolik.DataAccesslayer.Bakim
{
  public static  class BakimRapor
    {

        public static async Task<IEnumerable<object>> GetBakimRaporu( )
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<object>(SqlQueryRepo.GetBakimRaporu);
                return list;
            }
        }


    }
}
