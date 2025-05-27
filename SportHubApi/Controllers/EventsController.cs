using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportHubApi.Data;
using SportHubApi.Models;

namespace SportHubApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EventsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetEvents()
        {
            var events = await _context.Events
                .Include(e => e.Sport)
                .Include(e => e.Matches)
                .Include(e => e.EventResults)
                .Include(e => e.JoinEventRequest)
                .Select(e => new
                {
                    e.Id,
                    e.Name,
                    e.Description,
                    e.StartDate,
                    e.EndDate,
                    e.TypeEvent,
                    e.Format,
                    e.Unit,
                    e.Direction,
                    Sport = new
                    {
                        e.Sport.Id,
                        e.Sport.Name,
                        e.Sport.Photo
                    }
                })
                .ToListAsync();

            return Ok(events);
        }
    }
}
