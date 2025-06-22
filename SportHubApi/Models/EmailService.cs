using MailKit.Net.Smtp;
using MimeKit;
using SportHubApi.Models.Enums;
using Microsoft.Extensions.Configuration;


namespace SportHubApi.Models
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendStatusUpdateEmailAsync(string? email, string memberName, RequestStatus status)
        {
            if (string.IsNullOrEmpty(email))
                return;

            var smtpHost = _configuration["Smtp:Host"];
            var smtpPort = int.Parse(_configuration["Smtp:Port"]);
            var smtpUser = _configuration["Smtp:User"];
            var smtpPass = _configuration["Smtp:Pass"];

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("SportHub Admin", smtpUser));
            message.To.Add(MailboxAddress.Parse(email));
            message.Subject = "Your Request Status Update";

            string statusText = status == RequestStatus.Approved ? "accepted" : "declined";

            message.Body = new TextPart("plain")
            {
                Text = $"Hello {memberName},\n\nYour request has been {statusText}.\n\nBest regards,\nSportHub Team"
            };

            using var client = new SmtpClient();
            await client.ConnectAsync(smtpHost, smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(smtpUser, smtpPass);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }
    }
}