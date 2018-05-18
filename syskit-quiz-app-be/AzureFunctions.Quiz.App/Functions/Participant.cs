using System;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using AzureFunctions.Quiz.App.DTO;
using AzureFunctions.Quiz.App.Service;
using AzureFunctions.Quiz.App.Utils;
using AzureFunctions.Quiz.Model;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;

namespace AzureFunctions.Quiz.App.Functions
{
    public static class ParticipantFunctions
    {
        /// <summary>
        /// add new participant
        /// </summary>
        /// <param name="req"></param>
        /// <param name="log"></param>
        /// <returns></returns>
        [FunctionName("AddParticipant")]
        public static async Task<HttpResponseMessage> AddParticipant([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "participant")]HttpRequestMessage req, TraceWriter log)
        {
            log.Info("C# HTTP Add Participant trigger function processed a request.");
            var participantService = new ParticipantService();

            try
            {
                var newTestResult = await req.Content.ReadAsAsync<TestDTO>();
                var result = await participantService.InsertNewTestResults(newTestResult);
                return JsonHelpers.CreateResponse(result);
            }
            catch (Exception e)
            {
                return req.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }

        /// <summary>
        /// get all participants
        /// </summary>
        /// <param name="req"></param>
        /// <param name="log"></param>
        /// <returns></returns>
        [FunctionName("GetParticipants")]
        public static HttpResponseMessage GetParticipants([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "participant")]HttpRequestMessage req, TraceWriter log)
        {
            log.Info("C# HTTP Get Participants trigger function processed a request.");
            var participantService = new ParticipantService();

            try
            {
                return JsonHelpers.CreateResponse(participantService.GetAllParticipants());
            }
            catch (Exception e)
            {
                log.Error(e.Message);
                return JsonHelpers.CreateResponse(e, HttpStatusCode.InternalServerError);
            }
        }
    }
}
