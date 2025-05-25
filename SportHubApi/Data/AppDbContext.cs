using Microsoft.EntityFrameworkCore;
using SportHubApi.Models;
using SportHubApi.Models.Enums;

namespace SportHubApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Coach> Coach { get; set; }
        public DbSet<Sport> Sports { get; set; }
        public DbSet<Info> Info { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<JoinTeamRequest> JoinTeamRequest { get; set; }
        public DbSet<JoinEventRequest> JoinEventRequest { get; set; }
        public DbSet<Match> Matches { get; set; }
        public DbSet<EventResult> EventResults { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Event enums
            modelBuilder.Entity<Event>()
                .Property(e => e.TypeEvent)
                .HasConversion<string>();

            modelBuilder.Entity<Event>()
                .Property(e => e.Format)
                .HasConversion<string>();

            modelBuilder.Entity<Event>()
                .Property(e => e.Unit)
                .HasConversion<string>();

            modelBuilder.Entity<Event>()
                .Property(e => e.Direction)
                .HasConversion<string>();

            // MatchResultStatus (якщо є enum у Match чи EventResult — додай його тут)

            base.OnModelCreating(modelBuilder);
        }
    }
}