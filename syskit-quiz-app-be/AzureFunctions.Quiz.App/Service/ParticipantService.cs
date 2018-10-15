using AzureFunctions.Quiz.App.DTO;
using AzureFunctions.Quiz.App.Utils;
using AzureFunctions.Quiz.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AzureFunctions.Quiz.App.Exceptions;

namespace AzureFunctions.Quiz.App.Service
{
    public class ParticipantService
    {
        public async Task<ParticipantResultDTO> InsertNewTestResults(TestDTO test)
        {
            using (var dbContext = DbContextFactory.Instance.Context)
            {
                var surveyId = AppSettings.SurveyId;
                var participantEmail = test.Participant.Email.Trim();
                if (dbContext.Participants.FirstOrDefault(x => x.Email.Equals(participantEmail, StringComparison.OrdinalIgnoreCase) && x.SurveyId == surveyId) != null)
                {
                    throw new ParticipantAlreadyPlayedException();
                }

                int numberOfCorrectAnswers = 0;
                var newParticipant = dbContext.Participants.Add(new Participant() {
                    Name = test.Participant.Name,
                    Email = participantEmail,
                    Course = test.Participant.Course,
                    EnrollmentYear = test.Participant.EnrollmentYear,
                    SurveyId = surveyId,
                    CategoryId = test.CategoryId
                });

                var questionAnswerIds = test.Answers.Select(x => x.AnswerId).ToList();
                var questionsIds = test.Answers.Select(x => x.QuestionId).ToList();

                var questionCorrectAnswersLookup = dbContext.Questions.Where(x => questionsIds.Contains(x.Id)).Select(x => x.CorrectAnswerId).ToList();
                var questionAnswers = dbContext.QuestionAnswers.Where(x => questionAnswerIds.Contains(x.Id)).ToList();

                foreach (var questionAnswer in questionAnswers) {
                    newParticipant.QuestionAnswers.Add(questionAnswer);
                    if (questionCorrectAnswersLookup.Contains(questionAnswer.Id)) {
                        numberOfCorrectAnswers++;
                    }
                }

                newParticipant.Result = Decimal.Round((decimal)numberOfCorrectAnswers / questionsIds.Count, 2);
                await dbContext.SaveChangesAsync();

                return new ParticipantResultDTO()
                {
                    PrizeTreshold = AppSettings.PrizeTreshold,
                    CorrectAnswers = numberOfCorrectAnswers,
                    NumberOfQuestions = questionsIds.Count
                };
            }
        }

        public List<ParticipantInfoDTO> GetAllParticipants(int surveyId)
        {
            using (var dbContext = DbContextFactory.Instance.Context)
            {
                return dbContext.Participants.Where(x => x.SurveyId == surveyId).OrderByDescending(x => x.Id).Select(x => new ParticipantInfoDTO()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Email = x.Email,
                    Course = x.Course,
                    EnrollmentYear = x.EnrollmentYear,
                    Result = x.Result,
                    CategoryId = x.CategoryId ?? -1
                }).ToList();
            }
        }
    }
}
