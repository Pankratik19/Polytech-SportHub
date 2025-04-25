using System.ComponentModel.DataAnnotations.Schema;
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

        [Column("event_id")]
        public int EventId { get; set; }

        public required Event Event { get; set; }
    }
}