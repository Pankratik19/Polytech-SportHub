using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportHubApi.Models;
using SportHubApi.Data;

namespace SportsApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SportsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SportsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sport>>> GetSports()
        {
            var sports = await _context.Sports
                .Include(s => s.Coach)
                .Include(s => s.Info)
                .Include(s => s.Teams)
                .Include(s => s.Events)
                .Include(s => s.JoinTeamRequest)
                .ToListAsync();

            return Ok(sports);
        }
    }
}
