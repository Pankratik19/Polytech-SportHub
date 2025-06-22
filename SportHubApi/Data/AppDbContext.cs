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
            // Конвертація enum у string
            modelBuilder.Entity<Event>().Property(e => e.TypeEvent).HasConversion<string>();
            modelBuilder.Entity<Event>().Property(e => e.Format).HasConversion<string>();
            modelBuilder.Entity<Event>().Property(e => e.Unit).HasConversion<string>();
            modelBuilder.Entity<Event>().Property(e => e.Direction).HasConversion<string>();
            modelBuilder.Entity<Event>().Property(e => e.Gender).HasConversion<string>();

            modelBuilder.Entity<Team>().Property(t => t.Gender).HasConversion<string>();

            modelBuilder.Entity<JoinEventRequest>().Property(je => je.Status).HasConversion<string>();
            modelBuilder.Entity<JoinTeamRequest>().Property(jt => jt.Status).HasConversion<string>();

            // Відношення зі DeleteBehavior.Cascade
            modelBuilder.Entity<Sport>()
                .HasMany(s => s.Teams)
                .WithOne(t => t.Sport)
                .HasForeignKey(t => t.SportId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Sport>()
                .HasMany(s => s.Events)
                .WithOne(e => e.Sport)
                .HasForeignKey(e => e.SportId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Sport>()
                .HasMany(s => s.Info)
                .WithOne(i => i.Sport)
                .HasForeignKey(i => i.SportId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Sport>()
                .HasMany(s => s.JoinTeamRequest)
                .WithOne(j => j.Sport)
                .HasForeignKey(j => j.SportId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Team>()
                .HasMany(t => t.Players)
                .WithOne(p => p.Team)
                .HasForeignKey(p => p.TeamId)
                .OnDelete(DeleteBehavior.Cascade);

            // Відношення з DeleteBehavior.SetNull – FK повинні бути nullable!
            modelBuilder.Entity<Player>()
                .HasMany<EventResult>()
                .WithOne(er => er.Player)
                .HasForeignKey(er => er.PlayerId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Event>()
                .HasMany<EventResult>()
                .WithOne(er => er.Event)
                .HasForeignKey(er => er.EventId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<JoinEventRequest>()
    .HasOne(j => j.Event)
    .WithMany(e => e.JoinEventRequest)
    .HasForeignKey(j => j.EventId)
    .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<EventResult>()
.HasOne(er => er.Player)
.WithMany()
.HasForeignKey(er => er.PlayerId)
.OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Match>()
                .HasOne(m => m.Player1)
                .WithMany()
                .HasForeignKey(m => m.Player1Id)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Match>()
                .HasOne(m => m.Player2)
                .WithMany()
                .HasForeignKey(m => m.Player2Id)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Match>()
                .HasOne(m => m.Winner)
                .WithMany()
                .HasForeignKey(m => m.WinnerId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Match>()
                .HasOne(m => m.NextMatch)
                .WithMany()
                .HasForeignKey(m => m.NextMatchId)
                .OnDelete(DeleteBehavior.SetNull);

            base.OnModelCreating(modelBuilder);
        }
    }
}
