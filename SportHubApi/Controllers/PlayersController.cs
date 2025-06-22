using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportHubApi.Data;
using SportHubApi.Models;

namespace SportHubApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PlayersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetPlayers()
        {
            var players = await _context.Players
                .Include(p => p.Team)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.GroupNumber,
                    p.PhoneNumber,
                    Team = new
                    {
                        p.Team.Id,
                        p.Team.Name
                    }
                })
                .ToListAsync();

            return Ok(players);
        }
    }
}