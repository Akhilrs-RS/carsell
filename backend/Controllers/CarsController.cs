using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarSellApi.Data;
using CarSellApi.Models;

namespace CarSellApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarsController : ControllerBase
    {
        private readonly CarSellDbContext _context;

        public CarsController(CarSellDbContext context)
        {
            _context = context;
        }

        // GET: api/cars
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Car>>> GetCars([FromQuery] string? brand, [FromQuery] string? fuelType, [FromQuery] bool? isFeatured)
        {
            var query = _context.Cars.AsQueryable();

            if (!string.IsNullOrWhiteSpace(brand))
            {
                query = query.Where(c => c.Brand.ToLower().Contains(brand.ToLower()) || c.Model.ToLower().Contains(brand.ToLower()));
            }

            if (!string.IsNullOrWhiteSpace(fuelType) && fuelType != "All")
            {
                query = query.Where(c => c.FuelType.ToLower() == fuelType.ToLower());
            }

            if (isFeatured.HasValue)
            {
                query = query.Where(c => c.IsFeatured == isFeatured.Value);
            }

            return await query.OrderByDescending(c => c.CreatedAt).ToListAsync();
        }

        // GET: api/cars/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> GetCar(int id)
        {
            var car = await _context.Cars.FindAsync(id);

            if (car == null)
            {
                return NotFound(new { message = $"Car with ID {id} not found." });
            }

            return car;
        }

        // POST: api/cars
        [HttpPost]
        public async Task<ActionResult<Car>> PostCar(Car car)
        {
            car.CreatedAt = DateTime.UtcNow;
            _context.Cars.Add(car);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCar), new { id = car.Id }, car);
        }

        // PUT: api/cars/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCar(int id, Car car)
        {
            if (id != car.Id)
            {
                return BadRequest(new { message = "ID mismatch." });
            }

            _context.Entry(car).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarExists(id))
                {
                    return NotFound(new { message = $"Car with ID {id} not found." });
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { message = "Car updated successfully!", car });
        }

        // DELETE: api/cars/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCar(int id)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null)
            {
                return NotFound(new { message = $"Car with ID {id} not found." });
            }

            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Car deleted successfully!" });
        }

        private bool CarExists(int id)
        {
            return _context.Cars.Any(e => e.Id == id);
        }
    }
}
