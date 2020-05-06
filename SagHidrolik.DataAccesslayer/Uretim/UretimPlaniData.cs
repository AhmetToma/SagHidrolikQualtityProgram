
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Linq;
using SagHidrolik.Models.ViewModesl;
using SagHidrolik.Models.SqlRepository;

namespace SagHidrolik.DataAccesslayer.Uretim
{
    public  static class UretimPlaniData
    {
        public static async Task<IEnumerable<UretimPlaniModel>> GetAllUretimPlani(RequestQuery requestQuery)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
                var list = await connection.QueryAsync<UretimPlaniModel>(SqlQueryRepo.GetAllUretimPlani(requestQuery));
                return list;
            }

        }  
    }
}
