using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarSellApi.Data;
using CarSellApi.Models;

namespace CarSellApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OperationsController : ControllerBase
    {
        private readonly CarSellDbContext _context;

        public OperationsController(CarSellDbContext context)
        {
            _context = context;
        }

        // ================= HRMS MODULE =================

        // GET: api/operations/employees
        [HttpGet("employees")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            return await _context.Employees.OrderBy(e => e.Name).ToListAsync();
        }

        // POST: api/operations/employees
        [HttpPost("employees")]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            employee.DateHired = DateTime.UtcNow;
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Employee profile created successfully!", employee.Id });
        }

        // ================= WORKSHOP MODULE =================

        // GET: api/operations/servicebookings
        [HttpGet("servicebookings")]
        public async Task<ActionResult<IEnumerable<ServiceBooking>>> GetServiceBookings()
        {
            return await _context.ServiceBookings.OrderByDescending(s => s.CreatedAt).ToListAsync();
        }

        // POST: api/operations/servicebookings
        [HttpPost("servicebookings")]
        public async Task<ActionResult<ServiceBooking>> PostServiceBooking(ServiceBooking booking)
        {
            booking.CreatedAt = DateTime.UtcNow;
            _context.ServiceBookings.Add(booking);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Service appointment booked successfully!", booking.Id });
        }

        // GET: api/operations/jobcards
        [HttpGet("jobcards")]
        public async Task<ActionResult<IEnumerable<JobCard>>> GetJobCards()
        {
            return await _context.JobCards.ToListAsync();
        }

        // POST: api/operations/jobcards
        [HttpPost("jobcards")]
        public async Task<ActionResult<JobCard>> PostJobCard(JobCard jobCard)
        {
            jobCard.TotalCost = jobCard.LaborCost + jobCard.SparePartsCost;
            _context.JobCards.Add(jobCard);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Workshop job card created!", jobCard.Id });
        }

        // ================= PROCUREMENT MODULE =================

        // GET: api/operations/purchaseorders
        [HttpGet("purchaseorders")]
        public async Task<ActionResult<IEnumerable<PurchaseOrder>>> GetPurchaseOrders()
        {
            return await _context.PurchaseOrders.OrderByDescending(p => p.CreatedAt).ToListAsync();
        }

        // POST: api/operations/purchaseorders
        [HttpPost("purchaseorders")]
        public async Task<ActionResult<PurchaseOrder>> PostPurchaseOrder(PurchaseOrder order)
        {
            order.CreatedAt = DateTime.UtcNow;
            _context.PurchaseOrders.Add(order);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Procurement purchase order created!", order.Id });
        }
    }
}
