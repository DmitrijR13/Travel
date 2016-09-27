using System;
using System.Configuration;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace FPCS.Core
{
    public class EmailSender
    {
        #region singleton

        public static EmailSender Instance
        {
            get
            {
                if (_instance == null) _instance = new EmailSender();
                return _instance;
            }
        }
        private static EmailSender _instance = null;

        #endregion singleton

        #region constructors

        public EmailSender()
        {
            Login = ConfigurationManager.AppSettings["EmailLogin"];
            Password = ConfigurationManager.AppSettings["EmailPassword"];
            Host = ConfigurationManager.AppSettings["EmailHost"];
            FromEmail = ConfigurationManager.AppSettings["FromEmail"];
            FromText = ConfigurationManager.AppSettings["FromText"];
            IsUseSSL = Convert.ToBoolean(ConfigurationManager.AppSettings["IsUseSSL"]);
        }

        #endregion constructors

        #region public properties

        public String Login { get; private set; }

        public String Password { get; private set; }

        public String Host { get; private set; }

        public String FromEmail { get; private set; }

        public String FromText { get; private set; }

        public Boolean IsUseSSL { get; private set; }

        #endregion public properties

        #region public methods

        public void Send(String toEmails, String subject, String messageBody)
        {
            SmtpClient client = new SmtpClient();
            client.EnableSsl = IsUseSSL;
            client.Host = Host;
            client.UseDefaultCredentials = false;
            client.Credentials = new NetworkCredential(Login, Password);

            MailMessage message = new MailMessage();
            message.From = new MailAddress(FromEmail, FromText, Encoding.UTF8);
            foreach (var email in toEmails.Split(',', ';'))
            {
                message.To.Add(new MailAddress(email.Trim()));
            }

            message.Body = messageBody.Replace("\r\n", "<br>");
            message.IsBodyHtml = true;
            message.BodyEncoding = Encoding.UTF8;
            message.Subject = subject;
            message.SubjectEncoding = Encoding.UTF8;

            client.Send(message);
        }

        #endregion public methods
    }
}
