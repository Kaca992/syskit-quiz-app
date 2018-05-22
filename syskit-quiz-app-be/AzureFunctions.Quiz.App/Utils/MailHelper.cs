using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs.Host;

namespace AzureFunctions.Quiz.App.Utils
{
    public class MailHelper
    {
        public string FromMail { get; }
        private TraceWriter _logger;

        public MailHelper(TraceWriter log)
        {
            FromMail = "terminalserviceslog@gmail.com";
            _logger = log;
        }

        private SmtpClient _client;
        public SmtpClient SmtpClient
        {
            get
            {
                if (_client == null)
                {
                    _client = new SmtpClient()
                    {
                        Port = 25,
                        EnableSsl = false,
                        DeliveryMethod = SmtpDeliveryMethod.Network,
                        UseDefaultCredentials = false,
                        Host = "mail.iskon.hr"
                    };
                }

                return _client;
            }
        }

        public void SendMail(string toEmail, string participantName)
        {

            MailMessage mail = new MailMessage(FromMail, toEmail);

            mail.Subject = "Ovo je testna porukica";
            mail.Body = "Test body";
            mail.IsBodyHtml = true;
            mail.Priority = MailPriority.High;

            try
            {
                SmtpClient.Send(mail);
                _logger.Info($"Email sent to {toEmail}.");
            }
            catch (Exception ex)
            {
                _logger.Error("Error while sending mail", ex);
            }
        }
    }
}
