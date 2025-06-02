using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportHubApi.Data;
using SportHubApi.Models;
using SportHubApi.Models.Enums;

namespace SportHubApi.Controllers
{
    [ApiController]
    [Route("api/sports/{sportId}/joinTeam")]
    public class JoinTeamRequestController : ControllerBase
    {
        private readonly AppDbContext _context;

        public JoinTeamRequestController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> SubmitRequest(int sportId, [FromBody] JoinTeamRequest request)
        {
            var sport = await _context.Sports.FindAsync(sportId);
            if (sport == null)
                return NotFound("Sport not found.");

            request.SportId = sportId;
            request.Status = RequestStatus.Pending;
            request.SubmittedAt = DateTime.UtcNow;

            _context.JoinTeamRequest.Add(request);
            await _context.SaveChangesAsync();

            return Ok(request);
        }
    }
}
