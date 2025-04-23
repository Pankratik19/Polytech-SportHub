using System.ComponentModel.DataAnnotations.Schema;
namespace SportHubApi.Models
{
    [Table("players")]
    public class Player
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("name")]
        public required string Name { get; set; }

        [Column("groupnumber")]
        public required string GroupNumber { get; set; }

        [Column("phonenumber")]
        public required string PhoneNumber { get; set; }

        [Column("team_id")]
        public int TeamId { get; set; }

        public required Team Team { get; set; }
    }
}