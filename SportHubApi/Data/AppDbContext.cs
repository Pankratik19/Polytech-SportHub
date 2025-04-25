using Microsoft.EntityFrameworkCore;
using SportHubApi.Models;

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
    }
}