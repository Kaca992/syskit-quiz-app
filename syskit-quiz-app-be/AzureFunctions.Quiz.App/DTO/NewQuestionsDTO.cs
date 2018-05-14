using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AzureFunctions.Quiz.App.DTO
{
    public class NewQuestionsDTO
    {
        public string QuestionText { get; set; }
        public List<NewQuestionAnswersDTO> Answers { get; set; }
    }

    public class NewQuestionAnswersDTO
    {
        public string AnswerText { get; set; }
        public bool IsCorrectAnswer { get; set; }
    }
}
