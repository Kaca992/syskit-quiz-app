﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs.Host;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace AzureFunctions.Quiz.App.Utils
{
    public class MailHelper
    {
        public MailSettings MailSettings { get; }
        private TraceWriter _logger;
        private string _apiKey = AppSettings.MailApiKey;
        private string _rawEmailText;

        public MailHelper(TraceWriter log, string appDirectory)
        {
            MailSettings = new MailSettings();
            _logger = log;
            _rawEmailText = File.ReadAllText($"{appDirectory}\\emailTemplate.html");
        }

        public async Task SendMail(string mail, string name)
        {
            var client = new SendGridClient(_apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress(MailSettings.FromMail, MailSettings.FromName),
                Subject = "SysKit Summer Internship 2018",
                HtmlContent = insertNameToTemplate(name)
            };
            msg.AddTo(new EmailAddress(mail));
            var response = await client.SendEmailAsync(msg);
            var code = response.StatusCode;

            if (code == HttpStatusCode.Accepted)
            {
                _logger.Info("Email sent");
            }
        }

        private string insertNameToTemplate(string name)
        {
            if (name == null)
            {
                return _rawEmailText;
            }

            Regex rgx = new Regex(@"(\[name\])");
            return rgx.Replace(_rawEmailText, name);
        }
    }

    public class MailSettings
    {
        public string FromMail { get; }
        public string FromName { get; }
        public string Subject { get; }

        public MailSettings()
        {
            FromMail = AppSettings.MailAdress;
            FromName = "SysKit Team";
            Subject = "";
        }
    }
}
