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

        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetEvent(int id)
        {
            var evt = await _context.Events
                .Include(e => e.Sport)
                .Include(e => e.Matches)
                .Include(e => e.EventResults)
                .Include(e => e.JoinEventRequest)
                .Where(e => e.Id == id)
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
                    e.Gender,
                    Sport = new
                    {
                        e.Sport.Id,
                        e.Sport.Name,
                        e.Sport.Photo
                    }
                })
                .FirstOrDefaultAsync();

            if (evt == null)
                return NotFound();

            return Ok(evt);
        }

        [HttpGet("{eventId}/table-results")]
        public async Task<ActionResult<IEnumerable<object>>> GetAllResultsByEventId(int eventId)
        {
            var eventExists = await _context.Events.AnyAsync(e => e.Id == eventId);
            if (!eventExists)
                return NotFound($"Event with ID {eventId} not found.");

            var results = await _context.EventResults
                .Where(er => er.EventId == eventId)
                .Include(er => er.Player)
                .Include(er => er.Event)
                .Select(er => new
                {
                    er.Id,
                    er.Result,

                    Event = new
                    {
                        er.Event.Id,
                        er.Event.Name,
                        er.Event.TypeEvent,
                        er.Event.Direction,
                        er.Event.Unit,
                        er.Event.StartDate,
                        er.Event.EndDate
                    },

                    Player = new
                    {
                        er.Player.Id,
                        er.Player.Name,
                        er.Player.GroupNumber
                    }
                })
                .ToListAsync();

            return Ok(results);
        }

        [HttpGet("{eventId}/tournament-results")]
        public async Task<ActionResult<IEnumerable<object>>> GetMatchesByEventId(int eventId)
        {
            var eventExists = await _context.Events.AnyAsync(e => e.Id == eventId);
            if (!eventExists)
                return NotFound($"Event with ID {eventId} not found.");

            var matches = await _context.Matches
                .Where(m => m.EventId == eventId)
                .Include(m => m.Player1)
                .Include(m => m.Player2)
                .Include(m => m.Winner)
                .Include(m => m.NextMatch)
                .Select(m => new
                {
                    m.Id,
                    m.Round,
                    m.MatchNumber,

                    Player1 = m.Player1 != null ? new
                    {
                        m.Player1.Id,
                        m.Player1.Name
                    } : null,

                    Player2 = m.Player2 != null ? new
                    {
                        m.Player2.Id,
                        m.Player2.Name
                    } : null,

                    Winner = m.Winner != null ? new
                    {
                        m.Winner.Id,
                        m.Winner.Name
                    } : null,

                    NextMatch = m.NextMatch != null ? new
                    {
                        m.NextMatch.Id,
                        m.PositionInNextMatch
                    } : null
                })
                .ToListAsync();

            return Ok(matches);
        }
    }
}
