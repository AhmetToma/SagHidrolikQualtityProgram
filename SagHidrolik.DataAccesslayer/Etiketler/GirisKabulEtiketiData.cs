using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Data.SqlClient;
using SagHidrolik.Models.ViewModesl;
using SagHidrolik.Models.SqlRepository;

namespace SagHidrolik.DataAccesslayer.Etiketler
{
    public static class GirisKabulEtiketiGetData
    {
   
        public static async Task<IEnumerable<GirisKabulEtiketiViewModel>> GirisKabulEtiketiList(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<GirisKabulEtiketiViewModel>(SqlQueryRepo.GirisKabulEtiketiList(requestQuery));
                return list;
            }
        }
    }
}
