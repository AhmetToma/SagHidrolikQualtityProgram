using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using SagHidrolik.Models.SqlRepository;
using SagHidrolik.Models.ViewModesl;

namespace SagHidrolik.DataAccesslayer.TTFTeslimat
{
    public static class TTFTeslimatData
    {

        public static async void DropAllTTFTeslimatTable()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var c = await connection.ExecuteAsync(SqlQueryRepo.DropAllTTFTeslimatTable);
            }
        }

        public static async Task<string> CreateTTFTeslimatTabel()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var c = await connection.ExecuteAsync(SqlQueryRepo.CreateTTFTeslimatTabel);
            }
            return "done";
        }


        public static async Task<IEnumerable<TeslimatDurumuViewModel>> AddTeslimatDurumu(List<TeslimatDurumuViewModel> willAddedList)
        {
            string message = "";
            DropAllTTFTeslimatTable();
         
            while(message!= "done")
            {
                 message = CreateTTFTeslimatTabel().Result;
                int x = 5;
            }
            List<TeslimatDurumuViewModel> addedList = new List<TeslimatDurumuViewModel>();
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                foreach (var item in willAddedList)
                {
                    int count = await connection.ExecuteAsync(SqlQueryRepo.AddTeslimatDurumu(item));
                    if (count != 0) addedList.Add(item);
                    int x = 4;
                }
                return addedList;
            }
        }
        public static async Task<IEnumerable<TeslimatDurumuViewModel>> GetTeslimatDurumu(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                try
                {
                    var list = await connection.QueryAsync<TeslimatDurumuViewModel>(SqlQueryRepo.GetTeslimatDurumu(requestQuery));
                    return list;
                }

                catch (Exception e)
                {
                    throw e;
                }
            }
        }
        public static async Task<int> GetTeslimatDurumuCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var list = await connection.QueryFirstAsync<int>(SqlQueryRepo.GetTeslimatDurumuCount);
                return list;
            }
        }

        public static async Task<IEnumerable<dynamic>> GetShippmentReport(RequestQuery requestQuery)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<object>(SqlQueryRepo.GetShippmentReport(requestQuery));
                return list;
            }
        }
    }
}
