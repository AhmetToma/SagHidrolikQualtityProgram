using System;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Dapper;
using SagHidrolik.Models.SqlRepository;
using SagHidrolik.Models.ViewModesl;

namespace SagHidrolik.DataAccesslayer.Bakim
{
  public static  class BakimGirisiData
    {
        public static async Task<string> InsertIntoBakimGirisi(BakimGirisiModel bakimGirisiModel)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                int c = await connection.ExecuteAsync(SqlQueryRepo.InsertIntoBakimGirisi(bakimGirisiModel));
                if (c > 0) return "done";
                return "none";
            }
        }
    }
}
