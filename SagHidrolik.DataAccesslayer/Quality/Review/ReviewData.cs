
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

using Dapper;
using SagHidrolik.Models.SqlRepository;
using SagHidrolik.Models.ViewModesl;

namespace SagHidrolik.DataAccesslayer.Quality.Review
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
                var name = await connection.QueryFirstAsync<string>(SqlQueryRepo.GetOpenByName(openByID));
        
                return name;
            }
        }


        public static async Task<IEnumerable<ActionListViewModel>> GetImmediateAction(int ncId)
        {
         
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var list = await connection.QueryAsync<ActionListViewModel>(SqlQueryRepo.GetImmediateAction(ncId));

                if (list != null)
                {
                    foreach (var item in list)
                    {
                        if (item.ResponsibleId != 0)
                        item.ResposibleName = GetOpenByName(item.ResponsibleId).Result;
                    }
                }
                return list;
            }
        }
        public static async Task<IEnumerable<DocumnetViewModel>> GetDocumnetList(int ncId)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var name = await connection.QueryAsync<DocumnetViewModel>(SqlQueryRepo.GetDocumnetList(ncId));

                return name;
            }
        }

        public static async Task<IEnumerable<DocumentControlViewModel>> GetDocumentControlList(int ncId)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var name = await  connection.QueryAsync<DocumentControlViewModel>(SqlQueryRepo.GetDocumentControlList(ncId));
                return name;
            }
        }



        public static async Task<string> SaveReviewDetalis(ReviewViewModel reviewViewModel)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                 int c=  await connection.ExecuteAsync(SqlQueryRepo.SaveReviewDetalis(reviewViewModel));
                if (c > 0) return "done";
                return "non completed";
               
            }
        }
        public static async Task<int> DeleteDocument(int docId)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.DeleteDocument(docId));
                return count;
            }
        }

        public static async Task<int> AddDocument(DocumnetViewModel DocumnetViewModel)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.AddDocument(DocumnetViewModel));
                return count;
            }
        }

        public static async Task<int> DeleteAction(int actionId)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.DeleteAction(actionId));
                return count;
            }
        }

        public static async Task<int> AddAction(ActionListViewModel ac)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.AddAction(ac));
                return count;
            }
        }

        public static async Task<int> UpdateAction(ActionListViewModel ac)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.UpdateAction(ac));
                return count;
            }
        }


        public static async Task<int> AddDocumentControl(DocumentControlViewModel dc)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.AddDocumentControl(dc));
                return count;
            }
        }


        public static async Task<int> DeleteDocumentControl(int  docCoId)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.DeleteDocumentControl(docCoId));
                return count;
            }
        }



        public static async Task<int> UpdateDocumentControl(DocumentControlViewModel doc)
        {
            using (var connection = new SqlConnection(SqlQueryRepo.connctionString_SAG_PRODUCTION))
            {
                await connection.OpenAsync();
                var count = await connection.ExecuteAsync(SqlQueryRepo.UpdateDocumentControl(doc));
                return count;
            }
        }

    }
}
