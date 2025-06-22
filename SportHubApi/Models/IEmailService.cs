using SportHubApi.Models.Enums;

namespace SportHubApi.Models
{
    public interface IEmailService
    {
        Task SendStatusUpdateEmailAsync(string? email, string memberName, RequestStatus status);
    }
}