using SagHidrolik.Quality.Models.ViewModesl;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using SagHidrolik.Quality.Models.SqlRepository;
using Dapper;

namespace SagHidrolik.Quality.DataAccesslayer.Review
{
    public class ReviewData
    {

        public static async Task<IEnumerable<ReviewViewModel>> GetAllReview(RequestQuery requestQuery)
        {
            requestQuery.pageNumber = (requestQuery.pageNumber - 1) * requestQuery.pageSize;
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<ReviewViewModel>(SqlQueryRepo.GetAllReview(requestQuery));
                return list;
            }
        }

        public static async Task<IEnumerable<int>> GetAllReviewCount()
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.QueryAsync<int>(SqlQueryRepo.GetAllReviewCount);
                return count;
            }
        }

        public static async Task<ReviewViewModel> GetReviewDetails(int ncId)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var model = await connection.QueryFirstAsync<ReviewViewModel>(SqlQueryRepo.GetReviewDetails(ncId));
                if(model!=null)
                {
                   var OpenName= GetOpenByName(model.OpenById);
                    model.OpenByName = OpenName.Result;
                }
                return model;
            }
        }

        public static async Task<string> GetOpenByName(int openByID)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var name = await connection.QueryFirstAsync<string>(SqlQueryRepo.GetAllReviewCount);
                return name;
            }
        }

    }
}
