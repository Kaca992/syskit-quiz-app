using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AzureFunctions.Quiz.App.DTO
{
    public class TestDTO
    {
        public ParticipantInfoDTO Participant { get; set; }
        public List<PrincipalAnswersDTO> Answers { get; set; }
    }

    public class ParticipantInfoDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Course { get; set; }
        public string EnrollmentYear { get; set; }
        public decimal Result { get; set; }
    }

    public class PrincipalAnswersDTO
    {
        public int QuestionId { get; set; }
        public int AnswerId { get; set; }
    }
}
