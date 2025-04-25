using System.ComponentModel.DataAnnotations.Schema;
namespace SportHubApi.Models
{
    [Table("events")]
    public class Event
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("name")]
        public required string Name { get; set; }

        [Column("startdate")]
        public DateTime StartDate { get; set; }

        [Column("enddate")]
        public DateTime EndDate { get; set; }

        [Column("sport_id")]
        public int SportId { get; set; }

        public required Sport Sport { get; set; }
        public required ICollection<JoinEventRequest> JoinEventRequest { get; set; }
    }
}