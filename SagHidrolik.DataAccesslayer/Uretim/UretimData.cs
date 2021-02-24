
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Linq;
using SagHidrolik.Models.ViewModesl;
using SagHidrolik.Models.SqlRepository;
using SagHidrolik.DataAccesslayer.Stok;

namespace SagHidrolik.DataAccesslayer.Uretim
{
    public static class UretimData
    {


        #region Uretim Başlam

        public static async Task<IEnumerable<ProcessFlowViewModel>> GetProcessFlowInUretim(RequestQuery requestQuery)
        {
            var stkList = StokReadingData.GetStokkenByStkList(requestQuery).Result;
            List<ProcessFlowViewModel> processFlowViewModelsList = new List<ProcessFlowViewModel>(); ; 
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
                var list = await connection.QueryAsync<ProcessFlowViewModel>(SqlQueryRepo.GetProceesFlow(requestQuery));
                foreach (var item in list)
                {
                    var dboStokgen = stkList.Where(x => x.P_ID == item.PartNo_ID).SingleOrDefault();

                    if (dboStokgen != null)
                    {
                        item.STK = dboStokgen.Stk;
                        processFlowViewModelsList.Add(item);
                    }

                }
                processFlowViewModelsList= processFlowViewModelsList.Skip(requestQuery.pageNumber).Take(requestQuery.pageSize).ToList();
                return processFlowViewModelsList;
            }
        }
    
        public static async Task<IEnumerable<AktifOperatorViewModel>> GetAktiveOperators()
        {
            //requestQuery.pageNumber = 5;
            //requestQuery.pageSize = 5;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<AktifOperatorViewModel>(SqlQueryRepo.GetAktiveOperators);
                return list;
            }
        }
    
        public static async Task<IEnumerable<MachineViewModel>> GetAktiveMachine()
        {
            //requestQuery.pageNumber = 5;
            //requestQuery.pageSize = 5;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<MachineViewModel>(SqlQueryRepo.GetAktiveMachine);

                return list;
            }
        }


        public static async Task<IEnumerable<MachineViewModel>> GetMachineNameByMachineNo( string Machine_Id)
        {
            //requestQuery.pageNumber = 5;
            //requestQuery.pageSize = 5;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<MachineViewModel>(SqlQueryRepo.GetMachineNameByMachineNo(Machine_Id));

                return list;
            }
        }


        public static async Task<IEnumerable<OperatorPolivalanceViewModel>> GetOperatorPolivalance(OperatorPolivalanceViewModel operatorPolivalanceViewModel)
        {
       
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<OperatorPolivalanceViewModel>(SqlQueryRepo.GetOperatorPolivalance(operatorPolivalanceViewModel));

                return list;
            }
        }



        public static async Task<IEnumerable<ProcessFlowDetailsViewModel>> CheckFlowIdByFinishTimeInFlowDetails( string flow_ID)
        {
            //requestQuery.pageNumber = 5;
            //requestQuery.pageSize = 5;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<ProcessFlowDetailsViewModel>(SqlQueryRepo.CheckFlowIdByFinishTimeInFlowDetails(flow_ID));
                return list;
            }
        }


        public static async Task<ProcessFlowDetailsViewModel> StartIsEmriAndWriteToFlowDetails(ProcessFlowDetailsViewModel processFlowDetailsViewModel)
        {
            //requestQuery.pageNumber = 5;
            //requestQuery.pageSize = 5;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                try
                {
                    await connection.OpenAsync();
                    var x = DateTime.Now.GetDateTimeFormats().ToString();

                    processFlowDetailsViewModel.Start_time = DateTime.Now.ToString();
                    var list = await connection.QueryAsync<ProcessFlowDetailsViewModel>(SqlQueryRepo.StartIsEmriAndWriteToFlowDetails(processFlowDetailsViewModel));
                    return (processFlowDetailsViewModel);
                }
                catch (Exception)
                {
                    throw;
                }

            }
        }
        #endregion

        #region uretimBitir

        public static async Task<IEnumerable<ProcessFlowClose>> GetProcessFlowClose(RequestQuery requestQuery)
        {
            var stkList = StokReadingData.GetStokkenByStkList(requestQuery).Result;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
                var list = await connection.QueryAsync<ProcessFlowClose>(SqlQueryRepo.GetProcessFlowClose(requestQuery));
                List<ProcessFlowClose> ProcessFlowCloseList = new List<ProcessFlowClose>();
                foreach (var item in list)
                {
                    var dboStokgen = stkList.Where(x => x.P_ID == item.PartNo_ID).SingleOrDefault();

                    if (dboStokgen != null)
                    {
                        item.STK = dboStokgen.Stk;
                        ProcessFlowCloseList.Add(item);
                    }

                }
                return ProcessFlowCloseList;
            }
        }
   
        public static async Task<IEnumerable<RejectViewModel>> GetFire(int Reject_ID)
        {
            //requestQuery.pageNumber = 5;
            //requestQuery.pageSize = 5;

            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<RejectViewModel>(SqlQueryRepo.GetFire(Reject_ID));

                return list;
            }
        }


        public static async Task <string> UretimBitirConfirm(UretimBitirViewModel uretimBitirViewModel)
        {
            var fire1 = uretimBitirViewModel.fire1.inpValue;
            var fire2 = uretimBitirViewModel.fire2.inpValue;
            var tamir = uretimBitirViewModel.tamir.inpValue;
            var Miktar = uretimBitirViewModel.Miktar;
            if (fire1 == null) fire1 = 0;
            if (fire2 == null) fire2 = 0;
            if (tamir == null) tamir = 0;
            if (Miktar == 0) Miktar = 0;



            try
            {
                using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
                {
                    if (uretimBitirViewModel.fire1.inpValue == null) uretimBitirViewModel.fire1.inpValue = 0;
                    if (uretimBitirViewModel.fire2.inpValue == null) uretimBitirViewModel.fire2.inpValue = 0;
                    if (uretimBitirViewModel.tamir.inpValue == null) uretimBitirViewModel.tamir.inpValue = 0;
                    if (uretimBitirViewModel.durus.dk == null) uretimBitirViewModel.durus.dk = 0;


                    await connection.OpenAsync();
                    var list = connection.Execute(SqlQueryRepo.uretimBitir1_processflow(uretimBitirViewModel));
                    var list2 = connection.Execute(SqlQueryRepo.uretimBitir2_processflowDetails(uretimBitirViewModel));
                    ProcessFlowViewModel processFlowViewModel = connection.QuerySingle<ProcessFlowViewModel>(SqlQueryRepo.uretimBitir3_processFlow(uretimBitirViewModel.flow_Id));
                    var CurrentProcess = processFlowViewModel.ProcessNo_ID;
                    var WoNo = processFlowViewModel.ProductOrder_ID;
                    var NextProcess = processFlowViewModel.ProcessNo_next;
                    if (NextProcess == null) NextProcess = "0";
                    var processFlowTableUpdate = connection.Execute(SqlQueryRepo.uretimBitir4_ProcessPlanFollowTable(uretimBitirViewModel.Miktar, uretimBitirViewModel.lotNo, CurrentProcess));
                    if (NextProcess == "0" || NextProcess == null)
                    {

                        var ProductionOrdersQty1 = connection.Execute(SqlQueryRepo.uretimBitir5_ProductionOrdersQty1(uretimBitirViewModel.Miktar, WoNo));
                        var ProductionOrdersQty2 = connection.Execute(SqlQueryRepo.uretimBitir6_ProductionOrdersQty2(fire1, fire2, tamir, WoNo));
                        var ProductionOrdersStatus = connection.Execute(SqlQueryRepo.uretimBitir6_ProductionOrdersStatus());
                    }
                    else
                    {
                        var ProductionOrdersQty2 = connection.Execute(SqlQueryRepo.uretimBitir6_ProductionOrdersQty2(fire1, fire2, tamir, WoNo));
                        var processFlowWithNextProcess = connection.Execute(SqlQueryRepo.uretimBitir7ProcessFlowWithNextProcess(Miktar, WoNo, NextProcess));
                    }

                    return "done";

                }
            }
            catch (Exception e )
            {
                throw e;
                return "not";
            }


        }
        #endregion 


    }
}
