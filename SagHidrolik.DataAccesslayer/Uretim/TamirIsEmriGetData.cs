using System.Collections.Generic;
using System.Data.SqlClient;
using Dapper;
using System.Threading.Tasks;
using Dapper;
using SagHidrolik.Models.ViewModesl;
using SagHidrolik.Models.SqlRepository;

namespace SagHidrolik.DataAccesslayer.Uretim
{
     public  static class TamirIsEmriGetData
    {

        public static async Task<IEnumerable<ProcessPlannigModel>> GetTamirIsEmriAdimlari()
        {
      
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<ProcessPlannigModel>(SqlQueryRepo.GetTamirIsEmriAdimlari);
                return list;
            }
        }

        public static async Task<int> InsertTamirIsEmri(tamirIsEmriModel tamirIsEmriModel)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                int newLotNot =  connection.QuerySingle<int>(SqlQueryRepo.InsertTamirIsEmri_productionOrders_getLotNo(tamirIsEmriModel));
                if ( newLotNot != 0)
                {
                    int lastProcess = 0;
                    var x =  connection.Execute(SqlQueryRepo.InsertTamirIsEmri_productionOrders_setLotNo(newLotNot));
                    var tamir6 = connection.Execute(SqlQueryRepo.InsertTamirIsEmri_processFlowTamir6(newLotNot,tamirIsEmriModel,lastProcess));
                    lastProcess = tamirIsEmriModel.tamir6.ProcessNo??55;
                    var tamir5 = connection.Execute(SqlQueryRepo.InsertTamirIsEmri_processFlowTamir5(newLotNot, tamirIsEmriModel, lastProcess));
                    lastProcess = tamirIsEmriModel.tamir5.ProcessNo ?? 28;
                    if (tamirIsEmriModel.tamir4.ProcessNo != null)
                    {
                        var tamir4 = connection.Execute(SqlQueryRepo.InsertTamirIsEmri_processFlowTamir4(newLotNot, tamirIsEmriModel, lastProcess));
                        lastProcess = tamirIsEmriModel.tamir4.ProcessNo??0;
                    }
                    if (tamirIsEmriModel.tamir3.ProcessNo != null)
                    {
                        var tamir3 = connection.Execute(SqlQueryRepo.InsertTamirIsEmri_processFlowTamir3(newLotNot, tamirIsEmriModel, lastProcess));
                        lastProcess = tamirIsEmriModel.tamir3.ProcessNo ?? 0;
                    }

                    if (tamirIsEmriModel.tamir2.ProcessNo != null)
                    {
                        var tamir2 = connection.Execute(SqlQueryRepo.InsertTamirIsEmri_processFlowTamir2(newLotNot, tamirIsEmriModel, lastProcess));
                        lastProcess = tamirIsEmriModel.tamir2.ProcessNo ?? 0;
                    }
                    if (tamirIsEmriModel.tamir1.ProcessNo != null)
                    {
                        var tamir1 = connection.Execute(SqlQueryRepo.InsertTamirIsEmri_processFlowTamir1(newLotNot, tamirIsEmriModel, lastProcess));
                        lastProcess = tamirIsEmriModel.tamir1.ProcessNo ?? 0;
                    }
                }
                return newLotNot;
            }

        }


      
    }
}
