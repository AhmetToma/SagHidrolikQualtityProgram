using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Data.SqlClient;
using System.Linq;
using SagHidrolik.Models.ViewModesl;
using SagHidrolik.Models.SqlRepository;
using SagHidrolik.DataAccesslayer.Stok;

namespace SagHidrolik.DataAccesslayer.Uretim
{
   public  static class GunlukHatBazindaUretimData
    {
       
        public static async Task<IEnumerable<ProcessPlannigModel>> getAllProcessInGunlukHatBazindUretim()
        {
          
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<ProcessPlannigModel>(SqlQueryRepo.GetTamirIsEmriAdimlari);
                return list;
            }
        }

        public static async Task<IEnumerable<GunlukHatBazindaUretimModel>> GetAllGunlukHatBazindUretimList(RequestQuery requestQuery)
        {
            var stkList = StokReadingData.GetStokkenByStkList(requestQuery).Result;
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;

            List<GunlukHatBazindaUretimModel> newList = new List<GunlukHatBazindaUretimModel>(); ;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<GunlukHatBazindaUretimModel>(SqlQueryRepo.GetAllGunlukHatBazindUretimList(requestQuery));
            
                foreach (var item in list)
                {
                    var dboStokgen = stkList.Where(x => x.P_ID == item.PartNo_ID).SingleOrDefault();

                    if (dboStokgen != null)
                    {
                        item.STK = dboStokgen.Stk;
                        newList.Add(item);
                    }
                }
                return newList;
            }
        }
    }
}
