using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AzureFunctions.Quiz.App.Utils
{
    public static class AppSettings
    {
        public static string ConnectionString =>
            ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

        public static string MailApiKey => System.Configuration.ConfigurationManager.AppSettings["SendGridAPI"];

        public static int CorrectAnswersForMail =>
            Int32.Parse(System.Configuration.ConfigurationManager.AppSettings["CorrectAnswersForMail"]);

        public static string MailAdress => System.Configuration.ConfigurationManager.AppSettings["EmailAdress"];

        public static int SurveyId => Int32.Parse(System.Configuration.ConfigurationManager.AppSettings["SurveyId"]);

        public static int PrizeTreshold => Int32.Parse(System.Configuration.ConfigurationManager.AppSettings["PrizeTreshold"]);
    }
}
