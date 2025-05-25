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
    }
}
