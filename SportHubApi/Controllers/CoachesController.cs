using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportHubApi.Data;
using SportHubApi.Models;

namespace SportHubApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CoachesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CoachesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Coach>>> GetCoaches()
        {
            var coaches = await _context.Coach
                .Include(c => c.Sports)
                .Select(c => new Coach
                {
                    Id = c.Id,
                    Name = c.Name,
                    Photo = c.Photo,
                    AdditionalInfo = c.AdditionalInfo,
                    Sports = c.Sports.Select(s => new Sport
                    {
                        Name = s.Name,
                        Photo = s.Photo
                    }).ToList()
                })
                .ToListAsync();

            return Ok(coaches);
        }
    }

}