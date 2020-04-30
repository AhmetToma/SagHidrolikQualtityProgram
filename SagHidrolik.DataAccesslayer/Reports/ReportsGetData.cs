using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Dapper;
using System;
using SagHidrolik.Models.SqlRepository;
using SagHidrolik.Models.ViewModesl;
using SagHidrolik.DataAccesslayer.Stok;
using System.Linq;

namespace SagHidrolik.Quality.DataAccesslayer.Reports
{
    public static class ReportsData
    {

        #region Production
        public static async Task<IEnumerable<dynamic>> GetProcutionReport(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            IEnumerable<dynamic> list = new List<dynamic>();
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();

                if (requestQuery.year == "" && requestQuery.month == "")
                {
                    list = await connection.QueryAsync<object>(SqlQueryRepo.GetProcutionReportWithoutFilter(requestQuery));

                }
                else if (requestQuery.month == "")
                {
                    var startTime = new DateTime(int.Parse(requestQuery.year), 1, 1);
                    var lastDay = DateTime.DaysInMonth(startTime.Year, startTime.Month);
                    var startAt = $"1-1-{requestQuery.year}";
                    var endAt = $"{lastDay}-12-{requestQuery.year}";
                    list = await connection.QueryAsync<dynamic>(SqlQueryRepo.GetProcutionReportWithFilter(requestQuery, startAt, endAt));
                }
                else if (requestQuery.year == "")
                {

                    var startTime = new DateTime(DateTime.Now.Year, int.Parse(requestQuery.month), 1);
                    var lastDay = DateTime.DaysInMonth(startTime.Year, startTime.Month);
                    var startAt = $"1-{requestQuery.month}-{DateTime.Now.Year}";
                    var endAt = $"{lastDay}-{requestQuery.month}-{DateTime.Now.Year}";
                    list = await connection.QueryAsync<dynamic>(SqlQueryRepo.GetProcutionReportWithFilter(requestQuery, startAt, endAt));
                }
                else
                {
                    var startTime = new DateTime(int.Parse(requestQuery.year), int.Parse(requestQuery.month), 1);
                    var lastDay = DateTime.DaysInMonth(startTime.Year, startTime.Month);
                    var startAt = $"1-{requestQuery.month}-{requestQuery.year}";
                    var endAt = $"{lastDay}-{requestQuery.month}-{requestQuery.year}";
                    list = await connection.QueryAsync<dynamic>(SqlQueryRepo.GetProcutionReportWithFilter(requestQuery, startAt, endAt));
                }
                return list;
            }

        }
        public static async Task<IEnumerable<dynamic>> GetProcutionReportCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.QueryAsync<dynamic>(SqlQueryRepo.GetProcutionReportCount());
                return count;
            }
        }
        #endregion


        #region Production Details Report
        public static async Task<IEnumerable<ProcutionDetailsViewModel>> GetProcutionDetailsReport(RequestQuery requestQuery)
        {
            var stkList = StokReadingData.GetStokkenByStkList(requestQuery).Result;
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            IEnumerable<ProcutionDetailsViewModel> list = new List<ProcutionDetailsViewModel>();
            List<ProcutionDetailsViewModel> newList = new List<ProcutionDetailsViewModel>();
            if (stkList.Count() <= 0) return newList;
            else
            {
                string values = "";
                string query = "";
                string startAt = "";
                string endAt = "";
                foreach (var item in stkList)
                {
                    values = values + "'" + item.P_ID + "'" + ",";
                }
                values = values.Substring(0, values.Length - 1);

                if (requestQuery.year == "" && requestQuery.month == "")
                {
                    startAt = "01-01-2016";
                    endAt = DateTime.Now.ToString("dd-MM-yyyy");
                    query = SqlQueryRepo.GetProcutionDetailsReport(requestQuery, startAt, endAt, values);
                }
                else if (requestQuery.month == "")
                {
                    var startTime = new DateTime(int.Parse(requestQuery.year), 1, 1);
                    var lastDay = DateTime.DaysInMonth(startTime.Year, startTime.Month);
                    startAt = $"1-1-{requestQuery.year}";
                    endAt = $"{lastDay}-12-{requestQuery.year}";
                    query = SqlQueryRepo.GetProcutionDetailsReport(requestQuery, startAt, endAt, values);

                }
                else if (requestQuery.year == "")
                {

                    var startTime = new DateTime(DateTime.Now.Year, int.Parse(requestQuery.month), 1);
                    var lastDay = DateTime.DaysInMonth(startTime.Year, startTime.Month);
                    startAt = $"1-{requestQuery.month}-{DateTime.Now.Year}";
                    endAt = $"{lastDay}-{requestQuery.month}-{DateTime.Now.Year}";
                    query = SqlQueryRepo.GetProcutionDetailsReport(requestQuery, startAt, endAt, values);
                }
                else
                {
                    var startTime = new DateTime(int.Parse(requestQuery.year), int.Parse(requestQuery.month), 1);
                    var lastDay = DateTime.DaysInMonth(startTime.Year, startTime.Month);
                    startAt = $"1-{requestQuery.month}-{requestQuery.year}";
                    endAt = $"{lastDay}-{requestQuery.month}-{requestQuery.year}";
                    query = SqlQueryRepo.GetProcutionDetailsReport(requestQuery, startAt, endAt, values);
                }
                using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
                {
                    await connection.OpenAsync();
                    list = await connection.QueryAsync<ProcutionDetailsViewModel>(query);
                }
                foreach (var item in list)
                {
                    var dboStokgen = stkList.Where(x => x.P_ID == item.PartNo_ID).SingleOrDefault();
                    if (dboStokgen != null)
                    

                        item.Stk = dboStokgen.Stk;
                        item.FinishTimeAsString=item.FinishTime.ToString("dd-MM-yyyy");
                    newList.Add(item);
                    }
                }
            return newList;
        }
        public static async Task<int> GetProcutionDetailsReportCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.QueryFirstAsync<int>(SqlQueryRepo.GetProcutionDetailsReportCount());
                return count;
            }
        }
        #endregion


        #region Defect
        public static async Task<IEnumerable<dynamic>> GeDefectReport(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;

            IEnumerable<dynamic> list = new List<dynamic>();

            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();

                if (requestQuery.year == "" && requestQuery.month == "")
                {
                    list = await connection.QueryAsync<dynamic>(SqlQueryRepo.GeDefectReportWithoutFilter(requestQuery));
                    int x = 5;

                }
                else if (requestQuery.month == "")
                {
                    var startTime = new DateTime(int.Parse(requestQuery.year), 1, 1);
                    var lastDay = DateTime.DaysInMonth(startTime.Year, startTime.Month);
                    var startAt = $"1-1-{requestQuery.year}";
                    var endAt = $"{lastDay}-12-{requestQuery.year}";
                    list = await connection.QueryAsync<dynamic>(SqlQueryRepo.GeDefectReportWithtFilter(requestQuery, startAt, endAt));
                }
                else if (requestQuery.year == "")
                {

                    var startTime = new DateTime(DateTime.Now.Year, int.Parse(requestQuery.month), 1);
                    var lastDay = DateTime.DaysInMonth(startTime.Year, startTime.Month);
                    var startAt = $"1-{requestQuery.month}-{DateTime.Now.Year}";
                    var endAt = $"{lastDay}-{requestQuery.month}-{DateTime.Now.Year}";
                    list = await connection.QueryAsync<dynamic>(SqlQueryRepo.GeDefectReportWithtFilter(requestQuery, startAt, endAt));
                }
                else
                {
                    var startTime = new DateTime(int.Parse(requestQuery.year), int.Parse(requestQuery.month), 1);
                    var lastDay = DateTime.DaysInMonth(startTime.Year, startTime.Month);
                    var startAt = $"1-{requestQuery.month}-{requestQuery.year}";
                    var endAt = $"{lastDay}-{requestQuery.month}-{requestQuery.year}";
                    list = await connection.QueryAsync<dynamic>(SqlQueryRepo.GeDefectReportWithtFilter(requestQuery, startAt, endAt));
                }
                return list;
            }

        }
        public static async Task<IEnumerable<dynamic>> GeDefectReportCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.QueryAsync<dynamic>(SqlQueryRepo.GeDefectReportCount());
                return count;
            }
        }
        #endregion

        #region Defect Details
        public static async Task<IEnumerable<DefectDetailsViewModel>> GetDefectDetails(RequestQuery requestQuery)
        {
            var stkList = StokReadingData.GetStokkenByStkList(requestQuery).Result;
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            IEnumerable<DefectDetailsViewModel> list = new List<DefectDetailsViewModel>();
            List<DefectDetailsViewModel> newList = new List<DefectDetailsViewModel>();
            if (stkList.Count() <= 0) return newList;
            else
            {
                string values = "";
                string query = "";
                foreach (var item in stkList)
                {
                    values = values + "'" + item.P_ID + "'" + ",";
                }
                values = values.Substring(0, values.Length - 1);

                if (requestQuery.year == "" && requestQuery.month == "")
                {
                    query = SqlQueryRepo.GetDefectDetailsWithoutFilter(requestQuery, values);

                }
                else if (requestQuery.month == "")
                {
                    var startTime = new DateTime(int.Parse(requestQuery.year), 1, 1);
                    var lastDay = DateTime.DaysInMonth(startTime.Year, startTime.Month);
                    var startAt = $"1-1-{requestQuery.year}";
                    var endAt = $"{lastDay}-12-{requestQuery.year}";
                    query = SqlQueryRepo.GetDefectDetailsWithFilter(requestQuery, values, startAt, endAt);

                }
                else if (requestQuery.year == "")
                {

                    var startTime = new DateTime(DateTime.Now.Year, int.Parse(requestQuery.month), 1);
                    var lastDay = DateTime.DaysInMonth(startTime.Year, startTime.Month);
                    var startAt = $"1-{requestQuery.month}-{DateTime.Now.Year}";
                    var endAt = $"{lastDay}-{requestQuery.month}-{DateTime.Now.Year}";
                    query = SqlQueryRepo.GetDefectDetailsWithFilter(requestQuery, values, startAt, endAt);
                }
                else
                {
                    var startTime = new DateTime(int.Parse(requestQuery.year), int.Parse(requestQuery.month), 1);
                    var lastDay = DateTime.DaysInMonth(startTime.Year, startTime.Month);
                    var startAt = $"1-{requestQuery.month}-{requestQuery.year}";
                    var endAt = $"{lastDay}-{requestQuery.month}-{requestQuery.year}";
                    query = SqlQueryRepo.GetDefectDetailsWithFilter(requestQuery, values, startAt, endAt);
                }

                using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
                {
                    await connection.OpenAsync();
                    list = await connection.QueryAsync<DefectDetailsViewModel>(query);

                }
                foreach (var item in list)
                {
                    var dboStokgen = stkList.Where(x => x.P_ID == item.PartNo_ID).SingleOrDefault();
                    if (dboStokgen != null)
                    {
                        item.Stk = dboStokgen.Stk;
                        item.finishTimeAsString = item.Finish_time.ToString("dd-MM-yyyy");
                        newList.Add(item);
                    }
                }
                return newList;
            }
        }
        public static async Task<int> GetDefectDetailsCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.QueryFirstAsync<int>(SqlQueryRepo.GetDefectDetailsCount());
                return count;
            }
        }
        #endregion


        #region ReworK Report
        public static async Task<IEnumerable<dynamic>> GetReworkReport(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            IEnumerable<dynamic> list = new List<dynamic>();
            string query = "";
            string startAt = "";
            string endAt = "";
            if (requestQuery.year == "" && requestQuery.month == "")
            {
                startAt = "01-01-1970";
                endAt = DateTime.Now.ToString("dd-MM-yyyy");
                query = SqlQueryRepo.GetReworkReport(requestQuery, startAt, endAt);
            }
            else if (requestQuery.month == "")
            {
                var startTime = new DateTime(int.Parse(requestQuery.year), 1, 1);
                var lastDay = DateTime.DaysInMonth(startTime.Year, startTime.Month);
                startAt = $"1-1-{requestQuery.year}";
                endAt = $"{lastDay}-12-{requestQuery.year}";
                query = SqlQueryRepo.GetReworkReport(requestQuery, startAt, endAt);

            }
            else if (requestQuery.year == "")
            {

                var startTime = new DateTime(DateTime.Now.Year, int.Parse(requestQuery.month), 1);
                var lastDay = DateTime.DaysInMonth(startTime.Year, startTime.Month);
                startAt = $"1-{requestQuery.month}-{DateTime.Now.Year}";
                endAt = $"{lastDay}-{requestQuery.month}-{DateTime.Now.Year}";
                query = SqlQueryRepo.GetReworkReport(requestQuery, startAt, endAt);
            }
            else
            {
                var startTime = new DateTime(int.Parse(requestQuery.year), int.Parse(requestQuery.month), 1);
                var lastDay = DateTime.DaysInMonth(startTime.Year, startTime.Month);
                startAt = $"1-{requestQuery.month}-{requestQuery.year}";
                endAt = $"{lastDay}-{requestQuery.month}-{requestQuery.year}";
                query = SqlQueryRepo.GetReworkReport(requestQuery, startAt, endAt);
            }
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                list = await connection.QueryAsync<dynamic>(query);
            }
            return list;
        }
        public static async Task<IEnumerable<dynamic>> GetReworkReportCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.QueryAsync<dynamic>(SqlQueryRepo.GetReworkReportCount());
                return count;
            }
        }
        #endregion

        #region Rework Details Report
        public static async Task<IEnumerable<dynamic>> GetReworkDetailsReport(RequestQuery requestQuery)
        {
            var stkList = StokReadingData.GetStokkenByStkList(requestQuery).Result;
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            IEnumerable<ReworkDetailsReport> list = new List<ReworkDetailsReport>();
            List<ReworkDetailsReport> newList = new List<ReworkDetailsReport>();
            if (stkList.Count() <= 0) return newList;
            else
            {
                string values = "";
                string query = "";
                string startAt = "";
                string endAt = "";
                foreach (var item in stkList)
                {
                    values = values + "'" + item.P_ID + "'" + ",";
                }
                values = values.Substring(0, values.Length - 1);
                
                if (requestQuery.year == "" && requestQuery.month == "")
                {
                    startAt = "01-01-1970";
                    endAt = DateTime.Now.ToString("dd-MM-yyyy");
                    query = SqlQueryRepo.GetReworkDetailsReport(requestQuery, startAt, endAt, values);
                }
                else if (requestQuery.month == "")
                {
                    var startTime = new DateTime(int.Parse(requestQuery.year), 1, 1);
                    var lastDay = DateTime.DaysInMonth(startTime.Year, startTime.Month);
                    startAt = $"1-1-{requestQuery.year}";
                    endAt = $"{lastDay}-12-{requestQuery.year}";
                    query = SqlQueryRepo.GetReworkDetailsReport(requestQuery, startAt, endAt, values);

                }
                else if (requestQuery.year == "")
                {

                    var startTime = new DateTime(DateTime.Now.Year, int.Parse(requestQuery.month), 1);
                    var lastDay = DateTime.DaysInMonth(startTime.Year, startTime.Month);
                    startAt = $"1-{requestQuery.month}-{DateTime.Now.Year}";
                    endAt = $"{lastDay}-{requestQuery.month}-{DateTime.Now.Year}";
                    query = SqlQueryRepo.GetReworkDetailsReport(requestQuery, startAt, endAt,values);
                }
                else
                {
                    var startTime = new DateTime(int.Parse(requestQuery.year), int.Parse(requestQuery.month), 1);
                    var lastDay = DateTime.DaysInMonth(startTime.Year, startTime.Month);
                    startAt = $"1-{requestQuery.month}-{requestQuery.year}";
                    endAt = $"{lastDay}-{requestQuery.month}-{requestQuery.year}";
                    query = SqlQueryRepo.GetReworkDetailsReport(requestQuery, startAt, endAt, values);
                }
                using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
                {
                    await connection.OpenAsync();
                    list = await connection.QueryAsync<ReworkDetailsReport>(query);
                }
                foreach (var item in list)
                {
                    var dboStokgen = stkList.Where(x => x.P_ID == item.PartNo_ID).SingleOrDefault();
                    if (dboStokgen != null)
                    {
                        item.Stk = dboStokgen.Stk;
                        item.finishTimeAsString = item.FinishTime.ToString("dd-MM-yyyy");
                        newList.Add(item);
                    }
                }
            }
            return newList;
        }
        public static async Task<int> GetReworkDetailsReportCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.QueryFirstAsync<int>(SqlQueryRepo.GetReworkDetailsReportCount());
                return count;
            }
        }
        #endregion


        #region LostQtY
        public static async Task<IEnumerable<LostQtyViewModel>> GetLostQtyReport(RequestQuery requestQuery)
        {
            var stkList = StokReadingData.GetStokkenByStkList(requestQuery).Result;
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            IEnumerable<LostQtyViewModel> list = new List<LostQtyViewModel>();
            List<LostQtyViewModel> newList = new List<LostQtyViewModel>();
            if (stkList.Count() <= 0) return newList;
            else
            {
                using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
                {
                    await connection.OpenAsync();
                    list = await connection.QueryAsync<LostQtyViewModel>(SqlQueryRepo.GetLostQtyReport(requestQuery));

                }
                foreach (var item in list)
                {
                    var dboStokgen = stkList.Where(x => x.P_ID == item.PartNo_ID).SingleOrDefault();
                    if (dboStokgen != null)
                    {
                        item.Stk = dboStokgen.Stk;
                        newList.Add(item);
                    }
                }
                return newList;
            }
        }
        public static async Task<int> GetLostQtyReportCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.QueryFirstAsync<int>(SqlQueryRepo.GetLostQtyReportCount());
                return count;
            }
        }
        #endregion



        #region Supplier Pref 
        public static async Task<IEnumerable<SupplierPrefReportViewModel>> GetSupplierPerfReport(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
                string query = "";
                string startAt = "";
                string endAt = "";
                if (requestQuery.year == "" && requestQuery.month == "")
                {
                    startAt = "01-01-2016";
                    endAt = DateTime.Now.ToString("dd-MM-yyyy");
                    query = SqlQueryRepo.GetSupplierPerfReport(requestQuery, startAt, endAt);
                }
                else if (requestQuery.month == "")
                {
                    var startTime = new DateTime(int.Parse(requestQuery.year), 1, 1);
                    var lastDay = DateTime.DaysInMonth(startTime.Year, startTime.Month);
                    startAt = $"1-1-{requestQuery.year}";
                    endAt = $"{lastDay}-12-{requestQuery.year}";
                    query = SqlQueryRepo.GetSupplierPerfReport(requestQuery, startAt, endAt);

                }
                else if (requestQuery.year == "")
                {

                    var startTime = new DateTime(DateTime.Now.Year, int.Parse(requestQuery.month), 1);
                    var lastDay = DateTime.DaysInMonth(startTime.Year, startTime.Month);
                    startAt = $"1-{requestQuery.month}-{DateTime.Now.Year}";
                    endAt = $"{lastDay}-{requestQuery.month}-{DateTime.Now.Year}";
                    query = SqlQueryRepo.GetSupplierPerfReport(requestQuery, startAt, endAt);
                }
                else
                {
                    var startTime = new DateTime(int.Parse(requestQuery.year), int.Parse(requestQuery.month), 1);
                    var lastDay = DateTime.DaysInMonth(startTime.Year, startTime.Month);
                    startAt = $"1-{requestQuery.month}-{requestQuery.year}";
                    endAt = $"{lastDay}-{requestQuery.month}-{requestQuery.year}";
                    query = SqlQueryRepo.GetSupplierPerfReport(requestQuery, startAt, endAt);
                }
                using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
                {
                    await connection.OpenAsync();
                   var  list = await connection.QueryAsync<SupplierPrefReportViewModel>(query);
                return list;
                }
           
        }
        public static async Task<int> GetSupplierPerfReportCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var count = await connection.QueryFirstAsync<int>(SqlQueryRepo.GetSupplierPerfReportCount());
                return count;
            }
        }
        #endregion


        #region Customer Pref 
        public static async Task<IEnumerable<CustomerPerfViewModel>> GetCustomerperfReport(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            string query = "";
            string startAt = "";
            string endAt = "";
            if (requestQuery.year == "" && requestQuery.month == "")
            {
                startAt = "01-01-2016";
                endAt = DateTime.Now.ToString("dd-MM-yyyy");
                query = SqlQueryRepo.GetCustomerperfReport(requestQuery, startAt, endAt);
            }
            else if (requestQuery.month == "")
            {
                var startTime = new DateTime(int.Parse(requestQuery.year), 1, 1);
                var lastDay = DateTime.DaysInMonth(startTime.Year, startTime.Month);
                startAt = $"1-1-{requestQuery.year}";
                endAt = $"{lastDay}-12-{requestQuery.year}";
                query = SqlQueryRepo.GetCustomerperfReport(requestQuery, startAt, endAt);

            }
            else if (requestQuery.year == "")
            {

                var startTime = new DateTime(DateTime.Now.Year, int.Parse(requestQuery.month), 1);
                var lastDay = DateTime.DaysInMonth(startTime.Year, startTime.Month);
                startAt = $"1-{requestQuery.month}-{DateTime.Now.Year}";
                endAt = $"{lastDay}-{requestQuery.month}-{DateTime.Now.Year}";
                query = SqlQueryRepo.GetCustomerperfReport(requestQuery, startAt, endAt);
            }
            else
            {
                var startTime = new DateTime(int.Parse(requestQuery.year), int.Parse(requestQuery.month), 1);
                var lastDay = DateTime.DaysInMonth(startTime.Year, startTime.Month);
                startAt = $"1-{requestQuery.month}-{requestQuery.year}";
                endAt = $"{lastDay}-{requestQuery.month}-{requestQuery.year}";
                query = SqlQueryRepo.GetCustomerperfReport(requestQuery, startAt, endAt);
            }
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<CustomerPerfViewModel>(query);
                return list;
            }

        }
        public static async Task<int> GetCustomerperfReportCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_HIDROLIK_ByYear()))
            {
                await connection.OpenAsync();
                var count = await connection.QueryFirstAsync<int>(SqlQueryRepo.GetCustomerperfReportCount());
                return count;
            }
        }
        #endregion


        #region ProcessPlanReport  
        public static async Task<IEnumerable<ProcessPlanReportViewModel>> GetProcessPlanReport(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            string query = "";
            string startAt = "";
            string endAt = "";
            if (requestQuery.year == "" && requestQuery.month == "")
            {
                startAt = "01-01-2016";
                endAt = DateTime.Now.ToString("dd-MM-yyyy");
                query = SqlQueryRepo.GetProcessPlanReport(requestQuery, startAt, endAt);
            }
            else if (requestQuery.month == "")
            {
                var startTime = new DateTime(int.Parse(requestQuery.year), 1, 1);
                var lastDay = DateTime.DaysInMonth(startTime.Year, startTime.Month);
                startAt = $"1-1-{requestQuery.year}";
                endAt = $"{lastDay}-12-{requestQuery.year}";
                query = SqlQueryRepo.GetProcessPlanReport(requestQuery, startAt, endAt);

            }
            else if (requestQuery.year == "")
            {

                var startTime = new DateTime(DateTime.Now.Year, int.Parse(requestQuery.month), 1);
                var lastDay = DateTime.DaysInMonth(startTime.Year, startTime.Month);
                startAt = $"1-{requestQuery.month}-{DateTime.Now.Year}";
                endAt = $"{lastDay}-{requestQuery.month}-{DateTime.Now.Year}";
                query = SqlQueryRepo.GetProcessPlanReport(requestQuery, startAt, endAt);
            }
            else
            {
                var startTime = new DateTime(int.Parse(requestQuery.year), int.Parse(requestQuery.month), 1);
                var lastDay = DateTime.DaysInMonth(startTime.Year, startTime.Month);
                startAt = $"1-{requestQuery.month}-{requestQuery.year}";
                endAt = $"{lastDay}-{requestQuery.month}-{requestQuery.year}";
                query = SqlQueryRepo.GetProcessPlanReport(requestQuery, startAt, endAt);
            }
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<ProcessPlanReportViewModel>(query);
                return list;
            }

        }
        public static async Task<int> GetProcessPlanReportCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.QueryFirstAsync<int>(SqlQueryRepo.GetProcessPlanReportCount());
                return count;
            }
        }
        #endregion


    }
}
