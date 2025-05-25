using System.ComponentModel.DataAnnotations.Schema;
using SportHubApi.Models.Enums;

namespace SportHubApi.Models
{
    [Table("jointeamrequest")]
    public class JoinTeamRequest
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("membername")]
        public required string MemberName { get; set; }

        [Column("phonenumber")]
        public required string PhoneNumber { get; set; }

        [Column("groupnumber")]
        public required string GroupNumber { get; set; }

        [Column("additionalinfo")]
        public string? AdditionalInfo { get; set; }

        [Column("status")]
        public RequestStatus Status { get; set; }

        [Column("submitted_at")]
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;

        [Column("email")]
        public string? Email { get; set; }

        [Column("sport_id")]
        public int SportId { get; set; }

        public required Sport Sport { get; set; }
    }
}