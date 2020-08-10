using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Dapper;
using System.Linq;
using SagHidrolik.Models.ViewModesl;
using SagHidrolik.DataAccesslayer.Stok;
using SagHidrolik.Models.SqlRepository;

namespace SagHidrolik.DataAccesslayer.Uretim
{
    public static class ProductionStartData
    {

        public static async Task<IEnumerable<ProductionStatusViewModel>> GetAllProductionStatus(RequestQuery requestQuery)
        {
            var stkList = StokReadingData.GetStokkenByStkList(requestQuery).Result;
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            IEnumerable<ProductionStatusViewModel> list;
            List<ProductionStatusViewModel> newList = new List<ProductionStatusViewModel>();
            IEnumerable<UserRolesViewModel> UserRoles;

            if (stkList.Count() <= 0) return newList;
            else
            {
                using (var connection = new SqlConnection(SqlQueryRepo.SagHidrolikAuthentication))
                {
                    await connection.OpenAsync();
                    UserRoles = await connection.QueryAsync<UserRolesViewModel>(SqlQueryRepo.GetAllUsersRoles());
                }


                using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
                {
                    await connection.OpenAsync();
                    list = await connection.QueryAsync<ProductionStatusViewModel>(SqlQueryRepo.GetAllProductionStatus(requestQuery));
                }
                foreach (var item in list)
                {

                    try
                    {
                        var dboStokgen = stkList.Where(x => x.P_ID == item.PartNo_ID).SingleOrDefault();
                        var roleModel = UserRoles.Where(x => x.RoleId == item.RoleId).SingleOrDefault();
                        var z = item;


                        if (dboStokgen != null || roleModel!=null)
                        {
                            if(dboStokgen!=null) item.Stk = dboStokgen.Stk;
                            if( roleModel!=null)
                            {
                                item.RoleId = roleModel.RoleId;
                                item.RoleName = roleModel.RoleName;
                            }
                         
                            int zzz = 5;
                        }
                        newList.Add(item);
                    }
                    catch (System.Exception e)
                    {

                        throw e;
                    }


                }
                return newList;
            }
        }


        public static async Task<int>  DeleteproductionStatus(int sheetId,string roleName)
        {
            IEnumerable<UserRolesViewModel> Roles;
            using (var connection = new SqlConnection(SqlQueryRepo.SagHidrolikAuthentication))
            {
                await connection.OpenAsync();
                Roles = await connection.QueryAsync<UserRolesViewModel>(SqlQueryRepo.GetAllUsersRoles());
            }

            var RoleModel = Roles.Where(x => x.RoleName == roleName).SingleOrDefault();

            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var c = await connection.ExecuteAsync(SqlQueryRepo.DeleteproductionStatus(sheetId, RoleModel.RoleId));
                return c;
            }
        }


        public static async Task<string> AddToProductionStatus(string inputDate, int productId, int Qty, string rolName)
        {
            IEnumerable<UserRolesViewModel> Roles;

            using (var connection = new SqlConnection(SqlQueryRepo.SagHidrolikAuthentication))
            {
                await connection.OpenAsync();
                Roles = await connection.QueryAsync<UserRolesViewModel>(SqlQueryRepo.GetAllUsersRoles());
            }
            var RoleModel = Roles.Where(x => x.RoleName == rolName).SingleOrDefault();
            string message = "";
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var prodcutionStatusList = await connection.QueryAsync<int>(SqlQueryRepo.CheckProdcutionOrdersStatus( productId, RoleModel.RoleId));

                if (prodcutionStatusList.Count() >= 1)
                {
                    message = "Tabloya eklenmiş iş emri !";
                    return message;
                }
                else
                {
                    var bomList = await connection.QueryAsync<BomProcess>($"SELECT  dbo.Local_ProductionOrders.ProductOrderID, BOM_Process.OrderNo,BOM_Process.SubPartNo FROM dbo.Local_ProductionOrders INNER JOIN BOM_Process " +
                        $"ON dbo.Local_ProductionOrders.PartNo_ID = BOM_Process.PartNo_ID WHERE(((dbo.Local_ProductionOrders.ProductOrderID) = {productId}))ORDER BY BOM_Process.OrderNo; ");
                    if (bomList.Count() <= 0) message = "there is no order No!";
                    else
                    {
                        var orderNo = bomList.ElementAt(0).OrderNo;
                        var result = await connection.ExecuteScalarAsync<int>(SqlQueryRepo.AddToProductionStatus(inputDate, productId, orderNo, Qty, RoleModel.RoleId));
                        message = "successfully added!";
                    }
                    return message;
                }
            }
        }
        public static async Task<string> TransferToSystem(string roleName)
        {
            string message = "";
            IEnumerable<UserRolesViewModel> Roles;
            using (var connection = new SqlConnection(SqlQueryRepo.SagHidrolikAuthentication))
            {
                await connection.OpenAsync();
                 Roles = await connection.QueryAsync<UserRolesViewModel>(SqlQueryRepo.GetAllUsersRoles());
            }

            var RoleModel = Roles.Where(x => x.RoleName == roleName).SingleOrDefault();

            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var response1 = await connection.ExecuteAsync(SqlQueryRepo.UpdateRevisedDateInLocalProductionOrders());
                // var response2 = await connection.ExecuteScalarAsync<int>(SqlQueryRepo.InsertIntoProcessFlowInProductionStart());
              var response3 = await connection.ExecuteAsync(SqlQueryRepo.DeleteAllProductionStatus(RoleModel.RoleId));
                int x = 5;
                message = "Successfuly Done!";
            }
            return message;
        }
    }
}

