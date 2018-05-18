using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AzureFunctions.Quiz.App.DTO
{
    public class ParticipantResultDTO
    {
        public int CorrectAnswers { get; set; }
        public int NumberOfQuestions { get; set; }
    }
}
