using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportHubApi.Data;
using SportHubApi.Models;

namespace SportHubApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeamsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TeamsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetTeams()
        {
            var teams = await _context.Teams
                .Include(t => t.Sport)
                .Include(t => t.Players)
                .Include(t => t.Coach)
                .Select(t => new
                {
                    t.Id,
                    t.Name,
                    t.Gender,
                    Sport = new
                    {
                        t.Sport.Id,
                        t.Sport.Name,
                        t.Sport.Photo
                    },
                    Coach = t.Coach == null ? null : new
                    {
                        t.Coach.Id,
                        t.Coach.Name,
                        t.Coach.Photo
                    },
                    Players = t.Players.Select(p => new
                    {
                        p.Id,
                        p.Name,
                        p.GroupNumber,
                        p.PhoneNumber
                    }).ToList()
                })
                .ToListAsync();

            return Ok(teams);
        }

    }
}
