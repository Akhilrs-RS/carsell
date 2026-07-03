using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarSellApi.Data;
using CarSellApi.Models;

namespace CarSellApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly CarSellDbContext _context;

        public AuthController(CarSellDbContext context)
        {
            _context = context;
        }

        // POST: api/auth/register
        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] RegisterRequest request)
        {
            if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            {
                return BadRequest(new { message = "Email is already registered!" });
            }

            var user = new User
            {
                FullName = request.FullName,
                Email = request.Email,
                PasswordHash = request.Password, // Plain for local testing simplicity
                Phone = request.Phone,
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new 
            { 
                message = "Registration successful!", 
                user = new { user.Id, user.FullName, user.Email, user.Phone } 
            });
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null || user.PasswordHash != request.Password)
            {
                return BadRequest(new { message = "Invalid email or password!" });
            }

            return Ok(new 
            { 
                message = "Login successful!", 
                user = new { user.Id, user.FullName, user.Email, user.Phone } 
            });
        }
    }

    public class RegisterRequest
    {
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
    }

    public class LoginRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
