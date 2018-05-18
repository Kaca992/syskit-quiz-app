﻿using AzureFunctions.Quiz.App.DTO;
using AzureFunctions.Quiz.App.Utils;
using AzureFunctions.Quiz.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AzureFunctions.Quiz.App.Service
{
    public class ParticipantService
    {
        public async Task<ParticipantResultDTO> InsertNewTestResults(TestDTO test)
        {
            using (var dbContext = DbContextFactory.Instance.Context)
            {
                int numberOfCorrectAnswers = 0;
                var newParticipant = dbContext.Participants.Add(new Participant() {
                    Name = test.Participant.Name,
                    Email = test.Participant.Email,
                    Course = test.Participant.Course,
                    EnrollmentYear = test.Participant.EnrollmentYear
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
                    CorrectAnswers = numberOfCorrectAnswers,
                    NumberOfQuestions = questionsIds.Count
                };
            }
        }

        public List<ParticipantInfoDTO> GetAllParticipants()
        {
            using (var dbContext = DbContextFactory.Instance.Context)
            {
                return dbContext.Participants.OrderByDescending(x => x.Result).ThenBy(x => x.Name).Select(x => new ParticipantInfoDTO()
                {
                    Name = x.Name,
                    Email = x.Email,
                    Course = x.Course,
                    EnrollmentYear = x.EnrollmentYear,
                    Result = x.Result
                }).ToList();
            }
        }
    }
}
