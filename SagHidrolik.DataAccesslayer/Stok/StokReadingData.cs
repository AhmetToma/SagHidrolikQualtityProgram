using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using SagHidrolik.Models.SqlRepository;
using SagHidrolik.Models.ViewModesl;
namespace SagHidrolik.DataAccesslayer.Stok
{
    public static class StokReadingData
    {

        #region DboStokgen



        public static async Task<IEnumerable<DboStokgen>> GetStokkenByStkList(RequestQuery requestQuery)
        {

            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<DboStokgen>(SqlQueryRepo.GetStokkenByStkList(requestQuery));
                return list;
            }

        }
        public static async Task<IEnumerable<DboStokgen>> GetStokkenByStkListOnlypageSize(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<DboStokgen>(SqlQueryRepo.GetStokkenByStkListOnlypageSize(requestQuery));
                return list;
            }


        }
        public static async Task<DboStokgen> GetDboStokgenPIdByStk(string stk)
        {

            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var list = await connection.QueryFirstAsync<DboStokgen>(SqlQueryRepo.GetDboStokgenPIdByStk(stk));
                return list;
            }
        }

        #endregion


        #region local prodution orders


        public static async Task<IEnumerable<DboLocalProductionOrders>> GetProductOrdersByStokgenId(RequestQuery requestQuery)
        {
            try
            {
                using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
                {
                    await connection.OpenAsync();

                    requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
                    var list = await connection.QueryAsync<DboLocalProductionOrders>(SqlQueryRepo.GetProductOrdersByStokgenId(requestQuery));
                    return list;
                }
            }
            catch (Exception)
            {

                throw;
            }



        }
        #endregion

        #region Stok Alt

        public static async Task<IEnumerable<DboStokAlt>> GetAllStokAlt(RequestQuery requestQuery)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
                var list = await connection.QueryAsync<DboStokAlt>(SqlQueryRepo.GetAllStokAlt(requestQuery));
                return list;
            }
        }
        public static async Task<string> GetaltStokToplam(RequestQuery requestQuery)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();

                var toplam = await connection.QuerySingleAsync<string>(SqlQueryRepo.GetaltStokToplam(requestQuery));

                return toplam;
            }
        }






        public static async Task<IEnumerable<GalvanizeViewModel>> GetGalvanize(RequestQuery requestQuery)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
                await connection.OpenAsync();
                var list = await connection.QueryAsync<GalvanizeViewModel>(SqlQueryRepo.GetGalvanize);
                List<GalvanizeViewModel> createdList = new List<GalvanizeViewModel>();
                for (int i = 0; i < list.Count(); i++)
                {
                    if (list.ElementAt(i).stokrefnew == requestQuery.Stk)
                    {
                        if (list.ElementAt(i).carpan == -1) createdList.Add(list.ElementAt(i));
                    }
                }
                createdList = createdList.Skip(requestQuery.pageNumber).Take(requestQuery.pageSize).ToList();
                return createdList;
            }
        }
        #endregion



        #region Boom Process

        public static async Task<IEnumerable<BomProcessViewModel>> GetBomProcessInStok(RequestQuery requestQuery)
        {
            var dboStokgen = GetDboStokgenPIdByStk(requestQuery.Stk).Result;
            requestQuery.pid = dboStokgen.P_ID;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
                var list = await connection.QueryAsync<BomProcessViewModel>(SqlQueryRepo.GetBomProcessInStok(requestQuery));
                return list;
            }
        }

        #endregion

        #region ProcessFlow


        public static async Task<IEnumerable<ProcessViewModel>> GetProcessFlowInStok(RequestQuery requestQuery)
        {
            var dboStokgen = GetDboStokgenPIdByStk(requestQuery.Stk).Result;
            requestQuery.pid = dboStokgen.P_ID;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
                await connection.OpenAsync();
                var list = await connection.QueryAsync<ProcessViewModel>(SqlQueryRepo.GetProcessFlowInStok(requestQuery));
                return list;
            }
        }
        #endregion

        #region StokRecetesi 

        public static async Task<IEnumerable<DboTstokrecetesi>> GetStokRecetesi(RequestQuery requestQuery)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
                await connection.OpenAsync();
                var list = await connection.QueryAsync<DboTstokrecetesi>(SqlQueryRepo.GetStokRecetesi(requestQuery));
                return list;
            }
        }
        #endregion

        #region GerproductFile

        public static async Task<IEnumerable<ProductFileVieModel>> GetproductFile(string Pid)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var productFileVieModel = await connection.QueryAsync<ProductFileVieModel>(SqlQueryRepo.GetproductFile(Pid));
                return productFileVieModel;
            }
        }

        public static async Task<IEnumerable<ProductFileVieModel>> GetAllProductFile()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var productFileVieModel = await connection.QueryAsync<ProductFileVieModel>(SqlQueryRepo.GetAllProductFile);
                return productFileVieModel;
            }
        }
        #endregion


        #region productImage

        public static async Task<productImageViewModel> GetProductImage(string stk)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var productImage = connection.QuerySingleOrDefault<productImageViewModel>(SqlQueryRepo.GetProductImage(stk));
                return productImage;
            }
        }
        #endregion


        #region StokAll 
        public static async Task<IEnumerable<StokAllViewModel>> GetStokAll(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<StokAllViewModel>(SqlQueryRepo.GetStokAll(requestQuery));
                return list;
            }
        }
        public static async Task<int> GetStokAllCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var count = await connection.QueryFirstAsync<int>(SqlQueryRepo.GetStokAllCount());
                return count;
            }
        }

        #endregion

    }
}


//public static async Task<IEnumerable<TESTVIEWMODel>> getTest()
//{

//    string q = @"SELECT  dbo.STOKGEN.STK,MAX( CAST(STOK_ALT.TARIH AS DATE)) as tarih,
//  Sum(dbo.STOK_ALT.[GRMIK]-dbo.STOK_ALT.[CKMIK]) AS TotalStock
//FROM dbo.STOK_ALT RIGHT JOIN dbo.STOKGEN ON dbo.STOK_ALT.STOKP_ID = dbo.STOKGEN.P_ID
//WHERE (((STOKGEN.TUR)=3 Or (STOKGEN.TUR)=4)) and dbo.STOKGEN.STK='12638621'

//GROUP BY CAST(STOK_ALT.TARIH AS DATE),  STOKGEN.STK, STOKGEN.TUR,[CKMIK],[GRMIK]
//order by 2

//";
//    using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
//    {

//        await connection.OpenAsync();
//        var list = await connection.QueryAsync<TESTVIEWMODel>(q);
//        list = list.GroupBy(x => x.STK).Select(g => new TESTVIEWMODel { tarih = g.Last().tarih, TotalStock = g.Sum(s => s.TotalStock), STK = g.First().STK }).ToList();
//        return list;
//    }

//}


