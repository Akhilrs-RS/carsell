using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarSellApi.Data;
using CarSellApi.Models;

namespace CarSellApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FinanceController : ControllerBase
    {
        private readonly CarSellDbContext _context;

        public FinanceController(CarSellDbContext context)
        {
            _context = context;
        }

        // GET: api/finance
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FinanceApplication>>> GetFinanceApplications()
        {
            return await _context.FinanceApplications.OrderByDescending(f => f.CreatedAt).ToListAsync();
        }

        // POST: api/finance
        [HttpPost]
        public async Task<ActionResult<FinanceApplication>> PostFinanceApplication(FinanceApplication application)
        {
            application.CreatedAt = DateTime.UtcNow;
            _context.FinanceApplications.Add(application);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Finance application submitted successfully!", id = application.Id });
        }
    }
}
