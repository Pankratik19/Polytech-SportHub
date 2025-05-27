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
        .AsNoTracking()
        .Include(s => s.Coach)
        .Select(s => new Sport
        {
            Id = s.Id,
            Name = s.Name,
            Photo = s.Photo,
            Coach = s.Coach == null ? null : new Coach
            {
                Id = s.Coach.Id,
                Name = s.Coach.Name
            }
        })
        .ToListAsync();

            return Ok(sports);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetSportById(int id)
        {
            var sport = await _context.Sports
                .Include(s => s.Teams)
                    .ThenInclude(t => t.Coach)
                .Include(s => s.Teams)
                    .ThenInclude(t => t.Players)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (sport == null)
                return NotFound();

            return Ok(new
            {
                sport.Id,
                sport.Name,
                sport.Photo,
                Teams = sport.Teams.Select(t => new
                {
                    t.Id,
                    t.Name,
                    t.Gender,
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
                }).ToList()
            });
        }

    }
}
