using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportHubApi.Data;
using SportHubApi.Models;
using SportHubApi.Models.Enums;

namespace SportHubApi.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/joinTeamRequests")]
    public class AdminJoinTeamRequestsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IEmailService _emailService;

        public AdminJoinTeamRequestsController(AppDbContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<JoinTeamRequest>>> GetAll()
        {
            var requests = await _context.JoinTeamRequest
                .Include(r => r.Sport)
                .ToListAsync();

            return Ok(requests);
        }

        [HttpPost("{id}/approve")]
        public async Task<IActionResult> Approve(int id)
        {
            var request = await _context.JoinTeamRequest.FindAsync(id);
            if (request == null) return NotFound();

            request.Status = RequestStatus.Approved;
            await _context.SaveChangesAsync();

            await _emailService.SendStatusUpdateEmailAsync(request.Email, request.MemberName, request.Status);

            return Ok(new { message = "Request approved and email sent." });
        }

        [HttpPost("{id}/decline")]
        public async Task<IActionResult> Decline(int id)
        {
            var request = await _context.JoinTeamRequest.FindAsync(id);
            if (request == null) return NotFound();

            request.Status = RequestStatus.Rejected;
            await _context.SaveChangesAsync();

            await _emailService.SendStatusUpdateEmailAsync(request.Email, request.MemberName, request.Status);

            return Ok(new { message = "Request declined and email sent." });
        }
    }
}
