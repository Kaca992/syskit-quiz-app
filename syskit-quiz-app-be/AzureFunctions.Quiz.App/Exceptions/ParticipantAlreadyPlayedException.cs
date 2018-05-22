using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AzureFunctions.Quiz.App.Exceptions
{
    public class ParticipantAlreadyPlayedException : Exception
    {
        public ParticipantAlreadyPlayedException() : base("Postoji korisnik sa ovim mailom u sutavu.")
        {

        }
    }
}
