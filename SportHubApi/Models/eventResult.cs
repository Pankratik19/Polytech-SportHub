using System.ComponentModel.DataAnnotations.Schema;

namespace SportHubApi.Models
{
    [Table("eventresults")]
    public class EventResult
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("player_id")]
        public int PlayerId { get; set; }

        [Column("event_id")]
        public int EventId { get; set; }

        [Column("result")]
        public decimal Result { get; set; }

        public required Player Player { get; set; }
        public required Event Event { get; set; }
    }
}
