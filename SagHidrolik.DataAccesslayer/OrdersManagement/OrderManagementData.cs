﻿using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Dapper;
using System.Linq;
using SagHidrolik.Models.ViewModesl;
using SagHidrolik.Models.SqlRepository;
using SagHidrolik.DataAccesslayer.Stok;

namespace SagHidrolik.DataAccesslayer.OrdersManagement
{
    public class OrderManagementData
    {
        public static async Task<IEnumerable<OrderDetailsViewModel>> GetOrderDetails(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<OrderDetailsViewModel>(SqlQueryRepo.GetOrderDetails(requestQuery));
                return list;
            }
        }
        public static async Task<IEnumerable<InProgresViewModel>> GetInProgress()
        {
            RequestQuery requestQuery = new RequestQuery()
            {
                Stk = ""
            };
            var stkList = StokReadingData.GetStokkenByStkList(requestQuery).Result;

            List<InProgresViewModel> newList = new List<InProgresViewModel>(); ;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<InProgresViewModel>(SqlQueryRepo.GetInProgress());

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
        public static async Task<IEnumerable<dynamic>> GetComponentOrders(RequestQuery requestQuery)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<dynamic>(SqlQueryRepo.GetComponentOrders(requestQuery));
                return list;
            }
        }

        public static async Task<IEnumerable<dynamic>> GetCustomerOrders(RequestQuery requestQuery)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<dynamic>(SqlQueryRepo.GetCustomerOrders(requestQuery));
                return list;
            }
        }
    }
}
