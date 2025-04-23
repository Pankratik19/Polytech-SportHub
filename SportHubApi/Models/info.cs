using System.ComponentModel.DataAnnotations.Schema;
namespace SportHubApi.Models
{
    [Table("info")]
    public class Info
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("text")]
        public required string Text { get; set; }

        [Column("photo")]
        public required string Photo { get; set; }

        [Column("sport_id")]
        public int SportId { get; set; }

        public required Sport Sport { get; set; }
    }
}