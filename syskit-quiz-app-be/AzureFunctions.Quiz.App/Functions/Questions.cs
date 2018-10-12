using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using AzureFunctions.Quiz.App.DTO;
using AzureFunctions.Quiz.App.Service;
using AzureFunctions.Quiz.App.Utils;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;

namespace AzureFunctions.Quiz.App.Functions
{
    public static class QuestionsFunctions
    {
        [FunctionName("AddQuestions")]
        public static async Task<HttpResponseMessage> AddQuestions([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "questions")]HttpRequestMessage req, TraceWriter log)
        {
            log.Info("C# HTTP Add Questions trigger function processed a request.");

            try
            {
                var newQuestions = await req.Content.ReadAsAsync<List<NewQuestionsDTO>>();
                var questionService = new QuestionService();
                await questionService.InsertNewQuestions(newQuestions);
            }
            catch (ArgumentException arg)
            {
                return req.CreateErrorResponse(HttpStatusCode.BadRequest, arg.Message);
            }
            catch (Exception e)
            {
                return req.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }

            return req.CreateResponse(HttpStatusCode.OK, "New Questions Added");
        }

        [FunctionName("GetQuestions")]
        public static async Task<HttpResponseMessage> GetQuestions([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "questions/list")]HttpRequestMessage req, TraceWriter log)
        {
            log.Info("C# HTTP Get Questions trigger function processed a request.");

            try
            {
                var questionRequest = await req.Content.ReadAsAsync<QuestionRequestDTO>();
                var questionService = new QuestionService();
                return JsonHelpers.CreateResponse(questionService.GetQuestions(questionRequest.Number, questionRequest.Categories));
            }
            catch (Exception e)
            {
                log.Error(e.Message);
                return JsonHelpers.CreateResponse(e, HttpStatusCode.InternalServerError);
            }
        }
    }
}
