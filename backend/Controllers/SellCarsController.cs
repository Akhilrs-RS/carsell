using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarSellApi.Data;
using CarSellApi.Models;

namespace CarSellApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SellCarsController : ControllerBase
    {
        private readonly CarSellDbContext _context;

        public SellCarsController(CarSellDbContext context)
        {
            _context = context;
        }

        // GET: api/sellcars
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SellRequest>>> GetSellRequests()
        {
            return await _context.SellRequests.OrderByDescending(s => s.CreatedAt).ToListAsync();
        }

        // POST: api/sellcars
        [HttpPost]
        public async Task<ActionResult<SellRequest>> PostSellRequest(SellRequest request)
        {
            request.CreatedAt = DateTime.UtcNow;
            _context.SellRequests.Add(request);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Sell request submitted successfully!", id = request.Id });
        }
    }
}
