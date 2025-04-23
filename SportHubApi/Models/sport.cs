using System.ComponentModel.DataAnnotations.Schema;
namespace SportHubApi.Models
{
    [Table("sports")]
    public class Sport
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("name")]
        public required string Name { get; set; }

        [Column("photo")]
        public string? Photo { get; set; }


       [Column("coach_id")]
       public int? CoachId { get; set; }
        
        public  Coach? Coach { get; set; }
        public  ICollection<Info>? Info { get; set; }
        public  ICollection<Team>? Teams { get; set; }
        public  ICollection<Event>? Events { get; set; }
        public  ICollection<JoinTeamRequest>? JoinTeamRequest { get; set; }
    }

}