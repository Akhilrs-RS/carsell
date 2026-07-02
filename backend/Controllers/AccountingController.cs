using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarSellApi.Data;
using CarSellApi.Models;

namespace CarSellApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountingController : ControllerBase
    {
        private readonly CarSellDbContext _context;

        public AccountingController(CarSellDbContext context)
        {
            _context = context;
        }

        // GET: api/accounting/accounts
        [HttpGet("accounts")]
        public async Task<ActionResult<IEnumerable<Account>>> GetAccounts()
        {
            return await _context.Accounts.OrderBy(a => a.Code).ToListAsync();
        }

        // GET: api/accounting/invoices
        [HttpGet("invoices")]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoices()
        {
            return await _context.Invoices.OrderByDescending(i => i.Date).ToListAsync();
        }

        // POST: api/accounting/invoices
        [HttpPost("invoices")]
        public async Task<ActionResult<Invoice>> PostInvoice(Invoice invoice)
        {
            invoice.Date = DateTime.UtcNow;
            _context.Invoices.Add(invoice);

            // Side effect: Automatically record double-entry transactions
            // Debit cash/accounts receivable, Credit sales revenue
            var revenueAccount = await _context.Accounts.FirstOrDefaultAsync(a => a.Code == "4010");
            var cashAccount = await _context.Accounts.FirstOrDefaultAsync(a => a.Code == "1010");

            if (revenueAccount != null && cashAccount != null)
            {
                revenueAccount.Balance += invoice.Amount;
                cashAccount.Balance += (invoice.Amount + invoice.TaxAmount);

                _context.JournalEntries.Add(new JournalEntry
                {
                    AccountId = cashAccount.Id,
                    Type = "Debit",
                    Amount = invoice.Amount + invoice.TaxAmount,
                    Description = $"Payment received for Invoice {invoice.ReferenceNumber}",
                    Date = DateTime.UtcNow
                });

                _context.JournalEntries.Add(new JournalEntry
                {
                    AccountId = revenueAccount.Id,
                    Type = "Credit",
                    Amount = invoice.Amount,
                    Description = $"Car sale revenue recorded for Invoice {invoice.ReferenceNumber}",
                    Date = DateTime.UtcNow
                });
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Invoice created and financial ledgers updated!", invoice.Id });
        }

        // GET: api/accounting/ledgers
        [HttpGet("ledgers")]
        public async Task<ActionResult<IEnumerable<JournalEntry>>> GetLedgers()
        {
            return await _context.JournalEntries.OrderByDescending(j => j.Date).ToListAsync();
        }
    }
}
