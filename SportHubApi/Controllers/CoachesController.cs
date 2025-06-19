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

        [HttpPost("{id}/upload-photo")]
        public async Task<IActionResult> UploadCoachPhoto(int id, IFormFile file)
        {
            var coach = await _context.Coach.FindAsync(id);
            if (coach == null)
                return NotFound("Coach not found");

            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded");

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var filePath = Path.Combine(uploadsFolder, fileName);

            // Save file
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Save file name to DB
            coach.Photo = fileName;
            await _context.SaveChangesAsync();

            return Ok(new { photo = fileName });
        }
    }

}