using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarSellApi.Data;
using CarSellApi.Models;

namespace CarSellApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PortalController : ControllerBase
    {
        private readonly CarSellDbContext _context;

        public PortalController(CarSellDbContext context)
        {
            _context = context;
        }

        // GET: api/portal/wishlist/{userId}
        [HttpGet("wishlist/{userId}")]
        public async Task<ActionResult<IEnumerable<Car>>> GetWishlist(int userId)
        {
            var carIds = await _context.WishlistItems
                .Where(w => w.UserId == userId)
                .Select(w => w.CarId)
                .ToListAsync();

            return await _context.Cars
                .Where(c => carIds.Contains(c.Id))
                .ToListAsync();
        }

        // POST: api/portal/wishlist
        [HttpPost("wishlist")]
        public async Task<ActionResult> AddToWishlist([FromBody] WishlistRequest request)
        {
            var exists = await _context.WishlistItems
                .AnyAsync(w => w.UserId == request.UserId && w.CarId == request.CarId);

            if (exists)
            {
                return Ok(new { message = "Vehicle is already in wishlist!" });
            }

            var item = new WishlistItem
            {
                UserId = request.UserId,
                CarId = request.CarId,
                CreatedAt = DateTime.UtcNow
            };

            _context.WishlistItems.Add(item);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Added to wishlist successfully!" });
        }

        // DELETE: api/portal/wishlist/{userId}/{carId}
        [HttpDelete("wishlist/{userId}/{carId}")]
        public async Task<ActionResult> RemoveFromWishlist(int userId, int carId)
        {
            var item = await _context.WishlistItems
                .FirstOrDefaultAsync(w => w.UserId == userId && w.CarId == carId);

            if (item == null)
            {
                return NotFound(new { message = "Wishlist item not found" });
            }

            _context.WishlistItems.Remove(item);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Removed from wishlist successfully!" });
        }

        // GET: api/portal/activity/{userId}
        [HttpGet("activity/{userId}")]
        public async Task<ActionResult> GetUserActivity(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound(new { message = "User account not found!" });
            }

            // Retrieve all items matching this user's email or registered user ID
            var inquiries = await _context.Inquiries
                .Where(i => i.UserId == userId || i.Email == user.Email)
                .OrderByDescending(i => i.CreatedAt)
                .ToListAsync();

            var financeApps = await _context.FinanceApplications
                .Where(f => f.UserId == userId || f.Email == user.Email)
                .OrderByDescending(f => f.CreatedAt)
                .ToListAsync();

            var sellRequests = await _context.SellRequests
                .Where(s => s.UserId == userId || s.Email == user.Email)
                .OrderByDescending(s => s.CreatedAt)
                .ToListAsync();

            return Ok(new
            {
                inquiries,
                financeApplications = financeApps,
                sellRequests
            });
        }
    }

    public class WishlistRequest
    {
        public int UserId { get; set; }
        public int CarId { get; set; }
    }
}
