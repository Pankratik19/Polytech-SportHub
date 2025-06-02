using System.ComponentModel.DataAnnotations.Schema;
using SportHubApi.Models.Enums;

namespace SportHubApi.Models
{
    [Table("joineventrequest")]
    public class JoinEventRequest
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("membernames")]
        public required string MemberNames { get; set; }

        [Column("membercount")]
        public required int MemberCount { get; set; }

        [Column("groupnumber")]
        public required string GroupNumber { get; set; }

        [Column("status")]
        public RequestStatus Status { get; set; }

        [Column("submitted_at")]
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;

        [Column("email")]
        public string? Email { get; set; }

        [Column("event_id")]
        public int EventId { get; set; }

    }
}