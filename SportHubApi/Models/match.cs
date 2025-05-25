using System.ComponentModel.DataAnnotations.Schema;

namespace SportHubApi.Models
{
    [Table("matches")]
    public class Match
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("event_id")]
        public int EventId { get; set; }

        [Column("round")]
        public int Round { get; set; }

        [Column("match_number")]
        public int MatchNumber { get; set; }

        [Column("player1_id")]
        public int? Player1Id { get; set; }

        [Column("player2_id")]
        public int? Player2Id { get; set; }

        [Column("winner_id")]
        public int? WinnerId { get; set; }

        [Column("next_match_id")]
        public int? NextMatchId { get; set; }

        [Column("position_in_next_match")]
        public int? PositionInNextMatch { get; set; }

        public required Event Event { get; set; }
        public Player? Player1 { get; set; }
        public Player? Player2 { get; set; }
        public Player? Winner { get; set; }
        public Match? NextMatch { get; set; }
    }
}
