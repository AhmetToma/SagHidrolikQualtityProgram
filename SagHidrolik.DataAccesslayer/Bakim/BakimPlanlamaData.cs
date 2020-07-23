using SagHidrolik.Models.SqlRepository;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using SagHidrolik.Models.ViewModesl;

namespace SagHidrolik.DataAccesslayer.Bakim
{
   public static class BakimPlanlamaData
    {
        public static async Task<string> insertIntoBakimPlanlama(BakimPlanlamaModel m)
        {
            IEnumerable<object> list;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                   list =  await connection.QueryAsync<object>($"select * from Tbl_BakımKayit where Makina_ID={m.machineId} and Tamamlanma=0");
            }

            if (list.AsList().Count > 0)
                return "exist";
            else
            {
                var newDate = DateTime.Parse(m.tarih);
                newDate.AddDays(m.periodu);
                string d = newDate.ToString();
                using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
                {
                    await connection.OpenAsync();
                    int  c = await connection.ExecuteAsync(SqlQueryRepo.insertIntoBakimPlanlama(m, d));
                    if (c > 0) return "done";
                }
                return "not Complete";
            }
        }
    }
}
