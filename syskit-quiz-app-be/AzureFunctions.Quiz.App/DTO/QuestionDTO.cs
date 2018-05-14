using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AzureFunctions.Quiz.App.DTO
{
    public class QuestionDTO
    {
        public int Id { get; set; }
        public string QuestionText { get; set; }
        public List<AnswerDTO> Answers { get; set; }
    }

    public class AnswerDTO
    {
        public int Id { get; set; }
        public string AnswerText { get; set; }
    }
}
