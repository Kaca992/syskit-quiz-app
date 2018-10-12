using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AzureFunctions.Quiz.App.DTO
{
    public class QuestionRequestDTO
    {
        public int Number { get; set; }
        public IEnumerable<int> Categories { get; set; }
    }
}
