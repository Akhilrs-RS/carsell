using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarSellApi.Data;
using CarSellApi.Models;

namespace CarSellApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CRMController : ControllerBase
    {
        private readonly CarSellDbContext _context;

        public CRMController(CarSellDbContext context)
        {
            _context = context;
        }

        // GET: api/crm/customers
        [HttpGet("customers")]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            return await _context.Customers.OrderByDescending(c => c.CreatedAt).ToListAsync();
        }

        // POST: api/crm/customers
        [HttpPost("customers")]
        public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
        {
            customer.CreatedAt = DateTime.UtcNow;
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Customer profile created successfully!", customer.Id });
        }

        // GET: api/crm/dealers
        [HttpGet("dealers")]
        public async Task<ActionResult<IEnumerable<Dealer>>> GetDealers()
        {
            return await _context.Dealers.OrderByDescending(d => d.CreatedAt).ToListAsync();
        }

        // POST: api/crm/dealers (Registration)
        [HttpPost("dealers")]
        public async Task<ActionResult<Dealer>> RegisterDealer(Dealer dealer)
        {
            dealer.CreatedAt = DateTime.UtcNow;
            dealer.VerificationStatus = "Pending Review";
            _context.Dealers.Add(dealer);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Dealer application registered successfully!", dealer.Id });
        }

        // PUT: api/crm/dealers/{id}/verify
        [HttpPut("dealers/{id}/verify")]
        public async Task<IActionResult> VerifyDealer(int id, [FromBody] string status)
        {
            var dealer = await _context.Dealers.FindAsync(id);
            if (dealer == null)
            {
                return NotFound(new { message = "Dealer not found" });
            }

            dealer.VerificationStatus = status; // Approved, Rejected
            await _context.SaveChangesAsync();

            return Ok(new { message = $"Dealer verification status updated to {status}!" });
        }

        // POST: api/crm/dealers/login
        [HttpPost("dealers/login")]
        public async Task<ActionResult> LoginDealer([FromBody] DealerLoginRequest request)
        {
            var dealer = await _context.Dealers.FirstOrDefaultAsync(d => d.Email == request.Email);
            if (dealer == null || dealer.PasswordHash != request.Password)
            {
                return BadRequest(new { message = "Invalid email or password!" });
            }

            return Ok(new 
            { 
                message = "Login successful!", 
                dealer = new { dealer.Id, dealer.BusinessName, dealer.Email, dealer.VerificationStatus } 
            });
        }
    }

    public class DealerLoginRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
