using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
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
        public int? SportId { get; set; }

 [JsonIgnore]
        public Sport? Sport { get; set; }
    }
}