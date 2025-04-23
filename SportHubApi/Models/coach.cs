using System.ComponentModel.DataAnnotations.Schema;
namespace SportHubApi.Models
{
    [Table("coach")]
    public class Coach
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("name")]
        public required string Name { get; set; }

        [Column("photo")]
        public required string Photo { get; set; }

        [Column("additionalinfo")]
        public required string AdditionalInfo { get; set; }

        public required ICollection<Sport>? Sports { get; set; }
    }
}