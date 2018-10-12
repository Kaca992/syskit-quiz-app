using AzureFunctions.Quiz.App.DTO;
using AzureFunctions.Quiz.App.Utils;
using AzureFunctions.Quiz.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AzureFunctions.Quiz.App.Service
{
    public class QuestionService
    {
        private const int COMMON_ID = 3;
        public async Task InsertNewQuestions(List<NewQuestionsDTO> newQuestions)
        {
            if (newQuestions == null)
            {
                throw new ArgumentException();
            }

            using (var dbContext = DbContextFactory.Instance.Context)
            {
                // create new questions and answers
                Dictionary<Question, QuestionAnswer> correctQuestionsMappings = new Dictionary<Question, QuestionAnswer>();
                foreach (var newQuestion in newQuestions)
                {
                    QuestionAnswer correctAnswer = null;
                    var question = dbContext.Questions.Add(new Question()
                    {
                        QuestionText = newQuestion.QuestionText,
                        IsEnabled = true
                    });

                    foreach (var questionAnswer in newQuestion.Answers)
                    {
                        var answer = dbContext.QuestionAnswers.Add(new QuestionAnswer()
                        {
                            AnswerText = questionAnswer.AnswerText,
                            Question = question
                        });

                        if (questionAnswer.IsCorrectAnswer && correctAnswer != null)
                        {
                            throw new ArgumentException("Only one correct answer can be provided");
                        }
                        else if (questionAnswer.IsCorrectAnswer && correctAnswer == null)
                        {
                            correctAnswer = answer;
                        }
                    }

                    if (correctAnswer == null)
                    {
                        throw new ArgumentException($"No correct answers were provided for: {newQuestion.QuestionText}");
                    }

                    correctQuestionsMappings.Add(question, correctAnswer);
                }

                await dbContext.SaveChangesAsync();

                // insert correct answers
                foreach (var mapping in correctQuestionsMappings.AsEnumerable())
                {
                    mapping.Key.QuestionAnswer = mapping.Value;
                }

                await dbContext.SaveChangesAsync();
            }
        }

        public Dictionary<int, List<QuestionDTO>> GetQuestions(int number, IEnumerable<int> categories)
        {
            Dictionary<int, List<QuestionDTO>> questions = new Dictionary<int, List<QuestionDTO>>();
            using (var dbContext = DbContextFactory.Instance.Context)
            {
                foreach (var category in categories)
                {
                    questions.Add(category, new List<QuestionDTO>());
                    var allQuestions = dbContext.Questions.Include("QuestionAnswers").Where(x => x.IsEnabled && x.CategoryId == category || x.CategoryId == COMMON_ID).OrderBy(x => Guid.NewGuid()).Take(number);
                    foreach (var question in allQuestions)
                    {
                        var questionDTO = new QuestionDTO
                        {
                            Id = question.Id,
                            QuestionText = question.QuestionText,
                            Answers = new List<AnswerDTO>()
                        };

                        foreach (var questionAnswer in question.QuestionAnswers)
                        {
                            questionDTO.Answers.Add(new AnswerDTO() { Id = questionAnswer.Id, AnswerText = questionAnswer.AnswerText });
                        }

                        questions[category].Add(questionDTO);
                    }
                }
            }

            return questions;
        }
    }
}
