using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportHubApi.Data;
using SportHubApi.Models;
using SportHubApi.Models.Enums;

namespace SportHubApi.Controllers
{
    [ApiController]
    [Route("api/events/{eventId}/joinEvent")]
    public class JoinEventRequestController : ControllerBase
    {
        private readonly AppDbContext _context;

        public JoinEventRequestController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> SubmitRequest(int eventId, [FromBody] JoinEventRequest request)
        {
            var eventEntity = await _context.Events.FindAsync(eventId);
            if (eventEntity == null)
                return NotFound("Event not found.");

            request.EventId = eventId;
            request.Status = RequestStatus.Pending;
            request.SubmittedAt = DateTime.UtcNow;

            _context.JoinEventRequest.Add(request);
            await _context.SaveChangesAsync();

            return Ok(request);
        }
    }
}
