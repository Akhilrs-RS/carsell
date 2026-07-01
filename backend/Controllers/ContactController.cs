using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarSellApi.Data;
using CarSellApi.Models;

namespace CarSellApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly CarSellDbContext _context;

        public ContactController(CarSellDbContext context)
        {
            _context = context;
        }

        // GET: api/contact
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Inquiry>>> GetInquiries()
        {
            return await _context.Inquiries.OrderByDescending(i => i.CreatedAt).ToListAsync();
        }

        // POST: api/contact
        [HttpPost]
        public async Task<ActionResult<Inquiry>> PostInquiry(Inquiry inquiry)
        {
            inquiry.CreatedAt = DateTime.UtcNow;
            _context.Inquiries.Add(inquiry);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Message sent successfully!", id = inquiry.Id });
        }
    }
}
