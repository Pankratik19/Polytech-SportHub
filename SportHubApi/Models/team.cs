using System.ComponentModel.DataAnnotations.Schema;
namespace SportHubApi.Models
{
    [Table("teams")]
    public class Team
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("name")]
        public required string Name { get; set; }

        [Column("gender")]
        public required string Gender { get; set; }

        [Column("sport_id")]
        public required int SportId { get; set; }
        public required Sport Sport { get; set; }

        [Column("coach_id")]
        public int? CoachId { get; set; }
        public Coach? Coach { get; set; }

        public required ICollection<Player> Players { get; set; }
    }

}