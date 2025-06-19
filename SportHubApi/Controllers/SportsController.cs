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
                .Include(s => s.Info) // Include Info
                .FirstOrDefaultAsync(s => s.Id == id);

            if (sport == null)
                return NotFound();

            return Ok(new
            {
                sport.Id,
                sport.Name,
                sport.Photo,
                Info = sport.Info?.Select(info => new
                {
                    info.Id,
                    info.Text,
                    info.Photo
                }).ToList(),
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

        [HttpPost("{id}/upload-photo")]
        public async Task<IActionResult> UploadSportPhoto(int id, IFormFile file)
        {
            var sport = await _context.Sports.FindAsync(id);
            if (sport == null)
                return NotFound("Sport not found");

            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded");

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            sport.Photo = fileName;
            await _context.SaveChangesAsync();

            return Ok(new { photo = fileName });
        }

    }
}
