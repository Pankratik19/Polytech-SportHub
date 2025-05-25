using System.ComponentModel.DataAnnotations.Schema;
using SportHubApi.Models.Enums;

namespace SportHubApi.Models
{
    [Table("events")]
    public class Event
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("name")]
        public required string Name { get; set; }

        [Column("description")]
        public string? Description { get; set; }

        [Column("startdate")]
        public DateTime StartDate { get; set; }

        [Column("enddate")]
        public DateTime EndDate { get; set; }

        [Column("type_event")]
        public EventType? TypeEvent { get; set; }

        [Column("format")]
        public EventFormat? Format { get; set; }

        [Column("unit")]
        public ResultUnit? Unit { get; set; }

        [Column("direction")]
        public Direction? Direction { get; set; }

        [Column("sport_id")]
        public int SportId { get; set; }

        public required Sport Sport { get; set; }

        public required ICollection<JoinEventRequest> JoinEventRequest { get; set; }

        public ICollection<Match>? Matches { get; set; }
        public ICollection<EventResult>? EventResults { get; set; }
    }
}
